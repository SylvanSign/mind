import {
  ActivePlayers,
  PlayerView,
  // INVALID_MOVE, // TODO remove if unused
} from 'boardgame.io/core'

const MAX_CARD = 100

const Mind = {
  name: 'Mind',

  // playerView: PlayerView.STRIP_SECRETS, // TODO uncomment

  setup(ctx) {
    const deck = [...Array(MAX_CARD + 1).keys()]
    deck.shift() // remove `0` card

    return {
      card: 0,
      level: 0,
      lives: 3,
      players: {},
      lastPlayed: {},
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

      for (let playerID in ctx.activePlayers) {
        const hand = G.deck.splice(0, G.level)
        hand.sort((a, b) => a - b)
        G.players[playerID] = hand
      }
    },

    endIf(G, ctx) {
      let allFinished = true
      for (let playerID in G.players) {
        if (G.players[playerID].length) {
          allFinished = false
          break
        }
      }
      return allFinished
    },
  },

  moves: {
    play: {
      move: play,
      client: false,
    },
  },
}

function play(G, ctx) {
  const card = playLowestCard(G, ctx.playerID)
  G.card = card
  handleMisplay(G, card)
}

function playLowestCard(G, playerID) {
  const hand = G.players[playerID]
  const card = hand.shift()

  G.lastPlayed[playerID] = card
  return card
}

function handleMisplay(G, card) {
  const misplays = []
  for (let playerID in G.players) {
    const hand = G.players[playerID]
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
