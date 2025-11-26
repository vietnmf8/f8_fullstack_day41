import { fetchProducts } from "@/features/product/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.id}.{product.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
