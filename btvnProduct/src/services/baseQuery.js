import httpRequest from "@/utils/httpRequest";

const baseQuery = async (args) => {
    // Kiểm tra args có phải là một object hay là chuỗi endpoint
    const isObject = typeof args === "object";

    /* Cấu hình cho config của Axios với các field cần có */
    const config = {
        url: isObject ? args.url : args,
        method: isObject ? args.method : "GET",
    };

    /* Các field optional */
    if (isObject) {
        if (args.body) config.data = args.body;
        if (args.headers) config.headers = args.headers;

        // Config param
        if (args.params) config.params = args.params;
    }

    /* Thực hiện gọi API */
    try {
        const data = await httpRequest(config);
        return { data };
    } catch (error) {
        return { error: error.response?.data || error.message };
    }
};

export default baseQuery;
