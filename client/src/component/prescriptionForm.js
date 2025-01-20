import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { Plus, DashCircle } from 'react-bootstrap-icons';
import { createPrescription, updatePrescription } from '../actions/prescriptionActions';
import { useDispatch } from 'react-redux';

const PrescriptionForm = ({
  onSubmit,
  appId,
  doctor,
  patient,
  existingPrescriptions,
  medicines,
  onCancel,
  detailsVacApp,
}) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const dispatch = useDispatch();

  const dosageValues = ['0', '½', '1' , '1½'];
  const instructions = ['Before Food', 'After Food', 'With Food'];
  
  useEffect(() => {
    if (existingPrescriptions) {
        const { dosage } = existingPrescriptions;
        const [morning = '', afternoon = '', evening = ''] = dosage ? dosage.split('-') : [];
       const updatedPrescriptions =  { ...existingPrescriptions, morning, afternoon, evening }
      setPrescriptions([ {...updatedPrescriptions} ]);
    }
  }, [existingPrescriptions]);

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { drug: '', morning: '1', afternoon: '1', evening: '1', durationNumber: '', durationUnit: '', instruction: '', doctor, patient },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const removePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const savePrescriptions = (e) => {
    e.preventDefault();
    const newPrescriptions = prescriptions.map((p) => ({
      ...p,
      dosage: [p.morning, p.afternoon, p.evening].join('-'),
    }));
    if (existingPrescriptions) {
      dispatch(updatePrescription(newPrescriptions[0]));
    } else {
      dispatch(createPrescription(appId, newPrescriptions));
    }
    dispatch(detailsVacApp(appId));
    onSubmit(newPrescriptions);
    setPrescriptions([]);
  };

  useEffect(() => {
    if(!existingPrescriptions){
     addPrescription()
    }
  },[])
  return (
    <Form onSubmit={savePrescriptions}>
      <Table bordered hover responsive>
        
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>
                <Form.Select
                  value={prescription.drug}
                  onChange={(e) => handleInputChange(index, 'drug', e.target.value)}
                  className='py-2'
                  required
                >
                  <option value="">Select a drug</option>
                  {medicines && medicines.map((medicine) => (
                    <option key={medicine.id} value={medicine.name}>
                      {medicine.name}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  value={prescription.morning}
                  onChange={(e) => handleInputChange(index, 'morning', e.target.value)}
                  className='py-2'
                >
                  <option value="">Select</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  value={prescription.afternoon}
                  onChange={(e) => handleInputChange(index, 'afternoon', e.target.value)}
                  className='py-2'
                >
                  <option value="">Select</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  value={prescription.evening}
                  onChange={(e) => handleInputChange(index, 'evening', e.target.value)}
                  className='ms-2 py-2'

                >
                  <option value="">Select</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <div className="d-flex">
                  <Form.Control
                    type="number"
                    placeholder="0"
                    value={prescription.durationNumber}
                    onChange={(e) => handleInputChange(index, 'durationNumber', e.target.value)}
                    required
                  />
                  <Form.Select
                    value={prescription.durationUnit}
                    onChange={(e) => handleInputChange(index, 'durationUnit', e.target.value)}
                    className="ms-2"
                  >
                    <option value="">Unit</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </Form.Select>
                </div>
              </td>
              <td>
                <Form.Select
                  value={prescription.instruction}
                  onChange={(e) => handleInputChange(index, 'instruction', e.target.value)}
                  className='py-2'
                >
                  <option value="">instruction</option>
                  {instructions.map((inst, idx) => (
                    <option key={idx} value={inst}>
                      {inst}
                    </option>
                  ))}
                </Form.Select>
              </td>
              {!existingPrescriptions && (
              <td className='text-center'>
             
                <DashCircle
                className="text-center m-2" 
                  size={20}
                  onClick={() => removePrescription(index)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </td>)}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        {!existingPrescriptions && (
        <Button variant="secondary" onClick={addPrescription}>
          <Plus size={16} /> Add Medicine
        </Button>)
}
        <div>
          
          <Button variant="primary" type="submit" className="m-2">
            {existingPrescriptions ? 'Update' : 'Save'}
          </Button>
          <Button variant="danger" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default PrescriptionForm;
