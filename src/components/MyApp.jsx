import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import Layout from "./layout/Layout";
import LoginPage from "./pages/login/login";
import UserDetailsPage from "./pages/home/user/UserDetails";
import AdminDetailsPage from "./pages/admin/details/AdminDetails";
import NoPage from "./pages/NoPage";
import OrdersPage from "./pages/home/orders/OrdersPage"
import OrdersPageAdmin from "./pages/admin/order/OrdersPage"
import { createContext, useState } from "react";
import ShowUsers from "./pages/admin/users/ShowUsers";
import ShowProduts from "./pages/admin/product/ShowProduct";
import AdminCategoriesPage from "./pages/admin/catigory/AdminCategoriesPage";
import StoreDetals from "./pages/admin/details/StoreDetails";
import Dashboard from "./pages/admin/details/AdminDetails"


export const AuthContext = createContext(false)

export default function MyApp() {
    const [authState, setAuthState] = useState(false)

    return <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    {
                        authState ?
                            <>
                                <Route path="user" element={<UserDetailsPage />} />
                                <Route path="orders" element={<OrdersPage />} />
                                <Route path="detalis" element={<StoreDetals/>} /> 

                                
                            </>
                            :
                            <>
                                <Route path="login" element={<LoginPage />} />
                            </>
                    }

                    <Route path="*" element={<NoPage />} />
                </Route>

                <Route path="/admin" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    {
                        authState ?
                            <>
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="user" element={<AdminDetailsPage />} />
                                <Route path="orders" element={<OrdersPageAdmin />} />
                                <Route path="users" element={<ShowUsers />} />
                                <Route path="products" element={<ShowProduts />} /> 
                                <Route path="catgiores" element={<AdminCategoriesPage />} /> 
                                <Route path="detalis" element={<StoreDetals/>} /> 

                                
                            </>
                            :
                            <>
                                <Route path="login" element={<LoginPage />} />
                            </>
                    }

                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthContext.Provider>
}