import * as qs from "qs";
import axios from "axios";
import { URL_API_NOTIFICATION } from "../constants/url";

export default function useNotification() {
  const createNotification = async (user_id, message) => {
    try {
      await axios.post(
        URL_API_NOTIFICATION,
        qs.stringify({
          action: "create",
          user_id,
          message,
        })
      );
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const getNotifications = async (user_id) => {
    try {
      const res = await axios.get(URL_API_NOTIFICATION, {
        params: {
          user_id,
          action: "read",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const markNotificationsAsRead = async (user_id) => {
    try {
      await axios.get(URL_API_NOTIFICATION, {
        params: {
          user_id,
          action: "mark_as_read",
        },
      });
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const countUnreadNotifications = async (user_id) => {
    try {
      const res = await axios.get(URL_API_NOTIFICATION, {
        params: {
          user_id,
          action: "count",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return {
    createNotification,
    getNotifications,
    markNotificationsAsRead,
    countUnreadNotifications,
  };
}
