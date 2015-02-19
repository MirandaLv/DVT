<?php

switch ($_POST['call']) {

	// check if a file exists
	case 'exists':
		$name = $_POST['name'];
		if ( file_exists("/var/www/html/aiddata/".$name) ) {
			echo "true";
		} else {
			echo "false";
		}
		break;

	// returns directory contents
	case 'scan':
		$path = $_POST['path'];
		$dir = "/var/www/html/aiddata/DET/resources" . $path;
		$rscan = scandir($dir);
		$scan = array_diff($rscan, array('.', '..'));
		$out = json_encode($scan);
		echo $out;
		break;

	// finds a file based on options
	case 'find':
		$dir = "/var/www/html/aiddata/DET/resources" ."/". $_POST['continent'] ."/". $_POST['country'] ."/cache/geojsons";;
		$rscan = scandir($dir);
		$scan = array_diff($rscan, array('.', '..'));
		$out = false;

		foreach ($scan as $key => $file) {
			
			if ( strpos($file, 'ADM2') != FALSE && strpos($file, $_POST['folder']) != FALSE ) {

				$out = $file;

			}
		}
		
		echo json_encode($out);
		break;

}

?>
