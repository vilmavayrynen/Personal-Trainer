import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

function Addcustomer({ addCustomer }) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: ''
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addCustomer(customer);
    setCustomer({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    })
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <Stack 
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      >
        <Button 
          variant="outlined"
          onClick={handleClickOpen}>
          New Customer
        </Button>
      </Stack>
      
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            name="email"
            value={customer.email}
            onChange={inputChanged}
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant="standard"
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            name="city"
            value={customer.city}
            onChange={inputChanged}
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Addcustomer;