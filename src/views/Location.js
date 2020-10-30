import React from "react";
import CommonTable from "../components/common/CommonTable";
import AddLocationDialog from "../components/forms/addLocation";
import { Location_Api } from "../api/location_api";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";

const HeaderValue = ["Location", "Status", "Action"];

const Location = props => {
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

  const addLocation = () => {
    setRow(false);
    setmodalOpen(!modalOpen);
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const getData = async () => {
    const res = await Location_Api.Get_Location();
    if (res.code === 200) {
      setData(res.data.message);
      setFilterData(res.data.message);
      setFilterOption([
        ...new Set(
          res.data.message.map(function(el) {
            return el.location;
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
    const res = await Location_Api.Add_Location(fields);
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

  const Update_Location = async (fields, id) => {
    setBtnLoading(true);
    const row1 = data.filter(x => x._id === id)[0];
    let data1 = {};
    if (row1.location !== fields.data.location) {
      data1 = Object.assign(data1, { location: fields.data.location });
    }
    if (row1.status !== fields.data.status) {
      data1 = Object.assign(data1, { status: fields.data.status });
    }
    const obj = {
      data: data1
    };
    if (Object.keys(obj).length !== 0) {
      const res = await Location_Api.Update_Location(obj, row1._id);
      if (res.code === 200) {
        setmodalOpen(false);
        setBtnLoading(false);
        showToast(requestDataFormat.errorHandler(res.data.message));
        getData();
      } else {
        showToast(requestDataFormat.errorHandler(res.data.error.message));
        setBtnLoading(false);
      }
    }
  };

  const onchangeOption = (e, opt) => {
    if (opt) {
      setSelected(opt);
      setFilterData(data.filter(x => x.location === opt));
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
        buttonLabel={"Add Location"}
        Update={row => Update(row)}
        onClick={res => addLocation(res)}
      />
      {modalOpen && (
        <AddLocationDialog
          closeModal={closeModal}
          fields={row}
          showToast={showToast}
          btnLoading={btnLoading}
          update={(updated, id) => Update_Location(updated, id)}
          submit={fields => submit(fields)}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </React.Fragment>
  );
};

export default Location;
