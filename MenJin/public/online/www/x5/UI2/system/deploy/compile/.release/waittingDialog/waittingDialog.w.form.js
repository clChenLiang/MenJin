define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/radio');
var __parent2=require('$model/UI2/system/lib/base/modelBase'); 
var __parent1=require('$model/UI2/system/deploy/common/waittingDialog'); 
var __parent0=require('$model/UI2/system/deploy/compile/waittingDialog'); 
var __result = __parent2._extend(__parent1)._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='589da4b0c0016007327d528aeec9b4f4';
	this.callParent(contextUrl);
}}); 
return __result;});