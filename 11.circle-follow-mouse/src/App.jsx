import { useEffect, useRef, useState } from 'react'
import './App.css'
import Circle from './components/circle'

function App() {
  const circleRef = useRef(null);

  const debounce = function(func, delay) {
    let timeoutId;

    return function(...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(function() {
        func(...args);
      }, delay)
    }
  }

  const throttle = function(func, delay) {
    let lastCall = 0;

    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        func(...args)
        lastCall = now;
      }
    }
  }


  const updatePosition = function(e) {
    console.log("called")
    // const offset = 100;

    // setTimeout(function() {
      circleRef.current.style.left = `${e.clientX}px`;
      circleRef.current.style.top = `${e.clientY}px`;
    // }, offset)
  }

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousemove", throttle(updatePosition, 100))
  
    // Detach the listener when the component unmounted.
    return () => {
      document.removeEventListener("mousemove", updatePosition)
    }
  }, []);

  console.log("Rerendering")

  return (
    <div>
      <Circle ref={circleRef} />
    </div>
  )
}

export default App
