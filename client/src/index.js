import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Hello extends Component {

  render() {
    return (
      <div>Hello Tic Tac Toe!</div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('app'))