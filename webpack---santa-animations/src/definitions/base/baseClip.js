'use strict'
const {
    getElementsAsArray
} = require('../../utils/definitionsUtils')

const name = 'BaseClip'
const properties = {}

function getClipRect(compRect, contentRect) {
    const top = contentRect.top - compRect.top
    const left = contentRect.left - compRect.left
    const right = contentRect.width + left
    const bottom = contentRect.height + top

    return `rect(${[top, right, bottom, left].join('px,')}px)`
}

function register({
    engine,
    factory
}) {
    /**
     * Clip base animation object, expect all passed elements to be of the same size
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Object} from
     * @param {Object} to
     * @param {String} [params.from.clip]
     * @param {String} [params.to.clip]
     * @returns {TimelineMax}
     */
    function animation(elements, duration = 0, delay = 0, {
        to = {},
        from = {},
        ...params
    } = {}) { // eslint-disable-line complexity
        elements = getElementsAsArray(elements)

        const compRect = engine.getBoundingRect(elements[0])
        const contentRect = engine.getBoundingContentRect(elements[0])
        const initialRect = getClipRect(compRect, contentRect)

        if (!to.clip) {
            to.clip = initialRect
        }
        if (!from.clip) {
            from.clip = initialRect
        }

        return engine.tween(elements, {
            duration,
            delay,
            from,
            to,
            ...params
        }, ['clip'])
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}