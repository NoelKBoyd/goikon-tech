'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState, useEffect } from 'react';
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

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [users, setUsers] = useState([]); // Replace static array with state
  const [usersToShow] = useState(20); // You can adjust this
  const [selectedUser, setSelectedMatch] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editableData, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/admin/userManagement/viewUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



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

  const SaveClick = async () => {
    try {
      if (!editableData.id) {
        console.error("User ID is missing");
        return;
      }
  
      console.log("Sending update request for user:", editableData.id);
  
      const response = await fetch(`/api/auth/admin/userManagement/editUsers`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editableData.id,  // Send ID in the body
          name: editableData.name || "",
          address: editableData.address || "",
          dateOfBirth: editableData.dateOfBirth ? new Date(editableData.dateOfBirth).toISOString() : "",
          email: editableData.email || "",
          phone: editableData.phone || "",
          roleId: Number(editableData.roleId) || 0,
        }),
      });
      
  
      console.log("Response received:", response);
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response format:", await response.text());
        throw new Error("Received non-JSON response (API might be misconfigured)");
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }
  
      const updatedUser = await response.json();
      console.log("User updated successfully:", updatedUser);
  
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
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
        <AdminSideBar className='col-start-1 col-end-2' />

        <div className='col-start-2 col-end-3 flex justify-center text-center'>
          <div className="pt-5">
            <h1 className="text-3xl pb-3 pl-2 flex justify-left">
              <strong>User Management</strong>
            </h1>

            <div className="flex justify-left">
              <Search sx={{ marginBottom: '15px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
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
              {loading ? (
                <div>Loading users...</div>
              ) : (
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
                          key={user.id} // Changed from user.name to user.id
                          onClick={() => {
                            openPopup(user);
                          }}
                          onMouseOver={() => rowClick(user.name)}
                          style={{
                            backgroundColor: user.name === selectedTeamId ? '#cae2fc' : 'inherit',
                            cursor: 'pointer',
                          }}
                        >
                          <StyledTableCell component="th" scope="row" align="center">{user.id}</StyledTableCell>
                          <StyledTableCell align="center">{user.name}</StyledTableCell>
                          <StyledTableCell align="center">{user.address || 'N/A'}</StyledTableCell>
                          <StyledTableCell align="center">{user.dateOfBirth}</StyledTableCell>
                          <StyledTableCell align="center">{user.email}</StyledTableCell>
                          <StyledTableCell align="center">{user.phone || 'N/A'}</StyledTableCell>
                          <StyledTableCell align="center">{user.roleId}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <AdminFooter />
      </footer>

      <Dialog open={isPopupOpen} onClose={closePopup} sx={{ textAlign: 'center' }}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent sx={{ width: '600px' }}>
          {selectedUser && (
            <div>
              {isEditMode ? (
                <div className="flex flex-col gap-5 items-center justify-center pt-3">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={editableData.name || ""}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    value={editableData.address || ""}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Date of birth"
                    variant="outlined"
                    value={editableData.dateOfBirth || ""}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={editableData.email || ""}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    value={editableData.phone || ""}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />

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
            <Button onClick={SaveClick}>Save</Button>
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