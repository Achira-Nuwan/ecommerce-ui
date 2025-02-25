import { CheckBox, LockOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

const Login: React.FC = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (username:string, password:string) => {
    const data = {
      username:username,
      password:password
    }

    try{
      const response = await axios.post("http://localhost:8080/auth/login",data);
      console.log("Login details:", response.data);
      login(response.data);
      navigate("/");

    }catch (error){
      console.error("Error login with username and password");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f6f8">
      <Card sx={{ width: 400, padding: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <LockOutlined sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Login
            </Typography>
          </Box>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(e) =>handleSubmit(e.username,e.password)}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Box sx={{display:"flex", justifyContent:"space-between", py:1, alignItems:"center"}}>
                    <Box sx={{display:"flex", gap:1, justifyContent:"center", alignItems:"center"}}>
                        <CheckBox/>
                        <Typography sx={{fontSize:"14px"}}>Remember me</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{fontSize:"14px"}}>Forgot password?</Typography>
                    </Box>
                </Box>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, py: 1.5 }}>
                  Sign In
                </Button>
                <Box>
                    <Typography sx={{fontSize:"14px",py:2, color:"gray"}}>Don't have an account? Sign up</Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
