export const requestDataFormat = {
  errorHandler: function(msg) {
    let error = "";
    const resType = typeof msg;
    if (resType === "object") {
      Object.keys(msg).forEach(key => {
        error = msg[key];
      });
    } else {
      error = msg;
    }
    return error;
  }
};
