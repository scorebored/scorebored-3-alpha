import {createAction, handleActions} from 'redux-actions'

const defaultTalker = (process.platform !== 'darwin') ? 'mute' : 'standard'
const defaultSubtitles = (process.platform !== 'darwin')

const defaultState = {
    speaking: null,
    talker: defaultTalker,
    script: 'standard',
    subtitles: defaultSubtitles,
}

export const say = createAction('scorebored/announcer/SAY')
export const silence = createAction('scorebored/announcer/SILENCE')
export const talker = createAction('scorebored/announcer/TALKER')

export default handleActions({
    [say]: (state, action) => ({
        ...state,
        speaking: action.payload
    }),
    [silence]: (state) => ({
        ...state,
        speaking: null
    }),
    [talker]: (state, action) => ({
        ...state,
        talker: action.payload,
    })
}, defaultState)
