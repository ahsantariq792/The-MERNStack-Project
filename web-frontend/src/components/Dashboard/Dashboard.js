import '../../App.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import Postcard from './Postcard';
import axios from 'axios';
import { baseurl } from '../../core';
import { GlobalContext } from '../../context/Context';
import { useContext } from "react";
import moment from 'moment';




const validationSchema = yup.object({
    post: yup
        .string('Enter your password')
        .min(4, 'Name should be of minimum 4 characters length')
        .required('Name is required'),

});





function Dashboard() {

    const [toggleGetUser, setToggleGetUser] = useState(false);
    let { state, dispatch } = useContext(GlobalContext);
    const [posts, setPosts] = useState([])
    let history = useHistory();

    const submit = (values, { resetForm }) => {
        console.log("values", values)
        let m=moment().format('MMMM Do YYYY')
        console.log(m)
        axios.post(`${baseurl}/api/v1/post`,
            {
                post: values.post,
                time: m
            }, {
            withCredentials: true
        })
            .then(res => {
                console.log("postdata", res.data);
                resetForm({});
                setToggleGetUser(!toggleGetUser)

            })
    }

    useEffect(() => {
        axios.get(`${baseurl}/api/v1/post`,
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch(err => alert("Error in getting data"))
    }, [toggleGetUser])





    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            post: '',

        },
        onSubmit: submit
    },
    );

    return (
        <>
            <div className="app-main">
                <div className="post-main">
                    <form id="post-form" onSubmit={formik.handleSubmit}>

                        <h3 style={{ padding: "5%" }}> What's on Your Mind </h3>


                        <TextField
                            id="outlined-basic"
                            name="post"
                            label="post"
                            type="post"
                            className="box"
                            id="postbox"

                            value={formik.values.caption}
                            onChange={formik.handleChange}


                            error={formik.touched.caption && Boolean(formik.errors.caption)}
                            helperText={formik.touched.caption && formik.errors.caption}

                            variant="outlined" />


                        <Button id="btn" variant="contained" color="success" type="submit">
                            Post
                        </Button>
                    </form>
                </div>

                <div id="posts">
                    {posts?.map(posts => (
                        // <div id="cont">
                        //     <h3 id="post-name">{posts?.name}</h3>
                        //     <hr />
                        //     <p id="post-item">{posts?.post}</p>
                        //     <p className="buttonbox">
                        //         <button className="btn">Like</button>
                        //         <button className="btn">Comment</button>
                        //         <button className="btn">Share</button>
                        //     </p>
                        // </div>
                        <div className="postcard">
                            <Postcard 
                                name={posts?.name}
                                time={posts?.time}
                                post={posts?.post}
                            />
                        </div>
                    )

                    )}
                </div>
            </div>



        </>
    );
}

export default Dashboard;