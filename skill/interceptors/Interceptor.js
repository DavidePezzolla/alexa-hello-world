const get = require('lodash.get')

class Interceptor {
    process(handlerInput) {
        this._process(handlerInput)
    }
    _process(handlerInput) {
        throw new Error("Implement _process method in the subclass")
    }
    _getRequest(handlerInput) {
        return get(handlerInput, 'requestEnvelope.request')
    }
}

module.exports = Interceptor