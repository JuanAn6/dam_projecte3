-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2025 a las 17:51:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `risk`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta`
--

CREATE TABLE `carta` (
  `id` bigint(20) NOT NULL,
  `tipus` bigint(20) NOT NULL,
  `pais_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `continent`
--

CREATE TABLE `continent` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `reforc_tropes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `continent`
--

INSERT INTO `continent` (`id`, `nom`, `reforc_tropes`) VALUES
(1, 'América del Norte', 3),
(2, 'América del Sur', 2),
(3, 'Europa', 5),
(4, 'África', 3),
(5, 'Asia', 7),
(6, 'Australia', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estats`
--

CREATE TABLE `estats` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estats`
--

INSERT INTO `estats` (`id`, `nom`) VALUES
(1, 'Wait'),
(2, 'Col·locar inicial'),
(3, 'Reforc x pais'),
(4, 'Reforc x tropes'),
(5, 'Combat'),
(6, 'Recol·locacio'),
(7, 'Final');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frontera`
--

CREATE TABLE `frontera` (
  `pais1_id` bigint(20) NOT NULL,
  `pais2_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `frontera`
--

INSERT INTO `frontera` (`pais1_id`, `pais2_id`) VALUES
(1, 2),
(1, 3),
(1, 30),
(2, 3),
(2, 4),
(2, 9),
(3, 4),
(3, 6),
(4, 5),
(4, 6),
(4, 7),
(5, 7),
(5, 9),
(6, 7),
(6, 8),
(7, 8),
(8, 10),
(9, 2),
(9, 4),
(9, 5),
(9, 14),
(10, 11),
(10, 12),
(11, 12),
(11, 13),
(12, 13),
(14, 15),
(14, 16),
(15, 16),
(15, 17),
(15, 18),
(16, 17),
(16, 20),
(17, 18),
(17, 19),
(17, 20),
(18, 19),
(19, 20),
(19, 22),
(19, 36),
(20, 27),
(20, 34),
(21, 12),
(21, 18),
(21, 22),
(21, 23),
(21, 24),
(22, 23),
(22, 36),
(23, 24),
(23, 25),
(23, 26),
(24, 25),
(25, 26),
(27, 28),
(27, 31),
(27, 34),
(28, 29),
(28, 31),
(29, 30),
(30, 31),
(30, 32),
(30, 33),
(31, 32),
(32, 33),
(32, 35),
(34, 35),
(34, 36),
(34, 37),
(35, 37),
(35, 38),
(36, 37),
(37, 38),
(38, 39),
(39, 40),
(39, 41),
(40, 42),
(41, 42);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugador`
--

CREATE TABLE `jugador` (
  `id` bigint(20) NOT NULL,
  `skfUser_id` bigint(20) NOT NULL,
  `skfPartida_id` bigint(20) NOT NULL,
  `skfNumero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ma`
--

CREATE TABLE `ma` (
  `carta_id` bigint(20) NOT NULL,
  `jugador_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `okupa`
--

CREATE TABLE `okupa` (
  `pais_id` bigint(20) NOT NULL,
  `player_id` bigint(20) NOT NULL,
  `tropes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `abr` varchar(10) DEFAULT NULL,
  `continent_id` bigint(20) NOT NULL,
  `imatge` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `nom`, `abr`, `continent_id`, `imatge`) VALUES
(1, 'Alaska', 'AK', 1, 'placeholder.png'),
(2, 'Northwest Territory', 'NW', 1, 'placeholder.png'),
(3, 'Alberta', 'AL', 1, 'placeholder.png'),
(4, 'Ontario', 'ON', 1, 'placeholder.png'),
(5, 'Quebec', 'QC', 1, 'placeholder.png'),
(6, 'Western United States', 'UW', 1, 'placeholder.png'),
(7, 'Eastern United States', 'UE', 1, 'placeholder.png'),
(8, 'Central America', 'CA', 1, 'placeholder.png'),
(9, 'Greenland', 'GL', 1, 'placeholder.png'),
(10, 'Venezuela', 'VE', 2, 'placeholder.png'),
(11, 'Peru', 'PE', 2, 'placeholder.png'),
(12, 'Brazil', 'BR', 2, 'placeholder.png'),
(13, 'Argentina', 'AR', 2, 'placeholder.png'),
(14, 'Iceland', 'IS', 3, 'placeholder.png'),
(15, 'Great Britain', 'GB', 3, 'placeholder.png'),
(16, 'Scandinavia', 'SC', 3, 'placeholder.png'),
(17, 'Northern Europe', 'NE', 3, 'placeholder.png'),
(18, 'Western Europe', 'WE', 3, 'placeholder.png'),
(19, 'Southern Europe', 'SE', 3, 'placeholder.png'),
(20, 'Ukraine', 'UA', 3, 'placeholder.png'),
(21, 'North Africa', 'NF', 4, 'placeholder.png'),
(22, 'Egypt', 'EG', 4, 'placeholder.png'),
(23, 'East Africa', 'EF', 4, 'placeholder.png'),
(24, 'Congo', 'CG', 4, 'placeholder.png'),
(25, 'South Africa', 'SF', 4, 'placeholder.png'),
(26, 'Madagascar', 'MG', 4, 'placeholder.png'),
(27, 'Ural', 'UR', 5, 'placeholder.png'),
(28, 'Siberia', 'SB', 5, 'placeholder.png'),
(29, 'Yakutsk', 'YK', 5, 'placeholder.png'),
(30, 'Kamchatka', 'KM', 5, 'placeholder.png'),
(31, 'Irkutsk', 'IK', 5, 'placeholder.png'),
(32, 'Mongolia', 'MN', 5, 'placeholder.png'),
(33, 'Japan', 'JP', 5, 'placeholder.png'),
(34, 'Afghanistan', 'AG', 5, 'placeholder.png'),
(35, 'China', 'CN', 5, 'placeholder.png'),
(36, 'Middle East', 'ME', 5, 'placeholder.png'),
(37, 'India', 'IN', 5, 'placeholder.png'),
(38, 'Sian', 'SN', 5, 'placeholder.png'),
(39, 'Indonesia', 'ID', 6, 'placeholder.png'),
(40, 'New Guinea', 'NG', 6, 'placeholder.png'),
(41, 'Western Australia', 'WA', 6, 'placeholder.png'),
(42, 'Eastern Australia', 'EA', 6, 'placeholder.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partida`
--

CREATE TABLE `partida` (
  `id` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  `nom` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `max_players` int(11) NOT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `torn_player_id` bigint(20) DEFAULT NULL,
  `estat_torn` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

CREATE TABLE `session` (
  `id` bigint(20) NOT NULL,
  `usuari_id` bigint(20) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipuscarta`
--

CREATE TABLE `tipuscarta` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipuscarta`
--

INSERT INTO `tipuscarta` (`id`, `nom`) VALUES
(1, 'Comodí'),
(2, 'Infanteria'),
(3, 'Cavalleria'),
(4, 'Artilleria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuaris`
--

CREATE TABLE `usuaris` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `wins` int(11) NOT NULL,
  `games` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuaris`
--

INSERT INTO `usuaris` (`id`, `nom`, `login`, `password`, `avatar`, `wins`, `games`) VALUES
(1, 'Joan', 'joan', 'joan', '', 0, 0),
(2, 'Cristian', 'cristian', 'cristian', '', 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipus` (`tipus`),
  ADD KEY `pais_id` (`pais_id`);

--
-- Indices de la tabla `continent`
--
ALTER TABLE `continent`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estats`
--
ALTER TABLE `estats`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `frontera`
--
ALTER TABLE `frontera`
  ADD PRIMARY KEY (`pais1_id`,`pais2_id`),
  ADD KEY `pais2_id` (`pais2_id`);

--
-- Indices de la tabla `jugador`
--
ALTER TABLE `jugador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skfUser_id` (`skfUser_id`,`skfPartida_id`),
  ADD UNIQUE KEY `skfPartida_id` (`skfPartida_id`,`skfNumero`);

--
-- Indices de la tabla `ma`
--
ALTER TABLE `ma`
  ADD PRIMARY KEY (`carta_id`,`jugador_id`),
  ADD KEY `jugador_id` (`jugador_id`);

--
-- Indices de la tabla `okupa`
--
ALTER TABLE `okupa`
  ADD PRIMARY KEY (`pais_id`,`player_id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `continent_id` (`continent_id`);

--
-- Indices de la tabla `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estat_torn` (`estat_torn`),
  ADD KEY `fk_admin` (`admin_id`),
  ADD KEY `fk_torn` (`torn_player_id`);

--
-- Indices de la tabla `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuari_id` (`usuari_id`);

--
-- Indices de la tabla `tipuscarta`
--
ALTER TABLE `tipuscarta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuaris`
--
ALTER TABLE `usuaris`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `session`
--
ALTER TABLE `session`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `carta`
--
ALTER TABLE `carta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `continent`
--
ALTER TABLE `continent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

  --
-- AUTO_INCREMENT de la tabla `estats`
--
ALTER TABLE `estats`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

  --
-- AUTO_INCREMENT de la tabla `jugador`
--
ALTER TABLE `jugador`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

  --
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

  --
-- AUTO_INCREMENT de la tabla `tipuscarta`
--
ALTER TABLE `tipuscarta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
-- AUTO_INCREMENT de la tabla `partida`
--
ALTER TABLE `partida`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

  --
-- AUTO_INCREMENT de la tabla `usuaris`
--
ALTER TABLE `usuaris`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carta`
--
ALTER TABLE `carta`
  ADD CONSTRAINT `carta_ibfk_1` FOREIGN KEY (`tipus`) REFERENCES `tipuscarta` (`id`),
  ADD CONSTRAINT `carta_ibfk_2` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`);

--
-- Filtros para la tabla `frontera`
--
ALTER TABLE `frontera`
  ADD CONSTRAINT `frontera_ibfk_1` FOREIGN KEY (`pais1_id`) REFERENCES `pais` (`id`),
  ADD CONSTRAINT `frontera_ibfk_2` FOREIGN KEY (`pais2_id`) REFERENCES `pais` (`id`);

--
-- Filtros para la tabla `jugador`
--
ALTER TABLE `jugador`
  ADD CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`skfUser_id`) REFERENCES `usuaris` (`id`),
  ADD CONSTRAINT `jugador_ibfk_2` FOREIGN KEY (`skfPartida_id`) REFERENCES `partida` (`id`);

--
-- Filtros para la tabla `ma`
--
ALTER TABLE `ma`
  ADD CONSTRAINT `ma_ibfk_1` FOREIGN KEY (`carta_id`) REFERENCES `carta` (`id`),
  ADD CONSTRAINT `ma_ibfk_2` FOREIGN KEY (`jugador_id`) REFERENCES `jugador` (`id`);

--
-- Filtros para la tabla `okupa`
--
ALTER TABLE `okupa`
  ADD CONSTRAINT `okupa_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`),
  ADD CONSTRAINT `okupa_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `jugador` (`id`);

--
-- Filtros para la tabla `pais`
--
ALTER TABLE `pais`
  ADD CONSTRAINT `pais_ibfk_1` FOREIGN KEY (`continent_id`) REFERENCES `continent` (`id`);

--
-- Filtros para la tabla `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `fk_admin` FOREIGN KEY (`admin_id`) REFERENCES `usuaris` (`id`),
  ADD CONSTRAINT `fk_torn` FOREIGN KEY (`torn_player_id`) REFERENCES `usuaris` (`id`),
  ADD CONSTRAINT `partida_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `usuaris` (`id`),
  ADD CONSTRAINT `partida_ibfk_2` FOREIGN KEY (`torn_player_id`) REFERENCES `usuaris` (`id`),
  ADD CONSTRAINT `partida_ibfk_3` FOREIGN KEY (`estat_torn`) REFERENCES `estats` (`id`);

--
-- Filtros para la tabla `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
