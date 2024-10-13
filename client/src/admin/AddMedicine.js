import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../core/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listVendors } from "../actions/vendorsActions";
import { listTypesEnums, createMedicine } from "../actions/medicineActions";
import { CREATE_MEDICINE_RESET } from "../constants/medicineConstants";

const AddMedicine = ({ history: history1 }) => {
  const [name, setName] = useState("Panadol");
  const [genericName, setGenericName] = useState("Paracetamol");
  const [batchNo, setBatchNo] = useState(567732435);
  const [barCode, setBarCode] = useState(5675467);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [unitWeight, setUnitWeight] = useState(1);
  const [type, setType] = useState("");
  const [manDate, setManDate] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());
  const [cost, setCost] = useState(2200);
  const [retailCost, setRetailCost] = useState(1700);
  const [effects, setEffects] = useState("Dizzy");
  const [vendor, setVendor] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const medicineType = useSelector((state) => state.medicineType);
  const { types } = medicineType;
  console.log(types);

  const medicineCreate = useSelector((state) => state.medicineCreate);
  const { error, loading, success } = medicineCreate;

  const vendorsList = useSelector((state) => state.vendorsList);
  const { vendors } = vendorsList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTypesEnums());
      dispatch(listVendors());

      if (success) {
        dispatch({ type: CREATE_MEDICINE_RESET });
        history1.push("/list/medicine");
      }
    } else {
      history1.push("/signin");
    }
  }, [dispatch, userInfo, success]);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createMedicine({
        name,
        genericName,
        batchNo,
        barCode,
        description,
        quantity,
        unitWeight,
        type,
        manDate,
        expDate,
        cost,
        retailCost,
        effects,
      })
    ); // vendor is missing
  };
  const formContainerStyles = {
    maxWidth: "1100px", // Increased max width for more spacious form layout
    margin: "0 auto", // Center the form horizontally
    padding: "40px", // Add some padding around the form
    borderRadius: "10px", // Rounded corners for the container
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a classy effect
    backgroundColor: "#f9f9f9", // Light background color to make it stand out
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    transition: "border-color 0.2s ease-in-out",
  };

  const selectStyles = {
    ...inputStyles,
    padding: "5px",
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const textareaStyles = {
    ...inputStyles, // Apply similar styles to textareas for consistency
    resize: "vertical", // Allow resizing vertically only
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  // Add hover effect for button
  buttonStyles[":hover"] = {
    backgroundColor: "#0056b3",
  };

  const formGroupStyles = {
    marginBottom: "20px",
  };

  const AddMedicineForm = () => (
    <div className="form-group col-md-12" style={formContainerStyles}>
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-3" style={formGroupStyles}>
            <label htmlFor="inputAddress">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g Panadol"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div className="form-group col-md-3" style={formGroupStyles}>
            <label htmlFor="inputAddress">Generic Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g Paracetamol"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div className="form-group col-md-3" style={formGroupStyles}>
            <label htmlFor="inputAddress">Batch No</label>
            <input
              type="text"
              className="form-control"
              placeholder="batch no"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div className="form-group col-md-3" style={formGroupStyles}>
            <label htmlFor="inputAddress">Bar Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="barcode no"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              style={inputStyles}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4" style={formGroupStyles}>
            <label htmlFor="inputAddress">Quantity</label>
            <input
              type="text"
              className="form-control"
              placeholder="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div className="form-group col-md-4" style={formGroupStyles}>
            <label htmlFor="inputAddress">Unit Weight</label>
            <input
              type="text"
              className="form-control"
              placeholder="weight"
              value={unitWeight}
              onChange={(e) => setUnitWeight(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div className="form-group col-md-4" style={formGroupStyles}>
            <label htmlFor="exampleFormControlSelect1">Type</label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="form-control"
              id="exampleFormControlSelect1"
              style={selectStyles}
            >
              <option>Select Type</option>
              {types &&
                types.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6" style={formGroupStyles}>
            <label htmlFor="inputAddress">Manufacture </label>
            <DatePicker
              selected={manDate}
              onChange={(date) => setManDate(date)}
              className="form-control"
              style={inputStyles}
            />
          </div>

          <div className="form-group col-md-6" style={formGroupStyles}>
            <label htmlFor="inputAddress">Expiry</label>
            <DatePicker
              selected={expDate}
              onChange={(date) => setExpDate(date)}
              className="form-control"
              style={inputStyles}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6" style={formGroupStyles}>
            <label htmlFor="inputAddress">Cost</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g ksh 2500"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              style={inputStyles}
            />
          </div>

          <div className="form-group col-md-6" style={formGroupStyles}>
            <label htmlFor="inputAddress">Retail Cost</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g ksh 1700"
              value={retailCost}
              onChange={(e) => setRetailCost(e.target.value)}
              style={inputStyles}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4" style={formGroupStyles}>
            <label className="text-muted">Vendor</label>
            <select
              onChange={(e) => setVendor(e.target.value)}
              className="form-control"
              style={selectStyles}
            >
              <option>Select Vendor</option>
              {vendors &&
                vendors.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group col-md-4" style={formGroupStyles}>
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write description"
              rows="3"
              style={textareaStyles}
            />
          </div>

          <div className="form-group col-md-4" style={formGroupStyles}>
            <label htmlFor="exampleFormControlTextarea1">Effects</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={effects}
              onChange={(e) => setEffects(e.target.value)}
              placeholder="write effects"
              rows="3"
              style={textareaStyles}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={buttonStyles}>
          Save
        </button>
      </form>
    </div>
  );

  return (
    <Layout title="Category treatment Form">
      <>
        <h2 className="mb-4">Add Medicine</h2>
        {showError()}
        {showLoading()}
        {AddMedicineForm()}
      </>
    </Layout>
  );
};

export default AddMedicine;
