import { Server } from 'boardgame.io/server'
import { TicTacToe } from './Game'

const server = Server({ games: [TicTacToe] });

server.run(8000);
