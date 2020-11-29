import {
  ActivePlayers,
  PlayerView,
  INVALID_MOVE,
} from 'boardgame.io/core'

const MAX_CARD = 100

const Mind = {
  name: 'Mind',

  playerView: PlayerView.STRIP_SECRETS,

  setup(ctx) {
    const deck = [...Array(MAX_CARD + 1).keys()]
    deck.shift() // remove `0` card

    return {
      card: 0,
      level: 3,
      players: {},
      lastPlayed: {},
      deck: ctx.random.Shuffle(deck),
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
    playCard(G, { playerID }, card) {
      const hand = G.players[playerID]
      const index = hand.indexOf(card)
      if (index === -1) {
        return INVALID_MOVE
      }
      hand.splice(index, 1)

      G.lastPlayed[playerID] = card
      G.card = card
    },
  },
}

export default Mind
