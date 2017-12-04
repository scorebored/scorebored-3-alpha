import * as React from 'react'
import * as ReactDOM from 'react-dom'
import debug from './debug'

import keyboardInit from './controller/keyboard'
import gamepadInit from './controller/gamepad'

if (module.hot) {
    const render = () => {
        const Root = require('./components/Root').default
        const {AppContainer} = require('react-hot-loader')
        ReactDOM.render(<AppContainer><Root /></AppContainer>,
            document.getElementById('root'))
    }
    render()
    module.hot.accept(render)
} else {
    const Root = require('./components/Root').default
    ReactDOM.render(<Root />, document.getElementById('root'))
}

debug()
keyboardInit()
gamepadInit()
