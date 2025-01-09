import axios from "axios";
import { URL_API_USER } from "../constants/url";
import * as qs from "qs";

export default function useUser() {
  const getAllCustomers = async () => {
    try {
      const res = await axios.get(URL_API_USER, {
        params: {
          action: "getAllCustomers",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getAllTechnicians = async () => {
    try {
      const res = await axios.get(URL_API_USER, {
        params: {
          action: "getAllTechnicians",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const countCustomers = async () => {
    try {
      const res = await axios.get(URL_API_USER, {
        params: {
          action: "countCustomers",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const createUser = async (data) => {
    try {
      const res = await axios.post(
        URL_API_USER,
        qs.stringify({
          ...data,
          action: "createUser",
        })
      );
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const updateUser = async (user_id, data) => {
    try {
      const res = await axios.post(
        URL_API_USER,
        qs.stringify({
          ...data,
          action: "updateUser",
          user_id: user_id,
        })
      );
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const deleteUser = async (user_id) => {
    try {
      const res = await axios.post(
        URL_API_USER,
        qs.stringify({
          action: "deleteUser",
          user_id: user_id,
        })
      );
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const findUserById = async (user_id) => {
    try {
      const res = await axios.get(URL_API_USER, {
        params: {
          action: "findUserById",
          user_id: user_id,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return {
    getAllCustomers,
    getAllTechnicians,
    countCustomers,
    createUser,
    updateUser,
    deleteUser,
    findUserById,
  };
}
