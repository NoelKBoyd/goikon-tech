'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import { useState } from 'react';

const bookings = [
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

const Dashboard = () => {
    const [bookingList, setBookingList] = useState(bookings);
    const fields = [
        { id: 1, name: 'Central Park Field' },
        { id: 2, name: 'Griffith Park Stadium' },
        { id: 3, name: 'Downtown Arena' },
        { id: 4, name: 'Sunset Valley Field' }
    ];

    return (
        <div>
            <header> 
                <FieldOwnerNav />
            </header>

            <main className='grid w-full grid-cols-[250px_auto] bg-gray-100 h-screen overflow-hidden'>
                <FieldOwnerSideBar className='col-start-1 col-end-2' />

                <div className='col-start-2 col-end-3 p-10 overflow-y-scroll'>
                    <h1 className="text-3xl font-bold mb-10 text-center">Dashboard</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                         <section className="bg-white shadow rounded-lg p-5">
                            <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 text-left">Team ID</th>
                                            <th className="px-4 py-2 text-left">Field</th>
                                            <th className="px-4 py-2 text-left">Timing</th>
                                            <th className="px-4 py-2 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookingList.map((booking, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="px-4 py-2">{booking.teamId}</td>
                                                <td className="px-4 py-2">{fields.find(f => f.id === booking.fieldId)?.name || 'Unknown Field'}</td>
                                                <td className="px-4 py-2">{booking.timing.toLocaleString()}</td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-2 py-1 rounded-full text-white text-sm ${booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="bg-white shadow rounded-lg p-5">
                            <h2 className="text-xl font-semibold mb-4">Field Availability</h2>
                            <div className="space-y-4">
                                {fields.map((field) => {
                                    const bookingsForField = bookingList.filter(b => b.fieldId === field.id && b.status === 'Confirmed');

                                    return (
                                        <div key={field.id} className="border p-4 rounded-md">
                                            <h3 className="text-lg font-bold">{field.name}</h3>
                                            <p className="text-gray-600 mb-2">
                                                {bookingsForField.length > 0 ? `${bookingsForField.length} bookings` : 'No bookings yet'}
                                            </p>
                                            {bookingsForField.length > 0 && (
                                                <ul className="list-disc list-inside text-sm text-gray-600">
                                                    {bookingsForField.map((booking, idx) => (
                                                        <li key={idx}>{booking.timing.toLocaleString()}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <footer>
                <FieldOwnerFooter />
            </footer>
        </div>
    );
};

export default Dashboard;
