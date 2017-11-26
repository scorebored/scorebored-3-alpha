import {createAction, handleActions} from 'redux-actions'

const defaultState = {
    speaking: null,
    talker: 'local',
    script: 'standard',
    subtitles: false,
}

export const say = createAction('scorebored/announcer/SAY')
export const silence = createAction('scorebored/announcer/SILENCE')
export const setTalker = createAction('scorebored/announcer/SET_TALKER')
export const setScript = createAction('scorebored/announcer/SET_SCRIPT')
export const enableSubtitles = createAction('scorebored/announcer/ENABLE_SUBTITLES')

export default handleActions({
    [say]: (state, action) => ({
        ...state,
        speaking: action.payload
    }),
    [silence]: (state) => ({
        ...state,
        speaking: null
    }),
    [setTalker]: (state, action) => ({
        ...state,
        talker: action.payload,
    }),
    [setScript]: (state, action) => ({
        ...state,
        script: action.payload,
    }),
    [enableSubtitles]: (state, action) => ({
        ...state,
        subtitles: action.payload,
    })
}, defaultState)
