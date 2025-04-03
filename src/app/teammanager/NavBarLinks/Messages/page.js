'use client';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import { useState } from 'react';
import LargeMessagingPanel from '@/app/Components/LargeMessagingPanel';

const Messages = () => {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex-shrink-0">
                <TeamManagerNav />
            </header>

            <main className="flex-1 flex overflow-hidden">

                <TeamManagerSideBar className="w-[260px] h-full" />

                <div className="flex-1 flex flex-col">

                    <div className="flex-1 overflow-y-auto p-4">
                        <LargeMessagingPanel />
                    </div>
                </div>
            </main>

            <footer className="flex-shrink-0">
                <TeamManagerFooter />
            </footer>
        </div>
    );
};

export default Messages;
