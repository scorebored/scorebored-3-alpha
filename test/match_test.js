import {describe, it, beforeEach} from "mocha";
import assert from "assert";
import { createStore, combineReducers } from "redux";
import * as match from "@/match";

describe("match", () => {
    var store;
    beforeEach(() => {
        store = createStore(combineReducers({match: match.reducer}));
    });

    describe("gameOver, 11 point game", () => {
        it("should be false when scores are less than 11", () => {
            store.dispatch(match.setGameLength(11));
            store.dispatch(match.adjustPoints([7, 9]));
            assert.equal(match.gameOver(store.getState()), false);       
        });
        it("should be false when not winning by two", () => {
            store.dispatch(match.setGameLength(11));
            store.dispatch(match.adjustPoints([11, 10]));
            assert.equal(match.gameOver(store.getState()), false);       
        });
        it("should be true when winning by more than 2", () => {
            store.dispatch(match.setGameLength(11));
            store.dispatch(match.adjustPoints([12, 10]));
            assert.equal(match.gameOver(store.getState()), true);            
        });
    });

    describe("gameOver, 21 point game", () => {
        it("should be false when scores are less than 11", () => {
            store.dispatch(match.setGameLength(21));
            store.dispatch(match.adjustPoints([17, 19]));
            assert.equal(match.gameOver(store.getState()), false);
        });
        it("should be false when not winning by two", () => {
            store.dispatch(match.setGameLength(21));
            store.dispatch(match.adjustPoints([21, 20]));
            assert.equal(match.gameOver(store.getState()), false);
        });
        it("should be true when winning by more than 2", () => {
            store.dispatch(match.setGameLength(21));
            store.dispatch(match.adjustPoints([22, 20]));
            assert.equal(match.gameOver(store.getState()), true);
        });
    });

    describe("score", () => {
        it("should increment", () => {
            store.dispatch(match.adjustPoints([5, 7]));
            store.dispatch(match.score("player0"));
            assert.equal(store.getState().match.player0.points, 6);
            assert.equal(store.getState().match.player1.points, 7);            
        });
        it("should ignore when the game is over", () => {
            store.dispatch(match.adjustPoints([11, 7]));
            store.dispatch(match.score("player0"));
            assert.equal(store.getState().match.player0.points, 11);
            assert.equal(store.getState().match.player1.points, 7);            
        });
    });
});
