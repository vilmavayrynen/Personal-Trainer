import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist'; 

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Personal Training
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
      <br></br>
        <Link to="/">Customers</Link>{' '}
        <Link to="/Trainings">Trainings</Link>{' '}
        <Routes>
          <Route path="/" element={<Customerlist />} />
          <Route path="/Trainings" element={<Traininglist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
