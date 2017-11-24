import { createStore, combineReducers } from 'redux'
import reducer from './match'
import * as match from './match'

let dispatch
let state

beforeEach(() => {
    let store = createStore(combineReducers({match: reducer}))
    dispatch = store.dispatch
    state = () => store.getState().match
})

describe('isGameOver, 11 point game', () => {
    test('should be false when scores are less than 11', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.adjust({points: [7, 9]}))
        expect(match.isGameOver(state())).toBe(false)
    })
    test('should be false when not winning by two', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.adjust({points: [11, 10]}))
        expect(match.isGameOver(state())).toBe(false)
    })
    test('should be true when winning by more than 2', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.adjust({points: [12, 10]}))
        expect(match.isGameOver(state())).toBe(true)
    })
})

describe('isGameOver, 21 point game', () => {
    test('should be false when scores are less than 11', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.adjust({points: [17, 19]}))
        expect(match.isGameOver(state())).toBe(false)
    })
    test('should be false when not winning by two', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.adjust({points: [21, 20]}))
        expect(match.isGameOver(state())).toBe(false)
    })
    test('should be true when winning by more than 2', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.adjust({points: [22, 20]}))
        expect(match.isGameOver(state())).toBe(true)
    })
})

describe('isMatchOver', () => {
    test('should be false with no wins', () => {
        dispatch(match.settings({length: 1, gameLength: 11}))
        dispatch(match.adjust({points: [7, 9]}))
        expect(match.isMatchOver(state())).toBe(false)
    })
    test('should be true when first game is over in one game match', () => {
        dispatch(match.settings({length: 1, gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10]}))
        dispatch(match.awardPoint(1))
        expect(match.isMatchOver(state())).toBe(true)
    })
    test('should be false when first game is over in three game match', () => {
        dispatch(match.settings({length: 3, gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10]}))
        dispatch(match.awardPoint(1))
        expect(match.isMatchOver(state())).toBe(false)
    })
    test('should be true when third game is over in three game match', () => {
        dispatch(match.settings({length: 3, gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10], wins: [1, 1]}))
        dispatch(match.awardPoint(1))
        expect(match.isMatchOver(state())).toBe(true)
    })
})

describe('awardPoint', () => {
    test('should increment score', () => {
        dispatch(match.firstServer(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([1, 0])
        expect(state().game.server).toBe(1)
    })
    test('should ignore when the game is over', () => {
        dispatch(match.adjust({points: [7, 11]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([7, 11])
    })
    test('should switch server at 5 points in 21 point game', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.firstServer(1))
        dispatch(match.adjust({points: [2, 2]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([3, 2])
        expect(state().game.server).toBe(0)
    })
    test('should switch server at 2 points in 11 point game', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [1, 0]}))
        dispatch(match.awardPoint(1))
        expect(state().game.points).toEqual([1, 1])
        expect(state().game.server).toBe(1)
    })
    test('should switch server in overtime', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [21, 21]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([22, 21])
        expect(state().game.server).toBe(1)
    })
    test('should award win when game is over', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10]}))
        dispatch(match.awardPoint(1))
        expect(state().game.points).toEqual([7, 11])
        expect(state().game.wins).toEqual([0, 1])
    })
})

describe('undo', () => {
    test('should do nothing when undo list is empty', () => {
        dispatch(match.undo())
        expect(state().game.points).toEqual([0, 0])
    })
    test('should undo first server', () => {
        dispatch(match.firstServer(1))
        expect(state().game.server).toBe(1)
        dispatch(match.undo())
        expect(state().game.server).toBe(null)
    })
    test('should undo point awarded', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        dispatch(match.undo())
        expect(state().game.points).toEqual([1, 1])
    })
    test('should undo point awarded twice', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        dispatch(match.undo())
        dispatch(match.undo())
        expect(state().game.points).toEqual([1, 0])
    })
    test('should undo adjust', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        expect(state().game.server).toBe(1)
        dispatch(match.adjust({points: [8, 2], server: 0}))
        expect(state().game.points).toEqual([8, 2])
        expect(state().game.server).toBe(0)
        dispatch(match.undo())
        expect(state().game.points).toEqual([2, 1])
        expect(state().game.server).toBe(1)
    })
    test('should not undo when adjust does not change state', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        expect(state().game.server).toBe(1)
        dispatch(match.adjust({points: [2, 1], server: 1}))
        dispatch(match.undo())
        expect(state().game.points).toEqual([1, 1])
        expect(state().game.server).toBe(1)
    })
})

describe('redo', () => {
    test('should do nothing when redo list is empty', () => {
        dispatch(match.redo())
        expect(state().game.points).toEqual([0, 0])
    })
    test('should redo first server', () => {
        dispatch(match.firstServer(1))
        expect(state().game.server).toBe(1)
        dispatch(match.undo())
        dispatch(match.redo())
        expect(state().game.server).toBe(1)
    })
    test('should undo point awarded', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        dispatch(match.undo())
        dispatch(match.redo())
        expect(state().game.points).toEqual([2, 1])
    })
    test('should undo point awarded twice', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        dispatch(match.undo())
        dispatch(match.undo())
        dispatch(match.redo())
        dispatch(match.redo())
        expect(state().game.points).toEqual([2, 1])
    })
    test('should clear redo when next action taken', () => {
        dispatch(match.firstServer(0))
        dispatch(match.awardPoint(0))
        dispatch(match.awardPoint(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([2, 1])
        expect(state().game.server).toBe(1)
        dispatch(match.adjust({points: [8, 2], server: 0}))
        expect(state().game.points).toEqual([8, 2])
        expect(state().game.server).toBe(0)
        dispatch(match.undo())
        dispatch(match.awardPoint(0))
        expect(state().game.points).toEqual([3, 1])
        dispatch(match.redo())
        expect(state().game.points).toEqual([3, 1])
    })
})

describe('nextGame', () => {
    test('should do nothing when the game is not over', () => {
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10]}))
        dispatch(match.nextGame())
        expect(state().game.points).toEqual([7, 10])
    })
    test('should do nothing when the match is over', () => {
        dispatch(match.settings({length: 3}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({wins: [1, 1], points: [7, 10]}))
        dispatch(match.awardPoint(1))
        dispatch(match.nextGame())
        expect(state().game.points).toEqual([7, 11])
    })
    test('should advance to the next game', () => {
        dispatch(match.settings({length: 3}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10], server: 1}))
        dispatch(match.awardPoint(1))
        expect(state().game.wins).toEqual([0, 1])
        dispatch(match.nextGame())
        expect(state().game.points).toEqual([0, 0])
        expect(state().game.wins).toEqual([1, 0])
        expect(state().game.server).toBe(0)
    })
})

describe('reset', () => {
    test('should reset game state and players', () => {
        dispatch(match.settings({length: 3}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [7, 10], wins: [1, 1], server: 1}))
        dispatch(match.reset())
        expect(state().game.points).toEqual([0, 0])
        expect(state().game.wins).toEqual([0, 0])
        expect(state().game.server).toBe(null)
        expect(state().game.firstServer).toBe(null)
    })
})

describe('gamesToWin', () => {
    test('should be 1 in a single game match', () => {
        dispatch(match.settings({length: 1}))
        expect(match.gamesToWin(state())).toEqual(1)
    })
    test('should be 4 when match length is 7', () => {
        dispatch(match.settings({length: 7}))
        expect(match.gamesToWin(state())).toEqual(4)
    })
})
