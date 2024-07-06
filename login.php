<?php
session_start();

include_once("class/conexao.php");
include_once("class/manipularDados.php");

$error_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    @$_email = $_POST["email"];
    @$_password = $_POST["password"];

    $manipularDados = new ManipularDados();

    if ($manipularDados->loginUser($_email, $_password)) {
        $_SESSION["email"] = $_email;
        $_SESSION["password"] = $_password;
        
        $username = $manipularDados->getUsernameByEmail($_email);
        $_SESSION["username"] = $username;
    
        $_SESSION["loggedin"] = true;
        header("Location: index.php");
        exit;
    }
     else {
        $error_message = "<div class='text-danger'>Usuário ou senha incorretos.</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Notten</title>
    <link rel="stylesheet" href="css/styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body class="dark-mode">
    <header>
        <div id="header">Notten</div>
    </header>

    <section class="pagina-box-geral">
        <img src="img/imgForm.png" alt="">
        <div class="pagina-geral">
            <h1>Faça Login ao Notten</h1>
            <form action="login.php" method="post" class="text-center">
                <input type="email" name="email" placeholder="Seu E-mail" class="input-geral mb-2 text-center" required>
                <input type="password" name="password" placeholder="Sua Senha" class="input-geral mb-2 text-center" required>
                <button type="submit" id="loginButton" class="submit-geral">Entrar</button>
                <?php if(isset($error_message)) { ?>
                    <p class="error"><?php echo $error_message; }
                ?></p>
                <a href="cadastro.php" class="link link-underline link-underline-opacity-0">Não tenho uma conta</a>
            </form>
        </div>
    </section>
</body>
</html>
