'use strict'
const {
    getPositionParams,
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const name = 'ModesMotionNoScale'
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
        }
    }
}

function register({
    engine,
    factory
}) {
    /**
     * Shift animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} duration
     * @param {Number} delay
     * @param {Object} params
     * @param {object} from
     * @param {number} from.left
     * @param {number} from.right
     * @param {number} from.width
     * @param {number} from.height
     * @param {number} from.rotation
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        from,
        ...params
    }) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        const {
            width,
            height,
            rotation
        } = from

        elements.forEach(element => {
            const elementViewPortDim = engine.getBoundingRect(element)
            const positionParams = getPositionParams(elementViewPortDim, from)

            sequence.add(factory.animate('BasePosition', element, duration, delay, {
                from: positionParams,
                ease: 'Cubic.easeInOut'
            }), 0)
            sequence.add(factory.animate('BaseDimensions', element, duration, delay, {
                from: {
                    width,
                    height
                },
                ease: 'Cubic.easeInOut'
            }), 0)
            sequence.add(factory.animate('BaseRotate', element, duration, delay, {
                from: {
                    rotation
                },
                ease: 'Cubic.easeInOut'
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