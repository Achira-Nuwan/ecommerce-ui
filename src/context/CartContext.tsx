import { createContext } from "react";
import ProductType from "../types/ProductType";

type cartContextType = {
    products : ProductType[];
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

const CartContext = createContext<cartContextType | null>(null);
export default CartContext;