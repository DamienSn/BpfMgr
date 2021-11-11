<?php
$json_cities = file_get_contents('data/ffct.json');
$json_cities = json_decode($json_cities);
echo "Succesfully get cities JSON\n";

$json_dpts = file_get_contents('data/dpts.json');
$json_dpts = json_decode($json_dpts);
echo "Successfully get communes JSON\n";

const HOST = 'http://sql11.freemysqlhosting.net:3306';
const DBNAME = 'sql11449977';
const USER = 'sql11449977';
const PWD = 'XUxFICS3QK';

$pdo = new PDO('mysql:host=sql11.freemysqlhosting.net:3306;dbname=sql11449977', 'sql11449977', 'XUxFICS3QK', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

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
            ":city_name" => $name,
            ":city_departement" => $code_dpt,
            ":city_province_id" => (int)$provinces[$departements[$code_dpt]],
            ":city_lat" => $lat,
            ":city_long" => $long,
            ":city_description" => $description,
            ":city_poi_id" => (int)$poi_id
        ]);

    } catch (Exception $ex) {
        echo $ex->getMessage();
    }

    // echo "Succesfully add city : " . $name . "\n";
}
