import React from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import AdminFooter from '../Components/AdminFooter';

const AdminPage = () => {
    return (
        <div>
            <header>
                <AdminNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto]'>
                <AdminSideBar className='col-start-1 col-end-2'/>
                <h1>Admin page</h1>
            </main>

            <footer>
                <AdminFooter/>
            </footer>
        </div>
    );
};

export default AdminPage;