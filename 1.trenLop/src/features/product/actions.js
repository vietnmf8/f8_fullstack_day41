import { getProducts } from "@/services/product";
import { GET_ITEMS, SET_ITEMS } from "./consts";

/* Action: setItems */
export const setItems = (payload) => ({
    type: SET_ITEMS,
    payload,
});

/* Action: getItems */
export const getItems = () => {
    return async (dispatch) => {
        /* Trước khi gọi API */
        /* Xử lý loading với dispatch action thuần tuý */
        dispatch({ type: GET_ITEMS });

        /* Gọi API */
        const {
            data: { items },
        } = await getProducts();

        /* Sau khi có response */
        dispatch(setItems(items));
    };
};
