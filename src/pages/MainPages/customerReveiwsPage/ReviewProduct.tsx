import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import DHF_logo from "../../../assets/DHF_logo.png";
import SelectedProductContext from "../../../context/SelectedProductContext";
import ReviewStars from "./ReviewStars";

interface ProductDetailsProps {
    rating: number;
    totalReviews: number;
}

export function ReviewProduct({ rating, totalReviews }: ProductDetailsProps) {

    const selectedProductContext = useContext(SelectedProductContext);
    const { selectedProduct } = selectedProductContext!;
    console.log("Selected Product:", selectedProduct);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", gap: 2, mb: 2 }}>

            {/* product Details */}
            <Box>
                <Typography variant="h6" sx={{ textAlign: "left" }}>Product Details</Typography>
            </Box>

            {/* Product Display */}
            <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center", gap: 2 }}>
                {/* Image Container */}
                <Box
                    sx={{
                        width: "100%",
                        height: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        overflow: "hidden",
                        backgroundColor: "#fafafa"
                    }}
                >
                    <img
                        src={DHF_logo}
                        alt="Product"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                    />
                </Box>
                {/* Product Info */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width:"100%"}}>
                    <Typography variant="h6" fontWeight={500} sx={{ textAlign: "left", width: "100%" }}>
                        {selectedProduct?.productName || "Unnamed Product"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", width: "100%" }}>
                        {selectedProduct?.description || "No description available"}
                    </Typography>
                </Box>
            </Box>


            {/* Overall rating */}
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "left", mb: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{}}>
                        <ReviewStars rating={rating} size={18} />
                    </Box>
                    <Typography variant="body2">Based on {totalReviews} reviews</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default ReviewProduct;