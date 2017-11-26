import {createState as state} from '../ducks/match'
import BtsScript from './bts'

let script

beforeEach(() => {
    script = new BtsScript()
})

describe('Ken', () => {
    test('red point', () => {
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

    test('blue point', () => {
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

    test('point all', () => {
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

describe('Jacobian line', () => {
    test('red below on game win', () => {
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

    test('blue below on game win', () => {
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

    test('red below on match win', () => {
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

    test('blue below on match win', () => {
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
})

describe('Ofers, 21 point game', () => {
    test('Ofer on 5 point streak', () => {
        const was = state({
            game: {points: [4, 0], streak: [4, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 21},
            game: {points: [5, 0], streak: [5, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            '5 to 0',
            'Ofer',
            'Switch servers',
        ])
    })
    test('Kenfer on 10 point streak', () => {
        const was = state({
            game: {points: [9, 0], streak: [9, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 21},
            game: {points: [10, 0], streak: [10, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            'Ken to 0',
            'Kenfer',
            'Switch servers',
        ])
    })
    test('Turkey on 15 point streak', () => {
        const was = state({
            game: {points: [14, 0], streak: [14, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 21},
            game: {points: [15, 0], streak: [15, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            '15 to 0',
            'Turkey',
            'Switch servers',
        ])
    })
    test('Double Kenfer on 20 point streak', () => {
        const was = state({
            game: {points: [19, 0], streak: [19, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 21},
            game: {points: [20, 0], streak: [20, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            '20 to 0',
            'Double Kenfer',
            'Switch servers',
            'Game point',
        ])
    })
})

describe('Ofers, 11 point game', () => {
    test('Ofer on 4 point streak', () => {
        const was = state({
            game: {points: [3, 0], streak: [3, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 11},
            game: {points: [4, 0], streak: [4, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            '4 to 0',
            'Ofer',
            'Switch servers',
        ])
    })
    test('Double Ofer on 8 point streak', () => {
        const was = state({
            game: {points: [7, 0], streak: [7, 0]}
        })
        const now = state({
            announce: 'point',
            settings: {gameLength: 11},
            game: {points: [8, 0], streak: [8, 0]}
        })
        const result = script.announce(was, now)
        expect(result).toEqual([
            'Point Red',
            '8 to 0',
            'Double Ofer',
            'Switch servers',
        ])
    })
})
