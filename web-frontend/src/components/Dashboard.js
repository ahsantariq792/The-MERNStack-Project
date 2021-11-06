import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "../App.css"


function Dashboard() {
    return (
        <>
            <div className="dashboard">
                <h1 id="wlm">Welcome To Dash Board !! </h1>
                <br />
                <h2 id="personaldtl">Personal Details</h2>
                <br /><br />
                <div className="info">
                    <h3>Name: {localStorage.getItem('name')}</h3>
                    <h4>Email: {localStorage.getItem('email')}</h4>
                    <h4>Phone Number: {localStorage.getItem('phone')}</h4>
                </div>
            </div>
        </>



    )
}
export default Dashboard;

