import { useState } from 'react'
import { Typography } from '@mui/material'

import DropdownMenu from './DropdownMenu'
import PlayerCard from './PlayerCard/PlayerCard'

// This component (using the sub-components) should ask the user for a player and then show its details.
export default function Historical({ players }) {
  // A state for our currently selected player.
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <Typography variant='h4' color='darkblue' >Historical Stats</Typography>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <DropdownMenu players={players} selected={selected} setSelected={setSelected} />

        <PlayerCard player={selected} />

      </div>

    </div>
  )
}
