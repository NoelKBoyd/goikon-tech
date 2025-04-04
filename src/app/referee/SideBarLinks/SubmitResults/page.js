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

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div>
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
