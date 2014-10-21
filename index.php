<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>leafletProject</title> 

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>

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


</head>

<body>
     
          
    <div id="middle">
               
        <div id="top_menu_container">
            <ul id="top_menu">
                <li id="Agriculture" class="menu_item">Agriculture</li><!--
             --><li id="Health" class="menu_item">Health</li><!--
             --><li id="Education" class="menu_item">Education</li>     
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

        <div id="map">
            
        </div> 

       <div id="loading" style="display:none">
            <img src="loading.gif">
        </div> 

        <div id="bot_menu_container">
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

    </div>   

</body>

</html>