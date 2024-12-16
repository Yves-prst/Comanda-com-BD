<?php
$servername = "localhost";
$username = "root";
$password = "yves1206";
$dbname = "comandas";
date_default_timezone_set('America/Sao_Paulo');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>