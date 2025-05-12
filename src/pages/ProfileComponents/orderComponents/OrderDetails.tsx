import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import OrderContext from "../../../context/OrderContext";

const OrderDetails = () => {
    const orderContext = useContext(OrderContext);
    const {selectedOrder} = orderContext!;
    console.log("Selected Order", selectedOrder);

    return(
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width: "100%"}}>
            <Box sx={{ width:"100%", display:"flex", justifyContent:"space-between"}}>
                <Typography>Date: {selectedOrder?.orderDateTime}</Typography>
                <Typography variant="body1" sx={{textAlign:"right"}}>Order Id: {selectedOrder?.orderId}</Typography>
            </Box>
            <Box sx={{border:1, mt:5, borderRadius:2, width:"100%", p:2}}>
                <Box>
                    <Typography>Product</Typography>
                    {selectedOrder?.orderProducts.map((product) => (
                        <Box key={product.productId} sx={{display:"flex", justifyContent:"space-between", borderBottom:1, borderColor:"#E5E5E5", p:2}}>
                            <Typography>{product.productId}</Typography>
                            <Typography>${product.quantity}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box>

                </Box>
            </Box>
        </Box>
    )
}
export default OrderDetails;