import React from "react";
import Sq from "./Sq";
export default function Board(props) {
  const makeSquare = (i) => {
    return <Sq value={props.squares[i]} onClick={() => props.onClick(i)}></Sq>;
  };
  return (
    <div>
      <div className="row_one">
        {makeSquare(0)}
        {makeSquare(1)}
        {makeSquare(2)}
      </div>
      <div className="row_two">
        {makeSquare(3)}
        {makeSquare(4)}
        {makeSquare(5)}
      </div>
      <div className="row_three">
        {makeSquare(6)}
        {makeSquare(7)}
        {makeSquare(8)}
      </div>
    </div>
  );
}
