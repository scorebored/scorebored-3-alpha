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
        //dpad up
        return controller.CURSOR_UP
    }
    if (event.key === 'ArrowRight') {
        //dpad right
        return controller.CURSOR_RIGHT
    }
    if (event.key === 'ArrowDown') {
        //dpad down
        return controller.CURSOR_DOWN
    }
    if (event.key === 'ArrowLeft') {
        // dpad left
        return controller.CURSOR_LEFT
    }
    if (event.key === 'Enter') {
        // A button
        return controller.SELECT
    }
    if (event.key === 'Escape') {
        // B button | eastern button
        return controller.BACK
    }
    if (event.code === 'ShiftLeft') {
        // left trigger
        return controller.RED
    }
    if (event.code === 'ShiftRight') {
        // right trigger
        return controller.BLUE
    }
    if (event.code === 'Backspace' && !event.ctrlKey) {
        // L1 LB
        return controller.UNDO
    }
    if (event.code === 'Backspace' && event.ctrlKey) {
        // R1 RB
        return controller.REDO
    }

    // TODO Jacob Excuse button
    // TODO Adjust Button
    // TODO yeah baby, nothing but net, etc... buttons
}
