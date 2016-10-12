define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("./dist/echarts-all");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
        var option = {
        title:{
        text:'Weekly passenger flow in 2012',
        x:'center',
        y:'bottom'
        },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['人数']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap:false,
                    data : ['2','3','8','9','11','31']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel:{
                    formatter:'{value}人'
                    }
                    
                }
            ],
            series : [
                {
                    name:'总人数',
                    type:'line',
                    data:[82,178, 43, 73, 366, 39]
                }
            ]
        };
        var myChart = echarts.init(this.getElementByXid('div3'));
        myChart.setOption(option);
	};

	return Model;
});