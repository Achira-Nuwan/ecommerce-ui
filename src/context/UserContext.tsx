import React from "react";
import UserType from "../types/UserType";

type userContextType = {
    regCustomer: UserType | null;
    setRegCustomer: React.Dispatch<React.SetStateAction<UserType | null>>
}

const userContext = React.createContext<userContextType | null>(null);
export default userContext;