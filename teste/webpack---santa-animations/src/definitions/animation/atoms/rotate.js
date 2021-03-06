'use strict'
const name = 'Rotate'
const properties = {
    groups: ['animation'],
    schema: {
        duration: {
            type: 'integer',
            min: 0,
            default: 0
        },
        delay: {
            type: 'integer',
            min: 0,
            default: 0
        },
        from: {
            type: 'object',
            properties: {
                rotation: {
                    type: 'number'
                }
            }
        },
        to: {
            type: 'object',
            properties: {
                rotation: {
                    type: 'numberLike',
                    default: 360
                }
            }
        }
    }
}

const supportedDirections = {
    cw: true,
    ccw: true,
    short: true
}

function register({
    factory
}) {
    /**
     * Rotate animation object
     * Defaults to rotate 360 deg with Cubic.easeIn
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Object} [to] Timeline optional parameters.
     * @param {Object} [to.rotation] Timeline optional parameters.
     * @param {Object} [direction] Timeline optional parameters.
     * @param {Object} [from] Timeline optional parameters.
     * @param {Object} [ease] Timeline optional parameters.
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        from = {},
        to: {
            direction,
            ...to
        } = {},
        ease = 'Sine.easeIn',
        ...params
    } = {}) {
        const sequence = factory.sequence(params)
        to.rotation = to.rotation || properties.schema.to.properties.rotation.default

        if (supportedDirections[direction]) {
            to.rotation = `${to.rotation}_${direction}`
        }

        sequence.add(factory.animate('BaseRotate', elements, duration, delay, {
            from,
            to,
            ease
        }))
        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}