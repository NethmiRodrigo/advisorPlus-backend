--execute this sql query before sp
ALTER TABLE `advisor_profile` CHANGE `ratings` `ratings` INT(10) NOT NULL DEFAULT '0';

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_advisors`(IN `id` CHAR(36))
SELECT * FROM advisor_profile
WHERE user_id=id$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_advisor`(IN `id` CHAR(36))
DELETE FROM `advisor_profile` WHERE user_id = id$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(IN `id` CHAR(36), IN `full_name` VARCHAR(30), IN `username` VARCHAR(10), IN `gender` VARCHAR(10), IN `age` INT(10), IN `DOB` DATE, IN `date_reg` DATE, IN `status_id` INT(5), IN `image` LONGBLOB)
    NO SQL
INSERT into user_profile
values(id,full_name,username,gender,age,DOB,date_reg,status_id,image)$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_advisor`(IN `id` CHAR(36), IN `full_name` VARCHAR(30), IN `username` VARCHAR(10), IN `date_reg` DATE, IN `status_id` INT(5), IN `position` VARCHAR(10), IN `qualification` VARCHAR(10), IN `experience` INT(10), IN `image` LONGBLOB)
    NO SQL
INSERT into advisor_profile 
(user_id,full_name,username,date_registered,status_id,position,qualification,experience,image)
values(id,full_name,username,date_reg,status_id,position,qualification,experience,image)$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(IN `user_id` CHAR(36))
DELETE FROM `user_profile` WHERE id = user_id$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_advisor_service`(IN `user_id` CHAR(36), IN `service_id` INT(10))
INSERT into advisor_services
VALUES (user_id,service_id)$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_services`()
select * from service_type$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users`(IN `id` CHAR(36))
SELECT * FROM user_profile
WHERE id=id$$
DELIMITER ;

