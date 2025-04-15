-- CreateTable
CREATE TABLE `RefereePerformance` (
    `matchId` INTEGER NOT NULL,
    `refereeId` INTEGER NOT NULL,
    `refereeRating` INTEGER NOT NULL,

    PRIMARY KEY (`matchId`, `refereeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefereePerformance` ADD CONSTRAINT `RefereePerformance_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefereePerformance` ADD CONSTRAINT `RefereePerformance_refereeId_fkey` FOREIGN KEY (`refereeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
