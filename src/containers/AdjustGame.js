import {connect} from 'react-redux'

import AdjustGame from '../components/AdjustGame'
import * as matchActions from '../ducks/match'

const mapStateToProps = (state) => ({
    players: state.match.settings.players,
    points: state.match.game.points,
    server: state.match.game.server,
    gameLength: state.match.settings.gameLength,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    adjust: (game) => {
        dispatch(matchActions.adjust(game))
    },
    done: () => {
        ownProps.history.goBack()
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdjustGame)

