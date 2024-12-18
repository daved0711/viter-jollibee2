<?php



// Read active
function checkFilterActive($object)
{
    $query = $object->filterActive();
    checkQuery($query, "Empty records. ( filter active)");
    return $query;
}
// Read active
function checkFilterActiveSearch($object)
{
    $query = $object->filterActiveSearch();
    checkQuery($query, "Empty records. (filter active search)");
    return $query;
}
// Read active Advertisement
function checkReadAllActiveAdvertisement($object)
{
    $query = $object->readAllActiveAdvertisement();
    checkQuery($query, "Empty records. (read all active advertisement)");
    return $query;
}
