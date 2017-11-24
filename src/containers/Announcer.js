import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as announcerActions from '../ducks/announcer'
import talkers from '../talkers'
import scripts from '../scripts'

class Announcer extends React.Component {

    constructor(props) {
        super(props)
        this.assignScript()
        this.assignTalker()
    }

    assignTalker = () => {
        this.talker = talkers[this.props.talkerName]
        this.talker.events.on('say', (text) => this.props.say(text))
        this.talker.events.on('silence', this.props.silence)
    }

    assignScript = () => {
        this.script = scripts[this.props.scriptName]
    }

    componentDidUpdate = (was) => {
        if (this.props.match.announce) {
            this.talker.cancel()
            this.talker.say(this.script.announce(was.match, this.props.match))
        }
    }

    render = () => null

}

Announcer.propTypes = {
    match: PropTypes.object.isRequired,
    talkerName: PropTypes.string.isRequired,
    scriptName: PropTypes.string.isRequired,

    say: PropTypes.func.isRequired,
    silence: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    match: state.match,
    talkerName: state.announcer.talker,
    scriptName: state.announcer.script,
})

const mapDispatchToProps = (dispatch) => ({
    say: (text) => {
        dispatch(announcerActions.say(text))
    },
    silence: () => {
        dispatch(announcerActions.silence())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Announcer)