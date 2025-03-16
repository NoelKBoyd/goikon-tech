import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.userRole.createMany({
        data: [
            { name: 'Admin' },
            { name: 'Team Manager' },
            { name: 'Player' },
            { name: 'Field Owner' },
            { name: 'Referee' }
        ],
        skipDuplicates: true  // Prevents duplicate entries
    });

    console.log('Roles seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
