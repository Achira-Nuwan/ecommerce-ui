import { Box, Button, Typography } from "@mui/material";
import { PenLineIcon } from "lucide-react";
import ReviewStars from "./ReviewStars";

interface ReviewHeaderProps {
    rating: number;
    totalReviews: number;
    onWriteReview: () => void;
}

export function ReviewHeader({ rating, totalReviews, onWriteReview }: ReviewHeaderProps) {

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            {/* Header name */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, justifyContent: "left", alignItems: "center", width: "100%" }}>
                <Typography variant="h5" sx={{ textAlign: "left", width: "100%", fontWeight:500 }}>Customer Reviews</Typography>
                <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", width: "100%" }}>
                    <ReviewStars rating={4.7} />
                </Box>
            </Box>

            {/* Write review button */}
            <Box sx={{display: "flex", justifyContent: "right", alignItems: "center", width: "100%" }}>
                <Button sx={{ display: "flex", gap: 2 }} variant="contained" color="primary" onClick={onWriteReview} >
                    <PenLineIcon size={18} />
                    Write a Review
                </Button>
            </Box>
        </Box>
    );
}