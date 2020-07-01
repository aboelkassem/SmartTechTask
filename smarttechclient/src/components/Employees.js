import React from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux';
import {getEmployees , deleteEmployee, addEmployee} from '../store/actions';

class Employees extends React.Component {

    componentDidMount(){
        this.props.getEmployeesFromStore();
    }
    
     render() {
        //console.log(this.props.employees);
        const departmentsOptions = {};
        this.props.employees.map(emp => {
            const { DepartmentID, DepartmentName } = emp;
            return(departmentsOptions[ DepartmentID ] = DepartmentName)
        })
        //console.log(departmentsOptions);

        return (
            <div>
                <MaterialTable
                title="Employees Data"
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Name', field: 'name' },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Salary', field: 'salary', type: 'numeric' },
                    { title: 'Location', field: 'location'},
                    {
                      title: 'Department Name',
                      field: 'departmentID',
                      lookup: departmentsOptions
                    },
                  ]}
                data={this.props.employees.map((emp) => ({
                    id: emp.EmpID,name: emp.Name, gender: emp.Gender, salary: emp.Salary, location: emp.Location, departmentID: emp.DepartmentID }))}
                editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        this.props.addEmployeeToStore(newData);
                    }, 600);
                    }),
                // onRowUpdate: (newData, oldData) =>
                //     new Promise((resolve) => {
                //     setTimeout(() => {
                //         resolve();
                //         if (oldData) {
                //         this.state.setState((prevState) => {
                //             const data = [...prevState.data];
                //             data[data.indexOf(oldData)] = newData;
                //             return { ...prevState, data };
                //         });
                //         }
                //     }, 600);
                //     }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        this.props.deleteEmployeeFromStore(oldData.id);
                    }, 600);
                    }),
                }}
                />
            </div>
        )
    }
}

// get the state from store central as a props into our components (now counter is a prop)
const mapStateToProps = (state) => {
    return {
        employees: state.employees,
    }
};

// the action that will change the state value in central store, return an object from methods/ actions that you will use within your component as a props
const mapDispatchToProps = (dispatch) => {
    return {
        getEmployeesFromStore: () => dispatch(getEmployees()),
        addEmployeeToStore: (emp) => dispatch(addEmployee(emp)),
        deleteEmployeeFromStore: (id) => dispatch(deleteEmployee(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);