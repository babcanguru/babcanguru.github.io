'use strict'
const {
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const balataConsts = require('./balataConsts')

const name = 'BackgroundParallax'
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
        speedFactor: {
            type: 'number',
            min: 0,
            default: 0.2
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
     * Move balata media elements vertically (from y:0)
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Number} [speedFactor] the speed of the animation relative to the scroll
     * @param {object} [browserFlags]
     * @param {boolean} [browserFlags.preserve3DParallaxScrubAction]
     * @param {boolean} [browserFlags.animateParallaxScrubAction]
     * @param {Number} [viewPortHeight]
     * @param {Number} [componentHeight]
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        speedFactor = 0.2,
        viewPortHeight = 1,
        browserFlags = {},
        componentHeight = 1,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        let childrenToAnimate

        if (browserFlags.animateParallaxScrubAction) {
            //fixed layers on Edge Browser, jitter while scrolling , we're animating the layers for steady reveal.
            elements.forEach(element => {
                childrenToAnimate = balataConsts.PARALLAX_SELECTORS.map(selector => element.querySelector(selector))
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
                            y: viewPortHeight * (speedFactor - 1)
                        },
                        to: {
                            y: componentHeight * (1 - speedFactor)
                        },
                        force3D: true,
                        immediateRender: true
                    })
                ])
            })
        } else {
            // animate single layer
            let cssParams = {}
            if (browserFlags.preserve3DParallaxScrubAction) {
                cssParams = {
                    transformStyle: 'preserve-3d'
                }
            }
            sequence.add(factory.animate('BaseNone', elements, 0, 0, cssParams))
            elements.forEach(element => {
                childrenToAnimate = balataConsts.PARALLAX_SELECTORS.map(selector => element.querySelector(selector))
                sequence.add(factory.animate('BasePosition', childrenToAnimate, duration, delay, {
                    from: {
                        y: viewPortHeight * speedFactor
                    },
                    to: {
                        y: 0 - componentHeight * speedFactor
                    }, // eslint-disable-line no-mixed-operators
                    ease: 'Linear.easeNone',
                    force3D: true,
                    immediateRender: true
                }))
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