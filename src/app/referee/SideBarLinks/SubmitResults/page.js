'use client';
import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import { useState } from 'react';
import SubmitMatchResult from '@/app/Components/SubmitMatchResult';

const SubmitResults = () => {
    return (
        <div>
            <header>
                <RefereeNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <RefereeSideBar/>

                <div className='text-center px-6'>
                    <div className="pt-10">
                        <h1 className="text-2xl font-bold mb-2">Submit Match Results</h1>
                        <SubmitMatchResult />
                    </div>
                </div>
            </main>

            <footer className="mt-auto w-full mb-40">
                    <RefereeFooter />
                  </footer>
        </div>
    );
};

export default SubmitResults;
