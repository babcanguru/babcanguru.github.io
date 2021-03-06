'use strict'
const {
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'TurnIn'
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
        const browserRect = {
            width: frame.innerWidth,
            height: frame.innerHeight
        }

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Linear.easeIn'
        }))

        elements.forEach(element => {
            const compRect = engine.getBoundingRect(element)
            const transformX = origin.dx > 0 ? browserRect.width - compRect.left : -compRect.right
            const transformY = Math.min(-1.5 * compRect.height, Math.max(-300, -5.5 * compRect.height))
            const transformRotate = (origin.dx > 0 ? '+=' : '-=') + origin.angle
            const bezierPath = [{
                    x: origin.dx * compRect.width,
                    y: transformY
                },
                {
                    x: transformX,
                    y: transformY
                }
            ]

            sequence.add([
                factory.animate('BasePosition', element, duration, delay, {
                    from: {
                        bezier: {
                            values: bezierPath,
                            type: 'soft'
                        }
                    },
                    ease: 'Sine.easeOut',
                    immediateRender: false
                }),
                factory.animate('BaseRotate', element, duration, delay, {
                    from: {
                        rotation: transformRotate
                    },
                    ease: 'Sine.easeOut',
                    immediateRender: false
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