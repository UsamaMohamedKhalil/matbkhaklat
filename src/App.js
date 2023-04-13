import { BrowserRouter , Routes , Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import CheckOutFormVoda from "./components/checkoutFormVoda/CheckOutFormVoda";
import {Footer , Header } from './components/index';
import ProductDetails from './components/product/productDetails/ProductDetails'
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import Checkout from "./pages/checkout/Checkout";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import {Home , Contact , Login , Register , Reset, Admin, Cart, OrderHistory} from './pages/index';
import OrederDetails from "./pages/orderDetails/OrederDetails";

function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
       <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/checkout-success" element={<CheckoutSuccess/>} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrederDetails />} />
            <Route path="/review-product/:id" element={<ReviewProducts />} />
            <Route path="/checkout-vodafone-cash" element={<CheckOutFormVoda />} />
            <Route path="/admin/*" 
              element={ <AdminOnlyRoute>
                <Admin />
            </AdminOnlyRoute> } />
              <Route path="/product-details/:id" element={<ProductDetails />} />
          </Routes>
       </BrowserRouter>
    </>
  );
}

export default App;
