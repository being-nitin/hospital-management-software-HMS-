import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

const VitalSignsForm = ({ onSubmit, appId, existingVitals, handleCancel, status  }) => {
  const [vitalSigns, setVitalSigns] = useState({
    weight: "",
    bp: "",
    pulse: "",
    temperature: "",
    respRate: "",
  });

  console.log(existingVitals)

  useEffect(() => {
    if (existingVitals) {
      setVitalSigns({ ...existingVitals });
    }
  }, [existingVitals]);

  const handleInputChange = (field, value) => {
    setVitalSigns({ ...vitalSigns, [field]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(vitalSigns);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Table bordered>
        <thead>
          <tr>
            <th>Weight (kg)</th>
            <th>B.P. (mmHg)</th>
            <th>Pulse (Heartbeats/min)</th>
            <th>Temperature (°C)</th>
            <th>Resp. Rate (breaths/min)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Weight"
                value={vitalSigns.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="B.P."
                value={vitalSigns.bp}
                onChange={(e) => handleInputChange("bp", e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Pulse"
                value={vitalSigns.pulse}
                onChange={(e) => handleInputChange("pulse", e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Temperature"
                value={vitalSigns.temperature}
                onChange={(e) =>
                  handleInputChange("temperature", e.target.value)
                }
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Resp. Rate"
                value={vitalSigns.respRate}
                onChange={(e) => handleInputChange("respRate", e.target.value)}
                required
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <div style = {{ display : 'flex' , justifyContent : 'right' , alignItems: 'center'}}>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default VitalSignsForm;
