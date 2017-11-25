import Talker from './talker'

const phraseDelay = 250 // ms

export default class WebApiTalker extends Talker {

    constructor() {
        super()
        this.synth = window.speechSynthesis
        this.timer = null
    }

    utter = (phrase) => {
        const utter = new SpeechSynthesisUtterance(phrase)
        const promise = new Promise(
            (resolve, reject) => {
                utter.onend = () => this.wait(resolve)
                utter.onerror = reject
            }
        )
        this.synth.speak(utter)
        return {
            talking: {
                cancel: () => {
                    clearTimeout(this.timer)
                    this.synth.cancel()
                }
            },
            promise
        }
    }

    wait = (resolve) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(resolve, phraseDelay)
    }

}