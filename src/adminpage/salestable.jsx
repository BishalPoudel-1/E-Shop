import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../pages/firebase'; 
import { Rings } from 'react-loader-spinner'; 
import './DataTable.css'; 

const columns = [
    { field: 'id', headerName: 'Product ID', width: 195, headerClassName: 'bold-header' },
    { field: 'productName', headerName: 'Product Name', width: 150, headerClassName: 'bold-header' },
    { field: 'Username', headerName: 'Username', width: 130, headerClassName: 'bold-header' },
    { field: 'Email', headerName: 'Email', width: 200, headerClassName: 'bold-header' },
    { field: 'Address', headerName: 'Address', width: 250, headerClassName: 'bold-header' },
    {
        field: 'Price',
        headerName: 'Price',
        width: 130,
        headerClassName: 'bold-header',
        renderCell: (params) => {
          const { discountPrice, originalPrice } = params.row;
          const price = discountPrice ? discountPrice : originalPrice;
          return (
            <div style={{ color: 'green' }}>
              {`Rs ${price}`}
            </div>
          );
        },
    },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'TotalBuy'));
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
