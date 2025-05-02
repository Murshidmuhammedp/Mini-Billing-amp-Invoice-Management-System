import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './components/Error/Errorpage'
import Dashboard from './components/dashboard/Dashboard'
import Customers from './components/dashboard/Customers'
import Products from './components/dashboard/Products'
import Sales from './components/dashboard/Sales'


function App() {

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Dashboard' element={< Dashboard/>} />
        <Route path='/customers' element={< Customers/>} />
        <Route path='/products' element={< Products/>} />
        <Route path='/sales' element={< Sales/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
  )
}

export default App
