import { Add, AddShoppingCartSharp, Close, MenuOutlined, Person2Outlined, Remove, Search, SearchOff, Security, ShoppingCart } from "@mui/icons-material";
import { Alert, AppBar, Badge, Box, Button, CircularProgress, Dialog, DialogContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Snackbar, styled, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/DHF_logo.png";
import { useAuth } from "../context/AuthContext";
import CategoryType from "../types/CategoryType";
import ProductType from "../types/ProductType";
import { CartItem } from "./CartPage";

const ProductList = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [allProducts, setAllproducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null); //  State to hold selected product
    const [open, setOpen] = useState<boolean>(false); //  State to open modal
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(false);

    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    const fetchProducts = async () => {
        try {

            if(!jwtToken){
                console.error("Jwt token is missing");
                return;
            }

            const response = await axios.get("http://localhost:8080/products", config);
            setProducts(response.data);
            setAllproducts(response.data);
            console.log("Fetched Products:",response.data);
        } catch (error) {
            setError("Failed to load products");
            console.log("Error fetching products:",error);
            console.log("Header:",config);
        } finally {
            setLoading(false);
        }
    };

    const fetchCartItems = async () => {
        try {
            const userId = 1; // Replace with dynamic user ID
            const response = await axios.get(`http://localhost:8080/cart/${userId}`, { headers: { Authorization: `Bearer ${jwtToken}`}});
            const items = response.data.items;
            setCartItems(items); // Update cartItems state
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };

    const fetchCategories = async () => {
        try{
            const response = await axios.get("http://localhost:8080/categories", { headers: { Authorization: `Bearer ${jwtToken}`}});
            setCategories(response.data);
            console.log("Categories:",response.data);
        }catch (error){
            console.error("Error fetching categories", error);
        }
    };

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
        if (isAuthenticated) {
            fetchProducts();
            fetchCartItems();
            fetchCategories();   
        }
    }, [isAuthenticated, jwtToken]);

    // Open Modal and Set Product
    const handleOpenModal = (product: ProductType) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setOpen(false);
        setSelectedProduct(null);
    };
    
    const addToCart = async (productId: number, quantity: number) => {
        try {
            const userId = 1; // Replace with the actual logged-in user's ID (from authentication)
            const cartData = {
                userId,
                cartItems: [
                    {
                        productId,
                        quantity,
                    },
                ],
            };
            console.log("product_id:",);
            const response = await axios.post("http://localhost:8080/cart/add", cartData, { headers: { Authorization: `Bearer ${jwtToken}`}});
            console.log("Post Request:", response.data);
            
            if (response.status === 200) {
                alert("Product added to cart!");
                // const cartResponse = await axios.get(`http://localhost:8080/cart/${userId}`);
                // setCartItems(cartResponse.data);
            }
        }  catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error adding to cart:", error.response.data);
                alert(`Failed to add product to cart: ${error.response.data.message}`);
            } else {
                console.error("Unknown error adding to cart", error);
                alert("An unexpected error occurred.");
            }
        }
    };

    {/* Search bar handle */}
    const handleSearch = (productName:string) => {
        try{
            if (productName) {
                const filteredProducts = products.filter((product) => 
                    product.productName.toLowerCase().includes(productName.toLowerCase()));
                setProducts(filteredProducts);   
            }

            if (!productName || null) {
                fetchProducts();
            }
            
        }catch (error){
            console.log("Search product not found",error);
            fetchProducts();
        }       
    };

    const handleCloseErrorAlert = () =>{
        setErrorAlertOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    
    const handleProfileButtonEnter = () => {
        setIsProfileHovered(true);
    };

    const handleProfileButtonLeave = () => {
        setIsProfileHovered(false);
    };

    const SearchDropDown = styled('ul')(({theme}) => ({
        position: 'absolute',
        top:"100%",
        left:0,
        width:"100%",
        backgroundColor:"#fff",
        borderRadius:5,
        boxShadow: theme.shadows[3],
        padding:0,
        margin:0,
        listStyle:'none',
        zIndex:10,
    }));

    const filterProducts = (catId:number) => {
        if(catId === -1){
            setProducts(allProducts); // Reset all products when "All categories" is selected
        }else{
            const filteredProducts = allProducts.filter((product) => product.category.catId === catId);
            setProducts(filteredProducts);
        }
    };

    const ProfileDropDown = styled('ul')(({theme}) => ({
        position: 'absolute',
        top:"100%",
        left:0,
        width:"200px",
        backgroundColor:"#fff",
        borderRadius:8,
        boxShadow: theme.shadows[3],
        padding:0,
        margin:0,
        listStyle:'none',
        zIndex:10
    }));
    
    return (
        <Box>
            {/* Error snack bar */}
            <Snackbar open={errorAlertOpen} autoHideDuration={3000} onClose={handleCloseErrorAlert}>
                <Alert onClose={handleCloseErrorAlert} severity="error" sx={{width:"100%"}}>
                    Not found
                </Alert>
            </Snackbar>

            {/* Navbar */}
            <AppBar sx={{backgroundColor:"white", boxShadow:"none", display:"flex", justifyItems:"space-between"}}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
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
                    <Box>
                        <TextField 
                            placeholder="Search.."
                            size="small"
                            sx={{
                                backgroundColor:"white", 
                                border:1,
                                borderRadius:3, 
                                width:600, 
                                marginRight:10,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius:3
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Box>
                    <Box sx={{display:"flex", gap:5}}>
                        <Box 
                            onMouseEnter={handleProfileButtonEnter}
                            onMouseLeave={handleProfileButtonLeave}
                            sx={{position:"relative"}}
                        >
                            <Button 
                                sx={{
                                    color:"black", 
                                    display:"flex", 
                                    alignItems:"bottom", 
                                    justifyContent:"bottom", 
                                    textTransform:"capitalize", 
                                    fontWeight:"bold"
                                }}>
                                <Person2Outlined sx={{fontSize:"30px"}}/>
                                sign in / sign up
                            </Button>
                        

                            {/* Profile Drop Down */}
                            {isProfileHovered &&(
                                <ProfileDropDown sx={{transition: "opacity 1s ease, transform 1s ease"}}>
                                    <Typography sx={{color:"black", textAlign:"left",px:2, pt:2}}>My Account</Typography>
                                    <Typography sx={{color:"black", textAlign:"left",px:2, mt:1}}>Orders</Typography>
                                    <Typography sx={{color:"black", textAlign:"left",px:2, mt:1}}>Payments</Typography>
                                    <Typography sx={{color:"black", textAlign:"left",px:2, mt:1}}>Help Center</Typography>
                                    <Typography sx={{borderBottom:1, borderColor:"lightgray", m:2}}></Typography>
                                    <Typography sx={{color:"gray", textAlign:"left",px:2}}>Settings</Typography>
                                    <Box sx={{p:2}}>
                                        <Button sx={{
                                            color:"white", 
                                            backgroundColor:"black", 
                                            borderRadius:6,
                                            width:"100%",
                                            textTransform:"capitalize"
                                        }}>
                                                Sign in
                                        </Button>
                                        <Typography sx={{color:"gray", fontSize:"14px"}}>Register</Typography>
                                    </Box>
                                </ProfileDropDown>
                            )}
                        </Box>

                        <IconButton sx={{color:"black"}} onClick={() => navigate("/cart")}>
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>                                                                                                                                                                         

            <Box sx={{display:"flex", gap:5, px:10, alignItems:"center", justifyContent:"center", mt:5}}>
                {/* Category box */}
                <Box 
                    sx={{width:"300px",  
                    display:"flex", 
                    alignItems:"left"
                    }}
                    position="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <FormControl sx={{width:300, borderRadius:3, padding:"none", backgroundColor:"#fff", overflow:"hidden", border:1}}>
                        <InputLabel sx={{display:"flex", alignItems:"center",gap:1, borderRadius:3}}>
                            <MenuOutlined/>
                            All Categories
                        </InputLabel>
                        <Select disabled>
                            <MenuItem>All Category</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Search drop down */}
                    {isHovered && (
                        categories.length > 0 ? (
                            <SearchDropDown>
                                <>
                                    <MenuItem onClick={() => filterProducts(-1)}>
                                        <Typography sx={{fontWeight:"bold"}}>All categories</Typography>
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem onClick={() => filterProducts(category.catId)} key={category.catId}>{category.catName}</MenuItem>
                                    ))}
                                </>
                            </SearchDropDown>
                        ) : (
                            <Typography>No categories</Typography>
                        )
                    )}
                </Box>
                <Box sx={{
                        display:"flex", 
                        justifyContent:"space-between", 
                        width:"100%", 
                        justifyItems:"center"
                    }}>
                        <Button sx={{
                            textTransform:"capitalize",
                            borderRadius:5,
                            px:2,
                            color:"#3E5879",
                            fontSize:"16px" ,
                            "&:hover":{backgroundColor:"#F0F0D7"}
                        }}>
                            Furnitures
                        </Button>
                        <Button sx={{
                            textTransform:"capitalize",
                            borderRadius:5,
                            px:2,
                            color:"red",
                            fontSize:"16px",
                            "&:hover":{backgroundColor:"#F0F0D7"}
                        }}>
                            Super Deals
                        </Button>
                        <Button sx={{
                            textTransform:"capitalize",
                            borderRadius:5,
                            px:2,
                            color:"#3E5879",
                            fontSize:"16px",
                            "&:hover":{backgroundColor:"#F0F0D7"}}}>
                            Big Save
                        </Button>
                        <Button sx={{
                            textTransform:"capitalize",
                            borderRadius:5,
                            px:2,
                            color:"#3E5879",
                            fontSize:"16px",
                            "&:hover":{backgroundColor:"#F0F0D7"}}}>
                            Security & Protection
                        </Button>
                        <Button sx={{
                            textTransform:"capitalize",
                            borderRadius:5,
                            px:2,
                            color:"#3E5879",
                            fontSize:"16px",
                            "&:hover":{backgroundColor:"#F0F0D7"}
                        }}>
                            About
                        </Button>     
                </Box>
            </Box>

            <Box sx={{ mt:2 }}>
                {/* Cover Image */}
                <Box
                    sx={{
                        height: "400px",
                        backgroundImage: "url('src/assets/Cover DHF.jpg')",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        boxShadow:3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                        marginBottom: 2,
                        marginTop: 2,
                    }}
                />

                {/* Product Grid */}
                <Box sx={{ pt: 4, px: 6 }}>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : products.length > 0 ? (
                        <Grid container spacing={1}>
                            {products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.productId}>
                                    <Paper
                                        sx={{
                                            textAlign: "center",
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            padding: 1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            boxShadow: "none",
                                            transition: "all 0.3s ease-in-out",
                                            "&:hover": { boxShadow: 3 },
                                            "&:hover .preview-button": { opacity: 1 },
                                        }}
                                    >
                                        {/* Product Image */}
                                        <Box
                                            sx={{
                                                height: 200,
                                                width: 200,
                                                backgroundImage: `url(${product.imageUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                position: "relative",
                                                borderRadius:0
                                            }}
                                        >
                                            <IconButton
                                                color="inherit"
                                                sx={{
                                                    border: 1,
                                                    borderColor:"lightgray",
                                                    position: "absolute",
                                                    bottom: 8,
                                                    right: 8,
                                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                    '&:hover': { backgroundColor: "rgba(255, 255, 255, 1)" }
                                                }}
                                                onClick={() => addToCart(product.productId, 1)}
                                            >
                                                <AddShoppingCartSharp />
                                            </IconButton>
                                        </Box>

                                        {/* Product Details */}
                                        <Box sx={{ mt: 1, width: "90%", textAlign: "left" }}>
                                            <Typography sx={{ marginTop: 1, wordWrap: "break-word" }}>
                                                {product.productName}
                                            </Typography>
                                            <Typography sx={{ fontWeight: "bold", color: "green" }}>
                                                LKR {product.price}
                                            </Typography>
                                            <Typography sx={{ fontSize: "14px", color: "gray", marginBottom: 1 }}>
                                                {product.description}
                                            </Typography>
                                        </Box>

                                        {/* Preview Button */}
                                        <Button
                                            variant="contained"
                                            className="preview-button"
                                            sx={{
                                                mt: 2,
                                                textTransform: "capitalize",
                                                backgroundColor: "black",
                                                opacity: 0,
                                                transition: "opacity 0.3s ease-in-out",
                                                "&:hover": { backgroundColor: "black" },
                                                width:"100%",
                                            }}
                                            onClick={() => handleOpenModal(product)} // 🔹 Open modal with product details
                                        >
                                            Preview
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center", mt:3}}>
                            <SearchOff sx={{fontSize:80, color:"gray"}}/>
                            <Typography variant="h6" color="gray">Product not found</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Product Details Modal */}
            <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <IconButton 
                    onClick={handleCloseModal} 
                    sx={{ 
                        position: "absolute", 
                        right: "0px", // Adjust for proper alignment
                        top: "0px", 
                        color:"white",
                        backgroundColor: "black", // Optional: make it stand out
                        boxShadow: 2, // Optional: subtle shadow for better visibility
                        zIndex:999,
                        "&:hover": { backgroundColor: "gray" } // Optional: hover effect
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent sx={{display:"flex", justifyContent:"space-between", p:3}}>
                    <Box sx={{mr:1, width:"50%"}}>
                        {selectedProduct && (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                                <Box 
                                    component="img" 
                                    src={selectedProduct.imageUrl} 
                                    alt={selectedProduct.productName} 
                                    sx={{ 
                                        width: "100%", 
                                        maxWidth: "400px", 
                                        borderRadius: "8px", 
                                        boxShadow: 2
                                    }} 
                                />

                                <Box sx={{mt:3}}>
                                    <Typography color="green" variant="h6">{selectedProduct.productName}</Typography>
                                    <Typography sx={{ mt:1 }}>
                                        {selectedProduct.description}
                                    </Typography>
                                    <Typography variant="h3" sx={{ mt: 1, fontWeight:"bold"}}>
                                        LKR {selectedProduct.price}
                                    </Typography>
                                    <Typography sx={{fontSize:"14px", color:"gray"}}>Tax excluded, add at checkout if applicable</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{borderLeft:1, borderColor:"lightgray", pl:1, display:"flex", flexDirection:"column", width:"50%"}}>
                        <Box sx={{flexGrow:1, width:"100%", pr:3}}>
                            <Box sx={{mb:2}}>
                                <Typography sx={{backgroundColor:"red", width:"100%", color:"white", p:1}}>Welcome to DHF</Typography>
                            </Box>
                            <Box sx={{display:"flex", alignItems:"center", gap:1}}>
                                <Security />
                                <Typography sx={{fontSize:"15px"}}>Security & Privacy</Typography>
                            </Box>
                            <Typography sx={{mt:2, fontSize:"15px"}}>Your personal and payment details are securely processed. We ensure encrypted transactions and data protection.</Typography>
                        </Box>
                        <Box sx={{borderTop:1, borderColor:"lightgray", pt:3, width:"100%"}}>
                            <Box>
                                <Typography sx={{fontSize:"15px"}}>Quantity</Typography>
                                <Box sx={{display:"flex", alignItems:"center", gap:2}}>
                                    <IconButton>
                                        <Remove/>
                                    </IconButton>
                                    <Typography sx={{fontWeight:"bold"}}>1</Typography>
                                    <IconButton>
                                        <Add />
                                    </IconButton>
                                </Box>
                                <Typography sx={{fontSize:"14px", color:"gray"}}>Max. 1 pcs/shoper</Typography>
                            </Box>
                            <Box sx={{mt:2}}>
                                <Button 
                                    variant="contained" 
                                    sx={{ backgroundColor: "red", color: "white", fontWeight: 600, width: "100%" }} 
                                    onClick={() => selectedProduct && addToCart(selectedProduct.productId, 1)} // ✅ Call function
                                >
                                    Add to Cart
                                </Button>

                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions> */}
            </Dialog>
        </Box>
    );
};

export default ProductList;
