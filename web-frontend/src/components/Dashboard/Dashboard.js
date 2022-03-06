import '../../App.css';
import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
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
import io from 'socket.io-client';



const validationSchema = yup.object({
    post: yup
        .string('Enter your password')
        .min(4, 'Name should be of minimum 4 characters length')
        .required('Name is required'),

});





function Dashboard() {

    let { state, dispatch } = useContext(GlobalContext);
    const [posts, setPosts] = useState([])
    // let history = useHistory();
    const [isMore, setIsMore] = useState(true)

    const submit = (values, { resetForm }) => {
        console.log("values", values)
        let m = moment().format('MMMM Do YYYY')
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

            })
    }

    useEffect(() => {
        axios.get(`${baseurl}/api/v1/post?page=0`,
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch(err => alert("Error in getting data"))
    }, [])


    useEffect(() => {
        const socket = io(baseurl);
        // to connect with locally running Socker.io server

        socket.on('connect', function () {
            console.log("connected to server")
        });

        socket.on('disconnect', function (message) {
            console.log("disconnected from server: ", message);
        });

        socket.on('POSTS', function (data) {
            console.log(data);
            setPosts((prev) => [data, ...prev])
        });

        return () => {
            socket.close();
        };
    }, []);

    const loadMore = () => {
        axios.get(`${baseurl}/api/v1/post?page=${posts.length}`,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log("res +++: ", res.data);
                if (res.data?.length) {
                    const newPosts = [...posts, ...res.data]
                    setPosts(newPosts)
                } else {
                    setIsMore(false)
                }
            })
    }





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
                            // id="postbox"

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
                    {posts?.map((posts, index) => (
                        <div className="postcard">
                            <Postcard
                                key={index}
                                name={posts?.name}
                                time={posts?.time}
                                post={posts?.post}
                            />
                        </div>
                    )

                    )}
                {(isMore) ? <Button id="loadmorebtn" onClick={loadMore}> &#x2193; Load More</Button>
                 : 
                 <p id="nopost">No More Posts</p>
                
                }

                </div>
            </div>



        </>
    );
}

export default Dashboard;