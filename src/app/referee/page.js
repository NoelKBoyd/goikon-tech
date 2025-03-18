import React from 'react';
import RefereeNav from '../Components/RefereeNav';
import RefereeSideBar from '../Components/RefereeSideBar';
import RefereeFooter from '../Components/RefereeFooter';

const RefereePage = () => {
    return (
        <div>
            <RefereeNav/>
            <RefereeSideBar/>
            <RefereeFooter/>
        </div>
    );
};

export default RefereePage;