'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import { useState } from 'react';

const fields = [
    {
        location: 'Central Park Field',
        capacity: 5000,
        amenities: 'Restrooms, Concessions, Lighting, Parking',
        availabilityStatus: 'Available',
    },
    {
        location: 'Griffith Park Stadium',
        capacity: 3000,
        amenities: 'Restrooms, Parking',
        availabilityStatus: 'Available',
    },
    {
        location: 'Riverside Arena',
        capacity: 2000,
        amenities: 'Restrooms, Lighting',
        availabilityStatus: 'Under Maintenance',
    },
    {
        location: 'Sunset Valley Field',
        capacity: 1500,
        amenities: 'Restrooms',
        availabilityStatus: 'Available',
    }
];

const FieldOverview = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav />
            </header>
            <main className="grid w-full grid-cols-[250px_auto] bg-gray-100 min-h-screen">
                <FieldOwnerSideBar className="col-start-1 col-end-2" />
                <div className="col-start-2 col-end-3 p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-center w-full">Field Overview</h1>
                        <button className="absolute right-12 top-24 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                            Add Field
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {fields.map((field, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-semibold mb-2">{field.location}</h2>
                                <p><span className="font-medium">Capacity:</span> {field.capacity}</p>
                                <p><span className="font-medium">Amenities:</span> {field.amenities}</p>
                                <p>
                                    <span className="font-medium">Availability:</span>{' '}
                                    <span className={field.availabilityStatus === 'Available' ? 'text-green-500' : 'text-red-500'}>
                                        {field.availabilityStatus}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer>
                <FieldOwnerFooter />
            </footer>
        </div>
    );
};

export default FieldOverview;
