import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login/Login'
import RestorePassword from "./Login/RestorePassword";
import Home from './Home/Home.jsx';
import PrivateRoute from "./_components/PrivateRoute";

function App() {

    return (
        <Router>
            <Switch>
                <PrivateRoute path="/dashboard" component={Home} exact/>
                <Route path="/login" component={Login} exact />
                <Route path="/restorePassword" component={RestorePassword} exact/>
                <Redirect to="/dashboard"/>
            </Switch>
        </Router>
    );
}

export default App;
