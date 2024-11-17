import axios from "axios";
import {API} from "../config";
import {logout} from "./userActions";
import {
    CREATE_APPOINTMENT_VACCINE_FAIL,
    CREATE_APPOINTMENT_VACCINE_REQUEST,
    CREATE_APPOINTMENT_VACCINE_RESET,
    CREATE_APPOINTMENT_VACCINE_SUCCESS,
    LIST_APPOINTMENT_VACCINE_FAIL,
    LIST_APPOINTMENT_VACCINE_REQUEST,
    LIST_APPOINTMENT_VACCINE_RESET,
    LIST_APPOINTMENT_VACCINE_SUCCESS,
    UPDATE_APPOINTMENT_VACCINE_FAIL,
    UPDATE_APPOINTMENT_VACCINE_REQUEST,
    UPDATE_APPOINTMENT_VACCINE_RESET,
    UPDATE_APPOINTMENT_VACCINE_SUCCESS,
    DELETE_APPOINTMENT_VACCINE_FAIL,
    DELETE_APPOINTMENT_VACCINE_REQUEST,
    DELETE_APPOINTMENT_VACCINE_SUCCESS,
    DETAILS_APPOINTMENT_VACCINE_FAIL,
    DETAILS_APPOINTMENT_VACCINE_REQUEST,
    DETAILS_APPOINTMENT_VACCINE_SUCCESS,
    LIST_DAY_ENUMS_FAIL,
    LIST_DAY_ENUMS_REQUEST,
    LIST_DAY_ENUMS_RESET,
    LIST_DAY_ENUMS_SUCCESS,
    LIST_TAKEN_ENUMS_FAIL,
    LIST_TAKEN_ENUMS_REQUEST,
    LIST_TAKEN_ENUMS_RESET,
    LIST_TAKEN_ENUMS_SUCCESS
} from '../constants/vaccineAppointmentConstants'








export const createVacApp = (app) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_APPOINTMENT_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API}/vaccine-app-create/${userInfo._id}`, app, config)

        dispatch({
            type: CREATE_APPOINTMENT_VACCINE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error.response)
        console.log(error.response.data.error.message)
        const message = error.response.data.error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: CREATE_APPOINTMENT_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const listVacApp = (page = null, limit = null, status = null, date = null) => async (dispatch, getState) => {
    try {
            dispatch({
                type: LIST_APPOINTMENT_VACCINE_REQUEST,
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Build query parameters dynamically
            const queryParams = new URLSearchParams();
            if (page) queryParams.append("page", page);
            if (limit) queryParams.append("limit", limit);
            if (status) queryParams.append("status", status);
            if (date) queryParams.append("date", date);

            // Make API request
            const { data } = await axios.get(
                `${API}/vaccine-app-list/${userInfo._id}?${queryParams.toString()}`,
                config
            );

            dispatch({
                type: LIST_APPOINTMENT_VACCINE_SUCCESS,
                payload: data,
            });
        console.log(data)
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
            type: LIST_APPOINTMENT_VACCINE_FAIL,
            payload: message,
        })
    }
}

export const deleteVacApp = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_APPOINTMENT_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`${API}/vaccine-app-remove/${id}`, config)

        dispatch({ type: DELETE_APPOINTMENT_VACCINE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DELETE_APPOINTMENT_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const updateVacApp = ({_id ,...appVacc}) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_APPOINTMENT_VACCINE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        console.log("vital :", appVacc)
            const { data } = await axios.put(
                `${API}/vaccine-app-update/${_id}/`,
                appVacc,
                config
            )

        dispatch({
            type: UPDATE_APPOINTMENT_VACCINE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DETAILS_APPOINTMENT_VACCINE_SUCCESS, payload: data })

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
            type: UPDATE_APPOINTMENT_VACCINE_FAIL,
            payload: message,
        })
    }
}


export const detailsVacApp = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DETAILS_APPOINTMENT_VACCINE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get(`${API}/vaccine-app-detail/${id}`, config)

        dispatch({
            type: DETAILS_APPOINTMENT_VACCINE_SUCCESS,
            payload: data,
        })
        //console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: DETAILS_APPOINTMENT_VACCINE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listVacDaysEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_DAY_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/vaccine/vaccine-day-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_DAY_ENUMS_SUCCESS,
            payload: data,
        })
        //console.log(data)
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
            type: LIST_DAY_ENUMS_FAIL,
            payload: message,
        })
    }
}


export const listVacTakenEnums = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_TAKEN_ENUMS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API}/vaccine/vaccine-taken-values/${userInfo._id}`, config)

        dispatch({
            type: LIST_TAKEN_ENUMS_SUCCESS,
            payload: data,
        })
        //console.log(data)
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
            type: LIST_TAKEN_ENUMS_FAIL,
            payload: message,
        })
    }
}

