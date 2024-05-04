import React, { useState, useEffect } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

function UpdateProduct({ show, handleClose, updateProduct, product }) {
    const [updatedProductData, setUpdatedProductData] = useState(product);

    useEffect(() => {
        setUpdatedProductData(product);
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProductData({ ...updatedProductData, [name]: value });
    };

    const handleUpdateProduct = () => {
        updateProduct(updatedProductData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}} type="text" name="name" value={updatedProductData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}} type="text" name="description" value={updatedProductData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}} type="number" name="price" value={updatedProductData.price} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="image" value={updatedProductData.image} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateProduct}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateProduct;
