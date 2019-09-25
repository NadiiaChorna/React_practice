import { SHOW_ALERT, HIDE_ALERT } from '../types';

const handlers = {
    [SHOW_ALERT]: (state, action) => {
        return {
            ...state,
            ...action.payload,
            visible: true
        }
    },
    [HIDE_ALERT]: (state, action) => {
        return {
            ...state,
            visible: false
        }
    },
    DEFAULT: state => state
}

export const alertReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}