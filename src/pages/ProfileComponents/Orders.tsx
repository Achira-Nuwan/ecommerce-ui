import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import OrderType from '../../types/OrderType';
import OrderDetails from './orderComponents/OrderDetails';
import OrderList from './orderComponents/OrderList';

function Orders() {
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  const fetchorderList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      console.log(response.data);
      setOrderList(response.data);
      console.log("Order List", orderList);
    } catch (error) {
      console.error("Error fetching order list", error);
    }
  }

  useEffect(() => {
    fetchorderList();
  }, []);

  return (
    <Box sx={{ display: 'flex', gap:2}}>
      {/* Order List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px:2, width: "30%"}}>
        <OrderList orderList={orderList}/>
      </Box>

      {/* Order Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: "70%", border:"1px solid #E5E5E5", borderRadius: 2}}>
        <OrderDetails/>
      </Box>
    </Box>
  )
}
export default Orders;
