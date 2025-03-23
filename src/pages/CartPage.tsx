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
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/DHF_logo.png";

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
    const [orderedProduct, setOrderedProduct] = useState<CartItem[] | null>(null);
    const [orderModelOpen, setOrderModelOpen] = useState<boolean>(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);
    const [warningAlertOpen, setWarningAlertOpen] = useState<boolean>(false);

    // Fetch cart on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cart/${userId}`);
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
            await axios.put(`http://localhost:8080/cart/update`, { 
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
        console.log("Selected Products:", orderProduct)
        setOrderedProduct(orderProduct);
        setOpen(true);
    };


    const handleModleclose = () => {
        setOpen(false);
        setOrderedProduct([]);
    };

    const handleOrderModelOpen = () => {
        setOpen(false);
        setOrderModelOpen(true);
    };

    const handleOrderModelClose = () => {
        setOrderModelOpen(false);
    };

    const placeOrder = async () =>{

        if(!orderedProduct || orderedProduct.length === 0) {
            console.log("No products selected for the order.");
            setErrorAlertOpen(true);
            return;
        }

        const orderRequest = {
            orderProducts:orderedProduct.map((item) =>({
                productId:item.id,
                qty:item.quantity
            })),
            // email: "s17933@sci.pdn.ac.lk"
        };

        try {
            const response = await axios.post("http://localhost:8080/orders",orderRequest);
            console.log("Order placed successfully.!",response.data);
            setSuccessAlertOpen(true);
            setOrderModelOpen(false);
            setCartItems([]);
        } catch(error) {
            console.error("Error placing order.!",error);
            setErrorAlertOpen(true);
        }
    };

    const handleCloseSuccessAlert = () => {
        setSuccessAlertOpen(false);
    };

    const handleCloseErrorAlert = () => {
        setErrorAlertOpen(false);
    };

  return (
    <Box>
        <AppBar sx={{marginBottom:3, backgroundColor:"#27374D"}}>
            <Toolbar >
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Box sx={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize:"contain",
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"center", 
                        height:"75px", 
                        width:"75px", 
                        alignItems:"center",
                        justifyContent:"center"
                    }}/>
                </Box>
                <TextField 
                    placeholder="Search.."
                    size="small"
                    sx={{
                        backgroundColor:"white", 
                        borderRadius:2, 
                        width:350, 
                        marginRight:5,
                        "& .MuiOutlinedInput-root": {
                            borderRadius:2
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
                        <ShoppingCart/>
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

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, p: 3, marginBottom:2 }}>
            {/* Cart Items Section */}
            <Box sx={{ width: "60%" }}>
                <Typography variant="h4" gutterBottom sx={{textAlign:"left", marginTop:2}}>
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
                            <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
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
                                <CardContent sx={{ flex: 1, display:"flex", justifyContent:"space-between" }}>
                                    <Box sx={{textAlign:"left"}}>
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
            <Box sx={{ width: "30%", p: 3, bgcolor: "#f5f5f5", borderRadius: 2, display:"flex", flexDirection:"column" }}>
                <Box sx={{backgroundColor:"white", borderRadius:2, padding:3, marginBottom:1}}>
                    <Typography variant="h5" gutterBottom sx={{textAlign:"left", mb:2, fontWeight:"bold"}}>
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
                    <Box display="flex" justifyContent="space-between" sx={{mt:2}}>
                        <Typography sx={{fontWeight:"bold"}}>Total Price:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>LKR {getTotalPrice()}</Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        sx={{marginTop:2, 
                        backgroundColor:"red", 
                        borderRadius:5, 
                        fontWeight:"bold"}} 
                        fullWidth
                        onClick={() => handleModleOpen()}
                    >
                        Checkout ({selectedItems.length})
                    </Button>
                </Box>

                {/*Ordered Products */}
                <Dialog open={open} onClose={handleModleclose} maxWidth="sm" fullWidth>
                    <DialogTitle>Hi.. Achira, Place your order.</DialogTitle>
                    <IconButton onClick={handleModleclose} sx={{position:"absolute", right:1, top:1, mb:3}}>
                        <Close />
                    </IconButton>
                    <DialogContent sx={{mt:3}}>
                        {orderedProduct && orderedProduct.length > 0 ? (
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold", width:"20%"}}>Product</TableCell>
                                            <TableCell sx={{ fontWeight: "bold", width:"20%"}}>Quantity</TableCell>
                                            <TableCell sx={{ fontWeight: "bold", textAlign:"right", width:"20%"}}>Price (LKR)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderedProduct.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell sx={{width:"20%"}}>{product.productName}</TableCell>
                                                <TableCell sx={{width:"20%"}}>{product.quantity}</TableCell>
                                                <TableCell sx={{textAlign:"right", width:"20%"}}>{product.price.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                            {/* Total Row */}
                                            <TableRow>
                                                <TableCell colSpan={2} sx={{ fontWeight: "bold", fontSize:"16px" }}>Total</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", textAlign:"right", fontSize:"16px" }}>LKR {getTotalPrice()}</TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography>No items selected for checkout.</Typography>
                        )}
                        <Button variant="contained" 
                            sx={{borderRadius:5, 
                            width:"100%", 
                            mt:3}} 
                            onClick={handleOrderModelOpen}
                        >
                            Place order
                        </Button>
                    </DialogContent>
                </Dialog>

                <Dialog open={orderModelOpen} onClose={handleOrderModelClose} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{fontWeight:"bold"}}>Place order</DialogTitle>
                    <IconButton sx={{position:"absolute", right:1, top:1}}>
                        <Close />
                    </IconButton>
                    <DialogContent sx={{}}>
                        <Box sx={{display:"flex", justifyContent:"space-between", borderTop:0.5, borderColor:"lightgray"}}>
                            <Box sx={{textAlign:"left", mt:2}}>
                                <Typography sx={{fontSize:"14px"}}>Sub Total</Typography>
                                <Typography sx={{fontSize:"14px"}}>Discount</Typography>
                                <Typography sx={{fontSize:"14px"}}>Delivery Cost</Typography>
                                <Typography sx={{fontWeight:"bold", fontSize:"20px", mt:2}}>Total</Typography>
                            </Box>
                            <Box sx={{textAlign:"right", mt:2}}>
                                <Typography sx={{fontSize:"14px"}}>LKR {getTotalPrice()}</Typography>
                                <Typography sx={{fontSize:"14px"}}>0%</Typography>
                                <Typography sx={{fontSize:"14px"}}>0</Typography>
                                <Typography sx={{fontWeight:"bold", fontSize:"20px", mt:2}}>LKR {getTotalPrice()}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{pt:3, display:"flex", justifyContent:"flex-end", gap:1}}>
                            <Button variant="outlined" onClick={handleOrderModelClose}>Cancel</Button>
                            <Button variant="contained" onClick={placeOrder}>Buy</Button>
                        </Box>
                    </DialogContent>
                </Dialog>

                <Box sx={{backgroundColor:"white", borderRadius:2, padding:3}}>
                    <Typography variant="h6" gutterBottom sx={{textAlign:"left", mb:2, fontWeight:"bold"}}>
                        Pay with
                    </Typography>
                    <Box sx={{display:"flex", alignItems:"left", gap:2, borderBottom:0.5, borderColor:"lightgray", py:2}}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" 
                            alt="Visa" 
                            style={{ height: 20 }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                            alt="Mastercard" 
                            style={{ height: 20 }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection:"column", mt: 2}}>
                        <Box sx={{display:"flex", alignItems:"left", mb:2}}>
                            <Box sx={{position:"relative", display:"inline-block", width:35, height:35}}>
                                <ShieldOutlined sx={{ color: "green", fontSize: 35 }} />
                                <CheckCircle sx={{fontSize:18, color:"white", position:"absolute", bottom:2, right:2, backgroundColor:"green", borderRadius:"50%"}}/> 
                            </Box>
                            <Typography variant="body2" sx={{ color: "gray" }}>
                                Buyer Protection Guarantee
                            </Typography>
                        </Box>
                        <Typography sx={{fontSize:"12px", textAlign:"left"}}>Get a full refund if the item is not delivered</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>

    </Box>
  );
}
