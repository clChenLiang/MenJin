define(function(require){
	var $ = require("jquery");
	var Object = require("$UI/system/lib/base/object");
	require("css!./loadingBar").load();
	
	var LoadingBar = Object.extend({
		constructor: function(){
			var self = this;
			$("<div id='x-default-loadingbar' loadingnum = '0' class='waiting'><dt/><dd/></div>").appendTo('body');
			this.$loadingBarNode = $("#x-default-loadingbar");
		    $(document).ajaxStart(function() {
		    	self.start();
		    });
		    $(document).ajaxStop(function() {
		    	self.stop();
		    });
		    $(document).ajaxError(function() {
		    	self.stop();
		    });
		},
		start : function(){
			var self = this;
			var oldNum = parseInt(self.$loadingBarNode.attr('loadingnum'));
    		self.$loadingBarNode.attr('loadingnum',oldNum + 1);
			self.$loadingBarNode.fadeIn(200,function(){
				if(oldNum === 0){
	    			self.$loadingBarNode.width((60 + Math.random() * 30) + "%");
	    		}
	        });
		},
		stop : function(){
			var self = this;
			setTimeout(function(){
				var oldNum = parseInt(self.$loadingBarNode.attr('loadingnum'));
	    		self.$loadingBarNode.attr('loadingnum',oldNum - 1);
	    		if(oldNum <= 1){
		    		self.$loadingBarNode.width("101%").fadeOut(1000, function() {
		    			self.$loadingBarNode.width("1%");
			        });
		    	}
			},1000);
		}
	});
	return new LoadingBar();
});