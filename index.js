$(document).ready(function(){


//--------------------------------------------------------------------------------------------------
// landing page
//--------------------------------------------------------------------------------------------------


	// file paths (static)
	var fp = {
		'form_data': 			'../data/form/form_data.json',
		'carousel_items': 		'jcarousel.json',
		'd3-world': 			'../data/world/d3-world.json',
		'world-country-names':  '../data/world/world-country-names.tsv'
	};

 	var form_data;
 	readJSON(fp["form_data"], function (request, status, error){
 		if (error){
 			console.log(error);
 			return 1;
 		}
 		form_data = request;
 	})


	//--------------------------------------------------
	// form
	//--------------------------------------------------


	$("#intro_form select").on("change", function(){

	 	var type = $('#intro_form_option_1').val();
	 	var sub = $('#intro_form_option_2').val();

	 	$("#grid_form_option_1").val(type);
	 	$("#grid_form_option_2").val(sub);

	 	var total = form_data["Global"][type]["total"];
	 	var percent = form_data["Global"][type][sub];
	 	
	 	total = shortNum(total, 2);

	 	$("#intro_variable1").text("$"+total);
	 	$("#intro_variable2").text(percent + "%");

	 	countryMapChart(form_data, type, sub);
	});


	//--------------------------------------------------
	// d3 map, country info boxes, country charts
	//--------------------------------------------------


	var margin = {top: 0, left: 0, bottom: 0, right: 0},
	   	width = parseInt(d3.select('#intro_map').style('width')),
	   	width = width - margin.left - margin.right,
	   	mapRatio = .448,
	   	height = width * mapRatio;

	var projection = d3.geo.equirectangular()
		.scale(width / 6.2)
		.translate([ width / 2, width / 3.7]);

	var path = d3.geo.path()
	    .projection(projection);

	var svg = d3.select("#intro_map").append("svg")
	    .attr("width", width)
	    .attr("height", height);


// **********************************************
// ************ UPDATE COUNTRY INFO *************
// **********************************************
	
	// procedure for adding a new country:
	
	// EXTERNAL
	// run importMongo script
	// add country to DET
	// add country to jcarousel.json
	
	// INTERNAL
	// add country object to countryDims 
	// - set x,y for info and line (requires trial and error to find good fit)
	// - add continent and type (old for pre-senegal, new for senegal format)

	// init
	var countryInfo = {},
		countryLine = {},
		countryDims = {
			'Nepal': {
				info: [1.3, 3.5],
				line: [1.36, 2.35],
				continent: 'Asia',
				type: 'old'
			},
			'Uganda': {
				info: [1.5, 1.9],
				line: [1.67, 1.69],
				continent: 'Africa',
				type: 'old'
			},
			'Malawi': {
				info: [1.65, 1.15],
				line: [1.67, 1.43],
				continent: 'Africa',
				type: 'old'
			},
			'Senegal': {
				info: [2.6, 2.6],
				line: [2.2, 1.99],
				continent: 'Africa',
				type: 'new'
			},
			'Timor-Leste': {
				info: [1.35, 1.4],
				line: [1.175, 1.52],
				continent: 'Asia',
				type: 'new'
			}
		};
		// info_Nepal, info_Uganda, info_Malawi,
		// line_Nepal,	line_Uganda, line_Malawi;

	// initialize map info containers
	buildCountryInfo("init");

    // $('#info_Nepal .map_image').css({
    //     'background-image': 'url("/aiddata/imgs/nepal-outline.png")', 
    //     'width': '85%',
    //     'height': '85%',
    //     'top': '25%',
    //     'left': '5%'
    // });

    // $('#info_Uganda .map_image').css({
    //     'background-image': 'url("/aiddata/imgs/uganda-outline.png")', 
    //     'width': '75%',
    //     'height': '75%',
    //     'top': '10%',
    //     'left': '15%'
    // });

    // $('#info_Malawi .map_image').css({
    //     'background-image': 'url("/aiddata/imgs/malawi-outline.png")', 
    //     'width': '85%',
    //     'height': '85%',
    //     'top': '5%',
    //     'left': '35%'
    // });

   

	// initialize map info containers
	function buildCountryInfo(call){

		if (call == "init") {

		// 	info_Nepal = d3.select("#intro_map").append("div")
		// 		.attr("class", "map_info_container").attr("id","info_Nepal").attr("title", "Nepal")
		// 		.html("<div class='map_info'><div class='map_title'><a>NEPAL</a></div><div class='map_image'></div><div id='chart_Nepal' class='map_chart'></div></div>");
			
		// 	info_Uganda = d3.select("#intro_map").append("div")
		// 		.attr("class", "map_info_container").attr("id","info_Uganda").attr("title", "Uganda")
		// 		.html("<div class='map_info'><div class='map_title'><a>UGANDA</a></div><div class='map_image'></div><div id='chart_Uganda' class='map_chart'></div></div>");

		// 	info_Malawi = d3.select("#intro_map").append("div")
		// 		.attr("class", "map_info_container").attr("id","info_Malawi").attr("title", "Malawi")
		// 		.html("<div class='map_info'><div class='map_title'><a>MALAWI</a></div><div class='map_image'></div><div id='chart_Malawi' class='map_chart'></div></div>");
			
	    	var keys = _.keys(countryDims);
	    	for (var i=0, ix=keys.length; i<ix; i++) {
	    		var country = keys[i];
	    		var html = '';

	    		html += '<div class="map_info">';
	    		html += '<div class="map_title"><a>'+country.toUpperCase()+'</a></div>';
	    		// html += '<div class="map_image"></div>';
	    		// html += '<div id="center_'+country+'" class="map_center"></div>';

	    		html += '<div id="chart_'+country+'" class="map_chart"></div>';
	    		html += '</div>';

				countryInfo[country] = d3.select("#intro_map").append("div")
						.attr("class", "map_info_container").attr("id","info_"+country).attr("title", country)
						.html(html);
			}

		}

		// info_Nepal.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;");
		// info_Uganda.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;");
		// info_Malawi.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;");

		// countryInfo['Nepal'].attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;");
		// countryInfo['Uganda'].attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;");
		// countryInfo['Malawi'].attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.35 - 40) + "px;");
		// countryInfo['Senegal'].attr("style", "left:" + (width/2.6 - 40) + "px; top:" + (height/2.6 - 40) + "px;");
		// countryInfo['Timor-Leste'].attr("style", "left:" + (width/1.28 - 40) + "px; top:" + (height/1.12 - 40) + "px;");

    	var keys = _.keys(countryDims);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];
			countryInfo[country].attr("style", "left:" + (width/ countryDims[country].info[0] - 40) + "px; top:" + (height/countryDims[country].info[1] - 40) + "px;");
		}


	}

	function buildCountryLines(call){

		if (call == "init") {

			// line_Nepal = svg.append("line").attr("id","line_Nepal").attr("class", "map_line")
			// 				   			   .attr("stroke", "black").attr("stroke-width", "1");
			// line_Uganda = svg.append("line").attr("id","line_Uganda").attr("class", "map_line")
			// 							    .attr("stroke", "black").attr("stroke-width", "1");
			// line_Malawi = svg.append("line").attr("id","line_Malawi").attr("class", "map_line")
			// 	   							.attr("stroke", "black").attr("stroke-width", "1");

	    	var keys = _.keys(countryDims);
	    	for (var i=0, ix=keys.length; i<ix; i++) {
	    		var country = keys[i];
				countryLine[country] = svg.append("line").attr("id","line_"+country).attr("class", "map_line")
				   			   						     .attr("stroke", "black").attr("stroke-width", "1");
			}

		}

		// line_Nepal.attr("x1", width/1.34).attr("y1", height/2.3).attr("x2", width/1.2).attr("y2", height/2.9);
		// line_Uganda.attr("x1", width/1.68).attr("y1", height/1.65).attr("x2", width/1.5).attr("y2", height/2);
		// line_Malawi.attr("x1", width/1.67).attr("y1", height/1.43).attr("x2", width/1.45).attr("y2", height/1.3);

		// countryLine['Nepal'].attr("x1", width/1.34).attr("y1", height/2.3).attr("x2", width/1.2).attr("y2", height/2.9);
		// countryLine['Uganda'].attr("x1", width/1.68).attr("y1", height/1.65).attr("x2", width/1.5).attr("y2", height/2);
		// countryLine['Malawi'].attr("x1", width/1.67).attr("y1", height/1.43).attr("x2", width/1.45).attr("y2", height/1.35);
		// countryLine['Senegal'].attr("x1", width/2.2).attr("y1", height/2.0).attr("x2", width/2.6).attr("y2", height/2.6);
		// countryLine['Timor-Leste'].attr("x1", width/1.17).attr("y1", height/1.52).attr("x2", width/1.28).attr("y2", height/1.12);

    	var keys = _.keys(countryDims);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];
			countryLine[country].attr("x1", width/ countryDims[country].line[0] ).attr("y1", height/ countryDims[country].line[1] )
								.attr("x2", width/ countryDims[country].info[0] ).attr("y2", height/ countryDims[country].info[1] );
		}
	}

	// manages building and updating of map charts
	function countryMapChart(form_data, type, sub){

		var percent = {},
			sector = {},
			raw = {};

		// percent['Nepal'] = form_data["Nepal"][type][sub];
		// buildMapChart('#chart_Nepal', percent['Nepal']);

		// percent['Uganda'] = form_data["Uganda"][type][sub];
		// buildMapChart('#chart_Uganda', percent['Uganda']);

		// percent['Malawi'] = form_data["Malawi"][type][sub];
		// buildMapChart('#chart_Malawi', percent['Malawi']);

		// percent['Senegal'] = form_data["Senegal"][type][sub];
		// buildMapChart('#chart_Senegal', percent['Senegal']);

		// percent['Timor-Leste'] = form_data["Timor-Leste"][type][sub];
		// buildMapChart('#chart_Timor-Leste', percent['Timor-Leste']);

		var keys = _.keys(countryDims);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];
			percent[country] = form_data[country][type][sub];

			sector[country] = 100 * form_data[country][type].total /  form_data[country].Total.total;

			raw[country] = shortNum(form_data[country][type].total, 0, 1);

			buildMapChart(country, percent[country], sector[country], raw[country]);
		}

	}

// **********************************************
// **********************************************
// **********************************************


	//link map info popups to map elements
	$(".map_info").hover(
		function(){
			var title = $(this).parent().attr("title");
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					var updateClass = $(this).attr("class") + " map_countrySelected_hover";
					$(this).attr("class", updateClass);
				}
			});
		}, function(){
			var title = $(this).parent().attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					$(this).attr("class", "map_country map_countrySelected");
				}
			});
		}
	);

	// map info clicks -- TEMP DISABLED
	$(".map_info").on("click", function(){
    	var sel_country = $(this).parent().attr("title");
	    mapClick(sel_country);
    });


	// load countries and names
	queue()
	    .defer(d3.json, fp["d3-world"])
	    .defer(d3.tsv, fp["world-country-names"])
	    .await(ready);

	// resize map when window size changes
	d3.select(window).on("resize", sizeChange);
	
  
	// build map
	function ready(error, world, names) {
		var countries = topojson.feature(world, world.objects.countries).features;

		countries.forEach(function(d) {
			d.name = names.filter(function(n) { return d.id == n.id; })[0].name;
		});

		var country = svg.selectAll(".map_country").data(countries);

		country.enter().insert("path").attr("class", function(d, i) {
		 	return countrySpecific(d, i);
		})
		.attr("title", function(d, i) {
			return d.name;
		})
		.attr("d", path);
	   
		a = d3.selectAll(".map_countrySelected");
	   
		//link map elements to map info popups
		a.on("mouseenter", function(){
			var title = $(this).attr("title");
			$(".map_info").each(function(){
				if ($(this).parent().attr("title")==title){
					var updateClass = $(this).attr("class") + " map_info_hover";
					$(this).attr("class", updateClass);
				}
			});
		});

		a.on("mouseleave", function(){
			var title = $(this).attr("title");
			$(".map_info").each(function(){
				if ($(this).parent().attr("title")==title){
					$(this).attr("class", "map_info");
				}
			})
		});

		// map element clicks -- TEMP DISABLED
	    a.on("click", function(){
	        var sel_country = $(this).attr("title");
   	   		mapClick(sel_country);
	    });

	    buildCountryLines("init");
	}
	 
	//check if country is active (do we have data for it)
	function countrySpecific(d, i) {
	    if ( countryDims[d.name] ){
	    	return 'map_country map_countrySelected';
	    } else {
	    	return 'map_country';
	    }
	}

	// manage map and map info resizing
	function sizeChange(){

	    // adjust when the window size changes
	    width = parseInt(d3.select('#intro_map').style('width'));
	    width = width - margin.left - margin.right;
	    height = width * mapRatio;

	    // update projection
	    projection
	        .translate([width / 2, width / 3.7])
	        .scale(width /6.2);

	    path = d3.geo.path()
	    	.projection(projection);

	    // resize the map container
	    svg
	        .style('width', width + 'px')
	        .style('height', height + 'px');

	    // resize the map
	    svg.selectAll('.map_country').attr('d', path);


	    // update map info box positions
	    buildCountryInfo();

		// update map info lines
		buildCountryLines();
	}


	// builds map charts
    function buildMapChart(country, percent, sector, raw){

    	var container = '#chart_'+country;

    	// build pie chart
		var colors = Highcharts.getOptions().colors,
			outerData, innerData;
	        // categories = [
					    //     '% '+ $("#intro_form_option_1>option:selected").html() +' aid in '+ $("#intro_form_option_2>option:selected").html() +' areas', 
					    //     '%  '+ $("#intro_form_option_1>option:selected").html() +' aid in other areas'
					    //  ],
	    //     data = [{
	    //         y: percent,
	    //         color: colors[0]
	    //     }, {
	    //         y: 100-percent,
	    //         color: colors[1]
	    //     }],
	    //     mapChartSeriesData = [];


	    // // Build the data arrays
	    // for (var i = 0; i < 2; i++) {

	    //     mapChartSeriesData.push({
	    //         name: categories[i],
	    //         y: data[i].y,
	    //         color: data[i].color
	    //     });
	    // }

	    outerData = [{
	    	name:  '% '+ $("#intro_form_option_1>option:selected").html() +' aid in '+ $("#intro_form_option_2>option:selected").html() +' areas',
            y: percent,
            color: 'rgba(44,155,200,0.85)' // '#2c9bc8' // blue	
	    },{
			name: '% '+ $("#intro_form_option_1>option:selected").html() +' aid in other areas',
            y: Math.floor( (100-percent)*100 ) / 100,
            color: colors[1]
	    }]

	    innerData = [{
			name: '% all of aid in '+ $("#intro_form_option_1>option:selected").html() +' sector projects',
            y: Math.floor( sector*100 ) / 100,
            color: 'rgba(204,76,67,0.85)' // '#cc4345' //red
	    },{
			name: '% all aid in other sector projects',
            y: Math.floor( (100-sector)*100 ) / 100,
            color: 'rgba(150,150,150,0.85)' // '#969696' // gray
	    }]

	    //chart obj
	    var chart_options = {
	        chart: {
	            type: 'pie',
	            backgroundColor: 'rgba(0,0,0,0)',
	            margin: [0, 0, 0, 0],
		        spacingTop: 0,
		        spacingBottom: 0,
		        spacingLeft: 0,
		        spacingRight: 0,
		        events: {
		        	click: function(){
		        		$(this.container).trigger('click');
		        	}
		        }
	        },
	        title: {
	            text: ''
	        },
	        yAxis: {
	            title: {
	                text: ''
	            }
	        },
	        plotOptions: {
	            pie: {
	                shadow: false,
	                center: ['50%', '50%'],
	                borderWidth: '0px',
	                events: {
	                	click: function(){
	                		$(this.chart.container).trigger('click');
	                	}
	                }
	            },
	            series:{
	            	states: {
	                	hover: {
	                    	enabled: false
	                	}
	                }
	            }
	        },
	        tooltip: {
	        	hideDelay: 0.5,
	        	pointFormat: '<b>{point.y}</b>',
	            valueSuffix: '%',
	            positioner: function () {
	                return { x: -30, y: -60 };
	            },
	        },
	        series: [ {
	            name: 'Data',
	            data: outerData,
	            size: '165%',
	            innerSize: '150%',
	            dataLabels: {
	                enabled: false,
	            }
	        },
	        {
	            name: 'Center',
	            data: innerData,
	            size: '100%',
	            dataLabels: {
	                enabled: false,
	            }
	        }],
	        exporting:{
	        	enabled:false
	        },
	        credits:{
	        	enabled:false
	        }
	    };

	    //render chart
	    $(container).highcharts(chart_options);

	    // add raw text
	    // var html = raw;
	    // $('#center_'+country).html( html );


	}


	//--------------------------------------------------
	// carousel and tabs
	//--------------------------------------------------


	var carousel_items;
	readJSON(fp["carousel_items"],  function (request, status, error){
 		if (error){
 			console.log(error);
 			return 1;
 		}
 		carousel_items = request;
 	})
 	// console.log(carousel_items);

	var carousel_init = true;

    // manage tab selection
    $(".jcarousel-tab-container").on("click", function(){

        if ( $(this).hasClass("jcarousel-tab-active") && carousel_init == false ){
            return 0;
        }

        $(".jcarousel-tab-active").removeClass("jcarousel-tab-active");
        $(this).addClass("jcarousel-tab-active");

        var tab_class = $(this).children().eq(0).attr("id");

        $("#intro_carousel").animate({opacity:0}, function(){

            if ($(".jcarousel ul").children().length == 0){
                initCarousel();
            }

            buildCarousel(tab_class);

            $(window).resize();

            $(".jcarousel").jcarousel('reload');
            $('.jcarousel-pagination').jcarouselPagination('reloadCarouselItems');
            $('.jcarousel-pagination').jcarouselPagination('reload');

            carousel_init = false;

           $("#intro_carousel").animate({opacity:1});

        })
    })


    // initialize carousel settings
    function initCarousel(){

        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();
                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }
                // var width = 300
                jcarousel.jcarousel('items').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                carousel: jcarousel,
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    }

    // build carousel html
    function buildCarousel(type){
        $(".jcarousel ul").empty();
         // $('.jcarousel-pagination').empty();

        $.each(carousel_items, function(i,v){
        // for (var i=0;i<carousel_items.length;i++){
            if ( type == "jcarousel-general" || type == "jcarousel-"+carousel_items[i].type){

                var data_html = "";       
            	
            	// if item is a country, get country info from form_data.json
            	if (carousel_items[i].type == "country"){
            		data_html += "<span><b>projects</b>: "+form_data[carousel_items[i].title]["Total"]["projects"].toLocaleString()+"</span>";
            		data_html += "<span><b>total aid</b>: $"+form_data[carousel_items[i].title]["Total"]["total"].toLocaleString()+"</span>";
            	}

                // get general info from jcarousel.json
                var data_info = carousel_items[i].data;

                for (var key in data_info){
                    data_html += "<span><b>"+key+"</b>: "+data_info[key]+"</span>";
                }
                
                // put carousel item together
                var carousel_html = '<li class="jcarousel-'+carousel_items[i].type+'"><div class="jcarousel-content"><span><a class="jcarousel-title" title="'+carousel_items[i].title+'" ';
                
                if (carousel_items[i].link != ""){
                    carousel_html += 'href="'+carousel_items[i].link+'"';
                }
                
                carousel_html += '>'+carousel_items[i].title+'</a></span> <div class="jcarousel-info">'+data_html+'</div> </div></li>';
                
                // add item to carousel
                $(".jcarousel ul").append(carousel_html);
            } 
        });

        $(".jcarousel-country a").on("click", function(){
            var sel_country = $(this).attr("title");
            mapClick(sel_country);
        });
    }


	//--------------------------------------------------
	// load country page
	//--------------------------------------------------


	var grid_country = '',
		old_country = '',
		country_type;

	var start_year, end_year,
		map, tiles, 
		geojson, geojsonExtract,
		markers, geojsonPoints;

	// init year range
	start_year = 2005;
	end_year = 2014;

	function mapClick(country){
		old_country = grid_country;
    	grid_country = country;

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

		$("#intro").hide();
		$("#frontpage").hide();
        $('html, body').animate({ scrollTop: 0 }, 0);

		$("#content").fadeIn("slow");

		if (old_country != ''){
			map.remove();
		}

		// if (old_country != grid_country){
			// $("#grid_logo div").css("background-image","url('/aiddata/imgs/"+country.toLowerCase()+"-outline.png')");
			$("#grid_title, #grid_country").html(grid_country);
			
			mapInit();
		// }

		window.dispatchEvent(new Event('resize'));
	}


	//--------------------------------------------------
	// init / triggers for landing page
	//--------------------------------------------------


	$("#intro_form_option_1").change();
    $("#jcarousel-general").parent().trigger("click");


	//--------------------------------------------------------------------------------------------------
	// grid
	//--------------------------------------------------------------------------------------------------
		

	//init "grid" style functionallity
	// $("#grid").sortable({
		// distance:1
	// });

	// natural form
	$("#grid_form select").on("change", function(){

		// get type and subtype
	 	var type = $('#grid_form_option_1').val();
	 	var sub = $('#grid_form_option_2').val();

		$("#intro_form_option_1").val(type);
		$("#intro_form_option_2").val(sub);
		$("#intro_form_option_1").change();
		
	 	// update form
	 	var total = form_data[grid_country][type]["total"];
	 	
	 	total = shortNum(total,2);

	 	$("#grid_variable1").text("$"+total);

	 	var percent = form_data[grid_country][type][sub].toLocaleString();
	 	$("#grid_variable2").text(percent + "%");

		if ( $(this).attr('id') == 'grid_form_option_1' ) {
		 	//update map
			addPointData(grid_country, type);

			// update charts
		 	buildCharts(grid_country, start_year, end_year, geojsonPoints, country_type);

		 	setTimeout(function(){ 
		 		map.invalidateSize()
			 	window.dispatchEvent(new Event('resize'))
		 	}, 2000);
	 	}
	});

	// return to landing page from country page
	$("#grid_back").on("click", function(){
		$("#content").hide();
		$("#intro").show();
		$("#frontpage").show();
		window.dispatchEvent(new Event('resize'));
	});


	// initialize leaflet map and trigger initial form options
	function mapInit(){

		L.mapbox.accessToken = 'pk.eyJ1Ijoic2dvb2RtIiwiYSI6InotZ3EzZFkifQ.s306QpxfiAngAwxzRi2gWg';

		map = L.mapbox.map('map', { });

		tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
				}).addTo(map);

		map.setView([0,0], 1);

		map.options.minZoom = 3;
		map.options.maxZoom = 11;
		// mapControlToggle(0);
		
	 	addCountry('../DET/resources/'+countryDims[grid_country].continent.toLowerCase()+'/'+grid_country.toLowerCase()+'/shapefiles/ADM1/Leaflet.geojson')

		//trigger initial form options
		$("#grid_form_option_1").change();
	}

	function addCountry(file){

		if (map.hasLayer(geojson)){
			map.removeLayer(geojson);
		}

		readJSON(file, function (request, status, error){
	 		if (error){
	 			console.log(error);
	 			return 1;
	 		}
	 		geojsonExtract = request;
	 	})

 		// console.log(file)
 		// console.log(geojsonExtract)
			
		function style(feature) {
		    return {
		        fillColor: '#31a354', 
		        weight: 1,
		        opacity: 1,
		        color: 'black',
		        fillOpacity: 0.75
		    };
		}

		geojson = L.geoJson(geojsonExtract, {
		    style: style
		});

		map.addLayer(geojson, true);

		// console.log(geojson.getBounds())
		map.fitBounds( geojson.getBounds() );

	 	// window.dispatchEvent(new Event('resize'));
	}
	
	function addPointData(country, pointType){

		if (map.hasLayer(markers)){
			map.removeLayer(markers);
		}

		var error;
		readJSON('../data/form/sector_data/'+country+'_'+pointType+'.geojson', function (request, status, e) {
			geojsonPoints = request;
			error = e;
		})

		if (error) {
			console.log(error);
			return 1;
		} 

		// console.log(country, pointType, start_year, end_year)

		markers = new L.MarkerClusterGroup({
			disableClusteringAtZoom: 10//8
		});

		var geojsonLayer = L.geoJson(geojsonPoints, {
			onEachFeature: function (feature, layer) {
				var a = feature.properties;

				var popup = '';

				// popup += "PLACEHOLDER";

				// var popup = "<b>"+a.placename+"</b>";
				// popup += "</br>Region: " + a.R_NAME
				// popup += "</br>Zone: " + a.Z_NAME
				// popup += "</br>District: " + a.D_NAME
				// popup += "</br>Project Start: " + a.actual_start_date
				// popup += "</br>Years: "
				// var c = 0
				// for (var y = start_year; y<=end_year; y++){
				// 	if ( parseFloat(a["d_"+y]) > 0 ){
				// 		if (c>0){ popup += ", "}
				// 		popup += y
				// 		c++							
				// 	}
				// }
				popup += "</br>$USD: "
				c = 0
				for (var y = start_year; y<=end_year; y++){
					if ( parseFloat(a["d_"+y]) > 0 ){
						if (c>0){ popup += ", "}
						popup += a["d_"+y]
						c++							
					}
				}
				popup += "</br>Donors: " + a.donor

				layer.bindPopup(popup);
			},
			pointToLayer: function(feature, latlng) {
		        return L.marker(latlng, {
		            // radius: 5
		        })
		    }
		});

		markers.addLayer(geojsonLayer);
		map.addLayer(markers);
			window.dispatchEvent(new Event('resize'));

	}

    function buildCharts(country, start, end, points, country_type){

    	// console.log(country);
    	// console.log(start);
    	// console.log(end);
    	// console.log(points);
    	
    	var donor_field, count_field;

    	donor_field = 'donors';
    	count_field = 'location_count';

	    // ----------------------------------------------
	    // build form summary pie chart


        var form_summary_pie = {};

        form_summary_pie.chart = {
	        chart: {
                backgroundColor: 'rgba(255,255,255,0)'//'#f37735'
	        },
	        title: {
	            text: 'Sector Breakdown'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	            	size: '90%',
	                showInLegend:true,
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                        // padding: 0,
                        style: {
                            color: 'black'
                        }
                    }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'left',
	            verticalAlign: 'top',
	            floating:true,
	            y:15
	        },        
            credits:{
                enabled:false
            }, 
            exporting: {
                enabled: false
            },
	        series: [{
	            type: 'pie',
	            name: 'Aid',
	            data: [
	                {
	                    name:'Agriculture',
	                    y:form_data[country]['Agriculture']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Agriculture' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((1 - 3) / 7).get() )
	                },
	                {
	                    name:'Education',
	                    y:form_data[country]['Education']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Education' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((2 - 3) / 7).get() )
	                },
	                {
	                    name:'Health',
	                    y:form_data[country]['Health']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Health' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((3 - 3) / 7).get() )
	                },
	                {
	                    name:'Industry',
	                    y:form_data[country]['Industry']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Industry' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((4 - 3) / 7).get() )
	                }

	            ]
	        }]
	    };

	    // ----------------------------------------------
	    // build form summary column chart

        var form_summary_column = {};

        form_summary_column.chart = {
            chart: {
                type: 'column',
                // spacingLeft: 300,

                backgroundColor: 'rgba(255,255,255,0)'//'#f37735'
            },
            title: {
                text: country +' Critical Aid Overview'
            },
            xAxis: {
                categories: [
                    'Agriculture Aid',
                    'Education Aid',
                    'Health Aid',
                    'Industry Aid'
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
                name: 'Low Income Areas',
                data: [form_data[country]['Agriculture']['ec_tot'], form_data[country]['Education']['ec_tot'], form_data[country]['Health']['ec_tot'], form_data[country]['Industry']['ec_tot']],
                pointPadding: 0.45,
                pointPlacement: -0.1
            }, {
                name: 'Low Yield Areas',
                data: [form_data[country]['Agriculture']['ag_tot'], form_data[country]['Education']['ag_tot'], form_data[country]['Health']['ag_tot'], form_data[country]['Industry']['ag_tot']],
                pointPadding: 0.45,
                pointPlacement: 0.0,
            }, {
                name: 'Urban Areas',
                data: [form_data[country]['Agriculture']['ur_tot'], form_data[country]['Education']['ur_tot'], form_data[country]['Health']['ur_tot'], form_data[country]['Industry']['ur_tot']],
                pointPadding: 0.45,
                pointPlacement: 0.1,
            }/*, {
                type: 'pie',
                name: 'Sector',
                data: [
                	['Agriculture', form_data[country]['Agriculture']['total']], 
                	['Education', form_data[country]['Education']['total']], 
                	['Health', form_data[country]['Health']['total']], 
                	['Industry', form_data[country]['Industry']['total']]
            	],
                center: [-225, 150],
                size: 200,
                showInLegend: true,
                dataLabels: {
                    enabled: false
                }
            }*/]
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


            }, {
                name: 'Projects',
                type: 'column',
                data: data3b//,
            }]
        };

	    // ----------------------------------------------
	    // build grid temp

        var html;
        $('#grid_temp').empty();
        
        html = '';
        html += '<div class="grid_container"><div class="info_container"><div class="info_text">';
        html += 'Between ' + start + ' and ' + end + ' there are ' + $('#grid_form_option_1').val() + ' projects at ' + points.features.length + ' sites across '+country+'. ';
        html += 'Get the <a href="http://labs.aiddata.org/aiddata/home/datasets.php">raw data</a> or build you own subset of the data using our <a href="http://labs.aiddata.org/aiddata/DAT/">data access tool</a>.';
        html += '</div></div></div>';
        $('#grid_temp').append(html);

        $('#grid_temp').append('<div class="grid_container" ><div id="form_summary_pie" style="width:35%;float:left;"></div><div id="form_summary_column" style="width:65%;float:right;"></div></div>');
        $('#form_summary_pie').highcharts( form_summary_pie.chart );
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


//--------------------------------------------------------------------------------------------------
// misc functions
//--------------------------------------------------------------------------------------------------


	//read in a json file and return object
	function readJSON(file, callback) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: file,
			async: false,
		    success: function (request) {
		      	callback(request, "good", 0)
		    },    
		    error: function (request, status, error) {
		      	callback(request, status, error);
		    }
		});
	};

	//converts number to short num + string
	function shortNum(num, dec, abbr){
		abbr = ( abbr ? abbr : 0 )
		var result;
		var r = Math.pow(10, dec);
	 	if (num > Math.pow(10,12)){
	 		result = String(Math.floor(r * num / Math.pow(10,12)) / r) + ( abbr == 1 ? "t" : " trillion" );
	 	} else if (num > Math.pow(10,9)){
	 		result = String(Math.floor(r * num / (Math.pow(10,9))) / r) + ( abbr == 1 ? "b" : " billion" );
	 	} else if (num > Math.pow(10,6)){
	 		result = String(Math.floor(r * num / (Math.pow(10,6))) / r) + ( abbr == 1 ? "m" : " million" );
	 	} else {
	 		result = String(Math.floor(r * num / (Math.pow(10,3))) / r) + ( abbr == 1 ? "th" : " thousand" );
	 	}
	 	return result;
	}


});
	