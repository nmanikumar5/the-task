import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import itemState from "./item-reducer";

const appReducer = combineReducers({
  itemState,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
