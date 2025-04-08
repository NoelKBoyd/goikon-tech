'use client';
import { useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import TextField from '@mui/material/TextField';
import RefereeNav from "@/app/Components/RefereeNav";
import RefereeSideBar from "@/app/Components/RefereeSideBar";
import RefereeFooter from "@/app/Components/RefereeFooter";

function userData(userId, name, address, dateOfBirth, email, phone, roleId) {
    return { userId, name, address, dateOfBirth, email, phone, roleId };
  }

const users = [
    userData(1, "Alice Johnson", "123 Main St, Springfield", "15-05-1990", "alice.johnson@example.com", "1234567890", 2),
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const Settings = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <div>
            <header>
                <RefereeNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <RefereeSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center pb-15'>
                    <div className="pt-10">
                        <h1 className="text-3xl pl-2 flex justify-left"><strong>Settings</strong></h1>
                        <div className="pt-5">
                            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto', width: 'auto', borderRadius: '8px', marginBottom: '50px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)', }}>
                                <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}>
                                    <Tab label="General Settings" {...a11yProps(0)} sx={{'&:hover': {backgroundColor: '#cae2fc'}}}/>
                                    <Tab label="Account Settings" {...a11yProps(1)} sx={{'&:hover': {backgroundColor: '#cae2fc'}}}/>
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <div style={{ padding: '40px', backgroundColor: '#f5faff', borderRadius: '8px', width: '400px', }}>
                                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>General Settings</h2>
                                        <div className="w-full">
                                            <h3 className="text-xl pb-5">-- MODE --</h3>
                                            <div>
                                                <Button variant="outlined" sx={{marginRight: '5px', color: '#000', borderColor: '#000', '&:hover': {backgroundColor: '#fff', borderColor: '#000'}}}><MdLightMode className="mr-2"/> Light Mode</Button>
                                                <Button variant="contained" sx={{marginLeft: '5px', color: '#fff', backgroundColor: '#555', '&:hover': {backgroundColor: '#555'}}}> <MdDarkMode className="mr-2"/> Dark Mode</Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {users.map((user) => (
                                    <div key={user.userId} style={{ padding: '50px', backgroundColor: '#f5faff', borderRadius: '8px', width: '400px', }}>
                                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Account Seetings</h2>
                                        <div className="w-full">
                                            <h3 className="text-xl pb-5">-- Account Details --</h3>
                                            <div className="flex flex-col justify-center gap-5">
                                                <TextField id="outlined-basic" label="Name" variant="outlined" value={user.name}/>
                                                <TextField id="outlined-basic" label="Address" variant="outlined" value={user.address}/>
                                                <TextField id="outlined-basic" label="Date of birth" variant="outlined" value={user.dateOfBirth}/>
                                                <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email}/>
                                                <TextField id="outlined-basic" label="Phone" variant="outlined" value={user.phone}/>
                                                <Button variant="contained" sx={{marginTop: '10px'}}>Save Changes</Button>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </TabPanel>
                            </Box>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <RefereeFooter />
            </footer>
        </div>
    );
};

export default Settings;