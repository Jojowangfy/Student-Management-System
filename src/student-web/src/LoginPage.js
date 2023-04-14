import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from 'yup';
import {TextField} from "./TextField";
import {Button, Form} from "antd";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {loginUser} from "./client";
import System from "./System";
import fetch from "unfetch";
import {errorNotification} from "./Notification";

// let goToSystem = false;
const LoginForm = () => {

    const options = [
        {key: 'userId', value: 'userId'},
        {key: 'userName', value: 'userName'},
        {key: 'password', value: 'password'}]
    const initialValues = {
        userId: '',
        userName: '',
        password: '',
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            // const response = await fetch('/login', {
            //     headers: {'Content-Type': 'application/json'},
            //     method: 'POST',
            //     body: JSON.stringify(values)
            // });
            const response = await loginUser(values);
            console.log(values)
            // const data = await response.json();
            const data = await response.json();
            console.log(data)
            // if (response.ok) {
            if (response.ok) {
                console.log('Login success');
                sessionStorage.setItem('userId', data.userId);


                navigate(`/students/${data.userId}`)

            } else {
                // 登录失败，显示错误信息
                errorNotification('Login Failed', data.message);
            }
        } catch (error) {
            errorNotification('Login Failed', error);
        }

    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold-display-4">Log In</h1>
                    <Form>
                        <TextField label='Username' name='userName' type='text'/>
                        <TextField label='Password' name='password' type='password'/>
                        <Button type='primary' onClick={formik.handleSubmit}>Log in</Button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

function Login() {
    const navigate = useNavigate();
    const [goToRegister, setGoToRegister] = React.useState(false);
    if (goToRegister) return <Navigate to='/register'/>

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-5'>
                    <LoginForm/>
                    <br/>
                    <Link onClick={() => setGoToRegister(true)}>
                        Don't have an account? Sign up here!</Link>
                </div>
                <div className='col-md-7'>
                    {/*<img className='img-fluid w-100' src={rocketImg} alt=""/>*/}
                </div>
            </div>
        </div>
    )
}

export default Login;