import { useState } from 'react'

import { getPlayerStats }  from '../utils/statsUtils'

export default function ListView({ players, data }) {
  const [selected, setSelected] = useState(null)

  const buildPlayerCard = () => {
    if (selected) {
      const playerStats = getPlayerStats(selected, data)
      console.log(selected)
      return (
        <div>
          <p>{selected}</p>
          <p>Total games played: {playerStats.gameCount}</p>
          <p>Win Ratio: {playerStats.winRatio}</p>
          <p>Most played hand: {playerStats.mostPlayed}</p>
        </div>
      )
    } else {
      <div></div>
    }

  }

  const buildList = () => {
    let list = []
    players.forEach(player => list.push(<p key={player}>{player}</p>))
    return list
  }

  // This component should ask the user for a player and then show its details.

  return (
    <div>
      <h5 style={{color: 'blue'}} >Player stats</h5>

      {buildPlayerCard()}

      {buildList()}

    </div>
  )
}
