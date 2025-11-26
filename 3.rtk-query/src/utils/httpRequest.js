// 1. import axios
import axios from "axios";

// 2. Cấu hình instance chứa các config
const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
});

httpRequest.interceptors.response.use((response) => {
    return response.data;
});

export default httpRequest;
