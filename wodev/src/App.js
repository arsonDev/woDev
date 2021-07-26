import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import RestorePassword from "./Login/RestorePassword";
import Home from "./Home/Home.jsx";
import PrivateRoute from "./_components/PrivateRoute";
import ProfileTypeSelect from "./Profile/ProfileTypeSelect";
import Profile from "./Profile/Profile";
import SignIn from "./Login/SignIn";
import { TopBar } from "./Utils/TopBar";

function App() {
    return (
        <>
            <TopBar />
            <Router>
                <Switch>
                    <PrivateRoute path="/dashboard" component={Home} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/restorePassword" component={RestorePassword} exact />
                    <Route path="/createAccount" component={SignIn} exact />
                    <Route path="/createAccount/createProfile" component={Profile} exact />
                    <Redirect to="/dashboard" />
                </Switch>
            </Router>
        </>
    );
}

export default App;
