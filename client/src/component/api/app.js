import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery , useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fetchVacAppointments = async (queryKey ) => {
    const { userInfo, page, limit, status, startDate, endDate, patient} = queryKey;
    

    if (!userInfo._id) return { appointment: [], totalPages: 0, todayAppointment: [] }; // Handle case where user is not logged in
    
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (status) queryParams.append("status", status);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (patient) queryParams.append("patient", patient);

    const { data } = await axios.get(
        `${API}/vaccine-app-list/${userInfo._id}?${queryParams.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Get token from localStorage
            },
        }
    );

    return data;
};


export const useAppointments = ({ page = 1, limit = 10, status = null, startDate = null, endDate = null, patient = null }) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    return useQuery({
        queryKey: ["appointments", userInfo, page, limit, status, startDate, endDate, patient], // Unique cache key
        queryFn: fetchVacAppointments,
        enabled: !!userInfo?._id, // Fetch only if user is logged in
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 1, // Retry once on failure
    });
};

export const useInfiniteAppointments = ({ page = 1, limit = 10, status = null, startDate = null, endDate = null, patient = null }) => {
    const { userInfo } = useSelector((state) => state.userLogin);

    return useInfiniteQuery(
        ["appointments", userInfo, page, limit, status, startDate, endDate, patient], // Unique cache key
        async ({ pageParam = page }) => {
            // Pass the pageParam correctly to fetchVacAppointments
            const response = await fetchVacAppointments({
                userInfo,  // Pass userInfo directly
                page: pageParam,  // Pass the current page number
                limit,
                status,
                startDate,
                endDate,
                patient
            });
            return response; // Return the fetched response data
        },
        {
            enabled: !!userInfo?._id, // Only fetch if user is logged in
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            retry: 1, // Retry once on failure
            getNextPageParam: (lastPage) => {
                // If current page is less than total pages, return next page number
                return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
            }
        }
    );
};

const updateAppointment = async ({_id ,...appVacc} , user) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    }

    const { data } = await axios.put(
            `${API}/vaccine-app-update/${_id}/`,
            appVacc,
            config
    )
    
    return data;
};

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    const { userInfo } = useSelector((state) => state.userLogin);
    return useMutation({
        mutationFn: ({ _id, ...appVacc }) =>
            updateAppointment( {_id, ...appVacc},{ token: userInfo?.token} ),
        onSuccess: () => {
            queryClient.invalidateQueries(["appointments"]); 
        },
    });
};

export const useInvalidateAppointments = () => {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries(["appointments"]);
    };
};
