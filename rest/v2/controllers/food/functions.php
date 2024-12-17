<?php


// Read all
function checkReadAllByCategoryId($object)
{
    $query = $object->readAllByCategoryId();
    checkQuery($query, "Empty records. (read All by category)");
    return $query;
}