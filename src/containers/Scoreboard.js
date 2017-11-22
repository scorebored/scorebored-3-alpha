import { connect } from 'react-redux'

import Scoreboard from '../components/Scoreboard'
import * as matchActions from '../ducks/match'

const mapStateToProps = (state) => ({
    players: state.match.settings.players,
    points: state.match.game.points,
    server: state.match.game.server,
    wins: state.match.game.wins,
    matchLength: state.match.settings.length,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    awardPoint: (playerId) => {
        dispatch(matchActions.awardPoint(playerId))
    },
    firstServer: (playerId) => {
        dispatch(matchActions.firstServer(playerId))
    },
    undo: () => {
        dispatch(matchActions.undo())
    },
    redo: () => {
        dispatch(matchActions.redo())
    },
    adjust: () => {
        ownProps.history.push('/adjust')
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)

