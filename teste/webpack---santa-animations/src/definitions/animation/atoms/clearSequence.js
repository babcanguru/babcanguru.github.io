'use strict'
const {
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const name = 'ClearSequence'
const properties = {
    groups: ['animation'],
    schema: {}
}

function register({
    factory,
    engine
}) {
    /**
     * Clear and Reset all animations on some elements
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Object} [params] Timeline optional parameters.
     * @param {Object} [durationStub] stub. no duration for clearing.
     * @param {Object} [delayStub] stub. no delay for clearing.
     * @returns {TimelineMax}
     */
    function animation(elements, durationStub, delayStub, params = {}) {
        elements = getElementsAsArray(elements)

        const tweens = elements.reduce((acc, element) => acc.concat(engine.getTweensOf(element)), [])

        tweens.forEach(tween => engine.kill(tween))

        const sequence = factory.sequence(params)
        // We have to return an animation or sequence from an animation class, so adding an empty animation here
        // Actual clearing is handled by the system when platform sends a {clear: true} param
        sequence.add(factory.animate('BaseNone', elements, 0, 0, {}))
        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}