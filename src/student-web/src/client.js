import fetch from 'unfetch';

// const getAllStudent = () => fetch('/students')

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e
        })
        return Promise.reject(error);
    }
}

export const getAllStudents = () => fetch('/students').then(checkStatus);
export const addNewStudent = student =>
    fetch('/students', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(student)
    }).then(checkStatus);

export const deleteStudent = matricNumber =>
    fetch(`/students/${matricNumber}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        // body: JSON.stringify(matricNumber)
    }).then(checkStatus);

export const updateStudent = student =>
    fetch(`/students`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(student)
    }).then(checkStatus);

export const addNewUser = user =>
    fetch('/register', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(user)
    }).then(checkStatus);