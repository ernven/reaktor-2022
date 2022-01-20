import { Card, CardContent, Typography } from '@mui/material'

import { getPlayerStats } from '../../utils/statsUtils'

// This component will display a card with an selected player's details.
export default function PlayerCard({ player, data }) {

  const buildPlayerCard = () => {
    if (player) {
      const playerStats = getPlayerStats(player, data)

      return (
        <Card sx={{width: '18em', height: '13em', borderRadius: '1.2em', backgroundColor: 'lightcyan'}}>

          <CardContent sx={{height: '35%', padding: '2.6em'}}>

            <Typography variant='h5' sx={{paddingBottom: '0.7em'}}>{player}</Typography>
            <Typography variant='body1'>Total games played: {playerStats.gameCount}</Typography>
            <Typography variant='body1'>Win Ratio: {playerStats.winRatio}</Typography>
            <Typography variant='body1'>Most played hand: {playerStats.mostPlayed}</Typography>

          </CardContent>
        </Card>
      )
    } else {
      return null
    }
  }

  return buildPlayerCard()
}
