import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Api from "../../../../tools/api";

function EditUserForm({ show, handleClose, user: initialUser, fetchUsers }) {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.fetch({
        url: `editUsers/${user.id}`,
        method: "PUT",
        token: localStorage.getItem("token"),
        body: user
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
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control style={{marginBottom:"10px"}}     
              type="email"
              placeholder="Enter email"
              name="email"
              value={user ? user.email : ''}    
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={user ? user.name : ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicName" style={{marginTop:"10px"}}>
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={user ? user.address : ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicRole">
            <Form.Label style={{margin:"10px"}}>Role</Form.Label>
            <Form.Control style={{marginBottom:"10px"}}
              type="text"
              placeholder="Enter role"
              name="role"
              value={user ? user.role : ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditUserForm;
