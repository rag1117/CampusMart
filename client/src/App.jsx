import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import MyListings from './pages/MyListings.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sell" element={<CreateProduct />} />
        <Route path="my-listings" element={<MyListings />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
