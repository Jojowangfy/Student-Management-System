import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "./TextField";
import {Button} from "antd";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {loginUser} from "./client";
import studyImg from "./studyImg.jpeg";
import {errorNotification} from "./Notification";

const LoginForm = () => {
    const initialValues = {
        userName: "",
        password: "",
    };

    const validationSchema = Yup.object({
        userName: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const response = await loginUser(values);
            const data = await response.json();
            if (response.ok && data.status === true) {
                // console.log("登录成功");
                sessionStorage.setItem("userId", data.userId);
                navigate("/students");
            } else {
                errorNotification("Log in Failed", data.message)
                // console.error("登录失败", data.message);
            }
        } catch (error) {
            errorNotification("Log in Failed", error.message);
            // console.error("登录失败", error);
        }
    };

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
                        <TextField label="Username" name="userName" type="text"/>
                        <TextField label="Password" name="password" type="password"/>
                        <Button type="primary" onClick={formik.handleSubmit}>
                            Log in
                        </Button>
                        <ErrorMessage
                            name="userName"
                            render={msg => (
                                <div className="text-danger">{formik.touched.userName && msg}</div>
                            )}
                        />
                        <ErrorMessage
                            name="password"
                            render={msg => (
                                <div className="text-danger">{formik.touched.password && msg}</div>
                            )}
                        />
                    </Form>
                </div>
            )}
        </Formik>
    );
};

function Login() {
    const navigate = useNavigate();
    const [goToRegister, setGoToRegister] = React.useState(false);
    if (goToRegister) return <Navigate to="/register"/>;

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-5">
                    <LoginForm/>
                    <br/>
                    <Link onClick={() => setGoToRegister(true)}>
                        Don't have an account? Sign up here!
                    </Link>
                </div>
                <div className="col-md-7">
                    <img className="img-fluid w-100" src={studyImg} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Login;
