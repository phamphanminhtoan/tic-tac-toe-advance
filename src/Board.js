import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {


  renderSquare = (i) => {
    return (
      <Square
        key = {i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winIndex = {this.props.winRow && (this.props.winRow[0] === i || this.props.winRow[1] === i || this.props.winRow[2] === i) ? 'red':  ''}
      />
    );
  }

  createBoard = () =>{
    let board = []
    for (let i = 0; i < 9; i+=3) {
      let children = [];
      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(i + j));
      }
      board.push(<div key= {i} className="board-row">{children}</div>);
    }
    return board
  }
  highLight = ()=>{

  }

  render() {

    return (
      <div>
      {this.createBoard()}
      {this.highLight()}
      </div>
    );
  }
}

export default Board;