define(function(require){
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/designerCommon/propEdtorPages/icon/selectIcon'); 
require('css!$model/UI2/system/components/designerCommon/propEdtorPages/icon/selectIcon').load();
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='10a08213c112715b24166eb4830445ce';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"filePath":{"define":"filePath","name":"filePath","relation":"filePath","type":"String"},"name":{"define":"name","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{},"idColumn":"filePath","limit":20,"xid":"files"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"filePath":{"define":"filePath","name":"filePath","relation":"filePath","type":"String"}},"directDelete":false,"events":{},"idColumn":"filePath","limit":20,"xid":"selectedFile"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
}}); 
return __result;});