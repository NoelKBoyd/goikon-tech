'use client';

import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import AssignedMatchesDashboard from '@/app/Components/RefereeAssignedMatchesDashboard';
import { useState } from 'react';

const UpcomingMatches = () => {
    return (
        <div>
            <header>
                <RefereeNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <RefereeSideBar/>

                <div className='text-center'>
                    <div className="pt-10">
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

export default UpcomingMatches;
