define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button1Click = function(event){
		var name=this.comp('input1').val();
		this.comp('output1').set({value:'hello:'+name});
	};

	return Model;
});