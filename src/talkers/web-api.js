import Talker from './talker'

const phraseDelay = 300 // ms

export default class WebApiTalker extends Talker {

    constructor() {
        super()
        this.synth = window.speechSynthesis
    }

    utter = (phrase) => {
        const utter = new SpeechSynthesisUtterance(phrase)
        const promise = new Promise(
            (resolve, reject) => {
                utter.onend = () => setTimeout(resolve, phraseDelay)
                utter.onerror = reject
            }
        )
        this.synth.speak(utter)
        return {talking: this.synth, promise}
    }
}