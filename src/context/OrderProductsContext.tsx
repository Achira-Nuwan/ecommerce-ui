import React from "react";
import ProductType from "../types/ProductType";
import { CartItem } from "../pages/MainPages/CartPage";

type OrderProductType = {
    orderedProducts: CartItem[];
    setOrderedProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const orderProductContext = React.createContext<OrderProductType | null>(null);
export default orderProductContext;