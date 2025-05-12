import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { SlidersIcon } from "lucide-react";

const ReviewFilters = () => {
    return(
        <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", mb:2}}>
            {/* Filter buttons */}
            <Box sx={{display:"flex", justifyContent:"left", alignItems:"center", gap:1.5}}>
                <Button sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"black"}}>All Reviews</Button>
                <Button sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"black"}}>5 Stars</Button>
                <Button sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"black"}}>4 Stars</Button>
                <Button sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"black"}}>3 Stars</Button>
                <Button sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"black"}}>2 Stars</Button>
                <Button variant="contained" color="primary" sx={{borderRadius:5, border: "1px solid #e0e0e0", py:0.5, px:2, textTransform:"capitalize", color:"white"}}>1 Star</Button>
            </Box>

            {/* Filter drop down */}
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"20%"}}>
                <SlidersIcon style={{color:"gray"}} size={18}/>
                <FormControl size="small" sx={{width:"100%", ml:1, height:"36px", '& .MuiInputBase-root': { height: "36px", minHeight:"36px",}, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Select displayEmpty defaultValue="" labelId="filter-label" sx={{height:"36px", minHeight:"36px", width:"100%", textAlign:"left", '&. MuiSelect-displayEmpty': {}}} inputProps={{ 'aria-label': 'Filter by' }}>
                        <MenuItem disabled value="">
                            <em style={{fontSize:"12px"}}>Filter By</em>
                        </MenuItem>
                        <MenuItem value="newestFirst">Newest First</MenuItem>
                        <MenuItem value="oldestFirst">Oldest First</MenuItem>
                        <MenuItem value="highestValue">Highest Rated</MenuItem>
                        <MenuItem value="lowestRated">Lowest Rated</MenuItem>
                        <MenuItem value="mostHelpful">Most Helpful</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}
export default ReviewFilters;