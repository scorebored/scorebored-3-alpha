import WebApiTalker from './mute'

jest.useFakeTimers()

test('it should emit an utterance', () => {
    const t = new WebApiTalker()
    t.processQueue = jest.fn()
    t.utter('Test')
    jest.runAllTimers()
    expect(t.processQueue).toBeCalled()
})

test('it should not process the queue when silenced', () => {
    const t = new WebApiTalker()
    t.processQueue = jest.fn()
    t.utter('Test')
    t.silence()
    jest.runAllTimers()
    expect(t.processQueue).not.toBeCalled()
})