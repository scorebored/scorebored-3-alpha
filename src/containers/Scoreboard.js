import { connect } from 'react-redux'

import Scoreboard from '@/components/Scoreboard'
import * as matchActions from '@/ducks/match'

const mapStateToProps = (state) => ({
    players: state.match.settings.players,
    points: state.match.game.points,
    server: state.match.game.server,
})

const mapDispatchToProps = (dispatch) => ({
    awardPoint: (playerId) => {
        dispatch(matchActions.awardPoint(playerId))
    },
    firstServer: (playerId) => {
        dispatch(matchActions.firstServer(playerId))
    },
    undo: () => {
        dispatch(matchActions.undo())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)

