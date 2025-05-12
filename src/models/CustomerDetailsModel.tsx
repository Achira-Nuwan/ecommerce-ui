{/*import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerType from "../types/CustomerType";

interface CustomerDetailsModelProps {
    open: boolean;
    onClose: () => void;
}

export const CustomerDetailsModel = ({ open, onClose }: CustomerDetailsModelProps) => {

    const [customer, setCustomer] = useState<CustomerType>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        notes: ""
    });

    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
        console.log("Customer",customer);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Input",customer);

        try {
            const response = await axios.post("http://localhost:8080/user/create", customer);
            console.log("result", response.data);
            alert("Customer created successfully");
            //navigate('/cart');
            onClose();

        } catch (error) {
            console.log("Error occurred while creating customer", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Customer Registration</Typography>
                <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Box>
                        <Box>
                            <Box>
                                <img src="" alt="" />
                                <Typography variant="h5" sx={{ textAlign: "left", fontWeight: "bold", px: 3 }}>Customer Registration</Typography>
                            </Box>

                            {/* Customer Information }
                            <Box sx={{ backgroundColor: "#F1EFEC", py: 4, px: 8, mt: 3 }}>
                                <Paper sx={{ borderRadius: 3, padding: 3 }}>
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                        <Box sx={{ color: "#6A9C89" }}>
                                            <UserIcon />
                                        </Box>
                                        <Typography variant="h6" sx={{ textAlign: "left" }}>Personal Information</Typography>
                                    </Box>

                                    {/* First Name and Last Name }
                                    <Box sx={{ display: "flex", gap: 4, width: "100%", mt: 3 }}>
                                        <Box sx={{ width: "50%" }}>
                                            <Typography variant="body2" sx={{ textAlign: "left" }}>First Name</Typography>
                                            <TextField name="firstName" value={customer.firstName} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                        </Box>
                                        <Box sx={{ width: "50%" }}>
                                            <Typography variant="body2" sx={{ textAlign: "left" }}>Last Name</Typography>
                                            <TextField name="lastName" value={customer.lastName} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                        </Box>
                                    </Box>

                                    {/* Email and Phone }
                                    <Box sx={{ display: "flex", gap: 4, width: "100%", mt: 3 }}>
                                        <Box sx={{ width: "50%" }}>
                                            <Typography variant="body2" sx={{ textAlign: "left" }}>Email</Typography>
                                            <TextField name="email" value={customer.email} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                        </Box>
                                        <Box sx={{ width: "50%" }}>
                                            <Typography variant="body2" sx={{ textAlign: "left" }}>Phone Number</Typography>
                                            <TextField name="phoneNumber" value={customer.phoneNumber} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                        </Box>
                                    </Box>

                                    {/* Company Name }
                                    <Box sx={{ width: "100%", mt: 3 }}>
                                        <Typography variant="body2" sx={{ textAlign: "left" }}>Company Name (Optional)</Typography>
                                        <TextField name="companyName" value={customer.companyName} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                    </Box>

                                    <></>
                                    {/* Address Information }
                                    <Box sx={{ borderTop: "1px solid #E0E0E0", pt: 3, mt: 4 }}>
                                        <Typography variant="h6" sx={{ textAlign: "left" }}>Address Information</Typography>
                                        <Box>
                                            <Box sx={{ width: "100%", mt: 3 }}>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>Address Line 1</Typography>
                                                <TextField name="address1" value={customer.address1} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                            </Box>
                                            <Box sx={{ width: "100%", mt: 3 }}>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>Address Line 2</Typography>
                                                <TextField name="address2" value={customer.address2} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                            </Box>

                                            <Box sx={{ width: "100%", mt: 3, display: "flex", gap: 4 }}>
                                                <Box sx={{ width: "100%", mt: 3 }}>
                                                    <Typography variant="body2" sx={{ textAlign: "left" }}>City</Typography>
                                                    <TextField name="city" value={customer.city} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                                </Box>
                                                <Box sx={{ width: "100%", mt: 3 }}>
                                                    <Typography variant="body2" sx={{ textAlign: "left" }}>State / Province</Typography>
                                                    <TextField name="state" value={customer.state} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                                </Box>
                                                <Box sx={{ width: "100%", mt: 3 }}>
                                                    <Typography variant="body2" sx={{ textAlign: "left" }}>Zip / postal Code</Typography>
                                                    <TextField name="zipCode" value={customer.zipCode} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                                </Box>
                                            </Box>

                                            <Box sx={{ width: "50%", mt: 3 }}>
                                                <Typography variant="body2" sx={{ textAlign: "left" }}>Country</Typography>
                                                <TextField name="country" value={customer.country} onChange={changeHandler} sx={{ width: "100%", borderRadius: 2 }} />
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Additional Information }
                                    <Box sx={{ borderTop: "1px solid #E0E0E0", pt: 3, mt: 4 }}>
                                        <Box sx={{ width: "100%", mt: 3 }}>
                                            <Typography variant="body2" sx={{ textAlign: "left" }}>Notes</Typography>
                                            <TextField name="notes" value={customer.notes} onChange={changeHandler} placeholder="Add any additional information" multiline sx={{ width: "100%", borderRadius: 2 }} />
                                        </Box>
                                    </Box>

                                    {/* Save Button }
                                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}>
                                        <Button variant="outlined" sx={{ textTransform: "capitalize" }}>Cancel</Button>
                                        <Button variant="contained" onClick={handleSubmit} sx={{ color: "white", textTransform: "capitalize" }}>Register Customer</Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}*/}