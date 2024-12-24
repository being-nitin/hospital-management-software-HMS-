import { UPDATE_SETTING_FAIL, UPDATE_SETTING_REQUEST, UPDATE_SETTING_SUCCESS , UPDATE_SETTING_RESET, LIST_SETTING_FAIL, LIST_SETTING_REQUEST, LIST_SETTING_RESET, LIST_SETTING_SUCCESS } from "../constants/settingConstant";

export const settingUpdateReducer = (state = { setting: {} }, action) => {
    switch (action.type) {
        case UPDATE_SETTING_REQUEST:
            return { loading: true }
        case UPDATE_SETTING_SUCCESS:
            return { loading: false, success: true, setting: action.payload }
        case UPDATE_SETTING_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_SETTING_RESET:
            return { test: {} }
        default:
            return state
    }
}

export const settingListMyReducer = (state = { setting: [] }, action) => {
    switch (action.type) {
        case LIST_SETTING_REQUEST:
            return {
                loading: true,
            }
        case LIST_SETTING_SUCCESS:
            return {
                loading: false,
                settings: action.payload,
            }
        case LIST_SETTING_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case LIST_SETTING_RESET:
            return { settings: [] }
        default:
            return state
    }
}