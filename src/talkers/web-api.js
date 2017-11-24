import Talker from './talker'

export default class WebApiTalker extends Talker {

    constructor() {
        super()
        this.synth = window.speechSynthesis
    }

    utter = (phrase) => {
        const utter = new SpeechSynthesisUtterance(phrase)
        const promise = new Promise(
            (resolve, reject) => {
                utter.onend = resolve
                utter.onerror = reject
            }
        )
        this.synth.speak(utter)
        return {talking: this.synth, promise}
    }
}