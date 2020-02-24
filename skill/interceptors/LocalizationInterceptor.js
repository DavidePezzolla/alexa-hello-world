const i18n = require('i18next'); 
const sprintf = require('i18next-sprintf-postprocessor');

const Interceptor = require('./Interceptor')

const languageStrings = {
    'en' : require('../i18n/en'),
    'it' : require('../i18n/it'),
    // ... etc
}

class LocalizationInterceptor extends Interceptor {
    _process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en', // fallback to EN if locale doesn't exist
            resources: languageStrings
        });

        localizationClient.localize = function () {
            const args = arguments;
            let count = undefined;
            let values = [];

            for (var i = 1; i < args.length; i++) {
                if(args[i].count !== undefined){
                    values.push(args[i].count);
                    count = args[i].count;
                }
                else{
                    values.push(args[i]);
                }
            }
            const value = i18n.t(args[0], {
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values,
                count: count
            });

            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        }

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) { // pass on arguments to the localizationClient
            return localizationClient.localize(...args);
        };
    }
}

module.exports = LocalizationInterceptor