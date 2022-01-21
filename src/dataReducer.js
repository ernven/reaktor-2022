const defaultValues = {ongoing: [], finished: [], historical: []}

export default function dataReducer (state = defaultValues, action) {
  switch (action.type) {

    case 'GAME_BEGIN':
      let liveGames = state.ongoing

      // Double check to avoid adding repeats.
      if (!(liveGames.some(e => e.gameId === action.payload.gameId))) {
        liveGames.push(action.payload)
      }
      return {...state, ongoing: liveGames}

    case 'GAME_RESULT':
      let ongoingGames = state.ongoing
      let finishedGames = state.finished

      // First, remove the finished game from ongoing matches.
      for (let i = 0; i < ongoingGames.length; i++) {
        if (ongoingGames[i].gameId === action.payload.gameId) {
          ongoingGames.splice(i, 1)
        }
      }

      // Then add the finished game to the list of last results (double check to avoid adding repeats).
      // Note: To prevent the list from growing too large, we can set a max 5 entries for the finished games.
      if (!(finishedGames.some(e => e.gameId === action.payload.gameId))) {
        if (finishedGames.length < 5) {
          finishedGames.push(action.payload)
        } else {
          for (let i = 0; i < finishedGames.length; i++) {
            finishedGames[i] = i === 4 ? action.payload : finishedGames[i+1]
          }
        }
      }

      // Lastyl, add the new data to historical data.
      const newHistoricalData = state.historical.concat(action.payload)

      return {ongoing: ongoingGames, finished: finishedGames,  historical: newHistoricalData}

    
    case 'GAME_RESULT_FROM_API':
      // If the adding comes from the API, we simply add it to historical data.
      const updatedHistoricalData = state.historical.concat(action.payload)

      return {...state,  historical: updatedHistoricalData}

    default:
      return state
  }
}
