CREATE TABLE `userSchema` (
  `_id` string PRIMARY KEY,
  `password` String,
  `name` String,
  `number` Number,
  `DOB` Date,
  `balance` Number
);

CREATE TABLE `statementSchema` (
  `_id` String PRIMARY KEY,
  `location` String,
  `cost` Number,
  `name` String,
  `date` Date
);

ALTER TABLE `statementSchema` ADD FOREIGN KEY (`_id`) REFERENCES `statementSchema` (`name`);
