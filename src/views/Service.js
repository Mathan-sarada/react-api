import React from "react";
import CommonTable from "../components/common/CommonTable";
import { Service_Api } from "../api/service_api";
import { Category_Api } from "../api/category_api";
import { Vehicle_Api } from "../api/vehicle_api";
import AddServiceDialog from "../components/forms/addService";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";

const HeaderValue1 = [
  "Service Name",
  "Category",
  "Vehicle CC",
  "Description",
  "Price",
  "Status",
  "Actions"
];

const HeaderValue2 = [
  "Service Name",
  "Category",
  "Description",
  "Price",
  "Status",
  "Actions"
];

const Service = () => {
  const [data, setData] = React.useState([]);
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [row, setRow] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const [vehicle, setVehicle] = React.useState([]);
  const [filterOption1, setFilterOption1] = React.useState([]);
  const [filterOption2, setFilterOption2] = React.useState([]);
  const [filterData2, setFilterData2] = React.useState([]);
  const [filterData1, setFilterData1] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const addService = () => {
    setRow(false);
    setmodalOpen(!modalOpen);
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const getData = async () => {
    const res = await Service_Api.Get_Service();
    const category = await Category_Api.Get_Category();
    const vehicle = await Vehicle_Api.Get_Vehicle();
    if (res.code === 200) {
      setData(res.data.message);
      setCategory(category.data.message.filter(x => x.status == true));
      setVehicle(vehicle.data.messsage.filter(x => x.status == true));
      setFilterData1(
        res.data.message.filter(x => x.service_type === "bike service")
      );
      setFilterData2(
        res.data.message.filter(x => x.service_type === "battery service")
      );
      setFilterOption1([
        ...new Set(
          res.data.message
            .filter(x => x.service_type === "bike service")
            .map(function(el) {
              return el.service_name;
            })
        )
      ]);
      setFilterOption2([
        ...new Set(
          res.data.message
            .filter(x => x.service_type === "battery service")
            .map(function(el) {
              return el.service_name;
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
    const res = await Service_Api.Add_Servie(fields);
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

  const Update_Serice = async (fields, id) => {
    setBtnLoading(true);
    const row1 = data.filter(x => x._id === id)[0];
    let data1 = {};
    if (row1.service_name !== fields.data.service_name) {
      data1 = Object.assign(data1, { service_name: fields.data.service_name });
    }
    if (row1.description !== fields.data.description) {
      data1 = Object.assign(data1, { description: fields.data.description });
    }
    if (row1.price !== fields.data.price) {
      data1 = Object.assign(data1, { price: fields.data.price });
    }
    if (row1.tax !== fields.data.tax) {
      data1 = Object.assign(data1, { tax: fields.data.tax });
    }
    if (row1.status !== fields.data.status) {
      data1 = Object.assign(data1, { status: fields.data.status });
    }
    const obj = {
      data: data1
    };
    const res = await Service_Api.Update_Service(row1._id, obj);
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

  const getVehicleCC = async vehicle => {
    const vehicle_cc = await Vehicle_Api.Get_Vehicle_by_name(vehicle);
    if (vehicle_cc.code === 200) {
      return vehicle_cc.data.messsage;
    }
  };

  const onchangeOption1 = (e, opt) => {
    if (opt) {
      setSelected(opt);
      setFilterData1(
        data.filter(
          x => x.service_name === opt && x.service_type === "bike service"
        )
      );
    } else {
      setFilterData1(data.filter(x => x.service_type == "bike service"));
    }
  };

  const onchangeOption2 = (e, opt) => {
    if (opt) {
      setSelected(opt);
      setFilterData2(
        data.filter(
          x => x.service_name === opt && x.service_type === "battery service"
        )
      );
    } else {
      setFilterData2(data.filter(x => x.service_type == "battery service"));
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
        data={filterData1}
        Header={HeaderValue1}
        selected={selected}
        filterOption={filterOption1}
        onchangeOption={(e, opt) => onchangeOption1(e, opt)}
        Update={row => Update(row)}
        buttonLabel={"Add Service"}
        onClick={res => addService(res)}
      />
      <CommonTable
        loading={loading}
        data={filterData2}
        Header={HeaderValue2}
        selected={selected}
        page={"service"}
        filterOption={filterOption2}
        onchangeOption={(e, opt) => onchangeOption2(e, opt)}
        Update={row => Update(row)}
        buttonLabel={"Add Service"}
        onClick={res => addService(res)}
      />
      {modalOpen && (
        <AddServiceDialog
          closeModal={closeModal}
          fields={row}
          showToast={showToast}
          vehicleCC={vehicle => getVehicleCC(vehicle)}
          category={category}
          vehicle={vehicle}
          btnLoading={btnLoading}
          update={(updated, id) => Update_Serice(updated, id)}
          submit={fields => submit(fields)}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </React.Fragment>
  );
};

export default Service;
