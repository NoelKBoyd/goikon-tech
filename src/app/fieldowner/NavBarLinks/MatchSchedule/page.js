'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';


function createData(homeTeam, awwayTeam, date, referee, venue) {
    return { homeTeam, awwayTeam, date, referee, venue };
}

const matchData = [
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe', 'Old Trafford'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith', 'Stamford Bridge'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown', 'Etihad Stadium'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis', 'King Power Stadium'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson', 'London Stadium'),
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe', 'Old Trafford'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith', 'Stamford Bridge'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown', 'Etihad Stadium'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis', 'King Power Stadium'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson', 'London Stadium'),
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe', 'Old Trafford'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith', 'Stamford Bridge'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown', 'Etihad Stadium'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis', 'King Power Stadium'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson', 'London Stadium'),
]

const venueList = [
    { venue: 'Old Trafford' },
    { venue: 'Stamford Bridge' },
    { venue: 'Etihad Stadium' },
    { venue: 'King Power Stadium' },
    { venue: 'London Stadium' },
];

const MatchSchedule = () => {

    const [selectedVenue, setSelectedVenue] = React.useState(''); // State for selected venue
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    

    const openMatch = (match) => {
        setSelectedMatch(match);
        setIsMatchDialogOpen(true);
    };
    
    const closeMatch = () => {
        setSelectedMatch(null);
        setIsMatchDialogOpen(false);
    };

    const handleChange = (event) => {
        setSelectedVenue(event.target.value); // Update selected venue
    };

    // Filter matches based on the selected venue
    const filteredMatches = selectedVenue
        ? matchData.filter((match) => match.venue === selectedVenue)
        : matchData; // Show all matches if no venue is selected

    return (
        <div>
            <header>
                <FieldOwnerNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen mb-20'>
                <FieldOwnerSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center h-full'>
                    <div className="pt-10 w-full max-w-3xl mx-auto">
                        <h1 className="text-3xl"><strong>Match Schedule</strong></h1>

                        <div className='flex justify-center gap-4 mt-5 w-full max-w-2xl mx-auto'>
                            <div className='w-full pt-2'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Venue</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedVenue}
                                        label="Venue"
                                        onChange={handleChange}
                                    >
                                    {venueList.map((venue) => (
                                        <MenuItem key={venue.venue} value={venue.venue}>{venue.venue}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='w-full'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Match Date" fullWidth />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className='w-full my-5 bg-white rounded-lg shadow-xl border border-gray-300 pt-3'>
                            <h2 className='flex justify-center mt-1 pb-5'><strong>Upcoming Matches</strong></h2>
                            <div className='overflow-y-auto scrollbar-hide max-h-120 rounded-b-lg'>
                                {filteredMatches.map((match) => (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={match.homeTeam}>
                                        <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#cae2fc'}}} onClick={() => { openMatch(match) }}>
                                            <ListItemAvatar sx={{display: 'flex', justifyContent: 'right', marginLeft: '120px'}}>
                                                <Avatar src="/" style={{backgroundColor: '#baffcd', color: 'black'}}>{match.homeTeam.charAt(0)}</Avatar>
                                            </ListItemAvatar>    
                                                <ListItemText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} secondary={match.date}>VS</ListItemText>
                                            <ListItemAvatar sx={{display: 'flex', justifyContent: 'left'}}>
                                                <Avatar src="/" style={{backgroundColor: '#ffbaba', color: 'black', marginRight: '120px'}}>{match.awwayTeam.charAt(0)}</Avatar>
                                            </ListItemAvatar>
                                        </ListItem>
                                        <Divider component="li" width='100%'/>
                                    </List>
                                    ))}
                            </div>
                        </div> 

                        <div className='w-full my-5 bg-white rounded-lg shadow-xl border border-gray-300 pt-3 flex flex-col justify-center items-center'>
                            <h2 className='text-center mb-5'><strong>Week Breakdown</strong></h2>
                            <div className='flex justify-center items-center w-full'>
                                <BarChart
                                    sx={{ margin: 'auto' }}
                                    xAxis={[{ scaleType: 'band', data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }]}
                                    series={[{ data: [4, 3, 5, 2, 4, 1, 3]}, {data: [2, 1, 4, 5, 0, 4, 3] }]}
                                    width={700} 
                                    height={400} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <FieldOwnerFooter />
            </footer>


            <Dialog open={isMatchDialogOpen} onClose={closeMatch}>
                <DialogTitle sx={{textAlign: 'center'}}>Match Details</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    {selectedMatch && (
                        <div>
                            <div className='flex pb-5'>
                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center', marginLeft: '50px'}}>
                                    <Avatar src="/" style={{backgroundColor: '#baffcd', color: 'black'}}>{selectedMatch.homeTeam.charAt(0)}</Avatar>
                                </ListItemAvatar>    
                                    <ListItemText sx={{textAlign: 'center'}}><strong>VS</strong></ListItemText>
                                <ListItemAvatar sx={{display: 'flex', justifyContent: 'center', marginRight: '50px'}}>
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

export default MatchSchedule;