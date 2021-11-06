// import '../App.css';
// import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from "@mui/material/Button";
// import { TextField } from '@mui/material';
// import axios from 'axios';
// import { baseurl } from '../core';
// import { GlobalContext } from '../context/Context';
// import { useContext } from "react";




// const validationSchema = yup.object({
//     caption: yup
//         .string('Enter your password')
//         .min(4, 'Name should be of minimum 4 characters length')
//         .required('Name is required'),

// });





// function Profile() {

//     const [toggleGetUser, setToggleGetUser] = useState(false);
//     let { state, dispatch } = useContext(GlobalContext);
//     const [profile, setProfile] = useState([])
//     let history = useHistory();

//     const submit = (values, { resetForm }) => {

//         if (localStorage.getItem('name') && localStorage.getItem('email')) {
//             console.log("values", values)
//             axios.post(`${baseurl}/api/v1/profile`,
//                 {
//                     name: values.name,
//                     email: values.email,
//                     caption: values.caption,
                    
    
//                 })
//                 .then(res => {
//                     console.log(res.data);
//                     resetForm({})
//                     setToggleGetUser(!toggleGetUser)
//                 })
//         }
    
//         else {
//             alert('You have to Login First')
//             console.log('you need to login')
//             history.push('/login')
//         }
//     }
    

    

//     useEffect(() => {

//         if (localStorage.getItem('name') && localStorage.getItem('email')) {

//         axios.get(`${baseurl}/api/v1/profile`)
//             .then(response => {
//                 console.log(response)
//                 console.log(response.data)
//                 setProfile(response.data)
//             })
//             .catch(err => alert("Error in getting data"))
//         }
//         else{
//             alert("Login First")
//             history.push('/login')
//         }
//     }, [toggleGetUser])


//     // console.log(profile)

//     const formik = useFormik({
//         validationSchema: validationSchema,
//         initialValues: {
//             name: localStorage.getItem('name'),
//             email: localStorage.getItem('email'),
//             caption: '',

//         },
//         onSubmit: submit
//     },
//     );

//     function dash(){
//         history.push("/dashboard")
//     }

//     return (
//         <>
//             <div className="app-main">
//                 <div className="post-main">
//                     Your Profile 
//                     <button className="dashbtn" onClick={dash}>Dashboard</button>
//                     <form id="post-form" onSubmit={formik.handleSubmit}>

//                         <h3 style={{padding:"5%"}}> What's on Your Mind </h3>


//                         <TextField
//                             id="outlined-basic"
//                             name="caption"
//                             label="post"
//                             type="caption"
//                             className="box"
//                             id="postbox"

//                             value={formik.values.caption}
//                             onChange={formik.handleChange}


//                             error={formik.touched.caption && Boolean(formik.errors.caption)}
//                             helperText={formik.touched.caption && formik.errors.caption}

//                             variant="outlined" />


//                         <Button id="btn" variant="contained" color="success" type="submit">
//                             Post
//                         </Button>
//                     </form>
//                 </div>

//                 <div id="posts">
//                     {profile?.map(profile => (
//                         <div id="cont">
//                             <h3 id="post-name">{profile.name}</h3>
//                             <hr/>
//                             <p id="post-item">{profile.caption}</p>
//                             <p className="buttonbox">
//                                 <button className="btn">Like</button>
//                                 <button className="btn">Comment</button>
//                                 <button className="btn">Share</button>
//                             </p>
//                         </div>
//                     )

//                     )}
//                 </div>
//             </div>



//         </>
//     );
// }

// export default Profile;



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
            <h1> Profile Page </h1>
            <p>{JSON.stringify(profile)}</p>

            <button onClick={() => {
                axios.get(`${baseurl}/api/v1/profile`, {
                    withCredentials: true
                })
                    .then((res) => {
                        console.log("res +++: ", res.data);
                        setProfile(res.data)
                    })
            }} >get profile</button>

            <button onClick={() => {
                axios.post(`${baseurl}/api/v1/logout`,{}, {
                    withCredentials: true
                })
                    .then((res) => {
                        console.log("res +++: ", res.data);

                        dispatch({
                            type: "USER_LOGOUT"
                        })
                    })
            }} >Logout</button>
        </>
    );
}

export default Profile;


