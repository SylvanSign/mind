import { Lobby } from 'boardgame.io/react'
import Mind from './Game'
import MindBoard from './Board'


export default () => (
  <Lobby
    gameServer={`http://${window.location.hostname}:8000`}
    lobbyServer={`http://${window.location.hostname}:8000`}
    gameComponents={[
      { game: Mind, board: MindBoard }
    ]}
  />
)
