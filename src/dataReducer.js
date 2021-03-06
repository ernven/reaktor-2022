// This reducer takes care of the data state for the application.
export default function dataReducer (state, action) {
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
          for (let i = finishedGames.length; i > 0; i--) {
            finishedGames[i-1] = i === 1 ? action.payload : finishedGames[i-2]
          }
        }
      }
      
      // Lastyl, add the new data to historical data.
      let newHistoricalData = state.historical
      let newGameIds = state.gameIds

      // To avoid duplicates, double check first!
      if (!state.gameIds.has(action.payload.gameId)) {
        newHistoricalData.push(action.payload)
        newGameIds.add(action.payload.gameId)
      }
      
      return {
        ongoing: ongoingGames,
        finished: finishedGames,
        historical: newHistoricalData,
        gameIds: newGameIds
      }
    
    case 'GAME_RESULT_FROM_API':
      // If the action comes from the API fetch, we just add the payload to historical data.
      let updatedHistoricalData = state.historical
      let updatedGameIds = state.gameIds

      for (let i = 0; i < action.payload.length; i++) {
        if (!state.gameIds.has(action.payload[i].gameId)) {
          updatedHistoricalData.push(action.payload[i])
          updatedGameIds.add(action.payload[i].gameId)
        } else {
          console.log("DUPE FROM API") // KEEP THIS TO CHECK WITH LOCALSTORAGE
        }
      }

      return {...state,  historical: updatedHistoricalData, gameIds: updatedGameIds}

    default:
      return state
  }
}
