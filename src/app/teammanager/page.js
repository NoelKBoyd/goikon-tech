import React from 'react';
import TeamManagerNav from '../Components/TeamManagerNav';
import TeamManagerSideBar from '../Components/TeamManagerSideBar';
import TeamManagerFooter from '../Components/TeamManagerFooter';
import Calendar from '../Components/Calendar';
import UpcomingMatch from '../Components/UpcomingMatch';
import MessagingPanel from '../Components/MessagingPanel';
import TeamStats from '../Components/TeamStats';
import NestedModal from '../Components/MatchPreparation';
import PlayerStats from '../Components/PlayerStats';

const TeamManagerPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <TeamManagerNav />
            </header>

            <main className="flex flex-grow bg-gray-100 overflow-y-auto">
                <div className="w-64 flex-shrink-0">
                    <TeamManagerSideBar />
                </div>

                <div className="flex-1 p-4">
                    <div className="grid grid-cols-3 grid-rows-[auto,auto] gap-4 items-start">
                        <div className="row-start-1 col-start-1 bg-white p-4 border-2 border-black rounded-lg shadow">
                            <TeamStats />
                        </div>

                        <div className="row-start-1 col-start-2 bg-white p-4 border-2 border-black rounded-lg shadow">
                            <UpcomingMatch />
                        </div>

                        <div className="row-start-1 col-start-3 bg-white p-4 border-2 border-black rounded-lg shadow">
                            <NestedModal />
                        </div>

                        <div className="row-start-2 col-start-1">
                            <Calendar />
                        </div>

                        <div className="row-start-2 col-start-2 max-h-[350px] overflow-auto bg-white p-4 border-2 border-black rounded-lg shadow">
                            <PlayerStats />
                        </div>

                        <div className="row-start-2 col-start-3 pb-15 bg-white p-4 border-2 border-black rounded-lg shadow">
                            <MessagingPanel />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white shadow">
                <TeamManagerFooter />
            </footer>
        </div>
    );
};

export default TeamManagerPage;
