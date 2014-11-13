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
      <div id="intro">
        <div id="intro_form_container" class="intro_container">
          <div id="intro_form">
            <div class="form">
              <span>In AidData partner countries, there was </span>
              <span id="intro_variable1" class="variable">$-</span>
              <span> of recorded</span>
              <select id="intro_form_option_1" >
                  <option value="agricultural">agricultural</option>
                  <option value="educational">educational</option>
                  <option value="social">social</option>               
              </select>
              <span> aid in the last decade.</span>
              <select id="intro_form_option_2" style="display:none">
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
              <span  style="display:none"> and </span>
              <select id="intro_form_option_3"  style="display:none">
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
              <span><!-- . --> Projects in </span>
              <select id="intro_form_option_4" >
                  <option value="income">low income</option>
                  <option value="literacy">low literacy</option>               
              </select>
              <span> areas received </span>
              <span id="intro_variable2" class="variable">-%</span>
              <span> of that aid.</span>

            </div>
          </div>
        </div>

          <!-- ================================================== -->
        <div id="intro_map_container" class="intro_container">
          <div id="intro_map"></div>
        </div>

          <!-- ================================================== -->
        <div id="intro_tabs_container" class="intro_container">
          <div id="intro_tabs" class="container">
            <div class="row">
              <div class="col-xs-3 jcarousel-tab-container jcarousel-tab-active" ><div id="jcarousel-general" class="jcarousel-tab" > All </div></div>
              <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-country" class="jcarousel-tab" > Countries </div></div>
              <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-tool" class="jcarousel-tab" > Tools </div></div>
              <div class="col-xs-3 jcarousel-tab-container" ><div id="jcarousel-alert" class="jcarousel-tab" > Alerts </div></div>
            </div>
            
          </div>
        </div>
          <!-- ================================================== -->

        <div id="intro_carousel_container" class="intro_container">
           <div id="intro_carousel" class="wrapper">
              <div class="jcarousel-wrapper">
                  <div class="jcarousel">
                      <ul>
                         <!--  <li class="jcarousel-country"><div><span>Nepal</span> <p>Info</p> </div></li>
                          <li class="jcarousel-country"><div><span>Malawi</span> <p>Info</p> </div></li>
                          <li class="jcarousel-country"><div><span>Uganda</span> <p>Info</p> </div></li>
                          <li class="jcarousel-tool"><div><span>Data Extraction Tool</span> <p>Info</p> </div></li>
                          <li class="jcarousel-tool"><div><span>Famine Analysis</span> <p>Info</p> </div></li>
                          <li class="jcarousel-tool"><div><span>Rapid Visualization Tool</span> <p>Info</p> </div></li>
                          <li class="jcarousel-tool"><div><span>Other Tool</span> <p>Info</p> </div></li>
                          <li class="jcarousel-alert"><div><span>Alert: Famine</span> <p>Info</p> </div></li>
                          <li class="jcarousel-alert"><div><span>Alert: Violence Outbreak</span> <p>Info</p> </div></li>
                          <li class="jcarousel-alert"><div><span>Alert: Natural Disaster</span> <p>Info</p> </div></li> -->
                          <!-- ADD ADDITIONAL ITEMS TO CAROUSEL HERE -->
                      </ul>
                  </div>

                  <a href="#" class="jcarousel-control-prev">&lsaquo;</a>
                  <a href="#" class="jcarousel-control-next">&rsaquo;</a>

                  <p class="jcarousel-pagination"></p>
              </div>
          </div>
        </div>

      </div> <!-- /#intro -->

        <!-- ================================================== -->


      <!-- Wrap the rest of the page in another container to center all the content. -->
      <div id="frontpage" class="container marketing">


<!--         <hr class="featurette-divider"> -->

        <!-- Three columns of text below the carousel -->
        <div class="row">
          <div class="col-lg-4">
            <img class="img-circle" src="../imgs/news_1_head_image.png" alt="Generic placeholder image" style="width: 220px; height: 140px;">
            <h2>AidData</h2>
            <p>AidData is a research and innovation lab that seeks to improve development outcomes by making development finance data more accessible and actionable.</p>
            <p><a class="btn btn-default" href="#news_item_1" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <img class="img-circle" src="../imgs/news_2_head_image.png" alt="Generic placeholder image" style="width: 140px; height: 140px;">
            <h2>Our Data</h2>
            <p>AidData produces mapped project-level data on $6 trillion in aid from over 90 donor agencies with information on remittances and foreign direct investment.</p>
            <p><a class="btn btn-default" href="#news_item_2" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
          <div class="col-lg-4">
            <img class="img-circle" src="../imgs/news_3_head_image.jpg" alt="Generic placeholder image" style="width: 140px; height: 140px;">
            <h2>Get Involved</h2>
            <p>We are at the cusp of having the data we need to make better choices about how we allocate aid.  We need your ideas to make this a reality.</p>
            <p><a class="btn btn-default" href="#news_item_3" role="button">View details &raquo;</a></p>
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->


        <!-- ================================================== -->

        <!-- START THE FEATURETTES -->

        <hr class="featurette-divider">

        <div id="news_item_1" class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">AidData<span class="text-muted"></span></h2>
            <p class="lead">
              AidData was formed in 2009 from the merger of two programs: Project-Level Aid (PLAID) and 
              Accessible Information on Development Activities (AiDA). PLAID, begun in 2003, was a joint effort 
              between the College of William & Mary and Brigham Young University to create a database of 
              development finance activities for use in the research community. AiDA was established in 2001 by 
              Development Gateway to serve as a registry of aid activities to improve aid coordination and 
              effectiveness.
              <br><br>
              Today, AidData is a dynamic partnership between three core institutions. Two universities with a 
              reputation for scholastic excellence, the College of William & Mary and Brigham Young University, 
              contribute intellectual rigor and access to scholars and students as engines of innovation to look at 
              development problems in new ways. Development Gateway, a non-profit development organization, 
              contributes long-standing relationships with ministries of finance in developing countries in designing 
              aid management systems, and provides products and services to fuel greater development 
              transparency and effectiveness.
            </p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-responsive" src="../imgs/news_1_body_image.jpg" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">

        <div id="news_item_2"class="row featurette">
          <div class="col-md-5">
            <img class="featurette-image img-responsive" src="../imgs/news_2_body_image.jpg" alt="Generic placeholder image">
          </div>
          <div class="col-md-7">
            <h2 class="featurette-heading">Our Data<span class="text-muted"></span></h2>
            <p class="lead">
              Each year, billions of dollars are spent to improve the lives of citizens in developing 
              countries. With accessible and relevant data at their fingertips, governments can make 
              better decisions to plan for their country’s future, citizens can hold their leaders to account
              for providing public goods, and donors can invest aid dollars to maximize development 
              results. AidData's research release databases include geocoded data from a variety of country aid 
              information management systems (AIMS), donor IATI feeds, and open data initiatives like the World 
              Bank’s Mapping for Results.
            </p>
          </div>
        </div>

        <hr class="featurette-divider">

        <div id="news_item_3" class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">Get Involved<span class="text-muted"></span></h2>
            <p class="lead">
              From primary research to data visualization, student geocoders to professional programmers, a
              wide variety of users have begun to do incredible things to help change how we map and target 
              international aid efforts.  We’re just at the start.  Click through to see a variety of challenges we’re 
              trying to solve today, and get involved.
            </p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-responsive" src="../imgs/news_3_body_image.jpg" alt="Generic placeholder image">
          </div>
        </div>

        <hr class="featurette-divider">

        <!-- /END THE FEATURETTES -->

    </div> <!-- /#frontpage -->


<!--==================================================================================================== -->


   <div id="content">

      <div id="grid_back">Return to Home</div>

      <div id="grid_header" class="container">
        <div class="row">
          <div id="grid_banner" class="col-sm-6">
            <div id="grid_logo"><div></div></div>
            <div id="grid_title">Nepal</div>
          </div>
          <div id="grid_form" class="col-sm-6">
            <div class="form">
                <span>In </span>
                <span id="grid_country">Nepal</span>
                <span>, there was </span>
                <span id="grid_variable1" class="variable">$-</span>
                <span> of recorded</span>
                <select id="grid_form_option_1" >
                    <option value="agricultural">agricultural</option>
                    <option value="educational">educational</option>
                    <option value="social">social</option>               
                </select>
                <span> aid in the past decade.</span>
                <span><!-- . --> Projects in </span>
                <select id="grid_form_option_4" >
                    <option value="income">low income</option>
                    <option value="literacy">low literacy</option>               
                </select>
                <span> areas received </span>
                <span id="grid_variable2" class="variable">-%</span>
                <span> of that aid.</span>

              </div>
            </div>
          </div>
      </div>

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

    <div id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">CONTACT INFO</div>
          <div class="col-md-4">PARTNERS</div>
          <div class="col-md-4">SOCIAL MEDIA</div>
        </div>
      </div>
    </div>


    <!-- Fixed navbar -->
    <div id="navbar" class="navbar navbar-default navbar-fixed-bottom" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a id="navbar_aiddata_logo" class="navbar-brand" href="http://aiddata.org/"><img src="../imgs/ACDP logo transparent large.png"> </a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">

            <li class="active"><a href="http://128.239.119.254/aiddata/DVT2/www">Home</a></li>


            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <span class="caret"></span></a>
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
                  <li><a href="http://128.239.119.254/aiddata/grid/www">Grid</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Media <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-header">Papers</li>
                  <li><a href="#">Paper About Stuff. Author</a></li>
                  <li><a href="#">Paper About Stuff. Author</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Articles</li>
                  <li><a href="#">Article on Site. Author</a></li>
                  <li><a href="#">Article on Site. Author</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Other</li>
                  <li><a href="#">Blog Post About Things</a></li>
                  <li><a href="#">Link to Event</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Projects <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li class="dropdown-header">Research</li>
                  <li><a href="#">Evaluating the Impact of Open Aid Data</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Technical</li>
                  <li><a href="#">Using Super Computers to Analyze Geospatial Data</a></li>
                  <li class="divider"></li>
                  <li class="dropdown-header">Outreach</li>
                  <li><a href="#">New Data Collection Methods</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Alerts <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Current Alerts</a></li>
                  <li><a href="#">Current Warnings</a></li>
                  <li class="divider"></li>
                  <li><a href="#">Previous Alerts</a></li>
                  <li><a href="#">Previous Warnings</a></li>
                  <li><a href="#">Overview of Previous Events</a></li>
                  <li class="divider"></li>
                  <li><a href="#">How Alerts are Generated</a></li>
                  <li><a href="#">Get Raw Data</a></li>
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
    </div> <!-- /#navbar -->
 

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