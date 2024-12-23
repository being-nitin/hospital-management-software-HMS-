import axios from "axios";
import { API } from "../config";
import {
	LIST_DASHBOARD_DATA_REQUEST,
	LIST_DASHBOARD_DATA_SUCCESS,
	LIST_DASHBOARD_DATA_FAIL,
} from "../constants/dashbardData";
import { logout } from "./userActions";

export const getDashboardData = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LIST_DASHBOARD_DATA_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`${API}/details`, { config });

		dispatch({
			type: LIST_DASHBOARD_DATA_SUCCESS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: LIST_DASHBOARD_DATA_FAIL,
			payload: message,
		});
	}
};
