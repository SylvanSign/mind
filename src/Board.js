import { Self, Other } from './Player'

export default function MindBoard(props) {
  const ownID = props.playerID
  const otherIDs = Object.keys(props.ctx.activePlayers).filter(id => id !== ownID)
  const others = otherIDs.map(id => (
    <Other
      key={id}
      id={id}
      p={props.G.players[id]}
    />
  ))

  if (props.ctx.gameover) {
    return (
      <h1>{props.ctx.gameover}</h1>
    )
  } else {
    return (
      <div>
        <h1>Level: {props.G.level}</h1>
        <h1>Lives: {props.G.lives}</h1>
        <hr />
        <h1>Current Card: {props.G.card || "___"}</h1>
        <hr />
        <Self
          key={ownID}
          id={ownID}
          p={props.G.players[ownID]}
          click={() => props.moves.play()}
        />
        <hr />
        {others}
        <h3>Errors: {JSON.stringify(props.G.errors)}</h3>
      </div>
    );
  }
}
