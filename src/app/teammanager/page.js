import React from 'react';
import TeamManagerNav from '../Components/TeamManagerNav';
import TeamManagerSideBar from '../Components/TeamManagerSideBar';
import TeamManagerFooter from '../Components/TeamManagerFooter';
import Calendar from '../Components/Calendar';
import UpcomingMatch from '../Components/UpcomingMatch';
import MessagingPanel from '../Components/MessagingPanel';
import TeamStats from '../Components/TeamStats';
import NestedModal from '../Components/MatchPreparation';

const TeamManagerPage = () => {
    return (
        <div className="flex flex-col h-screen">
            <header>
                <TeamManagerNav />
            </header>

            <main className="flex-grow bg-gray-100">
                <div className="flex">
                    <div className="w-64">
                        <TeamManagerSideBar />
                    </div>

                    <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 p-4">
                        <div className="row-start-1 col-start-1">
                            <TeamStats />
                        </div>

                        <div className="row-start-1 col-start-2 justify-center">
                            <UpcomingMatch />
                        </div>

                        <div className="row-start-2 col-start-1">
                            <Calendar />
                        </div>

                        <div className="row-start-2 col-start-3 flex justify-end">
                            <MessagingPanel />
                        </div>

                        {/* Future placeholders */}
                        <div className="row-start-1 col-start-3">
                            <NestedModal />
                        </div>
                        <div className="row-start-2 col-start-2">{/* Bottom Middle Component */}</div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto">
                <TeamManagerFooter />
            </footer>
        </div>
    );
};

export default TeamManagerPage;
