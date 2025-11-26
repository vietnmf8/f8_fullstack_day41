/* Nơi chứa các hàm gọi API */

import httpRequest from "@/utils/httpRequest";

export async function getProducts() {
    const response = await httpRequest.get("/products");
    return response;
}
