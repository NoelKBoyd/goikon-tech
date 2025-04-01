import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, form, appearances, goals, assists, cleansheets) {
  return { name, form, appearances, goals, assists, cleansheets };
}

const rows = [
  createData('Lionel Messi', 9.1, 159, 172, 124, 54),
  createData('Crister Ronaldo', 8.4, 237, 252, 77, 48),
  createData('Ali Abbas', 9.9, 100, 170, 80, 95),
  createData('Hafeez', 7.9, 100, 64, 99, 2),
  createData('Shrek', 4.0, 356, 136, 489, 200),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell align="right">Form&nbsp;(10.0)</TableCell>
            <TableCell align="right">Appearances</TableCell>
            <TableCell align="right">Goals</TableCell>
            <TableCell align="right">Assists</TableCell>
            <TableCell align="right">Clean Sheets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.form}</TableCell>
              <TableCell align="right">{row.appearances}</TableCell>
              <TableCell align="right">{row.goals}</TableCell>
              <TableCell align="right">{row.assists}</TableCell>
              <TableCell align="right">{row.cleansheets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


