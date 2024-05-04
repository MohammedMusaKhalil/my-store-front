import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { AppContext } from "../../../layout/Layout";
import Api from "../../../../tools/api";
import styles from './ShowProducts.module.scss';
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct"; // Import the new component
import Dashboard from "../dashboard";

function ShowProducts() {
    const appContext = useContext(AppContext);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateProductData, setUpdateProductData] = useState({
        id: "",
        name: "",
        desc: "",
        price: "",
        image: ""
    });

    const getCategories = async () => {
        try {
            const response = await Api.fetch({ url: 'categories' });
            if (response != null) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getProducts = async () => {
        try {
            let params = {};
            if (appContext.appState.search) {
                params = { name: appContext.appState.search };
            }
            if (appContext.appState.category) {
                params = { ...params, category: appContext.appState.category };
            }
            const response = await Api.fetch({
                url: 'products',
                params: params
            });
            if (response != null && response.data != null) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        getProducts();
    }, [appContext.appState.search, appContext.appState.category]);

    const handleCloseAddProduct = () => {
        setShowAddProduct(false);
    };

    const handleShowAddProduct = () => {
        setShowAddProduct(true);
    };

    const deleteProduct = async (productId) => {
        try {
            await Api.fetch({
                url:`products/${productId}`,
                method: 'DELETE',
                token: localStorage.getItem('token')
            });
            getProducts()
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleShowUpdateModal = (product) => {
        setUpdateProductData(product);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const updateProduct = async (updatedProductData) => { // Updated to receive updatedProductData
        try {
            await Api.fetch({
                url: `updateproduct/${updatedProductData.id}`,
                method: 'PUT',
                body: updatedProductData,
                token: localStorage.getItem('token')
            });
            getProducts();
            handleCloseUpdateModal();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <Dashboard/>
        <div className="main_content">
            <div style={{width:'100%',height:'50px',textAlign:'center',marginTop:"10px"}}>
                 <span className="subtitle">All Product in Website</span>
            </div>
            <Button   onClick={handleShowAddProduct} style={{marginLeft:"45%",backgroundColor:"#9F5449",marginBottom:"10px",border:'none'}}>Add New Product</Button>
            <div className="row">
                {products.map((product, index) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: '300px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>Name: {product.name}</Card.Title>
                                <Card.Text>Description: {product.description}</Card.Text>
                                <Card.Text>Price: {product.price}</Card.Text>
                                <Button className={styles.buttonWithMargin} variant="primary" onClick={() => handleShowUpdateModal(product)}>Update</Button>
                                <Button className={styles.buttonWithMargin} variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
                <AddProduct show={showAddProduct} handleClose={handleCloseAddProduct} fetchProducts={getProducts} />
            </div>

            <UpdateProduct // Pass necessary props to UpdateProduct component
                show={showUpdateModal}
                handleClose={handleCloseUpdateModal}
                updateProduct={updateProduct}
                product={updateProductData}
            />
        </div>
        </div>
    );
}

export default ShowProducts;
