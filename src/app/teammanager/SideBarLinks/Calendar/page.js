'use client';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import { useState } from 'react';
import Calendar from '@/app/Components/Calendar';

const CalendarPage = () => {
    return (
        <div className="flex flex-col h-screen">

            <header className="flex-shrink-0">
                <TeamManagerNav />
            </header>

            <main className="flex-1 flex overflow-hidden">

                <TeamManagerSideBar className="w-[260px] h-full" />

                <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
                    <div className="w-full">
                        <Calendar />
                    </div>
                </div>
            </main>

            <footer className="flex-shrink-0">
                <TeamManagerFooter />
            </footer>
        </div>
    );
};

export default CalendarPage;
