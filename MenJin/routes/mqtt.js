/**
 * Created by rf-lab on 15-8-17.
 */
var mosca = require('mosca')
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'PassageDatabase',
    user:'root',
    password:'root'
});

//new begin with the help of tiancai

//创建服务器，端口8000
var MqttServer = new mosca.Server({
    port: 8000
});

/*数据库更新方法: 满时间更新一次*/
var count = 0;//后期可扩展成数组,不同的数组对应着不同的店,
              //最好在　数据库　中新建表　→→获取对应编号的door对应的　门店 通道信息
var startTime = new Date();
var latestConn = startTime;
var counts = new Array();//如何实现一次性赋值？？？
//可以使用 获取当天日期, 截取年-月-日, 再转换成时间日期---废除该方法
//判断方法加上 日期比较, 每次published 都判断

/*获取门的编号*/
var getNum = function(string){
    var nums = string.split(' ',3);
    //最好加上判断in 或者out的方法
    return Number(nums[0]);
}

/*获取标准date
*out: 2015-05-25
*in: date */
var getDay = function(date){
    var mounth;
    if (date.getMonth()<9)
        mounth = '0'+(date.getMonth()+1);
    else
        mounth = (date.getMonth()+1);
    return date.getFullYear()+'-'+mounth+'-'+date.getDate();
    //不细心
}

/*获取当前日期属于一年的哪周
* in : 时间
* out: week-in-year*/
var getweek = function(date){
    var time,week,curdate = date;
    //var days = ((date.getTime()/86400000+4)/7)%52
    curdate.setDate(curdate.getDate()+4-(curdate.getDay()||7));
    time = curdate.getTime();
    curdate.setMonth(0);
    curdate.setDate(1);
    week = Math.floor(Math.round((time-curdate)/86400000)/7)+1;
    return week;
}
/*用于组织成 分钟形式*/
var getMin = function(date){
    var mounth,minutes,hours,day;
    if (date.getMonth()<9)
        mounth = '0'+(date.getMonth()+1);
    else
        mounth = (date.getMonth()+1);
    if(date.getMinutes()<10)
        minutes = '0'+date.getMinutes();
    else
        minutes = date.getMinutes();
    if(date.getHours()<10)
        hours = '0'+date.getHours();
    else
        hours = date.getHours();

    if (date.getDate()<9)
        day = '0'+(date.getDate());
    else
        day = date.getDate();
    return date.getFullYear()+'-'+mounth+'-'+day+' '+hours+':'+minutes;
}
/*数据库连接池*/
/*pool.getConnection(function (err, conn) {
    if (err) console.log('fail in connection: ' + err);
    else {
        console.log('success in connection');
        conn.query("select * from PassageFlowData", function (err, results /!*fieldss*!/) {
            if (err) console.log('error in find words');
            else {
                console.log('right in find words');
                var resultData = new Array();
                if (results.length == 0)
                    console.log('查询无结果!');
            }
            conn.release();
        });
    }
}); */

/*日处理函数*/
var CheckDaily = function(curday){
    console.log('日信息处理开始....')
    var today =getDay(curday);//可能出错
    var time_begin = today + ' 00:00';
    var time_end = today + ' 23:59';
    console.log('获取到today:'+today);
    var count = 0;
    var weeks = getweek(curday);
    var j = 0;
    var i = 0;
    pool.getConnection(function (err, conn) {
        if (err) console.log('fail in connection:日信息处理 ' + err);
        else {
            conn.query("select * from doorID", function (err, resultsDoor) {
                if (err) console.log("获取doorID出错:110");
                else {
                    //对通道门 进行遍历
                    var door = resultsDoor;
                    console.log('resultDoor.length=='+resultsDoor.length);//door查询没问题
                    for (i = 0; i < resultsDoor.length; i++) {
                        var sql = [resultsDoor[i].storebelonged, resultsDoor[i].numAtStore, time_begin, time_end];
                        //查询数据库中指定 date 的人流量
                        //获取指定通道全天数据数组
                        var a=resultsDoor[i].storebelonged;
                        var b=resultsDoor[i].numAtStore;
                        console.log('sql语句为:'+sql+resultsDoor[i].storebelonged);
                        conn.query("select * from dateByMinutes where storeName=? and doorNum=? and time between ? and ?", sql, function (err, results) {
                            if (err) console.log("日分钟流量查询出错:118,第几个循环:" + i);
                            else {
                                console.log('计算日流量:124 '+results.length);//
                                //叠加
                                for (j = 0, count = 0; j < results.length; j++) {
                                    //计算天人流量
                                    console.log('没执行')//
                                    count = count + results[j].flow;
                                    console.log('count==='+count);
                                    //入库
                                    if (j == (results.length-1))//避免异步影响,写在for循环里面
                                    {
                                        console.log("存入日流量信息"+i+a+b)
                                        var sqlFlow = ['',today, a, b, count, weeks];
                                        console.log('sqlflow:'+sqlFlow);
                                        conn.query("insert into PassageFlowData (id_passage,date,storeName,doorNum,stream,weeks) values (?,?,?,?,?,?)",sqlFlow, function (err, result) {
                                            if (err)console.log('插入数据是出错:133'+err);
                                            else console.log('插入数据正确!:134');
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            })
            //step1:先从door表中获取到所有的门店好
            //step2:将其storeName,doorNum赋给数组a,b
            //step3:写一个循环,遍历数组处理
        }
        conn.release();
    });
}


/*由门禁编号获取门店等信息*/
/*num 门禁号
* callback回调函数
* 返回店名 通道号*/
var getsql = function(num,callback){
    var store,numT;
    pool.getConnection(function(err,conn) {
        if(err)
        console.log("连接池错误:71")
        conn.query("select * from doorID where doorNum=?",num,function(err,result){
            if(err) console.log("数据库查询错误：68");
            else{
                store = result[0].storebelonged;
                numT = result[0].numAtStore;
            }
            console.log('store:'+store+'\ndoorNum:'+numT);
            callback(latestConn,store,numT);
        });
        conn.release();
    })

    //return [store,numT]
    //如果回调函数 的主函数没有return 语句,是不是可以阻止???
    //回调函数的执行不是所谓的主函数执行完成之后才执行,而是再主函数指定的地方执行
    //回调函数的参数尽量不写()
}

var upLoadJudgement = function(timebegin){//传入的参数不需要定义类型
    var timecur = new Date();
    count=count+1;
    var count_time_begin=new Date();
    if((timecur.getDay() - timebegin.getDay())){
        latestConn = timebegin;//不知道可否如此表述
        console.log("\n时间已到，开始存入数据！");
        pool.getConnection(function (err, conn) {
            if (err) console.log('fail in connection: 59---' + err);
            else {
                //console.log('success in connection');
                var sql = [getDay(timecur),"江东店","1"];//暂定为　江东店，１号门通道
                conn.query("select * from PassageFlowData where date=? and storeName=? and doorNum=?",sql, function (err, results /*fieldss*/) {
                    //为了简化起见，可以　在数据库中表　加上门的编号
                    //查询是也就不用select *了，可以只返回需要的数据
                    if (err) console.log('error in find words');
                    else {
                        //判断数据库中是否有了当天的数据，
                        //如果有－－更新
                        //如果无－－创建
                        if (0 == results.length)
                        {
                            //创建新的行
                            var id;
                            //获取最新id号
                            conn.query("select * from PassageFlowData order by id_passage desc limit 1",function(err,result){
                                if(err)
                                console("错误：76");
                                else {
                                    id = result[0].id_passage;
                                    console.log("获取到id:"+id);
                                    //自增的可以传入空值
                                    var newsql = ['',getDay(timecur),"江东店","1",count,timecur.getDay()];
                                    //getDay()并不是判断日期属于一年中的哪周!!!!
                                    //可扩展为 与某个周一之间的日期差 除7 相加
                                    conn.query("INSERT INTO PassageFlowData (id_passage,date,storeName,doorNum,stream,weeks) values (?,?,?,?,?,?)",newsql,function(err,results){
                                        if(err)
                                            console.log("创建新的行时出错：83");
                                        //出错可能时单引号问题
                                        else count=0;
                                    });
                                }
                            });

                        }
                        else{
                            //var id = results[0].id_passage;
                            var newsql = [results[0].stream+count,results[0].id_passage];
                            console.log("获取到id:"+results[0].id_passage);
                            conn.query("UPDATE PassageFlowData SET stream=? WHERE id_passage=?",newsql,function(err,result){
                                if(err)
                                console.log("更新行时出错：94");
                                else
                                {
                                    count=0;
                                    console.log("更新成功：94");
                                }
                            });
                        }
                    }
                    conn.release();
                });
            }
        });



    }
    else {
        console.log('当前count值为：'+count)
        //count=count+1;
    }
    //console.log("存储一次数据的时间是："+(new Date()-count_time_begin));
}

var upLoadJudgement_min = function(timebegin,store,doornum){//传入的参数不需要定义类型
    var timecur = new Date();
    count=count+1;
    var count_time_begin=new Date();
    //判断条件尽可能从数据库中读取
    //getMin(timecur)!=getMin(timebegin)
    //或者 timeLast != pool.connection()....desc 的results[0].time;
    if((timecur.getMinutes() - timebegin.getMinutes())){
        latestConn = timebegin;//不知道可否如此表述
        console.log("\n时间已到，开始存入数据！");
        pool.getConnection(function (err, conn) {
            if (err) console.log('fail in connection: 167---' + err);
            else {
                //console.log('success in connection');
                var sql = [getMin(timecur),store,doornum];//暂定为　江东店，１号门通道
                conn.query("select * from dateByMinutes where time=? and storeName=? and doorNum=?",sql, function (err, results /*fieldss*/) {
                    if (err) console.log('error in find words');
                    else {
                        if (0 == results.length)
                        {
                            var id;
                            conn.query("select * from dateByMinutes order by iddateByMinutes desc limit 1",function(err,result){
                                if(err)
                                    console("错误：76");
                                else {
                                    id = result[0].iddateByMinutes;
                                    console.log("获取到id:"+id);
                                    //自增的可以传入空值
                                    var newsql = ['',getMin(timecur),store,doornum,count,timecur.getDay()];
                                    conn.query("INSERT INTO dateByMinutes (iddateByMinutes,time,storeName,doorNum,flow) values (?,?,?,?,?)",newsql,function(err,results){
                                        if(err)
                                            console.log("创建新的行时出错：83");
                                        //出错可能时单引号问题
                                        else count=0;
                                    });
                                }
                            });

                        }
                        else{
                            //var id = results[0].id_passage;
                            var newsql = [results[0].flow+count,results[0].iddateByMinutes];
                            console.log("获取到id:"+results[0].iddateByMinutes);
                            conn.query("UPDATE dateByMinutes SET flow=? WHERE iddateByMinutes=?",newsql,function(err,result){
                                if(err)
                                    console.log("更新行时出错：294");
                                else
                                {
                                    count=0;
                                    console.log("更新成功：294");
                                }
                            });
                        }
                    }
                    conn.release();
                });
            }
        });



    }
    else {
        console.log('当前count值为：'+count)
        //count=count+1;
    }
    //console.log("存储一次数据的时间是："+(new Date()-count_time_begin));
}


//后期可以省掉不用
MqttServer.on('ready', function(){
    console.log('mqtt server is running on ready...');
});

//连接的时候打印出连接的客户端ID号
MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

MqttServer.on('published', function (packet, client) {
    //console.log("Published :=", packet);
    console.log('＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾＾')
    console.log("Published :=", packet.payload.toString());
    var door = packet.payload.toString();
    console.log('当前时间为：'+getMin(new Date()));
    //console.log('当前的门通道号为：'+getNum(door));
    //console.log("通道传过来数据，服务器接手！");
    var numTemp = getNum(door);
    getsql(numTemp,upLoadJudgement_min);//总是出现在语句执行玩之后???头疼啊
    //console.log('temp:'+temp);
    //console.log('获取的门店等信息: '+temp);
    //getsql(3,function(date1,date2){
    //    console.log('查询出来的门禁信息:'+date1 +'点撒了看见'+ date2)
    //})
    if(!counts[getNum(door)])/*专门用于给counts数组赋初值，指定初值*/
        counts[getNum(door)] = 0 ;
    CheckDaily(new Date());
    console.log('对应的count值为：'+(++counts[getNum(door)]));
    //upLoadJudgement(latestConn);
    //upLoadJudgement_min(latestConn);
    console.log('-------------------------------------')
    console.log('今天是本年第'+getweek(new Date())+'周')
});


//以下二个事件的含义???
MqttServer.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", client.packet);
    var date = new Date();
    console.log(date)
});

MqttServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed := ', topic);
    var date = new Date();
    console.log(date)
});

//以下二个事件的关系???
MqttServer.on('clientDisconnecting', function (client) {
    console.log('clientDisconnecting := ', client.id);
    //断开连接－－将数据存进数据库，并清零
    //改写upLoadJudgement函数
});

MqttServer.on('clientDisconnected', function (client) {
    console.log('Client Disconnected     := ', client.id);
    //断开连接－－将数据存进数据库，并清零
    //改写upLoadJudgement函数
    var date = new Date();
    console.log(date)
});


/*
＊前
var MqttServer = new mosca.Server({
    port: 8000
});

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

/!**
 * 监听MQTT主题消息
 * console.log(packet);
 **!/
MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    switch(topic){
        case 'pubMsg':
            console.log('message-publish', packet.payload.toString());
            //MQTT转发主题消息
            MqttServer.publish({topic: 'other', payload: 'sssss'});
            //发送消息NODEJS
            console.log('HD: '+ YHSocketMap.get('1000'));
            //发送socket.io消息
            //io.sockets.socket(YHSocketMap.get('1000')).emit('subState', packet);
            break;
        case 'other':
            console.log('message-123', packet.payload.toString());
            break;
    }
});

MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});
*/



//var ascoltatore = {
//    //using ascoltatore
//    type: 'mongo',
//    url: 'mongodb://localhost:27017/mqtt',
//    pubsubCollection: 'ascoltatori',
//    mongo: {}
//};
//
//var moscaSettings = {
//    port: 1883,
//    backend: ascoltatore,
//    persistence: {
//        factory: mosca.persistence.Mongo,
//        url: 'mongodb://localhost:27017/mqtt'
//    }
//};
//
//var server = new mosca.Server(moscaSettings);
//server.on('ready', setup);
//
//server.on('clientConnected', function(client) {
//    console.log('client connected', client.id);
//});
//
//// fired when a message is received
//server.on('published', function(packet, client) {
//    console.log('Published', packet.payload);
//});
//
//// fired when the mqtt server is ready
//function setup() {
//    console.log('Mosca server is up and running')
//}

module.exports = router;