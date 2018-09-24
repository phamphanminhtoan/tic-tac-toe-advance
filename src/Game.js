import React, { Component } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}



class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      toaDo : Array(9).fill(null),
      btnMove : -1,
      isDraw: 0
    };
  }


  handleClick(i) {
    const {toaDo}  = this.state;
    toaDo[this.state.stepNumber] = i;
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const calcTemp = calculateWinner(squares);
    if (calcTemp || squares[i]) {
      this.setState({
        isDraw: 1
      });
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      toaDo : toaDo.concat()
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      btnMove: step
    });
  }

  render() {
    const {history} = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const x = parseInt(this.state.toaDo[move - 1] /3, 10 );
      const y = parseInt(this.state.toaDo[move - 1], 10) - x* 3;
      const desc = move ?
        'Go to move #' + move  + ' ( ' + x + '; ' + y + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button 
              onClick={() => this.jumpTo(move)}
              className = {this.state.btnMove === move ? 'boldMove' : ''}
              >{desc}</button>
              
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    }
    else if(this.state.isDraw){
      status = "DRAW";
    } 
    else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winRow = {winner ? winner : null}
          />
          
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <ol></ol>
        </div>
      </div>
    );
  }
}
export default Game;