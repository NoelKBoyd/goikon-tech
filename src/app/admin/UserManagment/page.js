'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState } from 'react';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));


  function userData(userId, name, address, dateOfBirth, email, phone, roleId) {
    return { userId, name, address, dateOfBirth, email, phone, roleId };
  }
  
  const users = [
    userData(1, "Alice Johnson", "123 Main St, Springfield", "15-05-1990", "alice.johnson@example.com", "1234567890", 2),
    userData(2, "Bob Smith", "456 Elm St, Springfield", "22-08-1985", "bob.smith@example.com", "9876543210", 1),
    userData(3, "Charlie Brown", "789 Oak St, Springfield", "30-11-1992", "charlie.brown@example.com", "4567891230", 3),
    userData(4, "Diana Prince", "321 Maple St, Springfield", "12-03-1988", "diana.prince@example.com", "7891234560", 4),
    userData(5, "Ethan Hunt", "654 Pine St, Springfield", "19-07-1995", "ethan.hunt@example.com", "3216549870", 1),
    userData(6, "Fiona Gallagher", "987 Birch St, Springfield", "25-02-1993", "fiona.gallagher@example.com", "6549873210", 3),
    userData(7, "George Miller", "159 Cedar St, Springfield", "10-09-1987", "george.miller@example.com", "7896541230", 2),
    userData(8, "Hannah Baker", "753 Walnut St, Springfield", "05-12-1991", "hannah.baker@example.com", "1237894560", 4),
    userData(9, "Ian Wright", "852 Chestnut St, Springfield", "18-06-1989", "ian.wright@example.com", "9873216540", 1),
    userData(10, "Julia Roberts", "951 Aspen St, Springfield", "22-04-1994", "julia.roberts@example.com", "4561237890", 2),
    userData(11, "Michael Scott", "1725 Slough Ave, Scranton", "15-03-1975", "michael.scott@example.com", "1239874560", 3),
    userData(12, "Pam Beesly", "112 Paper St, Scranton", "25-06-1980", "pam.beesly@example.com", "4567893210", 2),
    userData(13, "Jim Halpert", "456 Dwight St, Scranton", "20-10-1978", "jim.halpert@example.com", "7891236540", 4),
    userData(14, "Dwight Schrute", "123 Beet Farm Rd, Scranton", "04-01-1976", "dwight.schrute@example.com", "3216549870", 1),
    userData(15, "Angela Martin", "789 Cat Ln, Scranton", "14-09-1982", "angela.martin@example.com", "6543217890", 2),
    userData(16, "Kevin Malone", "951 Chili St, Scranton", "01-07-1979", "kevin.malone@example.com", "9876541230", 3),
    userData(17, "Stanley Hudson", "753 Pretzel Ave, Scranton", "19-08-1968", "stanley.hudson@example.com", "1234569870", 4),
    userData(18, "Kelly Kapoor", "852 Gossip Rd, Scranton", "05-02-1985", "kelly.kapoor@example.com", "7896543210", 1),
    userData(19, "Ryan Howard", "369 Temp St, Scranton", "30-11-1983", "ryan.howard@example.com", "4561237890", 2),
    userData(20, "Toby Flenderson", "147 HR Blvd, Scranton", "12-05-1974", "toby.flenderson@example.com", "3219876540", 3),
];

const Reports = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [usersToShow] = useState(users.length);
    const [selectedUser, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isEditMode, setEditMode] = useState(false); 
    const [editableData, setEdit] = useState(null); 

    const filteredRows = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rowClick = (name) => {
        setSelectedTeamId(name);
    };

    const openPopup = (user) => {
        setSelectedMatch(user);
        setEdit({ ...user });
        setPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedMatch(null);
        setEditMode(false); 
        setPopupOpen(false);
    };

    const handleEditClick = () => {
        setEditMode(true); 
    };

    const handleSaveClick = () => {
 
        setSelectedMatch(editableData);

        const userIndex = users.findIndex((user) => user.userId === editableData.userId);
        
        if (userIndex !== -1) {
            users[userIndex] = { ...editableData };
        }

        setEditMode(false);
    };

    const handleInputChange = (field, value) => {
        setEdit((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <AdminSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-5">

                            <h1 className="text-3xl pb-3 pl-2 flex justify-left">
                                <strong>User Managment</strong>
                            </h1>

                        <div className="flex justify-left">
                            <Search sx={{marginBottom: '15px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',}}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Search>
                        </div>

                        <div className="pt-1">
                            <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <Table stickyHeader sx={{ minWidth: 800 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">User ID</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Address</StyledTableCell>
                                            <StyledTableCell align="center">Date of birth</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Phone</StyledTableCell>
                                            <StyledTableCell align="center">Role ID</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredRows.slice(0, usersToShow).map((user) => (
                                            <StyledTableRow
                                                key={user.name}
                                                onClick={() => {
                                                    openPopup(user);
                                                }}
                                                onMouseOver={() => rowClick(user.name)}
                                                style={{
                                                    backgroundColor: user.name === selectedTeamId ? '#cae2fc' : 'inherit',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <StyledTableCell component="th" scope="row" align="center">{user.userId}</StyledTableCell>
                                                <StyledTableCell align="center">{user.name}</StyledTableCell>
                                                <StyledTableCell align="center">{user.address}</StyledTableCell>
                                                <StyledTableCell align="center">{user.dateOfBirth}</StyledTableCell>
                                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                                <StyledTableCell align="center">{user.roleId}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>

            <Dialog open={isPopupOpen} onClose={closePopup} sx={{ textAlign: 'center'}}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent sx={{ width: '600px' }}>
                    {selectedUser && (
                        <div>
                            {isEditMode ? (
                                <div>
                                    <h2 className="pb-2"><strong>Name: </strong></h2>
                                    <TextField slotProps={{ textField: { size: 'small' } }} id="outlined-basic" label="Name" variant="outlined" value={editableData.name} onChange={(e) => handleInputChange('name', e.target.value)}/>
                                    
                                    <h2 className="pb-2"><strong>Address: </strong></h2>
                                    <TextField id="outlined-basic" label="Address" variant="outlined" value={editableData.address} onChange={(e) => handleInputChange('address', e.target.value)}/>
                                    
                                    <h2 className="pb-2"><strong>Date of birth: </strong></h2>
                                    <TextField id="outlined-basic" label="Date of birth" variant="outlined" value={editableData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}/>
                                    
                                    <h2 className="pb-2"><strong>Email: </strong></h2>
                                    <TextField id="outlined-basic" label="Email" variant="outlined" value={editableData.email} onChange={(e) => handleInputChange('email', e.target.value)}/>
                                    
                                    <h2 className="pb-2"><strong>Phone: </strong></h2>
                                    <TextField id="outlined-basic" label="Phone" variant="outlined" value={editableData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}/>
                                    
                                    <h2 className="pb-2"><strong>Role ID: </strong></h2>
                                    <TextField id="outlined-basic" label="Role" variant="outlined" value={editableData.roleId} onChange={(e) => handleInputChange('roleId', e.target.value)}/>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="p-2"><strong>Name: </strong> {selectedUser.name}</h2>
                                    <h2 className="p-2"><strong>Address: </strong> {selectedUser.address}</h2>
                                    <h2 className="p-2"><strong>Date of birth: </strong> {selectedUser.dateOfBirth}</h2>
                                    <h2 className="p-2"><strong>Email: </strong> {selectedUser.email}</h2>
                                    <h2 className="p-2"><strong>Phone: </strong> {selectedUser.phone}</h2>
                                    <h2 className="p-2"><strong>Role ID: </strong> {selectedUser.roleId}</h2>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    {isEditMode ? (
                        <Button onClick={handleSaveClick}>Save</Button>
                    ) : (
                        <Button onClick={handleEditClick}>Edit</Button>
                    )}
                    <Button onClick={closePopup}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Reports;