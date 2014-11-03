<!DOCTYPE html>
<html>

<head>
   <meta charset="UTF-8">
   <title>leafletProject</title> 


   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

   <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />



   <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.css" />
   <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.Default.css" />

 

   <link rel="stylesheet" href="index.css?<?php echo filectime('index.css') ?>" />   
   <link rel="stylesheet" href="d3map.css?<?php echo filectime('d3map.css') ?>" />   
    

</head>

<body>

   <div id="container"></div>

   <div id="content">
      <div id="grid_container">
         <ul id="grid">
            <li class="grid_container grid_map grid-2-1">
               <div id="map"><div class="overlay_button"></div></div>
               <!-- <div id="loading" style="display:none"><img src="../imgs/loading.gif"></div> -->
            </li> 
            <li class="grid_container grid_chart grid-1-1"><div id="chart1"></div></li>
            <li class="grid_container grid_chart grid-1-1"><div id="chart2"></div></li>
            <li class="grid_container grid_chart grid-1-1"><div id="chart3"></div></li>
            <li class="grid_container grid-1-1"><div id="info"></div></li>
         </ul>       
      </div> 


      <div id="options_container">
         <div id="options">   

            <div id="menu" class="row">

               <div id="Agriculture" class="top_menu col-md-12">
                 Agriculture
                 <div id="Agriculture_menu" class="bot_menu row row-md-height">
                   <div id="ndvi" class="col-md-3 col-md-height"><span>Potential Agricultural Productivity (2001)</span></div>
                   <div class="col-md-3 col-md-height"><span class="temp">Agricultural Productivity Gap</span></div>
                   <div class="col-md-3 col-md-height"><span class="temp">Rural Income</span></div>
                   <div class="col-md-3 col-md-height"><span class="temp">Distance to City</span></div>
                 </div>
               </div>

               <div id="Health" class="top_menu col-md-12">
                  Health
                  <div id="Health_menu" class="bot_menu row row-md-height">
                     <div class="col-md-3 col-md-height"><span class="temp">Distance to Existing Health Project</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">Disease Prevalence</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">Distance to City</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">Water Security</span></div>
                  </div>
               </div>

               <div id="Education" class="top_menu col-md-12">
                  Education
                  <div id="Education_menu" class="bot_menu row row-md-height">
                     <div class="col-md-3 col-md-height"><span class="temp">Literacy</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">Income</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">% Female</span></div>
                     <div class="col-md-3 col-md-height"><span class="temp">% Unemployed</span></div>
                  </div>
               </div>

            </div>


            <div id="slider_container">
               <div id="slider_top" class="slider_sub">
                  <div id="slider"></div>
               </div> 
               <div id="slider_bot" class="slider_sub">  
                  <span id="slider_min"></span>
                  <span id="slider_max"></span>
                  <span id="slider_value"></span>
               </div>
            </div>

         </div>
      </div>
   </div>

   <div id="overlay">
      <!-- <div id="overlay_content"></div> -->
   </div>


    <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">AidData Development</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">

            <li class="active"><a href="http://128.239.119.254/aiddata/Home">Home</a></li>
            <li><a href="http://128.239.119.254/aiddata/DET/AMU/home">DET</a></li>
            <li><a href="http://128.239.119.254/aiddata/DET_TEST/AMU/home">DET_TEST</a></li>
            <li><a href="http://128.239.119.254/aiddata/DVT/leaflet_05">DVT</a></li>
            <li><a href="http://128.239.119.254/aiddata/DVT2/www">DVT2</a></li>
<!-- 
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-header">Data Access</li>
                  <li><a href="http://128.239.119.254/aiddata/DET/AMU/home">DET</a></li>
                  <li><a href="http://128.239.119.254/aiddata/DET_TEST/AMU/home">DET_TEST</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Visualizations</li>
                  <li><a href="http://128.239.119.254/aiddata/DVT/leaflet_05">DVT</a></li>
                  <li><a href="http://128.239.119.254/aiddata/DVT2/www">DVT2</a></li>
              </ul>
            </li> -->

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="http://aiddata.org">AidData.org</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
 



   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>

   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

   <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>

   <script src="../libs/leaflet.ajax.min.js"></script>

   <script src="../libs/leaflet-dvf.min.js"></script>

   <script src="../libs/Leaflet.geoCSV-master/leaflet.geocsv.js"></script>

   <script src="../libs/dragslider.js"></script>

   <script src="../libs/SliderControl.js"></script>

   <script src="../libs/MarkerCluster/leaflet.markercluster-src.js"></script>

   <script src="../libs/underscoremin.js"></script>

   <script src="http://code.highcharts.com/highcharts.js"></script>

   <script src="http://code.highcharts.com/modules/exporting.js"></script>

   <script src="http://d3js.org/d3.v3.min.js"></script>
   <script src="http://d3js.org/topojson.v1.min.js"></script>
   <!--<script src="../libs/topojson.js"></script>-->
   <script src="http://d3js.org/queue.v1.min.js"></script>

   <script src="d3map.js"></script>
   <script src="grid.js"></script>     
   <script src="charts.js"></script>

   <script src="index.js"></script> 





</body>

</html>