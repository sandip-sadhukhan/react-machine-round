import { useState } from 'react';
import './App.css'
import ProgressBar from './components/progress-bar'
import { useEffect } from 'react';

function App() {
    const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(function() {
      if (value === 100) {
        clearInterval(interval);
        return;
      }

      setValue(prev => {
        let newCount = prev + 1;

        if (newCount === 100) {
          clearInterval(interval);
        }
        return newCount;
      })

    }, 100)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="app">
      <h5>Progress Bar</h5>

      <ProgressBar value={value} />
    </div>
  )
}

export default App
