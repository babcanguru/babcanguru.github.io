'use strict'
const name = 'BasePosition'
const properties = {}

function register({
    engine,
    factory
} /*, frame*/ ) {
    /**
     * Position base animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Number|String} [params.from.x]
     * @param {Number|String} [params.from.y]
     * @param {Number|String} [params.from.z]
     * @param {Object} [params.from.bezier]
     * @param {Number|String} [params.to.x]
     * @param {Number|String} [params.to.y]
     * @param {Number|String} [params.to.z]
     * @param {Object} [params.to.bezier]
     * @returns {TweenMax}
     */
    function animation(elements, duration = 0, delay = 0, params = {}) {
        return engine.tween(elements, {
            duration,
            delay,
            ...params
        }, ['left', 'top', 'x', 'y', 'z', 'bezier'])
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}