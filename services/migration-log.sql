CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT '0',
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `is_active` int DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `created_dt` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_dt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `user_asset_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_d` int(11) DEFAULT NULL,
  `asset_id` int(11) DEFAULT 0,
  `created_by` int DEFAULT NULL,
  `created_dt` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_dt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_d) REFERENCES users(id)
);



CREATE TABLE `user_transections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `tid` int(10) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `trxn_type`  varchar(10) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_dt` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_dt` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_d) REFERENCES users(id)
);