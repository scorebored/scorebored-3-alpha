import StandardScript from './standard'

let script

beforeEach(() => {
    script = new StandardScript()
})

test('first server, red', () => {
    const was = state()
    const now = state({
        announce: 'firstServer',
        game: {firstServer: 0}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Red serves first'])
})

test('first server, blue', () => {
    const was = state()
    const now = state({
        announce: 'firstServer',
        game: {firstServer: 1}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Blue serves first'])
})

test('point red', () => {
    const was = state()
    const now = state({
        announce: 'point',
        game: {points: [1, 0]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Red', '1 to 0'])
})

test('point blue', () => {
    const was = state()
    const now = state({
        announce: 'point',
        game: {points: [0, 1]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '0 to 1'])
})

test('score all', () => {
    const was = state({
        game: {points: [3, 2]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [3, 3]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '3 all'])
})

test('switch servers every 2 in 11 point game', () => {
    const was = state({
        game: {points: [0, 1]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11},
        game: {points: [1, 1]}
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Red', '1 all', 'Switch servers'])
})

test('switch servers every 5 in 21 point game', () => {
    const was = state({
        game: {points: [2, 2]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 21},
        game: {points: [2, 3]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '2 to 3', 'Switch servers'])
})

test('deuce before game point', () => {
    const was = state({
        game: {points: [9, 10]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11},
        game: {points: [10, 10]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Red', 'Deuce'])
})

test('deuce after game point', () => {
    const was = state({
        game: {points: [11, 12]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11},
        game: {points: [12, 12]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Red', 'Deuce'])
})

test('advantange red', () => {
    const was = state({
        game: {points: [10, 10]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11},
        game: {points: [11, 10]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Advantage Red'])
})

test('advantange blue', () => {
    const was = state({
        game: {points: [10, 10]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11},
        game: {points: [10, 11]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Advantage Blue'])
})

test('game point', () => {
    const was = state({
        game: {points: [7, 9]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 1},
        game: {points: [7, 10]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '7 to 10', 'Game point'])
})

test('match point', () => {
    const was = state({
        game: {points: [7, 9]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 3},
        game: {points: [7, 10], wins: [0, 1]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Point Blue', '7 to 10', 'Match point'])
})

test('win game in one game match', () => {
    const was = state({
        game: {points: [7, 10]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 1},
        game: {points: [7, 11], wins: [0, 1]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Blue wins the game'])
})

test('win match', () => {
    const was = state({
        game: {points: [7, 10], wins: [1, 1]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 3},
        game: {points: [7, 11], wins: [1, 2]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual(['Blue wins the match'])
})

test('win game in match, blue leads', () => {
    const was = state({
        game: {points: [7, 10], wins: [0, 0]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 3},
        game: {points: [7, 11], wins: [0, 1]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Blue wins the game',
        'Blue leads the match 1 game to 0',
        'Switch sides'
    ])
})

test('win game in match, red leads', () => {
    const was = state({
        game: {points: [7, 10], wins: [2, 0]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 7},
        game: {points: [7, 11], wins: [2, 1]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Blue wins the game',
        'Red leads the match 2 games to 1',
        'Switch sides'
    ])
})

test('win game in match, match tied at 1', () => {
    const was = state({
        game: {points: [10, 7], wins: [0, 1]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 7},
        game: {points: [11, 7], wins: [1, 1]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Red wins the game',
        'Match is tied at 1 game each',
        'Switch sides'
    ])
})


test('win game in match, match tied at 2', () => {
    const was = state({
        game: {points: [10, 7], wins: [1, 2]}
    })
    const now = state({
        announce: 'point',
        settings: {gameLength: 11, length: 7},
        game: {points: [11, 7], wins: [2, 2]},
    })
    const result = script.announce(was, now)
    expect(result).toEqual([
        'Red wins the game',
        'Match is tied at 2 games each',
        'Switch sides'
    ])
})

const state = (override) => {
    override = override || {}
    const s = {
        settings: {
            length: 1,
            gameLength: 11,
        },
        game: {
            points: [0, 0],
            wins: [0, 0],
            server: null,
            firstServer: null,
        },
        announce: null,
        undo: [],
        redo: []
    }
    if (override.announce) {
        s.announce = override.announce
    }
    if (override.settings) {
        s.settings = {...s.settings, ...override.settings}
    }
    if (override.game) {
        s.game = {...s.game, ...override.game}
    }
    return s
}