define(function(require){
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/input/input');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/deploy/app/selectAppResources'); 
require('css!$model/UI2/system/deploy/app/selectAppResources').load();
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='false';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='9f6bc878f78e26fba32681f4490faf52';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"AppName":{"define":"AppName","label":"AppName","name":"AppName","relation":"AppName","type":"String"},"Checked":{"define":"Checked","label":"Checked","name":"Checked","relation":"Checked","type":"Boolean"},"ID":{"define":"ID","label":"ID","name":"ID","relation":"ID","type":"String"}},"directDelete":false,"events":{},"idColumn":"ID","initData":"[]","limit":20,"xid":"appData"});
}}); 
return __result;});