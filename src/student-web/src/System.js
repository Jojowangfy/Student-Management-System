import React, {Component} from "react";
import {Avatar, Table, Spin, Modal, Empty, Button} from 'antd';
import 'antd/dist/reset.css';
import {addNewStudent, deleteStudent, getAllStudentsByUserId, updateStudent} from './client'
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import {errorNotification} from "./Notification";
import UpdateStudentForm from "./forms/UpdateStudentForm";
import {useNavigate} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import fetch from "unfetch";
import Logout from "./Logout";


class System extends Component {
    state = {
        students: [],
        isFetching: false,
        isAddStudentModalVisible: false,
        isUpdateStudentModalVisible: false,
        userId: sessionStorage.getItem('userId')
    }


    componentDidMount() {
        this.fetchStudent(this.state.userId);
    }


    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})


    closeUpdateStudentModal = () => this.setState({isUpdateStudentModalVisible: false})

    fetchStudent = (userId) => {
        this.setState({isFetching: true});
        getAllStudentsByUserId(userId)
            .then(res => res.json()
                .then(students => {
                    console.log(students)
                    this.setState({
                        students: students,
                        isFetching: false
                    })
                }))
            .catch(error => {
                console.log(error.error)
                const message = error.error.message;
                const description = error.error.error;
                errorNotification(message, description)
                this.setState({
                    isFetching: false
                })
            });
    }


    handleDelete = (userId, matricNumber) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this student?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                deleteStudent(userId, matricNumber).then(() => {
                    this.fetchStudent(userId);
                });
            },
        });
    };


    handleUpdate = (student) => {
        this.setState({isUpdateStudentModalVisible: true});
    }


    render() {
        const {
            students, isFetching,
            isAddStudentModalVisible, isUpdateStudentModalVisible,
        } = this.state;

        const userId = sessionStorage.getItem("userId")

        const logoutNavBar = () => (
            <Navbar>
                <Button type="primary" onClick={this.handleLogout}
                        style={{position: 'absolute', top: 0, right: 0}}>
                    Logout
                </Button>
            </Navbar>
        )

        const commonElements = () => (
            <div>
                <Modal
                    title='Add new student'
                    open={isAddStudentModalVisible}
                    onOk={this.closeAddStudentModal}
                    onCancel={this.closeAddStudentModal}
                    width={1000}>
                    <AddStudentForm
                        onSuccess={(userId) => {
                            this.closeAddStudentModal();
                            this.fetchStudent(userId);
                        }}
                        onFailure={(err) => {
                            const message = err.error.message;
                            const description = err.error.httpStatus;
                            // JSON.stringify(err);
                            errorNotification(message, description);
                        }}/>
                </Modal>
                <Footer
                    numberOfStudents={students.length}
                    handleAddStudentClickEvent={this.openAddStudentModal}/>
            </div>
        )
        if (isFetching) {
            return (
                <Container>
                    <Spin tip='loading'></Spin>
                </Container>
            )
        }
        if (students && students.length) {

            const columns = [
                {
                    title: '',
                    key: 'avatar',
                    render: (text, student) => {
                        return <Avatar size={"large"}>
                            {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
                        </Avatar>
                    }
                },
                {
                    title: 'Matric Number',
                    dataIndex: 'matricNumber',
                    key: 'matricNumber'
                }, {
                    title: 'First Name',
                    dataIndex: 'firstName',
                    key: 'firstName'
                }, {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                    key: 'lastName'
                }, {
                    title: 'Gender',
                    dataIndex: 'gender',
                    key: 'gender'
                }, {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email'
                }, {
                    title: 'Major',
                    dataIndex: 'major',
                    key: 'major'
                }, {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status'
                }, {
                    title: 'Update',
                    dataIndex: 'update',
                    key: 'update',
                    render: (text, student) => {
                        return <Button type='primary'
                                       onClick={() => {
                                           this.handleUpdate(student)
                                       }}
                        >
                            Update
                        </Button>
                    }
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, student) => {
                        return <Button type="primary" danger
                                       onClick={() => this.handleDelete(userId, student.matricNumber)}>
                            Delete</Button>
                    }

                }

            ];

            return (
                <Container>
                    <Logout/>
                    <Table
                        style={{paddingBottom: '100px'}}
                        dataSource={students}
                        columns={columns}
                        paginationw={false}
                        rowKey='matricNumber'/>
                    <Modal
                        title='Edit Student'
                        open={isUpdateStudentModalVisible}
                        onCancel={this.closeUpdateStudentModal}
                        onOk={this.closeUpdateStudentModal}
                    >
                        <UpdateStudentForm
                            onSuccess={() => {
                                this.closeUpdateStudentModal();
                                this.fetchStudent(userId)
                            }}
                            onFailure={(err) => {
                                const message = err.error.message;
                                const description = err.error.httpStatus;
                                // JSON.stringify(err);
                                errorNotification(message, description);
                            }}/>
                    </Modal>
                    {commonElements()}
                </Container>)
        }
        return (
            <Container>
                <Logout/>
                <Empty description={
                    <h1>No Students Found!</h1>
                }/>
                {commonElements()}
            </Container>
        )
    }

}

export default System;
