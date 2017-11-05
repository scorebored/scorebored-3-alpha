import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { store } from "@/store";
import AdjustMatch from "@/components/AdjustMatch";
import Excuses from "@/components/Excuses";
import MainMenu from "@/components/MainMenu";
import MatchSettings from "@/components/MatchSettings";
import Scoreboard from "@/components/Scoreboard";

class Root extends React.Component {
    render = () => {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={MainMenu} />
                        <Route exact path="/adjust" component={AdjustMatch} />
                        <Route exact path="/excuses" component={Excuses} />
                        <Route exact path="/scoreboard" component={Scoreboard} />
                        <Route exact path="/start" component={MatchSettings} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default Root;
