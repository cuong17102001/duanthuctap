-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 29, 2022 lúc 12:13 PM
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
-- Cấu trúc bảng cho bảng `criteria`
--

CREATE TABLE `criteria` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `criteria`
--

INSERT INTO `criteria` (`id`, `name`, `point`, `createdAt`, `updatedAt`) VALUES
(1, 'chơi game', -9, '2022-05-28 13:08:49', '2022-05-29 16:05:10'),
(3, 'đi sớm', 2, '2022-05-28 15:35:44', '2022-05-28 15:35:44'),
(5, 'đi muộn', -10, '2022-05-29 00:35:21', '2022-05-29 00:35:21');

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
(11, 'user4', '123456', 'trùm', '17/4/2021', 1, '2022-05-29 15:59:24', '2022-05-29 15:59:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rewardpoints`
--

CREATE TABLE `rewardpoints` (
  `id` int(11) NOT NULL,
  `idEmployee` int(11) DEFAULT NULL,
  `idCriteria` int(11) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rewardpoints`
--

INSERT INTO `rewardpoints` (`id`, `idEmployee`, `idCriteria`, `point`, `date`, `createdAt`, `updatedAt`) VALUES
(7, 1, 3, 2, '2022-05-28', '2022-05-29 03:16:23', '2022-05-29 03:16:23'),
(8, 2, 5, -10, '2022-05-28', '2022-05-29 03:16:26', '2022-05-29 03:16:26'),
(9, 6, 5, -10, '2021-05-28', '2022-05-29 03:16:31', '2022-05-29 03:16:31'),
(10, 2, 3, 2, '2022-05-28', '2022-05-29 03:16:34', '2022-05-29 03:16:34'),
(11, 1, 1, -5, '2022-05-28', '2022-05-29 03:17:29', '2022-05-29 03:17:29'),
(12, 2, 1, -5, '2022-04-06', '2022-05-29 11:25:43', '2022-05-29 11:25:43'),
(13, 7, 1, -5, '2022-04-09', '2022-05-29 11:25:51', '2022-05-29 11:25:51'),
(14, 2, 3, 2, '2022-04-07', '2022-05-29 15:29:53', '2022-05-29 15:29:53'),
(15, 7, 3, 2, '2022-05-29', '2022-05-29 15:58:03', '2022-05-29 15:58:03'),
(16, 7, 1, -9, '2022-05-20', '2022-05-29 17:08:22', '2022-05-29 17:08:22');

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
('migration-create-criteria.js'),
('migration-create-employee.js'),
('migration-create-rewardpoints.js');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
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
-- AUTO_INCREMENT cho bảng `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `rewardpoints`
--
ALTER TABLE `rewardpoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
