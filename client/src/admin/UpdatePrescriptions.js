import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Layout from "../core/Layout";
import { prescriptionDetails, updatePrescription, listEnumsPrescriptions, listPaidEnums  } from '../actions/prescriptionActions'
import {UPDATE_PRESCRIPTION_RESET} from "../constants/prescriptionConstants";
import { listTreatments } from '../actions/treatmentActions'
import {listCatTests} from '../actions/testActions'
import { listUsers  } from '../actions/userActions'

const UpdatePrescriptions = ({ history: history1, match }) => {

    const id = match.params.id
    
    const [user, setUser] = useState('')
    const [treatment, setTreatment] = useState('')
    const [medicine, setMedicine] = useState('')
    const [time, setTime] = useState(0)
    const [days, setDays] = useState(0)
    const [take, setTake] = useState('')
    const [test, setTest] = useState('')
    const [paid, setPaid] = useState('')
    const [history, setHistory] = useState('')

    const dispatch = useDispatch()

    const prescDetails = useSelector((state) => state.prescDetails)
    const { loading, error, presc } = prescDetails



    const prescEnumsList = useSelector((state) => state.prescEnumsList)
    const { enums } = prescEnumsList

    const treatLists = useSelector((state) => state.treatLists)
    const { treatments } = treatLists

    const userList = useSelector((state) => state.userList)
    const { users } = userList

    const catTestList = useSelector((state) => state.catTestList)
    const { tests } = catTestList

    const presPaidList = useSelector((state) => state.presPaidList)
    const { pays } = presPaidList

    const prescUpdate = useSelector((state) => state.prescUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = prescUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: UPDATE_PRESCRIPTION_RESET })
            history1.push('/list-prescriptions')
        } else {
            if (presc._id !== id) {
                dispatch(listUsers())
                dispatch(listTreatments())
                dispatch(listEnumsPrescriptions())
                dispatch(prescriptionDetails(id))
                dispatch(listCatTests())
                dispatch(listPaidEnums())
            } else {
                setUser(presc.user)
                setTreatment(presc.treatment)
                setMedicine(presc.medicine)
                setTime(presc.time)
                setDays(presc.days)
                setTake(presc.take)
                setTest(presc.test)
                setPaid(presc.paid)
                setHistory(presc.history)
            }
        }
    }, [dispatch, history1, id, presc, successUpdate])


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoadingData = () =>
        loading && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const showLoading = () =>
        loadingUpdate && (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePrescription({ _id: id, user, treatment, medicine,  time, days , take, test, paid, history}))
    }

    const updatePrescriptionForm = () => (

        <div className="form-group col-md-12">
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="text-muted">Patient</label>
                        <select onChange={(e) => setUser(e.target.value)} className="form-control">
                            <option>Select Patient</option>
                            {users &&
                            users.filter(filtered => filtered.role === 2).map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Treatment for</label>
                        <select onChange={(e) => setTreatment(e.target.value)} className="form-control">
                            <option>Select Treatment</option>
                            {treatments &&
                            treatments.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">Medicine</label>
                        <input type="text" className="form-control"  placeholder="Medicine" value={medicine}
                               onChange={(e) => setMedicine(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress2">Time's as day</label>
                        <input type="text" className="form-control" id="inputAddress2"
                               placeholder="e.g 2 or 3" value={time}
                               onChange={(e) => setTime(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputAddress">No of days</label>
                        <input type="text" className="form-control"  placeholder="Medicine" value={days}
                               onChange={(e) => setDays(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="text-muted">When to take</label>
                        <select onChange={(e) => setTake(e.target.value)} className="form-control">
                            <option>Select Treatment</option>
                            {enums &&
                            enums.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlSelect2">Tests</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2" onChange={(e) => setTest(e.target.value)}>
                            <option>Select Test</option>
                            {tests &&
                            tests.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.testName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleFormControlTextarea1">Case History</label>
                        <textarea className="form-control" value={history}
                                  onChange={(e) => setHistory(e.target.value)} placeholder="write case history" rows="3"/>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Paid</label>
                            <select onChange={(e) => setPaid(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                <option>Select Pay</option>
                                {pays &&
                                pays.map((p, i) => (
                                    <option key={i} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )


    return  (
        <Layout title="Category treatment Form">

            <>
                <h2 className="mb-4">Update Prescription</h2>
                {errorUpdate && <div className="alert alert-danger" role="alert">
                    {errorUpdate}
                </div>}
                <h3>User: {user} </h3>
                <h4>Treatment: {treatment}</h4>
                <h5>Take: {take}</h5>
                <h6>Test: {test}</h6>
                {showLoadingData()}
                {showLoading()}
                {showError()}
                {updatePrescriptionForm()}
            </>

        </Layout>
    )

}




export default UpdatePrescriptions