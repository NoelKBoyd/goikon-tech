'use client';
import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import { useState } from 'react';
import SubmitMatchResult from '@/app/Components/SubmitMatchResult';
import MatchRelatedStats from '@/app/Components/MatchRelatedStats';

const SubmitResults = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">

            <header >
                <RefereeNav />
            </header>

            <div className="flex flex-1 overflow-hidden">
                <div >
                    <RefereeSideBar />
                </div>

                <div className="flex-1 p-10 overflow-y-auto">
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Match Results</h2>
                                <SubmitMatchResult />
                            </div>


                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Match Stats</h2>
                                <MatchRelatedStats />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <footer className="w-full bg-white shadow-md mt-auto">
                <RefereeFooter />
            </footer>
        </div>
    );
};

export default SubmitResults;
