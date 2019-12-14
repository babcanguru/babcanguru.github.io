! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["wix-dom-sanitizer"] = t() : e["wix-dom-sanitizer"] = t()
}(this, (function() {
    return function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var o in e) n.d(r, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return r
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        var r = n(1);
        e.exports = r
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            o = /<svg ([^>]+)>/,
            i = ["animateColor", "animateTransform", "animateMotion", "linearGradient", "radialGradient", "clipPath", "altGlyph", "altGlyphItem", "glyphRef", "textPath", "altGlyphDef", "feDistantLight", "fePointLight", "feSpotLight", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "feFuncA", "feFuncR", "feFuncG", "feFuncB"];

        function a(e, t) {
            var n = new RegExp(t + "=(\"|')?([-\\w\\s,]+)\\1");
            return e.match(n)
        }

        function l(e, t) {
            var n = a(e, t);
            return n ? n[2] : null
        }
        var s = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.hasRealDOM = "undefined" != typeof window, this.purifier = r
            }
            return e.prototype.sanitizeSVG = function(e) {
                this.purifier.addHook("afterSanitizeAttributes", (function(e) {
                    e.hasAttribute("xlink:href") && !e.getAttribute("xlink:href").match(/^#/) && e.removeAttribute("xlink:href")
                }));
                var t = this.purifier.sanitize(e, {
                    RETURN_DOM_FRAGMENT: this.hasRealDOM,
                    KEEP_CONTENT: !1,
                    USE_PROFILES: {
                        svg: !0,
                        svgFilters: !0
                    },
                    ADD_TAGS: ["use"],
                    ADD_ATTR: ["filterUnits"]
                });
                this.purifier.removeHook("afterSanitizeAttributes");
                var n, r, l, s, c, u = this.hasRealDOM ? t.querySelector("svg") : t.match(o);
                if (!u) return {
                    error: ""
                };
                this.hasRealDOM ? (u.setAttribute("data-type", "ugc"), t = u.outerHTML) : (u = u[0], n = t.replace(u, (s = "ugc", (c = a(r = u, l = "data-type")) ? r.replace(c[2], s) : r.replace("<svg ", "<svg " + l + '="' + s + '" '))), t = i.reduce((function(e, t) {
                    var n = new RegExp(t, "ig");
                    return e.replace(n, t)
                }), n));
                var f = this.validateSVG(u);
                return f ? {
                    error: f
                } : {
                    svg: t
                }
            }, e.prototype.validateSVG = function(e) {
                var t = "string" == typeof e,
                    n = t ? l(e, "width") : e.getAttribute("width"),
                    r = t ? l(e, "height") : e.getAttribute("height");
                return (t ? l(e, "viewBox") : e.getAttribute("viewBox")) || n && r ? null : "SVG does not have viewBox nor width and height"
            }, e
        }();
        e.exports = new s
    }, function(e, t, n) {
        e.exports = function() {
            "use strict";
            var e = ["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"],
                t = ["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern"],
                n = ["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence"],
                r = ["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmuliscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mpspace", "msqrt", "mystyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"],
                o = ["#text"],
                i = ["accept", "action", "align", "alt", "autocomplete", "background", "bgcolor", "border", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "coords", "crossorigin", "datetime", "default", "dir", "disabled", "download", "enctype", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "integrity", "ismap", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "name", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "type", "usemap", "valign", "value", "width", "xmlns"],
                a = ["accent-height", "accumulate", "additivive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "tabindex", "targetx", "targety", "transform", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"],
                l = ["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"],
                s = ["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"];

            function c(e, t) {
                for (var n = t.length; n--;) "string" == typeof t[n] && (t[n] = t[n].toLowerCase()), e[t[n]] = !0;
                return e
            }

            function u(e) {
                var t = {},
                    n = void 0;
                for (n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }
            var f = /\{\{[\s\S]*|[\s\S]*\}\}/gm,
                d = /<%[\s\S]*|[\s\S]*%>/gm,
                p = /^data-[\-\w.\u00B7-\uFFFF]/,
                m = /^aria-[\-\w]+$/,
                h = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
                g = /^(?:\w+script|data):/i,
                y = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,
                v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                };

            function b(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            var T = function() {
                return "undefined" == typeof window ? null : window
            };
            return function x() {
                var A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T(),
                    S = function(e) {
                        return x(e)
                    };
                if (S.version = "1.0.3", S.removed = [], !A || !A.document || 9 !== A.document.nodeType) return S.isSupported = !1, S;
                var w = A.document,
                    E = !1,
                    M = !1,
                    O = A.document,
                    k = A.DocumentFragment,
                    _ = A.HTMLTemplateElement,
                    D = A.Node,
                    L = A.NodeFilter,
                    R = A.NamedNodeMap,
                    N = void 0 === R ? A.NamedNodeMap || A.MozNamedAttrMap : R,
                    C = A.Text,
                    F = A.Comment,
                    z = A.DOMParser,
                    H = A.XMLHttpRequest,
                    G = void 0 === H ? A.XMLHttpRequest : H,
                    j = A.encodeURI,
                    I = void 0 === j ? A.encodeURI : j;
                if ("function" == typeof _) {
                    var P = O.createElement("template");
                    P.content && P.content.ownerDocument && (O = P.content.ownerDocument)
                }
                var B = O,
                    U = B.implementation,
                    q = B.createNodeIterator,
                    W = B.getElementsByTagName,
                    V = B.createDocumentFragment,
                    X = w.importNode,
                    K = {};
                S.isSupported = U && void 0 !== U.createHTMLDocument && 9 !== O.documentMode;
                var Y = f,
                    $ = d,
                    J = p,
                    Q = m,
                    Z = g,
                    ee = y,
                    te = h,
                    ne = null,
                    re = c({}, [].concat(b(e), b(t), b(n), b(r), b(o))),
                    oe = null,
                    ie = c({}, [].concat(b(i), b(a), b(l), b(s))),
                    ae = null,
                    le = null,
                    se = !0,
                    ce = !0,
                    ue = !1,
                    fe = !1,
                    de = !1,
                    pe = !1,
                    me = !1,
                    he = !1,
                    ge = !1,
                    ye = !1,
                    ve = !1,
                    be = !0,
                    Te = !0,
                    xe = {},
                    Ae = c({}, ["audio", "head", "math", "script", "style", "template", "svg", "video"]),
                    Se = c({}, ["audio", "video", "img", "source", "image"]),
                    we = c({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "summary", "title", "value", "style", "xmlns"]),
                    Ee = null,
                    Me = O.createElement("form"),
                    Oe = function(f) {
                        "object" !== (void 0 === f ? "undefined" : v(f)) && (f = {}), ne = "ALLOWED_TAGS" in f ? c({}, f.ALLOWED_TAGS) : re, oe = "ALLOWED_ATTR" in f ? c({}, f.ALLOWED_ATTR) : ie, ae = "FORBID_TAGS" in f ? c({}, f.FORBID_TAGS) : {}, le = "FORBID_ATTR" in f ? c({}, f.FORBID_ATTR) : {}, xe = "USE_PROFILES" in f && f.USE_PROFILES, se = !1 !== f.ALLOW_ARIA_ATTR, ce = !1 !== f.ALLOW_DATA_ATTR, ue = f.ALLOW_UNKNOWN_PROTOCOLS || !1, fe = f.SAFE_FOR_JQUERY || !1, de = f.SAFE_FOR_TEMPLATES || !1, pe = f.WHOLE_DOCUMENT || !1, ge = f.RETURN_DOM || !1, ye = f.RETURN_DOM_FRAGMENT || !1, ve = f.RETURN_DOM_IMPORT || !1, he = f.FORCE_BODY || !1, be = !1 !== f.SANITIZE_DOM, Te = !1 !== f.KEEP_CONTENT, te = f.ALLOWED_URI_REGEXP || te, de && (ce = !1), ye && (ge = !0), xe && (ne = c({}, [].concat(b(o))), oe = [], !0 === xe.html && (c(ne, e), c(oe, i)), !0 === xe.svg && (c(ne, t), c(oe, a), c(oe, s)), !0 === xe.svgFilters && (c(ne, n), c(oe, a), c(oe, s)), !0 === xe.mathMl && (c(ne, r), c(oe, l), c(oe, s))), f.ADD_TAGS && (ne === re && (ne = u(ne)), c(ne, f.ADD_TAGS)), f.ADD_ATTR && (oe === ie && (oe = u(oe)), c(oe, f.ADD_ATTR)), f.ADD_URI_SAFE_ATTR && c(we, f.ADD_URI_SAFE_ATTR), Te && (ne["#text"] = !0), Object && "freeze" in Object && Object.freeze(f), Ee = f
                    },
                    ke = function(e) {
                        S.removed.push({
                            element: e
                        });
                        try {
                            e.parentNode.removeChild(e)
                        } catch (t) {
                            e.outerHTML = ""
                        }
                    },
                    _e = function(e, t) {
                        S.removed.push({
                            attribute: t.getAttributeNode(e),
                            from: t
                        }), t.removeAttribute(e)
                    },
                    De = function(e) {
                        var t = void 0,
                            n = void 0;
                        if (he && (e = "<remove></remove>" + e), M) {
                            try {
                                e = I(e)
                            } catch (e) {}
                            var r = new G;
                            r.responseType = "document", r.open("GET", "data:text/html;charset=utf-8," + e, !1), r.send(null), t = r.response
                        }
                        if (E) try {
                            t = (new z).parseFromString(e, "text/html")
                        } catch (e) {}
                        return t && t.documentElement || ((n = (t = U.createHTMLDocument("")).body).parentNode.removeChild(n.parentNode.firstElementChild), n.outerHTML = e), W.call(t, pe ? "html" : "body")[0]
                    };
                S.isSupported && function() {
                    var e = De('<svg><g onload="this.parentNode.remove()"></g></svg>');
                    e.querySelector("svg") || (M = !0);
                    try {
                        (e = De('<svg><p><style><img src="</style><img src=x onerror=alert(1)//">')).querySelector("svg img") && (E = !0)
                    } catch (e) {}
                }();
                var Le = function(e) {
                        return q.call(e.ownerDocument || e, e, L.SHOW_ELEMENT | L.SHOW_COMMENT | L.SHOW_TEXT, (function() {
                            return L.FILTER_ACCEPT
                        }), !1)
                    },
                    Re = function(e) {
                        return "object" === (void 0 === D ? "undefined" : v(D)) ? e instanceof D : e && "object" === (void 0 === e ? "undefined" : v(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName
                    },
                    Ne = function(e, t, n) {
                        K[e] && K[e].forEach((function(e) {
                            e.call(S, t, n, Ee)
                        }))
                    },
                    Ce = function(e) {
                        var t, n = void 0;
                        if (Ne("beforeSanitizeElements", e, null), !((t = e) instanceof C || t instanceof F || "string" == typeof t.nodeName && "string" == typeof t.textContent && "function" == typeof t.removeChild && t.attributes instanceof N && "function" == typeof t.removeAttribute && "function" == typeof t.setAttribute)) return ke(e), !0;
                        var r = e.nodeName.toLowerCase();
                        if (Ne("uponSanitizeElement", e, {
                                tagName: r,
                                allowedTags: ne
                            }), !ne[r] || ae[r]) {
                            if (Te && !Ae[r] && "function" == typeof e.insertAdjacentHTML) try {
                                e.insertAdjacentHTML("AfterEnd", e.innerHTML)
                            } catch (e) {}
                            return ke(e), !0
                        }
                        return !fe || e.firstElementChild || e.content && e.content.firstElementChild || !/</g.test(e.textContent) || (S.removed.push({
                            element: e.cloneNode()
                        }), e.innerHTML = e.textContent.replace(/</g, "&lt;")), de && 3 === e.nodeType && (n = (n = (n = e.textContent).replace(Y, " ")).replace($, " "), e.textContent !== n && (S.removed.push({
                            element: e.cloneNode()
                        }), e.textContent = n)), Ne("afterSanitizeElements", e, null), !1
                    },
                    Fe = function(e) {
                        var t = void 0,
                            n = void 0,
                            r = void 0,
                            o = void 0,
                            i = void 0,
                            a = void 0,
                            l = void 0;
                        if (Ne("beforeSanitizeAttributes", e, null), a = e.attributes) {
                            var s = {
                                attrName: "",
                                attrValue: "",
                                keepAttr: !0,
                                allowedAttributes: oe
                            };
                            for (l = a.length; l--;) {
                                if (n = (t = a[l]).name, r = t.value.trim(), o = n.toLowerCase(), s.attrName = o, s.attrValue = r, s.keepAttr = !0, Ne("uponSanitizeAttribute", e, s), r = s.attrValue, "name" === o && "IMG" === e.nodeName && a.id) i = a.id, a = Array.prototype.slice.apply(a), _e("id", e), _e(n, e), a.indexOf(i) > l && e.setAttribute("id", i.value);
                                else {
                                    if ("INPUT" === e.nodeName && "type" === o && "file" === r && (oe[o] || !le[o])) continue;
                                    "id" === n && e.setAttribute(n, ""), _e(n, e)
                                }
                                if (s.keepAttr && (!be || "id" !== o && "name" !== o || !(r in O || r in Me))) {
                                    if (de && (r = (r = r.replace(Y, " ")).replace($, " ")), ce && J.test(o));
                                    else if (se && Q.test(o));
                                    else {
                                        if (!oe[o] || le[o]) continue;
                                        if (we[o]);
                                        else if (te.test(r.replace(ee, "")));
                                        else if ("src" !== o && "xlink:href" !== o || 0 !== r.indexOf("data:") || !Se[e.nodeName.toLowerCase()])
                                            if (ue && !Z.test(r.replace(ee, "")));
                                            else if (r) continue
                                    }
                                    try {
                                        e.setAttribute(n, r), S.removed.pop()
                                    } catch (e) {}
                                }
                            }
                            Ne("afterSanitizeAttributes", e, null)
                        }
                    },
                    ze = function e(t) {
                        var n = void 0,
                            r = Le(t);
                        for (Ne("beforeSanitizeShadowDOM", t, null); n = r.nextNode();) Ne("uponSanitizeShadowNode", n, null), Ce(n) || (n.content instanceof k && e(n.content), Fe(n));
                        Ne("afterSanitizeShadowDOM", t, null)
                    };
                return S.sanitize = function(e, t) {
                    var n = void 0,
                        r = void 0,
                        o = void 0,
                        i = void 0,
                        a = void 0;
                    if (e || (e = "\x3c!--\x3e"), "string" != typeof e && !Re(e)) {
                        if ("function" != typeof e.toString) throw new TypeError("toString is not a function");
                        if ("string" != typeof(e = e.toString())) throw new TypeError("dirty is not a string, aborting")
                    }
                    if (!S.isSupported) {
                        if ("object" === v(A.toStaticHTML) || "function" == typeof A.toStaticHTML) {
                            if ("string" == typeof e) return A.toStaticHTML(e);
                            if (Re(e)) return A.toStaticHTML(e.outerHTML)
                        }
                        return e
                    }
                    if (me || Oe(t), S.removed = [], e instanceof D) 1 === (r = (n = De("\x3c!--\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === r.nodeName ? n = r : n.appendChild(r);
                    else {
                        if (!ge && !pe && -1 === e.indexOf("<")) return e;
                        if (!(n = De(e))) return ge ? null : ""
                    }
                    he && ke(n.firstChild);
                    for (var l = Le(n); o = l.nextNode();) 3 === o.nodeType && o === i || Ce(o) || (o.content instanceof k && ze(o.content), Fe(o), i = o);
                    if (ge) {
                        if (ye)
                            for (a = V.call(n.ownerDocument); n.firstChild;) a.appendChild(n.firstChild);
                        else a = n;
                        return ve && (a = X.call(w, a, !0)), a
                    }
                    return pe ? n.outerHTML : n.innerHTML
                }, S.setConfig = function(e) {
                    Oe(e), me = !0
                }, S.clearConfig = function() {
                    Ee = null, me = !1
                }, S.addHook = function(e, t) {
                    "function" == typeof t && (K[e] = K[e] || [], K[e].push(t))
                }, S.removeHook = function(e) {
                    K[e] && K[e].pop()
                }, S.removeHooks = function(e) {
                    K[e] && (K[e] = [])
                }, S.removeAllHooks = function() {
                    K = {}
                }, S
            }()
        }()
    }])
}));
//# sourceMappingURL=wix-dom-sanitizer.js.map