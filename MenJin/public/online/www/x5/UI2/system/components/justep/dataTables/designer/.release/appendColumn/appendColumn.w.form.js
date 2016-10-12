define(function(require){
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/bootstrap/table/table');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/fragment/list/listTable');
require('$model/UI2/system/components/justep/output/output');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/justep/dataTables/designer/appendColumn'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='308e5362189fa14c0c8619e89b066af7';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"displayName":{"define":"displayName","label":"显示名称","name":"displayName","relation":"displayName","type":"String"},"name":{"define":"name","label":"名称","name":"name","relation":"name","type":"String"},"selected":{"define":"selected","label":"选中","name":"selected","relation":"selected","type":"Boolean"},"type":{"define":"type","label":"数据类型","name":"type","relation":"type","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","limit":20,"xid":"data"});
}}); 
return __result;});