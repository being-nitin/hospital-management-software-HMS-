import React, { useState , useEffect} from "react";
import { listPaidEnums, createExpenses } from "../actions/expensesActions";
import { useNavigate , useParams} from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { EXPENSES_CREATE_RESET } from "../constants/expensesConstants";
import {
  detailsVacApp,
  updateVacApp,
} from "../actions/vaccineAppointmentActions";
import moment from "moment"
import { listSetting } from "../actions/settingAction";

const InvoiceLayout = () => {
  const [treatments, setTreatments] = useState([]);
  const [treatmentList, setTreatmentList] = useState([])
  const [selectedTreatment, setSelectedTreatment] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {id} = useParams()
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Helper to calculate total cost
  const calculateTotals = () => {
    let totalCost = 0,
      totalDiscount = 0,
      totalTax = 0;
      treatments.forEach((treatment) => {
      console.log(treatment.discount)
      totalCost += treatment.unit * treatment.cost;
      totalDiscount += (treatment.unit * treatment.cost * treatment.discount) / 100;
      console.log(totalDiscount)
      totalTax += (treatment.unit * treatment.cost * treatment.tax) / 100;
    });
    return { totalCost, totalDiscount, totalTax };
  };

  const totals = calculateTotals();

  const handleTreatmentChange = (id, field, value) => {
 
      setTreatments((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                [field]: value
               
              }
            : t
        ))
    
  };

  const handleAddTreatment = () => {
    setTreatments((prev) => [
      ...prev,
      { id: Date.now(), name: "", unit: 1, cost: 0, discount: 0, tax: 0 },
    ]);
  };

  const handleRemoveTreatment = (id) => {
    setTreatments((prev) => prev.filter((t) => t.id !== id));
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { error, loading, success } = expenseCreate;

  const expensesPaid = useSelector((state) => state.expensesPaid);
  const { pays } = expensesPaid;

  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const {
    appointment: { appointment, pastAppointments } = {},
  } = vaccineAppList || {};

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
      dispatch(listSetting())
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listPaidEnums());

      if (success) {
        dispatch({ type: EXPENSES_CREATE_RESET });
        navigate("/list-expenses");
      }
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createExpenses({
        doctor : appointment?.doctor._id,
        patient: appointment?.patient._id,
        appointment : id,
        treatment : [...treatments],
        totalCost : totals.totalCost,
        totalDiscount : totals.totalDiscount,
        totalTax : totals.totalTax,
        grandTotal : (totals.totalCost - totals.totalDiscount + totals.totalTax).toFixed(2),
        paymentMethod : paymentMethod
      })
    );
  };
    
  const userSetting = useSelector((state) => state.listSetting);
  const { settings } = userSetting;
  
  useEffect(() => {
    if (settings?.data.treatment) {
        setTreatmentList(settings.data.treatment);
    }
  }, [settings]);



  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="border-bottom pb-3">
        <h5>Appointment with {appointment?.doctor.name}</h5>
        <p>{moment(appointment?.created_at).format("Do MMMM, hh:mm A")}</p>
      </div>

      {/* Invoice Section */}
      <div className="invoice-section">
        <h6>Invoice</h6>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Unit</th>
              <th>Cost (₹)</th>
              <th>Discount (%)</th>
              <th>Tax (%)</th>
              <th>Total (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment) => (
              <tr key={treatment.id}>
                <td>
                  {/* <input
                    type="text"
                    className="form-control"
                    value={treatment.name}
                    onChange={(e) =>
                      handleTreatmentChange(treatment.id, "name", e.target.value)
                    }
                  /> */}
                 
                  <select className="form-select form-control" aria-label="Default select example"  
                  onChange={(e)=>{
                    setSelectedTreatment(e.target.value)
                    
                  }}>
                    <option selected disabled>Select Treatment</option>
                    {
                      treatmentList && treatmentList?.map(({name, price})=>{
                        return <option value={name} key={name} 
                      >{name}-{price}</option>
                      })
                    }
                  </select>
              
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={treatment.unit}
                    onChange={(e) =>
                      handleTreatmentChange(treatment.id, "unit", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={treatment.cost}
                    onChange={(e) =>
                      handleTreatmentChange(treatment.id, "cost", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={treatment.discount}
                    onChange={(e) =>
                      handleTreatmentChange(treatment.id, "discount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={treatment.tax}
                    onChange={(e) =>
                      handleTreatmentChange(treatment.id, "tax", e.target.value)
                    }
                  />
                </td>
                <td>{treatment.unit * treatment.cost}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveTreatment(treatment.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary btn-sm" onClick={handleAddTreatment}>
          Add Treatment
        </button>
      </div>

      {/* Summary Section */}
      <div className="summary-section border-top pt-3">
        <h6>Summary</h6>
        <div className="row">
          <div className="col-6">
            <p>Total Cost: ₹{totals.totalCost.toFixed(2)}</p>
            <p>Total Discount: ₹{totals.totalDiscount.toFixed(2)}</p>
          </div>
          <div className="col-6">
            <p>Total Tax: ₹{totals.totalTax.toFixed(2)}</p>
            <p>Grand Total: ₹
              {(totals.totalCost - totals.totalDiscount + totals.totalTax).toFixed(
                2
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="payment-section mt-3 border-top pt-3">
        <h6>Payment</h6>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-success" onClick={submitHandler}>Accept Payment</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLayout;
