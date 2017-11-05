import {describe, it, beforeEach} from "mocha";
import assert from "assert";
import * as match from "@/match";;

describe("match", () => {
    describe("isGameOver, 11 point game", () => {
        it("should be false when scores are less than 11", () => {
            const state = {
                match: {
                    gameLength: 11,
                    player0: {points: 7},
                    player1: {points: 9},
                }
            }
            assert.equal(match.isGameOver(state), false);
        });
        it("should be false when not winning by two", () => {
            const state = {
                match: {
                    gameLength: 11,
                    player0: {points: 11},
                    player1: {points: 10},
                }
            }
            assert.equal(match.isGameOver(state), false);
        });
        it("should be true when winning by more than 2", () => {
            const state = {
                match: {
                    gameLength: 11,
                    player0: {points: 12},
                    player1: {points: 10},
                }
            }
            assert.equal(match.isGameOver(state), true);
        });
    });
    describe("isGameOver, 21 point game", () => {
        it("should be false when scores are less than 11", () => {
            const state = {
                match: {
                    gameLength: 21,
                    player0: {points: 17},
                    player1: {points: 19},
                }
            }
            assert.equal(match.isGameOver(state), false);
        });
        it("should be false when not winning by two", () => {
            const state = {
                match: {
                    gameLength: 21,
                    player0: {points: 21},
                    player1: {points: 20},
                }
            }
            assert.equal(match.isGameOver(state), false);
        });
        it("should be true when winning by more than 2", () => {
            const state = {
                match: {
                    gameLength: 21,
                    player0: {points: 22},
                    player1: {points: 20},
                }
            }
            assert.equal(match.isGameOver(state), true);
        });
    });

});
