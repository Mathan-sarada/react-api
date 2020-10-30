import * as REST from "./constants";
import axios from "axios";

export const Location_Api = {
  Add_Location: async function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.LOCATION.POST_LOCATION}`,
      data: fields,
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

  Update_Location: async function(fields, id) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.LOCATION.PATCH_LOCATION}/${id}?admin_id=${REST.ADMIN_ID}`,
      data: fields,
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

  Get_Location: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.LOCATION.GET_LOCATION}`,
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
