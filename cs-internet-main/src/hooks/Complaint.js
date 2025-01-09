import * as qs from "qs";
import axios from "axios";
import { URL_API_COMPLAINT } from "../constants/url";

export default function useComplaint() {
  const createComplaint = async (data) => {
    try {
      await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          ...data,
          action: "create",
        })
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getHistoryComplaints = async (user_id) => {
    try {
      const res = await axios.get(URL_API_COMPLAINT, {
        params: {
          user_id,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getAssignedComplaints = async (technician_id) => {
    try {
      const res = await axios.get(URL_API_COMPLAINT, {
        params: {
          technician_id,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const updateComplaintStatus = async (complaint_id, status) => {
    try {
      await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          action: "updateStatus",
          complaint_id,
          status,
        })
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const countNewComplaints = async () => {
    try {
      const res = await axios.get(URL_API_COMPLAINT, {
        params: {
          new_complaints: true,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const updateComplaint = async (complaint_id, data) => {
    try {
      await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          action: "update",
          complaint_id,
          ...data,
        })
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const deleteComplaint = async (complaint_id) => {
    try {
      await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          action: "delete",
          complaint_id,
        })
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getAllComplaints = async () => {
    try {
      const res = await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          action: "getAllComplaints",
        })
      );

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const findComplaintByID = async (complaint_id) => {
    try {
      const res = await axios.post(
        URL_API_COMPLAINT,
        qs.stringify({
          action: "findComplaintByID",
          complaint_id,
        })
      );

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return {
    createComplaint,
    getHistoryComplaints,
    getAssignedComplaints,
    updateComplaintStatus,
    countNewComplaints,
    updateComplaint,
    deleteComplaint,
    getAllComplaints,
    findComplaintByID
  };
}
