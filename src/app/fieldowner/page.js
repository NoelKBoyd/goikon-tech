import React from 'react';
import FieldOwnerNav from '../Components/FieldOwnerNav';
import FieldOwnerSideBar from '../Components/FieldOwnerSideBar';
import FieldOwnerFooter from '../Components/FieldOwnerFooter';
import Calendar from '../Components/Calendar';

const FieldOwnerPage = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav/>
            </header>
        
            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <div className='col-start-1 col-end-2'>
                    <FieldOwnerSideBar/>
                </div>
                <div className='col-start-2 col-end-3 pt-10'>
                    <Calendar/>
                </div>
            </main>
        
            <footer>
                <FieldOwnerFooter/>
            </footer>
        </div>
    );
};

export default FieldOwnerPage;