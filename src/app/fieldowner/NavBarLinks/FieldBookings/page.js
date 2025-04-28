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
            acceptReject: ''
        },
        {
            teamName: 'Team Beta',
            matchId: 1,
            fieldId: 1,
            acceptReject: ''
        },
        {
            teamName: 'Team Gamma',
            matchId: 2,
            fieldId: 2,
            acceptReject: ''
        },
        {
            teamName: 'Team Delta',
            matchId: 2,
            fieldId: 2,
            acceptReject: ''
        },
        {
            teamName: 'Team Alpha',
            matchId: 4,
            fieldId: 4,
            acceptReject: ''
        },
        {
            teamName: 'Team Beta',
            matchId: 3,
            fieldId: 1,
            acceptReject: ''
        },
        {
            teamName: 'Team Epsilon',
            matchId: 3,
            fieldId: 1,
            acceptReject: ''
        },
    ]);

    const handleAccept = (index) => {
        const updatedBookings = [...bookings];
        updatedBookings[index].acceptReject = 'Accepted';
        setBookings(updatedBookings);
    };

    const handleDecline = (index) => {
        const updatedBookings = [...bookings];
        updatedBookings[index].acceptReject = 'Declined';
        setBookings(updatedBookings);
    };

    return (
        <div>
            <header>
                <FieldOwnerNav />
            </header>

            <main className='grid w-full grid-cols-[250px_auto] bg-gray-100 min-h-screen'>
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
                                    <th className="py-2 px-3 text-left">Accept/Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50">
                                        <td className="py-2 px-3">{booking.teamName}</td>
                                        <td className="py-2 px-3">{booking.matchId}</td>
                                        <td className="py-2 px-3">{booking.fieldId}</td>
                                        <td className="py-2 px-3 space-x-2">
                                            {booking.acceptReject === '' && (
                                                <>
                                                    <button
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                        onClick={() => handleAccept(index)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                        onClick={() => handleDecline(index)}
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                            {booking.acceptReject === 'Accepted' && (
                                                <span className="bg-green-200 text-black-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Accepted
                                                </span>
                                            )}
                                            {booking.acceptReject === 'Declined' && (
                                                <span className="bg-red-200 text-black-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Declined
                                                </span>
                                            )}
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

