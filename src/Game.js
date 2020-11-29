import {
  ActivePlayers,
  PlayerView,
} from 'boardgame.io/core'

const MAX_CARD = 4

const Mind = {
  name: 'Mind',

  playerView: PlayerView.STRIP_SECRETS,

  setup(ctx) {
    return {
      card: 0,
      level: 2,
      deck: ctx.random.Shuffle([...Array(MAX_CARD).keys()]),
      players: {},
    }
  },

  turn: {
    onBegin(G, ctx) {
      for (let playerID in ctx.activePlayers) {
        const hand = G.deck.splice(0, G.level)
        hand.sort((a, b) => a - b)
        G.players[playerID] = hand
      }
    },
    activePlayers: ActivePlayers.ALL,
  },

  moves: {
    playCard(G, ctx, cardIndex) {
      G.card = G.players[ctx.playerID].splice(cardIndex, 1)[0]
    },
  },
}

export default Mind
