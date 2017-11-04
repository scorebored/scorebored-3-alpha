import {describe, it} from "mocha";
import assert from "assert";
import Referee from "@/referee";

describe("referee", () => {
    describe("isGameOver", () => {
        it("should be false when scores are less than 21", () => {
            const r = new Referee();
            r.game.scores = [14, 12];
            assert.equal(r.isGameOver(), false);
        })
    })
});
