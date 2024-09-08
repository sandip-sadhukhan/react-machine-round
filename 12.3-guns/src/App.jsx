import { useCallback, useMemo, useRef, useState } from 'react'
import './App.css'

function App() {
  const [gun1Count, setGun1Count] = useState(0);
  const [gun2Count, setGun2Count] = useState(0);
  const [gun3Count, setGun3Count] = useState(0);
  const gun2Ref = useRef(0);
  const gun3Ref = useRef(0);

  const gun1ClickHandler = () => {
    setGun1Count(gun1Count + 1);
  }

  const debounce = function(func, delay) {
    let timeout;

    return function(...args) {
      gun2Ref.current += 1;
      clearTimeout(timeout);

      timeout = setTimeout(function() {
        func(...args);
      }, delay)
    }
  }

  const updateGun2Value = () => {
    setGun2Count(gun2Ref.current);
  }

  const throttle = function(func, delay) {
    var lastCall = 0;

    return function(...args) {
      gun3Ref.current += 1;
      const now = new Date().getTime();

      if (now - lastCall >= delay) {
        func(...args)
        lastCall = now;
        console.log("function called")
      }
    }
  }

  const gun3ClickHandler = () => {
    setGun3Count(gun3Ref.current);
  }

  const debouncedGun3ClickHandler = useCallback(throttle(gun3ClickHandler,500), []);

  const debouncedGun2ClickHandler = useCallback(debounce(updateGun2Value, 500), []);

  return (
    <>
    <div className="flex">
      <div className="item">
        <div>
          Hit: {gun1Count}
        </div>
        <button onClick={gun1ClickHandler}>Gun 1</button>
      </div>

      <div className="item">
        <div>
          Hit: {gun2Count}
        </div>
        <button onClick={debouncedGun2ClickHandler}>Gun2</button>
      </div>

      <div className="item">
        <div>
          Hit: {gun3Count}
        </div>
        <button onClick={debouncedGun3ClickHandler}>Gun3</button>
      </div>
    </div>

    </>
  )
}

export default App
