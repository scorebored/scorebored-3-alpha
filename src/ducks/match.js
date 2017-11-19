import {createAction, handleActions} from 'redux-actions'
import deepEqual from 'deep-equal'
import {otherPlayer} from '@/util/player'

const defaultState = {
    settings: {
        players: [{
            name: 'Home Team',
            sayAs: null,
        }, {
            name: 'Away Team',
            sayAs: null,
        }],
        length: 1,
        gameLength: 11,
    },
    game: {
        points: [0, 0],
        won: [0, 0],
        server: null,
        firstServer: null,
    },
    undo: [],
    redo: [],
}

export const adjust = createAction('scorebored/match/ADJUST')
export const settings = createAction('scorebored/match/SETTINGS')
export const firstServer = createAction('scorebored/match/FIRST_SERVER')
export const awardPoint = createAction('scorebored/mattch/AWARD_POINT')
export const undo = createAction('scorebored/match/UNDO')
export const redo = createAction('scorebored/match/REDO')

export default handleActions({
    [adjust]: (state, action) => {
        if (deepEqual(state.game, {...state.game, ...action.payload})) {
            return state
        }
        const newState = undoable(state)
        newState.game = {
            ...state.game,
            ...action.payload,
        }
        return newState
    },
    [settings]: (state, action) => ({
        ...state,
        settings: {
            ...state.settings,
            ...action.payload,
        },
    }),
    [awardPoint]: (state, action) => {
        if (isGameOver(state)) {
            return state
        }
        const newState = undoable(state)
        newState.game = {
            ...state.game,
            points: state.game.points.slice(),
        }
        newState.game.points[action.payload] += 1
        if (isServiceChange(newState)) {
            switchServers(newState)
        }
        return newState
    },
    [firstServer]: (state, action) => {
        if (state.game.firstServer !== null) {
            return
        }
        const newState = undoable(state)
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
        }
    }
}, defaultState)

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

export const isOvertime = (match) => {
    const p0 = match.game.points[0]
    const p1 = match.game.points[1]

    if (isGameOver(match)) {
        return false
    }
    if (p0 >= match.settings.gameLength || p1 >= match.settings.gameLength) {
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

const switchServers = (match) => {
    match.game.server = otherPlayer(match.game.server)
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
