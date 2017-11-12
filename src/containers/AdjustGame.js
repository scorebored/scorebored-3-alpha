import {connect} from "react-redux";

import AdjustGame from "@/components/AdjustGame";
import * as matchActions from "@/ducks/match";

const mapStateToProps = (state) => ({
    player0: state.match.player0,
    player1: state.match.player1,
    gameLength: state.match.gameLength,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    adjustScore: (points0, points1) => {
        dispatch(matchActions.adjustScore([points0, points1]));
    },
    done: () => {
        ownProps.history.goBack();
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdjustGame);

