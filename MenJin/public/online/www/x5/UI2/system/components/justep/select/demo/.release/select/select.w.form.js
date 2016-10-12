define(function(require){
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/output/output');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/components/justep/select/demo/select'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='__baseID__';
	this._flag_='33469784f7395c4eadc73a9155c5493b';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fName":{"define":"fName","label":"显示名称","name":"fName","relation":"fName","type":"String"},"fValue":{"define":"fValue","label":"值","name":"fValue","relation":"fValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"fValue","initData":"[{\"fValue\":\"black\",\"fName\":\"黑色\"},{\"fValue\":\"red\",\"fName\":\"红色\"},{\"fValue\":\"green\",\"fName\":\"绿色\"},{\"fValue\":\"blue\",\"fName\":\"蓝色\"},{\"fValue\":\"orange\",\"fName\":\"橙色\"},{\"fValue\":\"yellow\",\"fName\":\"黄色\"},{\"fValue\":\"purple\",\"fName\":\"紫色\"},{\"fValue\":\"gray\",\"fName\":\"灰色\"}]","limit":20,"xid":"itemData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fMultiLabel":{"define":"fMultiLabel","label":"多选显示值","name":"fMultiLabel","relation":"fMultiLabel","type":"String"},"fMultiValue":{"define":"fMultiValue","label":"多选值","name":"fMultiValue","relation":"fMultiValue","type":"String"},"fSingleLabel":{"define":"fSingleLabel","label":"单选显示值","name":"fSingleLabel","relation":"fSingleLabel","type":"String"},"fSingleValue":{"define":"fSingleValue","label":"单选值","name":"fSingleValue","relation":"fSingleValue","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"1\",\"fSingleValue\":\"purple\",\"fSingleLabel\":\"紫色\",\"fMultiValue\":\"绿色\"},{\"fID\":\"2\",\"fSingleValue\":\"red\",\"fSingleLabel\":\"红色\",\"fMultiValue\":\"方法\"}]","limit":20,"xid":"mainData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};
}}); 
return __result;});