import { Box, Typography } from '@mui/material';
import UserType from '../../types/UserType';

const Profile = ({user}: {user: UserType | null}) => {
    return(
        <Box>
            <Box>
                <Typography variant='h5' sx={{textAlign:"left"}}>Personal Information</Typography>
            </Box>
            <Box sx={{width:"100%", mt:4}}>
                {/* -- */}
                <Box sx={{display:"flex", gap:4, mt:2}}>
                    <Box sx={{width:"50%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>First Name</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.firstName}</Typography>
                    </Box>
                    <Box sx={{width:"50%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>Last Name</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.lastName}</Typography>
                    </Box>
                </Box>

                {/* -- */}
                <Box sx={{display:"flex", gap:4, mt:2}}>
                    <Box sx={{width:"50%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>Email</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.email}</Typography>
                    </Box>
                    <Box sx={{width:"50%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>Phone Number</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.phoneNumber}</Typography>
                    </Box>
                </Box>

                {/* -- */}
                <Box sx={{mt:2}}>
                    <Box sx={{width:"100%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>Company Name</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.companyName}</Typography>
                    </Box>
                </Box>

                {/* -- */}
                <Box sx={{mt:2}}>
                    <Box sx={{width:"100%"}}>
                        <Typography variant='body1' sx={{textAlign:"left"}}>Special Note</Typography>
                        <Typography variant='body1' sx={{textAlign:"left", p:1, my:1, border:1, borderRadius:2, color:"gray"}}>{user?.note}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
} 
export default Profile;