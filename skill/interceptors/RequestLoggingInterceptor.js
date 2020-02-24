const Interceptor = require('./Interceptor')

class RequestLoggingInterceptor extends Interceptor {
    _process(handlerInput) {
        console.log('============== HANDLER INPUT ==============')
        console.log(JSON.stringify(handlerInput))
        console.log('===========================================')
    }
}

module.exports = RequestLoggingInterceptor