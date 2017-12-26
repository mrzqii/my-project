<?php
	$names = $_POST['Names'];
	$tel = $_POST['TEl'];
	$content = $_POST['Content'];
	
	$response=array(
		'type' => "yes"
	);

	echo json_encode($response);