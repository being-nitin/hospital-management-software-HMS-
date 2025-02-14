import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { Plus, DashCircle } from 'react-bootstrap-icons';

const PrescriptionForm = ({
  onSubmit,
  appId,
  doctor,
  patient,
  existingPrescriptions = [],
  medicines,
  onCancel,
}) => {
  const [prescriptions, setPrescriptions] = useState([]);

  const dosageValues = ['0', '½', '1', '1½', '2', '2½', '3', '3½'];
  const instructions = ['Before Food', 'After Food', 'With Food'];

  useEffect(() => {
    if (existingPrescriptions && existingPrescriptions.length > 0) {
      // Convert dosage string into morning, afternoon, evening fields
      const formattedPrescriptions = existingPrescriptions.map((pres) => {
        const { dosage } = pres;
        const [morning = '', afternoon = '', evening = ''] = dosage ? dosage.split('-') : [];
        return { ...pres, morning, afternoon, evening };
      });
      setPrescriptions(formattedPrescriptions);
    } else {
      addPrescription();
    }
  }, [existingPrescriptions]);

  console.log(prescriptions)
  const addPrescription = () => {
    setPrescriptions((prev) => [
      ...prev,
      {
        drug: '',
        morning: '1',
        afternoon: '1',
        evening: '1',
        durationNumber: '',
        durationUnit: '',
        instruction: '',
        doctor,
        patient,
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setPrescriptions((prev) =>
      prev.map((prescription, i) =>
        i === index ? { ...prescription, [field]: value } : prescription
      )
    );
  };

  const removePrescription = (index) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const savePrescriptions = (e) => {
    e.preventDefault();
    const updatedPrescriptions = prescriptions.map((p) => ({
      ...p,
      dosage: [p.morning, p.afternoon, p.evening].join('-'),
    }));

    onSubmit(updatedPrescriptions, existingPrescriptions);
  };

  return (
    <>
    <style>
    {`
      .styled-input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .styled-datalist option {
        font-size: 14px;
        padding: 5px;
        background : white;
        color : black;
      }
    `}
  </style>
    <Form onSubmit={savePrescriptions}>
      <Table bordered hover responsive>
      <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  list={`medicine-list-${index}`}
                  value={prescription.drug}
                  onChange={(e) => handleInputChange(index, 'drug', e.target.value)}
                  className="py-2 styled-input"
                  required
                />
                <datalist id={`medicine-list-${index}`} className="styled-datalist">
                  {medicines?.map((medicine) => (
                    <option key={medicine.id} value={medicine.name} />
                  ))}
                </datalist>
              </td>
              {['morning', 'afternoon', 'evening'].map((time, idx) => (
                <td key={idx}>
                  <Form.Control
                    list={`dosage-list-${time}-${index}`}
                    value={prescription[time]}
                    onChange={(e) => handleInputChange(index, time, e.target.value)}
                    className="py-2"
                  />
                  <datalist id={`dosage-list-${time}-${index}`}>
                    {dosageValues.map((value, i) => (
                      <option key={i} value={value} />
                    ))}
                  </datalist>
                </td>
              ))}
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
                <Form.Control
                  list={`instruction-list-${index}`}
                  value={prescription.instruction}
                  onChange={(e) => handleInputChange(index, 'instruction', e.target.value)}
                  className="py-2"
                />
                <datalist id={`instruction-list-${index}`}>
                  {instructions.map((inst, i) => (
                    <option key={i} value={inst} />
                  ))}
                </datalist>
              </td>
              {!existingPrescriptions && (
                <td className="text-center">
                  <DashCircle
                    className="text-center m-2"
                    size={20}
                    onClick={() => removePrescription(index)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        {!existingPrescriptions && (
          <Button variant="secondary" onClick={addPrescription}>
            <Plus size={16} /> Add Medicine
          </Button>
        )}
        <div>
          <Button variant="primary" type="submit" className="m-2">
            {existingPrescriptions ? 'Update All' : 'Save'}
          </Button>
          <Button variant="danger" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
    </>
  );
};

export default PrescriptionForm;
