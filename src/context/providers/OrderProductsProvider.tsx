import { useState } from "react";
import { CartItem } from "../../pages/MainPages/CartPage";
import orderProductContext from "../OrderProductsContext";

const OrderProductsProvider = ({children}: {children: React.ReactNode}) => {

    const [orderedProducts, setOrderedProducts] = useState<CartItem[]>([]);

    return(
        <orderProductContext.Provider value={{orderedProducts, setOrderedProducts}}>
            {children}
        </orderProductContext.Provider>
    )
}
export default OrderProductsProvider;