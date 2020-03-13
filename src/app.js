import express from 'express'
import bodyParser from 'body-parser'
import { Game } from './gameLogic'

const app = express()
const port = 3000

const game = new Game({ n: 3 })

/*
join method
client - waiting for people to join... || game
implementation 1: assume honest client

*/

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app
  .use(allowCrossDomain)
  .use(bodyParser.json())
  .get('/', (req, res) => {
    res.send('Hello world')
  })
  .get('/game_status', (req, res) => {
    // board status so client can represent it
    // also return whether game over, and if so, how - win or draw
    // don't make the client re-derive this from board status, since
    // the back end has to do it anyway
    const gameStatus = {
      board: game.getBoard(),
      gameOver: game.gameOver(),
      winner: game.getWinner(),
      isDraw: game.isDraw()
    }
    res.json(gameStatus)
  })
  .post('/move', (req, res) => {
    // success case output: 2xx status, plus return the same data as game_status above
    // failure case output: 4xx status, possibly the reason for error (invalid move, etc)
    const player = req.body.player
    const position = req.body.position
    try {
      game.makeMove(player, position)
      res.sendStatus(200)
    }
    catch(error) {
      res.status(400).send(error)
    }
  })

app.listen(port, () => console.log(`app listening on port ${port}`))