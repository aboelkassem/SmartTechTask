import React from 'react';
import {addDepartment} from '../store/actions';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

class CreateDepartment extends React.Component {

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({...this.state, department: {...this.state.department, employees: this.state.employees}});
        }, 500);
    }

    state = {
        open: false,
        employee: {name: "", gender: "", salary: "", location: ""},
        employees:[],
        department: {
            name: '',
            description:'',
            employees: null
        }
    }

    deleteEmployee = (index) => {
        const employees = [...this.state.employees];
        employees.splice(index,1);
        this.setState({
            ...this.state,
            employees
        })
    }

    addEmployee = () => {
        const employees = [...this.state.employees];
        employees.push(this.state.employee);
        this.setState({...this.state, employees, employee:{name: "", gender: "", salary: "", location: ""}});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({...this.state, department: {...this.state.department, employees: this.state.employees}});
        //console.log(this.state.department);
        this.props.addDepartmentToStore(this.state.department);
        this.props.history.push('/departments')
    };


    render() {
        const handleClick = () => {
            this.setState({open: !this.state.open});
        };
        //console.log(this.state);

        return <div>
            <div className="container">
                <h3>Add Department Info: </h3>
                <form noValidate onSubmit={this.handleSubmit}>
                    <List>
                        <ListItem>
                            <TextField id="departmentName" 
                                value={this.state.department.name} 
                                onChange={event => this.setState({ ...this.state, department: {...this.state.department,name: event.target.value} })} 
                                label="Department Name" color="secondary" /> <br/>
                        </ListItem>
                        <ListItem>
                            <TextField 
                                id="departmentDescription" 
                                value={this.state.department.description} 
                                onChange={event => this.setState({ ...this.state, department: {...this.state.department,description: event.target.value} })} 
                                label="Department Description" color="secondary" />
                        </ListItem>
                        <br/>
                        <ListItem button onClick={handleClick}>
                            <Alert variant="success">
                                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                Click For Adding Employees for this department
                            </Alert>
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Gender</th>
                                            <th>Salary</th>
                                            <th>Location</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.employees.map((emp, index) =>  
                                            <tr>
                                                <td>{emp.name}</td>
                                                <td>{emp.gender}</td>
                                                <td>{emp.salary}</td>
                                                <td>{emp.location}</td>
                                                <Button
                                                    onClick={() => this.deleteEmployee(index)}
                                                    variant="contained"
                                                    color="secondary"
                                                    className="m-1"
                                                    startIcon={<DeleteIcon />}
                                                    > Delete
                                                </Button>
                                            </tr>)}
                                        </tbody>
                                    </Table>
                                </ListItem>
                                <ListItem>
                                    <TextField 
                                        id="name" 
                                        value={this.state.employee.name} 
                                        onChange={event => this.setState({ ...this.state, employee: {...this.state.employee,name: event.target.value} })} 
                                        label="Employee Name" 
                                        color="secondary" /> <br/>
                                    <TextField 
                                        id="gender"
                                        onChange={event => this.setState({ ...this.state, employee: {...this.state.employee,gender: event.target.value}})} 
                                        value={this.state.employee.gender} 
                                        label="Employee Gender" color="secondary" /> <br/>
                                    <TextField 
                                        id="salary" 
                                        onChange={event => this.setState({ ...this.state, employee: {...this.state.employee,salary: event.target.value}})} 
                                        value={this.state.employee.salary} 
                                        label="Employee Salary" 
                                        color="secondary" /> <br/>
                                    <TextField 
                                        id="location" 
                                        onChange={event => this.setState({ ...this.state, employee: {...this.state.employee,location: event.target.value} })} 
                                        value={this.state.employee.location} 
                                        label="Employee Location" 
                                        color="secondary" />
                                    <Button
                                        onClick={this.addEmployee}
                                        className="ml-4"
                                        variant="contained"
                                        color="primary"
                                        endIcon={<Icon>add</Icon>}
                                        >Add
                                  </Button>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-4"
                                size="large"
                                startIcon={<SaveIcon />}
                                > Save and Create
                            </Button>
                        </ListItem>
                    </List>
                
                </form>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDepartmentToStore: (dept) => dispatch(addDepartment(dept)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDepartment);