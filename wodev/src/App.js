import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login/Login'
import RestorePassword from "./Login/RestorePassword";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/restorePassword" component={RestorePassword}/>
                <Redirect exact to="/login"/>
            </Switch>
        </Router>
    );
}

export default App;
