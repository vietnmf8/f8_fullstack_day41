import { combineReducers } from "redux";
import { reducer as productReducer } from "@/features/product";
import { reducer as addressReducer } from "@/features/address";

const rootReducer = combineReducers({
    product: productReducer,
    address: addressReducer,
});

export default rootReducer;
