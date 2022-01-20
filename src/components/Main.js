import { useEffect, useState, useReducer } from 'react'
import { Divider } from '@mui/material'

import RealTime from './RealTime/RealTime'
import Historical from './Historical/Historical'

import './Main.css'

const dataReducer = (state = {live: [], historical: []}, action) => {
  switch (action.type) {
    case 'GAME_BEGIN':
      let liveData = state.live

      // Double check to avoid adding repeats.
      if (!(liveData.some(e => e.gameId === action.payload.gameId))) {
        liveData.push(action.payload)
      }
      return {...state, live: liveData}

    case 'GAME_RESULT':
      let prevLiveData = state.live

      // We remove the game and add it to the result history.
      for (let i = 0; i < prevLiveData.length; i++) {
        if (prevLiveData[i].gameId === action.payload.gameId) {
          prevLiveData.splice(i, 1)
        }
      }
      const newHistoricalData = state.historical.concat(action.payload)

      // Also add the data to historical data.
      return {live: prevLiveData, historical: newHistoricalData}

    default:
      return state
  }
}

export default function Main() {
  const [playerList, setPlayerList] = useState([])

  const [data, dispatch] = useReducer(dataReducer, {live: [], historical: []})

  useEffect(() => {
    const fetchData = async () => {
      let url = '/rps/history'
      let fetchedData = []
      let players = []
      // Let's keep the total data under 10000 for now.
      while (fetchedData.length < 200000) {
        
        const { cursor, data } = await fetch(url)
          .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
  
        if (cursor && data) {
          fetchedData = fetchedData.concat(data)

          // We can keep track of the players so we can use it later.
          for (let i = 0; i < data.length; i++) {
            if (!players.includes(data[i].playerA.name)) { players.push(data[i].playerA.name) }
            if (!players.includes(data[i].playerB.name)) { players.push(data[i].playerB.name) }
          }

          // Update the data.
          dispatch({ type: 'GAME_RESULT', payload: fetchedData})

          // Update the player list if needed.
          if (players !== playerList) { setPlayerList(players) }
  
          // Set the next url for continue fetching
          url = cursor
        } else {
          break
        }
      }
    }

    fetchData()
  }, [playerList])


  return (
    <div id='main-container'>
      <div id='live-container'>  
        <RealTime data={data.live} dispatch={dispatch} />
      </div>
      <Divider orientation='vertical' flexItem={true} />
      <div id='historical-container'>
        <Historical data={data.historical} players={playerList} />  
      </div>
    </div>
  )
}
