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
import { IoMdArrowRoundUp } from "react-icons/io";
import { IconContext } from 'react-icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FaUserPlus } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";


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

function tableData(team, goals, wins, loses) {
    return { team, goals, wins, loses };
  }
  
  const rows = [
    tableData("Manchester City", 85, 27, 3),
    tableData("Liverpool", 78, 25, 4),
    tableData("Real Madrid", 82, 26, 2),
    tableData("Barcelona", 75, 23, 5),
    tableData("Bayern Munich", 88, 24, 4),
    tableData("PSG", 81, 25, 3),
    tableData("Arsenal", 76, 24, 5),
    tableData("Juventus", 69, 22, 6),
    tableData("Inter Milan", 73, 23, 4),
    tableData("Atletico Madrid", 70, 21, 7),
    tableData("Manchester City", 85, 27, 3),
    tableData("Liverpool", 78, 25, 4),
    tableData("Real Madrid", 82, 26, 2),
    tableData("Barcelona", 75, 23, 5),
    tableData("Bayern Munich", 88, 24, 4),
    tableData("PSG", 81, 25, 3),
    tableData("Arsenal", 76, 24, 5),
    tableData("Juventus", 69, 22, 6),
    tableData("Inter Milan", 73, 23, 4),
    tableData("Atletico Madrid", 70, 21, 7)
  ];

  function actionsTaken(action) {
    return {action}
  }

  const actions = [
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
    actionsTaken("Added a new team to the database"),
  ];



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
                                <div className='w-1/3 my-5 mx-5 bg-white rounded-lg shadow-xl border border-gray-300 pt-8'>
                                    <h2 className='flex justify-center mt-2 pb-5'><strong>Upcoming Matches</strong></h2>
                                    <div className='overflow-y-auto scrollbar-hide max-h-120 rounded-b-lg'>
                                        {matchData.map((match) => (
                                            <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={match.homeTeam}>
                                                <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#cae2fc'}}} onClick={() => { openMatch(match) }}>
                                                    <ListItemAvatar sx={{display: 'flex', justifyContent: 'right'}}>
                                                        <Avatar src="/" style={{backgroundColor: '#baffcd', color: 'black'}}>{match.homeTeam.charAt(0)}</Avatar>
                                                    </ListItemAvatar>    
                                                        <ListItemText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} secondary={match.date}>VS</ListItemText>
                                                    <ListItemAvatar sx={{display: 'flex', justifyContent: 'left'}}>
                                                        <Avatar src="/" style={{backgroundColor: '#ffbaba', color: 'black'}}>{match.awwayTeam.charAt(0)}</Avatar>
                                                    </ListItemAvatar>
                                                </ListItem>
                                                <Divider component="li" width='100%'/>
                                            </List>
                                        ))}
                                    </div>
                                </div>    
                                <div className='w-2/3 my-5 mr-5 bg-white rounded-lg shadow-xl flex justify-center items-center border-1 border-gray-300'>
                                    <div className='flex flex-col justify-center item-center mt-8 w-1/3'>
                                        <h2><strong>Totals Number Of Teams</strong></h2>
                                        <div className='py-5'>
                                            <IconContext.Provider value={{ color: 'green'}}>
                                                <h1 className='text-5xl flex justify-center'>563<IoMdArrowRoundUp/></h1>
                                            </IconContext.Provider>
                                        </div>
                                        <div className='overflow-y-auto scrollbar-hide max-h-90 mt-2'>
                                            {matchData.map((match) => (
                                                <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={match.homeTeam}>
                                                    <Divider component="li" width='100%'/>
                                                    <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#9fffa2'}}}>    
                                                        
                                                        <ListItemText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}} secondary={match.date}><strong>{match.homeTeam}</strong> has been added</ListItemText>
                                                    </ListItem>
                                                </List>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center item-center w-2/3 ml-2'>
                                        <div className='overflow-y-auto max-h-[500px]'>
                                            <h2 className='pb-3'><strong>Legue Standing</strong></h2>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 'auto', borderRadius: '10px'}} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Position</TableCell>
                                                            <TableCell align="right">Team</TableCell>
                                                            <TableCell align="right">Goals</TableCell>
                                                            <TableCell align="right">Wins</TableCell>
                                                            <TableCell align="right">Loses</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': {backgroundColor: '#cae2fc'}}}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell align="right">{row.team}</TableCell>
                                                            <TableCell align="right">{row.goals}</TableCell>
                                                            <TableCell align="right">{row.wins}</TableCell>
                                                            <TableCell align="right">{row.loses}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                        </div>
                        <div className='col-start-2 col-end-3 p-5 h-700px mb-50 bg-white rounded-lg shadow-lg mr-8'>

                            <div>
                                <h2 className='mt-2'><strong>Latest Actions Taken</strong></h2>
                            </div>                        

                            <div className='overflow-y-auto h-95 mt-5'>
                                {actions.map((action) => (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper'}} key={action}>
                                        <ListItem alignItems="flex-center" sx={{'&:hover': {backgroundColor: '#cae2fc'}, display: 'flex', justifyContent: 'center'}} >
                                            <ListItemAvatar sx={{display: 'flex', justifyContent: 'center'}}>
                                                <Avatar src="/" style={{backgroundColor: '#cae2fc', color: 'black'}}>A</Avatar>
                                            </ListItemAvatar>
                                            <h2 className='ml-5'>{action.action}</h2>
                                        </ListItem>
                                        <Divider component="li" width='100%'/>
                                    </List>
                                ))}
                            </div>

                            <div className='grid w-full grid-cols-[auto_auto_auto] h-50'>
                                <div className='col-start-1 col-end-2 flex flex-col justify-center items-center w-full h-full'>
                                    <Fab size="large" color="primary" aria-label="add">
                                        <FaUserPlus style={{height: '25px', width: '25px'}}/>
                                    </Fab>
                                    <h1 className='mt-3'><strogn>Add New User</strogn></h1>
                                </div>
                                <div className='col-start-2 col-end-3 flex flex-col justify-center items-center w-full h-full'>
                                    <Fab size="large" color="secondary" aria-label="add">
                                        <MdGroupAdd style={{height: '30px', width: '30px'}}/>
                                    </Fab>
                                    <h1 className='mt-3'><strogn>Add New Team</strogn></h1>
                                </div>
                                <div className='col-start-3 col-end-4 flex flex-col justify-center items-center w-full h-full'>
                                    <Fab size="large" color="extended" aria-label="add">
                                        <IoIosFootball style={{height: '30px', width: '30px'}}/>
                                    </Fab>
                                    <h1 className='mt-3'><strogn>Create New Match</strogn></h1>
                                </div>
                            </div>

                            <div>
                                <Calendar/>
                            </div>
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