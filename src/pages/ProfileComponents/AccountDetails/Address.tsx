import { Box, Typography } from "@mui/material";
import UserType from "../../types/UserType";

const Address = ({user} : {user: UserType | null}) => {
    return (
        <Box>
            <Box>
                <Typography variant='h5' sx={{ textAlign: "left" }}>Address Information</Typography>
            </Box>
            <Box sx={{ width: "100%", mt: 4 }}>
                {/* -- */}
                <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>Address 1</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.address1}</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>Address 2</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.address2}</Typography>
                    </Box>
                </Box>

                {/* -- */}
                <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>City</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.city}</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>Country</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.country}</Typography>
                    </Box>
                </Box>

                {/* -- */}
                <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>State</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.state}</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography variant='body1' sx={{ textAlign: "left" }}>Zip</Typography>
                        <Typography variant='body1' sx={{ textAlign: "left", p: 1, my: 1, border: 1, borderRadius: 2, color: "gray" }}>{user?.zip}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Address;