import { useCreateProductMutation } from "@/services/product";
import { useGetProductsQuery } from "@/services/product";
import React from "react";

function Home() {
    const { isLoading, data } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();

    const handleCreateProduct = () => {
        createProduct({ title: "New Product" });
    };
    return (
        <div>
            <button onClick={handleCreateProduct}>Create Product</button>
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
