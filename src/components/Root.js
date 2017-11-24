import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import {store} from '../store'
import AdjustGame from '../containers/AdjustGame'
import Excuses from './Excuses'
import MainMenu from './MainMenu'
import MatchSettings from './MatchSettings'
import Scoreboard from '../containers/Scoreboard'
import Announcer from '../containers/Announcer'
import Subtitles from '../containers/Subtitles'
import GamePad from './GamePad'

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
                            <Route exact path='/gamepad' component={GamePad} />
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
