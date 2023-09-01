import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Main from './Pages/Main'
import Product from './Pages/Product'
import Filter from './Pages/Filter'
import Profile from './Pages/Profile'
import Wallet from './Pages/Wallet'
import Likes from './Pages/Likes'
import Cart from './Pages/Cart'
import Purchases from './Pages/Purchases'
import Purchase from './Pages/Purchase'
import Thank from './Pages/Thank'
import Brands from './Pages/Brands'
import Login from './Pages/Login'
import AdminLayout from './Components/AdminLayout'
import AdminDashboard from './Pages/AdminDashboard';
import AdminProducts from './Pages/AdminProducts'
import UpdateProducts from './Pages/UpdateProducts'
import NewProduct from './Pages/NewProduct';
import AdminCategories from './Pages/AdminCategories'
import NewCategory from './Pages/NewCategory'
import AdminCatalogs from './Pages/AdminCatalogs'
import NewCatalog from './Pages/NewCatalog'
import AdminBrands from './Pages/AdminBrands'
import NewBrand from './Pages/NewBrand'
import AdminDiscount from './Pages/AdminDiscount'
import NewDiscount from './Pages/NewDiscount'
import AdminOrders from './Pages/AdminOrders'
import AdminReviews from './Pages/AdminReviews'

function App() {
  return (
    <Routes>
      <Route element={<Layout/>} path='/'>
        <Route element={<Main/>} path='/'/>
        <Route element={<Profile/>} path='/profile'/>
        <Route element={<Wallet/>} path='/wallet'/>
        <Route element={<Likes/>} path='/likes'/>
        <Route element={<Cart/>} path='/cart'/>
        <Route element={<Purchases/>} path='/purchases'/>
        <Route element={<Purchase/>} path='/purchase'/>
        <Route element={<Thank/>} path='/thank'/>
        <Route element={<Brands/>} path='/brands'/>
        <Route element={<Product/>} path='/product/:id'/>
        <Route element={<Filter/>} path='/filter/:catalog/:category/:brand/:discount/:search'/>
      </Route>
        <Route element={<Login/>} path='/login'/>
        <Route element={<AdminLayout/>} path='/admin'>
          <Route element={<AdminDashboard/>} path='/admin/dashboard'/>
          <Route element={<UpdateProducts/>} path='/admin/update/product/:id'/>
          <Route element={<NewProduct/>} path='/admin/new/product'/>
          <Route element={<AdminCategories/>} path='/admin/categories'/>
          <Route element={<NewCategory/>} path='/admin/new/category'/>
          <Route element={<NewCatalog/>} path='/admin/new/catalog'/>
          <Route element={<NewBrand/>} path='/admin/new/brand'/>
          <Route element={<AdminDiscount/>} path='/admin/discount'/>
          <Route element={<AdminCatalogs/>} path='/admin/catalogs'/>
          <Route element={<NewDiscount/>} path='/admin/new/discount'/>
          <Route element={<AdminOrders/>} path='/admin/orders'/>
          <Route element={<AdminReviews/>} path='/admin/reviews'/>
          <Route element={<AdminProducts/>} path='/admin/products'/>
          <Route element={<AdminBrands/>} path='/admin/brands'/>
        </Route>
    </Routes>
  )
}

export default App
