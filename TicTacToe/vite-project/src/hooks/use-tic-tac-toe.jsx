import { useState } from "react";

const initialBoard = (size) => Array(size * size).fill(null);

const useTicTacToe = (boardSixe) => {
  const [board, setBoard] = useState(initialBoard(boardSixe));
  const [isXNext, setIsXNext] = useState(true);

  const generatWinningPatterns = () => {
    const patterns = [];

    for (let i = 0; i < boardSixe; i++) {
      const horizontalPatterns = [];
      const verticalPatterns = [];
      for (let j = 0; j < boardSixe; j++) {
        horizontalPatterns.push(i*boardSixe + j)
        verticalPatterns.push(j*boardSixe + i)
      }
      patterns.push(horizontalPatterns,verticalPatterns)
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for(let i=0 ;i < boardSixe;i++){
      diagonal1.push(i*(boardSixe + 1));
      diagonal2.push((i+1)*(boardSixe-1))
    }
    patterns.push(diagonal1,diagonal2)
    return patterns;
  };
  const WINNING_PATTERNS = generatWinningPatterns()

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      let countX = 0;
      let countO = 0;
      const pattern = WINNING_PATTERNS[i];
      for(let j =0 ;j<pattern.length;j++){
        const cell = currentBoard[pattern[j]]
        if(cell === "X"){
          countX++;
        }else if(cell ==="O"){
          countO++;
        }
        
      }
      if(countO === boardSixe)return "O";
      if(countX === boardSixe) return "X";
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return ` Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw`;

    return `Player ${isXNext ? "X" : "O"} turn `;
  };

  const resetGame = () => {
    setBoard(initialBoard(boardSixe));
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTicTacToe;
