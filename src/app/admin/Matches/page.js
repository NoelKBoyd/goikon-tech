'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MatchSchedule from "@/app/Components/MatchSchedule";

const Matches = () => {
    const [teams, setTeams] = useState([]);
    const [referees, setReferees] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState({ homeTeam: '', awayTeam: '', date: null, referee: '', venue: '' });

    useEffect(() => {
        // Fetch teams
        fetch('/api/auth/admin/teams/getTeams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));

        // Fetch referees
        fetch('/api/auth/admin/matches/getReferees')
            .then(response => response.json())
            .then(data => setReferees(data))
            .catch(error => console.error('Error fetching referees:', error));

        // Fetch fields
        fetch('/api/auth/admin/matches/getFields')
            .then(response => response.json())
            .then(data => setFields(data))
            .catch(error => console.error('Error fetching fields:', error));
    }, []);

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-full">
                <AdminSideBar className="col-start-1 col-end-2" />

                <div className="col-start-2 col-end-3 flex justify-center text-center">
                    <div className="pt-10">
                        <h1 className="text-3xl pb-1 pl-5 flex justify-left">
                            <strong>Match Timetable</strong>
                        </h1>
                        <MatchSchedule />

                        <div className="pt-13 mb-30 flex justify-center w-full">
                            <Box sx={{ width: '100%', height: 550, maxWidth: 480, bgcolor: 'background.paper', borderRadius: '8px' }}>
                                <h1 className="text-3xl pb-3 pt-5 flex justify-center">
                                    <strong>Schedule Matches</strong>
                                </h1>
                                <div className="pt-5">
                                    <TextField select label="Home Team" variant="outlined" sx={{ width: '250px' }}
                                        value={selectedMatch.homeTeam}
                                        onChange={(e) => setSelectedMatch({ ...selectedMatch, homeTeam: e.target.value })}
                                    >
                                        {teams.map(team => (
                                            <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="pt-5">
                                    <TextField select label="Away Team" variant="outlined" sx={{ width: '250px' }}
                                        value={selectedMatch.awayTeam}
                                        onChange={(e) => setSelectedMatch({ ...selectedMatch, awayTeam: e.target.value })}
                                    >
                                        {teams.map(team => (
                                            <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="pt-5">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Date" sx={{ width: '250px' }}
                                            value={selectedMatch.date}
                                            onChange={(date) => setSelectedMatch({ ...selectedMatch, date })}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="pt-5">
                                    <TextField select label="Referee" variant="outlined" sx={{ width: '250px' }}
                                        value={selectedMatch.referee}
                                        onChange={(e) => setSelectedMatch({ ...selectedMatch, referee: e.target.value })}
                                    >
                                        {referees.map(ref => (
                                            <MenuItem key={ref.id} value={ref.name}>{ref.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="pt-5">
                                    <TextField select label="Venue" variant="outlined" sx={{ width: '250px' }}
                                        value={selectedMatch.field}
                                        onChange={(e) => setSelectedMatch({ ...selectedMatch, field: e.target.value })}
                                    >
                                        {fields.map(field => (
                                            <MenuItem key={field.id} value={field.location}>{field.location}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="pt-5">
                                    <Button variant="contained" color="primary">Schedule Match</Button>
                                </div>
                            </Box>
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

export default Matches;
