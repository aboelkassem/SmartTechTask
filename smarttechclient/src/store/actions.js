import axios from 'axios';

// Types
const GET_EMPLOYEES = 'GET_EMPLOYEES';
const GET_DEPARTMENTS = 'GET_DEPARTMENTS';
const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
const ADD_EMPLOYEES = 'ADD_EMPLOYEES';
const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES';


export function getEmployees(){
    const resp = axios.get('https://localhost:44321/api/employees')
    return dispatch => {
        resp.then(({data}) => {
            dispatch({
                type:GET_EMPLOYEES, 
                employees: data
            });
        })
    }
}

export function getDepartments(){
    const resp = axios.get('https://localhost:44321/api/departments')
    return dispatch => {
        resp.then(({data}) => {
            dispatch({
                type:GET_DEPARTMENTS, 
                departments: data
            });
        })
    }
}

export function addEmployee(emp){
    const resp = axios.post('https://localhost:44321/api/employees', emp)
    return dispatch => {
        resp.then(({data}) => {
            dispatch({
                type:ADD_EMPLOYEES, 
                employee: data
            });
        })
    }
}

export function deleteEmployee(id){
    const resp = axios.delete('https://localhost:44321/api/employees/'+ parseInt(id))
    return dispatch => {
        resp.then(({data}) => {
            dispatch({
                type:DELETE_EMPLOYEES,
                index: id
            });
        })
    }
}

export function addDepartment(dept){
    const resp = axios.post('https://localhost:44321/api/department', dept)
    return dispatch => {
        resp.then(({data}) => {
            dispatch({
                type:ADD_DEPARTMENT,
                department: data
            });
        })
    }
}
