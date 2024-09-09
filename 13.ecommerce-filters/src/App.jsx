import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './components/app-layout'
import Home from './pages/home'
import Context from './context/context'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

function App() {
  return (
    <Context >
      <RouterProvider router={router}>
        <h1 className='font-thin'>hello</h1>
      </RouterProvider>
    </Context>
  )
}

export default App
