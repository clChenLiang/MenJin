/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $=require('jquery'),
		Object = require("$UI/system/lib/base/object"),
		Observable = require("$UI/system/lib/base/observable"),
		URL = require('$UI/system/lib/base/url'),
		Browser = require('$UI/system/lib/base/browser'),
		_history = window.history,
		HashbangParser = require('./hashbangParser'),
		_lastChangeTimeStamp = new Date().getTime();
		
	
	var HashbangToken = "#!",
		StateSeriesSplitToken = "!",
		LeftBarcketToken = "(",
		RightBarcketToken = ")",
		SegmentSplitToken = "/";
	
	function ignoreVLS(url){
		return URL._removeVLS(url);
	};
	
	
	var isSimulator = false;
	try{
		isSimulator = window.parent && window.parent.getOSName;
	}catch(err){
	}
	
	var Router = Object.extend({
		mixin:Observable,
		constructor: function(){
			this.callParent();
			Observable.prototype.constructor.call(this);
			this.interceptLinkHash();
			this.polyfillStateApi();
			this.originUrl = location.href;
			if(!Browser.isWeChat && !isSimulator){
				var ignoreVersionUrl = ignoreVLS(location.pathname +location.search) + location.hash;
				this.publishState({
					isIgnoreVersionPublish:true,
					isReplace:true,
					hashbang:ignoreVersionUrl
				});
			}
			this.subscribeState();
		}
	});
	
	
	Router.prototype.polyfillStateApi = function(){
		if(typeof _history.pushState != 'function'){
			_history.pushState = function(){};
			_history.replaceState = function(){};
		}
	};
		
	Router.prototype.interceptLinkHash = function(){
		var self = this;
		$(document).on('click.routeState','a',function(event){
			var href = $(event.currentTarget).attr('href');
			if(href && href.indexOf('#!') == 0){
				event.preventDefault();
				//debugger;
				var bindingContext = justep.Bind.contextFor(event.target);
				if(bindingContext){
					var $model = bindingContext.$model;
					if($model){
						$model.fireEvent('onRouteStatePublish',{
							hashbang: href,
							isReplace:false
						});
						$model.postMessage({
							type:"routeState",
							newUrl:href
						});
					}
				}
			}else if(href && href == '#'){
				event.preventDefault();
			}
		});
	};
	
	
	Router.prototype.subscribeState = function(){
		$(window).on('hashchange',$.proxy(function(event){
			_lastChangeTimeStamp = new Date().getTime();
			var e = event.originalEvent;
			var newUrl = e.newURL;
			var oldUrl = e.oldURL;
			if(newUrl == undefined){
				newUrl = location.href;
			}
			this.dispatchChange(newUrl,oldUrl);
		},this));
	};
	
	Router.prototype.dispatchChange = function(newUrl,oldUrl){
		this.rootModel.postMessage({
			type:"routeState",
			oldUrl:oldUrl,
			newUrl:newUrl
		});
	};
	
	Router.prototype.publishState = function(event){
		var currentTimeStamp = new Date().getTime();
		var isReplace = event.isReplace;
		if(currentTimeStamp - _lastChangeTimeStamp < 800){
			isReplace = true;
		}
		var hashbang = event.hashbang;
		if((hashbang == "" || hashbang === HashbangToken) && typeof justep.Portal.getPortal() !== "undefined"){
			//TODO : 严格的顺序
			//暂时认为不应该有清空hash的情况存在
			return;
		}
		if(isReplace){
			this.publishState._lastState = hashbang;
			_history.replaceState(null,null,hashbang);
		}else{
			if(this.publishState._lastState !== hashbang){
				this.publishState._lastState = hashbang;
				_lastChangeTimeStamp = currentTimeStamp;
				_history.pushState(null,null,hashbang);
			}
		}
	};
	
	Router.prototype.setRootModel = function(model){
		var self = this;
		if(typeof this.rootModel == 'undefined'){
			this.rootModel = model;
			this.rootModel.on('onRouteStatePublish',function(event){
				this.publishState(event);
			},this);
			var originHref = location.href;
			//第一次进来理解url
			this.rootModel.on('onLoaded',function(event){
				self.dispatchChange(originHref,'');
			},this);
		}
	};
	
    return new Router();
});