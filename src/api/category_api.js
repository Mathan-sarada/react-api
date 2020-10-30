import * as REST from "./constants";
import axios from "axios";

export const Category_Api = {
  Add_Category: async function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.CATEGORY.ADD_CATEGORY}?admin_id=${REST.ADMIN_ID}`,
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

  Update_Category: async function(fields, id) {
    return axios({
      method: "patch",
      url: `${REST.BASE_URL}${REST.CATEGORY.PATCH_CATEGORY}/${id}?admin_id=${REST.ADMIN_ID}`,
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

  Get_Category: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.CATEGORY.GET_CATEGORY}?admin_id=${REST.ADMIN_ID}`,
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
