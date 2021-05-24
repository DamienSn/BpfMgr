<?php
$json = file_get_contents('provinces.json');
$json = json_decode($json);

const HOST = 'http://localhost:3306';
const DBNAME = 'bpfmgr';
const USER = 'root';
const PWD = '';

$pdo = new PDO('mysql:host=localhost;dbname=bpfmgr', 'root', '');

foreach ($json as $val) {
    $name = $val->nom;
    $dpts = $val->dpts;
    $dpts = implode(",", $dpts);
    $query = $pdo->prepare("INSERT INTO provinces(name, dpts) VALUES(:name, :dpts)");
    $query->execute([
        'name' => $name,
        'dpts' => $dpts
    ]);
    var_dump($name);
}
