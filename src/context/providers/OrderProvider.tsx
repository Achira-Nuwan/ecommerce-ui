import { useState } from "react";
import OrderType from "../../types/OrderType";
import OrderContext from "../OrderContext";

const OrderProvider = ({children}: {children: React.ReactNode}) => {
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    
    return(
        <OrderContext.Provider value={{selectedOrder, setSelectedOrder}}>
            {children}  
        </OrderContext.Provider>
    )
}
export default OrderProvider;