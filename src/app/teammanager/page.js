import React from 'react';
import TeamManagerNav from '../Components/TeamManagerNav';
import TeamManagerSideBar from '../Components/TeamManagerSideBar';
import TeamManagerFooter from '../Components/TeamManagerFooter';

const TeamManagerPage = () => {
    return (
        <div>
            <TeamManagerNav/>
            <TeamManagerSideBar/>
            <TeamManagerFooter/>
        </div>
    );
};

export default TeamManagerPage;