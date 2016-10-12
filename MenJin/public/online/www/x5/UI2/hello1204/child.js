define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");
	var Model = function(){
		this.callParent();
	};
    var test=document.getElementById('col9');

         function add(text){
          text +="<input type='text' size='10' style='height:37px;width:116px'>&nbsp;&nbsp;<br/><br/>";
          document.getElementById("col40").innerHTML = text;
          document.getElementById("col39").innerHTML = text;
            }
	Model.prototype.button12Click = function(event){
          add(document.getElementById("col40").innerHTML);
	};

	Model.prototype.button15Click = function(event){
		  var storeName=this.getElementByXid('input7').value;
		  var passage=this.getElementByXid('input8').value;
		  if(storeName===""){
		  alert("请先输入店名");}else if(passage===""){
		  alert("请输入通道数量");}
		  var success = function(resultData) {
			console.log(resultData);
			};
		  var params = {
		    "storeName":storeName,
			"passage":passage,
		};
		Baas.sendRequest({
			"url" : "/admin",
			"action" : "change",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	};

	Model.prototype.button21Click = function(event){
	      test.style.display="block";
          var success = function(resultData) {
          var data=resultData;
          console.log(data);
          console.log(data.storeName);
          console.log(data.Passage);
        
          for(var i=0;i<9;i++){
                var tabObj=document.getElementById("myTab");//获取添加数据的表格
                var rowsNum = tabObj.rows.length;  //获取当前行数
                console.log(rowsNum);
                var colsNum=tabObj.rows[rowsNum-1].cells.length;//获取行的列数
                console.log(colsNum);
                var myNewRow = tabObj.insertRow(rowsNum);//插入新行
                var newTdObj1=myNewRow.insertCell(0);
                newTdObj1.innerHTML="<input type='checkbox' name='chkArr' id='chkArr'"+rowsNum+" style='width:20px' />";
                var newTdObj2=myNewRow.insertCell(1);
                newTdObj2.innerHTML="<input type='text' name='nodecode' id='nodecode'"+rowsNum+" style='width:60px' value='"+rowsNum+"'/>";
                var newTdObj3=myNewRow.insertCell(2);
                newTdObj3.innerHTML="<input type='text' name='nodename' id='nodename'"+rowsNum+" style='width:80px' value='"+rowsNum+"'/>";
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

	Model.prototype.modelLoad = function(event){
         test.style.display="none";
	};

	return Model;
});