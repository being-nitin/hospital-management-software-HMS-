import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const MedicalHistoryForm = ({ initialConditions }) => {
  const [medicalHistory, setMedicalHistory] = useState(initialConditions);
  const [newCondition, setNewCondition] = useState('');

  // Add a new condition
  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setMedicalHistory([...medicalHistory, newCondition]);
      setNewCondition(''); // Reset input field
    }
  };

  // Delete a condition
  const handleDeleteCondition = (index) => {
    const updatedHistory = medicalHistory.filter((_, i) => i !== index);
    setMedicalHistory(updatedHistory);
  };

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
              {medicalHistory.length > 0 ? (
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
