define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");
//	var quanData;
	var Model = function(){
		this.callParent();
//		this.quanData="";
	};
var quanData;
var range;
var flag=true;
	Model.prototype.button21Click = function(event){
		this.getElementByXid('button1').style.display="block"; 
          var success = function(resultData) {
          quanData=resultData;          
          if(flag){
          for(var i=0;i<quanData.storeName.length;i++){
                var tabObj=document.getElementById("myTab");//获取添加数据的表格
                var rowsNum = tabObj.rows.length;  //获取当前行数       
//                var colsNum=tabObj.rows[rowsNum-1].cells.length;//获取行的列数
                var myNewRow = tabObj.insertRow(rowsNum);//插入新行
                var newTdObj1=myNewRow.insertCell(0);
                newTdObj1.innerHTML="<input type='checkbox' style='width:40px;height:20px;margin-left:35px;' name='chkArr' id='chkArr'"+rowsNum+" style='width:90px' /></br></br>";
                var newTdObj2=myNewRow.insertCell(1);
                newTdObj2.innerHTML="<input type='text' name='nodecode'  id='nodename'"+rowsNum+" style='width:110px;border-style:none;text-align:center;color:#1592FF;font-size:x-large;' value='"+quanData.storeName[i]+"'/></br></br>";
                var newTdObj3=myNewRow.insertCell(2);
                newTdObj3.innerHTML="<input type='text' name='nodename'  id='nodecode'"+rowsNum+" style='width:80px;border-style:none;text-align:center;color:#1592FF;font-size:x-large;' value='"+quanData.Passage[i]+"'/></br></br>";
            }
            flag=false;
          }
		};
	
		  var params = {
		   "query_exist":"query_exist"
		};
		Baas.sendRequest({
			"url" : "/admin",
			"action" : "oldlist",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	};
//	Model.prototype.button12Click = function(event){
//	    window.location.reload();
//	   var manage=this.getElementByXid('button1');
//	 	manage.style.display="none";
//       var test=document.getElementById("myTab");
////	   var test01=this.getElementByXid('col11');
//		test.style.display="none";
////		test01.innerHTML=" ";
//		var me=this;
//         function add(text){
//          text +="<br/><br/><input type='text' size='10' placeholder='在此输入' style='height:37px;width:116px;text-align:center'>&nbsp;&nbsp;";
//          me.getElementByXid("col12").innerHTML = text;
//          me.getElementByXid("col11").innerHTML = text;
//            }
//		var jia=this.getElementByXid('col12').innerHTML;	
//        add(jia);        
//	};
	Model.prototype.modelLoad = function(event){
	  var manage=this.getElementByXid('button1');   
		manage.style.display="none";
	};
	Model.prototype.windowReceiver1Receive = function(event){
       if(event.data==1){
	    this.getElementByXid('row14').style.display="none";
	    this.getElementByXid('row15').style.display="none";
	   }else{
//	    this.getElementByXid('row14').style.display="block";
//	    this.getElementByXid('row15').style.display="block";
	 }
	};
	Model.prototype.button12Click = function(event){
	
	};
	Model.prototype.button20Click = function(event){
		this.getElementByXid('button21').click();
		var arr1=new Array();
        var arr2=new Array();
        function removeRow(){
            var chkObj=document.getElementsByName("chkArr");
            var tabObj=document.getElementById("myTab");
            for(var k=0,l=0;k<chkObj.length;k++,l++){
                if(chkObj[k].checked){
                    tabObj.deleteRow(k+1);
                    k=k-1;
                   arr1.push(l) ;
                }
            }       
        }   
        removeRow();
        console.log(arr1);  
        for(var i=0;i<arr1.length;i++){
        arr2.push(quanData.storeName[arr1[i]]);
        }
        console.log(arr2);
        var success = function(resultData) {
        console.log("发送成功");
           };
        var params = {
		    "delete":arr2,
		};
		Baas.sendRequest({
			"url" : "/admin",
			"action" : "delDoor",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	};
	Model.prototype.button15Click = function(event){
	  var storeName=this.getElementByXid("input1").value;
	  var passage=this.getElementByXid("input2").value;
	  if(storeName===""){
		  alert("请先输入店名");
		  return false;
		  }
	 else if(passage===""){
		  alert("请输入通道数量");
		  }
	var success = function(resultData) {
		if(resultData.success){
		  alert("提交成功！");
		  }else{
		      alert("抱歉，系统繁忙，请稍后再试！");
		  }
			};
	 var params = {
		   "storeName":storeName,
		   "doorNum":passage
		};
	Baas.sendRequest({
			"url" : "/admin",
			"action" : "updateDoor",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	};
	return Model;
});