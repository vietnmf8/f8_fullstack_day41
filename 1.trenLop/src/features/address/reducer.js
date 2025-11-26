import { SET_PROVINCES } from "./consts";

const initState = {
    provinces: [],
};

function reducer(state = initState, action) {
    switch (action.type) {
        case SET_PROVINCES:
            return {
                ...state,
                provinces: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
