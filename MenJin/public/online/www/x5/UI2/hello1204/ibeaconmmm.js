define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!com.unarin.cordova.beacon");
	var beacon = navigator.beacon;
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button2Click = function(event){
		var name=this.comp('input1').val();
		this.comp('output2').set({value:'hello'+name});
	};
	
	var logToDom = function (message) {
	alert(message);
		};

	return Model;
});