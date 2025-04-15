'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import { useState } from 'react';

const FieldBookings = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <FieldOwnerSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-10">
                        <h1 className="text-3xl"><strong>Field Bookings</strong></h1>
                        
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