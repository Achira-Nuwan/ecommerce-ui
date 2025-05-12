import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
//import Login from './auth/Login'
//import { AuthProvider } from './context/AuthContext'
import CartProvider from './context/providers/CartProvider'
import OrderProductsProvider from './context/providers/OrderProductsProvider'
import OrderProvider from './context/providers/OrderProvider'
import About from './pages/HomePageComponents/About'
//import CustomerDetails from './pages/HomePageComponents/CustomerDetails'
import { ThemeProvider } from '@emotion/react'
import Login from './auth/Login'
import SelectedProductProvider from './context/providers/SelectedProductProvider'
import UserProvider from './context/providers/UserProvider'
import CustomerDetails from './pages/HomePageComponents/CustomerDetails'
import Security from './pages/HomePageComponents/SecurityProtection'
import CartPage from './pages/MainPages/CartPage'
import CustomerReviews from './pages/MainPages/CustomerReviews'
import OrderPage from './pages/MainPages/OrderPage'
import ProductList from './pages/MainPages/ProductList'
import RatingDistribution from './pages/MainPages/customerReveiwsPage/RatingDistribution'
import ReviewFilters from './pages/MainPages/customerReveiwsPage/ReviewFilters'
import ProductDetail from './pages/MainPages/customerReveiwsPage/ReviewProduct'
import Account from './pages/ProfileComponents/Account'
import HelpCenter from './pages/ProfileComponents/HelpCenter'
import Orders from './pages/ProfileComponents/Orders'
import Payments from './pages/ProfileComponents/Payments'
import OrderList from './pages/ProfileComponents/orderComponents/OrderList'
import theme from './theme/ButtonTheme'

function App() {

  return (
    //<AuthProvider>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <SelectedProductProvider>
          <OrderProvider>
            <OrderProductsProvider>
              <CartProvider>
                <BrowserRouter>
                  <Routes>
                    {/*<Route element={<ProtectedRoute/>}>*/}
                    <Route path='/order' element={<Orders />} />
                    <Route path='/payment' element={<Payments />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/' element={<ProductList />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/security' element={<Security />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/helpcenter' element={<HelpCenter />} />
                    <Route path='/customer' element={<CustomerDetails />} />
                    <Route path='/orderList' element={<OrderList orderList={[]} />} />
                    <Route path='/orderPage' element={<OrderPage />} />
                    {/*<Route path='/orderItemList' element={<OrderItemList />} />*/}
                    {/*<Route path='/orderSummary' element={<OrderSummary />} />*/}
                    <Route path='/auth/login' element={<Login />} />
                    {/*<Route path='/auth/signup' element={<SignUp/>} />*/}
                    <Route path='/customerReviews' element={<CustomerReviews />} />
                    <Route path='/product/detail' element={<ProductDetail rating={4.7} totalReviews={128} />} />
                    <Route path='/rating/distribution' element={<RatingDistribution />} />
                    <Route path='/filter' element={<ReviewFilters />} />
                    
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </OrderProductsProvider>
          </OrderProvider>
        </SelectedProductProvider>
      </UserProvider>
    </ThemeProvider>

  )
}

export default App
