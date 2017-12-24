import {createAction, handleActions} from 'redux-actions'
import deepEqual from 'deep-equal'
import {otherPlayer} from '../util/player'

const defaultState = {
    settings: {
        length: 1,
        gameLength: 11,
    },
    game: {
        points: [0, 0],
        streak: [0, 0],
        wins: [0, 0],
        server: null,
        firstServer: null,
    },
    announce: null,
    undo: [],
    redo: [],
}

export const adjust = createAction('scorebored/match/ADJUST')
export const settings = createAction('scorebored/match/SETTINGS')
export const setGameLength = createAction('scorebored/match/SET_GAME_LENGTH')
export const setMatchLength = createAction('scorebored/match/SET_MATCH_LENGTH')
export const firstServer = createAction('scorebored/match/FIRST_SERVER')
export const awardPoint = createAction('scorebored/match/AWARD_POINT')
export const undo = createAction('scorebored/match/UNDO')
export const redo = createAction('scorebored/match/REDO')
export const nextGame = createAction('scorebored/match/NEXT_GAME')
export const reset = createAction('scorebored/match/RESET')

export default handleActions({
    [adjust]: (state, action) => {
        if (deepEqual(state.game, {...state.game, ...action.payload})) {
            return state
        }
        const newState = undoable(state)
        newState.game = {
            ...state.game,
            ...action.payload,
            streak: [0, 0],
        }
        newState.announce = null
        return newState
    },
    [settings]: (state, action) => ({
        ...state,
        settings: {
            ...state.settings,
            ...action.payload,
        },
        announce: null,
    }),
    [setGameLength]: (state, action) => ({
        ...state,
        settings: {
            ...state.settings,
            gameLength: action.payload,
        },
        announce: null,
    }),
    [setMatchLength]: (state, action) => ({
        ...state,
        settings: {
            ...state.settings,
            length: action.payload,
        },
        announce: null,
    }),
    [awardPoint]: (state, action) => {
        const awardTo = action.payload
        const other = otherPlayer(awardTo)
        if (isGameOver(state)) {
            return state
        }
        const newState = undoable(state)
        newState.announce = 'point'
        newState.game = {
            ...state.game,
            points: state.game.points.slice(),
            streak: state.game.points.slice(),
        }
        newState.game.points[awardTo] += 1
        newState.game.streak[awardTo] += 1
        newState.game.streak[other] = 0
        if (!isGameOver(newState) && isServiceChange(newState)) {
            switchServers(newState)
        }
        if (isGameOver(newState)) {
            newState.game.wins = newState.game.wins.slice()
            newState.game.wins[action.payload] += 1
        }
        return newState
    },
    [firstServer]: (state, action) => {
        if (state.game.firstServer !== null) {
            return
        }
        const newState = undoable(state)
        newState.announce = 'firstServer'
        newState.game = {
            ...state.game,
            server: action.payload,
            firstServer: action.payload,
        }
        return newState
    },
    [undo]: (state) => {
        if (state.undo.length === 0) {
            return state
        }
        const previous = state.undo[state.undo.length - 1]
        return {
            ...state,
            game: previous,
            undo: state.undo.slice(0, state.undo.length - 1),
            redo: state.redo.concat(state.game),
            announce: null,
        }
    },
    [redo]: (state) => {
        if (state.redo.length === 0) {
            return state
        }
        const next = state.redo[state.redo.length - 1]
        return {
            ...state,
            game: next,
            redo: state.redo.slice(0, state.redo.length - 1),
            announce: null,
        }
    },
    [nextGame]: (state) => {
        if (!isGameOver(state)) {
            return state
        }
        if (isMatchOver(state)) {
            return state
        }
        const newState = undoable(state)
        state.announce = 'nextGame'
        newState.game = {
            ...state.game,
            points: [0, 0],
            streak: [0, 0],
        }
        switchSides(newState)
        // Since the first server and sides both switch each time, the
        // starting server is always on the same side
        newState.game.server = newState.game.firstServer
        return newState
    },
    [reset]: (state) => ({
        ...state,
        settings: {
            ...state.settings,
        },
        game: {
            points: [0, 0],
            streak: [0, 0],
            wins: [0, 0],
            server: null,
            firstServer: null,
        },
        undo: [],
        redo: [],
        announce: null,
    })
}, defaultState)

export const isGamePoint = (match) => {
    const p0 = match.game.points[0]
    const p1 = match.game.points[1]
    const len = match.settings.gameLength

    if (p0 >= len - 1 || p1 >= len - 1) {
        return true
    }
    return false
}

export const isMatchPoint = (match) => {
    const p0 = match.game.points[0]
    const p1 = match.game.points[1]
    const glen = match.settings.gameLength

    const w0 = match.game.wins[0]
    const w1 = match.game.wins[1]
    const mlen = match.settings.length
    const toWin = gamesToWin(match)

    if (mlen == 1) {
        return false
    }
    if (p0 >= glen - 1 && w0 + 1 >= toWin) {
        return true
    }
    if (p1 >= glen - 1 && w1 + 1 >= toWin) {
        return true
    }
    return false
}

export const isGameOver = (match) => {
    const p0 = match.game.points[0]
    const p1 = match.game.points[1]

    if (p0 < match.settings.gameLength && p1 < match.settings.gameLength) {
        return false
    }
    if (Math.abs(p0 - p1) < 2) {
        return false
    }
    return true
}

export const isMatchOver = (match) => {
    const toWin = gamesToWin(match)
    if (match.game.wins[0] >= toWin || match.game.wins[1] >= toWin) {
        return true
    }
    return false
}

export const isOvertime = (match) => {
    const p0 = match.game.points[0]
    const p1 = match.game.points[1]
    const len = match.settings.gameLength

    if (isGameOver(match)) {
        return false
    }
    if (p0 === len - 1 && p1 === len - 1) {
        return true
    }
    if (p0 >= len || p1 >= len) {
        return true
    }
    return false
}

export const isServiceChange = (match) => {
    const total = match.game.points[0] + match.game.points[1]
    if (!isOvertime(match)) {
        if (match.settings.gameLength === 21) {
            return total % 5 === 0
        }
        return total % 2 === 0
    }
    return true
}

export const gamesToWin = (match) => {
    return Math.ceil(match.settings.length / 2)
}

const switchServers = (match) => {
    match.game.server = otherPlayer(match.game.server)
}

const switchSides = (match) => {
    match.game.points = [match.game.points[1], match.game.points[0]]
    match.game.wins = [match.game.wins[1], match.game.wins[0]]
    match.game.server = otherPlayer(match.game.server)
    return match
}

const undoable = (state) => {
    const newState = {
        ...state,
        undo: state.undo.slice(),
        redo: [],
    }
    newState.undo.push(state.game)
    return newState
}

export const createState = (override) => {
    override = override || {}
    const s = {
        settings: {
            length: 1,
            gameLength: 11,
        },
        game: {
            points: [0, 0],
            streak: [0, 0],
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
