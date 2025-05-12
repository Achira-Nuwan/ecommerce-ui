import { Box } from "@mui/material";
import OrderItemList from './orderPageComponents/OrderItemList';
import OrderSummary from "./orderPageComponents/OrderSummary";

const OrderPage = () => {
    return(
        <Box sx={{display:"flex", height:"100vh", padding: 2}}>
            <Box sx={{width:"60%", padding: 2, border:1, overflowY:"scroll"}}>
                <OrderItemList/>
            </Box>
            <Box sx={{width:"40%", padding: 2}}>
                <OrderSummary/>
            </Box>
        </Box>
    )
}
export default OrderPage;