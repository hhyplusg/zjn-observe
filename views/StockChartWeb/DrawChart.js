
$(function(){ 
	console.log("开始画图--");
	drawChart();
	drawChart2(); 
	drawChart3();
	drawChart4();
	drawChart5();
	drawChart6();
	drawChart7();
});

//基础表单轴
function drawChart(){
	$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
		var startDate = new Date(data[data.length - 1][0]), // Get year of last data point
				minRate = 1,
				maxRate = 0,
				startPeriod,
				date,
				rate,
				index;
		startDate.setMonth(startDate.getMonth() - 3); // a quarter of a year before last data point
		startPeriod = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
		for (index = data.length - 1; index >= 0; index = index - 1) {
				date = data[index][0]; // data[i][0] is date
				rate = data[index][1]; // data[i][1] is exchange rate
				if (date < startPeriod) {
						break; // stop measuring highs and lows
				}
				if (rate > maxRate) {
						maxRate = rate;
				}
				if (rate < minRate) {
						minRate = rate;
				}
		}
		// Create the chart
		Highcharts.stockChart('container', {
			credits: {
				enabled: false
			},
			rangeSelector: {
				selected: 1
			},
			title: {
				text: '博弈/存量指标',
				style: {
							color: 'black',
							fontWeight: 'bold',
							fontSize: 20
						},
				margin: 30
			},
			yAxis: {
				opposite: false,
				title: {
						// text: 'Exchange rate'
				},
				plotLines: [{
						value: minRate,
						color: 'gray',
						dashStyle: 'shortdash',
						width: 2,
						label: {
								// text: '0.25'
						}
				}, {
						value: maxRate,
						color: 'red',
						dashStyle: 'shortdash',
						width: 2,
						label: {
								// text: '0.4'
						}
				}]
			},
			series: [{
				name: ' 博弈/存量资金',
				data: data,
				tooltip: {
						valueDecimals: 4
				}
			}]
		});
	});
}


// 百分比图方法实现双轴
function drawChart2(){   
	var seriesOptions = [],
	seriesCounter = 0,
	names = ['MSFT', 'GOOG'],
	// create the chart when all data is loaded
	createChart = function () {
		Highcharts.stockChart('container2', {
				credits: {
					enabled: false
				},
				rangeSelector: {
						selected: 5
				},
				title: {
					text: '融资买入/可用担保价值',
					style: {
								color: 'black',
								fontWeight: 'bold',
								fontSize: 20
						},
					margin: 30
				},
				yAxis: [
				{
						title: {
							text: '融资买入/可用担保价值',
						},
						
						opposite: false
				},
				{
						title: {
							text: '沪深300',
						},
						plotLines: [{
								value: 250,
								width: 2,
								color: 'gray',
								dashStyle: 'shortdash',
						},
						{
								value: 900,
								width: 2,
								color: 'gray',
								dashStyle: 'shortdash',
						}
						],
						labels: {
								// formatter: function () {
								// 		return (this.value > 0 ? ' + ' : '') + this.value + '%';
								// }
						},
						
				}				
				],
				// plotOptions: {
				// 		series: {
				// 				compare: 'percent'
				// 		}
				// },
				tooltip: {
						pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
						valueDecimals: 2
				},
				series: seriesOptions
		});
	};
	$.each(names, function (i, name) {
	
			$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
				
					seriesOptions[i] = {
							name: name,
							data: data,
							yAxis: i
					};
					// As we're loading the data asynchronously, we don't know what order it will arrive. So
					// we keep a counter and create the chart when all the data is loaded.
					seriesCounter += 1;
					if (seriesCounter === names.length) {
							createChart();
					}
				
					
			});

	});

}
 //基础表实现双轴
function drawChart3(){
	$.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
		var startDate = new Date(data[data.length - 1][0]), // Get year of last data point
				minRate = 1,
				maxRate = 0,
				startPeriod,
				date,
				rate,
				index;
		var Xdata=new Array();
		var ydata1=new Array();
		var ydata2=new Array();
		var copydata=new Array();

		startDate.setMonth(startDate.getMonth() - 3); // a quarter of a year before last data point
		startPeriod = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
		for (index = data.length - 1; index >= 0; index = index - 1) {
				date = data[index][0]; // data[i][0] is date
				rate = data[index][1]; // data[i][1] is exchange rate
				if (date < startPeriod) {
						break; // stop measuring highs and lows
				}
				if (rate > maxRate) {
						maxRate = rate;
				}
				if (rate < minRate) {
						minRate = rate;
				}

		}

		for (m = 0; m <=data.length - 1; m = m + 1) {
				Xdata[m]=data[m][0];
				ydata1[m]=data[m][1];
				ydata2[m]=data[m][1];

				copydata[m]=new Array(2);
				copydata[m][0]=data[m][0];
				copydata[m][1]=data[m][1]+2*Math.random();

				// copydata.push(data[m]);
		}

		// console.log(data);
		// console.log(copydata);
		// console.log(copydata.length);
		// Create the chart
		Highcharts.stockChart('container3', {
			credits: {
				enabled: false
			},
			rangeSelector: {
				selected: 5
			},
			title: {
				text: '基础表实现双轴（网络数据）',
				style: {
							color: 'black',
							fontWeight: 'bold',
							fontSize: 20
						},
				margin: 30
			},

			yAxis:[
				{
					opposite: false,
					title: {
							text: 'Yzhou1'
					},
				},
				{
					title: {
							text: 'Yzhou2'
					},
				}
			], 
			series: [
				{
					name: ' 类别1',
					data: data,
					yAxis:1	
				},
				{
					name: ' 类别2',
					data: copydata,					
				}
			]
		});
	});
}

//基础表实现双轴（自己造数据）
function drawChart4(){



	// $.post("DatabaseOperation.php?action=reworkRecordSearch_db",function(data){

	// 	console.log("--data-----");
	// 	console.log(data);

	// 	var row_items=$.parseJSON(data);


	// 	console.log("--row_items-----"+row_items.length);
	// 	console.log(row_items);

	// 	var timeSet=new Array();
	// 	if (row_items.length>0) {
	// 		for(var i=1;i<row_items.length;i++){

	// 					timeSet[i]=row_items[i]['CT TIME'];
	// 		}
	// 	}						
				

	console.log("--时间数组为-----");
	// 	console.log(timeSet);

	var MYdata=[[Date.UTC(2013,5,2),0.7695],[Date.UTC(2013,5,3),0.7648],[Date.UTC(2013,5,4),0.7645],[Date.UTC(2013,5,5),0.7638],[Date.UTC(2013,5,6),0.7549],[Date.UTC(2013,5,7),0.7562],[Date.UTC(2013,5,9),0.7574],[Date.UTC(2013,5,10),0.7543],[Date.UTC(2013,5,11),0.7510],[Date.UTC(2013,5,12),0.7498],[Date.UTC(2013,5,13),0.7477],[Date.UTC(2013,5,14),0.7492],[Date.UTC(2013,5,16),0.7487],[Date.UTC(2013,5,17),0.7480],[Date.UTC(2013,5,18),0.7466],[Date.UTC(2013,5,19),0.7521],[Date.UTC(2013,5,20),0.7564],[Date.UTC(2013,5,21),0.7621],[Date.UTC(2013,5,23),0.7630],[Date.UTC(2013,5,24),0.7623],[Date.UTC(2013,5,25),0.7644],[Date.UTC(2013,5,26),0.7685],[Date.UTC(2015,5,9),0.8862],[Date.UTC(2015,5,10),0.8829],[Date.UTC(2015,5,11),0.8882],[Date.UTC(2015,5,12),0.8873],[Date.UTC(2015,5,14),0.8913],[Date.UTC(2015,5,15),0.8862],[Date.UTC(2015,5,16),0.8891],[Date.UTC(2015,5,17),0.8821],[Date.UTC(2015,5,18),0.8802],[Date.UTC(2015,5,19),0.8808],[Date.UTC(2015,5,21),0.8794],[Date.UTC(2015,5,22),0.8818],[Date.UTC(2015,5,23),0.8952],[Date.UTC(2015,5,24),0.8924],[Date.UTC(2015,5,25),0.8925],[Date.UTC(2015,5,26),0.8955],[Date.UTC(2015,5,28),0.9113],[Date.UTC(2015,5,29),0.8900],[Date.UTC(2015,5,30),0.8950]];

	var MYdata2=[[Date.UTC(2013,5,2),1.7695],[Date.UTC(2013,5,3),1.7648],[Date.UTC(2013,5,4),1.7645],[Date.UTC(2013,5,5),0.7638],[Date.UTC(2013,5,6),0.7549],[Date.UTC(2013,5,7),0.7562],[Date.UTC(2013,5,9),0.7574],[Date.UTC(2013,5,10),0.7543],[Date.UTC(2013,5,11),0.7510],[Date.UTC(2013,5,12),0.7498],[Date.UTC(2013,5,13),0.7477],[Date.UTC(2013,5,14),0.7492],[Date.UTC(2013,5,16),0.7487],[Date.UTC(2013,5,17),0.7480],[Date.UTC(2013,5,18),0.7466],[Date.UTC(2013,5,19),0.7521],[Date.UTC(2013,5,20),0.7564],[Date.UTC(2013,5,21),0.7621],[Date.UTC(2013,5,23),0.7630],[Date.UTC(2013,5,24),0.7623],[Date.UTC(2013,5,25),1.7644],[Date.UTC(2013,5,26),1.7685],[Date.UTC(2015,5,9),0.8862],[Date.UTC(2015,5,10),0.8829],[Date.UTC(2015,5,11),0.8882],[Date.UTC(2015,5,12),0.8873],[Date.UTC(2015,5,14),0.8913],[Date.UTC(2015,5,15),0.8862],[Date.UTC(2015,5,16),0.8891],[Date.UTC(2015,5,17),0.8821],[Date.UTC(2015,5,18),0.8802],[Date.UTC(2015,5,19),0.8808],[Date.UTC(2015,5,21),0.8794],[Date.UTC(2015,5,22),0.8818],[Date.UTC(2015,5,23),0.8952],[Date.UTC(2015,5,24),0.8924],[Date.UTC(2015,5,25),0.8925],[Date.UTC(2015,5,26),0.8955],[Date.UTC(2015,5,28),0.9113],[Date.UTC(2015,5,29),1.8900],[Date.UTC(2015,5,30),1.8950]];

	$.get('data.json', function (data) {
		console.log("--MYdata222-----");

		// var MYdata2=data;

	// 	console.log("--MYdata-----");
	// 	console.log(MYdata);

	// $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/usdeur.json&callback=?', function (data) {
		// var startDate = new Date(data[data.length - 1][0]), // Get year of last data point
		// 		minRate = 1,
		// 		maxRate = 0,
		// 		startPeriod,
		// 		date,
		// 		rate,
		// 		index;
		// console.log("--MYdata-----");
		var Xdata=new Array();
		var ydata1=new Array();
		var ydata2=new Array();
		var copydata=new Array();

		// startDate.setMonth(startDate.getMonth() - 3); // a quarter of a year before last data point
		// startPeriod = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());


		for (m = 0; m <=data.length - 1; m = m + 1) {
				Xdata[m]=data[m][0];
				ydata1[m]=data[m][1];
				ydata2[m]=data[m][1];

				copydata[m]=new Array(2);
				copydata[m][0]=data[m][0];
				copydata[m][1]=data[m][1]+2*Math.random();

				// copydata.push(data[m]);
		}
		console.log("自己造数据画双轴");
		console.log(copydata[0][0]);
		console.log(copydata);
		console.log(copydata.length);
		// Create the chart
		Highcharts.stockChart('container4', {
			credits: {
				enabled: false
			},
			rangeSelector: {
				selected: 5
			},
			title: {
				text: '基础表实现双轴（自己造数据）',
				style: {
							color: 'black',
							fontWeight: 'bold',
							fontSize: 20
						},
				margin: 30
			},

			yAxis:[
				{
					opposite: false,
					title: {
							text: 'Yzhou1'
					},
				},
				{
					title: {
							text: 'Yzhou2'
					},
				}
			], 
			series: [
				{
					name: ' 类别1',
					data: MYdata2,
					yAxis:1	
				},
				{
					name: ' 类别2',
					data: MYdata,					
				}
			]
		});
	});
}

function drawChart5(){
	var chart = Highcharts.chart('container5', {
	    chart: {
	        type: 'scatter',
	        zoomType: 'xy'
	    },
	    credits: {
					enabled: false
				},
	    title: {
	        text: '指数换手率分布图（散点图）',
	        style: {
						color: 'black',
						fontWeight: 'bold',
						fontSize: 20
					},
			margin: 30
	    },
	    // subtitle: {
	    //     text: '数据来源: Heinz  2003'
	    // },
	    xAxis: {
	        title: {
	            enabled: true,
	            text: '本周换手率历史分位'
	        },
	        labels: {
	        	formatter: function() {
	             	return Math.round(this.value*100) + '%';
	             	// return Highcharts.numberFormat(this.value.percentage,2)+ '%';
	         	}
	        },
	        startOnTick: true,
	        endOnTick: true,
	        showLastLabel: true
	    },
	    yAxis: {
	        title: {
	            text: '上周换手率历史分位'
	        },
	        labels: {
	        	formatter: function() {
	             return Math.round(this.value*100) + '%';
		        }
		    }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'left',
	        verticalAlign: 'top',
	        x: 750,
	        y: 60,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
	        borderWidth: 1
	    },
	    plotOptions: {
	        scatter: {
	            marker: {
	                radius: 5,
	                states: {
	                    hover: {
	                        enabled: true,
	                        lineColor: 'rgb(100,100,100)'
	                    }
	                }
	            },
	            states: {
	                hover: {
	                    marker: {
	                        enabled: false
	                    }
	                }
	            },
	            tooltip: {
	                headerFormat: '<b>{series.name}</b><br>',
	                pointFormat: '{point.x}, {point.y}'
	            }
	        }
	    },
	    series: [{
	        name: '一级行业',
	        color: 'rgba(223, 83, 83, .5)',
	        data: [[0.50, 0.20], [0.52, 0.30], [0.53, 0.18], [0.54, 0.11], [0.55, 0.13]]
	 
	    }, {
	        name: '概念板块',
	        color: 'rgba(119, 152, 191, .5)',
	        data: [[0.90, 0.20], [0.42, 0.30], [0.83, 0.18], [0.14, 0.11], [0.25, 0.13]]
	        // [[10%, 20%], [22%, 30%], [33%, 88%], [54%, 11%], [95%, 13%]]
	    },
	    {
	        name: '细分行业',
	        color: 'rgba(119, 152, 191, 110)',
	        data: [[0.90, 0.40], [0.42, 0.20], [0.83, 0.78], [0.14, 0.91], [0.25, 0.93]]
	    }]
	});
}

function drawChart6(){
	var chart = Highcharts.chart('container6', {
	    chart: {
	        type: 'spline',
	        inverted: true
	    },
	    title: {
	        text: '大气温度和海拔高度关系'
	    },
	    subtitle: {
	        text: '根据标准大气模型绘制'
	    },
	    xAxis: {
	        reversed: false,
	        title: {
	            enabled: true,
	            text: '海拔高度'
	        },
	        labels: {
	            formatter: function () {
	                return this.value + 'km';
	            }
	        },
	        maxPadding: 0.05,
	        showLastLabel: true
	    },
	    yAxis: {
	        title: {
	            text: '温度'
	        },
	        labels: {
	            formatter: function () {
	                return this.value + '°';
	            }
	        },
	        lineWidth: 2,
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {
	        headerFormat: '<b>{series.name}</b><br/>',
	        pointFormat: '{point.x} km: {point.y}°C'
	    },
	    plotOptions: {
	        spline: {
	            marker: {
	                enable: false
	            }
	        }
	    },
	    series: [{
	        name: '温度',
	        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],[50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5],[-60, -27.7], [-70, -55.7], [-20, -76.5]]
	    }]
	});

}

function drawChart7(){
	var data = [[3.275154, 2.957587],    [-3.344465, 2.603513],
    [0.355083, -3.376585],    [1.852435, 3.547351],
    [-2.078973, 2.552013],    [-0.993756, -0.884433],
    [2.682252, 4.007573],
    [-3.087776, 2.878713],    [-1.565978, -1.256985],
    [2.441611, 0.444826],
    [-0.659487, 3.111284],    [-0.459601, -2.618005],
    [2.17768, 2.387793],
    [-2.920969, 2.917485],    [-0.028814, -4.168078],
    [3.625746, 2.119041],    [-3.912363, 1.325108],
    [-0.551694, -2.814223],
    [2.855808, 3.483301],    [-3.594448, 2.856651],
    [0.421993, -2.372646],    [1.650821, 3.407572],
    [-2.082902, 3.384412],    [-0.718809, -2.492514],
    [4.513623, 3.841029],
    [-4.822011, 4.607049],    [-0.656297, -1.449872],
    [1.919901, 4.439368],
    [-3.287749, 3.918836],    [-1.576936, -2.977622],
    [3.598143, 1.97597],    [-3.977329, 4.900932],
    [-1.79108, -2.184517],    [3.914654, 3.559303],
    [-1.910108, 4.166946],    [-1.226597, -3.317889],
    [1.148946, 3.345138],
    [-2.113864, 3.548172],    [0.845762, -3.589788],
    [2.629062, 3.535831],
    [-1.640717, 2.990517],
    [-1.881012, -2.485405],
    [4.606999, 3.510312],
    [-4.366462, 4.023316],
    [0.765015, -3.00127],    [3.121904, 2.173988],
    [-4.025139, 4.65231],
    [-0.559558, -3.840539],
    [4.376754, 4.863579],
    [-1.874308, 4.032237],    [-0.089337, -3.026809],
    [3.997787, 2.518662],
    [-3.082978, 2.884822],
    [0.845235, -3.454465],
    [1.327224, 3.358778],    [-2.889949, 3.596178],
    [-0.966018, -2.839827],
    [2.960769, 3.079555],    [-3.275518, 1.577068],
    [0.639276, -3.41284]];

	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('myCanvas'));

	var clusterNumber = 6;
	// See https://github.com/ecomfe/echarts-stat
	var step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
	var result;

	option = {
	    timeline: {
	        top: 'center',
	        right: 35,
	        height: 300,
	        width: 10,
	        inverse: true,
	        playInterval: 2500,
	        symbol: 'none',
	        orient: 'vertical',
	        axisType: 'category',
	        autoPlay: true,
	        label: {
	            normal: {
	                show: false
	            }
	        },
	        data: []
	    },
	    baseOption: {
	        title: {
	            text: '速度/加速度(象限图)',
	            // subtext: 'By ecStat.hierarchicalKMeans',
	            sublink: 'https://github.com/ecomfe/echarts-stat',
	            left: 'center'
	        },
	        xAxis: {
	            type: 'value'
	        },
	        yAxis: {
	            type: 'value'
	        },
	        series: [{
	            type: 'scatter'
	        }]
	    },
	    options: []
	};

	for (var i = 0; !(result = step.next()).isEnd; i++) {

	    option.options.push(getOption(result, clusterNumber));
	    option.timeline.data.push(i + '');

	}

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);


	function getOption(result, k) {
	    var clusterAssment = result.clusterAssment;
	    var centroids = result.centroids;
	    var ptsInCluster = result.pointsInCluster;
	    var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
	    var series = [];
	    for (i = 0; i < k; i++) {
	        series.push({
	            name: 'scatter' + i,
	            type: 'scatter',
	            animation: false,
	            data: ptsInCluster[i],
	            markPoint: {
	                symbolSize: 29,
	                label: {
	                    normal: {
	                        show: false
	                    },
	                    emphasis: {
	                        show: true,
	                        position: 'top',
	                        formatter: function (params) {
	                            return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
	                                Math.round(params.data.coord[1] * 100) / 100 + ' ';
	                        },
	                        textStyle: {
	                            color: '#000'
	                        }
	                    }
	                },
	                itemStyle: {
	                    normal: {
	                        opacity: 0.7
	                    }
	                },
	                data: [{
	                    coord: centroids[i]
	                }]
	            }
	        });
	    }

	    return {
	        tooltip: {
	            trigger: 'axis',
	            axisPointer: {
	                type: 'cross'
	            }
	        },
	        series: series,
	        color: color
	    };
	}
}

