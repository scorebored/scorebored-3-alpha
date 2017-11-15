import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import debug from '@/debug'

const render = () => {
    const Root = require('./components/Root').default
    ReactDOM.render(<AppContainer><Root /></AppContainer>,
        document.getElementById('root'))
}

render()

if (module.hot) {
    module.hot.accept(render)
}

debug()
