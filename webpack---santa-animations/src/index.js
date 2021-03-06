'use strict'

/**
 * @typedef {object} SantaAnimations
 * @property {function} animate
 * @property {function} transition
 * @property {function} sequence
 * @property {function} getProperties
 * @property {function} addTickerEvent
 * @property {function} removeTickerEvent
 * @property {function} kill
 * @property {function} delayedCall
 * @property {function} animateTimeScale
 * @property {function} updateViewMode
 * @property {object} viewerDefaults
 */

const viewerDefaults = require('./utils/viewerDefaults')
const animationDefinitions = require('./definitions/definitions')
const {
    getAllAnimationProperties,
    getAnimationDefsByViewMode,
    getAnimationMode
} = require('./utils/indexUtils')

const {
    validateSchema
} = require('./utils/validationUtils')

/**
 * Register animations - Call the 'register' function of each animation filtered by viewMode
 * @param {array<object>} defaults
 * @param {object<array<object>>}viewModes
 * @param {string} viewMode
 * @param {core.animations.tweenEngineGreenSock} engine
 * @param {core.animationsFactory} factory
 * @param {Window} frame
 */
function registerAnimations({
    defaults,
    ...viewModes
}, viewMode, engine, factory, frame) {
    const animationMode = getAnimationMode(viewMode)
    const animationDefsByViewMode = getAnimationDefsByViewMode(defaults, viewModes[animationMode])
    animationDefsByViewMode.forEach(animationDef => {
        animationDef.register({
            engine,
            factory
        }, frame)
    })
}

function validateAnimation(name, params, factory) {
    const properties = factory.getAllProperties()
    if (!properties[name]) {
        console.log(`No such animation "${name}"`)
        return false
    }

    return validateSchema(properties[name].schema || {}, params)
}

function getAnimate(factory) {
    return function(name, elements, duration, delay, params = {}) {
        if (validateAnimation(name, {
                duration,
                delay,
                ...params
            }, factory)) {
            return factory.animate(name, elements, duration, delay, params)
        }
        return factory.animate('BaseNone', elements, 0, 0, {})
    }
}

function getTransition(factory) {
    return function(name, sourceElements, destinationElements, duration, delay, params = {}) {
        if (validateAnimation(name, {
                duration,
                delay,
                ...params
            }, factory)) {
            return factory.transition(name, sourceElements, destinationElements, duration, delay, params)
        }
        return factory.transition('noTransition', sourceElements, destinationElements, 0, 0, {})
    }
}

/**
 * Animations constructor
 * @param {core.animations.tweenEngineGreenSock} engine
 * @param {core.animationsFactory} factory
 * @param {string} [viewMode='desktop'] view mode (for santa 'desktop', or 'mobile')
 * @param {Window} [frame=window] A Santa site might be rendered in a window which is not the same window as where the code was initiated (for example SantaPreviewService in the Editor), so we can override the source window for all animations here
 * @param {AnimationsDefinitions} [definitions] optional override for definitions (testing for example)
 * @returns {SantaAnimations}
 */
function create({
    engine,
    factory
}, frame = window, viewMode = 'desktop', definitions = animationDefinitions) {
    engine.adjustLagSmoothing(500, 33)
    engine.useRAF(true)

    registerAnimations(definitions, viewMode, engine, factory, frame)

    return {
        animate: getAnimate(factory),
        transition: getTransition(factory),
        sequence: factory.sequence,
        getProperties: factory.getProperties,
        addTickerEvent: engine.addTickerEvent,
        removeTickerEvent: engine.removeTickerEvent,
        kill: engine.kill,
        delayedCall: engine.delayedCall,
        animateTimeScale: engine.animateTimeScale,
        viewerDefaults,
        updateViewMode(mode) {
            factory.resetRegistrations()
            registerAnimations(definitions, mode, engine, factory, frame)
        },
        validate: validateSchema
    }
}

module.exports = {
    animationProperties: getAllAnimationProperties(animationDefinitions),
    create
}