//import PaymentSecurity from '../assets'
import { ArrowForward, ShieldOutlined } from "@mui/icons-material";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { CheckCircleIcon, CreditCardIcon, DatabaseIcon, DotIcon, EyeIcon, FileTextIcon, LockIcon, ServerIcon, ShieldCheckIcon, ShieldIcon, UserIcon } from 'lucide-react';
import Master from "../../assets/mastercard.webp";
import PaymentSecurity from "../../assets/PaymentSecurity.jpg";
import Paypal from '../../assets/PayPal.png';
import Visa from '../../assets/visa.png';

const SecurityProtection = () => {
    return(
        <Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Box sx={{display: 'flex', gap:"40px", width:"1200px", height:"600px"}}>
                    <Box sx={{flex:1, pr:"20px",textAlign:"left", display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"center"}}>
                        <Typography variant="h2" sx={{fontWeight:'bold'}}>Your Security Is Our Priority</Typography>
                        <Typography variant="body1" sx={{fontSize:"18px", mt:"20px"}}>
                            We implement industry-leading security measures to protect your
                            data and transactions at every step.
                        </Typography>
                        <Button sx={{paddingY:"10px", width:"400px", border:"2px solid black", borderRadius:"10px", mt:"30px", display:"flex", gap:"6px"}}>
                            <ShieldOutlined/>
                            Learn More About Our Security
                        </Button>
                    </Box>
                    <Box sx={{padding: '5px', flex:1, borderRadius:"10px", display:"flex", overflow:"hidden", justifyContent:"center", alignItems:"center"}}>
                        <Box 
                            sx={{
                                backgroundImage:`url(${PaymentSecurity})`,     
                                borderRadius:"10px",
                                backgroundPosition:"center",
                                backgroundSize:"contain",
                                backgroundRepeat:"no-repeat",
                                width:"100%",
                                height:"100%",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            

            {/* Security features */}
            <Box sx={{backgroundColor:"#EEF5FF", height:"100vh"}}>
                <Box sx={{padding:"30px"}}>
                    <Typography variant="h3" sx={{fontWeight:"bold"}}>Our Security Features</Typography>
                    <Typography variant="body1" sx={{mt:"10px"}}>We employ multiple layers of security to protect your personal information and ensure safe transactions.</Typography>
                </Box>
                <Box sx={{width:"90%", display:"flex", flexDirection:"column", alignItems:"center", margin:"30px auto"}}>
                    <Box sx={{display:"flex", gap:4, justifyContent:"center"}}>
                        {/*Box 1*/}
                        <Box sx={{backgroundColor:"white", p:3, borderRadius:3, boxShadow:3, flex:1, display:"flex", flexDirection:"column", gap:3 ,alignItems:"left", textAlign:"left"}}>
                            <Box sx={{color:"#3674B5", borderRadius:"50%", p:2, width:50, height:50,backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <LockIcon size={40}/>
                            </Box>
                            <Typography variant="h5" sx={{fontWeight:"400"}}>Advance Encryption</Typography>
                            <Typography sx={{color:"gray"}}>All sensitive data is encrypted using industry-standard AES-256 encryption to ensure maximum security.</Typography>
                        </Box>

                        {/*Box 2*/}
                        <Box sx={{backgroundColor:"white", p:3, borderRadius:3, boxShadow:3, flex:1, display:"flex", flexDirection:"column", gap:3 ,alignItems:"left", textAlign:"left"}}>
                            <Box sx={{color:"#3674B5", borderRadius:"50%", p:2, width:50, height:50,backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <EyeIcon size={40}/>
                            </Box>
                            <Typography variant="h5" sx={{fontWeight:"400"}}>24/7 Monitoring</Typography>
                            <Typography sx={{color:"gray"}}>Our security team monitors our systems around the clock to detect and prevent suspicious activities.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex", gap:4, justifyContent:"center", my:4}}>
                        {/*Box 3*/}
                        <Box sx={{backgroundColor:"white", p:3, borderRadius:3, boxShadow:3, flex:1, display:"flex", flexDirection:"column", gap:3 ,alignItems:"left", textAlign:"left"}}>
                            <Box sx={{color:"#3674B5", borderRadius:"50%", p:2, width:50, height:50,backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <ServerIcon size={40}/>
                            </Box>
                            <Typography variant="h5" sx={{fontWeight:"400"}}>Secure Infrastructure</Typography>
                            <Typography sx={{color:"gray"}}>Our servers are housed in secure data centers with physical and virtual protection measures.</Typography>
                        </Box>

                        {/*Box 4*/}
                        <Box sx={{backgroundColor:"white", p:3, borderRadius:3, boxShadow:3, flex:1, display:"flex", flexDirection:"column", gap:3 ,alignItems:"left", textAlign:"left"}}>
                            <Box sx={{color:"#3674B5", borderRadius:"50%", p:2, width:50, height:50,backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}> 
                                <ShieldIcon size={40}/>
                            </Box>
                            <Typography variant="h5" sx={{fontWeight:"400"}}>Fraud Protection</Typography>
                            <Typography sx={{color:"gray"}}>Advanced fraud detection systems protect both buyers and sellers from fraudulent transactions.</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Data protection */}
                <Box sx={{ width:"90%", margin:"30px auto", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", boxShadow:3, borderRadius:3}}>
                    {/* Box1 */}
                    <Box sx={{background:"linear-gradient(to left, #0A5EB0, #40A2E3)", height:"400px", borderTopLeftRadius:"12px", borderTopRightRadius:"12px", display:"flex", gap:4, flexDirection:"column", padding:5}}>
                        <Typography variant="h4" sx={{fontWeight:"600", color:"white", textAlign:"left"}}>How We Protect Your Data</Typography>
                        <Typography variant="body1" sx={{color:"white", fontSize:"18px", textAlign:"left"}}>We understand that your personal information is valuable and sensitive. Our comprehensive data protection strategy ensures your data remains private and secure.</Typography>
                        <Box sx={{mt:4}}>
                            <Typography variant="body1" sx={{color:"white", textAlign:"left", display:"flex", gap:2}}>
                                <ShieldCheckIcon/>
                                We never sell your personal information to third parties
                            </Typography>
                            <Typography variant="body1" sx={{color:"white", textAlign:"left", mt:3, display:"flex", gap:2}}>
                                <FileTextIcon/>
                                Clear privacy policy that's easy to understand
                            </Typography>
                            <Typography variant="body1" sx={{color:"white", textAlign:"left", mt:3, display:"flex", gap:2}}>
                                <UserIcon/>
                                Control over your data with account settings
                            </Typography>
                            <Typography variant="body1" sx={{color:"white", textAlign:"left", mt:3, display:"flex", gap:2}}>
                                <DatabaseIcon/>
                                Secure data storage with limited employee access
                            </Typography>
                        </Box>
                    </Box>
                    {/* Box2 */}
                    <Box sx={{backgroundColor:"white", width:"100%",height:"500px", borderBottomLeftRadius:"12px", borderBottomRightRadius:"12px"}}>
                        <Box sx={{padding:5}}>
                            <Typography variant="h4" sx={{textAlign:"left"}}>Privacy Compliance</Typography>
                            <Typography variant="body1" sx={{ textAlign:"left", mt:2, fontSize:"18px"}}>Our platform is fully compliant with global data protection regulations and other regional privacy laws.</Typography>
                            <Box sx={{mt:3, fontSize:"18px", textAlign:"left"}}>
                                <Typography variant="body1" sx={{fontWeight:"600", fontSize:"18px", mt:2}}>Your Rights Include:</Typography>
                                <List>
                                    <ListItem> <DotIcon/> Right to access your personal data</ListItem>
                                    <ListItem> <DotIcon/> Right to request data deletion</ListItem>
                                    <ListItem> <DotIcon/> Right to data portability</ListItem>
                                    <ListItem> <DotIcon/> Right to object to data processing</ListItem>
                                    <ListItem> <DotIcon/> Right to correct inaccurate information</ListItem>
                                </List>
                                <Button sx={{mt:2, textTransform:"capitalize"}}>Read our full privacy policy <ArrowForward/></Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Payment section */}
                <Box sx={{width:"90%", margin:"30px auto"}}>
                    {/* Payment section header */}
                    <Box sx={{width:"100%", padding:5}}>
                        <Typography variant="h4" sx={{textAlign:"left"}}>Secure Payment Processing</Typography>
                        <Typography variant="body1" sx={{textAlign:"left", mt:2, fontSize:"18px"}}>Your payment information is always protected with industry-leading encryption and security protocols.</Typography>
                    </Box>

                    {/* Payment section content */}
                    <Box sx={{display:"flex", gap:4, justifyContent:"center", alignItems:"left"}}>
                        {/* section 1 */}
                        <Box sx={{display:"flex", gap:4, flexDirection:"column"}}>
                            {/* Card 1 */}
                            <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:3, backgroundColor:"white"}}>
                                <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"left"}}>
                                    <Box sx={{padding:2, borderRadius:"50%", color:"#3674B5", backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <LockIcon size={40}/>
                                    </Box>
                                </Box>
                                <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                                    <Typography variant="h6" sx={{textAlign:"left"}}>PCI DSS Compliant</Typography>
                                    <Typography variant="body1" sx={{color:"gray", textAlign:"left"}}>We adhere to all Payment Card Industry Data Security Standards to ensure the safe handling of your credit card information.</Typography>
                                </Box>
                            </Box>

                            {/* Card 2 */}
                            <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:3, backgroundColor:"white"}}>
                                <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"left"}}>
                                    <Box sx={{padding:2, borderRadius:"50%", color:"#3674B5", backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <CreditCardIcon size={40}/>
                                    </Box>
                                </Box>
                                <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                                    <Typography variant="h6" sx={{textAlign:"left"}}>Tokenization</Typography>
                                    <Typography variant="body1" sx={{color:"gray",textAlign:"left"}}>We use tokenization to ensure your actual credit card number is never stored on our servers, replacing it with a unique identifier.</Typography>
                                </Box>
                            </Box>

                            {/* Card 3 */}
                            <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:3, backgroundColor:"white"}}>
                                <Box sx={{display:"flex", gap:4, justifyContent:"left", alignItems:"left"}}>
                                    <Box sx={{padding:2, borderRadius:"50%", color:"#3674B5", backgroundColor:"#EEF5FF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <ShieldCheckIcon size={40}/>
                                    </Box>
                                </Box>
                                <Box sx={{display:"flex", flexDirection:"column", gap:2}}>
                                    <Typography variant="h6" sx={{textAlign:"left"}}>3D Secure Authentication</Typography>
                                    <Typography variant="body1" sx={{color:"gray", textAlign:"left"}}>Additional security layer for online credit and debit card transactions, adding an authentication step to prevent fraud.</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* section 2 */}
                        <Box sx={{display:"flex", alignItems:"left", height:"100%"}}>
                            <Box sx={{display:"flex", alignItems:"left",flexDirection:"column", height:"100%", gap:4, borderRadius:"10px", boxShadow:3, padding:3}}>
                                <Box sx={{ alignItems:"center"}}>
                                    <Typography variant="h6">Trusted Payment Method</Typography>
                                    <Typography variant="body1" sx={{color:"gray"}}>We support multiple payment methods</Typography>
                                </Box>
                                <Box sx={{display:"flex", gap:4, justifyContent:"space-between", alignItems:"center"}}>
                                    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:1, backgroundColor:"white"}}>
                                        <Box sx={{backgroundImage:`url(${Paypal})`, backgroundPosition:"contain", width:"100px", height:"70px"}}/>
                                    </Box>
                                    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:1, backgroundColor:"white"}}>
                                        <Box sx={{backgroundImage:`url(${Visa})`, width:"100px", height:"70px"}}/>
                                    </Box>
                                    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px", boxShadow:3, padding:1, backgroundColor:"white"}}>
                                        <Box sx={{backgroundImage:`url(${Master})`, width:"100px", height:"70px"}}/>
                                    </Box>                       
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Commitment Section */}
                <Box sx={{mt:5, width:"100%"}}>
                    <Box sx={{width:"90%", margin:"30px auto", my:5}}>
                        <Box sx={{backgroundColor:"white", borderRadius:"10px", boxShadow:3, padding:5, display:"flex", gap:4, flexDirection:"column"}}>
                            <Typography variant="h4">Our Security Commitment</Typography>
                            
                            {/* Contents */}
                            <Box>
                                {/* Box1 */}
                                <Box sx={{display:"flex", gap:2, justifyContent:"center", alignItems:"center"}}>
                                    {/* content 1 */}
                                    <Box sx={{display:"flex", gap:3, justifyContent:"left", alignItems:"left", padding:2}}>
                                        <Box sx={{color:"green"}}>
                                            <CheckCircleIcon/>
                                        </Box>
                                        <Box>
                                            <Typography sx={{textAlign:"left"}}>Regular Security Audits</Typography>
                                            <Typography sx={{textAlign:"left"}}>Our systems undergo regular penetration testing and security audits.</Typography>
                                        </Box>
                                    </Box>
                                    {/* content  */}
                                    <Box sx={{display:"flex", gap:3, justifyContent:"left", alignItems:"left", padding:2}}>
                                        <Box sx={{color:"green"}}>
                                            <CheckCircleIcon/>
                                        </Box>
                                    <Box>
                                        <Typography sx={{textAlign:"left"}}>Regular Security Audits</Typography>
                                        <Typography sx={{textAlign:"left"}}>Our systems undergo regular penetration testing and security audits.</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {/* Box2 */}
                            <Box sx={{display:"flex", gap:2, justifyContent:"center", alignItems:"center"}}>
                                {/* content 3 */}
                                <Box sx={{display:"flex", gap:3, justifyContent:"left", alignItems:"left", padding:2}}>
                                    <Box sx={{color:"green"}}>
                                        <CheckCircleIcon/>
                                    </Box>
                                    <Box>
                                        <Typography sx={{textAlign:"left"}}>Regular Security Audits</Typography>
                                        <Typography sx={{textAlign:"left"}}>Our systems undergo regular penetration testing and security audits.</Typography>
                                    </Box>
                                </Box>
                                {/* content 4 */}
                                <Box sx={{display:"flex", gap:3, justifyContent:"left", alignItems:"left", padding:2}}>
                                    <Box sx={{color:"green"}}>
                                        <CheckCircleIcon/>
                                    </Box>
                                    <Box>
                                        <Typography sx={{textAlign:"left"}}>Regular Security Audits</Typography>
                                        <Typography sx={{textAlign:"left"}}>Our systems undergo regular penetration testing and security audits.</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default SecurityProtection;