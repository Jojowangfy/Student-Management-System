import {Formik} from "formik";
import * as Yup from 'yup';
import {TextField} from "./TextField";
import {Button, Form} from "antd";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, Navigate, useNavigate} from "react-router-dom";

const LoginForm = () => {
    const options = [
        {key: 'Username', value: 'userName'},
        {key: 'password', value: 'password'}]
    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const onSubmit = values => {
        console.log('Form data', values)
    }

    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {formik => (
            <div>
                <h1 className="my-4 font-weight-bold-display-4">Log In</h1>
                {console.log(formik.values)}
                <Form>
                    <TextField label='Username' name='userName' type='text'/>
                    <TextField label='Password' name='password' type='text'/>
                </Form>
            </div>

        )}


    </Formik>
}

function Login() {
    // const nagivate = useNavigate();
    const [goToRegister, setGoToRegister] = React.useState(false);
    if (goToRegister) return <Navigate to='/register'/>

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-5'>
                    <LoginForm/>
                    <Button>Log in</Button>
                    {/*<Link style={{padding: '20px'}} onClick={() => nagivate('/register')}>Don't have an account? Sign*/}
                    {/*    up*/}
                    {/*    here!</Link>*/}
                    <Link style={{padding: '20px'}} onClick={() => setGoToRegister(true)}>Don't have an account? Sign
                        up
                        here!</Link>
                </div>
                <div className='col-md-7'>
                    {/*<img className='img-fluid w-100' src={rocketImg} alt=""/>*/}
                </div>
            </div>

        </div>
    )
}

export default Login;