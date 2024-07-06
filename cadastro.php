<?php
include_once("class/conexao.php");
include_once("class/manipularDados.php");

$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_username = $_POST["username"];
    $_email = $_POST["email"];
    $_password = $_POST["password"];

    $manipularDados = new ManipularDados();

    if ($manipularDados->registerUser($_username, $_email, $_password)) {
        header("Location: login.php");
        exit;
    } else {
        $error_message = "Erro ao cadastrar usuário. Tente novamente.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Notten</title>
    <link rel="stylesheet" href="css/styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body class="dark-mode">
    <section class="pagina-box-geral">
        <img src="img/imgForm.png" alt="">
        <div class="pagina-geral">
                <h1>Crie uma conta no Notten</h1>
                <form action="cadastro.php" method="post" class="text-center">
                <input type="text" name="nome" placeholder="Seu nome completo" class="input-geral mb-2 text-center">
                <input type="email" name="email" placeholder="Seu melhor E-mail" class="input-geral mb-2 text-center">
                <input type="password" name="password" placeholder="Sua senha" class="input-geral mb-2 text-center">
                <button type="submit" class="submit-geral">Entrar</button>
                <?php if(isset($error_message)) { ?>
                    <p class="error"><?php echo $error_message; } ?></p>
                <a href="login.php" class="link link-underline link-underline-opacity-0">Já tenho uma conta</a>
            </form>
        </div>
    </section>   
</body>
</html>
