'use strict'
const {
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const name = 'TurnOut'
const properties = {
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
        direction: {
            type: 'string',
            enum: ['right', 'left'],
            default: 'right'
        }
    }
}

const paramsMap = {
    left: {
        dx: '-1',
        angle: '90'
    },
    right: {
        dx: '1',
        angle: '90'
    }
}

function register({
    engine,
    factory
}, frame) {
    /**
     * TurnIn animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'left'|'right'} [direction='right'] 'left' or 'right'
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const origin = paramsMap[direction]

        const browserViewPortDim = {
            width: frame.innerWidth,
            height: frame.innerHeight
        }

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 1
            },
            to: {
                autoAlpha: 0
            },
            ease: 'Linear.easeIn'
        }))

        elements.forEach(element => {
            const elementViewPortDim = engine.getBoundingRect(element)
            const transformX = origin.dx > 0 ? browserViewPortDim.width - elementViewPortDim.right : origin.dx * elementViewPortDim.left
            const transformY = Math.min(-1.5 * elementViewPortDim.height, Math.max(-300, -5.5 * elementViewPortDim.height))
            const transformRotate = (origin.dx > 0 ? '+=' : '-=') + origin.angle
            const bezierPath = [{
                    x: transformX,
                    y: transformY
                },
                {
                    x: origin.dx * elementViewPortDim.width,
                    y: transformY
                }
            ]

            sequence.add([
                factory.animate('BasePosition', element, duration, delay, {
                    to: {
                        bezier: {
                            values: bezierPath,
                            type: 'soft'
                        }
                    },
                    ease: 'Sine.easeIn'
                }),
                factory.animate('BaseRotate', element, duration, delay, {
                    to: {
                        rotation: transformRotate
                    },
                    ease: 'Sine.easeIn'
                })
            ], 0)
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