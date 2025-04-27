'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import { useState } from 'react';

const FieldBookings = () => {
    const [bookings, setBookings] = useState([
        {
            teamName: 'Team Alpha',
            matchId: 1,
            fieldId: 1,
            timing: new Date('2023-09-02T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
        {
            teamName: 'Team Beta',
            matchId: 1,
            fieldId: 1,
            timing: new Date('2023-09-02T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
        {
            teamName: 'Team Gamma',
            matchId: 2,
            fieldId: 2,
            timing: new Date('2023-09-03T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
        {
            teamName: 'Team Delta',
            matchId: 2,
            fieldId: 2,
            timing: new Date('2023-09-03T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
        {
            teamName: 'Team Alpha',
            matchId: 4,
            fieldId: 4,
            timing: new Date('2023-09-10T13:00:00Z'),
            acceptReject: 'Pending',
            status: 'Requested'
        },
        {
            teamName: 'Team Beta',
            matchId: 3,
            fieldId: 1,
            timing: new Date('2023-09-09T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
        {
            teamName: 'Team Epsilon',
            matchId: 3,
            fieldId: 1,
            timing: new Date('2023-09-09T13:00:00Z'),
            acceptReject: 'Accepted',
            status: 'Confirmed'
        },
    ]);

    return (
        <div>
            <header>
                <FieldOwnerNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
                <FieldOwnerSideBar className='col-start-1 col-end-2' />

                <div className='col-start-2 col-end-3 flex flex-col items-center pt-10 px-4'>
                    <h1 className="text-3xl font-bold mb-8">Field Bookings</h1>

                    <div className="overflow-x-auto w-full max-w-6xl">
                        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-3 text-left">Team</th>
                                    <th className="py-2 px-3 text-left">Match ID</th>
                                    <th className="py-2 px-3 text-left">Field ID</th>
                                    <th className="py-2 px-3 text-left">Time</th>
                                    <th className="py-2 px-3 text-left">Accept/Reject</th>
                                    <th className="py-2 px-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50">
                                        <td className="py-2 px-3">{booking.teamName}</td>
                                        <td className="py-2 px-3">{booking.matchId}</td>
                                        <td className="py-2 px-3">{booking.fieldId}</td>
                                        <td className="py-2 px-3">
                                            {booking.timing.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="py-2 px-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                booking.acceptReject === 'Accepted' 
                                                    ? 'bg-green-200 text-black-800' 
                                                    : 'bg-yellow-200 text-black-800'
                                            }`}>
                                                {booking.acceptReject}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                booking.status === 'Confirmed' 
                                                    ? 'bg-blue-200 text-black-800' 
                                                    : 'bg-gray-300 text-black-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <footer>
                <FieldOwnerFooter />
            </footer>
        </div>
    );
};

export default FieldBookings;
