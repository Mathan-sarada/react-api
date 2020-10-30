import * as REST from "./constants";
import axios from "axios";

export const Vehicle_Api = {
  Add_Vehicle: function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.VEHICLE.ADD_VEHICLE}?admin_id=${REST.ADMIN_ID}`,
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

  Get_Vehicle: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.VEHICLE.GET_VEHICLE}?admin_id=${REST.ADMIN_ID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

  Get_Vehicle_by_name: async function(name) {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.VEHICLE.GET_VEHICLE_BY_ID}?admin_id=${REST.ADMIN_ID}&vehicle_name=${name}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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

  Update_Vehicle: function(id, fields) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.VEHICLE.PATCH_VEHICLE}/${id}?admin_id=${REST.ADMIN_ID}`,
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
  }
};
