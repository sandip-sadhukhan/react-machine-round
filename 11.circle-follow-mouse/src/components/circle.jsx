import React, { forwardRef } from 'react'

const Circle = forwardRef((props, ref) => {
  return (
    <div className="circle" ref={ref} ></div>
  )
})

export default Circle