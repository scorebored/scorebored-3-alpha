import React from 'react'
import PropTypes from 'prop-types'

import Talker from '../talkers/mute'
import Script from '../scripts/standard'

export default class Announcer extends React.Component {

    constructor(props) {
        super(props)
        this.script = new Script()
        this.assignTalker()
    }

    assignTalker = () => {
        this.talker = new Talker()
        this.talker.events.on('say', (text) => this.props.say(text))
        this.talker.events.on('silence', this.props.silence)
    }

    componentDidUpdate = (was) => {
        if (this.props.match.announce) {
            this.talker.cancel()
            this.talker.say(this.script.announce(was.match, this.props.match))
        }
    }

    render = () => <div/>

}

Announcer.propTypes = {
    match: PropTypes.object.isRequired,

    say: PropTypes.func.isRequired,
    silence: PropTypes.func.isRequired,
}