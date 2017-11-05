import { createStore, combineReducers } from "redux";
import * as match from "@/match";

let store;
beforeEach(() => {
    store = createStore(combineReducers({match: match.reducer}));
});

describe("gameOver, 11 point game", () => {
    test("should be false when scores are less than 11", () => {
        store.dispatch(match.gameLength(11));
        store.dispatch(match.adjustPoints([7, 9]));
        expect(match.gameOver(store.getState())).toBe(false);   
    });
    test("should be false when not winning by two", () => {
        store.dispatch(match.gameLength(11));
        store.dispatch(match.adjustPoints([11, 10]));
        expect(match.gameOver(store.getState())).toBe(false);       
    });
    test("should be true when winning by more than 2", () => {
        store.dispatch(match.gameLength(11));
        store.dispatch(match.adjustPoints([12, 10]));
        expect(match.gameOver(store.getState())).toBe(true);            
    });
});

describe("gameOver, 21 point game", () => {
    test("should be false when scores are less than 11", () => {
        store.dispatch(match.gameLength(21));
        store.dispatch(match.adjustPoints([17, 19]));
        expect(match.gameOver(store.getState())).toBe(false);           
    });
    test("should be false when not winning by two", () => {
        store.dispatch(match.gameLength(21));
        store.dispatch(match.adjustPoints([21, 20]));
        expect(match.gameOver(store.getState())).toBe(false);           
    });
    test("should be true when winning by more than 2", () => {
        store.dispatch(match.gameLength(21));
        store.dispatch(match.adjustPoints([22, 20]));
        expect(match.gameOver(store.getState())).toBe(true);           
    });
});

describe("score", () => {
    test("should increment", () => {
        store.dispatch(match.adjustPoints([5, 7]));
        store.dispatch(match.score("player0"));
        expect(store.getState().match.player0.points).toBe(6);
        expect(store.getState().match.player1.points).toBe(7);            
    });
    test("should ignore when the game is over", () => {
        store.dispatch(match.adjustPoints([11, 7]));
        store.dispatch(match.score("player0"));
        expect(store.getState().match.player0.points).toBe(11);
        expect(store.getState().match.player1.points).toBe(7);            
    });
});
