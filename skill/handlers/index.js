const AmazonHandlers = require('./AMAZON')
const ErrorHandler = require('./ErrorHandler')
const LaunchRequestHandler = require('./LaunchRequestHandler')
const SessionEndedHandler = require('./SessionEndedHandler')
const HelpHandler = require('./HelpHandler')



module.exports.handlers = [
    ...AmazonHandlers,
    
    new LaunchRequestHandler(),
    new SessionEndedHandler(),    
    new HelpHandler(),

]
module.exports.errorHandlers = [ new ErrorHandler() ]