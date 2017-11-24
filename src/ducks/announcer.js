import {createAction, handleActions} from 'redux-actions'

const defaultState = {
    speaking: null,
}

export const say = createAction('scorebored/announcer/SAY')
export const silence = createAction('scorebored/announcer/SILENCE')

export default handleActions({
    [say]: (state, action) => ({
        ...state,
        speaking: action.payload
    }),
    [silence]: (state) => ({
        ...state,
        speaking: null
    })
}, defaultState)
