import React from "react";
import GameBoard from "./GameBoard";
import { Button } from "@material-ui/core";
function winnerFinder(sqr) {
  const winCondition = [
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [0, 4, 8],
    [6, 7, 8],
    [0, 3, 6],
    [2, 4, 6],
  ];
  for (let j = 0; j < winCondition.length; j++) {
    const [l, m, n] = winCondition[j];
    if (sqr[l] && sqr[l] === sqr[m] && sqr[m] === sqr[n]) {
      return sqr[l];
    }
  }
  return null;
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPlayer: true,
      sN: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  whatHappenByClick(i) {
    const history = this.state.history.slice(0, this.state.sN + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = winnerFinder(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.nextPlayer ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      nextPlayer: !this.state.nextPlayer,
      sN: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      sN: step,
      nextPlayer: step % 2 === 0,
      history: this.state.history.slice(0, step + 1),
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = winnerFinder(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Move number: " + move : "Start ...";
      return (
        <li key={move}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </Button>
        </li>
      );
    });
    let status = winner
      ? "Winner : " + winner
      : (this.state.nextPlayer ? "X" : "O") + " Is Next player";
    return (
      <div
        style={{
          backgroundColor: "lightblue",
          position: "absolute",
          padding: "5rem",
          paddingLeft: "10%",
          width: "outo",
          minWidth: "400px",
        }}
      >
        <div>
          <GameBoard
            onClick={(i) => this.whatHappenByClick(i)}
            squares={current.squares}
          ></GameBoard>
        </div>
        <div>
          <div>
            <br></br>
            <Button variant="outlined" color="primary">
              {status}
            </Button>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
