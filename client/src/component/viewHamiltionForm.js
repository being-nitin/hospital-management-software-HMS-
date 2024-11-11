import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVacApp } from "../actions/vaccineAppointmentActions";
import backgroundImage from "../assets/backgroundImage.PNG"; // Adjust the path as needed

const HamAView = () => {
  const [hamA, setHamA] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vaccineAppList = useSelector((state) => state.vaccineAppDetails);
  const {
    loading,
    error,
    appointment: { appointment, pastAppointments } = {},
  } = vaccineAppList || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsVacApp(id));
    } else {
      navigate("/signin");
    }
  }, [dispatch, userInfo, id, navigate]);

  useEffect(() => {
    setHamA(appointment?.hamA);
  }, [appointment]);

  const handlePrint = () => {
    window.print();
  };

  if (!hamA) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <style>
        {`
          @media print {
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .print-container {
              position: relative;
              width: 100%;
              height: 100vh;
              page-break-after: always;
            }

            .background-image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: -1;
            }

            .content {
              position: relative;
              z-index: 1;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.9); /* For readability over the background */
            }

            /* Hide the print button on print */
            .btn, .mb-3 {
              display: none;
            }
          }
        `}
      </style>
      <Button onClick={handlePrint} className="mb-3">Print</Button>
    
        
        {/* Content Section */}
        <div className="content">
          <h3 className="text-center">HAM-A Assessment</h3>
          <Card className="p-4 hamA-print">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Symptom</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(hamA).map(([symptom, score], index) => (
                  <tr key={index}>
                    <td>{symptom}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <h5>Total Score: {hamA ? Object.values(hamA).reduce((acc, value) => acc + value, 0) : 0}</h5>
            </div>
          </Card>
        </div>
      
    </Container>
  );
};

export default HamAView;
