import { Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

interface SignUpProps {
    open: boolean;
    onClose: () => void;
}

export const SignUp = ({ open, onClose }: SignUpProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { regCustomer } = useContext(userContext)!;
    const navigate = useNavigate();

    const requirments = [
        {
            text: 'At least 8 characters',
            regex: /.{8,}/,
        },
        {
            text: 'At least one uppercase letter',
            regex: /[A-Z]/,
        },
        {
            text: 'At least one lowercase letter',
            regex: /[a-z]/,
        },
        {
            text: 'At least one number',
            regex: /[0-9]/,
        },
        {
            text: 'At least one special character',
            regex: /[^A-Za-z0-9]/,
        },
    ]

    // Calculate password strength
    useEffect(() => {
        let newStrength = 0;
        requirments.forEach((req) => {
            if (req.regex.test(password)) {
                newStrength += 1;
            }
        })
        setPasswordStrength(newStrength);
    }, [password])

    const handleSubmit = async () => {
        if(!regCustomer?.email){
            setError("Email is required");
            return;
        }

        if(!password){
            setError("Password is required");
            return;
        }

        try{
            setLoading(true);
            setError("");

            const response = await axios.put(`http://localhost:8080/user/update/password/${regCustomer?.email}`, 
                password,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            console.log("Password updated successfully", response.data);
            alert("Password updated successfully");
            setLoading(false);
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            setShowPassword(false);
            setShowConfirmPassword(false);
            setPasswordStrength(0);
            setError("");
            navigate("/login");
            onClose();
        }catch (error) {
            console.error("Error updating password", error);
            setError("Error updating password");
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={onClose}>
                    <Close />
                </IconButton>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img src="" alt="" />
                    <Typography variant="h5" sx={{ textAlign: "left", fontWeight: "bold" }}>Create Password</Typography>
                    <Typography variant="body2">Make sure your password is secure and easy to remember</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                    {/* Email field */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ textAlign: "left" }}>Email</Typography>
                        <TextField name="password" placeholder={regCustomer?.email} value={regCustomer?.email} onChange={(e) => setEmail(e.target.value)} sx={{ width: "100%" }} />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {/* Password field */}
                        <Typography variant="body2" sx={{ textAlign: "left" }}>Password</Typography>
                        <Box>
                            <TextField
                                name="password"
                                value={password}
                                sx={{ width: "100%" }}
                                placeholder="Enter your password"
                                required
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setError("")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                        </Box>

                        {/* Password strength indicator */}
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ color: "gray" }}>Password strength:</Typography>
                                <Typography variant="body2" sx={{ color: "gray", fontWeight: 300 }}>
                                    {passwordStrength === 0 && 'Very weak'}
                                    {passwordStrength === 1 && 'Weak'}
                                    {passwordStrength === 2 && 'Fair'}
                                    {passwordStrength === 3 && 'Good'}
                                    {passwordStrength === 4 && 'Strong'}
                                    {passwordStrength === 5 && 'Very strong'}
                                </Typography>
                            </Box>
                            <Box sx={{
                                height: 8,
                                width: "100%",
                                backgroundColor: "gray",
                                borderRadius: 1,
                                overflow: "hidden"
                            }}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        width:
                                            passwordStrength === 0 ? "0%" :
                                                passwordStrength === 1 ? "20%" :
                                                    passwordStrength === 2 ? "40%" :
                                                        passwordStrength === 3 ? "60%" :
                                                            passwordStrength === 4 ? "80%" :
                                                                "100%",
                                        backgroundColor:
                                            passwordStrength === 1 ? "red" :
                                                passwordStrength === 2 ? "orange" :
                                                    passwordStrength === 3 ? "yellow" :
                                                        passwordStrength === 4 ? "limegreen" :
                                                            "green",
                                        transition: "all 0.3s ease"
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Password requirements */}
                        {/* <Box sx={{p:2}}>
                            <Box sx={{}}>
                                <Typography variant="body2" sx={{color:"gray", fontWeight:"bold", }}>Password must contain:</Typography>
                            </Box>
                        </Box>*/}
                        {/* Confirm password */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ textAlign: "left" }}>Confirm Password</Typography>
                            <Box>
                                <TextField
                                    name="confirm password"
                                    value={confirmPassword}
                                    sx={{ width: "100%" }}
                                    placeholder="Confirm your password"
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setError("")}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                    {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ position: "absolute", right: 0, top: 0 }}>
                                    {showPassword ? (
                                        <EyeOffIcon size={20} />
                                    ) : (
                                        <EyeIcon size={20} />
                                    )} 

                            </Button>*/}
                            {confirmPassword && password !== confirmPassword && (
                                <Typography variant="body2" sx={{ color: "red", textTransform: "capitalize", mt: 1 }}>Password don't match</Typography>
                            )}
                        </Box>
                    </Box>
                    {/* Submit button */}
                    <Button fullWidth variant="contained" disabled={loading} onClick={handleSubmit} sx={{ mt: 2, py: 1.5, background: "linear-gradient(to right, #2e1049, #6d43a2)" }}>
                        {loading ? "Creating..." : "Create Password"}
                    </Button>
                </Box>
            </Box>
        </DialogContent>
        </Dialog >

    )
}