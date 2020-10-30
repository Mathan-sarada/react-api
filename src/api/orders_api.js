import * as REST from "./constants";
import axios from "axios";

export const Orders_Api = {
  Get_Orders: async function() {
    return axios({
      method: "get",
      url: `${REST.BASE_URL}${REST.ORDERS.GET_ORDERS}?admin_id=${REST.ADMIN_ID}`,
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

  verifyMobile: async function(id, fields) {
    return axios({
      method: "post",
      data: fields,
      url: `${REST.BASE_URL}${REST.ORDERS.VERIFY_MOBILE}/${id}?admin_id=${REST.ADMIN_ID}`,
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
