'use client';

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

export default function PlayerStats() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/auth/stats')
      .then(res => res.json())
      .then(data => setPlayers(data.players || []))
      .catch(err => console.error('Failed to load stats:', err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="player stats table">
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell align="right">Form (10.0)</TableCell>
            <TableCell align="right">Appearances</TableCell>
            <TableCell align="right">Goals</TableCell>
            <TableCell align="right">Assists</TableCell>
            <TableCell align="right">Clean Sheets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell align="right">{player.form}</TableCell>
              <TableCell align="right">{player.appearances}</TableCell>
              <TableCell align="right">{player.goals}</TableCell>
              <TableCell align="right">{player.assists}</TableCell>
              <TableCell align="right">{player.cleansheets ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
