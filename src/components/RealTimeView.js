
export default function RealTimeView({ data }) {

  const buildList = () => {
    let list = []
    data.forEach(game => game ? list.push(
        <li key={game.gameId}>
          {game.type}: {game.playerA.name} vs. {game.playerB.name}
        </li>
      ) : <div></div>
    )
    return list
  }

  return(
    <div style={{minHeight: '30vh'}}>
      <h5 style={{color: 'red'}} >Live Games</h5>
      <ul>

        {buildList()}

      </ul>
    </div>
  )
}
