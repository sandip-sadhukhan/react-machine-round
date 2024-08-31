import { useState } from 'react'
import './App.css'
import StartRating from './components/star-rating';

function App() {
  const [value, setValue] = useState(3);

  return (
    <div className="app">
      <h2>Star Rating</h2>

      <StartRating
        rating={value}
        size={5}
        onRatingClick={(selectedValue) => setValue(selectedValue)}
      />

      <h5>Current Rating: {value}</h5>
    </div>
  )
}

export default App
