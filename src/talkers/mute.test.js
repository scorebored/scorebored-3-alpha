import Mute from './mute'

jest.useFakeTimers()

test('it should fake an utterance', () => {
    const t = new Mute()
    t.processQueue = jest.fn()
    t.utter('Test')
    jest.runAllTimers()
    expect(t.processQueue).toBeCalled()
})

test('it should not process the queue when silenced', () => {
    const t = new Mute()
    t.processQueue = jest.fn()
    t.utter('Test')
    t.silence()
    jest.runAllTimers()
    expect(t.processQueue).not.toBeCalled()
})