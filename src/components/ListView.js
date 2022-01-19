const getOutcome = (playerA, playerB) => {
  switch (playerA.played) {
    case "ROCK":
      if (playerB.played === "SCISSORS") {
        return 1
      } else if (playerB.played === "PAPER") {
        return 2
      } else {
        return 0
      }
    case "PAPER":
      if (playerB.played === "ROCK") {
        return 1
      } else if (playerB.played === "SCISSORS") {
        return 2
      } else {
        return 0
      }
    case "SCISSORS":
      if (playerB.played === "PAPER") {
        return 1
      } else if (playerB.played === "ROCK") {
        return 2
      } else {
        return 0
      }
    default:
      return null
  }
}

export default function ListView({ players, data }) {

  // This component should ask the user for a player and then show its details.

  return (
    <div>
    <h5 style={{color: 'blue'}} >Player stats</h5>
      <ul>
        {players ? players.forEach(player => <li key={player.name}>{player.name}</li>) : null}
      </ul>
    </div>
  )
}
