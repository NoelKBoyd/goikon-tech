import React from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import AdminFooter from '../Components/AdminFooter';
import Calendar from '../Components/Calendar';

const AdminPage = () => {
    return (
        <div>
            <header>
                <AdminNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto]'>
                <div className='col-start-1 col-end-2'>
                    <AdminSideBar/>
                </div>
                <div className='col-start-2 col-end-3 pt-10'>
                    <Calendar/>
                </div>
            </main>

            <footer>
                <AdminFooter/>
            </footer>
        </div>
    );
};

export default AdminPage;