
export const getPlayerData = (player, data) => {

  // In this array we save the whole history for this player.
  let playerData = []

  // Let's store here just the data we need now. We could have all the win, losses and ties, or even more stats.
  let count = 0, wins = 0

  // Saving the counts of what has been played to an array.
  let handsCount = [{name: 'Rock', count: 0}, {name: 'Paper', count: 0}, {name: 'Scissors', count: 0}]

  for (let i = 0; i < data.length; i++) {
    // Analyze the game if our selected player has been found.
    if (data[i].playerA.name === player) {

      // Add the entry to the history array
      playerData.push(data[i])

      const outcome = getOutcome(data[i].playerA.played, data[i].playerB.played)

      // If outcome === 1, means the first player input (our found one) won the match.
      // At the moment we don't need losses nor ties.
      if (outcome === 1) { wins++ }

      if (data[i].playerA.played === 'ROCK') { handsCount[0].count++ }
      else if (data[i].playerA.played === 'PAPER') { handsCount[1].count++ }
      else if (data[i].playerA.played === 'SCISSORS') { handsCount[2].count++ }

      count++

    } else if (data[i].playerB.name === player) {
      playerData.push(data[i])
      const outcome = getOutcome(data[i].playerB.played, data[i].playerA.played)

      if (outcome === 1) { wins++ }

      if (data[i].playerB.played === 'ROCK') { handsCount[0].count++ }
      else if (data[i].playerB.played === 'PAPER') { handsCount[1].count++ }
      else if (data[i].playerB.played === 'SCISSORS') { handsCount[2].count++ }

      count++
    }
  }

  const mostPlayed = getMostFrequent(handsCount)
  // Win ratio rounded to 3 decimals.
  const winRatio = Math.round((wins / count) * 1000) / 1000

  const playerStats = {gameCount: count, winRatio: winRatio, mostPlayed: mostPlayed}

  return { playerData, playerStats }
}

// Helper function to calculate the outcome of a game.
// Returns 1 if player A won, 2 if player B won or 0 if the game was tied.
export const getOutcome = (handA, handB) => {
  switch (handA) {
    case 'ROCK':
      if (handB === 'SCISSORS') {
        return 1
      } else if (handB === 'PAPER') {
        return 2
      } else {
        return 0
      }
    case 'PAPER':
      if (handB === 'ROCK') {
        return 1
      } else if (handB === 'SCISSORS') {
        return 2
      } else {
        return 0
      }
    case 'SCISSORS':
      if (handB === 'PAPER') {
        return 1
      } else if (handB === 'ROCK') {
        return 2
      } else {
        return 0
      }
    default:
      return null
  }
}

// Helper function to get the most frequent hand based on their count.
const getMostFrequent = array => {
  const sorted = array.sort((a, b) => b.count - a.count)

  // Dealing with entries tied for top spot.
  if (sorted[0].count === sorted[1].count) {
    return (sorted[1].count === sorted[2].count) ?
      [sorted[0].name, sorted[1].name, sorted[2].name] : [sorted[0].name, sorted[2].name]
  } else {
    return sorted[0].name
  }
}
