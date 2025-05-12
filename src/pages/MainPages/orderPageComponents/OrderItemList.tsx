import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import OrderProductsContext from "../../../context/OrderProductsContext";

const OrderItemList = () => {

    const orderItemContext = useContext(OrderProductsContext);
    const { orderedProducts} = orderItemContext!;

    console.log("OrderProduct",orderedProducts);

    return (
        <Box>
            {/* Cart Items Section */}
            <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"left"}}>Order Preview</Typography>
            < Grid container spacing={2} >
                {
                    orderedProducts.map((item) => ( 
                        <Grid item xs={12} key={item.id}>
                            <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
                                <CardMedia
                                    component="img"
                                    image={item.imageUrl}
                                    alt={item.productName}
                                    sx={{ width: 140, height: 140, borderRadius: 1 }}
                                />
                                <CardContent sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography variant="h6">{item.productName}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            LKR {item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <Typography variant="body1" sx={{ mx: 1 }}>
                                            {item.quantity}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid >
        </Box>
    )
}
export default OrderItemList;