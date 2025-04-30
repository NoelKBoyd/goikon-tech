'use client';

import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import { useState } from 'react';

const bookingData = [
    {
        teamId: 1,
        matchId: 1,
        fieldId: 1,
        timing: new Date('2023-09-02T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 2,
        matchId: 1,
        fieldId: 1,
        timing: new Date('2023-09-02T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 3,
        matchId: 2,
        fieldId: 2,
        timing: new Date('2023-09-03T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 4,
        matchId: 2,
        fieldId: 2,
        timing: new Date('2023-09-03T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 1,
        matchId: 4,
        fieldId: 4,
        timing: new Date('2023-09-10T13:00:00Z'),
        acceptReject: 'Pending',
        status: 'Requested'
    },
    {
        teamId: 2,
        matchId: 3,
        fieldId: 1,
        timing: new Date('2023-09-09T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 5,
        matchId: 3,
        fieldId: 1,
        timing: new Date('2023-09-09T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    }
];

const fieldNames = {
    1: 'Central Park Field',
    2: 'Griffith Park Stadium',
    4: 'Sunset Valley Field'
};

const teamNames = {
    1: 'Team Alpha',
    2: 'Team Beta',
    3: 'Team Gamma',
    4: 'Team Delta',
    5: 'Team Epsilon'
};

const Notifications = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
                <FieldOwnerSideBar className='col-start-1 col-end-2' />

                <div className='col-start-2 col-end-3 p-10'>
                    <h1 className="text-2xl font-bold mb-6">Notifications</h1>

                    <div className="space-y-4">
                        {bookingData.map((booking, index) => {
                            const team = teamNames[booking.teamId];
                            const field = fieldNames[booking.fieldId];
                            const date = new Date(booking.timing).toLocaleString();

                            let message = '';
                            if (booking.status === 'Requested') {
                                message = `${team} has requested a booking for ${field} on ${date}.`;
                            } else if (booking.status === 'Confirmed') {
                                message = `${team} has a confirmed match at ${field} on ${date}.`;
                            }

                            return (
                                <div key={index} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                                    <p className="text-gray-800">{message}</p>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        booking.acceptReject === 'Accepted' ? 'bg-green-100 text-green-800' :
                                        booking.acceptReject === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {booking.acceptReject}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <footer>
                <FieldOwnerFooter />
            </footer>
        </div>
    );
};

export default Notifications;
