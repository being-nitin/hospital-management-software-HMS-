import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const PrescriptionForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [prescriptions, setPrescriptions] = useState([]);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, {}]);
  };

  const removePrescription = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setPrescriptions(updatedPrescriptions);
  };

  const onValuesChange = (changedValues, allValues) => {
    allValues.prescriptions?.forEach((prescription, index) => {
      const { durationNumber, durationUnit } = prescription || {};
      if (durationNumber && durationUnit) {
        form.setFieldsValue({
          prescriptions: allValues.prescriptions.map((p, i) =>
            i === index ? { ...p, duration: `${durationNumber} ${durationUnit}` } : p
          )
        });
      }
    });
  };

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields(); // Reset form fields
    setPrescriptions([]); // Clear prescription list
  };

  return (
    <Form form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
      <Form.List name="prescriptions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={16} align="middle">
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'drug']}
                    rules={[{ required: true, message: 'Please input drug name!' }]}
                  >
                    <Input placeholder="Drug Name" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, 'dosage']}
                    rules={[{ required: true, message: 'Please input dosage!' }]}
                  >
                    <Input placeholder="Dosage" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item {...restField} name={[name, 'durationNumber']}>
                    <Input type="number" placeholder="Duration" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item {...restField} name={[name, 'durationUnit']}>
                    <Select placeholder="Unit">
                      <Option value="days">Days</Option>
                      <Option value="months">Months</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item {...restField} name={[name, 'instructions']}>
                    <Input placeholder="Instructions" />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Prescription
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrescriptionForm;
