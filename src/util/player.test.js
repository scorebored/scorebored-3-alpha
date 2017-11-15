import {otherPlayer} from '@/util/player';

describe('otherPlayer', () => {
    test('otherPlayer(player0) is player1', () => {
        expect(otherPlayer('player0')).toBe('player1');
    });
    test('otherPlayer(player1) is player0', () => {
        expect(otherPlayer('player1')).toBe('player0');
    });
    test('otherPlayer(player2) is an error', () => {
        expect(() => otherPlayer('player2')).toThrow();
    });
});

