define(function(require) {
	var templateService = require("$UI/system/templates/common/js/templateService");
	var appBuilderVersion = "3.2";

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		var config = this.appEngine.getConfig();
		var compileUINotSupport = config.uiResDirs === "";
		var builderServerNeeded = ("自动选择" != config.plugins) || config.resEncryption || config.sourceMode;
		this.comp("androidCheckbox").val(config.platform && (config.platform.indexOf('android') >= 0));
		this.comp("iosCheckbox").val(config.platform && (config.platform.indexOf('ios') >= 0));
		this.comp("compileUI").val(compileUINotSupport ? false : config.compileUI);
		this.comp("compileUI").set({
			"disabled" : compileUINotSupport
		});
		this.comp("useAppBuilderServer").val(builderServerNeeded ? true : config.useAppBuilderServer);
		this.comp("useAppBuilderServer").set({
			"disabled" : builderServerNeeded
		});
		this.comp("releaseMode").val(config.releaseMode === "release");
		this.comp("appBuilderServer").val(config.appBuilderServer_Global);
		this._refreshAppBuilderServerDiv();
	};

	Model.prototype._refreshAppBuilderServerDiv = function() {
		if (this.comp("useAppBuilderServer").get("checked") === true) {
			$(this.getElementByXid("appBuilderServerDiv")).show();
		} else {
			$(this.getElementByXid("appBuilderServerDiv")).hide();
		}
	};

	Model.prototype.__getRealAppBuilderServer = function(appBuilderServer) {
		if (appBuilderServer.indexOf("http")  !== 0) {
			appBuilderServer = window.location.protocol + "//" + window.location.host + appBuilderServer;
		}
		
		return appBuilderServer;
	};
	
	Model.prototype.__checkAppBuilderServer = function() {
		var sucess;
		var response = $.ajax({
			async : false,
			contentType : 'application/json',
			processData : false,
			type : 'GET',
			url : require.toUrl("$UI/system/deploy/package/test.j?appBuilderServer=" + this.__getRealAppBuilderServer(this.comp("appBuilderServer").get("value"))),
			success : function(result) {
				sucess = true;
			},
			error : function(xhr, status, err) {
				sucess = false;
				if ("parsererror" === status) {
					alert('连接打包服务器成功，但打包服务器版本太老，请升级打包服务器');
				} else {
					alert('连接打包服务器失败，请检查服务地址是否正确');
				}
			}
		}).responseJSON;

		if (sucess && response.version.indexOf(appBuilderVersion) !== 0) {
			alert('打包服务器与Studio支持的版本不匹配。打包服务器版本：' + response.version + '，Studio支持的版本：' + appBuilderVersion);
		}

		response = response ? response : {};
		response.sucess = sucess;
		return response;
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择打包的平台';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};

	Model.prototype.finish = function() {
		var result = this.comp('androidCheckbox').get('checked') || this.comp('iosCheckbox').get('checked');
		if (!result) {
			alert("平台类型不能为空，请至少选择一种平台类型");
		} else {
			var config = this.appEngine.getConfig();
			config.useAppBuilderServer = this.comp("useAppBuilderServer").get("checked") === true;
			config.appBuilderServer = this.comp("appBuilderServer").get("value");

			var appBuilderInfo;
			if (config.useAppBuilderServer) {
				appBuilderInfo = this.__checkAppBuilderServer();
				result = appBuilderInfo.sucess;
			} else {
				appBuilderInfo = {};
				appBuilderInfo.platform = 'android,ios';
			}

			if (result) {
				config.platform = '';
				if (this.comp('androidCheckbox').get('checked')) {
					if (appBuilderInfo.platform.indexOf('android') < 0) {
						alert('打包服务器不支持android平台，请检查服务地址是否正确。连接的打包服务器支持的平台为：' + appBuilderInfo.platform);
						return false;
					}
					
					config.platform = 'android';
				}
				if (this.comp('iosCheckbox').get('checked')) {
					if (appBuilderInfo.platform.indexOf('ios') < 0) {
						alert('打包服务器不支持ios平台，请检查服务地址是否正确。连接的打包服务器支持的平台为：' + appBuilderInfo.platform + "。ios需要mac os x的打包服务器。");
						return false;
					}

					config.platform += config.platform ? ',ios' : 'ios';
				}

				config.compileUI = this.comp("compileUI").get("checked") === true;
				config.releaseMode = (this.comp('releaseMode').get('checked') === true) ? "release" : "debug";
				templateService.setAppBuilderServerUrl(config.appBuilderServer);
				
				config.realAppBuilderServer = this.__getRealAppBuilderServer(config.appBuilderServer);

				this.getParent().openPage({
					id : "waittingDialog",
					url : "waittingDialog.w",
					fromId : "appInfo"
				});
			}
		}

		return result;
	};

	Model.prototype.androidImageClick = function(event) {
		var checkObj = this.comp('androidCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	Model.prototype.iosImageClick = function(event) {
		var checkObj = this.comp('iosCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	Model.prototype.useAppBuilderServerChange = function(event) {
		this._refreshAppBuilderServerDiv();
	};

	Model.prototype.testServerButtonClick = function(event) {
		if (this.__checkAppBuilderServer().sucess) {
			alert('连接成功');
		}
	};

	return Model;
});
