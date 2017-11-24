export default class WebApiTalker {

    constructor() {
        this.synth = window.speechSynthesis
    }

    say = (phrases) => {
        let text = ''
        if (Array.isArray(phrases)) {
            text = phrases.join('. ')
        } else {
            text = phrases
        }
        this.synth.speak(new SpeechSynthesisUtterance(text))
    }

    silence = () => {
        this.synth.cancel()
    }

    toString = () => 'Standard'
}