import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';

function MenuBar({ onMenuClick }) {
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    navigate('/'); // Redirect to login
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <div className="menubar">
      <button className="hamburger" onClick={onMenuClick}>☰</button>
      <button className="logoutBtn" onClick={handleLogoutClick}>Logout</button>

      <Dialog open={openLogoutDialog} onClose={handleCancelLogout}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MenuBar;
