'use client';
import { VscAccount } from "react-icons/vsc";
import { FcConferenceCall } from "react-icons/fc";
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

export default function FieldOwnerNav() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className="w-full h-20 bg-white-500 flex items-end text-xl m-0 pl-0 border-b-1 border-gray-400">

        <div className="h-full flex items-center pl-15">
          <div>
            <FcConferenceCall className="h-18 w-18"/>
          </div>
        </div>

      <div className="flex justify-center items-center w-full">
        <ul className="object-center flex space-x-8">
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/Dashboard" className="px-6 py-3">Dashboard</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/FieldBookings" className="px-6 py-3">Field Bookings</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/MatchSchedule" className="px-6 py-3">Match Schedule</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/FieldMaintenance" className="px-6 py-3">Field Maintenance</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/NotificationsPage" className="px-6 py-3">Notifications</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/fieldowner/NavBarLinks/SettingsPage" className="px-6 py-3">Settings</a></li>
        </ul>
      </div>

        <div className="h-full flex items-center pr-15">
          <div>
          <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 50, height: 50, backgroundColor: '#b0edff' }}>A</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1,},
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <a href="">
                <MenuItem onClick={handleClose} sx={{width: '180px', paddingTop: '10px', paddingBottom: '10px'}}>
                  <Avatar/>Profile
                </MenuItem>
                </a>
                <a href="/">
                <MenuItem onClick={handleClose} sx={{width: '180px', paddingTop: '10px', paddingBottom: '10px'}}>
                  <ListItemIcon>
                    <Logout fontSize="small"/>
                  </ListItemIcon>
                  Logout
                </MenuItem>
                </a>
              </Menu>
            </React.Fragment>
          </div>
        </div>

      </div>
    );
  }