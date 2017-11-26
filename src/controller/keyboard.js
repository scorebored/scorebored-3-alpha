import * as controller from './index'

export default () => {
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
}

const down = {}

export const keydown = (event) => {
    const key = getEvent(event)
    if (!key) {
        return
    }
    if (down[key]) {
        return
    }
    down[key] = true
    controller.emit(key)
}

export const keyup = (event) => {
    const key = getEvent(event)
    if (!key) {
        return
    }
    delete down[key]
}

const getEvent = (event) => {
    if (event.key === 'ArrowUp') {
        return controller.CURSOR_UP
    }
    if (event.key === 'ArrowRight') {
        return controller.CURSOR_RIGHT
    }
    if (event.key === 'ArrowDown') {
        return controller.CURSOR_DOWN
    }
    if (event.key === 'ArrowLeft') {
        return controller.CURSOR_LEFT
    }
    if (event.key === 'Enter') {
        return controller.SELECT
    }
    if (event.key === 'Escape') {
        return controller.BACK
    }
    if (event.code === 'ShiftLeft') {
        return controller.RED
    }
    if (event.code === 'ShiftRight') {
        return controller.BLUE
    }
    if (event.code === 'Backspace' && !event.ctrlKey) {
        return controller.UNDO
    }
    if (event.code === 'Backspace' && event.ctrlKey) {
        return controller.REDO
    }
}