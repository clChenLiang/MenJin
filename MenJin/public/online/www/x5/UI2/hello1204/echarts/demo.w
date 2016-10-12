<!DOCTYPE HTML>
<html style="width:100%;height:100%" class="no-js">
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    </head>
	
    <body style="width:100%;height:100%;margin: 0;">
    	<script>
    	
    	    window.__justep = {};
		 
    	</script>
        <div id="applicationHost" class="applicationHost" style="width:100%;height:100%;" __component-context__="block"><div xid="window" class="window" component="$model/UI2/system/components/justep/window/window" design="device:pc" data-bind="component:{name:'$model/UI2/system/components/justep/window/window'}" __justepbasexid__="__baseID__" components="$model/UI2/system/components/justep/model/model,$model/UI2/system/components/justep/window/window," css="">  
  <div component="$model/UI2/system/components/justep/model/model" xid="model" style="display:none" data-bind="component:{name:'$model/UI2/system/components/justep/model/model'}" data-events="onLoad:modelLoad"></div>  
  <div xid="main" style="width:100%;height:600px" class="main"></div> 
</div></div>
        
        <div id="downloadGCF" style="display:none;padding:50px;">
        	<span>您使用的浏览器需要下载插件才能使用, </span>
        	<a id="downloadGCFLink" href="#">下载地址</a>
        	<p>(安装后请重新打开浏览器)</p>
        </div>
    	<script>
    	
    	            //判断浏览器, 判断GCF
    	 			var browser = {
    			        isIe: function () {
    			            return navigator.appVersion.indexOf("MSIE") != -1;
    			        },
    			        navigator: navigator.appVersion,
    			        getVersion: function() {
    			            var version = 999; // we assume a sane browser
    			            if (navigator.appVersion.indexOf("MSIE") != -1)
    			                // bah, IE again, lets downgrade version number
    			                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    			            return version;
    			        }
    			    };
    				function isGCFInstalled(){
    			      try{
    			        var i = new ActiveXObject('ChromeTab.ChromeFrame');
    			        if (i) {
    			          return true;
    			        }
    			      }catch(e){}
    			      return false;
    				}
    	            //判断浏览器, 判断GCF
    	            var __continueRun = true;
    				if (browser.isIe() && (browser.getVersion() < 9) && !isGCFInstalled()) {
    					document.getElementById("applicationHost").style.display = 'none';
    					document.getElementById("downloadGCF").style.display = 'block';
    					var downloadLink = "/" + location.pathname.match(/[^\/]+/)[0] + "/v8.msi";
    					document.getElementById("downloadGCFLink").href = downloadLink; 
    					__continueRun = false;
    	            }
		 	
    	</script>
        <script src="../../../UI2/system/config/meta.js"> </script>
        <script id="_requireJS" src="../../../UI2/system/lib/require/require.2.1.10.js"> </script>
        <script src="../../../UI2/system/core.min.js"></script><script src="../../../UI2/system/common.min.js"></script><script id="_mainScript">
        
			if (__continueRun) {
                window.__justep.isDebug = false;     
            	window.__justep.__ResourceEngine = {
            		url: window.location.href,	
            		/*contextPath: 不包括语言 */
            		contextPath: "",
            		__loadedJS: [],
            		initContextPath: function(){
            			var baseURL = document.getElementById("_requireJS").src;
            			var before = location.protocol + "//" + location.host;
            			var after = "/UI2/system/lib/require/require.2.1.10.js";
            			var i = baseURL.indexOf(after);
            			if (i !== -1){
    	        			var middle = baseURL.substring(before.length, i);
    						var items = middle.split("/");
    						
    						
    						if (items[items.length-1].indexOf("$v") === 0){
    							items.splice(items.length-1, 1);
    						}
    						
    						
    						if (items.length !== 1){
    							window.__justep.__ResourceEngine.contextPath = items.join("/");
    						}
            			}else{
            				throw new Error(baseURL + " hasn't  " + after);
            			}
            		},
            	
            		loadJs: function(urls){
            			if (urls && urls.length>0){
            				var loadeds = this._getResources("script", "src").concat(this.__loadedJS);
    	       				for (var i=0; i<urls.length; i++){
    	       					var url = window.__justep.__ResourceEngine.contextPath + urls[i];
    	        				if(!this._isLoaded(url, loadeds)){
    	        					this.__loadedJS[this.__loadedJS.length] = url;
    	        					/*
    	        					var script = document.createElement("script");
    	        					script.src = url;
    	        					document.head.appendChild(script);
    	        					*/
    	        					//$("head").append("<script  src='" + url + "'/>");
    	        					$.ajax({
    	        						url: url,
    	        						dataType: "script",
    	        						cache: true,
    	        						async: false,
    	        						success: function(){}
    	        						});
    	        				} 
    	       				}
            			}
            		},
            		
            		loadCss: function(styles){
           				var loadeds = this._getResources("link", "href");
            			if (styles && styles.length>0){
            				for (var i=0; i<styles.length; i++){
    	       					var url = window.__justep.__ResourceEngine.contextPath + styles[i].url
    	        				if(!this._isLoaded(url, loadeds)){
    	        					var include = styles[i].include || "";
    	        					$("head").append("<link type='text/css' rel='stylesheet' href='" + url + "' include='" + include + "'/>");
    	        				} 
            				}
            			}
            			
            		},
            		
            		_isLoaded: function(url, loadeds){
            			if (url){
            				var i = url.indexOf("$v");
            				if (i!==-1){
            					var tmp = url.substr(i);
            					i = tmp.indexOf("/");
            					if (i!==-1){
            						url = tmp.substr(i);
            					}
            				}
    						for (var i=0; i<loadeds.length; i++){
    							if (loadeds[i] && (loadeds[i].indexOf(url)!==-1)){
    								return true;
    							}
    						}
            			}
    					return false;
            		},
            		
            		_getResources: function(tag, attr){
    					var result = [];
    					var scripts = $(tag);
    					for (var i=0; i<scripts.length; i++){
    						var v = scripts[i][attr];
    						if (v){
    							result[result.length] = v;
    						}
    					}
    					return result;
            		}
            	};
            	
            	window.__justep.__ResourceEngine.initContextPath();
            	window.__justep.__isPackage = true;;
    			requirejs.config({
    				baseUrl: window.__justep.__ResourceEngine.contextPath + '/UI2/hello1204/echarts',
    			    paths: {
    			    	'modernizr': window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/base/modernizr-2.8.3.min',
    			    	'$model': window.__justep.__ResourceEngine.contextPath + '',
    			        'text': window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/require/text.2.0.10',
    			        'bind': window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/bind/bind',
    			        'jquery': window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/jquery/jquery-1.11.1.min'
    			    },
    			    shim: {
    			    	'modernizr': {
    			    		exports: 'Modernizr'
    			    	}
    			    },
    				map: {
    				        '*': {
    				            res: window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/require/res.js',
    				            cordova: window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/require/cordova.js',
    				            w: window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/require/w.js',
    				            css: window.__justep.__ResourceEngine.contextPath + '/UI2/system/lib/require/css.js'
    				        }
    				},
    				deps: ['modernizr'],
    				waitSeconds: 30
    			});
    			
    			require(['require', 'jquery', '$model/UI2/system/lib/base/composition', '$model/UI2/system/components/justep/loadingBar/loadingBar','$model/UI2/system/lib/cordova/cordova','$model/UI2/activity2WindowURL'],  function (require, $, composition) { 
    	            document.addEventListener('deviceready', function() {
    	                if (navigator && navigator.splashscreen && navigator.splashscreen.hide) {
    	                	/*延迟隐藏，视觉效果更理想*/
    	                	setTimeout(function() {navigator.splashscreen.hide();}, 800);
    	                }
    	            }, false);
    				var context = {};
    				context.model = '$model/UI2/hello1204/echarts/demo.w' + (document.location.search || "");
    				context.view = $('#applicationHost').children()[0];
    				var element = document.getElementById('applicationHost');
    				composition.compose(element, context);
    			});    
            }
		 	
        </script>
    </body>
</html>