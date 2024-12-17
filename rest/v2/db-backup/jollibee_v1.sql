-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 05:42 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jollibee_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `jollibee_category`
--

CREATE TABLE `jollibee_category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jollibee_category`
--

INSERT INTO `jollibee_category` (`category_aid`, `category_is_active`, `category_title`, `category_datetime`, `category_created`) VALUES
(15, 1, 'Chicken', '', 2024),
(16, 1, 'Burger', '2024-12-10 15:09:31', 2024),
(18, 1, 'Palabok', '2024-12-11 12:24:53', 2024),
(19, 1, 'Sides', '2024-12-11 12:07:29', 2024);

-- --------------------------------------------------------

--
-- Table structure for table `jollibee_food`
--

CREATE TABLE `jollibee_food` (
  `food_aid` int(11) NOT NULL,
  `food_is_active` tinyint(1) NOT NULL,
  `food_image` varchar(20) NOT NULL,
  `food_title` varchar(30) NOT NULL,
  `food_price` int(20) NOT NULL,
  `food_category_id` int(11) NOT NULL,
  `food_datetime` varchar(30) NOT NULL,
  `food_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jollibee_food`
--

INSERT INTO `jollibee_food` (`food_aid`, `food_is_active`, `food_image`, `food_title`, `food_price`, `food_category_id`, `food_datetime`, `food_created`) VALUES
(2, 1, '', 'faf', 0, 0, '2024-12-11 09:25:59', 2024),
(3, 1, '', 'tetetete', 797, 17, '2024-12-11 10:04:45', 2024),
(4, 1, '', 'asdada', 0, 15, '2024-12-11 12:35:52', 2024),
(5, 1, '', 'test6', 1, 19, '2024-12-11 12:37:19', 2024),
(6, 1, '', 'asdsa', 0, 15, '2024-12-11 12:29:01', 2024);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jollibee_category`
--
ALTER TABLE `jollibee_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `jollibee_food`
--
ALTER TABLE `jollibee_food`
  ADD PRIMARY KEY (`food_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jollibee_category`
--
ALTER TABLE `jollibee_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `jollibee_food`
--
ALTER TABLE `jollibee_food`
  MODIFY `food_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
