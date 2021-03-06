import { useMemo } from 'react'
import { AgGridReact } from '@ag-grid-community/react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-material.css'

/*
This component renders a table with the whole games history of a player.
Currently, only the date is modified (formatted), parsed from the timestamp then to string using Locale.
In the future, it could also display games' outcomes, etc.
*/
export default function PlayerDataTable({ data }) {

  // Defining the data and columns, memoized to prevent unnecessary updates.
  const tableData = useMemo(() => data, [data])

  const columnDefs = useMemo(() => [
    {
      headerName: 'Date',
      field: 't',
      valueFormatter: row => (new Date(row.value)).toLocaleString(),
      filter: 'agDateColumnFilter',
      filterParams: {defaultOption: 'inRange'},
      flex: 1.5,
    },
    {
      headerName: 'Player One',
      field: 'playerA.name',
      flex: 1.25,
    },
    {
      headerName: 'Hand',
      field: 'playerA.played',
      flex: 1,
    },
    {
      headerName: 'Player Two',
      field: 'playerB.name',
      flex: 1.25,
    },
    {
      headerName: 'Hand',
      field: 'playerB.played',
      flex: 1,
    },
  ], [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    suppressMenu: true,
    floatingFilter: true,
  }), [])

  const modules = useMemo(() => [ClientSideRowModelModule], [])

  return (
  <div style={{height: '80vh', width: '78vw'}}>
    <AgGridReact
      className='ag-theme-material'
      animateRows='true'
      modules={modules}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={tableData}>
    </AgGridReact>
  </div>
  )
}