import React, { useContext, useState, useEffect } from 'react';
import Api from '../../../../tools/api';
import '../../css/OrdersPage.css';
import { Table } from 'reactstrap';
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../layout/Layout"
import UpdateOrderStatus from './UpdateOrderStatus'
import Dashboard from '../dashboard';


function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const appContext = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await Api.fetch({
                    url: 'orders' + (appContext.appState?.user?.role ? `${appContext.appState.user.role}` : ''),
                    method: 'GET',
                    token: localStorage.getItem('token')
                });
                setOrders(ordersResponse.order);

                const usersResponse = await Api.fetch({
                    url: "users",
                    method: "GET",
                    token: localStorage.getItem('token')
                });
                setUsers(usersResponse.data);

                const productsResponse = await Api.fetch({
                    url: 'products',
                    method: 'GET',
                    token: localStorage.getItem('token')
                });
                setProducts(productsResponse.data);

                
            } catch (error) {
                setError(error);
               
            }
        };

        fetchData();
    }, []);

    const handleUpdateOrder = async () => {
        // Fetch updated orders after update
        const response = await Api.fetch({
            url: 'orders' + (appContext.appState?.user?.role ? `${appContext.appState.user.role}` : ''),
            method: 'GET',
            token: localStorage.getItem('token')
        });
        setOrders(response.order);
        setSelectedOrder(null); // Reset selected order after update
    };

    const handleShowUpdateModal = (order) => {
        setSelectedOrder(order);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await Api.fetch({
                url: `deleteOrder/${orderId}`,
                method: 'DELETE',
                token: localStorage.getItem('token')
            });
            // Filter out the deleted order from the orders state
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            setError(error);
        }
    };


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Dashboard/>
        <div className="main_content">
        <div style={{width:'100%',height:'50px',textAlign:'center',marginTop:"10px"}}>
        <span className="subtitle">All Orders in Website</span>
      </div>
            {orders && orders.length > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Product Names</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{users.find(user => user.id === order.user_id)?.name}</td>
                                <td>{order.total}</td>
                                <td>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product.product_object.id}>{product.product_object.name} - {product.qty}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <Button style={{margin:"10px"}} onClick={() => handleShowUpdateModal(order)}>Update order</Button>
                                    <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>Delete order</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No orders found.</p>
            )}
            {selectedOrder && (
                <UpdateOrderStatus order={selectedOrder} productsInStore={products} onUpdate={handleUpdateOrder} setSelectedOrder={setSelectedOrder}  />
            )}
        </div>
        </div>
    );
}

export default OrdersPage;
