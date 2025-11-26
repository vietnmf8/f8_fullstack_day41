// 1. import axios
import axios from "axios";

// 2. Cấu hình instance chứa các config
const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
});

/* Interceptor: giá trị được return từ Interceptor sẽ được trả vào chính response nhận được khi fetch API */
httpRequest.interceptors.response.use((response) => {
    return response.data; // Đây chính là dữ liệu từ API
});

export default httpRequest;
