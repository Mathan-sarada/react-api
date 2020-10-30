import * as REST from "./constants";
import axios from "axios";

export const Vendor_Api = {
  Add_Vendor: function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.VENDOR.ADD_VENDOR}?admin_id=${REST.ADMIN_ID}`,
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

  Update_Vendor: function(id, fields) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.VENDOR.PATCH_VENDOR}/${id}?admin_id=${REST.ADMIN_ID}`,
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

  Get_Vendor: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.VENDOR.GET_VENDOR}?admin_id=${REST.ADMIN_ID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
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
