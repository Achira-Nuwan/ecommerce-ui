import { AddShoppingCartSharp, SearchOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext";
import ProductType from "../../types/ProductType";

const ProductDetails = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [allProducts, setAllproducts] = useState<ProductType[]>([]);
    const cartContext = useContext(CartContext);
    const { products, setProducts } = cartContext!;


    const fetchProducts = async () => {
        try {

            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);
            setAllproducts(response.data);
            console.log("Fetched Products:", response.data);
        } catch (error) {
            setError("Failed to load products");
            console.log("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[])

    /*const fetchCartItems = async () => {
        try {
            const userId = 1; // Replace with dynamic user ID
            const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
            const items = response.data.items;
            setCartItems(items); // Update cartItems state
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };*/


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
            console.log("cartData:", cartData);
            const response = await axios.post("http://localhost:8080/api/cart", cartData);
            // fetchCartItems();
            console.log("Post Request:", response.data);

            if (response.status === 200) {
                alert("Product added to cart!");
                // const cartResponse = await axios.get(`http://localhost:8080/cart/${userId}`);
                // setCartItems(cartResponse.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error adding to cart:", error.response.data);
                alert(`Failed to add product to cart: ${error.response.data.message}`);
            } else {
                console.error("Unknown error adding to cart", error);
                alert("An unexpected error occurred.");
            }
        }
    };

    const handleOpenModal = (product: ProductType) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    return (
        <Box>
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
                                            borderRadius: 0
                                        }}
                                    >
                                        <IconButton
                                            color="inherit"
                                            sx={{
                                                border: 1,
                                                borderColor: "lightgray",
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
                                            width: "100%",
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
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 3 }}>
                        <SearchOff sx={{ fontSize: 80, color: "gray" }} />
                        <Typography variant="h6" color="gray">Product not found</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
export default ProductDetails;