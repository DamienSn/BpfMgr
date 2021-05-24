<?php
$json = file_get_contents('dpts.json');
$json = json_decode($json);

const HOST = 'http://localhost:3306';
const DBNAME = 'bpfmgr';
const USER = 'root';
const PWD = '';

$pdo = new PDO('mysql:host=localhost;dbname=bpfmgr', 'root', '');

foreach ($json as $val) {
    $id = $val->code;
    $name = $val->nom;
    $query = $pdo->prepare("INSERT INTO departements(id, name) VALUES(:id, :name)");
    $query->execute([
        'id' => $id,
        'name' => $name
    ]);
    // $res = $query->fetchAll();
}
