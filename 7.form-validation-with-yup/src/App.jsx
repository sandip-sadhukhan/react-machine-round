import { useState } from 'react'
import './App.css'
import FormWithoutYup from './components/form-without-yup'
import FormWithYup from './components/form-with-yup'

function App() {
  return (
    <div>
      {/* <FormWithoutYup /> */}
      <FormWithYup />
    </div>
  )
}

export default App
