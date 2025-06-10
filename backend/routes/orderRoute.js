
import express from "express";

import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,UserOrder,updateStatus} from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";



const orderRouter=express.Router()
// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment fearture
orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay)

// user feature
orderRouter.post('/userorders',authUser,UserOrder)



export default orderRouter