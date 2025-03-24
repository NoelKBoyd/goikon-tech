'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function createData(homeTeam, awwayTeam, date, referee) {
    return { homeTeam, awwayTeam, date, referee };
  }

const matchData = [
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson'),
    createData('Newcastle United', 'Brighton & Hove Albion', '02-04-2025', 'Sarah Johnson'),
    createData('Crystal Palace', 'Wolverhampton Wanderers', '03-04-2025', 'David Lee'),
    createData('Leeds United', 'Southampton', '04-04-2025', 'Laura Martinez'),
    createData('Burnley', 'Sheffield United', '05-04-2025', 'James Anderson'),
    createData('Nottingham Forest', 'Fulham', '06-04-2025', 'Sophia Taylor'),
];


function renderRow(props) {

    const { index, style } = props;
    const match = matchData[index];

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton sx={{'&:hover': {borderRadius: '8px', backgroundColor: '#f0f0f0',}, textAlign: 'center'}}>
                <ListItemText primary={`${match.homeTeam} VS ${match.awwayTeam}`} secondary={`Date: ${match.date}, Referee: ${match.referee}`} />
            </ListItemButton>
        </ListItem>
    );
}

const Matches = () => {
    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <AdminSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-10">
                        <Box sx={{ width: '100%', height: 400, maxWidth: 600, bgcolor: 'background.paper', borderRadius: '8px' }}>
                            <FixedSizeList height={400} width={600} itemSize={70} itemCount={matchData.length} overscanCount={10}>
                                {renderRow}
                            </FixedSizeList>
                        </Box>    
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>
        </div>
    );
};

export default Matches;