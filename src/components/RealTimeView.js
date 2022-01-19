export default function RealTimeView({ data }) {

  return(
    <div style={{minHeight: '30vh'}}>
      <h5 style={{color: 'red'}} >Live Games</h5>
      <ul>

      {data ?
        data.forEach(game => <li key={game.gameId}>{game.playerA.name} vs. {game.playerB.name}</li>)
        : null
      }

      </ul>
    </div>
  )
}
