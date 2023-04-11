import React, {Component} from "react";
import {Avatar, Table, Spin, Modal} from 'antd';
import 'antd/dist/reset.css';
import {getAllStudents} from './client'
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";


class App extends Component {
    state = {
        students: [],
        isFetching: false,
        isAddStudentModalVisible: false
    }

    componentDidMount() {
        this.fetchStudent()
    }

    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})

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
                }));
    }

    render() {
        const {students, isFetching, isAddStudentModalVisible} = this.state;

        if (isFetching) {
            return (
                <Container>
                    <Spin tip='loading'></Spin>
                </Container>
            )
        }
        if (students && students.length) {
            // return students.map((student, index) => {
            //     return (
            //         <div key={index}>
            //             <h2>{student.matricNumber}</h2>
            //             <p>{student.firstName}</p>
            //             <p>{student.lastName}</p>
            //             <p>{student.gender}</p>
            //             <p>{student.email}</p>
            //         </div>
            //     )
            // })

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
                }
            ];

            return (
                <Container>
                    <Table
                        dataSource={students}
                        columns={columns}
                        pagination={false}
                        rowKey='matricNumber'/>
                    <Modal
                        title='Add new student'
                        visible={isAddStudentModalVisible}
                        onOk={this.closeAddStudentModal}
                        onCancel={this.closeAddStudentModal}
                        width={1000}>
                        <AddStudentForm/>
                    </Modal>
                    <Footer
                        numberOfStudents={students.length}
                        handleAddStudentClickEvent={this.openAddStudentModal}/>
                </Container>)
        }
        return <h1>No Students Found!</h1>

    }

}

export default App;
