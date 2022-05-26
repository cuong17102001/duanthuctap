-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 26, 2022 lúc 07:51 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `thuctap`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `employees`
--

INSERT INTO `employees` (`id`, `username`, `password`, `name`, `date`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '123456', 'nguyễn quốc cường', '17/10/2001', 0, '2022-05-24 14:47:00', '2022-05-24 14:47:00'),
(2, 'user1', '123456', 'cường', '18/6/2020', 1, '2022-05-24 16:21:24', '2022-05-24 16:21:24'),
(6, 'user7', '123456', 'nguyễn văn b', '17/4/2021', 1, '2022-05-25 22:19:00', '2022-05-25 22:19:00'),
(7, 'user2', '123456', 'cường 123', '17/4/2021', 1, '2022-05-26 15:42:22', '2022-05-26 21:22:29'),
(8, 'user2', '123456', 'cường đẳng cấp', '17/4/2021', 1, '2022-05-26 17:16:25', '2022-05-26 17:44:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pointtypes`
--

CREATE TABLE `pointtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `pointtypes`
--

INSERT INTO `pointtypes` (`id`, `name`, `point`, `createdAt`, `updatedAt`) VALUES
(1, 'đi muộn', -2, '2022-05-24 18:08:35', '2022-05-24 18:08:35'),
(2, 'đi sớm', 2, '2022-05-24 18:08:44', '2022-05-24 18:08:44'),
(8, 'chơi game', -5, '2022-05-26 21:57:23', '2022-05-26 23:13:14'),
(9, 'đi chơi', -9, '2022-05-27 00:09:25', '2022-05-27 00:09:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rewardpoints`
--

CREATE TABLE `rewardpoints` (
  `id` int(11) NOT NULL,
  `idEmployee` int(11) DEFAULT NULL,
  `idType` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rewardpoints`
--

INSERT INTO `rewardpoints` (`id`, `idEmployee`, `idType`, `date`, `createdAt`, `updatedAt`) VALUES
(11, 2, 2, '2022-06-08', '2022-05-25 20:45:31', '2022-05-25 20:45:31'),
(14, 6, 1, '2022-05-06', '2022-05-25 22:19:06', '2022-05-25 22:19:06'),
(16, 2, 1, '2022-05-26', '2022-05-26 17:12:01', '2022-05-26 17:12:01'),
(17, 2, 1, '2022-05-13', '2022-05-26 17:12:07', '2022-05-26 17:12:07'),
(23, 2, 1, '2022-04-28', '2022-05-26 21:21:43', '2022-05-26 21:21:43'),
(24, 8, 8, '2022-05-26', '2022-05-26 21:59:27', '2022-05-26 21:59:27'),
(26, 8, 1, '2022-05-27', '2022-05-26 23:54:17', '2022-05-26 23:54:17'),
(27, 8, 2, '2022-05-26', '2022-05-26 23:54:30', '2022-05-26 23:54:30'),
(28, 8, 9, '2022-05-26', '2022-05-27 00:09:37', '2022-05-27 00:09:37'),
(29, 8, 9, '2022-04-22', '2022-05-27 00:10:06', '2022-05-27 00:10:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-employee.js'),
('migration-create-pointtype.js'),
('migration-create-rewardpoints.js');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pointtypes`
--
ALTER TABLE `pointtypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rewardpoints`
--
ALTER TABLE `rewardpoints`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `pointtypes`
--
ALTER TABLE `pointtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `rewardpoints`
--
ALTER TABLE `rewardpoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
