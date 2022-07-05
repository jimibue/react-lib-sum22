import * as React from 'react';
import { DataGrid, useGridApiEventHandler, useGridApiRef } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false, },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'price', headerName: 'Price', width: 130,  type: 'number' },
  {
    field: 'beds',
    headerName: 'Beds',
    type: 'number',
    width: 90,
  },
  {
    field: 'sq_ft',
    headerName: 'Square Feet',
    // description: 'This column has a value getter and is not sortable.',
    type: 'number',
    // sortable: false,
    // width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, city: 'SLC',  price: 9123456, beds:4, sq_ft:1325 },
  { id: 2, city: 'SLC',  price: 223456, beds:3, sq_ft:3325 },
  { id: 3, city: 'Draper',  price: 2123456, beds:2, sq_ft:825 },
  { id: 4, city: 'Provo',  price: 3123456, beds:4, sq_ft:1825 },
  { id: 5, city: 'Draper',  price: 2123456, beds:2, sq_ft:4825 },

];

export default function TableDemo() {
    // TODO figure out how this works
    // const apiRef = useGridApiRef();

    // apiRef.current.subscribeEvent(
    //     'cellClick',
    //     handleCellClicked,
    //   );
    function handleCellClicked(){
        console.log('cell clicked')
    }

    const handleCellDoubledClicked = ()=>{
        console.log('cell double clicked')
    }

    // useGridApiEventHandler('cellClick', handleCellClicked);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellClick={handleCellClicked}
        onCellDoubleClick={handleCellDoubledClicked}
      />
    </div>
  );
}

