export default function MindBoard(props) {
  return (
    <div>
      <h1>
        {JSON.stringify(props.G.players[props.playerID])}
      </h1>
      <h1>
        {props.G.card}
      </h1>
    </div>
  );
}
