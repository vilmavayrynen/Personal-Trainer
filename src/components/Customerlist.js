import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';
import Updatecustomer from './Updatecustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
       fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    
    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong adding a new customer!');
            }
        })
        .catch(err => console.error(err))
    }
    
    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, 
        {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer edited succesfully!');
                setOpen(true);
                fetchCustomers();
            }
            else {
                alert('Something went wrong updating customer!');
            }
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(
            link,
            { method: 'DELETE' })
            .then (response => {
                if (response.ok) {
                    setMsg('Customer deleted!')
                    setOpen(true);
                    fetchCustomers();
                }
                else {
                    alert('Something went wrong deleting customer!')
                }
            })
        }
        
    }

    const addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok) {
            }
            else {
                alert('Something went wrong adding a new training!');
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        { 
            field: 'firstname', 
            sortable: true, 
            filter: true, 
            width: 150 
        },
        { 
            field: 'lastname', 
            sortable: true, 
            filter: true, 
            width: 150 
        },
        { 
            field: 'email', 
            sortable: true, 
            filter: true, 
            width: 180 
        },
        { 
            field: 'phone', 
            sortable: true, 
            filter: true, 
            width: 130 
        },
        { 
            field: 'streetaddress', 
            sortable: true, 
            filter: true, 
            width: 180 
        },
        { 
            field: 'postcode', 
            sortable: true, 
            filter: true, 
            width: 130 
        },
        { 
            field: 'city', 
            sortable: true, 
            filter: true, 
            width: 130 
        },
        {
            headerName: '',
            width: 105,
            field: 'links.0.href',
            cellRenderer: params => 
                <Updatecustomer
                    updateCustomer={updateCustomer}
                    params={params} 
                />
        },
        {
            headerName: '',
            width: 105,
            field: 'links.0.href',
            cellRenderer: params => 
                <IconButton 
                    color="error"
                    onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>

        },
        {
            headerName: 'Add Training',
            width: 150,
            field: 'links.2.href',
            cellRenderer: params =>
                <Addtraining 
                    addTraining={addTraining}
                    params={params}
                />
        }
    ]

    return(
        <>
            <Addcustomer addCustomer={addCustomer} />
            <div 
                className="ag-theme-material" 
                style={{height: 700, width: '98%'}}
            >
             <AgGridReact
                columnDefs={columns}
                rowData={customers}
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

export default Customerlist;