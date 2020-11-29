import { Server } from 'boardgame.io/server'
import Mind from './Game'

const server = Server({ games: [Mind] })

server.run(8000)
