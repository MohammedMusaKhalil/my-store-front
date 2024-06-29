import React, { useState, useEffect } from "react";
import Api from "../../../../tools/api";
import Button from 'react-bootstrap/Button'; 
import '../../css/ShowUsers.css'
import Dashboard from "../dashboard";
import icon1 from "./imags/user.png"
import icon2 from "./imags/catigory.png"
import icon3 from "./imags/product.svg"
import icon4 from "./imags/orders.png"
import Loading from '../../../shared/Loading';


function StoreDetails() {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStatistics(); 
    }, []);
      
    const getStatistics = async () => {
        try {
            setLoading(true);
            const response = await Api.fetch({ 
                url: 'statistics' 
            });

            if (response != null && response.data) {
                setLoading(false);
                setStatistics(response.data);
            }
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    }

    return (
        <div>
            <Dashboard/>
             <div className="main_content">
                <h1 style={{textAlign:'center',marginTop:'100px'}}>Store Details </h1>
            </div>
        <div className="main_content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' ,textAlign:'center'}}>
           
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                        <img src={icon1} alt=""  style={{width:"100px" ,height:"100px"}}/>
                        <h4>All Users</h4>
                        <i class="fas fa-home"></i>
                        {loading ? (
                           <Loading />
                            ) : (
                        <span class="counter" >{statistics['user']}</span>)}
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                    <img src={icon2} alt=""  style={{width:"100px" ,height:"100px"}}/>
                        <h4> All Catigory</h4>
                        {loading ? (
                           <Loading />
                            ) : (
                        <span class="counter">{statistics['category']}</span>)}
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                    <img src={icon3} alt=""  style={{width:"100px" ,height:"100px"}}/>
                     <h4>all Products</h4>
                     {loading ? (
                           <Loading />
                            ) : (
                     <span class="counter">{statistics['product']}</span>)}

                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                    <img src={icon4} alt=""  style={{width:"100px" ,height:"100px"}}/>
                        <h4>all Orders</h4>
                        {loading ? (
                           <Loading />
                            ) : (
                        <span class="counter">{statistics['order']}</span>)}
                   </div>
                </div>

            </div>
        </div>
            
        </div>
        </div>
    );
}

export default StoreDetails;
