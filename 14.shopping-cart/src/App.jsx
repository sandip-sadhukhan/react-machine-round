import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './components/app-layout'
import Home from './pages/home'
import Context from './context/context'
import Cart from './pages/cart'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  }
])

function App() {
  return (
    <Context>
      <RouterProvider router={router}>
        <h1 className='font-thin'>hello</h1>
      </RouterProvider>
    </Context>
  )
}

export default App
