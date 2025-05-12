import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import OrderProductsContext from "../../../context/OrderProductsContext";

const OrderSummary = () => {

    const orderProductContext = useContext(OrderProductsContext);
    const { orderedProducts } = orderProductContext!;

    const getTotalPrice = () => {
        let totalPrice = 0;
        orderedProducts.forEach((product) =>{
            totalPrice += product.price * product.quantity;
        })
        return totalPrice.toFixed(2);
    }

    return (
        <Box sx={{p: 3, bgcolor: "#f5f5f5", borderRadius: 2, display: "flex", flexDirection: "column", width: "100%", height:"100vh" }}>
            <Box sx={{ backgroundColor: "white", borderRadius: 2, padding: 3, marginBottom: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: "left", mb: 2, fontWeight: "bold" }}>
                    Summary
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">Sub Total:</Typography>
                    <Typography>LKR {getTotalPrice()}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Discount:</Typography>
                    <Typography>0%</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Delivery Cost:</Typography>
                    <Typography>LKR</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>Total Price:</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>LKR {getTotalPrice()}</Typography>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 2,
                        backgroundColor: "red",
                        borderRadius: 5,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }}
                    fullWidth
                >
                    Place Order ({orderedProducts.length})
                </Button>
            </Box>
        </Box>
    )
}
export default OrderSummary;