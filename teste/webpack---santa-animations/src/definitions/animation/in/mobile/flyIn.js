'use strict'
const {
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'FlyIn'
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
            enum: ['top', 'top left', 'top right', 'left', 'bottom', 'bottom left', 'bottom right', 'right'],
            default: 'right'
        }
    }
}

const paramsMap = {
    top: {
        dy: '-1'
    },
    right: {
        dx: '1'
    },
    bottom: {
        dy: '1'
    },
    left: {
        dx: '-1'
    }
}

function parseParams(direction) {
    const fromParams = {
        dx: 0,
        dy: 0
    }
    direction.forEach(value => {
        if (paramsMap[value]) {
            Object.assign(fromParams, paramsMap[value])
        }
    })

    return fromParams
}

function register({
    engine,
    factory
}, frame) {
    /**
     * FlyIn animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top'|'right'|'bottom'|'left'|'top left'|'top right'|'bottom left'|'bottom right'} [direction=right] 'top' or 'bottom' and/or 'left' or 'right'
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const fromParams = parseParams(direction.split(' '))
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
            const transformX = fromParams.dx > 0 ? browserRect.width - compRect.left : fromParams.dx * compRect.right
            const transformY = fromParams.dy > 0 ? browserRect.height - compRect.top : fromParams.dy * compRect.bottom

            sequence.add(factory.animate('BasePosition', element, duration, delay, {
                from: {
                    x: transformX,
                    y: transformY
                },
                ease: 'Sine.easeOut'
            }), 0)
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