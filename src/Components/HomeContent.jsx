import React, { useState, useEffect } from 'react';
import './HomeContent.css';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Card, CardContent, Typography,
  Grid, IconButton, Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function HomeContent({ selectedScreen }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    sysQty: '',
    accQty: '',
    remarks: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('inventoryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = () => {
    setFormData({ itemCode: '', itemName: '', sysQty: '', accQty: '', remarks: '' });
    setEditIndex(null);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.itemCode || !formData.itemName || !formData.sysQty || !formData.accQty) {
      alert('Please fill required fields.');
      return;
    }

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = formData;
      setItems(updated);
      console.log('Item updated:', editIndex);
      console.log('Updated item:', updated);
    } else {
      setItems([...items, formData]);
    }

    setOpenDialog(false);
    setFormData({ itemCode: '', itemName: '', sysQty: '', accQty: '', remarks: '' });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(items[index]);
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div className="homeContent">
      {selectedScreen === 'Dashboard' && (
        <>
          <div className="topBar">
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Add Item
            </Button>
          </div>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
            <DialogTitle>{editIndex !== null ? 'Edit Item' : 'Add Item'}</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth label="Item Code" name="itemCode"
                    value={formData.itemCode} onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth label="Item Name" name="itemName"
                    value={formData.itemName} onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth label="System Qty" name="sysQty" type="number"
                    value={formData.sysQty} onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth label="Actual Qty" name="accQty" type="number"
                    value={formData.accQty} onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth label="Remarks" name="remarks" multiline rows={2}
                    value={formData.remarks} onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSubmit} color="primary">{editIndex !== null ? 'Update' : 'Submit'}</Button>
            </DialogActions>
          </Dialog>

          <Box mt={4}>
            <Typography variant="h6">Submitted Items</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mt: 2, pb: 1 }}>
              {items.map((item, index) => (
                <Card key={index} sx={{ minWidth: 250 }}>
                  <CardContent>
                    <Typography variant="subtitle1"><strong>Item Code:</strong> {item.itemCode}</Typography>
                    <Typography variant="body2"><strong>Name:</strong> {item.itemName}</Typography>
                    <Typography variant="body2"><strong>Sys Qty:</strong> {item.sysQty}</Typography>
                    <Typography variant="body2"><strong>Acc Qty:</strong> {item.accQty}</Typography>
                    <Typography variant="body2"><strong>Remarks:</strong> {item.remarks}</Typography>
                    <Box mt={1} display="flex" justifyContent="space-between">
                      <IconButton onClick={() => handleEdit(index)} color="primary"><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(index)} color="error"><Delete /></IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </>
      )}

      {selectedScreen === 'Profile' && (
        <>
          <h1>Profile</h1>
          <p>View and edit your profile here.</p>
        </>
      )}

      {selectedScreen === 'Settings' && (
        <>
          <h1>Settings</h1>
          <p>Change your preferences and app settings.</p>
        </>
      )}
    </div>
  );
}

export default HomeContent;
