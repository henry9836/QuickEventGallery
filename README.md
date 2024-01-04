# SimpleEventGallery

```
CREATE TABLE `gallery` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`filename` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  	`eventId` INT not NULL,
	UNIQUE (`filename`),
	PRIMARY KEY (`id`)
);
```
