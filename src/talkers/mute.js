import Talker from './talker'

export const delay = 1500 // ms

export default class Mute extends Talker {

    constructor() {
        super()
        this.timer = null
    }

    utter = () => {
        this.silence()
        this.timer = setTimeout(this.processQueue, delay)
    }

    silence = () => {
        clearTimeout(this.timer)
    }
}