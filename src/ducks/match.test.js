import { createStore, combineReducers } from "redux";
import reducer from "@/ducks/match";
import * as matchActions from "@/ducks/match";

let store;

beforeEach(() => {
    store = createStore(combineReducers({match: reducer}));
});

describe("gameOver, 11 point game", () => {
    test("should be false when scores are less than 11", () => {
        store.dispatch(matchActions.gameLength(11));
        store.dispatch(matchActions.adjustScore([7, 9]));
        expect(matchActions.gameOver(store.getState())).toBe(false);
    });
    test("should be false when not winning by two", () => {
        store.dispatch(matchActions.gameLength(11));
        store.dispatch(matchActions.adjustScore([11, 10]));
        expect(matchActions.gameOver(store.getState())).toBe(false);
    });
    test("should be true when winning by more than 2", () => {
        store.dispatch(matchActions.gameLength(11));
        store.dispatch(matchActions.adjustScore([12, 10]));
        expect(matchActions.gameOver(store.getState())).toBe(true);
    });
});

describe("gameOver, 21 point game", () => {
    test("should be false when scores are less than 11", () => {
        store.dispatch(matchActions.gameLength(21));
        store.dispatch(matchActions.adjustScore([17, 19]));
        expect(matchActions.gameOver(store.getState())).toBe(false);
    });
    test("should be false when not winning by two", () => {
        store.dispatch(matchActions.gameLength(21));
        store.dispatch(matchActions.adjustScore([21, 20]));
        expect(matchActions.gameOver(store.getState())).toBe(false);
    });
    test("should be true when winning by more than 2", () => {
        store.dispatch(matchActions.gameLength(21));
        store.dispatch(matchActions.adjustScore([22, 20]));
        expect(matchActions.gameOver(store.getState())).toBe(true);
    });
});

describe("awardPoint", () => {
    test("should increment", () => {
        store.dispatch(matchActions.adjustScore([5, 7]));
        store.dispatch(matchActions.awardPoint("player0"));
        expect(store.getState().match.player0.points).toBe(6);
        expect(store.getState().match.player1.points).toBe(7);
    });
    test("should ignore when the game is over", () => {
        store.dispatch(matchActions.adjustScore([11, 7]));
        store.dispatch(matchActions.awardPoint("player0"));
        expect(store.getState().match.player0.points).toBe(11);
        expect(store.getState().match.player1.points).toBe(7);
    });
});

describe("setServer", () => {
    test("should set for player0", () => {
        store.dispatch(matchActions.setServer("player0"));
        expect(store.getState().match.player0.server).toBe(true);
        expect(store.getState().match.player1.server).toBe(false);
    });
    test("should unset for player0 when setting for player1", () => {
        store.dispatch(matchActions.setServer("player0"));
        store.dispatch(matchActions.setServer("player1"));
        expect(store.getState().match.player0.server).toBe(false);
        expect(store.getState().match.player1.server).toBe(true);
    });
});
