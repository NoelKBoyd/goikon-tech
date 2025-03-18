-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_managerId_fkey`;

-- DropIndex
DROP INDEX `Team_managerId_key` ON `team`;

-- AddForeignKey
ALTER TABLE `RevenueAnalytics` ADD CONSTRAINT `RevenueAnalytics_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
