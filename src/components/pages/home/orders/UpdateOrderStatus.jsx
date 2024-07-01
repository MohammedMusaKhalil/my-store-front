import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Api from '../../../../tools/api';

function UpdateOrderStatus({ order, onUpdate, setSelectedOrder }) {
    const [products, setProducts] = useState(order.products);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Make API call to update order
            const response = await Api.fetch({
                url: `updateorders/${order.id}`, // Updated API endpoint
                method: 'PUT',
                body: {
                    order: order.id, // Send order ID
                    products: products.map(product => ({
                        id: parseInt(product.id),
                        qty: product.qty
                    }))
                },
                token: localStorage.getItem('token')
            });
            // Handle successful update
            console.log('Order updated:', response.order);
            onUpdate(); // Call the parent onUpdate function to fetch updated orders
            setSelectedOrder(null); // Close the modal
        } catch (error) {
            // Handle error
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleQtyChange = (productId, newQty) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, qty: newQty } : product
            )
        );
    };

    return (
        <Modal show={true} onHide={() => setSelectedOrder(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {products.map(product => (
                        <Form.Group controlId={`formProduct${product.id}`} key={product.id}>
                            <Form.Label>{product.product_object.name}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity"
                                value={product.qty}
                                onChange={(e) => handleQtyChange(product.id, e.target.value)}
                                required
                            />
                        </Form.Group>
                    ))}
                    <Button variant="primary" type="submit" disabled={loading} style={{marginTop:"10px"}}>
                        {loading ? 'Updating...' : 'Update Order'}
                    </Button>
                    {error && <p className="text-danger">{error.message}</p>}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateOrderStatus;
