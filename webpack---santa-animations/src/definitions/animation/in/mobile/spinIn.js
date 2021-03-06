'use strict'

const name = 'SpinIn'
const properties = {
    hideOnStart: true,
    mobile: true,
    viewportThreshold: 0.15,

    groups: ['entrance', 'animation'],
    schema: {
        duration: {
            type: 'number',
            min: 0,
            default: 0
        },
        delay: {
            type: 'number',
            min: 0,
            default: 0
        },
        cycles: {
            type: 'number',
            min: 0,
            default: 1
        },
        direction: {
            type: 'string',
            enum: ['cw', 'ccw'],
            default: 'cw'
        },
        power: {
            type: 'string',
            enum: ['soft', 'medium', 'hard'],
            default: 'medium'
        }
    }
}
const paramsMap = {
    cw: {
        direction: '-1'
    },
    ccw: {
        direction: '1'
    }
}

const scaleMap = {
    soft: 0.8,
    medium: 0.5,
    hard: 0
}

function register({
    factory
}) {
    /**
     * SpinIn animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'cw'|'ccw'} [direction=cw] 'cw' for clock wise or 'ccw' for counter clock wise
     * @param {Number} [cycles=1]
     * @param {'soft'|'medium'|'hard'} [power='medium']
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        cycles = properties.schema.cycles.default,
        power = properties.schema.power.default,
        ...params
    } = {}) {
        const scale = scaleMap[power]
        const fromParams = paramsMap[direction]
        const transformRotate = (fromParams.direction > 0 ? '+=' : '-=') + 360 * cycles

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, 0, 0, {
            to: {
                opacity: 0.01
            }
        }))
        sequence.add([
            factory.animate('BaseFade', elements, duration, delay, {
                to: {
                    opacity: 1
                },
                ease: 'Quad.easeOut'
            }),
            factory.animate('BaseScale', elements, duration, delay, {
                from: {
                    scale
                },
                ease: 'Quad.easeOut',
                immediateRender: false
            }),
            factory.animate('BaseRotate', elements, duration, delay, {
                from: {
                    rotation: transformRotate
                },
                ease: 'Quad.easeOut'
            })
        ])

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}