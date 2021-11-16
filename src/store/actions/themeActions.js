import * as types from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getInitialTheme = () => async dispatch => {
    let theme = await AsyncStorage.getItem('theme');
    theme = JSON.parse(theme);
    if (theme) {
        dispatch({
            type: types.SWITCH_THEME,
            payload: theme
        });
    }
}

export const switchTheme = (theme) => async dispatch => {
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
    dispatch({
        type: types.SWITCH_THEME,
        payload: theme
    });
}

export const switchDarkMode = (val) => dispatch => {
    dispatch({
        type: types.DARK_MODE,
        payload: val
    });
}