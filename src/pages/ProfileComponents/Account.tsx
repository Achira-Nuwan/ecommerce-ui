import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { CreditCardIcon, MapPinIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserType from '../../types/UserType';
import Address from './AccountDetails/Address';
import PaymentMethods from './AccountDetails/PayementMethods';
import Profile from './AccountDetails/Profile';
import Settings from './AccountDetails/Settings';

function Account() {
  const [profileBClicked, setProfileBClicked] = useState(true);
  const [addressBClicked, setAddressBClicked] = useState(false);
  const [paymentBClicked, setPaymentBClicked] = useState(false);
  const [settingsBClicked, setSettingsBClicked] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const getUserDetails = async () => {

    const email = "achiranuwan40@gmail.com";

    try {
      const respose = await axios.get(`http://localhost:8080/user/getByEmail/${email}`);
      console.log("User Details:", respose.data);
      setUser(respose.data);
    } catch (error) {
      console.error("Error fetching User Details:", error);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const changeProfileButton = () => {
    setProfileBClicked(true);
    setAddressBClicked(false);
    setPaymentBClicked(false);
    setSettingsBClicked(false);
  }

  const changeAddressButton = () => {
    setAddressBClicked(true);
    setProfileBClicked(false);
    setPaymentBClicked(false);
    setSettingsBClicked(false);
  }

  const changePaymentButton = () => {
    setPaymentBClicked(true);
    setProfileBClicked(false);
    setAddressBClicked(false);
    setSettingsBClicked(false);
  }

  const changeSettingsButton = () => {
    setSettingsBClicked(true);
    setProfileBClicked(false);
    setAddressBClicked(false);
    setPaymentBClicked(false);
  }

  return (
    <Box sx={{ backgroundColor: "#FBFCFF", padding: 3 }}>

      {/* Nav bar */}
      <Box sx={{ backgroundColor: "white", p: 1, borderRadius: 3, boxShadow: 1, display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            backgroundColor: "#7B66FF",
            p: 2, color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50%"
          }}>
          <UserIcon />
        </Box>
        <Typography variant='h4' sx={{ fontWeight: "bold" }}>My Account</Typography>
      </Box>

      {/* Information */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Side Bar */}
        <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "white", p: 2, borderRadius: 3, boxShadow: 1, mt: 2, width: "20%" }}>
          <Button
            onClick={changeProfileButton}
            variant='text'
            key={1}
            sx={{ justifyContent: "flex-start", mb: 1, p: 1, color: profileBClicked ? "blue" : "black", backgroundColor: profileBClicked ? "#EBFFF2" : "white", ":hover": { backgroundColor: "#F4FBF8" }, textTransform: "capitalize" }}>
            <UserIcon style={{ marginRight: "10px", color: "gray" }} />
            Profile
          </Button>

          <Button
            onClick={changeAddressButton}
            variant='text'
            key={2}
            sx={{ justifyContent: "flex-start", mb: 1, p: 1, color: addressBClicked ? "blue" : "black", backgroundColor: addressBClicked ? "#EBFFF2" : "white", ":hover": { backgroundColor: "#F4FBF8" }, textTransform: "capitalize" }}>
            <MapPinIcon style={{ marginRight: "10px", color: "gray" }} />
            Address
          </Button>

          <Button
            onClick={changePaymentButton}
            variant='text'
            key={3}
            sx={{ justifyContent: "flex-start", mb: 1, p: 1, color: paymentBClicked ? "blue" : "black", backgroundColor: paymentBClicked ? "#EBFFF2" : "white", ":hover": { backgroundColor: "#F4FBF8" }, textTransform: "capitalize" }}>
            <CreditCardIcon style={{ marginRight: "10px", color: "gray" }} />
            Payment Methods
          </Button>

          <Button
            onClick={changeSettingsButton}
            variant='text'
            key={4}
            sx={{ justifyContent: "flex-start", mb: 1, p: 1, color: settingsBClicked ? "blue" : "black", backgroundColor: settingsBClicked ? "#EBFFF2" : "white", ":hover": { backgroundColor: "#F4FBF8" }, textTransform: "capitalize" }}>
            <SettingsIcon style={{ marginRight: "10px", color: "gray" }} />
            Settings
          </Button>
        </Box>

        {/* Contents */}
        <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3, boxShadow: 1, mt: 2, width: "80%" }}>
          {profileBClicked && <Profile user={user}/>}
          {addressBClicked && <Address user={user}/>}
          {paymentBClicked && <PaymentMethods />}
          {settingsBClicked && <Settings />}
        </Box>
      </Box>
    </Box>
  )
}

export default Account


