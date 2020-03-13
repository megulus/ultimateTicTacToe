import { Game } from '../src/gameLogic'
import { GameError } from '../src/gameError'



it('should correctly determine a winning column', () => {
  const g1 = new Game({ board: [null, 'X', null, null, 'O', null, null, 'X', null]  })
  expect(g1.hasWinningCol()).toBe(false)
  const g2 = new Game({ board: [null, 'X', null, null, 'X', null, null, 'X', null] })
  expect(g2.hasWinningCol()).toBe(true)
})

it('should correctly determine a winning row', () => {
  const g1 = new Game({ board: ['O', 'X', 'O', null, null, null, null, null, null] })
  expect(g1.hasWinningRow()).toBe(false)
  const g2 = new Game({ board: ['X', 'X', 'X', null, null, null, null, null, null] })
  expect(g2.hasWinningRow()).toBe(true)
})

it('should correctly determine a winning diagonal', () => {
  const g1 = new Game({ board: ['X', null, null, null, 'O', null, null, null, 'X'] })
  expect(g1.hasWinningDiagonal()).toBe(false)
  const g2 = new Game({ board: ['X', null, null, null, 'X', null, null, null, 'X'] })
  expect(g2.hasWinningDiagonal()).toBe(true)
})

xit('should update board correctly according to player moves, pattern 1', () => {
  const game1 = new Game({ n: 3 })
  game1.makeMove('X', 2)
  expect(game1.getBoard()).toStrictEqual([
    undefined, undefined, 'X', 
    undefined, undefined, undefined, 
    undefined, undefined, undefined
  ])
  expect(game1.hasWinningCol()).toBe(false)
  game1.makeMove('O', 1)
  expect(game1.getBoard()).toStrictEqual([
    undefined, 'O', 'X',
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ])
  expect(game1.hasWinningCol()).toBe(false)
  game1.makeMove('X', 5)
  expect(game1.getBoard()).toStrictEqual([
    undefined, 'O', 'X',
    undefined, undefined, 'X',
    undefined, undefined, undefined
  ])
  expect(game1.hasWinningCol()).toBe(false)
  game1.makeMove('O', 4)
  expect(game1.getBoard()).toStrictEqual([
    undefined, 'O', 'X',
    undefined, 'O', 'X',
    undefined, undefined, undefined
  ])
  expect(game1.hasWinningCol()).toBe(false)
  game1.makeMove('X', 8)
  expect(game1.getBoard()).toStrictEqual([
    undefined, 'O', 'X',
    undefined, 'O', 'X',
    undefined, undefined, 'X'
  ])
  expect(game1.hasWinningCol()).toBe(true)
})

xit('should update board correctly according to player moves, pattern 2', () => {
  const game2 = new Game({ n: 3 })
  game2.makeMove('X', 2)
  expect(game2.getBoard()).toStrictEqual([
    undefined, undefined, 'X',
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ])
  expect(game2.hasWinningRow()).toBe(false)
  game2.makeMove('O', 3)
  expect(game2.getBoard()).toStrictEqual([
    undefined, undefined, 'X',
    'O', undefined, undefined,
    undefined, undefined, undefined
  ])
  expect(game2.hasWinningRow()).toBe(false)
  game2.makeMove('X', 8)
  expect(game2.getBoard()).toStrictEqual([
    undefined, undefined, 'X',
    'O', undefined, undefined,
    undefined, undefined, 'X'
  ])
  expect(game2.hasWinningRow()).toBe(false)
  game2.makeMove('O', 4)
  expect(game2.getBoard()).toStrictEqual([
    undefined, undefined, 'X',
    'O', 'O', undefined,
    undefined, undefined, 'X'
  ])
  expect(game2.hasWinningRow()).toBe(false)
  game2.makeMove('X', 1)
  expect(game2.getBoard()).toStrictEqual([
    undefined, 'X', 'X',
    'O', 'O', undefined,
    undefined, undefined, 'X'
  ])
  expect(game2.hasWinningRow()).toBe(false)
  game2.makeMove('O', 5)
  expect(game2.getBoard()).toStrictEqual([
    undefined, 'X', 'X',
    'O', 'O', 'O',
    undefined, undefined, 'X'
  ])
  expect(game2.hasWinningRow()).toBe(true)
})

xit('should update board correctly according to player moves, pattern 3', () => {
  const game3 = new Game({ n: 3 })
  game3.makeMove('X', 0)
  expect(game3.getBoard()).toStrictEqual([
    'X', undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ])
  expect(game3.hasWinningDiagonal()).toBe(false)
  game3.makeMove('O', 2)
  expect(game3.getBoard()).toStrictEqual([
    'X', undefined, 'O',
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ])
  expect(game3.hasWinningDiagonal()).toBe(false)
  game3.makeMove('X', 4)
  expect(game3.getBoard()).toStrictEqual([
    'X', undefined, 'O',
    undefined, 'X', undefined,
    undefined, undefined, undefined
  ])
  expect(game3.hasWinningDiagonal()).toBe(false)
  game3.makeMove('O', 5)
  expect(game3.getBoard()).toStrictEqual([
    'X', undefined, 'O',
    undefined, 'X', 'O',
    undefined, undefined, undefined
  ])
  expect(game3.hasWinningDiagonal()).toBe(false)
  game3.makeMove('X', 8)
  expect(game3.getBoard()).toStrictEqual([
    'X', undefined, 'O',
    undefined, 'X', 'O',
    undefined, undefined, 'X'
  ])
  expect(game3.hasWinningCol()).toBe(false)
  expect(game3.hasWinningDiagonal()).toBe(true)
})

xit('should throw GameError if move attempted when game over', () => {
  const game2 = new Game({ n: 3 })
  expect(game2.gameOver()).toBe(false)
  game2.makeMove('X', 2)
  expect(game2.gameOver()).toBe(false)
  game2.makeMove('O', 1)
  expect(game2.gameOver()).toBe(false)
  game2.makeMove('X', 5)
  expect(game2.gameOver()).toBe(false)
  game2.makeMove('O', 4)
  expect(game2.gameOver()).toBe(false)
  game2.makeMove('X', 8)
  expect(game2.gameOver()).toBe(true)
  expect(() => {
    game2.makeMove('O', 0)
  }).toThrowError(GameError)
  expect(() => {
    game2.makeMove('O', 0)
  }).toThrowError(/Game is over/)
})
