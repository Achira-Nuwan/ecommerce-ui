import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import OrderContext from "../../../context/OrderContext";
import OrderType from "../../../types/OrderType";

const OrderList = ({orderList}: {orderList: OrderType[] | []}) => {
    const orderContext = useContext(OrderContext);
    const {selectedOrder, setSelectedOrder} = orderContext!;

    const handleOrderDetails = (orderid: number) => {
        const order = orderList.find(order => order.orderId === orderid);
        if(order){
            setSelectedOrder(order);
        }
    }
    
    return(
        <Box sx={{ px:2, borderRadius: 2, width:"100%",backgroundColor:"#f5f5f5"}}>
            {/* Order List */}
            <Typography variant="h5" sx={{textAlign:"left", fontWeight:"bold"}}>Order Details</Typography>
            <Grid container spacing={2} sx={{my: 2}}>
                {orderList.map((order) => (
                    <Grid item xs={12} key={order.orderId}>
                        <Card onClick={() =>handleOrderDetails(order.orderId)} sx={{display:"flex", flexDirection:"column", borderRadius:2, width:"100%", boxShadow:3, cursor:"pointer", "&:hover": {boxShadow: 6}}}>
                            <CardContent>
                                <Typography variant="h6">Order ID: {order.orderId}</Typography>
                                <Typography variant="body1">Order Date: {order.orderDateTime}</Typography>
                                <Typography variant="body1">Total Amount: ${order.totalPrice}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>    
    )
}
export default OrderList;