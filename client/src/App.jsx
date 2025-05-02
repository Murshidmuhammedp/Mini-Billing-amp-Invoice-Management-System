import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './components/Error/Errorpage'
import Dashboard from './components/dashboard/Dashboard'


function App() {

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Dashboard' element={< Dashboard/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
  )
}

export default App
