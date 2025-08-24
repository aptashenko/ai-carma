import {instance} from "@/api/instance.js";
import {CARMA_ROUTES} from "@/api/endpoints.js";

export const sendHistory = async (payload) => {
    try {
        const {data} = await instance.post(CARMA_ROUTES.GET_HISTORY, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const checkPayment = async (id) => {
    try {
        const {data} = await instance.get(CARMA_ROUTES.CHECK_PAYMENT.replace(':id', id));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getUsersHistory = async (id) => {
    try {
        const {data} = await instance.get(CARMA_ROUTES.GET_USERS_RESULT.replace(':id', id));
        return data;
    } catch (error) {
        console.log(error);
    }
}
