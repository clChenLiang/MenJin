/**
 * Created by rf-lab on 15-9-25.
 */
var CheckDaily = function(curday){
    console.log('日信息处理开始....')
    var today =getDay(curday);//可能出错
    var time_begin = today + ' 00:00';
    var time_end = today + ' 23:59';
    var count = 0;
    var weeks = getweek(curday);
    pool.getConnection(function (err, conn) {
        if (err) console.log('fail in connection:日信息处理 ' + err);
        else {
            conn.query("select * from doorID", function (err, resultsDoor) {
                if (err) console.log("获取doorID出错:110");
                else {
                    //对通道门 进行遍历
                    for (i = 0; i < resultsDoor.length; i++) {
                        var sql = [resultsDoor[i].store_belonged, resultsDoor[i].numAtStore, time_begin, time_end];
                        //查询数据库中指定 date 的人流量
                        //获取指定通道全天数据数组
                        conn.query("select * from dateByMinutes where storeName=? and doorNum=? and time between ? and ?", sql, function (err, results) {
                            if (err) console.log("日分钟流量查询出错:118,第几个循环:" + i);
                            else {
                                console.log('计算日流量:124')
                                //叠加
                                for (j = 0, count = 0; j < results.length; j++) {
                                    //计算天人流量
                                    count = count + results[i].flow;
                                    //入库
                                    if (j == (results.length-1))//避免异步影响,写在for循环里面
                                    {
                                        var sqlFlow = [today, resultsDoor[i].store_belonged, resultsDoor[i].numAtStore, count, weeks];
                                        conn.query("insert into PassageFlowData values ('',?,?,?,?,?)", function (err, result) {
                                            if (err)console.log('插入数据是出错:133');
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

//判断条件
conn.query("select * from PassageFlowData where date=? and storeName=? and doorName=?",sqlCheck,function(err,resultOfExist){
    if(err) console.log('查询当日表出错:155');
    else{
        if(0==resultOfExist)
        {
            console.log('当天无数据先,存储开始!');

        }
    }
})