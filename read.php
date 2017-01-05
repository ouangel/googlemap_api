<?php

include("includes/connect.php");

// http://www.techotopia.com/index.php/MySQL_Wildcard_Filtering_using_LIKE

// if you dont use % the input value has to be exactly the same as your description
// if you have % in the beginning, it doesnt matter what word in the beginning
// if you have % in the beginning and the end, you can have anything in the beginning and end
// for example, %red% user has to have red in the between of some words
// $query = "select * from car WHERE description LIKE '%red%'";
$query = "select * from ownerData";
$result = mysqli_query($con, $query);

if ($result) {
	// echo "works";
	// echo "<br>";
	// fetch the first row. the more you call the more fetch
	// this mysqli_assoc gives you id, lat, lng in console from your index.html
	$cors = mysqli_fetch_all($result, MYSQLI_ASSOC);
	// var_dump($cors);
	// this change so javascript can read/recognize it
	echo json_encode($cors);
}

?>