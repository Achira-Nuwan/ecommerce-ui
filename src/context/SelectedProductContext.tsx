import React from "react";
import { CartItem } from "../pages/MainPages/CartPage";

type selectedProductContextType = {
    selectedProduct: CartItem | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

const selectedProductContext = React.createContext<selectedProductContextType | null>(null);
export default selectedProductContext;