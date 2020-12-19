import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login/Login'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </Switch>
        </Router>
    );
}

export default App;
