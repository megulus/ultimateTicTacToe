import { GameError } from './gameError'

export class Game {
  
  constructor(obj) {
    this.n = obj.n || 3
    this.board = obj.board || Array.from(Array(this.n * this.n))
    this.moves = obj.moves || [] // might not need this
    this.winner = obj.winner || null
    this.turn = obj.turn || 'X'
    this.numMoves = obj.numMoves || 0
  }

  getBoard = () => {
    return [...this.board]
  }

  getWinner = () => {
    return this.winner
  }

  isDraw = () => {
    return !this.winner && this.numMoves === (this.n * this.n)
  }

  gameOver = () => {
    return this.winner !== null || this.numMoves === (this.n * this.n)
  }

  isValidPlayer = (player) => {
    return (player === 'X' || player === 'O')
  }

  isPlayersTurn = (player) => {
    return this.turn === player
  }

  isValidMove = (player, position) => {
    return !this.gameOver() && this.isValidPlayer(player) && this.isPlayersTurn(player) && !this.board[position]
  }

  handleInvalidMove = (player, position) => {
    if (this.gameOver()) {
      throw new GameError('Game is over; move not allowed')
    }
    if (!this.isValidPlayer(player)) {
      throw new GameError('Invalid player')
    }
    if (!this.isPlayersTurn(player)) {
      throw new GameError('Player attempting to move out of turn')  
    }
    if (this.board[position]) {
      throw new GameError('Board position already occupied')
    }
  }

  makeMove = (player, position) => {
    // for now, we will assume the client is generally honest
    // and will only do some basic validation
    if (!this.isValidMove(player, position)) return this.handleInvalidMove()
    this.board[position] = this.turn
    this.moves.push({ player, position }) // if we keep this.moves
    this.numMoves++
    if (this.hasWinningRow() || this.hasWinningCol() || this.hasWinningDiagonal()) {
      this.winner = player
      this.turn = null
    } 
    else {
      this.turn = player === 'X' ? 'O' : 'X'
    }
  }


  hasWinningCol = () => {
    for (let i = 0; i < this.n; i++) {
      let previousItem = this.board[i]
      let count = 0
      for (let j = 0; j < this.n * this.n; j += this.n) {
        const item = this.board[i + j]
        if (item && item === previousItem) count += 1
      }
      if (count === this.n) {
        return true
      }
    }
    return false
  }

  
  hasWinningRow = () => {
    let previousRow = 0
    let count = 0
    let previousItem = this.board[0]
    for (let i = 0; i < (this.n * this.n); i++) {
      const row = Math.floor(i / this.n)
      if (row !== previousRow) {
        previousRow = row
        count = 0
        previousItem = this.board[i]
      }
      const item = this.board[i]
      if (item && item === previousItem) count += 1
      if (count === this.n) return true
    }
    return false
  }

  hasWinningDiagonal = () => {
    const diagonalOne = this.board[0]
    const diagonalTwo = this.board[this.n - 1]
    let diagonalOneCount = 0
    let diagonalTwoCount = 0
    for (let i = 0; i < this.n; i++) {
      const pos1 = (i * this.n) + i
      const pos2 = (i * this.n) + (this.n - 1 - i)
      if (diagonalOne && this.board[pos1] === diagonalOne) diagonalOneCount += 1
      if (diagonalTwo && this.board[pos2] === diagonalTwo) diagonalTwoCount += 1
    }
    if (diagonalOneCount === this.n || diagonalTwoCount === this.n) return true
    return false
  }
}

