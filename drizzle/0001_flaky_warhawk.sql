CREATE INDEX `leads_mobile_created_idx` ON `leads` (`mobile`,`created_at`);--> statement-breakpoint
CREATE INDEX `leads_status_created_idx` ON `leads` (`status`,`created_at`);