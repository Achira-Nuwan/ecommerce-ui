import CategoryType from "./CategoryType";

interface ProductType {
    productId: number;
    productName: string;
    price: number;
    description: string;
    imageUrl: string;
    category:CategoryType
}
export default ProductType;