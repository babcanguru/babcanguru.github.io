'use strict'
const name = 'Position'
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
                left: {
                    type: 'numberLike'
                },
                top: {
                    type: 'numberLike'
                },
                x: {
                    type: 'numberLike'
                },
                y: {
                    type: 'numberLike'
                },
                z: {
                    type: 'numberLike'
                },
                bezier: {
                    type: 'numberLike'
                }
            }
        },
        to: {
            type: 'object',
            properties: {
                left: {
                    type: 'numberLike'
                },
                top: {
                    type: 'numberLike'
                },
                x: {
                    type: 'numberLike'
                },
                y: {
                    type: 'numberLike'
                },
                z: {
                    type: 'numberLike'
                },
                bezier: {
                    type: 'string'
                }
            }
        }
    }
}

function register({
    factory
}) {
    /**
     * Position animation object
     * Defaults to Sine.easeIn
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [to] Timeline optional parameters.
     * @param {Object} [from] Timeline optional parameters.
     * @param {Object} [ease] Timeline optional parameters.
     * @param {Object} [params] Timeline optional parameters.
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        from = {},
        to = {},
        ease = 'Sine.easeIn',
        ...params
    } = {}) {
        const sequence = factory.sequence(params)

        sequence.add(factory.animate('BasePosition', elements, duration, delay, {
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