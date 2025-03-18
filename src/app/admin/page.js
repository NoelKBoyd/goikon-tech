import React from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import AdminFooter from '../Components/AdminFooter';

const AdminPage = () => {
    return (
        <div>
            <AdminNav/>
            <AdminSideBar/>
            <AdminFooter/>
        </div>
    );
};

export default AdminPage;