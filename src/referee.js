
class Referee {

    constructor() {
        this.match = {
            current: 1, 
            total: 1,
            scores: [0, 0],
        };
        this.game = {
            scores: [0, 0],
            length: 21
        };
        this.server = null;
    }

    isGameOver = () => {
        const [s0, s1] = this.game.scores; 
        if (s0 < this.game.length && s1 < this.game.length) {
            return false;
        }    
        if (Math.abs(s0 - s1) < 2) {
            return false;
        }
        return true;
    }
}

export default Referee;
