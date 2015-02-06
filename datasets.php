<!DOCTYPE html>
<html> 

<head>
   <meta charset="UTF-8">
   <title>AidData Datasets</title> 

   <link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
   <link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>

   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css" />

   <link rel="stylesheet" href="datasets.css?<?php echo filectime('datasets.css') ?>" />   

</head>

<body>

   <div id="title">AidData Datasets</div>

   <div id="info">
      <div id="info_text">Info about datasets page</div>
      <div id="info_link">Link back to home page</div>
   </div>

   <div id="country" class="section">
      <ul class="grid">
         <li class="grid_container"><div>item</div></li>
      </ul>       
   </div> 

   <div id="agency" class="section">
      <ul class="grid">
         <li class="grid_container"><div>item</div></li>
      </ul>       
   </div>

   <div id="other" class="section">
      <ul class="grid">
         <li class="grid_container"><div>item</div></li>
      </ul>       
   </div> 




   <div id="navbar_spacer"></div>

   <?php include("/var/www/html/aiddata/home/nav.php"); ?>  


   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

   <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>

   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

   <script src="/aiddata/libs/underscoremin.js"></script>

   <!-- <script src="datasets.js"></script>  -->


</body>

</html>