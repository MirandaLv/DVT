$(document).ready(function(){


// procedure for adding a new country:

// run importMongo script
// add country to DET
// add country to jcarousel.json
// add country object to builder_data.json 
// - set x,y (0-1, percent of width/height) for info and line (requires trial and error to find good fit)
// - add continent and type (old for pre-senegal, new for senegal format)


//--------------------------------------------------------------------------------------------------
// landing page
//--------------------------------------------------------------------------------------------------
	
	// file related vars
	var fp,
		carousel_init,
		carousel_items,
 		form_data, 
 		builder_data;

	// home map related vars
	var margin, width, mapRatio, height, projection, path, svg,
		countryInfo, countryLine, countryData;

	// grid related vars
	var old_country, grid_country,
		start_year, end_year,
		map, tiles, 
		geojson, geojsonExtract,
		markers, geojsonPoints;


	// file paths
	fp = {
		'builder_data':         '../data/form/builder_data.json', 
		'form_data': 			'../data/form/form_data.json',
		'carousel_items': 		'jcarousel.json',
		'd3-world': 			'../data/world/d3-world.json',
		'world-country-names':  '../data/world/world-country-names.tsv'
	};

	carousel_init = true;

	readJSON(fp["carousel_items"],  function (request, status, error){
 		if (error){
 			console.log(error);
 			return 1;
 		}
 		carousel_items = request;
 	})

 	readJSON(fp["form_data"], function (request, status, error){
 		if (error){
 			console.log(error);
 			return 1;
 		}
 		form_data = request;
 	})

 	readJSON(fp["builder_data"], function (request, status, error){
 		if (error){
 			console.log(error);
 			return 1;
 		}
 		builder_data = request;

 		$('.form_option_2').each(function () {
 			var html = '';
 			for (var i=0, ix=builder_data.raster_data.length; i<ix; i++) {
 				html += '<option value="per_'+builder_data.raster_data[i].name+'" '+( builder_data.raster_data[i].name == "Urban-Area" ? "selected" : "" )+'>'+builder_data.raster_data[i].form+'</option>'
 			}
 			$(this).html(html);
 		})
 	})


	margin = {top: 0, left: 0, bottom: 0, right: 0};
   	mapRatio = .448;

   	// initialize map size
   	sizeChange("init")

	countryInfo = {};
	countryLine = {};
	countryData = builder_data.country_data;

	// initialize info boxes at start
	buildCountryInfo("init");

	// load countries and names
	queue()
	    .defer(d3.json, fp["d3-world"])
	    .defer(d3.tsv, fp["world-country-names"])
	    .await(ready);

	// resize map when window size changes
	d3.select(window).on("resize", sizeChange);
	

	old_country = '';
	grid_country = '';

	// init year range
	start_year = 2005;
	end_year = 2014;


    // check hashtag on change and on page load
    $(window).on('hashchange', function () {
    	checkHash();
    });


	//--------------------------------------------------
	// form
	//--------------------------------------------------


	$("#intro_form select").on("change", function(){

	 	var f_sector = $('#intro_form_option_1').val();
	 	var f_aoi = $('#intro_form_option_2').val();

	 	$("#grid_form_option_1").val(f_sector);
	 	$("#grid_form_option_2").val(f_aoi);

	 	var total = ( form_data["Global"][f_sector]["total"] ? '$' + shortNum(form_data["Global"][f_sector]["total"],2) : 'No Data' );
	 	var percent = ( form_data["Global"][f_sector][f_aoi] ? form_data["Global"][f_sector][f_aoi] + '%' : 'No Data' );
	 	
	 	$("#intro_variable1").text(total);
	 	$("#intro_variable2").text(percent);

	 	countryMapChart(f_sector, f_aoi);
	});


	//--------------------------------------------------
	// d3 map, country info boxes, country charts
	//--------------------------------------------------


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
			$(this).find('.highcharts-tooltip').css('z-index','999');
		}, function(){
			var title = $(this).parent().attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					$(this).attr("class", "map_country map_countrySelected");
				}
			});
			$(this).find('.highcharts-tooltip').css('z-index','0');

		}
	);

	// map info clicks
	$(".map_info").on("click", function(){
    	var sel_country = $(this).parent().attr("title");
	    loadCountryPage(sel_country);
    });
  
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
	   
		// link map elements to map info popups
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

		// map element clicks
	    a.on("click", function(){
	        var sel_country = $(this).attr("title");
   	   		loadCountryPage(sel_country);
	    });

		// initialize lines after map loads
	    buildCountryLines("init");

	}
	 
	// check if country is in builder_data.json
	function countrySpecific(d, i) {
	    if ( countryData[d.name] ){
	    	return 'map_country map_countrySelected';
	    } else {
	    	return 'map_country';
	    }
	}

	// manage map, info, line resizing (and init)
	function sizeChange(call){

	   	width = parseInt(d3.select('#intro_map').style('width'));
	   	width = width - margin.left - margin.right;
	   	height = width * mapRatio;

		projection = d3.geo.equirectangular()
			.scale(width / 6.2)
			.translate([ width / 2, width / 3.7]);

		path = d3.geo.path()
		    .projection(projection);


		if (call == "init") {

			svg = d3.select("#intro_map").append("svg")
			    .attr("width", width)
			    .attr("height", height);

		} else {

		    // resize the map container
		    svg
		        .style('width', width + 'px')
		        .style('height', height + 'px');

		    // resize the map
		    svg.selectAll('.map_country').attr('d', path);

			// update map info/lines
			buildCountryLines();
		    buildCountryInfo();

		}
	}

	// build map country info boxes
	function buildCountryInfo(call){
	
    	var keys = _.keys(countryData);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];

			if (call == "init") {

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

			countryInfo[country].attr("style", "left:" + (width * countryData[country].info[0] - 40) + "px; top:" + (height * countryData[country].info[1] - 40) + "px;");

		}
		
	}

	// builds the lines connecting map countries to info boxes
	function buildCountryLines(call){

    	var keys = _.keys(countryData);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];

			if (call == "init") {

				countryLine[country] = svg.append("line").attr("id","line_"+country).attr("class", "map_line")
				   			   						     .attr("stroke", "black").attr("stroke-width", "1");
			}

			countryLine[country].attr("x1", width * countryData[country].line[0] ).attr("y1", height * countryData[country].line[1] )
								.attr("x2", width * countryData[country].info[0] ).attr("y2", height * countryData[country].info[1] );
		}
	}

	// manages building and updating of map charts
	function countryMapChart(f_sector, f_aoi){

		var area = {},
			sector = {},
			raw = {};

		var keys = _.keys(countryData);
    	for (var i=0, ix=keys.length; i<ix; i++) {
    		var country = keys[i];

			sector[country] = 100 * form_data[country][f_sector].total /  form_data[country].Total.total;

			area[country] = form_data[country][f_sector][f_aoi];

			buildMapChart(country, sector[country], area[country]);
		}
	}

	// builds map charts
    function buildMapChart(country, sector, area){

    	var container = '#chart_'+country;

    	// build pie chart
		var colors = Highcharts.getOptions().colors,
			outerData, innerData;

		// aoi
	    outerData = [{
	    	name:  '% '+ $("#intro_form_option_1>option:selected").html() +' aid in '+ $("#intro_form_option_2>option:selected").html(),
            y: area,
            color: 'rgba(44,155,200,0.85)' // '#2c9bc8' // blue	
	    },{
			name: '% '+ $("#intro_form_option_1>option:selected").html() +' aid in other areas',
            y: Math.floor( (100-area)*100 ) / 100,
            color: colors[1]
	    }]

	    // check for no_data flag in builder_data.json

	    // console.log(builder_data['no_data'][country][$("#intro_form_option_1").val()])
	    // console.log($("#intro_form_option_2").val().substr(4))

	    if ( builder_data['no_data'][country][$("#intro_form_option_1").val()][$("#intro_form_option_2").val().substr(4)] == true) {
		    outerData = [{
		    	name:  'nodata',
	            y: 0,
	            color: 'black' 
		    },{
	    	name:  '% of '+ $("#intro_form_option_1>option:selected").html() +' aid in '+ $("#intro_form_option_2>option:selected").html() +' <br>which we do not have reliable data on',
	            y: 100,
	            color: colors[3]
		    }]
	    }

	    // sector
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
	            useHTML: true,
	            positioner: function () {
	                return { x: -40, y: -60 };
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
	}


	//--------------------------------------------------
	// carousel and tabs
	//--------------------------------------------------


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
            loadCountryPage(sel_country);
        });
    }


	//--------------------------------------------------
	// init / triggers for landing page
	//--------------------------------------------------


	$("#intro_form_option_1").change();
    $("#jcarousel-general").parent().trigger("click");


//--------------------------------------------------------------------------------------------------
// transitions
//--------------------------------------------------------------------------------------------------

		
	function loadCountryPage(country, call){
		old_country = grid_country;
    	grid_country = country;

		$("#intro").hide();
		$("#content").show();
        $('html, body').animate({ scrollTop: 0 }, 0);

        if ( !call || call != 1 ) {
			var stateObj = { page: "home" };
			window.history.pushState(stateObj, "AidData Labs Home Page", "#"+country);
		}
	 	window.document.title = 'AidData Labs - '+country;

		$(".map_countrySelected").each(function(){
			if ($(this).attr("title") == country){
				$(this).attr("class", "map_country map_countrySelected");
			}
		});

		if (old_country != grid_country) {
			if (map && old_country != ''){
				map.remove();
			}
			$("#grid_title, #grid_country").html(grid_country);
			mapInit();
		}

		window.dispatchEvent(new Event('resize'));
	}


	function loadHomePage(call) {
		$("#content").hide();
		$("#intro").show();
        $('html, body').animate({ scrollTop: 0 }, 0);

        if ( !call || call != 1 ) {
			var stateObj = { page: "country" };
			window.history.pushState(stateObj, "AidData Labs Home Page", "#home");
		}
		window.document.title = 'AidData Labs - v.Alpha';

		window.dispatchEvent(new Event('resize'));
	}


//--------------------------------------------------------------------------------------------------
// grid page
//--------------------------------------------------------------------------------------------------

	// grid page back button 
	$("#grid_back").on("click", function(){

		loadHomePage();
	});

	// natural form
	$("#grid_form select").on("change", function(){

		// get type and subtype
	 	var f_sector = $('#grid_form_option_1').val();
	 	var f_aoi = $('#grid_form_option_2').val();

		$("#intro_form_option_1").val(f_sector);
		$("#intro_form_option_2").val(f_aoi);
		$("#intro_form_option_1").change();
		
	 	// update form
	 	var total = ( form_data[grid_country][f_sector]["total"] ? '$' + shortNum(form_data[grid_country][f_sector]["total"],2) : 'No Data' );
	 	var percent = ( form_data[grid_country][f_sector][f_aoi] ? form_data[grid_country][f_sector][f_aoi] + '%' : 'No Data' );
	 	
	 	$("#grid_variable1").text(total);
	 	$("#grid_variable2").text(percent);

		if ( $(this).attr('id') == 'grid_form_option_1' ) {
		 	//update map
			addPointData(grid_country, f_sector);

			// update charts
		 	buildCharts(grid_country, start_year, end_year, geojsonPoints, countryData[grid_country].type);

		 	setTimeout(function(){ 
		 		map.invalidateSize()
			 	window.dispatchEvent(new Event('resize'))
		 	}, 2000);
	 	}
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
		
	 	addCountry('../DET/resources/'+countryData[grid_country].continent.toLowerCase()+'/'+grid_country.toLowerCase()+'/shapefiles/ADM1/Leaflet.geojson')

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
				var commitments_field = ( countryData[grid_country].type == 'old' ? 'total_commitments' : 'transaction_sum' );


				// popup += "</br>Region: " + a.R_NAME
				// popup += "</br>Zone: " + a.Z_NAME
				// popup += "</br>District: " + a.D_NAME
				// popup += "</br>Project Start: " + a.actual_start_date

				popup += "</br><b>Commitments:</b> " + parseInt(a[commitments_field]).toLocaleString();

				popup += "</br><b>Donors:</b> " + a.donors;

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
	            text: 'Aid Per Sector'
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
	                    color: ( $('#grid_form_option_1').val() == 'Agriculture' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((0 - 3) / 7).get() )
	                },
	                {
	                    name:'Education',
	                    y:form_data[country]['Education']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Education' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((1 - 3) / 7).get() )
	                },
	                {
	                    name:'Health',
	                    y:form_data[country]['Health']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Health' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((2 - 3) / 7).get() )
	                },
	                {
	                    name:'Industry',
	                    y:form_data[country]['Industry']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Industry' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((3 - 3) / 7).get() )
	                },
	                {
	                    name:'Water',
	                    y:form_data[country]['Water']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Water' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((4 - 3) / 7).get() )
	                },
	                {
	                    name:'Other',
	                    y:form_data[country]['Other']['total'],
	                    color: ( $('#grid_form_option_1').val() == 'Other' ? 'rgba(204,76,67,0.85)' : Highcharts.Color( Highcharts.getOptions().colors[7] ).brighten((5 - 3) / 7).get() )
	                }

	            ]
	        }]
	    };

	    // ----------------------------------------------
	    // build form summary column chart

        var form_summary_column = {};

        form_summary_column.series = [{
                name: 'Sector',
                data: [ form_data[country]['Agriculture']['total'], form_data[country]['Education']['total'], form_data[country]['Health']['total'], form_data[country]['Industry']['total'], form_data[country]['Water']['total'] ],
                pointPadding: 0.2,
                pointPlacement: 0.0
            }, {
                name: builder_data.raster_data[0].form,
                data: [ form_data[country]['Agriculture']['tot_'+builder_data.raster_data[0].name], form_data[country]['Education']['tot_'+builder_data.raster_data[0].name], form_data[country]['Health']['tot_'+builder_data.raster_data[0].name], form_data[country]['Industry']['tot_'+builder_data.raster_data[0].name], form_data[country]['Water']['tot_'+builder_data.raster_data[0].name] ],
                pointPadding: 0.45,
                pointPlacement: -0.1
            }, {
                name:  builder_data.raster_data[1].form,
                data: [ form_data[country]['Agriculture']['tot_'+builder_data.raster_data[1].name], form_data[country]['Education']['tot_'+builder_data.raster_data[1].name], form_data[country]['Health']['tot_'+builder_data.raster_data[1].name], form_data[country]['Industry']['tot_'+builder_data.raster_data[1].name], form_data[country]['Water']['tot_'+builder_data.raster_data[1].name] ],
                pointPadding: 0.45,
                pointPlacement: 0.0,
            }, {
                name:  builder_data.raster_data[2].form,
                data: [ form_data[country]['Agriculture']['tot_'+builder_data.raster_data[2].name], form_data[country]['Education']['tot_'+builder_data.raster_data[2].name], form_data[country]['Health']['tot_'+builder_data.raster_data[2].name], form_data[country]['Industry']['tot_'+builder_data.raster_data[2].name], form_data[country]['Water']['tot_'+builder_data.raster_data[2].name] ],
                pointPadding: 0.45,
                pointPlacement: 0.1,
            }]

        form_summary_column.chart = {
            chart: {
                type: 'column',
                spacingRight: 50,

                backgroundColor: 'rgba(255,255,255,0)'//'#f37735'
            },
            title: {
                text: country +' Aid Overview'
            },
            xAxis: {
                categories: [
                    'Agriculture Aid',
                    'Education Aid',
                    'Health Aid',
                    'Industry Aid',
                    'Water Aid',
                    'Other Aid'
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
            series: form_summary_column.series
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
                text: 'Based on commitments between ' + start + " and " + end
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
                text: $('#grid_form_option_1').val()+' Sector Donor Aid and Numbers of Projects'
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
        html += 'Information on <span class="variable">'+shortNum(parseFloat(form_data.Global.Total.total), 2)+'</span> dollars of aid across <span class="variable">'+parseInt(form_data.Global.Total.projects).toLocaleString()+'</span> project sites is available for analysis through AidData Labs.';
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
		abbr = ( abbr ? abbr : 0 );
		dec = ( !isNaN(parseInt(dec)) ? dec : 2);
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

	function checkHash() {
		var hash = window.location.hash;
		// console.log(hash)

	    if ( hash != '' && hash != '#' && hash != '#home' && countryData[hash.substr(1)] ) {
	    	var country = hash.substr(1);
	    	loadCountryPage(country, 1);
	    } else if (hash == '#home' || hash == '') {
	    	loadHomePage(1);
	    }
	}

    checkHash()


});
	