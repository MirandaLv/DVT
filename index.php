<!DOCTYPE html>
<html> 

<head>
   <meta charset="UTF-8">
   <title>AidData R&D - v.Alpha</title> 

   <link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>

   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css" />

   <link rel='stylesheet' href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css'/>

   <link rel="stylesheet" href="/aiddata/libs/MarkerCluster/MarkerCluster.css" />
   <link rel="stylesheet" href="/aiddata/libs/MarkerCluster/MarkerCluster.Default.css" />

   <link rel="stylesheet" href="index.css?<?php echo filectime('index.css') ?>" />   
   <link rel="stylesheet" href="grid.css?<?php echo filectime('grid.css') ?>" />   
   <link rel="stylesheet" href="jcarousel.css?<?php echo filectime('jcarousel.css') ?>" />   

</head>

<body>

   <div id="intro">

      <div id="intro_form_container" class="intro_container">
         <div id="intro_form">
            <div class="form">
               
               <span>In AidData partner countries, there was </span>
               <span id="intro_variable1" class="variable">$-</span>
               <span> of recorded</span>
               <select id="intro_form_option_1" >
                  <option value="Agriculture">agricultural</option>
                  <option value="Health">health</option>
                  <option value="Education">educational</option>  
                  <option value="Industry">industrial</option>                            
               </select>
               <span> aid in the last decade.</span>

               <span> Projects in </span>
               <select id="intro_form_option_2" >
                  <option value="ec_per">low income</option>    
                  <option value="ag_per">low yield</option>         
                  <option value="ur_per">urban</option>               
               </select>
               <span> areas received </span>
               <span id="intro_variable2" class="variable">-%</span>
               <span> of that aid.</span>

            </div>
         </div>
      </div>

      <div id="intro_map_container" class="intro_container">
         <div id="intro_map"></div>
      </div>

      <div id="intro_tabs_container" class="intro_container">
         <div id="intro_tabs" class="container">
            <div class="row">
               <div class="col-xs-3 jcarousel-tab-container jcarousel-tab-active" ><div id="jcarousel-general" class="jcarousel-tab" > All </div></div>
               <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-data" class="jcarousel-tab" > Data </div></div>
               <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-country" class="jcarousel-tab" > Countries </div></div>
               <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-analysis" class="jcarousel-tab" > Analysis </div></div>
            </div>
         </div>
      </div>

      <div id="intro_carousel_container" class="intro_container">
         <div id="intro_carousel" class="wrapper">
            <div class="jcarousel-wrapper">
               <div class="jcarousel">
                  <ul>
                     <!-- items added to carousel in index.js using carousel JSON file -->
                  </ul>
               </div>

               <a href="#" class="jcarousel-control-prev">&lsaquo;</a>
               <a href="#" class="jcarousel-control-next">&rsaquo;</a>

               <p class="jcarousel-pagination"></p>
            </div>
         </div>
      </div>

   </div> <!-- /#intro -->


<!--==================================================================================================== -->


   <div id="content">

      <div id="grid_back">Return to Home</div>

      <div id="grid_container">
         <ul id="grid">
            <li class="grid_container">
               <div id="grid_banner">
                  <div id="grid_logo_container"><div id="grid_logo"><div></div></div></div> 
                  <div id="grid_title"></div>
                 
               </div>
            </li>
            <li class="grid_container">          
               <div id="grid_form">
                  <div class="form">
                     <span>In </span>
                     <span id="grid_country"></span>
                     <span>, there was </span>
                     <span id="grid_variable1" class="variable">$-</span>
                     <span> of recorded</span>
                     <select id="grid_form_option_1" >
                        <option value="Agriculture">agricultural</option>
                        <option value="Health">health</option>
                        <option value="Education">educational</option>  
                        <option value="Industry">industrial</option>              
                     </select>
                     <span> aid in the past decade.</span>
                     <span> Projects in </span>
                     <select id="grid_form_option_2" >
                        <option value="ec_per">low income</option>               
                        <option value="ag_per">low yield</option>
                        <option value="ur_per">urban</option>              
                     </select>
                     <span> areas received </span>
                     <span id="grid_variable2" class="variable">-%</span>
                     <span> of that aid.</span>

                  </div>
               </div>
            </li>
            <li class="grid_container">
               <div id="map"><div class="overlay_button"></div></div>
            </li> 
            <li class="grid_container"><div id="chart1"></div></li>
            <li class="grid_container"><div id="chart2"></div></li>
            <li class="grid_container"><div id="chart3"></div></li>
            <li class="grid_container"><div id="info_container"><div id="info"></div></div></li>
         </ul>       
      </div> 

      <div id="navbar_spacer"></div>

   </div>

   <!-- ================================================== -->


   <div id="overlay">
      <!-- <div id="overlay_content"></div> -->
   </div>


<!--==================================================================================================== -->


   <?php include("/var/www/html/aiddata/home/nav.php"); ?>  


<!--==================================================================================================== -->


   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>

   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

   <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>

   <script src="/aiddata/libs/leaflet.ajax.min.js"></script>

   <script src="/aiddata/libs/leaflet-dvf.min.js"></script>

   <script src="/aiddata/libs/Leaflet.geoCSV-master/leaflet.geocsv.js"></script>

   <script src="/aiddata/libs/MarkerCluster/leaflet.markercluster-src.js"></script>

   <script src="/aiddata/libs/underscoremin.js"></script>

   <script src="http://code.highcharts.com/highcharts.js"></script>

   <script src="http://code.highcharts.com/modules/exporting.js"></script>

   <script src="http://d3js.org/d3.v3.min.js"></script>
   <script src="http://d3js.org/topojson.v1.min.js"></script>
   <!--<script src="/aiddata/libs/topojson.js"></script>-->
   <script src="http://d3js.org/queue.v1.min.js"></script>

   <script src="/aiddata/libs/jquery.jcarousel.min.js"></script>

   <script src="charts.js"></script>

   <script src="index.js"></script> 


</body>

</html>