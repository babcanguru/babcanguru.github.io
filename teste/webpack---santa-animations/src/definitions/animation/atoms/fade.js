'use strict'
const name = 'Fade'
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
                opacity: {
                    type: 'number',
                    min: 0,
                    max: 1
                },
                autoAlpha: {
                    type: 'number',
                    min: 0,
                    max: 1
                }
            }
        },
        to: {
            type: 'object',
            properties: {
                opacity: {
                    type: 'number',
                    min: 0,
                    max: 1
                },
                autoAlpha: {
                    type: 'number',
                    min: 0,
                    max: 1,
                    default: 1
                }
            }
        }
    }
}

function register({
    factory
}) {
    /**
     * Fade animation object
     * Defaults to fade in to opacity 1 with Sine.easeIn
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters.
     * @param {Object} [to] Timeline optional parameters.
     * @param {Object} [from] Timeline optional parameters.
     * @param {Object} [ease] Timeline optional parameters.
     * @param {Object} [to.opacity] Timeline optional parameters.
     * @param {Object} [to.autoAlpha] Timeline optional parameters.
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        from = {},
        to = {},
        ease = 'Sine.easeIn',
        ...params
    } = {}) {
        const sequence = factory.sequence(params)

        if (typeof to.opacity === 'undefined' && typeof to.autoAlpha === 'undefined') {
            to.autoAlpha = properties.schema.to.properties.autoAlpha.default
        }

        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
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