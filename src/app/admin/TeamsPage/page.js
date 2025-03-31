"use client";
import { useEffect, useState } from "react";
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Team = () => {
  const [managers, setManagers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [teamData, setTeamData] = useState({
    name: "",
    location: "",
    ageGroup: "",
    contactInfo: "",
  });

  useEffect(() => {
    async function fetchManagers() {
      try {
        const response = await fetch("/api/auth/admin/viewManagers");
        if (!response.ok) throw new Error("Failed to fetch managers");
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    }

    async function fetchTeams() {
      try {
        const response = await fetch("/api/auth/admin/viewTeams");
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchManagers();
    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedManager) {
      alert("Please select a manager.");
      return;
    }

    const teamPayload = {
      ...teamData,
      managerId: selectedManager,
    };

    try {
      const response = await fetch("/api/auth/admin/addTeams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamPayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Team added successfully");
        setTeams([...teams, result]); // Update the teams list
      } else {
        alert(result.error || "Failed to add team");
      }
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  return (
    <div>
      <header>
        <AdminNav />
      </header>
      <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-full">
        <AdminSideBar className="col-start-1 col-end-2" />
        <div className="col-start-2 col-end-3 flex flex-col items-center text-center">
          <div className="pt-10">
            <h1 className="text-3xl pb-1 pl-5 flex justify-left">
              <strong>Add New Team</strong>
            </h1>
            <TextField label="Team Name" name="name" value={teamData.name} onChange={handleInputChange} sx={{ width: "250px", marginBottom: "10px" }} />
            <TextField label="Location" name="location" value={teamData.location} onChange={handleInputChange} sx={{ width: "250px", marginBottom: "10px" }} />
            <TextField label="Age Group" name="ageGroup" value={teamData.ageGroup} onChange={handleInputChange} sx={{ width: "250px", marginBottom: "10px" }} />
            <TextField label="Contact Info" name="contactInfo" value={teamData.contactInfo} onChange={handleInputChange} sx={{ width: "250px", marginBottom: "10px" }} />
            <TextField select label="Select Manager" value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)} sx={{ width: "250px", marginBottom: "10px" }}>
              {managers.length === 0 ? (
                <MenuItem disabled value="">
                  No Managers Available
                </MenuItem>
              ) : (
                managers.map((manager) => (
                  <MenuItem key={manager.id} value={manager.id}>
                    {manager.name}
                  </MenuItem>
                ))
              )}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Add Team</Button>
          </div>
          <div className="mt-10 w-3/4">
            <h2 className="text-2xl mb-4">Teams</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Age Group</TableCell>
                    <TableCell>Contact Info</TableCell>
                    <TableCell>Manager</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>{team.location}</TableCell>
                      <TableCell>{team.ageGroup}</TableCell>
                      <TableCell>{team.contactInfo}</TableCell>
                      <TableCell>{team.manager ? team.manager.name : "Unassigned"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </main>
      <footer>
        <AdminFooter />
      </footer>
    </div>
  );
};

export default Team;
