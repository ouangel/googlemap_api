<?php

include("includes/connect.php");

// table call ownerData
// the packaging container, you have to grab info from index.html ajax object data: the data you want to store

$query = "insert into ownerData (name, profile, carimg, description, time, phone, lat, lng) values (
'".$_POST["name"]."', 
'".$_POST["profile"]."', 
'".$_POST["carimg"]."',
'".$_POST["description"]."', 
'".$_POST["time"]."',
'".$_POST["phone"]."',
'".$_POST["lat"]."',
'".$_POST["lng"]."'); ";

var_dump($_POST);

$result = mysqli_query($con, $query);


?>