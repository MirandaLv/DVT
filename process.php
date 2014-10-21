<?php


switch ($_POST['type']) {

	//returns directory contents
	case 'scan':
		$path = $_POST['path'];
		$dir = "/var/www/html/aiddata/DET/resources" . $path;
		$rscan = scandir($dir);
		$scan = array_diff($rscan, array('.', '..'));
		$out = json_encode($scan);
		echo $out;
		break;

	case 'execGeoJSON':
		$type = $_POST["cat"];
		$min = $_POST["range_min"];
		$max = $_POST["range_max"];
		$dest =  "/var/www/html/aiddata/DVT2/data/point/NPL_projects_".$type."_".$min."_".$max.".geojson";
		if (!file_exists($dest)){
			$source = '/var/www/html/aiddata/DVT2/data/source/NPL_projects.vrt';

			$search = "ad_sector_name = '".$type."' AND (d_".$min." != '0'";
			for ($i=$min+1;$i<=$max;$i++) {
				$search .= " OR d_".$i." != '0'";
			}
			$search .= ")";

			exec('ogr2ogr -f GeoJSON -sql "SELECT * FROM NPL_projects WHERE '.$search.'" '.$dest.' '.$source);

			$results = file_get_contents($dest);
			echo $results;

		} else {
			$results = file_get_contents($dest);
			echo $results;
		}
		break;

	case 'execR':

		$start_year = $_POST["start_year"];
		$end_year = $_POST["end_year"];

		$vars = $start_year ." ". $end_year;

		if ( file_exists("/var/www/html/aiddata/DVT2/data/poly/output_".$start_year."_".$end_year.".geojson") ){
			echo "exists";

		} else {
			exec("/usr/bin/Rscript /var/www/html/aiddata/DVT2/www/rcalc.R $vars"); 
			echo "created";
		}
		break;
}


?>