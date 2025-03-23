import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import CartPage from './pages/CartPage'
import ProductList from './pages/ProductList'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<ProductList />} />
            <Route path='/cart' element={<CartPage />} />
          </Route>

            <Route path='/auth/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
