import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { AppContext } from "./Layout";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Api from '../../tools/api';
import Loading from '../shared/Loading';
import styles from './layout.module.scss';
import Dashboard from '../pages/admin/dashboard';

function AppBar() {
    const [cookie, setCookie] = useCookies(['token']);
    const appContext = useContext(AppContext);
    let token;
    const [search, setSearch] = useState('');
    const [resq, setresq] = useState('');
    const [loading, setLoading] = useState(false);
    const [statistics, setStatistics] = useState([]);

    const checkLogin = async () => {
        token = appContext.appState.token || cookie?.token;
        if (!token) return;
        setLoading(true);
        const res = await Api.fetch({ url: 'user', token });
        if (res?.email) {
            appContext.login(token, res);
            setresq(res.role);
        } else {
            appContext.logout();
            setCookie('token', null);
        }
        setLoading(false);
    };

    useEffect(() => {
        getStatistics();
        checkLogin();
    }, []);

    const onLogout = async () => {
        setCookie('token', null);
        token = appContext.appState.token || cookie?.token;
        if (!token) return;
        await Api.fetch({ method: 'PUT', url: 'logout', token });
        appContext.logout();
        window.location.href = '/login';
    };

    const getStatistics = async () => {
        const response = await Api.fetch({ url: 'statistics', token: localStorage.getItem('token') });
        if (response) setStatistics(response.data);
    };

    return (
      <Navbar expand="lg"   style={{backgroundColor: '#9F5449' }}>
            <Container fluid>
                <Link to="/" className="navbar-brand" style={{ color: 'white' }}>My Store</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                     {loading ? (
                           <Loading />
                            ) : (
                            <>
                                {!appContext.appState.user ? (
                                    <>
                                        <Link to="/login" className="nav-link" style={{ color: 'white' }}>Login</Link>
                                    </>
                                ) : (
                                    
                                    <>
                                        {resq === 'admin' ? (
                                            <>
                                                  <Link to={`/admin/dashboard`} className="nav-link" style={{ color: 'white' }}>Dashboard</Link>  
                                                
                                     
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/user" className="nav-link" style={{ color: 'white' }}>My Details</Link>
                                                <Link to="/orders" className="nav-link" style={{ color: 'white' }}>My Orders</Link>
                                            </>
                                        )}
                                        <Link onClick={onLogout} className="nav-link" style={{ color: 'white' }}>Logout</Link>
                                    </>
                                )}
                            </>
                            )}   
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            onClick={(e) => appContext.setSearch(search)}
                            variant="outline-success"
                            style={{ color: 'white' ,borderColor :'white'}} >
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppBar;
