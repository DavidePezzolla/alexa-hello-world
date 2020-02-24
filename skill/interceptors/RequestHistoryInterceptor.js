const get = require('lodash.get')

const Interceptor = require('./Interceptor')

const MAX_HISTORY_SIZE = 20

class RequestHistoryInterceptor extends Interceptor {
    _process(handlerInput) {
        const request = this._getRequest(handlerInput);
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let history = sessionAttributes['history'] || [];
        if (history.length > MAX_HISTORY_SIZE - 1) {
            history.pop();
        }
        history.unshift({
            type: request.type,
            name: get(request, 'intent.name'),
        });
        sessionAttributes['history'] = history
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    }
}

module.exports = RequestHistoryInterceptor