import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import {listPatients, patientsDetails, updatePatients } from '../actions/patientActions'
import { useDispatch, useSelector } from 'react-redux';

const MedicalHistoryForm = ({  id }) => {
  // const [medicalHistory, setMedicalHistory] = useState(initialConditions);
  const [newCondition, setNewCondition] = useState('');
  const [medicalHistory , setMedicalHistory ] = useState([])
  const dispatch = useDispatch()
  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  // Add a new condition
  const handleAddCondition = () => {
    if (newCondition.trim()) {

    if(newCondition != "" ) {
        dispatch(updatePatients({_id : id , medicalhistory : [...medicalHistory , newCondition]}))
        setMedicalHistory([...medicalHistory , newCondition])
        dispatch(patientsDetails(id))
      } // Reset input field
        setNewCondition("")
    }
   };

  // Delete a condition
  const handleDeleteCondition = (index) => {
    const updatedHistory = medicalHistory.filter((_, i) => i !== index);
      dispatch(updatePatients({_id : id , medicalhistory : updatedHistory}))
      setMedicalHistory([...updatedHistory])
  };

  useEffect(()=>{
     setMedicalHistory(patient.medicalhistory ? patient.medicalhistory 
      : []
     )
  },[patient])

  useEffect(()=>{
    dispatch(patientsDetails(id))
  },[id])
  



  return (
    <div className="col-lg-4">
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5>Medical History</h5>
        </div>
        <div className="card-body">
          <Form>
            <strong>Personal Medical History</strong>
            <ul className="list-group">
              {medicalHistory?.length > 0 ? (
                medicalHistory.map((condition, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{condition}</span>
                    <Trash
                      size={20}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => handleDeleteCondition(index)}
                    />
                  </li>
                ))
              ) : (
                <li className="list-group-item">No Personal Medical History</li>
              )}
            </ul>

            {/* Add new condition */}
            <InputGroup className="mt-3">
              <Form.Control
                type="text"
                placeholder="Add new condition"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddCondition}>
                Add
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
