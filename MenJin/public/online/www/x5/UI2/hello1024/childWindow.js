define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Baas = require("$UI/takeout/baas");
	require("./echarts/dist/echarts-all");
	require("./table"); 
//	require("css!./table").load();
	var quanData;
	var  userName;
	var count;
	//var flag=true;
	var Model = function(){
		this.callParent();
	};
//	Model.prototype.button4Click = function(event){
//		var data;
//		var test=document.getElementById("div9");
//		test.innerHTML = "";
//		var store=this.comp('select1').val();
//		var passage=document.getElementById("select6").value;
//		var from_Date=this.comp('input3').val();
//		var to_Date=this.comp('input4').val();
//		var from_Passage=this.comp('input2').val();
//		var to_Passage=this.comp('input5').val();		
//		var success = function(resultData) {
//				data=resultData;
//				var createTable = function(data){
//				var table=document.createElement('table');
//				table.setAttribute('style','width: 862px;');
//				table.setAttribute('style','text-align:center;');
//				table.setAttribute('border','1');
//				table.setAttribute('cellspacing','0');
//				//定义表格标题
//				var caption=document.createElement('caption');
//				caption.innerHTML =store+'信息查询表';
//				caption.setAttribute('style','width: 862px;');
//				//将标题添加进表格
//				table.appendChild(caption);
//				//调用createTr()方法生成标题行并将其添加到table中。
//				table.appendChild(createTr('通道','时间','数量','星期'));
//				table.childNodes[1].setAttribute('style','background:#97D42F;height:35px;color:white;');
//				//alert(table.firstChild);
//				//for循环json对象,然后将循环到的对象通过createTr()方法生成行，添加到table中
//				for(var i=0;i<data.length;i++){
//					table.appendChild(createTr(data[i].Passage,data[i].Date,data[i].Number,data[i].Weeks));
//				}
//				return table;
//			    };	
//			var createTr = function(Passage,Date,Number,Weeks){
//				//定义行元素标签
//				var tr=document.createElement('tr');
//				tr.setAttribute('style','height:35px;');
//				//定义列元素标签
//				var tdName=document.createElement('td');
//				//设置该列节点的文本节点的值
//				tdName.innerHTML = Passage;
//				var tdAge = document.createElement('td');
//				tdAge.innerHTML = Date;
//				var tdGender = document.createElement('td');
//				tdGender.appendChild(document.createTextNode(Number));//等价于tdGender.innerHTML = gender;
//				var tdWeeks=document.createElement('td');
//				tdWeeks.innerHTML=Weeks;
//				//将列值添加到行元素节点
//				tr.appendChild(tdName);
//				tr.appendChild(tdAge);
//				tr.appendChild(tdGender);
//				tr.appendChild(tdWeeks);
//				//返回生成的行标签
//				return tr;
//			};	
////			   if(true){		
//				test.appendChild(createTable(data));
////				flag=false;//有改变
//				//}	
//			};
//		var params = {
//		    "store":store,
//			"passage":++passage,
//			"from_Date":from_Date,
//			"to_Date":to_Date,
//			"from_Passage":from_Passage,
//			"to_Passage":to_Passage
//		};
//		Baas.sendRequest({
//			"url" : "/echart",
//			"action" : "query_two",
//			"params" : params,
//			"success" :success,
//			"error" :  function(msg){
//						Baas.showError(msg);
//					}
//		});
//	//	showTable();
//		
//	};	
	Model.prototype.windowReceiver1Receive = function(event){
	    var welcom=document.getElementById("span21");
	    userName=event.data;	 
	    welcom.innerHTML=userName;
	    var data;   	    
//		var store=document.getElementById("select5").innerHTML;
		var firstTable = function (){
//			var body=document.getElementsByTagName('body')[0];
			var createTable = function(data){
				var table=document.createElement('table');
				table.setAttribute('style','width: 950px;');
				table.setAttribute('style','text-align:center;');
				 table.setAttribute('border','1');
				 table.setAttribute('cellspacing','0');
				//定义表格标题
				var caption=document.createElement('caption');
				caption.setAttribute('style','width: 950px;');
//				caption.innerHTML =quaData+'门店信息表';
				//将标题添加进表格
				table.appendChild(caption);
				//调用createTr()方法生成标题行并将其添加到table中。
				table.appendChild(createTr('通道','今日数据','一周数据','上周数据'));
				table.childNodes[1].setAttribute('style','background:#87CEFA;height:35px;color:white;');
				//alert(table.firstChild);
				//for循环json对象,然后将循环到的对象通过createTr()方法生成行，添加到table中
				for(var i=0;i<data.length;i++){
					table.appendChild(createTr(data[i].Passage,data[i].todayData,data[i].Number,data[i].Weeks));
				}
				return table;
			    };	
		var createTr = function(Passage,todayData,Number,Weeks){
				//定义行元素标签
				var tr=document.createElement('tr');
				tr.setAttribute('style','height: 35px;');
				//定义列元素标签
				var tdName=document.createElement('td');
				//设置该列节点的文本节点的值
				tdName.innerHTML = Passage;
				var tdAge = document.createElement('td');
				tdAge.innerHTML = todayData;
				var tdGender = document.createElement('td');
				tdGender.appendChild(document.createTextNode(Number));//等价与 tdGender.innerHTML = gender;
				var tdWeeks=document.createElement('td');
				tdWeeks.innerHTML=Weeks;
			//将列值添加到行元素节点
				tr.appendChild(tdName);
				tr.appendChild(tdAge);
				tr.appendChild(tdGender);
				tr.appendChild(tdWeeks);
			//返回生成的行标签
				return tr;
			};	
				var test=document.getElementById("div13");
				test.appendChild(createTable(data));
		};

		var success = function(resultData) {
				data=resultData;
				document.getElementById('div13').innerHTML = "";//
				firstTable();
			};
		var params = {
			    "username":userName
		};
		Baas.sendRequest({
			"url" : "/echart",
			"action" : "query_one_default",
			"params" : params,
//			"user":userName,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});               
	};
	 function myPrint(myDiv){
		 	var newht=document.getElementById(myDiv);
            var obj=document.getElementById(myDiv);
            var ur=window.location.href;
            var newWindow=window.open(ur,"_blank");//打印窗口要换成页面的url
            var docStr = obj.innerHTML;
            newht=docStr;
           newWindow.document.write(newht);
            newWindow.print();
            newWindow.close();
        }
	Model.prototype.button8Click = function(event){
	        myPrint('col23');
	};
//	Model.prototype.button5Click = function(event){
//            myPrint('div9');
////		document.execCommand("Print");
//	};

	Model.prototype.select5Change = function(event){
		var data;
		var testa=document.getElementById("col47");	
		var store=this.comp('select5').val();/*document.getElementById("select5").value;*/
		testa.innerHTML='&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;'+store+'门店信息表';
		var firstTable = function (){
//			var body=document.getElementsByTagName('body')[0];
			var createTable = function(data){
				var table=document.createElement('table');
				table.setAttribute('style','width: 950px;text-align:center;');
				table.setAttribute('border','1');
				table.setAttribute('cellspacing','0');
				//定义表格标题
				var caption=document.createElement('caption');
				caption.setAttribute('style','width: 950px;');
//				caption.innerHTML =store+'门店信息表';
				//将标题添加进表格
				table.appendChild(caption);
				//调用createTr()方法生成标题行并将其添加到table中。
				table.appendChild(createTr('通道','今日数据','一周数据','上周数据'));
				table.childNodes[1].setAttribute('style','background:#87CEFA;height:35px;color:white;');
//				table.childNodes[1].setAttribute('style','');
				//alert(table.firstChild);
				//for循环json对象,然后将循环到的对象通过createTr()方法生成行，添加到table中
				for(var i=0;i<data.length;i++){
					table.appendChild(createTr(data[i].Passage,data[i].todayData,data[i].Number,data[i].Weeks));
				}
				return table;
			    };	
		var createTr = function(Passage,todayData,Number,Weeks){
				//定义行元素标签
				var tr=document.createElement('tr');
				tr.setAttribute('style','height: 35px;');
				//定义列元素标签
				var tdName=document.createElement('td');
				//设置该列节点的文本节点的值
				tdName.innerHTML = Passage;
				var tdAge = document.createElement('td');
				tdAge.innerHTML = todayData;
				var tdGender = document.createElement('td');
				tdGender.appendChild(document.createTextNode(Number));//等价与 tdGender.innerHTML = gender;
				var tdWeeks=document.createElement('td');
				tdWeeks.innerHTML=Weeks;
			//将列值添加到行元素节点
				tr.appendChild(tdName);
				tr.appendChild(tdAge);
				tr.appendChild(tdGender);
				tr.appendChild(tdWeeks);
			//返回生成的行标签
				return tr;
			};	
				var test=document.getElementById("div13");
				test.appendChild(createTable(data));
		};
		var success = function(resultData) {
				data=resultData;
				document.getElementById('div13').innerHTML = "";//
				firstTable();
			};
			
		var params = {
		    "store":store,
		    "username":userName
		};
		console.log(userName);
		Baas.sendRequest({
			"url" : "/echart",
			"action" : "query_one",
			"params" : params,
//			 "user":userName,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	};
	Model.prototype.button7Click = function(event){
		var data;
		var me=this;
		var store=this.getElementByXid("select7").value;
	//	var store=this.comp('select7').val();
		var passage=this.getElementByXid("select3").value;
	 //   var passage=this.comp('select3').val();
	    var year=this.getElementByXid("select4").value;
        var month=this.getElementByXid("select2").value;
        var success = function(resultData) {
			data=resultData;
		var option = {
        title:{
        text:store+passage+'通道'+year+'年'+month+'月份客流量',
        x:'center',
        y:'bottom'
        },
            tooltip : {
                trigger: 'axis'
            },
//           legend: {
//                data:['人数'],
//                backgroundColor: 'yellow'
//            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line','bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
               {
                    type : 'category',
                    boundaryGap:false,
                    data :data.x 
                    //['2','3','8','9','11','31']
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
                    lineStyle: {
                       color: '#',
                       width: 2,
                       type: 'solid'
                },
                  //  itemStyle: {normal: {areaStyle: {type: 'red'}}},
                   data:data.y
                  // [82,178, 43, 73, 366, 39]
                }
            ]
        };
        var myChart = echarts.init(me.getElementByXid('main'));
        myChart.setOption(option);	
			};
		var params = {
			"store":store,
			"passage":++passage,
			"year" :++year,
			"month":++month
		};
		Baas.sendRequest({
			"url" : "/echart",//与后台统一
			"action" : "query_three",
			"params" : params,
			"success" :success,
			"error" :function(msg){
						Baas.showError(msg);
					}
		});

	};
	
	Model.prototype.StoreDataCustomRefresh = function(event){
			var data=this.comp('StoreData');
			var me=this;		
			var success = function(resultData) {
				var append = event.options && event.options.append;				
				data.loadData(resultData.one, append);								
				quanData=resultData.one;
				me.comp('select5').val(resultData.two);
				var testa=document.getElementById("col47");	
		        testa.innerHTML='&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;'+resultData.two+'门店信息表';
			};
			var params = {
					"queryname":"queryname",
					"username":userName
				};
		Baas.sendRequest({
			"url" : "/echart",//与后台统一
			"action" : "query_store",
			"params" : params,
			"success" :success,
			"error" :function(msg){
						Baas.showError(msg);
					}
		});		
            
	};	
	Model.prototype.modelLoad = function(event){
           this.StoreDataCustomRefresh(event);
	};
	Model.prototype.select1Change = function(event){
	a=10;
	console.log(a);
	    var select = document.getElementById("select6");
//	    var select2 = document.getElementById("select2");
	    var sumNum = quanData.rows.length;	
	    var storeName1 = this.comp('select1').val();
	    	select.innerHTML = "";
//	    	console.log(quanData.rows);
	      for(var i=0;i<sumNum;i++){
		  if(quanData.rows[i].StoreName.value.latestValue==storeName1){
		    count = quanData.rows[i].Passage.value.latestValue;
				   }
				}
	     for(var j = 0,id,name; j < count; j++)
        {
              id=j;
              name=j+1;
            select.options.add(new Option(name, id));
        }           
	};
		Model.prototype.select7Change = function(event){
	    var select = this.getElementByXid("select3");
        var select2 = this.getElementByXid("select2");
        var select4 = this.getElementByXid("select4");
	    var sumNum = quanData.rows.length;
	    var storeName2 = this.getElementByXid("select7").value;
	    	select.innerHTML = "";
	    	select2.innerHTML = "";
	    	select4.innerHTML = "";
	      for(var i=0;i<sumNum;i++){
				   if(quanData.rows[i].StoreName.value.latestValue==storeName2){				   
				      count = quanData.rows[i].Passage.value.latestValue;
				   }
				}    		
	     for(var j = 0,id,name; j < count; j++)
        {
              id=j;
              name=j+1;
            select.options.add(new Option(name, id));
        }
        for(var k = 0,id2,name2; k < 12; k++)
        {
              id2=k;
              name2=k+1;
            select2.options.add(new Option(name2, id2));
        }
         for(var t = 2014,id3,name3; t < 2020; t++)
        {
              id3=t;
              name3=t+1;
            select4.options.add(new Option(name3, id3));
        }

	};
		Model.prototype.select11Change = function(event){
	    var select = this.getElementByXid("select10");
        var select2 = this.getElementByXid("select9");
//        var select4 = document.getElementById("select4");
	    var sumNum = quanData.rows.length;
	    var storeName2 = this.getElementByXid("select11").value;
	    	select.innerHTML = "";
	    	select2.innerHTML = "";
	 //   	select4.innerHTML = "";
	      for(var i=0;i<sumNum;i++){
				   if(quanData.rows[i].StoreName.value.latestValue==storeName2){				   
				      count = quanData.rows[i].Passage.value.latestValue;
				   }
				}    		
	     for(var j = 0,id,name; j < count; j++)
        {
              id=j;
              name=j+1;
            select.options.add(new Option(name, id));
        }
        for(var k = 8,id2,name2,t; k < 21; k++)
        {
              id2=k;
              t=k+1;
              name2=k+':00'+'——'+t+':00';
            select2.options.add(new Option(name2, id2));
        }
//         for(var t = 2014,id3,name3; t < 2020; t++)
//        {
//              id3=t;
//              name3=t+1;
//            select4.options.add(new Option(name3, id3));
//        }
	};
	
		Model.prototype.button12Click = function(event){
		var data;
		var me=this;
		var store=this.getElementByXid("select11").value;
		console.log(store);
	//	var store=this.comp('select7').val();
		var passage=this.getElementByXid("select10").value;
	 //   var passage=this.comp('select3').val();
	    var date=this.comp('input1').val();/*document.getElementById("select4").value;*/
        var time=this.getElementByXid("select9").value;
        var success = function(resultData) {
				data=resultData;
				console.log(data);
				var arr1=new Array();
				var arr2=new Array();
				var arr3=new Array();
				var arrx=new Array();
				var arry=new Array();
				var count=data.x.length;
				for(var i=0;i<count;i++){
				  arr1.push(data.x[i]);
				  arr3.push(data.y[i]);
				}
				for(var j=0;j<count;j++){
				  arr2.push(Number(arr1[j].substring(14,16)));
				}//获取到的分钟值放到arr2数组中
				for(var k=0;k<60;k++){
					arrx[k]=k;
					arry[k]=0;
					}
			    for(var t=0;t<count;t++){
			        arry[arr2[t]]=arr3[t];
			    }
//			     console.log('hhhh');
//				console.log(arr2);
                console.log(arrx);
				console.log(arry);
//				console.log(data.y);
	    var option = {
        title:{
        text:store+passage+'通道'+date+'日'+time+':00'+'—'+(++time)+':00'+'客流量统计图',
        x:'center',
        y:'bottom'
        },
            tooltip : {
                trigger: 'axis'
            },
//           legend: {
//                data:['人数'],
//                backgroundColor: 'yellow'
//            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line','bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
               {
                    type : 'category',
                    boundaryGap:false,
                    data :arrx
//                    console.log('arrx')
//                    ['2','3','8','9','11','31']
                    
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
                    lineStyle: {
                       color: '#',
                       width: 2,
                       type: 'solid'
                },
                  //  itemStyle: {normal: {areaStyle: {type: 'red'}}},
                   data:arry
//                  console.log('arry')
//                   [82,178, 43, 73, 366, 39]
                   
                }
            ]
        };
        var myChart = echarts.init(me.getElementByXid('div22'));
        myChart.setOption(option);	
			};
		var params = {
			"store":store,
			"passage":++passage,
			"date" :date,
			"time":time,
			"username":userName
		};
		Baas.sendRequest({
			"url" : "/echart",//与后台统一
			"action" : "query_time",
			"params" : params,
			"success" :success,
			"error" :function(msg){
						Baas.showError(msg);
					}
		});
		

	};	
	
	
		Model.prototype.select13Change = function(event){
		var select=this.getElementByXid("select8");
	    var sumNum = quanData.rows.length;	
	    var storeName1 = this.comp('select13').val();
	    	select.innerHTML = "";
//	    	console.log(quanData.rows);
	      for(var i=0;i<sumNum;i++){
		  if(quanData.rows[i].StoreName.value.latestValue==storeName1){
		    count = quanData.rows[i].Passage.value.latestValue;
				   }
				}
	     for(var j = 0,id,name; j < count; j++)
        {
              id=j;
              name=j+1;         
            select.options.add(new Option(name, id));
        }           
	};
		Model.prototype.button19Click = function(event){
          var data;
		var test=document.getElementById("div9");
		test.innerHTML = "";
		var store=this.comp('select13').val();
		var passage=this.getElementByXid("select8").value;
		var from_Date=this.comp('input8').val();
		var to_Date=this.comp('input9').val();
		var from_Passage=this.comp('input7').val();
		console.log(store);
		var to_Passage=this.comp('input6').val();		
		var success = function(resultData) {
				data=resultData;
				var createTable = function(data){
				var table=document.createElement('table');
				table.setAttribute('style','width: 862px;');
				table.setAttribute('style','text-align:center;');
				table.setAttribute('border','1');
				table.setAttribute('cellspacing','0');
				//定义表格标题
				var caption=document.createElement('caption');
				caption.innerHTML =store+'信息查询表';
				caption.setAttribute('style','width: 862px;font-family : 微软雅黑,宋体;font-size:1.5em;text-align:center;');
				//将标题添加进表格
				table.appendChild(caption);
				//调用createTr()方法生成标题行并将其添加到table中。
				table.appendChild(createTr('通道','时间','数量','星期'));
				table.childNodes[1].setAttribute('style','background:#87CEFA;height:35px;color:white;');
				//alert(table.firstChild);
				//for循环json对象,然后将循环到的对象通过createTr()方法生成行，添加到table中
				for(var i=0;i<data.length;i++){
					table.appendChild(createTr(data[i].Passage,data[i].Date,data[i].Number,data[i].Weeks));
				}
				return table;
			    };	
			var createTr = function(Passage,Date,Number,Weeks){
				//定义行元素标签
				var tr=document.createElement('tr');
				tr.setAttribute('style','height:35px;');
				//定义列元素标签
				var tdName=document.createElement('td');
				//设置该列节点的文本节点的值
				tdName.innerHTML = Passage;
				var tdAge = document.createElement('td');
				tdAge.innerHTML = Date;
				var tdGender = document.createElement('td');
				tdGender.appendChild(document.createTextNode(Number));//等价于tdGender.innerHTML = gender;
				var tdWeeks=document.createElement('td');
				tdWeeks.innerHTML=Weeks;
				//将列值添加到行元素节点
				tr.appendChild(tdName);
				tr.appendChild(tdAge);
				tr.appendChild(tdGender);
				tr.appendChild(tdWeeks);
				//返回生成的行标签
				return tr;
			};	
//			   if(true){
				
				test.appendChild(createTable(data));
//				flag=false;//有改变
				//}	
			};
		var params = {
		    "store":store,
			"passage":++passage,
			"from_Date":from_Date,
			"to_Date":to_Date,
			"from_Passage":from_Passage,
			"to_Passage":to_Passage
		};
		Baas.sendRequest({
			"url" : "/echart",
			"action" : "query_two",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});
	//	showTable();
	};
		Model.prototype.button20Click = function(event){
            myPrint('div9');
	};
		Model.prototype.content2Active = function(event){
		var data;	
		var me=this;
		  var success = function(resultData) {	  
		  data=resultData;
//		  console.log();
          console.log(resultData);
//		  var tdao=me.getElementByXid("select8");
//		  var tdao=me.comp("select8");
          me.comp('select8').val(data[1]);	 
          me.comp('select13').val(data[0]);
          me.comp('input8').val(data[4]);
          me.comp('input9').val(data[5]);
          me.comp('input7').val(data[2]);
          me.comp('input6').val(data[3]);  
			};
//  tdao.options.add(new Option(data[1],"select8"));
//		    this.getElementByXid("select13").value="wandadian";
//          this.getElementByXid("select13").options.add(new Option('江北店',"select13"));
//           me.getElementByXid('input8').value=data[4];
//          me.getElementByXid('input9').value=data[5];
//             console.log(val('input9'));
//          me.getElementByXid('input7').value=data[2];
//           me.getElementByXid('input6').value=data[3];  

           
			var params = {
		    "query_two":"query_two_default",
		    "userName":userName
		};
		Baas.sendRequest({
			"url" : "/echart",
			"action" : "query_two_default",
			"params" : params,
			"success" :success,
			"error" :  function(msg){
						Baas.showError(msg);
					}
		});			 
	};
		Model.prototype.content4Active = function(event){
		  this.comp('select7').val('鄞州店');
          this.getElementByXid("select3").options.add(new Option(5,"select3"));
          this.getElementByXid("select4").options.add(new Option(2015,"select4"));
          this.getElementByXid("select2").options.add(new Option(10,"select2"));
//          this.getElementByXid("select13").value="9";
          this.comp('select11').val('江北店');
          this.getElementByXid("select10").options.add(new Option(2,"select10"));
//          this.getElementByXid('input1').value='2015-10-20';
//           var data='2015-11-6';
//           this.comp('input1').val(data);
          this.getElementByXid("select9").options.add(new Option("8:00——9:00","select2"));
	};
		
		Model.prototype.button3Click = function(event){
//this.comp('input1').val('2015-12-6');
// this.getElementByXid('input1').value='2015-11-1';
            var data='2015-12-11';
         	 this.comp('input2').val(data);
 
	};
		
		return Model;
});