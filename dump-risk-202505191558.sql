-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: risk
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipus` bigint(20) NOT NULL,
  `pais_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipus` (`tipus`),
  KEY `pais_id` (`pais_id`),
  CONSTRAINT `carta_ibfk_1` FOREIGN KEY (`tipus`) REFERENCES `tipuscarta` (`id`),
  CONSTRAINT `carta_ibfk_2` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

LOCK TABLES `carta` WRITE;
/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
/*!40000 ALTER TABLE `carta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `continent`
--

DROP TABLE IF EXISTS `continent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `continent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `reforc_tropes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `continent`
--

LOCK TABLES `continent` WRITE;
/*!40000 ALTER TABLE `continent` DISABLE KEYS */;
INSERT INTO `continent` VALUES (1,'América del Norte',3),(2,'América del Sur',2),(3,'Europa',5),(4,'África',3),(5,'Asia',7),(6,'Australia',2);
/*!40000 ALTER TABLE `continent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estats`
--

DROP TABLE IF EXISTS `estats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estats`
--

LOCK TABLES `estats` WRITE;
/*!40000 ALTER TABLE `estats` DISABLE KEYS */;
INSERT INTO `estats` VALUES (1,'Wait'),(2,'Col·locar inicial'),(3,'Reforc x pais'),(4,'Combat'),(5,'Recol·locacio'),(6,'Final');
/*!40000 ALTER TABLE `estats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frontera`
--

DROP TABLE IF EXISTS `frontera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frontera` (
  `pais1_id` bigint(20) NOT NULL,
  `pais2_id` bigint(20) NOT NULL,
  PRIMARY KEY (`pais1_id`,`pais2_id`),
  KEY `pais2_id` (`pais2_id`),
  CONSTRAINT `frontera_ibfk_1` FOREIGN KEY (`pais1_id`) REFERENCES `pais` (`id`),
  CONSTRAINT `frontera_ibfk_2` FOREIGN KEY (`pais2_id`) REFERENCES `pais` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frontera`
--

LOCK TABLES `frontera` WRITE;
/*!40000 ALTER TABLE `frontera` DISABLE KEYS */;
INSERT INTO `frontera` VALUES (1,2),(1,3),(1,30),(2,3),(2,4),(2,9),(3,4),(3,6),(4,5),(4,6),(4,7),(5,7),(5,9),(6,7),(6,8),(7,8),(8,10),(9,2),(9,4),(9,5),(9,14),(10,11),(10,12),(11,12),(11,13),(12,13),(14,15),(14,16),(15,16),(15,17),(15,18),(16,17),(16,20),(17,18),(17,19),(17,20),(18,19),(19,20),(19,22),(19,36),(20,27),(20,34),(21,12),(21,18),(21,22),(21,23),(21,24),(22,23),(22,36),(23,24),(23,25),(23,26),(24,25),(25,26),(27,28),(27,31),(27,34),(28,29),(28,31),(29,30),(30,31),(30,32),(30,33),(31,32),(32,33),(32,35),(34,35),(34,36),(34,37),(35,37),(35,38),(36,37),(37,38),(38,39),(39,40),(39,41),(40,42),(41,42);
/*!40000 ALTER TABLE `frontera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugador`
--

DROP TABLE IF EXISTS `jugador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugador` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `skfUser_id` bigint(20) NOT NULL,
  `skfPartida_id` bigint(20) NOT NULL,
  `skfNumero` int(11) NOT NULL,
  `active` int(11) DEFAULT 1,
  `tropes` int(6) DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`skfUser_id`) REFERENCES `usuaris` (`id`),
  CONSTRAINT `jugador_ibfk_2` FOREIGN KEY (`skfPartida_id`) REFERENCES `partida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` VALUES (172,2,4,1,1,35),(247,2,6,1,1,35),(248,3,6,2,1,35),(249,2,7,1,1,0),(251,2,8,1,1,35),(252,3,8,2,1,35),(265,3,9,1,1,0),(266,2,9,2,1,0);
/*!40000 ALTER TABLE `jugador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ma`
--

DROP TABLE IF EXISTS `ma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ma` (
  `carta_id` bigint(20) NOT NULL,
  `jugador_id` bigint(20) NOT NULL,
  PRIMARY KEY (`carta_id`,`jugador_id`),
  KEY `jugador_id` (`jugador_id`),
  CONSTRAINT `ma_ibfk_1` FOREIGN KEY (`carta_id`) REFERENCES `carta` (`id`),
  CONSTRAINT `ma_ibfk_2` FOREIGN KEY (`jugador_id`) REFERENCES `jugador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ma`
--

LOCK TABLES `ma` WRITE;
/*!40000 ALTER TABLE `ma` DISABLE KEYS */;
/*!40000 ALTER TABLE `ma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `okupa`
--

DROP TABLE IF EXISTS `okupa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `okupa` (
  `pais_id` bigint(20) NOT NULL,
  `player_id` bigint(20) NOT NULL,
  `tropes` int(11) NOT NULL,
  PRIMARY KEY (`pais_id`,`player_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `okupa_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`),
  CONSTRAINT `okupa_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `jugador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `okupa`
--

LOCK TABLES `okupa` WRITE;
/*!40000 ALTER TABLE `okupa` DISABLE KEYS */;
INSERT INTO `okupa` VALUES (1,266,1),(2,247,1),(2,266,1),(3,172,1),(3,247,1),(3,266,1),(4,266,1),(5,266,1),(6,266,1),(7,266,1),(8,266,1),(9,247,1),(9,266,15),(10,266,1),(11,266,1),(12,266,1),(13,266,1),(14,265,1),(15,266,1),(16,265,1),(17,265,1),(18,266,1),(19,247,1),(19,265,1),(20,265,15),(21,266,1),(22,266,1),(23,266,1),(24,266,1),(25,266,1),(26,266,1),(27,265,1),(28,265,1),(29,265,1),(30,265,1),(31,265,1),(32,265,1),(33,247,1),(33,248,1),(33,265,1),(34,265,1),(35,265,1),(36,265,1),(37,265,1),(38,265,1),(39,265,1),(40,265,1),(41,265,1),(42,265,1);
/*!40000 ALTER TABLE `okupa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `abr` varchar(10) DEFAULT NULL,
  `continent_id` bigint(20) NOT NULL,
  `imatge` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `continent_id` (`continent_id`),
  CONSTRAINT `pais_ibfk_1` FOREIGN KEY (`continent_id`) REFERENCES `continent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Alaska','AK',1,'placeholder.png'),(2,'Northwest Territory','NW',1,'placeholder.png'),(3,'Alberta','AL',1,'placeholder.png'),(4,'Ontario','ON',1,'placeholder.png'),(5,'Quebec','QC',1,'placeholder.png'),(6,'Western United States','UW',1,'placeholder.png'),(7,'Eastern United States','UE',1,'placeholder.png'),(8,'Central America','CA',1,'placeholder.png'),(9,'Greenland','GL',1,'placeholder.png'),(10,'Venezuela','VE',2,'placeholder.png'),(11,'Peru','PE',2,'placeholder.png'),(12,'Brazil','BR',2,'placeholder.png'),(13,'Argentina','AR',2,'placeholder.png'),(14,'Iceland','IS',3,'placeholder.png'),(15,'Great Britain','GB',3,'placeholder.png'),(16,'Scandinavia','SC',3,'placeholder.png'),(17,'Northern Europe','NE',3,'placeholder.png'),(18,'Western Europe','WE',3,'placeholder.png'),(19,'Southern Europe','SE',3,'placeholder.png'),(20,'Ukraine','UA',3,'placeholder.png'),(21,'North Africa','NF',4,'placeholder.png'),(22,'Egypt','EG',4,'placeholder.png'),(23,'East Africa','EF',4,'placeholder.png'),(24,'Congo','CG',4,'placeholder.png'),(25,'South Africa','SF',4,'placeholder.png'),(26,'Madagascar','MG',4,'placeholder.png'),(27,'Ural','UR',5,'placeholder.png'),(28,'Siberia','SB',5,'placeholder.png'),(29,'Yakutsk','YK',5,'placeholder.png'),(30,'Kamchatka','KM',5,'placeholder.png'),(31,'Irkutsk','IK',5,'placeholder.png'),(32,'Mongolia','MN',5,'placeholder.png'),(33,'Japan','JP',5,'placeholder.png'),(34,'Afghanistan','AG',5,'placeholder.png'),(35,'China','CN',5,'placeholder.png'),(36,'Middle East','ME',5,'placeholder.png'),(37,'India','IN',5,'placeholder.png'),(38,'Sian','SN',5,'placeholder.png'),(39,'Indonesia','ID',6,'placeholder.png'),(40,'New Guinea','NG',6,'placeholder.png'),(41,'Western Australia','WA',6,'placeholder.png'),(42,'Eastern Australia','EA',6,'placeholder.png');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `nom` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `max_players` int(11) NOT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `torn_player_id` bigint(20) DEFAULT NULL,
  `estat_torn` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `estat_torn` (`estat_torn`),
  KEY `fk_admin` (`admin_id`),
  KEY `fk_torn` (`torn_player_id`),
  CONSTRAINT `fk_admin` FOREIGN KEY (`admin_id`) REFERENCES `usuaris` (`id`),
  CONSTRAINT `fk_torn` FOREIGN KEY (`torn_player_id`) REFERENCES `usuaris` (`id`),
  CONSTRAINT `partida_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `usuaris` (`id`),
  CONSTRAINT `partida_ibfk_2` FOREIGN KEY (`torn_player_id`) REFERENCES `usuaris` (`id`),
  CONSTRAINT `partida_ibfk_3` FOREIGN KEY (`estat_torn`) REFERENCES `estats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (4,'2025-05-06 19:34:59','Maldonado','Maldonado1746552899151',4,2,NULL,2),(5,'2025-05-12 17:56:54','Juan Sala','Juan_Sala1747065414458',3,2,2,2),(6,'2025-05-14 18:54:59','Maldonado','Maldonado1747241699139',3,2,2,2),(7,'2025-05-19 15:25:32','Maldonado','Maldonado1747661132765',3,2,2,2),(8,'2025-05-19 15:30:44','Maldonado','Maldonado1747661444857',2,2,2,2),(9,'2025-05-19 15:32:09','Maldonado','Maldonado1747661529044',2,2,3,2);
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuari_id` bigint(20) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp NULL DEFAULT NULL,
  `uid` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuari_id` (`usuari_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`usuari_id`) REFERENCES `usuaris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (95,1,'joan1747242779494','0000-00-00 00:00:00','c7a510f9-a029-4b88-9508-ca52842430af'),(97,3,'juan1747661145318','0000-00-00 00:00:00','6726e893-fb85-4f35-bbf5-551541e52441'),(99,2,'cristian1747661441845','0000-00-00 00:00:00','e418bc10-26bd-4ba1-b0c2-d247def7967a');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipuscarta`
--

DROP TABLE IF EXISTS `tipuscarta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipuscarta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipuscarta`
--

LOCK TABLES `tipuscarta` WRITE;
/*!40000 ALTER TABLE `tipuscarta` DISABLE KEYS */;
INSERT INTO `tipuscarta` VALUES (1,'Comodí'),(2,'Infanteria'),(3,'Cavalleria'),(4,'Artilleria');
/*!40000 ALTER TABLE `tipuscarta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuaris`
--

DROP TABLE IF EXISTS `usuaris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuaris` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `wins` int(11) NOT NULL,
  `games` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuaris`
--

LOCK TABLES `usuaris` WRITE;
/*!40000 ALTER TABLE `usuaris` DISABLE KEYS */;
INSERT INTO `usuaris` VALUES (1,'Joan','joan','joan','',0,0),(2,'Cristian','cristian','cristian','',0,0),(3,'Juan','juan','juan','',0,0);
/*!40000 ALTER TABLE `usuaris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'risk'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19 15:58:25
