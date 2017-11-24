import {connect} from 'react-redux'

import Announcer from '../components/Announcer'
import * as announcerActions from '../ducks/announcer'

const mapStateToProps = (state) => ({
    match: state.match,
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