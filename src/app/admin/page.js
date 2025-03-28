'use client';
import React from 'react';
import AdminNav from '../Components/AdminNav';
import AdminSideBar from '../Components/AdminSideBar';
import AdminFooter from '../Components/AdminFooter';
import { LineChart } from '@mui/x-charts/LineChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Calendar from '../Components/Calendar';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

function createData(homeTeam, awwayTeam, date, referee, venue) {
    return { homeTeam, awwayTeam, date, referee, venue };
}

const matchData = [
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe', 'Old Trafford'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith', 'Stamford Bridge'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown', 'Etihad Stadium'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis', 'King Power Stadium'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson', 'London Stadium'),
]

const AdminPage = () => {

    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    
    const openMatch = (match) => {
        setSelectedMatch(match);
        setPopupOpen(true);
    };
    
    const closeMatch = () => {
        setSelectedMatch(null);
        setPopupOpen(false);
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>
        
            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-full'>
                <AdminSideBar className='col-start-1 col-end-2'/>
        
                <div className='col-start-2 col-end-3 flex flex-col justify-center text-center'>
                    <div className="pt-3 w-full grid grid-cols-[65%_auto] gap-4 h-screen m-3">
                        <div className='col-start-1 col-end-2 p-1 h-700px mb-50 bg-white rounded-lg shadow-lg flex flex-col justify-start items-start'>
                            <div className='w-full pt-5'>
                                <h2 className='flex justify-center'><strong>Active Users</strong></h2>
                                <LineChart
                                    xAxis={[{ data: Array.from({ length: 24 }, (_, i) => i + 1) }]}
                                    series={[
                                        {
                                            data: [2, 6, 2, 9, 2, 5, 7, 4, 6, 5, 9, 3, 8, 7, 3, 8, 4, 6, 9, 2, 7, 4, 7, 5]
                                        },
                                    ]}
                                    style={{ height: 400, width: '100%' }}
                                    
                                />
                            </div>
                            <div className='w-full flex'>
                            <div className='w-1/3 m-5 bg-white rounded-lg shadow-xl border border-gray-300'>
                                <h2 className='flex justify-center mt-2 pb-2'><strong>Upcoming Matches</strong></h2>
                                    <div className='overflow-y-auto overflow-hidden rounded-b-lg' style={{ maxHeight: '260px' }}>
                                        {matchData.map((match) => (
                                        <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }} key={match.homeTeam}>
                                            <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#cae2fc', boxShadow: 'inset 0 0 5px rgb(48, 48, 48, 0.5)'}}} onClick={() => { openMatch(match) }}>
                                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center'}}>
                                                    <Avatar src="/" style={{backgroundColor: '#baffcd', color: 'black'}}>{match.homeTeam.charAt(0)}</Avatar>
                                                </ListItemAvatar>    
                                                    <ListItemText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} secondary={match.date}>VS</ListItemText>
                                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center'}}>
                                                    <Avatar src="/" style={{backgroundColor: '#ffbaba', color: 'black'}}>{match.awwayTeam.charAt(0)}</Avatar>
                                                </ListItemAvatar>
                                            </ListItem>
                                            <Divider component="li" width='100%'/>
                                        </List>
                                        ))}
                                    </div>
                                </div>    
                                <div className='w-2/3 h-50 mt-5 mr-5 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center border-1 border-gray-300'>
                                            
                                </div>
                            </div>
                        </div>
                        <div className='col-start-2 col-end-3 p-5 h-700px mb-25 bg-white rounded-lg shadow-lg mr-8'>
                            <Calendar/>
                        </div>
                    </div>
                </div>
            </main>
        
            <footer>
                <AdminFooter />
            </footer>

            <Dialog open={isPopupOpen} onClose={closeMatch}>
                <DialogTitle sx={{textAlign: 'center'}}>Match Details</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    {selectedMatch && (
                        <div>
                            <div className='flex pb-5'>
                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Avatar src="/" style={{backgroundColor: '#baffcd', color: 'black'}}>{selectedMatch.homeTeam.charAt(0)}</Avatar>
                                </ListItemAvatar>    
                                    <ListItemText sx={{textAlign: 'center'}}><strong>VS</strong></ListItemText>
                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Avatar src="/" style={{backgroundColor: '#ffbaba', color: 'black'}}>{selectedMatch.awwayTeam.charAt(0)}</Avatar>
                                </ListItemAvatar>
                            </div>
                            <div className='text-center'>
                                <p>
                                    <strong>Home Team:</strong> {selectedMatch.homeTeam}
                                </p>
                                <p>
                                    <strong>Away Team:</strong> {selectedMatch.awwayTeam}
                                </p>
                                <p>
                                    <strong>Date:</strong> {selectedMatch.date}
                                </p>
                                <p>
                                    <strong>Referee:</strong> {selectedMatch.referee}
                                </p>
                                <p>
                                    <strong>Venue:</strong> {selectedMatch.venue}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={closeMatch}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminPage;