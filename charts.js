

function buildCharts(start, end, points, extract){

	// console.log(start +" "+ end)

	// console.log(points.features.length)

	// console.log(extract.features.length)

	$("#info").html("Between " + start + " and " + end + " there are projects at " + points.features.length + " sites, across " + extract.features.length + " districts.")
	$("#info").css("background-color","#00b159")
	var data = Array()

	for (var i=0;i<extract.features.length;i++){
		var a = extract.features[i].properties
		var point = [parseFloat(a.ndvi), parseFloat(a.sum)]
		data.push(point)

	}

	$(function () {
	    $('#chart1').highcharts({
	        chart: {
	        	// width:500,
	            type: 'scatter',
	            zoomType: '',
	            marginRight: 50,
	            plotBorderWidth: 0,
	            backgroundColor: '#00aedb'

	        },
	        title: {
	            text: 'Aid vs NDVI'
	        },
	        subtitle: {
	            text: '('+start+' - '+end+')'
	        },
	        xAxis: {
	            title: {
	                enabled: true,
	                text: 'NDVI (in 2001)'
	            },
	            startOnTick: true,
	            endOnTick: true,
	            showLastLabel: true
	        },
	        yAxis: {
	            title: {
	                text: 'Aid (USD)'
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'left',
	            verticalAlign: 'top',
	            x: 10,
	            y: 0,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(100,100,100,0.2)',
	            borderWidth: 1
	        },
	        credits:{
        		enabled:false
        	},
	        plotOptions: {
	            scatter: {
	                marker: {
	                    radius: 5,
	                    states: {
	                        hover: {
	                            enabled: true,
	                            lineColor: 'rgb(255,0,0)'
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
	                    pointFormat: 'Aid: ${point.y:,.2f}<br>NDVI: {point.x:.3f} '
	                }
	            }
	        },
	        series: [{
	            name: 'Nepal Districts',
	            color: 'rgba(255, 255, 255, .75)',
	            data: data//[[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8]]
	        }]
	    });
	});

	var data2prep = Object()

	for (var i=0;i<points.features.length;i++){
		var a = points.features[i].properties

		if (!data2prep[a.donors]){
			data2prep[a.donors] = 0.0
		} 

		var sum = 0

		for (var j=start;j<=end;j++){
			sum += parseFloat(a["d_"+j])
		}

		data2prep[a.donors] +=  sum
		
	}

	var data2 = Array()
	var keys = Object.keys(data2prep)
	for (var i=0;i<keys.length;i++){

		var point = [ keys[i], data2prep[keys[i]] ]
		data2.push(point)
	}


	$(function () {
	    if (data2.length == 0){ return 0 }

	    $('#chart2').highcharts({
	        chart: {
	        	// width:500,
	            plotBackgroundColor: null,
	            plotBorderWidth: 0,//null,
	            plotShadow: false,
	            marginRight: 50,
	            backgroundColor: '#f37735'

	        },
	        title: {
	            text: 'Donors'
	        },
	        subtitle: {
	            text: 'Disbursements between ' + start + " and " + end
	        },
	        tooltip: {
	            pointFormat: '${point.y:,.2f} '
	        },        
	        credits:{
        		enabled:false
        	},
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    // format: '<b>{point.name}</b>: {point.percentage:.1f}%',
	                    
	                    formatter: function(){
		                    if (this.point.name.length > 20){
		                        return this.point.name.substr(0,20) + "... " + round(this.percentage,1) + "%";
		                    }else{
		                         return this.point.name + " " + round(this.percentage,1) + "%";   
		                    }  

		                    function round(x,y){
		                    	return Math.floor(x*10*y)/(10*y)
		                    }                      
		                },
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Donors',
	            data: data2
	        }]
	    });
	});




	var data3prep = Object()

	for (var i=0;i<points.features.length;i++){
		var a = points.features[i].properties

		if (!data3prep[a.donors]){
			data3prep[a.donors] = Object()
			data3prep[a.donors].aid = 0
			data3prep[a.donors].projects = 0
		} 

		var sum = 0

		for (var j=start;j<=end;j++){
			sum += parseFloat(a["d_"+j])
		}

		data3prep[a.donors].aid +=  sum
		data3prep[a.donors].projects += 1
		
	}

	var data3a = Array()
	var data3b = Array()
	var keys = Object.keys(data3prep)
	for (var i=0;i<keys.length;i++){

		var point1 = [ keys[i], data3prep[keys[i]].aid ]
		data3a.push(point1)

		var point2 = [ keys[i], data3prep[keys[i]].projects ]
		data3b.push(point2)

	}

$(function () {
    $('#chart3').highcharts({
        chart: {
        	// width:500,
            zoomType: '',
            // height: 700,
            spacingLeft: 10,
            marginRight: 100,
            backgroundColor: '#ffc425'

        },
        title: {
            text: 'Donor Aid and Numbers of Projects'
        },
        subtitle: {
            text: '('+start+' - '+end+')'
        },
        xAxis: {
            categories: Object.keys(data3prep),
        	labels:{
	          	rotation: -45,
	        	// style: {
          //       	width: '100%'
          //   	}
                formatter: function(){
                    if (this.value.length > 20){
                        return this.value.substr(0,20) + "...";
                    }else{
                         return this.value;   
                    }                        
                }
            
	        }
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Aid',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Projects',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 10,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: 'rgba(255,255,255,0)' //(Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        credits:{
        	enabled:false
        },
        series: [{
            name: 'Aid',
            type: 'column',
            yAxis: 1,
            data: data3b//,
            // tooltip: {
            //     valueSuffix: ''
            // }

        }, {
            name: 'Projects',
            type: 'column',
            data: data3a//,
            // tooltip: {
            //     valueSuffix: ''
            // }
        }]
    });
});


}