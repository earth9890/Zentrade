import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Switch,
} from "react-router-dom";
import Login from './Components/Login';
import Dashboard from './Components/DashBoard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Navigate from="/" to="/login" />
      </Switch>
    </Router>
  );
}
export default App;
