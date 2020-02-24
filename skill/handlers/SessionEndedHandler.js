const Handler = require('./Handler')

class SessionEndedHandler extends Handler {
    async _canHandle(handlerInput) {
        const request = this._getRequest(handlerInput);
        return request.type === 'SessionEndedRequest'
    }
    async _handle(handlerInput, error) {
        const request = this._getRequest(handlerInput);
        console.log(`Session ended with reason: ${request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
}

module.exports = SessionEndedHandler