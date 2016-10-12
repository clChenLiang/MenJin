define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");
	var Model = function(){
		this.callParent();
	};
	var quanData;
	var flag=true;
	Model.prototype.button1Click = function(event){
       var test03=document.getElementById("myTab");
		test03.style.display="block";
	   var test=this.getElementByXid('col12');
	   var test01=this.getElementByXid('col11');
		test.innerHTML="";
		test01.innerHTML="";
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

	Model.prototype.button3Click = function(event){

	};

	Model.prototype.content2Active = function(event){

	};

	Model.prototype.content4Active = function(event){

	};

	return Model;
});