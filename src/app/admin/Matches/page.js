import { useEffect, useState } from "react";
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Matches = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [teamData, setTeamData] = useState({
    name: "",
    location: "",
    ageGroup: "",
    contactInfo: "",
  });

  const [loadingManagers, setLoadingManagers] = useState(false);

  useEffect(() => {
    async function fetchManagers() {
      setLoadingManagers(true);
      try {
        const response = await fetch("/api/auth/admin/viewManagers");
        if (!response.ok) throw new Error("Failed to fetch managers");
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      } finally {
        setLoadingManagers(false);
      }
    }
    fetchManagers();
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
      const response = await fetch("/api/addTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamPayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Team added successfully");
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
        <div className="col-start-2 col-end-3 flex justify-center text-center">
          <div className="pt-10">
            <h1 className="text-3xl pb-1 pl-5 flex justify-left">
              <strong>Add New Team</strong>
            </h1>
            <TextField
              label="Team Name"
              variant="outlined"
              name="name"
              value={teamData.name}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
            />
            <TextField
              label="Location"
              variant="outlined"
              name="location"
              value={teamData.location}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
            />
            <TextField
              label="Age Group"
              variant="outlined"
              name="ageGroup"
              value={teamData.ageGroup}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
            />
            <TextField
              label="Contact Info"
              variant="outlined"
              name="contactInfo"
              value={teamData.contactInfo}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
            />
            <TextField
              select
              label="Select Manager"
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
              sx={{ width: "250px", marginBottom: "10px" }}
              required // Add required prop for better UX
            >
              {managers.length === 0 ? (
                <MenuItem disabled value="">
                  {loadingManagers
                    ? "Loading managers..."
                    : "No Managers Available"}
                </MenuItem>
              ) : (
                [
                  <MenuItem key="empty" value="" disabled>
                    Select a manager
                  </MenuItem>,
                  ...managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.firstName} {manager.lastName}
                    </MenuItem>
                  )),
                ]
              )}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Team
            </Button>
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
