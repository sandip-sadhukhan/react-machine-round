import { useState, useEffect } from "react"

const ProgressBar = ({value}) => {
  console.log(value)
  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}>
      <div
        style={{transform: `scaleX(${value / 100})`}}
        className={`progress-bar-active`}>
      </div>
      <span
        className="progress-bar-text"
        style={{color: value < 50 ? "black" : "white"}}>
          {value}%
      </span>
    </div>
  )
}

export default ProgressBar