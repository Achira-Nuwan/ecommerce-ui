import { Box, Typography } from "@mui/material";
import { StarIcon } from "lucide-react";
import { useState } from "react";

interface ReviewStarsProps {
    rating: number;
    size?: number;
    interactive?: boolean;
    onRatingChange?: (newRating: number) => void;
}

function ReviewStars({
    rating,
    size = 20,
    interactive = false,
    onRatingChange
}: ReviewStarsProps) {
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const renderStars = (index: number) => {
        const starValue = index + 1;
        const filled = interactive
            ? (hoveredRating || rating) >= starValue
            : rating >= starValue;
        const halfFilled = !filled && rating > index && rating < starValue;
        return (
            <Typography key={index} sx={{ cursor: interactive ? "pointer" : "default" }}
                onMouseEnter={() => interactive && setHoveredRating(starValue)}
                onMouseLeave={() => interactive && setHoveredRating(0)}
                onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
            >
                <StarIcon
                    size={size}
                    fill={filled ? "#FBBF24" : halfFilled ? "url(#halfStar)" : "none"}
                    stroke={filled || halfFilled ? "#FBBF24" : "#9CA3AF"}
                    strokeWidth={1.5}
                    className={`${halfFilled ? 'half-star' : ''}`} />
            </Typography>
        )
    }
    return(
       <Box sx={{display:"flex"}}>
            {[...Array(5)].map((_, index) => renderStars(index))}
       </Box>
    )
}
export default ReviewStars;