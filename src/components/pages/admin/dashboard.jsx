import './dashboard.scss';
import { Link, useLocation } from "react-router-dom";
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
    const [selectedItem, setSelectedItem] = useState(null); // حالة لتتبع العنصر المحدد
    const location = useLocation(); // استخدام useLocation للحصول على الموقع الحالي

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

    useEffect(() => {
        // تحديث العنصر المحدد بناءً على المسار الحالي
        const paths = [
            "/admin/user",
            "/admin/detalis",
            "/admin/users",
            "/admin/catgiores",
            "/admin/products",
            "/admin/orders",
            "/"
        ];
        const currentIndex = paths.indexOf(location.pathname);
        setSelectedItem(currentIndex);
    }, [location.pathname]);

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

    const handleItemClick = (index) => {
        setSelectedItem(index); // تحديث العنصر المحدد عند النقر
    };

    return (
        <div className="wrapper">
            <div className="sidebar">
                <Link to="/"><h2>Admin</h2></Link>
                <ul>
                    {[
                        { to: "/admin/user", icon: "fas fa-home", label: "Profile" },
                        { to: "/admin/detalis", icon: "fas fa-address-book", label: "Store Details" },
                        { to: "/admin/users", icon: "fas fa-user", label: "Users Edit" },
                        { to: "/admin/catgiores", icon: "fas fa-blog", label: "Catigory Edit" },
                        { to: "/admin/products", icon: "fas fa-address-card", label: "Products Edit" },
                        { to: "/admin/orders", icon: "fas fa-address-card", label: "Orders Edit" },
                        { to: "/", icon: "fas fa-address-card", label: "Go Back" },
                        { to: "/", icon: "fas fa-address-book", label: "Logout", onClick: onLogout }
                    ].map((item, index) => (
                        <li key={index} 
                            className={selectedItem === index ? 'selected' : ''} 
                            onClick={() => handleItemClick(index)}>
                            <Link to={item.to} onClick={item.onClick}>
                                <i className={item.icon}></i>{item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
