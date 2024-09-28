import React from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {

  const [orders, setOrders] = React.useState([])

  const fetchAllOrders = async () => {

    const response = await axios.get(url + "/api/order/list")

    if (response.data.success) {
      setOrders(response.data.data)

      console.log(response.data.data);

    }
    else {

      toast.error("Something went wrong")

    }

  }

  const statusHandler = async (e, orderId) => {

    const response = await axios.post(url + "/api/order/status", { orderId, status: e.target.value })
    if(response.data.success){
      toast.success("Status Updated")
      await fetchAllOrders();
    }
  }


  React.useEffect(() => {
    fetchAllOrders()
  }, [])


  return (
    <div className='order add'>

      <h3>Order Page.</h3>
      <div className='order-list'>
        {
          orders.map((order, index) => (
            <div className='order-item' key={index}
            >

              <img src={assets.parcel_icon} alt="" />

              <div>
                <p className='order-item-food'>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity
                      }
                      else {
                        return item.name + " x " + item.quantity + ", "
                      }
                    })
                  }
                </p>


                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>


                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>

                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>


                <p className='order-item-phone'>
                  {
                    order.address.phone
                  }
                </p>
              </div>


              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>


              <select value={order.status} onChange={(e) => statusHandler(e, order._id)}>
                <option value="Expert Viewing">Expert Viewing</option>
                <option value="On The Way">On The Way</option>
                <option value="Reached">Reached</option>
              </select>

            </div>
          ))


        }
      </div>

    </div>
  )
}

export default Orders