import { createContext, useContext, useEffect, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    jwtToken: null,
    login: () => {},
    logout: () => {}
})

export function AuthProvider({children}: AuthProviderPropsType){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken, setJwtToken] = useState<string | null>(null);

    function login(jwtToken: string){
        setIsAuthenticated(true);
        setJwtToken(jwtToken);
        localStorage.setItem('jwtToken', jwtToken);
    }

    function logout(){
        setIsAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem('jwtToken');
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(token){
            setIsAuthenticated(true);
            setJwtToken(token);
        }
    },[])

    return(
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}