/*
Navicat MySQL Data Transfer

Source Server         : local
Source Host           : localhost:3306
Source Database       : bookcar

Target Server Type    : MYSQL

Date: 2018-11-05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `orderdetails`
-- ----------------------------
DROP TABLE IF EXISTS `listbooks`;
CREATE TABLE `listbooks` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Fullname` nvarchar(50) NOT NULL,
  `PhoneNumber` varchar(11) NOT NULL,
  `Address` nvarchar(100) NOT NULL,
  `Note` nvarchar(300) NOT NULL,
  `DateTime` datetime NOT NULL,
  `Status` int(2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table insert for `orderdetails`
-- ----------------------------
INSERT INTO `listbooks`(`Fullname`, `PhoneNumber`, `Address`, `Note`, `DateTime`,`Status`) VALUES ('Binh', '0929364980', 'quận 1, hồ chí minh', 'thích xe ferrari', Now(), 1);

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table insert for `orderdetails`v
-- ----------------------------
INSERT INTO `accounts`(`username`, `password`) VALUES ('admin', 'admin');

-- ----------------------------
-- Table insert for `orderdetails`
-- ----------------------------
INSERT INTO `listbooks`(`Fullname`, `PhoneNumber`, `Address`, `Note`, `DateTime`,`Status`) VALUES ('Binh', '0929364980', 'quận 1, hồ chí minh', 'thích xe ferrari', Now(), 1);

DROP TABLE IF EXISTS `userRefreshTokenExt`;
CREATE TABLE `userRefreshTokenExt` (
  `userId` int(11) NOT NULL ,
  `rfToken` varchar(20) NOT NULL,
  `rdt` DateTime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;