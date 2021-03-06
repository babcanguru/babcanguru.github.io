'use strict'
const {
    getElementsAsArray
} = require('../../utils/definitionsUtils')

const name = 'BaseClear'
const properties = {}

const cssToRestore = [{
        domAttr: 'data-angle',
        gsapAttr: 'rotation'
    },
    {
        domAttr: 'data-scale',
        gsapAttr: 'scale'
    }
]

function restoreCss(elements, sequence, engine) {
    elements.forEach(element => {
        const restoreParams = {}
        const defaultParams = {
            duration: 0,
            delay: 0,
            immediateRender: false
        }
        cssToRestore.forEach(item => {
            const value = element.getAttribute(item.domAttr)
            if (value) {
                restoreParams[item.gsapAttr] = value
            }
        })
        if (Object.keys(restoreParams).length) {
            sequence.add(engine.tween(element, { ...restoreParams,
                ...defaultParams
            }, Object.keys(restoreParams)))
        }
    })
}

function clearGsTranforms(elements) {
    elements.forEach(element => delete element._gsTransform)
}

function register({
    engine,
    factory
}) {
    /**
     * Clearing animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=0] Duration has no meaning here, remains for API compliance
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Object} to
     * @param {String} props coma separated props to clear on elements
     * @param {String} [parentProps] coma separated props to clear on elements parents
     * @returns {TimelineMax}
     */
    function animation(elements, duration = 0, delay = 0, {
        props = '',
        parentProps = '',
        to = {},
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const parentsSet = new Set(elements.map(element => element.parentNode))
        const parents = Array.from(parentsSet)

        const elementParams = {
            duration,
            delay,
            to,
            clearProps: props,
            ...params
        }
        const parentParams = parentProps ? { ...elementParams,
            clearProps: parentProps
        } : null

        const sequence = factory.sequence({
            callbacks: {
                onComplete: () => clearGsTranforms(elements)
            }
        })

        sequence.add(engine.tween(elements, elementParams, []))
        if (parentParams) {
            sequence.add(engine.tween(parents, parentParams, []), 0)
        }

        restoreCss(elements, sequence, engine)

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}