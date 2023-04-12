import React, {Component} from "react";
import {Avatar, Table, Spin, Modal, Empty, Button} from 'antd';
import 'antd/dist/reset.css';
import {addNewStudent, deleteStudent, getAllStudents} from './client'
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import {errorNotification} from "./Notification";

class App extends Component {
    state = {
        students: [],
        isFetching: false,
        isAddStudentModalVisible: false,
        isUpdateStudentModalVisible: false
    }

    componentDidMount() {
        this.fetchStudent()
    }

    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})

    openUpdateStudentModal = () => this.setState({isUpdateStudentModalVisible: true})
    closeUpdateStudentModal = () => this.setState({isUpdateStudentModalVisible: false})

    fetchStudent = () => {
        this.setState({isFetching: true})
        getAllStudents()
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

    handleDelete = (matricNumber) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this student?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => deleteStudent(matricNumber).then(this.fetchStudent),
        });
    };


    render() {
        const {students, isFetching, isAddStudentModalVisible} = this.state;
        const commonElements = () => (
            <div>
                <Modal
                    title='Add new student'
                    open={isAddStudentModalVisible}
                    onOk={this.closeAddStudentModal}
                    onCancel={this.closeAddStudentModal}
                    width={1000}>
                    <AddStudentForm
                        onSuccess={() => {
                            this.closeAddStudentModal();
                            this.fetchStudent()
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
                    render: () => <Button
                        // onClick={() => submitForm()}
                        type="submit"
                    >
                        Update</Button>,
                },
                {
                    title: 'Delete',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, student) => {
                        return <Button type="danger"
                                       onClick={() => this.handleDelete(student.matricNumber)}>
                            Delete</Button>
                    }

                }

            ];

            return (
                <Container>
                    <Table
                        style={{marginBottom: '100px'}}
                        dataSource={students}
                        columns={columns}
                        pagination={false}
                        rowKey='matricNumber'/>
                    {commonElements()}
                </Container>)
        }
        return (
            <Container>
                <Empty description={
                    <h1>No Students Found!</h1>
                }/>
                {commonElements()}
            </Container>
        )
    }

}

export default App;
