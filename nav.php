<!--
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
-->

<style>
  body{
    padding-bottom: 50px;
  }

  #navbar_spacer{
    clear:both;
    height: 75px;
  }

  #navbar{
    border-top: 2px solid rgb(7,26,44);
  }

  #navbar_aiddata_logo{
    margin:0 10px;
    padding:0;
  }

  #navbar_aiddata_logo img{
    height: 50px;
  }
</style>

<!-- Add navbar_spacer div to html in file nav.php is being included with -->
<!-- <div id="navbar_spacer"></div> -->

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
      <a id="navbar_aiddata_logo" class="navbar-brand" href="http://aiddata.org/"><img src="/aiddata/imgs/ACDP logo transparent large.png"> </a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav">

        <li class="active"><a href="/aiddata/home">Home</a></li>


        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Tools <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
              <li class="dropdown-header">Data Access</li>
              <li><a href="/aiddata/DET/www/det.php">Data Extraction Tool (DET) </a></li>
              <li><a href="/aiddata/DET_TEST/www/det.php">DET_TEST</a></li>
              <li><a href="/aiddata/PET">Point Extraction Tool (PET)</a></li>
              <li><a href="/aiddata/DAT">Data Access Tool (DAT)</a></li>
              <li class="divider"></li>
              <li class="dropdown-header">Data Upload</li>
              <li><a href="/aiddata/DET/AMU/home">Application Management Utility for DET</a></li>
              <li><a href="/aiddata/DET_TEST/AMU/home">AMU for DET_TEST</a></li>
              <li class="divider"></li>
              <li class="dropdown-header">Visualizations</li>
              <li><a href="/aiddata/DASH">DASH</a></li>
              <li><a href="/aiddata/MAT">Map Analysis Tool</a></li>
              <li><a href="/aiddata/DVT/leaflet_05">Data Visualization Tool</a></li>
              <li><a href="/aiddata/DVT3/www">DVT3</a></li>
              <li><a href="/aiddata/grid/www">Grid</a></li>
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
              <li class="dropdown-header">Tools</li>
              <li><a href="/aiddata/CCB/test">Center for Conservation Biology</a></li>
              <li><a href="/aiddata/STC/www">Save the Children</a></li>
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
        <li><a href="#">About</a></li>
        <li id="temp_reset"><a href="#">Contact</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div> <!-- /#navbar -->

