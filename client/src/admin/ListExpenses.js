import React, { Fragment, useEffect } from "react";
import Layout from "../core/Layout";
import { listExpenses, deleteExpenses } from "../actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";


const ListExpenses = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expenseList = useSelector((state) => state.expenseList);
  const { loading, error, expenses } = expenseList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expensesDelete = useSelector((state) => state.expensesDelete);
  const { success: successDelete } = expensesDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listExpenses());
    } else {
      navigate("/signin");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      dispatch(deleteExpenses(id));
    }
  };

 

  return (
    <Layout
      title=""
      description="list treatment categories"
      className="container-fluid"
    >
        <div className="row">
          <div className="container mt-5">
      <h2 className="mb-4">Expense List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>patient</th>
            <th>Date</th>
            <th>Grand Total</th>
            <th>Paid</th>
            <th>Payment Method</th>
            <th>Total Cost</th>
 
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{expense?.doctor.name}</td>
              <td>{expense?.patient.firstName + "-" + expense?.patient.patientNumber}</td>
              <td>{moment(expense.created_at).format('DD-MM-YYYY')}</td>
              <td>${expense.grandTotal}</td>
              <td>{expense.paid}</td>
              <td>{expense.paymentMethod}</td>
              <td>${expense.totalCost}</td>
            
              <td>
                          <Link to={`/update-expenses/${expense._id}`}>
                            <i className="bi bi-pencil-square" />
                          </Link>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            onClick={() => deleteHandler(expense._id)}
                          />
                        </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
        </div>
    
    </Layout>
  );
};

export default ListExpenses;
