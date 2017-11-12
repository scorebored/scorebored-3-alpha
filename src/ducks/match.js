import {createAction, handleActions} from "redux-actions";
import {createSelector} from "reselect";

import {otherPlayer} from "@/util/player";

const defaultState = {
    player0: {
        id: "player0",
        name: "Home Team",
        sayAs: null,
        points: 0,
        games: 0,
        server: false,
    },
    player1: {
        id: "player1",
        name: "Away Team",
        sayAs: null,
        points: 0,
        games: 0,
        server: false,
    },
    length: 1,
    gameLength: 11,
    currentGame: 1,
};

export const adjustScore = createAction("match/adjustScore");
export const gameLength = createAction("match/gameLength");
export const setServer = createAction("match/setServer");
export const awardPoint = createAction("match/awardPoint");

export default handleActions({
    [adjustScore]: (state, action) => ({
        ...state,
        player0: {...state.player0, points: action.payload[0]},
        player1: {...state.player1, points: action.payload[1]},
    }),
    [gameLength]: (state, action) => ({
        ...state,
        gameLength: action.payload
    }),
    [awardPoint]: (state, action) => {
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
    [setServer]: (state, action) => {
        const serving = state[action.payload];
        const notServing = state[otherPlayer(action.payload)];
        return {
            ...state,
            [serving.id]: {...state[serving.id], server: true},
            [notServing.id]: {...state[notServing.id], server: false},
        };
    },
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
