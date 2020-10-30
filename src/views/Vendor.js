import React from "react";
import CommonTable from "../components/common/CommonTable";
import AddVendorDialog from "../components/forms/addVendor";
import { Vendor_Api } from "../api/vendor_api";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";

const HeaderValue = ["Vendor Name", "Mobile", "Email", "Location", "Action"];

const Vendor = props => {
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [row, setRow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filterOption, setFilterOption] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const addVendor = () => {
    setRow(false);
    setmodalOpen(!modalOpen);
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const getData = async () => {
    const res = await Vendor_Api.Get_Vendor();
    if (res.code === 200) {
      setData(res.data.message);
      setFilterData(res.data.message);
      setFilterOption([
        ...new Set(
          res.data.message.map(function(el) {
            return el.vendor_name;
          })
        )
      ]);
      setLoading(false);
    } else {
      setLoading(false);
      return [];
    }
  };

  const submit = async fields => {
    setBtnLoading(true);
    const res = await Vendor_Api.Add_Vendor(fields);
    if (res.code === 200) {
      setmodalOpen(false);
      setBtnLoading(false);
      showToast(requestDataFormat.errorHandler(res.data.message));
      getData();
    } else {
      setBtnLoading(false);
      showToast(res.data.error.message);
    }
  };

  const Update = row => {
    setRow(row);
    setmodalOpen(true);
  };

  const Update_Vendor = async (fields, id) => {
    setBtnLoading(true);
    const row1 = data.filter(x => x._id === id)[0];
    let data1 = {};
    if (row1.vendor_name !== fields.data.vendor_name) {
      data1 = Object.assign(data1, { vendor_name: fields.data.vendor_name });
    }
    if (row1.email !== fields.data.email) {
      data1 = Object.assign(data1, { email: fields.data.email });
    }
    if (row1.mobile !== fields.data.mobile) {
      data1 = Object.assign(data1, { mobile: fields.data.mobile });
    }
    if (row1.location !== fields.data.location) {
      data1 = Object.assign(data1, { location: fields.data.location });
    }
    const obj = {
      data: data1
    };
    const res = await Vendor_Api.Update_Vendor(row1._id, obj);
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

  const onchangeOption = (e, opt) => {
    if (opt) {
      setSelected(opt);
      setFilterData(data.filter(x => x.vendor_name === opt));
    } else {
      setFilterData(data);
    }
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
    <React.Fragment>
      <CommonTable
        loading={loading}
        Header={HeaderValue}
        data={filterData}
        selected={selected}
        filterOption={filterOption}
        onchangeOption={(e, opt) => onchangeOption(e, opt)}
        buttonLabel={"Add Vendor"}
        Update={row => Update(row)}
        onClick={res => addVendor(res)}
      />
      {modalOpen && (
        <AddVendorDialog
          closeModal={closeModal}
          fields={row}
          showToast={showToast}
          btnLoading={btnLoading}
          update={(updated, id) => Update_Vendor(updated, id)}
          submit={fields => submit(fields)}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </React.Fragment>
  );
};

export default Vendor;
