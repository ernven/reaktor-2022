import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

export default function PlayerDataTable({ data }) {
  return (
    <Table stickyHeader sx={{ minWidth: 800 }}>
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
