import {createAction, handleActions} from 'redux-actions'

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

export const adjust = createAction('match/adjust')
export const settings = createAction('match/settings')
export const firstServer = createAction('match/firstServer')
export const awardPoint = createAction('match/awardPoint')

export default handleActions({
    [adjust]: (state, action) => ({
        ...state,
        game: {
            ...state.game,
            ...action.payload,
        }
    }),
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
        const newState = {
            ...state,
            game: {
                ...state.game,
                points: state.game.points.slice(),
            },
        }
        newState.game.points[action.payload] += 1
        if (isServiceChange(newState)) {
            switchServers(newState)
        }
        return newState
    },
    [firstServer]: (state, action) => {
        const newState = {
            ...state,
            game: {
                ...state.game,
                server: action.payload,
                firstServer: action.payload,
            }
        }
        return newState
    },
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


