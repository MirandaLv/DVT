<?php

$base = "/var/www/html/aiddata/";

switch ($_POST['type']) {

	//returns directory contents
	case 'scan':
		$path = $_POST['path'];
		$dir = $base."DET/resources" . $path;
		$rscan = scandir($dir);
		$scan = array_diff($rscan, array('.', '..'));
		$out = json_encode($scan);
		echo $out;
		break;

	// create / get point geojson from csv data (ogr2ogr call)
	case 'addPointData':
		$country = $_POST["country"];
		$type = $_POST["pointType"];
		$min = $_POST["range_min"];
		$max = $_POST["range_max"];

		$dest =  $base."home/data/point/".$country."_".$type."_".$min."_".$max.".geojson";
		$source = $base.'home/data/source/'.$country.'.vrt';

		// build source csv / vrt
		if ( !file_exists($source) ) {

		}

		// build geojson
		if ( !file_exists($dest) ) {

			if ($country == "Uganda") {
				if ($type == "Health") {
					$search = "ad_sector_name LIKE '%HEALTH%' OR ad_sector_name LIKE '%WATER%'";
				} else {
					$search = "ad_sector_name LIKE '%".strtoupper($type)."%'";
				}
			} else {
				if ($type == "Health") {
					$search = "ad_sector_name LIKE '%Health%' OR ad_sector_name LIKE '%Water Supply and Sanitation%'";
				} else {
					$search = "ad_sector_name LIKE '%".$type."%'";
				}
			}

			if ($country != "Malawi"){
				$search .= " AND (d_".$min." != '0'";
				for ($i=$min+1;$i<=$max;$i++) {
					$search .= " OR d_".$i." != '0'";
				}
				$search .= ")";
			}

			$string = 'ogr2ogr -f GeoJSON -sql "SELECT * FROM '.$country.' WHERE '.$search.'" '.$dest.' '.$source;

			file_put_contents('/var/www/html/aiddata/test.txt', $string);

			exec($string);

		} 

		$results = file_get_contents($dest);
		echo $results;
		
		break;

	// build / get geojson with extract values and new calculations (from R script)
	// case 'addPolyData':


	// 	$country = $_POST["country"];
	// 	$type = $_POST["polyType"];
	// 	$sub = $_POST["sub"];
	// 	$start_year = $_POST["start_year"];
	// 	$end_year = $_POST["end_year"];

	// 	switch ($country){
	// 		case "malawi":
	// 		case "uganda":
	// 			$continent = "africa";
	// 			break;
	// 		case "nepal":
	// 			$continent = "asia";
	// 			break;
	// 	}

	// 	$vars = $country ." ". $type ." ". $sub ." ". $start_year ." ". $end_year ." ". $continent;

	// 	if ( file_exists("/var/www/html/aiddata/home/data/poly/". $country."_".$type."_".$sub."_".$start_year."_".$end_year.".geojson") ){
	// 		$out = "exists";

	// 	} else {
	// 		exec("/usr/bin/Rscript /var/www/html/aiddata/home/www/rcalc.R $vars"); 
	// 		$out = "created";
	// 	}
	// 	echo json_encode($out);

	// 	break;
}


?>