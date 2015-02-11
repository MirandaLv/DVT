$(function(){

    function buildCharts(country, start, end, points, country_type){

    	// console.log(country);
    	// console.log(start);
    	// console.log(end);
    	// console.log(points);
    	
    	var donor_field, count_field;

    	donor_field = 'donors';
    	count_field = 'location_count';

    // ----------------------------------------------
    // build form summary column chart

        var form_summary_column = {};

       form_summary_column.chart = {
            chart: {
                type: 'column',
                spacingLeft: 300,

                backgroundColor: 'rgba(255,255,255,0)'//'#f37735'
            },
            title: {
                text: country +' Critical Aid Overview'
            },
            xAxis: {
                categories: [
                    'Agriculture',
                    'Education',
                    'Health',
                    'Industry'
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'Aid'
                }
            }],
            legend: {
                shadow: false
            },        
            credits:{
                enabled:false
            }, 
            exporting: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Sector',
                data: [form_data[country]['Agriculture']['total'], form_data[country]['Education']['total'], form_data[country]['Health']['total'], form_data[country]['Industry']['total']],
                pointPadding: 0.2,
                pointPlacement: 0.0
            }, {
                name: 'Low Income',
                data: [form_data[country]['Agriculture']['ec_tot'], form_data[country]['Education']['ec_tot'], form_data[country]['Health']['ec_tot'], form_data[country]['Industry']['ec_tot']],
                pointPadding: 0.45,
                pointPlacement: -0.1
            }, {
                name: 'Low Yield',
                data: [form_data[country]['Agriculture']['ag_tot'], form_data[country]['Education']['ag_tot'], form_data[country]['Health']['ag_tot'], form_data[country]['Industry']['ag_tot']],
                pointPadding: 0.45,
                pointPlacement: 0.0,
            }, {
                name: 'Urban',
                data: [form_data[country]['Agriculture']['ur_tot'], form_data[country]['Education']['ur_tot'], form_data[country]['Health']['ur_tot'], form_data[country]['Industry']['ur_tot']],
                pointPadding: 0.45,
                pointPlacement: 0.1,
            }, {
                type: 'pie',
                name: 'Sector',
                data: [form_data[country]['Agriculture']['total'], form_data[country]['Education']['total'], form_data[country]['Health']['total'], form_data[country]['Industry']['total']],
                center: [-225, 150],
                size: 200,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        };

    // ----------------------------------------------
    // build donor aid pie chart
        
        var donor_aid_pie = {
            limit: 10 // limit numbers of donors, rest are group into "Others" category
        };

        // build raw donor aid data from points geojson
    	donor_aid_pie.raw = {};
    	for ( var i=0, ix=points.features.length; i<ix; i++ ) {
    		var a = points.features[i].properties;

    		if ( !donor_aid_pie.raw[ a[donor_field] ] ) {
    			donor_aid_pie.raw[ a[donor_field] ] = 0.0;
    		} 

    		var sum = 0;

    		if (country_type == 'old') {
    			sum = parseFloat(a.total_commitments);
    			
    		} else {
    			sum = parseFloat(a.transaction_sum);
    		}

            sum = ( isNaN(sum) ? 0 : sum );

            // if ( sum > 0 ) {
                // console.log(sum)
                donor_aid_pie.raw[ a[donor_field] ] +=  sum / parseInt(a[count_field]);
            // }
    	}

        // sort raw
        donor_aid_pie.sorted = [];
        donor_aid_pie.keys = _.keys(donor_aid_pie.raw);
        for (var i=0, ix=donor_aid_pie.keys.length; i<ix; i++) {
            var key = donor_aid_pie.keys[i];
            donor_aid_pie.sorted.push([key, donor_aid_pie.raw[key]])
        }
        donor_aid_pie.sorted.sort(function(a, b) {return b[1] - a[1]})


        // only use top x donors (defined by donor_aid_pie.limit), rest are group into "Others" category
        donor_aid_pie.data = [];
    	for (var i=0;i<donor_aid_pie.sorted.length;i++){

            if (donor_aid_pie.sorted[i][1] > 0) {
                if ( i < donor_aid_pie.limit ) {
                    var point = donor_aid_pie.sorted[i];
            		donor_aid_pie.data.push(point);
                } else if ( i == donor_aid_pie.limit ) {
                    var point = [ 'Other', donor_aid_pie.sorted[i][1] ];
                    donor_aid_pie.data.push(point);         
                } else {
                    var donor_count = i - donor_aid_pie.limit;
                    donor_aid_pie.data[donor_aid_pie.limit][0] = 'Other ('+ donor_count +')';
                    donor_aid_pie.data[donor_aid_pie.limit][1] += donor_aid_pie.sorted[i][1];

                    // console.log( donor_aid_pie.sorted[i][1] )
                    // console.log( donor_aid_pie.data[donor_aid_pie.limit][1] )
                }
            }

    	}

        // return if no data
        if (donor_aid_pie.data.length == 0){ 
        	return 0;
        }

        donor_aid_pie.chart = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                marginRight: 50,
                backgroundColor: 'rgba(255,255,255,0)'//'#f37735'

            },
            title: {
                text: 'Top '+donor_aid_pie.limit+' '+$('#grid_form_option_1').val()+' Donors'
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
            exporting: {
                enabled: false
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
                data: donor_aid_pie.data
            }]
        };


    // ----------------------------------------------
    // build donor project count and aid column chart

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
                backgroundColor: 'rgba(255,255,255,0)'//'#ffc425'

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
            exporting: {
                enabled: false
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




    // ----------------------------------------------
    // build

        var html;
        $('#grid_temp').empty();
        
        html = '';
        html += '<div class="grid_container"><div class="info_container"><div class="info_text">';
        html += 'Between ' + start + ' and ' + end + ' there are ' + $('#grid_form_option_1').val() + ' projects at ' + points.features.length + ' sites across '+country+'. ';
        html += 'Get the <a href="http://labs.aiddata.org/aiddata/home/datasets.php">raw data</a> or build you own subset of the data using our <a href="http://labs.aiddata.org/aiddata/DAT/">data access tool</a>.';
        html += '</div></div></div>';
        $('#grid_temp').append(html);


        $('#grid_temp').append('<div class="grid_container"><div id="form_summary_column"></div></div>');
        $('#form_summary_column').highcharts( form_summary_column.chart );

        html = '';
        html += '<div class="grid_container"><div class="info_container"><div class="info_text">';
        html += 'Temporary Text.</a>.';
        html += '</div></div></div>';
        $('#grid_temp').append(html);

        $('#grid_temp').append('<div class="grid_container"><div id="donor_aid_pie"></div></div>');
        $('#donor_aid_pie').highcharts( donor_aid_pie.chart );

        html = '';
        html += '<div class="grid_container"><div class="info_container"><div class="info_text">';
        html += 'Want to explore the data more? Run a detailed analysis using the <a href="http://labs.aiddata.org/aiddata/DASH/">AidData DASH tool</a>.';
        html += '</div></div></div>';
        $('#grid_temp').append(html);

        $('#grid_temp').append('<div class="grid_container"><div id="chart3"></div></div>');
        $('#chart3').highcharts( chart3 );

        html = '';
        html += '<div class="grid_container"><div class="info_container"><div class="info_text">';
        html += 'To learn more about AidData visit <a href="http://www.aiddata.org">AidData.org</a>.';
        html += '</div></div></div>';
        $('#grid_temp').append(html);

    }

});