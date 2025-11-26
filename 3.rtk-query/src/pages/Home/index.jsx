import {
    useCreateProductMutation,
    useGetProductsQuery,
} from "@/services/product";
import React from "react";

function Home() {
    // Xử lý loading
    const { isLoading, data } = useGetProductsQuery();
    /* Lưu ý:
        isFetching: Đang fetch dữ liệu
        isLoading: Cũng đang fetch nhưng chưa nhận được dữ liệu
        isSuccess: Nhận dữ liệu thành công chưa
    */

    const [createProduct, newProductResponse] = useCreateProductMutation();
    console.log(newProductResponse); // có thể xử lý isLoading, error

    const handleCreateProduct = () => {
        createProduct({ title: "New Product" });
    };

    return (
        <div>
            <button onClick={handleCreateProduct}>Create New Product</button>

            <h1>Product List</h1>
            <ul>
                {isLoading ? (
                    <div>Loading</div>
                ) : (
                    data.data.items.map((product) => (
                        <li key={product.id}>
                            {product.id}.{product.title}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Home;
