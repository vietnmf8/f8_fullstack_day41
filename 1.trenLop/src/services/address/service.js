import httpRequest from "@/utils/httpRequest";

export async function getProvinces() {
    const response = await httpRequest.get("/address/provinces");
    return response.data;
}
