const Handler = require('../Handler')

class FallbackHandler extends Handler {
    async _canHandle(handlerInput) {
        const request = this._getRequest(handlerInput);
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent'
    }
    async _handle(handlerInput, error) {
        const requestAttributes = this._getRequestAttributes(handlerInput)
        let say = requestAttributes.t('FallbackResponse');
        return handlerInput.responseBuilder
            .speak(say)
            .withShouldEndSession()
            .getResponse();
    }
}

module.exports = FallbackHandler