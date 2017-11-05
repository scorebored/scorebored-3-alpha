import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";

const defaultState = {
    player0: {
        name: "Home Team",
        sayAs: null,
        points: 0,
        games: 0,
    },
    player1: {
        name: "Away Team",
        sayAs: null,
        points: 0,
        games: 0,
    },
    length: 1,
    gameLength: 11,
    currentGame: 1,
    server: null,
};

export const score = createAction("match/score");

export default handleActions({
    [score]: (state, action) => {
        const previous = state[action.payload];
        return {
            ...state, 
            [action.payload]: {
                ...previous, 
                points: previous.points + 1    
            }
        };
    }
}, defaultState);

export const isGameOver = createSelector(
    (state) => state.match, 
    (match) => {
        const p0 = match.player0.points; 
        const p1 = match.player1.points;
        if (p0 < match.gameLength && p1 < match.gameLength) {
            return false;
        }
        if (Math.abs(p0 - p1) < 2) {
            return false;
        }
        return true;
    }
);
