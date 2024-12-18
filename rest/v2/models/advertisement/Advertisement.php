<?php

class Advertisement
{
  public $advertisement_aid;
  public $advertisement_is_active;
  public $advertisement_image;
  public $advertisement_title;
  public $advertisement_datetime;
  public $advertisement_created;

  public $connection;
  public $lastInsertedId;
  public $advertisement_start;
  public $advertisement_total;
  public $advertisement_search;

  public $tblAdvertisement;

  public function __construct($db)
  {
    $this->connection = $db;
    $this->tblAdvertisement = "jollibee_advertisement";
  }

  public function readAll()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "order by advertisement_is_active desc, ";
      $sql .= "advertisement_title ";
      $query = $this->connection->query($sql);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function readLimit()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "order by advertisement_is_active desc, ";
      $sql .= "advertisement_title ";
      $sql .= "limit :start, ";
      $sql .= ":total ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "start" => $this->advertisement_start - 1,
        "total" => $this->advertisement_total,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function search()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_title like :advertisement_title ";
      $sql .= "order by advertisement_is_active desc, ";
      $sql .= "advertisement_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_title" => "%{$this->advertisement_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function filterActive()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_is_active = :advertisement_is_active ";
      $sql .= "order by advertisement_is_active desc, ";
      $sql .= "advertisement_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_is_active" => $this->advertisement_is_active,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function filterActiveSearch()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_is_active = :advertisement_is_active ";
      $sql .= "and advertisement_title like :advertisement_title ";
      $sql .= "order by advertisement_is_active desc, ";
      $sql .= "advertisement_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_is_active" => $this->advertisement_is_active,
        "advertisement_title" => "%{$this->advertisement_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function readById()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_aid = :advertisement_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_aid" => $this->advertisement_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function readAllActiveAdvertisement()
  {
    try {
      $sql = "select * from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_is_active = 1 ";
      $sql .= "order by ";
      $sql .= "advertisement_created ";
      $query = $this->connection->query($sql);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }


  public function create()
  {
    try {
      $sql = "insert into {$this->tblAdvertisement} ";
      $sql .= "(advertisement_is_active, ";
      $sql .= "advertisement_image, ";
      $sql .= "advertisement_title, ";
      $sql .= "advertisement_created, ";
      $sql .= "advertisement_datetime ) values ( ";
      $sql .= ":advertisement_is_active, ";
      $sql .= ":advertisement_image, ";
      $sql .= ":advertisement_title, ";
      $sql .= ":advertisement_created, ";
      $sql .= ":advertisement_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_is_active" => $this->advertisement_is_active,
        "advertisement_image" => $this->advertisement_image,
        "advertisement_title" => $this->advertisement_title,
        "advertisement_created" => $this->advertisement_created,
        "advertisement_datetime" => $this->advertisement_datetime,

      ]);
      $this->lastInsertedId = $this->connection->lastInsertId();
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function checkName()
  {
    try {
      $sql = "select advertisement_title from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_title = :advertisement_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_title" => "{$this->advertisement_title}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function update()
  {
    try {
      $sql = "update {$this->tblAdvertisement} set ";
      $sql .= "advertisement_image = :advertisement_image, ";
      $sql .= "advertisement_title = :advertisement_title, ";
      $sql .= "advertisement_datetime = :advertisement_datetime ";
      $sql .= "where advertisement_aid  = :advertisement_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_image" => $this->advertisement_image,
        "advertisement_title" => $this->advertisement_title,
        "advertisement_datetime" => $this->advertisement_datetime,
        "advertisement_aid" => $this->advertisement_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblAdvertisement} ";
      $sql .= "where advertisement_aid = :advertisement_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_aid" => $this->advertisement_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
  {
    try {
      $sql = "update {$this->tblAdvertisement} set ";
      $sql .= "advertisement_is_active = :advertisement_is_active, ";
      $sql .= "advertisement_datetime = :advertisement_datetime ";
      $sql .= "where advertisement_aid  = :advertisement_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "advertisement_is_active" => $this->advertisement_is_active,
        "advertisement_datetime" => $this->advertisement_datetime,
        "advertisement_aid" => $this->advertisement_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}
