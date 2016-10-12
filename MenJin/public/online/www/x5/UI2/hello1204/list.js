define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	

	Model.prototype.data1CustomRefresh = function(event){
       var jsonStr='{"@type":"table","rows":['
		+'{"fName":{"value":"老北京炸酱面"},"fPrice":{"value":"20.00"},"fDescription":{"value":"老北京炸酱面，可乐"}},'
		+'{"fName":{"value":"宫保鸡丁"},"fPrice":{"value":"25.00"},"fDescription":{"value":"宫保鸡丁，两份"}},'
		+'{"fName":{"value":"老北京炸酱面"},"fPrice":{"value":"10.00"},"fDescription":{"value":"肉饼三个"}}'
		+']}';
	   var jsonObj=JSON.parse(jsonStr);
//		var str = {
//				"@type":"table",
//				"rows":[
//				      {"fName":{"value":"老北京炸酱面"},
//				       "fPrice":{"value":"20.00"},
//				       "fDescription":{"value":"老北京炸酱面，可乐"}
//				      },
//				      {"fName":{"value":"宫保鸡丁"},"fPrice":{"value":"25.00"},"fDescription":{"value":"宫保鸡丁，两份"}},
//				      {"fName":{"value":"老北京炸酱面"},"fPrice":{"value":"10.00"},"fDescription":{"value":"肉饼三个"}}
//				]
//		}
		this.comp('data1').loadData(jsonObj);
	};

	

	

	

	return Model;
});