<?php

$host = 'localhost';
$dbname = 'comandas';
$username = 'root';
$password = 'yves1206';
date_default_timezone_set('America/Sao_Paulo');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro de conexão: " . $e->getMessage();
    exit();
}


$data = json_decode(file_get_contents('php://input'), true);

if (is_array($data)) {

    $stmt = $pdo->query("SELECT MAX(numero) FROM comandas");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $numeroComanda = $result['MAX(numero)'] + 1; 
    
    foreach ($data as $comanda) {

        $stmt = $pdo->prepare("INSERT INTO comandas (numero, data) VALUES (?, ?)");
        $stmt->execute([$numeroComanda, date('Y-m-d H:i:s')]); 
        $comandaId = $pdo->lastInsertId();

        foreach ($comanda['items'] as $item) {
            $produto = $item;  
            $quantidade = 1; 
            $preco = floatval(str_replace(['R$', ','], ['', '.'], $comanda['total'])); 

            $stmt_produto = $pdo->prepare("INSERT INTO comanda_produtos (comanda_id, produto, quantidade) VALUES (?, ?, ?)");
            $stmt_produto->execute([$comandaId, $produto, $quantidade]);
        }

        $numeroComanda++;
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
}
?>