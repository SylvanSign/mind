export default function MindBoard(props) {
  return (
    <div>
      <h1>
        player: {JSON.stringify(props.G.players[props.playerID])}
      </h1>
      <h1>
        lastPlayed: {props.G.lastPlayed[props.playerID]}
      </h1>
      <br />
      <h1>
        card: {props.G.card}
      </h1>
    </div>
  );
}
