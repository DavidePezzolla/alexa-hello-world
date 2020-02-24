const NavigateHomeHandler = require('./NavigateHomeHandler')
const StopHandler = require('./StopHandler')
const CancelHandler = require('./CancelHandler')
const FallbackHandler = require('./FallbackHandler')

module.exports = [
    new StopHandler(),
    new CancelHandler(),
    new NavigateHomeHandler(),
    new FallbackHandler(),
]