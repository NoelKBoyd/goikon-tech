'use client';
import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import { useState } from 'react';
import SubmitReport from '@/app/Components/IncidentReport';

const IncidentReports = () => {
    return (
        <div>
            <header>
                <RefereeNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <RefereeSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-10">
                        <SubmitReport />
                    </div>
                </div>
            </main>

            <footer>
                <RefereeFooter />
            </footer>
        </div>
    );
};

export default IncidentReports;
