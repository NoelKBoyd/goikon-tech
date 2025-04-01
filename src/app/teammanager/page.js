import React from 'react';
import TeamManagerNav from '../Components/TeamManagerNav';
import TeamManagerSideBar from '../Components/TeamManagerSideBar';
import TeamManagerFooter from '../Components/TeamManagerFooter';
import Calendar from '../Components/Calendar';
import UpcomingMatch from '../Components/UpcomingMatch'
import MessagingPanel from '../Components/MessagingPanel';

const TeamManagerPage = () => {
    return (
        <div className="w-full h-screen flex flex-col bg-gray-100">
            <header>
                <TeamManagerNav/>
            </header>
                
            <main className='relative flex flex-1 h-full'>
                <div className='w-64'>
                    <TeamManagerSideBar/>
                </div>
                <div className='flex-1 flex justify-center items-start mt-6'>
            <UpcomingMatch/>
            </div>
                <div className='absolute bottom-4 left-[270px]'>
                    <Calendar/>
                </div>
                <div className= 'absolute bottom-4 right-4'>
                <MessagingPanel/>
                </div>
            </main>
                
            <footer>
                <TeamManagerFooter/>
            </footer>
        </div>
    );
};

export default TeamManagerPage;