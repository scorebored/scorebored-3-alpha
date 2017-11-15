import { connect } from 'react-redux'

import Scoreboard from '@/components/Scoreboard'
import * as matchActions from '@/ducks/match'

const mapStateToProps = (state) => ({
    player0: state.match.player0,
    player1: state.match.player1,
})

const mapDispatchToProps = (dispatch) => ({
    awardPoint: (player) => {
        dispatch(matchActions.awardPoint(player))
    },
    setServer: (player) => {
        dispatch(matchActions.setServer(player))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)

