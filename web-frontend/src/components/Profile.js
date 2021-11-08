import axios from 'axios';
import { useState, useEffect, useRef } from "react"
import { baseurl } from '../core';
import { GlobalContext } from '../context/Context';
import { useContext } from "react";

function Profile() {

    let { state, dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState({})

    useEffect(() => {

        axios.get(`${baseurl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)
            })
    }, [])


    return (
        <>
            <div className="profile">

                <h1 id="profileheader">My Profile</h1>


                <h2 id="personaldtl">Personal Details</h2>

                <div className="info">
                    <h3>Name:{profile?.name} </h3>
                    <h4>Email: {profile?.email} </h4>
                    
                </div>
            </div>

            
        </>
    );
}

export default Profile;


