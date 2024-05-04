// AddCategory.js
import React, { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import Api from '../../../../tools/api';

function AddCategory({  show, handleClose, fetchCatigore  }) {
  const [category, setCategory] = useState({ name: '', desc: '' });

  const handleAddCategory = async () => {
    try {
      const response = await Api.fetch({
        url: 'add-categories',
        body: category,
        method: 'POST',
        token: localStorage.getItem('token')
      });
      if (response != null) {
        fetchCatigore(); // Notify parent component about the category addition
        handleClose();
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Catigore</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleAddCategory}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Name"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category Description"
                value={category.desc}
                onChange={(e) => setCategory({ ...category, desc: e.target.value })}
              />
            </Form.Group>
            <Button onClick={handleAddCategory} variant="primary" type="button">
              Add Category
            </Button>
          </Form>
    </Modal.Body>
    </Modal>
  );
}

export default AddCategory;
