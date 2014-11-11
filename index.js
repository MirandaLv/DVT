$(document).ready(function(){

//-------------------------------------------------------------------------------------------------
// home
//-------------------------------------------------------------------------------------------------
	
	$("#content").hide()

	var aid_fund = {
		"agricultural": {
			"2001": Math.random() * 10000000,
			"2002": Math.random() * 10000000,
			"2003": Math.random() * 10000000,
			"2004": Math.random() * 10000000,
			"2005": Math.random() * 10000000,
			"2006": Math.random() * 10000000,
			"2007": Math.random() * 10000000,
			"2008": Math.random() * 10000000,
			"2009": Math.random() * 10000000,
			"2010": Math.random() * 10000000,
			"2011": Math.random() * 10000000,
			"2012": Math.random() * 10000000,
			"2013": Math.random() * 10000000
		},
		"educational": {
			"2001": Math.random() * 10000000,
			"2002": Math.random() * 10000000,
			"2003": Math.random() * 10000000,
			"2004": Math.random() * 10000000,
			"2005": Math.random() * 10000000,
			"2006": Math.random() * 10000000,
			"2007": Math.random() * 10000000,
			"2008": Math.random() * 10000000,
			"2009": Math.random() * 10000000,
			"2010": Math.random() * 10000000,
			"2011": Math.random() * 10000000,
			"2012": Math.random() * 10000000,
			"2013": Math.random() * 10000000
		},
		"social": {
			"2001": Math.random() * 10000000,
			"2002": Math.random() * 10000000,
			"2003": Math.random() * 10000000,
			"2004": Math.random() * 10000000,
			"2005": Math.random() * 10000000,
			"2006": Math.random() * 10000000,
			"2007": Math.random() * 10000000,
			"2008": Math.random() * 10000000,
			"2009": Math.random() * 10000000,
			"2010": Math.random() * 10000000,
			"2011": Math.random() * 10000000,
			"2012": Math.random() * 10000000,
			"2013": Math.random() * 10000000
		}
	}


	// natural form
	 $("#intro_form select").on("change", function(){
	 	var start = parseInt($("#intro_form_option_2").val())
	 	var end = parseInt($("#intro_form_option_3").val())
	 	if (start > end){
	 		end = parseInt($("#intro_form_option_2").val())
	 		start = parseInt($("#intro_form_option_3").val())
	 	}
	 	var type = $("#intro_form_option_1").val()
	 	var total = 0
	 	// console.log(start)
	 	for (var i=start; i<=end; i++){
	 		total += aid_fund[type][i]
	 	}

	 	total = Math.floor(total).toLocaleString()
	 	$("#variable1").text("$"+total)

	 	var percent = Math.floor(Math.random() * 100)
	 	$("#variable2").text(percent + "%")

	 })
	 $("#intro_form_option_1").change()


	// d3 map
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


	// CONSTRUCT THE STYLE of the STATIC COUNTRY INFOBOXES
	var info_Uganda
	var info_Nepal 
	var info_Malawi

	var line_Uganda 
	var line_Nepal 
	var line_Malawi 

	info_Uganda = d3.select("#intro_map").append("div").attr("class", "map_info").attr("id","info_Uganda").attr("title", "Uganda");
	info_Nepal = d3.select("#intro_map").append("div").attr("class", "map_info").attr("id","info_Nepal").attr("title", "Nepal");
	info_Malawi = d3.select("#intro_map").append("div").attr("class", "map_info").attr("id","info_Malawi").attr("title", "Malawi");

	// PLACE THEM ON THE MAP RELATIVE TO THE MAP SIZE, THEN POPULATE THEM
	info_Uganda.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;").html("<div class='map_title'><a href='#Uganda'>UGANDA</a></div><div class='map_image'></div>");
	info_Nepal.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;").html("<div class='map_title'><a href='#Nepal'>NEPAL</a></div><div class='map_image'></div>");
	info_Malawi.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;").html("<div class='map_title'><a href='#Malawi'>MALAWI</a></div><div class='map_image'></div>");


	queue()
	    .defer(d3.json, "data/d3-world.json")
	    .defer(d3.tsv, "data/world-country-names.tsv")
	    .await(ready);

	d3.select(window).on("resize", sizeChange);
	
	function sizeChange(){
		// d3.select("svg").attr("transform", "scale(" + $("#intro_map").width()/0 + ")");
	    // $("svg").height($("#intro_map").width()*0.448);

	    // adjust things when the window size changes
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
	    // d3.selectAll('svg').attr('d', path);


		info_Uganda.attr("style", "left:" + (width/1.5 - 40) + "px; top:" + (height/2 - 40) + "px;").html("<div class='map_title'><a href='#Uganda'>UGANDA</a></div><div class='map_image'></div>");
		info_Nepal.attr("style", "left:" + (width/1.2 - 40) + "px; top:" + (height/2.9 - 40) + "px;").html("<div class='map_title'><a href='#Nepal'>NEPAL</a></div><div class='map_image'></div>");
		info_Malawi.attr("style", "left:" + (width/1.45 - 40) + "px; top:" + (height/1.3 - 40) + "px;").html("<div class='map_title'><a href='#Malawi'>MALAWI</a></div><div class='map_image'></div>");

		line_Uganda.attr("x1", width/1.68).attr("y1", height/1.65).attr("x2", width/1.5).attr("y2", height/2).attr("stroke", "black").attr("stroke-width", "1")
		line_Nepal.attr("x1", width/1.34).attr("y1", height/2.3).attr("x2", width/1.2).attr("y2", height/2.9).attr("stroke", "black").attr("stroke-width", "1")
		line_Malawi.attr("x1", width/1.67).attr("y1", height/1.43).attr("x2", width/1.45).attr("y2", height/1.3).attr("stroke", "black").attr("stroke-width", "1")

		// info_Uganda.attr("cx",width/1.5).attr("cy",height/2).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)
		// info_Nepal.attr("cx",width/1.2).attr("cy",height/2.9).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)
		// info_Malawi.attr("cx",width/1.45).attr("cy",height/1.3).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)

	}
  

	function ready(error, world, names) {
		   // TRANSLATE FROM TOPOJSON, ADD TITLE AND GEOMETRY
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
		   
		   a.on("click", function(){
		       var sel_country = $(this).attr("title")
			   // console.log( sel_country )
			   if (sel_country == "Nepal"){
				   $("#intro").hide()
				   $("#frontpage").hide()
				   $("#content").fadeIn("slow")
				   mapInit()
				   $(window).trigger('resize')
				}

		   })

		   // a.on("mouseover", function(d) {
		   //   d3.selectAll("[title=" + this.title + "]").classed("countryActive",true);
		   // });
		   
		   // a.on("mouseout", function(d) {
		   //   d3.selectAll("[title=" + this.title + "]").classed("countryActive",false);
		   // });

			a.on("mouseenter", function(){
				var title = $(this).attr("title")
				$(".map_info").each(function(){
					if ($(this).attr("title")==title){
						var updateClass = $(this).attr("class") + " map_info_hover"
						$(this).attr("class", updateClass)
					}
				})
			})

			a.on("mouseleave", function(){
				var title = $(this).attr("title")
				$(".map_info").each(function(){
					if ($(this).attr("title")==title){
						$(this).attr("class", "map_info")
					}
				})
			})
	

			line_Uganda = svg.append("line").attr("id","line_Uganda").attr("class", "map_line")
			line_Nepal = svg.append("line").attr("id","line_Nepal").attr("class", "map_line")
			line_Malawi = svg.append("line").attr("id","line_Malawi").attr("class", "map_line")

			// info_Uganda = svg.append("circle").attr("id","info_Uganda").attr("class","map_info").attr("title","Uganda")
			// info_Nepal = svg.append("circle").attr("id","info_Nepal").attr("class","map_info").attr("title","Nepal")
			// info_Malawi = svg.append("circle").attr("id","info_Malawi").attr("class","map_info").attr("title","Malawi")


			line_Uganda.attr("x1", width/1.68).attr("y1", height/1.65).attr("x2", width/1.5).attr("y2", height/2).attr("stroke", "black").attr("stroke-width", "1")
			line_Nepal.attr("x1", width/1.34).attr("y1", height/2.3).attr("x2", width/1.2).attr("y2", height/2.9).attr("stroke", "black").attr("stroke-width", "1")
			line_Malawi.attr("x1", width/1.67).attr("y1", height/1.43).attr("x2", width/1.45).attr("y2", height/1.3).attr("stroke", "black").attr("stroke-width", "1")

			// info_Uganda.attr("cx",width/1.5).attr("cy",height/2).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)
			// info_Nepal.attr("cx",width/1.2).attr("cy",height/2.9).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)
			// info_Malawi.attr("cx",width/1.45).attr("cy",height/1.3).attr("r",30).attr("fill","white").attr("stroke","black").attr("stroke-width",1)


	}
	 
	//check if country is active (do we have data for it)
	function countrySpecific(d, i) {
	   if (d.name=='Uganda' || d.name == 'Malawi' || d.name == 'Nepal') return 'map_country map_countrySelected';
	   else return 'map_country';
	}

	//link map info popups to map elements
	$(".map_info").hover(
		function(){
			var title = $(this).attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					var updateClass = $(this).attr("class") + " map_countrySelected_hover"
					$(this).attr("class", updateClass)
				}
			})
		}, function(){
			var title = $(this).attr("title")
			$(".map_countrySelected").each(function(){
				if ($(this).attr("title")==title){
					$(this).attr("class", "map_country map_countrySelected")
				}
			})
		}
	)

	 $(".map_info").on("click", function(){
       var sel_country = $(this).attr("title")
	   // console.log( sel_country )
	   if (sel_country == "Nepal"){
		   $("#intro").hide()
		   $("#frontpage").hide()
		   $("#content").fadeIn("slow")
		   mapInit()
		   $(window).trigger('resize')
		}

   })

	// return to home
	$("#grid_back").on("click", function(){
	   $("#intro").show()
	   $("#frontpage").show()
	   $("#content").hide()
	   $(window).trigger('resize')
	})

//-------------------------------------------------------------------------------------------------
// grid
//-------------------------------------------------------------------------------------------------

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

	$("#overlay").click(function(){
		$("body").css("overflow","auto")
		$("#overlay").hide()
		$selected.removeClass("overlay_content")
		mapControlToggle(0)
		map.invalidateSize();
	})

	$("#grid").sortable()

	// $("#bot_menu").hide()
	$(".bot_menu").hide()

	$(".menu_item").click(function(){
		$(this).siblings().removeClass("active_menu")
		$(this).addClass("active_menu")
	})

	$('#slider').dragslider({
		animate: true,
		range: true,
		rangeDrag: true,
		min:2001,
		max:2013,
		step: 1,
		values: [2001, 2013]
	});
 
 	
    var v = $("#slider").dragslider("values")
    $('#slider_value').text(v[0]+" - "+v[1]);
    var min = $('#slider').dragslider('option', 'min')
    var max = $('#slider').dragslider('option', 'max')
    $('#slider_min').text(min);
    $('#slider_max').text(max);


    var onPoint = false
    var onExtract = false
    $('#slider').dragslider({
    	slide: function(event, ui) {
	    	v = ui.values
	        $('#slider_value').text(v[0]+" - "+v[1]);
	   	},
    	change: function(event, ui) {
	        if (onPoint){ addPointData(cat) }
	        var start_year = $("#slider").dragslider("values")[0]
	    	var end_year = $("#slider").dragslider("values")[1]
	        if (onExtract){ prepExtract("nepal")}
	        buildCharts(start_year, end_year, geojsonPoints, geojsonExtract)
    	}
    });

	// $("#top_menu li").on("click", function(){
	$(".top_menu").on("click", function(){
		onPoint = true
		cat = $(this).attr("id")
		addPointData(cat)

		// $("#Agriculture_menu").hide()
		// $("#Health_menu").hide()
		// $("#Education_menu").hide()
		$(".bot_menu").hide()
		
		$("#"+cat+"_menu").show()
	})

	$("#ndvi").on("click", function(){
		onExtract = true
  
		prepExtract("nepal")
		buildCharts($("#slider").dragslider("values")[0], $("#slider").dragslider("values")[1], geojsonPoints, geojsonExtract)

		$("#charts").show()
	})


	function prepExtract(country){
		var start_year = $("#slider").dragslider("values")[0]
		var end_year = $("#slider").dragslider("values")[1]
		// console.log("in")
		$("#map").hide()
		$("#loading").show()
		$.ajax ({
	        url: "process.php",
	        data: {type: "execR", start_year: start_year, end_year: end_year},
	        dataType: "text",
	        type: "post",
	        async: false,
	        success: function(result) {
	        	// console.log(result)
        		$("#loading").hide()
				$("#map").show()
	        	addGeoExtract(country, "../data/poly/output_"+start_year+"_"+end_year+".geojson")
	        }
	    })

	}

	var map
	var tiles
	var cat

	// mapInit()

	function mapInit(){

		L.mapbox.accessToken = 'pk.eyJ1Ijoic2dvb2RtIiwiYSI6InotZ3EzZFkifQ.s306QpxfiAngAwxzRi2gWg'

		map = L.mapbox.map('map', { })

		tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
				}).addTo(map)

		map.setView([0,0], 1);

		map.options.maxZoom = 11
		mapControlToggle(0)

		$("#Agriculture").trigger("click")
		$("#ndvi").trigger("click")
	}

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

	// function refreshMaps(){
	// 	map.invalidateSize();
	// 	// $(".grid_map").each(function(){

	// 	// })
	// }

	// function refreshCharts(){
	// 	$(".grid_chart").each(function(){
	// 		$(this).highcharts().redraw()
	// 	})
	// }

	var allCountryBounds = { global:{_northEast:{lat:90, lng:180}, _southWest:{lat:-90, lng:-180}} }
	// addCountry("nepal", "../data/source/nepal_country.geojson")

	function addCountry(country, file){

		var geojsonCountry = readJSON(file)
		
		var countryLayer = L.geoJson(geojsonCountry, {style: style}).addTo(map);
		var countryBounds = countryLayer.getBounds()
		map.fitBounds( countryBounds )

		allCountryBounds[country] = countryBounds
		
		// console.log(allCountryBounds)

		function style(feature) {
		    return {
		        fillColor: 'red', // ### HERE ###
		        weight: 1,
		        opacity: 1,
		        color: 'black',
		        // dashArray: '3',
		        fillOpacity: 0.25
		    };
		}

	}


	// var myLayer
	var geojson
	var geojsonExtract 
	var info
	var legend
	function addGeoExtract(country, file){

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



	var markers
	var geojsonPoints
	function addPointData(cat){

		if (map.hasLayer(markers)){
			map.removeLayer(markers)
		}

		$.ajax ({
	        url: "process.php",
	        data: {type: "execGeoJSON", cat: cat, range_min:$("#slider").dragslider("values")[0], range_max:$("#slider").dragslider("values")[1]},
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
						for (var y = min; y<=max; y++){
							if ( parseFloat(a["d_"+y]) > 0 ){
								if (c>0){ popup += ", "}
								popup += y
								c++							
							}
						}
						popup += "</br>$USD: "
						c = 0
						for (var y = min; y<=max; y++){
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



})


	