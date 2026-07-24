CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`parent_name` text NOT NULL,
	`mobile` text NOT NULL,
	`email` text,
	`year_level` text NOT NULL,
	`interest` text NOT NULL,
	`preferred_time` text,
	`landing_page` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`utm_content` text,
	`utm_term` text
);
