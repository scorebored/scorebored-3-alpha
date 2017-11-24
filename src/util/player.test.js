import {otherPlayer} from './player'

describe('otherPlayer', () => {
    test('otherPlayer(0) is 1', () => {
        expect(otherPlayer(0)).toBe(1)
    })
    test('otherPlayer(1) is 0', () => {
        expect(otherPlayer(1)).toBe(0)
    })
    test('otherPlayer(player2) is an error', () => {
        expect(() => otherPlayer('player2')).toThrow()
    })
})

