import { ReactNode, useState } from "react";
import ProductType from "../../types/ProductType";
import CartContext from "../CartContext";

const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<ProductType[]>([]);

    return(
        <CartContext.Provider value={{products, setProducts}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;