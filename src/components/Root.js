import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { store } from "@/store";
import Excuses from "@/components/Excuses";
import MainMenu from "@/components/MainMenu";
import MatchSettings from "@/components/MatchSettings";
import ScoreDisplay from "@/components/ScoreDisplay";

class Root extends React.Component {
    render = () => {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={MainMenu} />
                        <Route exact path="/excuses" component={Excuses} />
                        <Route exact path="/display" component={ScoreDisplay} />
                        <Route exact path="/start" component={MatchSettings} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default Root;
