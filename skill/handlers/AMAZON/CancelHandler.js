const Handler = require('../Handler')

class CancelHandler extends Handler {
    async _canHandle(handlerInput) {
        const request = this._getRequest(handlerInput);
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent'
    }
    async _handle(handlerInput, error) {
        const requestAttributes = this._getRequestAttributes(handlerInput)
        let say = requestAttributes.t('StopCancelResponse');
        return handlerInput.responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = CancelHandler