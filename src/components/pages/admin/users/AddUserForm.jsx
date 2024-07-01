import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Api from "../../../../tools/api";

function AddUserForm({ show, handleClose, fetchUsers }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role:""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.fetch({
        url: "registeruser",
        method: "POST",
        token: localStorage.getItem("token"),
        body: formData
      });
      console.log("response", response);
      fetchUsers();
      handleClose();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicName" style={{marginTop:"10px"}}>
            <Form.Label>address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form onSubmit={handleSubmit}  style={{marginTop:"10px"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label >
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{marginTop:"10px"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{marginTop:"10px"}}>
            <Form.Label>ADD Role</Form.Label>
            <Form.Control
              type="role"
              placeholder="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddUserForm;
