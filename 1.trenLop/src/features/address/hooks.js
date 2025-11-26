import { useSelector } from "react-redux";

export function useProvinces() {
    const data = useSelector((state) => state.product.provinces);
    return data;
}
