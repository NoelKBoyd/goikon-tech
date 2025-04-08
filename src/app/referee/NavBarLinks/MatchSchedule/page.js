'use client';

import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import AssignedMatchesDashboard from '@/app/Components/RefereeAssignedMatchesDashboard';
import { useState } from 'react';

const MatchSchedule = () => {
    return (
        <div>
            <header>
                <RefereeNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <RefereeSideBar />

                <div className='text-center px-6'>
                    <div className="pt-10">
                        <h1 className="text-2xl font-bold mb-2"> Match Schedule</h1>
                        <AssignedMatchesDashboard />
                    </div>
                </div>
            </main>

            <footer>
                <RefereeFooter />
            </footer>
        </div>
    );
};

export default MatchSchedule;
