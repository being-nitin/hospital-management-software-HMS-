import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { expensesDetails } from "../../actions/expensesActions"
import { detailsVacApp } from "../../actions/vaccineAppointmentActions";
import moment from "moment";
import PrintLayout from "../../core/printLayout";

const ExpenseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract the expense ID from the route

  // Access expense details from the Redux store
  const expenseDetail = useSelector((state) => state.expenseDetail);
  const { expense } = expenseDetail;

  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
    const {
      appointment: { appointment } = {},
    } = vaccineAppList || {};
  useEffect(() => {
    if (id) {
        dispatch(detailsVacApp(id));
      dispatch(expensesDetails(id)); // Fetch expense details
    }
  }, [dispatch, id]);

 
  const expenseview = () =>{
       return `<div style = "padding : 24px;">
       <div style="border-bottom: 1px solid #ccc; padding-bottom: 16px;">
  <h5>Appointment with ${appointment?.doctor.name}</h5>
  <p>${moment(appointment?.created_at).format("Do MMMM, hh:mm A")}</p>
</div>

<div style="margin-top: 24px;">
  <h4>Invoice</h4>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
    <thead>
      <tr style="background-color: #f9f9f9;">
        <th style="border: 1px solid #ddd; padding: 8px;">Treatment</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Unit</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Cost (₹)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Discount (%)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Tax (%)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Total (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${expense?.treatment
        ?.map(
          (item) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.unit}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.cost}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.discount}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.tax}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            item.unit * item.cost
          }</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>

<div style="margin-top: 24px; border-top: 1px solid #ccc; padding-top: 16px;">
  <h4>Summary</h4>
  <div style="display: flex; justify-content: space-between;">
    <div>
      <p>Total Cost: ₹${expense?.totalCost}</p>
      <p>Total Discount: ₹${expense?.totalDiscount}</p>
    </div>
    <div>
      <p>Total Tax: ₹${expense?.totalTax}</p>
      <p>Grand Total: ₹${expense?.grandTotal}</p>
    </div>
  </div>
</div>

<div style="margin-top: 24px; border-top: 1px solid #ccc; padding-top: 16px;">
  <h4>Payment</h4>
  <p>Payment Method: ${expense?.paymentMethod}</p>
  <p>Status: ${expense?.paid}</p>
</div>

`
  }

  return (
    <div className="container mt-4">
      <PrintLayout html={expenseview} category={'expense'}></PrintLayout>
      <div className="border-bottom pb-3">
        <div className="border-bottom pb-3">
            <h5>Appointment with {appointment?.doctor.name}</h5>
            <p>{moment(appointment?.created_at).format("Do MMMM, hh:mm A")}</p>
        </div>
      </div>

      <div className="invoice-section mt-3">
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
            </tr>
          </thead>
          <tbody>
            {expense?.treatment?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.cost}</td>
                <td>{item.discount}</td>
                <td>{item.tax}</td>
                <td>{item.unit * item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section mt-3 border-top pt-3">
        <h6>Summary</h6>
        <div className="row">
          <div className="col-6">
            <p>Total Cost: ₹{expense?.totalCost}</p>
            <p>Total Discount: ₹{expense?.totalDiscount}</p>
          </div>
          <div className="col-6">
            <p>Total Tax: ₹{expense?.totalTax}</p>
            <p>Grand Total: ₹{expense?.grandTotal}</p>
          </div>
        </div>
      </div>

      <div className="payment-section mt-3 border-top pt-3">
        <h6>Payment</h6>
        <p>Payment Method: {expense?.paymentMethod}</p>
        <p>Status: {expense?.paid}</p>
      </div>
    </div>
  );
};

export default ExpenseDetail;
