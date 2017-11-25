import { connect } from 'react-redux'

import AppSettings from '../components/AppSettings'
import * as announcerActions from '../ducks/announcer'

const mapStateToProps = (state) => ({
    talker: state.announcer.talker,
    script: state.announcer.script,
    subtitles: state.announcer.subtitles,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTalker: (name) => {
        dispatch(announcerActions.setTalker(name))
    },
    setScript: (name) => {
        dispatch(announcerActions.setScript(name))
    },
    enableSubtitles: (value) => {
        dispatch(announcerActions.enableSubtitles(value))
    },
    done: () => {
        ownProps.history.push('/')
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings)
