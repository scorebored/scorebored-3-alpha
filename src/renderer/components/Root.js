import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import MainMenu from "@/components/MainMenu";
import StartMatch from "@/components/StartMatch";
import Excuses from "@/components/Excuses";

class Root extends React.Component {
    render = () => {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainMenu}/>
                    <Route exact path="/start" component={StartMatch}/>
                    <Route exact path="/excuses" component={Excuses}/>
                </Switch>
            </Router>
        );
    }
}

export default Root;


