<?php

include("includes/connect.php");

// table call ownerData

$query = "insert into ownerData (name, profile, carimg, description, time, phone, lat, lng) values (
'".$_POST["name"]."', 
'".$_POST["profile"]."', 
'".$_POST["carimg"]."',
'".$_POST["description"]."', 
'".$_POST["time"]."',
'".$_POST["phone"]."',
'".$_POST["lat"]."',
'".$_POST["lng"]."'); ";

$result = mysqli_query($con, $query);


?>