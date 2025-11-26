import { GET_ITEMS, SET_ITEMS } from "./consts";

const initState = {
    items: [],
    isLoading: false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                isLoading: true,
            };
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default reducer;
