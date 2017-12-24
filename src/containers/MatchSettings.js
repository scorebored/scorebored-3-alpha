import {connect} from 'react-redux'

import MatchSettings from '../components/MatchSettings'
import * as matchActions from '../ducks/match'

const mapStateToProps = (state) => ({
    length: state.match.settings.length,
    gameLength: state.match.settings.gameLength
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setGameLength: (len) => {
        dispatch(matchActions.setGameLength(len))
    },
    setMatchLength: (len) => {
        dispatch(matchActions.setMatchLength(len))
    },
    done: () => {
        ownProps.history.goBack()
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchSettings)
