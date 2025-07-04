// placing order using cod method

import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"



const PlaceOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }


}

const PlaceOrderStripe = async (req, res) => {

}
const PlaceOrderRazorpay = async (req, res) => {

}


// all orders for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })



    }

}

const UserOrder = async (req, res) => {
    // console.log(req.body)
    try {
        // const { userId, items, amount, address } = req.body
        const { userId } = req.body

        // console.log(userId)
        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}

// update status from admin panel
const updateStatus = async (req, res) => {
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:false,message:error.message})
        
    } catch (error) {
        
    }

}
export { PlaceOrder, PlaceOrderStripe, PlaceOrderRazorpay, allOrders, UserOrder, updateStatus }