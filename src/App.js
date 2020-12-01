import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import Mind from './Game'
import MindBoard from './Board'

const MindClient = Client({
  game: Mind,
  board: MindBoard,
  multiplayer: SocketIO({ server: "localhost:8000" }),
  numPlayers: 2,
})

const matchID = Math.random()
const App = () => (
  <div>
    <MindClient playerID="0" matchID={matchID} />
    <MindClient playerID="1" matchID={matchID} />
  </div>
)

export default App
