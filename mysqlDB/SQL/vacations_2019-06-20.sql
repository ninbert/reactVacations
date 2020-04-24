-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 06, 2019 at 01:25 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `vacation`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mail`, `password`, `role`) VALUES
(1, 'John ', 'Doe', 'JD@gmail.com', '00000000', 0),
(2, 'Nico', 'Ryan', 'NR@gmail.com', '00000000', 0),
(3, 'Brett ', 'Tran', 'BT@gmail.com', '00000000', 0),
(4, 'Aleena ', 'Randall', 'AR@gmail.com', '00000000', 0),
(5, 'Cannon ', 'Cline', 'CC@gmail.com', '00000000', 0),
(6, 'Jaiden ', 'Rosales', 'JR@gmail.com', '00000000', 0),
(7, 'Admin', 'Admin', 'Admin@gmail.com', 'Admin', 1),
(8, 'Gim', 'Tron', 'JB13@gmail.com', '123456abc', 0),
(9, 'Leon', 'Reilly', 'Gillete54@gmail.com', '$2a$10$7x59fRj7XlDXY4BQMnchDu5O.oQ13cQO8RVQAmGL8imrDGwZHUhve', 0),
(10, 'Harry', 'Rizzy', 'Rizzte15@gmail.com', '$2a$10$D6ohOS5sKlMBJgxYM5m0.ew/c6RcGsaRarOR225mTrHz8oBFTGc0q', 0),
(11, 'Elias', 'Gutenberg', 'elgu@gmail.com', '$2a$10$yoyYDvFCIaZmCihtOm4I2ebZMpFOD86ujLKS11.6V1zWiQR9Q9t4W', 0),
(12, 'Elsefar', 'Arias', 'elsefar@gmail.com', '$2a$10$wRhVQNG/v07KEMGoRkgHpOQVhZuhOFrUZwGckyrRNpbniUPxC82yi', 0),
(13, 'Shirelle', 'Pelles', 'shir2020@gmail.com', '$2a$10$E1KBx96/d4IREX9zcKiqYuD.hu.BdwTghU4VdNzpHTasfoZzwZJFO', 1),
(14, 'Shir', 'Gloach', 'shirelleg@gmail.com', '$2a$10$RWruTU/nIL0jXerCoDIsqOn7beXQRl6soiKdbadxijF2J6/ROHt4K', 0),
(15, 'Shir', 'Gloach', 'shirellegl@gmail.com', '$2a$10$b2OLKfb.bd9FCaxvkiCLzOFVJLfYsUq7/nGHRAGFls/Ry6R9v44ti', 0),
(16, 'shir', 'peles', 'shirellegloach@gmail.com', '$2a$10$jhDBGKf.t7aUYJYrP6UTb.fQ0ShB1q2e/FHWBTpdrMA5XdDcW7Vd2', 0),
(17, 'ella', 'peles', 'ellapeles3@gmail.com', '$2a$10$NxUi6jdlzTYTuxvfyzPnl.jnlhHzYpy4bsAWR.qnki7YIlMRiZX3S', 0),
(18, 'dfsdf', 'fdfasd', 'dfsf@gmail.com', '$2a$10$.pQOk2q6LxEa6bswt8q/YuIFnzaUMeGFFlkrE/MaKRBqV5pukiz9K', 0),
(19, 'tai ', 'alt', 'taialt@gmail.com', '$2a$10$/IyAcb2QH/j2zCoxNAZrTeN3.FkTcffkGoDbTlqwnP6ordtorCowm', 0),
(20, 'shay', 'lusky', 'shay123@gmail.com', '$2a$10$Wa3T0mJ7.T9auTDSn6xU7.CbBG0y2fS5WIEWJvxKoaQnvolgg28im', 0),
(21, 'elick', 'shitrit', 'elick123@gmail.com', '$2a$10$sSSIEq9s2KZwNB7f6z3IUupLeHPOSVUKVzbv0d.Q3w04BDZoqdmum', 0),
(22, 'Anna ', 'Pry', 'annap@gmail.com', '$2a$10$DRGRVhNEyYuQ3HGMCyH4yeVzL8fvkl29CWrlCZXUK4EiPRJDcELPq', 0),
(23, 'Anna ', 'Pry ', 'annapr@gmail.com', '$2a$10$GE.41aZ3S2Vvx4J224393.FyjHpQyVOG/.taK68YI8EnvGQNCyU62', 0),
(24, 'shay', 'luski', 'shay2019@gmail.com', '$2a$10$Mm.o38XSbJevYrz7/5xwx.qdynXYHjGFIK4S5Yn1yKHIjxJ5vo3Pq', 0),
(25, 'ido ', 'galili', 'idogalili2019@gmail.com', '$2a$10$laLofCZqftQnuudRlFUluO0wdX/iXEg9w.Yf/Vz4rdCuNlmEq9aMC', 0),
(26, 'yosef', 'hagever', 'yosef2019@gmail.com', '$2a$10$usuoidRlyG7EiJ.MO/xh6uI6eSJ.OhKCcup7WHp0lOtf9s48n.KG.', 0),
(27, 'yoni', 'yoni', 'yoni2019@gmail.com', '$2a$10$TEWJRuMA7ZZ3YSu08Pi.zOnpz/Lht68YKx4xP/UB61ASCa3VNpJg.', 0),
(28, 'basem', 'boirat', 'basem2019@gmail.com', '$2a$10$awKWEq9oaQIctL1EFlbyOuSm1QVPwHSW6iBTwW9nZnxv3r.mjfZZi', 0),
(29, 'shahaf', 'levy', 'shahaf2019@gmail.com', '$2a$10$0AZANYw0XrNCcrmTY5pkZOahFpk6Z3gH00aKkFd2JAc26CHXOFVha', 0),
(30, 'user', 'user1', 'user@gmail.com', '$2a$10$lTJhiYuxa.PGlKe7KEmOV.zzZ3hxfCQAYMx8ssqWYWmo3OzsHcqpa', 0),
(31, 'Adele', 'Bar Tob', 'adel2019@gmail.com', '$2a$10$hmM6vCXDMdUqgHgy6f1qLeSkYXWjyUA86aA15vWkCh9fCwREAgxhq', 0),
(32, 'shir', 'peles', 'shir2910@gmail.com', '$2a$10$vS8jmQsz0uW42kXjGR4pE.IqPixhSAcjsJaaBNnkRmKYaJUMd.ycW', 1),
(33, 'albert', 'einstein', 'alstein@gmail.com', '$2a$10$rw4Yp9cMGYwI5YhYwteGhelL1Wim1L8da6n8vpXVgo03MI2ABB5M6', 0),
(34, 'Robert', 'Gloach', 'ninbert@gmail.com', '$2a$10$37OUnGcAZRWFENFNG6ETxunjbEYA./q5s0BErg/shBn3rGlFFxgB.', 0),
(35, 'hagit', 'gez', 'hagit@gmail.com', '$2a$10$VRdPdymoYyaoasu2oi5shes2vxQmY13C2thfm7.h8a7cJVkg5ky1G', 0),
(36, 'shay ', 'lousky', 'shayadmin@gmail.com', '$2a$10$tjVgl9vks5FI8Ace8EKB1e3HENIcblPIuQZXEi0ey3YYe4Ttoy6/C', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_vacation`
--

CREATE TABLE `users_vacation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_vacation`
--

INSERT INTO `users_vacation` (`id`, `user_id`, `vacation_id`) VALUES
(1, 2, 12),
(2, 1, 2),
(3, 6, 6),
(4, 5, 5),
(5, 4, 10),
(6, 3, 10),
(8, 34, 9),
(9, 34, 14),
(11, 34, 5),
(12, 34, 4),
(13, 35, 2),
(14, 35, 6),
(15, 35, 1),
(16, 35, 3),
(17, 35, 22),
(18, 35, 5),
(19, 35, 7),
(20, 35, 4),
(21, 35, 8),
(22, 35, 9),
(23, 35, 11),
(25, 34, 1),
(26, 2, 4),
(27, 1, 9),
(28, 2, 5),
(29, 2, 2),
(30, 3, 8),
(31, 3, 3),
(32, 4, 8),
(33, 4, 9),
(34, 4, 4),
(35, 5, 8),
(36, 5, 2),
(37, 5, 1),
(38, 6, 11),
(39, 7, 9),
(40, 7, 5),
(41, 7, 15),
(42, 7, 8),
(43, 7, 23),
(44, 8, 8),
(45, 8, 9),
(46, 8, 7),
(47, 9, 8),
(48, 9, 2),
(49, 9, 1),
(50, 9, 12),
(51, 10, 15),
(52, 10, 11),
(53, 10, 1),
(54, 10, 14),
(55, 11, 1),
(56, 11, 13),
(57, 11, 2),
(58, 11, 14),
(59, 12, 13),
(60, 12, 1),
(61, 34, 24),
(62, 13, 12),
(63, 13, 2),
(64, 13, 6),
(65, 14, 5),
(66, 14, 10),
(67, 14, 10),
(68, 14, 10),
(69, 15, 9),
(70, 16, 14),
(71, 16, 2),
(72, 16, 5),
(73, 17, 4),
(74, 18, 2),
(75, 19, 6),
(76, 34, 6),
(85, 34, 17),
(86, 34, 13),
(87, 34, 16),
(88, 34, 19);

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price_usd` int(11) NOT NULL,
  `price_nis` int(11) NOT NULL,
  `description` text NOT NULL,
  `edit_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`id`, `title`, `location`, `image`, `start_date`, `end_date`, `price_usd`, `price_nis`, `description`, `edit_date`) VALUES
(1, 'Israel - Switzerland', 'Ben Gurion - Geneva', 'Uploads/myImage-1562417799047.jpg', '2019-04-30', '2019-05-05', 5671, 8988321, 'Description', '2019-05-07 11:02:27'),
(2, 'Israel - Italy', 'Ben Gurion - Rome', 'http://s1.travix.com/eu/europe-italy-rome-collosseum-3-medium.jpg', '2019-04-30', '2019-05-05', 350, 1258, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-14 23:02:27'),
(3, 'Israel - Hungary', 'Ben Gurion - Budapest', 'https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5515999951001_5214933106001-vs.jpg?pubId=5104226627001&videoId=5214933106001', '2019-04-30', '2019-05-05', 150, 539, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-15 16:02:27'),
(4, 'Israel - Canada', 'Ben Gurion - Montreal', 'https://www.quebecoriginal.com/sites/default/files/h-montreal_3.jpg', '2019-04-30', '2019-05-05', 1200, 4314, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-03 13:02:27'),
(5, 'Israel - New York', 'Ben Gurion - New York City', 'https://thenypost.files.wordpress.com/2019/03/190309-nyc-bankrupt.jpg?quality=90&strip=all&w=618&h=410&crop=1', '2019-04-30', '2019-05-05', 950, 3415, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-15 11:16:00'),
(6, 'Israel - Germany', 'Ben Gurion - Berlin', 'https://cache-graphicslib.viator.com/graphicslib/mm/19/berlin-city-hop-on-hop-off-tour-155219-raw.jpg', '2019-04-30', '2019-05-05', 300, 1078, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-05 16:02:27'),
(7, 'Israel - East Africa', 'Ben Gurion - Uganda', 'https://media-cdn.tripadvisor.com/media/photo-s/10/e5/4a/47/the-sina-village-in-uganda.jpg', '2019-04-30', '2019-05-05', 500, 1797, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-04-16 08:02:27'),
(8, 'Israel - South Africa', 'Ben Gurion - Cape Town', 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Africa/South%20Africa/Cape%20Town/cape-town-guides-lead.jpg?imwidth=450', '2019-04-30', '2019-05-05', 356, 1280, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-02 06:02:27'),
(9, 'Israel - Wakanda', 'Ben Gurion - Wakanda', 'https://media.architecturaldigest.com/photos/5a970759891f6e6a41b121d4/16:9/w_1280,c_limit/STT0020_v014_031049.1092.jpg', '2019-04-30', '2019-05-05', 150, 539, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-12 14:02:27'),
(10, 'Israel - Space', 'Ben Gurion - Death Star', 'https://cdn.newsledge.com/wp-content/uploads/2016/08/death-star-featured.jpg', '2019-04-30', '2019-05-05', 30, 108, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-11 11:02:27'),
(11, 'Israel - Russia', 'Ben Gurion - Moscow', 'https://cdn.cnn.com/cnnnext/dam/assets/180531144551-06-moscow-attractions---moscow-state-university.jpg', '2019-04-30', '2019-05-05', 275, 989, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-03-15 16:02:27'),
(12, 'Israel - Japan', 'Ben Gurion - Tokyo', 'https://www.rantapallo.fi/wp-content/uploads/2018/08/japani-tokio-temppeli-geishat-ss.jpg', '2019-04-30', '2019-05-05', 1232, 4429, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolor impedit quaerat, numquam corporis laboriosam, a non expedita ab nihil aut ut repudiandae eveniet quibusdam excepturi obcaecati similique? Corporis, hic!', '2019-05-09 14:02:27'),
(13, 'Chile', 'Chile', 'Uploads/myImage-1562415757446.jpg', '2019-05-15', '2019-06-09', 342, 4389, 'Description', '2019-05-14 12:54:27'),
(14, 'China', 'China', 'Uploads/myImage-1562415907503.jpg', '2019-05-15', '2019-05-16', 21342, 43214, 'Description', '2019-05-15 16:02:27'),
(15, 'Thailand', 'Ben Gurion - Koh Samuy', 'Uploads/myImage-1562418540036.jpg', '2019-05-23', '2019-06-17', 3213, 6782, 'Description', '2019-05-16 11:41:21'),
(16, 'Mexico', 'Mexico', 'Uploads/myImage-1562415942133.jpg', '2019-06-09', '2019-06-10', 1231, 4321, 'Description', '2019-05-18 15:32:52'),
(17, 'Israel - Norway', 'Oslo', 'Uploads/myImage-1562415738945.jpg', '2019-06-24', '2019-06-30', 1453, 4441, 'Description', '2019-05-18 18:29:14'),
(18, 'Malaysia', 'Malaysia', 'Uploads/myImage-1562416021607.jpeg', '2019-06-13', '2019-07-15', 889, 9800, 'Description', '2019-06-04 11:48:08'),
(19, 'Macao', 'Macao', 'Uploads/myImage-1562415698573.jpeg', '2019-06-19', '2019-07-15', 3211, 12312, 'Description', '2019-06-21 19:57:18'),
(21, 'Iceland', 'Israel - Reykjavik', 'Uploads/myImage-1562418735885.jpg', '2019-07-19', '2019-08-13', 3211, 32114, 'description', '2019-07-06 16:12:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_vacation`
--
ALTER TABLE `users_vacation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users_vacation`
--
ALTER TABLE `users_vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;