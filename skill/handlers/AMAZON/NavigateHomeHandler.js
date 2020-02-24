const Handler = require('../Handler')

class NavigateHomeHandler extends Handler {
    async _canHandle(handlerInput) {
        const request = this._getRequest(handlerInput);
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent'
    }
    async _handle(handlerInput, error) {
        let say = `AMAZON NavigateHomeIntent`;
        return handlerInput.responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = NavigateHomeHandler