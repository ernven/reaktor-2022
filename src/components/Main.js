import { useState, useReducer, useEffect, useRef } from 'react'
import { Divider } from '@mui/material'

import dataReducer from '../dataReducer'
import RealTime from './RealTime/RealTime'
import Historical from './Historical/Historical'

import './Main.css'

const reducerInit = {ongoing: [], finished: [], historical: [], gameIds: new Set()}

export default function Main() {
  // Our reducer holding the data (both historical and live).
  const [gamesData, dispatch] = useReducer(dataReducer, reducerInit)

  // A state holding the list of players for our dropdown menu to use.
  const [playerList, setPlayerList] = useState([])

  // Using a reference to avoid re-renders. Will be passed to the fetching fucntion.
  const playerListRef = useRef(playerList)

  useEffect(() => {
    const fetchData = async () => {
      let url = '/rps/history'
      let players = []
      // Let's keep the total data under 10000 for now.
      while (true) {
        
        const { cursor, data } = await fetch(url)
          .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
  
        if (cursor && data) {

          // We can keep track of the players so we can use it later.
          for (let i = 0; i < data.length; i++) {
            if (!players.includes(data[i].playerA.name)) { players.push(data[i].playerA.name) }
            if (!players.includes(data[i].playerB.name)) { players.push(data[i].playerB.name) }
          }

          // Update the games history data.
          dispatch({ type: 'GAME_RESULT_FROM_API', payload: data})

          console.log(cursor)

          // Update the player list if needed.
          if (players !== playerListRef.current) {
            setPlayerList(players)
            playerListRef.current = players
          }
  
          // Set the next url for continue fetching
          url = cursor

        } else {
          break
        }
      }
    }

    fetchData()
  }, [])
  
  return (
    <div id='main-container'>
      <div id='live-container'>  
        <RealTime ongoing={gamesData.ongoing} finished={gamesData.finished} dispatch={dispatch} />
      </div>
      <Divider orientation='vertical' flexItem={true} />
      <div id='historical-container'>
        <Historical data={gamesData.historical} players={playerList} />  
      </div>
    </div>
  )
}
