-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 09:02 AM
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
  `category_image` varchar(30) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jollibee_category`
--

INSERT INTO `jollibee_category` (`category_aid`, `category_is_active`, `category_image`, `category_title`, `category_datetime`, `category_created`) VALUES
(16, 1, 'nav-burger.webp', 'Burger', '2024-12-11 15:04:27', 2024),
(18, 1, 'nav-palabok.webp', 'Palabok', '2024-12-11 15:04:40', 2024),
(21, 1, 'nav-burger-steak.webp', 'Burger Steak', '2024-12-11 15:05:24', 2024),
(22, 1, 'nav-desserts.webp', 'Desserts', '2024-12-11 15:05:37', 2024),
(23, 1, 'nav-spaghetti.webp', 'Spaghetti', '2024-12-11 15:22:58', 2024),
(24, 1, 'nav-chickenjoybucket.webp', 'Chicken Joy', '2024-12-11 15:18:45', 2024),
(31, 1, 'nav-sides.webp', 'Sides', '2024-12-11 15:06:20', 2024),
(32, 1, 'nav-value-meal.webp', 'Value Meal', '2024-12-11 15:06:39', 2024);

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
(7, 1, '', '2 pc Chickenjoy', 189, 15, '2024-12-11 13:40:57', 2024),
(8, 1, 'spag-1.webp', 'Jolly Spaghetti', 67, 23, '2024-12-11 15:38:43', 2024),
(9, 1, 'palabok-1.webp', 'Palabok', 89, 18, '2024-12-11 15:38:58', 2024),
(10, 1, 'chicken-1.webp', 'Chicken', 89, 24, '2024-12-11 15:39:36', 2024),
(11, 1, 'sides-1.webp', 'Fries', 67, 31, '2024-12-11 15:40:47', 2024),
(12, 1, 'dessert-1.webp', 'Peach Mango Pie', 34, 22, '2024-12-11 15:40:39', 2024),
(13, 1, 'value-meal-1.webp', 'Value Meal 1', 54, 32, '2024-12-11 15:41:58', 2024),
(14, 1, 'steak-1.webp', 'Burger Steak 1', 87, 21, '2024-12-11 15:42:23', 2024),
(15, 1, 'burger-1.webp', 'YumBurger', 34, 16, '2024-12-11 15:42:43', 2024);

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
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `jollibee_food`
--
ALTER TABLE `jollibee_food`
  MODIFY `food_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
