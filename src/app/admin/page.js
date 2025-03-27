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
                            <div className='w-1/3 m-5 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center border-1 border-gray-300'>
                                <h2 className='flex justify-center mt-2 pb-2'><strong>Upcoming Matches</strong></h2>
                                <div className='overflow-y-auto flex flex-col items-center' style={{maxHeight: '300px', width: '100%'}}>
                                    {matchData.map((match) => (
                                    <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper'}} key={match.homeTeam}>
                                        <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#cae2fc', boxShadow: 'inset 0 0 5px rgb(48, 48, 48, 0.5)'}}}>
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
        </div>
    );
};

export default AdminPage;