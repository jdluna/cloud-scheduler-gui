-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2017 at 10:03 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pragma`
--

-- --------------------------------------------------------

--
-- Table structure for table `connection_type`
--

CREATE TABLE `connection_type` (
  `site_id` bigint(20) UNSIGNED NOT NULL,
  `connection_type` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `connection_type`
--

INSERT INTO `connection_type` (`site_id`, `connection_type`) VALUES
(1, 'c'),
(1, 'd'),
(1, 'e'),
(2, 'IPOP'),
(2, 'ENT'),
(2, 'g'),
(2, 'h'),
(2, 'i'),
(3, 'IPOP'),
(3, 'j'),
(3, 'ENT'),
(3, 'l'),
(3, 'm'),
(4, 'IPOP'),
(4, 'n'),
(4, 'o'),
(4, 'p'),
(4, 'q'),
(5, 'IPOP'),
(5, 'r'),
(5, 'ENT'),
(5, 't'),
(5, 'u'),
(6, 'IPOP'),
(6, 'v'),
(6, 'w'),
(6, 'x'),
(6, 'y'),
(7, 'IPOP'),
(7, 'z'),
(7, 'aa'),
(7, 'bb'),
(7, 'cc'),
(8, 'IPOP'),
(8, 'dd'),
(8, 'ee'),
(8, 'ff'),
(8, 'gg'),
(9, 'IPOP'),
(9, 'hh'),
(9, 'ii'),
(9, 'jj'),
(9, 'kk');

-- --------------------------------------------------------

--
-- Table structure for table `image_type`
--

CREATE TABLE `image_type` (
  `site_id` bigint(20) UNSIGNED NOT NULL,
  `image_type` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `image_type`
--

INSERT INTO `image_type` (`site_id`, `image_type`) VALUES
(1, 'a'),
(1, 'b'),
(1, 'c'),
(1, 'd'),
(1, 'e'),
(2, 'b'),
(2, 'f'),
(2, 'g'),
(2, 'h'),
(2, 'i'),
(3, 'b'),
(3, 'j'),
(3, 'k'),
(3, 'l'),
(3, 'm'),
(4, 'b'),
(4, 'n'),
(4, 'o'),
(4, 'p'),
(4, 'q'),
(5, 'b'),
(5, 'r'),
(5, 's'),
(5, 't'),
(5, 'u'),
(6, 'b'),
(6, 'v'),
(6, 'w'),
(6, 'x'),
(6, 'y'),
(7, 'b'),
(7, 'z'),
(7, 'aa'),
(7, 'bb'),
(7, 'cc'),
(8, 'b'),
(8, 'dd'),
(8, 'ee'),
(8, 'ff'),
(8, 'gg'),
(9, 'b'),
(9, 'hh'),
(9, 'ii'),
(9, 'jj'),
(9, 'kk'),
(10, 'b'),
(10, 'll'),
(10, 'mm'),
(10, 'nn'),
(10, 'oo');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(16) DEFAULT NULL,
  `description` varchar(64) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `reference_number` varchar(32) NOT NULL,
  `image_type` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `site_id` bigint(20) UNSIGNED NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `cpu` int(11) NOT NULL,
  `memory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `site_id`, `start`, `end`, `cpu`, `memory`) VALUES
(21, 2, '2017-02-09 00:00:00', '2017-02-09 01:00:00', 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `session_id` varchar(16) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`user_id`, `session_id`, `last_login`) VALUES
(1, 'WWX9KX', '2017-02-13 13:20:06');

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `site_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(16) NOT NULL,
  `description` varchar(64) NOT NULL,
  `contact` varchar(32) NOT NULL,
  `location` varchar(64) NOT NULL,
  `pragma_boot_path` varchar(64) NOT NULL,
  `pragma_boot_version` int(11) NOT NULL,
  `python_path` varchar(64) NOT NULL,
  `temp_dir` varchar(64) NOT NULL,
  `username` varchar(16) NOT NULL,
  `deployment_type` varchar(16) NOT NULL,
  `site_hostname` varchar(32) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `total_cpu` int(11) NOT NULL,
  `total_memory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`site_id`, `name`, `description`, `contact`, `location`, `pragma_boot_path`, `pragma_boot_version`, `python_path`, `temp_dir`, `username`, `deployment_type`, `site_hostname`, `latitude`, `longitude`, `total_cpu`, `total_memory`) VALUES
(1, 'NCHC cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 16, 32),
(2, 'AIST Cloud', 'Cloudstack. Hosting Virtual clusters and virtual machines.', 'jh.haga@aist.go.jp', 'Cloudstack. Hosting Virtual clusters and virtual machines.', '/home/ssmallen/pragma_boot', 2, '-', '/home/ssmallen/pcc', 'ssmallen', 'Rocks KVM', '163.220.54.102', 36.060839, 140.137303, 32, 64),
(3, 'ABCD cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 128, 32),
(4, 'A1 cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 64, 64),
(5, 'TU cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 64, 32),
(6, 'CU cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 32, 64),
(7, 'UCSD cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 64, 128),
(8, 'KU cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 64, 64),
(9, 'NC cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 32, 32),
(10, 'HC cloud', 'Rocks. \r\nHosting virtual clusters and virtual machines', 'serenapan@nchc.narl.org.tw', 'National Center for High-Performance Computing', '/opt/pragma_boot', 2, '/opt/pragma_boot', '/var/run/pcc', 'root', 'Rocks KVM', 'pragma.nchc.org.tw', 24.81383, 120.967475, 16, 16);

-- --------------------------------------------------------

--
-- Table structure for table `site_reserved`
--

CREATE TABLE `site_reserved` (
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `site_id` bigint(20) UNSIGNED NOT NULL,
  `cpu` int(11) NOT NULL,
  `memory` int(11) NOT NULL,
  `status` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(128) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `lastname` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(24) DEFAULT NULL,
  `status` varchar(5) NOT NULL,
  `organization` varchar(16) NOT NULL,
  `position` varchar(16) NOT NULL,
  `language` varchar(3) NOT NULL,
  `timezone` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `firstname`, `lastname`, `email`, `phone`, `status`, `organization`, `position`, `language`, `timezone`) VALUES
(1, 'project401', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'nannapas', 'banluesombatkul', 'nannapas.blsbk@gmail.com', NULL, 'user', 'TU', 'student', 'TH', 'UTC+07:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connection_type`
--
ALTER TABLE `connection_type`
  ADD KEY `site_id` (`site_id`),
  ADD KEY `image_type_id` (`connection_type`);

--
-- Indexes for table `image_type`
--
ALTER TABLE `image_type`
  ADD KEY `site_id` (`site_id`),
  ADD KEY `image_type_id` (`image_type`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD UNIQUE KEY `reference_number` (`reference_number`),
  ADD UNIQUE KEY `reservation_id` (`reservation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD UNIQUE KEY `id` (`id`,`site_id`),
  ADD KEY `site_id` (`site_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`site_id`),
  ADD UNIQUE KEY `site_id` (`site_id`);

--
-- Indexes for table `site_reserved`
--
ALTER TABLE `site_reserved`
  ADD PRIMARY KEY (`reservation_id`),
  ADD UNIQUE KEY `reservation_id` (`reservation_id`),
  ADD KEY `site_id` (`site_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `site_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `site_reserved`
--
ALTER TABLE `site_reserved`
  MODIFY `reservation_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `connection_type`
--
ALTER TABLE `connection_type`
  ADD CONSTRAINT `connection_type_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`);

--
-- Constraints for table `image_type`
--
ALTER TABLE `image_type`
  ADD CONSTRAINT `image_type_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`);

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `site_reserved`
--
ALTER TABLE `site_reserved`
  ADD CONSTRAINT `site_reserved_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`),
  ADD CONSTRAINT `site_reserved_ibfk_2` FOREIGN KEY (`site_id`) REFERENCES `site` (`site_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
