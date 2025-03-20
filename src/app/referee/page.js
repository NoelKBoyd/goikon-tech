import React from 'react';
import RefereeNav from '../Components/RefereeNav';
import RefereeSideBar from '../Components/RefereeSideBar';
import RefereeFooter from '../Components/RefereeFooter';
import Calendar from '../Components/Calendar';

const RefereePage = () => {
    return (
        <div>
            <header>
                <RefereeNav/>
            </header>
                
            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <div className='col-start-1 col-end-2'>
                    <RefereeSideBar/>
                </div>
                <div className='col-start-2 col-end-3 pt-10'>
                    <Calendar/>
                </div>
            </main>
                
            <footer>
                <RefereeFooter/>
            </footer>
        </div>
    );
};

export default RefereePage;