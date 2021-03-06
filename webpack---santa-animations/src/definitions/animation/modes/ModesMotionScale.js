'use strict'
const {
    getPositionParams,
    getScaleParams,
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const name = 'ModesMotionScale'
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
     * animation object
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

        elements.forEach(element => {
            const elementViewPortDim = engine.getBoundingRect(element)
            const positionParams = getPositionParams(elementViewPortDim, from, true)
            const scaleParams = getScaleParams(elementViewPortDim, from)

            sequence.add(factory.animate('BasePosition', element, duration, delay, {
                from: positionParams,
                ease: 'Cubic.easeInOut'
            }), 0)
            sequence.add(factory.animate('BaseScale', element, duration, delay, {
                from: scaleParams,
                ease: 'Cubic.easeInOut'
            }), 0)
            sequence.add(factory.animate('BaseRotate', element, duration, delay, {
                from: {
                    rotation: from.rotation
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