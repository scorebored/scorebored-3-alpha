import {createState as state} from '../ducks/match'
import BtsScript from './bts'

let script

beforeEach(() => {
    script = new BtsScript()
})

test('red point ken', () => {
    const was = state({
        game: {points: [9, 7]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [10, 7]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Red', 'Ken to 7'])
})

test('blue point ken', () => {
    const was = state({
        game: {points: [7, 9]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [7, 10]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '7 to Ken'])
})

test('point ken all', () => {
    const was = state({
        game: {points: [10, 9]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [10, 10]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', 'Ken all', 'Switch servers'])
})

test('check for 7-11', () => {
    const was = state({
        game: {points: [7, 10]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [7, 11]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', 'Slurpees'])
})

test('check for 9-11', () => {
    const was = state({
        game: {points: [9, 10]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [9, 11]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', 'Always remember', 'Switch servers'])
})

test('red below Jacobian line on game win', () => {
    const was = state({
        game: {points: [9, 20]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [9, 21], wins: [0, 1]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Blue wins the game',
        'Sorry Red team',
        'Jacob is not impressed',
    ])
})

test('blue below Jacobian line on game win', () => {
    const was = state({
        game: {points: [20, 9]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [21, 9], wins: [1, 0]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Red wins the game',
        'Sorry Blue team',
        'Jacob is not impressed',
    ])
})

test('red below Jacobian line on match win', () => {
    const was = state({
        game: {points: [9, 20], wins: [0, 1]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21, length: 3},
        game: {points: [9, 21], wins: [0, 2]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Blue wins the match',
        'Sorry Red team',
        'Jacob is not impressed',
    ])
})

test('blue below Jacobian line on match win', () => {
    const was = state({
        game: {points: [20, 9], wins: [1, 0]},
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21, length: 3},
        game: {points: [21, 9], wins: [2, 0]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Red wins the match',
        'Sorry Blue team',
        'Jacob is not impressed',
    ])
})