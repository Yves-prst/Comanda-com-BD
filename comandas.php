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

$data_especifica = isset($_GET['data']) ? $_GET['data'] : null;

$comandas = [];

if ($data_especifica) {

    $stmt = $pdo->prepare("
        SELECT c.id AS comanda_id, c.numero, c.data, p.produto, p.quantidade
        FROM comandas c
        JOIN comanda_produtos p ON c.id = p.comanda_id
        WHERE DATE(c.data) = :data_especifica
    ");
    $stmt->execute(['data_especifica' => $data_especifica]);
    $comandas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($comandas)) {
        $mensagem = "Não há comandas registradas para essa data.";
    }
} else {

    $mensagem = "Por favor, selecione uma data para visualizar as comandas.";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        a{
            list-style-type: none;
            text-decoration: none;
            color: black;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comandas e Produtos</title>
</head>
<body>

    <div style="margin: 10px;">
        <a href="javascript:history.go(-1)">Voltar</a>
    </div>
    <h1>Comandas</h1>

    <form action="comandas.php" method="get">
        <label for="data">Escolha a data: </label>
        <input type="date" name="data" id="data" required>
        <button type="submit">Filtrar</button>
    </form>
    <br>
    <?php if ($data_especifica): ?>
        <?php if (!empty($comandas)): ?>

            <div>
                <?php 

                $comandasAgrupadas = [];
                foreach ($comandas as $comanda) {
                    $comandasAgrupadas[$comanda['comanda_id']][] = $comanda;
                }

                foreach ($comandasAgrupadas as $comandaId => $produtos): ?>
                    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
                        <h3>Comanda Nº: <?php echo $produtos[0]['numero']; ?> (ID: <?php echo $comandaId; ?>)</h3>
                        <p>Data: <?php echo $produtos[0]['data']; ?></p>
                        <h4>Produtos:</h4>
                        <ul>
                            <?php foreach ($produtos as $produto): ?>
                                <li><strong>Produto:</strong> <?php echo $produto['produto']; ?>, 
                                    <strong>Quantidade:</strong> <?php echo $produto['quantidade']; ?>, 
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p><?php echo $mensagem; ?></p>
        <?php endif; ?>
    <?php else: ?>
        <p><?php echo $mensagem; ?></p>
    <?php endif; ?>
</body>
</html>