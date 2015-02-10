function buildCharts(country, start, end, points){

	// console.log(country);
	// console.log(start);
	// console.log(end);
	// console.log(points);

	var country_type;
	switch (country) {
		case 'Nepal':
		case 'Uganda':
		case 'Malawi':
			country_type = 'old';
			break;
		case 'Senegal':
		case 'Timor-Leste':
			country_type = 'new';
			break;
	}

	
	var donor_field, count_field;

	// if ( country_type == 'old' ) {
		// donor_field = 'donor';
		// count_field = 'count';
	// } else {
		donor_field = 'donors';
		count_field = 'location_count';
	// }


// ----------------------------------------------
// build info

	$("#info").html("Between " + start + " and " + end + " there are " + $("#grid_form_option_1").val() + " projects at " + points.features.length + " sites.");


// ----------------------------------------------
// build chart2

	var data2prep = Object()

	for ( var i=0, ix=points.features.length; i<ix; i++ ) {
		var a = points.features[i].properties;

		if ( !data2prep[ a[donor_field] ] ) {
			data2prep[ a[donor_field] ] = 0.0;
		} 

		var sum = 0;

		if (country_type == 'old') {
			sum = parseFloat(a.total_commitments);
			
		} else {
			sum = parseFloat(a.transaction_sum);
		}

		data2prep[ a[donor_field] ] +=  sum / parseInt(a[count_field]);
	}

	var data2 = [],
		keys = Object.keys(data2prep);

	for (var i=0;i<keys.length;i++){

		var point = [ keys[i], data2prep[keys[i]] ];
		data2.push(point);

	}


    if (data2.length == 0){ 
    	return 0;
    }

    var chart2 = {
        chart: {
        	// width:500,
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            marginRight: 50,
            backgroundColor: '#f37735'

        },
        title: {
            text: 'Donor'
        },
        subtitle: {
            text: 'Commitments between ' + start + " and " + end
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
            name: 'Donor',
            data: data2
        }]
    };

	$('#chart2').highcharts( chart2 );


// ----------------------------------------------
// build chart3

	var data3prep = Object()

	for (var i=0;i<points.features.length;i++){
		var a = points.features[i].properties

		if (!data3prep[ a[donor_field] ]){
			data3prep[ a[donor_field] ] = Object()
			data3prep[ a[donor_field] ].aid = 0
			data3prep[ a[donor_field] ].projects = 0
		} 

		var sum = 0

		if (country_type == 'old') {
            sum = parseFloat(a.total_commitments);

		} else {
			sum = parseFloat(a.transaction_sum)
		}

		data3prep[ a[donor_field] ].aid +=  sum / parseInt(a[count_field])
		data3prep[ a[donor_field] ].projects += 1
		
	}

	var data3a = Array()
	var data3b = Array()
	var keys = Object.keys(data3prep)

	for (var i=0;i<keys.length;i++){

		var point1 = [ keys[i], Math.floor( 100 * data3prep[keys[i]].aid ) / 100 ]
		data3a.push(point1)

		var point2 = [ keys[i], data3prep[keys[i]].projects ]
		data3b.push(point2)

	}


    var chart3 = {
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
                text: 'Projects',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Aid',
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
            data: data3a//,
            // tooltip: {
            //     valueSuffix: ''
            // }

        }, {
            name: 'Projects',
            type: 'column',
            data: data3b//,
            // tooltip: {
            //     valueSuffix: ''
            // }
        }]
    };

	$('#chart3').highcharts( chart3 );



}