import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

const VitalSignsForm = ({ onSubmit, appId, existingVitals, handleCancel, status }) => {
  const [vitalSigns, setVitalSigns] = useState({
    weight: "",
    bp: "",
    pulse: "",
    temperature: "",
    respRate: "",
  });

  useEffect(() => {
    if (existingVitals) {
      setVitalSigns({ ...existingVitals });
    }
  }, [existingVitals]);

  const handleInputChange = (field, value) => {
    setVitalSigns({ ...vitalSigns, [field]: value });
  };

  const handleBpChange = (systolic, diastolic) => {
    setVitalSigns({ ...vitalSigns, bp: `${systolic}/${diastolic}` });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(vitalSigns, appId);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Table bordered>
        <thead>
          <tr>
            <th>Weight (kg)</th>
            <th>B.P. - Systolic/Diastolic (mmHg)</th>
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
              
              />
            </td>
            <td>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control me-1"
                  placeholder="Systolic"
                  onChange={(e) =>
                    handleBpChange(e.target.value, vitalSigns.bp.split("/")[1] || "")
                  }
                  value={vitalSigns.bp.split("/")[0] || ""}
              
                />
                <span className="m-2">/</span>
                <input
                  type="number"
                  className="form-control ms-1"
                  placeholder="Diastolic"
                  onChange={(e) =>
                    handleBpChange(vitalSigns.bp.split("/")[0] || "", e.target.value)
                  }
                  value={vitalSigns.bp.split("/")[1] || ""}
              
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Pulse"
                value={vitalSigns.pulse}
                onChange={(e) => handleInputChange("pulse", e.target.value)}
              
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
            
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Resp. Rate"
                value={vitalSigns.respRate}
                onChange={(e) => handleInputChange("respRate", e.target.value)}
            
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default VitalSignsForm;
