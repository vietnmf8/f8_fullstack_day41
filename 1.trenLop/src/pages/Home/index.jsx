import { getItems } from "@/features/product/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch();
    const { items: products, isLoading } = useSelector(
        (state) => state.product,
    );
    console.log(products, isLoading);

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    return (
        <div>
            <h1>Home</h1>
            <h2>Product List</h2>

            <ul>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    products.map((product) => (
                        <li key={product.id}>
                            {product.id}.{product.title} - {product.price}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Home;
