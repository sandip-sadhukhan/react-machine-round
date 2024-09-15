import { useState } from 'react'
import './App.css'

function App() {
  const [boardData, setBoardData] = useState([...Array(9)])
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWin = (boardData) => {
    console.log("checkwin")
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let gameOver = false;

    winConditions.forEach(function(conditionArray) {
      if (gameOver) {
        return;
      }

      if (boardData[conditionArray[0]] && boardData[conditionArray[1]] &&
          boardData[conditionArray[2]] &&
          boardData[conditionArray[0]] === boardData[conditionArray[1]] &&
          boardData[conditionArray[1]] === boardData[conditionArray[2]]) {
            console.log("winner?")
        setWinner(playerTurn)
        gameOver = true;
      }
    })

    return gameOver;
  }

  const handleClick = (index) => {
    let newBoardData = [...boardData];
  
    if (newBoardData[index] !== undefined || checkWin(boardData)) {
      return;
    }

    newBoardData[index] = playerTurn;

    setBoardData(newBoardData);
    const gameOver = checkWin(newBoardData);

    if (!gameOver) {
      setPlayerTurn(playerTurn === "X" ? "O" : "X")
    }
  }

  const handleReset = () => {
    setBoardData([...Array(9)])
    setPlayerTurn("X")
    setWinner(null)
  }

  return (
    <div className="container">
      <div className="header">
        <span>
          { winner ? `Winner is ${playerTurn}` : `${playerTurn}'s turn` }
        </span>
        <button onClick={handleReset}>Reset game</button>
      </div>

      <div className="body">
        {
          boardData.map((val, index) => (
            <div
              key={index}
              className='box'
              onClick={() => handleClick(index)}
            >
              {val}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
