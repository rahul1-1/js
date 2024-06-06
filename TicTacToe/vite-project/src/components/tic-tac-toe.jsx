/* eslint-disable react/prop-types */
import useTicTacToe from "../hooks/use-tic-tac-toe";

function TicTacToe({boardSixe =  3}) {
  const { board, handleClick, getStatusMessage, resetGame } =
    useTicTacToe(boardSixe);

  return (
    <div className="game" style={{"--board-size":boardSixe}}>
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="board">
        {" "}
        {board.map((b, index) => {
          return (
            <button className="cell" key={index} onClick={() => handleClick(index)}
            disabled = {b!==null}
            >
              {b}
            
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;
