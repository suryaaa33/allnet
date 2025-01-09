import * as qs from "qs";
import axios from "axios";
import { URL_API_CUSTOMER } from "../constants/url";

export default function useCustomer() {
    const createCustomer = async (data) => {
        try {
            await axios.post(
                URL_API_CUSTOMER,
                qs.stringify({
                    ...data,
                    action: "create",
                })
            );
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    const getAllCustomers = async () => {
        try {
            const res = await axios.get(URL_API_CUSTOMER);
            return res.data;
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    return {
        createCustomer,
        getAllCustomers,
    };
}