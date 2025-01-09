-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ecomplain
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `complaint_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `technician_id` int DEFAULT NULL,
  `complaint` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('baru','diproses','selesai') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'baru',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `photo_path` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `problem` varchar(100) DEFAULT NULL,
  `documentation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`complaint_id`),
  KEY `customer_id` (`customer_id`),
  KEY `complaints_users_FK` (`technician_id`),
  CONSTRAINT `complaints_users_FK` FOREIGN KEY (`technician_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,2,1,'Internet connection is very slow','diproses','2025-01-03 00:00:00','John Does','9876543210','12345671','Jurang 1/3, Gebog, Kudus, Jawa Tengah',NULL,NULL,NULL,NULL),(5,2,12,'pengetesan','selesai','2024-12-29 00:00:00','John Does','','','',NULL,'Site Pasir Randu','Tidak Ada','Sudah bagus, rumahnya cat hijau'),(6,NULL,12,'Jarang sinyal','diproses','2025-01-02 00:00:00','Farhan Sangaji','9876543210','12345671','Jurang Lor',NULL,'','',''),(7,NULL,12,'wow','selesai','2025-01-01 00:00:00','Farhan Sangaji','9876543210','12345671','Gebog',NULL,'','Sudah Oke','Catnya masih basah'),(8,2,12,'Test','diproses',NULL,'John Does','9876543210','12345671','Jurang 1/3, Gebog, Kudus',NULL,'Site Panongan','',''),(9,2,NULL,'Tsdt lagi','baru',NULL,'John Does','9876543210','12345671','Jurang 1/3, Gebog, Kudus',NULL,NULL,NULL,NULL),(10,2,4,'Test lagi','diproses','2025-01-06 00:00:00','John Does','9876543210','12345671','Jurang 1/3, Gebog, Kudus',NULL,'','',''),(11,2,12,'','diproses','2025-01-06 00:00:00','John Does','9876543210','12345671','Jurang 1/3, Gebog, Kudus',NULL,'Site Panongan','',''),(12,2,12,'Sudah oke','diproses','2025-01-06 00:00:00','John Does2','98765432101231','12345671','Jurang 1/3, Gebog, Kudus, Jawa Tengah',NULL,'','','');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `photo_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nik` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `payment_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `payment_method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `service_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `area` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `service_area_id` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `customers_service_areas_FK` (`service_area_id`),
  KEY `customers_services_FK` (`service_id`),
  CONSTRAINT `customers_service_areas_FK` FOREIGN KEY (`service_area_id`) REFERENCES `service_areas` (`service_area_id`),
  CONSTRAINT `customers_services_FK` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,NULL,'21323123',NULL,'',NULL,'','',NULL,NULL,NULL,NULL,NULL,6),(2,'Farhan Sangaji','0897238949823',NULL,'Jurang 1/3, Gebog, Kudus',NULL,'farhan11soyae@gmail.com','312314',NULL,NULL,NULL,NULL,NULL,2),(3,'Farhan Sangaji','21323123',NULL,'Jurang 1/3, Gebog, Kudus',NULL,'farhan11soyae@gmail.com','312314',NULL,NULL,NULL,NULL,2,3),(4,'Farhan Sangaji','21323123',NULL,'Jurang 1/3, Gebog, Kudus',NULL,'farhan11soyae@gmail.com','312314',NULL,NULL,NULL,NULL,2,3),(5,'Farhan Sangaji','21323123',NULL,'Jurang 1/3, Gebog, Kudus',NULL,'farhan11soyae@gmail.com','312314','bulanan','E-wallet','Internet Broadbrand',NULL,2,3);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_at` datetime DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'New complaint received','2024-12-28 12:24:35',NULL),(2,2,'Your complaint has been assigned to a technician','2024-12-28 12:24:35',NULL),(3,2,'Status pengaduan anda telah dirubah menjadi diproses','2025-01-01 14:17:31',NULL),(4,12,'Anda ditugaskan untuk menangani pengaduan baru.','2025-01-01 14:18:48',NULL),(5,2,'Status pengaduan anda telah dirubah menjadi selesai','2025-01-01 14:23:30',NULL),(6,1,'Pengaduan telah selesai','2025-01-01 14:23:30',NULL),(7,2,'Status pengaduan anda telah dirubah menjadi diproses','2025-01-06 15:24:22',NULL),(8,12,'Anda ditugaskan untuk menangani pengaduan baru.','2025-01-06 15:24:22',NULL),(9,2,'Status pengaduan anda telah dirubah menjadi diproses','2025-01-06 15:25:41',NULL),(10,4,'Anda ditugaskan untuk menangani pengaduan baru.','2025-01-06 15:25:41',NULL),(11,2,'Status pengaduan anda telah dirubah menjadi diproses','2025-01-06 15:26:47',NULL),(12,12,'Anda ditugaskan untuk menangani pengaduan baru.','2025-01-06 15:26:47',NULL),(13,2,'Status pengaduan anda telah dirubah menjadi diproses','2025-01-06 15:29:43',NULL),(14,12,'Anda ditugaskan untuk menangani pengaduan baru.','2025-01-06 15:29:43',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_areas`
--

DROP TABLE IF EXISTS `service_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_areas` (
  `service_area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(100) NOT NULL,
  PRIMARY KEY (`service_area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_areas`
--

LOCK TABLES `service_areas` WRITE;
/*!40000 ALTER TABLE `service_areas` DISABLE KEYS */;
INSERT INTO `service_areas` VALUES (1,'Panongan'),(2,'Pasir Randu'),(3,'Ranca Kelapa'),(4,'Tiga Raksa'),(5,'Balaraja');
/*!40000 ALTER TABLE `service_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_service_area`
--

DROP TABLE IF EXISTS `service_service_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_service_area` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `service_area_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_service_area_service_areas_FK` (`service_area_id`),
  KEY `service_service_area_services_FK` (`service_id`),
  CONSTRAINT `service_service_area_service_areas_FK` FOREIGN KEY (`service_area_id`) REFERENCES `service_areas` (`service_area_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `service_service_area_services_FK` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_service_area`
--

LOCK TABLES `service_service_area` WRITE;
/*!40000 ALTER TABLE `service_service_area` DISABLE KEYS */;
INSERT INTO `service_service_area` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,1,2),(8,2,2),(9,3,2),(10,4,2),(11,5,2),(12,6,2),(13,1,3),(14,2,3),(15,3,3),(16,4,3),(17,5,3),(18,6,3),(19,1,4),(20,2,4),(21,3,4),(22,4,4),(23,5,4),(24,6,4),(25,1,5),(26,2,5),(27,3,5),(28,4,5),(29,5,5),(30,6,5);
/*!40000 ALTER TABLE `service_service_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `speed` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Paket Hemat','Setara 3-4 Hp',140000.00,'5 Mbps'),(2,'Paket Ekonomis','Setara 7-8 Hp',185000.00,'10 Mbps'),(3,'Paket Ngebut','Setara 15-16 Hp',245000.00,'20 Mbps'),(4,'Paket Streaming','Setara 20 Hp',311000.00,'30 Mbps'),(5,'Paket UMKM','Setara 32 Hp',380000.00,'100 Mbps'),(6,'Paket Hemat','Setara 25 Hp',340000.00,'50 MBps');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `service_area_id` int DEFAULT NULL,
  `next_payment_at` date DEFAULT NULL,
  `started_at` datetime NOT NULL,
  PRIMARY KEY (`subscription_id`),
  UNIQUE KEY `subscriptions_unique` (`user_id`),
  KEY `subscriptions_services_FK` (`service_id`),
  KEY `subscriptions_service_areas_FK` (`service_area_id`),
  CONSTRAINT `subscriptions_service_areas_FK` FOREIGN KEY (`service_area_id`) REFERENCES `service_areas` (`service_area_id`),
  CONSTRAINT `subscriptions_services_FK` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  CONSTRAINT `subscriptions_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,2,1,3,'2024-01-29','2024-12-29 14:06:59');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer','technician','guest') NOT NULL,
  `uuid` varchar(100) NOT NULL,
  `nik` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `service_type` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_unique` (`uuid`),
  UNIQUE KEY `users_unique_1` (`nik`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@allnet.com','1234567890','$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','admin','12345678',NULL,NULL,'bulanan',NULL,NULL,NULL,'2024-12-31 07:01:04',NULL),(2,'John Does','john.doe@gmail.com','9876543210','$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','customer','12345671','324234','Jurang 1/3, Gebog, Kudus','tahunan','','Internet Dedicated',NULL,'2024-12-31 07:01:04',NULL),(4,'Technician One','tech1@allnet.com',NULL,'$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','technician','12345673',NULL,NULL,NULL,NULL,NULL,'Panongan','2024-12-31 07:01:04','Available'),(10,'John Doe','john.doe@gmail.com2','9876543210','$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','customer','123456713',NULL,'Jurang 1/3, Gebog, Kudus','tahunan',NULL,'Internet Dedicated',NULL,'2024-12-31 07:01:04',NULL),(11,'John Doe','john.doe@gmail.com3','9876543210','$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','customer','123456714',NULL,'Jurang 1/3, Gebog, Kudus','tahunan',NULL,'Internet Dedicated',NULL,'2024-12-31 07:01:04',NULL),(12,'Technician One','tech1@allnet.com1',NULL,'$2a$12$iibJkUPi6BDsHv/9Zd5Luuzo95F5bOfMeGjwiqtQsuFECuoxqFgTC','technician','12345674',NULL,NULL,NULL,NULL,NULL,'Balaraja','2024-12-31 07:01:04','Non Available'),(14,'Farhan Sangaji','farhan11soyae@gmail.com','0897238949823','$2y$10$l6GucJ9X6J9hAiiLJH8bweKJ4agF16Zk08zX/yfmRN.wBA1eWbIEa','customer','67752a98a04ec','3123213','Jurang 1/3, Gebog, Kudus','bulanan','E-wallet','Internet Broadbrand',NULL,'2025-01-01 11:44:24',NULL),(16,'Farhan Sangaji','farhan11soyae@gmail.com1','9876543210','$2y$10$QQiZRg97PYeh0jgr6cNUgutcdyx2eTNP1XKB3xlrkEF5cRVNHXIBe','customer','67752af9c64e6','12323123123','Jurang 1/3, Gebog, Kudus','tahunan','0','Internet Broadbrand',NULL,'2025-01-01 11:46:01',NULL),(17,'Tseasasd','teknisi@mail.com',NULL,'$2y$10$prviu4gqSseYc1heCZ5qJOYbODVAcVuAwnXsz2zy8gLzM3sMeEYf.','technician','67752c5093a6c',NULL,NULL,NULL,NULL,NULL,'Balaraja','2025-01-01 11:51:44','Non Available'),(18,'WOw','admin@mail.com1',NULL,'$2y$10$vMXHp9axnUHkqP363kgyDu0OL20S7gRg.ozPpvcp6gOFr/rmaXmU6','technician','677540e17d757',NULL,NULL,NULL,NULL,NULL,'Panongan','2025-01-01 13:19:29','Available');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_ecomplain'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06 22:48:32
