import { useState, useEffect, useRef, useCallback } from 'react'
import { Divider } from '@mui/material'

import { useDispatch } from '../dataContext'

import RealTime from './RealTime/RealTime'
import Historical from './Historical/Historical'

import './Main.css'

export default function Main() {
  // The dispatch for our reducer.
  const dispatch = useDispatch()

  // A state holding the list of players for our dropdown menu to use.
  const [playerList, setPlayerList] = useState([])

  // Using a reference to avoid re-renders. Will be passed to the following function.
  const playerListRef = useRef(playerList)

  // Processing the data returned from the fetch. Also wrapped in useCallback to avoid re-renders.
  const processData = useCallback((data, players) => {
    // We can keep track of the players so we can use it later.
    for (let i = 0; i < data.length; i++) {
      if (!players.includes(data[i].playerA.name)) { players.push(data[i].playerA.name) }
      if (!players.includes(data[i].playerB.name)) { players.push(data[i].playerB.name) }
    }

    // Update the games history data.
    dispatch({ type: 'GAME_RESULT_FROM_API', payload: data})

    // Update the player list if needed.
    if (players !== playerListRef.current) {
      setPlayerList(players)
      playerListRef.current = players
    }
  }, [dispatch, playerListRef])

  useEffect(() => {
    const fetchData = async () => {
      let url = '/rps/history'
      let players = []
      let count = 0
      
      while (count < 10) {
        count++
        const { cursor, data } = await fetch(url)
          .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))

        // If history data came back, process it (checking players names and adding it).
        if (data) { processData(data, players) }
  
        // Set the next url for continue fetching
        if (cursor) { url = cursor}
        else { break }
      }
    }

    fetchData()

  }, [processData])
  
  return (
    <div id='main-container'>
      <div id='live-container'>  
        <RealTime />
      </div>
      <Divider orientation='vertical' flexItem={true} />
      <div id='historical-container'>
        <Historical players={playerList} />  
      </div>
    </div>
  )
}
