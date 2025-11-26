import { applyMiddleware, legacy_createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk"; // Bổ sung (Lưu ý không import default => import lẻ {...})
import rootReducer from "./rootReducer";

// Push thẳng vào middleware vì trên môi trường PROD cần có thunk
const enhancers = [thunk];

if (!import.meta.env.PROD) {
    enhancers.push(logger);
}

const store = legacy_createStore(rootReducer, applyMiddleware(...enhancers));
export { store };
