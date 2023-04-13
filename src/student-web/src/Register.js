import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {TextField} from "./TextField";
import {Button} from "antd";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {addNewUser} from "./client";
import {errorNotification} from "./Notification";

const RegisterForm = ({onSuccess, onFailure}) => {
    const initialValues = {
        userName: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Password must match')
            .required('Required')
    })

    const onSubmit = (user, {setSubmitting}) => {
        addNewUser(user)
            .then(() => {
                onSuccess();
            })
            .catch(err => {
                onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
                    <Form>
                        <TextField label='Username' name='userName' type='text'/>
                        <TextField label='Password' name='password' type='password'/>
                        <TextField label='Confirm Password' name='confirmPassword' type='password'/>
                        <ErrorMessage name='confirmPassword'/>
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={formik.isSubmitting}
                        >
                            Register
                        </Button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

function Register() {
    const navigate = useNavigate();
    const [goToLogin, setGoToLogin] = React.useState(false);

    const onSuccess = () => {
        // handle success, e.g., show success message or redirect
    }

    const onFailure = (err) => {
        const message = err.error.message;
        const description = err.error.httpStatus;
        // JSON.stringify(err);
        errorNotification(message, description);
    }

    if (goToLogin) return <Navigate to='/login'/>

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-5'>
                    <RegisterForm onSuccess={onSuccess} onFailure={onFailure}/>
                    <Link style={{padding: '20px'}} onClick={() => setGoToLogin(true)}>
                        Already have an account? Login here
                    </Link>
                </div>
                <div className='col-md-7'>
                    {/*<img className='img-fluid w-100' src={rocketImg} alt=""/>*/}
                </div>
            </div>
        </div>
    )
}

export default Register;
