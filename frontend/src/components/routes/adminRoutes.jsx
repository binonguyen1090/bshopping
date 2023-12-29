import React from 'react'
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import MyOrders from "../order/MyOrders";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/Invoice";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Dashboard from '../admin/Dashboard';

const adminRoutes = () => {
  return (
    <>
        <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </>
  )
}

export default adminRoutes