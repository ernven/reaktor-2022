import { useEffect, useState } from 'react'

import ListView from './ListView'
import RealTimeView from './RealTimeView'

export default function Main() {
  const [historicalData, setHistoricalData] = useState([])
  const [realTimeData, setRealTimeData] = useState([])
  const [playerList, setPlayerList] = useState(new Set())

  const webSocket = new WebSocket(process.env.REACT_APP_WS_URL)

  webSocket.onmessage = e => {
    if (e.data) {

      // With websockets, the data has an unusual string format, so it takes 2 parses to become a regular object.
      const parsedData = JSON.parse(JSON.parse(e.data))

      if (parsedData.type === 'GAME_BEGIN') {
        // Double check to avoid adding repeats.
        if (!realTimeData.includes(parsedData)) {
          // Let's keep real time games list to 5 entries.
          if (realTimeData.length < 6) {
            setRealTimeData([...realTimeData, parsedData])
          } else {
            let tempArray
            for (let i = 5; i > 0; i--) {
              tempArray[i] = realTimeData[i - 1]
            }
            tempArray[0] = parsedData
            setRealTimeData(tempArray)
          }
        } else if (parsedData.type === 'GAME_RESULT') {
          // Do something else. 
          for (let i = 0; i < 5; i++) {
            if (realTimeData[i] && realTimeData[i].gameId === parsedData.gameId) {
              let tempArray = realTimeData
              tempArray[i] = parsedData
              setRealTimeData([...realTimeData, parsedData])
            }
          }

          // Also add the data to historical data.
          let tempArray = historicalData
          tempArray.push(parsedData)
          setHistoricalData(tempArray)
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let url = '/rps/history'
      let fetchedData = []
      let players = new Set()
      // Let's keep the total data under 1000 for now.
      while (fetchedData.length < 1000) {
        
        const { cursor, data } = await fetch(url)
          .then(res => res.status === 200 ? res.json() : console.log('Error: ' + res.status))
  
        if (cursor && data) {
          fetchedData = fetchedData.concat(data)

          // We can keep track of the players so we can use it later.
          for (let i = 0; i < data.length; i++) {
            if (!players.has(data[i].playerA.name)) { players.add(data[i].playerA.name) }
            if (!players.has(data[i].playerB.name)) { players.add(data[i].playerB.name) }
          }
  
          // Set the next url for continue fetching
          url = cursor
        } else {
          break
        }
      }
      setHistoricalData(fetchedData)
      setPlayerList(players)
    }

    fetchData()

  }, [])


  return (
    <div>
      <RealTimeView data={realTimeData} />
      <ListView data={historicalData} players={playerList} />
    </div>
  )
}
