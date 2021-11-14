import '../../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../core';
import { GlobalContext } from '../../context/Context';
import { useContext } from "react";
import PostCard from './Postcard';


function MyPosts() {

    let { state, dispatch } = useContext(GlobalContext);
    const [myposts, setMyposts] = useState([])


    useEffect(() => {
        axios.get(`${baseurl}/api/v1/mypost`,
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response.data)
                setMyposts(response.data)
                console.log(myposts)
            })
            .catch(err => alert("Error in getting data"))
    }, [])




    return (
        <>
            <div className="app-main">
                <h1> My Posts </h1>
                <div id="post">
                    {myposts?.map((posts, index) => (
                        <div className="postcard">
                            <PostCard
                                key={index}
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

export default MyPosts;