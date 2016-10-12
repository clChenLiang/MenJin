/**
 * Created by rf-lab on 15-9-11.
 */
var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var router = express.Router();

/*var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'MenJin',
    user:'root',
    password:'root'
});*/

//session测试
var username;


//保存历史信息测试
/*
* 1.使用全局变量--多用户端是否存在覆盖问题
* 2.每次上传user属性
* 3.建立表,贮存用户信息,session*/
var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'PassageDatabase',
    user:'root',
    password:'root'
});

var getDay = function(date){
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

//通过IP获取用户名
var getUser = function(req,pool){
    pool.getConnection(function(err,conn){
        if(err) console.log("getuser出错:40")
        else{
            //用ip获取用户名,识别用户
            conn.query("select * from user where ip=?",req.ip,function(err,results){
                if(err) console.log('getuser的ip时出错:43')
                else{
                    if(!results[0])
                    {
                        var sql = [req.ip,]
                        conn.query("update user set ip=? where name=?",sql,function(err,results){
                            if(err || (!results)){
                                console.log("update getuser出错 出错:50")
                            }
                        })
                    }

                    else username = results[0].name;
                }
            });
        }
        conn.release();
    });
}


router.post('/',function(req,res,next){

    console.log('client has a connection');
    console.log("\N用户的sessionID是:"+req.sessionID+"\n用户的ip为:"+req.ip);
    console.log("req为"+req.toString())

    if(req.body.action == 'login'){
        console.log('用户登陆请求．．．．．．．．．．．');

        pool.getConnection(function (err, conn) {
            var params = JSON.parse(req.body.params);//有无参数
            console.log('登陆请求的参数:+'+JSON.stringify(params));
            if (err)
            {
                console.log('fail in connection: ' + err);
                res.end();
            }
            else {
                username = params.user;
                console.log('记录下的参数:+'+username);
                var sql_ip = [req.ip,username]
                //记下登录的IP
                conn.query("update user set ip=? where name=?",sql_ip,function(err,results){
                    if(err || (!results)){
                        console.log("update getuser出错 出错:87"+err+username)
                    }else console.log('update getuser成功88')
                });
                var sql = [params.user,params.password];
                console.log(sql);
                conn.query("select * from user where name=? and password=?",sql, function (err, results /*fieldss*/) {
                    if (err) console.log('error in find words');
                    else {
                        var success;
                        if (0 == results.length) {
                            success = false;
                            //res.send();//失败返回信息
                        }
                        else {
                            success = true;
                            //返回上一次状态信息
                        }
                    }
                    conn.release();

                    var resultdata = {
                        "success":success
                    }
                    res.send(resultdata);
                    res.end();
                });
            }
        });
    }


    getUser(req,pool);
    console.log("username为:121"+username)
    if(req.body.action == 'query_one') {
        pool.getConnection(function (err, conn) {
            var params = JSON.parse(req.body.params);
            console.log('params获取的参数：' + params.store);
            console.log('登陆的用户是'+username);
            if (err) console.log('fail in connection: ' + err);
            else {

                //console.log('success in connection:70');
                //从数据库里读取数据 ,获取resultData

                //改为当天的逻辑会查不到数据的!!!
                var sql_one=[params,req.body.user];//用户
                console.log('sql_one:'+sql_one);
                var findword = [params.store,'2015-09-12'/*getDay(new Date())*/];
                //需要更改一下逻辑,增设数据表
                //增加查询条件,精确数据
                //getWeek()与week比较
                //存放传入参数
                var sql_putin = [findword.toString(),username];
                conn.query("update user set params_one=? where name=? ",sql_putin,function(err,result){
                    if(err) console.log('error in query store : 101+'+err);
                    else console.log('参数成功存入数据库!--102');
                });
                conn.query("select * from PassageFlowData where storeName=? and date=?", findword, function (err, results /*fieldss*/) {
                    if (err) console.log('error in find words');
                    else {
                        var resultData = new Array();
                        if (results.length == 0)
                            console.log('查询无结果!');
                        else {
                            console.log(results.length+'个被查询到--91\n'+results.toString());
                            //results.toString()将数组字符串化
                            for (var i = 0; i < results.length; i++) {
                                var temp = {
                                    Passage: results[i].doorNum,
                                    todayData: results[i].stream,
                                    Number: results[i].stream,//换新表
                                    Weeks: 0//等待修改
                                }
                                resultData.push(temp);
                            }
                            //console.log("查询的结果" +i+ results[i].toString());
                        }
                    }
                    conn.release();
                    res.send(resultData);
                    res.end();
                    console.log(findword);
                });
            }
        })
    }

    //query_store
    if(req.body.action == 'query_store') {
        var session = req.session;
        console.log('获取到的session为:'+JSON.stringify(req.session));//怎么
        //console.log('session的ID:'+session.getId());
        //待从数据库获取
        pool.getConnection(function (err, conn) {

            var params = JSON.parse(req.body.params);//有无参数
            if (err) console.log('fail in connection: ' + err);
            else {
                console.log('success in connection'+JSON.stringify(params));//一定要记住JSON与STRING之间的转化函数
                //存放查询参数入库 user
//username 从session里获取信息后再放入 user_login 里匹配出 username

                //delete 2016-7-18
                //var sql_putin = [JSON.stringify(params),"高研院"];
                //conn.query("update user set params_one=? where name=? ",sql_putin,function(err,result){
                //    if(err) console.log('error in query store : 149+'+err);
                //});
                conn.query("select * from store_door", function (err, results /*fieldss*/) {
                    if (err) console.log('error in find words 211');
                    else {
                        console.log('right in find words 213');
                        if (0 == results.length)
                            console.log('查询店铺信息为空！');
                        else {
                            var rows = new Array();
                            for (var i = 0; i < results.length; i++) {
                                rows[i] = {
                                    "StoreName": {"value": results[i].storeName},
                                    "Passage": {"value": results[i].doorNum}
                                }//可能需要转化成字符串
                            }
                        }
                        conn.release();
                        console.log("传回去的历史参数911:");
                        console.log("传回去的历史参数2018:"+JSON.stringify(rows));
                        //下面这一块应该严格用回调写
                        var resultStore = {
                            "@type": "table",
                            "rows": rows,
                            "userdata": {
                                "relationAlias": "StoreName,Passage",
                                "relationTypes": "String,String"
                                //"sys.count": 21,
                            }
                        };
                        var resultData = {"one":resultStore,"two":"江北店"}
                        res.send(resultData);
                        //res.send(resultStore);
                        res.end();

                    }
                });
            }
        });
    }

    //默认历史记录
    //前台用 data 组件加载的历史记录
    if(req.body.action == 'query_one_default') {
        //待从数据库获取
        var params = JSON.parse(req.body.params);//有无参数
        console.log('query_one_default传上来的参数:'+JSON.stringify(params));
        var rows;
        console.log('query_one_default请求开始:186')
        pool.getConnection(function (err, conn) {
            if (err) console.log('fail in connection: 186' + err);
            else {
                //2016-7-18
                conn.query("select * from user where name=?",username, function (err, results) {
                    if (err) console.log('error in find words+189');
                    else {
                        console.log('right in find words+189');
                        if (0 == results.length)
                            console.log('查询店铺信息为空！+189');
                        else {
                            var rows_temp = results[0].params_one;
                            console.log('从数据库中转换回来的数据:'+rows_temp);
                            var rows_array=rows_temp.split(',');
                            var rows = new Array();
                            rows[0] = {
                                "firstValue": {"value": rows_array[0]},
                                "firstLabel": {"value": rows_array[1]}
                            }
                        }
                        conn.release();
                        console.log("传回去的历史参数2028:"+JSON.stringify(rows));
                        var resultStore = {
                            "@type": "table",
                            "rows": rows,
                            "userdata": {
                                "relationAlias": "firstValue,firstLabel",
                                "relationTypes": "String,String"
                                //"sys.count": 21,
                            }
                        };

                        res.send(resultStore);
                        res.end();
                    }
                });
            }
        });
    }
    //  query_two,the second page

    //返回页面二的历史值
    if(req.body.action == 'query_two_default'){
        //从数据库中得到历史数据
        pool.getConnection(function(err,conn){
            if(err) console.log("错误241");
            else{
                conn.query("select * from user where name=?",username,function(err,result){
                    if(err) console.log("错误244");
                    else{
                        console.log("query_two传回的历史记录为:"+result[0].params_two);
                        //对params_two 进行肢解
                        var temp = result[0].params_two;
                        var rows_two = temp.split(',');
                    }
                    res.send(rows_two);res.end();
                    conn.release();
                })//username的问题 用户
            }
        });
    }

    //待删
    if(req.body.action == 'query_test') {
        //待从数据库获取
        var params = JSON.parse(req.body.params);//有无参数
        console.log('query_test传上来的参数:'+JSON.stringify(params));
        var rows;
        console.log('query_test请求开始:188')
        pool.getConnection(function (err, conn) {
            if (err) console.log('fail in connection: 186' + err);
            else {
                var rows = new Array();
                rows[0] = {
                                "fSvalue": {"value": /*rows_array[0]*/"test"},
                                "fSlabel": {"value": /*rows_array[1]*/"测试"}
                            }
                rows[1] = {
                    "fSvalue": {"value": /*rows_array[0]*/"orange"},
                    "fSlabel": {"value": /*rows_array[1]*/"橙"}
                }
                rows[2] = {
                    "fSvalue": {"value": /*rows_array[0]*/"yellow"},
                    "fSlabel": {"value": /*rows_array[1]*/"黄"}
                }
                rows[3] = {
                    "fSvalue": {"value": /*rows_array[0]*/"green"},
                    "fSlabel": {"value": /*rows_array[1]*/"绿"}
                }
                conn.release();
                        console.log("传回去的历史参数2082:"+JSON.stringify(rows));
                        var resultStore = {
                            "@type": "table",
                            "rows": rows,
                            "userdata": {
                                "relationAlias": "fSvalue,fSlabel",
                                "relationTypes": "String,String"
                                //"sys.count": 21,
                            }
                        };
                        var resultedata={"one":resultStore,"two":'黄'}
                        res.send(resultedata);
                        res.end();
                    }
                //conn.query("select * from user where name=?",username, function (err, results) {
                //    if (err) console.log('error in find words+189');
                //    else {
                //        console.log('right in find words+189');
                //        if (0 == results.length)
                //            console.log('查询店铺信息为空！+189');
                //        else {
                //            var rows_temp = results[0].params_one;
                //            console.log('从数据库中转换回来的数据:'+rows_temp);
                //            var rows_array=rows_temp.split(',');
                //            var rows = new Array();
                //            rows[0] = {
                //                "fSvalue": {"value": /*rows_array[0]*/"red"},
                //                "fSlabel": {"value": /*rows_array[1]*/"红"}
                //            }
                //        }
                //        conn.release();
                //        console.log("传回去的历史参数208:"+JSON.stringify(rows));
                //        var resultStore = {
                //            "@type": "table",
                //            "rows": rows,
                //            "userdata": {
                //                "relationAlias": "fSvalue,fSlabel",
                //                "relationTypes": "String,String"
                //                //"sys.count": 21,
                //            }
                //        };
                //        res.send(resultStore);
                //        res.end();
                //    }
                //});

        });
    }

    if(req.body.action == 'query_two') {
        var params = JSON.parse(req.body.params);
        console.log(req.body.action);
        var resultSelect = new Array();
        console.log('params获取的参数：' + params.store + '\n'+'通道：'+params.passage + '\n'+'日期：'+params.from_Date +''+ params.to_Date +'\n人流量：'+ params.from_Passage +'   '+ params.to_Passage);
        pool.getConnection(function (err, conn){
            if(err)
            {
                console.log('连接错误！'+err);
                res.end();
            }
            else{
                console.log('连接成功！');
                var data1 = [params.store,params.passage,params.from_Passage,params.to_Passage,params.from_Date,params.to_Date];
                //
                var sql_putin = [data1.toString(),username];
                conn.query("update user set params_two=? where name=? ",sql_putin,function(err,result){
                    if(err) console.log('error in query store : 240+'+err);
                    else console.log('参数成功存入数据库!--241');
                });
                conn.query("select * from PassageFlowData where storeName=? and doorNum=? and stream between ? and ? and date between ? and ?",data1,function (err, results /*fieldss*/){
                        if (err) console.log('查询语句有问题');
                        else {
                            console.log(results.length+'个结果被查询到');
                            for(var i=0;i<results.length;i++)
                                {
                                    resultSelect.push({Passage:results[i].doorNum,Date:results[i].date,Number:results[i].stream,Weeks:results[i].weeks});
                                    console.log(resultSelect[i]);
                                }
                            res.send(resultSelect);
                            console.log(resultSelect)
                            res.end();
                        }
                    });
            }
            conn.release();
        })

        }

    //  query_three,the third page
    if(req.body.action == 'query_three') {
        var params = JSON.parse(req.body.params);
        console.log(req.body.action);
        console.log("第三页有连接！");
        var resultTable;
        var x_ = new Array();
        var y_ = new Array();
        console.log('params获取的参数：' + params.store + params.passage + params.year + params.month );
        pool.getConnection(function (err, conn){
            if(err){
                console.log('第三页连接错误!'+err);
                res.end();
            }
            else{
                console.log('第三页连接成功!');
                var date_begin = params.year+'-'+params.month+'-01';
                var date_end = params.year+'-'+params.month+'-31';
                var data2 =[params.store , params.passage , date_begin , date_end];
                var sql_putin = [data2.toString(),username];
                conn.query("update user set params_three=? where name=? ",sql_putin,function(err,result){
                    if(err) console.log('error in query store : 101+'+err);
                    else console.log('参数成功存入数据库!--102');
                });
                conn.query("select * from  PassageFlowData where storeName =? and doorNum =? and date between ? and ? ORDER BY date desc",data2,function(err,results){
                    //降序排列
                    if (err) {
                        console.log('查询语句有问题!');
                        res.end();
                    }
                    else{
                        console.log(results.length+'个结果被查询到!');
                        for(var i=results.length-1;i>=0/*31*/;i--)
                        {
                            y_.push(/*i+100*/results[i].stream);
                            //x_.push( results[i].date.getDate()/*i*/);
                            x_.push( results[i].date);
                            //console.log(resultTable[i]);
                        }
                        resultTable = {x:x_,y:y_};
                        console.log(resultTable)
                        res.send(resultTable);
                        res.end();

                    }

                });
                conn.release();
            }


        });



    }

    if(req.body.action == 'query_time'){
        var params = JSON.parse(req.body.params);
        console.log('传入的字符串:'+params.store+'  '+params.time+'   '+params.passage+'   '+params.date);
        var store=params.store;
        var passage = params.passage;
        var date = params.date;
        var minutes = params.time;

        if(Number(minutes)<10)
            minutes='0'+minutes;

        var min_begin = date+' '+minutes+':'+'00';
        var min_end = date+' '+minutes+':'+'59';

        //生成查询数组sql
        pool.getConnection(function (err, conn) {
            if (err) console.log('fail in connection: 265' + err);
            else {
                console.log('success in connection');
                var sql = [store,passage,min_begin,min_end];

                var sql_putin = [sql.toString(),username];
                conn.query("update user set params_time=? where name=? ",sql_putin,function(err,result){
                    if(err) console.log('error in query store : 351+'+err);
                    else console.log('参数成功存入数据库!--352');
                });
                conn.query("select * from dateByMinutes where storeName=? and doorNum=? and time between ? and ? order by time desc", sql, function (err, results /*fieldss*/) {
                    if (err) console.log('error in find words:277');
                    else {
                        console.log('right in find words');
                        var resultData = new Array();
                        if (results.length == 0)
                            console.log('查询无结果!');
                        else {

                                var x_ = new Array();
                                var y_ = new Array();
                                console.log(results.length+'个结果被查询到!');
                                for(var i=results.length-1;i>=0/*31*/;i--)
                                {
                                    y_.push(/*i+100*/results[i].flow);
                                    x_.push( results[i].time/*i*/);
                                    //console.log(resultTable[i]);
                                }
                                resultTable = {x:x_,y:y_};
                                console.log(resultTable)
                                res.send(resultTable);
                                res.end();


                            //console.log("查询的结果" +i+ results[i].toString());
                        }
                    }
                    conn.release();
                });
                /*  connection.end(function(err){
                 if(err) console.log('fail in disconnection ');
                 else{
                 console.log('success in disconnection');
                 }
                 })*/
            }
        })
        //连接数据库
    }
})




module.exports = router;