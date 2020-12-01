import {
  ActivePlayers,
  INVALID_MOVE,
} from 'boardgame.io/core'

const MAX_CARD = 100

const Mind = {
  name: 'Mind',

  setup(ctx) {
    const deck = [...Array(MAX_CARD + 1).keys()]
    deck.shift() // remove `0` card

    return {
      card: 0,
      level: 0,
      lives: 3,
      players: {},
      errors: [],
      deck: ctx.random.Shuffle(deck),
    }
  },

  endIf(G, ctx) {
    if (G.lives <= 0) {
      return 'Ran out of lives'
    }
  },

  turn: {
    activePlayers: ActivePlayers.ALL,

    onBegin(G, ctx) {
      ++G.level
      ctx.random.Shuffle(G.deck)
      delete G.card

      for (let playerID in ctx.activePlayers) {
        const hand = G.deck.splice(0, G.level)
        hand.sort((a, b) => a - b)
        G.players[playerID] = {
          hand,
          last: undefined,
        }
      }
    },

    endIf(G, ctx) {
      let allFinished = true
      for (let playerID in G.players) {
        if (G.players[playerID].hand.length) {
          allFinished = false
          break
        }
      }
      return allFinished
    },
  },

  moves: {
    play,
  },
}

function play(G, ctx) {
  if (!G.players[ctx.playerID].hand.length) {
    return INVALID_MOVE
  }
  const card = playLowestCard(G, ctx.playerID)
  G.card = card
  handleMisplay(G, card)
}

function playLowestCard(G, playerID) {
  const hand = G.players[playerID].hand
  const card = hand.shift()

  G.players[playerID].last = card
  return card
}

function handleMisplay(G, card) {
  const misplays = []
  for (let playerID in G.players) {
    const hand = G.players[playerID].hand
    while (hand[0] < card) {
      // TODO somehow broadcast this to state
      misplays.push(`${playerID} had ${hand[0]} < ${card}`)
      playLowestCard(G, playerID)
    }
  }

  if (misplays.length) {
    --G.lives
    G.errors = misplays
  }
}

export default Mind
