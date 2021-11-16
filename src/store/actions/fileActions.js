import * as types from "../types";

export const addFile = (file) => (dispatch) => {
  dispatch({
    type: types.SET_FILE,
    payload: file,
  });
};

export const clearStore = (file) => (dispatch) => {
  dispatch({
    type: types.CLEAR_STORAGE,
    payload: [],
  });
};

export const setStorageClass = (storageClass) => (dispatch) => {
  dispatch({
    type: types.SET_STORAGE_CLASS,
    payload: storageClass,
  });
};
