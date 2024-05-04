import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Api from "../../../../tools/api";
import { Cookies } from "react-cookie";

function AddProduct({ show, handleClose ,fetchProducts }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [categorie, setCategorie] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        // Fetch categories when component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await Api.fetch({ url: "categories" });
            if (response != null) {
                setCategorie(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Api.fetch({
                url: "add-product",
                method: "POST",
                body: { name, description, price:Number(price), image, category: Number(selectedCategory) },
                token: localStorage.getItem('token')

            });
            console.log("Product added:", response);
            // Fetch products again to update the list

            handleClose();  
            fetchProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}}
                            type="text" 
                            placeholder="Enter product name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}}
                            as="textarea" 
                            rows={3} 
                            placeholder="Enter product description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}}
                            type="number" 
                            placeholder="Enter product price" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select style={{marginBottom:"10px"}}
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            required 
                        >
                            <option value="">Select category</option>
                            {categorie.map((categorys) => (
                                <option key={categorys.id} value={categorys.id}>{categorys.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}}
                            type="text" 
                            placeholder="Enter image URL" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit"  onClick={handleClose}>
                        Add Product
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddProduct;
