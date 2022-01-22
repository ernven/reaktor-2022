import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

/*
This component renders a table with the whole games history of a player.
Currently, only the date is modified (formatted), parsed from the timestamp then to string using Locale.
In the future, it could also display games' outcomes, etc.
*/
export default function PlayerDataTable({ data }) {
  return (
    <Table sx={{ minWidth: 800 }}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center" colSpan={2}>
            Player One
          </TableCell>
          <TableCell align="center" colSpan={2}>
            Player Two
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Hand</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Hand</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map(entry => (
          <TableRow
            key={entry.gameId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{(new Date(entry.t)).toLocaleString()}</TableCell>
            <TableCell>{entry.playerA.name}</TableCell>
            <TableCell>{entry.playerA.played}</TableCell>
            <TableCell>{entry.playerB.name}</TableCell>
            <TableCell>{entry.playerB.played}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
