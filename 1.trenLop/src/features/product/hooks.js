import { useSelector } from "react-redux";

export function useProducts() {
    const products = useSelector((state) => state.product.items);
    return products;
}
