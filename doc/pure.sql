-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-11-28 07:45:56
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pure`
--
CREATE DATABASE IF NOT EXISTS `pure` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `pure`;

-- --------------------------------------------------------

--
-- 表的结构 `admin_comment`
--

CREATE TABLE `admin_comment` (
  `id` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `parentid` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

CREATE TABLE `blogtags` (
  `id` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `tid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

CREATE TABLE `guest_comment` (
  `id` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `email` int(20) NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, '他哥1'),
(2, '她哥2');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `pwd` varchar(32) COLLATE utf8_bin NOT NULL,
  `email` varchar(20) COLLATE utf8_bin NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0',
  `auth` tinyint(4) NOT NULL DEFAULT '0',
  `code` varchar(20) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `pwd`, `email`, `state`, `auth`, `code`, `time`) VALUES
(1, 'Tmn07', '7ed8be64baf1b71211bc7bfc954824d4', '519403202@qq.com', 1, 1, 'bejewu5vwgxy9zfr', '2016-11-28 06:44:21');



-- --------------------------------------------------------
-- or this?
-- CREATE VIEW vblog AS select b.id,u.name as author,b.title,c.name as category,b.time,b.content FROM blog as b INNER JOIN user as u ON u.id = b.uid INNER JOIN category as c ON c.id = b.cid
--
-- 替换视图以便查看 `vblog`
--
CREATE TABLE `vblog` (
`id` int(11)
,`author` varchar(20)
,`title` varchar(30)
,`category` varchar(20)
,`cid` int(11)
,`time` timestamp
,`content` text
);

-- --------------------------------------------------------

--
-- 视图结构 `vblog`
--
DROP TABLE IF EXISTS `vblog`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vblog`  AS  select `b`.`id` AS `id`,`u`.`name` AS `author`,`b`.`title` AS `title`,`c`.`name` AS `category`,`b`.`cid` AS `cid`,`b`.`time` AS `time`,`b`.`content` AS `content` from ((`blog` `b` join `user` `u` on((`u`.`id` = `b`.`uid`))) join `category` `c` on((`c`.`id` = `b`.`cid`))) ;


--
-- 表的结构 `live_code`
--

CREATE TABLE `live_code` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `code` varchar(20) COLLATE utf8_bin NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `live_code`
--
ALTER TABLE `live_code`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `live_code`
--
ALTER TABLE `live_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_comment`
--
ALTER TABLE `admin_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`,`cid`);

--
-- Indexes for table `blogtags`
--
ALTER TABLE `blogtags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guest_comment`
--
ALTER TABLE `guest_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin_comment`
--
ALTER TABLE `admin_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `blogtags`
--
ALTER TABLE `blogtags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `guest_comment`
--
ALTER TABLE `guest_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
