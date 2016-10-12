define(function(require){
require('$model/UI2/system/components/justep/barcode/barcodeImage');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/deploy/package/downloadApp'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='fce1ad3f6fff7b58fa9340740e0ee14e';
	this.callParent(contextUrl);
}}); 
return __result;});