import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import toast, { Toaster } from 'react-hot-toast';
import Home from "./components/Home";
import './App.css'

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/product/:id" element={<ProductDetails /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/me/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
              

             } />
            <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute> } />


          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;