<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$advertisement = new Advertisement($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$advertisement->advertisement_is_active = 1;
$advertisement->advertisement_image = checkIndex($data, "advertisement_image");
$advertisement->advertisement_title = checkIndex($data, "advertisement_title");
$advertisement->advertisement_created = date("Y-m-d H:i:s");
$advertisement->advertisement_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
// isNameExist($advertisement, $advertisement->advertisement_title);


$query = checkCreate($advertisement);

returnSuccess($advertisement, "advertisement", $query);
