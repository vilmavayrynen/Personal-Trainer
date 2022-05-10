import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function Addtraining({ addTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
      date: '',
      duration: '',
      activity: '',
      customer: '',
    });

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      customer: params.data.links[0].href});
  };

  const handleClose = () => {
    setOpen({
      date: '',
      duration: '',
      activity: '',
    })
    setOpen(false);
  };

  const handleSave = () => {
      addTraining({...training, date: new Date(training.date).toISOString()});
      setTraining({
          date: '',
          duration: '',
          activity: '',
        })
    setOpen(false);
  };

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  return (
    <div>
        <IconButton onClick={handleClickOpen}>
            <AddIcon />
        </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            name="date"
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            fullWidth
            variant="standard"
          />
          <TextField
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
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

export default Addtraining;