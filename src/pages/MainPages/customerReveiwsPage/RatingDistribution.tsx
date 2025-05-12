import { Box, LinearProgress, Typography } from "@mui/material";

const RatingDistribution = () => {

    const ratingDistribution = [
        {
            stars: 5,
            percentage: 72,
        },
        {
            stars: 4,
            percentage: 18,
        },
        {
            stars: 3,
            percentage: 6,
        },
        {
            stars: 2,
            percentage: 3,
        },
        {
            stars: 1,
            percentage: 1,
        },
    ]


    return(
        <Box>
            {/* Rating distribution */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ textAlign: "left" }}>Rating Distribution</Typography>
                    {ratingDistribution.map((item, index) => (
                        <Box key={item.stars} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                            <Typography>{item.stars} stars</Typography>
                            <Box flexGrow={1} mx={1.5}>
                                <LinearProgress
                                    variant="determinate"
                                    value={item.percentage}
                                    sx={{
                                        height: 8,
                                        borderRadius: 9999,
                                        backgroundColor: "#E5E7EB",
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: "#FBBF24",
                                            borderRadius: 9999,
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{display:"flex", justifyContent:"right", alignItems:"center", width:"50px", height:"30px"}}>
                                <Typography sx={{}}>{item.percentage} %</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
        </Box>
    )
}
export default RatingDistribution;