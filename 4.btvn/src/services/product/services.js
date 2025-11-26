import httpRequest from "@/utils/httpRequest";

/* Method: Get Product API */
export async function getProducts() {
    const response = await httpRequest.get("/products");
    return response;
}
