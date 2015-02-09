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
	
	// turn line and info vars into objects
	// create generic function to build info, lines, css, mapcharts (takes country name and dimensions / props as args)

	// init map info lines
	var continent_list,
		line_Nepal,	line_Uganda, line_Malawi, 
		info_Nepal, info_Uganda, info_Malawi

	// continent lookup list
	continent_list = {
		'Nepal':'Asia',
		'Uganda':'Africa',
		'Malawi':'Africa',
		// 'Timor-Leste':'Asia',
		'Senegal':'Africa'
	};

	// initialize map info containers
	countryInfo("init");

    $('#info_Nepal .map_image').css({
        'background-image': 'url("/aiddata/imgs/nepal-outline.png")', 
        'width': '85%',
        'height': '85%',
        'top': '25%',
        'left': '5%'
    });

    $('#info_Uganda .map_image').css({
        'background-image': 'url("/aiddata/imgs/uganda-outline.png")', 
        'width': '75%',
        'height': '75%',
        'top': '10%',
        'left': '15%'
    });

    $('#info_Malawi .map_image').css({
        'background-image': 'url("/aiddata/imgs/malawi-outline.png")', 
        'width': '85%',
        'height': '85%',
        'top': '5%',
        'left': '35%'
    });

	// initialize map info containers
	function countryInfo(call){

		if (call == "init") {
			info_Nepal = d3.select("#intro_map").append("div")
				.attr("class", "map_info_container").attr("id","info_Nepal").attr("title", "Nepal")
				.html("<div class='map_info'><div class='map_title'><a>NEPAL</a></div><div class='map_image'></div><div id='chart_Nepal' class='map_chart'></div></div>");
			
			info_Uganda = d3.select("#intro_map").append("div")
				.attr("class", "map_info_container").attr("id","info_Uganda").attr("title", "Uganda")
				.html("<div class='map_info'><div class='map_title'><a>UGANDA</a></div><div class='map_image'></div><div id='chart_Uganda' class='map_chart'></div></div>");

			info_Malawi = d3.select("#intro_map").append("div")
				.attr("class", "map_info_container").attr("id","info_Malawi").attr("title", "Malawi")
				.html("<div class='map_info'><div class='map_title'><a>MALAWI</a></div><div class='map_image'></div><div id='chart_Malawi' class='map_chart'></div></div>");
			
			info_Senegal = d3.select("#intro_map").append("div")
				.attr("class", "map_info_container").attr("id","info_Senegal").attr("title", "Senegal")
				.html("<div class='map_info'><div class='map_title'><a>SENEGAL</a></div><div class='map_image'></div><div id='chart_Senegal' class='map_chart'></div></div>");
		}

		info_Nepal.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;");
		info_Uganda.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;");
		info_Malawi.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;");
	}

	function countryLines(call){

		if (call == "init") {

			line_Nepal = svg.append("line").attr("id","line_Nepal").attr("class", "map_line")
							   			   .attr("stroke", "black").attr("stroke-width", "1");
			line_Uganda = svg.append("line").attr("id","line_Uganda").attr("class", "map_line")
										    .attr("stroke", "black").attr("stroke-width", "1");
			line_Malawi = svg.append("line").attr("id","line_Malawi").attr("class", "map_line")
				   							.attr("stroke", "black").attr("stroke-width", "1");

		}

		// update map info lines
		line_Nepal.attr("x1", width/1.34).attr("y1", height/2.3)
				  .attr("x2", width/1.2).attr("y2", height/2.9);
		line_Uganda.attr("x1", width/1.68).attr("y1", height/1.65)
		           .attr("x2", width/1.5).attr("y2", height/2);
		line_Malawi.attr("x1", width/1.67).attr("y1", height/1.43)
		           .attr("x2", width/1.45).attr("y2", height/1.3);

	}

	// manages building and updating of map charts
	function countryMapChart(form_data, type, sub){

		var nepal_percent = form_data["Nepal"][type][sub];
		buildMapChart('#chart_Nepal', nepal_percent);

		var uganda_percent = form_data["Uganda"][type][sub];
		buildMapChart('#chart_Uganda', uganda_percent);

		var malawi_percent = form_data["Malawi"][type][sub];
		buildMapChart('#chart_Malawi', malawi_percent);
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
	// $(".map_info").on("click", function(){
 //    	var sel_country = $(this).parent().attr("title");
	//     mapClick(sel_country);
 //    });


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
	    // a.on("click", function(){
	    //     var sel_country = $(this).attr("title");
   	 //   		mapClick(sel_country);
	    // });

	    countryLines("init");
	}
	 
	//check if country is active (do we have data for it)
	function countrySpecific(d, i) {
	    if ( continent_list[d.name] ){
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
	    countryInfo();

		// update map info lines
		countryLines();
	}


	//builds map charts
    function buildMapChart(container, percent){

		var colors = Highcharts.getOptions().colors,
	        categories = ['% '+ $("#intro_form_option_1>option:selected").html() +' aid in '+ $("#intro_form_option_2>option:selected").html() +' areas', '%  '+ $("#intro_form_option_1>option:selected").html() +' aid in other areas'],
	        data = [{
	            y: percent,
	            color: colors[0]
	        }, {
	            y: 100-percent,
	            color: colors[1]
	        }],
	        browserData = [];

	    // Build the data arrays
	    for (var i = 0; i < data.length; i += 1) {

	        // add browser data
	        browserData.push({
	            name: categories[i],
	            y: data[i].y,
	            color: data[i].color
	        });
	    }

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
	            data: browserData,
	            size: '220%',
	            innerSize: '200%',
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
		old_country = '';

	function mapClick(country){
		old_country = grid_country;
    	grid_country = country;
		$("#intro").hide();
		$("#frontpage").hide();
		$("#content").fadeIn("slow");

		if (old_country != ''){
			map.remove();
		}

		// if (old_country != grid_country){
			$("#grid_logo div").css("background-image","url('/aiddata/imgs/"+country.toLowerCase()+"-outline.png')");
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
	
	var start_year, end_year,
		map, tiles, 
		geojson, geojsonExtract,
		markers, geojsonPoints;

	// init year range
	start_year = 2005;
	end_year = 2013;

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

	 	//update map
		addPointData(grid_country, type);

		// update charts
	 	buildCharts(start_year, end_year, geojsonPoints, geojsonExtract);

	 	setTimeout(function(){ 
	 		map.invalidateSize()
		 	window.dispatchEvent(new Event('resize'))
	 	}, 2000);
 
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

		map.options.maxZoom = 11;
		// mapControlToggle(0);
		
	 	addCountry('../DET/resources/'+continent_list[grid_country].toLowerCase()+'/'+grid_country.toLowerCase()+'/shapefiles/Leaflet.geojson')

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

	 	window.dispatchEvent(new Event('resize'));
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

		console.log(country, pointType, start_year, end_year)

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
	function shortNum(num, dec){
		var result;
		var r = Math.pow(10, dec);
	 	if (num > Math.pow(10,12)){
	 		result = String(Math.floor(r * num / Math.pow(10,12)) / r) + " trillion";
	 	} else if (num > Math.pow(10,9)){
	 		result = String(Math.floor(r * num / (Math.pow(10,9))) / r) + " billion";
	 	} else if (num > Math.pow(10,6)){
	 		result = String(Math.floor(r * num / (Math.pow(10,6))) / r) + " million";
	 	} else {
	 		result = String(Math.floor(r * num / (Math.pow(10,3))) / r) + " thousand";
	 	}
	 	return result;
	}


});
	