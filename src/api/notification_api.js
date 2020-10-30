import * as REST from "./constants";
import axios from "axios";

export const Notification_Api = {
  Update_Notification: async function(id) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.NOTIFICATION.PATCH_NOTIFICATION}/${id}?admin_id=${REST.ADMIN_ID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        api: REST.API,
        secret: REST.SECRET
      }
    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response.data;
      });
  },

  Get_Notification: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.NOTIFICATION.GET_NOTIFICATION}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        api: REST.API,
        secret: REST.SECRET
      }
    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response.data;
      });
  }
};
