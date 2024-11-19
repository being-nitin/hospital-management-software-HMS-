import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import Layout from "../core/Layout";

//#007bff  blue replaced with this #0056d2
// #ffc107 yellow replaced with this ffb300
// #28a745 green replaced with this #218838
// #dc3545 red replaced with this #c82333
const AdminDashboard = () => {
  // Data for cards
  const totals = {
    users: 500,
    patients: 350,
    doctors: 100,
    expenses: "$50,000",
  };

  // Pie chart data for User Types
  const userTypeData = {
    labels: ["Admin", "Doctor", "Patient"],
    datasets: [
      {
        data: [50, 100, 350],
        backgroundColor: ["#007bff", "#ffc107", "#28a745"],
      },
    ],
  };

  // Bar chart data for Expenses
  const expenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Expenses ($)",
        data: [8000, 7000, 6500, 7200, 7500],
        backgroundColor: "#dc3545",
      },
    ],
  };

  return (
    <Layout title="Dashboard">
      <Container className="my-4">
        {/* Top Summary Cards */}
        <Row className="g-4">
          {[
            { title: "Total Users", value: totals.users, color: "primary" },
            {
              title: "Total Patients",
              value: totals.patients,
              color: "success",
            },
            { title: "Total Doctors", value: totals.doctors, color: "warning" },
            {
              title: "Total Expenses",
              value: totals.expenses,
              color: "danger",
            },
          ].map((item, index) => (
            <Col md={3} key={index}>
              <Card
                className={`bg-${item.color} text-white shadow-sm`}
                style={{ fontSize: "0.85rem" }}
              >
                <Card.Body className="p-3">
                  <Card.Title
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {item.title}
                  </Card.Title>
                  <h4 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {item.value}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Graph Section */}
        <Row className="mt-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <Card.Title
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  User Type Distribution
                </Card.Title>
                <Pie
                  data={userTypeData}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <Card.Title
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  Expenses Over Time
                </Card.Title>
                <Bar
                  data={expenseData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                      y: {
                        ticks: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
