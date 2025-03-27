const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed UserRoles
    await prisma.userRole.createMany({
        data: [
            { name: 'Admin' },
            { name: 'Team Manager' },
            { name: 'Player' },
            { name: 'Field Owner' },
            { name: 'Referee' }
        ],
        skipDuplicates: true
    });

    console.log('Roles seeded successfully');

    // Seed Users
    await prisma.user.createMany({
        data: [
            {
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                email: 'john.doe@example.com',
                password: 'password123',
                roleId: 1, // Admin
                phone: '123-456-7890'
            },
            {
                name: 'Jane Smith',
                dateOfBirth: new Date('1985-05-15'),
                email: 'jane.smith@example.com',
                password: 'password123',
                roleId: 2, // Team Manager
                phone: '987-654-3210'
            },
            {
                name: 'Burger Boy',
                dateOfBirth: new Date('1985-05-15'),
                email: 'Burger.Boy@example.com',
                password: 'password123',
                roleId: 2, // Team Manager
                phone: '987-654-3210'
            },
            {
                name: 'Mike Johnson',
                dateOfBirth: new Date('1995-08-20'),
                email: 'mike.johnson@example.com',
                password: 'password123',
                roleId: 3, // Player
                phone: '555-555-5555'
            },

            {
                name: 'Referee One',
                dateOfBirth: new Date('1975-09-12'),
                email: 'referee.one@example.com',
                password: 'password123',
                roleId: 5,
                phone: '111-222-3333'
            }
        ],
        skipDuplicates: true
    });

    console.log('Users seeded successfully');

    // Seed Teams
    await prisma.team.createMany({
        data: [
            {
                name: 'Team Alpha',
                managerId: 2, // Jane Smith
                location: 'New York',
                ageGroup: 'U18',
                contactInfo: 'team.alpha@example.com'
            },
            {
                name: 'Team Beta',
                managerId: 2, // Jane Smith
                location: 'Los Angeles',
                ageGroup: 'U21',
                contactInfo: 'team.beta@example.com'
            },
            {
                name: 'Team Gamma',
                managerId: 1, 
                location: 'Chicago',
                ageGroup: 'U16',
                contactInfo: ''
            }
        ],
        skipDuplicates: true
    });

    console.log('Teams seeded successfully');

    // Seed Players
    await prisma.player.createMany({
        data: [
            {
                name: 'Player One',
                dateOfBirth: new Date('2000-03-10'),
                teamId: 1, // Team Alpha
                position: 'Forward'
            },
            {
                name: 'Player Two',
                dateOfBirth: new Date('2001-07-22'),
                teamId: 1, // Team Alpha
                position: 'Midfielder'
            },
            {
                name: 'Player Three',
                dateOfBirth: new Date('1999-11-05'),
                teamId: 2, // Team Beta
                position: 'Defender'
            }
        ],
        skipDuplicates: true
    });

    console.log('Players seeded successfully');

    // Seed Fields
    await prisma.field.createMany({
        data: [
            {
                location: 'Central Park',
                capacity: 5000,
                amenities: 'Restrooms, Concessions',
                availabilityStatus: 'Available',
                userId: 4 // Field Owner
            },
            {
                location: 'Griffith Park',
                capacity: 3000,
                amenities: 'Restrooms',
                availabilityStatus: 'Available',
                userId: 4 // Field Owner
            }
        ],
        skipDuplicates: true
    });

    console.log('Fields seeded successfully');

    // Seed Matches
    await prisma.matches.create({
        data: [
            {
                homeTeamId: 1, // Team Alpha
                awayTeamId: 2, // Team Beta
                date: new Date('2023-10-15T14:00:00Z'),
                fieldId: 1, // Central Park
                refereeId: 5 // Referee
            },
            {
                homeTeamId: 2, // Team Beta
                awayTeamId: 1, // Team Alpha
                date: new Date('2023-10-22T14:00:00Z'),
                fieldId: 2, // Griffith Park
                refereeId: 5 // Referee
            }
        ],
        skipDuplicates: true
    });
    

    console.log('Matches seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });