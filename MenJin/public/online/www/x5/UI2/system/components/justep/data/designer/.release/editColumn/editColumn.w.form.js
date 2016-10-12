define(function(require){
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/toolBar/toolBar');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/justep/data/designer/editColumn'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='e13c39c4bf0425d71896724fdb01d777';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":false,"confirmDelete":true,"confirmRefresh":true,"defCols":{"displayName":{"define":"displayName","label":"显示名称","name":"displayName","relation":"displayName","type":"String"},"isCalculate":{"define":"isCalculate","label":"是否计算列","name":"isCalculate","relation":"isCalculate","type":"Boolean"},"isIDColumn":{"define":"isIDColumn","label":"是否ID列","name":"isIDColumn","relation":"isIDColumn","type":"Boolean"},"name":{"define":"name","label":"名称","name":"name","relation":"name","type":"String"},"type":{"define":"type","label":"数据类型","name":"type","relation":"type","type":"String"},"xid":{"define":"xid","label":"xid","name":"xid","relation":"xid","type":"String"}},"directDelete":false,"events":{"onCustomNew":"dataCustomNew"},"idColumn":"name","limit":20,"xid":"data"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"name":{"define":"name","label":"name","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"String\"},{\"name\":\"Integer\"},{\"name\":\"Long\"},{\"name\":\"Float\"},{\"name\":\"Double\"},{\"name\":\"Decimal\"},{\"name\":\"Boolean\"},{\"name\":\"Date\"},{\"name\":\"Time\"},{\"name\":\"DateTime\"}]","limit":20,"xid":"typeData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
}}); 
return __result;});