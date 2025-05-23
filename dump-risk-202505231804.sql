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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estats`
--

LOCK TABLES `estats` WRITE;
/*!40000 ALTER TABLE `estats` DISABLE KEYS */;
INSERT INTO `estats` VALUES (1,'Wait'),(2,'Col·locar inicial'),(3,'Reforc x pais'),(4,'Combat'),(5,'Move Combat'),(6,'Recol·locacio'),(8,'Final');
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
) ENGINE=InnoDB AUTO_INCREMENT=319 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` VALUES (172,2,4,1,1,35),(247,2,6,1,1,35),(248,3,6,2,1,35),(249,2,7,1,1,0),(251,2,8,1,1,35),(252,3,8,2,1,35),(265,3,9,1,1,0),(266,2,9,2,1,0),(271,3,13,1,1,0),(272,2,13,2,1,0),(275,2,14,1,1,0),(276,3,14,2,1,0),(277,3,15,1,1,34),(278,2,15,2,1,19),(279,2,15,2,1,35),(280,3,16,1,1,0),(281,2,16,2,1,0),(282,3,17,1,1,0),(283,2,17,2,1,0),(284,2,18,1,1,0),(285,3,18,2,1,11),(286,2,19,1,1,32),(287,3,19,2,1,32),(288,2,20,1,1,0),(289,3,20,2,1,11),(290,2,21,1,1,0),(291,3,21,2,1,11),(293,3,23,1,1,34),(294,2,23,2,1,20),(295,2,23,2,1,35),(297,3,24,2,1,0),(298,2,24,1,1,0),(300,2,26,1,1,0),(301,3,26,1,1,11),(302,2,27,1,1,0),(303,3,27,2,1,0),(306,2,29,1,1,0),(307,3,29,1,1,0),(308,2,30,1,1,0),(309,3,30,2,1,0),(313,2,31,1,1,0),(314,3,31,2,1,0),(317,3,32,1,1,0),(318,2,32,2,1,0);
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
INSERT INTO `okupa` VALUES (1,266,1),(1,271,1),(1,275,1),(1,278,1),(1,281,1),(1,283,1),(1,284,1),(1,286,1),(1,288,1),(1,290,1),(1,294,1),(1,298,1),(1,300,1),(1,302,1),(1,306,1),(1,308,1),(1,313,1),(1,318,1),(2,247,1),(2,266,1),(2,271,1),(2,275,1),(2,278,1),(2,281,1),(2,283,1),(2,284,1),(2,286,1),(2,288,1),(2,290,1),(2,294,1),(2,298,1),(2,300,1),(2,302,1),(2,306,1),(2,308,1),(2,313,1),(2,318,1),(3,172,1),(3,247,1),(3,266,1),(3,271,1),(3,275,1),(3,278,1),(3,281,1),(3,283,1),(3,284,1),(3,288,1),(3,290,1),(3,294,1),(3,298,1),(3,300,1),(3,302,1),(3,306,1),(3,308,1),(3,313,1),(3,318,1),(4,266,1),(4,271,1),(4,275,1),(4,278,1),(4,281,1),(4,283,1),(4,284,1),(4,288,1),(4,290,1),(4,294,1),(4,298,1),(4,300,1),(4,302,1),(4,306,1),(4,308,1),(4,313,1),(4,318,1),(5,266,1),(5,271,1),(5,275,1),(5,278,1),(5,281,1),(5,283,1),(5,284,1),(5,288,1),(5,290,1),(5,294,1),(5,298,1),(5,300,1),(5,302,1),(5,306,1),(5,308,1),(5,313,1),(5,318,1),(6,266,1),(6,271,1),(6,275,1),(6,278,1),(6,281,1),(6,283,1),(6,284,1),(6,288,1),(6,290,1),(6,294,1),(6,298,1),(6,300,1),(6,302,1),(6,306,1),(6,308,1),(6,313,1),(6,318,1),(7,266,1),(7,271,1),(7,275,1),(7,278,1),(7,281,1),(7,283,1),(7,284,1),(7,288,1),(7,290,1),(7,294,1),(7,298,1),(7,300,1),(7,302,1),(7,306,1),(7,308,1),(7,313,1),(7,318,1),(8,266,1),(8,271,1),(8,275,1),(8,278,1),(8,281,1),(8,283,1),(8,284,1),(8,288,1),(8,290,1),(8,294,1),(8,298,1),(8,300,1),(8,302,1),(8,306,1),(8,308,1),(8,313,1),(8,318,1),(9,247,1),(9,266,15),(9,271,1),(9,275,1),(9,278,1),(9,281,1),(9,283,1),(9,284,15),(9,286,1),(9,288,1),(9,290,1),(9,294,1),(9,298,1),(9,300,1),(9,302,1),(9,306,1),(9,308,1),(9,313,5),(9,318,12),(10,266,1),(10,271,1),(10,275,1),(10,278,1),(10,281,1),(10,283,1),(10,284,1),(10,288,1),(10,290,1),(10,294,1),(10,298,1),(10,300,1),(10,302,1),(10,306,1),(10,308,1),(10,313,1),(10,318,1),(11,266,1),(11,271,1),(11,275,1),(11,278,1),(11,281,1),(11,283,1),(11,284,1),(11,288,1),(11,290,1),(11,294,1),(11,298,1),(11,300,1),(11,302,1),(11,306,1),(11,308,1),(11,313,1),(11,318,1),(12,266,1),(12,271,1),(12,275,1),(12,278,1),(12,281,1),(12,283,1),(12,284,1),(12,288,1),(12,290,1),(12,294,1),(12,298,1),(12,300,1),(12,302,1),(12,306,1),(12,308,1),(12,313,1),(12,318,1),(13,266,1),(13,271,1),(13,275,1),(13,278,1),(13,281,1),(13,283,1),(13,284,1),(13,288,1),(13,290,1),(13,294,1),(13,298,1),(13,300,1),(13,302,1),(13,306,1),(13,308,1),(13,313,1),(13,318,1),(14,265,1),(14,272,1),(14,275,15),(14,278,1),(14,281,1),(14,282,1),(14,285,1),(14,288,1),(14,291,1),(14,294,1),(14,297,1),(14,301,1),(14,303,1),(14,307,1),(14,309,1),(14,314,1),(14,317,1),(15,266,1),(15,271,1),(15,275,1),(15,278,1),(15,281,1),(15,282,1),(15,285,1),(15,288,1),(15,291,1),(15,294,1),(15,297,1),(15,301,1),(15,302,15),(15,306,15),(15,309,1),(15,314,1),(15,317,1),(16,265,1),(16,272,1),(16,276,1),(16,281,1),(16,282,1),(16,285,1),(16,289,1),(16,291,1),(16,297,1),(16,301,1),(16,303,1),(16,307,1),(16,309,1),(16,314,1),(16,317,2),(17,265,1),(17,272,1),(17,276,1),(17,281,1),(17,282,1),(17,285,1),(17,289,1),(17,291,15),(17,297,15),(17,301,15),(17,303,3),(17,307,6),(17,309,15),(17,314,23),(17,317,3),(18,266,1),(18,271,15),(18,275,1),(18,278,1),(18,281,15),(18,283,15),(18,285,15),(18,288,15),(18,290,15),(18,298,15),(18,300,15),(18,302,1),(18,306,1),(18,309,7),(18,314,4),(18,318,4),(19,247,1),(19,265,1),(19,272,1),(19,276,1),(19,277,1),(19,281,1),(19,282,1),(19,284,1),(19,289,1),(19,290,1),(19,298,1),(19,300,1),(19,303,10),(19,307,7),(19,308,4),(19,313,5),(19,317,9),(20,265,15),(20,272,1),(20,276,1),(20,281,1),(20,282,1),(20,285,1),(20,289,1),(20,291,1),(20,297,1),(20,301,1),(20,303,1),(20,307,1),(20,309,4),(20,314,1),(20,317,4),(21,266,1),(21,271,1),(21,275,1),(21,280,1),(21,283,1),(21,284,1),(21,288,1),(21,290,1),(21,298,1),(21,300,1),(21,302,1),(21,306,1),(21,308,1),(21,313,1),(21,318,1),(22,266,1),(22,271,1),(22,276,15),(22,280,1),(22,283,1),(22,284,1),(22,289,15),(22,290,1),(22,298,1),(22,300,1),(22,302,1),(22,306,1),(22,308,2),(22,313,3),(22,318,1),(23,266,1),(23,271,1),(23,275,1),(23,280,1),(23,283,1),(23,284,1),(23,288,1),(23,290,1),(23,298,1),(23,300,1),(23,302,1),(23,306,1),(23,308,2),(23,313,1),(23,318,1),(24,266,1),(24,271,1),(24,275,1),(24,280,1),(24,283,1),(24,284,1),(24,288,1),(24,290,1),(24,298,1),(24,300,1),(24,302,1),(24,306,1),(24,308,1),(24,313,1),(24,318,1),(25,266,1),(25,271,1),(25,275,1),(25,280,1),(25,283,1),(25,284,1),(25,288,1),(25,290,1),(25,298,1),(25,300,1),(25,302,1),(25,306,1),(25,308,1),(25,313,1),(25,318,1),(26,266,1),(26,271,1),(26,275,1),(26,281,1),(26,283,1),(26,284,1),(26,288,1),(26,290,1),(26,298,1),(26,300,1),(26,302,1),(26,306,1),(26,308,1),(26,313,1),(26,318,1),(27,265,1),(27,272,1),(27,276,1),(27,280,1),(27,282,1),(27,285,1),(27,287,1),(27,289,1),(27,291,1),(27,297,1),(27,301,1),(27,303,1),(27,307,1),(27,309,1),(27,314,1),(27,317,1),(28,265,1),(28,272,1),(28,276,1),(28,280,1),(28,282,1),(28,285,1),(28,289,1),(28,291,1),(28,297,1),(28,301,1),(28,303,1),(28,307,1),(28,309,1),(28,314,1),(28,317,1),(29,265,1),(29,272,1),(29,276,1),(29,280,1),(29,282,1),(29,285,1),(29,289,1),(29,291,1),(29,297,1),(29,301,1),(29,303,1),(29,307,1),(29,309,1),(29,314,1),(29,317,1),(30,265,1),(30,272,1),(30,276,1),(30,280,1),(30,282,1),(30,285,1),(30,289,1),(30,291,1),(30,293,1),(30,297,1),(30,301,1),(30,303,1),(30,307,1),(30,309,1),(30,314,1),(30,317,1),(31,265,1),(31,272,1),(31,276,1),(31,280,1),(31,282,1),(31,285,1),(31,287,1),(31,289,1),(31,291,1),(31,297,1),(31,301,1),(31,303,1),(31,307,1),(31,309,1),(31,314,1),(31,317,1),(32,265,1),(32,272,1),(32,276,1),(32,280,1),(32,282,1),(32,285,1),(32,287,1),(32,289,1),(32,291,1),(32,297,1),(32,301,1),(32,303,1),(32,307,1),(32,309,1),(32,314,1),(32,317,1),(33,247,1),(33,248,1),(33,265,1),(33,272,1),(33,276,1),(33,280,1),(33,283,1),(33,285,1),(33,289,1),(33,291,1),(33,297,1),(33,301,1),(33,303,1),(33,307,1),(33,309,1),(33,314,1),(33,317,1),(34,265,1),(34,272,1),(34,276,1),(34,280,15),(34,282,1),(34,285,1),(34,289,1),(34,291,1),(34,297,1),(34,301,1),(34,303,1),(34,307,1),(34,309,3),(34,314,1),(34,317,1),(35,265,1),(35,272,1),(35,276,1),(35,280,1),(35,282,1),(35,285,1),(35,289,1),(35,291,1),(35,297,1),(35,301,1),(35,303,1),(35,307,1),(35,309,1),(35,314,1),(35,317,1),(36,265,1),(36,272,15),(36,276,1),(36,280,1),(36,282,15),(36,284,1),(36,289,1),(36,291,1),(36,297,1),(36,301,1),(36,303,15),(36,307,15),(36,308,10),(36,313,5),(36,318,1),(37,265,1),(37,272,1),(37,276,1),(37,280,1),(37,282,1),(37,285,1),(37,289,1),(37,291,1),(37,297,1),(37,301,1),(37,303,1),(37,307,1),(37,309,1),(37,314,1),(37,317,1),(38,265,1),(38,272,1),(38,276,1),(38,280,1),(38,282,1),(38,285,1),(38,289,1),(38,291,1),(38,297,1),(38,301,1),(38,303,1),(38,307,1),(38,309,1),(38,314,1),(38,317,1),(39,265,1),(39,272,1),(39,276,1),(39,280,1),(39,282,1),(39,285,1),(39,289,1),(39,291,1),(39,297,1),(39,301,1),(39,303,1),(39,307,1),(39,309,1),(39,314,1),(39,317,1),(40,265,1),(40,272,1),(40,276,1),(40,280,1),(40,282,1),(40,285,1),(40,289,1),(40,291,1),(40,297,1),(40,301,1),(40,303,1),(40,307,1),(40,309,1),(40,314,1),(40,317,1),(41,265,1),(41,272,1),(41,276,1),(41,280,1),(41,282,1),(41,285,1),(41,289,1),(41,291,1),(41,297,1),(41,301,1),(41,303,1),(41,307,1),(41,309,1),(41,314,1),(41,317,1),(42,265,1),(42,272,1),(42,276,1),(42,280,1),(42,282,1),(42,285,1),(42,289,1),(42,291,1),(42,297,1),(42,301,1),(42,303,1),(42,307,1),(42,309,1),(42,314,1),(42,317,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (4,'2025-05-06 19:34:59','Maldonado','Maldonado1746552899151',4,2,NULL,2),(5,'2025-05-12 17:56:54','Juan Sala','Juan_Sala1747065414458',3,2,2,2),(6,'2025-05-14 18:54:59','Maldonado','Maldonado1747241699139',3,2,2,2),(7,'2025-05-19 15:25:32','Maldonado','Maldonado1747661132765',3,2,2,2),(8,'2025-05-19 15:30:44','Maldonado','Maldonado1747661444857',2,2,2,2),(9,'2025-05-19 15:32:09','Maldonado','Maldonado1747661529044',2,2,2,2),(10,'2025-05-21 17:28:59','jorge','jorge1747841339375',3,1,NULL,1),(11,'2025-05-21 17:30:29','messi2','messi21747841429811',5,1,NULL,1),(12,'2025-05-21 18:47:07','salasalamandra','salasalamandra1747846027223',6,1,NULL,1),(13,'2025-05-22 18:39:03','pruebas 1','pruebas_11747931943329',2,3,3,2),(14,'2025-05-22 18:43:22','Pruebas2','Pruebas21747932202158',2,2,3,3),(15,'2025-05-22 18:47:07','pruebas 3','pruebas_31747932427889',2,3,2,2),(16,'2025-05-22 18:49:20','pruebas 4','pruebas_41747932560863',2,3,2,3),(17,'2025-05-22 18:52:00','pruebas 5','pruebas_51747932720387',2,3,2,3),(18,'2025-05-22 18:55:32','pruebas6','pruebas61747932932226',2,2,3,3),(19,'2025-05-22 19:00:02','AA_pruebas_7','AA_pruebas_71747933202589',2,2,2,2),(20,'2025-05-22 19:02:40','pruebas_8','pruebas_81747933360509',2,2,3,3),(21,'2025-05-22 19:08:25','pruebas_9','pruebas_91747933705623',2,2,3,3),(22,'2025-05-22 19:12:27','Hola','Hola1747933947842',4,1,NULL,1),(23,'2025-05-22 19:15:37','pruebas 10','pruebas_101747934137634',2,3,2,2),(24,'2025-05-22 19:18:40','prueabs 11','prueabs_111747934320637',2,3,2,4),(25,'2025-05-22 19:20:17','messi43','messi431747934417637',3,1,NULL,1),(26,'2025-05-22 19:24:01','dadadad','dadadad1747934641133',2,2,3,3),(27,'2025-05-22 19:26:49','dadada','dadada1747934809975',2,2,3,4),(28,'2025-05-22 19:27:27','dkadkadka','dkadkadka1747934847182',3,1,NULL,1),(29,'2025-05-22 19:30:56','Maldonado','Maldonado1747935056274',2,2,3,4),(30,'2025-05-22 19:34:46','Maldonado','Maldonado1747935286291',2,2,3,4),(31,'2025-05-22 19:40:04','Maldonado','Maldonado1747935604356',2,2,3,4),(32,'2025-05-22 19:47:56','prueba 65','prueba_651747936076527',2,3,2,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (123,3,'juan1747931896277','0000-00-00 00:00:00','a10269d2-dab9-4885-be10-b7fcffa66770'),(124,2,'cristian1747931920993','0000-00-00 00:00:00','02c1ceea-2278-4bd9-915d-b04829619651'),(127,1,'joan1747934835350','0000-00-00 00:00:00','c97bae5a-ec3a-4a24-81e8-3f94c0c8c982');
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

-- Dump completed on 2025-05-23 18:04:43
