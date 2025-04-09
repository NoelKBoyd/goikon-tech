import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data (optional - be careful in production!)
    await prisma.$transaction([
        prisma.incidentsReporting.deleteMany(),
        prisma.matchRelatedStats.deleteMany(),
        prisma.matchResult.deleteMany(),
        prisma.matches.deleteMany(),
        prisma.fieldBooking.deleteMany(),
        prisma.fieldMaintenanceSchedule.deleteMany(),
        prisma.revenueAnalytics.deleteMany(),
        prisma.field.deleteMany(),
        prisma.teamRoster.deleteMany(),
        prisma.player.deleteMany(),
        prisma.team.deleteMany(),
        prisma.userActivityLog.deleteMany(),
        prisma.user.deleteMany(),
        prisma.rolePermission.deleteMany(),
        prisma.userRole.deleteMany(),
    ]);

    // Seed UserRoles with permissions
    const roles = await prisma.userRole.createMany({
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

    // Seed Permissions
    await prisma.rolePermission.createMany({
        data: [
            { name: 'manage_users' },
            { name: 'manage_teams' },
            { name: 'manage_matches' },
            { name: 'manage_fields' },
            { name: 'view_reports' },
            { name: 'referee_matches' }
        ],
        skipDuplicates: true
    });

    console.log('Permissions seeded successfully');

    // Associate permissions with roles
    await prisma.$transaction([
        // Admin gets all permissions
        prisma.userRole.update({
            where: { name: 'Admin' },
            data: {
                permissions: {
                    connect: [
                        { name: 'manage_users' },
                        { name: 'manage_teams' },
                        { name: 'manage_matches' },
                        { name: 'manage_fields' },
                        { name: 'view_reports' },
                        { name: 'referee_matches' }
                    ]
                }
            }
        }),
        // Team Manager permissions
        prisma.userRole.update({
            where: { name: 'Team Manager' },
            data: {
                permissions: {
                    connect: [
                        { name: 'manage_teams' },
                        { name: 'view_reports' }
                    ]
                }
            }
        }),
        // Field Owner permissions
        prisma.userRole.update({
            where: { name: 'Field Owner' },
            data: {
                permissions: {
                    connect: [
                        { name: 'manage_fields' },
                        { name: 'view_reports' }
                    ]
                }
            }
        }),
        // Referee permissions
        prisma.userRole.update({
            where: { name: 'Referee' },
            data: {
                permissions: {
                    connect: [
                        { name: 'referee_matches' }
                    ]
                }
            }
        })
    ]);

    console.log('Role-Permission associations seeded successfully');

    // Seed Users with more variety
    const users = await prisma.user.createMany({
        data: [
            {
                name: 'John Doe',
                dateOfBirth: new Date('1990-01-01'),
                email: 'john.doe@example.com',
                password: '$2b$10$EXAMPLEHASH', // In real app, use bcrypt hash
                roleId: 1, // Admin
                phone: '123-456-7890',
                address: '123 Admin St, Adminville'
            },
            {
                name: 'Jane Smith',
                dateOfBirth: new Date('1985-05-15'),
                email: 'jane.smith@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 2, // Team Manager
                phone: '987-654-3210',
                address: '456 Manager Ave, Managertown'
            },
            {
                name: 'Bob Johnson',
                dateOfBirth: new Date('1988-07-20'),
                email: 'bob.johnson@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 2, // Team Manager
                phone: '555-123-4567',
                address: '789 Coach Lane, Coachtown'
            },
            {
                name: 'Alice Fieldson',
                dateOfBirth: new Date('1975-03-10'),
                email: 'alice.fieldson@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 4, // Field Owner
                phone: '555-987-6543',
                address: '321 Field Rd, Fieldville'
            },
            {
                name: 'Mike Reff',
                dateOfBirth: new Date('1982-11-25'),
                email: 'mike.reff@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 5, // Referee
                phone: '555-456-7890',
                address: '654 Ref Lane, Reftown'
            },
            {
                name: 'Player One',
                dateOfBirth: new Date('2000-03-10'),
                email: 'player.one@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 3, // Player
                phone: '555-111-2222'
            },
            {
                name: 'Player Two',
                dateOfBirth: new Date('2001-07-22'),
                email: 'player.two@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 3, // Player
                phone: '555-222-3333'
            },
            {
                name: 'Player Three',
                dateOfBirth: new Date('1999-11-05'),
                email: 'player.three@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 3, // Player
                phone: '555-333-4444'
            },
            {
                name: 'Player Four',
                dateOfBirth: new Date('2002-05-18'),
                email: 'player.four@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 3, // Player
                phone: '555-444-5555'
            },
            {
                name: 'Player Five',
                dateOfBirth: new Date('2000-09-30'),
                email: 'player.five@example.com',
                password: '$2b$10$EXAMPLEHASH',
                roleId: 3, // Player
                phone: '555-555-6666'
            }
        ],
        skipDuplicates: true
    });

    console.log('Users seeded successfully');

    // Seed Activity Logs
    await prisma.userActivityLog.createMany({
        data: [
            {
                userId: 1,
                action: 'Logged in',
                timestamp: new Date('2023-01-01T09:00:00Z')
            },
            {
                userId: 1,
                action: 'Created new team',
                timestamp: new Date('2023-01-01T10:30:00Z')
            },
            {
                userId: 2,
                action: 'Logged in',
                timestamp: new Date('2023-01-02T08:15:00Z')
            },
            {
                userId: 2,
                action: 'Updated player information',
                timestamp: new Date('2023-01-02T09:45:00Z')
            }
        ],
        skipDuplicates: true
    });

    console.log('Activity logs seeded successfully');

    // Seed Teams with more variety
    const teams = await prisma.team.createMany({
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
                managerId: 3, // Bob Johnson
                location: 'Los Angeles',
                ageGroup: 'U21',
                contactInfo: 'team.beta@example.com'
            },
            {
                name: 'Team Gamma',
                managerId: 1, // John Doe
                location: 'Chicago',
                ageGroup: 'U16',
                contactInfo: 'team.gamma@example.com'
            },
            {
                name: 'Team Delta',
                managerId: 2, // Jane Smith
                location: 'Boston',
                ageGroup: 'U18',
                contactInfo: 'team.delta@example.com'
            },
            {
                name: 'Team Epsilon',
                managerId: 3, // Bob Johnson
                location: 'Miami',
                ageGroup: 'U21',
                contactInfo: 'team.epsilon@example.com'
            }
        ],
        skipDuplicates: true
    });

    console.log('Teams seeded successfully');

    // Seed Players with more variety and positions
    const players = await prisma.player.createMany({
        data: [
            // Team Alpha players
            {
                name: 'Player One',
                dateOfBirth: new Date('2005-03-10'),
                teamId: 1, // Team Alpha
                position: 'Forward'
            },
            {
                name: 'Player Two',
                dateOfBirth: new Date('2005-07-22'),
                teamId: 1, // Team Alpha
                position: 'Midfielder'
            },
            {
                name: 'Player Three',
                dateOfBirth: new Date('2005-11-05'),
                teamId: 1, // Team Alpha
                position: 'Defender'
            },
            {
                name: 'Player Four',
                dateOfBirth: new Date('2005-05-18'),
                teamId: 1, // Team Alpha
                position: 'Goalkeeper'
            },
            // Team Beta players
            {
                name: 'Player Five',
                dateOfBirth: new Date('2003-09-30'),
                teamId: 2, // Team Beta
                position: 'Forward'
            },
            {
                name: 'Player Six',
                dateOfBirth: new Date('2003-02-14'),
                teamId: 2, // Team Beta
                position: 'Midfielder'
            },
            {
                name: 'Player Seven',
                dateOfBirth: new Date('2003-08-20'),
                teamId: 2, // Team Beta
                position: 'Defender'
            },
            // Team Gamma players
            {
                name: 'Player Eight',
                dateOfBirth: new Date('2007-04-25'),
                teamId: 3, // Team Gamma
                position: 'Forward'
            },
            {
                name: 'Player Nine',
                dateOfBirth: new Date('2007-06-15'),
                teamId: 3, // Team Gamma
                position: 'Midfielder'
            },
            // Team Delta players
            {
                name: 'Player Ten',
                dateOfBirth: new Date('2005-01-30'),
                teamId: 4, // Team Delta
                position: 'Defender'
            },
            {
                name: 'Player Eleven',
                dateOfBirth: new Date('2005-12-10'),
                teamId: 4, // Team Delta
                position: 'Goalkeeper'
            },
            // Team Epsilon players
            {
                name: 'Player Twelve',
                dateOfBirth: new Date('2003-07-05'),
                teamId: 5, // Team Epsilon
                position: 'Forward'
            }
        ],
        skipDuplicates: true
    });

    console.log('Players seeded successfully');

    // Seed Teams Roster with more realistic data
    await prisma.teamRoster.createMany({
        data: [
            // Team Alpha roster
            {
                teamId: 1,
                playerId: 1,
                currentForm: 'Excellent',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 1,
                playerId: 2,
                currentForm: 'Good',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 1,
                playerId: 3,
                currentForm: 'Average',
                injured: true,
                availabilityStatus: 'Injured - Knee sprain'
            },
            {
                teamId: 1,
                playerId: 4,
                currentForm: 'Good',
                injured: false,
                availabilityStatus: 'Available'
            },
            // Team Beta roster
            {
                teamId: 2,
                playerId: 5,
                currentForm: 'Excellent',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 2,
                playerId: 6,
                currentForm: 'Good',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 2,
                playerId: 7,
                currentForm: 'Poor',
                injured: true,
                availabilityStatus: 'Injured - Ankle fracture'
            },
            // Team Gamma roster
            {
                teamId: 3,
                playerId: 8,
                currentForm: 'Average',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 3,
                playerId: 9,
                currentForm: 'Good',
                injured: false,
                availabilityStatus: 'On vacation'
            },
            // Team Delta roster
            {
                teamId: 4,
                playerId: 10,
                currentForm: 'Excellent',
                injured: false,
                availabilityStatus: 'Available'
            },
            {
                teamId: 4,
                playerId: 11,
                currentForm: 'Good',
                injured: false,
                availabilityStatus: 'Available'
            },
            // Team Epsilon roster
            {
                teamId: 5,
                playerId: 12,
                currentForm: 'Average',
                injured: false,
                availabilityStatus: 'Available'
            }
        ],
        skipDuplicates: true
    });

    console.log('Team Roster seeded successfully');

    // Seed Fields with more details
    const fields = await prisma.field.createMany({
        data: [
            {
                location: 'Central Park Field',
                capacity: 5000,
                amenities: 'Restrooms, Concessions, Lighting, Parking',
                availabilityStatus: 'Available',
                userId: 4 // Alice Fieldson
            },
            {
                location: 'Griffith Park Stadium',
                capacity: 3000,
                amenities: 'Restrooms, Parking',
                availabilityStatus: 'Available',
                userId: 4 // Alice Fieldson
            },
            {
                location: 'Riverside Arena',
                capacity: 2000,
                amenities: 'Restrooms, Lighting',
                availabilityStatus: 'Under Maintenance',
                userId: 4 // Alice Fieldson
            },
            {
                location: 'Sunset Valley Field',
                capacity: 1500,
                amenities: 'Restrooms',
                availabilityStatus: 'Available',
                userId: 4 // Alice Fieldson
            }
        ],
        skipDuplicates: true
    });

    console.log('Fields seeded successfully');

    // Seed Field Maintenance Schedule
    await prisma.fieldMaintenanceSchedule.createMany({
        data: [
            {
                fieldId: 1, // Central Park Field
                scheduleType: 'Monthly',
                scheduleDetails: 'Grass cutting, line marking, facility inspection',
                updates: 'Completed on time',
                issues: 'None'
            },
            {
                fieldId: 1, // Central Park Field
                scheduleType: 'Annual',
                scheduleDetails: 'Full facility overhaul',
                updates: 'Scheduled for next month',
                issues: 'None'
            },
            {
                fieldId: 2, // Griffith Park Stadium
                scheduleType: 'Weekly',
                scheduleDetails: 'Grass maintenance and cleaning',
                updates: 'Ongoing',
                issues: 'Minor damage to the south goalpost'
            },
            {
                fieldId: 3, // Riverside Arena
                scheduleType: 'Emergency',
                scheduleDetails: 'Flood damage repair',
                updates: 'In progress',
                issues: 'Field currently unusable'
            }
        ],
        skipDuplicates: true
    });

    console.log('Field Maintenance Schedule seeded successfully');

    // Seed Revenue Analytics
    await prisma.revenueAnalytics.createMany({
        data: [
            {
                fieldId: 1, // Central Park Field
                fieldUsage: 'High',
                amount: 7500.00
            },
            {
                fieldId: 1, // Central Park Field
                fieldUsage: 'High',
                amount: 8200.00
            },
            {
                fieldId: 2, // Griffith Park Stadium
                fieldUsage: 'Medium',
                amount: 4500.00
            },
            {
                fieldId: 4, // Sunset Valley Field
                fieldUsage: 'Low',
                amount: 2200.00
            }
        ],
        skipDuplicates: true
    });

    console.log('Revenue Analytics seeded successfully');

    // Seed Matches with a full season schedule
    const matches = await prisma.matches.createMany({
        data: [
            // Week 1
            {
                homeTeamId: 1, // Team Alpha
                awayTeamId: 2, // Team Beta
                date: new Date('2023-09-02T14:00:00Z'),
                fieldId: 1, // Central Park Field
                refereeId: 5 // Mike Reff
            },
            {
                homeTeamId: 3, // Team Gamma
                awayTeamId: 4, // Team Delta
                date: new Date('2023-09-03T14:00:00Z'),
                fieldId: 2, // Griffith Park Stadium
                refereeId: 5 // Mike Reff
            },
            // Week 2
            {
                homeTeamId: 2, // Team Beta
                awayTeamId: 5, // Team Epsilon
                date: new Date('2023-09-09T14:00:00Z'),
                fieldId: 1, // Central Park Field
                refereeId: 5 // Mike Reff
            },
            {
                homeTeamId: 4, // Team Delta
                awayTeamId: 1, // Team Alpha
                date: new Date('2023-09-10T14:00:00Z'),
                fieldId: 4, // Sunset Valley Field
                refereeId: 5 // Mike Reff
            },
            // Week 3
            {
                homeTeamId: 5, // Team Epsilon
                awayTeamId: 3, // Team Gamma
                date: new Date('2023-09-16T14:00:00Z'),
                fieldId: 2, // Griffith Park Stadium
                refereeId: 5 // Mike Reff
            },
            {
                homeTeamId: 1, // Team Alpha
                awayTeamId: 3, // Team Gamma
                date: new Date('2023-09-17T14:00:00Z'),
                fieldId: 1, // Central Park Field
                refereeId: 5 // Mike Reff
            },
            // Week 4
            {
                homeTeamId: 2, // Team Beta
                awayTeamId: 4, // Team Delta
                date: new Date('2023-09-23T14:00:00Z'),
                fieldId: 4, // Sunset Valley Field
                refereeId: 5 // Mike Reff
            },
            {
                homeTeamId: 5, // Team Epsilon
                awayTeamId: 1, // Team Alpha
                date: new Date('2023-09-24T14:00:00Z'),
                fieldId: 2, // Griffith Park Stadium
                refereeId: 5 // Mike Reff
            },
            {
                homeTeamId: 1, // Team Alpha
                awayTeamId: 2, // Team Beta
                date: new Date('2025-04-23T14:00:00Z'),
                fieldId: 1, // Central Park Field
                refereeId: 5 // Mike Reff
            }
        ],
        skipDuplicates: true
    });
    

    console.log('Matches seeded successfully');

    // Seed Match Results
    await prisma.matchResult.createMany({
        data: [
            {
                matchId: 1, // Team Alpha vs Team Beta
                homeTeamScore: 3,
                awayTeamScore: 1,
                status: 'Completed',
                timeStamp: new Date('2023-09-02T16:30:00Z'),
                assists: 5,
                yellowCard: 2,
                redCard: 0,
                penalties: 0,
                shotsOnTarget: 12
            },
            {
                matchId: 2, // Team Gamma vs Team Delta
                homeTeamScore: 2,
                awayTeamScore: 2,
                status: 'Completed',
                timeStamp: new Date('2023-09-03T16:30:00Z'),
                assists: 4,
                yellowCard: 1,
                redCard: 1,
                penalties: 0,
                shotsOnTarget: 8
            },
            {
                matchId: 3, // Team Beta vs Team Epsilon
                homeTeamScore: 1,
                awayTeamScore: 0,
                status: 'Completed',
                timeStamp: new Date('2023-09-09T16:30:00Z'),
                assists: 1,
                yellowCard: 3,
                redCard: 0,
                penalties: 0,
                shotsOnTarget: 5
            }
        ],
        skipDuplicates: true
    });

    console.log('Match Results seeded successfully');

    // Seed Match Stats
    await prisma.matchRelatedStats.createMany({
        data: [
            // Match 1 stats
            {
                matchId: 1,
                playerId: 1, // Player One (Team Alpha)
                goals: 2,
                assists: 1,
                yellowCard: 0,
                redCard: 0,
                fouls: 1,
                shotsOnTarget: 4
            },
            {
                matchId: 1,
                playerId: 2, // Player Two (Team Alpha)
                goals: 1,
                assists: 1,
                yellowCard: 0,
                redCard: 0,
                fouls: 2,
                shotsOnTarget: 2
            },
            {
                matchId: 1,
                playerId: 5, // Player Five (Team Beta)
                goals: 1,
                assists: 0,
                yellowCard: 1,
                redCard: 0,
                fouls: 3,
                shotsOnTarget: 3
            },
            // Match 2 stats
            {
                matchId: 2,
                playerId: 8, // Player Eight (Team Gamma)
                goals: 1,
                assists: 1,
                yellowCard: 0,
                redCard: 0,
                fouls: 0,
                shotsOnTarget: 2
            },
            {
                matchId: 2,
                playerId: 10, // Player Ten (Team Delta)
                goals: 1,
                assists: 0,
                yellowCard: 1,
                redCard: 0,
                fouls: 2,
                shotsOnTarget: 1
            },
            {
                matchId: 2,
                playerId: 9, // Player Nine (Team Gamma)
                goals: 0,
                assists: 1,
                yellowCard: 0,
                redCard: 1,
                fouls: 4,
                shotsOnTarget: 0
            },
            // Match 3 stats
            {
                matchId: 3,
                playerId: 5, // Player Five (Team Beta)
                goals: 1,
                assists: 0,
                yellowCard: 1,
                redCard: 0,
                fouls: 2,
                shotsOnTarget: 2
            },
            {
                matchId: 3,
                playerId: 12, // Player Twelve (Team Epsilon)
                goals: 0,
                assists: 0,
                yellowCard: 0,
                redCard: 0,
                fouls: 1,
                shotsOnTarget: 3
            }
        ],
        skipDuplicates: true
    });

    console.log('Match Stats seeded successfully');

    // Seed Incidents Reporting
    await prisma.incidentsReporting.createMany({
        data: [
            {
                matchId: 1, // Team Alpha vs Team Beta
                playerId: 5, // Player Five (Team Beta)
                type: 'Yellow Card',
                suspension: 'None'
            },
            {
                matchId: 2, // Team Gamma vs Team Delta
                playerId: 9, // Player Nine (Team Gamma)
                type: 'Red Card',
                suspension: '1 Match'
            },
            {
                matchId: 2, // Team Gamma vs Team Delta
                playerId: 10, // Player Ten (Team Delta)
                type: 'Yellow Card',
                suspension: 'None'
            },
            {
                matchId: 3, // Team Beta vs Team Epsilon
                playerId: 5, // Player Five (Team Beta)
                type: 'Yellow Card',
                suspension: 'Warning issued'
            },
            {
                matchId: 3, // Team Beta vs Team Epsilon
                playerId: 6, // Player Six (Team Beta)
                type: 'Serious Foul',
                suspension: 'Under review'
            }
        ],
        skipDuplicates: true
    });

    console.log('Incidents Reporting seeded successfully');

    // Seed Field Bookings
    await prisma.fieldBooking.createMany({
        data: [
            {
                teamId: 1, // Team Alpha
                matchId: 1, // Match 1
                fieldId: 1, // Central Park Field
                timing: new Date('2023-09-02T13:00:00Z'), // 1 hour before match
                acceptReject: 'Accepted',
                status: 'Confirmed'
            },
            {
                teamId: 2, // Team Beta
                matchId: 1, // Match 1
                fieldId: 1, // Central Park Field
                timing: new Date('2023-09-02T13:00:00Z'), // 1 hour before match
                acceptReject: 'Accepted',
                status: 'Confirmed'
            },
            {
                teamId: 3, // Team Gamma
                matchId: 2, // Match 2
                fieldId: 2, // Griffith Park Stadium
                timing: new Date('2023-09-03T13:00:00Z'),
                acceptReject: 'Accepted',
                status: 'Confirmed'
            },
            {
                teamId: 4, // Team Delta
                matchId: 2, // Match 2
                fieldId: 2, // Griffith Park Stadium
                timing: new Date('2023-09-03T13:00:00Z'),
                acceptReject: 'Accepted',
                status: 'Confirmed'
            },
            {
                teamId: 1, // Team Alpha
                matchId: 4, // Match 4
                fieldId: 4, // Sunset Valley Field
                timing: new Date('2023-09-10T13:00:00Z'),
                acceptReject: 'Pending',
                status: 'Requested'
            },
            {
                teamId: 2, // Team Beta
                matchId: 3, // Match 3
                fieldId: 1, // Central Park Field
                timing: new Date('2023-09-09T13:00:00Z'),
                acceptReject: 'Accepted',
                status: 'Confirmed'
            },
            {
                teamId: 5, // Team Epsilon
                matchId: 3, // Match 3
                fieldId: 1, // Central Park Field
                timing: new Date('2023-09-09T13:00:00Z'),
                acceptReject: 'Accepted',
                status: 'Confirmed'
            }
        ],
        skipDuplicates: true
    });

    console.log('Field Bookings seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });