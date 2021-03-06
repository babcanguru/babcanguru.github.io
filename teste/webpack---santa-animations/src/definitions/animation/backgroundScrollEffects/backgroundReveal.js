'use strict'
const {
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const balataConsts = require('./balataConsts')

const name = 'BackgroundReveal'
const properties = {
    hideOnStart: false,
    shouldDisableSmoothScrolling: true,
    getMaxTravel(elementMeasure, viewportHeight) {
        return viewportHeight + elementMeasure.height
    },
    groups: ['animation', 'background'],
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
        viewPortHeight: {
            type: 'number',
            min: 0,
            default: 1
        },
        browserFlags: {
            type: 'object'
        },
        componentHeight: {
            type: 'number',
            min: 0,
            default: 1
        }
    }
}

function register({
    factory
}) {
    /**
     * BackgroundReveal animation.
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Object} [browserFlags]
     * @param {boolean} [browserFlags.animateRevealScrubAction]
     * @param {number} [viewPortHeight]
     * @param {number} [componentHeight]
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        viewPortHeight = 1,
        browserFlags = {},
        componentHeight = 1,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        let childrenToAnimate

        if (browserFlags.animateRevealScrubAction) {
            //fixed layers on IE and Edge jitter while scrolling , we're animating the layers for steady reveal.
            elements.forEach(element => {
                childrenToAnimate = balataConsts.REVEAL_SELECTORS.map(selector => element.querySelector(selector))
                sequence.add([
                    factory.animate('BasePosition', element, duration, delay, {
                        from: {
                            y: viewPortHeight
                        },
                        to: {
                            y: -componentHeight
                        },
                        force3D: true,
                        immediateRender: true
                    }),
                    factory.animate('BasePosition', childrenToAnimate, duration, delay, {
                        from: {
                            y: -viewPortHeight
                        },
                        to: {
                            y: componentHeight
                        },
                        force3D: true,
                        immediateRender: true
                    })
                ])
            })
        } else {
            // no animation , just force 3d layering
            elements.forEach(element => {
                childrenToAnimate = balataConsts.REVEAL_SELECTORS.map(selector => element.querySelector(selector))
                sequence.add(
                    factory.animate('BaseNone', elements, 0, 0, {
                        transformStyle: 'preserve-3d',
                        force3D: true
                    }),
                    factory.animate('BaseNone', childrenToAnimate, 0, 0, {
                        transformStyle: 'preserve-3d',
                        force3D: true
                    })
                )
            })
        }

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}