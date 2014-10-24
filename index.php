<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>leafletProject</title> 

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    
    <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />
    <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>

    <script src="../libs/leaflet.ajax.min.js"></script>
    <script src="../libs/leaflet-dvf.min.js"></script>
    <script src="../libs/Leaflet.geoCSV-master/leaflet.geocsv.js"></script>
    
    <script src="../libs/dragslider.js"></script>
    <script src="../libs/SliderControl.js"></script>

    <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.css" />
    <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.Default.css" />
    <script src="../libs/MarkerCluster/leaflet.markercluster-src.js"></script>

    <script src="../libs/underscoremin.js"></script>

    <link rel="stylesheet" href="index.css?<?php echo filectime('index.css') ?>" />    
    <script src="index.js"></script>

    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>

    <script src="charts.js"></script>

</head>

<body>

    <div id="grid_container">
        <ul id="grid">
            <li class="grid_container grid-2-1">
                <div id="map"></div>
                <div id="loading" style="display:none"><img src="../imgs/loading.gif"></div>
            </li> 
            <li class="grid_container grid-1-1"><div id="chart1"></div></li>
            <li class="grid_container grid-1-1"><div id="chart2"></div></li>
            <li class="grid_container grid-1-1"><div id="chart3"></div></li>
            <li class="grid_container grid-1-1"><div id="info"></div></li>
        </ul>       
    </div> 


    <div id="options_container">
        <div id="options">    
            <div id="top_menu_container" class="menu_container">
                <ul id="top_menu">
                    <li id="Agriculture" class="menu_item">Agriculture</li><!--
                 --><li id="Health" class="menu_item">Health</li><!--
                 --><li id="Education" class="menu_item">Education</li><!--
                 --><li id="Other" class="menu_item">Other</li>    
                </ul>
            </div>

            <div id="bot_menu_container" class="menu_container">
                <ul id="Agriculture_menu">
                    <li id="ndvi" class="menu_item"><span>Potential Agricultural Productivity (2001)</span></li><!--
                 --><li class="menu_item temp"><span>Agricultural Productivity Gap</span></li><!--
                 --><li class="menu_item temp"><span>Rural Income</span></li><!--
                 --><li class="menu_item temp"><span>Distance to City</span></li>           
                </ul>

                <ul id="Health_menu">
                    <li class="menu_item temp"><span>Distance to Existing Health Project</span></li><!--
                 --><li class="menu_item temp"><span>Disease Prevalence</span></li><!--
                 --><li class="menu_item temp"><span>Distance to City</span></li><!--
                 --><li class="menu_item temp"><span>Water Security</span></li>           
                </ul>

                <ul id="Education_menu">
                    <li class="menu_item temp"><span>Literacy</span></li><!--
                 --><li class="menu_item temp"><span>Income</span></li><!--
                 --><li class="menu_item temp"><span>% Female</span></li><!--
                 --><li class="menu_item temp"><span>% Unemployed</span></li>           
                </ul>
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
 


</body>

</html>