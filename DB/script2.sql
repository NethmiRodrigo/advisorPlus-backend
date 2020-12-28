
--- post has an advisor id if the audience type is private
ALTER TABLE `post` CHANGE `advisor_id` `advisor_id` CHAR(36) NOT NULL;

--- drop this column
ALTER TABLE `post_status` DROP `consultant_id`;


ALTER TABLE `post` ADD CONSTRAINT `advisor_fk` FOREIGN KEY (`advisor_id`) REFERENCES `advisor_profile`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;