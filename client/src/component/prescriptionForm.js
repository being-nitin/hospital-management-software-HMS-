import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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

  const dosageValues = ['0' ,'½', '1'];
  const instructions = ['before food', 'after food', "with food"];
  
  useEffect(() => {
    if (existingPrescriptions) {
        const { dosage } = existingPrescriptions;
        const [morning = '', afternoon = '', evening = ''] = dosage ? dosage.split('-') : [];
        const updatedPrescriptions = { ...existingPrescriptions, morning, afternoon, evening };
      
      setPrescriptions([{...updatedPrescriptions}]); 
    }
  }, [existingPrescriptions]);

  const inputStyle = {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
    borderRadius: '4px',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    color: '#495057',
    width:"100%",
    display : "block",
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
  };

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { drug: '', morning: '1', afternoon: '1', evening: '1', durationNumber: '', durationUnit: '', instruction: '', doctor, patient },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    console.log(field , value)
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const removePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const updatedPrescriptions = () => {
    const updatedData = prescriptions.map((p) => ({
      ...p,
      dosage: [p.morning, p.afternoon, p.evening].join('-'),
    }));
    dispatch(updatePrescription(updatedData[0]));
    dispatch(detailsVacApp(appId));
    onSubmit(updatedData);
    setPrescriptions([]);
  };

  const onFinish = (e) => {
    e.preventDefault();
    const newPrescriptions = prescriptions.map((p) => ({
      ...p,
      dosage: [p.morning, p.afternoon, p.evening].join('-'),
    }));
    console.log(newPrescriptions)
    dispatch(createPrescription(appId, newPrescriptions));
    dispatch(detailsVacApp(appId));
    onSubmit(newPrescriptions);
    setPrescriptions([]);
  };

  return (
    <Form onSubmit={onFinish}>
      {prescriptions.map((prescription, index) => (
        <Col key={index} className="mb-4 align-items-center">
        <div>
          <Form.Group controlId={`drug-${index}`}>
            <Form.Label>Drug Name</Form.Label>
            <Form.Select
              value={prescription.drug}
              onChange={(e) => handleInputChange(index, 'drug', e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Select a drug</option>
              {medicines.map((medicine) => (
                <option key={medicine.id} value={medicine.name}>
                  {medicine.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      
        <div>
          <Form.Group controlId={`dosage-${index}`}>
            <Form.Label>Dosage</Form.Label>
            <Row>
              <Col>
              <div>Morning</div>
                <Form.Select
                  value={prescription.morning}
                  onChange={(e) => handleInputChange(index, 'morning', e.target.value)}
                  style={inputStyle}
                >
                 
                  <option value="">Morning</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={`${value}`}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
              <div>Afternoon</div>
                <Form.Select
                  value={prescription.afternoon}
                  onChange={(e) => handleInputChange(index, 'afternoon', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Afternoon</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={`${value}`}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
              <div>Evening</div>
                <Form.Select
                  value={prescription.evening}
                  onChange={(e) => handleInputChange(index, 'evening', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Evening</option>
                  {dosageValues.map((value, idx) => (
                    <option key={idx} value={`${value}`}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </div>
      
        <div>
          <Form.Group controlId={`duration-${index}`}>
            <Form.Label>Duration</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="0"
                value={prescription.durationNumber}
                onChange={(e) => handleInputChange(index, 'durationNumber', e.target.value)}
                required
                style={inputStyle}
              />
              <Form.Select
                className="ms-2"
                value={prescription.durationUnit}
                onChange={(e) => handleInputChange(index, 'durationUnit', e.target.value)}
                style={inputStyle}
              >
                <option value="">Unit</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
              </Form.Select>
            </div>
          </Form.Group>
        </div>
      
        <div>
          <Form.Group controlId={`instruction-${index}`}>
            <Form.Label>Instruction</Form.Label>
            <Form.Select
              value={prescription.instruction}
              onChange={(e) => handleInputChange(index, 'instruction', e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Instruction</option>
              {instructions.map((inst, idx) => (
                <option key={idx} value={inst}>
                  {inst}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      
        <Col md={1} className="text-center">
          <DashCircle
            size={16}
            onClick={() => removePrescription(index)}
            style={{ cursor: 'pointer', color: 'red', marginTop: '30px' }}
          />
        </Col>
      </Col>
      
      ))}
   {existingPrescriptions ?
      <>
        <Button variant="secondary" onClick={updatedPrescriptions} className="mb-3 mr-3">
        UpdatePrescriptions
      </Button> 
      <Button variant="danger" onClick={onCancel} className="mb-3">
      Cancel
    </Button>
    </>
       :
       <>
      <Button variant="secondary" onClick={addPrescription} className="mb-3 mr-3">
        <Plus size={16} /> Add Prescription
      </Button>
 
      </>}

      {!existingPrescriptions && (<div>
        <Button variant="primary" type="submit" className='mr-3'>
          Submit
        </Button>
        <Button variant="danger" onClick={onCancel} >
      Cancel
    </Button>
      </div>)}
    </Form>
  );
};

export default PrescriptionForm;
