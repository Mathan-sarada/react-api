import React from "react";
import CommonTable from "../components/common/CommonTable";
import AddCategoryDialog from "../components/forms/addCategory";
import { Category_Api } from "../api/category_api";
import BPNotification from "../components/common/BPNotification";
import { requestDataFormat } from "../components/common/ErrorFormat";
const HeaderValue = ["Category", "Status", "Actions"];

const Category = () => {
  const [modalOpen, setmodalOpen] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState(false);
  const [filterOption, setFilterOption] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const addCategoty = () => {
    setRow(false);
    setmodalOpen(!modalOpen);
  };

  const closeModal = () => {
    setmodalOpen(!modalOpen);
  };

  const getData = async () => {
    const res = await Category_Api.Get_Category();
    if (res.code === 200) {
      setData(res.data.message);
      setFilterData(res.data.message);
      setFilterOption([
        ...new Set(
          res.data.message.map(function(el) {
            return el.category_name;
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
    const res = await Category_Api.Add_Category(fields);
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

  const Update = row => {
    setRow(row);
    setmodalOpen(true);
  };

  const Update_Category = async (fields, id) => {
    setBtnLoading(true);
    const row1 = data.filter(x => x._id === id)[0];
    let data1 = {};
    if (row1.category_name !== fields.data.category_name) {
      data1 = Object.assign(data1, {
        category_name: fields.data.category_name
      });
    }
    if (row1.status !== fields.data.status) {
      data1 = Object.assign(data1, { status: fields.data.status });
    }
    const obj = {
      data: data1
    };
    const res = await Category_Api.Update_Category(obj, id);
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
      setFilterData(data.filter(x => x.category_name === opt));
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
        buttonLabel={"Add Category"}
        onClick={() => addCategoty()}
        data={filterData}
        selected={selected}
        filterOption={filterOption}
        onchangeOption={(e, opt) => onchangeOption(e, opt)}
        Update={row => Update(row)}
      />
      {modalOpen && (
        <AddCategoryDialog
          closeModal={closeModal}
          btnLoading={btnLoading}
          fields={row}
          showToast={showToast}
          update={(updated, id) => Update_Category(updated, id)}
          submit={fields => submit(fields)}
        />
      )}
      {successModal && <BPNotification message={message} />}
    </React.Fragment>
  );
};

export default Category;
