<!DOCTYPE html>
<html>

<head>
   <meta charset="UTF-8">
   <title>AidData R&D - v.Alpha</title> 


   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css" />

   <link rel='stylesheet' href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css'/>

   <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.css" />
   <link rel="stylesheet" href="../libs/MarkerCluster/MarkerCluster.Default.css" />

   <link rel="stylesheet" href="index.css?<?php echo filectime('index.css') ?>" />   
   <link rel="stylesheet" href="grid.css?<?php echo filectime('grid.css') ?>" />   
    
   <link rel="stylesheet" href="jcarousel.css?<?php echo filectime('jcarousel.css') ?>" />   

</head>

<body>

<!-- 
    <div id="header">
      <a id="header_logo_left" href="http://aiddata.org/"><img src="../imgs/ACDP logo transparent large.png"> </a>
      <a id="header_logo_right" href="http://www.usaid.gov/GlobalDevLab"><img src="../imgs/US Global Dev Lab transparent logo.png"> </a>
    </div>
 -->


<!-- ==================================================================================================== -->


      <!-- Wrap the rest of the page in another container to center all the content. -->

      <div id="frontpage" class="container marketing">


        <div id="container_head">
          <div class="form">
            <span>There was </span>
            <span id="variable1" class="variable"></span>
            <span> of </span>
            <select id="container_head_option_1" >
                <option value="agricultural">agricultural</option>
                <option value="educational">educational</option>
                <option value="social">social</option>               
            </select>
            <span> aid across the world between </span>
            <select id="container_head_option_2" >
                <option selected value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>   
                <option value="2004">2004</option>    
                <option value="2005">2005</option>
                <option value="2006">2006</option> 
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>     
                <option value="2010">2010</option> 
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>                         
            </select>
            <span> and </span>
            <select id="container_head_option_3" >
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>   
                <option value="2004">2004</option>    
                <option value="2005">2005</option>
                <option value="2006">2006</option> 
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>     
                <option value="2010">2010</option> 
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option selected value="2013">2013</option>             
            </select>
            <span>. Projects in </span>
            <select id="container_head_option_4" >
                <option value="income">low income</option>
                <option value="literacy">low literacy</option>               
            </select>
            <span> areas received </span>
            <span id="variable2" class="variable"></span>
            <span> of that aid.</span>

          </div>
        </div>

        <!-- ================================================== -->

        <div id="container_mid"></div>

        <!-- ================================================== -->

         <div id="container_foot" class="wrapper">
            <div class="jcarousel-wrapper">
                <div class="jcarousel">
                    <ul>
                        <li><div><span>Nepal</span> <p>Info</p> </div></li>
                        <li><div><span>Malawi</span> <p>Info</p> </div></li>
                        <li><div><span>Uganda</span> <p>Info</p> </div></li>
                        <li><div><span>Other</span> <p>Info</p> </div></li>

                    </ul>
                </div>

                <a href="#" class="jcarousel-control-prev">&lsaquo;</a>
                <a href="#" class="jcarousel-control-next">&rsaquo;</a>

                <p class="jcarousel-pagination"></p>
            </div>
        </div>

        <!-- ================================================== -->

        <hr class="featurette-divider">

        <!-- Three columns of text below the carousel -->
        <div class="row">
          <div class="col-lg-4">
            <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" style="width: 140px; height: 140px;">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" style="width: 140px; height: 140px;">
            <h2>Heading</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <img class="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" style="width: 140px; height: 140px;">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->


        <!-- ================================================== -->

        <!-- START THE FEATURETTES -->

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">News<span class="text-muted">Item 1</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-5">
            <img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="Generic placeholder image">
          </div>
          <div class="col-md-7">
            <h2 class="featurette-heading">News<span class="text-muted">Item 2</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">News<span class="text-muted">Item 3</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">

        <!-- /END THE FEATURETTES -->

    </div>


<!--==================================================================================================== -->


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

      <!-- ================================================== -->

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


<!--==================================================================================================== -->


    <!-- Fixed navbar -->
    <div id="footer" class="navbar navbar-default navbar-fixed-bottom" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a id="footer_aiddata_logo" class="navbar-brand" href="http://aiddata.org/"><img src="../imgs/ACDP logo transparent large.png"> </a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">

            <li class="active"><a href="http://128.239.119.254/aiddata/Home">Home</a></li>
            <li><a href="http://128.239.119.254/aiddata/DET/www/det.php">DET</a></li>
            <li><a href="http://128.239.119.254/aiddata/DVT/leaflet_05">DVT</a></li>
            <li><a href="http://128.239.119.254/aiddata/DVT2/www">DVT2</a></li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Full List <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-header">Data Access</li>
                  <li><a href="http://128.239.119.254/aiddata/DET/www/det.php">DET</a></li>
                  <li><a href="http://128.239.119.254/aiddata/DET_TEST/www/det.php">DET_TEST</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Data Upload</li>
                  <li><a href="http://128.239.119.254/aiddata/DET/AMU/home">AMU for DET</a></li>
                  <li><a href="http://128.239.119.254/aiddata/DET_TEST/AMU/home">AMU for DET_TEST</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Visualizations</li>
                  <li><a href="http://128.239.119.254/aiddata/DVT/leaflet_05">DVT</a></li>
                  <li><a href="http://128.239.119.254/aiddata/DVT2/www">DVT2</a></li>
              </ul>
            </li>

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="http://aiddata.org">AidData.org</a></li>
            <li><a href="#">About</a></li>
            <li id="temp_reset"><a href="#">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
 

<!--==================================================================================================== -->


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

   <script src="../libs/jquery.jcarousel.min.js"></script>

   <script src="grid.js"></script>     
   <script src="charts.js"></script>
   <script src="jcarousel.js"></script> 

   <script src="index.js"></script> 


</body>

</html>