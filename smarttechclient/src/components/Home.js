import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {NavLink} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';

class Home extends React.Component {
    render() {
        
        return <div className="container">
            <h3>
                Welcome To Smart Tech Company Task Home Page
            </h3><br/>
            <div>
                This Task is implemented using:
            </div>
            <ListGroup variant="flush">
                <ListGroup.Item>- ASP.NET Web API</ListGroup.Item>
                <ListGroup.Item>- Entity Frame Work 6</ListGroup.Item>
                <ListGroup.Item>- React </ListGroup.Item>
                <ListGroup.Item>- Redux </ListGroup.Item>
                <ListGroup.Item>- Axios for ajax request </ListGroup.Item>
                <ListGroup.Item>- redux-thunk </ListGroup.Item>
                <ListGroup.Item>- react bootstrap and material Ui from Design </ListGroup.Item>
            </ListGroup>
            <br/> <br/>
            <h4>Go to :</h4>
            <List component="nav" aria-label="secondary mailbox folders">
                <NavLink className="nav-link" to="/employees"><ListItem button>Employees Page</ListItem></NavLink>
                <NavLink className="nav-link" to="/departments"><ListItem button>Departments Page</ListItem></NavLink>
          </List>
        </div>
    }
}

export default Home;