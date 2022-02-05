import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";

import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseurl } from "./../../core"

import { GlobalContext } from '../../context/Context';
import { useContext } from "react";
import '../../App.css'


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});
const validationSchema_step2 = yup.object({
    otp: yup
        .string('Enter your otp')
        .required('otp is required'),
    // newPassword: yup
    //     .string('Enter your new password')
    //     .required('password is required'),
    // confirmPassword: yup
    //     .string('Enter your new password')
    //     .required('password is required'),
});

function ForgetPassword() {
    let history = useHistory();

    let { state, dispatch } = useContext(GlobalContext);

    const [email, setEmail] = useState("")
    const [step, setStep] = useState(1)

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            email: '',
        },
        onSubmit: function (values) {

            setEmail(values.email)
            axios.post(`${baseurl}/api/v1/otp`, {
                email: values.email
            })
                .then((res) => {
                    console.log("res: ", res.data);

                    if (res.data) {
                        setStep(2)
                    }
                })
        }
    });



    const formik_step2 = useFormik({
        validationSchema: validationSchema_step2,

        initialValues: {
            otp: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: function (values) {
            console.log(values)

            axios.post(`${baseurl}/api/v1/forget`, {
                email: email,
                otp: values.otp,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    alert("password updated");
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert("otp not valid");
                    }
                })
        }
    });

    return (
        <div style={{ margin: "2rem" }}>

            {(step === 1) ?
                <div className="app-main">
                    <div className="main">
                        <h1>Forget Password</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>

                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"

                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}

                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <Button id="btn" variant="contained" color="success" type="submit">
                                    send Email
                                </Button>
                            </Stack>
                        </form>
                    </div>
                </div> :

                <div className="app-main">
                    <div className="main">
                        <form onSubmit={formik_step2.handleSubmit}>
                            <Stack spacing={2}>

                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="Otp"
                                    variant="outlined"

                                    name="otp"
                                    value={formik_step2.values.otp}
                                    onChange={formik_step2.handleChange}

                                />
                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="New Password"
                                    variant="outlined"
                                    type="password"

                                    name="newPassword"
                                    value={formik_step2.values.newPassword}
                                    onChange={formik_step2.handleChange}

                                />
                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="Confirm Password"
                                    variant="outlined"
                                    type="password"

                                    name="confirmPassword"
                                    value={formik_step2.values.confirmPassword}
                                    onChange={formik_step2.handleChange}
                                />

                                <Button fullWidth="75%" id="btn" variant="contained" color="success" type="submit">
                                    Forget Password
                                </Button>
                            </Stack>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}
export default ForgetPassword;