-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_managerId_fkey`;

-- DropIndex
DROP INDEX `Team_managerId_key` ON `team`;


