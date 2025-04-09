import React from 'react';
import TeamManagerNav from '../Components/TeamManagerNav';
import TeamManagerSideBar from '../Components/TeamManagerSideBar';
import TeamManagerFooter from '../Components/TeamManagerFooter';
import Calendar from '../Components/Calendar';
import UpcomingMatch from '../Components/UpcomingMatch'
import NestedModal from '../Components/MatchPreparation';

const TeamManagerPage = () => {
    return (
        <div>
            <header>
                <TeamManagerNav/>
            </header>
                
            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <div className='col-start-1 col-end-2'>
                    <TeamManagerSideBar/>
                </div>
                <div className='col-start-2 col-end-3'>
            <UpcomingMatch/>
            </div>
                <div className='col-start-4 col-end-6'>
                    <Calendar/>
                </div>
                <div className='col-start-6 col-end-7'>
                    <NestedModal/>
                </div>
            </main>
                
            <footer>
                <TeamManagerFooter/>
            </footer>
        </div>
    );
};

export default TeamManagerPage;