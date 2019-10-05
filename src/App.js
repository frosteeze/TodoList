import React, {Component} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link} from "react-router-dom" 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

class App extends Component{
  render() {
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="google.com">
              <img src={logo} width="30" height="30" alt="Lol"></img>
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todos</Link>
          
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create To-do</Link>
                </li>
              </ul>   
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
        
      </Router>
    );
  }
}

export default App;
