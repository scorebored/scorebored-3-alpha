import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import {store} from '../store'
import AdjustGame from '../containers/AdjustGame'
import Excuses from './Excuses'
import MainMenu from './MainMenu'
import MatchSettings from '../containers/MatchSettings'
import Scoreboard from '../containers/Scoreboard'
import Announcer from '../containers/Announcer'
import Subtitles from '../containers/Subtitles'
import AppSettings from '../containers/AppSettings'

class Root extends React.Component {
    render = () => {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path='/' component={MainMenu} />
                            <Route exact path='/adjust' component={AdjustGame} />
                            <Route exact path='/excuses' component={Excuses} />
                            <Route exact path='/scoreboard' component={Scoreboard} />
                            <Route exact path='/start' component={MatchSettings} />
                            <Route exact path='/settings' component={AppSettings} />
                        </Switch>
                        <Announcer/>
                        <Subtitles/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default Root
