const get = require('lodash.get');

class Handler {
    constructor() { }
    async canHandle(handlerInput) {
        return await this._canHandle(handlerInput)
    }
    async _canHandle(handlerInput) {
        throw new Error("Implement _canHandle method in the subclass")
    }
    async handle(handlerInput, error = undefined) {
        return await this._handle(handlerInput, error)
    }
    async _handle(handlerInput, error) {
        throw new Error("Implement _handle method in the subclass")
    }
    _getRequest(handlerInput) {
        return get(handlerInput, 'requestEnvelope.request')
    }
    _getViewport(handlerInput) {
        return get(handlerInput, 'requestEnvelope.context.Viewport')
    }
    _getSystem(handlerInput) {
        return get(handlerInput, 'requestEnvelope.context.System')
    }
    _getRequestAttributes(handlerInput) {
        return handlerInput.attributesManager.getRequestAttributes();        
    }    
    _getSlots(handlerInput) {
        return get(handlerInput, 'requestEnvelope.request.intent.slots')
    }
    _getSlotValues(slots) {
        const slotValues = {};

        Object.keys(slots).forEach((item) => {
            const name = slots[item].name;

            if (slots[item] &&
                slots[item].resolutions &&
                slots[item].resolutions.resolutionsPerAuthority[0] &&
                slots[item].resolutions.resolutionsPerAuthority[0].status &&
                slots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                switch (slots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                    case 'ER_SUCCESS_MATCH':
                        slotValues[name] = {
                            heardAs: slots[item].value,
                            resolved: slots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                            ERstatus: 'ER_SUCCESS_MATCH'
                        };
                        break;
                    case 'ER_SUCCESS_NO_MATCH':
                        slotValues[name] = {
                            heardAs: slots[item].value,
                            resolved: '',
                            ERstatus: 'ER_SUCCESS_NO_MATCH'
                        };
                        break;
                    default:
                        break;
                }
            } else {
                slotValues[name] = {
                    heardAs: slots[item].value,
                    resolved: '',
                    ERstatus: ''
                };
            }
        }, this);
        return slotValues
    }

    _getAccountLinkingToken(handlerInput) {
        return get(handlerInput, 'requestEnvelope.context.System.user.accessToken')
    }
    _supportsAPL(handlerInput) { 
        const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
        const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
        return aplInterface !== null && aplInterface !== undefined; 
    }
    _supportsDisplay(handlerInput) {
        console.log("check supporto APL")
        return get(handlerInput, 'requestEnvelope.context.System.device.supportedInterfaces.Display', false)
    }    
}

module.exports = Handler