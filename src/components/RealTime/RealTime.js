import { useEffect } from 'react'
import { Typography } from '@mui/material'

export default function RealTimeView({ data, dispatch }) {

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WS_URL)

    webSocket.onmessage = e => {
      if (e.data) {
        // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
        const parsedData = JSON.parse(JSON.parse(e.data))

        const { type, ...payload } = parsedData

        dispatch({ type: type, payload: payload})
      }
    }
  }, [dispatch])

  const buildList = () => {
    let list = []
    data.forEach(game => list.push(
        <Typography key={game.gameId}>
          {game.playerA.name} vs. {game.playerB.name}
        </Typography>)
    )
    return list
  }

  return (
    <div style={{minHeight: '30vh'}}>
      <Typography variant='h5' color='red'>Live Games</Typography>

      {buildList()}
    </div>)
}
