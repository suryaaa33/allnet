import axios from "axios";
import { URL_API_SERVICE } from "../constants/url";

export default function useService() {
  const getAllServices = async () => {
    try {
      const res = await axios.get(URL_API_SERVICE, {
        params: {
          action: "getAllServices",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getAllServiceArea = async () => {
    try {
      const res = await axios.get(URL_API_SERVICE, {
        params: {
          action: "getAllServiceArea",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const findServiceByID = async (id) => {
    try {
      const res = await axios.get(URL_API_SERVICE, {
        params: {
          action: "findServiceByID",
          id,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getAllServicesByArea = async (area_id) => {
    try {
      const res = await axios.get(URL_API_SERVICE, {
        params: {
          action: "getAllServicesByArea",
          area_id,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return {
    getAllServices,
    getAllServiceArea,
    findServiceByID,
    getAllServicesByArea,
  };
}
