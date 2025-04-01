"use client";
import { useState, useEffect } from "react";
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';


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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
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

function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [teams, setTeams] = useState([]);
  const searchedTeams = teams.length;
  const [managers, setManagers] = useState([]);
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    id: "",
    name: "",
    managerId: "",
    location: "",
    ageGroup: "",
    contactInfo: "",
  });

  const filteredRows = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.ageGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.contactInfo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Fetch the initial list of teams from the API
    const fetchTeams = async () => {
      const response = await fetch("/api/auth/admin/teams/getTeams");
      const data = await response.json();
      setTeams(data);
    };

    // Fetch the list of managers
    const fetchManagers = async () => {
      const response = await fetch("/api/auth/admin/teams/viewManagers");
      const data = await response.json();
      setManagers(data);
    };

    fetchTeams();
    fetchManagers();
  }, []);

  const handleAddTeamSubmit = async () => {
    try {
      const response = await fetch("/api/auth/admin/teams/addTeams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        throw new Error("Failed to add team");
      }

      const addedTeam = await response.json();
      setTeams((prevTeams) => [...prevTeams, addedTeam]); // Add the new team to the state
      setIsAddTeamDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <header>
        <AdminNav />
      </header>

      <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen">
        <AdminSideBar className="col-start-1 col-end-2" />

        <div className="col-start-2 col-end-3 flex justify-center text-center">
          <div className="pt-5">
            <h1 className="text-3xl pb-3 pl-2 flex justify-left">
              <strong>Teams</strong>
            </h1>
            <div className="flex justify-left">
              <Search sx={{ marginBottom: '15px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)', }}>
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

            <TableContainer
              component={Paper}
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: 800 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Team ID</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Manager</StyledTableCell>
                    <StyledTableCell align="right">Location</StyledTableCell>
                    <StyledTableCell align="right">Age</StyledTableCell>
                    <StyledTableCell align="right">Contact Info</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.slice(0, searchedTeams).map((team) => {
                    // Ensure manager is fetched correctly
                    const manager = team.manager
                      ? team.manager.name
                      : "Unknown"; // Ensure the manager name is used correctly
                    return (
                      <StyledTableRow key={team.id || team.name} sx={{ '&:hover': { backgroundColor: '#cae2fc' } }}>
                        <StyledTableCell component="th" scope="row">
                          {team.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {manager}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.location}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.ageGroup}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {team.contactInfo}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddTeamDialogOpen(true)}
              sx={{ marginTop: "15px" }}
            >
              Add Team
            </Button>
          </div>
        </div>
      </main>

      <footer>
        <AdminFooter />
      </footer>

      <Dialog
        open={isAddTeamDialogOpen}
        onClose={() => setIsAddTeamDialogOpen(false)}
      >
        <DialogTitle>Add Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            fullWidth
            variant="outlined"
            name="name"
            value={newTeam.name}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            label="Manager"
            fullWidth
            variant="outlined"
            name="managerId"
            value={newTeam.managerId}
            onChange={handleInputChange}
          >
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            name="location"
            value={newTeam.location}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Age Group"
            fullWidth
            variant="outlined"
            name="ageGroup"
            value={newTeam.ageGroup}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Contact Info"
            fullWidth
            variant="outlined"
            name="contactInfo"
            value={newTeam.contactInfo}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddTeamDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTeamSubmit} color="primary">
            Add Team
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TeamPage;
