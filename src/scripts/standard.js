import {
    isOvertime,
    isServiceChange,
    isGamePoint,
    isMatchPoint,
    isGameOver,
    isMatchOver
} from '../ducks/match'
import {otherPlayer} from '../util/player'

export default class StandardScript {

    sample = () => {
        return [
            'Point Blue',
            '4 to 6',
            'Switch servers'
        ]
    }

    sayServesFirst = (playerId) => {
        this.say(`${this.playerName(playerId)} serves first`)
    }

    sayIsServing = () => {
        this.say('Switch servers')
    }

    sayPoint = (playerId) => {
        this.say(`Point ${this.playerName(playerId)}`)
    }

    sayPointsAll = (points) => {
        this.say(`${points} all`)
    }

    sayPointsToPoints = (p0, p1) => {
        this.say(`${p0} to ${p1}`)
    }

    sayGamePoint = () => {
        this.say('Game point')
    }

    sayMatchPoint = () => {
        this.say('Match point')
    }

    sayAdvantage = (playerId) => {
        this.say(`Advantage ${this.playerName(playerId)}`)
    }

    sayDeuce = () => {
        this.say('Deuce')
    }

    sayWinsGame = (playerId) => {
        this.say(`${this.playerName(playerId)} wins the game`)
    }

    sayWinsMatch = (playerId) => {
        this.say(`${this.playerName(playerId)} wins the match`)
    }

    sayLeadsMatch = (playerId) => {
        const more = this.now.game.wins[playerId]
        const less = this.now.game.wins[otherPlayer(playerId)]
        const game = more === 1 ? 'game' : 'games'
        this.say(`${this.playerName(playerId)} leads the match ${more} ${game} to ${less}`)
    }

    sayMatchTied = () => {
        const total = this.now.game.wins[0]
        const game = total === 1 ? 'game' : 'games'
        this.say(`Match is tied at ${total} ${game} each`)
    }

    saySwitchSides = () => {
        this.say('Switch sides')
    }

    say = (phrase) => {
         this.phrases.push(phrase)
    }

    announce = (was, now) => {
        this.was = was
        this.now = now
        this.phrases = []

        const type = now.announce
        if (type === 'point') {
            this.awardPoint()
        }
        if (type === 'firstServer') {
            this.sayServesFirst(this.now.game.firstServer)
        }
        return this.phrases
    }

    awardPoint = () => {
        if (isOvertime(this.now)) {
            this.awardPointOvertime()
            return
        }
        if (isMatchOver(this.now)) {
            this.matchOver()
            return
        }
        if (isGameOver(this.now)) {
            this.gameOver()
            return
        }

        const pwas = this.was.game.points
        const pnow = this.now.game.points

        const awardedTo = pwas[0] != pnow[0] ? 0 : 1
        this.sayPoint(awardedTo)

        if (pnow[0] === pnow[1]) {
            this.sayPointsAll(pnow[0])
        } else {
            this.sayPointsToPoints(pnow[0], pnow[1])
        }
        if (isServiceChange(this.now)) {
            this.sayIsServing()
        }
        if (isMatchPoint(this.now)) {
            this.sayMatchPoint()
        } else if (isGamePoint(this.now)) {
            this.sayGamePoint()
        }
    }

    awardPointOvertime = () => {
        const pwas = this.was.game.points
        const pnow = this.now.game.points

        const awardedTo = pwas[0] != pnow[0] ? 0 : 1

        if (pnow[0] == pnow[1]) {
            this.sayPoint(awardedTo)
            this.sayDeuce()
        } else {
            this.sayAdvantage(awardedTo)
        }
    }

    matchOver = () => {
        const pwas = this.was.game.points
        const pnow = this.now.game.points

        const awardedTo = pwas[0] != pnow[0] ? 0 : 1

        if (this.now.settings.length === 1) {
            this.sayWinsGame(awardedTo)
        } else {
            this.sayWinsMatch(awardedTo)
        }
    }

    gameOver = () => {
        const pwas = this.was.game.points
        const pnow = this.now.game.points

        const awardedTo = pwas[0] != pnow[0] ? 0 : 1
        this.sayWinsGame(awardedTo)

        const w0 = this.now.game.wins[0]
        const w1 = this.now.game.wins[1]
        if (w0 > w1) {
            this.sayLeadsMatch(0)
        } else if (w1 > w0) {
            this.sayLeadsMatch(1)
        } else {
            this.sayMatchTied()
        }
        this.saySwitchSides()
    }

    playerName = (playerId) => {
        return playerId === 0 ? 'Red': 'Blue'
    }

}