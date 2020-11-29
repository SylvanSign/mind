import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import Mind from './Game'
import MindBoard from './Board'

const MindClient = Client({
  game: Mind,
  board: MindBoard,
  multiplayer: Local(),
})

const App = () => (
  <div>
    <MindClient playerID="0" />
    <MindClient playerID="1" />
  </div>
)

export default App
