import {EventEmitter} from 'events'

const events = new EventEmitter()

export const addListener = (listener) => {
    events.addListener('$', listener)
}

export const removeListener = (listener) => {
    events.removeListener('$', listener)
}

export const removeAllListeners = () => {
    events.removeAllListeners('$')
}

export const emit = (value) => {
    events.emit('$', value)
}

export const CURSOR_UP = 'scorebored/controller/CURSOR_UP'
export const CURSOR_RIGHT = 'scorebored/controller/CURSOR_RIGHT'
export const CURSOR_DOWN = 'scorebored/controller/CURSOR_DOWN'
export const CURSOR_LEFT = 'scorebored/controller/CURSOR_LEFT'
export const SELECT = 'scorebored/controller/SELECT'
export const BACK = 'scorebored/controller/BACK'
export const RED = 'scorebored/controller/RED'
export const BLUE = 'scorebored/controller/BLUE'
export const UNDO = 'scorebored/controller/UNDO'
export const REDO = 'scorebored/controller/REDO'
