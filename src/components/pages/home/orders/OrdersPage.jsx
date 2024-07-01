import React, { useContext, useState, useEffect } from 'react';
import Api from '../../../../tools/api';
import '../../css/OrdersPage.css';
import { Table } from 'reactstrap';
import Button from "react-bootstrap/Button";
import { AppContext } from "../../../layout/Layout"
import UpdateOrderStatus from './UpdateOrderStatus';
import AppBar from '../../../layout/AppBar';
import Loading from '../../../shared/Loading';


function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const appContext = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const ordersResponse = await Api.fetch({
                    url: 'orders' + (appContext.appState?.user?.role ? `${appContext.appState.user.role}` : ''),
                    method: 'GET',
                    token: localStorage.getItem('token')
                });
                setLoading(false);
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
            <AppBar/>
            <div>
                <h2 style={{textAlign:'center',marginTop:"5px"}}>My Orders</h2>
                {loading ? (
            <Loading /> 
               ) : (
                <div>
                {orders && orders.length > 0 ? (
                    <div className="table-responsive" style={{ margin: '20px' }}>
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
                                <tr key={order.id} style={{textAlign:'center'}}>
                                    <td><br />{order.id}</td>
                                    <td><br />{order.date}</td>
                                    <td><br />{users.find(user => user.id === order.user_id)?.name}</td>
                                    <td><br />{order.total}</td>
                                    <td>
                                    <br />
                                        <ul>
                                            {order.products.map(product => (
                                                <li key={product.product_object.id}>{product.product_object.name} - {product.qty}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <Button onClick={() => handleShowUpdateModal(order)}>Update order</Button>
                                    <br />
                                    <br />
                                        <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>Delete order</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
                </div>
                )}
            {selectedOrder && (
                <UpdateOrderStatus order={selectedOrder} productsInStore={products} onUpdate={handleUpdateOrder} setSelectedOrder={setSelectedOrder}  />
            )}
        </div>
        </div>
    );
}

export default OrdersPage;
