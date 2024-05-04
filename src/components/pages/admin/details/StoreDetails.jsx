import React, { useState, useEffect } from "react";
import Api from "../../../../tools/api";
import Button from 'react-bootstrap/Button'; // استيراد زر من مكتبة React Bootstrap
import '../../css/ShowUsers.css'
import Table from 'react-bootstrap/Table'; // استيراد جدول من مكتبة React Bootstrap
import Dashboard from "../dashboard";
import icon from "../../../../icon/user.png"

function StoreDetails() {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        getStatistics(); 
    }, []);
      
    const getStatistics = async () => {
        try {
            const response = await Api.fetch({ 
                url: 'statistics' 
            });

            if (response != null && response.data) {
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
                        
                        <h4>All Users</h4>
                        <i class="fas fa-home"></i>
                        <span class="counter" >{statistics['user']}</span>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                        <h4> All Catigory</h4>
                        <span class="counter">{statistics['category']}</span>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                     <h4>all Products</h4>
                     <span class="counter">{statistics['product']}</span>

                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div class="single_member_counter">
                        <h4>all Orders</h4>
                        <span class="counter">{statistics['order']}</span>
                   </div>
                </div>

            </div>
        </div>
            
        </div>
        </div>
    );
}

export default StoreDetails;
