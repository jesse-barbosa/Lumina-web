<?php

include_once("conexao.php");

class ManipularDados {
    protected $username, $email, $password;

    public function loginUser($_email, $_password) {
        $conexao = new Conexao();
        $conn = $conexao->getConexao();
        $this->email = $_email;
        $this->password = $_password;
        $this->email = mysqli_real_escape_string($conn, $this->email);
        $this->password = mysqli_real_escape_string($conn, $this->password);
        
        $sql = "SELECT * FROM tbusers WHERE emailUser = '$this->email' AND passwordUser = '$this->password'";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function registerUser($_username, $_email, $_password) {
        $conexao = new Conexao();
        $conn = $conexao->getConexao();
        
        $this->username = $_username;
        $this->email = $_email;
        $this->password = $_password;

        $this->username = mysqli_real_escape_string($conn, $this->username);
        $this->email = mysqli_real_escape_string($conn, $this->email);
        $this->password = mysqli_real_escape_string($conn, $this->password);
        
    
        $sql = "INSERT INTO tbusers (nameUser, emailUser, passwordUser) VALUES ('$this->username', '$this->email', '$this->password')";
        
        if ($conn->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
    public function getUsernameByEmail($_email) {
        $conexao = new Conexao();
        $conn = $conexao->getConexao();
        
        $_email = mysqli_real_escape_string($conn, $_email);
        $sql = "SELECT nameUser FROM tbusers WHERE emailUser = '$_email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['nameUser'];
        } else {
            return null;
        }
    }
}
?>