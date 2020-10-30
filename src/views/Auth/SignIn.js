import React from "react";
import store from "store";
import { useHistory } from "react-router-dom";
import Login from "../../components/forms/Login";
import { User_api } from "../../api/user_api";
import BPSuccessNotification from "../../components/common/BPNotification";
import { requestDataFormat } from "../../components/common/ErrorFormat";

const SignIn = () => {
  const [successModal, setSuccessModal] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const history = useHistory();
  const [btnLoading, setBtnLoading] = React.useState(false);

  const submit = async (fields, id) => {
    setBtnLoading(true);
    const res = await User_api.SignIn(fields, id);
    if (res.code !== 200) {
      setMessage(requestDataFormat.errorHandler(res.data.error.message));
      setBtnLoading(false);
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
      }, 3000);
    } else {
      store.set("apiKey", { apiKey: res.data.error.apiKey });
      store.set("secretKey", { secretKey: res.data.error.secretKey });
      store.set("adminKey", { adminKey: res.data.error.adminKey });
      setBtnLoading(false);
      history.push(`/vendor`);
    }
  };

  return (
    <React.Fragment>
      <Login btnLoading={btnLoading} submit={submit} />
      {successModal && <BPSuccessNotification message={message} />}
    </React.Fragment>
  );
};

export default SignIn;
