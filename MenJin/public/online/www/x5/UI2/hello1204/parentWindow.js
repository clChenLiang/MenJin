define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");

	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button3Click = function(event){
//         var data;
		var me=this;
	    var user=this.comp("input1").val();
	    var password=this.comp("password1").val();
	    var success=function(resultData){
	         if(resultData.success){
           justep.Util.hint("登录成功！");
//	         window.open({data:'123'});
	         me.comp('windowDialog1').open({data:user});
	         }
	         else{
	         justep.Util.hint("登录失败，请重新输入！");
	       }
	     }; 
	   var params={
	   // "userData":{user:user,password:password}
	   "user":user,
	   "password":password
	   };
	
	   Baas.sendRequest({
		   "url" : "/echart",
	      "action":"login",
	      "params":params,
	      "success":success,
	      "error" :function(msg){
						Baas.showError(msg);
						}
	   });
		
		//this.comp('windowDialog1').open({data:'welcome !'});
	};
//Model.prototype.saveUserBtnClick = function(event) {
//		var userData = this.comp("userData");
//		var params = {
//			"userData" : userData.toJson(true)
//		};
//		console.log(params);
//		var success = function(resultData) {
//			userData.applyUpdates();
//			justep.Util.hint("用户信息保存成功");
//		};
//		Baas.sendRequest({
//			"url" : "/takeout",
//			"action" : "save",
//			"params" : params,
//			"success" : success
//		});
//	};
	
	Model.prototype.modelLoad = function(event){
          $('body').focus();
          var me=this;
          $('body').bind('keydown',function(event){
                 if(event.keyCode==13){
//                     alert('调用trigger的onclick事件');
                        me.getElementByXid('button3').click();
//                        var self = this;
//		                 self.button3Click();            
             } 
         });

	};
	
	return Model;
});