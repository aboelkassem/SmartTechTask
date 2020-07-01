import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getDepartments} from '../store/actions';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
});
  
function createData(id, name, description, employees) {
    return {
      id,
      name,
      description,
      employees,
    };
}
  
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Employees Data of this Department....
                </Typography>
                <Table size="big" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell align="right">Salary</TableCell>
                      <TableCell align="right">Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.employees.map((emp) => (
                      <TableRow key={emp.ID}>
                        <TableCell component="th" scope="row">{emp.Name}</TableCell>
                        <TableCell>{emp.Gender}</TableCell>
                        <TableCell align="right">{emp.Salary}</TableCell>
                        <TableCell align="right">{emp.Location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}
  
Row.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      employees: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          gender: PropTypes.string.isRequired,
          salary: PropTypes.number.isRequired,
          location: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
};
  
  
class Departments extends React.Component {

    componentDidMount(){
        this.props.getDepartmentsFromStore();
    }

    render() {
        //console.log(this.props.departments);
        const rows = this.props.departments.map((dept) => {
                return(createData(dept.Id, dept.Name, dept.Description, dept.Employees));
            })
          

        //console.log("rows:" +rows);

        return <div>
            <div className="container">
                <h3 style={{textAlign:"center"}}>Departments Data.....</h3>
                <Button variant="outlined" color="primary">
                  <Link to="/departments/create" className="navbar-brand">Create Department</Link>
                </Button>
                <br/>
                <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <Row key={row.id} row={row} />
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
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
        getDepartmentsFromStore: () => dispatch(getDepartments()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);