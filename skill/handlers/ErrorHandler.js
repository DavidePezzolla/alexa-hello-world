const Handler = require('./Handler')

class ErrorHandler extends Handler {
    async _canHandle(handlerInput) { return true }
    async _handle(handlerInput, error) {
        const requestAttributes = this._getRequestAttributes(handlerInput)
        let name = await this._getUserName(handlerInput);
        let say = requestAttributes.t('ErrorResponse');
        console.log(`Error handled: ${error.message}`);
        

        return handlerInput.responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    }
}

module.exports = ErrorHandler