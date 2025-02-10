import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  listPaidEnums, 
  createExpenses, 
  expensesDetails, 
  updateExpense 
} from "../../actions/expensesActions";
import { EXPENSES_CREATE_RESET } from "../../constants/expensesConstants";
import { listSetting } from "../../actions/settingAction";
import moment from "moment";
import { useInvalidateAppointments } from "../api/app";

const InvoiceModal = ({ show, onClose, appId , expense}) => {
  console.log(appId)
  const [treatments, setTreatments] = useState([]);
  const [treatmentList, setTreatmentList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Un-paid");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const {
    appointment: { appointment } = {},
  } = vaccineAppList || {};

  const userSetting = useSelector((state) => state.listSetting);
  const { settings } = userSetting;

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { success } = expenseCreate;
 
  const invalidateAppointments = useInvalidateAppointments()

  // Calculate totals dynamically
  const calculateTotals = () => {
    let totalCost = 0, totalDiscount = 0, totalTax = 0;
    treatments.forEach((treatment) => {
      totalCost += treatment.unit * treatment.cost;
      totalDiscount += treatment.discount;
      totalTax += (treatment.unit * treatment.cost * treatment.tax) / 100;
    });
    return { totalCost, totalDiscount, totalTax };
  };
  const totals = calculateTotals();

  // Load data on mount
  useEffect(() => {
    if (userInfo) {
      dispatch(expensesDetails(appId));
      dispatch(listSetting());
    }
  }, [dispatch, userInfo, appId]);

  console.log("billingappointment" , appointment)
  // Populate treatment list from settings
  useEffect(() => {
    if (settings?.data?.treatment) {
      setTreatmentList(settings.data.treatment);
    }
  }, [settings]);
  // Populate data for editing if expense exists
  useEffect(() => {
    if (expense) {
      setTreatments(expense.treatment || []);
      setPaymentMethod(expense.paymentMethod || "Cash");
      setPaymentStatus(expense.paid || "Un-paid");
    }
  }, [expense]);

  // Handle successful creation/reset
  useEffect(() => {
    if (success) {
      dispatch({ type: EXPENSES_CREATE_RESET });
      onClose();
    }
  }, [success, dispatch, onClose]);

  const handleTreatmentChange = (id, field, value) => {
    setTreatments((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, [field]: value }
          : t
      )
    );
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

  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      doctor: appointment?.doctor._id,
      patient: appointment?.patient._id,
      appointment: appId,
      treatment: [...treatments],
      totalCost: totals.totalCost,
      totalDiscount: totals.totalDiscount,
      totalTax: totals.totalTax,
      grandTotal: (
        totals.totalCost -
        totals.totalDiscount +
        totals.totalTax
      ).toFixed(2),
      paymentMethod,
      paid: paymentStatus,
    };

    if (expense) {
      dispatch(updateExpense({ _id : expense._id , ...expenseData }));
    } else {
      dispatch(createExpenses(expenseData));
    }
    invalidateAppointments()
    onClose();
  };

  return (
    <>
      {show && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ overflow: "scroll" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invoice</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <div className="border-bottom pb-3">
                  <h5>Appointment with {appointment?.doctor.name}</h5>
                  <p>{moment(appointment?.date).format("Do MMMM, hh:mm A")}</p>
                </div>
                <div className="invoice-section">
                  <h6>Invoice</h6>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Treatment</th>
                        <th>Unit</th>
                        <th>Cost (₹)</th>
                        <th>Deduct (₹)</th>
                        <th>Tax (%)</th>
                        <th>Total (₹)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treatments.map((treatment) => (
                        <tr key={treatment.id}>
                          <td>
                            <select
                              className="form-select"
                              value={`${treatment.name}-${treatment.cost}`}
                              onChange={(e) => {
                                const [name, cost] = e.target.value.split("-");
                                handleTreatmentChange(treatment.id, "name", name);
                                handleTreatmentChange(treatment.id, "cost", parseFloat(cost));
                              }}
                            >
                              <option disabled value="">
                                Select Treatment
                              </option>
                              {treatmentList.map(({ name, price }) => (
                                <option key={name} value={`${name}-${price}`}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={treatment.unit}
                              onChange={(e) =>
                                handleTreatmentChange(treatment.id, "unit", parseInt(e.target.value, 10))
                              }
                            />
                          </td>
                          <td>{treatment.cost}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={treatment.discount}
                              onChange={(e) =>
                                handleTreatmentChange(treatment.id, "discount", parseFloat(e.target.value))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={treatment.tax}
                              onChange={(e) =>
                                handleTreatmentChange(treatment.id, "tax", parseFloat(e.target.value))
                              }
                            />
                          </td>
                          <td>
                            {(treatment.unit * treatment.cost).toFixed(2)}
                          </td>
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
                <div className="summary-section border-top pt-3">
                  <h6>Summary</h6>
                  <p>Total Cost: ₹{totals.totalCost.toFixed(2)}</p>
                  <p>Total Discount: ₹{totals.totalDiscount.toFixed(2)}</p>
                  <p>Total Tax: ₹{totals.totalTax.toFixed(2)}</p>
                  <p>Grand Total: ₹{(totals.totalCost - totals.totalDiscount + totals.totalTax).toFixed(2)}</p>
                </div>
                <div className="payment-section border-top pt-3">
                  <h6>Payment</h6>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                  <select
                    className="form-select mt-2"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="Un-paid">Un-paid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-footer">
              <button  className="btn btn-primary" onClick={()=>{ navigate(`/print-billing/${appId

              }`)}}>
                                        Print
              </button>
                <button className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button className="btn btn-success" onClick={submitHandler}>
                  Save Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
