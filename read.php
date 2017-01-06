<?php

include("includes/connect.php");

$query = "select * from ownerData";
$result = mysqli_query($con, $query);

// this fetch method is available since php 5.3.0 or up
// if ($result) {
	// $cors = mysqli_fetch_all($result, MYSQLI_ASSOC);
	// echo json_encode($cors);
// }

// this fetch mothed is for old version php (older than 5.3.0)
$rows = array();
while ($row = $result->fetch_assoc()) {
	$rows[] = $row;
}

echo json_encode($rows);

?>