const Alexa = require("ask-sdk-core");
const skillBuilder = Alexa.SkillBuilders.custom();
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
const { requestHandlers, errorHandlers } = require('./handlers')
const { requestInterceptors, responseInterceptors } = require('./interceptors')
exports.handler = skillBuilder
    .addRequestHandlers(...requestHandlers)
    .addErrorHandlers(...errorHandlers)
    .addRequestInterceptors(...requestInterceptors)
    .addResponseInterceptors(...responseInterceptors)
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({bucketName:process.env.S3_PERSISTENCE_BUCKET})
    )
    .lambda();