import React from "react";
import { CartItem } from "../../pages/MainPages/CartPage";
import selectedProductContext from "../SelectedProductContext";

const SelectedProductProvider = ({children}: {children: React.ReactNode}) => {
    const [selectedProduct, setSelectedProduct] = React.useState<CartItem | null>(null);

    return (
        <selectedProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </selectedProductContext.Provider>
    );
}
export default SelectedProductProvider;