import store from "store";

export const BASE_URL = "http://45.32.120.50:9000/api/v1";
export const API = store.get("apiKey") ? store.get("apiKey").apiKey : "";
export const SECRET = store.get("secretKey")
  ? store.get("secretKey").secretKey
  : "";
export const ADMIN_ID = store.get("adminKey")
  ? store.get("adminKey").adminKey
  : "";

export const USERS = {
  LOGIN: "/user/login",
  LOGOUT: "/user/logout"
};

/* ------------------------------- CATEGORY API ------------------------------- */

export const CATEGORY = {
  GET_CATEGORY: "/service/category",
  ADD_CATEGORY: "/service/add-category",
  PATCH_CATEGORY: "/service/edit-category"
};

/* ------------------------------- SERVICES API ------------------------------- */

export const SERVICES = {
  GET_SERVICE: "/service",
  ADD_SERVICE: "/service/add-service",
  PATCH_SERVICE: "/service/edit-service"
};

/* ------------------------------- SERVICE TYPES API ------------------------------- */

export const SERVICE_TYPES = {
  GET_SERVICE_TYPE: "/service/type-of-service?admin_id=20",
  GET_SERVICE_BY_ID:
    "/service/type-of-service?admin_id=20&type=General Service",
  ADD_SERVICE_TYPE:
    "/service/add-type-of-service/5f7c8564c470ae00a9d02b5e?admin_id=20"
};

/* ------------------------------- VEHICLE API ------------------------------- */

export const VEHICLE = {
  GET_VEHICLE: "/vehicle",
  ADD_VEHICLE: "/vehicle/add-vehicle",
  GET_VEHICLE_BY_ID: "/vehicle",
  PATCH_VEHICLE: "/vehicle/edit-vehicle"
};

/* ------------------------------- VENDOR API ------------------------------- */

export const VENDOR = {
  GET_VENDOR: "/vendor",
  ADD_VENDOR: "/vendor/add-vendor",
  PATCH_VENDOR: "/vendor/edit-vendor"
};

/* ------------------------------- ORDERS API ------------------------------- */

export const ORDERS = {
  GET_ORDERS: "/order-details",
  VERIFY_MOBILE: "/order-details/vendor/message"
};

/* ------------------------------- LOCATION API ------------------------------- */

export const LOCATION = {
  GET_LOCATION: "/service/location",
  POST_LOCATION: "/service/location",
  PATCH_LOCATION: "/service/location"
};

/* ------------------------------- NOTIFICATION API ------------------------------- */

export const NOTIFICATION = {
  GET_NOTIFICATION: "/notification",
  PATCH_NOTIFICATION: "/notification"
};
