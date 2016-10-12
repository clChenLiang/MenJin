/**
 * Created by rf-lab on 15-11-12.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'PassageDatabase',
    user:'root',
    password:'root',
    allowMultiQueries:true
});


router.post('/',function(req,res,next) {
    console.log("admin 端已经启动");

    //查询原来的店铺情况
    //返回参数:表-- store_door
    /*resultdate ={
     *   "storeName":[],
     *   "Passage":[]
     *}
     */

    //传入参数:
    if (req.body.action == 'oldlist') {
        var resultdate;
        var storeName = new Array();
        var Passage = new Array();
        pool.getConnection(function (err, conn) {
            if (err) console.log("error in admin.js at line 31")
            else {
                conn.query("select * from store_door", function (err, results) {
                    if (err) console.log("oldlist:读取门店时错误")
                    else {
                        for (result in results) {
                            storeName.push(results[result].storeName);
                            Passage.push(results[result].doorNum);
                            //console.log(result+'\n'+result.storeName+'\n'+result.doorNum)
                        }
                        resultdate = {
                            "storeName": storeName,
                            "Passage": Passage
                        }
                        res.send(resultdate);
                        console.log(resultdate)
                        res.end();
                    }
                })
            }
            conn.release();
        })

    }

    //新更新,添加的门店信息
    //传入参数:
    //返回参数:
    if (req.body.action == 'updateDoor') {
        console.log("admin_update请求!")
        //1.增加,
        //2.删减
        //    门店的删减
        //    门店通道的删减
        console.log(req.body.params)
        var params = JSON.parse(req.body.params);
        var resultdate = {"success": false}

        var sql = ['', params.storeName, params.doorNum];
        if (sql[1] && sql[2]) {
            pool.getConnection(function (err, conn) {
                if (err) {
                    res.send(resultdate);
                    res.end();
                    console.log("error in 73")
                }
                else {
                    console.log(sql);
                    //should to yanzheng mendian ming de hefaxing
                    /*
                     * chongming logic
                     *
                     * */
                    conn.query("INSERT INTO store_door (idstore_door,storeName,doorNum) VALUES (?,?,?)", sql, function (err, results) {
                        if (err) {
                            res.send(resultdate);
                            res.end();
                            console.log("updateDoor error in line 76  :  " + err)
                        }
                        else {
                            var resul = {"success": true}
                            res.send(resul);
                            res.end();
                        }

                    })
                }
                conn.release();
            })
        }
        else {
            var resul = {"success": false}
            res.send(resul);
            res.end();
            console.log("updateDoor params youcuo");
        }
    }


    //"login" logic
    if (req.body.action == "login") {
        console.log("admin_login_ access successily!")
        var params = JSON.parse(req.body.params)
        console.log(params.user + params.password)
        pool.getConnection(function (err, conn) {
            if (err) console.log("admin_login_mysq res.send(resultdate);lconnection err at 109: " + err)
            else {
                var sql = [params.user, params.password];
                console.log(sql.toString())
                conn.query("select * from user where name=? and password=?", sql, function (err, results) {
                    if (err || (!results.length)) {
                        var resuldata = {"success": false}
                        console.log(resuldata.success + results.length)
                        res.send(resuldata);
                        res.end()
                        var time = new Date();
                        console.log("admin_login_mysqlconnection_query err at 112: " + err + "\n" + time)
                    }
                    else {
                        var resultdata = {
                            "success": true,
                            "user": results[0].privilege
                        }
                        res.send(resultdata)
                        console.log(resultdata.user)
                        res.end()
                    }
                })
            }
            conn.release();
        });
    }


    //"addDoor" logic ,maybe conflict with the "updateDoor" logic of the functional overlap
    if (req.body.action == "delDoor") {

        //print the params send up by qiantai;
        console.log("delDoor request call on\n\n\n" + req.body.params);
        var params = JSON.parse(req.body.params);
        //console.log(params.delete)
        var sqls = params.delete;
        console.log(sqls)
        //insert the new setting message--the new door,to the mysql database
        //var sql =[];//create the search words

        pool.getConnection(function (err, conn) {
            if (err) console.log("error in the line 92, in get connections with the mysql");
            else {

                for (var i = 0; i < sqls.length; i++) {
                    var sql = [sqls[i]];
                    //console(i+'');//!!!???
                    conn.query("delete from store_door where storeName =?", sql, function (err, results) {
                        if (err) {
                            console.log("delete error in line 115" + err)
                        }
                        else {
                            console.log("success is :  " + results)
                        }
                    })
                    if (i == sqls.length - 1)
                        conn.release();

                }
                //xunhuan shuzu shuchu

                /* conn.query("delete from store_door where stoerName =?",sql,function(err,results){
                 if(err) {
                 console.log("delete error in line 115");
                 var resul = {"success":false}
                 res.send(resul);
                 res.end();
                 }
                 else{
                 var resul = {"success":true}
                 res.send(resul);
                 res.end();
                 }
                 conn.release();
                 })*/

            }
            //conn.release();
            //hui shanchu zai xunhuan li de conn
        })
    }


    /*
     * renyuan peizhi chaxun !
     * */
    if (req.body.action == "querypeople") {
        console.log('querry people connectin right!')

        var stroeName = ['JiangDong', 'YongJiang', 'DiyiP', 'SosoStore']
        var aligen = ['LiFF', 'WangEr', 'LiuSi', 'SoBo']
        var resuledata = {
            "storeName": stroeName,
            "peopleName": aligen
        };

        pool.getConnection(function (err, conn) {
            if (err) console.log('error in 210-----at querypeople action!\n-------   ' + err)
            else {
                //    at the beginning , query the store to get the exit storename
                //    then , according the list getted to find the aligen

                /*

                 //callback function
                 var callback = function(conn,results,ressend){

                 //dan ge xunhuan dedao peopleName
                 var peopleName = new Array();
                 for(j in results){
                 var sql_each = [results[i].storeName];
                 //sql_each.push(results[i].storeName)
                 conn.query("select name from user where store_belong=? and isManager=1",sql_each,function(err,manager_result){
                 if (err)console.log("error at line 236 and "+j+":\n-------- "+err)
                 else {
                 peopleName[j] = manager_result[0].name;
                 console.log("\n\n\n"+peopleName[j]+"\n\n\n")
                 }
                 })
                 }

                 ressend(results,peopleName)
                 }

                 //get the list of storeName
                 conn.query("select storeName from store_door",function(err,results/!*,callback*!/){         //there the callback function is the defined in the line 227?
                 //maybe delete this callback params can be useful
                 //or use the named function
                 if(err || (!results.length)) console.log('error at 216 line :------\n------- '+err);
                 else{
                 var sql = []
                 for( i in results){
                 sql[i] = results[i].storeName;
                 }
                 console.log('The select from the query is : \n------',results.toString())////
                 //do something according the list of storeName
                 //?callback function usage in here maybe wrong
                 callback(conn,sql,function(results,peopleNames){
                 var resuledata = {
                 "storeName":results,
                 "peopleName":peopleNames
                 };
                 res.send(resuledata);
                 res.end();
                 })
                 }
                 });
                 //res.send()
                 }
                 });
                 */
                //to be simple
                var cqf = function (err, results, callback) {
                    if (err || (!results.length)) console.log("error at line 275" + err)
                    else {
                        var list = [];
                        for (i in results) {
                            list[i] = results[i].name;
                        }
                    }
                    callback(list)
                }
                conn.query("select * from user where isManager = 1", function (err, results) {
                    if (err || (!results.length)) console.log("error at line 275" + err)
                    else {
                        var people_list = [];
                        var store_list = [];
                        for (i in results) {
                            people_list.push( results[i].name);
                            store_list.push(results[i].store_belong)
                        }
                        var resuledata = {
                            "storeName": store_list,
                            "peopleName": people_list
                        };
                        res.send(resuledata);
                        res.end();
                    }
                })


                //res.send(resuledata);
                //console.log(resuledata.toString())//old question, how to print the Json'words status. Json.stirngfy()
                //res.end();
            }

            conn.release();
            /*
             //更新用户 密码
             if(req.body.action == 'updateUser'){
             //
             }
             */
        })

    }


})
























module.exports = router;