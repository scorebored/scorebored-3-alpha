import { createStore, combineReducers } from "redux";
import reducer from "@/ducks/match";
import * as match from "@/ducks/match";

let dispatch;
let state;

beforeEach(() => {
    let store = createStore(combineReducers({match: reducer}));
    dispatch = store.dispatch;
    state = () => store.getState().match;
});

describe("isGameOver, 11 point game", () => {
    test("should be false when scores are less than 11", () => {
        dispatch(match.gameLength(11));
        dispatch(match.adjustScore([7, 9]));
        expect(match.isGameOver(state())).toBe(false);
    });
    test("should be false when not winning by two", () => {
        dispatch(match.gameLength(11));
        dispatch(match.adjustScore([11, 10]));
        expect(match.isGameOver(state())).toBe(false);
    });
    test("should be true when winning by more than 2", () => {
        dispatch(match.gameLength(11));
        dispatch(match.adjustScore([12, 10]));
        expect(match.isGameOver(state())).toBe(true);
    });
});

describe("isGameOver, 21 point game", () => {
    test("should be false when scores are less than 11", () => {
        dispatch(match.gameLength(21));
        dispatch(match.adjustScore([17, 19]));
        expect(match.isGameOver(state())).toBe(false);
    });
    test("should be false when not winning by two", () => {
        dispatch(match.gameLength(21));
        dispatch(match.adjustScore([21, 20]));
        expect(match.isGameOver(state())).toBe(false);
    });
    test("should be true when winning by more than 2", () => {
        dispatch(match.gameLength(21));
        dispatch(match.adjustScore([22, 20]));
        expect(match.isGameOver(state())).toBe(true);
    });
});

describe("awardPoint", () => {
    test("should increment score", () => {
        dispatch(match.adjustScore([5, 7]));
        dispatch(match.setServer("player1"));
        dispatch(match.awardPoint("player0"));
        expect(state().player0.points).toBe(6);
        expect(state().player1.points).toBe(7);
        expect(state().player0.server).toBe(false);
        expect(state().player1.server).toBe(true);
    });
    test("should ignore when the game is over", () => {
        dispatch(match.adjustScore([11, 7]));
        dispatch(match.setServer("player1"));
        dispatch(match.awardPoint("player0"));
        expect(state().player0.points).toBe(11);
        expect(state().player1.points).toBe(7);
        expect(state().player0.server).toBe(false);
        expect(state().player1.server).toBe(true);
    });
    test("should switch server at 5 points in 21 point game", () => {
        dispatch(match.gameLength(21));
        dispatch(match.adjustScore([2, 2]));
        dispatch(match.setServer("player1"));
        dispatch(match.awardPoint("player0"));
        expect(state().player0.server).toBe(true);
        expect(state().player1.server).toBe(false);
    });
    test("should switch server at 2 points in 11 point game", () => {
        dispatch(match.gameLength(11));
        dispatch(match.adjustScore([1, 0]));
        dispatch(match.setServer("player0"));
        dispatch(match.awardPoint("player0"));
        expect(state().player0.server).toBe(false);
        expect(state().player1.server).toBe(true);
    });
    test("should switch server in overtime", () => {
        dispatch(match.gameLength(21));
        dispatch(match.adjustScore([21, 21]));
        dispatch(match.setServer("player0"));
        dispatch(match.awardPoint("player0"));
        expect(state().player0.server).toBe(false);
        expect(state().player1.server).toBe(true);
    });
});

describe("setServer", () => {
    test("should set for player0", () => {
        dispatch(match.setServer("player0"));
        expect(state().player0.server).toBe(true);
        expect(state().player1.server).toBe(false);
    });
    test("should unset for player0 when setting for player1", () => {
        dispatch(match.setServer("player0"));
        dispatch(match.setServer("player1"));
        expect(state().player0.server).toBe(false);
        expect(state().player1.server).toBe(true);
    });
});
