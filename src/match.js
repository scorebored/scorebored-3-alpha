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

export const adjustPoints = createAction("match/adjustPoints");
export const gameLength = createAction("match/gameLength");
export const server = createAction("match/server");
export const score = createAction("match/score");

export const reducer = handleActions({
    [adjustPoints]: (state, action) => ({
        ...state,
        player0: { ...state.player0, points: action.payload[0] },
        player1: { ...state.player1, points: action.payload[1] },
    }),
    [gameLength]: (state, action) => ({
        ...state,
        gameLength: action.payload
    }),
    [score]: (state, action) => {
        if (isGameOver(state)) {
            return state;
        }
        const previous = state[action.payload];
        return {
            ...state,
            [action.payload]: {
                ...previous,
                points: previous.points + 1
            }
        };
    },
    [server]: (state, action) => ({
        ...state, 
        server: action.payload 
    }),
}, defaultState);

const isGameOver = (match) => {
    const p0 = match.player0.points;
    const p1 = match.player1.points;
    if (p0 < match.gameLength && p1 < match.gameLength) {
        return false;
    }
    if (Math.abs(p0 - p1) < 2) {
        return false;
    }
    return true;
};

export const gameOver = createSelector(
    (state) => state.match,
    (match) => isGameOver(match),
);
