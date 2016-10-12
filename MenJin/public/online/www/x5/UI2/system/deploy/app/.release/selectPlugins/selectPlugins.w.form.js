define(function(require){
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/select/checkboxGroup');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/button/button');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/deploy/app/selectPlugins'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='2a9fc2bc05dfdba707f5cdb55564cee8';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"dependency":{"define":"dependency","label":"Dependency","name":"dependency","relation":"dependency","type":"String"},"id":{"define":"id","label":"ID","name":"id","relation":"id","type":"String"},"name":{"define":"name","label":"PluginName","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{},"idColumn":"id","initData":"[]","limit":20,"xid":"pluginsData"});
}}); 
return __result;});