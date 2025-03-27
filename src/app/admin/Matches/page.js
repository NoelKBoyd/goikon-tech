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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MatchSchedule from "@/app/Components/MatchSchedule";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: `${theme.shape.borderRadius * 20}px !important`,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '21ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));


const Matches = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = (match) => {
        setSelectedMatch(match);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedMatch(null);
        setPopupOpen(false);
    };

    const renderRow = (props) => {
        const { index, style } = props;
        const match = searchMatches[index];
    
        const backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#dedede';
    
        return (
            <ListItem style={{ ...style, backgroundColor, borderRadius: '8px'}} key={index} component="div" disablePadding>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#cae2fc'}, textAlign: 'center', borderRadius: '8px'}} onClick={() => openPopup(match)}>
                    <ListItemText primary={`${match.homeTeam} || VS || ${match.awwayTeam}`} secondary={`Date: ${match.date}, Referee: ${match.referee}`}/>
                </ListItemButton>
            </ListItem>
        );
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-full">
                <AdminSideBar className="col-start-1 col-end-2" />

                <div className="col-start-2 col-end-3 flex justify-center text-center">
                    <div className="pt-10">
                        <div>
                            <h1 className="text-3xl pb-1 pl-5 flex justify-left">
                                <strong>Match Timetable</strong>
                            </h1>
                            <MatchSchedule/>
                        </div>
                        <div className="pt-13 mb-30">
                            <div className="flex justify-center w-full">
                                <Box sx={{width: '100%', height: 550, maxWidth: 480, bgcolor: 'background.paper', borderRadius: '8px',}}>
                                    <h1 className="text-3xl pb-3 pt-5 flex justify-center">
                                        <strong>Schedule Matches</strong>
                                    </h1>
                                    <div className="pt-5">
                                        <TextField id="outlined-basic" label="Home Team" variant="outlined" color="success" sx={{width: '250px'}}/>
                                    </div>
                                    <div className="pt-5">
                                        <TextField id="outlined-basic" label="Away Team" variant="outlined" color="warning" sx={{width: '250px'}}/>
                                    </div>
                                    <div className="pt-5">
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DatePicker']} sx={{display: 'flex', justifyContent: 'center', paddingBottom: '20px', }} >
                                                <DatePicker label="Date" sx={{width: '250px'}}/>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <TextField id="outlined-basic" label="Referee" variant="outlined" sx={{width: '250px'}}/>
                                    </div>
                                    <div className="pt-5">
                                        <TextField id="outlined-basic" label="Venue" variant="outlined" sx={{width: '250px'}}/>
                                    </div>
                                    <div className="pt-5">
                                        <Button variant="contained" color="primary">Schedule Match</Button>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>

            <Dialog open={isPopupOpen} onClose={closePopup} sx={{ textAlign: 'center'}}>
                <DialogTitle>Match Details</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    {selectedMatch && (
                        <div>
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
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button>Edit</Button>
                    <Button onClick={closePopup}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Matches;