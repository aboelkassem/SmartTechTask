import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducers = (state, action) => {
    switch (action.type){
        case 'GET_EMPLOYEES':
            return {
                ...state,
                employees: action.employees
            }
        case 'GET_DEPARTMENTS':
            return {
                ...state,
                departments: action.departments
            }
        case 'ADD_EMPLOYEES':
            return {
                ...state,
                employees: [...state.employees, action.employee]
            };
        case 'ADD_DEPARTMENT':
            return {
                ...state,
                departments: [...state.departments, action.department]
            };
        case 'DELETE_EMPLOYEES':{
            const item_index = action.index - 1;
            const employees = [...state.employees];
            employees.splice(item_index, 1);
            return {
                ...state,
                employees: [...employees]
            };
        }
        default:
            return state;
    }
}


const initialState = {
    employees: [],
    departments: []
}

export default createStore(reducers, initialState, applyMiddleware(thunk));