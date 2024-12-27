import axios from "axios"
import { UPDATE_SETTING_FAIL, UPDATE_SETTING_REQUEST, UPDATE_SETTING_SUCCESS , UPDATE_SETTING_RESET, 
       LIST_SETTING_FAIL,LIST_SETTING_REQUEST, LIST_SETTING_SUCCESS,
} from "../constants/settingConstant";
import { logout } from './userActions'
import { API } from "../config";

export const updateSetting = (category , setting) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_SETTING_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `${API}/setting/?category=${category}`,
            {...setting},
            config
        )

        dispatch({
            type: UPDATE_SETTING_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error.response)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: UPDATE_SETTING_FAIL,
            payload: message,
        })
    }
}

export const listSetting = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_SETTING_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/setting`, config)

        dispatch({
            type: LIST_SETTING_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: LIST_SETTING_FAIL,
            payload: message,
        })
    }
}