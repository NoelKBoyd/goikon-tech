"use client";
import { useEffect, useState } from "react";
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Matches = () => {
  const [teams, setTeams] = useState([]);
  const [fields, setFields] = useState([]);
  const [matchData, setMatchData] = useState({
    homeTeamId: "",
    awayTeamId: "",
    date: "",
    fieldId: "",
  });

  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);

  useEffect(() => {
    async function fetchTeams() {
      setLoadingTeams(true);
      try {
        const response = await fetch("/api/auth/admin/getTeams");
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoadingTeams(false);
      }
    }

    async function fetchFields() {
      setLoadingFields(true);
      try {
        const response = await fetch("/api/auth/admin/viewFields");
        if (!response.ok) throw new Error("Failed to fetch fields");
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error("Error fetching fields:", error);
      } finally {
        setLoadingFields(false);
      }
    }

    fetchTeams();
    fetchFields();
  }, []);

  const handleInputChange = (e) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { homeTeamId, awayTeamId, date, fieldId } = matchData;

    if (!homeTeamId || !awayTeamId || !date || !fieldId) {
      alert("Please fill in all the fields.");
      return;
    }

    const matchPayload = {
      ...matchData,
    };

    try {
      const response = await fetch("/api/addMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchPayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Match added successfully");
      } else {
        alert(result.error || "Failed to add match");
      }
    } catch (error) {
      console.error("Error adding match:", error);
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
              <strong>Add New Match</strong>
            </h1>
            <TextField
              select
              label="Select Home Team"
              name="homeTeamId"
              value={matchData.homeTeamId}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
              required
            >
              {teams.length === 0 ? (
                <MenuItem disabled value="">
                  {loadingTeams ? "Loading teams..." : "No Teams Available"}
                </MenuItem>
              ) : (
                [
                  <MenuItem key="empty" value="" disabled>
                    Select a home team
                  </MenuItem>,
                  ...teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  )),
                ]
              )}
            </TextField>

            <TextField
              select
              label="Select Away Team"
              name="awayTeamId"
              value={matchData.awayTeamId}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
              required
            >
              {teams.length === 0 ? (
                <MenuItem disabled value="">
                  {loadingTeams ? "Loading teams..." : "No Teams Available"}
                </MenuItem>
              ) : (
                [
                  <MenuItem key="empty" value="" disabled>
                    Select an away team
                  </MenuItem>,
                  ...teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  )),
                ]
              )}
            </TextField>

            <TextField
              type="datetime-local"
              label="Match Date"
              name="date"
              value={matchData.date}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
              required
            />

            <TextField
              select
              label="Select Field"
              name="fieldId"
              value={matchData.fieldId}
              onChange={handleInputChange}
              sx={{ width: "250px", marginBottom: "10px" }}
              required
            >
              {fields.length === 0 ? (
                <MenuItem disabled value="">
                  {loadingFields ? "Loading fields..." : "No Fields Available"}
                </MenuItem>
              ) : (
                [
                  <MenuItem key="empty" value="" disabled>
                    Select a field
                  </MenuItem>,
                  ...fields.map((field) => (
                    <MenuItem key={field.id} value={field.id}>
                      {field.location}
                    </MenuItem>
                  )),
                ]
              )}
            </TextField>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Match
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
