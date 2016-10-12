define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.backBtnClick = function() {
		justep.Portal.closeWindow();
	};
	
	Model.prototype.getImageUrl = function(row){
		return require.toUrl(row.val('imgSrc'));
	};
	
	Model.prototype.open = function(event) {
		var row = event.bindingContext.$object;
		var url = require.toUrl(row.val("imgUrl"));
		justep.Portal.openWindow(url);
	};

	return Model;
});