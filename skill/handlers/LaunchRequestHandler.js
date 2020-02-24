const Handler = require('./Handler')

class LaunchRequestHandler extends Handler {
    async _canHandle(handlerInput) {
        const request = this._getRequest(handlerInput);
        return request.type === 'LaunchRequest'
    }
    async _handle(handlerInput, error) {
        const requestAttributes = this._getRequestAttributes(handlerInput)                
        let say = requestAttributes.t('LaunchRequestSuccessResponse', name);        
                
        return handlerInput.responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();                

    }
}

module.exports = LaunchRequestHandler