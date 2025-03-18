/*
  Warnings:

  - You are about to drop the `match` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fieldbooking` DROP FOREIGN KEY `FieldBooking_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `incidentsreporting` DROP FOREIGN KEY `IncidentsReporting_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_awayTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_fieldId_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_homeTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_refereeId_fkey`;

-- DropForeignKey
ALTER TABLE `matchrelatedstats` DROP FOREIGN KEY `MatchRelatedStats_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `matchresult` DROP FOREIGN KEY `MatchResult_matchId_fkey`;

-- DropIndex
DROP INDEX `FieldBooking_matchId_fkey` ON `fieldbooking`;

-- DropIndex
DROP INDEX `IncidentsReporting_matchId_fkey` ON `incidentsreporting`;

-- DropIndex
DROP INDEX `MatchRelatedStats_matchId_fkey` ON `matchrelatedstats`;

-- DropTable
DROP TABLE `match`;

-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `homeTeamId` INTEGER NOT NULL,
    `awayTeamId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `fieldId` INTEGER NOT NULL,
    `refereeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FieldBooking` ADD CONSTRAINT `FieldBooking_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_homeTeamId_fkey` FOREIGN KEY (`homeTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_awayTeamId_fkey` FOREIGN KEY (`awayTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_refereeId_fkey` FOREIGN KEY (`refereeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchResult` ADD CONSTRAINT `MatchResult_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidentsReporting` ADD CONSTRAINT `IncidentsReporting_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchRelatedStats` ADD CONSTRAINT `MatchRelatedStats_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
