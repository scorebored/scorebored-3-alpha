import Talker from './talker'

const duration = 2000 // ms

export default class Mute extends Talker {

    constructor() {
        super()
        this.timer = null
    }

    utter = () => {
        const promise = new Promise(
            (resolve) => {
                clearTimeout(this.timer)
                this.timer = setTimeout(resolve, duration)
            }
        )
        const talking = {
            cancel: () => clearTimeout(this.timer)
        }
        return {talking, promise}
    }
}