import * as REST from "./constants";
import axios from "axios";

export const Service_Api = {
  Add_Servie: function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.SERVICES.ADD_SERVICE}?admin_id=${REST.ADMIN_ID}`,
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

  Update_Service: function(id, fields) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.SERVICES.PATCH_SERVICE}/${id}?admin_id=${REST.ADMIN_ID}`,
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

  Get_Service: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.SERVICES.GET_SERVICE}?admin_id=${REST.ADMIN_ID}`,
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
