import React from "react";
function ProductDetails({ product,orderCreated }) {
    return (
        <div>
            <h3>Product Details:</h3>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> {product.price}$</p>
            </div>
            
    );
}

export default ProductDetails;
