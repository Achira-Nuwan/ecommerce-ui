import { Box } from "@mui/material";
import { useState } from "react";
import RatingDistribution from "./customerReveiwsPage/RatingDistribution";
import { ReviewHeader } from "./customerReveiwsPage/ReviewHeader";
import ReviewProduct from "./customerReveiwsPage/ReviewProduct";

const CustomerReviews = () => {

    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <Box sx={{}}>
            <Box sx={{ borderRadius: 3, backgroundColor: "#F7FBFF", padding: 2 }}>
                {/* Head page */}
                <Box sx={{mb:2, borderBottom: "1px solid #E0E0E0", paddingBottom: 2 }}>
                    {/* Review header */}
                    <Box sx={{ mb: 4 }}>
                        <ReviewHeader rating={4.7} totalReviews={128} onWriteReview={() => setShowReviewForm(true)} />
                    </Box>

                    {/* Product details & rating distribution*/}
                    <Box sx={{ display: "flex", width: "100%", gap: 2 }}>

                        {/* Rating distribution */}
                        <Box sx={{ width: "50%" }}>
                            <RatingDistribution />
                        </Box>

                        {/* Product details */}
                        <Box sx={{ width: "50%" }}>
                            <ReviewProduct rating={4.7} totalReviews={128} />
                        </Box>
                    </Box>
                </Box>

                {/* Filters */}
                <Box>
                    
                </Box>
            </Box>
        </Box>
    )
}
export default CustomerReviews;