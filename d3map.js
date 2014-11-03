

// var margin = {top: 0, left: 0, bottom: 0, right: 0},
//    width = parseInt(d3.select('#container').style('width')),
//    width = width - margin.left - margin.right,
//    mapRatio = .448,
//    height = width * mapRatio;

// var projection = d3.geo.equirectangular()
// 	.scale(width / 6.2)
// 	.translate([ width / 2, width / 3.7]);

// var path = d3.geo.path()
//     .projection(projection);

// var svg = d3.select("#container").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// queue()
//     .defer(d3.json, "data/d3-world.json")
//     .defer(d3.tsv, "data/world-country-names.tsv")
//     .await(ready);

    

// function ready(error, world, names) {
// 	   // TRANSLATE FROM TOPOJSON, ADD TITLE AND GEOMETRY
// 	   var countries = topojson.feature(world, world.objects.countries).features;
// 	   countries.forEach(function(d) {
// 	      d.name = names.filter(function(n) { return d.id == n.id; })[0].name;
// 	   });
// 	   var country = svg.selectAll(".mmcountry").data(countries);
// 	   country.enter().insert("path").attr("class", function(d, i) {
// 	     return countrySpecific(d, i);
// 	   })
// 	   .attr("title", function(d, i) {
// 	     return d.name;
// 	   })
// 	   .attr("d", path);
	   


// 	   // a = d3.selectAll(".countrySelected");
	   
// 	   // a.on("click", function(){
// 	   //     var sel_country = $(this).attr("title")
// 		  //  console.log( sel_country )

// 		  //  $("#container").hide()
// 		  //  $("#content").show()
// 		  //  mapInit()

// 	   // })

// 	   // a.on("mouseover", function(d) {
// 	   //   d3.selectAll("[title=" + this.title + "]").classed("countryActive",true);
// 	   // });
	   
// 	   // a.on("mouseout", function(d) {
// 	   //   d3.selectAll("[title=" + this.title + "]").classed("countryActive",false);
// 	   // });

// }
 
// //check if country is active (do we have data for it)
// function countrySpecific(d, i) {
//    if (d.name == 'Bolivia' || d.name=='Uganda' || d.name=='Kenya' || d.name == 'Malawi' || d.name == 'Haiti' ||d.name == 'Honduras' ||d.name == 'Nepal') return 'mmcountry countrySelected';
//    else return 'mmcountry';
// }

