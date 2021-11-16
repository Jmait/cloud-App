import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  theme: themeReducer,
  files: fileReducer,
});
