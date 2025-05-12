import { useState } from "react";
import UserType from "../../types/UserType";
import userContext from "../UserContext";

const UserProvider = ({children}: {children: React.ReactNode}) =>{
    const [regCustomer, setRegCustomer] = useState<UserType | null>(null);

    return(
        <userContext.Provider value={{regCustomer, setRegCustomer}}>
            {children}
        </userContext.Provider>
    )
}
export default UserProvider;