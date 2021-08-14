<?php
$json_cities = file_get_contents('data/ffct.json');
$json_cities = json_decode($json_cities);
echo "Succesfully get cities JSON\n";

$json_dpts = file_get_contents('data/dpts.json');
$json_dpts = json_decode($json_dpts);
echo "Successfully get communes JSON\n";

const HOST = 'http://localhost:3306';
const DBNAME = 'bpfmgr';
const USER = 'root';
const PWD = '';

$pdo = new PDO('mysql:host=localhost;dbname=bpfmgr', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

$arr_provinces = $pdo->query('SELECT * FROM provinces');
$arr_provinces = $arr_provinces->fetchAll();
echo "Succesfully get provinces\n";

$provinces = [];
$departements = [];

foreach ($arr_provinces as $province) {
    $dpts = explode(",", $province["dpts"]);
    $array = [
        "id" => $province["id"],
        "dpts" => $dpts
    ];
    $provinces[$province["name"]] = $province["id"];

    foreach ($array["dpts"] as $dpt) {
        $departements[$dpt] = $province["name"];
    }
}

// var_dump($provinces);
// var_dump(count($departements));

foreach ($json_cities->features as $index => $feature) {
    $code_dpt = $feature->properties->Code_Dept;
    $name = trim($feature->properties->NOM);
    $description = $feature->properties->DESCRIPTION;
    $poi_id = $feature->properties->IDENTIFIANT_POI;
    $long = $feature->geometry->coordinates[0];
    $lat = $feature->geometry->coordinates[1];

    // var_dump($provinces[$departements[$code_dpt]]);

    try {

        $query = $pdo->prepare("INSERT INTO cities(name, departement, province, lat, `long`, description, poi_id) VALUES(:name, :departement, :province, :lat, :long, :description, :poi_id)");
        $query->execute([
            ":name" => $name,
            ":departement" => $code_dpt,
            ":province" => (int)$provinces[$departements[$code_dpt]],
            ":lat" => $lat,
            ":long" => $long,
            ":description" => $description,
            ":poi_id" => (int)$poi_id
        ]);

    } catch (Exception $ex) {
        echo $ex->getMessage();
    }

    // echo "Succesfully add city : " . $name . "\n";
}
