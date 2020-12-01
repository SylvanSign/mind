export function Self(props) {
  return (
    <div>
      <h1>You: {props.id}</h1>
      <h2>Cards: {JSON.stringify(props.p.hand)}</h2>
      <h2>Last Card Played: {props.p.last}</h2>
      <button onClick={props.click}>Play Card</button>
    </div>
  )
}

export function Other(props) {
  return (
    <div>
      <h1>Id: {props.id}</h1>
      <h2>Cards Left: {props.p.hand.length}</h2>
      <h2>Last Card Played: {props.p.last}</h2>
    </div>
  )
}
