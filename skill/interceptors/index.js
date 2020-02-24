const RequestHistoryInterceptor = require('./RequestHistoryInterceptor')
const RequestLoggingInterceptor = require('./RequestLoggingInterceptor')
const LocalizationInterceptor = require('./LocalizationInterceptor.js')

module.exports.requestInterceptors = [
    new RequestHistoryInterceptor(),
    new RequestLoggingInterceptor()
]
module.exports.responseInterceptors = [
    new LocalizationInterceptor()
]