"use client";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [xIndex, setXIndex] = useState(Array(3));
  const [oIndex, setOIndex] = useState(Array(3));
  const winner = calculateWinner(board);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    if (xIsNext){
      if (xIndex.length < 3){
        setXIndex(xIndex.length === 0 ? [index] : [...xIndex, index])
      } else {
        newBoard[xIndex[0]] = "";
        setXIndex([xIndex[1], xIndex[2], index])
      }
    } else {
      if (oIndex.length < 3){
        setOIndex(oIndex.length === 0 ? [index] : [...oIndex, index])
      } else {
        newBoard[oIndex[0]] = "";
        setOIndex([oIndex[1], oIndex[2], index])
      }
    }
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setXIndex(Array(3));
    setOIndex(Array(3));
    setXIsNext(true);
  };

  const isHighlightedCell = (index: number) => {
    return xIsNext ? xIndex.length === 3 && index === xIndex[0] : oIndex.length === 3 && index === oIndex[0]
  }

  const renderCell = (index: number) => (
    <button
      key={index}
      className={`w-24 h-24 border border-gray-300 text-2xl font-bold flex items-center justify-center hover:bg-gray-100 ${ isHighlightedCell(index) ? 'text-gray-300' : 'text-gray-600'}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-1">
        {board.map((_, i) => renderCell(i))}
      </div>
      <div className="mt-4 text-lg text-gray-500">
        {winner
          ? `Winner: ${winner}`
          : board.includes("") ? `Next: ${xIsNext ? "X" : "O"}` : "It's a Draw!"}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset
      </button>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
