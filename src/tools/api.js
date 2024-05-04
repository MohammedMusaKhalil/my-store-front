/**
 * This class is used to call API ....
 */
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Api {
    static baseUrl = 'http://127.0.0.1:8000/api/';

    /**
     * call api function
     * @param {url} api to call ...etc
     * @param {showPopup} function to show error/response message
     * @returns Promise
     */
    static async fetch({ url, params, showPopup, method, customMessage, body, token }) {
        // init params
        url = this.baseUrl + url

        // call API
        let res
        try {
            // set params
            if (params != null)
                url = `${url}?${new URLSearchParams(params)}`
            console.log(`url: ${url}`);
            console.log(JSON.stringify(body));

            // set header
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            if (token != null) {
                headers['Authorization'] = `Bearer ${token}`
               // alert(" is not Add Order Go to login ")
            }

            // check method
            if (method == null || method == 'GET') {
                res = await fetch(url, { headers: headers })
            } else if (method == 'POST' || method == 'PUT'||method == 'DELETE') {
                res = await fetch(url, {
                    method: method,
                    body: body != null ? JSON.stringify(body) : body,
                    headers: headers,
                })
                // log response
                console.log(res);
            }
        } catch (e) {
            // log error
            if (res) {
                console.log(await res.text());
            }
            return null;
        }

        if (res == null) {
            // show error message
            if (showPopup != null)
                showPopup(customMessage ?? 'Something went wrong while retriving data from Server!')
            return null;
        }

        // check the resposne 
        if (res.ok) {// resposne was success
            const response = await res.json() // convert object 
            console.log('response:');
            console.log(response);
            if (showPopup != null)
                showPopup(response.message) // show response message
            return response
        } else {
            // init error response
            let response
            try {
                response = await res.json();
                console.log(response);
            } catch (e) {
                console.log(e);
            }

            // show error message
            if (showPopup != null) {
                let message = customMessage ?? 'Something went wrong while retriving data from Server!'
                if (response?.message != null)
                    message = response.message
                showPopup(message)
            }
        }
        return null;
    }
}