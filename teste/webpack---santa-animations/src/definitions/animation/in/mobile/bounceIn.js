'use strict'
const {
    translatePoint,
    getAdjustedDirection,
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'BounceIn'
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
        bounce: {
            type: 'string',
            enum: ['soft', 'medium', 'hard'],
            default: 'medium'
        },
        direction: {
            type: 'string',
            enum: ['top left', 'top right', 'center', 'bottom right', 'bottom left'],
            default: 'top left'
        }
    }
}

const paramsMap = {
    'top left': {
        y: -1.1,
        x: -1.1,
        idx: 0
    },
    'top right': {
        y: -1.1,
        x: 1.1,
        idx: 1
    },
    'bottom right': {
        y: 1.1,
        x: 1.1,
        idx: 2
    },
    'bottom left': {
        y: 1.1,
        x: -1.1,
        idx: 3
    }
}
const center = {
    y: 0,
    x: 0
}

const easeParams = {
    // [Amplitude, Frequency]
    soft: [0.6, 0.25],
    medium: [0.9, 0.22],
    hard: [1.3, 0.2]
}

function register({
    engine,
    factory
}) {
    /**
     * BounceIn animation object (Mobile)
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top left'|'top right'|'bottom left'|'bottom right'|'center'} [direction='top left'] 'top left', 'top right', 'bottom left', 'bottom right' or 'center'
     * @param {'soft'|'medium'|'hard'} [bounce='medium'] 'soft', 'medium', 'hard'
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        bounce = properties.schema.bounce.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const partOneDuration = duration * 0.3
        const partTwoDuration = duration - partOneDuration

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, 0, 0, {
            to: {
                opacity: 0.01
            }
        }))
        sequence.add(factory.animate('BaseFade', elements, partOneDuration, delay, {
            to: {
                opacity: 1
            },
            ease: 'Cubic.easeIn'
        }), 'animation-start')
        elements.forEach(element => {
            const bounds = engine.getElementRect(element)
            const angleInDeg = element.getAttribute('data-angle') || 0

            const adjDirection = direction !== 'center' ? getAdjustedDirection(paramsMap, direction, angleInDeg) : direction

            const normalizedDirection = paramsMap[adjDirection] || center

            const sourcePoint = translatePoint(bounds.width / 2 * normalizedDirection.x, bounds.height / 2 * normalizedDirection.y, angleInDeg)
            const midPoint = translatePoint(bounds.width / 3 * normalizedDirection.x, bounds.height / 3 * normalizedDirection.y, angleInDeg)

            sequence.add([
                factory.animate('BasePosition', element, partOneDuration, delay, {
                    from: {
                        x: sourcePoint.x,
                        y: sourcePoint.y
                    },
                    to: {
                        x: midPoint.x,
                        y: midPoint.y
                    },
                    ease: 'Expo.easeIn'
                }),

                factory.animate('BaseScale', element, partOneDuration, delay, {
                    from: {
                        scale: 0
                    },
                    to: {
                        scale: 0.3
                    },
                    ease: 'Expo.easeIn'
                })
            ], 'animation-start')
            sequence.add([
                factory.animate('BasePosition', element, partTwoDuration, 0, {
                    to: {
                        x: 0,
                        y: 0
                    },
                    ease: 'Elastic.easeOut',
                    easeParams: easeParams[bounce]
                }),
                factory.animate('BaseScale', element, partTwoDuration, 0, {
                    to: {
                        scale: 1
                    },
                    ease: 'Elastic.easeOut',
                    easeParams: easeParams[bounce]
                })
            ])
        })

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}