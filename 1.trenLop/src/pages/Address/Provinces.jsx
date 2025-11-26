import { useFetchProvinces } from "@/services/address";
import React from "react";

function Provinces() {
    const { isLoading, data: provinces } = useFetchProvinces();

    return (
        <div>
            <h1>Provinces</h1>
            <h2>Product List</h2>

            <ul>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    provinces.map((province) => (
                        <li key={province.province_id}>
                            {province.province_id}.{province.name}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Provinces;
