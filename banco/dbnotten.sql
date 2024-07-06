-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/07/2024 às 21:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbnotten`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbelements`
--

CREATE TABLE `tbelements` (
  `codElement` int(11) NOT NULL,
  `workspaceElementCod` int(11) DEFAULT NULL,
  `tipo` varchar(20) DEFAULT NULL,
  `conteudo` text DEFAULT NULL,
  `posicao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`posicao`)),
  `tamanho` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tamanho`)),
  `cor_fundo` char(7) DEFAULT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `data_atualizacao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusers`
--

CREATE TABLE `tbusers` (
  `codUser` int(11) NOT NULL,
  `nameUser` char(50) DEFAULT NULL,
  `emailUser` char(75) DEFAULT NULL,
  `passWordUser` char(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tbusers`
--

INSERT INTO `tbusers` (`codUser`, `nameUser`, `emailUser`, `passWordUser`) VALUES
(2, 'Jessé', 'barbosajesse419@gmail.com', '1234'),
(3, 'Fábio', 'netofb@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbworkspaces`
--

CREATE TABLE `tbworkspaces` (
  `codWorkspace` int(11) NOT NULL,
  `nomeWorkspace` char(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbelements`
--
ALTER TABLE `tbelements`
  ADD PRIMARY KEY (`codElement`),
  ADD KEY `workspaceElementCod` (`workspaceElementCod`);

--
-- Índices de tabela `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`codUser`);

--
-- Índices de tabela `tbworkspaces`
--
ALTER TABLE `tbworkspaces`
  ADD PRIMARY KEY (`codWorkspace`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbelements`
--
ALTER TABLE `tbelements`
  MODIFY `codElement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `codUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tbworkspaces`
--
ALTER TABLE `tbworkspaces`
  MODIFY `codWorkspace` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbelements`
--
ALTER TABLE `tbelements`
  ADD CONSTRAINT `tbelements_ibfk_1` FOREIGN KEY (`workspaceElementCod`) REFERENCES `tbworkspaces` (`codWorkspace`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
