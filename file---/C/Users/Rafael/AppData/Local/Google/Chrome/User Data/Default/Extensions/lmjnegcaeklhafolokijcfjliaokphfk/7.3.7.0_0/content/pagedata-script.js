! function(e) {
    var r = {};

    function t(s) {
        if (r[s]) return r[s].exports;
        var n = r[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }
    t.m = e, t.c = r, t.d = function(e, r, s) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: s
        })
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, t.p = "", t(t.s = 356)
}({
    2: function(e, r, t) {
        "use strict";
        var s;
        r.browser = t(4), s = "undefined" == typeof browser && "undefined" != typeof chrome && chrome.runtime ? /\bOPR\//.test(navigator.userAgent) ? "opera" : "chrome" : /\bEdge\//.test(navigator.userAgent) ? "edge" : "firefox", r.browserType = s, r.isBrowser = function() {
            for (var e = arguments.length, t = Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            for (var n = 0; n < t.length; n++)
                if (t[n] == r.browserType) return !0;
            return !1
        }, r.error = function(e) {
            console.groupCollapsed(e.message), e.stack && console.error(e.stack), console.groupEnd()
        }
    },
    23: function(e, r, t) {
        "use strict";
        var s = t(2),
            n = s.browser;
        s.rpc = t(3);
        var a = n.runtime.connect({
            name: "weh:" + n.runtime.id + ":" + s.uiName
        });
        s.rpc.setPost(a.postMessage.bind(a)), a.onMessage.addListener(function(e) {
            s.rpc.receive(e, a.postMessage.bind(a))
        }), e.exports = s
    },
    3: function(e, r, t) {
        "use strict";
        var s = function() {
            function e(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var s = r[t];
                    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
                }
            }
            return function(r, t, s) {
                return t && e(r.prototype, t), s && e(r, s), r
            }
        }();

        function n(e) {
            if (Array.isArray(e)) {
                for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
                return t
            }
            return Array.from(e)
        }

        function a(e) {
            return Array.isArray(e) ? e : Array.from(e)
        }
        var i = function() {
            function e() {
                ! function(e, r) {
                    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.replyId = 0, this.replies = {}, this.listeners = {}, this.hook = this.nullHook, this.debugLevel = 0, this.useTarget = !1, this.logger = console, this.posts = {}
            }
            return s(e, [{
                key: "setPost",
                value: function(e, r) {
                    "string" == typeof e ? this.posts[e] = r : this.post = e
                }
            }, {
                key: "setUseTarget",
                value: function(e) {
                    this.useTarget = e
                }
            }, {
                key: "setDebugLevel",
                value: function(e) {
                    this.debugLevel = e
                }
            }, {
                key: "setHook",
                value: function(e) {
                    var r = this,
                        t = Date.now();
                    this.hook = e ? function(s) {
                        s.timestamp = "undefined" != typeof window && void 0 !== window.performance ? window.performance.now() : Date.now() - t;
                        try {
                            e(s)
                        } catch (e) {
                            r.logger.warn("Hoor error", e)
                        }
                    } : this.nullHook
                }
            }, {
                key: "nullHook",
                value: function() {}
            }, {
                key: "call",
                value: function() {
                    var e, r, t, s, i = this,
                        g = Array.prototype.slice.call(arguments);
                    if ("function" == typeof g[0] && (e = g.shift()), i.useTarget) {
                        var o = a(g);
                        r = o[0], t = o[1], s = o.slice(2)
                    } else {
                        var m = a(g);
                        t = m[0], s = m.slice(1)
                    }
                    return new Promise(function(a, g) {
                        var o = ++i.replyId;
                        i.debugLevel >= 2 && i.logger.info("rpc #" + o, "call =>", t, s), i.hook({
                            type: "call",
                            callee: r,
                            rid: o,
                            method: t,
                            args: s
                        }), i.replies[o] = {
                            resolve: a,
                            reject: g,
                            peer: r
                        };
                        var m = e || i.useTarget && i.posts[r] || i.post;
                        i.useTarget ? m(r, {
                            type: "weh#rpc",
                            _request: o,
                            _method: t,
                            _args: [].concat(n(s))
                        }) : m({
                            type: "weh#rpc",
                            _request: o,
                            _method: t,
                            _args: [].concat(n(s))
                        })
                    })
                }
            }, {
                key: "receive",
                value: function(e, r, t) {
                    var s = this;
                    if (e._request) Promise.resolve().then(function() {
                        var r = s.listeners[e._method];
                        if ("function" == typeof r) return s.debugLevel >= 2 && s.logger.info("rpc #" + e._request, "serve <= ", e._method, e._args), s.hook({
                            type: "call",
                            caller: t,
                            rid: e._request,
                            method: e._method,
                            args: e._args
                        }), Promise.resolve(r.apply(null, e._args)).then(function(r) {
                            return s.hook({
                                type: "reply",
                                caller: t,
                                rid: e._request,
                                result: r
                            }), r
                        }).catch(function(r) {
                            throw s.hook({
                                type: "reply",
                                caller: t,
                                rid: e._request,
                                error: r.message
                            }), r
                        });
                        throw new Error("Method " + e._method + " is not a function")
                    }).then(function(t) {
                        s.debugLevel >= 2 && s.logger.info("rpc #" + e._request, "serve => ", t), r({
                            type: "weh#rpc",
                            _reply: e._request,
                            _result: t
                        })
                    }).catch(function(t) {
                        s.debugLevel >= 1 && s.logger.info("rpc #" + e._request, "serve => !", t.message), r({
                            type: "weh#rpc",
                            _reply: e._request,
                            _error: t.message
                        })
                    });
                    else if (e._reply) {
                        var n = s.replies[e._reply];
                        delete s.replies[e._reply], n ? e._error ? (s.debugLevel >= 1 && s.logger.info("rpc #" + e._reply, "call <= !", e._error), s.hook({
                            type: "reply",
                            callee: n.peer,
                            rid: e._reply,
                            error: e._error
                        }), n.reject(new Error(e._error))) : (s.debugLevel >= 2 && s.logger.info("rpc #" + e._reply, "call <= ", e._result), s.hook({
                            type: "reply",
                            callee: n.peer,
                            rid: e._reply,
                            result: e._result
                        }), n.resolve(e._result)) : s.logger.error("Missing reply handler")
                    }
                }
            }, {
                key: "listen",
                value: function(e) {
                    Object.assign(this.listeners, e)
                }
            }]), e
        }();
        e.exports = new i
    },
    356: function(e, r, t) {
        e.exports = t(357)
    },
    357: function(e, r, t) {
        "use strict";
        var s = t(37),
            n = t(92).SmartNameEvaluate;
        var a = {
            pageUrl: window.document.URL
        };
        try {
            a.topUrl = window.top.document.URL
        } catch (e) {}
        var i = function() {
            for (var e = {}, r = null, t = null, s = [{
                    sel: "meta[property='og:image:secure_url']",
                    attr: "content"
                }, {
                    sel: "meta[property='og:image']",
                    attr: "content"
                }, {
                    sel: "link[rel='thumbnail']",
                    attr: "href"
                }, {
                    sel: "link[rel='image_src']",
                    attr: "href"
                }, {
                    sel: "meta[property='twitter:image']",
                    attr: "content"
                }], n = 0; n < s.length && !r; n++) {
                var a = s[n],
                    i = document.querySelector(a.sel);
                i && (r = i.getAttribute(a.attr) || null)
            }
            if (r) {
                var g = document.createElement("a");
                g.href = r, r = g.href
            } else {
                var o = /^(https?:\/\/(?:[^\/]*\.)?\x79\x6f\x75\x74\x75\x62\x65(?:\.co)?\.(?:[^\.\/]+))\/.*\bv=([^&]+)/.exec(window.location.href);
                o && (r = "https://i.ytimg.com/vi/" + o[2] + "/default.jpg");
                try {
                    t = document.querySelector("head title").firstChild.nodeValue
                } catch (e) {}
            }
            return r && (e.thumbnailUrl = r), t && (e.title = t), e
        }();
        if (i.thumbnailUrl) a.thumbnailUrl = i.thumbnailUrl;
        else try {
            a.thumbnail = function() {
                var e = window.innerWidth,
                    r = window.innerHeight,
                    t = r / e,
                    s = 48,
                    n = Math.round(48 / t);
                n > 60 && (n = 60, s = Math.round(n * t));
                var a = document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
                a.width = e, a.height = r, a.getContext("2d").drawWindow(window, 0, 0, e, r, "rgb(255,255,255)");
                var i = document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
                return i.width = n, i.height = s, i.getContext("2d").drawImage(a, 0, 0, e, r, 0, 0, n, s), i.toDataURL()
            }()
        } catch (e) {}
        i.title && (a.title = i.title);
        var g = _$vdhHitId,
            o = _$vdhSmartNameSpecs;
        Promise.resolve().then(function() {
            if (o) return new Promise(function(e, r) {
                setTimeout(function() {
                    e(n(o))
                }, o.delay)
            })
        }).then(function(e) {
            e && (a.title = e), s.rpc.call("hitPageData", {
                id: g,
                data: a
            })
        })
    },
    37: function(e, r, t) {
        "use strict";
        e.exports = t(23)
    },
    4: function(e, r, t) {
        var s, n, a, i;
        i = function(e) {
            "use strict";
            if ("undefined" == typeof browser) {
                const r = () => {
                    const e = {
                        alarms: {
                            clear: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            clearAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        bookmarks: {
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            export: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getChildren: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getRecent: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTree: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getSubTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            import: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeTree: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        browserAction: {
                            getBadgeBackgroundColor: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getBadgeText: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        commands: {
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        contextMenus: {
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeAll: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        cookies: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAllCookieStores: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            set: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        downloads: {
                            download: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            cancel: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            erase: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFileIcon: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            open: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            pause: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeFile: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            resume: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            show: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        extension: {
                            isAllowedFileSchemeAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            isAllowedIncognitoAccess: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        history: {
                            addUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getVisits: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            deleteRange: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            deleteUrl: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            search: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        i18n: {
                            detectLanguage: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAcceptLanguages: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        idle: {
                            queryState: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        management: {
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getSelf: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            uninstallSelf: {
                                minArgs: 0,
                                maxArgs: 1
                            }
                        },
                        notifications: {
                            clear: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            create: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPermissionLevel: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        },
                        pageAction: {
                            getPopup: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getTitle: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            hide: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            setIcon: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            show: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        runtime: {
                            getBackgroundPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getBrowserInfo: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getPlatformInfo: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            openOptionsPage: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            requestUpdateCheck: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            sendMessage: {
                                minArgs: 1,
                                maxArgs: 3
                            },
                            sendNativeMessage: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            setUninstallURL: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        storage: {
                            local: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            },
                            managed: {
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                }
                            },
                            sync: {
                                clear: {
                                    minArgs: 0,
                                    maxArgs: 0
                                },
                                get: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                getBytesInUse: {
                                    minArgs: 0,
                                    maxArgs: 1
                                },
                                remove: {
                                    minArgs: 1,
                                    maxArgs: 1
                                },
                                set: {
                                    minArgs: 1,
                                    maxArgs: 1
                                }
                            }
                        },
                        tabs: {
                            create: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            captureVisibleTab: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            detectLanguage: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            duplicate: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            executeScript: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 0
                            },
                            getZoom: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getZoomSettings: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            highlight: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            insertCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            move: {
                                minArgs: 2,
                                maxArgs: 2
                            },
                            reload: {
                                minArgs: 0,
                                maxArgs: 2
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            query: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            removeCSS: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            sendMessage: {
                                minArgs: 2,
                                maxArgs: 3
                            },
                            setZoom: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            setZoomSettings: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            update: {
                                minArgs: 1,
                                maxArgs: 2
                            }
                        },
                        webNavigation: {
                            getAllFrames: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            getFrame: {
                                minArgs: 1,
                                maxArgs: 1
                            }
                        },
                        webRequest: {
                            handlerBehaviorChanged: {
                                minArgs: 0,
                                maxArgs: 0
                            }
                        },
                        windows: {
                            create: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            get: {
                                minArgs: 1,
                                maxArgs: 2
                            },
                            getAll: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getCurrent: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            getLastFocused: {
                                minArgs: 0,
                                maxArgs: 1
                            },
                            remove: {
                                minArgs: 1,
                                maxArgs: 1
                            },
                            update: {
                                minArgs: 2,
                                maxArgs: 2
                            }
                        }
                    };
                    if (0 === Object.keys(e).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                    const r = (e, r) => {
                            const t = e => 1 == e ? "argument" : "arguments";
                            return function(s, ...n) {
                                if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${t(r.minArgs)} for ${e}(), got ${n.length}`);
                                if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${t(r.maxArgs)} for ${e}(), got ${n.length}`);
                                return new Promise((r, t) => {
                                    s[e](...n, (e => (...r) => {
                                        chrome.runtime.lastError ? e.reject(chrome.runtime.lastError) : 1 === r.length ? e.resolve(r[0]) : e.resolve(r)
                                    })({
                                        resolve: r,
                                        reject: t
                                    }))
                                })
                            }
                        },
                        t = (e, r, t) => new Proxy(r, {
                            apply: (r, s, n) => t.call(s, e, ...n)
                        });
                    let s = Function.call.bind(Object.prototype.hasOwnProperty);
                    const n = (e, a = {}, i = {}) => {
                            let g = Object.create(null),
                                o = {
                                    has: (e, r) => r in e || r in g,
                                    get(e, o, m) {
                                        if (o in g) return g[o];
                                        if (!(o in e)) return;
                                        let l = e[o];
                                        if ("function" == typeof l)
                                            if ("function" == typeof a[o]) l = t(e, e[o], a[o]);
                                            else if (s(i, o)) {
                                            let s = r(o, i[o]);
                                            l = t(e, e[o], s)
                                        } else l = l.bind(e);
                                        else {
                                            if ("object" != typeof l || null === l || !s(a, o) && !s(i, o)) return Object.defineProperty(g, o, {
                                                configurable: !0,
                                                enumerable: !0,
                                                get: () => e[o],
                                                set(r) {
                                                    e[o] = r
                                                }
                                            }), l;
                                            l = n(l, a[o], i[o])
                                        }
                                        return g[o] = l, l
                                    },
                                    set: (e, r, t, s) => (r in g ? g[r] = t : e[r] = t, !0),
                                    defineProperty: (e, r, t) => Reflect.defineProperty(g, r, t),
                                    deleteProperty: (e, r) => Reflect.deleteProperty(g, r)
                                };
                            return new Proxy(e, o)
                        },
                        a = {
                            runtime: {
                                onMessage: (e => ({
                                    addListener(r, t, ...s) {
                                        r.addListener(e.get(t), ...s)
                                    },
                                    hasListener: (r, t) => r.hasListener(e.get(t)),
                                    removeListener(r, t) {
                                        r.removeListener(e.get(t))
                                    }
                                }))(new class extends WeakMap {
                                    constructor(e, r) {
                                        super(r), this.createItem = e
                                    }
                                    get(e) {
                                        return this.has(e) || this.set(e, this.createItem(e)), super.get(e)
                                    }
                                }(e => "function" != typeof e ? e : function(r, t, s) {
                                    let n = e(r, t);
                                    if ((e => e && "object" == typeof e && "function" == typeof e.then)(n)) return n.then(s, e => {
                                        console.error(e), s(e)
                                    }), !0;
                                    void 0 !== n && s(n)
                                }))
                            }
                        };
                    return n(chrome, a, e)
                };
                e.exports = r()
            } else e.exports = browser
        }, n = [e], void 0 === (a = "function" == typeof(s = i) ? s.apply(r, n) : s) || (e.exports = a)
    },
    92: function(e, r, t) {
        "use strict";
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.SmartNameEvaluate = function(e) {
            var r = e.xpath,
                t = null;

            function n() {
                if ((t = t && t.trim() || "") && e.regexp) {
                    var r = new RegExp(e.regexp, "m"),
                        s = r.exec(t);
                    t = s ? void 0 !== s[1] ? s[1] || "" : s[0] || "" : ""
                }
            }
            switch (e.mode) {
                case "page-title":
                    r = "/html/head/title/text()";
                case "page-content":
                    t = document.evaluate(r, document, null, XPathResult.STRING_TYPE, null).stringValue || null;
                    break;
                case "obfuscated":
                    return new Promise(function(e, r) {
                        crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(window.location.href)).then(function(r) {
                            var s = Array.from(new Uint8Array(r));
                            t = s.slice(0, 16).map(function(e) {
                                return ("00" + e.toString(16)).slice(-2)
                            }).join(""), n(), e(t)
                        }).catch(r)
                    });
                case "header-url":
                    if (!(t = e.headerFilename || e.urlFilename)) {
                        var a = s.exec(window.location.href);
                        t = a ? a[1] : ""
                    }
                    break;
                default:
                    t = ""
            }
            n(), t.length > 128 && (t = t.substr(0, 64));
            return t
        };
        var s = new RegExp("^.*?:/?/?[^/]+/(?:[^/]*/)*([^#\\?/]+?)(?:\\.[a-zA-Z0-9]{1,5})?(?:$|#|\\?|/)")
    }
});