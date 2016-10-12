define(function(require){
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/output/output');
var __parent2=require('$model/UI2/system/lib/base/modelBase'); 
var __parent1=require('$model/UI2/system/deploy/common/appInfo'); 
var __parent0=require('$model/UI2/system/deploy/compile/appInfo'); 
var __result = __parent2._extend(__parent1)._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='a8f5828541cba9e956d9f695e89f4df1';
	this.callParent(contextUrl);
}}); 
return __result;});