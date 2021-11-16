import * as types from "../types";

let initiailState = {
  files: [],
  storageClass: "Frequent",
};

export default function (state = initiailState, { type, payload }) {
  switch (type) {
    case types.SET_FILE:
      return {
        ...state,
        files: [...state.files, ...payload],
      };
    case types.CLEAR_STORAGE:
      return {
        ...state,
        files: [],
      };
    case types.SET_STORAGE_CLASS:
      return {
        ...state,
        storageClass: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
