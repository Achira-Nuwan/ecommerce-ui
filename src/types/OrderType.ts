import UserType from "./UserType";

interface OrderType{
    orderId: number;
    user: UserType;
    orderDateTime: string;
    totalPrice: number;
    orderProducts: {
        productId: number;
        quantity: number;
    }[];
}
export default OrderType;