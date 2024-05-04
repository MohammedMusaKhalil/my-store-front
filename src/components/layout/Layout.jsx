import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import styles from './layout.module.scss'
import { createContext, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from "../MyApp";

export const AppContext = createContext({})

export default function Layout() {
    const authContext = useContext(AuthContext)
    const [appState, setAppState] = useState({
        popup: {
            show: false,
            message: '',
        },
        search: '',
        category: null,
        user: null,
        token: null, // cookie
        cart: [{ id: 1, qty: 2 }] // cookie
    })
    const closePopup = () => setAppState({ ...appState, popup: { show: false } });
    const showPopup = (msg) => setAppState({ ...appState, popup: { message: msg, show: true } });
    const setSearch = (newText) => setAppState({ ...appState, search: newText })
    const setCategory = (newCategory) => setAppState({ ...appState, category: newCategory })
    // const setToken = (token) => setAppState({ ...appState, token })
    // const setUser = (user) => setAppState({ ...appState, user })
    const login = (token, user) => {
        authContext.setAuthState(true)
        setAppState({ ...appState, token, user })
    }
    const logout = () => {
        authContext.setAuthState(false)
        setAppState({ ...appState, token: null, user: null })
    }
    return <AppContext.Provider value={{
        appState, setAppState, closePopup, showPopup, setSearch, setCategory,
        // setToken, setUser
        login, logout
    }}>
        <div >
            <div className={styles.page}>
                <Outlet />
            </div>
            <Footer />
            <Modal show={appState.popup.show} onHide={closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{appState.popup.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closePopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </AppContext.Provider>
}