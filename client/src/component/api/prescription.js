import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";

// updation

const updatePrescription = async (pres, userInfo ) => {
   
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    const response = await axios.put(
        `${API}/pres-update/${pres._id}/${userInfo._id}`,
        pres,
        config
    );

    return response.data;
};

export const useUpdatePrescription = () => {
    const queryClient = useQueryClient();
const { userInfo } = useSelector((state) => state.userLogin);
    const mutation = useMutation( {
        mutationFn: ({pres}) => updatePrescription(pres , userInfo)  ,
        onSuccess: (data) => {
            // Invalidate the query to refetch it after mutation
            queryClient.invalidateQueries('appointments'); 
           
        },
        onError: (error) => {
            console.error("Error updating prescription:", error);
        },
    });

    return mutation;
};

// creation
const createPrescription = async ({ appId, prescriptions }, userInfo) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const response = await axios.post(
        `${API}/pres-create/${userInfo._id}?appId=${appId}`,
        prescriptions,
        config
    );

    return response.data;
};

export const useCreatePrescription = () => {
    const queryClient = useQueryClient();
    const { userInfo } = useSelector((state) => state.userLogin);

    const mutation = useMutation({
        mutationFn: ({ appId, prescriptions }) => createPrescription({ appId, prescriptions }, userInfo),
        onSuccess: (data) => {
            // Invalidate relevant queries to refetch updated data
            queryClient.invalidateQueries(["appointments"]); // Ensure "appointments" matches your query key
            
        },
        onError: (error) => {
            console.error("Error creating prescription:", error);
        },
    });

    return mutation;
};


const deletePrescription = async ({idx , presId ,userInfo}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    const { data } = await axios.delete(`${API}/pres-remove/${presId}`, config , idx);
    return data;
  };

  
export const useDeletePrescription = () => {
    const queryClient = useQueryClient();
const { userInfo } = useSelector((state) => state.userLogin);
    const mutation = useMutation( {
        mutationFn: ({idx , presId}) => deletePrescription({idx ,presId, userInfo})  ,
        onSuccess: (data) => {
            // Invalidate the query to refetch it after mutation
            queryClient.invalidateQueries(['appointments']); 
        
        },
        onError: (error) => {
            console.error("Error updating prescription:", error);
        },
    });

    return mutation;
};

