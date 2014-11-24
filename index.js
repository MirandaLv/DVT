$(document).ready(function(){

//-------------------------------------------------------------------------------------------------
// landing page
//-------------------------------------------------------------------------------------------------
	
	// -- natural form options --
	$("#intro_form select").on("change", function(){

	 	var form_data = readJSON('../data/form/form_data.json')
	 	var type = $('#intro_form_option_1').val()
	 	var sub = $('#intro_form_option_2').val()

	 	var total = form_data["Global"][type]["total"]
	 	var percent = form_data["Global"][type][sub]
	 	
	 	total = shortNum(total, 2)

	 	$("#intro_variable1").text("$"+total)
	 	$("#intro_variable2").text(percent + "%")

	 	updateMapChart(form_data, type, sub)

	})


	// -- d3 map and country info boxes --
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


	// -- map info --

	// init map info lines
	var line_Nepal,	line_Malawi//, line_Uganda 

	// initialize map info containers
	var info_Nepal = d3.select("#intro_map").append("div")
			.attr("class", "map_info_container").attr("id","info_Nepal").attr("title", "Nepal")
			.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;")
			.html("<div class='map_info'><div class='map_title'><a href='#Nepal'>NEPAL</a></div><div class='map_image'></div><div id='chart_Nepal' class='map_chart'></div></div>");
	
	var info_Malawi = d3.select("#intro_map").append("div")
			.attr("class", "map_info_container").attr("id","info_Malawi").attr("title", "Malawi")
			.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;")
			.html("<div class='map_info'><div class='map_title'><a href='#Malawi'>MALAWI</a></div><div class='map_image'></div><div id='chart_Malawi' class='map_chart'></div></div>");
	
	// var info_Uganda = d3.select("#intro_map").append("div")
	// 		.attr("class", "map_info_container").attr("id","info_Uganda").attr("title", "Uganda")
	// 		.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;")
	// 		.html("<div class='map_info'><div class='map_title'><a href='#Uganda'>UGANDA</a></div><div class='map_image'></div><div id='chart_Uganda' class='map_chart'></div></div>");


	// load countries and names
	queue()
	    .defer(d3.json, "../data/world/d3-world.json")
	    .defer(d3.tsv, "../data/world/world-country-names.tsv")
	    .await(ready);

	// resize map when window size changes
	d3.select(window).on("resize", sizeChange);
	
	// manage map and map info resizing
	function sizeChange(){

	    // adjust when the window size changes
	    width = parseInt(d3.select('#intro_map').style('width'))
	    width = width - margin.left - margin.right
	    height = width * mapRatio

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
		info_Nepal.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;")//.html("<div class='map_title'><a href=''>NEPAL</a></div><div class='map_image'></div><div id='chart_Nepal' class='map_chart'></div");
		info_Malawi.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;")//.html("<div class='map_title'><a href=''>MALAWI</a></div><div class='map_image'></div><div id='chart_Malawi' class='map_chart'></div");
		// info_Uganda.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;")//.html("<div class='map_title'><a href=''>UGANDA</a></div><div class='map_image'></div><div id='chart_Uganda' class='map_chart'></div");

		// update map info lines
		line_Nepal.attr("x1", width/1.34).attr("y1", height/2.3).attr("x2", width/1.2).attr("y2", height/2.9).attr("stroke", "black").attr("stroke-width", "1")
		line_Malawi.attr("x1", width/1.67).attr("y1", height/1.43).attr("x2", width/1.45).attr("y2", height/1.3).attr("stroke", "black").attr("stroke-width", "1")
		// line_Uganda.attr("x1", width/1.68).attr("y1", height/1.65).attr("x2", width/1.5).attr("y2", height/2).attr("stroke", "black").attr("stroke-width", "1")

	}
  
	// build map
	function ready(error, world, names) {
		var countries = topojson.feature(world, world.objects.countries).features

		countries.forEach(function(d) {
		  d.name = names.filter(function(n) { return d.id == n.id; })[0].name
		});

		var country = svg.selectAll(".map_country").data(countries)

		country.enter().insert("path").attr("class", function(d, i) {
		 return countrySpecific(d, i)
		})
		.attr("title", function(d, i) {
		 return d.name
		})
		.attr("d", path);
	   
		a = d3.selectAll(".map_countrySelected")
	   

		//link map elements to map info popups
		a.on("mouseenter", function(){
			var title = $(this).attr("title")
			$(".map_info").each(function(){
				if ($(this).parent().attr("title")==title){
					var updateClass = $(this).attr("class") + " map_info_hover"
					$(this).attr("class", updateClass)
				}
			})
		})

		a.on("mouseleave", function(){
			var title = $(this).attr("title")
			$(".map_info").each(function(){
				if ($(this).parent().attr("title")==title){
					$(this).attr("class", "map_info")
				}
			})
		})

		// map element clicks
	    a.on("click", function(){
	        var sel_country = $(this).attr("title")
   	   		mapClick(sel_country)
	    })

		line_Nepal = svg.append("line")
								.attr("id","line_Nepal").attr("class", "map_line")
								.attr("x1", width/1.34).attr("y1", height/2.3)
								.attr("x2", width/1.2).attr("y2", height/2.9)
								.attr("stroke", "black").attr("stroke-width", "1");
		line_Malawi = svg.append("line")
								.attr("id","line_Malawi").attr("class", "map_line")
								.attr("x1", width/1.67).attr("y1", height/1.43)
								.attr("x2", width/1.45).attr("y2", height/1.3)
								.attr("stroke", "black").attr("stroke-width", "1");
		// line_Uganda = svg.append("line").attr("id","line_Uganda")
		// 						.attr("class", "map_line")
		// 						.attr("x1", width/1.68).attr("y1", height/1.65)
		//						.attr("x2", width/1.5).attr("y2", height/2)
		// 						.attr("stroke", "black").attr("stroke-width", "1");

	}
	 
	//check if country is active (do we have data for it)
	function countrySpecific(d, i) {
	    if (/*d.name=='Uganda' ||*/ d.name == 'Malawi' || d.name == 'Nepal'){
	    	return 'map_country map_countrySelected'
	    } else {
	    	return 'map_country'
	    }
	}

	//link map info popups to map elements
	$(".map_info").hover(
		function(){
			var title = $(this).parent().attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					var updateClass = $(this).attr("class") + " map_countrySelected_hover"
					$(this).attr("class", updateClass)
				}
			})
		}, function(){
			var title = $(this).parent().attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					$(this).attr("class", "map_country map_countrySelected")
				}
			})
		}
	)

	// map info clicks
	$(".map_info").on("click", function(){
    	var sel_country = $(this).parent().attr("title")
	    mapClick(sel_country)
    })



	// manages building and updating of map charts
	function updateMapChart(form_data, type, sub){

		var npl_percent = form_data["Nepal"][type][sub]
		buildMapChart('#chart_Nepal', npl_percent)

		var mal_percent = 21
		buildMapChart('#chart_Malawi', mal_percent)

		// var ug_percent = 20
		// buildMapChart('#chart_Uganda', ug_percent)
	}

	//builds map charts
    function buildMapChart(container, percent){

		var colors = Highcharts.getOptions().colors,
	        categories = ['% aid in '+ $("#intro_form_option_2>option:selected").html() +' areas', '% aid in other areas'],
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
	    }

	    //render chart
	    $(container).highcharts(chart_options)
	}

	// load country page
	var grid_country
	function mapClick(country){

    	grid_country = country
		$("#intro").hide()
		$("#frontpage").hide()
		$("#content").fadeIn("slow")

		$("#grid_logo div").css("background-image","url('../imgs/"+country.toLowerCase()+"-outline.png')")
		$("#grid_title, #grid_country").html(grid_country)		
	
		mapInit()
		window.dispatchEvent(new Event('resize'))

	}

	// return to landing page from country page
	$("#grid_back").on("click", function(){
		$("#content").hide()
		$("#intro").show()
		$("#frontpage").show()
		window.dispatchEvent(new Event('resize'))
	})

	// init / manual triggers for landing page
	$("#intro_form_option_1").change()


//-------------------------------------------------------------------------------------------------
// grid
//-------------------------------------------------------------------------------------------------

	// init year range
	var start_year = 2005,
		end_year = 2013

	//init "grid" style functionallity
	$("#grid").sortable({
		// distance:1
	})

	// natural form
	$("#grid_form select").on("change", function(){

		// get type and subtype
	 	var type = $('#grid_form_option_1').val()
	 	var sub = $('#grid_form_option_2').val()

	 	// update form
	 	var form_data = readJSON('../data/form/form_data.json')

	 	var total = form_data[grid_country][type]["total"]
	 	
	 	total = shortNum(total,2)

	 	$("#grid_variable1").text("$"+total)

	 	var percent = form_data[grid_country][type][sub].toLocaleString()
	 	$("#grid_variable2").text(percent + "%")

	 	//update map
	 	// addCountry() 
	 	buildPolyData(grid_country.toLowerCase())
		addPointData(type)

		// update charts
	 	buildCharts(start_year, end_year, geojsonPoints, geojsonExtract)
 

	})

	// add overlay
	var $selected
	$(".overlay_button").click(function(){
		$("body").css("overflow","hidden")
		$("#overlay").show()
		// $("#overlay").toggleClass("overlay_active")
		$selected = $(this).parent().parent()
		$selected.addClass("overlay_content")

		mapControlToggle(1)
		map.invalidateSize();

	})

	// remove overlay
	$("#overlay").click(function(){
		$("body").css("overflow","auto")
		$("#overlay").hide()
		$selected.removeClass("overlay_content")
		mapControlToggle(0)
		map.invalidateSize();
	})


	var map,
		tiles

	// initialize leaflet map and trigger initial form options
	function mapInit(){

		L.mapbox.accessToken = 'pk.eyJ1Ijoic2dvb2RtIiwiYSI6InotZ3EzZFkifQ.s306QpxfiAngAwxzRi2gWg'

		map = L.mapbox.map('map', { })

		tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
				}).addTo(map)

		map.setView([0,0], 1);

		map.options.maxZoom = 11
		mapControlToggle(0)

		//trigger initial form options
		$("#grid_form_option_1").change()
	}



	var allCountryBounds = { global:{_northEast:{lat:90, lng:180}, _southWest:{lat:-90, lng:-180}} }

	// add country boundary to map and zoom to it
	function addCountry(country, file){

		var geojsonCountry = readJSON(file)
		
		var countryLayer = L.geoJson(geojsonCountry, {style: style}).addTo(map);
		var countryBounds = countryLayer.getBounds()
		map.fitBounds( countryBounds )

		allCountryBounds[country] = countryBounds
		

		function style(feature) {
		    return {
		        fillColor: 'red', // ### HERE ###
		        weight: 1,
		        opacity: 1,
		        color: 'black',
		        fillOpacity: 0.25
		    };
		}

	}


	// build or get boundary geojson with extract data
	function buildPolyData(country){

		$.ajax ({
	        url: "process.php",
	        data: {type: "addPolyData", start_year: start_year, end_year: end_year, type: "x", sub: "x"},
	        dataType: "text",
	        type: "post",
	        async: false,
	        success: function(result) {
	        	addPolyData("../data/poly/output_"+start_year+"_"+end_year+".geojson")
	        }
	    })

	}

	var geojson,
		geojsonExtract, 
		info,
		legend

	function addPolyData(file){

		if (map.hasLayer(geojson)){
			map.removeLayer(geojson)
			info.removeFrom(map)
			legend.removeFrom(map)
		}

		geojsonExtract = readJSON(file)
		
		function getColor(d) { 
		    return d <= -1.5 ? '#de2d26' :
		           d <= -1.0 ? '#fc9272' :
		           d <= -0.5 ? '#fee0d2' :

		           d <= 0.5 ? '#fff7bc' :
		           d <= 1.0 ? '#e5f5e0' :
   		           d <= 1.5 ? '#a1d99b' :
   		           			  '#31a354';
		}

		function style(feature) {
		    return {
		        fillColor: getColor(feature.properties.sd), 
		        weight: 1,
		        opacity: 1,
		        color: 'black',
		        fillOpacity: 0.75
		    };
		}

		function highlightFeature(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });

		    if (!L.Browser.ie && !L.Browser.opera) {
		        layer.bringToFront();
		    }

   		    info.update(e.target.feature.properties);

		}

		function resetHighlight(e) {
		    geojson.resetStyle(e.target);
		    info.update();
		}

		function zoomToFeature(e) {
	    	// map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        click: zoomToFeature
		    });
		}

		geojson = L.geoJson(geojsonExtract, {
		    style: style,
		    onEachFeature: onEachFeature
		})

		map.addLayer(geojson, true);

		map.fitBounds( geojson.getBounds() )


		info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Potential Agricultural Productivity (2001)</h4>' +  (props ?
		        '<b>' + props.NAME_2 + '</b><br />' 
		        + 'sd: ' + roundx(props.sd) + '<br>'
		        + '%$ - %ndvi: ' + roundx(props.ratio) + '<br>'
		        + 'Aid:  ' + roundx(props.sum) + ' $ USD<br>'
		        + 'NDVI: ' + roundx(props.ndvi) 
		        : 'Hover over an area');
		};

		info.addTo(map);

		function roundx(x){
			return Math.floor(x*1000)/(1000)
		}

		//manage legend
		legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'info legend'),
		        grades = [-1.5, -1.0, -0.5, 0.5, 1.0, 1.5, 2],
		        labels = [];

		    // loop through our density intervals and generate a label with a colored square for each interval
		    for (var i = 0; i < grades.length; i++) {
		        div.innerHTML += '<i style="background:' + getColor(grades[i]) + '"></i> '

		        if (!grades[i+1]){
		        	div.innerHTML += grades[i-1]  + '+<br>'
		        } else {
		        	div.innerHTML += "<= " + grades[i]  + '<br>'
		        }
		    }
		    return div;
		};

		legend.addTo(map);

	}


	var markers,
		geojsonPoints
	
	function addPointData(pointType){

		if (map.hasLayer(markers)){
			map.removeLayer(markers)
		}

		$.ajax ({
	        url: "process.php",
	        data: {type: "addPointData", pointType: pointType, range_min:start_year, range_max:end_year},
	        dataType: "json",
	        type: "post",
	        async: false,
	        success: function(geojsonContents) {
				
				geojsonPoints = geojsonContents

				markers = new L.MarkerClusterGroup({
					disableClusteringAtZoom: 10//8
				});

				var geojsonLayer = L.geoJson(geojsonContents, {
					onEachFeature: function (feature, layer) {
						var a = feature.properties
						var popup = "<b>"+a.placename+"</b>";
						popup += "</br>Region: " + a.R_NAME
						popup += "</br>Zone: " + a.Z_NAME
						popup += "</br>District: " + a.D_NAME
						popup += "</br>Project Start: " + a.actual_start_date
						popup += "</br>Years: "
						var c = 0
						for (var y = start_year; y<=end_year; y++){
							if ( parseFloat(a["d_"+y]) > 0 ){
								if (c>0){ popup += ", "}
								popup += y
								c++							
							}
						}
						popup += "</br>$USD: "
						c = 0
						for (var y = start_year; y<=end_year; y++){
							if ( parseFloat(a["d_"+y]) > 0 ){
								if (c>0){ popup += ", "}
								popup += a["d_"+y]
								c++							
							}
						}
						popup += "</br>Donors: " + a.donors

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

	        }
	    })

	}

	// toggle map control when in grid or overlay mode
	function mapControlToggle(state){
		if (state == 1){
			map.scrollWheelZoom.enable();
			map.dragging.enable();
			map.doubleClickZoom.enable()
		} else {
			map.scrollWheelZoom.disable();
			map.dragging.disable();
			map.doubleClickZoom.disable()
		}
	}


//-------------------------------------------------------------------------------------------------
// misc functions
//-------------------------------------------------------------------------------------------------

	//read in a json file and return object
	function readJSON(file) {
	    var request = $.ajax({
	    	type: "GET",
			dataType: "json",
			url: file,
			async: false,
	    })
	    return request.responseJSON
	};

	//converts number to short num + string
	function shortNum(num, dec){
		var result
		var r = Math.pow(10, dec)
	 	if (num > Math.pow(10,12)){
	 		result = String(Math.floor(r * num / Math.pow(10,12)) / r) + " trillion"
	 	} else if (num > Math.pow(10,9)){
	 		result = String(Math.floor(r * num / (Math.pow(10,9))) / r) + " billion"
	 	} else if (num > Math.pow(10,6)){
	 		result = String(Math.floor(r * num / (Math.pow(10,6))) / r) + " million"
	 	} else {
	 		result = String(Math.floor(r * num / (Math.pow(10,3))) / r) + " thousand"
	 	}
	 	return result
	}


})


	