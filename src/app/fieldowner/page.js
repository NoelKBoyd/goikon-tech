import React from 'react';
import FieldOwnerNav from '../Components/FieldOwnerNav';
import FieldOwnerSideBar from '../Components/FieldOwnerSideBar';
import FieldOwnerFooter from '../Components/FieldOwnerFooter';

const FieldOwnerPage = () => {
    return (
        <div>
            <FieldOwnerNav/>
            <FieldOwnerSideBar/>
            <FieldOwnerFooter/>
        </div>
    );
};

export default FieldOwnerPage;