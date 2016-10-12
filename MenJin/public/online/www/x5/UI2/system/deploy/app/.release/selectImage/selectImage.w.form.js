define(function(require){
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/deploy/app/selectImage'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='8d4b67354b237595557a9088d5d218a5';
	this.callParent(contextUrl);
}}); 
return __result;});