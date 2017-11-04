import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import MainMenu from "@/components/MainMenu";
import MatchSettings from "@/components/MatchSettings";
import Excuses from "@/components/Excuses";

class Root extends React.Component {
    render = () => {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainMenu}/>
                    <Route exact path="/start" component={MatchSettings}/>
                    <Route exact path="/excuses" component={Excuses}/>
                </Switch>
            </Router>
        );
    }
}

export default Root;
