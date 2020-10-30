import React, { Fragment } from "react";
import CommonTable from "../components/common/CommonTable";
import { Orders_Api } from "../api/orders_api";
import { Service_Api } from "../api/service_api";
import { Vendor_Api } from "../api/vendor_api";
import AddMobileDialog from "../components/forms/addMobile";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";

const HeaderValue = [
  "Customer Number",
  "Service Type",
  "Location",
  "Status",
  "Date",
  "Action"
];

const HeaderValue1 = [
  "Service Name",
  "Type",
  "CC",
  "Order Details",
  "Amount",
  "Status",
  "Date",
  "Action"
];

const Orders = () => {
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [orderData, setOrderData] = React.useState([]);
  const [viewData, setViewData] = React.useState([]);
  const [service, setService] = React.useState([]);
  const [mobile, setMobile] = React.useState([]);
  const [vendor, setVendor] = React.useState([]);
  const [successModal, setSuccessModal] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [btnLoading, setBtnLoading] = React.useState(false);

  const getData = async () => {
    const orders = await Orders_Api.Get_Orders();
    const service = await Service_Api.Get_Service();
    const vendor = await Vendor_Api.Get_Vendor();
    if (orders.code === 200) {
      const result = [];
      setData(orders.data.message);
      setService(service.data.message);
      setVendor(vendor.data.message);
      if (orders.data.message.length > 0) {
        orders.data.message.map(x => {
          x.orderDetails[0].orderId = x._id;
          result.push(x.orderDetails[0]);
        });
      }
      setOrderData(result);
      setLoading(false);
    } else {
      setLoading(false);
      return [];
    }
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const submit = async fields => {
    setBtnLoading(true);
    const res = await Orders_Api.verifyMobile(orderId, fields);
    if (res.code === 200) {
      setmodalOpen(false);
      setBtnLoading(false);
      showToast(requestDataFormat.errorHandler(res.data.message));
      getData();
    } else {
      showToast(requestDataFormat.errorHandler(res.data.error.message));
      setBtnLoading(false);
    }
  };

  const Update = mobile => {
    setMobile(mobile);
    setmodalOpen(true);
  };

  const viewOrder = id => {
    setOrderId(id);
    const res = data.filter(x => x._id == id);
    setViewData(res[0].orderDetails);
    setView(true);
  };

  const showToast = msg => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
    setMessage(msg);
  };

  React.useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <Fragment>
      <CommonTable
        loading={loading}
        Header={HeaderValue}
        data={orderData}
        page="orders"
        view={viewOrder}
      />
      {view && (
        <CommonTable
          loading={loading}
          Update={Update}
          vendor={vendor}
          service={service}
          Header={HeaderValue1}
          viewData={viewData}
          page="viewOrders"
        />
      )}
      {modalOpen && (
        <AddMobileDialog
          closeModal={closeModal}
          mobile={mobile}
          btnLoading={btnLoading}
          submit={fields => submit(fields)}
          showToast={showToast}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </Fragment>
  );
};

export default Orders;
