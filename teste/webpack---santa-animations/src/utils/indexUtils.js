'use strict'

/**
 * Animation properties, (like threshold, hideOnStart etc.)
 * Properties are by animation name, so we assume the properties on the default animation are correct
 * and collect from other view modes only those who doesn't have defaults
 * @param {array} defaults
 * @param {object<array>} viewModes
 * @returns {object<object>} animationName: properties
 */
function getAllAnimationProperties({
    defaults,
    ...viewModes
}) {
    const defaultProperties = defaults.reduce((acc, animationDef) => {
        acc[animationDef.name] = animationDef.properties
        return acc
    }, {})

    const viewModesProperties = Object
        .keys(viewModes)
        .map(key =>
            viewModes[key].reduce((acc, animationDef) => {
                if (!defaultProperties[animationDef.name]) {
                    acc[animationDef.name] = animationDef.properties
                }
                return acc
            }, {})
        )

    return Object.assign({}, defaultProperties, ...viewModesProperties)
}

/**
 * Return a combination of animations defs fom defaults + passed viewMode
 * @param {array<object>} defaultDefs
 * @param {array<object>} viewModeDefs
 * @returns {array<object>}
 */
function getAnimationDefsByViewMode(defaultDefs, viewModeDefs = []) {
    const viewModeNames = viewModeDefs.map(def => def.name)
    return defaultDefs
        .filter(def => !viewModeNames.includes(def.name))
        .concat(viewModeDefs)
}

/**
 * Normalize view mode to lower case, and default to internal 'defaults' for 'desktop' viewMode
 * We need this to deal with Santa getViewMode()
 * @param {string} viewMode
 * @returns {string}
 */
function getAnimationMode(viewMode = '') {
    const normalizedViewMode = viewMode.toLowerCase()
    return normalizedViewMode !== 'desktop' ? normalizedViewMode : 'defaults'
}

module.exports = {
    getAllAnimationProperties,
    getAnimationDefsByViewMode,
    getAnimationMode
}