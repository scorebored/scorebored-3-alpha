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
                utter.onend = () => this.wait(resolve, utter)
                utter.onerror = reject
            }
        )
        this.synth.speak(utter)
        return {
            talking: {
                cancel: () => {
                    clearTimeout(this.timer)
                    utter.canceled = true
                    this.synth.cancel()
                }
            },
            promise
        }
    }

    // Instead of resolving right away, put in a slight delay. This makes
    // the speech sound more natural when there are back-to-back phrases.
    // Otherwise, the speech sounds too rushed
    wait = (resolve, utter) => {
        // If this phrase is canceled, do not resolve the promise as the
        // application is no longer interested.
        if (utter.canceled) {
            return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(resolve, phraseDelay)
    }

}