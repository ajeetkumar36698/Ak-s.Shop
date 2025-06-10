import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Order = ({ token }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrder = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      console.log(response.data)

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(error.data.message)

      }

    } catch (error) {
      toast.error(error.message)

    }

  }
  const statushandler = async (event, orderId) => {
    console.log(event.target.value)
    try {

      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        await fetchAllOrder()

      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }





  useEffect(() => {
    fetchAllOrder();

  }, [token])


  return (
    <div className="p-4 md:p-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Page</h3>

      <div className="space-y-6">
        {
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 p-5 border rounded-lg shadow-sm bg-white text-sm text-gray-700"
            >
              {/* Parcel Icon */}
              <img className="w-10 h-10" src={assets.parcel_icon} alt="Parcel Icon" />

              {/* Order Details */}
              <div className="space-y-2">
                {/* Items */}
                <div className="text-gray-900 font-medium">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity} <span className="text-xs">({item.size})</span>
                      {i !== order.items.length - 1 && <>, </>}
                    </span>
                  ))}
                </div>

                {/* Customer Name */}
                <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>

                {/* Address */}
                <div className="text-gray-600">
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <p><strong>Items:</strong> {order.items.length}</p>
                  <p><strong>Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                </div>

                {/* Amount */}
                <p className="font-bold text-lg text-green-600">{currency}{order.amount}</p>

                {/* Status Select */}
                <div>
                  <select onChange={(event)=>statushandler(event,order._id)} value={order.status} className="mt-2 border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start justify-end text-right text-sm font-medium">
                <p className="text-blue-600">{order.address.phone}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Order