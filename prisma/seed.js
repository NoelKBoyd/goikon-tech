import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.userRole.createMany({
        data: [
            { name: 'user' },
            { name: 'admin' },
            { name: 'manager' },
            { name: 'player' },
            { name: 'field owner' }
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
