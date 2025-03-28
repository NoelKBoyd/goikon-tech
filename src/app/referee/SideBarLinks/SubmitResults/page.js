'use client';
import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import { useState } from 'react';
import SubmitMatchResult from '@/app/Components/SubmitMatchResult';

const SubmitResults = () => {
    return (
        <div className="flex flex-col h-screen"> {/* Make the entire page a flex container */}
            <header>
                <RefereeNav />
            </header>

            <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 flex-grow"> {/* This takes up the remaining space */}
                <RefereeSideBar className="col-start-1 col-end-2" />

                <div className="col-start-2 col-end-3 flex justify-center text-center">
                    <div className="pt-10">
                        <h1 className="text-xl"><strong>Submit Results</strong></h1>
                        <SubmitMatchResult />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubmitResults;
