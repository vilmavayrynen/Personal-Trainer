import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar } from '@mui/material';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
       fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
    }  

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/'+id, 
            { method: 'DELETE' })
            .then (response => {
                if (response.ok) {
                    setMsg('Training deleted!')
                    setOpen();
                    fetchTraining();
                }
                else {
                    alert('Something went wrong!')
                }
            })
        }
        
    }

    const columns = [
        { 
            field: 'activity', 
            sortable: true, 
            filter: true, 
            width: 130
        },
        { 
            field: 'date', 
            sortable: true, 
            filter: true,
            valueFormatter: params => 
            format(new Date(params.value), 'dd.MM.yyyy hh:mm')
        },
        { 
            field: 'duration', 
            sortable: true, 
            filter: true, 
            width: 120 
        },
        { 
            headerName: 'Customer',
            field: 'customer.firstname', 
            sortable: true, 
            filter: true, 
            width: 130
        },
        { 
            headerName: 'Last Name',
            field: 'customer.lastname', 
            sortable: true, 
            filter: true, 
            width: 130
        },
        {
            headerName: 'Delete Training',
            field: 'id',
            width: 150,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>

        }
    ]

    return(
        <>
            <div 
                className="ag-theme-material" 
                style={{height: 600, width: '99%%'}}
            >
             <AgGridReact
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={10}
                suppressCellFocus={true}
             />
            </div>
            <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default Traininglist;