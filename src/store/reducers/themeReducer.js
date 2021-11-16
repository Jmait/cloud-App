import * as types from "../types";
import { theme1 } from "../../theme/theme";

let initiailState = {
  theme: theme1,
  darkMode: false,
};

export default function (state = initiailState, { type, payload }) {
  switch (type) {
    case types.SWITCH_THEME:
      return {
        ...state,
        theme: payload,
      };
    case types.DARK_MODE:
      return {
        ...state,
        darkMode: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
