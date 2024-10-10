import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Plus, DashCircle, PencilSquare } from 'react-bootstrap-icons';
import { createPrescription, updatePrescription, deletePrescription } from '../actions/prescriptionActions';
import { useDispatch, useSelector } from 'react-redux';

const PrescriptionForm = ({ onSubmit, appId, doctor, patient, existingPrescriptions , medicines , onCancel , detailsVacApp}) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const dispatch = useDispatch();

  // Load existing prescriptions for editing
  useEffect(() => {
    if (existingPrescriptions) {
      setPrescriptions([{...existingPrescriptions}]);
    }
  }, [existingPrescriptions]);

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { drug: '', dosage: '', durationNumber: '', durationUnit: '', instruction: '', doctor, patient },
    ]);
  };
  
  const updatedPrescriptions = () =>{
     dispatch(updatePrescription(prescriptions[0]))
     dispatch(detailsVacApp(appId))
     onSubmit(prescriptions);
     setPrescriptions([]);
     setEditIndex(null); 
  }

  const removePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

 

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const onFinish = (e) => {
      // Create new prescription
      dispatch(createPrescription(appId, prescriptions));
      dispatch(detailsVacApp(appId))
    onSubmit(prescriptions);
    setPrescriptions([]);
    setEditIndex(null); // Reset edit index after submitting
  };

  

  return (
    <Form onSubmit={onFinish}>
      {prescriptions.map((prescription, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Group controlId={`drug-${index}`}>
              <Form.Label>Drug Name</Form.Label>
              <Form.Select
                value={prescription.drug}
                onChange={(e) => handleInputChange(index, 'drug', e.target.value)}
                required
                style={{
                  backgroundColor: '#f8f9fa',
                  borderColor: '#ced4da',
                  borderRadius: '4px',
                  padding: '0.375rem 0.75rem',
                  fontSize: '1rem',
                  color: '#495057',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
                }}
              >
                <option value="">Select a drug</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.name}>
                    {medicine.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId={`dosage-${index}`}>
              <Form.Label>Dosage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dosage"
                value={prescription.dosage}
                onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId={`duration-${index}`}>
              <Form.Label>Duration</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="0"
                  value={prescription.durationNumber}
                  onChange={(e) => handleInputChange(index, 'durationNumber', e.target.value)}
                  required
                />
                <Form.Select
                  className="ms-2"
                  value={prescription.durationUnit}
                  onChange={(e) => handleInputChange(index, 'durationUnit', e.target.value)}
                >
                  <option value="">Unit</option>
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId={`instruction-${index}`}>
              <Form.Label>Instruction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Instruction"
                value={prescription.instruction}
                onChange={(e) => handleInputChange(index, 'instruction', e.target.value)}
              />
            </Form.Group>
          </Col>
          {!existingPrescriptions && (<Col md={1} className="text-end">
            <DashCircle
              size={16}
              onClick={() => removePrescription(index)}
              style={{ cursor: 'pointer' }}
            />
          </Col>)}
        </Row>
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
