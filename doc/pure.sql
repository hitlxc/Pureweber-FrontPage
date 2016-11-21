-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016-11-21 23:03:12
-- 服务器版本: 5.5.53-0ubuntu0.14.04.1
-- PHP 版本: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `pure`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_comment`
--
-- 创建时间: 2016-11-21 12:15:08
--

CREATE TABLE IF NOT EXISTS `admin_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `parentid` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bid` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `blog`
--
-- 创建时间: 2016-11-21 12:09:33
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`,`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `blog`
--

INSERT INTO `blog` (`id`, `title`, `time`, `uid`, `cid`, `content`) VALUES
(1, 'fff', '2016-11-21 13:02:01', 1, 1, '123123'),
(2, '12312', '2016-11-21 13:40:56', 1, 2, '123'),
(3, '哈工大Pureweber项目组官网', '2016-11-21 14:25:41', 1, 1, '# 哈工大Pureweber项目组官网\r\n\r\n\r\n### 施工中\r\n\r\n### 使用方法\r\n1. `git clone git@github.com:hitlxc/Pureweber-FrontPage.git`\r\n2. `cd /Pureweber-FrontPage`\r\n3. `npm install`\r\n4. `npm start` or `supervisor ./bin/www`\r\n5. visit localhost:3000\r\n');

-- --------------------------------------------------------

--
-- 表的结构 `blogtags`
--
-- 创建时间: 2016-11-21 12:12:17
--

CREATE TABLE IF NOT EXISTS `blogtags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `blogtags`
--

INSERT INTO `blogtags` (`id`, `bid`, `tid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--
-- 创建时间: 2016-11-21 12:10:49
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, '混雷1'),
(2, '分嘞2');

-- --------------------------------------------------------

--
-- 表的结构 `guest_comment`
--
-- 创建时间: 2016-11-21 12:18:16
--

CREATE TABLE IF NOT EXISTS `guest_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `email` int(20) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--
-- 创建时间: 2016-11-21 12:11:37
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, '他哥1'),
(2, '她哥2');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
