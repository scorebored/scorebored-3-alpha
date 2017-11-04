import {describe, it} from "mocha";
import assert from "assert";
import Referee from "@/referee";

describe("referee", () => {
    describe("isGameOver", () => {
        it("should be false when scores are less than 21", () => {
            const r = new Referee();
            r.game.scores = [14, 12];
            assert.equal(r.isGameOver(), false);
        });
        it("should be false when not winning by two", () => {
            const r = new Referee();
            r.game.scores = [25, 26];
            assert.equal(r.isGameOver(), false);
        });
        it("should be true at 21 and more than 2", () => {
            const r = new Referee();
            r.game.scores = [16, 21];
            assert.equal(r.isGameOver(), true);
        });
        it("should be true when winning by more than 2", () => {
            const r = new Referee();
            r.game.scores = [26, 28];
            assert.equal(r.isGameOver(), true);
        });
    });
});
