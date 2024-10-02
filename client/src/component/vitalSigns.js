import React, { useState , useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const VitalSignsForm = ({ onSubmit, appId , existingVitals}) => {
  const [vitalSigns, setVitalSigns] = useState({
    weight: '',
    bp: '',
    pulse: '',
    temperature: '',
    respRate: '',
  });

  console.log(existingVitals  )

  const handleInputChange = (field, value) => {
    setVitalSigns({ ...vitalSigns, [field]: value });
  };

  const onFinish = (e) => {
    e.preventDefault();
    console.log(vitalSigns);
    onSubmit(vitalSigns);
    setVitalSigns({
      weight: '',
      bp: '',
      pulse: '',
      temperature: '',
      respRate: '',
    });
  };

  useEffect(() => {
    if (existingVitals) {
      setVitalSigns({...existingVitals});
    }
  }, [existingVitals]);
  return (
    <Form onSubmit={onFinish}>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="weight">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Weight"
              value={vitalSigns.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="bp">
            <Form.Label>B.P. (mmHg)</Form.Label>
            <Form.Control
              type="text"
              placeholder="B.P."
              value={vitalSigns.bp}
              onChange={(e) => handleInputChange('bp', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="pulse">
            <Form.Label>Pulse (Heartbeats/min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pulse"
              value={vitalSigns.pulse}
              onChange={(e) => handleInputChange('pulse', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="temperature">
            <Form.Label>Temperature (°C)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Temperature"
              value={vitalSigns.temperature}
              onChange={(e) => handleInputChange('temperature', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="respRate">
            <Form.Label>Resp. Rate (breaths/min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Resp. Rate"
              value={vitalSigns.respRate}
              onChange={(e) => handleInputChange('respRate', e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default VitalSignsForm;
