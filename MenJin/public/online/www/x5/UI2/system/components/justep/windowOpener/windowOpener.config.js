/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/**
 *  properties type: string, number, boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称

 */
define(function(require){
	return {
		properties: {
			url: "string",
			modal: "boolean",
			width: "string",
			height: "boolean",
			left:"string",
			top:"string",
			status:"string",
			resizable:"boolean",
			parameters:"string",
			process: "string",
			activity: "string"
		},
		events:["onSend", "onReceive", "onOpen", "onClose"],
		binds:{}
	};
});