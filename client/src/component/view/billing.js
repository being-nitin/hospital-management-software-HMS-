import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { expensesDetails } from "../../actions/expensesActions"
import { detailsVacApp } from "../../actions/vaccineAppointmentActions";
import moment from "moment";
import PrintLayout from "../../core/printLayout";
import dayjs from "dayjs";

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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  const expenseview = () =>{
       return `<div style = "padding : 24px; padding-top : 30px;">
        <div style="display: flex; justify-content: space-between;">
      <div style="border-radius: 8px; width: 45%;">
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Patient Name:</span> ${appointment?.patient?.firstName + " " + appointment?.patient?.lastName}
        </p>
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Mobile No :</span> ${appointment?.patient?.phoneNo}
        </p>
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Address :</span> ${appointment?.patient?.address.toUpperCase()}
        </p>
      </div>
      <div style="border-radius: 8px; width: 45%;">
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Age/Gender : </span>${getAge(appointment.patient.birthDate) + " / " + appointment.patient.gender}
        </p>
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Patient ID:</span> ${appointment?.patient?.patientNumber}
        </p>
        <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">Date and Time:</span> ${dayjs(appointment?.date?.toLocaleString()).format("DD-MM-YYYY") + "/" + appointment.time}
        </p>
      </div>
        </div>
          <p style="color: grey; font-size: 14px;">
          <span style="color: #0288d1;">By:</span>Dr. ${appointment.doctor.name}
        </p>
        <hr/>

<div style="margin-top: 15px; max-width : 900px;">
  <h5>Invoice</h5>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
    <thead>
      <tr style="background-color: #f2f2f2; text-align: left;">
        <th style="border: 1px solid #ddd; padding: 8px;">#</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Treatments & Products</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Unit Cost (₹)</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Qty</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Total Cost (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${expense?.treatment?.map((item, index) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.cost}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.unit}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.unit * item.cost}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>

<div style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;max-width:900px;">
  <h5 style="font-weight: 700;">Summary</h5>
  <div style="display: flex; justify-content: space-between;">
    <div>
      <p>Total Cost: ₹${expense?.totalCost}</p>
      <p>Discount: ₹${expense?.totalDiscount}</p>
      <p>Tax: ₹${expense?.totalTax}</p>
    </div>
    <div>
      <p>Grand Total: ₹${expense?.grandTotal}</p>
    </div>
  </div>
</div>

<div style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
  <h5 style="font-weight: 700;">Payment Details</h5>
  <p>Receipt Number: R#12345</p>
  <p>Mode of Payment: ${expense?.paymentMethod}</p>
  <p>Amount Paid: ₹${expense?.grandTotal}</p>
</div>


`
  }

  return (
    <div className="container mt-4">
      <PrintLayout html={expenseview} category={'expense'}></PrintLayout>
      {appointment && <><div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ borderRadius: '8px', width: '45%' }}>
              <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Patient Name:</span> {appointment?.patient?.firstName +
                      " " +
                      appointment?.patient?.lastName}
              </p>
              <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Mobile No :</span> {appointment?.patient?.phoneNo}
              </p>
              <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Address :</span> {appointment?.patient?.address.toUpperCase()}
              </p>
            </div>
            <div style={{ borderRadius: '8px', width: '45%' }}>
            <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Age/Gender : </span>{getAge(appointment.patient.birthDate) + " / " +appointment.patient.gender}
              </p>
              <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Patient ID:</span> 	{appointment?.patient?.patientNumber}
              </p>
              <p style={{ color: 'grey', fontSize: '14px' }}>
                <span style={{ color: '#0288d1' }}>Date and Time:</span>     {dayjs(
                                      appointment?.date?.toLocaleString()
                                    ).format("DD-MM-YYYY") + "/" + appointment.time}
              </p>
            
            </div>
           
          </div>
   <p style={{ color: 'grey', fontSize: '14px' }}>
            <span style={{ color: '#0288d1' }}>By:</span> 	Dr.{appointment?.doctor?.name}
          </p>
          </>}
        <hr/>
        <div className="invoice-section mt-3">
  <h5>Invoice</h5>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Treatments & Products</th>
        <th>Unit Cost (₹)</th>
        <th>Qty</th>
        <th>Total Cost (₹)</th>
      </tr>
    </thead>
    <tbody>
      {expense?.treatment?.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.cost}</td>
          <td>{item.unit}</td>
          <td>{item.unit * item.cost}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="summary-section mt-3 border-top pt-3">
  <h5 style={{ fontWeight : 700}}>Summary</h5>
  <div className="row">
    <div className="col-6">
      <p>Total Cost: ₹{expense?.totalCost}</p>
      <p>Discount: ₹{expense?.totalDiscount}</p>
      <p>Tax: ₹{expense?.totalTax}</p>
    </div>
    <div className="col-6">
      <p>Grand Total: ₹{expense?.grandTotal}</p>
      
    </div>
  </div>
</div>

<div className="payment-section mt-3 border-top pt-3">
  <h5 style={{ fontWeight : 700}}>Payment Details</h5>
  <p>Receipt Number: {"R#12345"}</p>
  <p>Mode of Payment: {expense?.paymentMethodt}</p>
  <p>Amount Paid: ₹{expense?.grandTotal}</p>
</div>
    </div>
  );
};

export default ExpenseDetail;
