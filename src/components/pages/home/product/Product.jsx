import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "../home.module.scss";
import ProductDetails from "./ProdectDetels";
import { Alert } from "react-bootstrap";


function Product({ product, addToOrder, handleProductSelection, selectedProducts ,istoken}) {
    const [isChecked, setIsChecked] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [orderCreated, setOrderCreated] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        handleProductSelection(product.id, !isChecked); // Update selectedProducts state when checkbox is changed
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleAddToOrder = () => {
        addToOrder();
        setOrderCreated(true); // Set orderCreated to true to show the confirmation message
    };

    return (
        <Card className={styles.product}>
            <Card.Body>
                <Card.Img className={styles.image} variant="top" src={product.image} />
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{ fontWeight: "bold" }}>
                    Price: {product.price}$
                </Card.Text>
                { istoken ?(orderCreated && <Alert variant="success">The product has been added to the order.</Alert>):(orderCreated && <Alert variant="danger">The user is not login Go to login page .</Alert>)}
                <Button className={styles.buttonWithMargin} onClick={toggleDetails}>{showDetails ? "Hide Details" : "Show Details"}</Button>
                {showDetails && <ProductDetails product={product} orderCreated={orderCreated}/>}
                <div className="d-flex justify-content-between align-items-center">
                    <Button className={styles.buttonWithMargin} onClick={handleAddToOrder} disabled={!isChecked || selectedProducts.indexOf(product.id) === -1}>
                        Add to Order
                    </Button>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default Product;
