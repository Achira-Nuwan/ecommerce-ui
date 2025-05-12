import { createContext } from "react";
import OrderType from "../types/OrderType";

type orderContextType = {
    selectedOrder: OrderType | null;
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderType | null>>;
};

const OrderContext = createContext<orderContextType | null>(null);
export default OrderContext;