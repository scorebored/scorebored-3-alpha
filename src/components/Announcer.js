import React from 'react'
import PropTypes from 'prop-types'

import Talker from '../talkers/web-api'
import Script from '../scripts/standard'

export default class Announcer extends React.Component {

    constructor(props) {
        super(props)
        this.talker = new Talker()
        this.script = new Script()
    }

    componentDidUpdate = (was) => {
        if (this.props.match.announce) {
            this.talker.say(this.script.announce(was.match, this.props.match))
        }
    }

    render = () => <div/>

}

Announcer.propTypes = {
    match: PropTypes.object.isRequired
}
