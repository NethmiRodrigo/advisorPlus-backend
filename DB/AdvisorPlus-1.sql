-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 28, 2020 at 09:35 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AdvisorPlus`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisor_profile`
--

CREATE TABLE `advisor_profile` (
  `user_id` char(36) NOT NULL,
  `full_name` varchar(30) NOT NULL,
  `username` varchar(10) NOT NULL,
  `date_registered` date NOT NULL,
  `status_id` int(5) NOT NULL,
  `position` varchar(10) DEFAULT NULL,
  `experience` int(10) DEFAULT NULL,
  `ratings` int(10) NOT NULL DEFAULT 0,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `advisor_qualifications`
--

CREATE TABLE `advisor_qualifications` (
  `id` char(36) NOT NULL,
  `qualification` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `advisor_services`
--

CREATE TABLE `advisor_services` (
  `id` char(36) NOT NULL,
  `service_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `audience`
--

CREATE TABLE `audience` (
  `id` int(10) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `audience`
--

INSERT INTO `audience` (`id`, `type`) VALUES
(1, 'public'),
(2, 'only consultants'),
(3, 'private');

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `user_id` char(36) NOT NULL,
  `content` longtext NOT NULL,
  `rating` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(10) NOT NULL,
  `user_id` char(36) NOT NULL,
  `date` date NOT NULL,
  `status_id` int(2) NOT NULL,
  `content` longtext NOT NULL,
  `service_type_id` int(5) NOT NULL,
  `audience_id` int(5) NOT NULL,
  `advisor_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post_status`
--

CREATE TABLE `post_status` (
  `id` int(10) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_status`
--

INSERT INTO `post_status` (`id`, `status`) VALUES
(1, 'delete'),
(2, 'active'),
(3, 'answered'),
(4, 'closed');

-- --------------------------------------------------------

--
-- Table structure for table `service_type`
--

CREATE TABLE `service_type` (
  `id` int(10) NOT NULL,
  `service` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_type`
--

INSERT INTO `service_type` (`id`, `service`) VALUES
(1, 'counselling'),
(2, 'carrier_guidance'),
(3, 'physical_health'),
(4, 'financial_guidance');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `Id` char(36) NOT NULL COMMENT 'Save a guid',
  `full_name` varchar(30) NOT NULL,
  `username` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `DOB` date NOT NULL,
  `date_registers` date NOT NULL,
  `status_id` int(5) NOT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_status`
--

CREATE TABLE `user_status` (
  `id` int(5) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_status`
--

INSERT INTO `user_status` (`id`, `status`) VALUES
(1, 'active'),
(2, 'blacklist'),
(3, 'suspended');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisor_profile`
--
ALTER TABLE `advisor_profile`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_status` (`status_id`);

--
-- Indexes for table `advisor_qualifications`
--
ALTER TABLE `advisor_qualifications`
  ADD PRIMARY KEY (`id`,`qualification`);

--
-- Indexes for table `advisor_services`
--
ALTER TABLE `advisor_services`
  ADD PRIMARY KEY (`id`,`service_id`),
  ADD KEY `fk_advisor_service` (`service_id`);

--
-- Indexes for table `audience`
--
ALTER TABLE `audience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_fk_comment` (`post_id`),
  ADD KEY `user_fk_comment` (`user_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_fk` (`user_id`),
  ADD KEY `status_fk` (`status_id`),
  ADD KEY `service_type_fk` (`service_type_id`),
  ADD KEY `audience_fk` (`audience_id`),
  ADD KEY `advisor_fk` (`advisor_id`);

--
-- Indexes for table `post_status`
--
ALTER TABLE `post_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_type`
--
ALTER TABLE `service_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk` (`status_id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audience`
--
ALTER TABLE `audience`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Comment`
--
ALTER TABLE `Comment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_status`
--
ALTER TABLE `post_status`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_type`
--
ALTER TABLE `service_type`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advisor_profile`
--
ALTER TABLE `advisor_profile`
  ADD CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `user_status` (`id`);

--
-- Constraints for table `advisor_qualifications`
--
ALTER TABLE `advisor_qualifications`
  ADD CONSTRAINT `fk_qualification` FOREIGN KEY (`id`) REFERENCES `advisor_profile` (`user_id`);

--
-- Constraints for table `advisor_services`
--
ALTER TABLE `advisor_services`
  ADD CONSTRAINT `fk_advisor_service` FOREIGN KEY (`service_id`) REFERENCES `service_type` (`id`),
  ADD CONSTRAINT `fk_advisor_service_user` FOREIGN KEY (`id`) REFERENCES `advisor_profile` (`user_id`);

--
-- Constraints for table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `post_fk_comment` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  ADD CONSTRAINT `user_fk_comment` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`Id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor_profile` (`user_id`),
  ADD CONSTRAINT `audience_fk` FOREIGN KEY (`audience_id`) REFERENCES `audience` (`id`),
  ADD CONSTRAINT `service_type_fk` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`),
  ADD CONSTRAINT `status_fk` FOREIGN KEY (`status_id`) REFERENCES `user_status` (`id`),
  ADD CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`Id`);

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `fk` FOREIGN KEY (`status_id`) REFERENCES `user_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
