import { Card, CardContent, Typography } from '@mui/material'

import { getPlayerStats } from '../../utils/statsUtils'

// This component will display a card with an selected player's details.
export default function PlayerCard({ player, data }) {

  const buildPlayerCard = () => {
    if (player) {
      const playerStats = getPlayerStats(player, data)

      // Handling many values for most played hand.
      const mostPlayed = () => {
        if (typeof playerStats.mostPlayed === 'string') {
          return playerStats.mostPlayed
        } else {
          let hands = ''
          for (let i = 0; i < playerStats.mostPlayed.length; i++) {
            hands = (i === 0) ? playerStats.mostPlayed[i] : (hands + ', ' + playerStats.mostPlayed[i])
          }
          return hands
        }
      }

      return (
        <Card sx={{width: '18em', height: '14em', borderRadius: '1.2em', backgroundColor: 'lightcyan'}}>

          <CardContent sx={{padding: '2.6em'}}>

            <Typography variant='h5' sx={{paddingBottom: '0.7em'}}>{player}</Typography>
            <Typography variant='body1'>Total games played: {playerStats.gameCount}</Typography>
            <Typography variant='body1'>Win Ratio: {playerStats.winRatio}</Typography>
            <Typography variant='body1'>Most played hand:</Typography>
            <Typography variant='body1'>{mostPlayed()}</Typography>

          </CardContent>
        </Card>
      )
    } else {
      return null
    }
  }

  return buildPlayerCard()
}
