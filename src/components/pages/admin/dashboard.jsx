import './dashboard.scss';
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../layout/Layout";
import { useCookies } from 'react-cookie';
import Api from '../../../tools/api';

export default function Dashboard() {
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
        <div className="wrapper">
            <div className="sidebar">
                <Link to="/"><h2>Admin</h2></Link>
                <ul>
                    <li><Link to="/admin/user"><i className="fas fa-home" ></i>Profile</Link></li>
                    <li><Link to="/admin/detalis"><i className="fas fa-address-book"></i>Store Details</Link></li>
                    <li><Link to="/admin/users"><i className="fas fa-user"></i>Users Edit</Link></li>
                    <li><Link to="/admin/catgiores"><i className="fas fa-blog"></i> Catigory Edit</Link></li>
                    <li><Link to="/admin/products"><i className="fas fa-address-card"></i>Products Edit</Link></li>
                    <li><Link to="/admin/orders"><i className="fas fa-address-card"></i> Orders Edit</Link></li>
                    <li><Link to="/"><i className="fas fa-address-card"></i>Go Back</Link></li>
                    <li><Link onClick={onLogout}><i className="fas fa-address-book"></i>Logout</Link></li>
                </ul> 
            </div>
        </div>
       
    );
}
