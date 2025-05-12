import { Add, CheckCircle, Close, Delete, Remove, Search, ShieldOutlined, ShoppingCart } from "@mui/icons-material";
import {
    Alert,
    AppBar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Snackbar,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/DHF_logo.png";
import CartContext from "../../context/CartContext";
import orderProductContext from "../../context/OrderProductsContext";
//import { CustomerDetailsModel } from "../../models/CustomerDetailsModel";
import SelectedProductContext from "../../context/SelectedProductContext";
import ProductDetails from "../GlobalComponents/ProductDetails";

// Define CartItem interface
export interface CartItem {
    id: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

// User ID (Replace with authentication logic if needed)
const userId = 1;

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    //const [orderedProduct, setOrderedProduct] = useState<CartItem[] | null>(null);
    const [cusModelOpen, setCusModelOpen] = useState<boolean>(false);
    const [orderModelOpen, setOrderModelOpen] = useState<boolean>(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
    
    //const [warningAlertOpen, setWarningAlertOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const orderedContext = useContext(orderProductContext);

    const selectedProductContext = useContext(SelectedProductContext);
    const { setSelectedProduct } = selectedProductContext!;

    const { products } = cartContext!;
    const {orderedProducts, setOrderedProducts} = orderedContext!;


    // Fetch cart on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
            console.log("API Response:", response.data); // Debugging

            // Extract cart items
            const items = response.data.items || [];

            // Fetch product details for each item
            const products = await Promise.all(
                items.map(async (item: { productId: number; quantity: number }) => {
                    const productRes = await axios.get(`http://localhost:8080/products/${item.productId}`);
                    return {
                        id: item.productId,
                        quantity: item.quantity,
                        ...productRes.data, // productName, description, price, imageUrl
                    };
                })
            );
            setCartItems(products);

        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) return removeItem(id); // Remove item if qty is 0

        try {
            await axios.put(`http://localhost:8080/cart`, {
                userId,
                productId: id,
                quantity: newQuantity
            });

            // Update UI state
            setCartItems((prev) =>
                prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
            );
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };


    const toggleItemSelection = (id: number) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    }

    const removeItem = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const getTotalPrice = () => {
        return cartItems
            .filter((item) => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const handleModleOpen = () => {
        const orderProduct = cartItems.filter((item) => selectedItems.includes(item.id));
        console.log("Selected Products:", orderProduct);
        setOrderedProducts(orderProduct);
        setOpen(true);
    };


    const handleModleclose = () => {
        setOpen(false);
        setOrderedProducts([]);
    };

    const handleOrderModelOpen = () => {
        setOpen(false);
        setOrderModelOpen(true);
    };

    const handleOrderModelClose = () => {
        setOrderModelOpen(false);
    };

    const placeOrder = async () => {

        if (!orderedProducts || orderedProducts.length === 0) {
            console.log("No products selected for the order.");
            setErrorAlertOpen(true);
            return;
        }

        const orderRequest = {
            orderProducts: orderedProducts.map((item) => ({
                productId: item.id,
                qty: item.quantity
            })),
            // email: "s17933@sci.pdn.ac.lk"
        };

        try {
            const response = await axios.post("http://localhost:8080/orders", orderRequest);
            console.log("Order placed successfully.!", response.data);
            setSuccessAlertOpen(true);
            setOrderModelOpen(false);
            setCartItems([]);
        } catch (error) {
            console.error("Error placing order.!", error);
            setErrorAlertOpen(true);
        }
    };

    const handleCloseSuccessAlert = () => {
        setSuccessAlertOpen(false);
    };

    const handleCloseErrorAlert = () => {
        setErrorAlertOpen(false);
    };

   {/*const customerRegistrationModelHandle = () => {
        if (selectedItems.length === 0) {
            console.log("No items selected for checkout.");
            //setWarningAlertOpen(true);
            return;
        }
        setCusModelOpen(true);
        const orderProduct = cartItems.filter((item) => selectedItems.includes(item.id));
        console.log("Selected Products:", orderProduct);
        setOrderedProducts(orderProduct);
    };*/}

    const customerRegistrationModelClose = () => {
        setCusModelOpen(false);
        
    }

    const handleCardClick = (id:number) => {
        const selectedProduct = cartItems.find((item) => item.id === id);
        setSelectedProduct(selectedProduct || null);
        navigate("/customerReviews");
    }

    return (
        <Box>
            <AppBar sx={{ marginBottom: 3, background: "linear-gradient(to right, #2e1049, #6d43a2)" }}>
                <Toolbar sx={{ padding: "none" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "spaceBetween", width: "100%" }}>
                        <Box sx={{
                            backgroundImage: `url(${logo})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "100px",
                            width: "100px",
                            alignItems: "center",
                            justifyContent: "center",
                            // border:"2px solid white",
                            padding: 0,
                            margin: 0,
                            boxSizing: "border-box"
                        }} />
                    </Box>
                    <TextField
                        placeholder="Search.."
                        size="small"
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 5,
                            width: 800,
                            height: 50,
                            marginRight: 5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 5,
                                height: 50,
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton color="inherit">
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/*Success snackbar */}
            <Snackbar open={successAlertOpen} autoHideDuration={3000} onClose={handleCloseSuccessAlert}>
                <Alert onClose={handleCloseSuccessAlert} severity="success" sx={{ width: "100%" }}>
                    Order placed successfully !
                </Alert>
            </Snackbar>

            {/*Error snackbar*/}
            <Snackbar open={errorAlertOpen} autoHideDuration={3000} onClose={handleCloseErrorAlert}>
                <Alert onClose={handleCloseErrorAlert} severity="error" sx={{ width: "100%" }}>
                    Error placing order !
                </Alert>
            </Snackbar>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, p: 3, mt: 10, marginBottom: 1 }}>
                {/* Cart Items Section */}
                <Box sx={{ width: "60%" }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: "left", marginTop: 2 }}>
                        <ShoppingCart sx={{ fontSize: 32, mr: 1 }} />
                        Shopping Cart ({cartItems.length})
                    </Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : cartItems.length === 0 ? (
                        <Typography variant="h6" color="text.secondary">
                            Your cart is empty.
                        </Typography>
                    ) : (
                        <>
                            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                                <Checkbox
                                    checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                                    indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                                    onChange={() => {
                                        if (selectedItems.length === cartItems.length) {
                                            setSelectedItems([]); // Deselect all
                                        } else {
                                            setSelectedItems(cartItems.map((item) => item.id)); // Select all
                                        }
                                    }}
                                />
                                <Typography variant="body1">Select All</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                {cartItems.map((item) => (
                                    <Grid item xs={12} key={item.id}>
                                        <Card sx={{ display: "flex", alignItems: "center", p: 1 }} onClick={() => handleCardClick(item.id)}>
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleItemSelection(item.id)}
                                            />
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
                                                    <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                        <Remove />
                                                    </IconButton>
                                                    <Typography variant="body1" sx={{ mx: 1 }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                            <IconButton color="error" onClick={() => removeItem(item.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Box>

                {/* Summary Section */}
                <Box sx={{ width: "30%", p: 3, bgcolor: "#F7FBFF", borderRadius: 2, display: "flex", flexDirection: "column" }}>
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
                            onClick={() => navigate("/orderPage")}
                        >
                            Checkout ({selectedItems.length})
                        </Button>
                    </Box>

                    <Dialog open={orderModelOpen} onClose={handleOrderModelClose} maxWidth="sm" fullWidth>
                        <DialogTitle sx={{ fontWeight: "bold" }}>Place order</DialogTitle>
                        <IconButton sx={{ position: "absolute", right: 1, top: 1 }}>
                            <Close />
                        </IconButton>
                        <DialogContent sx={{}}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: 0.5, borderColor: "lightgray" }}>
                                <Box sx={{ textAlign: "left", mt: 2 }}>
                                    <Typography sx={{ fontSize: "14px" }}>Sub Total</Typography>
                                    <Typography sx={{ fontSize: "14px" }}>Discount</Typography>
                                    <Typography sx={{ fontSize: "14px" }}>Delivery Cost</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px", mt: 2 }}>Total</Typography>
                                </Box>
                                <Box sx={{ textAlign: "right", mt: 2 }}>
                                    <Typography sx={{ fontSize: "14px" }}>LKR {getTotalPrice()}</Typography>
                                    <Typography sx={{ fontSize: "14px" }}>0%</Typography>
                                    <Typography sx={{ fontSize: "14px" }}>0</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "20px", mt: 2 }}>LKR {getTotalPrice()}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ pt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button variant="outlined" onClick={handleOrderModelClose}>Cancel</Button>
                                <Button variant="contained" onClick={placeOrder}>Buy</Button>
                            </Box>
                        </DialogContent>
                    </Dialog>

                    <Box sx={{ backgroundColor: "white", borderRadius: 2, padding: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: "left", mb: 2, fontWeight: "bold" }}>
                            Pay with
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "left", gap: 2, borderBottom: 0.5, borderColor: "lightgray", py: 2 }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                alt="Visa"
                                style={{ height: 20 }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                                alt="Mastercard"
                                style={{ height: 20 }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "left", mb: 2 }}>
                                <Box sx={{ position: "relative", display: "inline-block", width: 35, height: 35 }}>
                                    <ShieldOutlined sx={{ color: "green", fontSize: 35 }} />
                                    <CheckCircle sx={{ fontSize: 18, color: "white", position: "absolute", bottom: 2, right: 2, backgroundColor: "green", borderRadius: "50%" }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    Buyer Protection Guarantee
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: "12px", textAlign: "left" }}>Get a full refund if the item is not delivered</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* More to Explore Section */}
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ textAlign: "left" }}>Favorites</Typography>
                <Box>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {products.slice(0, 6).map((item) => (
                            <Grid item xs={2} key={item.productId}>
                                <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        image={item.imageUrl}
                                        alt={item.productName}
                                        sx={{ width: "100%", height: 140 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{item.productName}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            LKR {item.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <Box>
                <Typography variant="h6" sx={{textAlign:"left", px:3}}>More to Explore</Typography>
                <ProductDetails/>
            </Box>
        </Box>
    );
}
