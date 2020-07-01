import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Departments from './components/Departments';
import {Provider} from 'react-redux';
import store from './store/store'
import Employees from './components/Employees';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NotFound from './components/NotFound';
import CreateDepartment from './components/CreateDepartment';


function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Header />

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/departments" component={Departments}></Route>
        <Route exact path="/departments/create" component={CreateDepartment}></Route>
        <Route exact path="/employees" component={Employees}></Route>
        <Route component={NotFound}></Route>
      </Switch>

      <Footer />
    </Provider>
    </div>
  );
}

export default App;
