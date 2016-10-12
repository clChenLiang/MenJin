define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button3Click = function(event){
	    var me=this;
	    var user=me.comp("input1").val();
	    var password=me.comp("password1").val();
	    var success=function(resultData){
//         console.log();

	         if(resultData.success){
	         
	       
               justep.Util.hint("登录成功！");
//                 var s='0';
                 console.log(resultData.user); 
	             if(resultData.user===0){
	             me.comp('windowDialog1').open({data:'0'});
	             }else{
	             me.comp('windowDialog2').open({data:'1'});
	             }
//	          this.comp('windowDialog1').open({data:user});
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
//	   console.log(params);
	   Baas.sendRequest({
		   "url" : "/admin",
	      "action":"login",
	      "params":params,
	      "success":success,
	      "error" :function(msg){
						Baas.showError(msg);
						}
	   });
  };

	return Model;
});