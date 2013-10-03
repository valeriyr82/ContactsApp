/*
SQLyog - Free MySQL GUI v5.15
Host - 5.5.24-log : Database - contacts
*********************************************************************
Server version : 5.5.24-log
*/

SET NAMES utf8;

SET SQL_MODE='';

create database if not exists `contacts`;

USE `contacts`;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

/*Table structure for table `emails` */

DROP TABLE IF EXISTS `emails`;

CREATE TABLE `emails` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `userid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `primary_email` int(10) NOT NULL,
  `summary` text NOT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

SET SQL_MODE=@OLD_SQL_MODE;