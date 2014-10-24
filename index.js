$(document).ready(function(){
	
	$("#grid").sortable()

	$("#bot_menu").hide()

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

	$("#top_menu li").on("click", function(){
		onPoint = true
		cat = $(this).attr("id")
		addPointData(cat)

		$("#Agriculture_menu").hide()
		$("#Health_menu").hide()
		$("#Education_menu").hide()

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

	mapInit()

	function mapInit(){

		L.mapbox.accessToken = 'pk.eyJ1Ijoic2dvb2RtIiwiYSI6InotZ3EzZFkifQ.s306QpxfiAngAwxzRi2gWg'

		map = L.mapbox.map('map', { })

		tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
				}).addTo(map)

		map.setView([0,0], 1);

		map.options.maxZoom = 11
		map.scrollWheelZoom.disable();
		map.dragging.disable();

		$("#Agriculture").trigger("click")
		$("#ndvi").trigger("click")
	}

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



	//GEOJSON
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


	