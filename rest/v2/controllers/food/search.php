<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/food/Food.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$food = new Food($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);

    $food->food_search = $data['searchValue'];


    http_response_code(200);
    if ($data['isFilter']) {

        $food->food_is_active = checkIndex($data, 'statusFilter');
        if ($food->food_search != '') {
            $query = checkFilterActiveSearch($food);
            getQueriedData($query);
        }
        $query = checkFilterActive($food);
        getQueriedData($query);
    }

    $query = checkSearch($food);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
