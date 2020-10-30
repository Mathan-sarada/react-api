import React from "react";
import CommonTable from "../components/common/CommonTable";
import AddVehicleDialog from "../components/forms/addVehicle";
import { Vehicle_Api } from "../api/vehicle_api";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";

const HeaderValue = ["Vehicle CC", "Status", "Actions"];

const Vehicle = props => {
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

  const addVehicle = () => {
    setRow(false);
    setmodalOpen(!modalOpen);
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const getData = async () => {
    const res = await Vehicle_Api.Get_Vehicle();
    if (res.code === 200) {
      setData(res.data.messsage);
      setFilterData(res.data.messsage);
      setFilterOption([
        ...new Set(
          res.data.messsage.map(function(el) {
            return el.vehicle_cc;
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
    const res = await Vehicle_Api.Add_Vehicle(fields);
    if (res.code === 200) {
      setmodalOpen(false);
      setBtnLoading(false);
      showToast(requestDataFormat.errorHandler(res.data.message));
      getData();
    } else {
      setBtnLoading(false);
      showToast(requestDataFormat.errorHandler(res.data.error.message));
    }
  };

  const Update = row => {
    setRow(row);
    setmodalOpen(true);
  };

  const Update_Vehicle = async (fields, id) => {
    setBtnLoading(true);
    const row1 = data.filter(x => x._id === id)[0];
    let data1 = {};
    if (row1.vehicle_name !== fields.data.vehicle_name) {
      data1 = Object.assign(data1, { vehicle_name: fields.data.vehicle_name });
    }
    if (row1.vehicle_cc !== fields.data.vehicle_cc) {
      data1 = Object.assign(data1, { vehicle_cc: fields.data.vehicle_cc });
    }
    if (row1.status !== fields.data.status) {
      data1 = Object.assign(data1, { status: fields.data.status });
    }
    const obj = {
      data: data1
    };
    const res = await Vehicle_Api.Update_Vehicle(row1._id, obj);
    if (res.code === 200) {
      setmodalOpen(false);
      showToast(requestDataFormat.errorHandler(res.data.message));
      setBtnLoading(false);
      getData();
    } else {
      showToast(requestDataFormat.errorHandler(res.data.error.message));
      setBtnLoading(false);
    }
  };

  const onchangeOption = (e, opt) => {
    if (opt) {
      setSelected(opt);
      setFilterData(data.filter(x => x.vehicle_cc === opt));
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
        buttonLabel={"Add Vehicle"}
        Update={row => Update(row)}
        onClick={res => addVehicle(res)}
      />
      {modalOpen && (
        <AddVehicleDialog
          closeModal={closeModal}
          btnLoading={btnLoading}
          showToast={showToast}
          fields={row}
          update={(updated, id) => Update_Vehicle(updated, id)}
          submit={fields => submit(fields)}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </React.Fragment>
  );
};

export default Vehicle;
