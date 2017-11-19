import { createStore, combineReducers } from 'redux'
import reducer from '@/ducks/match'
import * as match from '@/ducks/match'

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

describe('awardPoint', () => {
    test('should increment score', () => {
        dispatch(match.firstServer(1))
        dispatch(match.awardPoint(0))
        expect(state().game.points[0]).toBe(1)
        expect(state().game.points[1]).toBe(0)
        expect(state().game.server).toBe(1)
    })
    test('should ignore when the game is over', () => {
        dispatch(match.adjust({points: [7, 11]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points[0]).toBe(7)
        expect(state().game.points[1]).toBe(11)
    })
    test('should switch server at 5 points in 21 point game', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.firstServer(1))
        dispatch(match.adjust({points: [2, 2]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points[0]).toBe(3)
        expect(state().game.points[1]).toBe(2)
        expect(state().game.server).toBe(0)
    })
    test('should switch server at 2 points in 11 point game', () => {
        dispatch(match.settings({gameLength: 11}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [1, 0]}))
        dispatch(match.awardPoint(1))
        expect(state().game.points[0]).toBe(1)
        expect(state().game.points[1]).toBe(1)
        expect(state().game.server).toBe(1)
    })
    test('should switch server in overtime', () => {
        dispatch(match.settings({gameLength: 21}))
        dispatch(match.firstServer(0))
        dispatch(match.adjust({points: [21, 21]}))
        dispatch(match.awardPoint(0))
        expect(state().game.points[0]).toBe(22)
        expect(state().game.points[1]).toBe(21)
        expect(state().game.server).toBe(1)
    })
})
