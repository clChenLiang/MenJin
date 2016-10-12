define(function(require){
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/toolBar/toolBar');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/justep/data/designer/editRule'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='c822de40edd1b9f5b2bb36031f516979';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"calculate":{"define":"calculate","label":"计算规则","name":"calculate","relation":"calculate","type":"String"},"constraint":{"define":"constraint","label":"约束规则","name":"constraint","relation":"constraint","type":"String"},"constraintMessage":{"define":"constraintMessage","label":"约束规则提示信息","name":"constraintMessage","relation":"constraintMessage","type":"String"},"displayName":{"define":"displayName","label":"显示名称","name":"displayName","relation":"displayName","type":"String"},"name":{"define":"name","label":"名称","name":"name","relation":"name","type":"String"},"readonly":{"define":"readonly","label":"只读规则","name":"readonly","relation":"readonly","type":"String"},"required":{"define":"required","label":"必填规则","name":"required","relation":"required","type":"String"},"requiredMessage":{"define":"requiredMessage","label":"必填规则提示信息","name":"requiredMessage","relation":"requiredMessage","type":"String"},"type":{"define":"type","label":"类型","name":"type","relation":"type","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","limit":20,"xid":"data"});
}}); 
return __result;});