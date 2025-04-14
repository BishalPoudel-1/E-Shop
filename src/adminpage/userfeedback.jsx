import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../pages/firebase'; 
import { Rings } from 'react-loader-spinner'; 
import './DataTable.css';

const columns = [
    { field: 'name', headerName: 'Name', width: 195, headerClassName: 'bold-header'  },
    { field: 'email', headerName: 'Email', width: 200, headerClassName: 'bold-header'  },
    { field: 'subject', headerName: 'Subject', width: 200, headerClassName: 'bold-header'  },
    { field: 'message', headerName: 'Message', width: 200 , headerClassName: 'bold-header' },
    
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Feedback'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data()
        }));
        setRows(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Rings
            visible={true}
            height="150"
            width="150"
            color="#367588"
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <Paper sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            sx={{ border: 0 }}
          />
        </Paper>
      )}
    </>
  );
}
