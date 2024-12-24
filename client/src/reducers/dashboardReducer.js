import {
	LIST_DASHBOARD_DATA_REQUEST,
	LIST_DASHBOARD_DATA_SUCCESS,
	LIST_DASHBOARD_DATA_FAIL,
} from "../constants/dashbardData";

export const listDashboardData = (state = { dashboardData: {} }, action) => {
	switch (action.type) {
		case LIST_DASHBOARD_DATA_REQUEST:
			return { loading: true };

		case LIST_DASHBOARD_DATA_SUCCESS:
			return {
				loading: false,
				success: true,
				dashboardData: action.payload,
			};

		case LIST_DASHBOARD_DATA_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
