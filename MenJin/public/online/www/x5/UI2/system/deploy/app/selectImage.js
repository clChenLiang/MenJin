define(function(require) {
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;
		var config = this.appEngine.getConfig();
		var self = this;

		this.iconUploader = new Uploader(this.getElementByXid("iconCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadImage.j')
		});
		this.iconUploader.on('onStart', function(event) {
			event.file.data = {
				userID : config.userID,
				filename : "icon.png",
			};
		});
		this.iconUploader.on('onSuccess', function(event) {
			config.newIcon = true;
			self._setImageSrc("iconImage", 'icon.png', true);
		});
		$(this.iconUploader.inputElement).attr("accept", "image/png");

		this.splashPortUploader = new Uploader(this.getElementByXid("splashPortCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadImage.j')
		});
		this.splashPortUploader.on('onStart', function(event) {
			event.file.data = {
				userID : config.userID,
				filename : "splash-port.png",
			};
		});
		this.splashPortUploader.on('onSuccess', function(event) {
			config.newSplashPort = true;
			self._setImageSrc("splashPortImage", 'splash-port.png', true);
		});
		$(this.splashPortUploader.inputElement).attr("accept", "image/png");

		this.splashLandUploader = new Uploader(this.getElementByXid("splashLandCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadImage.j')
		});
		this.splashLandUploader.on('onStart', function(event) {
			event.file.data = {
				userID : config.userID,
				filename : "splash-land.png",
			};
		});
		this.splashLandUploader.on('onSuccess', function(event) {
			config.newSplashLand = true;
			self._setImageSrc("splashLandImage", 'splash-land.png', true);
		});
		$(this.splashLandUploader.inputElement).attr("accept", "image/png");

		this._setImageSrc("iconImage", 'icon.png', false);
		this._setImageSrc("splashPortImage", 'splash-port.png', false);
		this._setImageSrc("splashLandImage", 'splash-land.png', false);
	};

	Model.prototype._setImageSrc = function(xid, filename, newImage) {
		var config = this.appEngine.getConfig();
		var url = '$UI/system/deploy/app/image.j?userID=' + config.userID + '&appName=' + config.appName + '&filename=' + filename + '&newImage=' + newImage + '&edit=' + this.getParent().edit + '&r='
				+ Math.random();
		$(this.getElementByXid(xid)).attr('src', require.toUrl(url));
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择应用图标和欢迎图片';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.nextPage = function(wizard) {
		this.getParent().openPage({
			id : "selectPlugins",
			url : "selectPlugins.w",
			fromId : "selectImage",
		});
	};

	Model.prototype.selectImageBtnChange = function(event) {
		this.getElementByXid("uploadBtn").click();
	};

	Model.prototype.selectImageBtnSelect = function(event) {
		alert('select');
	};

	Model.prototype.howUpdateImageLabelClick = function(event) {
		templateService.openBrowser("http://wex5.com/cn/android-ios-image-guide");
	};

	return Model;
});
