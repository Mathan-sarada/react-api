import * as REST from "./constants";
import axios from "axios";

export const User_api = {
  SignIn: function(fields, id) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.USERS.LOGIN}/${id}`,
      data: fields,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error.response.data;
      });
  },

  SignOut: function(fields) {
    return axios({
      method: "post",
      url: `${REST.BASE_URL}${REST.USERS.LOGOUT}/${REST.ADMIN_ID}`,
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
