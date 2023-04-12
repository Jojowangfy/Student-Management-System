import React from 'react';
import {Formik} from 'formik';
import {render} from "@testing-library/react";
import {Input, Button, Tag} from "antd";
import {addNewStudent} from "../client";

const inputBottomMargin = {marginBottom: '5px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin}

const AddStudentForm = (props) => (

    <Formik
        initialValues={{
            matricNumber: '',
            firstName: '',
            lastName: '',
            gender: '',
            email: ''
        }}
        validate={values => {
            const errors = {};
            if (!values.matricNumber) {
                errors.matricNumber = 'Matric Number Required';
            }
            if (!values.firstName) {
                errors.firstName = 'First Name Required';
            }
            if (!values.lastName) {
                errors.lastName = 'Last Name Required';
            }
            if (!values.gender) {
                errors.gender = 'Gender Required';
            } else if (!['Female', 'female', 'FEMALE', 'Male', 'male', 'MALE'].includes(values.gender)) {
                errors.gender = 'Gender must be Female, female, FEMALE, Male, male, MALE'
            }

            if (!values.email) {
                errors.email = 'Email Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit={(student, {setSubmitting}) => {
            addNewStudent(student).then(() => {
                props.onSuccess();

            }).catch(err => {
                props.onFailure(err);
            }).finally(() => setSubmitting(false))

        }}>
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              submitForm,
              isValid
              /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputBottomMargin}
                    name="matricNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.matricNumber}
                    placeholder='Matric Number E.g. 22080801'
                />
                {errors.matricNumber && touched.matricNumber &&
                    <Tag style={tagStyle}>{errors.matricNumber}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder='First name E.g. Jojo'
                />
                {errors.firstName && touched.firstName &&
                    <Tag style={tagStyle}>{errors.firstName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder='Last name E.g. Wang'
                />
                {errors.lastName && touched.lastName &&
                    <Tag style={tagStyle}>{errors.lastName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder='Gender E.g. Female'
                />
                {errors.gender && touched.gender &&
                    <Tag style={tagStyle}>{errors.gender}</Tag>}
                <Input
                    style={inputBottomMargin}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Email E.g. fwang009@e.ntu.edu.sg'
                />
                {errors.email && touched.email &&
                    <Tag style={tagStyle}>{errors.email}</Tag>}
                <Button
                    onClick={() => submitForm()}
                    type="submit"
                    disabled={isSubmitting || (touched && !isValid)}>
                    Submit
                </Button>
            </form>
        )}
    </Formik>
)

export default AddStudentForm;