// var user =35;
// console.log(user);
$(function(){ 
	console.log("开始画图--");
	drawChart();
	// drawChart2(); 
	// drawChart3();
	// drawChart4();
	// drawChart5();
	// drawChart6();
	// drawChart7();
});

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

	// $.get('data.json', function (data) {
	// 	console.log("--MYdata222-----");

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
		// var Xdata=new Array();
		// var ydata1=new Array();
		// var ydata2=new Array();
		// var copydata=new Array();

		// startDate.setMonth(startDate.getMonth() - 3); // a quarter of a year before last data point
		// startPeriod = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());


		// for (m = 0; m <=data.length - 1; m = m + 1) {
		// 		Xdata[m]=data[m][0];
		// 		ydata1[m]=data[m][1];
		// 		ydata2[m]=data[m][1];

		// 		copydata[m]=new Array(2);
		// 		copydata[m][0]=data[m][0];
		// 		copydata[m][1]=data[m][1]+2*Math.random();

		// 		// copydata.push(data[m]);
		// }
		// console.log("自己造数据画双轴");
		// console.log(copydata[0][0]);
		// console.log(copydata);
		// console.log(copydata.length);
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
	// });
}
