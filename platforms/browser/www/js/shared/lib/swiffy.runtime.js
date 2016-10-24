if (!!document.createElement("canvas").getContext) //only load the runtime if it supports canvas
{
/*
 * Copyright 2014 Google Inc.
 *
 * Swiffy runtime version 7.1.1
 *
 * In addition to the Google Terms of Service (http://www.google.com/accounts/TOS),
 * Google grants you and the Google Swiffy end users a personal, worldwide,
 * royalty-free, non-assignable and non-exclusive license to use the Google Swiffy
 * runtime to host it for Google Swiffy end users and to use it in connection with
 * the Google Swiffy service.
 */
(function() {
	var __parent;
    var g;
    Object.defineProperty && !Object.defineProperties && (Object.defineProperties = function(a, b) {
        for (var c in b) Object.defineProperty(a, c, b[c]);
        return a
    });
    "Uint32Array" in window || (window.Uint32Array = Array);
    "Uint8Array" in window || (window.Uint8Array = Array);
    "Float32Array" in window || (window.Float32Array = Array);
    var aa = this,
        k = function(a) {
            return void 0 !== a
        },
        ba = function(a, b, c) {
            a = a.split(".");
            c = c || aa;
            a[0] in c || !c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift());) !a.length && k(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
        },
        ca = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" !=
                        typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        da = function(a) {
            return "array" == ca(a)
        },
        ea = function(a) {
            var b = ca(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        fa = function(a) {
            return "string" == typeof a
        },
        ga = function(a) {
            return "boolean" ==
                typeof a
        },
        ha = function(a) {
            return "number" == typeof a
        },
        m = function(a) {
            return "function" == ca(a)
        },
        ia = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        ja = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ka = 0,
        la = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        ma = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b,
                    arguments)
            }
        },
        na = function(a, b, c) {
            na = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? la : ma;
            return na.apply(null, arguments)
        },
        oa = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        },
        pa = Date.now || function() {
            return +new Date
        },
        q = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.oa = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Wi = function(a, c, f) {
                return b.prototype[c].apply(a,
                    Array.prototype.slice.call(arguments, 2))
            }
        };
    var qa = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        ya = function(a, b) {
            if (b) a = a.replace(ra, "&amp;").replace(sa, "&lt;").replace(ta, "&gt;").replace(ua, "&quot;").replace(va, "&#39;").replace(wa, "&#0;");
            else {
                if (!xa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(ra, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(sa, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(ta, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(ua, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(va,
                    "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(wa, "&#0;"))
            }
            return a
        },
        ra = /&/g,
        sa = /</g,
        ta = />/g,
        ua = /"/g,
        va = /'/g,
        wa = /\x00/g,
        xa = /[\x00&<>"']/,
        za = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        },
        Aa = {
            "'": "\\'"
        },
        Ba = function(a) {
            a = String(a);
            if (a.quote) return a.quote();
            for (var b = ['"'], c = 0; c < a.length; c++) {
                var d = a.charAt(c),
                    e = d.charCodeAt(0),
                    f = c + 1,
                    h;
                if (!(h = za[d])) {
                    if (!(31 < e && 127 > e))
                        if (d in Aa) d = Aa[d];
                        else if (d in za) d = Aa[d] = za[d];
                    else {
                        e = d;
                        h = d.charCodeAt(0);
                        if (31 < h && 127 > h) e = d;
                        else {
                            if (256 > h) {
                                if (e = "\\x", 16 > h || 256 < h) e += "0"
                            } else e = "\\u", 4096 > h && (e += "0");
                            e += h.toString(16).toUpperCase()
                        }
                        d = Aa[d] = e
                    }
                    h = d
                }
                b[f] = h
            }
            b.push('"');
            return b.join("")
        },
        Ca = function(a, b) {
            return -1 != a.indexOf(b)
        },
        Da = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var Ea = Array.prototype,
        Fa = Ea.indexOf ? function(a, b, c) {
            return Ea.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (fa(a)) return fa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Ga = Ea.map ? function(a, b, c) {
            return Ea.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = Array(d), f = fa(a) ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
            return e
        },
        Ha = Ea.every ? function(a, b, c) {
            return Ea.every.call(a, b, c)
        } : function(a, b, c) {
            for (var d =
                    a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && !b.call(c, e[f], f, a)) return !1;
            return !0
        },
        Ia = function(a, b) {
            var c = Fa(a, b),
                d;
            (d = 0 <= c) && Ea.splice.call(a, c, 1);
            return d
        },
        Ja = function(a, b, c) {
            t: {
                for (var d = a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++)
                    if (f in e && b.call(c, e[f], f, a)) {
                        b = f;
                        break t
                    }
                b = -1
            }
            return 0 <= b ? (Ea.splice.call(a, b, 1), !0) : !1
        },
        Ka = function(a) {
            return Ea.concat.apply(Ea, arguments)
        },
        La = function(a, b, c) {
            return 2 >= arguments.length ? Ea.slice.call(a, b) : Ea.slice.call(a, b, c)
        },
        Na = function(a, b, c) {
            c = c || Ma;
            for (var d = 0, e = a.length, f; d < e;) {
                var h = d + e >> 1,
                    l;
                l = c(b, a[h]);
                0 < l ? d = h + 1 : (e = h, f = !l)
            }
            return f ? d : ~d
        },
        Ma = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };
    var Oa = function(a, b, c) {
            for (var d in a) b.call(c, a[d], d, a)
        },
        Pa = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        },
        Qa = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        },
        Ra = function(a) {
            var b = ca(a);
            if ("object" == b || "array" == b) {
                if (a.clone) return a.clone();
                var b = "array" == b ? [] : {},
                    c;
                for (c in a) b[c] = Ra(a[c]);
                return b
            }
            return a
        },
        Sa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Ta = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d =
                    arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Sa.length; f++) c = Sa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var Ua;
    t: {
        var Va = aa.navigator;
        if (Va) {
            var Wa = Va.userAgent;
            if (Wa) {
                Ua = Wa;
                break t
            }
        }
        Ua = ""
    };
    var Ya, Za, $a, ab = Ca(Ua, "Opera") || Ca(Ua, "OPR"),
        bb = Ca(Ua, "Trident") || Ca(Ua, "MSIE"),
        cb = Ca(Ua, "Gecko") && !Ca(Ua.toLowerCase(), "webkit") && !(Ca(Ua, "Trident") || Ca(Ua, "MSIE")),
        db = Ca(Ua.toLowerCase(), "webkit"),
        eb = db && Ca(Ua, "Mobile"),
        fb = aa.navigator || null,
        gb = fb && fb.platform || "";
    Ya = Ca(gb, "Mac");
    Za = Ca(gb, "Win");
    $a = Ca(gb, "Linux");
    var hb = Ua,
        ib = !!hb && Ca(hb, "Android"),
        jb = function() {
            var a = aa.document;
            return a ? a.documentMode : void 0
        },
        kb = function() {
            var a = "",
                b;
            if (ab && aa.opera) return a = aa.opera.version, m(a) ? a() : a;
            cb ? b = /rv\:([^\);]+)(\)|;)/ : bb ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : db && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(Ua)) ? a[1] : "");
            return bb && (b = jb(), b > parseFloat(a)) ? String(b) : a
        }(),
        lb = {},
        mb = function(a) {
            var b;
            if (!(b = lb[a])) {
                b = 0;
                for (var c = qa(String(kb)).split("."), d = qa(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f <
                    e; f++) {
                    var h = c[f] || "",
                        l = d[f] || "",
                        n = RegExp("(\\d*)(\\D*)", "g"),
                        r = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var t = n.exec(h) || ["", "", ""],
                            p = r.exec(l) || ["", "", ""];
                        if (0 == t[0].length && 0 == p[0].length) break;
                        b = Da(0 == t[1].length ? 0 : parseInt(t[1], 10), 0 == p[1].length ? 0 : parseInt(p[1], 10)) || Da(0 == t[2].length, 0 == p[2].length) || Da(t[2], p[2])
                    } while (0 == b)
                }
                b = lb[a] = 0 <= b
            }
            return b
        },
        ob = aa.document,
        pb = ob && bb ? jb() || ("CSS1Compat" == ob.compatMode ? parseInt(kb, 10) : 5) : void 0;
    !cb && !bb || bb && bb && 9 <= pb || cb && mb("1.9.1");
    bb && mb("9");
    var qb = function(a) {
        qb[" "](a);
        return a
    };
    qb[" "] = function() {};
    var rb = !bb || bb && 9 <= pb,
        sb = bb && !mb("9");
    !db || mb("528");
    cb && mb("1.9b") || bb && mb("8") || ab && mb("9.5") || db && mb("528");
    cb && !mb("8") || bb && mb("9");
    var tb = function() {
        this.Tj = this.Tj;
        this.Zj = this.Zj
    };
    tb.prototype.Tj = !1;
    tb.prototype.ck = function() {
        this.Tj || (this.Tj = !0, this.kf())
    };
    tb.prototype.kf = function() {
        if (this.Zj)
            for (; this.Zj.length;) this.Zj.shift()()
    };
    var ub = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.nf = !1;
        this.op = !0
    };
    ub.prototype.kf = function() {};
    ub.prototype.ck = function() {};
    ub.prototype.stopPropagation = function() {
        this.nf = !0
    };
    ub.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.op = !1
    };
    var vb = function(a, b) {
        ub.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.jc = this.state = null;
        a && this.init(a, b)
    };
    q(vb, ub);
    vb.prototype.init = function(a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (cb) {
                var e;
                t: {
                    try {
                        qb(d.nodeName);
                        e = !0;
                        break t
                    } catch (f) {}
                    e = !1
                }
                e || (d = null)
            }
        } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
        this.relatedTarget = d;
        this.offsetX = db || void 0 !== a.offsetX ? a.offsetX : a.layerX;
        this.offsetY = db || void 0 !== a.offsetY ? a.offsetY : a.layerY;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY :
            a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.state = a.state;
        this.jc = a;
        a.defaultPrevented && this.preventDefault()
    };
    vb.prototype.stopPropagation = function() {
        vb.oa.stopPropagation.call(this);
        this.jc.stopPropagation ? this.jc.stopPropagation() : this.jc.cancelBubble = !0
    };
    vb.prototype.preventDefault = function() {
        vb.oa.preventDefault.call(this);
        var a = this.jc;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, sb) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    vb.prototype.kf = function() {};
    var wb = "closure_listenable_" + (1E6 * Math.random() | 0),
        yb = 0;
    var zb = function(a, b, c, d, e, f) {
        this.Pc = a;
        this.nj = b;
        this.src = c;
        this.type = d;
        this.aj = !!e;
        this.Ue = f;
        this.key = ++yb;
        this.gg = this.ij = !1
    };
    zb.prototype.sj = function() {
        this.gg = !0;
        this.Ue = this.src = this.nj = this.Pc = null
    };
    var Ab = function(a) {
        this.src = a;
        this.Bb = {};
        this.Kh = 0
    };
    g = Ab.prototype;
    g.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.Bb[f];
        a || (a = this.Bb[f] = [], this.Kh++);
        var h = Bb(a, b, d, e); - 1 < h ? (b = a[h], c || (b.ij = !1)) : (b = new zb(b, null, this.src, f, !!d, e), b.ij = c, a.push(b));
        return b
    };
    g.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.Bb)) return !1;
        var e = this.Bb[a];
        b = Bb(e, b, c, d);
        return -1 < b ? (e[b].sj(), Ea.splice.call(e, b, 1), 0 == e.length && (delete this.Bb[a], this.Kh--), !0) : !1
    };
    g.Vp = function(a) {
        var b = a.type;
        if (!(b in this.Bb)) return !1;
        var c = Ia(this.Bb[b], a);
        c && (a.sj(), 0 == this.Bb[b].length && (delete this.Bb[b], this.Kh--));
        return c
    };
    g.Oq = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.Bb)
            if (!a || c == a) {
                for (var d = this.Bb[c], e = 0; e < d.length; e++) ++b, d[e].sj();
                delete this.Bb[c];
                this.Kh--
            }
        return b
    };
    g.ym = function(a, b, c, d) {
        a = this.Bb[a.toString()];
        var e = -1;
        a && (e = Bb(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    var Bb = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.gg && f.Pc == b && f.aj == !!c && f.Ue == d) return e
        }
        return -1
    };
    var Cb = "closure_lm_" + (1E6 * Math.random() | 0),
        Db = {},
        Eb = 0,
        Fb = function(a, b, c, d, e) {
            if (da(b)) {
                for (var f = 0; f < b.length; f++) Fb(a, b[f], c, d, e);
                return null
            }
            c = Gb(c);
            if (a && a[wb]) a = a.Su(b, c, d, e);
            else {
                if (!b) throw Error("Invalid event type");
                var f = !!d,
                    h = Hb(a);
                h || (a[Cb] = h = new Ab(a));
                c = h.add(b, c, !1, d, e);
                c.nj || (d = Ib(), c.nj = d, d.src = a, d.Pc = c, a.addEventListener ? a.addEventListener(b.toString(), d, f) : a.attachEvent(Jb(b.toString()), d), Eb++);
                a = c
            }
            return a
        },
        Ib = function() {
            var a = Kb,
                b = rb ? function(c) {
                    return a.call(b.src, b.Pc, c)
                } : function(c) {
                    c =
                        a.call(b.src, b.Pc, c);
                    if (!c) return c
                };
            return b
        },
        Lb = function(a, b, c, d, e) {
            if (da(b)) {
                for (var f = 0; f < b.length; f++) Lb(a, b[f], c, d, e);
                return null
            }
            c = Gb(c);
            if (a && a[wb]) return a.Av(b, c, d, e);
            if (!a) return !1;
            if (a = Hb(a))
                if (b = a.ym(b, c, !!d, e)) return Mb(b);
            return !1
        },
        Mb = function(a) {
            if (ha(a) || !a || a.gg) return !1;
            var b = a.src;
            if (b && b[wb]) return b.ap(a);
            var c = a.type,
                d = a.nj;
            b.removeEventListener ? b.removeEventListener(c, d, a.aj) : b.detachEvent && b.detachEvent(Jb(c), d);
            Eb--;
            (c = Hb(b)) ? (c.Vp(a), 0 == c.Kh && (c.src = null, b[Cb] = null)) : a.sj();
            return !0
        },
        Nb = function(a, b) {
            if (!a) return 0;
            if (a && a[wb]) return a.Ap(b);
            var c = Hb(a);
            if (!c) return 0;
            var d = 0,
                e = b && b.toString(),
                f;
            for (f in c.Bb)
                if (!e || f == e)
                    for (var h = c.Bb[f].concat(), l = 0; l < h.length; ++l) Mb(h[l]) && ++d;
            return d
        },
        Jb = function(a) {
            return a in Db ? Db[a] : Db[a] = "on" + a
        },
        Pb = function(a, b, c, d) {
            var e = 1;
            if (a = Hb(a))
                if (b = a.Bb[b.toString()])
                    for (b = b.concat(), a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && f.aj == c && !f.gg && (e &= !1 !== Ob(f, d))
                    }
                return Boolean(e)
        },
        Ob = function(a, b) {
            var c = a.Pc,
                d = a.Ue || a.src;
            a.ij && Mb(a);
            return c.call(d,
                b)
        },
        Kb = function(a, b) {
            if (a.gg) return !0;
            if (!rb) {
                var c;
                if (!(c = b)) t: {
                    c = ["window", "event"];
                    for (var d = aa, e; e = c.shift();)
                        if (null != d[e]) d = d[e];
                        else {
                            c = null;
                            break t
                        }
                    c = d
                }
                e = c;
                c = new vb(e, this);
                d = !0;
                if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                    t: {
                        var f = !1;
                        if (0 == e.keyCode) try {
                            e.keyCode = -1;
                            break t
                        } catch (h) {
                            f = !0
                        }
                        if (f || void 0 == e.returnValue) e.returnValue = !0
                    }
                    e = [];
                    for (f = c.currentTarget; f; f = f.parentNode) e.push(f);
                    for (var f = a.type, l = e.length - 1; !c.nf && 0 <= l; l--) c.currentTarget = e[l],
                    d &= Pb(e[l], f, !0, c);
                    for (l = 0; !c.nf && l < e.length; l++) c.currentTarget =
                        e[l],
                    d &= Pb(e[l], f, !1, c)
                }
                return d
            }
            return Ob(a, new vb(b, this))
        },
        Hb = function(a) {
            a = a[Cb];
            return a instanceof Ab ? a : null
        },
        Qb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
        Gb = function(a) {
            if (m(a)) return a;
            a[Qb] || (a[Qb] = function(b) {
                return a.handleEvent(b)
            });
            return a[Qb]
        };
    var Rb = function() {
        tb.call(this);
        this.bf = new Ab(this);
        this.tu = this;
        this.Tl = null
    };
    q(Rb, tb);
    Rb.prototype[wb] = !0;
    g = Rb.prototype;
    g.addEventListener = function(a, b, c, d) {
        Fb(this, a, b, c, d)
    };
    g.removeEventListener = function(a, b, c, d) {
        Lb(this, a, b, c, d)
    };
    g.dispatchEvent = function(a) {
        var b, c = this.Tl;
        if (c)
            for (b = []; c; c = c.Tl) b.push(c);
        var c = this.tu,
            d = a.type || a;
        if (fa(a)) a = new ub(a, c);
        else if (a instanceof ub) a.target = a.target || c;
        else {
            var e = a;
            a = new ub(d, c);
            Ta(a, e)
        }
        var e = !0,
            f;
        if (b)
            for (var h = b.length - 1; !a.nf && 0 <= h; h--) f = a.currentTarget = b[h], e = f.Sj(d, !0, a) && e;
        a.nf || (f = a.currentTarget = c, e = f.Sj(d, !0, a) && e, a.nf || (e = f.Sj(d, !1, a) && e));
        if (b)
            for (h = 0; !a.nf && h < b.length; h++) f = a.currentTarget = b[h], e = f.Sj(d, !1, a) && e;
        return e
    };
    g.kf = function() {
        Rb.oa.kf.call(this);
        this.Ap();
        this.Tl = null
    };
    g.Su = function(a, b, c, d) {
        return this.bf.add(String(a), b, !1, c, d)
    };
    g.Av = function(a, b, c, d) {
        return this.bf.remove(String(a), b, c, d)
    };
    g.ap = function(a) {
        return this.bf.Vp(a)
    };
    g.Ap = function(a) {
        return this.bf ? this.bf.Oq(a) : 0
    };
    g.Sj = function(a, b, c) {
        a = this.bf.Bb[String(a)];
        if (!a) return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f && !f.gg && f.aj == b) {
                var h = f.Pc,
                    l = f.Ue || f.src;
                f.ij && this.ap(f);
                d = !1 !== h.call(l, c) && d
            }
        }
        return d && 0 != c.op
    };
    g.ym = function(a, b, c, d) {
        return this.bf.ym(String(a), b, c, d)
    };
    var Ub = function(a, b, c, d, e) {
            if (!(bb || db && mb("525"))) return !0;
            if (Ya && e) return Sb(a);
            if (e && !d) return !1;
            ha(b) && (b = Tb(b));
            if (!c && (17 == b || 18 == b || Ya && 91 == b)) return !1;
            if (db && d && c) switch (a) {
                case 220:
                case 219:
                case 221:
                case 192:
                case 186:
                case 189:
                case 187:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                    return !1
            }
            if (bb && d && b == a) return !1;
            switch (a) {
                case 13:
                    return !0;
                case 27:
                    return !db
            }
            return Sb(a)
        },
        Sb = function(a) {
            if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || db && 0 == a) return !0;
            switch (a) {
                case 32:
                case 63:
                case 107:
                case 109:
                case 110:
                case 111:
                case 186:
                case 59:
                case 189:
                case 187:
                case 61:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                case 219:
                case 220:
                case 221:
                    return !0;
                default:
                    return !1
            }
        },
        Tb = function(a) {
            if (cb) a = Vb(a);
            else if (Ya && db) t: switch (a) {
                case 93:
                    a = 91;
                    break t
            }
            return a
        },
        Vb = function(a) {
            switch (a) {
                case 61:
                    return 187;
                case 59:
                    return 186;
                case 173:
                    return 189;
                case 224:
                    return 91;
                case 0:
                    return 224;
                default:
                    return a
            }
        };
    var Zb = function(a, b) {
        Rb.call(this);
        a && this.Vi(a, b)
    };
    q(Zb, Rb);
    g = Zb.prototype;
    g.Nh = null;
    g.vj = null;
    g.Wl = null;
    g.wj = null;
    g.oc = -1;
    g.qe = -1;
    g.$l = !1;
    var $b = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        ac = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        bc = bb || db && mb("525"),
        cc = Ya && cb;
    g = Zb.prototype;
    g.xu = function(a) {
        db && (17 == this.oc && !a.ctrlKey || 18 == this.oc && !a.altKey || Ya && 91 == this.oc && !a.metaKey) && (this.qe = this.oc = -1); - 1 == this.oc && (a.ctrlKey && 17 != a.keyCode ? this.oc = 17 : a.altKey && 18 != a.keyCode ? this.oc = 18 : a.metaKey && 91 != a.keyCode && (this.oc = 91));
        bc && !Ub(a.keyCode, this.oc, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.qe = Tb(a.keyCode), cc && (this.$l = a.altKey))
    };
    g.zv = function() {
        this.qe = this.oc = -1
    };
    g.yu = function(a) {
        this.zv();
        this.$l = a.altKey
    };
    g.handleEvent = function(a) {
        var b = a.jc,
            c, d, e = b.altKey;
        bb && "keypress" == a.type ? (c = this.qe, d = 13 != c && 27 != c ? b.keyCode : 0) : db && "keypress" == a.type ? (c = this.qe, d = 0 <= b.charCode && 63232 > b.charCode && Sb(c) ? b.charCode : 0) : ab ? (c = this.qe, d = Sb(c) ? b.keyCode : 0) : (c = b.keyCode || this.qe, d = b.charCode || 0, cc && (e = this.$l), Ya && 63 == d && 224 == c && (c = 191));
        var f = c = Tb(c),
            h = b.keyIdentifier;
        c ? 63232 <= c && c in $b ? f = $b[c] : 25 == c && a.shiftKey && (f = 9) : h && h in ac && (f = ac[h]);
        a = f == this.oc;
        this.oc = f;
        b = new dc(f, d, a, b);
        b.altKey = e;
        this.dispatchEvent(b)
    };
    g.Vi = function(a, b) {
        this.wj && this.detach();
        this.Nh = a;
        this.vj = Fb(this.Nh, "keypress", this, b);
        this.Wl = Fb(this.Nh, "keydown", this.xu, b, this);
        this.wj = Fb(this.Nh, "keyup", this.yu, b, this)
    };
    g.detach = function() {
        this.vj && (Mb(this.vj), Mb(this.Wl), Mb(this.wj), this.wj = this.Wl = this.vj = null);
        this.Nh = null;
        this.qe = this.oc = -1
    };
    g.kf = function() {
        Zb.oa.kf.call(this);
        this.detach()
    };
    var dc = function(a, b, c, d) {
        vb.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    };
    q(dc, vb);
    var ec = function(a) {
        return a
    };
    var fc = "StopIteration" in aa ? aa.StopIteration : Error("StopIteration"),
        gc = function() {};
    gc.prototype.next = function() {
        throw fc;
    };
    gc.prototype.gm = function() {
        return this
    };
    var hc = function(a, b) {
        this.Aa = {};
        this.Sa = [];
        this.Ah = this.fb = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.Ch(a)
    };
    g = hc.prototype;
    g.Oc = function() {
        return this.fb
    };
    g.mc = function() {
        this.xh();
        for (var a = [], b = 0; b < this.Sa.length; b++) a.push(this.Aa[this.Sa[b]]);
        return a
    };
    g.se = function() {
        this.xh();
        return this.Sa.concat()
    };
    g.Ed = function(a) {
        return ic(this.Aa, a)
    };
    g.wm = function(a) {
        for (var b = 0; b < this.Sa.length; b++) {
            var c = this.Sa[b];
            if (ic(this.Aa, c) && this.Aa[c] == a) return !0
        }
        return !1
    };
    g.Zc = function(a, b) {
        if (this === a) return !0;
        if (this.fb != a.Oc()) return !1;
        var c = b || jc;
        this.xh();
        for (var d, e = 0; d = this.Sa[e]; e++)
            if (!c(this.get(d), a.get(d))) return !1;
        return !0
    };
    var jc = function(a, b) {
        return a === b
    };
    g = hc.prototype;
    g.$a = function() {
        return 0 == this.fb
    };
    g.clear = function() {
        this.Aa = {};
        this.Ah = this.fb = this.Sa.length = 0
    };
    g.remove = function(a) {
        return ic(this.Aa, a) ? (delete this.Aa[a], this.fb--, this.Ah++, this.Sa.length > 2 * this.fb && this.xh(), !0) : !1
    };
    g.xh = function() {
        if (this.fb != this.Sa.length) {
            for (var a = 0, b = 0; a < this.Sa.length;) {
                var c = this.Sa[a];
                ic(this.Aa, c) && (this.Sa[b++] = c);
                a++
            }
            this.Sa.length = b
        }
        if (this.fb != this.Sa.length) {
            for (var d = {}, b = a = 0; a < this.Sa.length;) c = this.Sa[a], ic(d, c) || (this.Sa[b++] = c, d[c] = 1), a++;
            this.Sa.length = b
        }
    };
    g.get = function(a, b) {
        return ic(this.Aa, a) ? this.Aa[a] : b
    };
    g.set = function(a, b) {
        ic(this.Aa, a) || (this.fb++, this.Sa.push(a), this.Ah++);
        this.Aa[a] = b
    };
    g.Ch = function(a) {
        var b;
        a instanceof hc ? (b = a.se(), a = a.mc()) : (b = Qa(a), a = Pa(a));
        for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
    };
    g.forEach = function(a, b) {
        for (var c = this.se(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    g.clone = function() {
        return new hc(this)
    };
    g.gm = function(a) {
        this.xh();
        var b = 0,
            c = this.Sa,
            d = this.Aa,
            e = this.Ah,
            f = this,
            h = new gc;
        h.next = function() {
            for (;;) {
                if (e != f.Ah) throw Error("The map has changed since the iterator was created");
                if (b >= c.length) throw fc;
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return h
    };
    var ic = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var kc = function(a) {
            if ("function" == typeof a.Oc) a = a.Oc();
            else if (ea(a) || fa(a)) a = a.length;
            else {
                var b = 0,
                    c;
                for (c in a) b++;
                a = b
            }
            return a
        },
        lc = function(a) {
            if ("function" == typeof a.mc) return a.mc();
            if (fa(a)) return a.split("");
            if (ea(a)) {
                for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
                return b
            }
            return Pa(a)
        },
        mc = function(a, b, c) {
            if ("function" == typeof a.every) return a.every(b, c);
            if (ea(a) || fa(a)) return Ha(a, b, c);
            var d;
            if ("function" == typeof a.se) d = a.se();
            else if ("function" != typeof a.mc)
                if (ea(a) || fa(a)) {
                    d = [];
                    for (var e =
                            a.length, f = 0; f < e; f++) d.push(f)
                } else d = Qa(a);
            else d = void 0;
            for (var e = lc(a), f = e.length, h = 0; h < f; h++)
                if (!b.call(c, e[h], d && d[h], a)) return !1;
            return !0
        };
    var nc = function(a) {
            this.Aa = new hc;
            a && this.Ch(a)
        },
        oc = function(a) {
            var b = typeof a;
            return "object" == b && a || "function" == b ? "o" + (a[ja] || (a[ja] = ++ka)) : b.substr(0, 1) + a
        };
    g = nc.prototype;
    g.Oc = function() {
        return this.Aa.Oc()
    };
    g.add = function(a) {
        this.Aa.set(oc(a), a)
    };
    g.Ch = function(a) {
        a = lc(a);
        for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
    };
    g.Oq = function(a) {
        a = lc(a);
        for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
    };
    g.remove = function(a) {
        return this.Aa.remove(oc(a))
    };
    g.clear = function() {
        this.Aa.clear()
    };
    g.$a = function() {
        return this.Aa.$a()
    };
    g.contains = function(a) {
        return this.Aa.Ed(oc(a))
    };
    g.mc = function() {
        return this.Aa.mc()
    };
    g.clone = function() {
        return new nc(this)
    };
    g.Zc = function(a) {
        return this.Oc() == kc(a) && this.jv(a)
    };
    g.jv = function(a) {
        var b = kc(a);
        if (this.Oc() > b) return !1;
        !(a instanceof nc) && 5 < b && (a = new nc(a));
        return mc(this, function(b) {
            var d = a;
            if ("function" == typeof d.contains) b = d.contains(b);
            else if ("function" == typeof d.wm) b = d.wm(b);
            else if (ea(d) || fa(d)) b = 0 <= Fa(d, b);
            else t: {
                for (var e in d)
                    if (d[e] == b) {
                        b = !0;
                        break t
                    }
                b = !1
            }
            return b
        })
    };
    g.gm = function() {
        return this.Aa.gm(!1)
    };
    var pc = function(a, b, c) {
        this.ne = a || null;
        this.sv = !!c
    };
    g = pc.prototype;
    g.je = function() {
        if (!this.nb && (this.nb = new hc, this.fb = 0, this.ne))
            for (var a = this.ne.split("&"), b = 0; b < a.length; b++) {
                var c = a[b].indexOf("="),
                    d = null,
                    e = null;
                0 <= c ? (d = a[b].substring(0, c), e = a[b].substring(c + 1)) : d = a[b];
                d = decodeURIComponent(d.replace(/\+/g, " "));
                d = this.ig(d);
                this.add(d, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
    };
    g.nb = null;
    g.fb = null;
    g.Oc = function() {
        this.je();
        return this.fb
    };
    g.add = function(a, b) {
        this.je();
        this.jj();
        a = this.ig(a);
        var c = this.nb.get(a);
        c || this.nb.set(a, c = []);
        c.push(b);
        this.fb++;
        return this
    };
    g.remove = function(a) {
        this.je();
        a = this.ig(a);
        return this.nb.Ed(a) ? (this.jj(), this.fb -= this.nb.get(a).length, this.nb.remove(a)) : !1
    };
    g.clear = function() {
        this.jj();
        this.nb = null;
        this.fb = 0
    };
    g.$a = function() {
        this.je();
        return 0 == this.fb
    };
    g.Ed = function(a) {
        this.je();
        a = this.ig(a);
        return this.nb.Ed(a)
    };
    g.wm = function(a) {
        var b = this.mc();
        return 0 <= Fa(b, a)
    };
    g.se = function() {
        this.je();
        for (var a = this.nb.mc(), b = this.nb.se(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    g.mc = function(a) {
        this.je();
        var b = [];
        if (fa(a)) this.Ed(a) && (b = Ka(b, this.nb.get(this.ig(a))));
        else {
            a = this.nb.mc();
            for (var c = 0; c < a.length; c++) b = Ka(b, a[c])
        }
        return b
    };
    g.set = function(a, b) {
        this.je();
        this.jj();
        a = this.ig(a);
        this.Ed(a) && (this.fb -= this.nb.get(a).length);
        this.nb.set(a, [b]);
        this.fb++;
        return this
    };
    g.get = function(a, b) {
        var c = a ? this.mc(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    g.toString = function() {
        if (this.ne) return this.ne;
        if (!this.nb) return "";
        for (var a = [], b = this.nb.se(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.mc(d), f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        return this.ne = a.join("&")
    };
    g.jj = function() {
        this.ne = null
    };
    g.clone = function() {
        var a = new pc;
        a.ne = this.ne;
        this.nb && (a.nb = this.nb.clone(), a.fb = this.fb);
        return a
    };
    g.ig = function(a) {
        a = String(a);
        this.sv && (a = a.toLowerCase());
        return a
    };
    var qc = null,
        rc = null,
        sc = cb || db || ab || "function" == typeof aa.atob,
        tc = function() {
            if (!qc) {
                qc = {};
                rc = {};
                for (var a = 0; 65 > a; a++) qc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), rc[qc[a]] = a, 62 <= a && (rc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
            }
        };
    var uc = function(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    };
    var wc = function(a, b) {
        this.fp = a || null;
        this.wc = !!b;
        this.Aa = new hc;
        this.Ya = new vc("", void 0);
        this.Ya.next = this.Ya.zc = this.Ya
    };
    g = wc.prototype;
    g.lq = function(a) {
        (a = this.Aa.get(a)) && this.wc && (a.remove(), this.Np(a));
        return a
    };
    g.get = function(a, b) {
        var c = this.lq(a);
        return c ? c.value : b
    };
    g.set = function(a, b) {
        var c = this.lq(a);
        c ? c.value = b : (c = new vc(a, b), this.Aa.set(a, c), this.Np(c))
    };
    g.oq = function() {
        return this.Ya.next.value
    };
    g.shift = function() {
        return this.iq(this.Ya.next)
    };
    g.pop = function() {
        return this.iq(this.Ya.zc)
    };
    g.remove = function(a) {
        return (a = this.Aa.get(a)) ? (this.removeNode(a), !0) : !1
    };
    g.removeNode = function(a) {
        a.remove();
        this.Aa.remove(a.key)
    };
    g.Oc = function() {
        return this.Aa.Oc()
    };
    g.$a = function() {
        return this.Aa.$a()
    };
    g.se = function() {
        return this.map(function(a, b) {
            return b
        })
    };
    g.mc = function() {
        return this.map(function(a) {
            return a
        })
    };
    g.contains = function(a) {
        return this.some(function(b) {
            return b == a
        })
    };
    g.Ed = function(a) {
        return this.Aa.Ed(a)
    };
    g.clear = function() {
        this.Ip(0)
    };
    g.forEach = function(a, b) {
        for (var c = this.Ya.next; c != this.Ya; c = c.next) a.call(b, c.value, c.key, this)
    };
    g.map = function(a, b) {
        for (var c = [], d = this.Ya.next; d != this.Ya; d = d.next) c.push(a.call(b, d.value, d.key, this));
        return c
    };
    g.some = function(a, b) {
        for (var c = this.Ya.next; c != this.Ya; c = c.next)
            if (a.call(b, c.value, c.key, this)) return !0;
        return !1
    };
    g.every = function(a, b) {
        for (var c = this.Ya.next; c != this.Ya; c = c.next)
            if (!a.call(b, c.value, c.key, this)) return !1;
        return !0
    };
    g.Np = function(a) {
        this.wc ? (a.next = this.Ya.next, a.zc = this.Ya, this.Ya.next = a, a.next.zc = a) : (a.zc = this.Ya.zc, a.next = this.Ya, this.Ya.zc = a, a.zc.next = a);
        null != this.fp && this.Ip(this.fp)
    };
    g.Ip = function(a) {
        for (var b = this.Aa.Oc(); b > a; b--) this.removeNode(this.wc ? this.Ya.zc : this.Ya.next)
    };
    g.iq = function(a) {
        this.Ya != a && this.removeNode(a);
        return a.value
    };
    var vc = function(a, b) {
        this.key = a;
        this.value = b
    };
    vc.prototype.remove = function() {
        this.zc.next = this.next;
        this.next.zc = this.zc;
        delete this.zc;
        delete this.next
    };
    var xc, yc, zc;
    zc = yc = xc = !1;
    var Ac = Ua;
    Ac && (-1 != Ac.indexOf("Firefox") || -1 != Ac.indexOf("Camino") || (-1 != Ac.indexOf("iPhone") || -1 != Ac.indexOf("iPod") ? xc = !0 : -1 != Ac.indexOf("iPad") ? yc = !0 : -1 != Ac.indexOf("Chrome") || -1 != Ac.indexOf("Android") || -1 != Ac.indexOf("Safari") && (zc = !0)));
    var Bc = xc,
        Cc = yc,
        Dc = zc;
    var Ec = /iPhone|iPod/,
        Fc = function(a, b, c, d) {
            return a << 21 | b << 14 | c << 7 | d
        },
        Gc = /OS (\d)_(\d)(?:_(\d))?/;
    var Hc = function(a, b, c, d, e) {
        this.clip = a;
        c || (a = a.Za(), d = this.gn(d, e), this.en = a.p - d.x, this.fn = a.q - d.y);
        this.Tg = b
    };
    Hc.prototype.en = 0;
    Hc.prototype.fn = 0;
    Hc.prototype.gn = function(a, b) {
        var c = this.clip.getParent() ? this.clip.getParent().Ha() : Ic,
            d = new Jc(a, b);
        d.na(c.Rd());
        return d
    };
    Hc.prototype.ht = function(a, b) {
        var c = this.gn(a, b),
            d = c.x + this.en,
            c = c.y + this.fn;
        this.Tg && (d = Math.max(Math.min(d, this.Tg.t), this.Tg.j), c = Math.max(Math.min(c, this.Tg.s), this.Tg.i));
        this.clip.setTransform(this.clip.Za().Uc(d, c))
    };
    var Kc = function(a, b) {
            this.type = a;
            this.Pe = b || null
        },
        Lc = {
            yz: 0,
            wz: 1,
            Qz: 2,
            Mz: 3,
            Nz: 4,
            DB: 5,
            qy: 6,
            Jz: 7,
            LA: 8,
            MA: 9,
            EA: 10,
            DA: 11,
            fA: 12,
            ky: 13,
            my: 14,
            jy: 15,
            ly: 16,
            lz: 17,
            Vx: 18,
            hf: 19,
            xz: 20,
            ix: 21,
            Oz: 22,
            Pz: 23,
            gx: 24,
            iy: 25,
            GA: 26,
            hx: 27,
            FA: 28
        };
    var Mc = {
            normal: 0,
            layer: 1,
            multiply: 2,
            screen: 3,
            lighten: 4,
            darken: 5,
            difference: 6,
            add: 7,
            subtract: 8,
            invert: 9,
            alpha: 10,
            erase: 11,
            overlay: 12,
            hardlight: 13,
            ignore_source: 100
        },
        Nc = "normal layer multiply screen lighten darken difference add subtract invert alpha erase overlay hardlight".split(" "),
        Oc = {
            aA: 2,
            wg: 3,
            Ih: 4,
            Lh: 5,
            vg: 6,
            oy: 7,
            zz: 8,
            Az: 9,
            dz: 12,
            cz: 13,
            bz: 14,
            az: 15,
            Nv: 16,
            gz: 17,
            Vy: 18,
            Uy: 19,
            $y: 20,
            Zy: 21,
            Yy: 22,
            Xy: 23,
            Wy: 24,
            ez: 25,
            fz: 26,
            Kz: 27,
            tA: 28,
            eA: 29,
            Yz: 30,
            Nl: 31,
            mA: 32,
            sA: 33,
            Zz: 35,
            hA: 36,
            oA: 37,
            qA: 38,
            jA: 39,
            lA: 40,
            Rv: 41,
            ny: 42,
            sB: 43,
            pA: 44,
            kA: 45,
            rA: 46,
            iA: 47,
            nA: 48,
            qg: 49,
            Eh: 50,
            Iz: 53,
            Gz: 54,
            Hz: 55,
            Ez: 56,
            Fz: 57,
            dB: 58,
            bB: 59,
            cB: 60,
            $A: 61,
            aB: 62,
            pg: 64,
            gf: 65,
            hf: 66,
            Cx: 69,
            Ax: 70,
            KA: 71,
            JA: 72,
            ug: 73,
            Ox: 74,
            df: 76,
            Dx: 78,
            Bx: 79,
            tB: 80,
            vB: 81,
            uB: 82,
            Hh: 83,
            Vz: 85,
            Uz: 86,
            rj: 87,
            og: 88,
            Ay: 89,
            ng: 90,
            xy: 93,
            wy: 94,
            By: 96,
            UA: 97,
            Cy: 98,
            OA: 99,
            Jh: 100,
            mg: 101,
            Hy: 102,
            mz: 104,
            gy: 106,
            Eg: 108,
            VA: 109,
            Sx: 112,
            uy: 113,
            ty: 114,
            Rx: 115,
            Tx: 116,
            Qx: 117,
            Px: 118,
            Bj: 119,
            Aj: 120,
            pe: 128,
            Kx: 130,
            Mx: 133,
            nx: 134,
            ox: 135,
            Lx: 137,
            Sz: 144,
            Mv: 145,
            iz: 146,
            Jv: 147,
            Zx: 148,
            BB: 149,
            Qv: 150,
            qx: 151,
            Hv: 160,
            Sv: 161,
            Pv: 162,
            Kv: 163,
            Ov: 164,
            Lz: 165,
            NA: 166,
            EB: 167,
            px: 168,
            rx: 169,
            sx: 170,
            Lv: 171,
            jB: 172,
            Cz: 173,
            Bz: 174,
            Sy: 175,
            Ry: 176,
            qj: 177,
            uz: 178,
            vz: 179,
            pj: 180,
            kz: 192,
            ay: 193,
            jz: 194,
            $x: 195,
            Tz: 196,
            kx: 197,
            rB: 198,
            Rz: 199,
            Dy: 208,
            Ey: 209,
            Fy: 210,
            Gy: 211,
            PA: 212,
            QA: 213,
            RA: 214,
            TA: 215,
            Wx: 239,
            Yx: 240,
            Xx: 241,
            Cq: 256,
            Ro: 257,
            Ep: 258,
            Ol: 259,
            Cp: 260,
            Dp: 261,
            mp: 262,
            Iv: 263
        };
    var Jc = function(a, b) {
        this.x = a;
        this.y = b
    };
    Jc.prototype.na = function(a) {
        if (!a.Qb()) {
            var b = this.x * a.o + this.y * a.k + a.q;
            this.x = this.x * a.l + this.y * a.m + a.p;
            this.y = b
        }
    };
    Jc.prototype.clone = function() {
        return new Jc(this.x, this.y)
    };
    Jc.prototype.pp = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y)
    };
    var Pc = function(a, b) {
            return Math.sqrt(a * a + b * b)
        },
        Qc = function(a, b, c, d, e, f) {
            this.l = a;
            this.o = b;
            this.m = c;
            this.k = d;
            this.p = e;
            this.q = f
        },
        Ic = new Qc(1, 0, 0, 1, 0, 0),
        Rc = new Qc(20, 0, 0, 20, 0, 0),
        Sc = new Qc(.05, 0, 0, .05, 0, 0),
        Uc = function(a, b, c, d, e, f) {
            if (0 === e && 0 === f && 0 === b && 0 === c) {
                if (1 === a && 1 === d) return Ic;
                if (.05 === a && .05 === d) return Sc;
                if (20 === a && 20 === d) return Rc
            }
            return new Qc(a, b, c, d, e, f)
        };
    g = Qc.prototype;
    g.Rd = function() {
        if (this.Qb()) return this;
        var a = this.l * this.k - this.o * this.m;
        return 0 == a ? Ic : Uc(this.k / a, -this.o / a, -this.m / a, this.l / a, (this.m * this.q - this.k * this.p) / a, (this.o * this.p - this.l * this.q) / a)
    };
    g.Ql = function() {
        return this.Qb() ? !0 : 0 != this.l * this.k - this.o * this.m
    };
    g.multiply = function(a) {
        return this.Qb() ? a : a.Qb() ? this : Uc(this.l * a.l + this.o * a.m, this.l * a.o + this.o * a.k, this.m * a.l + this.k * a.m, this.m * a.o + this.k * a.k, this.p * a.l + this.q * a.m + a.p, this.p * a.o + this.q * a.k + a.q)
    };
    g.Dm = function(a, b) {
        return 1 === a && 1 === b ? this : Uc(this.l * a, this.o * a, this.m * b, this.k * b, this.p, this.q)
    };
    g.Xh = function(a) {
        if (0 === a) return this;
        var b = Math.cos(a);
        a = Math.sin(a);
        return Uc(this.l * b + this.o * a, this.o * b - this.l * a, this.m * b + this.k * a, this.k * b - this.m * a, this.p * b + this.q * a, this.q * b - this.p * a)
    };
    g.Ae = function(a, b) {
        return 1 === a && 1 === b ? this : Uc(this.l * a, this.o * b, this.m * a, this.k * b, this.p * a, this.q * b)
    };
    g.ms = function() {
        return this.Qb() ? 1 : Math.sqrt(this.l * this.l + this.o * this.o)
    };
    g.os = function() {
        return this.Qb() ? 1 : Math.sqrt(this.m * this.m + this.k * this.k)
    };
    g.Rr = function() {
        return this.Qb() ? 1 : Math.sqrt(Math.sqrt(this.l * this.l + this.o * this.o) * Math.sqrt(this.m * this.m + this.k * this.k))
    };
    g.Cd = function(a, b) {
        return 0 === a && 0 === b ? this : Uc(this.l, this.o, this.m, this.k, this.p + a, this.q + b)
    };
    g.Uc = function(a, b) {
        return this.p === a && this.q === b ? this : Uc(this.l, this.o, this.m, this.k, a, b)
    };
    g.toString = function() {
        return "matrix(" + this.l + "," + this.o + "," + this.m + "," + this.k + "," + this.p + "," + this.q + ")"
    };
    g.Uu = function() {
        var a = this.ms(),
            b = this.os();
        if (!a || !b || this.Qb()) return {
            rd: 1,
            Be: 1,
            angle: 0,
            m: 0,
            k: 1
        };
        var c = this.l / a,
            d = this.o / a;
        return {
            rd: a,
            Be: b,
            angle: -Math.atan2(this.o, this.l),
            m: (c * this.m + d * this.k) / a,
            k: (c * this.k - d * this.m) / b
        }
    };
    g.Qb = function() {
        return this === Ic
    };
    g.Zc = function(a) {
        return a === this ? !0 : !a || a.Qb() || this.Qb() ? !1 : this.l == a.l && this.o == a.o && this.m == a.m && this.k == a.k && this.p == a.p && this.q == a.q
    };
    g.wb = function(a) {
        this.Qb() || a.transform(this.l, this.o, this.m, this.k, this.p, this.q)
    };
    var Vc = function(a, b, c, d) {
        this.Vb = a;
        this.Ub = b;
        this.Tb = c;
        this.pd = d
    };
    Vc.prototype.toString = function() {
        return "rgb(" + this.Vb.toFixed() + "," + this.Ub.toFixed() + "," + this.Tb.toFixed() + ")"
    };
    Vc.prototype.Jd = function() {
        return "rgba(" + this.Vb.toFixed() + "," + this.Ub.toFixed() + "," + this.Tb.toFixed() + "," + this.pd.toFixed(3) + ")"
    };
    var Wc = function(a, b) {
            var c = a | 0,
                d = c & 255,
                c = c >> 8,
                e = c & 255,
                f = b / 100;
            return new Vc(c >> 8 & 255, e, d, 1 >= f ? 0 <= f ? f : 0 : 1)
        },
        Xc = function(a, b) {
            return a | (255 * b | 0) << 24
        };
    Vc.prototype.Sr = function() {
        return 1 <= this.pd
    };
    Vc.prototype.Qr = function() {
        return .3 * this.Vb + .6 * this.Ub + .1 * this.Tb
    };
    var Yc = function(a, b, c, d, e, f, h, l) {
            this.xa = a;
            this.sa = b;
            this.wa = c;
            this.qa = d;
            this.va = e;
            this.pa = f;
            this.ua = h;
            this.ta = l
        },
        Zc = new Yc(1, 0, 1, 0, 1, 0, 1, 0);
    g = Yc.prototype;
    g.Gl = function(a) {
        return new Yc(this.xa * a.xa, this.xa * a.sa + this.sa, this.wa * a.wa, this.wa * a.qa + this.qa, this.va * a.va, this.va * a.pa + this.pa, this.ua * a.ua, this.ua * a.ta + this.ta)
    };
    g.apply = function(a) {
        return new Vc(a.Vb * this.xa + this.sa, a.Ub * this.wa + this.qa, a.Tb * this.va + this.pa, this.ji(a.pd))
    };
    g.ji = function(a) {
        return Math.max(Math.min(this.ua * a + this.ta / 255, 1), 0)
    };
    g.Zc = function(a) {
        return null != a && this.xa == a.xa && this.sa == a.sa && this.wa == a.wa && this.qa == a.qa && this.va == a.va && this.pa == a.pa && this.ua == a.ua && this.ta == a.ta
    };
    g.Jg = function() {
        return 1 == this.xa && 0 == this.sa && 1 == this.wa && 0 == this.qa && 1 == this.va && 0 == this.pa && 0 == this.ta
    };
    var $c = function(a, b, c, d) {
        this.j = a;
        this.i = b;
        this.t = c;
        this.s = d;
        this.$a() && this.reset()
    };
    g = $c.prototype;
    g.reset = function() {
        this.i = this.j = Number.POSITIVE_INFINITY;
        this.s = this.t = Number.NEGATIVE_INFINITY
    };
    g.clone = function() {
        return new $c(this.j, this.i, this.t, this.s)
    };
    g.expand = function(a, b) {
        this.Ad(a, b, 0, 0)
    };
    g.Ad = function(a, b, c, d) {
        this.j = Math.min(this.j, a - c);
        this.t = Math.max(this.t, a + c);
        this.i = Math.min(this.i, b - d);
        this.s = Math.max(this.s, b + d)
    };
    g.pk = function() {
        this.j = Math.floor(this.j);
        this.i = Math.floor(this.i);
        this.t = Math.ceil(this.t);
        this.s = Math.ceil(this.s)
    };
    g.pp = function() {
        this.j = Math.round(this.j);
        this.i = Math.round(this.i);
        this.t = Math.round(this.t);
        this.s = Math.round(this.s)
    };
    g.add = function(a) {
        this.i += a.i;
        this.s += a.s;
        this.j += a.j;
        this.t += a.t
    };
    g.translate = function(a, b) {
        this.j += a;
        this.i += b;
        this.t += a;
        this.s += b
    };
    g.scale = function(a, b) {
        this.j *= a;
        this.i *= b;
        this.t *= a;
        this.s *= b
    };
    g.na = function(a) {
        if (!a.Qb() && !this.$a()) {
            var b = new Jc(this.j, this.i),
                c = this.t - this.j,
                d = this.s - this.i;
            this.reset();
            b.na(a);
            var e = c * a.o,
                c = c * a.l,
                f = d * a.m;
            a = d * a.k;
            this.expand(b.x, b.y);
            this.expand(b.x + c, b.y + e);
            this.expand(b.x + f, b.y + a);
            this.expand(b.x + c + f, b.y + e + a)
        }
    };
    g.qs = function(a) {
        return this.t >= a.j && a.t >= this.j && this.s >= a.i && a.s >= this.i
    };
    g.hk = function(a) {
        return a.j >= this.j && a.t <= this.t && a.i >= this.i && a.s <= this.s
    };
    g.Zc = function(a) {
        return a.j == this.j && a.t == this.t && a.i == this.i && a.s == this.s
    };
    g.contains = function(a, b) {
        return a >= this.j && a <= this.t && b >= this.i && b <= this.s
    };
    g.ad = function(a) {
        this.j = Math.min(this.j, a.j);
        this.t = Math.max(this.t, a.t);
        this.i = Math.min(this.i, a.i);
        this.s = Math.max(this.s, a.s)
    };
    g.mk = function(a) {
        this.j = Math.max(this.j, a.j);
        this.t = Math.min(this.t, a.t);
        this.i = Math.max(this.i, a.i);
        this.s = Math.min(this.s, a.s);
        this.$a() && this.reset()
    };
    g.Bs = function(a) {
        this.j -= a;
        this.i -= a;
        this.t += a;
        this.s += a
    };
    g.$a = function() {
        return !(this.j <= this.t && this.i <= this.s)
    };
    g.zs = function() {
        return new $c(-this.t, -this.s, -this.j, -this.i)
    };
    g.width = function() {
        return Math.max(this.t - this.j, 0)
    };
    g.height = function() {
        return Math.max(this.s - this.i, 0)
    };
    var ad = function(a) {
        return new $c(a.xmin, a.ymin, a.xmax, a.ymax)
    };
    $c.prototype.toString = function() {
        return "" + this.j + " " + this.i + " " + this.width() + " " + this.height()
    };
    var bd = function(a, b, c) {
        this.pb = a ? a : new $c;
        this.Ab = b;
        this.lc = c
    };
    g = bd.prototype;
    g.ad = function(a) {
        this.Ab ? a.Ab ? this.Ab.ad(a.Ab) : this.Ab.ad(a.pb) : a.Ab && (this.Ab = this.pb.clone(), this.Ab.ad(a.Ab));
        this.pb.ad(a.pb);
        this.wo(a.Kf(), !0)
    };
    g.wo = function(a, b) {
        this.lc ? this.lc.ad(a) : this.pb.hk(a) || (this.lc = this.pb.clone(), this.lc.ad(a));
        b && this.lc && this.pb.hk(this.lc) && (this.lc = void 0)
    };
    g.na = function(a) {
        a.Qb() || (this.Ab && this.Ab.na(a), this.lc && this.lc.na(a), this.pb.na(a))
    };
    g.clone = function() {
        return new bd(this.pb.clone(), this.Ab ? this.Ab.clone() : void 0, this.lc ? this.lc.clone() : void 0)
    };
    g.kd = function() {
        return this.Ab ? this.Ab : this.pb
    };
    g.Kf = function() {
        return this.lc ? this.lc : this.pb
    };
    g.Ms = function(a) {
        this.Ab || (this.Ab = this.pb.clone());
        this.pb = a
    };
    var ed = function(a, b, c) {
            var d = a.c,
                e = new cd,
                f = dd(b, d, e);
            d.gi(e, function() {
                a.kl(f);
                a.fireEvent(new Kc(18));
                d.Ua();
                c && c()
            })
        },
        gd = function(a, b, c, d, e) {
            var f = new cd,
                h = dd(c, a, f);
            a.gi(f, function() {
                var c = new fd(h, a, null);
                d && d(c);
                a.lk(c, b);
                c.Ea();
                c.$b = !0;
                a.Ua();
                e && e()
            })
        },
        hd = function(a, b, c, d) {
            var e = !1;
            if (da(c))
                for (var f = 0; f < c.length; ++f) {
                    var h = c[f];
                    switch (h.name && h.name.toLowerCase()) {
                        case "content-type":
                            e = !0
                    }
                    a.setRequestHeader(h.name, h.value)
                }
            e || ("POST" == b && (d = d || "application/x-www-form-urlencoded"), d && a.setRequestHeader("Content-Type",
                d))
        },
        ld = function(a, b, c, d, e, f, h) {
            d = String(d).toUpperCase();
            switch (d) {
                case "POST":
                    if ("function" == typeof ArrayBuffer) {
                        id(a, b, c, "POST", jd(e), f, h);
                        break
                    }
                case "GET":
                    b = jd(e, b);
                default:
                    USING_XML_HTTP_MOCK ? id(a, b, c, "GET", null, f, h) : kd(b, c, f)
            }
        },
        id = function(a, b, c, d, e, f, h) {
            c && c.oj();
            var l = new XMLHttpRequest;
            l.open(d, b);
            l.responseType = "arraybuffer";
            l.onreadystatechange = function() {
                if (4 == l.readyState) {
                    if (md(l)) {
                        var b = new Uint8Array(l.response);
                        if (!ea(b)) throw Error("encodeByteArray takes an array as a parameter");
                        tc();
                        for (var d = qc, e = [], h = 0; h < b.length; h += 3) {
                            var s = b[h],
                                u = h + 1 < b.length,
                                y = u ? b[h + 1] : 0,
                                x = h + 2 < b.length,
                                C = x ? b[h + 2] : 0,
                                E = s >> 2,
                                s = (s & 3) << 4 | y >> 4,
                                y = (y & 15) << 2 | C >> 6,
                                C = C & 63;
                            x || (C = 64, u || (y = 64));
                            e.push(d[E], d[s], d[y], d[C])
                        }
                        kd("data:image/" + a + ";base64," + e.join(""), c, f)
                    } else f.Gc(l.status);
                    c && c.sg()
                }
            };
            hd(l, d, h);
            l.send(e)
        },
        kd = function(a, b, c) {
            b && b.oj();
            var d = new Image;
            d.onload = function() {
                c.Sg();
                c.Td(0, 1024);
                c.Td(1024, 1024);
                c.bc({
                    tags: [{
                        type: 8,
                        id: 1,
                        data: d.src,
                        width: d.width,
                        height: d.height
                    }, {
                        type: 3,
                        id: 1,
                        depth: 1
                    }, {
                        type: 2
                    }],
                    frameCount: 1,
                    id: 0
                }, 200);
                b && b.sg()
            };
            d.onerror = function() {
                c.Gc(404);
                b && b.sg()
            };
            d.src = a
        },
        nd = function(a, b, c, d, e, f, h) {
            b && b.oj();
            var l = new XMLHttpRequest,
                n = !0,
                r = 0,
                t = 0;
            l.onreadystatechange = function() {
                2 == l.readyState ? md(l) && e.Sg() : 4 == l.readyState && md(l) && 0 != t && r != t && e.Td(t, t)
            };
            l.onprogress = function(a) {
                md(l) && (n && 0 != a.loaded && e.Td(0, a.total), e.Td(a.loaded, a.total));
                n = !1;
                r = a.loaded;
                t = a.total
            };
            l.onload = function() {
                md(l) ? e.bc(l.responseText, l.status) : e.Gc(l.status);
                b && b.sg()
            };
            l.onerror = function() {
                e.Gc(l.status);
                b && b.sg()
            };
            c = String(c).toUpperCase();
            var p = null;
            switch (c) {
                case "POST":
                    l.open(c, a);
                    p = jd(d);
                    break;
                case "GET":
                    a = jd(d, a);
                default:
                    l.open("GET", a)
            }
            hd(l, c, f, h);
            l.send(p)
        },
        rd = function(a, b, c, d, e, f) {
            var h = new pd;
            h.bc = function(a) {
                var b = e(),
                    c = b.$;
                a = qd(a);
                for (var d = Object.keys(a), f = 0; f < d.length; f++) {
                    var h = a[d[f]];
                    c[d[f]] = h[h.length - 1]
                }
                b.fireEvent(new Kc(18));
                c.onData && c.onData.call(c)
            };
            nd(a, b, c, d, h, f)
        },
        td = {
            png: oa(ld, "png"),
            gif: oa(ld, "gif"),
            jpg: oa(ld, "jpeg"),
            jpeg: oa(ld, "jpeg"),
            swf: function(a, b, c, d, e, f) {
                USING_XML_HTTP_MOCK ||
                    (a = a.replace(/^([^?#]+)([?#].*)?$/g, "$1.json$2"));
                var h = new pd(e);
                h.bc = function(a, b) {
                    var c = {};
                    try {
                        a && (c = uc(a), sd(c))
                    } catch (d) {
                        e.Gc(b);
                        return
                    }
                    e.bc(c, b)
                };
                nd(a, b, c, d, h, f)
            }
        },
        ud = function(a, b, c, d, e, f) {
            var h = a.match(/\.([^.?#]+)(?:#.*$|\?.*$|$)/);
            (h = td[h && h[1] || ""]) && h(a, b, c, d, e, f)
        },
        md = function(a) {
            return 200 == a.status || 0 == a.status && null != a.response
        },
        vd = function(a) {
            var b = document.createElement("a");
            b.href = a;
            return b.href
        },
        pd = function(a) {
            this.Sg = function() {
                k(a) && m(a.Sg) && a.Sg()
            };
            this.Gc = function(b) {
                k(a) &&
                    m(a.Gc) && a.Gc(b)
            };
            this.Td = function(b, c) {
                k(a) && m(a.Td) && a.Td(b, c)
            };
            this.bc = function(b, c) {
                k(a) && m(a.bc) && a.bc(b, c)
            }
        };
    var xd = function(a) {
            this.dq = a || ":" + (wd++).toString(36)
        },
        wd = 0,
        yd = new xd,
        zd = {};
    xd.prototype.Cv = 0;
    xd.prototype.Bk = function() {
        return this.dq + "-" + (this.Cv++).toString(36)
    };
    var Ad = function(a) {
        this.Ga = a;
        this.Ze = [];
        this.ok = !1;
        this.bj = null;
        this.Fp = 0;
        this.eg = !1
    };
    g = Ad.prototype;
    g.fv = function() {
        if ("createTouch" in document) {
            Fb(this.Ga.lb, "touchstart", this.wt, !1, this);
            Fb(this.Ga.lb, "touchmove", this.ut, !1, this);
            Fb(this.Ga.lb, "touchend", this.tt, !1, this);
            var a = Fb(document, "touchstart", this.vt, !1, this);
            this.Ze.push(a);
            a = Fb(document, "touchend", this.st, !1, this);
            this.Ze.push(a)
        }
        Fb(this.Ga.lb, "mousemove", this.ot, !1, this);
        Fb(this.Ga.lb, "mousedown", this.mt, !1, this);
        Fb(this.Ga.lb, "mouseup", this.rt, !1, this);
        Fb(this.Ga.lb, "mouseout", this.pt, !1, this);
        Fb(this.Ga.lb, "contextmenu", Bd, !1);
        Fb(this.Ga.lb,
            "mouseover", Bd, !1);
        a = Fb(document, "mousedown", this.lt, !1, this);
        this.Ze.push(a);
        a = Fb(document, "mouseup", this.qt, !1, this);
        this.Ze.push(a);
        a = Fb(document, "mouseover", this.nt, !1, this);
        this.Ze.push(a)
    };
    g.dt = function() {
        for (var a = 0; a < this.Ze.length; a++) Mb(this.Ze[a])
    };
    g.wt = function(a) {
        a.stopPropagation();
        this.wh(a);
        var b = a.jc.touches,
            c = a.jc.changedTouches;
        this.eg || 1 != b.length || 1 != c.length ? (this.eg = !0, this.Hl(a)) : (this.bj = Cd(a), this.Ga.Xe(this.jg(a)), this.Ga.Zo())
    };
    g.ut = function(a) {
        a.stopPropagation();
        this.wh(a);
        this.eg || (a = this.jg(a), this.Ga.Xe(a))
    };
    g.tt = function(a) {
        a.stopPropagation();
        this.wh(a);
        var b = a.jc.changedTouches;
        0 != a.jc.touches.length || 1 != b.length || this.eg || this.Ot(a) || this.Ga.rp();
        this.Hl(a)
    };
    g.vt = function(a) {
        a.stopPropagation();
        this.wh(a);
        this.Ga.Jp();
        this.eg = !0
    };
    g.st = function(a) {
        a.stopPropagation();
        this.wh(a);
        this.Hl(a);
        this.Ga.Lp()
    };
    g.Hl = function(a) {
        this.Ga.Xe(new Jc(-1, -1), null);
        this.ok = !1;
        0 == a.jc.touches.length && (this.eg = !1)
    };
    g.ot = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.Xe(this.jg(a))
    };
    g.mt = function(a) {
        a.stopPropagation();
        this.jf(a) && (this.Ga.Xe(this.jg(a)), this.Ga.Zo())
    };
    g.rt = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.rp()
    };
    g.pt = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.Xe(this.jg(a), null)
    };
    g.lt = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.Jp()
    };
    g.qt = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.Lp()
    };
    g.nt = function(a) {
        a.stopPropagation();
        this.jf(a) && this.Ga.Xe(this.jg(a), null)
    };
    g.wh = function() {
        this.Fp = pa() + 1E3
    };
    g.jf = function(a) {
        return pa() < this.Fp ? !1 : 2 != a.button
    };
    g.Ot = function(a) {
        var b = Cd(a);
        if (!this.bj) return !0;
        a = b.x - this.bj.x;
        b = b.y - this.bj.y;
        return 225 < a * a + b * b ? !0 : !1
    };
    var Cd = function(a) {
        var b = a.jc.touches,
            c = a.jc.changedTouches;
        b && 1 == b.length ? a = b[0] : c && 1 == c.length && (a = c[0]);
        return new Jc(a.clientX, a.clientY)
    };
    Ad.prototype.jg = function(a) {
        a = Cd(a);
        var b = this.Ga.Vc.getBoundingClientRect();
        this.ok = a.x >= b.left && a.x < b.right && a.y >= b.top && a.y < b.bottom;
        a = new Jc(a.x - b.left, a.y - b.top);
        a.na(this.Ga.ia.Jn);
        return a
    };
    var Bd = function(a) {
        a.stopPropagation();
        return !1
    };
    var Dd = !!aa.Audio,
        Ed = window != window.top,
        Fd = (Bc || Cc) && 0 == window.outerWidth ? function() {
            return window.devicePixelRatio
        } : Bc || Cc ? function() {
            return window.outerWidth * window.devicePixelRatio / (90 == Math.abs(window.orientation) ? screen.height : screen.width)
        } : !eb && !ib || Ed ? !bb || "devicePixelRatio" in window ? function() {
            return window.devicePixelRatio || 1
        } : function() {
            return window.screen.deviceXDPI / window.screen.logicalXDPI
        } : function() {
            return window.outerWidth * window.devicePixelRatio / window.innerWidth
        },
        Gd = function(a) {
            window.setTimeout(a,
                1E3 / 60)
        },
        Hd = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
        Id;
    if (Id = Ca(navigator.userAgent, "iPad") || Ec.test(navigator.userAgent)) {
        var Jd = Gc.exec(navigator.userAgent) || [];
        Jd.shift();
        Id = Fc.apply(null, Jd) < Fc(7)
    }
    var Kd = Id ? Gd : Hd ? na(Hd, window) : Gd,
        Ld = document.createElement("canvas");
    Ld.width = 1;
    Ld.height = 1;
    var Md = Ld.getContext("2d"),
        Nd = Md.createImageData(1, 1);
    Nd.data[0] = 127;
    Nd.data[3] = 127;
    Md.putImageData(Nd, 0, 0);
    var Od = 255 == Md.getImageData(0, 0, 1, 1).data[0],
        Pd = function(a, b, c, d) {
            a.putImageData(b, c, d)
        },
        Qd = function(a, b, c, d) {
            for (var e = b.data, f = e.length; 0 < f;) {
                var h = e[--f] + 1;
                e[--f] = e[f] * h >> 8;
                e[--f] = e[f] * h >> 8;
                e[--f] = e[f] * h >> 8
            }
            a.putImageData(b, c, d)
        },
        Rd = Od ? Qd : Pd;
    var Sd = function() {
        this.Jq = [];
        this.kv = [];
        this.$h = []
    };
    Sd.prototype.tv = function(a, b, c) {
        this.Jq[a] = b;
        this.kv[a] = c
    };
    Sd.prototype.Nn = function(a) {
        Dd && (this.$h[a] = new Audio(this.Jq[a]), this.$h[a].play())
    };
    Sd.prototype.To = function() {
        for (var a = 0; a < this.$h.length; a++) k(this.$h[a]) && this.$h[a].pause()
    };
    var cd = function() {
            this.Vl = [];
            this.$c = {}
        },
        Td = function(a, b) {
            this.id = a;
            this.uj = b
        };
    Td.prototype.tk = function() {
        return !!this.uj
    };
    Td.prototype.get = function() {
        return this.uj
    };
    cd.prototype.le = function(a) {
        var b = this.Vl[a];
        b || (b = new Td(a, null), this.Vl[a] = b);
        return b
    };
    cd.prototype.kq = function(a, b) {
        this.le(a).uj = b
    };
    cd.prototype.Bv = function(a, b) {
        for (var c = this.Vl, d = 0; d < c.length; d++) c[d] && c[d].uj && c[d].get().Ea(a);
        b && a.Pp(b);
        a.Qp()
    };
    var Ud = RegExp("^[A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd][A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd.0-9\u00b7\u0300-\u036f\u203f-\u2040-]*$"),
        Vd = function(a) {
            if (null != a && (a = String(a), a.match(Ud))) return a
        },
        Yd = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
            "\t": "&#x9;",
            "\n": "&#xA;",
            "\r": "&#xD;"
        },
        Zd = function(a) {
            return Yd[a] || a
        },
        $d = function(a) {
            return String(a).replace(/[<>&]/g, Zd)
        },
        ae = function(a) {
            return String(a).replace(/[<&"\t\n\r]/g, Zd)
        },
        be = {},
        ce;
    for (ce in Yd) be[Yd[ce]] = ce;
    var de = "&nbsp; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &shy; &reg; &macr; &deg; &plusmn; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml;".split(" "),
        ee = {},
        fe;
    for (fe in be) ee[fe] = be[fe];
    for (var ge = 0; ge < de.length; ++ge) ee[de[ge]] = String.fromCharCode(ge + 160);
    var he = function(a, b, c, d) {
        this.kc = a;
        this.Xa = 0;
        this.Mt = b;
        this.kt = c;
        this.$t = d ? ee : be;
        this.next = this.zh
    };
    g = he.prototype;
    g.Kp = function() {
        this.next = this.Kp;
        return null
    };
    g.Qc = function(a) {
        this.next = function() {
            throw this.Qc(a);
        };
        throw new ie(a);
    };
    g.up = function(a) {
        var b = this.$t;
        return a.replace(/&(#?)([^\s]+?);/g, function(a, d, e) {
            return d && (d = Number("0" + e), d === d) ? String.fromCharCode(d) : b[a] || a
        })
    };
    g.zh = function() {
        var a = this.kj("<"),
            b;
        0 > a ? (b = this.kc.substring(this.Xa), this.next = this.Kp) : (b = this.kc.substring(this.Xa, a), this.Xa = a, this.next = this.Ut);
        this.Mt && (b = b.trim());
        return b ? (b = this.up(b), {
            type: "text",
            value: b
        }) : this.next()
    };
    g.Ut = function() {
        var a = this.Dh("<![CDATA[", "]]\x3e", !1, "cdata");
        if (a || (a = this.Dh("\x3c!--", "--\x3e", !1, "comment")) || (a = this.Dh("<!DOCTYPE", ">", !0, "doctype")) || (a = this.Dh("<?XML", "?>", !0, "xml_declaration")) || !this.kt && (a = this.Dh("<?", "?>", !1, "processing_instruction"))) return a;
        if ("/" == this.kc.charAt(this.Xa + 1)) return this.next = this.zh, {
            type: "close",
            value: this.zt()
        };
        for (a = {
                type: "tag",
                value: this.At(),
                attributes: []
            };;) {
            this.$o();
            if (this.Ct()) throw this.Qc("tag");
            if (this.Il(">")) {
                this.next = this.zh;
                break
            }
            if (this.Il("/>")) {
                this.next =
                    this.Bt(a.value);
                break
            }
            a.attributes.push({
                name: this.xt(),
                value: this.yt()
            })
        }
        return a
    };
    g.Bt = function(a) {
        return function() {
            this.next = this.zh;
            return {
                type: "close",
                value: a
            }
        }
    };
    g.kj = function(a) {
        return this.kc.indexOf(a, this.Xa)
    };
    g.Ct = function() {
        return this.Xa >= this.kc.length
    };
    g.Il = function(a) {
        return this.kc.substr(this.Xa, a.length).toUpperCase() == a ? (this.Xa += a.length, !0) : !1
    };
    g.$o = function() {
        for (var a = this.kc; this.Xa < a.length; this.Xa++) switch (a.charAt(this.Xa)) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
                break;
            default:
                return
        }
    };
    g.Dh = function(a, b, c, d) {
        var e = this.Xa;
        if (!this.Il(a)) return null;
        a = this.kj(b);
        if (0 > a) throw this.Qc(d);
        c = c ? this.kc.substring(e, a + b.length) : this.kc.substring(this.Xa, a);
        this.Xa = a + b.length;
        this.next = this.zh;
        return {
            type: d,
            value: c
        }
    };
    g.At = function() {
        for (var a = this.kc, b = this.Xa + 1, c = b; c < a.length; c++) switch (a.charAt(c)) {
            case "/":
                if (">" != a.charAt(c + 1)) break;
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case ">":
                if (c == b) throw this.Qc("tag");
                this.Xa = c;
                return a.substring(b, c)
        }
        throw this.Qc("tag");
    };
    g.zt = function() {
        for (var a = this.kc, b = this.Xa + 2, c = !1, d = b; d < a.length; d++) switch (a.charAt(d)) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
                c = !0;
                break;
            case ">":
                if (d == b) throw this.Qc("close");
                this.Xa = d + 1;
                return a.substring(b, d).trim();
            default:
                if (c) throw this.Qc("close");
        }
        throw this.Qc("close");
    };
    g.xt = function() {
        var a = this.kj(">");
        if (0 > a) throw this.Qc("tag");
        var b = this.kj("="),
            c = this.Xa;
        if (0 > b || b == c || b > a) throw this.Qc("attribute");
        this.Xa = b + 1;
        return this.kc.substring(c, b).trim()
    };
    g.yt = function() {
        this.$o();
        var a = this.kc,
            b = this.Xa,
            c = a.charAt(b++);
        if ('"' == c || "'" == c)
            for (var d = b; d < a.length; d++)
                if (a.charAt(d) == c) return this.Xa = d + 1, this.up(a.substring(b, d));
        throw this.Qc("attribute");
    };
    var ie = function(a) {
        this.type = a
    };
    var je = function() {
        this.Da = !0;
        this.uc = this.Of = null
    };
    je.prototype.update = function() {
        return !1
    };
    je.prototype.Rf = function(a) {
        this.Of != a && (this.uc && this.uc.Ia(), this.Da = !0, this.uc = a.Nd(this), this.Of = a);
        return this.uc
    };
    var ke = [];
    je.prototype.Kb = function() {
        return new je
    };
    var le = function(a) {
        return (0, ke[a.type])(a)
    };
    je.prototype.lf = function() {
        return new $c(0, 0, 0, 0)
    };
    var ne = function(a, b, c, d) {
            var e = new $c;
            c = me(b, c);
            b = me(b, d);
            e.expand(3 * -c, 3 * -b);
            e.expand(3 * +c, 3 * +b);
            a.add(e)
        },
        oe = function(a, b, c) {
            a.expand(Math.cos(b) * c * 20, Math.sin(b) * c * 20)
        },
        pe = 3 * Math.sqrt(2 * Math.PI) / 4,
        me = function(a, b) {
            var c = 1;
            switch (a) {
                case 1:
                    c = 2 * pe;
                    break;
                case 2:
                    c = 1.5 * pe;
                    break;
                case 3:
                    c = pe
            }
            return Math.abs(20 * b / c)
        };
    var qe = function(a, b, c) {
        je.call(this);
        this.quality = a;
        this.x = b;
        this.y = c
    };
    q(qe, je);
    ke[2] = function(a) {
        return new qe(a.quality, a.x, a.y)
    };
    g = qe.prototype;
    g.Kb = function() {
        return new qe(this.quality, this.x, this.y)
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (this.Da = !0, this.x = a.x, this.y = a.y, this.quality = a.quality, !0) : !1
    };
    g.of = function() {
        return new re(this.x, this.y, this.quality)
    };
    g.pf = function() {
        return new se(this.x, this.y, this.quality)
    };
    g.lf = function() {
        var a = new $c(0, 0, 0, 0);
        ne(a, this.quality, this.x, this.y);
        return a
    };
    var te = function(a) {
        je.call(this);
        this.matrix = a;
        this.matrix[4] /= 255;
        this.matrix[9] /= 255;
        this.matrix[14] /= 255;
        this.matrix[19] /= 255
    };
    q(te, je);
    ke[3] = function(a) {
        return new te(a.matrix)
    };
    g = te.prototype;
    g.Kb = function() {
        return new te(this.Pm())
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (this.Da = !0, this.matrix = a.matrix, !0) : !1
    };
    g.of = function() {
        return new ue(this.Pm())
    };
    g.pf = function() {
        return new ve(this.Pm())
    };
    g.Pm = function() {
        var a = this.matrix.slice();
        a[4] *= 255;
        a[9] *= 255;
        a[14] *= 255;
        a[19] *= 255;
        return a
    };
    var we = function(a, b, c, d, e, f, h) {
        je.call(this);
        this.angle = a;
        this.distance = b;
        this.strength = c;
        this.quality = d;
        this.x = e;
        this.y = f;
        this.za = h
    };
    q(we, je);
    we.prototype.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (this.Da = !0, this.angle = a.angle, this.distance = a.distance, this.strength = a.strength, this.quality = a.quality, this.x = a.x, this.y = a.y, this.za = a.za, !0) : !1
    };
    var xe = {
            type: "inner",
            knockout: !1,
            sd: "source-atop"
        },
        ye = {
            type: "inner",
            knockout: !0,
            sd: "source-in"
        },
        Ae = [xe, ye, {
            type: "outer",
            knockout: !1,
            sd: "destination-over"
        }, {
            type: "outer",
            knockout: !0,
            sd: "source-out"
        }, {
            type: "full",
            knockout: !1,
            sd: "source-over"
        }, {
            type: "full",
            knockout: !0,
            sd: "copy"
        }],
        Ce = function(a, b, c) {
            return Be(b ? "inner" : a ? "full" : "outer", c)
        },
        Be = function(a, b) {
            for (var c = 0; c < Ae.length; ++c)
                if (a == Ae[c].type && !!b == Ae[c].knockout) return Ae[c];
            return b ? ye : xe
        };
    we.prototype.Gm = function(a, b) {
        var c = 20 * this.distance * b;
        a.Ad(Math.cos(this.angle) * c, Math.sin(this.angle) * c, this.quality * this.x * 10, this.quality * this.y * 10)
    };
    var De = function(a, b, c, d, e, f, h, l, n) {
        we.call(this, a, d, e, f, h, l, n);
        this.highlight = b;
        this.shadow = c
    };
    q(De, we);
    ke[4] = function(a) {
        return new De(a.angle, a.highlight, a.shadow, a.distance, a.strength, a.quality, a.x, a.y, Ce(a.onTop, a.inner, a.knockout))
    };
    g = De.prototype;
    g.Kb = function() {
        return new De(this.angle, this.highlight, this.shadow, this.distance, this.strength, this.quality, this.x, this.y, this.za)
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (De.oa.update.call(this, a), this.highlight = a.highlight, this.shadow = a.shadow, !0) : !1
    };
    g.of = function() {
        return new Ee(this.distance, 180 * this.angle / Math.PI, this.highlight & 16777215, (this.highlight >>> 24) / 255, this.shadow & 16777215, (this.shadow >>> 24) / 255, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.pf = function() {
        return new Fe(this.distance, 180 * this.angle / Math.PI, this.highlight & 16777215, (this.highlight >>> 24) / 255, this.shadow & 16777215, (this.shadow >>> 24) / 255, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.lf = function() {
        var a = new $c(0, 0, 0, 0);
        oe(a, this.angle, -this.distance);
        oe(a, this.angle, this.distance);
        ne(a, this.quality, this.x, this.y);
        return a
    };
    var Ge = function(a, b, c, d, e, f, h, l) {
        je.call(this);
        this.bias = a;
        this.clamp = b;
        this.color = c;
        this.divisor = d;
        this.matrix = e;
        this.matrixX = f;
        this.matrixY = h;
        this.preserveAlpha = l
    };
    q(Ge, je);
    ke[5] = function(a) {
        return new Ge(a.bias, a.clamp, a.color, a.divisor, a.matrix, a.matrixX, a.matrixY, a.preserveAlpha)
    };
    Ge.prototype.Kb = function() {
        return new Ge(this.bias, this.clamp, this.color, this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
    };
    Ge.prototype.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (this.Da = !0, this.bias = a.bias, this.clamp = a.clamp, this.color = a.color, this.divisor = a.divisor, this.matrix = a.matrix, this.matrixX = a.matrixX, this.matrixY = a.matrixY, this.preserveAlpha = a.preserveAlpha, !0) : !1
    };
    Ge.prototype.of = function() {
        return new He(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color & 16777215, (this.color >>> 24) / 255)
    };
    Ge.prototype.pf = function() {
        return new Ie(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color & 16777215, (this.color >>> 24) / 255)
    };
    var Je = function(a, b, c, d, e, f, h, l) {
        we.call(this, a, c, d, e, f, h, l);
        this.color = b
    };
    q(Je, we);
    var Ke = function(a, b, c) {
        return Be(b ? "inner" : a && !c ? "full" : "outer", c || a)
    };
    ke[1] = function(a) {
        return new Je(a.angle, a.color, a.distance, a.strength, a.quality, a.x, a.y, Ke(a.hideObject, a.inner, a.knockout))
    };
    g = Je.prototype;
    g.Kb = function() {
        return new Je(this.angle, this.color, this.distance, this.strength, this.quality, this.x, this.y, this.za)
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (Je.oa.update.call(this, a), this.color = a.color, !0) : !1
    };
    g.of = function() {
        return new Le(this.distance, 180 * this.angle / Math.PI, this.color & 16777215, (this.color >>> 24) / 255, this.x, this.y, this.strength, this.quality, "inner" == this.za.type, this.za.knockout && "outer" == this.za.type, this.za.knockout)
    };
    g.pf = function() {
        return new Me(this.distance, 180 * this.angle / Math.PI, this.color & 16777215, (this.color >>> 24) / 255, this.x, this.y, this.strength, this.quality, "inner" == this.za.type, this.za.knockout && "outer" == this.za.type, this.za.knockout)
    };
    g.lf = function() {
        var a = new $c(0, 0, 0, 0);
        oe(a, this.angle, this.distance);
        ne(a, this.quality, this.x, this.y);
        return a
    };
    var Ne = function(a, b, c, d, e, f, h, l, n, r) {
        we.call(this, a, e, f, h, l, n, r);
        this.gc = b;
        this.fc = c;
        this.hc = d
    };
    q(Ne, we);
    ke[7] = function(a) {
        for (var b = Oe(a.ratios), c = Oe(a.colors), d = Array(c.length), e = 0; e < c.length; ++e) d[e] = (c[e] >>> 24) / 255, c[e] &= 16777215;
        return new Ne(a.angle, c, d, b, a.distance, a.strength, a.quality, a.x, a.y, Ce(a.onTop, a.inner, a.knockout))
    };
    g = Ne.prototype;
    g.Kb = function() {
        return new Ne(this.angle, this.gc, this.fc, this.hc, this.distance, this.strength, this.quality, this.x, this.y, this.za)
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (Ne.oa.update.call(this, a), this.gc = a.gc, this.fc = a.fc, this.hc = a.hc, !0) : !1
    };
    g.of = function() {
        return new Pe(this.distance, 180 * this.angle / Math.PI, this.gc, this.fc, this.hc, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.pf = function() {
        return new Qe(this.distance, 180 * this.angle / Math.PI, this.gc, this.fc, this.hc, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.lf = function() {
        var a = new $c(0, 0, 0, 0);
        this.Gm(a, 1);
        this.Gm(a, -1);
        return a
    };
    var Re = function(a, b, c, d, e, f, h, l, n, r) {
        we.call(this, a, e, f, h, l, n, r);
        this.gc = b;
        this.fc = c;
        this.hc = d
    };
    q(Re, we);
    ke[6] = function(a) {
        for (var b = Oe(a.ratios), c = Oe(a.colors), d = Array(c.length), e = 0; e < c.length; ++e) d[e] = (c[e] >>> 24) / 255, c[e] &= 16777215;
        return new Re(a.angle, c, d, b, a.distance, a.strength, a.quality, a.x, a.y, Ce(a.onTop, a.inner, a.knockout))
    };
    g = Re.prototype;
    g.Kb = function() {
        return new Re(this.angle, this.gc, this.fc, this.hc, this.distance, this.strength, this.quality, this.x, this.y, this.za)
    };
    g.update = function(a) {
        return Object.getPrototypeOf(this) == Object.getPrototypeOf(a) ? (Re.oa.update.call(this, a), this.gc = a.gc, this.fc = a.fc, this.hc = a.hc, !0) : !1
    };
    g.of = function() {
        return new Se(this.distance, 180 * this.angle / Math.PI, this.gc, this.fc, this.hc, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.pf = function() {
        return new Te(this.distance, 180 * this.angle / Math.PI, this.gc, this.fc, this.hc, this.x, this.y, this.strength, this.quality, this.za.type, this.za.knockout)
    };
    g.lf = function() {
        var a = new $c(0, 0, 0, 0);
        this.Gm(a, 1);
        return a
    };
    var Ue = function() {
        je.call(this)
    };
    q(Ue, je);
    ke[0] = function(a) {
        return new Ue(a)
    };
    Ue.prototype.lf = function() {
        return new $c(0, 0, 0, 0)
    };
    Ue.prototype.Kb = function() {
        return this
    };
    var Ve = function(a) {
        this.wc = this.he = this.Va = null;
        this.cg = 0;
        this.$ = a || null;
        this.th = []
    };
    g = Ve.prototype;
    g.Qj = function(a) {
        if (!this.Va || this.Va.depth > a) return this.wc = null;
        var b = this.Va;
        this.wc && a >= this.wc.depth && (b = this.wc);
        for (; b.nextSibling && !(b.nextSibling.depth >= a);) b = b.nextSibling;
        b.nextSibling && b.nextSibling.depth == a && (b = b.nextSibling);
        return this.wc = b
    };
    g.gj = function(a, b) {
        this.Fq(a, this.Qj(b));
        a.depth = b
    };
    g.Fq = function(a, b) {
        b ? (b.nextSibling ? b.nextSibling.tc = a : this.he = a, a.tc = b, a.nextSibling = b.nextSibling, b.nextSibling = a) : (this.Va && (this.Va.tc = a, a.nextSibling = this.Va), this.Va = a, this.he || (this.he = a));
        a.Xc || ++this.cg
    };
    g.tg = function(a) {
        this.wc === a && (this.wc = this.wc.nextSibling);
        a.tc ? a.tc.nextSibling = a.nextSibling : this.Va = a.nextSibling;
        a.nextSibling ? a.nextSibling.tc = a.tc : this.he = a.tc;
        a.nextSibling = null;
        a.tc = null;
        a.depth = void 0;
        a.Xc || --this.cg
    };
    g.uk = function(a, b) {
        this.gj(a, b);
        We(this.$, a)
    };
    g.pn = function(a) {
        return (a = this.Cc(a)) ? this.ol(a) : null
    };
    g.ol = function(a) {
        this.tg(a);
        a.Qu(5) ? this.th.push(a) : this.am(a);
        return a
    };
    g.ws = function(a) {
        for (var b = this.Va; b;) {
            var c = b,
                b = b.nextSibling;
            c.Xc || a(c) || this.ol(c)
        }
    };
    g.Cc = function(a) {
        var b = this.Qj(a);
        return b && b.depth == a ? b : null
    };
    g.forEach = function(a) {
        for (var b = this.Va; b;) {
            if (a(b)) return !0;
            b = b.nextSibling
        }
        return !1
    };
    g.uu = function(a) {
        for (var b = this.he; b;) {
            if (a(b)) return !0;
            b = b.tc
        }
        return !1
    };
    g.gq = function(a) {
        for (var b = this.Va; b;) {
            if (b.getName() == a) return b;
            b = b.nextSibling
        }
        return null
    };
    g.nu = function() {
        return this.he ? Math.max(0, this.he.depth + 1) : 0
    };
    g.am = function(a) {
        Xe(this.$, a);
        a.Ia();
        a.depth = void 0
    };
    g.Ia = function() {
        for (; this.Va;) {
            var a = this.Va;
            this.tg(a);
            this.am(a)
        }
    };
    g.Ud = function() {
        for (var a = this.Va; a;) a.Ud(), a = a.nextSibling
    };
    g.bu = function() {
        if (0 < this.th.length) {
            for (var a = 0; a < this.th.length; a++) this.am(this.th[a]);
            this.th = []
        }
    };
    g.vs = function(a) {
        this.$ = a.$;
        for (a = this.Va; a;) We(this.$, a), a = a.nextSibling
    };
    g.Rl = function(a, b) {
        this.$ && (Xe(this.$, a), b && We(this.$, a, b))
    };
    g.Ml = function(a, b) {
        b < a && (b = a = b);
        var c = this.Qj(a),
            d = this.Qj(b);
        c && c.depth == a ? this.tg(c) : c = null;
        d && d.depth == b ? this.tg(d) : d = null;
        c && this.gj(c, b);
        d && this.gj(d, a)
    };
    g.Zs = function(a) {
        var b = Math.min(-16384, this.Va.depth) - 1;
        this.tg(a);
        this.gj(a, b)
    };
    g.yj = function() {
        return this.cg
    };
    g.Ye = function(a) {
        if (0 > a || a >= this.cg) return null;
        if (a <= this.cg - a) {
            for (var b = this.Va; 1 <= a;) b = b.nextSibling, b.Xc || --a;
            for (; b.Xc;) b = b.nextSibling
        } else {
            b = this.he;
            for (a = this.cg - 1 - a; 1 <= a;) b = b.tc, b.Xc || --a;
            for (; b.Xc;) b = b.tc
        }
        return b
    };
    g.yg = function(a) {
        for (var b = 0, c = this.Va; c; c = c.nextSibling) {
            if (c == a) return b;
            c.Xc || ++b
        }
    };
    g.Te = function(a, b) {
        var c = this.Ye(b - 1);
        a.depth = NaN;
        this.Fq(a, c)
    };
    g.hh = function(a) {
        this.tg(a)
    };
    var We = function(a, b, c) {
            if (a && (c = k(c) ? c : b.getName())) {
                var d = b.c.ha();
                b = b.La() ? b.$ : a;
                d.Rn(a, c, b)
            }
        },
        Xe = function(a, b) {
            if (a) {
                var c = b.getName();
                if (c) {
                    var d = b.c.ha(),
                        e = b.La() ? b.$ : a;
                    d.Sn(a, c, e)
                }
            }
        };
    Ve.prototype.Hb = function() {
        for (var a = this.Va; a;) {
            if (!a.Hb()) return !1;
            a = a.nextSibling
        }
        return !0
    };
    var Ye = function() {
            return !0
        },
        af = function(a, b, c, d) {
            var e = Ze.c.ul();
            if (!e) return !1;
            var f = e[a];
            if (!f || f.__swiffy_external) c ? (f = function() {
                try {
                    var a = Ga(arguments, $e),
                        e = c.apply(b, a);
                    return $e(e)
                } catch (f) {
                    return d ? d(f) : null
                }
            }, Object.defineProperty(f, "__swiffy_external", {
                value: !0
            }), e[a] = f) : delete e[a];
            return !0
        },
        cf = function(a, b, c) {
            var d = (a = a.ul()) && a.id;
            d && bf(function() {
                window[d + "_DoFSCommand"](b, c)
            })
        },
        ef = function(a, b, c) {
            if (Ze.c.ul()) {
                var d = df(b);
                return bf(function() {
                    var b = Function("return (" + a + ")(" + d + ");")();
                    return $e(b)
                }, c)
            }
        },
        bf = function(a, b) {
            try {
                return a()
            } catch (c) {
                if (b) return b(c)
            }
        },
        df = function(a) {
            a = a.map(ff);
            return a.join(",")
        },
        ff = function(a) {
            switch (ca(a)) {
                case "undefined":
                case "null":
                case "boolean":
                case "number":
                    return String(a);
                case "string":
                    return Ba(a);
                case "array":
                    return "[" + df(a) + "]";
                case "object":
                    if (a instanceof Date) return "new Date(" + a.getTime() + ")";
                    var b = [],
                        c;
                    for (c in a) b.push(Ba(c) + ":" + ff(a[c]));
                    return "{" + b.join(",") + "}";
                default:
                    return "null"
            }
        },
        $e = function(a) {
            switch (ca(a)) {
                case "undefined":
                case "null":
                case "boolean":
                case "number":
                case "string":
                    return a;
                case "array":
                    return Ga(a, $e);
                case "object":
                    if (a instanceof Date) a = new Date(a.getTime());
                    else {
                        var b = $e,
                            c = {},
                            d;
                        for (d in a) c[d] = b.call(void 0, a[d], d, a);
                        a = c
                    }
                    return a;
                default:
                    return null
            }
        };
    var gf = function(a) {
        this.De = a || null;
        this.rq = this.vd = "";
        this.dn = {};
        this.hq = this.content = null
    };
    gf.prototype.pw = function() {
        return this.rq || this.vd
    };
    gf.prototype.Ku = function(a) {
        this.rq = a
    };
    gf.prototype.Ef = function(a) {
        this.vd = a
    };
    var v = function(a) {
            return a.__swiffy_v
        },
        hf = function(a, b) {
            Object.defineProperty(a, "__swiffy_v", {
                value: b
            })
        };
    var jf = function(a, b, c) {
        this.c = a;
        this.definition = b;
        this.$ = c || this.Ja();
        this.$.__swiffy_d = this;
        this.$.__swiffy_child_ref = {}
    };
    jf.prototype.Ea = function(a, b) {
        this.c.ha().yo(this, a, b)
    };
    jf.prototype.ah = function() {};
    jf.prototype.Xf = function() {};
    var w = function(a) {
        return a.__swiffy_d
    };
    var kf = function() {
            this.color = this.bold = this.qb = null;
            this.Se = !1;
            this.letterSpacing = this.nc = this.leading = this.leftMargin = this.rightMargin = this.indent = this.target = this.url = this.Bp = this.zp = this.Ob = this.yp = this.size = this.italic = this.font = null
        },
        lf = function() {
            var a = new kf;
            a.bold = !1;
            a.italic = !1;
            a.Ob = !1;
            a.font = "_serif";
            a.color = 0;
            a.size = 240;
            a.indent = 0;
            a.rightMargin = 0;
            a.leftMargin = 0;
            a.leading = 0;
            a.qb = 0;
            a.nc = !1;
            a.letterSpacing = 0;
            return a
        },
        nf = function(a) {
            var b = lf(),
                c = a.font && a.font.get();
            c instanceof mf && (b.font =
                c);
            k(a.color) && (b.color = 16777215 & a.color);
            k(a.height) && (b.size = a.height);
            k(a.indent) && (b.indent = a.indent);
            k(a.align) && (b.qb = a.align);
            k(a.leftMargin) && (b.leftMargin = a.leftMargin);
            k(a.rightMargin) && (b.rightMargin = a.rightMargin);
            k(a.leading) && (b.leading = a.leading);
            return b
        },
        of = function(a) {
            var b = new kf;
            b.color = a;
            b.Se = !0;
            return b
        };
    g = kf.prototype;
    g.mh = function(a) {
        this.Se = a.Se;
        null != a.color && (this.color = a.color, this.Se = !0);
        this.bold = null != a.bold ? a.bold : this.bold;
        this.font = null != a.font ? a.font : this.font;
        this.italic = null != a.italic ? a.italic : this.italic;
        this.size = null != a.size ? a.size : this.size;
        this.Ob = null != a.Ob ? a.Ob : this.Ob;
        this.qb = null != a.qb ? a.qb : this.qb;
        this.target = null != a.target ? a.target : this.target;
        this.url = null != a.url ? a.url : this.url;
        this.indent = null != a.indent ? a.indent : this.indent;
        this.rightMargin = null != a.rightMargin ? a.rightMargin : this.rightMargin;
        this.leftMargin = null != a.leftMargin ? a.leftMargin : this.leftMargin;
        this.leading = null != a.leading ? a.leading : this.leading;
        this.nc = null != a.nc ? a.nc : this.nc;
        this.letterSpacing = null != a.letterSpacing ? a.letterSpacing : this.letterSpacing
    };
    g.ph = function() {
        return !!this.font && this.font instanceof mf
    };
    g.sl = function() {
        return !!this.font && this.font instanceof mf && (0 < this.font.glyphs.length || this.font == pf)
    };
    g.Ws = function() {
        return this.font instanceof mf && (0 < this.font.glyphs.length || this.font == pf) ? this.font : null
    };
    g.clone = function() {
        var a = new kf;
        a.bold = this.bold;
        a.color = this.color;
        a.font = this.font;
        a.italic = this.italic;
        a.size = this.size;
        a.Ob = this.Ob;
        a.Se = this.Se;
        a.qb = this.qb;
        a.url = this.url;
        a.target = this.target;
        a.indent = this.indent;
        a.rightMargin = this.rightMargin;
        a.leftMargin = this.leftMargin;
        a.leading = this.leading;
        a.nc = this.nc;
        a.letterSpacing = this.letterSpacing;
        return a
    };
    g.cu = function(a) {
        this.bold = this.bold == a.bold ? this.bold : null;
        this.color = this.color == a.color ? this.color : null;
        this.font = this.font == a.font ? this.font : null;
        this.italic = this.italic == a.italic ? this.italic : null;
        this.size = this.size == a.size ? this.size : null;
        this.Ob = this.Ob == a.Ob ? this.Ob : null;
        this.qb = this.qb == a.qb ? this.qb : null;
        this.url = this.url == a.url ? this.url : null;
        this.target = this.target == a.target ? this.target : null;
        this.nc = this.nc == a.nc ? this.nc : null;
        this.indent = this.indent == a.indent ? this.indent : null;
        this.rightMargin =
            this.rightMargin == a.rightMargin ? this.rightMargin : null;
        this.leftMargin = this.leftMargin == a.leftMargin ? this.leftMargin : null;
        this.leading = this.leading == a.leading ? this.leading : null;
        this.letterSpacing = this.letterSpacing == a.letterSpacing ? this.letterSpacing : null
    };
    var qf = {
        _sans: "Arial, Helvetica, sans-serif",
        _serif: "Times, serif",
        _typewriter: "monospace"
    };
    kf.prototype.wb = function(a) {
        var b = "";
        this.bold && (b += "bold ");
        this.italic && (b += "italic ");
        var c = this.font instanceof mf ? this.font.name : this.font;
        a.font = b + this.size + "px " + (qf[c] || '"' + c + '", sans-serif')
    };
    var rf = function(a) {
            if (null == a) return null;
            a = Math.round(Number(a));
            a != a && (a = -2147483648);
            return 20 * a
        },
        sf = function(a) {
            return null == a ? null : a / 20
        },
        tf = function(a) {
            if (null == a) return null;
            switch (String(a)) {
                case "left":
                    return 0;
                case "center":
                    return 2;
                case "right":
                    return 1;
                case "justify":
                    return 3
            }
        },
        uf = function() {
            switch (v(this).qb) {
                case 0:
                    return "left";
                case 2:
                    return "center";
                case 1:
                    return "right";
                case 3:
                    return "justify";
                default:
                    return null
            }
        },
        vf = function(a) {
            a = tf(a);
            if (!k(a)) return !1;
            v(this).qb = a;
            return !0
        },
        wf = function() {
            return sf(v(this).yp)
        },
        xf = function(a) {
            v(this).yp = rf(a)
        },
        yf = function() {
            return v(this).bold
        },
        zf = function(a) {
            v(this).bold = null == a ? null : !!a
        },
        Af = function() {
            return v(this).zp
        },
        Bf = function(a) {
            v(this).zp = null == a ? null : !!a
        },
        Cf = function() {
            var a = v(this).color;
            return null == a ? null : a & 16777215
        },
        Df = function(a) {
            v(this).color = null == a ? null : Number(a) & 16777215
        },
        If = function() {
            var a = v(this).font;
            a instanceof mf && (a = a.name);
            return a
        },
        Jf = function(a) {
            v(this).font = null == a ? null : String(a)
        },
        Kf = function() {
            return sf(v(this).indent)
        },
        Lf = function(a) {
            v(this).indent =
                rf(a)
        },
        Mf = function() {
            return v(this).italic
        },
        Nf = function(a) {
            v(this).italic = null == a ? null : !!a
        },
        Of = function() {
            return v(this).nc
        },
        Pf = function(a) {
            v(this).nc = null == a ? null : !!a
        },
        Qf = function() {
            return sf(v(this).leading)
        },
        Rf = function(a) {
            v(this).leading = rf(a)
        },
        Sf = function() {
            return sf(v(this).leftMargin)
        },
        Tf = function(a) {
            v(this).leftMargin = rf(a)
        },
        Uf = function() {
            return sf(v(this).letterSpacing)
        },
        Vf = function(a) {
            null == a ? a = null : (a = Number(a), a != a && (a = -2147483648), a *= 20);
            v(this).letterSpacing = a
        },
        Wf = function() {
            return sf(v(this).rightMargin)
        },
        Xf = function(a) {
            v(this).rightMargin = rf(a)
        },
        Yf = function() {
            return sf(v(this).size)
        },
        Zf = function(a) {
            v(this).size = rf(a)
        },
        $f = function() {
            return v(this).target
        },
        ag = function(a) {
            v(this).target = null == a ? null : String(a)
        },
        bg = function() {
            var a = v(this).Bp;
            return a && a.map(sf)
        },
        cg = function(a) {
            var b = null;
            if (a && a.length)
                for (var b = [], c = 0; c < a.length; ++c) b.push(rf(a[c]) | 0);
            v(this).Bp = b
        },
        dg = function() {
            return v(this).Ob
        },
        eg = function(a) {
            v(this).Ob = null == a ? null : !!a
        },
        fg = function() {
            return v(this).url
        },
        gg = function(a) {
            v(this).url =
                null == a ? null : String(a)
        };
    var hg = function() {
        this.$j = [];
        this.Uq = null
    };
    hg.prototype.Nd = function(a) {
        return new(this.$j[ig(a.constructor)])(a)
    };
    hg.prototype.cs = function(a) {
        return new this.Uq(a)
    };
    hg.prototype.fa = function(a, b) {
        this.$j[ig(a)] = b
    };
    hg.prototype.ur = function(a) {
        this.Uq = a
    };
    var jg = [],
        ig = function(a) {
            k(a.vr) || (a.vr = jg.length, jg.push(a));
            return a.vr
        },
        kg = function(a) {
            hg.call(this, a)
        };
    q(kg, hg);
    kg.prototype.Nd = function(a) {
        return this.$j[ig(a.constructor)]
    };
    kg.prototype.fa = function(a, b) {
        this.$j[ig(a)] = new b(null)
    };
    var lg = function(a) {
        this.Tu = a;
        this.Wh = {};
        this.Jj = this.om = 0
    };
    lg.prototype.ub = function(a) {
        if (a = this.Wh[a]) a.cm = this.Jj;
        return a
    };
    lg.prototype.Tr = function() {
        return this.om < this.Tu
    };
    lg.prototype.add = function(a, b) {
        this.Wh[a] = b;
        this.om++;
        b.cm = this.Jj
    };
    lg.prototype.Lr = function() {
        for (var a in this.Wh) 6 < this.Jj - this.Wh[a].cm && (delete this.Wh[a], this.om--);
        this.Jj++
    };
    var mg = function(a, b, c) {
        this.Wg = a;
        this.us = b;
        this.hi = c;
        this.cm = 0
    };
    var ng = new kg("canvas");
    ba("swiffy.CANVAS", ng, void 0);
    var pg = function(a) {
        var b = ng;
        a.ae() && (b = og);
        return a.Rf(b)
    };
    var qg = function(a, b, c, d, e, f) {
        this.Na = Uc(d || 1, 0, 0, e || 1, -(b || 0), -(c || 0));
        this.hb = a.getContext("2d");
        this.hb.fillStyle = "rgb(0,0,0)";
        this.Ll = f || null;
        this.Kl = null
    };
    g = qg.prototype;
    g.Hf = function(a) {
        var b = this.Na;
        this.hb.setTransform(a.l * b.l + a.o * b.m, a.l * b.o + a.o * b.k, a.m * b.l + a.k * b.m, a.m * b.o + a.k * b.k, a.p * b.l + a.q * b.m + b.p, a.p * b.o + a.q * b.k + b.q);
        return this.hb
    };
    g.Vr = function() {
        this.hb.setTransform(1, 0, 0, 1, 0, 0);
        return this.hb
    };
    g.Zm = function(a) {
        return a.multiply(this.Na)
    };
    g.clear = function(a) {
        var b = this.hb;
        b.setTransform(1, 0, 0, 1, 0, 0);
        a ? (b.globalCompositeOperation = "copy", b.fillStyle = a, b.fillRect(0, 0, b.canvas.width, b.canvas.height), b.globalCompositeOperation = "source-over") : b.clearRect(0, 0, b.canvas.width, b.canvas.height)
    };
    g.Fa = function() {
        return this.hb.canvas.width
    };
    g.Ta = function() {
        return this.hb.canvas.height
    };
    g.Rg = function() {
        var a = this.xe();
        return new $c(0, 0, a.width, a.height)
    };
    g.xe = function() {
        return this.hb.canvas
    };
    g.Ic = function() {
        return -this.Na.p
    };
    g.Jc = function() {
        return -this.Na.q
    };
    g.Po = function(a, b) {
        var c = this.sk(a, b);
        return this.Ug(c)
    };
    g.Oo = function() {
        var a = this.Ll,
            b = this.Ug(this.Rg());
        b.Kl = a;
        return b
    };
    g.yl = function() {
        var a = this.Kl;
        this.Oi(this.Ll, 1);
        a.Xd(this);
        return a
    };
    g.Ug = function(a, b) {
        var c = a.width(),
            d = a.height();
        if (0 >= c || 0 >= d) c = d = 1, a = new $c(this.Ic() - 1, this.Jc() - 1, this.Ic(), this.Jc());
        var e = b;
        e ? (e.width = c, e.height = d) : e = rg(c, d);
        return new qg(e, a.j + this.Ic(), a.i + this.Jc(), this.Na.l, this.Na.k, this)
    };
    g.sk = function(a, b, c) {
        if (a) {
            a = a.clone();
            var d = this.Na;
            b && (d = b.multiply(d));
            a.na(d);
            b = this.Rg();
            c && (c = c.clone(), c.scale(this.Na.l, this.Na.k), b.add(c.zs()));
            a.mk(b);
            a.pk()
        } else a = this.Rg();
        return a
    };
    g.Gs = function(a, b) {
        return a.width() == this.Fa() && a.height() == this.Ta() && a.j + b.Ic() == this.Ic() && a.i + b.Jc() == this.Jc()
    };
    g.Xd = function(a) {
        var b = this.hb;
        b.setTransform(1, 0, 0, 1, 0, 0);
        b.drawImage(a.xe(), a.Ic() - this.Ic(), a.Jc() - this.Jc())
    };
    g.Es = function(a, b, c) {
        if (100 != b) {
            var d = this.Kl;
            if (1 >= b || !d) this.Sp(a, b, c);
            else {
                var e = this.hb,
                    f = this.Ll;
                this.Oi(f, 1);
                d.Xd(this);
                e.globalCompositeOperation = "copy";
                this.Xd(a);
                this.Oi(f, 1);
                d.Sp(this, b, c);
                this.clear();
                e.globalCompositeOperation = "source-over"
            }
        }
    };
    g.Oi = function(a, b) {
        var c = this.hb;
        c.globalAlpha = b;
        c.globalCompositeOperation = "destination-in";
        this.Xd(a);
        c.globalAlpha = 1;
        c.globalCompositeOperation = "source-over"
    };
    g.Sp = function(a, b, c) {
        var d = this.hb,
            e = sg(b);
        d.globalAlpha = c;
        d.globalCompositeOperation = e;
        d.globalCompositeOperation == e ? (this.Xd(a), d.globalCompositeOperation = "source-over") : this.ru(a, b);
        d.globalAlpha = 1
    };
    g.ru = function(a, b) {
        var c = a.Rg(),
            d = a.Ic() - this.Ic(),
            e = a.Jc() - this.Jc();
        c.translate(d, e);
        c.mk(this.Rg());
        var d = c.j,
            e = c.i,
            f = c.width(),
            h = c.height();
        if (!(0 >= f || 0 >= h)) {
            var c = this.hb,
                l = c.getImageData(d, e, f, h),
                n = l.data,
                r = tg[b];
            if (r) {
                for (var l = a.hb.getImageData(d - (a.Ic() - this.Ic()), e - (a.Jc() - this.Jc()), f, h), t = l.data, p = t.length, s = 0; s < p; s += 4) {
                    var u = n[s + 3] / 255;
                    t[s + 0] = r(t[s + 0], n[s + 0]) * u + t[s + 0] * (1 - u);
                    t[s + 1] = r(t[s + 1], n[s + 1]) * u + t[s + 1] * (1 - u);
                    t[s + 2] = r(t[s + 2], n[s + 2]) * u + t[s + 2] * (1 - u)
                }
                f = rg(f, h);
                Rd(f.getContext("2d"), l,
                    0, 0);
                c.setTransform(1, 0, 0, 1, 0, 0);
                c.drawImage(f, d, e)
            } else c.putImageData(c.createImageData(f, h), d, e), this.Xd(a), f = c.getImageData(d, e, f, h).data, ug(f, n, b), Rd(c, l, d, e)
        }
    };
    var sg = function(a) {
        switch (a) {
            case 2:
            case 4:
            case 5:
            case 3:
            case 12:
            case 6:
                return Nc[a];
            case 13:
                return "hard-light";
            case 7:
                return "lighter";
            case 10:
                return "destination-in";
            case 11:
                return "destination-out";
            case 8:
            case 9:
                return "";
            default:
                return "source-over"
        }
    };
    g = qg.prototype;
    g.getImageData = function() {
        var a = this.hb;
        return a.getImageData(0, 0, a.canvas.width, a.canvas.height)
    };
    g.createImageData = function() {
        var a = this.hb;
        return a.createImageData(a.canvas.width, a.canvas.height)
    };
    g.putImageData = function(a) {
        Rd(this.hb, a, 0, 0)
    };
    g.ys = function(a) {
        this.hb.putImageData(a, 0, 0)
    };
    g.ti = function(a, b) {
        var c = this.hb;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.globalCompositeOperation = b;
        c.drawImage(a, 0, 0);
        c.globalCompositeOperation = "source-over"
    };
    g.yn = function(a, b) {
        b = b.multiply(this.Na);
        b.Ql() && (a.na(b), a.pp(), a.na(b.Rd()))
    };
    g.ks = function(a, b, c, d) {
        b = b.clone();
        var e = this.Na;
        b.na(c.multiply(e));
        if (!(0 >= b.width() || 0 >= b.height())) {
            a = a.clone();
            a.na(c);
            c = b.width() / a.width();
            var f = b.height() / a.height();
            this.Na = Uc(c, 0, 0, f, -(a.j * c - b.j), -(a.i * f - b.i));
            b.pk();
            a = this.hb;
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.beginPath();
            a.rect(b.j, b.i, b.width(), b.height());
            a.clip();
            d(this);
            a.restore();
            this.Na = e
        }
    };
    var vg = function(a, b, c) {
            for (var d = a.length, e = 0; e < d; e += 4) {
                var f = a[e + 3],
                    h = b[e + 3];
                b[e + 3] = f + h - f * h / 255;
                var l = 1 / (255 * b[e + 3]);
                b[e + 0] = l * (c(a[e + 0], b[e + 0]) * f * h + a[e + 0] * f * (255 - h) + b[e + 0] * h * (255 - f));
                b[e + 1] = l * (c(a[e + 1], b[e + 1]) * f * h + a[e + 1] * f * (255 - h) + b[e + 1] * h * (255 - f));
                b[e + 2] = l * (c(a[e + 2], b[e + 2]) * f * h + a[e + 2] * f * (255 - h) + b[e + 2] * h * (255 - f))
            }
        },
        wg = function(a, b, c) {
            for (var d = a.length, e = 0; e < d; e += 4) {
                var f = a[e + 3],
                    h = b[e + 3];
                if (0 < h) {
                    var l = Math.min(255, f + h | 0);
                    b[e + 3] = l;
                    l = 1 / l;
                    f *= c;
                    b[e + 0] = (b[e + 0] * h + a[e + 0] * f) * l;
                    b[e + 1] = (b[e + 1] * h + a[e + 1] * f) *
                        l;
                    b[e + 2] = (b[e + 2] * h + a[e + 2] * f) * l
                } else b[e + 0] = a[e + 0], b[e + 1] = a[e + 1], b[e + 2] = a[e + 2], b[e + 3] = f
            }
        },
        xg = function(a, b) {
            for (var c = a.length, d = 0; d < c; d += 4) {
                var e = a[d + 3];
                0 < b[d + 3] ? (b[d + 0] = b[d + 0] * (1 - 2 / 255 * e) + e, b[d + 1] = b[d + 1] * (1 - 2 / 255 * e) + e, b[d + 2] = b[d + 2] * (1 - 2 / 255 * e) + e) : (b[d + 0] = a[d + 0], b[d + 1] = a[d + 1], b[d + 2] = a[d + 2], b[d + 3] = e)
            }
        },
        tg = [, , function(a, b) {
            return a * b / 255
        }, function(a, b) {
            return a + b - a * b / 255
        }];
    tg[5] = Math.min;
    tg[4] = Math.max;
    tg[13] = function(a, b) {
        return 127 >= a ? 2 * a * b / 255 : 2 * (a + b - a * b / 255) - 255
    };
    tg[12] = function(a, b) {
        return 127 >= b ? 2 * b * a / 255 : 2 * (b + a - b * a / 255) - 255
    };
    tg[6] = function(a, b) {
        return Math.abs(a - b)
    };
    var ug = function(a, b, c) {
        var d = tg[c];
        if (!d) switch (d = 1, c) {
            case 8:
                d = -1;
            case 7:
                wg(a, b, d);
                return;
            case 9:
                xg(a, b);
                return;
            default:
                d = function(a) {
                    return a
                }
        }
        vg(a, b, d)
    };
    var yg = function() {};
    ng.fa(Ue, yg);
    yg.prototype.apply = function() {};
    yg.prototype.Ia = function() {};
    var zg = function(a, b) {
        for (var c = a.length, d = b.xa, e = b.sa, f = b.wa, h = b.qa, l = b.va, n = b.pa, r = b.ua, t = b.ta, p = 0; p < c; p += 4) a[p + 3] && (a[p + 0] = a[p + 0] * d + e, a[p + 1] = a[p + 1] * f + h, a[p + 2] = a[p + 2] * l + n, a[p + 3] = a[p + 3] * r + t)
    };
    var Ag = function() {};
    q(Ag, yg);
    ng.fa(qe, Ag);
    var Bg = function(a, b, c, d, e, f, h, l, n) {
            for (var r = 0, t = 0; t < n; ++t) {
                for (var p = 0, s = 0, u = 0, y = 0, x = t * l * 4, C = x, E = 0; E < h; ++E) s += a[C + 0], u += a[C + 1], y += a[C + 2], p += a[C + 3], C += 4;
                for (var D = r, E = 0; E < f; ++E) b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, E + h < l && (s += a[C + 0], u += a[C + 1], y += a[C + 2], p += a[C + 3], C += 4), D += c;
                for (; E + h + 4 <= l; E += 4) b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, D += c, s += a[C + 0] - a[x + 0], u += a[C + 1] - a[x + 1], y += a[C + 2] - a[x + 2], p += a[C + 3] - a[x + 3], b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, D += c, s += a[C + 4] - a[x + 4], u += a[C + 5] - a[x + 5], y +=
                    a[C + 6] - a[x + 6], p += a[C + 7] - a[x + 7], b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, D += c, s += a[C + 8] - a[x + 8], u += a[C + 9] - a[x + 9], y += a[C + 10] - a[x + 10], p += a[C + 11] - a[x + 11], b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, D += c, s += a[C + 12] - a[x + 12], u += a[C + 13] - a[x + 13], y += a[C + 14] - a[x + 14], p += a[C + 15] - a[x + 15], x += 16, C += 16;
                for (; E + h < l; ++E) b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, s += a[C + 0] - a[x + 0], u += a[C + 1] - a[x + 1], y += a[C + 2] - a[x + 2], p += a[C + 3] - a[x + 3], x += 4, C += 4, D += c;
                for (; E < l; ++E) b[D + 0] = s * e, b[D + 1] = u * e, b[D + 2] = y * e, b[D + 3] = p * e, s -= a[x + 0], u -=
                    a[x + 1], y -= a[x + 2], p -= a[x + 3], x += 4, D += c;
                r += d
            }
        },
        Cg = function(a, b, c, d, e, f, h, l, n) {
            var r = 0;
            e /= 255;
            for (var t = 0; t < n; ++t) {
                for (var p = 0, s = 0, u = 0, y = 0, x = t * l * 4, C = x, E, D = 0; D < h; ++D) E = a[C + 3], s += a[C + 0] * E, u += a[C + 1] * E, y += a[C + 2] * E, p += 255 * E, C += 4;
                for (var H = r, D = 0; D < f; ++D) b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, D + h < l && (E = a[C + 3], s += a[C + 0] * E, u += a[C + 1] * E, y += a[C + 2] * E, p += 255 * E, C += 4), H += c;
                for (; D + h + 4 <= l; D += 4) b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, H += c, E = a[C + 3], s += a[C + 0] * E, u += a[C + 1] * E, y += a[C + 2] * E, p += 255 * E, E = a[x + 3], s -= a[x + 0] *
                    E, u -= a[x + 1] * E, y -= a[x + 2] * E, p -= 255 * E, b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, H += c, E = a[C + 7], s += a[C + 4] * E, u += a[C + 5] * E, y += a[C + 6] * E, p += 255 * E, E = a[x + 7], s -= a[x + 4] * E, u -= a[x + 5] * E, y -= a[x + 6] * E, p -= 255 * E, b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, H += c, E = a[C + 11], s += a[C + 8] * E, u += a[C + 9] * E, y += a[C + 10] * E, p += 255 * E, E = a[x + 11], s -= a[x + 8] * E, u -= a[x + 9] * E, y -= a[x + 10] * E, p -= 255 * E, b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, H += c, E = a[C + 15], s += a[C + 12] * E, u += a[C + 13] * E, y += a[C + 14] * E, p += 255 * E, E = a[x + 15], s -= a[x + 12] * E, u -= a[x + 13] * E, y -= a[x +
                        14] * E, p -= 255 * E, x += 16, C += 16;
                for (; D + h < l; ++D) b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, E = a[C + 3], s += a[C + 0] * E, u += a[C + 1] * E, y += a[C + 2] * E, p += 255 * E, E = a[x + 3], s -= a[x + 0] * E, u -= a[x + 1] * E, y -= a[x + 2] * E, p -= 255 * E, x += 4, C += 4, H += c;
                for (; D < l; ++D) b[H + 0] = s * e, b[H + 1] = u * e, b[H + 2] = y * e, b[H + 3] = p * e, E = a[x + 3], s -= a[x + 0] * E, u -= a[x + 1] * E, y -= a[x + 2] * E, p -= 255 * E, x += 4, H += c;
                r += d
            }
        },
        Dg = function(a, b, c, d, e, f, h, l, n) {
            for (var r = 0, t = 0; t < n; ++t) {
                for (var p = 0, s = 0, u = 0, y = 0, x = t * l * 4, C = x, E = 0; E < h; ++E) s += a[C + 0], u += a[C + 1], y += a[C + 2], p += a[C + 3], C += 4;
                for (var D = r, H, E =
                        0; E < f; ++E) H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, E + h < l && (s += a[C + 0], u += a[C + 1], y += a[C + 2], p += a[C + 3], C += 4), D += c;
                for (; E + h + 4 <= l; E += 4) H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, D += c, s += a[C + 0] - a[x + 0], u += a[C + 1] - a[x + 1], y += a[C + 2] - a[x + 2], p += a[C + 3] - a[x + 3], H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, D += c, s += a[C + 4] - a[x + 4], u += a[C + 5] - a[x + 5], y += a[C + 6] - a[x + 6], p += a[C + 7] - a[x + 7], H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, D += c, s += a[C + 8] - a[x + 8], u += a[C + 9] - a[x + 9], y += a[C + 10] - a[x + 10], p +=
                    a[C + 11] - a[x + 11], H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, D += c, s += a[C + 12] - a[x + 12], u += a[C + 13] - a[x + 13], y += a[C + 14] - a[x + 14], p += a[C + 15] - a[x + 15], x += 16, C += 16;
                for (; E + h < l; ++E) H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, s += a[C + 0] - a[x + 0], u += a[C + 1] - a[x + 1], y += a[C + 2] - a[x + 2], p += a[C + 3] - a[x + 3], x += 4, C += 4, D += c;
                for (; E < l; ++E) H = 255 / p, b[D + 0] = s * H, b[D + 1] = u * H, b[D + 2] = y * H, b[D + 3] = p * e, s -= a[x + 0], u -= a[x + 1], y -= a[x + 2], p -= a[x + 3], x += 4, D += c;
                r += d
            }
        };
    Ag.prototype.apply = function(a, b) {
        for (var c = 20 * b.Na.k, d = Math.max(20 * a.x * b.Na.l | 0, 1), c = Math.max(a.y * c | 0, 1), e = a.quality, f = b.Fa(), h = b.Ta(), l = b.getImageData(), n = l.data, r = b.createImageData().data, t = e & 1, p, s, u = Cg, y = 1; y < e; ++y) p = (d - t) / 2 | 0, s = d - p, u(n, r, 4, 4 * f, 1 / d, p, s, f, h), t ^= 1, p = n, n = r, r = p, u = Bg;
        e & 1 && (d = d - 1 | 1);
        p = (d - t) / 2 | 0;
        u(n, r, 4 * h, 4, 1 / d, p, d - p, f, h);
        p = n;
        n = r;
        r = p;
        u = Bg;
        t = e & 1;
        for (y = 1; y < e; ++y) p = (c - t) / 2 | 0, s = c - p, u(n, r, 4, 4 * h, 1 / c, p, s, h, f), t ^= 1, p = n, n = r, r = p;
        u = Od ? Bg : Dg;
        e & 1 && (c = c - 1 | 1);
        p = (c - t) / 2 | 0;
        u(n, r, 4 * f, 4, 1 / c, p, c - p, h, f);
        b.ys(l)
    };
    var Eg = function() {};
    q(Eg, yg);
    ng.fa(te, Eg);
    Eg.prototype.apply = function(a, b) {
        for (var c = b.getImageData(), d = c.data, e = a.matrix, f = e[0], h = e[1], l = e[2], n = e[3], r = 255 * e[4], t = e[5], p = e[6], s = e[7], u = e[8], y = 255 * e[9], x = e[10], C = e[11], E = e[12], D = e[13], H = 255 * e[14], Tc = e[15], Ef = e[16], Wb = e[17], Xb = e[18], e = 255 * e[19], Xa = 0, xb = d.length; Xa < xb; Xa += 4) {
            var Ff = Xa,
                ze = Xa + 1,
                Gf = Xa + 2,
                Hf = Xa + 3,
                od = d[Ff],
                nb = d[ze],
                Yb = d[Gf],
                Wd = d[Hf];
            d[Ff] = f * od + h * nb + l * Yb + n * Wd + r;
            d[ze] = t * od + p * nb + s * Yb + u * Wd + y;
            d[Gf] = x * od + C * nb + E * Yb + D * Wd + H;
            d[Hf] = Tc * od + Ef * nb + Wb * Yb + Xb * Wd + e
        }
        b.putImageData(c)
    };
    var Fg = function() {};
    q(Fg, yg);
    var Gg = function(a, b, c, d, e, f, h, l, n, r) {
            for (var t = 0; t < r; ++t) {
                for (var p = 0, s = t * n * 4 + b, u = s, y = 0; y < l; ++y) p += a[u], u += 4;
                for (var x = c, y = 0; y < h; ++y) a[x] = p * f, y + l < n && (p += a[u], u += 4), x += d;
                for (; y + l + 4 <= n; y += 4) a[x] = p * f, x += d, p += a[u] - a[s], a[x] = p * f, x += d, p += a[u + 4] - a[s + 4], a[x] = p * f, x += d, p += a[u + 8] - a[s + 8], a[x] = p * f, x += d, p += a[u + 12] - a[s + 12], s += 16, u += 16;
                for (; y + l < n; ++y) a[x] = p * f, p += a[u] - a[s], s += 4, u += 4, x += d;
                for (; y < n; ++y) a[x] = p * f, p -= a[s], s += 4, x += d;
                c += e
            }
        },
        Hg = function(a, b, c, d, e, f, h, l) {
            e = Math.max(a.x * e | 0, 1);
            f = Math.max(a.y * f | 0, 1);
            a = a.quality;
            if (0 < a && 1 < e * f) {
                for (var n = a & 1, r, t, p = 3, s = 2, u = 1; u < a; ++u) r = (e - n) / 2 | 0, t = e - r, Gg(b, p, s, 4, 4 * c, 1 / e, r, t, c, d), n ^= 1, r = p, p = s, s = r;
                a & 1 && (e = e - 1 | 1);
                r = (e - n) / 2 | 0;
                Gg(b, p, s, 4 * d, 4, 1 / e, r, e - r, c, d);
                r = p;
                p = s;
                s = r;
                n = a & 1;
                for (u = 1; u < a; ++u) r = (f - n) / 2 | 0, t = f - r, Gg(b, p, s, 4, 4 * d, 1 / f, r, t, d, c), n ^= 1, r = p, p = s, s = r;
                a & 1 && (f = f - 1 | 1);
                r = (f - n) / 2 | 0;
                Gg(b, p, h, 4 * c, 4, l / f, r, f - r, d, c)
            } else
                for (e = 3; e < c * d * 4; e += 4, h += 4) b[h] = b[e] * l
        },
        Ig = function(a, b, c, d, e, f) {
            Hg(a, b, c, d, e, f, 1, 1);
            var h = a.distance;
            e = Math.round(Math.cos(a.angle) * h * e);
            f = Math.round(Math.sin(a.angle) * h *
                f);
            a = a.strength;
            a *= .5;
            for (h = 0; h < d; ++h)
                for (var l = 0; l < c; ++l) {
                    var n = 0,
                        r = 0;
                    0 <= l + e && l + e < c && 0 <= h + f && h + f < d && (n = b[4 * ((h + f) * c + l + e) + 1]);
                    0 <= l - e && l - e < c && 0 <= h - f && h - f < d && (r = b[4 * ((h - f) * c + l - e) + 1]);
                    b[4 * (h * c + l) + 3] = (n - r) * a + 127.5
                }
        },
        Kg = function(a, b, c, d) {
            for (var e = new Uint8Array(1024), f = 0, h = Jg(b[f]), l = c[f], n = d[f], r = 0, t = h, p = l, s = 0; 256 > s; ++s) {
                if (s >= n && (t = h, p = l, r = n, ++f < d.length ? (h = Jg(b[f]), l = c[f], n = d[f]) : n = 255, s == r)) {
                    e[4 * s + 0] = t.Vb;
                    e[4 * s + 1] = t.Ub;
                    e[4 * s + 2] = t.Tb;
                    e[4 * s + 3] = 255 * p;
                    continue
                }
                var u = (s - r) / (n - r);
                e[4 * s + 0] = t.Vb + (h.Vb - t.Vb) *
                    u;
                e[4 * s + 1] = t.Ub + (h.Ub - t.Ub) * u;
                e[4 * s + 2] = t.Tb + (h.Tb - t.Tb) * u;
                e[4 * s + 3] = 255 * (p + (l - p) * u)
            }
            b = a.length;
            for (c = 0; c < b; c += 4) d = 4 * a[c + 3], a[c + 0] = e[d + 0], a[c + 1] = e[d + 1], a[c + 2] = e[d + 2], a[c + 3] = e[d + 3]
        };
    var Lg = function() {};
    q(Lg, yg);
    ng.fa(Ge, Lg);
    Lg.prototype.apply = function(a, b) {
        for (var c = b.Fa(), d = b.Ta(), e = b.createImageData(), f = e.data, h = b.getImageData().data, l = a.divisor || 1, n = a.matrixX, r = a.matrixY, t = new Float32Array(n * r), p = 0; p < a.matrix.length; ++p) t[p] = a.matrix[p] / l;
        var l = n / 2 | 0,
            p = r / 2 | 0,
            s = a.bias,
            u = a.preserveAlpha,
            y = a.clamp;
        if (!y) var x = a.color >> 24 & 255,
            C = a.color >> 16 & 255,
            E = a.color >> 8 & 255,
            D = a.color & 255;
        for (var H = 0, Tc = 0; H < d; ++H)
            for (var Ef = 0; Ef < c; ++Ef, Tc += 4) {
                for (var Wb = s, Xb = s, Xa = s, xb = s, Ff = 0, ze = 0; ze < r; ++ze)
                    for (var Gf = H + ze - p, Hf = Math.max(0, Math.min(Gf,
                            d - 1)), od = 0; od < n; ++od, ++Ff) {
                        var nb = t[Ff],
                            Yb = Ef + od - l,
                            Wd = Math.max(0, Math.min(Yb, c - 1)),
                            Xd = 4 * (Hf * c + Wd);
                        y || Wd === Yb && Hf === Gf ? u ? (Wb += nb * h[Xd], Xb += nb * h[Xd + 1], Xa += nb * h[Xd + 2]) : (Yb = h[Xd + 3], Wb += nb * Yb * h[Xd] / 255, Xb += nb * Yb * h[Xd + 1] / 255, Xa += nb * Yb * h[Xd + 2] / 255, xb += nb * Yb) : (Wb += nb * C, Xb += nb * E, Xa += nb * D, xb += nb * x)
                    }
                u ? xb = h[Tc + 3] : 0 >= xb ? Wb = Xb = Xa = xb = 0 : (255 < xb && (xb = 255), Wb = 255 * Wb / xb, Xb = 255 * Xb / xb, Xa = 255 * Xa / xb);
                f[Tc] = Wb;
                f[Tc + 1] = Xb;
                f[Tc + 2] = Xa;
                f[Tc + 3] = xb
            }
        b.putImageData(e)
    };
    var Mg = new kg("nul");
    ba("swiffy.NUL", Mg, void 0);
    var Ng = function(a, b, c) {
        this.gridFit = a;
        this.thickness = b;
        this.sharpness = c
    };
    var Og = {
            Kd: function() {
                return 0
            }
        },
        Qg = function(a, b, c) {
            return da(a) ? 1 == a.length ? new Pg(c(a[0])) : new b(c(a[0]), c(a[1])) : new Pg(c(a))
        },
        Pg = function(a) {
            this.value = a
        };
    Pg.prototype.Sh = !0;
    Pg.prototype.ub = function() {
        return this.value
    };
    var Rg = function(a, b) {
        this.from = a;
        this.to = b
    };
    Rg.prototype.Sh = !1;
    Rg.prototype.ub = function(a) {
        return Sg(this.from, this.to, a.Kd())
    };
    var Tg = function(a) {
            return Qg(a, Rg, ec)
        },
        Ug = function(a, b) {
            this.from = a;
            this.to = b
        };
    Ug.prototype.Sh = !1;
    Ug.prototype.ub = function(a) {
        var b = this.from,
            c = this.to;
        a = a.Kd();
        return Uc(Sg(b.l, c.l, a), Sg(b.o, c.o, a), Sg(b.m, c.m, a), Sg(b.k, c.k, a), Sg(b.p, c.p, a), Sg(b.q, c.q, a))
    };
    var Wg = function(a, b, c) {
            return a ? Qg(a, Ug, function(a) {
                return Vg(a).Dm(b, b)
            }) : c
        },
        Xg = function(a, b) {
            this.from = a;
            this.to = b
        };
    Xg.prototype.Sh = !1;
    Xg.prototype.ub = function(a) {
        var b = this.from,
            c = this.to;
        a = a.Kd();
        return new Vc(Sg(b.Vb, c.Vb, a), Sg(b.Ub, c.Ub, a), Sg(b.Tb, c.Tb, a), Sg(b.pd, c.pd, a))
    };
    var Yg = function(a, b) {
        this.from = a;
        this.to = b;
        this.Lu = a.Vq();
        this.Ou = b.Vq()
    };
    Yg.prototype.Sh = !1;
    Yg.prototype.ub = function(a) {
        a = a.Kd();
        return 0 == a ? this.from : 1 == a ? this.to : this.Lu.Zu(this.Ou, a)
    };
    var ah = function(a, b, c, d, e, f, h, l) {
            this.fill = c;
            this.color = b;
            this.Mk = Zg[d];
            this.sn = Zg[e];
            this.bs = $g[f];
            this.width = a;
            this.miter = k(h) ? h : null;
            this.flags = l
        },
        Zg = ["round", "butt", "square"],
        bh = ["round", "none", "square"],
        $g = ["round", "bevel", "miter"];
    ah.prototype.Hb = !1;
    ah.prototype.wb = function() {};
    ah.prototype.Wt = function(a, b, c, d, e) {
        if (this.fill) {
            c.save();
            var f = a.zf(),
                h = b.sk(f, a.Ha()),
                l = b.Ug(h),
                n = l.Hf(a.Ha());
            n.beginPath();
            d.Kn(n);
            n.strokeStyle = "rgb(0,0,0)";
            this.Pk(a, l, n, d);
            n.globalCompositeOperation = "source-in";
            !Dc || Za ? (n.beginPath(), n.rect(f.j, f.i, f.width(), f.height()), this.fill.wb(a, n, e)) : (d = l.Ug(h), h = d.Hf(a.Ha()), h.beginPath(), h.rect(f.j, f.i, f.width(), f.height()), this.fill.wb(a, h, e), l.Xd(d));
            b.Xd(l);
            c.restore()
        } else f = this.color.ub(a), f = e.apply(f), c.strokeStyle = f.Jd(), this.Pk(a, b, c, d)
    };
    ah.prototype.Pk = function(a, b, c, d) {
        var e = this.Mk != this.sn;
        c.lineCap = e ? "butt" : this.Mk;
        c.lineJoin = this.bs;
        null != this.miter && (c.miterLimit = this.miter);
        var f = this.width.ub(a),
            h = a.Ha();
        a = b.Na.l;
        b = b.Na.k;
        var l = h.l + h.m,
            h = h.o + h.k;
        c.lineWidth = Math.max(f * Math.sqrt((l * l + h * h) / 2), 1 / Math.max(a, b));
        ch(c, a, b);
        e && (c.lineJoin = "bevel", c.beginPath(), c.lineCap = this.Mk, d.js(c), ch(c, a, b), c.beginPath(), c.lineCap = this.sn, d.hs(c), ch(c, a, b))
    };
    var ch = function(a, b, c) {
        a.save();
        a.setTransform(b, 0, 0, c, 0, 0);
        a.stroke();
        a.restore()
    };
    var dh = function() {};
    dh.prototype.xb = function() {};
    var eh = [];
    var fh = function() {};
    q(fh, dh);
    g = fh.prototype;
    g.eh = function() {};
    g.ml = function() {};
    g.Qe = function() {};
    g.Zk = function() {};
    g.zm = function() {};
    g.Zh = function() {};
    var hh = function(a, b) {
        for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            if (d instanceof gh && d.depth == b) return c
        }
        return -1
    };
    fh.prototype.xb = function(a, b, c, d) {
        a.tags[d] || (a.tags[d] = []);
        a.tags[d].push(this)
    };
    var jh = function(a) {
        this.id = a;
        this.Qh = null;
        this.wi = "";
        this.Ck = ih++
    };
    q(jh, dh);
    var ih = 1;
    g = jh.prototype;
    g.La = !1;
    g.Ea = function() {};
    g.rc = function() {
        return null
    };
    g.bm = function(a) {
        this.Qh = a;
        kh(a, this)
    };
    g.xb = function(a, b, c) {
        c.kq(this.id, this)
    };
    var lh = function(a, b) {
        jh.call(this, a);
        this.wi = "";
        this.$c = b
    };
    q(lh, jh);
    var mh = function(a, b, c, d, e) {
        jh.call(this, a);
        this.trackAsMenu = b;
        this.records = c;
        this.actions = d;
        this.sounds = e
    };
    q(mh, jh);
    eh[10] = function(a, b, c) {
        for (var d = [], e = 0; a.records && e < a.records.length; e++) {
            var f = a.records[e],
                h = f.transform ? Vg(f.transform) : null,
                l = f.colortransform ? nh(f.colortransform) : null,
                n = void 0;
            if (f.filters)
                for (var n = [], r = 0; r < f.filters.length; r++) n.push(le(f.filters[r]));
            k(f.id) && d.push(new oh(c.le(f.id), f.depth, h, f.states, l, n, f.blendmode))
        }
        c = [];
        for (e = 0; a.actions && e < a.actions.length; e++) f = b.Ee(z), h = a.actions[e], c.push(new ph(f.Ij(h.actions, void 0), h.key, h.events));
        b = [];
        for (e = 0; a.sounds && e < a.sounds.length; e++) f =
            a.sounds[e], b.push(new qh(f.events, f.sound));
        return new mh(a.id, a.trackAsMenu, d, c, b)
    };
    mh.prototype.rc = function(a, b, c) {
        return new rh(this, a, b, c)
    };
    mh.prototype.La = !0;
    var oh = function(a, b, c, d, e, f, h) {
            this.definition = a;
            this.depth = b;
            this.transform = c;
            this.states = d;
            this.hi = e;
            this.filters = f;
            this.blendmode = h
        },
        ph = function(a, b, c) {
            this.actions = a;
            this.key = b;
            this.events = c
        },
        qh = function(a, b) {
            this.events = a;
            this.sound = b
        };
    var sh = function(a, b, c, d, e) {
        jh.call(this, a);
        this.paths = b;
        this.bounds = c;
        this.fillstyles = d;
        this.linestyles = e;
        this.Fv = this.Gv()
    };
    q(sh, jh);
    sh.prototype.Ea = function() {};
    eh[1] = function(a, b, c) {
        b = a.fillstyles ? a.fillstyles.map(function(a) {
            return th(c, a)
        }) : [];
        var d = a.linestyles ? a.linestyles.map(function(a) {
            if (a) {
                var b, d;
                a.fill ? b = th(c, a.fill) : d = Qg(a.color, Xg, Jg);
                var l = a.cap | 0,
                    n = k(a.ecap) ? a.ecap : l;
                a = new ah(Tg(a.width), d, b, l, n, a.joint | 0, a.miter, a.flags | 0)
            } else a = null;
            return a
        }) : [];
        return new sh(a.id, a.paths.map(uh), a.bounds.map(ad), b, d)
    };
    sh.prototype.rc = function(a, b, c) {
        return new vh(this, a, c)
    };
    sh.prototype.dd = function(a) {
        if (this.bounds) {
            if (1 == this.bounds.length) return new bd(this.bounds[0]);
            a = a.Kd();
            a = new $c(Sg(this.bounds[0].j, this.bounds[1].j, a), Sg(this.bounds[0].i, this.bounds[1].i, a), Sg(this.bounds[0].t, this.bounds[1].t, a), Sg(this.bounds[0].s, this.bounds[1].s, a));
            return new bd(a, this.bounds[0])
        }
        for (var b = new $c, c = this.paths, d = 0; d < c.length; ++d) {
            var e = c[d].data.ub(a),
                f = 0;
            null != c[d].line && (f = this.linestyles[c[d].line].width.ub(a) / 2);
            e.Ad(b, f)
        }
        return new bd(b)
    };
    var wh = function(a, b, c) {
            this.data = a;
            this.fill = b;
            this.line = c
        },
        uh = function(a) {
            return new wh(Qg(a.data, Yg, xh), a.fill, a.line)
        };
    sh.prototype.Gv = function() {
        for (var a = 0, b = 0; b < this.paths.length; b++) {
            var c = this.paths[b];
            if (!c.data.Sh) break;
            var d = c.data.ub(Og).Cb.length,
                e = null != c.fill ? this.fillstyles[c.fill] : null;
            if (e instanceof yh) return !0;
            a += d * (!!e + 2 * !(null == c.line || !this.linestyles[c.line]));
            if (150 < a) return !0
        }
        return !1
    };
    var zh = function(a, b, c) {
        jh.call(this, a);
        this.sound = b;
        this.format = c
    };
    q(zh, jh);
    eh[11] = function(a) {
        return new zh(a.id, a.data, a.format)
    };
    zh.prototype.xb = function(a, b) {
        b.Fe().tv(this.id, this.sound, this.format)
    };
    var Ah = function(a, b, c, d, e, f, h) {
        jh.call(this, a);
        this.numFrames = b;
        this.width = c;
        this.height = d;
        this.deblocking = e;
        this.smoothing = f;
        this.codecId = h
    };
    q(Ah, jh);
    eh[24] = function(a) {
        return new Ah(a.id, a.numFrames, a.width, a.height, a.deblocking, a.smoothing, a.codecId)
    };
    Ah.prototype.rc = function(a, b, c) {
        return new Bh(this, a, c)
    };
    var Ch = function(a) {
        this.definition = a
    };
    q(Ch, dh);
    eh[18] = function(a, b) {
        return new Ch(a, b)
    };
    Ch.prototype.xb = function(a, b) {
        b.Ee(Dh).Pi.ev(this)
    };
    var Eh = function(a) {
        this.actions = a
    };
    q(Eh, fh);
    eh[9] = function(a, b) {
        var c = b.Ee(z).Ij(a.actions, void 0);
        return new Eh(c)
    };
    Eh.prototype.eh = function() {};
    Eh.prototype.Zk = function(a) {
        a.ha().Vo(new Fh(this.actions, a))
    };
    Eh.prototype.ml = function(a) {
        a.ha().Al(new Fh(this.actions, a))
    };
    Eh.prototype.Zh = function(a) {
        a.push(this)
    };
    var Gh = function(a) {
        this.actions = a
    };
    q(Gh, Eh);
    eh[20] = function(a, b) {
        var c = b.Ee(z).Ij(a.actions, void 0);
        return new Gh(c)
    };
    Gh.prototype.xb = function(a, b, c, d) {
        a.Nj[d] || (a.Nj[d] = []);
        a.Nj[d].push(this)
    };
    var Hh = function(a) {
        this.$p = a
    };
    q(Hh, fh);
    eh[16] = function(a) {
        return new Hh(a.data)
    };
    Hh.prototype.xb = function(a, b, c) {
        for (var d in this.$p)
            if (a = c.le(this.$p[d]).get(), a instanceof lh) a.$c[d] = a, a.wi = d;
            else if (a instanceof mf) {
            var e = d;
            b.qc[e] || (b.qc[e] = []);
            b.qc[e].push(a)
        }
    };
    var Ih = function(a) {
        this.gv = a
    };
    q(Ih, fh);
    eh[15] = function(a) {
        return new Ih(a.label)
    };
    Ih.prototype.xb = function(a, b, c, d) {
        a.Tf.Bi[this.gv] = d
    };
    var Jh = function(a) {
        this.tm = a
    };
    q(Jh, fh);
    eh[4] = function(a) {
        return new Jh(a.depth)
    };
    g = Jh.prototype;
    g.Qe = function(a) {
        a.md(this.tm + -16384)
    };
    g.eh = Jh.prototype.Qe;
    g.zm = function(a) {
        a.push(this)
    };
    g.Zh = function(a) {
        var b = hh(a, this.tm);
        if (0 <= b) {
            var c = a[b];
            c.nv(160) ? (a[b] = c.lv(), a.push(this.mv())) : a.splice(b, 1)
        }
    };
    g.mv = function() {
        return new Jh(this.tm + -65536)
    };
    var Kh = function(a, b) {
        this.qf = a;
        this.Op = {};
        for (var c = 0; c < a.length; c++) this.Op[a[c].name] = a[c].offset;
        this.Bi = {};
        for (c = 0; c < b.length; c++) this.Bi[b[c].name] = b[c].offset
    };
    q(Kh, fh);
    eh[23] = function(a) {
        return new Kh(a.scenes, a.frames)
    };
    g = Kh.prototype;
    g.xb = function(a) {
        a.Tf = this
    };
    g.Am = function(a) {
        if (2 > this.qf.length) return 0;
        a = Na(this.qf, {
            offset: a
        }, function(a, c) {
            return a.offset - c.offset
        });
        0 > a && (a = Math.max(0, -a - 2));
        return a
    };
    g.bq = function(a) {
        return 2 > this.qf.length ? 0 : this.qf[this.Am(a)].offset
    };
    g.ku = function(a) {
        a = this.Am(a);
        return 0 < a ? this.qf[a - 1].offset : Number.NEGATIVE_INFINITY
    };
    g.ju = function(a) {
        a = this.Am(a);
        return a < this.qf.length - 1 ? this.qf[a + 1].offset : Number.POSITIVE_INFINITY
    };
    var Lh = function(a) {
        this.id = a
    };
    q(Lh, fh);
    eh[12] = function(a, b) {
        return new Lh(a.id, b)
    };
    Lh.prototype.Qe = function(a) {
        a.Fe().Nn(this.id)
    };
    Lh.prototype.eh = Lh.prototype.Qe;
    Lh.prototype.Zh = function(a) {
        a.push(this)
    };
    var Mh = function(a) {
        this.du = a
    };
    q(Mh, dh);
    eh[19] = function(a, b) {
        return new Mh(a.references, b)
    };
    Mh.prototype.xb = function(a, b, c) {
        a = this.du;
        b = b.Ee(Dh).Pi.xc;
        for (var d = 0; d < a.length; d++) {
            var e = a[d],
                f = c.le(e.id).get(),
                e = b[e.name];
            f && e && f.bm(e)
        }
    };
    var Nh = function() {
        this.Hd = []
    };
    g = Nh.prototype;
    g.nq = function(a) {
        var b = this.Hd;
        b.push(a);
        this.pv(b.length - 1)
    };
    g.remove = function() {
        var a = this.Hd,
            b = a.length,
            c = a[0];
        if (!(0 >= b)) return 1 == b ? this.Hd = [] : (a[0] = a.pop(), this.ov(0)), c
    };
    g.oq = function() {
        return 0 == this.Hd.length ? void 0 : this.Hd[0]
    };
    g.ov = function(a) {
        for (var b = this.Hd, c = b.length, d = b[a]; 2 * a + 1 < c;) {
            var e = 2 * a + 1,
                f = e + 1,
                e = f < c && 0 > b[f].compare(b[e]) ? f : e;
            if (0 > d.compare(b[e])) break;
            b[a] = b[e];
            a = e
        }
        b[a] = d
    };
    g.pv = function(a) {
        for (var b = this.Hd, c = b[a]; 0 < a;) {
            var d = Math.floor((a - 1) / 2);
            if (0 > c.compare(b[d])) b[a] = b[d], a = d;
            else break
        }
        b[a] = c
    };
    g.$a = function() {
        return 0 == this.Hd.length
    };
    var Oh = new Nh,
        Ph = 0,
        Qh = function() {
            return Date.now()
        },
        Sh = function(a, b) {
            return Rh(a, b, !1)
        },
        Th = function(a, b) {
            return Rh(a, b, !0)
        },
        Rh = function(a, b, c) {
            b = Math.floor(Math.max(b, 1));
            var d = Qh() + b,
                e = Ph++;
            Oh.nq(new Uh(d, a, e, c ? b : void 0));
            return e
        },
        Vh = function(a) {
            for (var b = Oh.Hd, c = 0; c < b.length; ++c)
                if (b[c].id == a) {
                    b[c].Xl = !0;
                    break
                }
        },
        Wh = function() {
            if (!Oh.$a() && Oh.oq().time <= Qh()) {
                var a = Oh.remove();
                a.Xl || (k(a.interval) && !a.Xl && (a.time += a.interval, Oh.nq(a)), a.ou.apply(window));
                Oh.$a() || window.setTimeout(Wh, 0)
            }
        },
        Uh = function(a,
            b, c, d) {
            this.time = a;
            this.ou = b;
            this.id = c;
            this.interval = d;
            this.Xl = !1
        };
    Uh.prototype.compare = function(a) {
        var b = this.time - a.time;
        return 0 == b ? this.id - a.id : b
    };
    var Xh = function(a, b) {
        this.ro = a ? a : 60;
        this.ep = 1E3 / this.ro;
        this.Bh = 0;
        this.Ga = b;
        this.hj = !1;
        this.cp = na(this.Xt, this)
    };
    Xh.prototype.start = function() {
        this.hj || (this.hj = !0, this.Bh = Qh(), Kd(this.cp))
    };
    Xh.prototype.stop = function() {
        this.hj = !1
    };
    Xh.prototype.Xt = function() {
        if (this.hj) {
            var a = Qh();
            Oh.$a() || window.setTimeout(Wh, 0);
            a >= this.Bh && (this.Ga.vk(), this.Bh += (Math.floor((a - this.Bh) / this.ep) + 1) * this.ep);
            this.Ga.Li();
            Kd(this.cp)
        }
    };
    var Yh = function(a, b, c, d, e, f, h) {
        switch (arguments.length) {
            case 0:
                return new Date(Qh());
            case 1:
                return new Date(a);
            default:
                return c = k(c) ? c : 1, d = k(d) ? d : 0, e = k(e) ? e : 0, f = k(f) ? f : 0, h = k(h) ? h : 0, new Date(a, b, c, d, e, f, h)
        }
    };
    Object.defineProperty(Date, "__swiffy_override", {
        value: Yh
    });
    Object.defineProperty(Array, "__swiffy_override", {
        value: Array
    });
    var Zh = function(a) {
            Object.defineProperty(a.prototype, "__swiffy_nvr", {
                value: !0
            })
        },
        $h = function(a) {
            window.console && window.console.log("[trace] " + a)
        },
        ai = function(a) {
            this.value = a
        },
        bi = "",
        ci = 0,
        di = function(a) {
            if (ci >= a) throw new RangeError("Maximum stack size reached");
            ++ci
        },
        ei = function(a) {
            if (--ci) throw a;
            if (a instanceof ai) $h(a.value);
            else if (!(a instanceof RangeError)) throw a;
        };
    var fi = function() {
        this.source = ""
    };
    g = fi.prototype;
    g.append = function(a) {
        this.source += a;
        return this
    };
    g.Ko = function() {
        var a = this.source;
        this.source = "";
        return a
    };
    g.Ri = function(a) {
        return a.Mu
    };
    g.gl = function(a) {
        return this.append(this.Ri(a))
    };
    g.vh = function(a, b) {
        this.gl(a).append("(");
        for (var c = 1; c < arguments.length; ++c) 1 < c && this.append(","), this.append(arguments[c]);
        return this.append(")")
    };
    g.ja = function(a, b) {
        return this.vh.apply(this, arguments).append(";")
    };
    g.Pt = function(a) {
        return fa(a) ? Ba(a) : String(a)
    };
    Object.defineProperty(Array, "CASEINSENSITIVE", {
        value: 1
    });
    Object.defineProperty(Array, "DESCENDING", {
        value: 2
    });
    Object.defineProperty(Array, "NUMERIC", {
        value: 16
    });
    Object.defineProperty(Array, "RETURNINDEXEDARRAY", {
        value: 8
    });
    Object.defineProperty(Array, "UNIQUESORT", {
        value: 4
    });
    var gi = function(a, b, c) {
            var d = b & Array.DESCENDING ? -1 : 1,
                e = Ze,
                f;
            f = b & Array.NUMERIC ? e.Sq : b & Array.CASEINSENSITIVE ? e.Qq : e.Rq;
            return function(b, l) {
                return d * f.call(e, b && b[a], l && l[a]) || c(b, l)
            }
        },
        hi = function(a, b) {
            return function(c, d) {
                return b(a[c], a[d])
            }
        };
    Object.defineProperty(Array.prototype, "sortOn", {
        value: function(a, b) {
            a = da(a) ? a : [a];
            var c;
            da(b) && b.length == a.length ? c = b[0] >>> 0 : (c = b >>> 0, b = null);
            for (var d = c & Array.RETURNINDEXEDARRAY, e = c & Array.UNIQUESORT, f = !1, h = function() {
                    f = !0;
                    return 0
                }, l = a.length - 1; 0 <= l; --l) h = gi(a[l], b ? b[l] >>> 0 : c, h);
            c = this;
            if (d || e)
                for (h = hi(c, h), c = [], l = this.length - 1; 0 <= l; --l) c[l] = l;
            c.sort(h);
            if (e) {
                if (f) return 0;
                if (!d) {
                    for (d = 0; d < c.length; d++)
                        if (-1 != c[d]) {
                            for (var e = this[d], n, h = d; n = c[h], c[h] = -1, n != d; h = n) this[h] = this[n];
                            this[h] = e
                        }
                    return this
                }
            }
            return c
        }
    });
    var Ze = null;
    var Fh = function(a, b) {
        this.Vu = a;
        this.nh = b
    };
    var ii = 1,
        ji = function(a, b) {
            a.prototype = Object.create(b.prototype);
            a.prototype.constructor = a
        },
        A = function(a, b, c) {
            c && ji(a, c);
            a.prototype ? (c = a.prototype.__swiffy_as2_classdef || null, Object.defineProperty(a.prototype, "__swiffy_as2_classdef", {
                value: a
            })) : c = Object;
            Object.defineProperty(a, "__swiffy_as2_typeid", {
                value: ii++
            });
            Object.defineProperty(a, "__swiffy_as2_baseclass", {
                value: c
            });
            Object.defineProperty(a, "__swiffy_as2_name", {
                value: b
            })
        };
    A(Object, "Object");
    var B = function(a, b, c, d) {
        b = null == b ? Object.getOwnPropertyNames(a) : fa(b) ? b.split(",") : b;
        var e = {};
        d & 4 && (e.writable = !0);
        d & 2 && (e.configurable = !0);
        d & 1 && (e.enumerable = !0);
        c & 4 && (e.writable = !1);
        c & 2 && (e.configurable = !1);
        c & 1 && (e.enumerable = !1);
        for (c = 0; c < b.length; ++c)(d = Object.getOwnPropertyDescriptor(a, b[c])) && d.configurable && Object.defineProperty(a, b[c], e)
    };
    var ki = function(a) {
        Object.defineProperty(this, "__swiffy_vm", {
            value: a
        })
    };
    A(ki, "AsBroadcaster");
    var li = function(a, b) {
            for (var c = Array.prototype.slice.call(arguments, 2), d = 0; d < this._listeners.length; ++d) {
                var e = this._listeners[d];
                if (null != e) {
                    var f = e[a.ea(e, b)];
                    m(f) && f.apply(e, c)
                }
            }
            return 0 < this._listeners.length ? !0 : void 0
        },
        mi = function(a) {
            null != a ? Ia(this._listeners, a) : Ja(this._listeners, function(a) {
                return null == a
            });
            this._listeners.push(a);
            return !0
        },
        ni = function(a) {
            return Ia(this._listeners, a)
        };
    ki.prototype.initialize = function(a) {
        ia(a) && (a._listeners = [], a.addListener = mi, a.broadcastMessage = oa(li, this.__swiffy_vm), a.removeListener = ni, B(a, ["addListener", "broadcastMessage", "removeListener", "_listeners"], 3))
    };
    B(ki.prototype, null, 3);
    var oi = function() {};
    A(oi, "BitmapFilter");
    var Ee = function(a, b, c, d, e, f, h, l, n, r, t, p) {
        this.angle = k(b) ? b : 45;
        this.blurX = k(h) ? h : 4;
        this.blurY = k(l) ? l : 4;
        this.distance = k(a) ? a : 4;
        this.highlightAlpha = k(d) ? d : 1;
        this.highlightColor = k(c) ? c : 16777215;
        this.knockout = k(p) ? p : !1;
        this.quality = k(r) ? r : 1;
        this.shadowAlpha = k(f) ? f : 1;
        this.shadowColor = k(e) ? e : 0;
        this.strength = k(n) ? n : 1;
        this.type = k(t) ? t : "inner";
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new De(this.angle * Math.PI / 180, Xc(this.highlightColor, this.highlightAlpha), Xc(this.shadowColor,
                    this.shadowAlpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
            }
        })
    };
    A(Ee, "BevelFilter", oi);
    var re = function(a, b, c) {
        this.blurX = k(a) ? a : 4;
        this.blurY = k(b) ? b : 4;
        this.quality = k(c) ? c : 1;
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new qe(this.quality, this.blurX, this.blurY)
            }
        })
    };
    A(re, "BlurFilter", oi);
    var ue = function(a) {
        this.matrix = k(a) ? a : [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new te(this.matrix)
            }
        })
    };
    A(ue, "ColorMatrixFilter", oi);
    var pi = function(a, b, c, d, e, f, h, l) {
        a = k(a) ? a : 1;
        b = k(b) ? b : 1;
        c = k(c) ? c : 1;
        d = k(d) ? d : 1;
        e = k(e) ? e : 0;
        f = k(f) ? f : 0;
        h = k(h) ? h : 0;
        l = k(l) ? l : 0;
        Object.defineProperty(this, "__swiffy_v", {
            writable: !0,
            value: new Yc(a, e, b, f, c, h, d, l)
        })
    };
    A(pi, "ColorTransform", qi);
    var ri = function(a) {
        return new pi(a.xa, a.wa, a.va, a.ua, a.sa, a.qa, a.pa, a.ta)
    };
    Object.defineProperty(pi.prototype, "redMultiplier", {
        get: function() {
            return this.__swiffy_v.xa
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(Number(a), b.sa, b.wa, b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "greenMultiplier", {
        get: function() {
            return this.__swiffy_v.wa
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, Number(a), b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "blueMultiplier", {
        get: function() {
            return this.__swiffy_v.va
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, Number(a), b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "alphaMultiplier", {
        get: function() {
            return this.__swiffy_v.ua
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, b.pa, Number(a), b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "redOffset", {
        get: function() {
            return this.__swiffy_v.sa
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, Number(a), b.wa, b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "greenOffset", {
        get: function() {
            return this.__swiffy_v.qa
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, Number(a), b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "blueOffset", {
        get: function() {
            return this.__swiffy_v.pa
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, Number(a), b.ua, b.ta)
        }
    });
    Object.defineProperty(pi.prototype, "alphaOffset", {
        get: function() {
            return this.__swiffy_v.ta
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, b.pa, b.ua, Number(a))
        }
    });
    Object.defineProperty(pi.prototype, "rgb", {
        get: function() {
            return (this.__swiffy_v.sa << 16 | this.__swiffy_v.qa << 8 | this.__swiffy_v.pa) >>> 0
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(0, a >> 16 & 255, 0, a >> 8 & 255, 0, a & 255, b.ua, b.ta)
        }
    });
    pi.prototype.concat = function(a) {
        this.__swiffy_v = this.__swiffy_v.Gl(a.__swiffy_v)
    };
    pi.prototype.toString = function() {
        return "(redMultiplier=" + this.__swiffy_v.xa + ", greenMultiplier=" + this.__swiffy_v.wa + ", blueMultiplier=" + this.__swiffy_v.va + ", alphaMultiplier=" + this.__swiffy_v.ua + ", redOffset=" + this.__swiffy_v.sa + ", greenOffset=" + this.__swiffy_v.qa + ", blueOffset=" + this.__swiffy_v.pa + ", alphaOffset=" + this.__swiffy_v.ta + ")"
    };
    var He = function(a, b, c, d, e, f, h, l, n) {
        this.matrixX = k(a) ? a : 0;
        this.matrixY = k(b) ? b : 0;
        var r = [];
        Object.defineProperty(this, "matrix", {
            get: function() {
                return r
            },
            set: function(a) {
                var b = this.matrixY * this.matrixX;
                r = null != a ? a : [];
                if (r.length > b) r.length = b;
                else
                    for (; r.length < b;) r.push(0)
            }
        });
        this.matrix = c;
        this.bias = k(e) ? e : 0;
        this.preserveAlpha = k(f) ? f : !0;
        this.clamp = k(h) ? h : !0;
        this.color = k(l) ? l : 0;
        this.alpha = k(n) ? n : 0;
        this.divisor = k(d) ? d : 1;
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new Ge(this.bias,
                    this.clamp, Xc(this.color, this.alpha), this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
            }
        })
    };
    A(He, "ConvolutionFilter", oi);
    var Le = function(a, b, c, d, e, f, h, l, n, r, t) {
        this.angle = k(b) ? b : 45;
        this.blurX = k(e) ? e : 4;
        this.blurY = k(f) ? f : 4;
        this.distance = k(a) ? a : 4;
        this.alpha = k(d) ? d : 1;
        this.color = k(c) ? c : 0;
        this.knockout = k(r) ? r : !1;
        this.quality = k(l) ? l : 1;
        this.strength = k(h) ? h : 1;
        this.inner = k(n) ? n : !1;
        this.hideObject = k(t) ? t : !1;
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new Je(this.angle * Math.PI / 180, Xc(this.color, this.alpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, Ke(this.hideObject, this.inner,
                    this.knockout))
            }
        })
    };
    A(Le, "DropShadowFilter", oi);
    var si = function(a) {
        this.name = "Error";
        this.message = k(a) ? a : "Error"
    };
    A(si, "Error");
    si.prototype.toString = function() {
        return this.message
    };
    B(si.prototype, null, 3);
    var ti = function() {};
    A(ti, "ExternalInterface");
    Object.defineProperty(ti, "available", {
        get: Ye
    });
    ti.call = function(a, b) {
        return ef(String(a), Array.prototype.slice.call(arguments, 1))
    };
    ti.addCallback = function(a, b, c) {
        return af(String(a), k(b) ? b : null, c)
    };
    B(ti, null, 3);
    var ui = function(a, b, c, d, e, f, h, l) {
        this.blurX = k(c) ? c : 6;
        this.blurY = k(d) ? d : 6;
        this.alpha = k(b) ? b : 1;
        this.color = k(a) ? a : 16711680;
        this.knockout = k(l) ? l : !1;
        this.quality = k(f) ? f : 1;
        this.strength = k(e) ? e : 2;
        this.inner = k(h) ? h : !1;
        B(this, null, 3);
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new Je(0, Xc(this.color, this.alpha), 0, this.strength, this.quality, this.blurX, this.blurY, Ke(!1, this.inner, this.knockout))
            }
        })
    };
    A(ui, "GlowFilter", oi);
    var Pe = function(a, b, c, d, e, f, h, l, n, r, t) {
        this.distance = k(a) ? a : 4;
        this.angle = k(b) ? b : 45;
        var p = [];
        Object.defineProperty(this, "colors", {
            enumerable: !0,
            get: function() {
                return p
            },
            set: function(a) {
                p = da(a) ? a : [];
                for (a = 0; a < p.length; a++) p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216
            }
        });
        this.colors = c;
        var s = [];
        Object.defineProperty(this, "alphas", {
            enumerable: !0,
            get: function() {
                return s
            },
            set: function(a) {
                s = da(a) ? a : [];
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) s[b] = Math.min(1, Math.floor(Number(255 * (null != s[b] ? Number(s[b]) :
                    1))) / 255);
                s.length = a
            }
        });
        this.alphas = d;
        var u = [];
        Object.defineProperty(this, "ratios", {
            enumerable: !0,
            get: function() {
                return u
            },
            set: function(a) {
                u = da(a) ? a : [];
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) {
                    var c = null != u[b] ? Number(u[b]) : 0,
                        c = Math.floor(c);
                    0 > c ? c = 0 : 255 < c && (c = 255);
                    u[b] = c
                }
                u.length = a
            }
        });
        this.ratios = e;
        this.blurX = k(f) ? f : 4;
        this.blurY = k(h) ? h : 4;
        this.quality = k(n) ? n : 1;
        this.strength = k(l) ? l : 1;
        this.knockout = k(t) ? t : !1;
        this.type = k(r) ? r : "inner";
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new Ne(this.angle *
                    Math.PI / 180, p, s, u, this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
            }
        })
    };
    A(Pe, "GradientBevelFilter", oi);
    var Se = function(a, b, c, d, e, f, h, l, n, r, t) {
        this.distance = k(a) ? a : 4;
        this.angle = k(b) ? b : 45;
        var p = [];
        Object.defineProperty(this, "colors", {
            enumerable: !0,
            get: function() {
                return p
            },
            set: function(a) {
                p = da(a) ? a : [];
                for (a = 0; a < p.length; a++) p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216
            }
        });
        this.colors = c;
        var s = [];
        Object.defineProperty(this, "alphas", {
            enumerable: !0,
            get: function() {
                return s
            },
            set: function(a) {
                s = da(a) ? a : [];
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) s[b] = Math.min(1, Math.floor(Number(255 * (null != s[b] ? Number(s[b]) :
                    1))) / 255);
                s.length = a
            }
        });
        this.alphas = d;
        var u = [];
        Object.defineProperty(this, "ratios", {
            enumerable: !0,
            get: function() {
                return u
            },
            set: function(a) {
                u = da(a) ? a : [];
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) {
                    var c = null != u[b] ? Number(u[b]) : 0,
                        c = Math.floor(c);
                    0 > c ? c = 0 : 255 < c && (c = 255);
                    u[b] = c
                }
                u.length = a
            }
        });
        this.ratios = e;
        this.blurX = k(f) ? f : 4;
        this.blurY = k(h) ? h : 4;
        this.quality = k(n) ? n : 1;
        this.strength = k(l) ? l : 1;
        this.knockout = k(t) ? t : !1;
        this.type = k(r) ? r : "inner";
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return new Re(this.angle *
                    Math.PI / 180, p, s, u, this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
            }
        })
    };
    A(Se, "GradientGlowFilter", oi);
    var vi = function() {
        this.Sa = {};
        this.fm = this.Fj = 0;
        B(this, null, 3)
    };
    A(vi, "Key");
    vi.prototype.getAscii = function() {
        return this.fm
    };
    vi.prototype.getCode = function() {
        return this.Fj
    };
    vi.prototype.isDown = function(a) {
        return !!this.Sa[a]
    };
    vi.prototype.isToggled = function() {
        return !1
    };
    Object.defineProperties(vi.prototype, {
        BACKSPACE: {
            value: 8
        },
        CAPSLOCK: {
            value: 20
        },
        CONTROL: {
            value: 17
        },
        DELETEKEY: {
            value: 46
        },
        DOWN: {
            value: 40
        },
        END: {
            value: 35
        },
        ENTER: {
            value: 13
        },
        ESCAPE: {
            value: 27
        },
        HOME: {
            value: 36
        },
        INSERT: {
            value: 45
        },
        LEFT: {
            value: 37
        },
        PGDN: {
            value: 34
        },
        PGUP: {
            value: 33
        },
        RIGHT: {
            value: 39
        },
        SHIFT: {
            value: 16
        },
        SPACE: {
            value: 32
        },
        TAB: {
            value: 9
        },
        UP: {
            value: 38
        }
    });
    vi.prototype.mj = function(a) {
        this.Fj = a.keyCode;
        this.Sa[a.keyCode] = !1
    };
    vi.prototype.lj = function(a) {
        this.Fj = a.keyCode;
        this.fm = a.charCode;
        this.Sa[a.keyCode] = !0
    };
    var wi = {
        37: 1,
        39: 2,
        36: 3,
        35: 4,
        45: 5,
        46: 6,
        8: 8,
        13: 13,
        38: 14,
        40: 15,
        33: 16,
        34: 17,
        9: 18,
        27: 19
    };
    vi.prototype.As = function() {
        var a = wi[this.Fj];
        return a ? a : this.fm
    };
    B(vi.prototype, null, 3);
    var xi = function(a, b, c, d, e, f) {
        Object.defineProperty(this, "__swiffy_v", {
            writable: !0,
            value: Uc(k(a) ? a : 1, k(b) ? b : 0, k(c) ? c : 0, k(d) ? d : 1, k(e) ? e : 0, k(f) ? f : 0)
        })
    };
    A(xi, "Matrix", qi);
    var yi = function(a) {
            return a instanceof xi ? (a = a.__swiffy_v, a.Uc(20 * a.p, 20 * a.q)) : Ic
        },
        zi = function(a) {
            return new xi(a.l, a.o, a.m, a.k, a.p / 20, a.q / 20)
        };
    Object.defineProperty(xi.prototype, "a", {
        get: function() {
            return this.__swiffy_v.l
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(a, b.o, b.m, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(xi.prototype, "b", {
        get: function() {
            return this.__swiffy_v.o
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, a, b.m, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(xi.prototype, "c", {
        get: function() {
            return this.__swiffy_v.m
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, b.o, a, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(xi.prototype, "d", {
        get: function() {
            return this.__swiffy_v.k
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, b.o, b.m, a, b.p, b.q)
        }
    });
    Object.defineProperty(xi.prototype, "tx", {
        get: function() {
            return this.__swiffy_v.p
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = b.Uc(a, b.q)
        }
    });
    Object.defineProperty(xi.prototype, "ty", {
        get: function() {
            return this.__swiffy_v.q
        },
        set: function(a) {
            var b = this.__swiffy_v;
            this.__swiffy_v = b.Uc(b.p, a)
        }
    });
    xi.prototype.clone = function() {
        var a = new xi;
        a.__swiffy_v = this.__swiffy_v;
        return a
    };
    xi.prototype.concat = function(a) {
        this.__swiffy_v = this.__swiffy_v.multiply(a.__swiffy_v)
    };
    xi.prototype.copyFrom = function(a) {
        this.__swiffy_v = a.__swiffy_v
    };
    xi.prototype.createBox = function(a, b, c, d, e) {
        this.__swiffy_v = Ic.Xh(-(c || 0)).Ae(a, b).Cd(d || 0, e || 0)
    };
    xi.prototype.createGradientBox = function(a, b, c, d, e) {
        this.__swiffy_v = Ai(a, b, c, d, e)
    };
    xi.prototype.deltaTransformPoint = function(a) {
        var b = this.__swiffy_v;
        return new Bi(b.l * a.x + b.m * a.y, b.o * a.x + b.k * a.y)
    };
    xi.prototype.identity = function() {
        this.__swiffy_v = Ic
    };
    xi.prototype.invert = function() {
        var a = this.__swiffy_v;
        this.__swiffy_v = a.Ql() ? a.Rd() : Uc(Infinity, 0, 0, Infinity, NaN, NaN)
    };
    xi.prototype.rotate = function(a) {
        this.__swiffy_v = this.__swiffy_v.Xh(-a)
    };
    xi.prototype.scale = function(a, b) {
        this.__swiffy_v = this.__swiffy_v.Ae(a, b)
    };
    xi.prototype.transformPoint = function(a) {
        var b = this.__swiffy_v;
        return new Bi(b.l * a.x + b.m * a.y + b.p, b.o * a.x + b.k * a.y + b.q)
    };
    xi.prototype.translate = function(a, b) {
        this.__swiffy_v = this.__swiffy_v.Cd(a, b)
    };
    xi.prototype.toString = function() {
        return "(a=" + this.__swiffy_v.l + ", b=" + this.__swiffy_v.o + ", c=" + this.__swiffy_v.m + ", d=" + this.__swiffy_v.k + ", tx=" + this.__swiffy_v.p + ", ty=" + this.__swiffy_v.q + ")"
    };
    var Ci = function() {
        Object.defineProperty(this, "__swiffy_mv", {
            value: !0,
            writable: !0
        });
        B(this, null, 3)
    };
    A(Ci, "Mouse");
    Ci.prototype.Wd = function() {
        this.broadcastMessage("onMouseDown")
    };
    Ci.prototype.ag = function() {
        this.broadcastMessage("onMouseMove")
    };
    Ci.prototype.dg = function() {
        this.broadcastMessage("onMouseUp")
    };
    Ci.prototype.hide = function() {
        var a = this.__swiffy_mv;
        this.__swiffy_mv = !1;
        return a
    };
    Ci.prototype.show = function() {
        var a = this.__swiffy_mv;
        this.__swiffy_mv = !0;
        return a
    };
    B(Ci.prototype, null, 3);
    var Di = function() {
        this.__swiffy_vm.Vg(this)
    };
    A(Di, "MovieClipLoader");
    Zh(Di);
    Di.prototype.checkPolicyFile = !1;
    Di.prototype.loadClip = function(a, b) {
        if (a && b) {
            var c = this.__swiffy_vm;
            a = c.Qa(a);
            var d = this,
                e = b.__swiffy_d;
            ha(b) ? e = c.c.kb : fa(b) ? e = c.Vf(b).__swiffy_d : e.Ef(vd(a));
            c = new pd;
            c.bc = function(c, h) {
                d.broadcastMessage("onLoadStart", b);
                d.broadcastMessage("onLoadProgress", b, 1024, 1024);
                d.broadcastMessage("onLoadComplete", b, h);
                ha(b) ? gd(e.c, b, c, function(b) {
                    b.Ef(vd(a))
                }, function() {
                    d.broadcastMessage("onLoadInit", b)
                }) : ed(e, c, function() {
                    d.broadcastMessage("onLoadInit", b)
                })
            };
            c.Gc = function(a) {
                d.broadcastMessage("onLoadError",
                    b, a)
            };
            ud(a, e.c, "", this, c)
        }
    };
    Di.prototype.getProgress = function() {
        return {
            bytesLoaded: 1024,
            bytesTotal: 1024
        }
    };
    Di.prototype.unloadClip = function(a) {
        (a = a && a.__swiffy_d) && a.kl(new Ei(0, 0, null, a.definition.$c))
    };
    var Fi = function() {
        this.isConnected = !1
    };
    A(Fi, "NetConnection");
    Fi.prototype.connect = function() {
        return !0
    };
    var Gi = function() {
        Object.defineProperty(this, "__swiffy_v", {
            value: {
                dm: 0,
                Th: .1,
                Uh: 0,
                Vh: 0,
                em: 0,
                time: 0,
                paused: !1
            }
        })
    };
    A(Gi, "NetStream");
    Gi.prototype.play = function() {};
    Gi.prototype.close = function() {};
    Gi.prototype.pause = function() {};
    Gi.prototype.receiveAudio = function() {};
    Gi.prototype.receiveVideo = function() {};
    Gi.prototype.seek = function() {};
    Gi.prototype.setBufferTime = function(a) {
        this.__swiffy_v.Th = a
    };
    Object.defineProperty(Gi.prototype, "bufferTime", {
        get: function() {
            return this.__swiffy_v.Th
        }
    });
    Object.defineProperty(Gi.prototype, "bufferLength", {
        get: function() {
            return this.__swiffy_v.dm
        }
    });
    Object.defineProperty(Gi.prototype, "bytesLoaded", {
        get: function() {
            return this.__swiffy_v.Uh
        }
    });
    Object.defineProperty(Gi.prototype, "bytesTotal", {
        get: function() {
            return this.__swiffy_v.Vh
        }
    });
    Object.defineProperty(Gi.prototype, "currentFps", {
        get: function() {
            return this.__swiffy_v.em
        }
    });
    Object.defineProperty(Gi.prototype, "time", {
        get: function() {
            return this.__swiffy_v.time
        }
    });
    var Bi = function(a, b) {
        this.x = k(a) ? a : 0;
        this.y = k(b) ? b : 0
    };
    A(Bi, "Point", qi);
    Object.defineProperty(Bi.prototype, "length", {
        get: function() {
            return Pc(this.x, this.y)
        }
    });
    Bi.prototype.add = function(a) {
        return new Bi(this.x + a.x, this.y + a.y)
    };
    Bi.prototype.clone = function() {
        return new Bi(this.x, this.y)
    };
    Bi.distance = function(a, b) {
        return Pc(a.x - b.x, a.y - b.y)
    };
    Bi.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y
    };
    Bi.interpolate = function(a, b, c) {
        return new Bi(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c))
    };
    Bi.prototype.normalize = function(a) {
        a /= this.length;
        this.x *= a;
        this.y *= a
    };
    Bi.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    Bi.polar = function(a, b) {
        return new Bi(a * Math.cos(b), a * Math.sin(b))
    };
    Bi.prototype.subtract = function(a) {
        return new Bi(this.x - a.x, this.y - a.y)
    };
    Bi.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ")"
    };
    var Hi = function(a, b, c, d) {
        this.x = k(a) ? a : 0;
        this.y = k(b) ? b : 0;
        this.width = k(c) ? c : 0;
        this.height = k(d) ? d : 0
    };
    A(Hi, "Rectangle", qi);
    Object.defineProperty(Hi.prototype, "top", {
        get: function() {
            return this.y
        },
        set: function(a) {
            this.y = a
        }
    });
    Object.defineProperty(Hi.prototype, "left", {
        get: function() {
            return this.x
        },
        set: function(a) {
            this.x = a
        }
    });
    Object.defineProperty(Hi.prototype, "bottom", {
        get: function() {
            return this.y + this.height
        },
        set: function(a) {
            this.height = a - this.y
        }
    });
    Object.defineProperty(Hi.prototype, "right", {
        get: function() {
            return this.x + this.width
        },
        set: function(a) {
            this.width = a - this.x
        }
    });
    Object.defineProperty(Hi.prototype, "topLeft", {
        get: function() {
            return new Bi(this.left, this.top)
        },
        set: function(a) {
            this.left = a.x;
            this.top = a.y
        }
    });
    Object.defineProperty(Hi.prototype, "bottomRight", {
        get: function() {
            return new Bi(this.right, this.bottom)
        },
        set: function(a) {
            this.right = a.x;
            this.bottom = a.y
        }
    });
    Object.defineProperty(Hi.prototype, "size", {
        get: function() {
            return new Bi(this.width, this.height)
        },
        set: function(a) {
            this.width = a.x;
            this.height = a.y
        }
    });
    Hi.prototype.clone = function() {
        return new Hi(this.x, this.y, this.width, this.height)
    };
    Hi.prototype.contains = function(a, b) {
        return this.x <= a && this.y <= b && a < this.right && b < this.bottom
    };
    Hi.prototype.containsPoint = function(a) {
        return this.contains(a.x, a.y)
    };
    Hi.prototype.containsRectangle = function(a) {
        var b = this.right,
            c = this.bottom,
            d = a.right,
            e = a.bottom;
        return this.x <= a.x && this.y <= a.y && a.x < b && a.y < c && this.x < d && this.y < e && d <= b && e <= c
    };
    Hi.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height
    };
    Hi.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height
    };
    Hi.prototype.inflate = function(a, b) {
        this.x -= a;
        this.y -= b;
        this.width += 2 * a;
        this.height += 2 * b
    };
    Hi.prototype.inflatePoint = function(a) {
        this.inflate(a.x, a.y)
    };
    Hi.prototype.intersection = function(a) {
        if (this.intersects(a)) {
            var b = Math.max(this.x, a.x),
                c = Math.max(this.y, a.y),
                d = Math.min(this.right, a.right);
            a = Math.min(this.bottom, a.bottom);
            return new Hi(b, c, d - b, a - c)
        }
        return new Hi
    };
    Hi.prototype.intersects = function(a) {
        return 0 < a.width && 0 < a.height && 0 < this.width && 0 < this.height && a.x < this.right && a.y < this.bottom && a.right > this.x && a.bottom > this.y
    };
    Hi.prototype.isEmpty = function() {
        return 0 >= this.width || 0 >= this.height
    };
    Hi.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    Hi.prototype.offsetPoint = function(a) {
        this.offset(a.x, a.y)
    };
    Hi.prototype.setEmpty = function() {
        this.height = this.width = this.y = this.x = 0
    };
    Hi.prototype.union = function(a) {
        if (this.isEmpty()) return a.clone();
        if (a.isEmpty()) return this.clone();
        var b = Math.min(this.x, a.x),
            c = Math.min(this.y, a.y),
            d = Math.max(this.right, a.right);
        a = Math.max(this.bottom, a.bottom);
        return new Hi(b, c, d - b, a - c)
    };
    Hi.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")"
    };
    var Ii = function() {};
    Ii.prototype.valueOf = function() {};
    var qi = function(a) {
        return null != a ? Object(a) : new Ii
    };
    "__proto__" in Object || Object.defineProperty(qi.prototype, "__proto__", {
        get: function() {
            return Object.getPrototypeOf(this)
        }
    });
    var Ji = function(a) {
            return null != a ? Object(a) : Object.create(qi.prototype)
        },
        Ki = {};
    qi.registerClass = function(a, b) {
        if (2 > arguments.length) return !1;
        Ki[a] = b;
        return !0
    };
    B(qi, null, 3);
    var F = function() {};
    ji(F, qi);
    F.prototype.valueOf = function() {
        return this
    };
    F.prototype.getDepth = function() {
        var a = this.__swiffy_d;
        return a ? a.depth : void 0
    };
    var Li = function(a, b, c, d) {
            Object.defineProperty(a, b, {
                get: function() {
                    var a = this.__swiffy_d;
                    if (a) return c.call(this, a)
                },
                set: function(a) {
                    var c = this.__swiffy_d;
                    c ? d.call(this, c, a) : Object.defineProperty(this, b, {
                        value: a
                    })
                }
            })
        },
        Mi = function(a, b, c, d) {
            Li(a, b, c, function(a, b) {
                var c = a.c.ha().zd(b);
                isNaN(c) || d.call(this, a, c)
            })
        },
        Ni = function(a, b) {
            Li(a, b, function() {
                return 0
            }, function() {})
        },
        Oi = function(a, b, c) {
            Li(a, b, c, function() {})
        };
    Mi(F.prototype, "_x", function(a) {
        return a.Za().p / 20
    }, function(a, b) {
        var c = a.Za();
        a.setTransform(c.Cd(20 * b - c.p, 0));
        a.cb()
    });
    Mi(F.prototype, "_y", function(a) {
        return a.Za().q / 20
    }, function(a, b) {
        var c = a.Za();
        a.setTransform(c.Cd(0, 20 * b - c.q));
        a.cb()
    });
    Mi(F.prototype, "_xscale", function(a) {
        return 100 * a.Bc().rd
    }, function(a, b) {
        a.Bc().rd = b / 100;
        a.lg();
        a.cb()
    });
    Mi(F.prototype, "_yscale", function(a) {
        return 100 * a.Bc().Be
    }, function(a, b) {
        a.Bc().Be = b / 100;
        a.lg();
        a.cb()
    });
    Mi(F.prototype, "_alpha", function(a) {
        return (256 * a.Fb.ua | 0) / 2.56
    }, function(a, b) {
        var c = a.Fb;
        a.pc(new Yc(c.xa, c.sa, c.wa, c.qa, c.va, c.pa, b / 100, c.ta));
        a.cb()
    });
    Mi(F.prototype, "_visible", function(a) {
        return a.ze
    }, function(a, b) {
        a.Ii(Boolean(b))
    });
    Mi(F.prototype, "_rotation", function(a) {
        return -180 * a.Bc().angle / Math.PI
    }, function(a, b) {
        a.Bc().angle = -b * Math.PI / 180;
        a.lg();
        a.cb()
    });
    Li(F.prototype, "_name", function(a) {
        return a.getName()
    }, function(a, b) {
        a.Pb(b)
    });
    Ni(F.prototype, "_quality");
    Ni(F.prototype, "_highquality");
    Ni(F.prototype, "_soundbuftime");
    Oi(F.prototype, "_parent", function(a) {
        return (a = a.getParent()) && a != a.c.ia ? a.$ : void 0
    });
    Oi(F.prototype, "_xmouse", function(a) {
        var b = a.c.Rb.clone();
        b.na(a.Wc());
        return b.x / 20
    });
    Oi(F.prototype, "_ymouse", function(a) {
        var b = a.c.Rb.clone();
        b.na(a.Wc());
        return b.y / 20
    });
    Oi(F.prototype, "_url", function(a) {
        return null === a.vd ? a.cl().vd.replace(/^([^?#]+)\.html?\b/, "$1") : a.vd
    });
    Mi(F.prototype, "_width", function(a) {
        return a.Fa()
    }, function(a, b) {
        a.qm(b);
        a.cb()
    });
    Mi(F.prototype, "_height", function(a) {
        return a.Ta()
    }, function(a, b) {
        a.pm(b);
        a.cb()
    });
    Oi(F.prototype, "_root", function(a) {
        for (; a && !a.li && a.getParent() != a.c.ia;) a = a.getParent();
        return a ? a.$ : void 0
    });
    Oi(F.prototype, "_target", function(a) {
        for (var b = ""; a && a.getName();) b = "/" + a.getName() + b, a = a.getParent();
        a && a.getParent() == a.c.ia && (a = a.depth - -16384) && (b = "_level" + a + b);
        return b || "/"
    });
    Li(F.prototype, "filters", function(a) {
        var b = [];
        a = a.Ib;
        for (var c = 0; c < a.length; c++) b.push(a[c].of());
        return b
    }, function(a, b) {
        for (var c = [], d = 0; null != b && d < b.length; d++) {
            var e = b[d].__swiffy_v;
            c.push(e ? e : new Ue)
        }
        a.Cf(c)
    });
    Li(F.prototype, "transform", function(a) {
        return new Pi(a)
    }, function(a, b) {
        if (ia(b)) {
            var c = new Pi(a);
            c.colorTransform = b.colorTransform;
            c.matrix = b.matrix
        }
    });
    B(F.prototype, null, 3);
    var Vg = function(a) {
            var b = 0,
                c = Qi(function() {
                    return a.charCodeAt(b++)
                });
            return Uc(c() / 65536 + 1, c() / 65536, c() / 65536, c() / 65536 + 1, c(), c())
        },
        Oe = function(a) {
            for (var b = [], c = 0, d = Ri(function() {
                    return a.charCodeAt(c++)
                }), e = 0; c < a.length;) e += parseInt(d(), 10), b.push(e);
            return b
        },
        Ri = function(a) {
            return function() {
                var b = a();
                if (58 == b) return 0;
                for (var c = ""; 48 <= b && 57 >= b;) c += String.fromCharCode(b), b = a();
                return (97 <= b ? b - 96 : -(b - 64)) + c
            }
        },
        Qi = function(a) {
            var b = Ri(a);
            return function() {
                return parseInt(b(), 10)
            }
        },
        Si = function(a) {
            a =
                Number(a);
            return isFinite(a) ? a : 0
        },
        nh = function(a) {
            var b = 0,
                c = Qi(function() {
                    return a.charCodeAt(b++)
                });
            return new Yc((c() + 256) / 256, c(), (c() + 256) / 256, c(), (c() + 256) / 256, c(), (c() + 256) / 256, c())
        },
        Jg = function(a, b) {
            var c = a,
                d = c & 255,
                c = c >> 8,
                e = c & 255,
                c = c >> 8,
                f = c & 255,
                c = c >> 8 & 255,
                c = c / 255;
            b && (f = f * b.xa + b.sa, e = e * b.wa + b.qa, d = d * b.va + b.pa, c = c * b.ua + b.ta / 255);
            return new Vc(f, e, d, c)
        },
        Ti = function(a) {
            a = a.replace(/^ *rgb *\( *([^,]+) *, *([^,]+) *, *([^,]+) *\) *$/, function(a, c, d, e) {
                return (c << 16) + (d << 8) + (e << 0)
            });
            a = a.replace(/^ *#([0-9a-fA-F]+) *$/,
                function(a, c) {
                    var d = parseInt(c, 16);
                    return 4278190080 | d
                });
            return a | 0
        },
        Ui = function(a, b) {
            var c = new Jc(20 * b.x, 20 * b.y);
            c.na(a);
            c.x /= 20;
            c.y /= 20;
            return c
        },
        Sg = function(a, b, c) {
            return a + (b - a) * c
        },
        Vi = function(a) {
            a = String(a).trim();
            return "0" == a.charAt(0) && "x" != a.charAt(1).toLowerCase()
        },
        Wi = function(a) {
            return "__swiffy_" == a.substr(0, 9)
        },
        Xi = function(a, b, c) {
            if (a)
                for (var d in a) {
                    var e = a[d];
                    if (!("$" == d.charAt(0) || Wi(d) || e instanceof F)) {
                        da(e) || (e = [e]);
                        for (var f = 0; f < e.length; ++f) b.call(c, d, String(e[f]))
                    }
                }
        },
        jd = function(a,
            b) {
            var c;
            fa(a) ? c = a : (c = new pc, Xi(a, c.add, c), c = c.toString());
            if (!b) return c;
            if (!c) return b;
            var d = b.indexOf("?") + 1;
            return b = d ? b.slice(0, d) + c + "&" + b.slice(d) : b + ("?" + c)
        },
        sd = function(a) {
            var b = a.internedStrings;
            b && (delete a.internedStrings, Yi(a, b))
        },
        Yi = function(a, b) {
            for (var c in a) {
                var d = a[c];
				
				if (c === "__parent")
				{
					return;
				}
				
                "string" == typeof d && "#" == d.charAt(0) ? a[c] = b[d.substr(1)] : d instanceof Object && Yi(d, b)
            }
        },
        Zi = function(a) {
            a = a.replace(/\+/g, " ");
            try {
                return decodeURIComponent(a)
            } catch (b) {
                for (var c = "", d = 0, e = d; e < a.length; d = e) {
                    e = a.indexOf("%",
                        d);
                    if (0 > e) break;
                    for (var c = c + a.substring(d, e), f = d = 0; e < a.length;) {
                        var h = a.charCodeAt(e++);
                        if (37 === h) {
                            if (!/[0-9a-fA-F]/.test(a.charAt(e)) || !/[0-9a-fA-F]/.test(a.charAt(++e)))
                                if (0 < f) continue;
                                else break;
                            h = parseInt(a.substr(++e - 2, 2), 16)
                        }
                        if (0 < f) d = (d << 6) + (h & 63), f--;
                        else if (192 === (h & 192)) {
                            for (; h & 64;) h <<= 1, f++;
                            d = (h & 127) >> f
                        } else d = h;
                        if (0 === f) {
                            c += String.fromCharCode(d);
                            break
                        }
                    }
                }
                return c + a.substring(d)
            }
        },
        $i = function(a) {
            var b = a.indexOf("?"),
                c = a.indexOf("#");
            return 0 <= b && (0 > c || c > b) ? qd(a.substring(b + 1)) : {}
        },
        qd = function(a,
            b) {
            var c = {};
            if (a)
                for (var d = a.split("&"), e = 0; e < d.length; e++) {
                    var f = d[e],
                        h = f.indexOf("="),
                        l = 0 <= h ? f.substring(0, h) : f;
                    if (l || b) f = 0 <= h ? f.substring(h + 1) : "", l = Zi(l), f = Zi(f), l in c || (c[l] = []), c[l].push(f)
                }
            return c
        },
        aj = function(a, b) {
            if (b in a) {
                for (var c; !c && a; a = Object.getPrototypeOf(a)) c = Object.getOwnPropertyDescriptor(a, b);
                return c
            }
        },
        bj = function(a, b) {
            return k(a) ? a : b
        },
        rg = function(a, b) {
            var c = document.createElement("canvas");
            c.width = a;
            c.height = b;
            return c
        };
    var cj = function(a, b, c) {
        "_self" == b && this.kw() && (b = "_parent");
        if (c) {
            var d = b;
            b = document.createElement("form");
            b.method = "post";
            b.action = a;
            b.target = d;
            a = [];
            for (d = 0; d < c.length;) {
                var e = c[d++],
                    f = c[d++];
                a.push('<input type="hidden" name="', ya(e));
                k(f) && a.push('" value="', ya(f));
                a.push('" />')
            }
            b.innerHTML = a.join("");
            b.style.visibility = "hidden";
            document.body.appendChild(b);
            b.submit();
            document.body.removeChild(b)
        } else window.open(a, b)
    };
    var dj = function(a) {
            this.Cb = a || [];
            this.lm = this.mm = null
        },
        ej = {
            0: 1,
            1: 1,
            2: 2,
            3: 0
        };
    dj.prototype.Ad = function(a, b) {
        for (var c = 0, d = 0, e = 0, f = this.Cb; c < f.length;) switch (f[c++]) {
            case 0:
                d = f[c++];
                e = f[c++];
                break;
            case 1:
                a.Ad(d, e, b, b);
                d = f[c++];
                e = f[c++];
                a.Ad(d, e, b, b);
                break;
            case 2:
                var h = f[c++],
                    l = f[c++],
                    n = f[c++],
                    r = f[c++],
                    t = (h - d) / (2 * h - d - n),
                    p = (l - e) / (2 * l - e - r);
                0 < p && 1 > p && a.Ad(d, (1 - p) * (1 - p) * e + 2 * (1 - p) * p * l + p * p * r, b, b);
                0 < t && 1 > t && a.Ad((1 - t) * (1 - t) * d + 2 * (1 - t) * t * h + t * t * n, e, b, b);
                d = n;
                e = r;
                a.Ad(d, e, b, b)
        }
    };
    dj.prototype.Kn = function(a) {
        fj(a, this.Cb, 1, 0, 0, 1, 0, 0)
    };
    var fj = function(a, b, c, d, e, f, h, l) {
        a.moveTo(h, l);
        for (var n = b.length, r = 0; r < n;) {
            var t = b[r++];
            if (3 === t) a.closePath();
            else {
                var p = b[r] * c + b[r + 1] * e + h,
                    s = b[r] * d + b[r + 1] * f + l,
                    r = r + 2;
                if (0 === t) a.moveTo(p, s);
                else if (1 === t) a.lineTo(p, s);
                else if (2 === t) {
                    var t = b[r] * c + b[r + 1] * e + h,
                        u = b[r] * d + b[r + 1] * f + l,
                        r = r + 2;
                    a.quadraticCurveTo(p, s, t, u)
                }
            }
        }
    };
    dj.prototype.$a = function() {
        for (var a = 0; a < this.Cb.length;) switch (this.Cb[a++]) {
            case 0:
                a += 2;
            case 3:
                break;
            case 1:
            case 2:
                return !1;
            default:
                return !1
        }
        return !0
    };
    dj.prototype.Vq = function() {
        for (var a = [], b = 0; b < this.Cb.length;) {
            var c = this.Cb[b++];
            3 != c && a.push(c);
            for (var d = 0; d < 2 * ej[c]; d++) a.push(this.Cb[b++])
        }
        return new dj(a)
    };
    var xh = function(a) {
            return new dj(gj(a))
        },
        gj = function(a) {
            for (var b = a.length, c = 0, d = Qi(function() {
                    return a.charCodeAt(c++)
                }), e = 0, f = 0, h = []; c < b;) {
                var l = d();
                h.push(l);
                switch (l) {
                    case 2:
                        h.push(e + d(), f + d());
                    case 0:
                    case 1:
                        e += d(), f += d(), h.push(e, f)
                }
            }
            return h
        };
    g = dj.prototype;
    g.js = function(a) {
        this.mm || this.Kq();
        fj(a, this.mm, 1, 0, 0, 1, 0, 0)
    };
    g.hs = function(a) {
        this.lm || this.Kq();
        fj(a, this.lm, 1, 0, 0, 1, 0, 0)
    };
    g.Zu = function(a, b) {
        for (var c = 0, d = []; c < this.Cb.length;) {
            var e = this.Cb[c++];
            d.push(e);
            for (var f = 0; f < 2 * ej[e]; f++) d.push(Sg(this.Cb[c], a.Cb[c++], b))
        }
        return new dj(d)
    };
    g.Kq = function() {
        for (var a = [], b = [], c = 0, d = 0, e = 0, f = 0, h = this.Cb, l = function(a, b, c) {
                if (a !== b) {
                    var d = h[a];
                    a = h[a + 1];
                    var e = d - h[b];
                    b = a - h[b + 1];
                    var f = 10 * Math.max(Math.abs(e), Math.abs(b));
                    c.push(0, d, a, 1, d - e / f, a - b / f, 1, d, a)
                }
            }, n = h.length, r = 0; r < n;) {
            var t = h[r++];
            3 == t && (d = e = f = c);
            0 == t ? (l(c, d, a), l(f, e, b), d = e = f = c = r, r += 2) : (c === d && (d = r), e = f, f = r, r += 2, 2 === t && (e = f, f = r, r += 2))
        }
        l(c, d, a);
        l(f, e, b);
        this.mm = a;
        this.lm = b
    };
    g.moveTo = function(a, b) {
        this.Cb.push(0, a, b);
        return this
    };
    g.lineTo = function(a, b) {
        this.Cb.push(1, a, b);
        return this
    };
    g.close = function() {
        this.Cb.push(3);
        return this
    };
    g.Lb = function(a, b, c, d) {
        this.Cb.push(2, a, b, c, d);
        return this
    };
    var hj = [null, "reflect", "repeat"],
        ij = [null, "linearRGB"],
        jj = 10 / 16384,
        Ai = function(a, b, c, d, e) {
            c = Number(c || 0);
            d = Number(d || 0);
            e = Number(e || 0);
            a = Number(a);
            b = Number(b);
            return Ic.Xh(-c).Ae(a * jj, b * jj).Cd(a / 2 + d, b / 2 + e)
        },
        kj = function(a) {
            this.color = a
        };
    kj.prototype.Hb = !0;
    kj.prototype.wb = function(a, b, c) {
        a = this.color.ub(a);
        a = c.apply(a);
        b.fillStyle = a.Jd();
        b.fill("evenodd")
    };
    var lj = function(a, b, c) {
        this.transform = a;
        this.stops = b;
        this.Hk = hj[c]
    };
    lj.prototype.qn = function(a, b, c, d, e) {
        var f = b,
            h = 1 / (c - b);
        switch (this.Hk) {
            case "reflect":
                for (f & 1 && (++f, this.ai(a, b - f, -h, d, e)); f + 1 < c;) this.ai(a, f - b, h, d, e), f += 2, this.ai(a, b - f, -h, d, e);
            case "repeat":
                for (; f < c;) this.ai(a, f - b, h, d, e), ++f;
                break;
            default:
                this.ai(a, 0, 1, d, e)
        }
    };
    lj.prototype.ai = function(a, b, c, d, e) {
        for (var f = this.stops, h = 0; h < f.length; h++) {
            var l = (f[h].offset.ub(d) + b) * c,
                n = f[h].color.ub(d),
                n = e.apply(n);
            a && a.addColorStop(l, n.Jd())
        }
    };
    lj.prototype.Hb = !1;
    var mj = function(a, b, c, d) {
        lj.call(this, a, b, c, d)
    };
    q(mj, lj);
    mj.prototype.xd = function(a, b, c) {
        a = new Jc(a, b);
        a.na(c);
        return a.x
    };
    mj.prototype.wb = function(a, b, c) {
        b.save();
        var d = this.transform.ub(a);
        d.wb(b);
        var e = -1,
            f = 1;
        if (this.Hk) {
            var h = a.zf(),
                d = d.Rd(),
                l = this.xd(h.j, h.i, d);
            l < e && (e = l);
            l > f && (f = l);
            l = this.xd(h.t, h.i, d);
            l < e && (e = l);
            l > f && (f = l);
            l = this.xd(h.j, h.s, d);
            l < e && (e = l);
            l > f && (f = l);
            l = this.xd(h.t, h.s, d);
            l < e && (e = l);
            l > f && (f = l);
            f = Math.ceil(Math.min(25, f)) | 1;
            e = Math.floor(Math.max(-25, e)) - 1 | 1
        }
        h = b.createLinearGradient(e, 0, f, 0);
        this.qn(h, (e + 1) / 2, (f + 1) / 2, a, c);
        b.fillStyle = h;
        b.fill("evenodd");
        b.restore()
    };
    mj.prototype.Hb = !1;
    var nj = function(a, b, c, d, e) {
        lj.call(this, a, b, c, d);
        this.wn = e
    };
    q(nj, lj);
    nj.prototype.xd = function(a, b, c, d, e) {
        var f = new Jc(b, c);
        f.na(e);
        b = f.x;
        c = f.y;
        e = d * d - 1;
        f = d * (b - d);
        b = (b - d) * (b - d) + c * c;
        if (0 != e) {
            b = f * f - e * b;
            if (0 > b) return a;
            b = 0 < e ? (-f + Math.sqrt(b)) / e : (-f - Math.sqrt(b)) / e
        } else b = -.5 * b / f;
        return b > a ? b : a
    };
    nj.prototype.wb = function(a, b, c) {
        b.save();
        var d = this.transform.ub(a);
        d.wb(b);
        var e = 0;
        this.wn && (e = this.wn.ub(a));
        var f = 1;
        if (this.Hk) var h = a.zf(),
            d = d.Rd(),
            f = this.xd(f, h.j, h.i, e, d),
            f = this.xd(f, h.t, h.i, e, d),
            f = this.xd(f, h.j, h.s, e, d),
            f = this.xd(f, h.t, h.s, e, d),
            f = Math.ceil(Math.min(25, f));
        e = b.createRadialGradient(e, 0, 0, e * (1 - f), 0, f);
        this.qn(e, 0, f, a, c);
        b.fillStyle = e;
        b.fill("evenodd");
        b.restore()
    };
    nj.prototype.Hb = !1;
    var yh = function(a, b) {
        this.Ru = a;
        this.transform = b
    };
    yh.prototype.Aq = function(a, b) {
        var c = this.Ru.Wg;
        if (b.Jg()) return a.globalAlpha = b.ji(1), c;
        var d = c.width,
            e = c.height,
            f = rg(d, e),
            h = f.getContext("2d");
        h.drawImage(c, 0, 0);
        c = h.getImageData(0, 0, d, e);
        zg(c.data, b);
        Rd(h, c, 0, 0);
        return f
    };
    yh.prototype.wb = function(a, b, c) {
        b.save();
        a = this.Aq(b, c);
        this.transform.wb(b);
        b.clip("evenodd");
        b.drawImage(a, 0, 0);
        b.restore()
    };
    yh.prototype.Hb = !1;
    var oj = function(a, b) {
        yh.call(this, a, b)
    };
    q(oj, yh);
    oj.prototype.wb = function(a, b, c) {
        b.save();
        a = this.Aq(b, c);
        a = b.createPattern(a, "repeat");
        this.transform.wb(b);
        b.fillStyle = a;
        b.fill("evenodd");
        b.restore()
    };
    oj.prototype.Hb = !1;
    var qj = function(a, b, c) {
        jf.call(this, b, a, c);
        this.n = null;
        this.Lc = !1;
        this.cj = [];
        this.Fl = this.El = !1;
        a !== pj && (this.n = rg(a.width, a.height).getContext("2d"), this.n.drawImage(a.Wg, 0, 0), this.Lc = a.transparent)
    };
    q(qj, jf);
    var pj = {};
    g = qj.prototype;
    g.xb = function(a, b, c, d) {
        this.n || (this.n = rg(a, b).getContext("2d"), (this.Lc = c) || (d = (d | 4278190080) >>> 0), this.n.fillStyle = Jg(d).Jd(), this.n.fillRect(0, 0, a, b))
    };
    g.Fa = function() {
        return this.n ? this.n.canvas.width : 0
    };
    g.Ta = function() {
        return this.n ? this.n.canvas.height : 0
    };
    g.xe = function() {
        return this.n.canvas
    };
    g.gp = function(a) {
        var b = this.cj;
        0 <= Fa(b, a) || b.push(a)
    };
    g.hp = function(a) {
        Ia(this.cj, a)
    };
    g.Ew = function() {
        this.El = !0
    };
    g.fx = function() {
        this.El = !1;
        this.Fl && this.oh()
    };
    g.oh = function() {
        if (this.El) this.Fl = !0;
        else {
            this.Fl = !1;
            for (var a = 0; a < this.cj.length; ++a) this.cj[a].jq()
        }
    };
    g.ck = function() {
        this.n = null;
        this.oh()
    };
    g.Pu = function(a, b) {
        return this.n.createImageData(a, b)
    };
    g.oe = function(a, b, c, d) {
        return this.n.getImageData(a, b, c, d)
    };
    g.Fh = function(a, b, c) {
        Rd(this.n, a, b, c);
        this.oh()
    };
    g.fillRect = function(a, b, c, d, e) {
        var f = this.n;
        this.Lc ? 4278190080 === (e & 4278190080) || f.clearRect(a, b, c, d) : e = (e | 4278190080) >>> 0;
        0 != e && (f.fillStyle = Jg(e).Jd(), f.fillRect(a, b, c, d));
        this.oh()
    };
    g.Vm = function(a, b, c) {
        var d = this.Pu(1, 1),
            e = d.data;
        e[0] = c >>> 16 & 255;
        e[1] = c >>> 8 & 255;
        e[2] = c & 255;
        e[3] = this.Lc ? c >>> 24 : 255;
        this.Fh(d, a, b)
    };
    g.Xw = function(a, b, c) {
        var d = this.oe(a, b, 1, 1),
            e = d.data;
        e[0] = c >>> 16 & 255;
        e[1] = c >>> 8 & 255;
        e[2] = c & 255;
        this.Fh(d, a, b)
    };
    g.Qm = function(a, b) {
        var c = this.oe(a, b, 1, 1).data;
        return (c[3] << 24 | c[0] << 16 | c[1] << 8 | c[2]) >>> 0
    };
    g.sw = function(a, b) {
        var c = this.oe(a, b, 1, 1).data;
        return (c[0] << 16 | c[1] << 8 | c[2]) >>> 0
    };
    g.uw = function(a, b, c, d) {
        if (0 >= c || 0 >= d) return [];
        a = this.oe(a, b, c, d).data;
        b = Array(Math.floor(a.length / 4));
        for (d = c = 0; d < b.length; d++) b[d] = (a[c++] << 16 | a[c++] << 8 | a[c++] | a[c++] << 24) >>> 0;
        return b
    };
    g.Yw = function(a, b, c, d, e) {
        if (!(0 >= c || 0 >= d)) {
            var f = this.oe(a, b, c, d),
                h = f.data;
            c = Math.min(e.length, c * d * 4);
            d = this.Lc ? 0 : 255;
            for (var l = 0, n = 0; l < c; l++) {
                var r = e[l];
                h[n++] = r >>> 16 & 255;
                h[n++] = r >>> 8 & 255;
                h[n++] = r & 255;
                h[n++] = (r >>> 24 | d) & 255
            }
            this.Fh(f, a, b)
        }
    };
    g.tw = function(a, b, c, d, e) {
        if (0 >= c || 0 >= d) return new Uint8Array(0);
        a = this.oe(a, b, c, d).data;
        if (e)
            for (e = 0; e < a.length; e += 4) b = a[e], a[e] = a[e + 2], a[e + 2] = b;
        else
            for (e = 0; e < a.length; e += 4) b = a[e], a[e] = a[e + 3], a[e + 3] = a[e + 2], a[e + 2] = a[e + 1], a[e + 1] = b;
        return a
    };
    g.au = function(a, b, c, d, e, f) {
        if (!(0 >= c || 0 >= d)) {
            c = this.oe(a, b, c, d);
            d = c.data;
            var h = 4 * Math.floor(Math.min(d.length, e.length) / 4),
                l = this.Lc ? 0 : 255;
            e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
            if (f)
                for (f = 0; f < h; f += 4) d[f] = e[f + 2], d[f + 1] = e[f + 1], d[f + 2] = e[f], d[f + 3] = e[f + 3] | l;
            else
                for (f = 0; f < h; f += 4) d[f] = e[f + 1], d[f + 1] = e[f + 2], d[f + 2] = e[f + 3], d[f + 3] = e[f] | l;
            this.Fh(c, a, b)
        }
    };
    g.scroll = function(a, b) {
        if (a || b) {
            var c = 0 > a ? -a : 0,
                d = 0 > b ? -b : 0,
                e = 0 > a ? 0 : a,
                f = 0 > b ? 0 : b,
                h = this.Fa() - c - e,
                l = this.Ta() - d - f;
            0 < h && 0 < l && this.Fh(this.oe(c, d, h, l), e, f)
        }
    };
    g.ar = function(a, b, c, d, e, f, h, l, n, r, t) {
        d = Math.min(d, a.Fa() - b, this.Fa() - f);
        e = Math.min(e, a.Ta() - c, this.Ta() - h);
        l && (d = Math.min(d, l.Fa() - n), e = Math.min(e, l.Ta() - r));
        if (!(0 >= d || 0 >= e)) {
            var p;
            l && l.Lc ? (p = rg(d, e).getContext("2d"), p.drawImage(a.n.canvas, -b, -c), p.globalCompositeOperation = "destination-in", p.drawImage(l.n.canvas, -n, -r), c = b = 0, a = !0) : (p = a.n, a = a.Lc);
            !a || !t && this.Lc ? Rd(this.n, p.getImageData(b, c, d, e), f, h) : this.n.drawImage(p.canvas, b, c, d, e, f, h, d, e);
            this.oh()
        }
    };
    var rj = function() {
        this.canvas = rg(1, 1)
    };
    rj.prototype.fj = function(a, b, c) {
        b = new qg(this.canvas, b, c, void 0, void 0);
        c = ng.Nd(a);
        var d = !1;
        c.Tc(a, b, 8);
        if (d = 0 < b.getImageData().data[3]) this.canvas.width = 1;
        c.Ia();
        return d
    };
    var sj = function(a, b, c) {
        jf.call(this, a, b, c);
        this.depth = this.vf = void 0;
        this.Ie = "";
        this.tc = this.nextSibling = this.Ca = null;
        this.rk = this.Da = 4100;
        this.Ra = 31;
        this.Ib = [];
        this.Nk = null;
        this.ze = !0;
        this.An = 0;
        this.ki = void 0;
        this.$b = !1;
        this.Qd = Ic;
        this.wf = null;
        this.Fb = Zc;
        this.mn = this.nn = null;
        this.Gk = this.Fb;
        this.Fk = Zc;
        this.Jk = void 0;
        this.zn = !1;
        this.Gb = this.od = this.si = null;
        this.li = !1;
        this.vd = null;
        this.Xc = !1;
        this.fk = this.uc = this.Of = null;
        this.Ik = !1;
        this.Pd = null;
        this.Dc = 471859200
    };
    q(sj, jf);
    var tj = function(a, b) {
        if (!b && a.Ra & 16) return !1;
        a.Ra |= 16;
        a.ca(4096);
        !b && a.ae() || a.Cl(tj);
        return !1
    };
    g = sj.prototype;
    g.Mq = function() {
        if (this.Ra & 16) {
            var a = this.Ca,
                a = a ? a.ld().Gl(this.Fb) : this.Fb;
            this.ae() ? (this.Fk = a, this.Gk = Zc) : (this.Fk = Zc, this.Gk = a);
            this.Ra &= -17
        }
    };
    g.ld = function() {
        this.Mq();
        return this.Gk
    };
    g.eo = function() {
        this.Mq();
        return this.Fk
    };
    g.Ha = function() {
        if (this.Ra & 1) {
            var a = this.Ca || this.Gb && this.Gb.Ca;
            this.nn = a ? this.Qd.multiply(a.Ha()) : this.Qd;
            this.Ra ^= 1
        }
        return this.nn
    };
    g.Wc = function() {
        this.Ra & 2 && (this.mn = this.Ha().Rd(), this.Ra ^= 2);
        return this.mn
    };
    g.Cl = function() {
        return !1
    };
    g.map = function(a) {
        return a(this)
    };
    g.cb = function() {
        this.zn = !0
    };
    g.Vn = function() {
        return !!this.zn
    };
    g.setTransform = function(a) {
        this.Qd.Zc(a) || (this.ca(1), this.Qd = a, this.wf = null, uj(this), this.Ca && this.Ca.dc())
    };
    g.Bc = function() {
        this.wf || (this.wf = this.Qd.Uu());
        return this.wf
    };
    g.lg = function() {
        var a = this.wf;
        if (a) {
            var b = Math.cos(a.angle),
                c = Math.sin(a.angle);
            this.setTransform(Uc(a.rd * b, -a.rd * c, a.rd * b * a.m + a.Be * c * a.k, a.Be * b * a.k - a.rd * c * a.m, this.Qd.p, this.Qd.q));
            this.wf = a
        }
    };
    g.Fa = function() {
        var a = this.tb().kd();
        if (a.$a()) return 0;
        a = a.clone();
        a.na(this.Za());
        return (a.t - a.j) / 20
    };
    g.qm = function(a) {
        if (0 <= a) {
            var b = this.Fa(),
                c = this.Za();
            0 == b ? (b = this.tb().kd().width() / 20, 0 == b && (b = 1), this.setTransform(Uc(a / b, c.o, 0, c.k, c.p, c.q))) : (0 == a && (a = 1 / 1024), this.setTransform(c.Ae(a / b, 1).Uc(c.p, c.q)))
        }
    };
    g.Ta = function() {
        var a = this.tb().kd();
        if (a.$a()) return 0;
        a = a.clone();
        a.na(this.Za());
        return (a.s - a.i) / 20
    };
    g.pm = function(a) {
        if (0 <= a) {
            var b = this.Ta(),
                c = this.Za();
            0 == b ? (b = this.tb().kd().height() / 20, 0 == b && (b = 1), this.setTransform(Uc(c.l, 0, c.m, a / b, c.p, c.q))) : (0 == a && (a = 1 / 1024), this.setTransform(c.Ae(1, a / b).Uc(c.p, c.q)))
        }
    };
    var uj = function(a) {
        a.Ra |= 3;
        a.ca(2048);
        a.Cl(uj);
        0 < a.Ib.length && a.dc();
        return !1
    };
    g = sj.prototype;
    g.dc = function() {
        this.Ra |= 4;
        this.ca(16384);
        this.Ca && this.Ca.dc()
    };
    g.gt = function() {
        this.Ra |= 8;
        this.dc()
    };
    g.Za = function() {
        return this.Qd
    };
    g.Bo = function() {
        return k(this.vf)
    };
    g.kk = function(a) {
        this.vf != a && (this.ca(32768), this.vf = a)
    };
    g.Kd = function() {
        return this.An
    };
    g.ca = function(a) {
        (this.Da & a) != a && (this.Da |= a, this.rk |= a, this.Gb ? this.Gb.ca(32768) : this.Ca && this.Ca.ca(65536))
    };
    g.Ai = function(a) {
        this.An = a
    };
    g.Ia = function() {
        this.ki = !0;
        this.Gb && this.Gb.Oe(null);
        this.c.xs(this) && this.c.Ji();
        this.c.ha().fo(this)
    };
    g.Ud = function() {};
    g.pc = function(a) {
        this.Fb.Zc(a) || (this.ca(4), this.Fb = a, tj(this))
    };
    g.lh = function(a) {
        a != this.ec() && (this.ca(8192), tj(this, !0), (a = (1 < a ? -1 : 0) + (1 < this.ec() ? 1 : 0)) && this.Ca && this.Ca.Yf(a))
    };
    g.Og = function(a) {
        var b = this.ec();
        this.Jk = a;
        this.lh(b)
    };
    g.ec = function() {
        return !this.Jk && (0 < this.Ib.length || this.Ik) ? 1 : this.Jk | 0
    };
    g.Fs = function() {
        var a = this.ec();
        switch (a) {
            case 10:
            case 11:
                var b = this;
                do b = b.getParent(); while (b && !b.ae());
                return b && !b.getParent() ? 100 : a;
            default:
                return a
        }
    };
    g.Oe = function(a) {
        if (this.od != a) {
            this.ca(32768);
            var b = this.od;
            this.Gb && this.Gb.Oe(null);
            b && (b.ca(32768), b.Gb = null, b.getParent() ? b.getParent().ca(65536) : uj(b));
            a && (a.ca(32768), a.Oe(null), a.kk(void 0), a.Gb && a.Gb.Oe(null), a.Gb = this, a.getParent() || uj(a));
            this.od = a
        }
    };
    g.Cf = function(a) {
        if (this.Ib != a && (0 < this.Ib.length || 0 < a.length)) {
            var b = this.ec();
            this.ca(2);
            var c = this.Ib;
            this.Ib = [];
            for (var d = 0, e = 0; e < a.length; e++) {
                for (var f = !1; !f && d < c.length;) c[d].update(a[e]) && (this.Ib.push(c[d]), f = !0), d++;
                f || this.Ib.push(a[e].Kb())
            }
            this.gt();
            this.lh(b)
        }
    };
    g.Gn = function() {
        if (this.Ra & 8) {
            this.Nk = new $c(0, 0, 0, 0);
            for (var a = 0; a < this.Ib.length; a++) this.Nk.add(this.Ib[a].lf());
            this.Ra ^= 8
        }
        return this.Nk
    };
    g.Pb = function(a) {
        a = String(a);
        a != this.Ie && this.Ca && this.Ca.Rl(this, a);
        this.Ie = a
    };
    g.getName = function() {
        return this.Ie
    };
    g.Gf = function(a) {
        if (this.Ca != a) {
            var b = (1 < this.ec() ? 1 : 0) + (this.ae() ? 0 : this.tl());
            this.Ca && (this.Da || b) && (b && this.Ca.Yf(-b), this.Ca.ca(65536));
            (this.Ca = a) && (this.Da || b) && (b && this.Ca.Yf(b), this.Ca.ca(65536))
        }
    };
    g.getParent = function() {
        return this.Ca
    };
    g.Yl = function() {
        for (var a = [], b = this; b; b = b.getParent()) a.push(b);
        return a
    };
    g.fu = function() {
        return this.c.ia.contains(this)
    };
    g.dk = function() {
        for (var a = "", b = this; b && b.getName();) a = "." + b.getName() + a, b = b.getParent();
        b && b.getParent() == b.c.ia && (a = "_level" + (b.depth - -16384) + a);
        return a
    };
    g.cl = function() {
        return this.Pd ? this.Pd : this.getParent() && this.getParent().cl() || this.c.ha().uf()
    };
    g.Wm = function(a) {
        this.Pd = a
    };
    g.Ii = function(a) {
        this.ze != a && (this.ca(8), this.ze = a)
    };
    g.La = function() {
        return !1
    };
    g.eu = function() {
        return !1 === this.ki
    };
    g.Sd = function() {
        return !0 === this.ki
    };
    g.Lg = function(a) {
        this.Dc |= 1 << a
    };
    g.ds = function(a) {
        this.Dc &= ~(1 << a)
    };
    g.fireEvent = function(a, b) {
        var c = !1;
        !this.Xc && this.Dc & 1 << a.type && ((c = this.Sk(a.type)) && c.sound && this.c.Fe().Nn(c.sound), c = this.c.ha().fireEvent(this.$, c, a, b));
        return c
    };
    g.Sk = function() {
        return null
    };
    g.Qu = function(a) {
        return !!this.Sk(a, !0)
    };
    g.tb = function() {
        if (this.Ra & 4) {
            this.si = this.dd();
            if (0 < this.Ib.length) {
                var a = this.si.pb.clone();
                a.na(this.Ha());
                a.add(this.Gn());
                a.na(this.Wc());
                this.si.Ms(a)
            }
            this.Ra ^= 4
        }
        return this.si
    };
    g.zf = function() {
        return this.tb().pb
    };
    g.Ea = function(a, b) {
        this.ki = !1;
        sj.oa.Ea.call(this, a, b)
    };
    g.Ef = function(a) {
        this.vd = a
    };
    g.Ei = function() {
        return this.c.ha().Ei(this)
    };
    g.jn = function(a) {
        this.li = a
    };
    g.contains = function(a) {
        for (; a && a != this;) a = a.getParent();
        return a == this
    };
    g.Rf = function(a) {
        this.Of != a && (this.uc && this.uc.Ia(), this.Da = this.rk, this.uc = a.Nd(this), this.Of = a);
        return this.uc
    };
    g.xo = function() {
        this.uc && this.uc.Ia();
        this.uc = this.Of = null
    };
    g.$w = function(a) {
        this.fk = a
    };
    g.Eu = function() {
        var a = this.Ha(),
            b = this.fk;
        if (!b || !this.Hb() || 0 > a.l || 0 > a.k || a.o || a.m) return null;
        var a = this.Za(),
            c = this.tb().pb;
        return {
            x: {
                scale: a.l,
                translate: a.p,
                offset: c.j,
                size: c.t - c.j,
                Ig: [b.j - c.j, b.t - b.j, c.t - b.t]
            },
            y: {
                scale: a.k,
                translate: a.q,
                offset: c.i,
                size: c.s - c.i,
                Ig: [b.i - c.i, b.s - b.i, c.s - b.s]
            }
        }
    };
    g.tl = function() {
        return 0
    };
    g.ae = function() {
        return 1 <= this.ec()
    };
    g.Yf = function() {};
    g.ps = function(a, b) {
        return (new rj).fj(this, a, b)
    };
    g.Yd = function(a, b, c, d, e) {
        return this.zj(a, b) && e.fj(this, a, b) ? c(this) ? this : d : null
    };
    g.zj = function(a, b) {
        if (this.ze) {
            var c = new Jc(a, b);
            c.na(this.Wc());
            if (this.tb().Kf().contains(c.x, c.y)) return c
        }
        return null
    };
    g.Kf = function(a, b, c) {
        var d = new rj;
        return this.Yd(a, b, c, null, d)
    };
    g.$k = function(a) {
        var b = this.ec();
        this.Ik = a;
        this.lh(b)
    };
    g.qr = function() {
        return this.Ik || 0 < this.Ib.length
    };
    var vj = {
            aq: 27,
            cq: 21
        },
        wj = {
            aq: 28,
            cq: 26
        };
    sj.prototype.Xf = function(a, b, c) {
        c != this.Ca && this.eu() && (this.fireEvent(new Kc(a.aq), !0), this.fu() && this.map(function(c) {
            c.fireEvent(new Kc(a.cq), !0);
            return b
        }))
    };
    var xj = function(a, b, c) {
        sj.call(this, b, pj, c);
        this.ic = a;
        this.Gq = "auto";
        this.smoothing = !1
    };
    q(xj, sj);
    g = xj.prototype;
    g.ec = function() {
        return Math.max(1, xj.oa.ec.call(this))
    };
    g.Ow = function(a) {
        a !== this.ic && (this.ic && this.ic.hp(this), (this.ic = a) && this.ic.gp(this), this.jq())
    };
    g.jq = function() {
        this.ca(262144)
    };
    g.Ea = function(a, b) {
        xj.oa.Ea.call(this, a, b);
        this.ic && this.ic.gp(this)
    };
    g.Ia = function() {
        xj.oa.Ia.call(this);
        this.ic && this.ic.hp(this)
    };
    g.dd = function() {
        var a = this.ic,
            b = a ? 20 * a.Fa() : 0,
            a = a ? 20 * a.Ta() : 0;
        return new bd(new $c(0, 0, b, a))
    };
    var yj = function(a, b, c, d) {
        sj.call(this, a, b, d);
        this.sc = 1;
        this.Ti = !1;
        this.kh = !0;
        this.Ul = [];
        this.Wk = !1;
        this.Xk = 0;
        this.ef = void 0;
        this.tabIndex = -1;
        this.Af = c || yd.Bk();
        this.Dc |= 65011456
    };
    q(yj, sj);
    var zj = function() {
        this.actions = [];
        this.sound = null
    };
    g = yj.prototype;
    g.Sk = function(a, b) {
        var c = this.Ul[a];
        return !c || b && !c.actions.length ? null : c
    };
    g.po = function(a) {
        var b = this.Ul[a];
        b || (b = new zj, this.Ul[a] = b);
        return b
    };
    g.ln = function(a, b, c) {
        var d = this.c.ha(),
            e;
        for (e in Lc) {
            var f = Lc[e];
            if (a & 1 << f) {
                this.Lg(f);
                var h = this.po(f),
                    l = {};
                l.Rk = new Fh(c, d.En(this));
                20 === f && (l.Mn = function(a) {
                    return a.getKey().As() == b
                }, l.stopPropagation = !0);
                h.actions.push(l);
                1 << f & 63045376 && this.vi()
            }
        }
    };
    g.$s = function(a, b) {
        for (var c in Lc) {
            var d = Lc[c];
            a & d && (this.po(d).sound = b)
        }
    };
    g.isEnabled = function() {
        return this.cd() && this.kh
    };
    g.Rm = function() {
        return !!this.ef
    };
    g.cd = function() {
        return this.Ti && !this.Sd() && 0 != this.$.enabled
    };
    g.vi = function() {
        this.Ti || (this.ca(256), this.Ti = !0)
    };
    g.Jb = function(a) {
        this.sc != a && (this.sc = a)
    };
    g.Qw = function(a) {
        this.Wk = a
    };
    g.Qn = function(a) {
        this.kh = a;
        this.ca(256)
    };
    g.trackAsMenu = function() {
        return !1
    };
    g.av = function(a) {
        this.cd() && (this.c.Ne() || this.fireEvent(new Kc(23, a)))
    };
    g.Eq = function(a) {
        if (this.cd()) {
            var b;
            this.c.Ne() || 1 != this.sc ? this.trackAsMenu() && !this.c.Ci() && 1 == this.sc ? (this.Jb(4), b = 14) : this.c.Mi(this) && 2 == this.sc && (this.Jb(4), b = 16) : (this.Jb(2), b = 9);
            b && this.fireEvent(new Kc(b, a))
        }
    };
    g.$u = function(a) {
        this.cd() && (this.c.Ne() || this.fireEvent(new Kc(22, a)))
    };
    g.Dq = function(a) {
        if (this.cd()) {
            var b;
            this.c.Ne() || 2 != this.sc ? this.trackAsMenu() && !this.c.Ci() && 4 == this.sc ? (this.Jb(1), b = 13) : this.c.Mi(this) && 4 == this.sc && (this.Jb(2), b = 15) : (this.Jb(1), b = 8);
            b && this.fireEvent(new Kc(b, a))
        } else this.Jb(1)
    };
    g.Wd = function() {
        this.cd() ? (this.c.setCapture(this, !this.trackAsMenu()), this.Jb(4), this.fireEvent(new Kc(12))) : this.Jb(1)
    };
    g.dg = function() {
        if (this.cd()) {
            var a = this.trackAsMenu() && 0 == this.c.Ci() || this.c.Mi(this);
            this.c.releaseCapture(this);
            this.Jb(2);
            if (a) {
                var a = Qh(),
                    b = a - this.Xk;
                this.Wk && 600 > b ? (this.fireEvent(new Kc(25)), this.Xk = 0) : (this.fireEvent(new Kc(11)), this.Xk = a)
            } else this.fireEvent(new Kc(9))
        } else this.Jb(1)
    };
    g.ag = function() {
        this.isEnabled() && !this.c.Ne() && this.fireEvent(new Kc(24))
    };
    g.Tt = function() {
        this.cd() && !this.trackAsMenu() && (this.Jb(1), this.fireEvent(new Kc(10)))
    };
    g.Xi = function() {
        if (!this.isEnabled()) return "default";
        var a = this.$.useHandCursor;
        return k(a) && !a ? "default" : "pointer"
    };
    var Aj = function(a, b, c, d) {
        yj.call(this, a, b, c, d);
        this.la = new Ve(this.$);
        this.dl = void 0;
        this.wl = !0
    };
    q(Aj, yj);
    g = Aj.prototype;
    g.Ia = function() {
        Aj.oa.Ia.call(this);
        this.la.Ia();
        this.ca(16)
    };
    g.dd = function() {
        var a = new bd;
        this.la.forEach(function(b) {
            var c = b.tb().clone();
            c.na(b.Za());
            a.ad(c);
            return !1
        });
        return a
    };
    g.map = function(a) {
        var b = Aj.oa.map.call(this, a);
        return b = b || this.la.forEach(function(b) {
            return b.map(a)
        })
    };
    g.Cl = function(a) {
        return this.la.forEach(a)
    };
    g.La = function() {
        return !0
    };
    g.Yt = function(a) {
        return this.la.gq(a)
    };
    g.Yc = function(a, b) {
        this.ca(16);
        var c = a.getParent();
        c && c.removeChild(a);
        a.Gf(this);
        this.la.uk(a, b);
        this.dc();
        a.Xf(vj, !1, c)
    };
    g.removeChild = function(a, b) {
        a.Xf(wj, !1, b);
        this.ca(16);
        this.la.ol(a);
        a.Ud();
        a.Gf(null);
        this.dc()
    };
    g.et = function() {
        for (var a = this.la.Va; a;) this.removeChild(a), a = this.la.Va
    };
    g.md = function(a) {
        (a = this.la.Cc(a)) && this.removeChild(a)
    };
    g.Cc = function(a) {
        return this.la.Cc(a)
    };
    g.Rl = function(a, b) {
        this.la.Rl(a, b)
    };
    g.Ml = function(a, b) {
        this.ca(16);
        this.la.Ml(a, b)
    };
    g.yj = function() {
        return this.la.yj()
    };
    g.Ye = function(a) {
        return this.la.Ye(a)
    };
    g.yg = function(a) {
        return this.la.yg(a)
    };
    g.Te = function(a, b) {
        this.ca(16);
        var c = a.getParent();
        c && c.hh(a, this);
        a.Gf(this);
        this.la.Te(a, b);
        this.dc();
        a.Xf(vj, !1, c)
    };
    g.hh = function(a, b) {
        a.Xf(wj, !1, b);
        this.ca(16);
        this.la.hh(a);
        a.Gf(null);
        this.dc()
    };
    g.Hb = function() {
        return this.la.Hb()
    };
    g.Vw = function(a) {
        this.wl = a;
        this.ca(256)
    };
    g.tl = function() {
        return this.dl | 0
    };
    g.lh = function(a) {
        Aj.oa.lh.call(this, a);
        var b = this.dl;
        (a = (1 <= a ? b : 0) + (1 <= this.ec() ? -b : 0)) && this.getParent().Yf(a)
    };
    g.Yf = function(a) {
        this.dl = this.tl() + a;
        this.ca(131072);
        !this.ae() && this.getParent() && this.getParent().Yf(a)
    };
    g.Yd = function(a, b, c, d, e) {
        return this.zj(a, b) ? (c(this) && (d = this), this.qq(a, b, c, d, e)) : null
    };
    g.qq = function(a, b, c, d, e) {
        var f = null,
            h = [];
        this.la.forEach(function(l) {
            if (l.Gb) return !1;
            for (; 0 < h.length && l.depth > h[h.length - 1];) h.pop();
            if (l.Bo()) {
                if (l instanceof Bj) return !1;
                e.fj(l, a, b) || h.push(l.vf)
            } else if (0 == h.length) {
                var n = l.od;
                if (!n || e.fj(n, a, b)) l = l.Yd(a, b, c, d, e), !l || l == d && f || (f = l)
            }
            return !1
        });
        return f
    };
    var rh = function(a, b, c, d) {
        Aj.call(this, b, a, c, d);
        this.Me = new Ve
    };
    q(rh, Aj);
    g = rh.prototype;
    g.Ea = function() {
        rh.oa.Ea.call(this);
        this.Je(this.la, 1);
        this.Je(this.Me, 8);
        this.vi();
        for (var a = 0; a < this.definition.actions.length; a++) {
            var b = this.definition.actions[a];
            this.ln(b.events, b.key, b.actions)
        }
        for (a = 0; a < this.definition.sounds.length; a++) b = this.definition.sounds[a], this.$s(b.events, b.sound)
    };
    g.Ia = function() {
        rh.oa.Ia.call(this);
        this.Me.Ia()
    };
    g.dd = function() {
        var a = rh.oa.dd.call(this);
        this.Me.forEach(function(b) {
            var c = b.tb().Kf().clone();
            c.na(b.Za());
            a.wo(c, !1);
            return !1
        });
        return a
    };
    g.Jb = function(a) {
        a != this.sc && (this.Je(this.la, a, this.sc), this.c.ia.ii());
        rh.oa.Jb.call(this, a)
    };
    g.cd = function() {
        return rh.oa.cd.call(this) && this.kh
    };
    g.trackAsMenu = function() {
        return this.definition.trackAsMenu
    };
    g.Je = function(a, b, c) {
        this.ca(16);
        var d = this.definition.records;
        if (d) {
            if (k(c))
                for (var e = 0; e < d.length; e++) {
                    var f = d[e],
                        h = f.states & c,
                        l = f.states & b;
                    h && !l && a.pn(f.depth)
                }
            for (e = 0; e < d.length; e++)
                if (f = d[e], h = f.states & c, (l = f.states & b) && !h && (h = this.Af + "." + f.definition.id.toString(36), f.definition.tk() && (h = f.definition.get().rc(this.c, h)))) h.La() && 8 != b && h.Pb(this.c.Ng()), h.Gf(this), h.Ea(), a.uk(h, f.depth), f.transform && h.setTransform(f.transform), f.filters && h.Cf(f.filters), f.blendmode && h.Og(f.blendmode), f.hi && h.pc(f.hi)
        }
    };
    g.Hb = function() {
        return !0
    };
    g.Yd = function(a, b, c, d, e) {
        var f = null;
        if (this.zj(a, b)) {
            var h = c(this);
            h && (d = this);
            if ((f = this.qq(a, b, c, d, e)) && f != d) return f;
            if (h && this.Me.uu(function(f) {
                    return !!f.Yd(a, b, c, d, e)
                })) return d
        }
        return f
    };
    var Bj = function(a, b, c, d) {
        yj.call(this, b, a, c, d);
        this.el = "normal";
        this.yf = a.autoSize;
        this.ni = a.border;
        this.mi = 16777215;
        this.pi = a.border;
        this.oi = 0;
        this.io = !1;
        this.Qi = a.editable;
        this.Df = a.an;
        this.jo = "pixel";
        this.Sb = a.html;
        this.ko = a.maxChars;
        this.Ke = a.multiline;
        this.Zg = !1;
        this.lo = a.password;
        this.mo = null;
        this.Pg = a.selectable;
        this.no = 0;
        this.Ka = null;
        this.Le = a.color;
        this.al = 0;
        this.bh = a.wrap;
        this.bd = nf(a);
        this.Ge = [];
        this.qd = [];
        this.ye = a.bounds.clone();
        this.Ln = !0;
        this.Fn = !1;
        this.Mf = a.variable;
        this.links = [];
        null == this.Ka && (a = a.text, this.Ec(k(a) ? a : ""))
    };
    q(Bj, yj);
    g = Bj.prototype;
    g.dd = function() {
        var a = this.ye;
        if ("none" != this.yf) {
            var b = new $c(a.j, a.i, a.j + this.il() + 80, a.i + this.hl() + 80);
            a.ad(b)
        }
        return new bd(a)
    };
    g.Ec = function(a) {
        this.Ln && this.Sb && this.Le != this.definition.color && (this.ca(64), this.Le = this.definition.color);
        if (this.Zg || this.Ka != a) this.Fn = !0, this.Uo(a), this.Zg = !1
    };
    g.Hi = function(a) {
        this.Ln = a
    };
    g.bv = function(a) {
        this.Sb != a && (this.ca(64), this.Sb = a)
    };
    g.Jr = function(a) {
        this.Le = 16777215 & a | this.Le & 4278190080;
        this.Lj(of(this.Le))
    };
    g.or = function() {
        return this.Le & 16777215
    };
    g.xr = function(a) {
        this.el = a
    };
    g.xg = function(a) {
        this.ni = a;
        this.ca(128)
    };
    g.zr = function(a) {
        this.mi = a & 16777215;
        this.ca(128)
    };
    g.Ar = function(a) {
        this.pi = a;
        this.ca(128)
    };
    g.Br = function(a) {
        this.oi = a & 16777215;
        this.ca(128)
    };
    g.qi = function() {
        this.tb();
        return this.ye
    };
    g.Pw = function(a) {
        this.io = a
    };
    g.Dr = function(a) {
        this.Df = a;
        this.Uo(this.Ka)
    };
    g.Sw = function(a) {
        this.jo = a
    };
    g.Tw = function(a) {
        this.ko = a
    };
    g.Er = function(a) {
        this.Ke != a && (this.Zg = !0);
        this.Ke = a;
        this.Bf()
    };
    g.Ww = function(a) {
        this.lo = a
    };
    g.Zw = function(a) {
        this.mo = a
    };
    g.ax = function(a) {
        this.no = a
    };
    g.bx = function(a) {
        this.al = a
    };
    g.Zd = function() {
        return this.Mf
    };
    g.Fi = function(a) {
        this.Mf && this.c.ha().Uk(this.Mf, this);
        (this.Mf = a) && this.c.ha().Qk(this.Mf, this, this.definition.text)
    };
    g.Kr = function(a) {
        this.bh != a && (this.Zg = !0);
        this.bh = a;
        this.Bf()
    };
    g.yr = function(a) {
        this.ca(32);
        this.yf = a;
        this.dc()
    };
    g.Ir = function(a) {
        this.Pg = a
    };
    g.Um = function(a) {
        this.Qi = a
    };
    g.Rm = function() {
        return k(this.ef) ? this.ef : this.Qi
    };
    g.pr = function(a, b) {
        k(a) ? k(b) || (b = a + 1) : (a = 0, b = this.Ka.length);
        for (var c = null, d = 0, e, f = 0; f < this.Ge.length; f++)
            for (var h = this.Ge[f], l = 0; l < h.length; l++) {
                var n = h[l];
                e = d + n.Ka.length - 1;
                d < b && e >= a && (c ? c.cu(n.format) : c = n.format.clone());
                d = e + 1
            }
        c ? c.font = c.ph() ? c.font.name : c.font : c = new kf;
        return c
    };
    g.nr = function() {
        var a = new kf;
        a.mh(this.bd);
        return a
    };
    g.Lj = function(a, b, c) {
        a = a.clone();
        k(b) ? k(c) || (c = b + 1) : (b = 0, c = this.Ka.length);
        for (var d = 0, e, f = 0; f < this.Ge.length; f++)
            for (var h = this.Ge[f], l = 0; l < h.length; l++) {
                var n = h[l],
                    r = n.Ka;
                e = d + r.length - 1;
                if (d < c && e >= b) {
                    var t = Math.max(d, b) - d,
                        d = Math.min(e + 1, c) - d;
                    if (0 < t) {
                        var p = n.fh(r.substring(0, t));
                        h.splice(l, 0, p);
                        l++
                    }
                    d < r.length && (p = n.fh(r.substring(d)), h.splice(l + 1, 0, p));
                    n.Ec(r.substring(t, d));
                    null != a.color && (a.color |= 4278190080);
                    !this.Df && n.format.sl() && (a.font = n.format.font);
                    n.format.mh(a);
                    n.$g(this.bl())
                }
                d = e + 1
            }
        this.Bf();
        this.ca(128)
    };
    g.Gr = function(a) {
        this.Zg = !0;
        this.bd.mh(a)
    };
    g.Ea = function() {
        Bj.oa.Ea.call(this);
        (this.c.ha().Pn || this.Pg) && this.Qn(!0);
        this.definition.variable && this.c.ha().Qk(this.definition.variable, this, this.definition.text)
    };
    g.Ia = function() {
        Bj.oa.Ia.call(this);
        this.definition.variable && this.c.ha().Uk(this.definition.variable, this)
    };
    g.La = function() {
        return this.definition.La
    };
    g.Uo = function(a) {
        this.ca(32);
        this.Ka = a;
        this.Ge = [];
        this.Sb || (a = Cj(a));
        this.ft(a, this.Ke)
    };
    g.ft = function(a, b) {
        var c = new Dj(null, null);
        c.format = nf(this.definition);
        if (this.Df && this.definition.font) {
            var d = this.definition.font.get();
            d instanceof mf && (c.format.font = d)
        } else this.definition.font && (d = this.definition.font.get(), d instanceof mf && (c.format.font = d.name));
        c.format.color = this.Le | 0;
        c.format.ph() && (d = c.format.font, c.format.italic = d.italic, c.format.bold = d.bold);
        this.Sb && this.bd && (c.format.italic = !!this.bd.italic, c.format.bold = !!this.bd.bold, c.format.size = this.bd.size, c.format.qb = this.bd.qb,
            c.format.indent = this.bd.indent, d = this.bd.color, c.format.color = this.bd.Se ? 4278190080 | d : c.format.color);
        var d = new Ej(c, this.bl(), b),
            e = a.replace(/(&nbsp;)+/g, "&nbsp;").replace(/\r\n|\r|\n/g, "<br/>");
        c.$g(this.bl());
        var c = new he(e, !1, !1, !0),
            f;
        try {
            for (; f = c.next();) switch (f.type) {
                case "tag":
                    e = {};
                    if (f.attributes)
                        for (var h = 0; h < f.attributes.length; ++h) {
                            var l = f.attributes[h];
                            e[l.name.toLowerCase()] = l.value
                        }
                    d.ct(f.value.toLowerCase(), e);
                    break;
                case "close":
                    d.bt(f.value.toLowerCase());
                    break;
                case "text":
                case "cdata":
                    d.at(f.value)
            }
        } catch (n) {}
        this.Ge =
            d.fl;
        this.Bf()
    };
    g.Bf = function() {
        var a = this.Ge;
        if (!(this.Fn || this.Ke || this.Sb)) {
            var b = [];
            b.push(Array.prototype.concat.apply([], a));
            a = b
        }
        this.bh && (a = this.Ht(a, this.ye));
        this.qd = a;
        "none" != this.yf && this.dc()
    };
    g.xn = function(a, b) {
        var c = a.t - a.j - 80;
        b && (c -= b.leftMargin + b.rightMargin);
        return c
    };
    g.Ht = function(a, b) {
        var c = [],
            d = 0,
            e = !1;
        c[d] = [];
        for (var f = 0; f < a.length; f++) {
            for (var h = a[f], l = 0 < h.length ? h[0].format : null, n = this.xn(b, l), l = l ? l.indent | 0 : 0, r = 0; r < h.length; r++)
                for (var t = h[r].It(l, n, e), p = 0; p < t.length; p++) e = h[r].fh(t[p]), e.ui = p == t.length - 1, c[d].push(e), p == t.length - 1 ? (l += e.Fa(), e = this.Ke || " " == e.Ka[e.Ka.length - 1]) : (d++, c[d] = [], l = 0, e = !1);
            d++;
            c[d] = []
        }
        0 == c[d].length && c.pop();
        return c
    };
    g.ow = function(a) {
        if (0 <= a && a < this.qd.length) {
            a = this.qd[a];
            for (var b = "", c = 0; c < a.length; c++) b += a[0].Ka;
            return b.replace(/\n/, "")
        }
        return null
    };
    g.Wn = function(a) {
        var b = this.qi();
        this.links = [];
        for (var c = 0, d = !0, e = 0, f = this.qd, h = 0; h < f.length; h++) {
            var l = f[h],
                n = Fj(l),
                r = Gj(l) * n;
            if (0 != h && "none" == this.yf && c + r > b.s) break;
            var t = 0 < l.length ? l[0].format : null;
            0 == h && t && (e = t.leading | 0, c = b.i + 40 - .5 * e, 0 > e ? c = b.i : 0 > c && (c = b.i + 40));
            for (var p = b.j + 40 + (t ? t.leftMargin : 0), s = this.xn(b, t), u = 0, y = 0; y < l.length; y++) u += l[y].Fa();
            if (t) switch (k(t.indent) && d && (p += t.indent, s -= t.indent, d = !1), t.qb) {
                case 2:
                    p += (s - u) / 2;
                    break;
                case 1:
                    p += s - u
            }
            for (y = 0; y < l.length; y++) l[y].Ka.length && (u = 0, t =
                l[y].Fa(), !l[l.length - 1].ui && 3 == l[y].format.qb && h < f.length - 1 && (u = (l[y].Ka.match(/ /g) || []).length, u = (s - t) / u), a.Dn(l[y], p, c, n, u), l[y].format.url && (u = new Hj(p, c, t, r, l[y].format.url, l[y].format.target), this.links.push(u)), p += t, d = d || l[y].ui);
            c += r + e
        }
    };
    g.bl = function() {
        return this.Df ? this.c.qc : null
    };
    g.qm = function(a) {
        0 <= a && (this.ye.t = this.ye.j + 20 * a, this.Bf(), this.ca(128))
    };
    g.pm = function(a) {
        0 <= a && (this.ye.s = this.ye.i + 20 * a, this.Bf(), this.ca(128))
    };
    g.Wd = function() {
        var a = this.ts();
        a ? this.c.Yg(new Ij(this.c.ha(), "", a.ss, a.target, 1)) : Bj.oa.Wd.call(this)
    };
    g.ts = function() {
        var a = new Jc(this.c.Rb.x, this.c.Rb.y);
        a.na(this.Wc());
        for (var b = 0; b < this.links.length; b++)
            if (this.links[b].ho.contains(a.x, a.y)) return this.links[b];
        return null
    };
    var Hj = function(a, b, c, d, e, f) {
            this.ho = new $c(a, b, a + c, b + d);
            this.ss = e || "";
            this.target = f || "_self"
        },
        Jj = function() {
            this.format = lf();
            this.ui = !1;
            this.Ka = "";
            this.Oh = 0
        },
        Kj = rg(1, 1);
    g = Jj.prototype;
    g.fh = function(a) {
        var b = this.vu();
        b.Ka = a;
        return b
    };
    g.Ec = function(a) {
        this.Ka = a;
        this.Oh = 0
    };
    g.$g = function(a, b) {
        this.Oh = 0;
        !k(b) && this.format.ph() && (b = this.format.font.name);
        if (a) {
            if (!k(b) && k(this.format.font) && (b = String(this.format.font)), !this.format.ph() || b != this.format.font.name || !!this.format.italic != !!this.format.font.italic || !!this.format.bold != !!this.format.font.bold) {
                var c = pf;
                if (k(b) && a && a[b])
                    for (var d = a[b], e = 0; e < d.length; ++e) {
                        if (!!this.format.italic == !!d[e].italic && !!this.format.bold == !!d[e].bold) {
                            this.format.font = d[e];
                            return
                        }
                        c == pf && (c = d[e])
                    }
                this.format.font = c
            }
        } else b && (this.format.font =
            b)
    };
    g.vu = function() {
        var a = new Jj;
        a.format.mh(this.format);
        return a
    };
    g.Fa = function() {
        this.Oh || (this.Oh = this.measureText(this.Ka));
        return this.Oh
    };
    g.measureText = function(a) {
        if (this.format.sl()) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = this.format.font.Cm(a.charAt(c));
                k(d) && (b += d.advance ? d.advance : 0)
            }
            b = b * this.format.size / (this.format.font.emSquareSize | 0);
            return b += this.format.letterSpacing * a.length | 0
        }
        return this.rv(a)
    };
    g.kr = function() {
        var a = Kj.getContext("2d");
        this.format.wb(a);
        return a
    };
    g.rv = function(a) {
        return this.kr().measureText(a).width
    };
    g.It = function(a, b, c) {
        for (var d = [], e = 0, f = d[0] = "", h = 0, l = this.Ka.split(" "), n = 0; n < l.length; n++)
            if (!(0 < e && 0 == a && "" == l[n])) {
                l[n] = l[n].replace(/&nbsp;/g, " ");
                var r = this.measureText(l[n]);
                a + h + r > b ? r < b && c ? (e++, a = r, d[e] = l[n]) : (e || d[e] ? a = 0 : d.pop(), this.wu(l[n], b, a, d), e = d.length - 1, a = this.measureText(d[e])) : (d[e] = d[e] + f + l[n], a += h + r);
                c = !0;
                0 == n && (f = " ", h = this.measureText("a a") - this.measureText("aa"))
            }
        return d
    };
    g.wu = function(a, b, c, d) {
        this.format.sl() ? this.xv(a, b, c, d) : this.wv(a, b, c, d)
    };
    g.xv = function(a, b, c, d) {
        for (var e = 0, f = 0, h = this.format.size / (this.format.font.emSquareSize | 0), l = 0; l < a.length; l++) {
            var n = this.format.font.Cm(a.charAt(l)),
                n = (k(n) && n.advance ? n.advance : 0) * h + this.format.letterSpacing;
            0 < l - f && e + n > b - c && (d.push(a.substring(f, l)), f = l, c = e = 0);
            e += n
        }
        d.push(a.substring(f))
    };
    g.wv = function(a, b, c, d) {
        for (var e = this.kr(), f = 0; f < a.length;) {
            for (var h = f + 1, l = a.length, n; l > h;) {
                var r = h + (l - h) / 2,
                    r = Math.ceil(r);
                n = a.substring(f, r);
                e.measureText(n).width <= b - c ? h = r : l = r - 1
            }
            d.push(a.substr(f, h));
            f = h;
            c = 0
        }
    };
    var Dj = function(a, b) {
        Jj.call(this);
        a && this.format.mh(a.format);
        this.parent = a;
        this.zu = b
    };
    q(Dj, Jj);
    var Lj = function(a, b) {
            return a.replace(/<[^>]+>|&[^;]+;/g, function(a) {
                switch (a) {
                    case "&amp;":
                        return "&";
                    case "&lt;":
                        return "<";
                    case "&gt;":
                        return ">";
                    case "&quot;":
                        return '"';
                    case "&apos;":
                        return "'";
                    case "&nbsp;":
                        return " ";
                    case "</p>":
                    case "<br>":
                    case "<br/>":
                        return b ? "\n" : ""
                }
                return ""
            })
        },
        Mj = function(a) {
            return a.replace(/[<>&]/g, function(a) {
                switch (a) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;"
                }
                return a
            })
        },
        Cj = function(a) {
            return a.replace(/[&<>"'\u02c6\u02dc]/g, function(a) {
                switch (a) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "'":
                        return "&apos;";
                    case '"':
                        return "&quot;";
                    case "\u02c6":
                        return "&#710;";
                    case "\u02dc":
                        return "&#732;"
                }
                return a
            })
        },
        Nj = function(a) {
            for (var b = /\s*<p(?: [^>]*)?>.*?<\/p>\s*/ig, c = 0, d = b.exec(a), e = ""; d;) d.index > c && (e += "<p>" + a.substring(c, d.index) + "</p>"), e += d[0], c = b.lastIndex, d = b.exec(a);
            a.length > c && (e += "<p>" + a.substring(c) + "</p>");
            return e
        };
    Bj.prototype.hl = function() {
        for (var a = 0, b = 0; b < this.qd.length; b++) var c = this.qd[b],
            d = Fj(c),
            c = Gj(c),
            a = a + c * d;
        return a
    };
    var Fj = function(a) {
            for (var b = 0, c = 0; c < a.length; c++) b = Math.max(b, a[c].format.size);
            return b
        },
        Gj = function(a) {
            for (var b = 1, c = 0; c < a.length; c++) b = a[c].format.ph() && a[c].format.font.lineHeight ? Math.max(b, a[c].format.font.lineHeight) : Math.max(b, 1.14);
            return b
        },
        Oj = function(a) {
            switch (a) {
                case "left":
                    return 0;
                case "center":
                    return 2;
                case "right":
                    return 1;
                case "justify":
                    return 3;
                default:
                    return 0
            }
        };
    Bj.prototype.il = function() {
        for (var a = 0, b = 0; b < this.qd.length; b++) {
            for (var c = 0, d = this.qd[b], e = 0; e < d.length; e++) c += d[e].Fa();
            a = Math.max(a, c)
        }
        return a
    };
    var Ej = function(a, b, c) {
        this.vb = a;
        this.gd = [];
        this.fl = [];
        this.fl.push(this.gd);
        this.qc = b;
        this.multiline = c
    };
    g = Ej.prototype;
    g.kg = function(a) {
        this.vb = new Dj(this.vb, a)
    };
    g.Dv = function(a) {
        var b = this.vb;
        b.parent && b.zu == a && (this.vb = b.parent)
    };
    g.ct = function(a, b) {
        switch (a) {
            case "p":
                this.kg(a);
                var c = b.align;
                c && (this.vb.format.qb = Oj(c));
                break;
            case "b":
                this.kg(a);
                this.vb.format.bold = !0;
                this.vb.$g(this.qc);
                break;
            case "i":
                this.kg(a);
                this.vb.format.italic = !0;
                this.vb.$g(this.qc);
                break;
            case "u":
                this.kg(a);
                this.vb.format.Ob = !0;
                break;
            case "a":
                this.kg(a);
                if (c = b.href) this.vb.format.url = c;
                if (c = b.target) this.vb.format.target = c;
                break;
            case "br":
            case "sbr":
                this.ip();
                break;
            case "font":
                this.kg(a);
                if (c = b.color) this.vb.format.color = Ti(c);
                (c = b.face) && this.vb.$g(this.qc,
                    c);
                c = Number(b.size);
                c == c && (this.vb.format.size = 20 * c);
                c = Number(b.letterspacing);
                c == c && (this.vb.format.letterSpacing = 20 * c)
        }
    };
    g.bt = function(a) {
        switch (a) {
            case "p":
                this.multiline && this.ip()
        }
        this.Dv(a)
    };
    g.ip = function() {
        if (this.gd.length) {
            var a = this.gd.length;
            a && (this.gd[a - 1].ui = !0);
            do {
                a--;
                var b = this.gd[a];
                b.Ec(b.Ka.replace(/\s+$/g, ""))
            } while (0 < a && !this.gd[a].Ka.length)
        } else this.gd.push(this.vb.fh(""));
        this.gd = [];
        this.fl.push(this.gd)
    };
    g.at = function(a) {
        this.gd.push(this.vb.fh(a))
    };
    Bj.prototype.Hb = function() {
        return !1
    };
    Bj.prototype.Yd = function(a, b, c, d) {
        if (a = this.zj(a, b)) {
            if (this.Pg || c(this)) return this;
            for (c = 0; c < this.links.length; c++)
                if (this.links[c].ho.contains(a.x, a.y)) return this;
            return d
        }
        return null
    };
    var fd = function(a, b, c, d) {
        Aj.call(this, b, a, c, d);
        this.Hn();
        this.Di = !1;
        this.gh = {};
        this.Uf = null;
        this.c.Hs(this);
        this.kn = na(Pj, this);
        this.Dc |= 127
    };
    q(fd, Aj);
    g = fd.prototype;
    g.Hn = function() {
        this.Mp = [];
        this.eb = -1;
        this.ej = !1;
        this.Xg = !0;
        this.lp = []
    };
    g.kl = function(a) {
        this.Ud();
        this.et();
        this.Hn();
        for (var b = this.$, c = Object.getOwnPropertyNames(b), d = 0; d < c.length; ++d) Wi(c[d]) || delete b[c[d]];
        this.definition = a;
        this.$b = !0;
        this.Ea()
    };
    g.Ea = function(a, b) {
        this.$b && this.Lg(7);
        fd.oa.Ea.call(this, a, b)
    };
    g.ah = function() {
        fd.oa.ah.call(this);
        this.Di || this.c.kb === this || (this.Di = !0, this.play(), this.Tn())
    };
    g.Ud = function() {
        this.Di && (this.la.Ud(), this.fireEvent(new Kc(5)), this.Di = !1);
        fd.oa.Ud.call(this)
    };
    g.play = function() {
        this.ej = !0
    };
    g.Cr = function(a) {
        this.Xg = a
    };
    g.Rm = function() {
        return k(this.ef) ? this.ef : this.Xg
    };
    g.vk = function() {
        this.la.bu();
        this.ej && this.Tn()
    };
    g.Tn = function() {
        var a = this.eb + 1;
        if (a >= this.definition.frameCount) {
            if (this.c.kb === this && this.c.Or) return;
            a = 0
        }
        0 == this.definition.frameCount && this.c.kb == this || this.Wf(a)
    };
    g.stop = function() {
        this.ej = !1
    };
    g.He = function(a, b) {
        0 <= a && (a >= this.definition.frameCount ? this.Xn(this.definition.frameCount - 1) : this.Wf(a), this.ej = b)
    };
    g.Jw = function() {
        var a = this.definition.Tf.ku(this.eb);
        isFinite(a) && this.Wf(a);
        this.stop()
    };
    g.Hw = function() {
        var a = this.definition.Tf.ju(this.eb);
        isFinite(a) && this.Wf(a);
        this.stop()
    };
    g.Nf = function(a, b) {
        var c = this.definition.Tf,
            d;
        if (k(b)) {
            if (d = c.Op[b], !k(d)) return
        } else d = c.bq(this.eb);
        var e = Number(a) + d - 1;
        return 0 <= e && e == Math.floor(e) ? e : (e = c.Bi[a]) && c.bq(e) != d ? void 0 : e
    };
    g.Is = function(a) {
        return this.definition.tags[a]
    };
    g.Wf = function(a) {
        if (a != this.eb)
            if (a > this.eb) {
                if (this.Xn(a - 1), this.eb = a, this.ha().Ce(this.kn), this.co(this.eb), a = this.definition.tags[this.eb])
                    for (var b = 0; b < a.length; b++) a[b].Qe(this), a[b].Zk(this)
            } else {
                this.eb = a;
                this.ha().Ce(this.kn);
                a = this.definition.Un[this.eb];
                var c = [];
                if (a)
                    for (b = 0; b < a.length; b++) {
                        var d = a[b].eh(this);
                        d && c.push(d);
                        a[b].Zk(this)
                    }
                var e = this;
                this.la.ws(function(a) {
                    if (!(0 > a.depth) || 0 <= c.indexOf(a)) return !0;
                    e.ca(16);
                    a.Ud();
                    return !1
                });
                this.Da & 16 && this.la.vs(this)
            }
    };
    g.Xn = function(a) {
        for (; a > this.eb;) {
            this.eb++;
            this.co(this.eb);
            var b = this.definition.tags[this.eb];
            if (b)
                for (var c = 0; c < b.length; c++) b[c].Qe(this)
        }
    };
    var Pj = function() {
        var a = this.lp[this.eb];
        if (m(a)) {
            var b = this;
            this.ha().xp(a, function() {
                b.stop()
            })
        }
    };
    g = fd.prototype;
    g.co = function(a) {
        if (!this.Mp[a]) {
            for (var b = this.definition.Nj[a], c = 0; b && c < b.length; c++) b[c].ml(this);
            this.Mp[a] = !0
        }
    };
    g.Bm = function() {
        0 < this.eb && this.Wf(this.eb - 1);
        this.stop()
    };
    g.Yh = function() {
        this.eb + 1 < this.definition.frameCount && this.Wf(this.eb + 1);
        this.stop()
    };
    g.ha = function() {
        return this.c.ha()
    };
    g.ql = function() {
        return this.c.ql()
    };
    g.Fe = function() {
        return this.c.Fe()
    };
    g.duplicate = function(a, b, c) {
        var d = new fd(this.definition, this.c, this.Af + "_d");
        d.$b = !0;
        d.Pb(b);
        d.setTransform(this.Za());
        this.Uf && (d.Uf = this.Uf.duplicate(d), d.Yc(d.Uf, -16385));
        d.Ea();
        a.md(c);
        a.Yc(d, c);
        d.pc(this.Fb);
        return d
    };
    g.jb = function() {
        var a = this.Uf;
        a || (this.Uf = a = new Qj(this.c), a.Xc = !0, this.Yc(a, -16385));
        return a
    };
    g.Jb = function(a) {
        if (this.Xg && a != this.sc) {
            var b;
            switch (a) {
                case 1:
                    b = "_up";
                    break;
                case 4:
                    b = "_down";
                    break;
                case 2:
                    b = "_over"
            }
            b && (b = this.definition.Tf.Bi[b], k(b) && (this.He(b, !1), this.c.ia.ii()))
        }
        fd.oa.Jb.call(this, a)
    };
    g.oo = function(a, b, c) {
        var d = new pd;
        this.Ef(vd(a));
        var e = this;
        d.bc = function(a) {
            ed(e, a)
        };
        ud(a, this.c, b || void 0, c, d)
    };
    g.Zt = function() {
        var a = this.c.Rb,
            b = this;
        return this.c.ia.Kf(a.x, a.y, function(a) {
            return !b.contains(a) && a instanceof yj
        })
    };
    g.Xi = function() {
        return this.Xg ? fd.oa.Xi.call(this) : "default"
    };
    var vh = function(a, b, c) {
        sj.call(this, b, a, c)
    };
    q(vh, sj);
    vh.prototype.dd = function() {
        return this.definition.dd(this)
    };
    vh.prototype.Ai = function(a) {
        a != this.Kd() && (this.ca(512), this.dc());
        vh.oa.Ai.call(this, a)
    };
    vh.prototype.Hb = function() {
        for (var a = this.definition.fillstyles, b = 0; b < a.length; b++)
            if (!a[b].Hb) return !1;
        return !0
    };
    var Qj = function(a, b) {
        var c = new sh(-1, [], null, [], []);
        sj.call(this, a, c, b);
        this.clear();
        this.jh = this.$f = null;
        this.cb()
    };
    q(Qj, vh);
    g = Qj.prototype;
    g.jb = function() {
        return this
    };
    g.duplicate = function() {
        var a = new Qj(this.c);
        a.definition = Ra(this.definition);
        return a
    };
    g.clear = function() {
        this.definition.fillstyles = [];
        this.definition.linestyles = [];
        this.definition.paths = [];
        this.ed = this.fd = this.ce = this.de = 0;
        this.ca(1024);
        this.dc()
    };
    g.cf = function() {
        var a = this.$f,
            b = this.jh,
            c;
        b && (c = b);
        a && a != b && (c = a);
        return c ? (this.ca(1024), this.dc(), c.data.value) : new dj
    };
    g.moveTo = function(a, b) {
        k(a) && k(b) && (a *= 20, b *= 20, this.cf().moveTo(a, b), this.ed = a, this.fd = b, this.ce = a, this.de = b)
    };
    g.lineTo = function(a, b) {
        k(a) && k(b) && (a *= 20, b *= 20, a != this.ed || b != this.fd || this.jh ? this.cf().lineTo(a, b) : this.cf().close(), this.ce = a, this.de = b)
    };
    g.Lb = function(a, b, c, d) {
        k(c) && k(d) && k(a) && k(b) && (a *= 20, b *= 20, c *= 20, d *= 20, this.cf().Lb(a, b, c, d), this.ce = c, this.de = d)
    };
    g.Hu = function(a, b, c, d) {
        k(a) && k(b) && k(c) && k(d) && (a *= 20, b *= 20, c *= 20, d *= 20, this.cf().moveTo(a, b).lineTo(a, b + d).lineTo(a + c, b + d).lineTo(a + c, b).lineTo(a, b), this.ed = this.ce = a, this.fd = this.de = b)
    };
    var Rj = Math.sqrt(2);
    g = Qj.prototype;
    g.tq = function(a, b, c, d) {
        if (k(a) && k(b) && k(c) && k(d)) {
            a *= 20;
            b *= 20;
            c *= 20;
            d *= 20;
            var e = c / Rj,
                f = d / Rj,
                h = c * (Rj - 1),
                l = d * (Rj - 1);
            this.cf().moveTo(a + c, b).Lb(a + c, b + l, a + e, b + f).Lb(a + h, b + d, a, b + d).Lb(a - h, b + d, a - e, b + f).Lb(a - c, b + l, a - c, b).Lb(a - c, b - l, a - e, b - f).Lb(a - h, b - d, a, b - d).Lb(a + h, b - d, a + e, b - f).Lb(a + c, b - l, a + c, b);
            this.ed = this.ce = a + c;
            this.fd = this.de = b
        }
    };
    g.Iu = function(a, b, c, d, e, f) {
        k(a) && k(b) && k(c) && k(d) && k(e) && k(f) && (e && f ? (e > c && (e = c), f > d && (f = d)) : e = f = 0, a *= 20, b *= 20, c *= 20, d *= 20, e *= 10, f *= 10, this.cf().moveTo(a + c, b + d - f).Lb(a + c, b + d, a + c - e, b + d).lineTo(a + e, b + d).Lb(a, b + d, a, b + d - f).lineTo(a, b + f).Lb(a, b, a + e, b).lineTo(a + c - e, b).Lb(a + c, b, a + c, b + f).lineTo(a + c, b + d - f), this.ed = this.ce = a + c, this.fd = this.de = b + d - f)
    };
    g.sh = function(a, b, c, d) {
        var e = this.definition.paths,
            f = e[e.length - 1],
            h = new dj;
        h.moveTo(a, b);
        a = new wh(new Pg(h), d, c);
        f && f.data.value.$a() ? e[e.length - 1] = a : e.push(a);
        return a
    };
    g.Gw = function(a) {
        var b = this.$f,
            c = this.jh;
        if (c) {
            if (c.data.value.$a()) {
                b = c;
                b.line = a;
                this.$f = b;
                return
            }
            b == c && (b = this.sh(0, 0, c.line, void 0), b.data = c.data, delete c.line)
        }
        this.$f = b = k(a) ? this.sh(this.ce, this.de, a, void 0) : null
    };
    g.Fg = function(a) {
        var b = this.jh;
        b && b.data.value.close();
        var c = this.$f;
        b && c && c != b ? (c.data.value.lineTo(this.ed, this.fd), k(a) ? c = b = this.sh(this.ed, this.fd, c.line, a) : b = null) : (b = k(a) ? this.sh(this.ed, this.fd, void 0, a) : null, c && (b ? (b.line = c.line, c = b) : c = this.sh(this.ed, this.fd, c.line, void 0)));
        this.jh = b;
        this.$f = c;
        this.ce = this.ed;
        this.de = this.fd;
        this.ca(1024)
    };
    g.vq = function(a, b, c, d, e, f, h, l) {
        var n = void 0;
        if (k(a)) {
            var r = 0;
            d && (r |= 1);
            e && "normal" != e && ("horizontal" != e && (r |= 4), "vertical" != e && (r |= 2));
            d = this.definition.linestyles;
            n = d.length;
            f = Sj(bh, f, 0);
            d.push(new ah(new Pg(20 * a), new Pg(Wc(b, c)), null, f, f, Sj($g, h, 0), l, r))
        }
        this.Gw(n)
    };
    var Sj = function(a, b, c) {
        return b && (a = a.indexOf(b), 0 <= a) ? a : c
    };
    Qj.prototype.sq = function(a, b) {
        if (k(a)) {
            var c = this.definition.fillstyles;
            c.push(new kj(new Pg(Wc(a, b))));
            this.Fg(c.length - 1)
        } else this.Fg()
    };
    Qj.prototype.Lo = function(a, b, c, d, e, f, h, l) {
        if (k(b) && da(b) && da(c) && da(d)) {
            for (var n = b.length, r = [], t = 0; t < n; ++t) {
                var p = Number(d[t]);
                0 <= p && 255 >= p && r.push({
                    color: new Pg(Wc(b[t], c[t])),
                    offset: new Pg(p / 255)
                })
            }
            var s;
            switch (a) {
                case "linear":
                    s = mj;
                    break;
                case "radial":
                    s = nj
            }
            s ? (a = this.definition.fillstyles, a.push(new s(e ? new Pg(e.Dm(16384, 16384)) : Tj, r, Sj(hj, f, 0), Sj(ij, h, 0), new Pg(l || 0))), this.Fg(a.length - 1)) : this.Fg()
        } else this.Fg()
    };
    Qj.prototype.uq = function() {
        this.Fg()
    };
    var Uj = function(a, b, c, d) {
        rh.call(this, a, b, c, d);
        this.vl = {}
    };
    q(Uj, rh);
    g = Uj.prototype;
    g.Ea = function() {
        Uj.oa.Ea.call(this);
        this.Je(this.la, 1);
        this.Je(this.Me, 8)
    };
    g.Ia = function() {
        Uj.oa.Ia.call(this)
    };
    g.St = function(a, b) {
        b && b.Gf(this);
        this.vl[a] = b;
        a != this.sc && 8 != a || this.Je(8 == a ? this.Me : this.la, a)
    };
    g.Rt = function(a) {
        return this.vl[a]
    };
    g.Je = function(a, b) {
        var c = this.vl[b];
        c != a.Cc(1) && (a.pn(1), c && a.uk(c, 1), this.ca(16))
    };
    var Vj = function(a, b) {
        Aj.call(this, a, new Ei(0, 0, null, null), "stage");
        this.backgroundColor = Jg(b.backgroundColor).toString();
        this.yi = b.frameSize.xmax / 20;
        this.xi = b.frameSize.ymax / 20;
        this.Kc = "showAll";
        this.Ak = this.zk = this.Ld = this.Md = this.ge = 0;
        this.Jn = this.gk = Ic;
        this.Nc = this.Mc = 1;
        this.ca(1572864)
    };
    q(Vj, Aj);
    g = Vj.prototype;
    g.Yd = function(a, b, c, d, e) {
        a = Vj.oa.Yd.call(this, a, b, c, d, e);
        a === this.c.kb && (a = null);
        return !a && c(this) ? this : a
    };
    g.Hr = function(a) {
        this.Kc != a && (this.Kc = a, this.Tk(), "noScale" == this.Kc && (a = this.Ld != this.xi, (this.Md != this.yi || a) && this.c.ha().Vk()))
    };
    g.wr = function(a) {
        a = a.toUpperCase();
        var b = 0; - 1 < a.indexOf("L") && (b |= 1); - 1 < a.indexOf("T") && (b |= 2); - 1 < a.indexOf("R") && (b |= 4); - 1 < a.indexOf("B") && (b |= 8);
        this.ge != b && (this.ge = b, this.Tk())
    };
    g.Ps = function() {
        return this.ge & 1 ? 0 : this.ge & 4 ? 2 : 1
    };
    g.Qs = function() {
        return this.ge & 2 ? 0 : this.ge & 8 ? 2 : 1
    };
    g.hn = function() {
        var a = this.c.Vc.offsetWidth,
            b = this.c.Vc.offsetHeight,
            c, d = this.c.Vc,
            e = c = 0;
        if (d.offsetParent) {
            do c += d.offsetLeft, e += d.offsetTop; while (d = d.offsetParent)
        }
        c = [c, e];
        d = c[0];
        c = c[1];
        e = !1;
        if (this.zk != d || this.Ak != c) this.zk = d, this.Ak = c, e = !0;
        if (this.Md != a || this.Ld != b) this.Md = a, this.Ld = b, "noScale" == this.Kc && this.c.ha().Vk(), e = !0;
        e && this.Tk()
    };
    g.Tk = function() {
        var a = this.Md,
            b = this.Ld,
            c = this.yi,
            d = this.xi;
        this.Mc = c ? a / c : 1;
        this.Nc = d ? b / d : 1;
        switch (this.Kc) {
            case "noScale":
                this.Mc = this.Nc = 1;
                break;
            case "showAll":
                this.Mc < this.Nc ? this.Nc = this.Mc : this.Mc = this.Nc;
                break;
            case "noBorder":
                this.Mc > this.Nc ? this.Nc = this.Mc : this.Mc = this.Nc
        }
        var e = 0,
            f = 0;
        switch (this.Ps()) {
            case 1:
                e = (a - c * this.Mc) / 2;
                break;
            case 2:
                e = a - c * this.Mc
        }
        switch (this.Qs()) {
            case 1:
                f = (b - d * this.Nc) / 2;
                break;
            case 2:
                f = b - d * this.Nc
        }
        this.gk = Uc(this.Mc / 20, 0, 0, this.Nc / 20, e, f);
        this.Jn = this.gk.Rd();
        this.ca(524288)
    };
    g.ae = function() {
        return !0
    };
    g.xg = function(a) {
        this.ca(524288);
        this.backgroundColor = a ? a : "rgba(0,0,0,0)"
    };
    g.ii = function() {
        this.ca(1048576)
    };
    g.un = function(a) {
        return this.Kf(a.x, a.y, function(a) {
            return a instanceof yj && a.Ti && a.kh
        })
    };
    g.Xi = function() {
        return "default"
    };
    var Wj = {
        yy: "fullScreen",
        zy: "fullScreenInteractive",
        bA: "normal"
    };
    var Xj = function(a, b, c) {
        sj.call(this, b, a, c)
    };
    q(Xj, sj);
    Xj.prototype.dd = function() {
        return new bd(this.definition.bounds)
    };
    Xj.prototype.Hb = function() {
        return !1
    };
    var Bh = function(a, b, c) {
        sj.call(this, b, a, c)
    };
    q(Bh, sj);
    Bh.prototype.La = function() {
        return !0
    };
    Bh.prototype.dd = function() {
        return new bd(new $c(0, 0, this.definition.width, this.definition.height))
    };
    var Yj = {};
    var Zj = function() {
        this.ud = {}
    };
    ng.fa(sj, Zj);
    ng.fa(yj, Zj);
    var ak = new lg(15);
    g = Zj.prototype;
    g.Tc = function(a, b, c) {
        c & 16 ? this.rh(a, b, c) : (a.ze || c & 8) && this.Ni(a, b, c);
        c & 8 || (a.Da = 0)
    };
    g.rh = function(a, b, c) {
        var d = a.Eu();
        d ? this.Cu(a, b, c, d) : (d = this.Du(a, b, c)) ? this.Fu(d, a, b) : this.Xb(a, b, c)
    };
    g.Du = function(a, b, c) {
        if (!this.Ek(a) || c & 8) return null;
        var d = b.Zm(a.Ha()),
            e = d.l * d.l + d.o * d.o,
            f = d.k * d.k + d.m * d.m;
        if (1.2 * e < f || 1.2 * f < e || .001 < Math.abs(d.l * d.m + d.o * d.k) + Math.abs(d.l * d.o + d.m * d.k)) return null;
        d = this.ud[a.definition.Ck];
        d || (d = e, this.ud[a.definition.Ck] = d);
        var e = Math.ceil(Math.log(e / d) / 2 / Math.log(1.4)),
            f = a.definition.Ck + ";" + e + ";" + !!(c & 16),
            h = ak.ub(f),
            l = a.ld();
        l.Jg() && (l = Zc);
        return h && l.Zc(h.hi) ? h : !h && ak.Tr() ? ((h = this.Ur(a, b, Math.pow(1.4, e) * Math.sqrt(d), l, c)) && ak.add(f, h), h) : null
    };
    g.Ek = function() {
        return !1
    };
    g.qo = function(a) {
        return a.tb().pb.clone()
    };
    g.Fu = function(a, b, c) {
        c = c.Hf(b.Ha());
        b = b.ld();
        b.Jg() && (c.globalAlpha = b.ji(1));
        b = a.us;
        c.drawImage(a.Wg, b.j, b.i, b.width(), b.height());
        c.globalAlpha = 1
    };
    g.Ur = function(a, b, c, d, e) {
        b = this.qo(a);
        b.scale(c, c);
        b.Bs(1);
        b.pk();
        if (b.$a() || 1E6 < b.width() * b.height()) return null;
        var f = document.createElement("canvas");
        f.width = b.width();
        f.height = b.height();
        var h = new qg(f, b.j, b.i, c, c);
        this.Xb(a, h, e, Ic, d);
        b.scale(1 / c, 1 / c);
        return new mg(f, b, d)
    };
    g.Cu = function(a, b, c, d) {
        var e = a.fk,
            f = a.zf(),
            h = a.Ha(),
            l = d.x.Ig[0] + d.x.Ig[2],
            n = l > d.x.size * d.x.scale ? d.x.size / l : 1 / d.x.scale,
            l = d.y.Ig[0] + d.y.Ig[2],
            r = l > d.y.size * d.y.scale ? d.y.size / l : 1 / d.y.scale;
        d = [f.j, e.j, e.t, f.t];
        var l = [f.i, e.i, e.s, f.s],
            t = new Jc(f.j + (e.j - f.j) * n, f.i + (e.i - f.i) * r),
            n = new Jc(f.t + (e.t - f.t) * n, f.s + (e.s - f.s) * r);
        b.yn(t, h);
        b.yn(n, h);
        for (var e = [f.j, t.x, n.x, f.t], f = [f.i, t.y, n.y, f.s], n = new $c, t = new $c, p = this, r = function(b) {
                p.Xb(a, b, c)
            }, s = 0; 3 > s; ++s) {
            n.j = d[s];
            n.t = d[s + 1];
            t.j = e[s];
            t.t = e[s + 1];
            for (var u = 0; 3 >
                u; ++u) n.i = l[u], n.s = l[u + 1], t.i = f[u], t.s = f[u + 1], b.ks(n, t, h, r)
        }
    };
    g.Xb = function() {};
    g.Ni = function(a, b, c) {
        var d = a.od;
        d ? (b = b.Po(d.zf(), d.Ha()), ng.Nd(d).Tc(d, b, 16 | c), b = b.Oo(), this.rh(a, b, c), b.yl()) : this.rh(a, b, c)
    };
    g.Ia = function() {};
    var bk = function() {
        this.ud = {}
    };
    q(bk, Zj);
    ng.fa(xj, bk);
    bk.prototype.Xb = function(a, b, c) {
        var d = a.ic;
        a = b.Hf(a.Ha());
        c & 24 ? a.fillRect(0, 0, 20 * d.Fa(), 20 * d.Ta()) : a.drawImage(d.xe(), 0, 0, 20 * d.Fa(), 20 * d.Ta())
    };
    var ck = function() {
        this.ud = {}
    };
    q(ck, Zj);
    ng.fa(Bj, ck);
    ck.prototype.Xb = function(a, b, c) {
        b = b.Hf(a.Ha());
        var d = a.qi();
        if (c & 8) b.fillRect(d.j, d.i, d.width(), d.height());
        else {
            if (!(c & 16)) {
                b.save();
                b.beginPath();
                b.rect(d.j, d.i, d.width(), d.height());
                var d = a.$b ? void 0 : a.ld(),
                    e;
                a.ni && (e = Jg(a.mi, d), b.fillStyle = e.toString(), b.fill());
                a.pi && (e = Jg(a.oi, d), b.strokeStyle = e.toString(), b.lineJoin = "miter", dk(b));
                b.clip()
            }
            a.Wn(new ek(b, a, !!(c & 16)));
            c & 16 || b.restore()
        }
    };
    var ek = function(a, b, c) {
        this.Ss = a;
        this.Rs = c;
        this.nh = b
    };
    ek.prototype.Dn = function(a, b, c, d, e) {
        var f = this.Ss,
            h = this.nh,
            l = a.format,
            n = l.size,
            r = l.letterSpacing,
            t = a.Ka;
        if (!this.Rs) {
            var p = Jg(l.color),
                p = h.ld().apply(p);
            f.fillStyle = p.Jd()
        }
        h = l.Ws();
        c += d * (h ? h.ascent / h.emSquareSize : .9);
        if (h) t = h.xl(t), h.No(f, n, t, h.Ys(b, n, r, e, t), c, Ic, null, null);
        else if (l.wb(f), r)
            for (e = b, n = 0; n < t.length; n++) p = t[n], f.fillText(p, e, c), e += f.measureText(p).width + r;
        else f.fillText(t, b, c);
        l.Ob && (d = c + d * (h ? h.descent / h.emSquareSize : 1 - .9) / 2, f.beginPath(), f.moveTo(b, d), f.lineTo(b + a.Fa(), d), dk(f))
    };
    var dk = function(a) {
        a.save();
        a.transform(1, 0, 0, 1, 0, 0);
        a.lineWidth = 10;
        a.stroke();
        a.restore()
    };
    var og = new hg("canvas isolate"),
        fk = function(a) {
            this.nh = a;
            this.jl = null
        };
    og.fa(vh, fk);
    og.fa(Qj, fk);
    og.fa(Xj, fk);
    og.fa(Bj, fk);
    og.fa(fd, fk);
    og.fa(rh, fk);
    og.fa(xj, fk);
    og.fa(Bh, fk);
    og.fa(Uj, fk);
    og.fa(Vj, fk);
    fk.prototype.Tc = function(a, b, c) {
        if (a.ze) {
            var d = a.eo(),
                e = this.jl,
                f = b.sk(a.tb().pb, a.Ha(), a.Gn()),
                h = !!e && !e.Gs(f, b);
            if (!e || a.Da || h || c & 64) e = this.jl = b.Ug(f, e && e.xe()), this.Ni(a, e, c), this.Ds(a, e), d.Jg() || (c = e.getImageData(), zg(c.data, d), e.putImageData(c));
            c = 1;
            d.Jg() && (c = d.ji(1));
            a.Gb ? b.Oi(e, c) : b.Es(e, a.Fs(), c)
        } else this.jl = null;
        a.Da = 0
    };
    fk.prototype.Ds = function(a, b) {
        for (var c = a.Ib, d = 0; d < c.length; ++d) c[d].Rf(ng).apply(c[d], b)
    };
    fk.prototype.Ni = function(a, b, c) {
        var d = a.od,
            e = ng.Nd(a);
        d ? d.ae() ? (e.rh(a, b, c), pg(d).Tc(d, b, c)) : e.Ni(a, b, c) : e.rh(a, b, c)
    };
    fk.prototype.Ia = function() {};
    var gk = function() {
        this.ud = {}
    };
    q(gk, Zj);
    ng.fa(vh, gk);
    ng.fa(Qj, gk);
    gk.prototype.Xb = function(a, b, c, d, e) {
        this.hu(a, b, d || a.Ha(), e || a.ld(), c)
    };
    gk.prototype.Ek = function(a) {
        return a.definition.Fv
    };
    gk.prototype.hu = function(a, b, c, d, e) {
        var f = a.definition;
        c = b.Hf(c);
        for (var h = 0; h < f.paths.length; h++) {
            var l = f.paths[h],
                n = l.data.ub(a),
                r = null != l.line ? f.linestyles[l.line] : null,
                l = null != l.fill ? f.fillstyles[l.fill] : null;
            c.beginPath();
            n.Kn(c);
            l && (e & 24 ? c.fill() : l.wb(a, c, d));
            !r || e & 16 || (e & 8 ? r.Pk(a, b, c, n) : r.Wt(a, b, c, n, d))
        }
    };
    var hk = function(a) {
        this.c = a;
        this.nd = document.createElement("canvas");
        this.Xm = 0;
        this.Ym = new $c(0, 0, 0, 0)
    };
    ng.ur(hk);
    hk.prototype.Vi = function(a) {
        a.appendChild(this.nd)
    };
    hk.prototype.Fo = function() {
        var a = this.c,
            b = a.ia;
        if (b.Da & 1048576) {
            b.Da &= -1048577;
            var c = b.Da,
                d = Fd(),
                e = a.Mr();
            if (!e.$a()) {
                var f = Math.max(b.Md, b.Ld);
                2048 < f * d && (d = 2048 / f);
                this.Xm == d && this.Ym.hk(e) || (c |= 524288);
                c && (this.nd.width = e.width() * d, this.nd.height = e.height() * d, this.nd.style.width = e.width() + "px", this.nd.style.height = e.height() + "px", this.nd.style.position = "relative", this.nd.style.left = e.j + "px", this.nd.style.top = e.i + "px", b = b.gk, b = new qg(this.nd, e.j * d - b.p, e.i * d - b.q, b.l * d, b.k * d), this.Nr(b), this.Xm = d,
                    this.Ym = e, ng.Nd(a.ia).Tc(a.ia, b, 0), ak.Lr())
            }
        }
    };
    hk.prototype.Nr = function(a) {
        a.clear(this.c.ia.backgroundColor)
    };
    hk.prototype.Ia = function() {
        this.c.ia.xo()
    };
    var ik = function() {
        this.ud = {}
    };
    q(ik, Zj);
    ng.fa(Xj, ik);
    ik.prototype.Xb = function(a, b, c, d, e) {
        var f = d || a.Ha();
        d = e || a.ld();
        a = a.definition;
        e = c & 8;
        var h = c & 16,
            l = a.Xr;
        c = b.Vr();
        b = b.Zm(f);
        f = a.matrix.multiply(b);
        d = e || h ? null : d;
        for (h = 0; h < a.records.length; h++) a.records[h].Wr(c, f, d, l);
        e && l && (a = a.bounds, a.$a() || (b.wb(c), c.fillRect(a.j, a.i, a.t - a.j, a.s - a.i)))
    };
    ik.prototype.Ek = function() {
        return !0
    };
    ik.prototype.qo = function(a) {
        var b = a.tb().pb.clone();
        a = a.definition;
        for (var c = 0; c < a.records.length; c++) {
            var d = a.records[c].qi();
            d.na(a.matrix);
            b.ad(d)
        }
        return b
    };
    var jk = function() {
        this.ud = {}
    };
    q(jk, Zj);
    ng.fa(Bh, jk);
    jk.prototype.Xb = function() {};
    var kk = function() {};
    q(kk, Fg);
    ng.fa(De, kk);
    kk.prototype.apply = function(a, b) {
        var c = b.Fa(),
            d = b.Ta(),
            e = rg(c, d),
            f = e.getContext("2d"),
            h = b.getImageData();
        Ig(a, h.data, c, d, 20 * b.Na.l, 20 * b.Na.k);
        for (var l = Jg(a.highlight), n = Jg(a.shadow), c = h.data, d = l.Vb, r = l.Ub, t = l.Tb, l = l.pd, p = n.Vb, s = n.Ub, u = n.Tb, n = n.pd, y = c.length, l = 2 * l, n = 2 * n, x = 0; x < y; x += 4) 127.5 < c[x + 3] ? (c[x + 0] = d, c[x + 1] = r, c[x + 2] = t, c[x + 3] = (c[x + 3] - 127.5) * n) : (c[x + 0] = p, c[x + 1] = s, c[x + 2] = u, c[x + 3] = (127.5 - c[x + 3]) * l);
        Rd(f, h, 0, 0);
        b.ti(e, a.za.sd)
    };
    var lk = function() {};
    q(lk, Fg);
    ng.fa(Je, lk);
    lk.prototype.apply = function(a, b) {
        var c = 20 * b.Na.l,
            d = 20 * b.Na.k,
            e = b.Fa(),
            f = b.Ta(),
            h = a.distance,
            l = Math.cos(a.angle) * h * c,
            n = Math.sin(a.angle) * h * d,
            h = rg(e, f),
            r = h.getContext("2d");
        r.drawImage(b.xe(), l, n);
        l = r.getImageData(0, 0, e, f);
        n = Jg(a.color);
        if ("inner" == a.za.type) {
            Hg(a, l.data, e, f, c, d, 3, 1);
            for (var c = l.data, d = n.Vb, e = n.Ub, f = n.Tb, n = n.pd, t = a.strength, p = c.length, s = 0; s < p; s += 4) c[s + 0] = d, c[s + 1] = e, c[s + 2] = f, c[s + 3] = (255 - c[s + 3]) * t, c[s + 3] *= n;
            Rd(r, l, 0, 0)
        } else Hg(a, l.data, e, f, c, d, 3, a.strength), Rd(r, l, 0, 0), r.globalCompositeOperation =
            "source-in", n = cb && $a && 254 < n.Vb && 254 < n.Ub && 254 < n.Tb ? new Vc(254, 254, 254, n.pd) : n, r.fillStyle = n.Jd(), r.fillRect(0, 0, e, f);
        b.ti(h, a.za.sd)
    };
    var mk = function() {};
    q(mk, Fg);
    ng.fa(Ne, mk);
    mk.prototype.apply = function(a, b) {
        var c = b.Fa(),
            d = b.Ta(),
            e = rg(c, d),
            f = e.getContext("2d"),
            h = b.getImageData();
        Ig(a, h.data, c, d, 20 * b.Na.l, 20 * b.Na.k);
        Kg(h.data, a.gc, a.fc, a.hc);
        Rd(f, h, 0, 0);
        b.ti(e, a.za.sd)
    };
    var nk = function() {};
    q(nk, Fg);
    ng.fa(Re, nk);
    nk.prototype.apply = function(a, b) {
        var c = 20 * b.Na.l,
            d = 20 * b.Na.k,
            e = b.Fa(),
            f = b.Ta(),
            h = a.distance,
            l = Math.cos(a.angle) * h * c,
            n = Math.sin(a.angle) * h * d,
            h = rg(e, f),
            r = h.getContext("2d");
        r.drawImage(b.xe(), l, n);
        l = r.getImageData(0, 0, e, f);
        Hg(a, l.data, e, f, c, d, 3, a.strength);
        Kg(l.data, a.gc, a.fc, a.hc);
        Rd(r, l, 0, 0);
        b.ti(h, a.za.sd)
    };
    var ok = function() {};
    Mg.fa(sj, ok);
    Mg.fa(Qj, ok);
    Mg.fa(Xj, ok);
    Mg.fa(xj, ok);
    Mg.fa(Bh, ok);
    Mg.fa(vh, ok);
    ok.prototype.Tc = function(a, b) {
        if (a.Da) {
            a.eo();
            this.Xb(a, b);
            if (a.od) {
                var c = a.od;
                c.Rf(Mg).Tc(c, 16 | b)
            }
            a.Da = 0
        }
    };
    ok.prototype.Xb = function() {};
    ok.prototype.Ia = function() {};
    var pk = function() {};
    q(pk, ok);
    Mg.fa(Aj, pk);
    Mg.fa(fd, pk);
    Mg.fa(Vj, pk);
    Mg.fa(rh, pk);
    Mg.fa(Uj, pk);
    pk.prototype.Xb = function(a, b) {
        if (a.Da & 65552)
            for (var c = a.la.Va; c; c = c.nextSibling) c.Gb || c.Rf(Mg).Tc(c, b)
    };
    var qk = function() {};
    q(qk, ok);
    Mg.fa(Bj, qk);
    qk.prototype.Xb = function(a) {
        a.Wn(this)
    };
    qk.prototype.Dn = function() {};
    qk.prototype.Ia = function() {};
    var rk = function(a) {
        this.c = a
    };
    Mg.ur(rk);
    rk.prototype.Fo = function() {
        var a = this.c.ia;
        a.Da & 1048576 && (a.Da &= -1048577, a.Da && a.Rf(Mg).Tc(a, 0))
    };
    rk.prototype.Vi = function() {};
    rk.prototype.Ia = function() {
        this.c.ia.xo()
    };
    var sk = function(a, b, c, d) {
        jh.call(this, a.id);
        this.font = d || null;
        this.height = a.height;
        this.color = k(a.color) ? a.color : 4278190080;
        this.text = a.text;
        this.align = !k(a.align) || a.html && 7 >= c ? 0 : a.align;
        this.bounds = b;
        this.html = !!a.html;
        this.wrap = !!a.wrap;
        this.multiline = !!a.multiline;
        this.indent = a.indent;
        this.leading = a.leading;
        this.leftMargin = a.leftMargin;
        this.rightMargin = a.rightMargin;
        this.border = !!a.border;
        this.variable = a.variable || null;
        this.La = 6 <= c;
        this.selectable = !!a.selectable;
        this.editable = !!a.editable;
        this.password = !!a.password;
        this.maxChars = a.maxChars || null;
        this.an = !!a.embed;
        this.autoSize = a.autoSize ? "left" : "none"
    };
    q(sk, jh);
    eh[13] = function(a, b, c) {
        c = k(a.font) ? c.le(a.font) : null;
        return new sk(a, ad(a.bounds), b.Od, c)
    };
    sk.prototype.rc = function(a, b, c) {
        return new Bj(this, a, b, c)
    };
    var mf = function(a, b, c, d, e, f, h, l, n) {
        jh.call(this, a);
        this.name = b;
        this.glyphs = c;
        this.emSquareSize = d;
        this.ascent = e;
        this.descent = f;
        this.bold = h;
        this.italic = l;
        this.lineHeight = (e + f) / d;
        this.Fm = {};
        for (a = 0; a < c.length; a++) this.Fm[c[a].unicode] = a;
        this.al = n
    };
    q(mf, jh);
    var pf = new mf(-1, "", [], 0, 0, 0, !1, !1);
    eh[5] = function(a) {
        for (var b = a.emSquareSize ? a.emSquareSize : 1024, c = [], d = 0; a.glyphs && d < a.glyphs.length; d++) {
            var e = a.glyphs[d];
            c.push(new tk(gj(e.data), e.unicode, e.advance))
        }
        return new mf(a.id, a.name, c, b, a.ascent ? a.ascent : 0, a.descent ? a.descent : 0, a.bold, a.italic, a.thickness)
    };
    g = mf.prototype;
    g.Cm = function(a) {
        return this.glyphs[this.Fm[a]]
    };
    g.xb = function(a, b, c, d) {
        mf.oa.xb.call(this, a, b, c, d);
        a = this.name;
        b.qc[a] || (b.qc[a] = []);
        b.qc[a].push(this)
    };
    g.xl = function(a) {
        for (var b = [], c = 0; c < a.length; ++c) b[c] = this.Fm[a.charAt(c)];
        return b
    };
    g.Ys = function(a, b, c, d, e) {
        for (var f = [], h = 0; h < e.length; ++h) {
            f[h] = a;
            var l = this.glyphs[e[h]];
            l && (a += l.advance * b / this.emSquareSize + c, " " == l.unicode && (a += d))
        }
        return f
    };
    g.No = function(a, b, c, d, e, f, h, l) {
        var n = e * f.m + f.p;
        e = e * f.k + f.q;
        var r = f.l,
            t = f.o,
            p = b / this.emSquareSize,
            s = p * f.l,
            u = p * f.o,
            y = p * f.m,
            p = p * f.k;
        a.beginPath();
        for (var x = 0; x < c.length; ++x) {
            var C = this.glyphs[c[x]];
            if (C) {
                var E = d[x];
                fj(a, C.data, s, u, y, p, E * r + n, E * t + e)
            }
        }
        h && (a.fillStyle = a.strokeStyle = h.Jd());
        a.fill();
        l && h && h.Sr() && 200 < h.Qr() && (b = 1 - f.Rr() * b / 20, 0 < b && (a.lineWidth = b, a.stroke()))
    };
    var tk = function(a, b, c) {
        this.data = a;
        this.unicode = b;
        this.advance = c
    };
    var uk = function(a, b, c, d, e, f) {
        lh.call(this, a, null);
        this.data = b;
        this.mask = c;
        this.width = d;
        this.height = e;
        this.transparent = f;
        this.Wg = new Image
    };
    q(uk, lh);
    eh[8] = function(a) {
        return new uk(a.id, a.data, a.mask, a.width, a.height, !(!a.transparent && !a.mask))
    };
    uk.prototype.Ea = function(a) {
        var b = this.Wg;
        a.oj();
        b.onload = b.onerror = function() {
            a.sg()
        };
        if (this.mask) {
            var c = this.width,
                d = this.height,
                e = new Image,
                f = new Image,
                h = !1,
                l = !1,
                n = function() {
                    if (h && l) {
                        var a = rg(c, d),
                            n = a.getContext("2d");
                        n.clearRect(0, 0, c, d);
                        n.drawImage(e, 0, 0, c, d);
                        n.globalCompositeOperation = "destination-in";
                        n.drawImage(f, 0, 0, c, d);
                        b.src = a.toDataURL("image/png")
                    }
                };
            e.onload = function() {
                h = !0;
                n()
            };
            f.onload = function() {
                l = !0;
                n()
            };
            e.src = this.data;
            f.src = this.mask
        } else b.src = this.data
    };
    uk.prototype.rc = function(a, b, c) {
        return new xj(new qj(this, a), a, c)
    };
    uk.prototype.bm = function(a) {
        var b = this;
        b.Qh = a;
        vk(a, wk(xk, a) ? function(a, d) {
            return new xj(new qj(b, a), a, d)
        } : function(a, d) {
            return new qj(b, a, d)
        })
    };
    uk.prototype.xb = function(a, b, c, d) {
        uk.oa.xb.call(this, a, b, c, d);
        this.$c = c.$c
    };
    var Tj = new Pg(Ic.Dm(16384, 16384)),
        yk = function(a) {
            var b = [];
            if (a)
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    b[c] = {
                        color: Qg(d.color, Xg, Jg),
                        offset: Tg(d.offset.map(function(a) {
                            return a / 255
                        }))
                    }
                }
            return b
        },
        zk = function(a, b) {
            return new this(Wg(b.transform, 16384, Tj), yk(b.gradient.stops), b.gradient.spread | 0, b.gradient.interpolation | 0, b.gradient.f ? Tg(b.gradient.f) : null)
        },
        Ak = function(a, b) {
            var c;
            c = b.transform ? Vg(b.transform) : Rc;
            var d = a.le(b.bitmap).get();
            return new this(d instanceof uk ? d : null, c)
        },
        Bk = [null, function(a,
            b) {
            return new kj(Qg(b.color, Xg, Jg))
        }, zk.bind(mj), zk.bind(nj), zk.bind(nj), Ak.bind(oj), Ak.bind(yh)],
        th = function(a, b) {
            var c = Bk[b.type];
            return c ? c(a, b) : null
        };
    var Ei = function(a, b, c, d) {
        lh.call(this, a, d);
        this.Un = [];
        this.Tf = new Kh([], []);
        this.frameCount = b;
        this.scaleRect = c;
        this.tags = [];
        this.Nj = []
    };
    q(Ei, lh);
    var dd = function(a, b, c, d) {
        var e = k(a.scaleRect) ? ad(a.scaleRect) : null,
            e = new Ei(a.id, a.frameCount, e, c.$c);
        k(a.id) || c.kq(0, e);
        if (!d)
            if (d = a.digest) {
                var f = zd[d],
                    h = new xd(f);
                f || (zd[d] = h.dq);
                d = h
            } else d = yd;
        for (var l = h = f = 0; a.tags && l < a.tags.length; l++) {
            var n = a.tags[l];
            if (2 == n.type) f++, h = 0;
            else {
                var r = eh[n.type];
                r && (h++, r(n, b, c, d, void 0).xb(e, b, c, f))
            }
        }
        e.mu();
        return e
    };
    eh[7] = dd;
    Ei.prototype.La = !0;
    Ei.prototype.rc = function(a, b, c) {
        a = new fd(this, a, b, c);
        this.scaleRect && a.$w(this.scaleRect);
        return a
    };
    Ei.prototype.mu = function() {
        for (var a = [], b = 0; b < this.frameCount; ++b) {
            for (var c = this.tags[b], d = [], e = 0; e < a.length; ++e) a[e].zm(d);
            if (c)
                for (e = 0; e < c.length; ++e) c[e].Zh(d);
            a = this.Un[b] = d
        }
    };
    var Ij = function(a, b, c, d, e, f, h) {
            this.c = a.c;
            this.variables = b;
            this.url = c;
            this.target = d || "_self";
            this.method = e;
            this.Co = !!f;
            this.nl = !!h;
            this.Do = this.Co || this.nl ? a.Zd("_self" == this.target ? "this" : this.target) : null
        },
        Ck = {
            0: void 0,
            1: "GET",
            2: "POST"
        };
    g = Ij.prototype;
    g.qv = function(a) {
        var b = this.target.match(/^\_level(\d+)$/i);
        if (this.Co) return this.nl ? b ? this.Eo(Number(b[1])) : this.Ls() : this.Ks(), !0;
        if (b) return this.nl ? this.Eo(Number(b[1])) : this.Js(Number(b[1])), !0;
        if ("" == this.url) return !0;
        if (b = this.url.match(/^fscommand:(.*)$/i)) return cf(this.c, b[1], this.target), !0;
        b = this.target;
        if (!a && "_self" != b) return !1;
        var c = this.method;
        a = this.url;
        if (1 == c) a = jd(this.variables, a), a = a.replace(/%20/g, "+");
        else if (2 == c) {
            var d;
            d = this.variables;
            fa(d) ? d = [d] : (c = [], Xi(d, c.push, c), d =
                c)
        }
        this.c.navigate(a, b, d);
        return !0
    };
    g.Js = function(a) {
        var b = this.c;
        b.ia.md(-16384 + a);
        if (this.url) {
            var c = new pd;
            c.bc = function(c) {
                gd(b, a, c)
            };
            ud(this.url, b, Ck[this.method], this.variables, c)
        }
    };
    g.Ks = function() {
        var a = this.Do,
            b = Ck[this.method];
        if (a instanceof G) {
            var c = a.__swiffy_d;
            c && c.oo(this.url, b, a)
        }
    };
    g.Ls = function() {
        var a = this.Do,
            b = Ck[this.method];
        a instanceof G && a.loadVariables.call(a, this.url, b)
    };
    g.Eo = function(a) {
        var b = this.c;
        rd(this.url, b, Ck[this.method], this.variables, function() {
            var c = b.Cs(a);
            c || (c = new Ei(0, 0, null, {}), c = new fd(c, b, null), b.lk(c, a), c.Ea(), c.$b = !0);
            return c
        })
    };
    var Dk = function(a, b, c, d, e) {
        jh.call(this, a);
        this.matrix = b;
        this.records = c;
        this.bounds = d;
        this.Xr = e
    };
    q(Dk, jh);
    eh[6] = function(a, b, c) {
        b = ad(a.bounds);
        for (var d = Vg(a.matrix), e = k(a.mode) && 1 != a.mode ? null : new Ng(a.gridFit || 0, a.thickness || 0, a.sharpness || 0), f = [], h = 0; a.records && h < a.records.length; h++) {
            var l = a.records[h],
                n = k(l.font) ? c.le(l.font) : null,
                r = k(l.glyphs) ? Oe(l.glyphs) : null;
            f.push(new Ek(l.text, r, n, l.height, Oe(l.x), Number(l.y), l.color))
        }
        return new Dk(a.id, d, f, b, e)
    };
    Dk.prototype.rc = function(a, b, c) {
        return new Xj(this, a, c)
    };
    var Ek = function(a, b, c, d, e, f, h) {
        this.text = a;
        this.font = c;
        this.height = d;
        this.x = e;
        this.y = f;
        this.color = h;
        this.ve = b
    };
    Ek.prototype.Wr = function(a, b, c, d) {
        var e = this.font && this.font.get();
        e instanceof mf && (this.ve || (this.ve = e.xl(this.text)), c = c ? c.apply(Jg(this.color)) : null, e.No(a, this.height, this.ve, this.x, this.y, b, c, d))
    };
    Ek.prototype.qi = function() {
        var a = this.font && this.font.get(),
            b = 0,
            c = 0,
            d = 0,
            e = 0;
        a instanceof mf && (this.ve || (this.ve = a.xl(this.text)), this.ve.length && (c = this.y + a.descent * this.height / a.emSquareSize, b = this.y - a.ascent * this.height / a.emSquareSize, d = this.x[0], e = this.ve.length - 1, e = this.x[e] + (a.glyphs[this.ve[e]].advance | 0) * this.height / a.emSquareSize));
        return new $c(d, b, e, c)
    };
    var gh = function(a, b, c, d, e, f, h, l) {
        this.definition = b;
        this.depth = a.depth;
        this.matrix = c;
        this.clip = a.clip;
        this.colortransform = d;
        this.name = a.name;
        this.ratio = h;
        this.blendmode = a.blendmode;
        this.replace = a.replace;
        this.actions = e;
        this.filters = f;
        this.La = !!(b && b.tk() && b.get().La);
        this.Af = l;
        this.visible = a.visible;
        this.cacheAsBitmap = a.cacheAsBitmap
    };
    q(gh, fh);
    eh[3] = function(a, b, c, d) {
        var e;
        if (k(a.actions)) {
            var f = b.Ee(z);
            e = a.actions.map(function(a) {
                return {
                    events: a.events,
                    key: a.key,
                    actions: f.Ij(a.actions, void 0)
                }
            })
        }
        var h;
        k(a.filters) && (h = a.filters.map(function(a) {
            return le(a)
        }));
        var l;
        k(a.matrix) && (l = a.matrix ? Vg(a.matrix) : Ic);
        b = k(a.id) ? c.le(a.id) : null;
        c = a.colortransform ? nh(a.colortransform) : void 0;
        return new gh(a, b, l, c, e, h, k(a.ratio) ? a.ratio / 65535 : void 0, d.Bk())
    };
    g = gh.prototype;
    g.Qe = function(a) {
        var b = this.depth + -16384,
            c = a.la.Cc(b),
            d = null;
        if (!this.replace == !c) {
            if (c)
                if (!this.definition || c.La() || this.La) d = c;
                else {
                    if (a.md(b), d = this.Gi(a)) d.setTransform(c.Za()), d.pc(c.Fb), d.Cf(c.Ib), d.Og(c.ec()), d.kk(c.vf), d.Pb(c.getName())
                } else d = this.Gi(a);
            d && !d.Vn() && (this.matrix && d.setTransform(this.matrix), this.colortransform && d.pc(this.colortransform), k(this.ratio) && d.Ai(this.ratio), this.filters && d.Cf(this.filters), k(this.blendmode) && d.Og(this.blendmode), k(this.visible) && d.Ii(!!this.visible),
                k(this.cacheAsBitmap) && d.$k(this.cacheAsBitmap))
        }
    };
    g.eh = function(a) {
        var b = a.la.Cc(this.depth + -16384),
            c = null;
        if (b) {
            var c = b.La() && this.La,
                d = this.definition ? this.definition.id : void 0,
                d = !b.La() && b.definition.id == d;
            (c || d) && b.Kd() == (this.ratio || 0) ? c = b : (a.la.Zs(b), c = this.Gi(a))
        } else c = this.Gi(a);
        if (c) return c.Vn() || (c.setTransform(this.matrix ? this.matrix : Ic), c.pc(this.colortransform ? this.colortransform : Zc), c.Ai(this.ratio || 0), c.Cf(this.filters ? this.filters : []), c.Og(this.blendmode | 0), k(this.visible) && c.Ii(!!this.visible)), c
    };
    g.Gi = function(a) {
        if (!this.definition || !this.definition.tk()) return null;
        var b = this.definition.get(),
            c = b.rc(a.c, this.Af);
        if (!c) return null;
        this.name ? c.Pb(this.name) : a.c.ha().In(a.c, c);
        this.clip && c.kk(this.clip + -16384);
        if (this.actions)
            for (c.Lg(7), b = 0; b < this.actions.length; ++b) {
                var d = this.actions[b];
                c.ln(d.events, d.key, d.actions)
            } else b.wi && c.Lg(7);
        a.Yc(c, this.depth + -16384);
        c.Ea(!0);
        return c
    };
    g.zm = function(a) {
        a.push(this)
    };
    g.Zh = function(a) {
        var b = hh(a, this.depth);
        if (0 > b) this.replace || a.push(this);
        else if (this.replace) {
            var c = a[b];
            a.splice(b, 1);
            b = c.definition;
            c.La || this.La || !this.definition || (b = this.definition);
            c = new gh({
                depth: this.depth,
                name: c.name,
                replace: !1,
                La: c.La,
                clip: c.clip,
                blendmode: bj(this.blendmode, c.blendmode),
                visible: bj(this.visible, c.visible),
                filters: bj(this.filters, c.filters)
            }, b, bj(this.matrix, c.matrix), bj(this.colortransform, c.colortransform), bj(this.actions, c.actions), bj(this.filters, c.filters), bj(this.ratio,
                c.ratio), this.Af);
            a.push(c)
        }
    };
    g.nv = function(a) {
        if (!this.actions || !this.La) return !1;
        for (var b = 0; b < this.actions.length; ++b)
            if (0 != (this.actions[b].events & a)) return !0;
        return !1
    };
    g.lv = function() {
        return new gh({
            depth: this.depth + -65536,
            name: this.name,
            replace: !1,
            La: !0,
            clip: 0,
            blendmode: this.blendmode,
            filters: this.filters,
            visible: this.visible
        }, this.definition, this.matrix, this.colortransform, this.actions, this.filters, this.ratio, this.Af)
    };
    var Fk = function(a, b, c, d) {
        c = k(c) ? c : !0;
        d = k(d) ? d : 4294967295;
        if (!("__swiffy_d" in this)) {
            var e = new qj(pj, Ze.c);
            e.xb(a, b, c, d);
            this.__swiffy_d = e
        }
    };
    A(Fk, "BitmapData", qi);
    var Gk = function(a) {
        return a.__swiffy_d
    };
    Object.defineProperty(Fk, "__swiffy_override", {
        value: function(a, b, c, d) {
            return 8191 >= a && 8191 >= b && 16777215 >= a * b ? new Fk(a, b, c, d) : void 0
        }
    });
    Object.defineProperty(Fk.prototype, "width", {
        get: function() {
            return Gk(this).Fa()
        }
    });
    Object.defineProperty(Fk.prototype, "height", {
        get: function() {
            return Gk(this).Ta()
        }
    });
    Object.defineProperty(Fk.prototype, "rect", {
        get: function() {
            var a = Gk(this);
            return new Hi(0, 0, a.Fa(), a.Ta())
        }
    });
    Object.defineProperty(Fk.prototype, "transparent", {
        get: function() {
            return Gk(this).Lc
        }
    });
    Fk.loadBitmap = function(a) {
        for (var b = Ki[a] || Fk, c = Object.create(b.prototype), d = Ze, e = d.c.cn, f = 0; f < e.length; f++) {
            var h = e[f].$c[a];
            if (h instanceof uk) {
                c.__swiffy_d = new qj(h, d.c, c);
                break
            }
        }
        b.call(c);
        return c
    };
    Fk.prototype.copyPixels = function(a, b, c, d, e, f) {
        a && b && c && (e = e || b, Gk(this).ar(Gk(a), b.x, b.y, b.width, b.height, c.x, c.y, d ? Gk(d) : null, e.x, e.y, !!f))
    };
    Fk.prototype.dispose = function() {
        Gk(this).ck()
    };
    Fk.prototype.fillRect = function(a, b) {
        a && Gk(this).fillRect(a.x, a.y, a.width, a.height, b)
    };
    Fk.prototype.getPixel = function(a, b) {
        return Gk(this).Qm(a, b) & 16777215
    };
    Fk.prototype.getPixel32 = function(a, b) {
        return Gk(this).Qm(a, b)
    };
    Fk.prototype.scroll = function(a, b) {
        Gk(this).scroll(a, b)
    };
    Fk.prototype.setPixel = function(a, b, c) {
        Gk(this).Vm(a, b, c | 4278190080)
    };
    Fk.prototype.setPixel32 = function(a, b, c) {
        Gk(this).Vm(a, b, c)
    };
    B(Fk, null, 3);
    var Hk = function(a) {
        Object.defineProperty(this, "__swiffy_v", {
            value: {
                De: this.__swiffy_vm.Vf(a),
                Hp: 0
            }
        })
    };
    A(Hk, "Color");
    Zh(Hk);
    Hk.prototype.getRGB = function() {
        var a = this.__swiffy_v.De;
        return a && a.__swiffy_d ? this.__swiffy_v.Hp : void 0
    };
    Hk.prototype.setRGB = function(a) {
        var b = this.__swiffy_v.De;
        b && (b = b.__swiffy_d) && (this.__swiffy_v.Hp = a, b.pc(new Yc(0, (a & 16711680) >> 16, 0, (a & 65280) >> 8, 0, a & 255, 1, 0)), b.cb())
    };
    Hk.prototype.setTransform = function(a) {
        var b = this.__swiffy_v.De;
        if (b && a && (b = b.__swiffy_d)) {
            var c = this.__swiffy_vm,
                d = c.ea(a, "ra"),
                e = c.ea(a, "rb"),
                f = c.ea(a, "ga"),
                h = c.ea(a, "gb"),
                l = c.ea(a, "ba"),
                n = c.ea(a, "bb"),
                r = c.ea(a, "aa"),
                c = c.ea(a, "ab"),
                t = b.Fb;
            b.pc(new Yc(k(a[d]) ? a[d] / 100 : t.xa, k(a[e]) ? a[e] : t.sa, k(a[f]) ? a[f] / 100 : t.wa, k(a[h]) ? a[h] : t.qa, k(a[l]) ? a[l] / 100 : t.va, k(a[n]) ? a[n] : t.pa, k(a[r]) ? a[r] / 100 : t.ua, k(a[c]) ? a[c] : t.ta));
            b.cb()
        }
    };
    Hk.prototype.getTransform = function() {
        var a = this.__swiffy_v.De;
        if (a && (a = a.__swiffy_d)) return a = a.Fb, {
            ra: 100 * a.xa,
            rb: a.sa,
            ga: 100 * a.wa,
            gb: a.qa,
            ba: 100 * a.va,
            bb: a.pa,
            aa: 100 * a.ua,
            ab: a.ta
        }
    };
    B(Hk.prototype, null, 3);
    var Ik = function(a) {
        return qi.call(this, a)
    };
    A(Ik, "Function", qi);
    Object.defineProperty(Ik, "__swiffy_wrapped_type", {
        value: Function
    });
    Object.defineProperty(Function, "__swiffy_override", {
        value: Ji
    });
    Object.defineProperty(Ik, "__swiffy_override", {
        value: Ji
    });
    Ik.prototype.apply = function(a, b) {
        var c = this;
        if (m(c)) return "__swiffy_override" in c && (c = c.__swiffy_override), Function.prototype.apply.call(c, qi(a), da(b) ? b : [])
    };
    Object.defineProperty(Function.prototype.apply, "__swiffy_override", {
        value: Ik.prototype.apply
    });
    Function.prototype.bind && Object.defineProperty(Function.prototype.bind, "__swiffy_override", {
        value: void 0
    });
    Ik.prototype.call = function(a, b) {
        return Ik.prototype.apply.call(this, a, Array.prototype.slice.call(arguments, 1))
    };
    Object.defineProperty(Function.prototype.call, "__swiffy_override", {
        value: Ik.prototype.call
    });
    B(Ik, null, 3);
    B(Ik.prototype, null, 3);
    var Jk = function(a) {
            a.__swiffy_v.so = [];
            Object.defineProperty(a, "contentType", {
                value: "application/x-www-form-urlencoded",
                writable: !0
            });
            Object.defineProperty(a, "loaded", {
                value: !1,
                writable: !0
            })
        },
        Kk = function(a, b, c) {
            var d = Ze;
            a = a.__swiffy_v.so;
            if (fa(b) && k(c)) a.push({
                name: b,
                value: d.Qa(c)
            });
            else if (da(b)) {
                c = b.length / 2;
                for (var e = 0; e < c; e++) a.push({
                    name: d.Qa(b[2 * e]),
                    value: d.Qa(b[2 * e + 1])
                })
            }
        },
        Mk = function(a, b, c, d) {
            var e = Ze;
            a = e.Qa(a);
            b.loaded = !1;
            var f = new pd;
            f.bc = function(a) {
                Lk(b.onData, b, a)
            };
            f.Gc = function() {
                Lk(b.onData,
                    b, void 0)
            };
            var h = null,
                l = "GET",
                n, r;
            c && (h = c.toString(), l = k(d) ? d : "POST", n = c.__swiffy_v.so, r = c.contentType);
            nd(a, e.c, l, h, f, n, r)
        },
        Nk = function(a, b, c, d) {
            var e = Ze;
            a = e.Qa(a);
            c = k(c) ? c : "_self";
            d = k(d) ? d : "POST";
            if ("GET" == d) d = 1;
            else if ("POST" == d) d = 2;
            else return;
            e.c.Yg(new Ij(e, b, a, c, d))
        },
        Lk = function(a, b, c) {
            if (m(a)) return a.call.apply(a.call, arguments)
        };
    var Ok = function() {};
    ji(Ok, F);
    var Pk = function(a, b) {
            Object.defineProperty(this, a, {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !0
            });
            var c = this.__swiffy_d;
            c && c != c.c.kb && c.vi()
        },
        Qk = function() {},
        Rk = [, , "onMouseUp", "onMouseDown", "onMouseMove", "onUnload", "onEnterFrame"];
    Rk[19] = "onConstruct";
    Rk[7] = "onLoad";
    Rk[14] = "onDragOver";
    Rk[16] = "onDragOver";
    Rk[8] = "onRollOut";
    Rk[9] = "onRollOver";
    Rk[10] = "onReleaseOutside";
    Rk[11] = "onRelease";
    Rk[12] = "onPress";
    Rk[13] = "onDragOut";
    Rk[15] = "onDragOut";
    for (var Sk = {}, Tk = 0; Tk < Rk.length; Tk++)
        if (1 << Tk & 63045376) {
            var Uk = Rk[Tk];
            Sk[Uk] = {
                get: Qk,
                set: oa(Pk, Uk)
            }
        }
    Object.defineProperties(Ok.prototype, Sk);
    B(Ok.prototype, null, 3);
    var Vk = function() {};
    ji(Vk, Ok);
    B(Vk.prototype, null, 3);
    var Wk = function() {};
    A(Wk, "Button", Vk);
    Wk.prototype.enabled = !0;
    Wk.prototype.useHandCursor = !0;
    Object.defineProperty(Wk.prototype, "tabIndex", {
        value: void 0,
        writable: !0,
        enumerable: !0
    });
    B(Wk.prototype, null, 3);
    var Xk = function() {
        Object.defineProperty(this, "__swiffy_v", {
            value: {}
        });
        Jk(this)
    };
    A(Xk, "LoadVars");
    Xk.prototype.addRequestHeader = function(a, b) {
        Kk(this, a, b)
    };
    Xk.prototype.load = function(a) {
        Mk(a, this)
    };
    Xk.prototype.send = function(a, b, c) {
        if (0 == arguments.length) return !1;
        Nk(a, this, b, c);
        return !0
    };
    Xk.prototype.sendAndLoad = function(a, b, c) {
        Mk(a, b, this, c)
    };
    Xk.prototype.onData = function(a) {
        var b = k(a);
        b && Lk(this.decode, this, a);
        this.loaded = b;
        Lk(this.onLoad, this, b)
    };
    Xk.prototype.onLoad = function() {};
    Xk.prototype.decode = function(a) {
        a = qd(a);
        for (var b in a) {
            var c = a[b];
            this[b] = c[c.length - 1]
        }
    };
    Xk.prototype.toString = function() {
        return jd(this)
    };
    B(Xk.prototype, null, 3);
    var G = function() {};
    A(G, "MovieClip", Vk);
    G.prototype.enabled = !0;
    G.prototype.useHandCursor = !0;
    G.prototype.focusEnabled = void 0;
    Object.defineProperty(G.prototype, "_droptarget", {
        get: function() {
            var a = this.__swiffy_d;
            return a ? (a = (a = a.Zt()) && a.$._target) && "/" != a ? a : "" : ""
        }
    });
    G.prototype.gotoAndStop = function(a) {
        var b = this.__swiffy_d;
        b && b.He(b.Nf(a), !1)
    };
    G.prototype.gotoAndPlay = function(a) {
        var b = this.__swiffy_d;
        b && b.He(b.Nf(a), !0)
    };
    G.prototype.play = function() {
        var a = this.__swiffy_d;
        a && a.play()
    };
    G.prototype.stop = function() {
        var a = this.__swiffy_d;
        a && a.stop()
    };
    G.prototype.nextFrame = function() {
        var a = this.__swiffy_d;
        a && a.Yh()
    };
    G.prototype.prevFrame = function() {
        var a = this.__swiffy_d;
        a && a.Bm()
    };
    G.prototype.globalToLocal = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c = b.c.ha(),
                d = c.On(a);
            if (null != d) {
                var e = c.ea(a, "x"),
                    c = c.ea(a, "y"),
                    b = Ui(b.Wc(), d);
                a[e] = b.x;
                a[c] = b.y
            }
        }
    };
    G.prototype.localToGlobal = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c = b.c.ha(),
                d = c.On(a);
            if (null != d) {
                var e = c.ea(a, "x"),
                    c = c.ea(a, "y"),
                    b = Ui(b.Ha(), d);
                a[e] = b.x;
                a[c] = b.y
            }
        }
    };
    G.prototype.createEmptyMovieClip = function(a, b) {
        var c = this.__swiffy_d;
        if (c) {
            var d = new Ei(0, 0, null, c.definition.$c),
                d = new fd(d, c.c, null);
            d.$b = !0;
            d.Pb(a);
            d.Ea();
            c.md(b);
            c.Yc(d, b);
            return d.$
        }
    };
    G.prototype.createTextField = function(a, b, c, d, e, f) {
        if (!(6 > arguments.length)) {
            a = String(a);
            b = Si(b);
            c = Si(c);
            d = Si(d);
            e = Math.abs(Si(e));
            f = Math.abs(Si(f));
            var h = this.__swiffy_d;
            if (h) {
                var l = new sk({
                        tag: -1,
                        height: 240,
                        color: 4278190080,
                        border: !1,
                        an: !1,
                        html: !1,
                        maxChars: null,
                        multiline: !1,
                        password: !1,
                        selectable: !0,
                        variable: null,
                        wrap: !1,
                        La: 6 <= h.c.Od
                    }, new $c(0, 0, 20 * e, 20 * f), h.c.Od),
                    l = new Bj(l, h.c, null);
                l.Pb(a);
                l.setTransform(Uc(1, 0, 0, 1, 20 * c, 20 * d));
                l.Ea();
                l.$b = !0;
                h.md(b);
                h.Yc(l, b);
                return l.$
            }
        }
    };
    G.prototype.getNextHighestDepth = function() {
        var a = this.__swiffy_d;
        return a ? a.la.nu() : void 0
    };
    G.prototype.getInstanceAtDepth = function(a) {
        var b = this.__swiffy_d;
        if (b && !(-16384 > a) && (a = b.la.Cc(a))) return a instanceof yj ? a.$ : b.$
    };
    G.prototype.getSWFVersion = function() {
        var a = this.__swiffy_d;
        return a ? a.c.Od : -1
    };
    G.prototype.setMask = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c;
            c = fa(a) ? b.c.ha().uo(a) : a;
            if (c instanceof G || c instanceof Yk) return b.Oe(c.__swiffy_d), !0;
            b.Oe(null);
            return !k(a)
        }
    };
    G.prototype.attachMovie = function(a, b, c, d) {
        var e = this.__swiffy_d;
        if (e && (a = e.definition.$c[a], k(a))) {
            var f = yd.Bk();
            a = a.rc(e.c, f);
            a.$b = !0;
            a.Pb(b);
            e.md(c);
            e.Yc(a, c);
            if (k(d)) {
                b = a.$;
                for (var h in d) b[h] = d[h]
            }
            a.Ea();
            return a.$
        }
    };
    G.prototype.attachBitmap = function(a, b) {
        var c = this.__swiffy_d;
        if (c && a) {
            var d = new xj(a.__swiffy_d, c.c);
            d.$b = !0;
            c.md(b);
            c.Yc(d, b)
        }
    };
    G.prototype.duplicateMovieClip = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e = d.getParent();
            if (e) {
                a = d.duplicate(e, a, b);
                if (k(c)) {
                    b = a.$;
                    for (var f in c) b[f] = c[f]
                }
                return a.$
            }
        }
    };
    G.prototype.removeMovieClip = function() {
        var a = this.__swiffy_d;
        if (a) {
            var b = a.getParent();
            0 <= a.depth && a.$b && b && (a.Ia(), b.removeChild(a))
        }
    };
    G.prototype.loadMovie = function(a, b) {
        var c = this.__swiffy_d;
        c && (a = c.c.ha().Qa(a), c.oo(a, b, this))
    };
    G.prototype.loadVariables = function(a, b) {
        var c = this.__swiffy_d;
        c && rd(a, c.c, b, this, function() {
            return c
        })
    };
    G.prototype.unloadMovie = function() {
        var a = this.__swiffy_d;
        a && a.kl(new Ei(0, 0, null, a.definition.$c))
    };
    G.prototype.swapDepths = function(a) {
        var b = this.__swiffy_d,
            c = b ? b.getParent() : void 0;
        if (c) {
            var d = void 0;
            if (a instanceof F) {
                a = a.__swiffy_d;
                if (a.getParent() != c) return;
                d = a.depth
            } else "number" === typeof a && (d = a);
            k(d) && c.Ml(b.depth, d)
        }
    };
    G.prototype.getBytesTotal = function() {
        var a = this.__swiffy_d;
        if (a) return a.c.Pr
    };
    G.prototype.getBytesLoaded = G.prototype.getBytesTotal;
    G.prototype.getBounds = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c = b.tb().kd().clone();
            c.$a() && c.expand(134217728, 134217728);
            if (k(a)) {
                var d = null;
                fa(a) && (a = b.c.ha().Kg(a, this));
                a instanceof G && (d = a.__swiffy_d);
                if (d) a = d.Wc(), c.na(b.Ha().multiply(a));
                else return
            }
            b = {};
            b.xMin = c.j / 20;
            b.xMax = c.t / 20;
            b.yMin = c.i / 20;
            b.yMax = c.s / 20;
            return b
        }
    };
    G.prototype.getURL = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e = d.c.ha();
            a = e.Qa(a);
            var f = 0;
            fa(c) && (c = c.toLowerCase(), "get" == c ? f = 1 : "post" == c && (f = 2));
            a = new Ij(e, this, a, b, f);
            d.c.Yg(a)
        }
    };
    G.prototype.hitTest = function(a, b, c) {
        var d = this.__swiffy_d;
        if (k(a) && d) {
            var e = d.tb().kd().clone();
            e.na(d.Ha());
            if (!k(b) && !k(c)) {
                if (c = null, a instanceof G ? c = a.__swiffy_d : fa(a) && (c = d.c.ha().Kg(a, this)), null != c) return d = c.tb().kd().clone(), d.na(c.Ha()), e.qs(d)
            } else if (k(b)) return a *= 20, b *= 20, (e = e.contains(a, b)) && c ? d.ps(a, b) : e
        }
        return !1
    };
    G.prototype.clear = function() {
        var a = this.__swiffy_d;
        a && a.jb().clear()
    };
    G.prototype.moveTo = function(a, b) {
        var c = this.__swiffy_d;
        c && c.jb().moveTo(a, b)
    };
    G.prototype.lineTo = function(a, b) {
        var c = this.__swiffy_d;
        c && c.jb().lineTo(a, b)
    };
    G.prototype.curveTo = function(a, b, c, d) {
        var e = this.__swiffy_d;
        e && e.jb().Lb(a, b, c, d)
    };
    G.prototype.lineStyle = function(a, b, c, d, e, f, h, l) {
        var n = this.__swiffy_d;
        n && n.jb().vq(a, b, c, d, e, f, h, l)
    };
    G.prototype.beginFill = function(a, b) {
        var c = this.__swiffy_d;
        c && c.jb().sq(a, b)
    };
    G.prototype.beginGradientFill = function(a, b, c, d, e, f, h, l) {
        var n = this.__swiffy_d;
        if (n) {
            var r = null;
            ia(e) && (e instanceof xi ? r = yi(e) : "box" == e.matrixType ? (r = Ai(e.w, e.h, e.r, e.x, e.y), r = r.Uc(20 * r.p, 20 * r.q)) : r = Uc(e.a * jj, e.b * jj, e.d * jj, e.e * jj, 20 * e.g, 20 * e.h));
            e = r;
            n.jb().Lo(a, b, c, d, e, f, h, l)
        }
    };
    G.prototype.endFill = function() {
        var a = this.__swiffy_d;
        a && a.jb().uq()
    };
    G.prototype.startDrag = function(a, b, c, d, e) {
        var f = this.__swiffy_d;
        f && f.c.vo(f, a, b, c, d, e)
    };
    G.prototype.stopDrag = function() {
        var a = this.__swiffy_d;
        a && a.c.Ji()
    };
    Oi(G.prototype, "_currentframe", function(a) {
        return Math.max(1, a.eb + 1)
    });
    Oi(G.prototype, "_totalframes", function(a) {
        return a.definition.frameCount
    });
    Oi(G.prototype, "_framesloaded", function(a) {
        return a.definition.frameCount
    });
    Li(G.prototype, "_lockroot", function(a) {
        return a.li
    }, function(a, b) {
        a.jn(Boolean(b))
    });
    Li(G.prototype, "blendMode", function(a) {
        return Nc[a.ec()]
    }, function(a, b) {
        var c = 0;
        Number(b) == b ? (c = Number(b) - 1, Nc[c] || (c = 0)) : c = Mc[String(b)] || 0;
        a.Og(c)
    });
    Li(G.prototype, "cacheAsBitmap", function(a) {
        return a.qr()
    }, function(a, b) {
        a.$k(Boolean(b))
    });
    B(G.prototype, null, 3);
    var Zk = function() {
        Object.defineProperty(this, "__swiffy_v", {
            value: {
                nm: 0,
                volume: 100,
                transform: {
                    Hj: 100,
                    hm: 0,
                    im: 0,
                    jm: 100
                }
            }
        })
    };
    A(Zk, "Sound");
    Zh(Zk);
    Zk.prototype.checkPolicyFile = !1;
    Object.defineProperty(Zk.prototype, "duration", {
        value: 0
    });
    Object.defineProperty(Zk.prototype, "id3", {
        value: void 0
    });
    Object.defineProperty(Zk.prototype, "position", {
        value: 0
    });
    Zk.prototype.onID3 = void 0;
    Zk.prototype.onLoad = void 0;
    Zk.prototype.onSoundComplete = void 0;
    Zk.prototype.attachSound = function() {};
    Zk.prototype.getBytesLoaded = function() {
        return 0
    };
    Zk.prototype.getBytesTotal = function() {
        return 0
    };
    Zk.prototype.getPan = function() {
        return this.__swiffy_v.nm
    };
    Zk.prototype.getTransform = function() {
        var a = this.__swiffy_v;
        return {
            ll: a.transform.Hj,
            lr: a.transform.hm,
            rl: a.transform.im,
            rr: a.transform.jm
        }
    };
    Zk.prototype.getVolume = function() {
        return this.__swiffy_v.volume
    };
    Zk.prototype.loadSound = function() {
        Sh(na(function() {
            if (m(this.onLoad)) this.onLoad(!0)
        }, this), 1)
    };
    Zk.prototype.setPan = function(a) {
        a = $k.call(this, a);
        var b = this.__swiffy_v;
        b.nm = -100 > a ? -200 - a : 100 < a ? 200 - a : a;
        b.transform = {
            Hj: 0 < a ? 100 - a : 100,
            jm: 0 > a ? 100 + a : 100,
            hm: 0,
            im: 0
        }
    };
    Zk.prototype.setTransform = function(a) {
        if (a) {
            var b = this.__swiffy_v;
            k(a.ll) && (b.transform.Hj = al.call(this, a.ll));
            k(a.lr) && (b.transform.hm = al.call(this, a.lr));
            k(a.rl) && (b.transform.im = al.call(this, a.rl));
            k(a.rr) && (b.transform.jm = al.call(this, a.rr));
            a = 100 - b.transform.Hj;
            b.nm = -100 > a ? -200 - a : 100 < a ? 200 - a : a
        }
    };
    Zk.prototype.setVolume = function(a) {
        this.__swiffy_v.volume = $k.call(this, a)
    };
    Zk.prototype.start = function() {
        Sh(na(function() {
            if (m(this.onSoundComplete)) this.onSoundComplete()
        }, this), 1)
    };
    Zk.prototype.stop = function() {};
    Zk.prototype.toString = function() {
        return "[object Object]"
    };
    B(Zk.prototype, null, 3);
    var $k = function(a) {
            a = this.__swiffy_vm.mr("Number")(a);
            return isNaN(a) ? -2147483648 : a >> 0
        },
        al = function(a) {
            return this.__swiffy_vm.mr("Number")(a) >> 0
        };
    var bl = function() {
        this.showMenu = !0
    };
    A(bl, "Stage");
    Object.defineProperty(bl.prototype, "height", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Kc ? a.Ld : a.xi
        },
        set: function() {}
    });
    Object.defineProperty(bl.prototype, "width", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Kc ? a.Md : a.yi
        },
        set: function() {}
    });
    Object.defineProperty(bl.prototype, "align", {
        get: function() {
            var a = this.__swiffy_d.ge,
                b = "";
            a & 1 && (b += "L");
            a & 2 && (b += "T");
            a & 4 && (b += "R");
            a & 8 && (b += "B");
            return b
        },
        set: function(a) {
            this.__swiffy_d.wr(String(a))
        }
    });
    Object.defineProperty(bl.prototype, "scaleMode", {
        get: function() {
            return this.__swiffy_d.Kc
        },
        set: function(a) {
            var b = this.__swiffy_d;
            switch (String(a).toLowerCase()) {
                case "exactfit":
                    a = "exactFit";
                    break;
                case "noborder":
                    a = "noBorder";
                    break;
                case "noscale":
                    a = "noScale";
                    break;
                default:
                    a = "showAll"
            }
            b.Hr(a)
        }
    });
    B(bl.prototype, null, 3);
    var cl = function() {
        this.allowDomain = function() {
            return !0
        };
        this.allowInsecureDomain = function() {
            return !0
        }
    };
    A(cl, "System.security");
    var dl = function() {
        this.security = new cl
    };
    A(dl, "System");
    var el = function() {
        hf(this, new kf)
    };
    A(el, "TextFormat");
    var fl = function(a) {
        var b = Object.create(el.prototype);
        hf(b, a);
        return b
    };
    Object.defineProperties(el.prototype, {
        align: {
            get: uf,
            set: vf,
            Eb: !0
        },
        blockIndent: {
            get: wf,
            set: xf,
            Eb: !0
        },
        bold: {
            get: yf,
            set: zf,
            Eb: !0
        },
        bullet: {
            get: Af,
            set: Bf,
            Eb: !0
        },
        color: {
            get: Cf,
            set: Df,
            Eb: !0
        },
        font: {
            get: If,
            set: Jf,
            Eb: !0
        },
        indent: {
            get: Kf,
            set: Lf,
            Eb: !0
        },
        italic: {
            get: Mf,
            set: Nf,
            Eb: !0
        },
        kerning: {
            get: Of,
            set: Pf,
            Eb: !0
        },
        leading: {
            get: Qf,
            set: Rf,
            Eb: !0
        },
        leftMargin: {
            get: Sf,
            set: Tf,
            Eb: !0
        },
        letterSpacing: {
            get: Uf,
            set: Vf,
            Eb: !0
        },
        rightMargin: {
            get: Wf,
            set: Xf,
            Eb: !0
        },
        size: {
            get: Yf,
            set: Zf,
            Eb: !0
        },
        tabStops: {
            get: bg,
            set: cg,
            Eb: !0
        },
        target: {
            get: $f,
            set: ag,
            Eb: !0
        },
        underline: {
            get: dg,
            set: eg,
            Eb: !0
        },
        url: {
            get: fg,
            set: gg,
            Eb: !0
        }
    });
    var Yk = function() {};
    A(Yk, "TextField", F);
    Yk.prototype.getTextFormat = function(a, b) {
        var c = this.__swiffy_d;
        if (c) return c = c.pr(a, b), fl(c)
    };
    Yk.prototype.setTextFormat = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e, f, h;
            a instanceof el ? e = a : b instanceof el ? (e = b, f = a) : c instanceof el && (e = c, f = a, h = b);
            e && d.Lj(v(e), f, h)
        }
    };
    Yk.prototype.getNewTextFormat = function() {
        var a = this.__swiffy_d;
        if (a) return a = a.nr(), fl(a)
    };
    Yk.prototype.setNewTextFormat = function(a) {
        var b = this.__swiffy_d;
        b && a instanceof el && b.Gr(v(a))
    };
    var gl = function(a, b, c, d) {
        Object.defineProperty(Yk.prototype, a, {
            get: function() {
                var a = this.__swiffy_d;
                if (a) return b.call(this, a)
            },
            set: function(a) {
                var b = this.__swiffy_d;
                b && c && c.call(this, b, a)
            },
            enumerable: k(d) ? d : !0
        })
    };
    gl("text", function(a) {
        var b = a.Ka;
        a.Sb && (b = Lj(b, a.definition.multiline));
        return b
    }, function(a, b) {
        var c = a.c.ha();
        b = c.Qa(b);
        a.Sb && (a.Hi(!1), b = Mj(b));
        null != a.Zd() ? c.rs(a.Zd(), a, b) : a.Ec(b);
        a.Hi(!0)
    });
    gl("htmlText", function(a) {
        var b = a.Ka;
        a.Sb && (b = Nj(String(b)));
        return b
    }, function(a, b) {
        var c = a.c.ha();
        b = c.Qa(b);
        null != a.Zd() ? c.Fi(a.Zd(), b) : a.Ec(b)
    });
    gl("textColor", function(a) {
        return a.or()
    }, function(a, b) {
        a.Jr(Number(b))
    });
    gl("antiAliasType", function(a) {
        return a.el
    }, function(a, b) {
        "normal" != b && "advanced" != b || a.xr(String(b))
    });
    gl("autoSize", function(a) {
        return a.yf
    }, function(a, b) {
        switch (b) {
            case !0:
                b = "left";
            case "center":
            case "left":
            case "none":
            case "right":
                break;
            default:
                b = "none"
        }
        a.yr(b)
    });
    gl("background", function(a) {
        return a.ni
    }, function(a, b) {
        a.xg(!!b)
    }, !1);
    gl("backgroundColor", function(a) {
        return a.mi
    }, function(a, b) {
        a.zr(Number(b))
    }, !1);
    gl("border", function(a) {
        return a.pi
    }, function(a, b) {
        a.Ar(!!b)
    }, !1);
    gl("borderColor", function(a) {
        return a.oi
    }, function(a, b) {
        a.Br(Number(b))
    }, !1);
    gl("condenseWhite", function(a) {
        return a.io
    }, function(a, b) {
        a.Pw(!!b)
    }, !1);
    gl("embedFonts", function(a) {
        return a.Df
    }, function(a, b) {
        a.Dr(!!b)
    });
    gl("gridFitType", function(a) {
        return a.jo
    }, function(a, b) {
        "none" != b && "pixel" != b && "subpixel" != b || a.Sw(String(b))
    }, !1);
    gl("html", function(a) {
        return a.Sb
    }, function(a, b) {
        b = !!b;
        if (b != a.Sb) {
            var c = this.text;
            a.bv(b);
            this.text = c
        }
    });
    gl("length", function() {
        return this.text.length
    });
    gl("maxChars", function(a) {
        return a.ko
    }, function(a, b) {
        a.Tw(null != b ? Number(b) : null)
    }, !1);
    gl("mouseWheelEnabled", function() {
        return !0
    }, void 0, !1);
    gl("multiline", function(a) {
        return a.Ke
    }, function(a, b) {
        a.Er(!!b)
    });
    gl("password", function(a) {
        return a.lo
    }, function(a, b) {
        a.Ww(!!b)
    }, !1);
    gl("restrict", function(a) {
        return a.mo
    }, function(a, b) {
        a.Zw(null != b ? String(b) : null)
    }, !1);
    gl("selectable", function(a) {
        return a.Pg
    }, function(a, b) {
        a.Ir(!!b)
    });
    Object.defineProperty(Yk.prototype, "styleSheet", {
        value: void 0,
        enumerable: !1
    });
    gl("sharpness", function(a) {
        return a.no
    }, function(a, b) {
        a.ax(Number(b))
    }, !1);
    Object.defineProperty(Yk.prototype, "tabIndex", {
        value: void 0,
        writable: !0,
        enumerable: !1
    });
    gl("textHeight", function(a) {
        return Math.floor(a.hl() / 20)
    });
    gl("textWidth", function(a) {
        return Math.floor(a.il() / 20)
    });
    gl("thickness", function(a) {
        return a.al
    }, function(a, b) {
        a.bx(Number(b))
    }, !1);
    gl("variable", function(a) {
        return a.Zd()
    }, function(a, b) {
        a.Fi(null != b ? String(b) : null)
    });
    gl("wordWrap", function(a) {
        return a.bh
    }, function(a, b) {
        a.Kr(!!b)
    });
    gl("type", function(a) {
        return a.Qi ? "input" : "dynamic"
    }, function(a, b) {
        b = String(b).toLowerCase();
        "input" == b ? a.Um(!0) : "dynamic" == b && a.Um(!1)
    }, !1);
    B(Yk.prototype, null, 3);
    var Pi = function(a) {
        a instanceof sj || (a = this.__swiffy_vm.Vf(a));
        Object.defineProperty(this, "__swiffy_d", {
            value: a
        })
    };
    A(Pi, "Transform");
    Zh(Pi);
    Li(Pi.prototype, "colorTransform", function(a) {
        return ri(a.Fb)
    }, function(a, b) {
        a.pc(b instanceof pi ? b.__swiffy_v : Zc)
    });
    Oi(Pi.prototype, "concatenatedColorTransform", function(a) {
        return ri(a.ld())
    });
    Oi(Pi.prototype, "concatenatedMatrix", function(a) {
        return zi(a.Ha())
    });
    Li(Pi.prototype, "matrix", function(a) {
        return zi(a.Za())
    }, function(a, b) {
        a.setTransform(yi(b))
    });
    Oi(Pi.prototype, "pixelBounds", function(a) {
        var b = a.tb().kd().clone();
        b.na(a.Ha());
        return new Hi(Math.floor(b.j / 20), Math.floor(b.i / 20), Math.ceil((b.t - b.j) / 20), Math.ceil((b.s - b.i) / 20))
    });
    var hl = function() {};
    A(hl, "Video", F);
    Object.defineProperty(hl.prototype, "width", {
        get: function() {
            return this.__swiffy_d.width
        }
    });
    Object.defineProperty(hl.prototype, "height", {
        get: function() {
            return this.__swiffy_d.height
        }
    });
    Object.defineProperty(hl.prototype, "smoothing", {
        get: function() {
            return this.__swiffy_d.smoothing
        },
        set: function(a) {
            this.__swiffy_d.smoothing = a
        }
    });
    Object.defineProperty(hl.prototype, "deblocking", {
        get: function() {
            return this.__swiffy_d.deblocking
        },
        set: function(a) {
            this.__swiffy_d.deblocking = a
        }
    });
    hl.prototype.attachVideo = function() {};
    hl.prototype.clear = function() {};
    B(hl.prototype, null, 3);
    var jl = function(a, b) {
            if ("_" == b.charAt(0) && a instanceof F) {
                if (b in a) return b;
                var c = b.toLowerCase();
                if (c in il && c in a) return c
            }
            return b
        },
        ml = function(a, b) {
            var c = kl[typeof a];
            if (c) {
                var d = b.toLowerCase();
                return (c = c[d]) ? c : d
            }
            if (b in a) return b;
            var e = ll(a),
                d = b.toLowerCase();
            return (c = e[d]) ? c : b == d || d in a ? d : e[d] = b
        },
        nl = function(a, b) {
            if ("_" == b.charAt(0) && a instanceof F) {
                if (b in a) return b;
                var c = b.toLowerCase();
                if (c in il && c in a) return c
            }
            return b
        },
        ol = function(a, b) {
            var c = kl[typeof a];
            if (!c) {
                if (b in a) return b;
                c = ll(a)
            }
            var d = b.toLowerCase();
            return (c = c[d]) ? c : d
        },
        pl = function(a) {
            a = a instanceof rh ? a.getParent() : a;
            return a = this.Pl(a, Aj)
        },
        ql = function(a) {
            a = a instanceof rh ? a.getParent() : a;
            return a = this.Pl(a, fd)
        },
        rl = function(a) {
            return ha(a) ? a : !k(a) || null === a || fa(a) && "" === a.trim() ? Number.NaN : Number(a)
        },
        sl = function(a) {
            return ha(a) ? a : k(a) && null !== a ? fa(a) && "" === a.trim() ? Number.NaN : Number(a) : 0
        },
        tl = function(a) {
            return ha(a) ? a : k(a) && null !== a ? fa(a) ? (a = Number(a), isNaN(a) ? 0 : a) : Number(a) : 0
        },
        ul = function(a) {
            if (fa(a)) return a;
            ga(a) &&
                (a = a ? "1" : "0");
            return k(a) ? a instanceof F ? a.__swiffy_d.dk() : a + "" : ""
        },
        vl = function(a) {
            return fa(a) ? a : k(a) ? a instanceof F ? a.__swiffy_d.dk() : a + "" : ""
        },
        wl = function(a) {
            return fa(a) ? a : a instanceof F ? a.__swiffy_d.dk() : a + ""
        },
        xl = function(a) {
            return Boolean(a)
        },
        yl = function(a) {
            return "string" == typeof a ? Boolean(Number(a)) : Boolean(a)
        },
        zl = function(a, b) {
            return a == b ? 1 : 0
        },
        Al = function(a, b) {
            return a == b
        },
        Bl = function(a, b) {
            var c = typeof a,
                d = typeof b;
            return "number" === c && "number" === d ? a == b : this.jr(a, c, b, d)
        },
        Cl = function(a, b) {
            var c =
                typeof a,
                d = typeof b;
            return c === d && null === a === (null === b) ? a == b : this.jr(a, c, b, d)
        };
    var Dl = function(a, b) {
        Object.defineProperty(this, "nodeType", {
            value: a,
            writable: !1
        });
        Object.defineProperty(this, "attributes", {
            value: {},
            writable: !1
        });
        1 == a ? (this.nodeName = b, this.nodeValue = null) : (this.nodeName = null, this.nodeValue = b);
        Object.defineProperty(this, "__swiffy_v", {
            value: {
                nextSibling: null,
                previousSibling: null,
                parentNode: null,
                childNodes: []
            }
        })
    };
    A(Dl, "XMLNode");
    var El = function(a) {
        return a.__swiffy_v
    };
    Object.defineProperty(Dl.prototype, "childNodes", {
        get: function() {
            return El(this).childNodes.slice(0)
        }
    });
    Object.defineProperty(Dl.prototype, "firstChild", {
        get: function() {
            return El(this).childNodes[0]
        }
    });
    Object.defineProperty(Dl.prototype, "lastChild", {
        get: function() {
            var a = El(this).childNodes;
            return a[a.length - 1]
        }
    });
    Object.defineProperty(Dl.prototype, "nextSibling", {
        get: function() {
            return El(this).nextSibling
        }
    });
    Object.defineProperty(Dl.prototype, "parentNode", {
        get: function() {
            return El(this).parentNode
        }
    });
    Object.defineProperty(Dl.prototype, "previousSibling", {
        get: function() {
            return El(this).previousSibling
        }
    });
    Dl.prototype.toString = function() {
        return Fl(this, !1, 0)
    };
    var Fl = function(a, b, c) {
        b = "undefined" !== typeof b ? b : !1;
        c = "undefined" !== typeof c ? c : 0;
        var d = "";
        if (b)
            for (var e = 0; e < c; e++) d += "  ";
        var f = b ? "\n" : "";
        if (3 == a.nodeType) return d + $d(a.nodeValue) + f;
        var h = "";
        if (null == a.nodeName) a.xmlDecl && (h += d + a.xmlDecl + f), a.docTypeDecl && (h += d + a.docTypeDecl + f);
        else {
            var h = h + (d + "<" + a.nodeName),
                l;
            for (l in a.attributes) h += " " + l + '="' + a.attributes[l] + '"';
            if (0 == El(a).childNodes.length) return h + " />";
            h += ">" + f
        }
        l = El(a).childNodes;
        for (e = 0; e < l.length; e++) h += Fl(l[e], b, c + 1);
        null != a.nodeName &&
            (h += d + "</" + a.nodeName + ">" + f);
        return h
    };
    Dl.prototype.appendChild = function(a) {
        if (!~El(this).childNodes.indexOf(a)) {
            a.removeNode();
            var b = this.lastChild;
            El(this).childNodes.push(a);
            b && (El(b).nextSibling = a, El(a).previousSibling = b);
            El(a).parentNode = this
        }
    };
    Dl.prototype.insertBefore = function(a, b) {
        var c = El(this).childNodes;
        if (!~c.indexOf(a)) {
            var d = c.indexOf(b);
            if (~d) {
                a.removeNode();
                El(a).parentNode = this;
                var e = c[d - 1],
                    f = c[d];
                c.splice(d, 0, a);
                e ? (El(e).nextSibling = a, El(a).previousSibling = e) : El(a).previousSibling = null;
                f ? (El(f).previousSibling = a, El(a).nextSibling = f) : El(a).nextSibling = null
            }
        }
    };
    Dl.prototype.removeNode = function() {
        var a = El(this);
        a.parentNode && Ia(El(a.parentNode).childNodes, this);
        a.nextSibling && (El(a.nextSibling).previousSibling = a.previousSibling);
        a.previousSibling && (El(a.previousSibling).nextSibling = a.nextSibling);
        a.nextSibling = null;
        a.previousSibling = null;
        a.parentNode = null
    };
    Dl.prototype.cloneNode = function(a) {
        var b = new Dl(this.nodeType, null);
        b.nodeName = this.nodeName;
        b.nodeValue = this.nodeValue;
        for (var c in this.attributes) b.attributes[c] = this.attributes[c];
        if (a) {
            c = El(this).childNodes;
            for (var d = El(b).childNodes, e = 0; e < c.length; e++) {
                var f = c[e].cloneNode(a);
                d[e] = f
            }
        }
        return b
    };
    Dl.prototype.hasChildNodes = function() {
        return 0 < El(this).childNodes.length
    };
    var Gl = function(a, b, c) {
            for (var d = null, e = El(b), f; f = c.next();) {
                var h;
                switch (f.type) {
                    case "close":
                        return f.value;
                    case "tag":
                        h = 1;
                        break;
                    case "text":
                    case "cdata":
                        h = 3;
                        break;
                    case "xml_declaration":
                        a.xmlDecl || (a.xmlDecl = "");
                        a.xmlDecl += f.value;
                        continue;
                    case "doctype":
                        a.docTypeDecl = f.value;
                        continue;
                    default:
                        continue
                }
                h = new Dl(h, f.value);
                var l = El(h);
                l.parentNode = b;
                d && (l.previousSibling = d, El(d).nextSibling = h);
                d = h;
                e.childNodes.push(h);
                if ("tag" == f.type) {
                    if (f.attributes)
                        for (l = 0; l < f.attributes.length; l++) {
                            var n = f.attributes[l];
                            h.attributes[n.name] = n.value
                        }
                    h = Gl(a, h, c);
                    if (null === h || h != f.value) return a.status = -9, h
                }
            }
            return null
        },
        Hl = function(a) {
            Dl.call(this, 1, null);
            Jk(this);
            a && this.parseXML(a)
        };
    A(Hl, "XML", Dl);
    Zh(Hl);
    Hl.prototype.status = 0;
    Hl.prototype.createElement = function(a) {
        return new Dl(1, a)
    };
    Hl.prototype.createTextNode = function(a) {
        return new Dl(3, a)
    };
    Hl.prototype.addRequestHeader = function(a, b) {
        Kk(this, a, b)
    };
    Hl.prototype.load = function(a) {
        Mk(a, this)
    };
    Hl.prototype.send = function(a, b, c) {
        if (0 == arguments.length) return !1;
        Nk(a, this.toString(), b, c);
        return !0
    };
    Hl.prototype.sendAndLoad = function(a, b, c) {
        Mk(a, b, this, c)
    };
    Hl.prototype.onData = function(a) {
        var b = k(a);
        b && Lk(this.parseXML, this, a);
        this.loaded = b;
        Lk(this.onLoad, this, b)
    };
    Hl.prototype.onLoad = function() {};
    Hl.prototype.parseXML = function(a) {
        for (var b = El(this).childNodes, c = b.length - 1; 0 <= c; c--) b[c].removeNode();
        for (var d in this.attributes) delete this.attributes[d];
        this.docTypeDecl = this.xmlDecl = void 0;
        a = new he(a, this.ignoreWhite, !0);
        try {
            this.status = 0, null !== Gl(this, this, a) && (this.status = -10)
        } catch (e) {
            this.status = Il(e.type)
        }
    };
    var Il = function(a) {
        switch (a) {
            case "cdata":
                return -2;
            case "xml_declaration":
                return -3;
            case "doctype":
                return -4;
            case "comment":
                return -5;
            case "tag":
            case "close":
                return -6;
            case "attribute":
                return -8;
            default:
                return -1
        }
    };
    B(Hl.prototype, null, 3);
    var Ll = function(a) {
        Object.defineProperty(this, "__swiffy_vm", {
            value: a
        });
        this.String = Jl(String, function(b) {
            return a.Qa(b)
        }, ["fromCharCode"]);
        B(this, "String", 3);
        this.Number = Jl(Number, function(b) {
            return a.zd(b)
        }, ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"]);
        B(this, "Number", 3);
        this.Boolean = Jl(Boolean, function(b) {
            return a.Ok(b)
        });
        B(this, "Boolean", 3);
        this.AsBroadcaster = new ki(a);
        B(this, "AsBroadcaster", 3);
        this.setInterval = function() {
            return Kl(a, Th, arguments)
        };
        B(this, "setInterval",
            3);
        this.setTimeout = function() {
            return Kl(a, Sh, arguments)
        };
        B(this, "setTimeout", 3);
        this.updateAfterEvent = function() {
            a.c.ia.ii()
        };
        B(this, "updateAfterEvent", 3);
        this.escape = function(b) {
            return encodeURIComponent(a.Qa(b)).replace(/[.!*'()]/g, function(a) {
                return "%" + a.charCodeAt(0).toString(16).toUpperCase()
            })
        };
        B(this, "escape", 3);
        this.unescape = function(b) {
            return Zi(a.Qa(b))
        };
        B(this, "unescape", 3);
        Object.prototype.hasOwnProperty("addProperty") || (Function.prototype.toString = function() {
                return "[type Function]"
            },
            Object.prototype.unwatch = function(a) {
                if (1 > arguments.length) return !1;
                var c = this[a];
                delete this[a];
                this[a] = c;
                return !0
            }, Object.prototype.watch = function(a, c, d) {
                if (2 > arguments.length) return !1;
                for (var e = this, f = null, h = this; h; h = Object.getPrototypeOf(h))
                    if (null != Object.getOwnPropertyDescriptor(h, a)) {
                        e = h;
                        f = Object.getOwnPropertyDescriptor(h, a);
                        break
                    }
                if (!f || f.configurable) {
                    var l = e[a];
                    delete e[a];
                    Object.defineProperty(e, a, {
                        get: function() {
                            return l
                        },
                        set: function(e) {
                            return l = c.call(this, a, l, e, d)
                        },
                        configurable: !0
                    })
                }
                return !0
            },
            Object.prototype.addProperty = function(a, c, d) {
                var e = Object.getOwnPropertyDescriptor(this, a);
                if (null == a || "" == a || !m(c) || d && !m(d) || e && !e.configurable) return !1;
                if (!d || e && !e.writable) d = function() {};
                Object.defineProperty(this, a, {
                    get: c,
                    set: d,
                    configurable: !0,
                    enumerable: !(e && !e.enumerable)
                });
                return !0
            }, B(Object.prototype, ["watch", "unwatch", "addProperty"], 3))
    };
    A(Ll, "global");
    var Jl = function(a, b, c) {
            b.__swiffy_override = function(c) {
                return new a(b(c))
            };
            b.__swiffy_wrapped_type = a;
            if (k(c))
                for (var d = 0; d < c.length; d++) b[c[d]] = a[c[d]];
            B(b, null, 3);
            return b
        },
        Ml = function(a, b, c, d) {
            Object.defineProperty(a.prototype, b, {
                get: c,
                set: d || function() {}
            })
        };
    Ll.prototype.ASSetPropFlags = function(a, b, c, d) {
        ia(a) && B(a, b, c, d)
    };
    Ll.prototype.clearInterval = function(a) {
        Vh(a)
    };
    Ll.prototype.clearTimeout = function(a) {
        Vh(a)
    };
    Ll.prototype.parseFloat = parseFloat;
    Ll.prototype.parseInt = function(a, b) {
        !k(b) && Vi(a) && (b = 8);
        return parseInt(a, b)
    };
    Ll.prototype.isFinite = function(a) {
        return isFinite(a)
    };
    Ll.prototype.isNaN = function(a) {
        return isNaN(a)
    };
    var Kl = function(a, b, c) {
        var d = c[0];
        if (m(d) && 2 <= c.length) {
            var e = Array.prototype.slice.call(c, 2);
            c = c[1];
            return b(function() {
                d.apply(qi(null), e);
                a.Ua()
            }, c)
        }
        if (ia(d) && 3 <= c.length) {
            var f = c[1],
                e = Array.prototype.slice.call(c, 3);
            c = c[2];
            return b(function() {
                m(d[f]) && (d[f].apply(qi(d), e), a.Ua())
            }, c)
        }
    };
    Ll.prototype.Array = Array;
    Ll.prototype.AsBroadcaster = ki;
    Ll.prototype.Button = Wk;
    Ll.prototype.flash = {
        display: {
            BitmapData: Fk
        },
        external: {
            ExternalInterface: ti
        },
        filters: {
            BevelFilter: Ee,
            BlurFilter: re,
            ColorMatrixFilter: ue,
            ConvolutionFilter: He,
            DropShadowFilter: Le,
            GlowFilter: ui,
            GradientBevelFilter: Pe,
            GradientGlowFilter: Se
        },
        geom: {
            Matrix: xi,
            Point: Bi,
            Rectangle: Hi
        }
    };
    Ll.prototype.Color = Hk;
    Ll.prototype.Date = Date;
    Ml(Date, "date", Date.prototype.getDate, Date.prototype.setDate);
    Ml(Date, "dateUTC", Date.prototype.getUTCDate, Date.prototype.setUTCDate);
    Ml(Date, "day", Date.prototype.getDay);
    Ml(Date, "dayUTC", Date.prototype.getUTCDay);
    Ml(Date, "fullYear", Date.prototype.getFullYear, Date.prototype.setFullYear);
    Ml(Date, "fullYearUTC", Date.prototype.getUTCFullYear, Date.prototype.setUTCFullYear);
    Ml(Date, "hours", Date.prototype.getHours, Date.prototype.setHours);
    Ml(Date, "hoursUTC", Date.prototype.getUTCHours, Date.prototype.setUTCHours);
    Ml(Date, "milliseconds", Date.prototype.getMilliseconds, Date.prototype.setMilliseconds);
    Ml(Date, "millisecondsUTC", Date.prototype.getUTCMilliseconds, Date.prototype.setUTCMilliseconds);
    Ml(Date, "minutes", Date.prototype.getMinutes, Date.prototype.setMinutes);
    Ml(Date, "minutesUTC", Date.prototype.getUTCMinutes, Date.prototype.setUTCMinutes);
    Ml(Date, "month", Date.prototype.getMonth, Date.prototype.setMonth);
    Ml(Date, "monthUTC", Date.prototype.getUTCMonth, Date.prototype.setUTCMonth);
    Ml(Date, "seconds", Date.prototype.getSeconds, Date.prototype.setSeconds);
    Ml(Date, "secondsUTC", Date.prototype.getUTCSeconds, Date.prototype.setUTCSeconds);
    Ml(Date, "time", Date.prototype.getTime, Date.prototype.setTime);
    Ml(Date, "timezoneOffset", Date.prototype.getTimezoneOffset);
    Ll.prototype.Error = si;
    Ll.prototype.Function = Ik;
    Ll.prototype.LoadVars = Xk;
    Ll.prototype.Math = Math;
    Ll.prototype.MovieClip = G;
    Ll.prototype.MovieClipLoader = Di;
    Ll.prototype.NetConnection = Fi;
    Ll.prototype.NetStream = Gi;
    Ll.prototype.Object = qi;
    Object.defineProperty(qi, "__swiffy_override", {
        value: Ji
    });
    Object.defineProperty(qi, "__swiffy_wrapped_type", {
        value: Object
    });
    Ll.prototype.Sound = Zk;
    Ll.prototype.System = new dl;
    Ll.prototype.TextField = Yk;
    Ll.prototype.TextFormat = el;
    Ll.prototype.XML = Hl;
    Ll.prototype.XMLNode = Dl;
    Ll.prototype.Video = hl;
    Object.defineProperty(Ll.prototype, "Key", {
        get: function() {
            return this.__swiffy_vm.getKey()
        },
        set: function() {}
    });
    Object.defineProperty(Ll.prototype, "Mouse", {
        get: function() {
            return this.__swiffy_vm.Lf
        },
        set: function() {}
    });
    Object.defineProperty(Ll.prototype, "Stage", {
        get: function() {
            return this.__swiffy_vm.c.ia.$
        },
        set: function() {}
    });
    B(Ll.prototype, null, 3);
    A(Array, "Array");
    A(Boolean, "Boolean");
    A(Date, "Date");
    A(Math, "Math");
    A(Number, "Number");
    A(String, "String");
    var Nl = function(a, b) {
        this.object = a;
        this.method = b
    };
    Nl.prototype.Ho = function() {
        for (var a = this.object; a = Object.getPrototypeOf(a);)
            for (var b = Object.getOwnPropertyNames(a), c = 0; c < b.length; c++)
                if (a[b[c]] === this.method) return Object.getPrototypeOf(a);
        return null
    };
    var Ol = function(a, b) {
        this.ya = a;
        this.data = {};
        this.yb = b
    };
    g = Ol.prototype;
    g.get = function(a) {
        var b = this.ya.ea(this.data, a);
        return b in this.data ? this.data[b] : this.yb.get(a)
    };
    g.call = function(a, b) {
        var c = this.ya.ea(this.data, a);
        if (c in this.data)
            if (c = this.data[c], c instanceof Nl) {
                var d = Object.getPrototypeOf(c.method.prototype).constructor;
                if (m(d)) return d.apply(c.object, b)
            } else {
                if (m(c)) return c.apply(this.Wb(), b)
            } else return this.yb.call(a, b)
    };
    g.set = function(a, b) {
        var c = this.ya.ea(this.data, a);
        return c in this.data ? (this.data[c] = b, !0) : this.yb.set(a, b)
    };
    g.Bd = function(a, b) {
        this.data[this.ya.Hc(this.data, a)] = b
    };
    g.ih = function(a) {
        a = this.ya.Hc(this.data, a);
        a in this.data || (this.data[a] = void 0)
    };
    g.$d = function(a) {
        return this.ya.ea(this.data, a) in this.data ? !1 : this.yb.$d(a)
    };
    g.yd = function(a) {
        this.yb.yd(a)
    };
    g.Wb = function() {
        return this.yb.Wb()
    };
    g.Re = function() {
        return this.yb.Re()
    };
    var Pl = function(a, b, c) {
        this.ya = a;
        this.data = c;
        this.yb = b
    };
    g = Pl.prototype;
    g.get = function(a) {
        var b = this.ya.ea(this.data, a);
        return b in this.data ? this.data[b] : this.yb.get(a)
    };
    g.call = function(a, b) {
        var c = this.ya.ea(this.data, a);
        if (c in this.data) {
            if (c = this.data[c], m(c)) return c.apply(this.data, b)
        } else return this.yb.call(a, b)
    };
    g.set = function(a, b) {
        var c = this.ya.ea(this.data, a);
        return c in this.data ? (this.data[c] = b, !0) : this.yb.set(a, b)
    };
    g.Bd = function(a, b) {
        var c = this.ya.ea(this.data, a);
        c in this.data ? this.data[c] = b : this.yb.Bd(a, b)
    };
    g.ih = function(a) {
        this.ya.ea(this.data, a) in this.data || this.yb.ih(a)
    };
    g.$d = function(a) {
        var b = this.ya.ea(this.data, a);
        return b in this.data ? this.ya.vc(this.data, b) : this.yb.$d(a)
    };
    g.yd = function(a) {
        this.yb.yd(a)
    };
    g.Wb = function() {
        return this.yb.Wb()
    };
    g.Re = function() {
        return this.yb.Re()
    };
    var Ql = function(a, b, c) {
        this.ya = a;
        this.Zl = this.data = c;
        this.Bl = b;
        this.Jl = c
    };
    g = Ql.prototype;
    g.get = function(a) {
        var b = this.ya.ea(this.data, a);
        return b in this.data ? this.data[b] : "this" == a.toLowerCase() ? this.Jl : this.Bl.get(a)
    };
    g.call = function(a, b) {
        var c = this.ya.ea(this.data, a),
            d = this.data[c];
        if (c in this.data) {
            if (m(d)) return d.apply(this.data, b)
        } else return this.Bl.call(a, b)
    };
    g.set = function(a, b) {
        var c = this.ya.Hc(this.data, a);
        this.data[c] = b;
        return !0
    };
    g.Bd = function(a, b) {
        var c = this.ya.Hc(this.data, a);
        this.data[c] = b
    };
    g.ih = function(a) {
        a = this.ya.Hc(this.data, a);
        a in this.data || (this.data[a] = void 0)
    };
    g.$d = function(a) {
        var b = this.ya.ea(this.data, a);
        return b in this.data ? this.ya.vc(this.data, b) : this.Bl.$d(a)
    };
    g.yd = function(a) {
        a ? this.data = this.Zl = a : (this.Zl = null, this.data = this.Jl)
    };
    g.Wb = function() {
        return this.Zl
    };
    g.Re = function() {
        return this.Jl
    };
    var Rl = function(a) {
        this.ya = a;
        this.data = new Ll(a);
        this.data._global = this.data;
        B(this.data, "_global", 3)
    };
    g = Rl.prototype;
    g.get = function(a) {
        return this.data[this.ya.ea(this.data, a)]
    };
    g.call = function(a, b) {
        var c = this.data[this.ya.ea(this.data, a)];
        if (m(c)) return c.apply(this.data, b)
    };
    g.set = function() {
        return !1
    };
    g.Bd = function() {};
    g.ih = function() {};
    g.$d = function(a) {
        a = this.ya.ea(this.data, a);
        return this.ya.vc(this.data, a)
    };
    g.yd = function() {
        throw new TypeError("setTarget should not be called on the GlobalContext");
    };
    g.Wb = function() {
        throw new TypeError("getTarget should not be called on the GlobalContext");
    };
    g.Re = function() {
        throw new TypeError("getTargetBase should not be called on the GlobalContext");
    };
    var z = function(a) {
        this.$r(a.Od);
        this.ib = [];
        this.cc = 0;
        this.Nb = this.Fc = 4;
        this.rn = [];
        this.c = a;
        this.Yr = this.on();
        this.If = [];
        this.Vd = [];
        this.Lk = !1;
        this.yk = this.n = null;
        this.ri = new Rl(this, a);
        this.Pd = new gf;
        this.Lf = new Ci;
        this.Vg(this.Lf);
        this.Qf = new vi;
        this.Vg(this.Qf);
        this.Dk();
        this.Zr()
    };
    g = z.prototype;
    g.Pn = !1;
    g.$r = function(a) {
        this.Hc = ml;
        this.Zc = Bl;
        this.ea = ol;
        this.En = ql;
        this.Jo = zl;
        this.Ok = yl;
        this.zd = tl;
        this.Qa = ul;
        5 <= a && (this.Jo = Al, this.zd = sl, this.Qa = vl, 6 <= a && (this.Zc = Cl, this.En = pl, 7 <= a && (this.Hc = jl, this.ea = nl, this.Ok = xl, this.zd = rl, this.Qa = wl)))
    };
    g.Zr = function() {
        var a = this,
            b = this.c.Vc;
        b.SetVariable = function(b, d) {
            var e = a.Qg(String(b), a.c.kb.$);
            if (e.path) {
                var f = a.Hc(e.path, e.Ff);
                e.path[f] = String(d)
            }
        };
        b.GetVariable = function(b) {
            b = a.Qg(String(b), a.c.kb.$);
            if (b.path) {
                var d = a.ea(b.path, b.Ff);
                return d in b.path ? String(b.path[d]) : null
            }
            return null
        }
    };
    g.getKey = function() {
        return this.Qf
    };
    g.Vo = function(a) {
        this.Vd.push(function() {
            this.Al(a)
        })
    };
    g.Ce = function(a) {
        this.Vd.push(a)
    };
    g.Ua = function() {
        if (!this.Lk) {
            for (this.Lk = !0; this.If.length || this.Vd.length;) this.If.length ? this.If.shift().call(this) : this.Vd.shift().call(this);
            this.Lk = !1
        }
    };
    g.xp = function(a, b) {
        try {
            a()
        } catch (c) {
            throw b(c), c;
        }
    };
    g.on = function() {
        return Qh()
    };
    g.Vg = function(a) {
        this.ri.get("AsBroadcaster").initialize(a)
    };
    g.reset = function(a) {
        this.ib = [];
        this.cc = 0;
        this.Nb = this.Fc = 4;
        this.n = new Ql(this, this.ri, a.$)
    };
    g.Al = function(a) {
        a.nh.Sd() || (this.reset(a.nh), a.Vu())
    };
    var Sl = function(a) {
            a = a.replace(/\.\.|\/:?|:/g, function(a) {
                return ".." == a ? "_parent" : "."
            });
            "." == a[0] && (a = "_root" + a);
            "." == a[a.length - 1] && (a = a.substring(0, a.length - 1));
            return a
        },
        Tl = function(a) {
            for (var b = [], c = 0, d = a.length, e = 0; e < d; e++) switch (a[e]) {
                case ".":
                    var f = e + 1;
                    if (f != d && "." == a[f]) {
                        e > c && b.push(a.substring(c, e));
                        b.push("_parent");
                        c = e + 2;
                        e++;
                        break
                    }
                case ":":
                    e > c && b.push(a.substring(c, e));
                    c = e + 1;
                    break;
                case "/":
                    0 == e ? b.push("_root") : e > c && b.push(a.substring(c, e)), c = e + 1
            }
            e > c ? b.push(0 == c && e == d ? a : a.substring(c, e)) :
                0 == b.length && b.push("");
            return b
        };
    z.prototype.Qg = function(a, b) {
        k(b) || (b = this.Wb());
        var c = 0 < a.indexOf(":") ? a.split(":") : a.split(".");
        if (1 < c.length) {
            var d = c[c.length - 1];
            return {
                path: this.Kg(c.slice(0, c.length - 1).join("."), b),
                Ff: d
            }
        }
        return {
            path: b,
            Ff: a
        }
    };
    z.prototype.mr = function(a) {
        return this.ri.get(a)
    };
    var kl = {
            "boolean": {},
            number: {},
            string: {},
            object: void 0,
            "function": void 0,
            undefined: {}
        },
        Ul = function(a) {
            var b = Object.getOwnPropertyNames(a.constructor.prototype);
            a = kl[typeof a];
            for (var c = 0; c < b.length; ++c) {
                var d = b[c],
                    e = d.toLowerCase();
                d != e && (a[e] = d)
            }
        };
    Ul(!1);
    Ul(0);
    Ul("");
    var ll = function(a) {
        if (!a) return {
            constructor: "constructor"
        };
        var b = a.__swiffy_nm;
        if (!b || b.__swiffy_nm != a) {
            for (var b = Object.create(ll(Object.getPrototypeOf(a))), c = Object.getOwnPropertyNames(a), d = 0; d < c.length; ++d) {
                var e = c[d],
                    f = e.toLowerCase();
                e != f && (b[f] = e)
            }
            Object.defineProperty(b, "__swiffy_nm", {
                value: a,
                writable: !0
            });
            Object.defineProperty(a, "__swiffy_nm", {
                value: b,
                writable: !0
            })
        }
        return b
    };
    g = z.prototype;
    g.On = function(a) {
        if (ia(a)) {
            var b = a[this.ea(a, "x")];
            a = a[this.ea(a, "y")];
            if (ha(b) && ha(a)) return new Jc(b, a)
        }
        return null
    };
    g.Wb = function() {
        return this.n.Wb()
    };
    g.ke = function() {
        var a = this.n.Wb();
        return a ? a.__swiffy_d : null
    };
    g.push = function(a) {
        this.ib[this.Nb++] = a
    };
    g.pop = function() {
        if (this.Nb > this.Fc) {
            var a = this.ib[--this.Nb];
            this.ib[this.Nb] = void 0;
            return a
        }
    };
    g.ka = function() {
        return this.zd(this.pop())
    };
    g.Pa = function() {
        return this.Qa(this.pop())
    };
    g.ee = function() {
        return this.Ok(this.pop())
    };
    g.sp = function() {
        return this.Vf(this.pop())
    };
    g.Zi = function() {
        for (var a = Number(this.pop()), a = Math.min(a, this.Nb - this.Fc), b = [], c = 0; c < a; ++c) b[c] = this.pop();
        return b
    };
    g.Vf = function(a) {
        return a instanceof F ? a : this.uo(String(a))
    };
    g.Kg = function(a, b) {
        if (!b || !a) return b;
        for (var c = Tl(a), d = b, e = 0; e < c.length && d; e++) d = d[this.ea(d, c[e])];
        return d
    };
    g.uo = function(a) {
        return this.Kg(a, this.Wb())
    };
    g.Wd = function() {
        this.Lf.Wd()
    };
    g.ag = function() {
        this.Zf(new Kc(4));
        this.Ua();
        this.Lf.ag()
    };
    g.dg = function() {
        this.Lf.dg()
    };
    g.Xo = function() {
        return this.Lf.__swiffy_mv
    };
    g.Vk = function() {
        this.c.ia.$.broadcastMessage("onResize")
    };
    g.mj = function(a) {
        this.Qf.mj(a)
    };
    g.vp = function() {
        this.Qf.broadcastMessage("onKeyUp")
    };
    g.lj = function(a) {
        this.Qf.lj(a)
    };
    g.tp = function() {
        this.Qf.broadcastMessage("onKeyDown")
    };
    g.Bn = function() {};
    g.Cn = function() {};
    g.Li = function() {};
    g.ik = function() {};
    g.Rn = function(a, b, c) {
        b = this.ea(a, b);
        var d = !(b in a);
        if (!d) {
            var e = a.__swiffy_child_ref[b];
            e && (d = a[b], d = d === e && d.__swiffy_d.depth > c.__swiffy_d.depth)
        }
        d && (b = this.Hc(a, b), a[b] = c, a.__swiffy_child_ref[b] = c)
    };
    g.Sn = function(a, b, c) {
        b = this.ea(a, b);
        c === a[b] && (delete a[b], delete a.__swiffy_child_ref[b])
    };
    g.Qk = function(a, b, c) {
        this.If.push(function() {
            this.uv(a, b, c)
        })
    };
    g.uv = function(a, b, c) {
        this.rm(a, b, function(a, e, f, h) {
            var l = c;
            k(h.gh[f]) || (h.gh[f] = []);
            h.gh[f].push(b);
            f in e && (b.Ec(String(e[f])), l = e[f]);
            Object.defineProperty(e, f, a.Bu(l, h.gh[f]))
        })
    };
    g.Uk = function(a, b) {
        this.If.push(function() {
            this.vv(a, b)
        })
    };
    g.vv = function(a, b) {
        this.rm(a, b, function(a, d, e, f) {
            (a = f.gh[e]) && Ia(a, b)
        })
    };
    g.rs = function(a, b, c) {
        this.rm(a, b, function(a, b, f) {
            b[f] = c
        })
    };
    g.rm = function(a, b, c) {
        if (b = this.Pl(b, fd)) a = Sl(a), b = this.Qg(a, b.$), (a = b.path) && a.__swiffy_d && (b = this.Hc(a, b.Ff), c(this, a, b, a.__swiffy_d))
    };
    g.Pl = function(a, b) {
        for (var c = a; c && !(c instanceof b);) c = c.getParent();
        return c
    };
    g.bp = function(a, b) {
        var c = -16384 + b,
            d = "_level" + b;
        d in G.prototype || Object.defineProperty(G.prototype, d, {
            get: function() {
                var a = this.__swiffy_d;
                if (a && (a = a.c.ia.Cc(c))) return a.$
            },
            set: function(a) {
                Object.defineProperty(this, d, {
                    value: a,
                    configurable: !0,
                    writable: !0,
                    enumerable: !0
                })
            }
        })
    };
    g.fireEvent = function(a, b, c, d) {
        var e = Rk[c.type];
        c = !1;
        if (b)
            for (var f = 0; f < b.actions.length; ++f) {
                var h = b.actions[f];
                if (!h.Mn || h.Mn(this)) h.Rk && (d ? this.Al(h.Rk) : this.Vo(h.Rk)), h.stopPropagation && (c = !0)
            }
        if (e) {
            var l = this;
            b = function() {
                var b = l.ea(a, e);
                if (m(a[b])) a[b]()
            };
            d ? b() : this.Ce(b)
        }
        return c
    };
    g.Dk = function() {
        var a = this;
        sj.prototype.Ja = function() {
            return Object.create(F.prototype)
        };
        Bj.prototype.Ja = function() {
            var b = Object.create(Yk.prototype);
            a.Vg(b);
            b.addListener(b);
            return b
        };
        Vj.prototype.Ja = function() {
            var b = Object.create(bl.prototype);
            a.Vg(b);
            return b
        };
        Aj.prototype.Ja = function() {
            return Object.create(Vk.prototype)
        };
        fd.prototype.Ja = function() {
            var a = void 0,
                c = this.definition.wi;
            c && (a = Ki[c]);
            return Object.create((a ? a : G).prototype)
        };
        rh.prototype.Ja = function() {
            return Object.create(Wk.prototype)
        };
        qj.prototype.Ja = function() {
            return {}
        };
        Bh.prototype.Ja = function() {
            return Object.create(hl.prototype)
        }
    };
    g.yo = function(a, b) {
        var c = a.$;
        b ? (this.If.push(function() {
            a.fireEvent(new Kc(19), !0);
            c.constructor()
        }), a.fireEvent(new Kc(7)), a.ah()) : (a.ah(), a.fireEvent(new Kc(19), !0), c.constructor(), a.fireEvent(new Kc(7)))
    };
    g.fo = function() {};
    g.Bu = function(a, b) {
        var c = a,
            d = this;
        return {
            get: function() {
                return c
            },
            set: function(a) {
                c = a;
                a = d.Qa(a);
                for (var f = 0; f < b.length; f++) b[f].Ec(a)
            },
            configurable: !0
        }
    };
    g.vc = function(a, b) {
        if (null != a) {
            var c = b in a,
                d = delete a[b];
            delete a[b];
            this.Nw(a, b);
            return c && d
        }
        return !1
    };
    g.Nw = function(a, b) {
        if (a instanceof G) {
            var c = a.__swiffy_d;
            c && (c = c.la.gq(b)) && We(a, c, b)
        }
    };
    g.Yp = function(a, b) {
        this.c.kb.$[a] = b
    };
    g.uf = function() {
        return this.Pd
    };
    g.Ij = function(a) {
        a = this.bi(a, 4);
        a = "return " + Vl(Wl, a);
        return Function("vm", a)(this)
    };
    g.Sf = function(a, b, c, d, e) {
        di(120);
        var f = Ze;
        Ze = this;
        try {
            var h = a(b, c, d, e);
            --ci;
            return h
        } catch (l) {
            ei(l)
        } finally {
            Ze = f
        }
    };
    g.bi = function(a, b) {
        return a ? "function(){" + this.Zq(a, b) + "}" : "null"
    };
    g.Zq = function(a, b) {
        for (var c = 0, d = "for(var j=0;;){" + Vl(Xl) + "switch(j){", e = this.lw(a), f = {
                labels: e,
                registerCount: b
            }, d = d + "case 0:", h = 0; h < a.length; h++) {
            var l = e[h];
            l && (d += "case " + l + ":");
            c++;
            var l = a[h],
                n = I[l.type];
            n && (d = n.compile ? d + n.compile.call(n, l, this, f) : d + Vl(n))
        }
        return d + "default:return;}}"
    };
    g.lw = function(a) {
        for (var b = [-1], c = 0; c < a.length;) {
            var d = a[c++];
            switch (d.type) {
                case 157:
                case 153:
                    b[d.target] = -1
            }
        }
        for (d = c = 0; c < a.length; ++c) b[c] && (b[c] = d++);
        return b
    };
    var Yl = function(a, b) {
            for (var c = "vm." + a.action + "(", d = 1; d < arguments.length; ++d) 1 < d && (c += ","), c += arguments[d];
            return c + ")"
        },
        Vl = function(a, b) {
            return Yl.apply(null, arguments) + ";"
        },
        Zl = function(a) {
            return k(a) && 0 <= a ? "j=" + a + ";continue;" : "return;"
        };
    g = z.prototype;
    g.Ei = function(a) {
        return !(a instanceof fd && a.isEnabled())
    };
    g.kp = function(a, b) {
        a && a.Dq(b);
        b && b.Eq(a)
    };
    g.Zf = function(a) {
        for (var b = this.c.xf, c = b.length - 1; 0 <= c; c--) b[c].Sd() || b[c].fireEvent(a)
    };
    g.In = function(a, b) {
        b.La() && b.Pb(a.Ng())
    };
    g.Rq = function(a, b) {
        a = String(a);
        b = String(b);
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.Qq = function(a, b) {
        a = String(a).toUpperCase();
        b = String(b).toUpperCase();
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.Sq = function(a, b) {
        ha(a) && ha(b) || (a = String(a), b = String(b));
        return a < b ? -1 : a > b ? 1 : 0
    };
    var $l = "_x _y _xscale _yscale _currentframe _totalframes _alpha _visible _width _height _rotation _target _framesloaded _name _droptarget _url _highquality _focusrect _soundbuftime _quality _xmouse _ymouse".split(" "),
        il = function() {
            var a = {};
            $l.forEach(function(b) {
                a[b] = !0
            });
            return a
        }(),
        I = {
            4: function() {
                this.Yh()
            }
        };
    z.prototype.Yh = function() {
        var a = this.ke();
        a instanceof fd && a.Yh()
    };
    I[5] = function() {
        this.Kw()
    };
    z.prototype.Kw = function() {
        var a = this.ke();
        a instanceof fd && a.Bm()
    };
    I[6] = function() {
        this.play()
    };
    z.prototype.play = function() {
        var a = this.ke();
        a instanceof fd && a.play()
    };
    I[7] = function() {
        this.stop()
    };
    z.prototype.stop = function() {
        var a = this.ke();
        a instanceof fd && a.stop()
    };
    I[9] = function() {
        this.ex()
    };
    z.prototype.ex = function() {
        var a = this.ke();
        a instanceof fd && a.Fe().To()
    };
    I[10] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b + a)
    };
    I[11] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b - a)
    };
    I[12] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b * a)
    };
    I[13] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b / a)
    };
    I[14] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(this.Jo(b, a))
    };
    I[15] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b < a)
    };
    I[16] = function() {
        var a = this.ee(),
            b = this.ee();
        this.push(b && a)
    };
    I[17] = function() {
        var a = this.ee(),
            b = this.ee();
        this.push(b || a)
    };
    I[18] = function() {
        var a = this.ee();
        this.push(!a)
    };
    I[19] = function() {
        var a = this.Pa(),
            b = this.Pa();
        this.push(b == a)
    };
    I[20] = function() {
        var a = this.Pa();
        this.push(a.length)
    };
    I[21] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.Pa();
        this.push(this.Au(c, b, a))
    };
    z.prototype.Au = function(a, b, c) {
        a = this.Qa(a);
        c = Number(c);
        b = Math.max(0, Number(b) - 1);
        return a.substr(b, c)
    };
    var am = function() {
        return this.pop()
    };
    I[23] = am;
    I[24] = function() {
        var a = this.ka(),
            a = 0 > a ? Math.ceil(a) : Math.floor(a);
        this.push(a)
    };
    I[28] = function() {
        var a = this.Pa();
        this.push(this.Zd(a))
    };
    z.prototype.Zd = function(a) {
        a = Tl(a);
        var b = this.n.get(a[0]);
        if (1 < a.length) {
            var c;
            for (c = 1; k(b) && c < a.length - 1; ++c) b = b[this.ea(b, a[c])];
            if (k(b)) b = b[this.ea(b, a[c])];
            else return
        }
        return b
    };
    I[29] = function() {
        var a = this.pop(),
            b = this.Pa();
        this.Fi(b, a)
    };
    z.prototype.Fi = function(a, b) {
        var c = Tl(a);
        if (1 == c.length) this.n.set(c[0], b);
        else {
            var d = this.n.get(c[0]),
                e;
            for (e = 1; k(d) && e < c.length - 1; ++e) d = d[this.ea(d, c[e])];
            k(d) && (c = this.Hc(d, c[e]), d[c] = b)
        }
    };
    I[33] = function() {
        var a = this.Pa(),
            b = this.Pa();
        this.push(b + a)
    };
    I[34] = function() {
        var a = this.ka(),
            b = this.pop();
        this.push(this.Fd(b, a))
    };
    z.prototype.Fd = function(a, b) {
        var c = this.Vf(a),
            d = $l[b];
        if (c) return c[d]
    };
    I[35] = function() {
        var a = this.pop(),
            b = this.ka(),
            c = this.pop();
        this.setProperty(c, b, a)
    };
    z.prototype.setProperty = function(a, b, c) {
        b = $l[b];
        (a = this.Vf(a)) && b && (a[b] = c)
    };
    I[36] = function() {
        var a = this.ka(),
            b = this.Pa(),
            c = this.sp(),
            d = this.ke();
        c && d && c.__swiffy_d && c.__swiffy_d.duplicate(d, b, a + -16384)
    };
    I[37] = function() {
        var a = this.sp();
        a instanceof G && a.removeMovieClip()
    };
    I[38] = function() {
        this.trace(this.pop())
    };
    z.prototype.trace = function(a) {
        window.console && (a = k(a) ? this.Qa(a) : "undefined", $h(a))
    };
    I[51] = function() {
        var a = this.ka();
        this.push(String.fromCharCode(a))
    };
    I[50] = function() {
        var a = this.Pa();
        this.push(a.charCodeAt(0))
    };
    I[52] = function() {
        this.push(this.getTime())
    };
    z.prototype.getTime = function() {
        return this.on() - this.Yr
    };
    I[48] = function() {
        var a = this.ka();
        this.push(this.random(a))
    };
    z.prototype.random = function(a) {
        var b;
        do b = Math.floor(Math.random() * a); while (b == a && 0 < a);
        return b
    };
    I[60] = function() {
        var a = this.pop(),
            b = this.Pa();
        b && this.n.Bd(b, a)
    };
    I[65] = function() {
        var a = this.Pa();
        a && this.n.ih(a)
    };
    I[59] = function() {
        var a = this.hw(this.pop());
        this.push(a)
    };
    z.prototype.hw = function(a) {
        a = this.Qa(a);
        a = Tl(a);
        if (1 == a.length) return this.n.$d(a[0]);
        var b = this.n.get(a[0]),
            c;
        for (c = 1; k(b) && c < a.length - 1; ++c) b = b[this.ea(b, a[c])];
        return this.vc(b, this.ea(b, a[c]))
    };
    I[62] = function() {};
    I[62].mb = 2;
    I[62].compile = function() {
        return "return " + Vl(am)
    };
    I[63] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b % a)
    };
    I[71] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.add(b, a))
    };
    z.prototype.add = function(a, b) {
        return fa(a) || fa(b) ? this.Qa(a) + this.Qa(b) : this.zd(a) + this.zd(b)
    };
    I[72] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.sr(b, a))
    };
    z.prototype.sr = function(a, b) {
        var c = typeof a,
            d = typeof b;
        if ("number" !== c || "number" !== d) {
            if ("object" === c && null !== a && (a = a.valueOf(), c = typeof a, "object" === c) || "object" === d && null !== b && (b = b.valueOf(), d = typeof b, "object" === d)) return !1;
            if ("string" === c && "string" === d) return a < b;
            a = this.zd(a);
            b = this.zd(b)
        }
        return a !== a || b !== b ? void 0 : a < b
    };
    I[103] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.sr(a, b))
    };
    I[73] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.Zc(b, a))
    };
    z.prototype.jr = function(a, b, c, d) {
        "object" === b && null !== a && (a = a.valueOf(), b = typeof a);
        "object" === d && null !== c && (c = c.valueOf(), d = typeof c);
        if ("object" === b || "object" === d) return void 0 === a || null === a ? void 0 === c || null === c : a === c;
        if (a != c) return !1;
        if ("string" === b) {
            if (("boolean" === d || "number" === d) && "" == a.trim()) return !1
        } else if ("string" === d && ("boolean" === b || "number" === b) && "" == c.trim()) return !1;
        return !0
    };
    I[102] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(b === a)
    };
    I[41] = function() {
        var a = this.Pa(),
            b = this.Pa();
        this.push(b < a)
    };
    I[42] = function() {
        throw new ai(this.pop());
    };
    I[42].mb = 2;
    I[104] = function() {
        var a = this.Pa(),
            b = this.Pa();
        this.push(b > a)
    };
    I[105] = function() {
        var a = this.pop(),
            b = this.pop();
        m(a) && m(b) && ji(b, a)
    };
    I[74] = function() {
        var a = this.ka();
        this.push(a)
    };
    I[75] = function() {
        var a = this.Pa();
        this.push(a)
    };
    I[76] = function() {
        var a = this.pop();
        this.push(a);
        this.push(a)
    };
    I[77] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(a);
        this.push(b)
    };
    I[78] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.qw(b, a))
    };
    z.prototype.qw = function(a, b) {
        if (null != a)
            if (a instanceof Nl && (a = a.Ho()), "number" === typeof b) {
                if ("string" !== typeof a) return a[b]
            } else return a[this.ea(a, this.Qa(b))]
    };
    I[79] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.pop();
        this.Uw(c, b, a)
    };
    z.prototype.Uw = function(a, b, c) {
        if (null != a)
            if ("number" === typeof b) a[b] = c;
            else {
                var d = this.Hc(a, this.Qa(b));
                a instanceof Array && "length" == d && (c = ha(c) ? c : 0);
                a[d] = c;
                m(a) && "prototype" == b && (a.oa = c.constructor.prototype, c.constructor = a)
            }
    };
    I[80] = function() {
        var a = this.ka();
        this.push(++a)
    };
    I[81] = function() {
        var a = this.ka();
        this.push(--a)
    };
    I[96] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(a & b)
    };
    I[97] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(a | b)
    };
    I[98] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b ^ a)
    };
    I[99] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b << a)
    };
    I[100] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b >> a)
    };
    I[101] = function() {
        var a = this.ka(),
            b = this.ka();
        this.push(b >>> a)
    };
    I[58] = function() {
        var a = this.Pa(),
            b = this.pop(),
            a = this.vc(b, this.ea(b, a));
        this.push(a)
    };
    I[129] = function(a) {
        this.ww(a)
    };
    I[129].compile = function(a) {
        return Vl(this, a.frame)
    };
    z.prototype.ww = function(a) {
        var b = this.ke();
        b instanceof fd && b.He(a, !1)
    };
    I[140] = function(a) {
        this.xw(a)
    };
    I[140].compile = function(a) {
        return Vl(this, Ba(a.label))
    };
    z.prototype.xw = function(a) {
        var b = this.ke();
        b instanceof fd && (a = b.Nf(a), void 0 != a && b.He(a, !1))
    };
    I[136] = function() {};
    I[136].compile = function(a, b) {
        b.rn = a.constants;
        return Vl(this)
    };
    I[32] = function() {
        this.yd(this.pop())
    };
    z.prototype.yd = function(a) {
        a instanceof F || (a = String(a), a = this.Kg(a, this.n.Re()), a instanceof F || (a = void 0));
        this.n.yd(a)
    };
    I[69] = function() {
        var a = this.pop(),
            b = void 0;
        a instanceof F && (b = a.__swiffy_d.dk());
        this.push(b)
    };
    I[305] = function(a) {
        this.push(a)
    };
    I[305].compile = function(a) {
        a = a.value;
        fa(a) && (a = Ba(a));
        return Vl(this, a)
    };
    I[306] = function() {
        this.push(void 0)
    };
    I[307] = function() {
        this.push(Number.POSITIVE_INFINITY)
    };
    I[308] = function() {
        this.push(Number.NEGATIVE_INFINITY)
    };
    I[309] = function() {
        this.push(Number.NaN)
    };
    I[304] = function(a) {
        this.push(a)
    };
    I[304].compile = function(a, b) {
        var c = b.rn[a.index];
        k(c) && (c = Ba(c));
        return Vl(this, c)
    };
    I[303] = function(a) {
        this.push(this.ib[a + this.cc])
    };
    I[303].compile = function(a, b, c) {
        a = a.index;
        return a < c.registerCount ? Vl(this, a) : Vl(I[306])
    };
    I[135] = function(a) {
        this.ib[a + this.cc] = this.ib[this.Nb - 1]
    };
    I[135].compile = function(a, b, c) {
        a = a.index;
        return a < c.registerCount ? Vl(this, a) : ""
    };
    I[154] = function(a, b, c) {
        var d = this.Pa(),
            e = this.Pa();
        a = new Ij(this, this.Wb(), e, d, a, b, c);
        this.c.Yg(a)
    };
    I[154].compile = function(a) {
        return Vl(this, a.method, a.target, a.variables)
    };
    I[148] = function(a) {
        var b = this.pop();
        if (b instanceof Object) {
            var c = this.n;
            this.n = new Pl(this, c, b);
            try {
                this.Sf(a)
            } finally {
                this.n = c
            }
        }
    };
    I[148].compile = function(a, b, c) {
        return Vl(this, b.bi(a.body, c.registerCount))
    };
    I[155] = function(a) {
        this.push(this.hr(4, a))
    };
    I[155].compile = function(a, b) {
        var c = b.$q(a.args, [], 0, a.body, 4);
        return Vl(this, c)
    };
    I[142] = function(a, b) {
        this.push(this.hr(a, b))
    };
    I[142].compile = function(a, b) {
        var c = b.$q(a.args, a.preloads, a.suppress, a.body, a.registerCount);
        return Vl(this, a.registerCount, c)
    };
    z.prototype.$q = function(a, b, c, d, e) {
        var f = "function(self,fn,caller,args){";
        c & 4 || (f += Vl(bm, '"this"', "self"));
        c & 1 || (f += Vl(cm, "self", "fn"));
        c & 2 || (f += "args=Array.prototype.slice.call(args);args.callee=fn;", f += "args.caller=caller;", f += Vl(bm, '"arguments"', "args"));
        for (c = 0; c < b.length && c + 1 < e; ++c) var h = Yl(dm, Ba(b[c])),
            f = f + Vl(em, c + 1, h);
        for (c = 0; c < a.length; ++c) b = a[c], h = "args[" + c + "]", f = fa(b) ? f + Vl(bm, Ba(b), h) : f + Vl(em, b, h);
        return f + this.Zq(d, e) + "}"
    };
    z.prototype.hr = function(a, b) {
        var c = this,
            d = this.n,
            e = function() {
                var f = c.n,
                    h = c.n.Wb(),
                    l = c.yk;
                c.yk = e;
                c.n = new Ol(c, 5 < c.c.Od ? d : new Ql(c, c.ri, this), e);
                var n = c.cc,
                    r = c.Fc;
                c.cc = c.Nb;
                c.Nb += a;
                c.Fc = c.Nb;
                try {
                    return c.Sf(b, this, e, l, arguments)
                } finally {
                    for (var t = c.cc; t < c.Nb; ++t) c.ib[t] = void 0;
                    c.Nb = c.cc;
                    c.cc = n;
                    c.Fc = r;
                    c.yk = l;
                    c.n = f;
                    c.n.yd(h)
                }
            };
        ji(e, qi);
        return e
    };
    I[143] = function(a, b, c, d, e) {
        try {
            this.Sf(a)
        } catch (f) {
            if (f instanceof ai) {
                var h = f.value;
                if (null != b) {
                    var l;
                    k(e) ? (l = this.n.get(e), this.n.Bd(e, h)) : (d += this.cc, d >= this.cc && d < this.Fc && (this.ib[d] = h));
                    try {
                        this.Sf(b)
                    } finally {
                        k(e) && (k(l) ? this.n.Bd(e, l) : this.n.$d(e))
                    }
                } else throw f;
            } else throw c = null, f;
        } finally {
            null != c && this.Sf(c)
        }
    };
    I[143].compile = function(a, b, c) {
        var d = a.variable;
        k(d) && (d = Ba(d));
        return Vl(this, b.bi(a.tryBlock, c.registerCount), b.bi(a.catchBlock, c.registerCount), b.bi(a.finallyBlock, c.registerCount), a.register, d)
    };
    I[61] = function() {
        var a = this.Pa(),
            b = this.Zi();
        this.push(this.qu(a, b))
    };
    I[61].mb = 1;
    z.prototype.qu = function(a, b) {
        var c = Tl(a);
        if (1 >= c.length) return this.n.call(c[0], b);
        for (var d = this.n.get(c[0]), e = 1; e < c.length; ++e) {
            if (null == d) return;
            var f = d,
                d = f[this.ea(f, c[e])]
        }
        if (m(d)) return d.apply(f, b)
    };
    I[82] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.Zi();
        this.push(this.yv(a, b, c))
    };
    I[82].mb = 1;
    z.prototype.yv = function(a, b, c) {
        if (null != b)
            if (null != a && "" !== a) {
                var d = b;
                if (d instanceof Nl) {
                    b = d.Ho();
                    if (!b) return;
                    d = d.object
                }
                b = b[this.ea(b, String(a))];
                m(b) && "__swiffy_override" in b && (b = b.__swiffy_override);
                if (m(b)) return b.apply(qi(d), c)
            } else if (b instanceof Nl) {
            if (d = Object.getPrototypeOf(b.method.prototype).constructor, m(d)) return d.apply(qi(b.object), c)
        } else if ((d = this.n.Wb()) || (d = this.n.Re()), m(b) && "__swiffy_override" in b && (b = b.__swiffy_override), m(b)) return b.apply(qi(d), c)
    };
    I[64] = function() {
        var a = this.Pa(),
            a = this.n.get(a),
            b = this.Zi();
        m(a) || (a = qi);
        var c;
        m(a) && "__swiffy_override" in a ? c = a.__swiffy_override.apply(qi(null), b) : (c = Object.create(a.prototype), c.__swiffy_nvr && Object.defineProperty(c, "__swiffy_vm", {
            value: this
        }), a.apply(qi(c), b));
        this.push(c)
    };
    I[83] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.Zi(),
            d = void 0;
        null != b && (d = null != a && "" !== a ? b[this.ea(b, String(a))] : b);
        m(d) || (d = qi);
        m(d) && "__swiffy_override" in d ? a = d.__swiffy_override.apply(qi(null), c) : (a = Object.create(d.prototype), a.__swiffy_nvr && Object.defineProperty(a, "__swiffy_vm", {
            value: this
        }), d.apply(qi(a), c));
        this.push(a)
    };
    I[67] = function() {
        for (var a = Ji(), b = Number(this.pop()), c = 0; c < b; c++) {
            var d = this.pop(),
                e = this.Pa();
            a[e] = d
        }
        this.push(a)
    };
    I[66] = function() {
        for (var a = [], b = Number(this.pop()), c = 0; c < b; c++) {
            var d = this.pop();
            a[c] = d
        }
        this.push(a)
    };
    I[68] = function() {
        var a = this.pop();
        this.push(a instanceof G ? "movieclip" : null == a || void 0 == a ? String(a) : typeof a)
    };
    I[85] = function() {
        var a = this.pop();
        this.push(void 0);
        if ("string" !== typeof a)
            for (var b in a) Wi(b) || this.push(b)
    };
    I[153] = function() {};
    I[153].mb = 2;
    I[153].compile = function(a, b, c) {
        return Zl(c.labels[a.target])
    };
    I[157] = function() {
        return this.ee()
    };
    I[157].mb = 1;
    I[157].compile = function(a, b, c) {
        return "if(" + Yl(this) + "){" + Zl(c.labels[a.target]) + "}"
    };
    I[158] = function() {
        var a = this.Pa(),
            b = this.Qg(a);
        if (b.path && b.path.__swiffy_d && (a = b.path.__swiffy_d) && (b = a.Nf(b.Ff), void 0 != b && (b = a.Is(b)))) {
            for (var c = this.n, d = this.cc, e = this.Fc, f = this.Nb, h = this.ib, l = 0; l < b.length; l++) b[l].ml(a);
            this.ib = h;
            this.n = c;
            this.cc = d;
            this.Fc = e;
            this.Nb = f
        }
    };
    I[158].mb = 1;
    I[159] = function(a, b) {
        var c = this.Pa(),
            d = this.Qg(c);
        d.path && d.path.__swiffy_d && (c = d.path.__swiffy_d) && (d = c.Nf(d.Ff), void 0 != d && c.He(d + a, b))
    };
    I[159].compile = function(a) {
        return Vl(this, a.frameBias, a.play)
    };
    I[44] = function() {
        var a = this.pop(),
            b = Number(this.pop()),
            a = (a = a ? a.prototype : null) ? a : {},
            c;
        a.hasOwnProperty("__swiffy_if") ? c = a.__swiffy_if : (c = new nc, a.__swiffy_if && c.Ch(a.__swiffy_if), Object.defineProperty(a, "__swiffy_if", {
            value: c
        }));
        for (var d = 0; d < b; ++d) {
            var e = this.pop();
            if (a = e ? e.prototype : null) c.add(e), a.__swiffy_if && c.Ch(a.__swiffy_if)
        }
    };
    var fm = function(a, b) {
        if (m(b)) {
            "__swiffy_wrapped_type" in b && (b = b.__swiffy_wrapped_type);
            if (a instanceof b) return a;
            if (a instanceof Object) {
                var c = a.__swiffy_if;
                if (c && c.contains(b)) return a
            }
        }
        return null
    };
    I[43] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(fm(a, b))
    };
    I[84] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(!!fm(b, a))
    };
    I[39] = function() {
        var a = this.pop(),
            b = this.ee(),
            c = this.ee(),
            d = c ? this.ka() : void 0,
            e = c ? this.ka() : void 0,
            f = c ? this.ka() : void 0,
            c = c ? this.ka() : void 0,
            a = a ? a.__swiffy_d : null;
        a instanceof fd && this.c.vo(a, b, c, f, e, d)
    };
    I[40] = function() {
        this.c.Ji()
    };
    I[1E3] = function() {};
    var em = function(a, b) {
        this.ib[a + this.cc] = b
    };
    I[1001] = em;
    var bm = function(a, b) {
        this.n.Bd(a, b)
    };
    I[1002] = bm;
    var cm = function(a, b) {
        this.n.Bd("super", new Nl(a, b))
    };
    I[1003] = cm;
    var dm = function(a) {
        return this.n.get(a)
    };
    I[1004] = dm;
    var Wl = function(a) {
        var b = this;
        return function() {
            b.Sf(a)
        }
    };
    I[1005] = Wl;
    var Xl = function() {};
    I[1006] = Xl;
    Oa({
        $z: 4,
        gA: 5,
        dA: 6,
        gB: 7,
        hB: 9,
        Hv: 10,
        Sv: 11,
        Pv: 12,
        Kv: 13,
        Lv: 14,
        LESS: 15,
        lx: 16,
        cA: 17,
        Qv: 18,
        mB: 19,
        pB: 20,
        nB: 21,
        Rv: 23,
        xB: 24,
        Ny: 28,
        ZA: 29,
        YA: 32,
        lB: 33,
        Ky: 34,
        XA: 35,
        Jx: 36,
        HA: 37,
        AB: 38,
        fB: 39,
        py: 40,
        qB: 41,
        wg: 42,
        Gx: 43,
        hz: 44,
        CA: 48,
        Hx: 50,
        mx: 51,
        Ly: 52,
        fy: 58,
        hy: 59,
        dy: 60,
        Ex: 61,
        IA: 62,
        Ov: 63,
        Xz: 64,
        ey: 65,
        nz: 66,
        pz: 67,
        CB: 68,
        wB: 69,
        jx: 71,
        Dz: 72,
        sy: 73,
        yB: 74,
        zB: 75,
        vA: 76,
        eB: 77,
        Jy: 78,
        WA: 79,
        Mv: 80,
        Jv: 81,
        Fx: 82,
        Wz: 83,
        sz: 84,
        ry: 85,
        tx: 96,
        vx: 97,
        yx: 98,
        ux: 99,
        wx: 100,
        xx: 101,
        kB: 102,
        GREATER: 103,
        oB: 104,
        vy: 105,
        Oy: 129,
        iB: 135,
        Nx: 136,
        Qy: 140,
        cy: 142,
        Ol: 143,
        FB: 148,
        Nv: 153,
        My: 154,
        by: 155,
        Ty: 157,
        gf: 158,
        Py: 159,
        zA: 303,
        uA: 304,
        BA: 305,
        AA: 306,
        yA: 307,
        xA: 308,
        wA: 309,
        Ux: 1E3,
        qz: 1001,
        oz: 1002,
        rz: 1003,
        Iy: 1004,
        zx: 1005,
        Ix: 1006
    }, function(a, b) {
        var c = I[a];
        c.action = b;
        z.prototype[b] = c
    });
    var gm = function(a) {
        this.Pq = a;
        this.Yi = 0
    };
    g = gm.prototype;
    g.Xs = function() {
        return this.Yi < this.Pq.length
    };
    g.ie = function() {
        return this.Pq.charCodeAt(this.Yi++)
    };
    g.Lq = function() {
        return this.ie() << 24 >> 24
    };
    g.Dg = function() {
        var a = 0,
            b = 0;
        do var c = this.ie(),
            b = b + ((c & 127) << a),
            a = a + 7; while (c & 128);
        return b
    };
    g.Iq = function() {
        var a = this.ie(),
            a = a | this.ie() << 8;
        return a |= this.Lq() << 16
    };
    var hm = function(a) {
            return [a.Dg()]
        },
        im = function(a) {
            return [a.Dg(), a.Dg()]
        },
        jm = function(a, b, c) {
            a = a.Iq() + a.Yi;
            c[a] = !0;
            return [a]
        };
    var km = function(a) {
            Object.defineProperty(this, "__swiffy_vm", {
                value: a
            });
            for (var b in km.prototype) Object.defineProperty(this, b, {
                value: na(km.prototype[b], this)
            })
        },
        lm = function(a, b) {
            Object.defineProperty(km.prototype, a, {
                value: b
            })
        };
    var mm = function(a, b) {
            return a ? a + "." + b : String(b)
        },
        om = function(a, b, c) {
            nm && b instanceof nm && (b = b.__swiffy_v, c = c || b.Ma, a ? b = b.sb() : (a = b.uri, b = b.localName));
            this.uri = a;
            this.localName = b;
            this.Ma = c;
            this.Ie = void 0
        };
    g = om.prototype;
    g.complete = function() {
        return this
    };
    g.compile = function() {
        return ""
    };
    g.Yb = function() {
        k(this.Ie) || (this.Ie = mm(this.uri, this.localName));
        return this.Ie
    };
    g.zb = function(a) {
        if (!(this.Ma || a instanceof pm && ia(this.localName))) {
            var b = this.Yb();
            if (b in Object(a)) return b
        }
    };
    g.Dd = function() {
        return this
    };
    g.sb = function() {
        switch (this.uri) {
            case "":
                return "" + this.localName;
            case null:
                return "*::" + this.localName;
            default:
                return this.uri + "::" + this.localName
        }
    };
    g.toString = function() {
        return (this.Ma ? "@" : "") + this.Yb()
    };
    g.normalize = function() {
        var a = String(this.localName);
        return a === this.localName ? this : new om(this.uri, a, this.Ma)
    };
    g.Rc = function() {
        if (!this.Ma && !this.uri) {
            var a = this.localName;
            return ha(a) ? !isFinite(a) || 0 > a || 0 != a % 1 ? void 0 : a : (a = String(a), /^[0-9]+$/.test(a) ? parseInt(a, 10) : void 0)
        }
    };
    g.Mh = function(a, b) {
        var c = this.Rc();
        if (!k(c)) throw J(a, this.sb(), qm(b).Yb());
        return c
    };
    var rm = function(a, b) {
        this.name = a;
        this.Ma = b
    };
    rm.prototype.complete = function(a) {
        return new om(String(a), this.name, this.Ma)
    };
    rm.prototype.compile = function(a) {
        return "," + a.pop()
    };
    rm.prototype.toString = function() {
        return (this.Ma ? "@" : "") + mm("?", this.name)
    };
    var sm = function(a) {
        this.Ma = a
    };
    sm.prototype.complete = function(a, b) {
        return new om(String(b), a, this.Ma)
    };
    sm.prototype.compile = function(a) {
        return "," + a.pop() + "," + a.pop()
    };
    sm.prototype.toString = function() {
        return (this.Ma ? "@" : "") + mm("?", "?")
    };
    var tm = function(a, b, c) {
        this.namespaces = a;
        this.localName = b;
        this.Ma = c
    };
    g = tm.prototype;
    g.complete = function() {
        return this
    };
    g.compile = function() {
        return ""
    };
    g.Yb = function() {
        return mm("", this.localName)
    };
    g.zb = function(a) {
        if (!(this.Ma || a instanceof pm && ia(this.localName))) {
            var b = this.namespaces,
                c = this.localName;
            a = Object(a);
            for (var d = 0; d < b.length; ++d) {
                var e = mm(b[d], c);
                if (e in a) return e
            }
        }
    };
    g.Dd = function() {
        return new om("", this.localName, this.Ma)
    };
    g.sb = function() {
        return String(this.localName)
    };
    g.toString = function() {
        return (this.Ma ? "@" : "") + mm("[" + this.namespaces.join(", ") + "]", this.localName)
    };
    var um = function(a, b) {
        this.namespaces = a;
        this.Ma = b
    };
    um.prototype.complete = function(a) {
        return new tm(this.namespaces, a, this.Ma)
    };
    um.prototype.compile = function(a) {
        return "," + a.pop()
    };
    um.prototype.toString = function() {
        return (this.Ma ? "@" : "") + mm("[" + this.namespaces.join(", ") + "]", "?")
    };
    var vm = function(a) {
        this.Nq = a;
        this.Bg = ""
    };
    vm.prototype.wq = function(a) {
        this.Bg && (this.Bg += ",");
        this.Bg += a ? a.sb() : "*";
        return this
    };
    vm.prototype.xq = function() {
        return new om(this.Nq.uri, this.Nq.localName + ".<" + this.Bg + ">", !1)
    };
    var wm = function(a, b, c, d, e) {
        switch (a.kind) {
            case 9:
                return new tm(d[a.ns], b[a.name], !1);
            case 14:
                return new tm(d[a.ns], b[a.name], !0);
            case 27:
                return new um(d[a.ns], !1);
            case 28:
                return new um(d[a.ns], !0);
            case 15:
                return new rm(b[a.name], !1);
            case 16:
                return new rm(b[a.name], !0);
            case 17:
                return new sm(!1);
            case 18:
                return new sm(!0);
            case 7:
                return new om(c[a.ns], b[a.name], !1);
            case 13:
                return new om(c[a.ns], b[a.name], !0);
            case 29:
                b = new vm(e[a.name]);
                for (c = 0; c < a.params.length; c++) b.wq(e[a.params[c]]);
                return b.xq();
            default:
                return null
        }
    };
    var zm = function(a, b, c, d) {
            a = xm(a);
            var e = b.zb(a);
            if (k(e)) return b = a[e], ym(b, e), b.apply(k(d) ? d : a, c);
            if ((d = a.__swiffy_proxy) && d.rg) return d.rg.call(a, b.Dd(), c);
            throw J(1069, b.sb(), qm(a).Yb());
        },
        Am = function(a, b) {
            a = xm(a);
            if (b.zb(a)) return !0;
            var c = a.__swiffy_proxy;
            return c && c.mf ? c.mf.call(a, b.Dd()) : !1
        },
        Bm = function(a, b) {
            a = xm(a);
            var c = b.zb(a);
            if (k(c)) return a[c];
            if ((c = a.__swiffy_proxy) && c.Fd) return c.Fd.call(a, b.Dd())
        },
        Cm = function(a, b, c) {
            a = xm(a);
            var d = b.zb(a);
            k(d) ? a[d] = c : (d = a.__swiffy_proxy) && d.setProperty ?
                d.setProperty.call(a, b.Dd(), c) : a[b.Yb()] = c
        };
    var Dm = /^(?:(\{\d+(?:,(?:\d+)?)?\})|(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|(\(\?P<\w+>)|(\(\?:)|(\(\?=)|(\(\?!)|(\()|(\[\^)|(\[)|([\^$.*+?|])|(\)))/,
        Em = /^(?:(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|([\-])|(\]))/,
        Fm = /<(\w+)>/,
        Hm = function(a, b) {
            this.fq = b || "";
            this.iu = new Gm(a);
            this.Dj = [];
            this.Ph = 0;
            this.uh = !1
        };
    Hm.prototype.translate = function() {
        for (var a = "", b = "", c = !1, d = !1, e = 0; e < this.fq.length; ++e) {
            var f = this.fq[e];
            "s" === f ? c = !0 : "x" === f ? d = !0 : -1 !== "gim".indexOf(f) && (b += f)
        }
        var h = 0,
            l = [],
            n = this;
        this.iu.pu(function(b, e) {
            var f;
            if (0 === n.Ph) switch (f = 0, e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    a += b;
                    break;
                case 13:
                    a = c && "." === b ? a + "[\\s\\S]" : a + b;
                    break;
                case 7:
                case 8:
                case 9:
                    a += b;
                    n.Gj(0);
                    break;
                case 6:
                    ++h;
                    var s = Fm.exec(b);
                    l.push({
                        name: s[1],
                        index: h
                    });
                    a += "(";
                    n.Gj(0);
                    break;
                case 10:
                    ++h;
                    a += b;
                    n.Gj(0);
                    break;
                case 11:
                case 12:
                    a += b;
                    n.Gj(1);
                    f = 1;
                    break;
                case 14:
                    a += b;
                    n.mq();
                    break;
                case -2:
                    a += "\\" + b;
                    break;
                case -1:
                    d && " " === b || (a += b)
            } else if (1 === n.Ph) switch (f = 1, e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    a += b;
                    break;
                case 6:
                    a += b;
                    n.mq();
                    f = 0;
                    break;
                case -2:
                    a += "\\" + b;
                    break;
                case -1:
                    d && " " === b || (a += b)
            } else f = -1;
            return f
        });
        0 !== this.Dj.length && (this.uh = !0);
        if (this.uh) return RegExp(".^", b);
        if (0 === l.length) return new RegExp(a, b);
        b = new RegExp(a, b);
        b.exec = function(a) {
            var b = RegExp.prototype.exec.call(this, a);
            l.forEach(function(a) {
                b[a.name] = b[a.index]
            });
            return b
        };
        return b
    };
    Hm.prototype.Gj = function(a) {
        this.Dj.push(this.Ph);
        this.Ph = a
    };
    Hm.prototype.mq = function() {
        0 !== this.Dj.length ? this.Ph = this.Dj.pop() : this.uh = !0
    };
    var Gm = function(a) {
        this.Sc = a;
        this.n = 0;
        this.uh = !1
    };
    Gm.prototype.pu = function(a) {
        for (;
            "" !== this.Sc;) {
            var b;
            0 === this.n ? b = Dm : 1 === this.n && (b = Em);
            var c = b.exec(this.Sc);
            if (null !== c) {
                var d = 0,
                    e = this;
                c.forEach(function(b, f) {
                    0 !== f && void 0 !== b && (e.n = a(c[0], f), ++d)
                });
                this.Sc = this.Sc.slice(c[0].length)
            } else {
                var f = this.Sc[0];
                "\\" === f ? (this.Sc = this.Sc.slice(1), "" !== this.Sc ? f = this.Sc[0] : this.uh = !0, this.n = a(f, -2)) : this.n = a(f, -1);
                this.Sc = this.Sc.slice(1)
            }
        }
    };
    var Im = function(a, b, c) {
            this.Ca = a;
            this.Gh = b;
            this.Qt = c;
            this.Cj = a ? a.Cj : b
        },
        Jm = new Im(null, {}, !1);
    g = Im.prototype;
    g.Wo = function(a) {
        return new Im(this === Jm ? null : this, a, !1)
    };
    g.Lw = function(a) {
        return new Im(this === Jm ? null : this, a, !0)
    };
    g.Gp = function(a) {
        return this.Qt ? Am(this.Gh, a) : k(a.zb(this.Gh))
    };
    g.find = function(a) {
        for (var b = this; b.Ca && !b.Gp(a);) b = b.Ca;
        return b.Gh
    };
    g.ir = function(a) {
        for (var b = this; b; b = b.Ca)
            if (b.Gp(a)) return b.Gh;
        throw J(1065, a.Yb());
    };
    g.nw = function(a) {
        var b = this.ir(a);
        return Bm(b, a)
    };
    g.Xv = function(a, b, c) {
        return zm(a, b, c, this.Cj)
    };
    g.vw = function() {
        return this.Gh
    };
    g.mw = function() {
        return this.Cj
    };
    g.aw = function(a) {
        return null != a && a !== aa ? a : this.Cj
    };
    var Km = function(a) {
        this.traits = a ? Object.create(a.traits) : {};
        this.Vj = a ? a.Vj.slice() : [];
        this.Uj = a ? a.Uj.slice() : []
    };
    g = Km.prototype;
    g.Cg = function(a, b) {
        this.traits[a] = b.Sm(this.traits[a])
    };
    g.Xu = function(a) {
        for (var b in a.traits) this.Cg(b, a.traits[b])
    };
    g.$i = function(a) {
        (this.Vj.length || this.Uj.length) && Object.defineProperty(a, "__swiffy_slots", {
            value: this.Vj.concat(this.Uj)
        });
        for (var b in this.traits) a.hasOwnProperty(b) || this.traits[b].xm(a, b);
        return a
    };
    g.lu = function(a, b, c, d, e, f) {
        a = this.Gu(a, b, c, d, e, f);
        b && this.Cg(b.Yb(), a)
    };
    g.Gu = function(a, b, c, d, e, f) {
        if (a.slot) return d && (c = d.__swiffy_coerce(c)), this.Vj[a.slot] = c, new Lm(a.slot, d, !a.writable);
        b = String(b.localName);
        switch (a.kind) {
            case "methods":
                return new Mm((c ? c(e, f) : void 0) || Nm(b));
            case "setters":
                return new Om(void 0, (c ? c(e, f) : void 0) || Pm(b));
            case "getters":
                return new Om((c ? c(e, f) : void 0) || Qm(b), void 0);
            default:
                return d && (c = d.__swiffy_coerce(c)), new Lm(-this.Uj.unshift(c), d, !a.writable)
        }
    };
    var Lm = function(a, b, c) {
        this.Nt = c;
        this.Ev = Rm(a, b)
    };
    g = Lm.prototype;
    g.xm = function(a, b) {
        Object.defineProperty(a, b, this.Ev)
    };
    g.get = function(a, b) {
        return a[b]
    };
    g.set = function(a, b, c) {
        a[b] = c
    };
    g.callee = function(a, b) {
        return a[b]
    };
    g.Sm = function() {
        return this
    };
    var Rm = function(a, b) {
            var c, d;
            0 > a ? (c = function() {
                var b = this.__swiffy_slots;
                return b[b.length + a]
            }, d = b ? function(c) {
                var d = this.__swiffy_slots;
                d[d.length + a] = b.__swiffy_coerce(c)
            } : function(b) {
                var c = this.__swiffy_slots;
                c[c.length + a] = b
            }) : (c = function() {
                return this.__swiffy_slots[a]
            }, d = b ? function(c) {
                this.__swiffy_slots[a] = b.__swiffy_coerce(c)
            } : function(b) {
                this.__swiffy_slots[a] = b
            });
            return {
                get: c,
                set: d
            }
        },
        Mm = function(a) {
            this.method = a
        };
    g = Mm.prototype;
    g.xm = function(a, b) {
        Object.defineProperty(a, b, {
            value: na(this.method, a)
        })
    };
    g.get = function(a) {
        return na(this.method, a)
    };
    g.set = function() {};
    g.callee = function() {
        return this.method
    };
    g.Sm = function() {
        return this
    };
    var Om = function(a, b) {
        this.hd = a;
        this.re = b
    };
    g = Om.prototype;
    g.xm = function(a, b) {
        var c = aj(a, b) || {};
        c.get = this.hd || c.get;
        c.set = this.re || c.set;
        Object.defineProperty(a, b, c)
    };
    g.get = function(a) {
        if (this.hd) return this.hd.call(a)
    };
    g.set = function(a, b, c) {
        this.re && this.re.call(a, c)
    };
    g.callee = function(a) {
        if (this.hd) return this.hd.call(a)
    };
    g.Sm = function(a) {
        if (a instanceof Om) {
            var b = this.hd || a.hd;
            a = this.re || a.re;
            if (b != this.hd || a != this.re) return new Om(b, a)
        }
        return this
    };
    var Nm = function(a) {
            return function() {
                return this[a].apply(this, arguments)
            }
        },
        Qm = function(a) {
            return function() {
                return this[a]
            }
        },
        Pm = function(a) {
            return function(b) {
                this[a] = b
            }
        },
        K = function(a, b, c) {
            Sm(a).Cg(b, new Mm(c));
            Tm(a, b, "value", c)
        },
        L = function(a, b, c) {
            Sm(a).Cg(b, new Om(c, void 0));
            Tm(a, b, "get", c)
        },
        M = function(a, b, c) {
            Sm(a).Cg(b, new Om(void 0, c));
            Tm(a, b, "set", c)
        },
        Um = function(a) {
            var b = Sm(a),
                c = qm(a),
                c = (c.uri ? c.uri + ":" : "") + c.localName + ".",
                d;
            for (d in a.prototype) b.Cg(c + d, new Mm(Nm(d)))
        },
        Tm = function(a, b, c, d) {
            a =
                a.prototype;
            var e = aj(a, b) || {};
            e.configurable = !0;
            e[c] = d;
            Object.defineProperty(a, b, e)
        };
    var Vm = function() {
            return "[class " + this.__swiffy_name.localName + "]"
        },
        Xm = function() {
            return Wm
        },
        Ym = 1,
        $m = function(a, b, c, d, e, f, h, l, n) {
            var r = Ym++;
            if (!l) l = new om("", "unnamed#" + r, !1);
            else if (!(l instanceof om)) {
                var t = l.lastIndexOf(".");
                l = new om(0 < t ? l.substring(0, t) : "", 0 < t ? l.substring(t + 1) : l, !1)
            }
            n || lm(l.Yb(), a);
            Object.defineProperty(a.prototype, "__swiffy_classdef", {
                value: a
            });
            Object.defineProperty(a.prototype, "constructor", {
                value: a,
                writable: !0
            });
            Object.defineProperty(a, "__swiffy_classdef", {
                get: Xm
            });
            Object.defineProperty(a,
                "__swiffy_coerce", {
                    value: b
                });
            Object.defineProperty(a, "__swiffy_istype", {
                value: c
            });
            Object.defineProperty(a, "__swiffy_constructor", {
                value: d
            });
            Object.defineProperty(a, "__swiffy_new", {
                value: e
            });
            Object.defineProperty(a, "__swiffy_baseclass", {
                value: f
            });
            b = new Km(f && f.__swiffy_traits);
            Object.defineProperty(a, "__swiffy_traits", {
                value: b
            });
            f = f ? f.__swiffy_if.slice() : [];
            if (h)
                for (c = 0; c < h.length; ++c)
                    for (d = Zm(h[c]), b.Xu(d.__swiffy_traits), d = d.__swiffy_if, e = 0; e < d.length; ++e) d[e] && (f[e] = d[e]);
            f[r] = a;
            Object.defineProperty(a,
                "__swiffy_if", {
                    value: f
                });
            Object.defineProperty(a, "__swiffy_name", {
                value: l
            });
            Object.defineProperty(a, "__swiffy_typeid", {
                value: r
            });
            Object.defineProperty(a, "toString", {
                value: Vm
            });
            return a
        },
        cn = function(a, b, c, d) {
            return $m(b, c || b, an, b, d || b, bn, null, a)
        },
        dn = function(a, b) {
            return null != a && wk(b, a.__swiffy_classdef)
        },
        fn = function() {
            return function b(c) {
                return en.call(b, c)
            }
        },
        en = function(a) {
            if (null != a) {
                if (dn(a, this)) return a;
                throw J(1034, qm(a), this.__swiffy_name);
            }
            return null
        },
        gn = function(a) {
            return dn(a, this)
        },
        an =
        function(a) {
            return this(a) === a
        },
        hn = function(a) {
            return a.__swiffy_typeid ? a : a.__swiffy_classdef
        },
        qm = function(a) {
            return null != a ? hn(a).__swiffy_name : new om("", String(a), !1)
        },
        jn = function(a) {
            a = Object.create(a.prototype);
            Sm(a.__swiffy_classdef).$i(a);
            return a
        },
        ln = function(a) {
            var b = jn(this);
            kn(b).apply(b, arguments);
            return b
        },
        mn = function() {
            var a = this.__swiffy_singleton;
            k(a) || (a = ln.call(this), Object.defineProperty(this, "__swiffy_singleton", {
                value: a
            }));
            return a
        },
        N = function(a, b, c, d, e) {
            return nn(a, b, {
                    Wi: c,
                    interfaces: d
                },
                e)
        },
        nn = function(a, b, c, d) {
            var e = c.Ve || fn(),
                f = c.Wi || bn;
            e.prototype = Object.create(f.prototype);
            a.prototype = e.prototype;
            return $m(e, c.su || c.Ve || en, gn, a, c.Rj || ln, Zm(f), c.interfaces, b, d)
        },
        on = function(a) {
            return function() {
                throw J(a, qm(this).localName);
            }
        },
        wk = function(a, b) {
            if (!b) return !1;
            if (!a) return !0;
            var c = Zm(a),
                d = Zm(b).__swiffy_if;
            return !(!d || !d[c.__swiffy_typeid])
        },
        vk = function(a, b) {
            a.prototype.hasOwnProperty("__swiffy_buildsym") || Object.defineProperty(a.prototype, "__swiffy_buildsym", {
                value: b
            })
        },
        kh = function(a,
            b) {
            vk(a, function(a, d) {
                return b.rc(a, null, d)
            })
        },
        Sm = function(a) {
            return a.__swiffy_traits
        },
        kn = function(a) {
            return a.__swiffy_classdef.__swiffy_constructor
        },
        pn = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_istype(a) ? a : null
        },
        qn = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_istype(a)
        },
        rn = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_coerce(a)
        },
        sn = function(a) {
            if (this.__swiffy_new) return this.__swiffy_new.apply(this, arguments);
            var b =
                Object.create(this.prototype),
                c = this.apply(b, arguments);
            return c instanceof Object ? c : b
        },
        Zm = function(a) {
            return a.prototype.__swiffy_classdef
        },
        O = function(a, b, c, d, e) {
            var f = d;
            Object.defineProperty(a, b, {
                get: function() {
                    return f
                },
                set: function(a) {
                    f = e && null == a ? null : rn(a, km.prototype[c])
                }
            })
        },
        P = function(a, b, c) {
            Object.defineProperty(a, b, {
                value: c
            })
        },
        Q = function(a, b, c, d) {
            return !k(a) && k(c) ? c : d && null == a ? null : rn(a, km.prototype[b])
        },
        R = function(a) {
            qm(a).Yb()
        },
        bn = function(a) {
            return null != a ? a : {}
        },
        tn = fn();
    km.prototype = Object.create(bn.prototype);
    tn.prototype = km.prototype;
    $m(bn, function(a) {
        return null != a ? a : null
    }, function(a) {
        return null != a
    }, function() {}, function() {
        return {}
    }, null, null, "Object");
    Object.defineProperty(bn.prototype, "toString", {
        value: function() {
            return "[object " + this.__swiffy_classdef.__swiffy_name.localName + "]"
        },
        writable: !0
    });
    Object.defineProperty(Object.prototype, "__swiffy_classdef", {
        value: bn
    });
    $m(tn, en, gn, on(1115), ln, bn, null, "global", !0);
    var Wm = N(on(1115), "Class");
    var vn = function(a, b) {
            this.Yk = a;
            this.strings = a.strings;
            this.ints = a.ints;
            this.uints = a.uints;
            this.doubles = [Number.NaN];
            if (a.doubles)
                for (var c = 0; c < a.doubles.length; ++c) this.doubles.push(Number(a.doubles[c]));
            this.Mo = b;
            for (var d = [""], c = 0; c < a.namespaces.length; ++c) d.push(un(a, a.namespaces[c]));
            this.hv = d;
            this.namespaces = [];
            for (var e = [
                    [""]
                ], c = 0; c < a.namespacesets.length; ++c) {
                for (var f = a.namespacesets[c], h = [], l = 0; l < f.length; ++l) h.push(d[f[l]]);
                e.push(h)
            }
            this.multinames = [null];
            for (c = 0; c < a.multinames.length; ++c) this.multinames.push(wm(a.multinames[c],
                this.strings, d, e, this.multinames));
            this.zl = [];
            this.classes = []
        },
        wn = 0,
        un = function(a, b) {
            return "PROTECTED" == b.kind ? "|PROTECTED|" : b.name ? a.strings[b.name] : "|" + b.kind + wn++ +"|"
        };
    vn.prototype.qh = "pool";
    vn.prototype.$e = function(a) {
        if (a in this.zl) a = this.zl[a];
        else {
            var b = this.zl,
                c;
            c = this.Yk.methods[a];
            var d = this.Mo;
            if (c.code) {
                var e = c.exceptions || [],
                    f = c.code,
                    h;
                if (sc) h = aa.atob(f);
                else {
                    tc();
                    var l = rc;
                    h = [];
                    for (var n = 0; n < f.length;) {
                        var r = l[f.charAt(n++)],
                            t = n < f.length ? l[f.charAt(n)] : 0;
                        ++n;
                        var p = n < f.length ? l[f.charAt(n)] : 64;
                        ++n;
                        var s = n < f.length ? l[f.charAt(n)] : 64;
                        ++n;
                        if (null == r || null == t || null == p || null == s) throw Error();
                        h.push(r << 2 | t >> 4);
                        64 != p && (h.push(t << 4 & 240 | p >> 2), 64 != s && h.push(p << 6 & 192 | s))
                    }
                    if (8192 > h.length) h =
                        String.fromCharCode.apply(null, h);
                    else {
                        f = "";
                        for (l = 0; l < h.length; l += 8192) f += String.fromCharCode.apply(null, La(h, l, l + 8192));
                        h = f
                    }
                }
                f = [!0];
                l = [];
                for (p = 0; p < e.length; ++p) n = e[p], f[n.target] = !0, l[n.from] = !0, l[n.to + 1] = !0;
                for (var p = new gm(h), n = [], u; p.Xs();)
                    if (r = p.Yi, t = p.ie(), s = S[t]) n[r] = t = {
                        Ri: s,
                        args: s.ma && s.ma(p, r, f),
                        Ki: void 0,
                        next: void 0,
                        Ui: void 0
                    }, u && (u.next = t), u = 2 != s.mb ? t : void 0;
                u = 0;
                s = !1;
                for (r = 0; r < h.length; ++r)
                    if (s = s || !!l[r], p = f[r], (t = n[r]) && (s || p) && (p && (t.Ki = u++), s = !1, e.length))
                        for (t.Ui = [], p = 0; p < e.length; ++p) r >=
                            e[p].from && r <= e[p].to && t.Ui.push(p);
                u = this.dh(c.traits);
                h = new xn(n, c.type, this);
                h.Vs(e);
                h.append("return function(base,scope){return ");
                h.gl(S.Ro).append("(");
                h.Us(c);
                h.Ts(e);
                h.append("});};");
                c = Function(yn.prototype.qh, vn.prototype.qh, "traits", h.source)(d, this, u)
            } else c = null;
            a = b[a] = c
        }
        return a
    };
    var zn = [void 0, !1, !0, null];
    g = vn.prototype;
    g.Xp = function(a, b, c) {
        switch (a) {
            case "methods":
                return this.$e(b, c);
            case "getters":
                return this.$e(b, void 0);
            case "setters":
                return this.$e(b, void 0);
            case "classes":
                return this.classes[b];
            case "specials":
                return zn[b];
            case "doubles":
                return b ? this.doubles[b] : void 0;
            case "namespaces":
                return this.Hq(b);
            default:
                return b ? this.Yk[a][b] : void 0
        }
    };
    g.We = function(a, b, c) {
        return this.multinames[a].complete(b, c)
    };
    g.Hq = function(a) {
        var b = this.namespaces[a];
        b || (this.namespaces[a] = b = new An(void 0, this.hv[a]));
        return b
    };
    g.dh = function(a, b, c, d) {
        b = b || null;
        c = c || Jm;
        d = d || new Km;
        for (var e = 0; e < a.length; ++e) {
            var f = a[e],
                h = null;
            f.type && f.writable && (h = this.We(f.type).Yb(), h = km.prototype[h]);
            var l = f.name ? this.We(f.name).Dd() : null,
                n = this.Xp(f.kind, f.value, void 0);
            d.lu(f, l, n, h, b, c)
        }
        return d
    };
    g.dp = function(a) {
        a = this.We(a);
        return this.Mo.iv(a)
    };
    g.Wq = function(a, b) {
        if (!b) return a;
        var c = this.dp(b);
        return c || null !== a ? rn(a, c) : null
    };
    var nm = function(a) {
            Object.defineProperty(this, "__swiffy_v", {
                value: a.normalize()
            })
        },
        Bn = function(a, b, c) {
            return new nm(new om(a, b, c))
        };
    nn(nm, "QName", {
        Ve: function(a) {
            return a instanceof nm ? a : Bn("", a, !1)
        },
        Rj: function(a, b) {
            var c, d;
            if (k(b)) c = k(a) ? a instanceof nm ? a.uri : null !== a ? String(a) : null : b instanceof nm ? b.uri : "", d = b instanceof nm ? b.localName : String(b);
            else if (c = "", k(a)) {
                if (a instanceof nm) return a;
                d = String(a)
            } else d = "";
            return Bn(c, d, !1)
        }
    });
    Object.defineProperty(nm.prototype, "uri", {
        get: function() {
            return this.__swiffy_v.uri
        }
    });
    Object.defineProperty(nm.prototype, "localName", {
        get: function() {
            return this.__swiffy_v.localName
        }
    });
    nm.prototype.toString = function() {
        return this.__swiffy_v.sb()
    };
    var An = function(a, b) {
            var c, d;
            k(b) ? (c = Vd(a), d = b instanceof nm ? b.uri : String(b)) : k(a) ? a instanceof An ? (c = a.prefix, d = a.uri) : (d = a instanceof nm ? a.uri : String(a), c = void 0) : d = c = "";
            P(this, "prefix", c);
            P(this, "uri", d)
        },
        Cn = function(a) {
            return a instanceof An ? a : new An(void 0, String(a))
        };
    nn(An, "Namespace", {
        Ve: Cn
    });
    An.prototype.valueOf = function() {
        return this.uri
    };
    An.prototype.toString = function() {
        return this.uri
    };
    km.prototype.trace = function(a) {
        var b = Array.prototype.map.call(arguments, String).join(" ");
        this.__swiffy_vm.trace(b)
    };
    km.prototype.parseInt = function(a, b) {
        !k(b) && Vi(a) && (b = 10);
        return parseInt(a, b)
    };
    km.prototype.parseFloat = parseFloat;
    km.prototype.isNaN = isNaN;
    km.prototype.isFinite = isFinite;
    km.prototype["flash.utils.setTimeout"] = function(a, b) {
        var c = this,
            d = Array.prototype.slice.call(arguments, 2);
        return Sh(function() {
            a.apply(c, d)
        }, b)
    };
    km.prototype["flash.utils.clearTimeout"] = function(a) {
        Vh(a)
    };
    km.prototype["flash.utils.setInterval"] = function(a, b) {
        var c = this,
            d = Array.prototype.slice.call(arguments, 2);
        return Th(function() {
            a.apply(c, d)
        }, b)
    };
    km.prototype["flash.utils.clearInterval"] = function(a) {
        Vh(a)
    };
    km.prototype["flash.utils.getTimer"] = function() {
        return Qh() - this.__swiffy_vm.startTime
    };
    km.prototype["flash.utils.getDefinitionByName"] = function(a) {
        a = Q(a, "String");
        return this.__swiffy_vm.Pi.Em(a)
    };
    km.prototype["flash.utils.getQualifiedClassName"] = function(a) {
        switch (typeof a) {
            case "undefined":
                return "void";
            case "number":
                if ((a | 0) == a) return "int"
        }
        return qm(a).sb()
    };
    km.prototype["flash.utils.getQualifiedSuperclassName"] = function(a) {
        t: {
            if (null != a && (a = hn(a).__swiffy_baseclass, null != a)) {
                a = a.__swiffy_name;
                break t
            }
            a = null
        }
        return a ? a.sb() : a
    };
    km.prototype["flash.utils.describeType"] = function(a) {
        var b;
        if (!k(a)) throw J(1010);
        Dn || (Dn = new En);
        b = Dn;
        var c = new Fn(null, b.ob("type"));
        if (null === a) c.Ac(b.ob("@name"), "null"), c.Ac(b.ob("@isStatic"), "false");
        else {
            var d = !!a.__swiffy_typeid;
            a = d ? a : a.__swiffy_classdef;
            var e = b.qp(c, a, d),
                f = a.__swiffy_name.sb();
            c.Ac(b.ob("@name"), f);
            c.Ac(b.ob("@isStatic"), String(d));
            e && c.Ac(b.ob("@base"), e.__swiffy_name.sb());
            e = c;
            d && (e = c.af(b.ob("factory")), e.Ac(b.ob("@type"), f), b.qp(e, a, !1));
            b.Kt(e, a.__swiffy_traits)
        }
        b = c.me;
        return b
    };
    km.prototype["flash.system.fscommand"] = function(a, b) {
        if (null == a) throw J(2007, "command");
        if (2 != arguments.length || null != b) a = Q(a, "String"), b = Q(b, "String", ""), cf(this.__swiffy_vm.c, a, b)
    };
    km.prototype.isXMLName = function(a) {
        return k(Vd(a))
    };
    var Gn = function(a, b) {
        lm(a, function(c) {
            try {
                return null != c ? b(String(c)) : "null"
            } catch (d) {
                throw J(1052, a);
            }
        })
    };
    Gn("escape", escape);
    Gn("unescape", unescape);
    Gn("encodeURI", encodeURI);
    Gn("encodeURIComponent", encodeURIComponent);
    Gn("decodeURI", decodeURI);
    Gn("decodeURIComponent", decodeURIComponent);
    lm("Math", Math);
    cn("Boolean", Boolean);
    cn("Number", Number);
    var Hn = cn("int", function(a) {
        return a | 0
    });
    Object.defineProperties(Hn, {
        MIN_VALUE: {
            value: -2147483648
        },
        MAX_VALUE: {
            value: 2147483647
        }
    });
    var In = cn("uint", function(a) {
        return a >>> 0
    });
    Object.defineProperties(In, {
        MIN_VALUE: {
            value: 0
        },
        MAX_VALUE: {
            value: 4294967295
        }
    });
    cn("void", function() {});
    cn("String", String, function(a) {
        return null != a ? String(a) : null
    });
    cn("Date", function(a) {
        return a instanceof Date ? a : (new Date(Qh())).toString()
    }, function(a) {
        if (a instanceof Date) return a;
        if (null == a) return null;
        throw J(1034, qm(a), "Date");
    }, Yh);
    km.prototype.Date.prototype = Date.prototype;
    km.prototype.Date.UTC = Date.UTC;
    $m(Function, en, gn, Function, Function, bn, null, "Function");
    $m(Array, en, gn, Array, Array, bn, null, "Array");
    var Jn = aa.RegExp;
    $m(Jn, en, gn, Jn, function(a, b) {
        if (a instanceof RegExp) {
            if (k(b)) throw J(1100);
            return new RegExp(a)
        }
        a = String(a);
        null != b && (b = String(b));
        return (new Hm(a, b)).translate()
    }, bn, null, "RegExp");
    lm("undefined", void 0);
    lm("null", null);
    lm("Infinity", Infinity);
    lm("NaN", NaN);
    lm("AS3", Cn("http://adobe.com/AS3/2006/builtin"));
    Object.defineProperty(Object.prototype, "setPropertyIsEnumerable", {
        value: function(a, b) {
            a = Q(a, "String");
            b = Q(b, "Boolean");
            var c = Object.getOwnPropertyDescriptor(this, a);
            c && c.configurable && c.enumerable != b && (c.enumerable = b, Object.defineProperty(this, a, c))
        }
    });
    var Kn = function(a, b) {
        Object.defineProperty(a, mm("http://adobe.com/AS3/2006/builtin", b), {
            value: function() {
                return this[b].apply(this, arguments)
            }
        })
    };
    Kn(Object.prototype, "toLocaleString");
    Kn(Object.prototype, "toString");
    Kn(Object.prototype, "valueOf");
    var T = function(a, b) {
        Object.defineProperty(a, mm("http://adobe.com/AS3/2006/builtin", b), {
            value: a[b]
        })
    };
    T(Object.prototype, "hasOwnProperty");
    T(Object.prototype, "isPrototypeOf");
    T(Object.prototype, "propertyIsEnumerable");
    T(Function.prototype, "apply");
    T(Function.prototype, "call");
    T(String, "fromCharCode");
    T(String.prototype, "charAt");
    T(String.prototype, "charCodeAt");
    T(String.prototype, "concat");
    T(String.prototype, "indexOf");
    T(String.prototype, "lastIndexOf");
    T(String.prototype, "localeCompare");
    T(String.prototype, "match");
    T(String.prototype, "replace");
    T(String.prototype, "search");
    T(String.prototype, "slice");
    T(String.prototype, "split");
    T(String.prototype, "substr");
    T(String.prototype, "substring");
    T(String.prototype, "toLocaleLowerCase");
    T(String.prototype, "toLocaleUpperCase");
    T(String.prototype, "toLowerCase");
    T(String.prototype, "toUpperCase");
    T(String.prototype, "toString");
    T(String.prototype, "valueOf");
    T(Array.prototype, "concat");
    T(Array.prototype, "every");
    T(Array.prototype, "filter");
    T(Array.prototype, "forEach");
    T(Array.prototype, "indexOf");
    T(Array.prototype, "join");
    T(Array.prototype, "lastIndexOf");
    T(Array.prototype, "map");
    T(Array.prototype, "pop");
    T(Array.prototype, "push");
    T(Array.prototype, "reverse");
    T(Array.prototype, "shift");
    T(Array.prototype, "slice");
    T(Array.prototype, "some");
    T(Array.prototype, "sort");
    T(Array.prototype, "sortOn");
    T(Array.prototype, "splice");
    T(Array.prototype, "unshift");
    T(Date.prototype, "getDate");
    T(Date.prototype, "getDay");
    T(Date.prototype, "getFullYear");
    T(Date.prototype, "getHours");
    T(Date.prototype, "getMilliseconds");
    T(Date.prototype, "getMinutes");
    T(Date.prototype, "getMonth");
    T(Date.prototype, "getSeconds");
    T(Date.prototype, "getTime");
    T(Date.prototype, "getTimezoneOffset");
    T(Date.prototype, "getUTCDate");
    T(Date.prototype, "getUTCDay");
    T(Date.prototype, "getUTCFullYear");
    T(Date.prototype, "getUTCHours");
    T(Date.prototype, "getUTCMilliseconds");
    T(Date.prototype, "getUTCMinutes");
    T(Date.prototype, "getUTCMonth");
    T(Date.prototype, "getUTCSeconds");
    T(Date.prototype, "setDate");
    T(Date.prototype, "setFullYear");
    T(Date.prototype, "setHours");
    T(Date.prototype, "setMilliseconds");
    T(Date.prototype, "setMinutes");
    T(Date.prototype, "setMonth");
    T(Date.prototype, "setSeconds");
    T(Date.prototype, "setTime");
    T(Date.prototype, "setUTCDate");
    T(Date.prototype, "setUTCFullYear");
    T(Date.prototype, "setUTCHours");
    T(Date.prototype, "setUTCMilliseconds");
    T(Date.prototype, "setUTCMinutes");
    T(Date.prototype, "setUTCMonth");
    T(Date.prototype, "setUTCSeconds");
    T(Date.prototype, "toDateString");
    T(Date.prototype, "toJSON");
    T(Date.prototype, "toLocaleDateString");
    T(Date.prototype, "toLocaleString");
    T(Date.prototype, "toLocaleTimeString");
    T(Date.prototype, "toTimeString");
    T(Date.prototype, "toUTCString");
    Kn(RegExp.prototype, "exec");
    Kn(RegExp.prototype, "test");
    var U = function(a, b) {
        a = Q(a, "String", "");
        b = Q(b, "int", 0);
        P(this, "errorID", b);
        O(this, "message", "String", a);
        O(this, "name", "String", "Error")
    };
    N(U, "Error");
    U.prototype.getStackTrace = function() {
        R(this, "getStackTrace");
        return ""
    };
    U.prototype.toString = function() {
        return this.name + (this.message ? ": " + this.message : "")
    };
    var Ln = function(a, b) {
        U.call(this, a, b);
        this.name = "ReferenceError"
    };
    N(Ln, "ReferenceError", U);
    var Mn = function(a, b) {
        U.call(this, a, b);
        this.name = "TypeError"
    };
    N(Mn, "TypeError", U);
    var Nn = function(a, b) {
        U.call(this, a, b);
        this.name = "VerifyError"
    };
    N(Nn, "VerifyError", U);
    var On = function(a, b) {
        U.call(this, a, b);
        this.name = "ArgumentError"
    };
    N(On, "ArgumentError", U);
    var Pn = function(a, b) {
        U.call(this, a, b);
        this.name = "RangeError"
    };
    N(Pn, "RangeError", U);
    var Qn = function(a, b) {
        U.call(this, a, b);
        this.name = "URIError"
    };
    N(Qn, "URIError", U);
    var Rn = function(a, b) {
        U.call(this, a, b);
        this.name = "SecurityError"
    };
    N(Rn, "SecurityError", U);
    var Sn = function(a, b) {
        U.call(this, a, b)
    };
    N(Sn, "flash.errors.IOError", U);
    var Tn = function(a, b) {
        U.call(this, a, b)
    };
    N(Tn, "flash.errors.EOFError", Sn);
    var Un = function(a, b) {
        U.call(this, a, b)
    };
    N(Un, "flash.errors.StackOverflowError", U);
    var Vn = function(a) {
            if (null === a) throw J(1009);
            if (void 0 === a) throw J(1010);
        },
        xm = function(a) {
            Vn(a);
            return Object(a)
        },
        ym = function(a, b) {
            if (!m(a)) throw J(1006, b || "value");
        },
        J = function(a, b) {
            var c = Wn[a] || U,
                d = Xn[a],
                e = "Error #" + a;
            if (d) var f = arguments,
                e = e + (": " + d.replace(/%(\d+)/g, function(a, b) {
                    return b < f.length ? f[b] : ""
                }));
            return new ai(new c(e, a))
        },
        Xn = {
            1001: "The method %1 is not implemented.",
            1006: "%1 is not a function.",
            1007: "Instantiation attempted on a non-constructor.",
            1009: "Cannot access a property or method of a null object reference.",
            1010: "A term is undefined and has no properties.",
            1014: "Class %1 could not be found.",
            1016: "Descendants operator (..) not supported on type",
            1023: "Stack overflow occurred",
            1034: "Type Coercion failed: cannot convert %1 to %2.",
            1040: "The right-hand side of instanceof must be a class or function.",
            1041: "The right-hand side of operator must be a class.",
            1052: "Invalid URI passed to %1 function.",
            1056: "Cannot create property %1 on %2.",
            1065: "Variable %1 is not defined.",
            1069: "Property %1 not found on %2 and there is no default value.",
            1083: 'The prefix "%1" for element "%2" is not bound.',
            1085: 'The element type "%1" must be terminated by the matching end-tag "</%2>".',
            1086: "The %1 method only works on lists containing one item.",
            1087: "Assignment to indexed XML is not allowed.",
            1088: "The markup in the document following the root element must be well-formed.",
            1090: "XML parser failure: element is malformed.",
            1091: "XML parser failure: Unterminated CDATA section.",
            1094: "XML parser failure: Unterminated comment.",
            1095: "XML parser failure: Unterminated attribute.",
            1097: "XML parser failure: Unterminated processing instruction.",
            1100: "Cannot supply flags when constructing one RegExp from another.",
            1115: "%1$ is not a constructor.",
            1123: "Filter operator not supported on type %1.",
            1125: "The index %1 is out of range %2.",
            1126: "Cannot change the length of a fixed Vector.",
            1127: "Type application attempted on a non-parameterized type.",
            1504: "End of file.",
            1506: "The specified range is invalid.",
            1508: "The value specified for argument %1 is invalid.",
            2004: "One of the parameters is invalid.",
            2006: "The supplied index is out of bounds.",
            2007: "Parameter %1 must be non-null.",
            2008: "Parameter %1 must be one of the accepted values.",
            2012: "%1$ class cannot be instantiated.",
            2015: "Invalid %1.",
            2030: "End of file was encountered.",
            2035: "URL Not Found. URL: %1",
            2058: "There was an error decompressing the data.",
            2067: "The ExternalInterface is not available in this container.",
            2088: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2089: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2090: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2091: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2092: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2093: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2101: "The String passed to URLVariables.decode() must be a URL-encoded query string containing name/value pairs.",
            2105: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2106: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2107: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2108: "Scene %1 was not found.",
            2109: "Frame label %1 not found in scene %2.",
            2124: "Loaded file is an unknown type. URL: %1",
            2152: "Full screen mode is not allowed."
        },
        Wn = {
            1001: Nn,
            1006: Mn,
            1007: Mn,
            1009: Mn,
            1010: Mn,
            1014: Ln,
            1016: Mn,
            1023: Un,
            1034: Mn,
            1040: Mn,
            1041: Mn,
            1052: Qn,
            1056: Ln,
            1065: Ln,
            1069: Ln,
            1083: Mn,
            1085: Mn,
            1086: Mn,
            1087: Mn,
            1088: Mn,
            1090: Mn,
            1091: Mn,
            1094: Mn,
            1095: Mn,
            1097: Mn,
            1100: Mn,
            1115: Mn,
            1123: Mn,
            1125: Pn,
            1126: Pn,
            1127: Mn,
            1504: U,
            1506: Pn,
            1508: On,
            2004: Mn,
            2006: Pn,
            2007: Mn,
            2008: On,
            2012: On,
            2015: On,
            2030: Tn,
            2035: Sn,
            2058: Sn,
            2067: U,
            2088: U,
            2089: U,
            2090: U,
            2091: U,
            2092: U,
            2093: U,
            2101: U,
            2105: U,
            2106: U,
            2107: U,
            2108: On,
            2109: On,
            2124: Sn,
            2152: Rn
        };
    var S = {
            Vv: function(a) {
                Oa(Oc, function(b, c) {
                    var d = S[b];
                    if (d.implementation) {
                        var e = (d.yc || a).prototype;
                        d.Mu = (e.qh || "") + "." + c;
                        e[c] = d.implementation
                    }
                })
            }
        },
        Yn = function(a, b, c, d) {
            this.target = d;
            this.typeName = 0 == b ? null : a.We(b).Yb();
            this.traits = a.dh([{
                slot: 1,
                kind: "specials",
                value: 0,
                type: b,
                name: c
            }])
        };
    Yn.prototype.Zv = function(a) {
        return !this.typeName || dn(a, km.prototype[this.typeName])
    };
    var Zn = function(a, b) {
        var c;
        if (b && a instanceof ai) c = a.value;
        else if (b && a instanceof RangeError) c = J(1023).value;
        else throw a;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (e.Zv(c)) return e.target
        }
        throw a;
    };
    S[36] = function(a) {
        this.Ba(a)
    };
    S[36].ma = function(a) {
        return [a.Lq()]
    };
    S[47] = function(a) {
        this.Ba(this.bg.doubles[a])
    };
    S[47].ma = hm;
    S[39] = function() {
        this.Ba("!1")
    };
    S[45] = function(a) {
        this.Ba(this.bg.ints[a])
    };
    S[45].ma = hm;
    S.qg = function(a) {
        this.Wa().ja(S.qg, a)
    };
    S.qg.implementation = vn.prototype.Hq;
    S.qg.ma = hm;
    S.qg.yc = vn;
    S[49] = S.qg;
    S[40] = function() {
        this.Ba("Number.NaN")
    };
    S[32] = function() {
        this.Ba(null)
    };
    S[37] = function(a) {
        this.Ba(a)
    };
    S[37].ma = hm;
    S[44] = function(a) {
        this.Ba(Ba(this.bg.strings[a]))
    };
    S[44].ma = hm;
    S[38] = function() {
        this.Ba("!0")
    };
    S[46] = function(a) {
        this.Ba(this.bg.uints[a])
    };
    S[46].ma = hm;
    S[33] = function() {
        this.Ba(void 0)
    };
    S[42] = function() {
        this.Ba(this.stack(0))
    };
    S[43] = function() {
        var a = this.stack(0),
            b = this.stack(1);
        this.tj("t");
        this.append("t=" + a + ",");
        this.append(a + "=" + b + ",");
        this.append(b + "=t,");
        this.append("t=undefined;")
    };
    S[41] = function() {
        this.pop()
    };
    S[71] = function() {
        this.append("return;")
    };
    S[71].mb = 2;
    S[72] = function() {
        var a = this.pop();
        this.append("return ");
        this.Yo ? this.ja(S.pe, a, this.Yo) : this.append(a + ";")
    };
    S[72].mb = 2;
    S[85] = function(a) {
        for (var b = [], c = []; 0 < a--;) c[a] = this.pop(), b[a] = this.pop();
        this.tj("t");
        this.append("t={},");
        for (a = 0; a < b.length; ++a) this.append("t[" + b[a] + "]=" + c[a] + ",");
        this.Wa().append("t,t=undefined;")
    };
    S[85].ma = hm;
    S[86] = function(a) {
        this.Ba(this.be(a))
    };
    S[86].ma = hm;
    S.Db = function(a) {
        return function() {
            var b = this.pop(),
                c = this.pop();
            this.Ba(c + a + b)
        }
    };
    S.fi = function(a) {
        return function() {
            this.Ba(a + this.pop())
        }
    };
    S[160] = S.Db("+");
    S[161] = S.Db("-");
    S[162] = S.Db("*");
    S[163] = S.Db("/");
    S[164] = S.Db("%");
    S[144] = S.fi("-");
    S[150] = S.fi("!");
    S[145] = function() {
        this.append("++" + this.stack(0) + ";")
    };
    S[147] = function() {
        this.append("--" + this.stack(0) + ";")
    };
    S.Om = function(a) {
        return function() {
            var b = this.pop(),
                c = this.pop();
            this.Ba("((" + c + "|0)" + a + "(" + b + "|0)|0")
        }
    };
    S[197] = S.Om("+");
    S[198] = S.Om("-");
    S[199] = S.Om("*");
    S[196] = function() {
        this.Ba("(-(" + this.pop() + "|0))|0")
    };
    S[192] = function() {
        this.Ba("((" + this.pop() + "|0)+1)|0")
    };
    S[193] = function() {
        this.Ba("((" + this.pop() + "|0)-1)|0")
    };
    S[151] = S.fi("~");
    S[169] = S.Db("|");
    S[170] = S.Db("^");
    S[168] = S.Db("&");
    S[165] = S.Db("<<");
    S[166] = S.Db(">>");
    S[167] = S.Db(">>>");
    S[118] = S.fi("!!");
    S[117] = S.fi("+");
    S[115] = function() {
        this.Ba(this.pop() + "|0")
    };
    S[116] = function() {
        this.Ba(this.pop() + ">>>0")
    };
    S[112] = function() {
        this.Ba("String(" + this.pop() + ")")
    };
    S.ak = function(a) {
        return function() {
            this.Ba(this.register(a))
        }
    };
    S[208] = S.ak(0);
    S[209] = S.ak(1);
    S[210] = S.ak(2);
    S[211] = S.ak(3);
    S.bk = function(a) {
        return function() {
            this.append(this.register(a) + "=" + this.pop() + ";")
        }
    };
    S[212] = S.bk(0);
    S[213] = S.bk(1);
    S[214] = S.bk(2);
    S[215] = S.bk(3);
    S.sf = function(a) {
        var b = function(b) {
            a.call(this, this.register(b))
        };
        b.ma = hm;
        return b
    };
    S[98] = S.sf(function(a) {
        this.Ba(a)
    });
    S[99] = S.sf(function(a) {
        this.append(a + "=" + this.pop() + ";")
    });
    S[146] = S.sf(function(a) {
        this.append("++" + a + ";")
    });
    S[148] = S.sf(function(a) {
        this.append("--" + a + ";")
    });
    S[194] = S.sf(function(a) {
        this.append(a + "=((" + a + "|0)+1)|0;")
    });
    S[195] = S.sf(function(a) {
        this.append(a + "=((" + a + "|0)-1)|0;")
    });
    S[8] = S.sf(function(a) {
        this.append(a + "=undefined;")
    });
    S[130] = function() {};
    S[133] = function() {
        var a = this.pop();
        this.Ba(a + "==null?null:String(" + a + ")")
    };
    S[137] = function() {
        var a = this.pop();
        this.Ba(a + "==null?null:" + a)
    };
    S[149] = function() {
        this.Ba("typeof " + this.pop())
    };
    S[171] = S.Db("==");
    S[172] = S.Db("===");
    S[173] = S.Db("<");
    S[174] = S.Db("<=");
    S[175] = S.Db(">");
    S[176] = S.Db(">=");
    S[16] = function(a) {
        a = this.hg(a);
        0 > a ? this.append("return;") : this.append("j=" + a + ";break;")
    };
    S[16].mb = 2;
    S[16].ma = jm;
    S.Zb = function(a) {
        var b = function(b) {
            this.append("if(").append(a.call(this)).append(")");
            b = this.hg(b);
            0 > b ? this.append("return;") : this.append("{j=" + b + ";break;}")
        };
        b.mb = 1;
        b.ma = jm;
        return b
    };
    S[14] = S.Zb(function() {
        var a = this.pop(),
            b = this.pop();
        return "!(" + a + "<" + b + ")"
    });
    S[12] = S.Zb(function() {
        var a = this.pop();
        return "!(" + this.pop() + "<" + a + ")"
    });
    S[15] = S.Zb(function() {
        var a = this.pop(),
            b = this.pop();
        return "!(" + a + "<=" + b + ")"
    });
    S[19] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "==" + a
    });
    S[20] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "!=" + a
    });
    S[25] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "===" + a
    });
    S[26] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "!==" + a
    });
    S[13] = S.Zb(function() {
        var a = this.pop();
        return "!(" + this.pop() + "<=" + a + ")"
    });
    S[18] = S.Zb(function() {
        return "!" + this.pop()
    });
    S[23] = S.Zb(function() {
        var a = this.pop(),
            b = this.pop();
        return a + "<" + b
    });
    S[21] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "<" + a
    });
    S[24] = S.Zb(function() {
        var a = this.pop(),
            b = this.pop();
        return a + "<=" + b
    });
    S[22] = S.Zb(function() {
        var a = this.pop();
        return this.pop() + "<=" + a
    });
    S[17] = S.Zb(function() {
        return this.pop()
    });
    S[27] = function(a, b) {
        var c = this.pop(),
            d = this.hg(a);
        if (2 == arguments.length) {
            var e = this.hg(b);
            this.append("j=" + c + "?" + d + ":" + e)
        } else {
            this.append("j=[");
            for (e = 1; e < arguments.length; ++e) 1 < e && this.append(","), this.append(String(this.hg(arguments[e])));
            this.append("][" + c + "],j=j===undefined?" + d + ":j")
        }
        this.append(";break;")
    };
    S[27].ma = function(a, b, c) {
        var d = [],
            e = function() {
                var e = a.Iq() + b;
                c[e] = !0;
                d.push(e)
            };
        e();
        for (var f = a.Dg() + 1; 0 < f--;) e();
        return d
    };
    S[27].mb = 2;
    S[29] = function() {
        this.Iw()
    };
    S.cr = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.scope();
            this.Vt().append(d).ja(b, a)
        };
        b.implementation = a;
        b.yc = Im;
        return b
    };
    S[48] = S.cr(Im.prototype.Wo);
    S[28] = S.cr(Im.prototype.Lw);
    S.mg = function(a) {
        this.Wa().append(this.scope(a)).ja(S.mg)
    };
    S.mg.implementation = Im.prototype.vw;
    S.mg.yc = Im;
    S.mg.ma = function(a) {
        return [a.ie()]
    };
    S[101] = S.mg;
    S.Jh = function() {
        this.Wa().append(this.scope()).ja(S.Jh)
    };
    S.Jh.implementation = Im.prototype.mw;
    S.Jh.yc = Im;
    S[100] = S.Jh;
    S.gf = function(a) {
        a = this.be(a);
        var b = this.pop(),
            c = this.pop();
        this.Wa();
        this.ja(S.gf, b, c, a)
    };
    S.gf.implementation = function(a, b, c) {
        ym(b);
        return b.apply(a, c)
    };
    S.gf.ma = hm;
    S.gf.mb = 1;
    S[65] = S.gf;
    S.df = function(a, b) {
        var c = this.be(b),
            d = this.fe(a),
            e = this.pop();
        this.Wa().append(this.scope()).ja(S.df, e, d, c)
    };
    S.df.implementation = Im.prototype.Xv;
    S.df.mb = 1;
    S.df.ma = im;
    S.df.yc = Im;
    S[76] = S.df;
    S.Km = function(a, b) {
        var c = function(a, e) {
            var f = this.be(e),
                h = this.fe(a),
                l = this.pop();
            b && this.Wa();
            this.ja(c, l, h, f)
        };
        c.mb = 1;
        c.ma = im;
        c.implementation = a;
        return c
    };
    S[70] = S.Km(zm, !0);
    S[79] = S.Km(zm, !1);
    S.Mm = function(a) {
        var b = function(a) {
            a = this.fe(a);
            this.Wa().append(this.scope());
            this.ja(b, a)
        };
        b.ma = hm;
        b.implementation = a;
        b.yc = Im;
        return b
    };
    S[94] = S.Mm(Im.prototype.find);
    S[93] = S.Mm(Im.prototype.ir);
    S[96] = S.Mm(Im.prototype.nw);
    S.dr = function(a) {
        var b = function(a) {
            var d = this.pop();
            a = this.fe(a);
            var e = this.pop();
            this.ja(b, e, a, d)
        };
        b.ma = hm;
        b.implementation = a;
        return b
    };
    S[97] = S.dr(Cm);
    S[104] = S.dr(Cm);
    S.Nm = function(a) {
        var b = function(a) {
            a = this.fe(a);
            var d = this.pop();
            this.Wa().ja(b, d, a)
        };
        b.ma = hm;
        b.implementation = a;
        return b
    };
    S[102] = S.Nm(Bm);
    S[89] = S.Nm(function(a, b) {
        a = xm(a);
        var c = a.__swiffy_proxy;
        if (c && c.Xj) return c.Xj.call(a, b.Dd());
        throw J(1016);
    });
    S[106] = S.Nm(function(a, b) {
        a = xm(a);
        var c = a.__swiffy_proxy;
        if (c && c.vc) return c.vc.call(a, b.Dd());
        c = b.zb(a);
        return k(c) ? delete a[c] : !1
    });
    S.wg = function() {
        this.ja(S.wg, this.pop())
    };
    S.wg.implementation = function(a) {
        throw new ai(a);
    };
    S.wg.mb = 2;
    S[3] = S.wg;
    S.ng = function(a) {
        this.Wa().append("handler" + a);
        this.ja(S.ng)
    };
    S.ng.implementation = function() {
        return this.traits.$i({})
    };
    S.ng.yc = Yn;
    S.ng.ma = hm;
    S[90] = S.ng;
    S.Aj = function() {
        this.ja(S.Aj, this.stack(0))
    };
    S.Aj.implementation = function(a) {
        Vn(a);
        if (!dn(a, $n) && !dn(a, ao)) throw J(1123, qm(a).Yb());
    };
    S[120] = S.Aj;
    S.vg = function(a) {
        this.ja(S.vg, Ba(this.bg.strings[a]))
    };
    S.vg.implementation = function(a) {
        bi = String(a)
    };
    S.vg.ma = hm;
    S[6] = S.vg;
    S[7] = function() {
        this.ja(S.vg, this.pop())
    };
    S.er = function(a) {
        var b = function() {
            var a = this.stack(0);
            this.append(a + "=").ja(b, a)
        };
        b.implementation = a;
        return b
    };
    S[114] = S.er(ae);
    S[113] = S.er($d);
    S.Eg = function(a) {
        var b = this.stack(0);
        this.append(b + "=");
        this.vh(S.Eg, b);
        this.append("[" + a + "];")
    };
    S.Eg.implementation = function(a) {
        xm(a);
        return a.__swiffy_slots
    };
    S.Eg.ma = hm;
    S[108] = S.Eg;
    S[109] = function(a) {
        var b = this.pop(),
            c = this.pop();
        this.vh(S.Eg, c);
        this.append("[" + a + "]=" + b + ";")
    };
    S[109].ma = hm;
    S.qj = function() {
        var a = this.pop(),
            b = this.pop();
        this.Wa().ja(S.qj, b, a)
    };
    S.qj.implementation = function(a, b) {
        if (b == bn) return null != a;
        if (!m(b)) throw J(1040);
        return Object(a) instanceof b
    };
    S[177] = S.qj;
    S.pj = function() {
        var a = this.pop(),
            b = this.pop();
        this.Wa().ja(S.pj, b, a)
    };
    S.pj.implementation = function(a, b) {
        b = xm(b);
        return Am(b, new om("", a, !1))
    };
    S[180] = S.pj;
    S.og = function(a) {
        var b = this.pop(),
            c = this.scope();
        this.Wa().ja(S.og, "pool", c, a, b)
    };
    S.og.implementation = function(a, b, c, d) {
        return this.fw(a, b, c, d)
    };
    S.og.ma = hm;
    S.og.yc = yn;
    S[88] = S.og;
    S.pg = function(a) {
        this.Wa().ja(S.pg, this.scope(), a)
    };
    S.pg.implementation = function(a, b) {
        return this.$e(b, void 0)(null, a)
    };
    S.pg.ma = hm;
    S.pg.yc = vn;
    S[64] = S.pg;
    S.hf = function(a) {
        a = this.be(a);
        var b = this.pop();
        this.Wa().ja(S.hf, b, a)
    };
    S.hf.implementation = function(a, b) {
        return this.Bq(a, b)
    };
    S.hf.ma = hm;
    S.hf.mb = 1;
    S[66] = S.hf;
    S[74] = S.Km(function(a, b, c) {
        a = xm(a);
        b = b.zb(a);
        return this.Bq(a[b], c)
    }, !0);
    S.Os = function(a, b, c, d) {
        b = xm(b);
        var e = Sm(a).traits,
            f = c.zb(e);
        if (k(f)) return a = e[f].callee(b, f), ym(a, c), a.apply(b, d);
        f = c.zb(a.prototype);
        if (k(f)) return a = a.prototype[f], ym(a, c), a.apply(b, d);
        throw J(1069, c.sb(), qm(a).localName);
    };
    S.br = function(a) {
        var b = function(c, d) {
            var e = this.be(d),
                f = this.fe(c),
                h = this.pop();
            a && this.Wa();
            this.ja(b, "base", h, f, e)
        };
        b.mb = 1;
        b.ma = im;
        b.implementation = S.Os;
        return b
    };
    S[69] = S.br(!0);
    S[78] = S.br(!1);
    S.Lh = function(a) {
        var b = this.pop();
        a = this.fe(a);
        var c = this.pop();
        this.ja(S.Lh, "base", c, a, b)
    };
    S.Lh.ma = hm;
    S.Lh.implementation = function(a, b, c, d) {
        b = xm(b);
        var e = Sm(a).traits,
            f = c.zb(e);
        if (k(f)) e[f].set(b, f, d);
        else {
            f = c.zb(a.prototype);
            if (k(f) && (e = aj(a.prototype, f)) && e.set) {
                e.set.call(b, d);
                return
            }
            throw J(1056, c.sb(), qm(a).localName);
        }
    };
    S[5] = S.Lh;
    S.Ih = function(a) {
        a = this.fe(a);
        var b = this.pop();
        this.Wa().ja(S.Ih, "base", b, a)
    };
    S.Ih.ma = hm;
    S.Ih.implementation = function(a, b, c) {
        b = xm(b);
        var d = Sm(a).traits,
            e = c.zb(d);
        if (k(e)) return d[e].get(b, e);
        e = c.zb(a.prototype);
        if (k(e) && (d = aj(a.prototype, e)) && d.get) return d.get.call(b);
        throw J(1069, c.sb(), qm(a).localName);
    };
    S[4] = S.Ih;
    S.ug = function(a) {
        a = this.be(a);
        var b = this.pop();
        this.ja(S.ug, "base", b, a)
    };
    S.ug.implementation = function(a, b, c) {
        b = xm(b);
        a.__swiffy_constructor.apply(b, c)
    };
    S.ug.ma = hm;
    S.ug.mb = 1;
    S[73] = S.ug;
    S.Hh = function(a) {
        a = this.be(a);
        var b = this.pop();
        this.Wa();
        this.ja(S.Hh, b, a)
    };
    S.Hh.implementation = function(a, b) {
        var c = a && a.__swiffy_type_apply;
        if (!c) throw J(1127);
        return c.call(a, this.xc, b)
    };
    S.Hh.ma = hm;
    S[83] = S.Hh;
    S.rj = function() {
        this.Wa();
        this.ja(S.rj, "traits")
    };
    S.rj.implementation = function(a) {
        return a.$i({})
    };
    S[87] = S.rj;
    S.pe = function(a) {
        var b = this.stack(0);
        this.append(b + "=");
        this.ja(S.pe, b, a)
    };
    S.pe.implementation = function(a, b) {
        return this.Wq(a, b)
    };
    S.pe.ma = hm;
    S.pe.yc = vn;
    S[128] = S.pe;
    S.Bj = function() {
        this.ja(S.Bj, this.stack(0))
    };
    S.Bj.implementation = Vn;
    S[119] = S.Bj;
    S.fr = function(a) {
        var b = function(a) {
            var d = this.stack(0);
            this.append(d + "=");
            this.ja(b, d, a)
        };
        b.ma = hm;
        b.implementation = function(b, d) {
            return a(b, this.dp(d))
        };
        b.yc = vn;
        return b
    };
    S[134] = S.fr(pn);
    S[178] = S.fr(qn);
    S.gr = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.Wa();
            this.ja(b, d, a)
        };
        b.implementation = a;
        return b
    };
    S[135] = S.gr(pn);
    S[179] = S.gr(qn);
    S.Lm = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.Wa().ja(b, d, a)
        };
        b.implementation = a;
        return b
    };
    S.Nl = S.Lm(function(a, b) {
        a = xm(a);
        var c = a.__swiffy_proxy;
        if (c && c.tf) b = c.tf.call(a, b);
        else {
            c = Object.keys(a);
            do
                if (++b > c.length) return 0;
            while (Wi(c[b - 1]))
        }
        return b
    });
    S[31] = S.Nl;
    S[30] = S.Lm(function(a, b) {
        a = xm(a);
        var c = a.__swiffy_proxy;
        return c && c.Gg ? c.Gg.call(a, b) : Object.keys(a)[b - 1]
    });
    S[35] = S.Lm(function(a, b) {
        a = xm(a);
        var c = a.__swiffy_proxy;
        return c && c.Hg ? c.Hg.call(a, b) : a[Object.keys(a)[b - 1]]
    });
    S.Eh = function(a, b) {
        this.append("while(" + this.register(a) + "&&!(" + this.register(b) + "=");
        this.vh(S.Nl, this.register(a), this.register(b)).append("))");
        this.append(this.register(a) + "=").ja(S.Eh, this.register(a));
        this.Ba("!!" + this.register(b))
    };
    S.Eh.implementation = function(a) {
        var b = a.__swiffy_proxy;
        return b && b.tf ? null : Object.getPrototypeOf(a)
    };
    S.Eh.ma = im;
    S[50] = S.Eh;
    S.ci = function(a) {
        var b = function() {
            var a = this.pop();
            this.Wa().ja(b, a)
        };
        b.implementation = a;
        return b
    };
    S.di = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.Wa().ja(b, a, d)
        };
        b.implementation = a;
        return b
    };
    S[53] = S.ci(function(a) {
        return this.jd(a, 1).getUint8(a)
    });
    S[54] = S.ci(function(a) {
        return this.jd(a, 2).getUint16(a, !0)
    });
    S[55] = S.ci(function(a) {
        return this.jd(a, 4).getInt32(a, !0)
    });
    S[56] = S.ci(function(a) {
        return this.jd(a, 4).getFloat32(a, !0)
    });
    S[57] = S.ci(function(a) {
        return this.jd(a, 8).getFloat64(a, !0)
    });
    S[58] = S.di(function(a, b) {
        this.jd(a, 1).setUint8(a, b)
    });
    S[59] = S.di(function(a, b) {
        this.jd(a, 2).setUint16(a, b, !0)
    });
    S[60] = S.di(function(a, b) {
        this.jd(a, 4).setUint32(a, b, !0)
    });
    S[61] = S.di(function(a, b) {
        this.jd(a, 4).setFloat32(a, b, !0)
    });
    S[62] = S.di(function(a, b) {
        this.jd(a, 8).setFloat64(a, b, !0)
    });
    S[80] = function() {
        this.Ba(this.pop() + "<<31>>31")
    };
    S[81] = function() {
        this.Ba(this.pop() + "<<24>>24")
    };
    S[82] = function() {
        this.Ba(this.pop() + "<<16>>16")
    };
    S.ei = function(a) {
        var b = function() {};
        b.ma = a;
        return b
    };
    S[2] = S.ei();
    S[9] = S.ei();
    S[239] = S.ei(function(a) {
        return [a.ie(), a.Dg(), a.ie(), a.Dg()]
    });
    S[241] = S.ei(hm);
    S[240] = S.ei(hm);
    S.we = function(a, b, c) {
        var d = function() {};
        d.implementation = a;
        d.yc = c;
        return S[b] = d
    };
    S.Cq = S.we(vn.prototype.We, 256, vn);
    S.Ep = S.we(function(a, b, c) {
        return new Yn(this, a, b, c)
    }, 258, vn);
    S.Ro = S.we(function(a) {
        var b = this;
        return function() {
            di(55);
            var c = bi;
            bi = "";
            var d = Ze;
            Ze = b.ya;
            try {
                var e = a.apply(this, arguments);
                --ci;
                return e
            } catch (f) {
                ei(f)
            } finally {
                bi = c, Ze = d
            }
        }
    }, 257);
    S.Ol = S.we(function(a) {
        for (var b, c = function() {
                b = arguments
            }, d, e = 0;;) try {
            return a(c, e, d)
        } catch (f) {
            e = Zn(f, b), d = f.value
        }
    }, 259);
    S.Cp = S.we(function(a, b, c, d, e) {
        return a.length > b ? this.Wq(a[b], c) : this.Xp(d, e)
    }, 260, vn);
    S.Dp = S.we(Im.prototype.aw, 261, Im);
    S.mp = S.we(function() {}, 262);
    S.Iv = S.we(function() {}, 263);
    var xn = function(a, b, c) {
        this.source = "";
        this.So = a;
        this.Yo = b;
        this.bg = c;
        this.xj = {};
        this.Qo = [];
        this.fg = this.ib = 0
    };
    q(xn, fi);
    g = xn.prototype;
    g.hg = function(a, b) {
        var c = this.So[a];
        return this.pl(c, b) ? c.Ki : -1
    };
    g.pl = function(a, b) {
        return a && k(a.Ki) ? (this.Qo.push({
            Io: a,
            stack: k(b) ? b : this.ib,
            Dt: this.fg
        }), !0) : !1
    };
    g.Wu = function(a) {
        return String(a)
    };
    g.Ue = function(a) {
        return "handler" + a
    };
    g.register = function(a) {
        return "r" + a
    };
    g.stack = function(a) {
        return "s" + (this.ib - a - 1)
    };
    g.push = function() {
        return this.tj("s" + this.ib++)
    };
    g.pop = function() {
        return "s" + --this.ib
    };
    g.be = function(a) {
        for (var b = "[", c = this.ib -= a; 0 < a; ++c, --a) b += "s" + c, 1 < a && (b += ",");
        return b + "]"
    };
    g.fe = function(a) {
        var b = this.bg.multinames[a];
        return this.Ri(S.Cq) + "(" + this.Wu(a) + b.compile(this) + ")"
    };
    g.Wa = function() {
        this.append(this.push() + "=");
        return this
    };
    g.Ba = function(a) {
        this.append(this.push() + "=" + a + ";");
        return this
    };
    g.scope = function(a) {
        return k(a) ? "scope" + a : this.fg ? "scope" + (this.fg - 1) : "scope"
    };
    g.Iw = function() {
        this.fg--
    };
    g.Vt = function() {
        this.append(this.tj("scope" + this.fg++) + "=");
        return this
    };
    g.Vs = function(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b],
                d = this.hg(c.target, 1);
            this.append("var " + this.Ue(b) + "=");
            this.ja(S.Ep, c.excType, c.varName, d)
        }
    };
    g.Us = function(a) {
        var b = a.params || [],
            c = a.optionals || [],
            d = b.length - c.length;
        this.append("function(");
        for (var e = 0; e < b.length;) 0 < e && this.append(","), this.append(this.register(++e));
        this.append("){");
        for (e = 0; e < b.length; ++e) {
            var f = b[e];
            if (e >= d) {
                var h = c[e - d];
                this.append(this.register(e + 1) + "=");
                this.ja(S.Cp, "arguments", e, f, this.Pt(h.kind), h.value)
            } else f && (this.append(this.register(e + 1) + "="), this.ja(S.pe, this.register(e + 1), f))
        }
        this.append("var " + this.register(0) + "=scope").vh(S.Dp, "this");
        for (null != a.arguments &&
            this.append("," + this.register(++e) + "=Array.prototype.slice.call(arguments," + a.arguments + ")"); ++e < a.locals;) this.append("," + this.register(e));
        this.append(";")
    };
    g.tj = function(a) {
        this.xj[a] = !0;
        return a
    };
    g.Gt = function(a) {
        this.xj[a] = !1
    };
    g.Et = function() {
        var a = !1,
            b;
        for (b in this.xj) this.xj[b] && (this.append((a ? ", " : "var ") + b), a = !0);
        a && this.append(";")
    };
    g.Jt = function(a) {
        this.append("katch(");
        for (var b = 0; b < a.length; ++b) 0 < b && this.append(","), this.append(this.Ue(a[b]));
        this.append(");")
    };
    g.Ft = function(a) {
        this.ib = a.stack;
        this.fg = a.Dt;
        var b = 0;
        for (a = a.Io; a;) {
            b++;
            a.Ui && this.Jt(a.Ui);
            var c = a.Ri;
            c.mb && (b = 0);
            c.apply(this, a.args);
            a = a.next;
            if (this.pl(a)) break
        }
        return this.Ko()
    };
    g.Ts = function(a) {
        var b = [],
            c = this.Ko();
        this.pl(this.So[0]);
        for (var d, e = 0; d = this.Qo.pop(); e++) {
            var f = d.Io.Ki;
            b[f] || (b[f] = this.Ft(d))
        }
        this.append(c);
        c = 1 < e;
        if (a = !!a.length) this.append("return ").gl(S.Ol), this.append("(function(katch,j,s0){"), this.Gt("s0");
        this.Et();
        c && (this.append(a ? "for(;;){" : "for(var j=0;;){"), this.ja(S.mp), this.append("switch(j){"));
        for (d = 0; d < b.length; ++d) b[d] && (c && this.append("case " + d + ":"), this.append(b[d]));
        c && this.append("default:return;}}");
        a && this.append("});")
    };
    var V = function(a, b, c) {
            Object.defineProperty(this, "__swiffy_v", {
                value: a
            });
            c && bo(this, 0);
            O(this, "fixed", "Boolean", !!b);
            Object.defineProperty(this, "length", {
                get: function() {
                    return this.__swiffy_v.length
                },
                set: function(a) {
                    a = Q(a, "uint");
                    if (this.fixed) throw J(1126);
                    var b = this.__swiffy_v.length;
                    this.__swiffy_v.length = a;
                    bo(this, b)
                }
            })
        },
        co = function(a) {
            return a.__swiffy_classdef.__swiffy_v.ek ? 0 : null
        },
        bo = function(a, b) {
            for (var c = a.__swiffy_v, d = co(a); b < c.length; b++) c[b] = d
        },
        eo = function(a, b, c) {
            if (null == b) return co(a);
            a = a.__swiffy_classdef.__swiffy_v;
            return !a.type || c && !a.ek ? b : rn(b, a.type)
        },
        fo = function(a, b) {
            var c = Object.create(a.prototype);
            V.call(c, b || []);
            return c
        };
    V.prototype = Object.create(bn.prototype);
    var go = function(a, b) {
            var c = function(a) {
                if (dn(a, c)) return a;
                if (null == a || Object(a) !== a) throw J(1034, qm(a), c.__swiffy_name);
                var b = fo(c);
                a instanceof V && (a = a.__swiffy_v);
                if (da(a))
                    for (var f = b.__swiffy_v, h = 0; h < a.length; h++) f[h] = eo(b, a[h]);
                return b
            };
            Object.defineProperty(c, "__swiffy_v", {
                value: {
                    type: a,
                    ek: b
                }
            });
            return c
        },
        ho = function() {
            return function(a, b) {
                a = Q(a, "uint", 0);
                b = Q(b, "Boolean", !1);
                V.call(this, Array(a), b, !0)
            }
        },
        io = new om("__AS3__.vec", "Vector", !1),
        ko = function(a, b, c, d) {
            d = d || km.prototype;
            var e = (new vm(io)).wq(a &&
                    a.__swiffy_name).xq(),
                f = d[e];
            f || (f = nn(ho(), e, {
                Ve: go(a, b),
                su: en,
                Wi: c ? V : jo
            }), d[e] = f);
            return f
        },
        lo = function(a, b, c) {
            a = ko(a && km.prototype[a], b, !0);
            lm(io + "$" + c, a);
            return a
        },
        jo = lo(null, !1, "object");
    lo("int", !0, "int");
    var mo = lo("uint", !0, "uint"),
        no = lo("Number", !0, "double"),
        oo = N(function() {
            throw J(1007);
        }, io);
    Object.defineProperty(oo, "__swiffy_type_apply", {
        value: function(a, b) {
            if (1 != b.length) throw "PANIC! Wrong number of vector type parameters";
            return ko(b[0], !1, !1, a)
        }
    });
    Object.defineProperty(V.prototype, "__swiffy_proxy", {
        value: {
            rg: function(a, b) {
                var c = a.Mh(1069, this),
                    d = this.__swiffy_v;
                if (c >= d.length) throw J(1125, c, d.length);
                c = d[c];
                if (!m(c)) throw J(1006);
                return c.apply(this, b)
            },
            vc: function(a) {
                return !a.zb(this)
            },
            Fd: function(a) {
                a = a.Mh(1069, this);
                var b = this.__swiffy_v;
                if (a >= b.length) throw J(1125, a, b.length);
                return b[a]
            },
            mf: function(a) {
                return a.Rc() < this.__swiffy_v.length
            },
            Gg: function(a) {
                return a - 1
            },
            tf: function(a) {
                return ++a > this.__swiffy_v.length ? 0 : a
            },
            Hg: function(a) {
                return this.__swiffy_v[a -
                    1]
            },
            setProperty: function(a, b) {
                var c = a.Mh(1056, this),
                    d = this.__swiffy_v;
                if (c > d.length || c == d.length && this.fixed) throw J(1125, c, d.length);
                d[c] = eo(this, b)
            }
        }
    });
    var po = function(a, b, c) {
            if (!dn(c, a)) throw J(1034, qm(c), a.__swiffy_name);
            b.push.apply(b, c.__swiffy_v)
        },
        qo = function(a, b, c, d) {
            if (null != b) {
                b = Q(b, "Function");
                for (var e = a.__swiffy_v, f = 0; f < e.length; f++) {
                    var h = e[f],
                        l = b.call(c, h, f, a);
                    if (d && d.call(a, l, h)) return !1
                }
            }
            return !0
        },
        ro = function(a, b, c, d) {
            if (a.fixed) throw J(1126);
            var e = a.__swiffy_v,
                f = d.length;
            c = [b, c];
            c.length += f;
            c = e.splice.apply(e, c);
            var h = 0;
            try {
                for (; 0 < f; h++, b++, f--) e[b] = eo(a, d[h])
            } finally {
                for (a = co(a); 0 < f; b++, f--) e[b] = a
            }
            return c
        };
    V.prototype.concat = function(a) {
        var b = this.__swiffy_classdef,
            c = this.__swiffy_v.slice();
        if (10 < Ze.c.Od)
            for (var d = 0; d < arguments.length; d++) po(b, c, arguments[d]);
        else
            for (d = arguments.length - 1; 0 <= d; d--) po(b, c, arguments[d]);
        return fo(b, c)
    };
    T(V.prototype, "concat");
    V.prototype.every = function(a, b) {
        return qo(this, a, b, function(a) {
            return !a
        })
    };
    T(V.prototype, "every");
    V.prototype.filter = function(a, b) {
        var c = [];
        qo(this, a, b, function(a, b) {
            a && c.push(b)
        });
        return fo(this.__swiffy_classdef, c)
    };
    T(V.prototype, "filter");
    V.prototype.forEach = function(a, b) {
        qo(this, a, b)
    };
    T(V.prototype, "forEach");
    V.prototype.indexOf = function(a, b) {
        a = eo(this, a, !0);
        b = Q(b, "int", 0);
        return this.__swiffy_v.indexOf(a, b)
    };
    T(V.prototype, "indexOf");
    V.prototype.join = function(a) {
        a = Q(a, "String", ",");
        return this.__swiffy_v.join(a)
    };
    T(V.prototype, "join");
    V.prototype.lastIndexOf = function(a, b) {
        a = eo(this, a, !0);
        b = Q(b, "int", 2147483647);
        return this.__swiffy_v.lastIndexOf(a, b)
    };
    T(V.prototype, "lastIndexOf");
    V.prototype.map = function(a, b) {
        var c = [];
        qo(this, a, b, function(a) {
            c.push(eo(this, a))
        });
        return fo(this.__swiffy_classdef, c)
    };
    T(V.prototype, "map");
    V.prototype.pop = function() {
        if (this.fixed) throw J(1126);
        var a = this.__swiffy_v;
        return a.length ? a.pop() : this.__swiffy_classdef.__swiffy_v.ek ? 0 : void 0
    };
    T(V.prototype, "pop");
    V.prototype.push = function(a) {
        var b = this.__swiffy_v;
        ro(this, b.length, 0, arguments);
        return b.length
    };
    T(V.prototype, "push");
    V.prototype.reverse = function() {
        this.__swiffy_v.reverse();
        return this
    };
    T(V.prototype, "reverse");
    V.prototype.shift = function() {
        if (this.fixed) throw J(1126);
        var a = this.__swiffy_v;
        return a.length ? a.shift() : this.__swiffy_classdef.__swiffy_v.ek ? 0 : void 0
    };
    T(V.prototype, "shift");
    V.prototype.slice = function(a, b) {
        a = Q(a, "int", 0);
        b = Q(b, "int", 16777215);
        return fo(this.__swiffy_classdef, this.__swiffy_v.slice(a, b))
    };
    T(V.prototype, "slice");
    V.prototype.some = function(a, b) {
        return !qo(this, a, b, function(a) {
            return a
        })
    };
    T(V.prototype, "some");
    V.prototype.sort = function(a) {
        this.__swiffy_v.sort(a);
        return this
    };
    T(V.prototype, "sort");
    V.prototype.splice = function(a, b, c) {
        a = Q(a, "int");
        b = Q(b, "uint");
        c = Array.prototype.slice.call(arguments, 2);
        return fo(this.__swiffy_classdef, ro(this, a, b, c))
    };
    T(V.prototype, "splice");
    V.prototype.toLocaleString = function() {
        return this.toString()
    };
    V.prototype.unshift = function(a) {
        ro(this, 0, 0, arguments);
        return this.__swiffy_v.length
    };
    T(V.prototype, "unshift");
    V.prototype.toString = function() {
        return this.__swiffy_v.join(",")
    };
    var vo = function(a) {
            if (a instanceof so) return a = to.call(a, 1088), uo.copy.call(a);
            if (a instanceof vo) return uo.copy.call(a);
            if (null != a) {
                a = Q(a, "String");
                a = new he(a, $n.ignoreWhitespace, !1);
                var b = wo(a);
                b || (b = new xo(null, ""));
                if (yo(a)) throw J(1088);
                return b.me
            }
            return (new xo(null, "")).me
        },
        $n = function(a) {
            return a instanceof vo ? a : a instanceof so ? to.call(a, 1088) : new vo(a)
        };
    nn(vo, "XML", {
        Ve: $n,
        Rj: vo
    });
    O($n, "ignoreComments", "Boolean", !0);
    O($n, "ignoreProcessingInstructions", "Boolean", !0);
    O($n, "ignoreWhitespace", "Boolean", !0);
    O($n, "prettyIndent", "int", 2);
    O($n, "prettyPrinting", "Boolean", !0);
    var zo = function(a) {
        return 0 == a.Rc() || this.__swiffy_v.vm(a)
    };
    Object.defineProperty(vo.prototype, "__swiffy_proxy", {
        value: {
            rg: function(a, b) {
                var c = uo[a];
                if (m(c)) return c.apply(this, b);
                c = String.prototype[a];
                if (m(c) && this.__swiffy_v.Yj()) return c.apply(this.toString(), b);
                throw J(1006, "value");
            },
            vc: function() {
                return !1
            },
            Xj: function(a) {
                a = this.__swiffy_v.Ag([], a, !1);
                return Ao(a)
            },
            Fd: function(a) {
                if (0 == a.Rc()) return this;
                a = this.__swiffy_v.rf([], a);
                return Ao(a)
            },
            setProperty: function(a) {
                if (k(a.Rc())) throw J(1087);
            },
            mf: zo,
            Gg: function() {
                return "0"
            },
            tf: function(a) {
                return 0 ==
                    a ? 1 : 0
            },
            Hg: function() {
                return this
            }
        }
    });
    vo.prototype.hasOwnProperty = function(a) {
        return zo.call(this, Bo(a))
    };
    vo.prototype.toString = function() {
        return this.__swiffy_v.Gd(!1)
    };
    vo.prototype.valueOf = function() {
        return this
    };
    vo.prototype.toJSON = function() {
        return "XML"
    };
    var uo = {
        addNamespace: function() {
            R(this, "addNamespace");
            return this
        },
        appendChild: function(a) {
            R(this, "appendChild");
            Q(a, "Object");
            return this
        },
        attribute: function(a) {
            a = Bo(a);
            a = this.__swiffy_v.rf([], a, !0);
            return Ao(a)
        },
        attributes: function() {
            var a = this.__swiffy_v.Hm([]);
            return Ao(a)
        },
        child: function(a) {
            Q(a, "Object");
            R(this, "child");
            return Ao([])
        },
        childIndex: function() {
            return this.__swiffy_v.yg()
        },
        children: function() {
            var a = this.__swiffy_v.Im([]);
            return Ao(a)
        },
        comments: function() {
            R(this, "comments");
            return Ao([])
        },
        contains: function(a) {
            Q(a, "XML");
            R(this, "contains");
            return !1
        },
        copy: function() {
            return this.__swiffy_v.Kb(null).me
        }
    };
    $n.defaultSettings = function() {
        return {
            ignoreComments: !0,
            ignoreProcessingInstructions: !0,
            ignoreWhitespace: !0,
            prettyIndent: 2,
            prettyPrinting: !0
        }
    };
    uo.descendants = function(a) {
        a = Bo(a, "*");
        a = this.__swiffy_v.Ag([], a, !0);
        return Ao(a)
    };
    uo.elements = function(a) {
        a = Bo(a, "*");
        a = this.__swiffy_v.rf([], a, !1);
        return Ao(a)
    };
    uo.hasComplexContent = function() {
        return this.__swiffy_v.Rh()
    };
    uo.hasSimpleContent = function() {
        return this.__swiffy_v.Yj()
    };
    uo.inScopeNamespaces = function() {
        R(this, "inScopeNamespaces");
        return []
    };
    uo.insertChildAfter = function(a, b) {
        Q(a, "Object");
        Q(b, "Object");
        R(this, "insertChildAfter")
    };
    uo.insertChildBefore = function(a, b) {
        Q(a, "Object");
        Q(b, "Object");
        R(this, "insertChildBefore")
    };
    uo.length = function() {
        return 1
    };
    uo.localName = function() {
        var a = this.__swiffy_v.name;
        return a ? a.localName : null
    };
    uo.name = function() {
        return this.__swiffy_v.name
    };
    uo.namespace = function(a) {
        Q(a, "String", "null");
        R(this, "namespace");
        return null
    };
    uo.namespaceDeclarations = function() {
        R(this, "namespaceDeclarations");
        return []
    };
    uo.nodeKind = function() {
        return this.__swiffy_v.te
    };
    uo.normalize = function() {
        R(this, "normalize");
        return this
    };
    uo.parent = function() {
        var a = this.__swiffy_v;
        if (a.parent) return a.parent.me
    };
    uo.prependChild = function(a) {
        Q(a, "Object");
        R(this, "prependChild");
        return this
    };
    uo.processingInstructions = function(a) {
        Q(a, "String", "*");
        R(this, "processingInstructions");
        return Ao([])
    };
    uo.propertyIsEnumerable = function(a) {
        return "0" == Bo(a).Rc()
    };
    uo.removeNamespace = function(a) {
        Q(a, "Namespace");
        R(this, "removeNamespace");
        return this
    };
    uo.replace = function(a, b) {
        Q(a, "Object");
        Q(b, "XML");
        R(this, "replace");
        return this
    };
    uo.setChildren = function(a) {
        Q(a, "Object");
        R(this, "setChildren");
        return this
    };
    uo.setLocalName = function(a) {
        Q(a, "String");
        R(this, "setLocalName")
    };
    uo.setName = function(a) {
        Q(a, "String");
        R(this, "setName")
    };
    uo.setNamespace = function(a) {
        Q(a, "Namespace");
        R(this, "setNamespace")
    };
    $n.setSettings = function(a) {
        ia(a) || (a = vo.defaultSettings());
        ga(a.ignoreComments) && ($n.ignoreComments = a.ignoreComments);
        ga(a.ignoreProcessingInstructions) && ($n.ignoreProcessingInstructions = a.ignoreProcessingInstructions);
        ga(a.ignoreWhitespace) && ($n.ignoreWhitespace = a.ignoreWhitespace);
        ha(a.prettyIndent) && ($n.prettyIndent = a.prettyIndent);
        ga(a.prettyPrinting) && ($n.prettyPrinting = a.prettyPrinting)
    };
    $n.settings = function() {
        return {
            ignoreComments: vo.ignoreComments,
            ignoreProcessingInstructions: $n.ignoreProcessingInstructions,
            ignoreWhitespace: vo.ignoreWhitespace,
            prettyIndent: vo.prettyIndent,
            prettyPrinting: vo.prettyPrinting
        }
    };
    uo.text = function() {
        var a = this.__swiffy_v.Jm([], "text");
        return Ao(a)
    };
    uo.toXMLString = function() {
        return this.__swiffy_v.Gd(!0)
    };
    var Co = function(a) {
        this.me = Object.create(vo.prototype);
        Object.defineProperty(this.me, "__swiffy_v", {
            value: this
        });
        this.parent = a
    };
    g = Co.prototype;
    g.name = null;
    g.namespaces = null;
    g.attributes = null;
    g.children = null;
    g.value = null;
    g.Ej = function(a, b) {
        b.push(this.Gd(a));
        return a
    };
    g.Rh = function() {
        return !1
    };
    g.Yj = function() {
        return !this.Rh()
    };
    g.yg = function() {
        if (this.parent)
            for (var a = 0; a < this.parent.children.length; a++)
                if (this.parent.children[a] == this) return a;
        return -1
    };
    g.zg = function(a, b) {
        return !b && !a.Ma && "*" == a.localName
    };
    g.vm = function() {
        return !1
    };
    g.rf = function(a) {
        return a
    };
    g.Ag = function(a) {
        return a
    };
    g.Hm = function(a) {
        return a
    };
    g.Im = function(a) {
        return a
    };
    g.Jm = function(a) {
        return a
    };
    var Fn = function(a, b, c) {
        Co.call(this, a);
        this.name = b;
        this.namespaces = c || [];
        this.attributes = [];
        this.children = []
    };
    q(Fn, Co);
    g = Fn.prototype;
    g.te = "element";
    g.Gd = function(a) {
        var b = [];
        a = this.Ej(a, b);
        return Do(b, a)
    };
    g.Ej = function(a, b, c) {
        a = a || this.Rh();
        if (!a) {
            for (a = 0; a < this.children.length; a++) this.children[a].Ej(!1, b);
            return !1
        }
        c = new Eo(c);
        for (a = 0; a < this.namespaces.length; a++) c.Rp(this.namespaces[a]);
        var d = c.eq(this.name),
            e = "<" + d;
        for (a = 0; a < this.attributes.length; a++) var f = this.attributes[a],
            e = e + (" " + c.eq(f.name) + '="' + ae(f.value) + '"');
        e += c.gu();
        if (0 == this.children.length) b.push(e + "/>");
        else if (1 == this.children.length && "text" == this.children[0].te) b.push(e + ">" + this.children[a].Gd(!0) + "</" + d + ">");
        else {
            f = [];
            for (a =
                0; a < this.children.length; a++) this.children[a].Ej(!0, f, c);
            b.push(e + ">");
            b.push(f);
            b.push("</" + d + ">")
        }
        return !0
    };
    g.Rh = function() {
        for (var a = 0; a < this.children.length; a++)
            if (this.children[a] instanceof Fn) return !0;
        return !1
    };
    g.Kb = function(a) {
        a = new Fn(a, this.name, this.namespaces.slice());
        for (var b = 0; b < this.attributes.length; b++) a.attributes.push(this.attributes[b].Kb(a));
        for (b = 0; b < this.children.length; b++) a.children.push(this.children[b].Kb(a));
        return a
    };
    g.zg = function(a) {
        if (a.Ma) return !1;
        if ("*" == a.localName) return !0;
        var b = this.name.__swiffy_v;
        return a.localName == b.localName && a.uri == b.uri
    };
    g.vm = function(a) {
        for (var b = a.Ma ? this.attributes : this.children, c = 0; c < b.length; c++)
            if (b[c].zg(a, !1)) return !0;
        return !1
    };
    g.rf = function(a, b, c) {
        var d = k(c);
        c = (c = d ? c : b.Ma) ? this.attributes : this.children;
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            f.zg(b, d) && a.push(f)
        }
        return a
    };
    g.Ag = function(a, b, c) {
        if (b.Ma)
            for (var d = 0; d < this.attributes.length; d++) {
                var e = this.attributes[d];
                e.zg(b, c) && a.push(e)
            }
        for (d = 0; d < this.children.length; d++) e = this.children[d], e.zg(b, c) && a.push(e), e.Ag(a, b, c);
        return a
    };
    g.Hm = function(a) {
        for (var b = 0; b < this.attributes.length; b++) a.push(this.attributes[b]);
        return a
    };
    g.Im = function(a) {
        for (var b = 0; b < this.children.length; b++) a.push(this.children[b]);
        return a
    };
    g.Jm = function(a, b) {
        for (var c = 0; c < this.children.length; c++) {
            var d = this.children[c];
            d.te == b && a.push(d)
        }
        return a
    };
    g.Ac = function(a, b) {
        this.attributes.push(new Fo(this, a, b));
        return this
    };
    g.af = function(a) {
        a = new Fn(this, a, []);
        this.children.push(a);
        return a
    };
    var Fo = function(a, b, c) {
        Co.call(this, a);
        this.name = b;
        this.value = c
    };
    q(Fo, Co);
    g = Fo.prototype;
    g.te = "attribute";
    g.Gd = function(a) {
        return a ? ae(this.value) : this.value
    };
    g.Kb = function(a) {
        return new Fo(a, this.name, this.value)
    };
    g.yg = function() {
        return -1
    };
    g.zg = function(a, b) {
        if ("*" == a.localName) return !0;
        var c = this.name.__swiffy_v;
        return a.localName == c.localName && (b && !c.uri || a.uri == c.uri)
    };
    var xo = function(a, b) {
        Co.call(this, a);
        this.value = b
    };
    q(xo, Co);
    xo.prototype.te = "text";
    xo.prototype.Gd = function(a) {
        return a ? $d(this.value) : this.value
    };
    xo.prototype.Kb = function(a) {
        return new xo(a, this.value)
    };
    var Go = function(a, b) {
        Co.call(this, a);
        this.value = b
    };
    q(Go, Co);
    Go.prototype.te = "text";
    Go.prototype.Gd = function(a) {
        return a ? "<![CDATA[" + this.value + "]]\x3e" : this.value
    };
    Go.prototype.Kb = function(a) {
        return new Go(a, this.value)
    };
    var Bo = function(a, b) {
            if (a instanceof nm) return a.__swiffy_v;
            a = Q(a, "String", b);
            var c = "@" == a.charAt(0);
            c && (a = a.substring(1));
            return new om("", a, c)
        },
        yo = function(a) {
            try {
                return a.next()
            } catch (b) {
                switch (b.type) {
                    case "tag":
                    case "close":
                        throw J(1090);
                    case "cdata":
                        throw J(1091);
                    case "comment":
                        throw J(1094);
                    case "processing_instruction":
                        throw J(1097);
                    case "attribute":
                        throw J(1095);
                    default:
                        throw b;
                }
            }
        },
        Ho = function(a, b) {
            for (var c = new wc, d = 0; d < a.length;) {
                var e = a[d],
                    f = e.name.match(/^xmlns(?::(.*))?$/);
                f ? (c.set(f[1] ||
                    "", e.value), a.splice(d, 1)) : d++
            }
            b || !bi || c.Ed("") || c.set("", bi);
            this.Wp = c;
            this.Ca = b
        };
    Ho.prototype.resolve = function(a, b, c) {
        if (!k(c)) {
            var d = b.indexOf(":");
            c = 0 <= d ? b.substring(0, d) : "";
            b = 0 <= d ? b.substring(d + 1) : b
        }
        if (a && !c) return Bn("", b, !0);
        d = this.Wp.get(c);
        if (k(d)) return Bn(d, b, a);
        if (this.Ca) return this.Ca.resolve(a, b, c);
        if (c) throw J(1083, c, b);
        return Bn("", b, !1)
    };
    Ho.prototype.rw = function() {
        return this.Wp.map(function(a, b) {
            return new An(b, a)
        })
    };
    var wo = function(a, b, c, d) {
            for (var e = c || null, f; f = yo(a);) switch (f.type) {
                case "tag":
                    c = f.attributes;
                    b = new Ho(c, b);
                    e = new Fn(e, b.resolve(!1, f.value), b.rw());
                    for (d = 0; d < c.length; d++) {
                        var h = c[d];
                        e.attributes.push(new Fo(e, b.resolve(!0, h.name), h.value))
                    }
                    for (;;) {
                        c = wo(a, b, e, f.value);
                        if (!c) return e;
                        e.children.push(c)
                    }
                case "close":
                    if (e) {
                        if (d != f.value) throw a = e.name.localName, J(1085, a, a);
                        return null
                    }
                    throw J(1088);
                case "text":
                    return new xo(e || null, f.value);
                case "cdata":
                    return new Go(e || null, f.value)
            }
            if (!c) return null;
            a = e.name.localName;
            throw J(1085, a, a);
        },
        Eo = function(a) {
            this.Pj = [];
            this.ue = (this.um = !k(a)) ? {} : a.ue
        };
    Eo.prototype.Yu = function() {
        if (!this.um) {
            var a = {},
                b;
            for (b in this.ue) a[b] = this.ue[b];
            this.ue = a;
            this.um = !0
        }
    };
    Eo.prototype.Rp = function(a) {
        var b = a.prefix || "",
            c = a.uri,
            d = this.ue[c];
        d != b && (void 0 === d && (this.Yu(), this.ue[c] = b), this.Pj.push(a))
    };
    Eo.prototype.eq = function(a) {
        var b = a.uri;
        a = a.localName;
        if (!b) return a;
        var c = this.ue[b];
        if (!c) {
            for (var c = "", d = 0; c in this.ue; d++) c = String.fromCharCode(97 + d / 17576) + String.fromCharCode(97 + d / 17576 % 26) + String.fromCharCode(97 + d / 676 % 26) + String.fromCharCode(97 + d / 26 % 26);
            this.Rp(new An(c, b))
        }
        return c ? c + ":" + a : a
    };
    Eo.prototype.gu = function() {
        for (var a = "", b = 0; b < this.Pj.length; b++) {
            var a = a + " xmlns",
                c = this.Pj[b],
                d = c.prefix;
            d && (a += ":" + d);
            a += '="' + ae(c.uri) + '"'
        }
        this.Pj = [];
        return a
    };
    var Do = function(a, b) {
        b = b && $n.prettyPrinting;
        var c = "";
        if (b)
            for (var d = $n.prettyIndent; 0 < d; d--) c += " ";
        var e = [],
            f = function(a, d) {
                for (var n = 0; n < a.length; n++)
                    if (da(a[n])) f(a[n], d + c);
                    else if (b)
                    for (var r = a[n].trim().split(/\n/), t = 0; t < r.length; t++) e.push(d + r[t]);
                else e.push(a[n])
            };
        f(a, "");
        return e.join(b ? "\n" : "")
    };
    var so = function(a) {
            if (a instanceof vo) a = [a.__swiffy_v];
            else if (a instanceof so) a = a.__swiffy_v.slice();
            else if (null != a && "" != a) {
                a = Q(a, "String");
                a = new he(a, $n.ignoreWhitespace, !1);
                for (var b, c = []; b = wo(a);) c.push(b);
                a = c
            } else a = [];
            return Ao(a)
        },
        ao = function(a) {
            return a instanceof so ? a : new so(a)
        };
    nn(so, "XMLList", {
        Ve: ao,
        Rj: so
    });
    var Io = function(a) {
        for (var b = this.__swiffy_v, c = a.Rc() < b.length, d = 0; !c && d < b.length; d++) c = b[d].vm(a);
        return c
    };
    Object.defineProperty(so.prototype, "__swiffy_proxy", {
        value: {
            rg: function(a, b) {
                var c = Jo[a];
                if (m(c)) return c.apply(this, b);
                c = uo[a];
                if (m(c)) {
                    var d = to.call(this, 1086, a);
                    return c.apply(d, b)
                }
                c = String.prototype[a];
                if (m(c) && (d = to.call(this, 1086, a), d.__swiffy_v.Yj())) return c.apply(d.toString(), b);
                throw J(1006, "value");
            },
            vc: function() {
                return !1
            },
            Xj: function(a) {
                for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++) b[d].Ag(c, a, !1);
                return Ao(c)
            },
            Fd: function(a) {
                var b = this.__swiffy_v,
                    c = a.Rc();
                if (k(c)) return Ko(b[c]);
                for (var c = [], d = 0; d < b.length; d++) b[d].rf(c, a);
                return Ao(c)
            },
            setProperty: function(a, b) {
                var c = this.__swiffy_v,
                    d = a.Rc();
                k(d) && (d > c.length && (d = c.length), b instanceof vo && (c[d] = b.__swiffy_v))
            },
            mf: Io,
            Gg: function(a) {
                return String(a - 1)
            },
            tf: function(a) {
                return ++a > this.__swiffy_v.length ? 0 : a
            },
            Hg: function(a) {
                return Ko(this.__swiffy_v[a - 1])
            }
        }
    });
    so.prototype.hasOwnProperty = function(a) {
        return Io.call(this, Bo(a))
    };
    so.prototype.toString = function() {
        if (Jo.hasComplexContent.call(this)) return Jo.toXMLString.call(this);
        for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++) b.push(a[c].Gd(!1));
        return b.join("")
    };
    so.prototype.valueOf = function() {
        return this
    };
    so.prototype.toJSON = function() {
        return "XMLList"
    };
    var Jo = {
            attribute: function(a) {
                a = Bo(a);
                for (var b = this.__swiffy_v, c = 0; c < b.length; c++) b[c].rf([], a, !0);
                return Ao([])
            },
            attributes: function() {
                for (var a = [], b = this.__swiffy_v, c = 0; c < b.length; c++) b[c].Hm(a);
                return Ao(a)
            },
            child: function(a) {
                Q(a, "Object");
                R(this, "child");
                return Ao([])
            },
            children: function() {
                for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++) a[c].Im(b);
                return Ao(b)
            },
            comments: function() {
                R(this, "comments");
                return Ao([])
            },
            contains: function(a) {
                Q(a, "XML");
                R(this, "contains");
                return !1
            },
            copy: function() {
                R(this,
                    "copy");
                return Ao([])
            },
            descendants: function(a) {
                a = Bo(a, "*");
                for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++) b[d].Ag(c, a, !0);
                return Ao(c)
            },
            elements: function(a) {
                a = Bo(a, "*");
                for (var b = this.__swiffy_v, c = [], d = 0; d < b.length; d++) b[d].rf(c, a, !1);
                return Ao(c)
            },
            hasComplexContent: function() {
                var a = this.__swiffy_v;
                if (0 == a.length) return !1;
                if (1 == a.length) return a[0].Rh();
                for (var b = 0; b < a.length; b++)
                    if ("element" == a[b].te) return !0;
                return !1
            },
            hasSimpleContent: function() {
                var a = this.__swiffy_v;
                if (0 == a.length) return !0;
                if (1 == a.length) return a[0].Yj();
                for (var b = 0; b < a.length; b++)
                    if ("element" == a[b].te) return !1;
                return !0
            },
            length: function() {
                return this.__swiffy_v.length
            },
            normalize: function() {
                R(this, "normalize");
                return Ao([])
            },
            parent: function() {
                var a = this.__swiffy_v;
                if (a.length) {
                    for (var b = a[0].parent, c = 1; b && c < a.length; c++)
                        if (a[c].parent != b) return;
                    return Ko(b)
                }
            },
            processingInstructions: function(a) {
                Q(a, "String", "*");
                R(this, "processingInstructions");
                return Ao([])
            },
            propertyIsEnumerable: function(a) {
                var b = this.__swiffy_v;
                return Bo(a).Rc() <
                    b.length
            },
            text: function() {
                for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++) a[c].Jm(b, "text");
                return Ao(b)
            },
            toXMLString: function() {
                for (var a = this.__swiffy_v, b = [], c = 0; c < a.length; c++) b.push(a[c].Gd(!0));
                return b.join("\n")
            }
        },
        Ao = function(a) {
            var b = Object.create(so.prototype);
            Object.defineProperty(b, "__swiffy_v", {
                value: a
            });
            return b
        },
        to = function(a, b) {
            var c = this.__swiffy_v;
            if (1 == c.length) return c[0].me;
            throw J.apply(null, arguments);
        },
        Ko = function(a) {
            return a ? a.me : void 0
        };
    N(function() {
        O(this, "description", "String", "");
        O(this, "forceSimple", "Boolean", !1);
        O(this, "name", "String", "");
        O(this, "noAutoLabeling", "Boolean", !1);
        O(this, "shortcut", "String", "");
        O(this, "silent", "Boolean", !1)
    }, "flash.accessibility.AccessibilityProperties");
    var Lo = N(function() {}, "flash.display.BitmapDataChannel");
    Object.defineProperties(Lo, {
        ALPHA: {
            value: 8
        },
        BLUE: {
            value: 4
        },
        GREEN: {
            value: 2
        },
        RED: {
            value: 1
        }
    });
    var Mo = N(function() {}, "flash.display.CapsStyle");
    P(Mo, "NONE", "none");
    P(Mo, "ROUND", "round");
    P(Mo, "SQUARE", "square");
    var No = N(function() {}, "flash.display.GradientType");
    P(No, "LINEAR", "linear");
    P(No, "RADIAL", "radial");
    var Oo = on(2012);
    Oo.u = N(Oo, "flash.display.Graphics");
    Oo.create = function(a) {
        var b = Object.create(Oo.prototype);
        Object.defineProperty(b, "__swiffy_d", {
            value: a
        });
        return b
    };
    Oo.prototype.beginBitmapFill = function(a, b, c, d) {
        Q(b, "flash.geom.Matrix", null);
        Q(c, "Boolean", !0);
        Q(d, "Boolean", !1);
        R(this, "beginBitmapFill")
    };
    Oo.prototype.beginFill = function(a, b) {
        a = Q(a, "uint");
        b = 100 * Q(b, "Number", 1);
        this.__swiffy_d.jb().sq(a, b)
    };
    Oo.prototype.beginGradientFill = function(a, b, c, d, e, f, h, l) {
        a = Q(a, "String");
        b = Q(b, "Array");
        c = Q(c, "Array");
        d = Q(d, "Array");
        e = Q(e, "flash.geom.Matrix", null);
        f = Q(f, "String", "pad");
        h = Q(h, "String", "rgb");
        l = Q(l, "Number", 0);
        this.__swiffy_d.jb().Lo(a, b, c, d, Po(e), f, h, l)
    };
    Oo.prototype.beginShaderFill = function(a, b) {
        Q(b, "flash.geom.Matrix", null);
        R(this, "beginShaderFill")
    };
    Oo.prototype.clear = function() {
        this.__swiffy_d.jb().clear()
    };
    Oo.prototype.copyFrom = function(a) {
        Q(a, "flash.display.Graphics");
        R(this, "copyFrom")
    };
    Oo.prototype.cubicCurveTo = function(a, b, c, d, e, f) {
        Q(a, "Number");
        Q(b, "Number");
        Q(c, "Number");
        Q(d, "Number");
        Q(e, "Number");
        Q(f, "Number");
        R(this, "cubicCurveTo")
    };
    Oo.prototype.curveTo = function(a, b, c, d) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number");
        d = Q(d, "Number");
        this.__swiffy_d.jb().Lb(a, b, c, d)
    };
    Oo.prototype.drawCircle = function(a, b, c) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number");
        this.__swiffy_d.jb().tq(a, b, c, c)
    };
    Oo.prototype.drawEllipse = function(a, b, c, d) {
        c = Q(c, "Number") / 2;
        d = Q(d, "Number") / 2;
        a = Q(a, "Number") + c;
        b = Q(b, "Number") + d;
        this.__swiffy_d.jb().tq(a, b, c, d)
    };
    Oo.prototype.drawGraphicsData = function() {
        R(this, "drawGraphicsData")
    };
    Oo.prototype.drawPath = function(a, b, c) {
        Q(c, "String", "evenOdd");
        R(this, "drawPath")
    };
    Oo.prototype.drawRect = function(a, b, c, d) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number");
        d = Q(d, "Number");
        this.__swiffy_d.jb().Hu(a, b, c, d)
    };
    Oo.prototype.drawRoundRect = function(a, b, c, d, e, f) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number");
        d = Q(d, "Number");
        e = Q(e, "Number");
        f = Q(f, "Number", e);
        this.__swiffy_d.jb().Iu(a, b, c, d, e, f)
    };
    Oo.prototype.drawTriangles = function(a, b, c, d) {
        Q(d, "String", "none");
        R(this, "drawTriangles")
    };
    Oo.prototype.endFill = function() {
        this.__swiffy_d.jb().uq()
    };
    Oo.prototype.lineBitmapStyle = function(a, b, c, d) {
        Q(b, "flash.geom.Matrix", null);
        Q(c, "Boolean", !0);
        Q(d, "Boolean", !1);
        R(this, "lineBitmapStyle")
    };
    Oo.prototype.lineGradientStyle = function(a, b, c, d, e, f, h, l) {
        Q(a, "String");
        Q(b, "Array");
        Q(c, "Array");
        Q(d, "Array");
        Q(e, "flash.geom.Matrix", null);
        Q(f, "String", "pad");
        Q(h, "String", "rgb");
        Q(l, "Number", 0);
        R(this, "lineGradientStyle")
    };
    Oo.prototype.lineShaderStyle = function(a, b) {
        Q(b, "flash.geom.Matrix", null);
        R(this, "lineShaderStyle")
    };
    Oo.prototype.lineStyle = function(a, b, c, d, e, f, h, l) {
        k(a) && (a = Q(a, "Number"));
        b = Q(b, "uint", 0);
        c = 100 * Q(c, "Number", 1);
        d = Q(d, "Boolean", !1);
        e = Q(e, "String", "normal");
        f = Q(f, "String", "null");
        h = Q(h, "String", "null");
        l = Q(l, "Number", 3);
        this.__swiffy_d.jb().vq(a, b, c, d, e, f, h, l)
    };
    Oo.prototype.lineTo = function(a, b) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        this.__swiffy_d.jb().lineTo(a, b)
    };
    Oo.prototype.moveTo = function(a, b) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        this.__swiffy_d.jb().moveTo(a, b)
    };
    var Qo = N(on(1001), "flash.display.IBitmapDrawable");
    Qo.u = Qo;
    Um(Qo.u);
    var Ro = N(function() {}, "flash.display.InterpolationMethod");
    P(Ro, "RGB", "rgb");
    P(Ro, "LINEAR_RGB", "linearRGB");
    var So = N(function() {}, "flash.display.JointStyle");
    P(So, "BEVEL", "bevel");
    P(So, "MITER", "miter");
    P(So, "ROUND", "round");
    var To = N(function() {}, "flash.display.LineScaleMode");
    P(To, "HORIZONTAL", "horizontal");
    P(To, "NONE", "none");
    P(To, "NORMAL", "normal");
    P(To, "VERTICAL", "vertical");
    var Uo = N(function() {}, "flash.display.PixelSnapping");
    Object.defineProperties(Uo, {
        ALWAYS: {
            value: "always"
        },
        AUTO: {
            value: "auto"
        },
        NEVER: {
            value: "never"
        }
    });
    var Vo = N(function() {}, "flash.display.SpreadMethod");
    P(Vo, "PAD", "pad");
    P(Vo, "REFLECT", "reflect");
    P(Vo, "REPEAT", "repeat");
    var Wo = N(function() {}, "flash.display.StageAlign");
    P(Wo, "BOTTOM", "B");
    P(Wo, "BOTTOM_LEFT", "BL");
    P(Wo, "BOTTOM_RIGHT", "BR");
    P(Wo, "LEFT", "L");
    P(Wo, "RIGHT", "R");
    P(Wo, "TOP", "T");
    P(Wo, "TOP_LEFT", "TL");
    P(Wo, "TOP_RIGHT", "TR");
    var Xo = N(function() {}, "flash.display.StageDisplayState");
    Object.defineProperties(Xo, {
        FULL_SCREEN: {
            value: "fullScreen"
        },
        FULL_SCREEN_INTERACTIVE: {
            value: "fullScreenInteractive"
        },
        NORMAL: {
            value: "normal"
        }
    });
    var Yo = N(function() {}, "flash.display.StageQuality");
    Object.defineProperties(Yo, {
        BEST: {
            value: "best"
        },
        HIGH: {
            value: "high"
        },
        HIGH_16X16: {
            value: "16x16"
        },
        HIGH_16X16_LINEAR: {
            value: "16x16linear"
        },
        HIGH_8X8: {
            value: "8x8"
        },
        HIGH_8X8_LINEAR: {
            value: "8x8linear"
        },
        LOW: {
            value: "low"
        },
        MEDIUM: {
            value: "medium"
        }
    });
    var Zo = N(function() {}, "flash.display.StageScaleMode");
    P(Zo, "EXACT_FIT", "exactFit");
    P(Zo, "NO_BORDER", "noBorder");
    P(Zo, "NO_SCALE", "noScale");
    P(Zo, "SHOW_ALL", "showAll");
    var $o = function(a, b, c) {
            a = Q(a, "String");
            b = Q(b, "Boolean", !1);
            c = Q(c, "Boolean", !1);
            Object.defineProperty(this, "__swiffy_v", {
                value: {
                    type: a,
                    bubbles: b,
                    cancelable: c,
                    eventPhase: 2,
                    target: null,
                    currentTarget: null,
                    Wj: !1,
                    pq: !1,
                    defaultPrevented: !1,
                    Oj: !1
                }
            })
        },
        ap = function(a) {
            return a.__swiffy_v
        },
        bp = N($o, "flash.events.Event");
    L(bp, "bubbles", function() {
        return ap(this).bubbles
    });
    L(bp, "cancelable", function() {
        return ap(this).cancelable
    });
    L(bp, "currentTarget", function() {
        return ap(this).currentTarget
    });
    L(bp, "eventPhase", function() {
        return ap(this).eventPhase
    });
    L(bp, "target", function() {
        return ap(this).target
    });
    L(bp, "type", function() {
        return ap(this).type
    });
    K(bp, "isDefaultPrevented", function() {
        return ap(this).defaultPrevented
    });
    K(bp, "preventDefault", function() {
        var a = ap(this);
        a.cancelable && (a.defaultPrevented = !0)
    });
    K(bp, "stopPropagation", function() {
        ap(this).Wj = !0
    });
    K(bp, "stopImmediatePropagation", function() {
        var a = ap(this);
        a.pq = !0;
        a.Wj = !0
    });
    K(bp, "formatToString", function() {
        for (var a = "[" + qm(this).localName, b = 0; b < arguments.length; b++) {
            var c = this[arguments[b]];
            ha(c) ? c = Math.round(100 * c) / 100 : fa(c) && (c = '"' + c + '"');
            a += " " + arguments[b] + "=" + c
        }
        return a + "]"
    });
    K(bp, "clone", function() {
        return ln.call(bp, this.type, this.bubbles, this.cancelable)
    });
    K(bp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase")
    });
    Object.defineProperties(bp, {
        ACTIVATE: {
            value: "activate"
        },
        ADDED: {
            value: "added"
        },
        ADDED_TO_STAGE: {
            value: "addedToStage"
        },
        CANCEL: {
            value: "cancel"
        },
        CHANGE: {
            value: "change"
        },
        CHANNEL_MESSAGE: {
            value: "channelMessage"
        },
        CHANNEL_STATE: {
            value: "channelState"
        },
        CLEAR: {
            value: "clear"
        },
        CLOSE: {
            value: "close"
        },
        CLOSING: {
            value: "closing"
        },
        COMPLETE: {
            value: "complete"
        },
        CONNECT: {
            value: "connect"
        },
        CONTEXT3D_CREATE: {
            value: "context3DCreate"
        },
        COPY: {
            value: "copy"
        },
        CUT: {
            value: "cut"
        },
        DEACTIVATE: {
            value: "deactivate"
        },
        DISPLAYING: {
            value: "displaying"
        },
        ENTER_FRAME: {
            value: "enterFrame"
        },
        EXIT_FRAME: {
            value: "exitFrame"
        },
        EXITING: {
            value: "exiting"
        },
        FRAME_CONSTRUCTED: {
            value: "frameConstructed"
        },
        FRAME_LABEL: {
            value: "frameLabel"
        },
        FULLSCREEN: {
            value: "fullScreen"
        },
        HTML_BOUNDS_CHANGE: {
            value: "htmlBoundsChange"
        },
        HTML_DOM_INITIALIZE: {
            value: "htmlDOMInitialize"
        },
        HTML_RENDER: {
            value: "htmlRender"
        },
        ID3: {
            value: "id3"
        },
        INIT: {
            value: "init"
        },
        LOCATION_CHANGE: {
            value: "locationChange"
        },
        MOUSE_LEAVE: {
            value: "mouseLeave"
        },
        NETWORK_CHANGE: {
            value: "networkChange"
        },
        OPEN: {
            value: "open"
        },
        PASTE: {
            value: "paste"
        },
        PREPARING: {
            value: "preparing"
        },
        REMOVED: {
            value: "removed"
        },
        REMOVED_FROM_STAGE: {
            value: "removedFromStage"
        },
        RENDER: {
            value: "render"
        },
        RESIZE: {
            value: "resize"
        },
        SCROLL: {
            value: "scroll"
        },
        SELECT: {
            value: "select"
        },
        SELECT_ALL: {
            value: "selectAll"
        },
        SOUND_COMPLETE: {
            value: "soundComplete"
        },
        STANDARD_ERROR_CLOSE: {
            value: "standardErrorClose"
        },
        STANDARD_INPUT_CLOSE: {
            value: "standardInputClose"
        },
        STANDARD_OUTPUT_CLOSE: {
            value: "standardOutputClose"
        },
        SUSPEND: {
            value: "suspend"
        },
        TAB_CHILDREN_CHANGE: {
            value: "tabChildrenChange"
        },
        TAB_ENABLED_CHANGE: {
            value: "tabEnabledChange"
        },
        TAB_INDEX_CHANGE: {
            value: "tabIndexChange"
        },
        TEXT_INTERACTION_MODE_CHANGE: {
            value: "textInteractionModeChange"
        },
        TEXTURE_READY: {
            value: "textureReady"
        },
        UNLOAD: {
            value: "unload"
        },
        USER_IDLE: {
            value: "userIdle"
        },
        USER_PRESENT: {
            value: "userPresent"
        },
        VIDEO_FRAME: {
            value: "videoFrame"
        },
        WORKER_STATE: {
            value: "workerState"
        }
    });
    var cp = function(a, b, c, d) {
            $o.call(this, a, b, c);
            this.activating = d
        },
        dp = N(cp, "flash.events.ActivityEvent", $o);
    L(dp, "activating", function() {
        return this.__swiffy_v.Tv
    });
    M(dp, "activating", function(a) {
        this.__swiffy_v.Tv = Q(a, "Boolean", !1)
    });
    K(dp, "clone", function() {
        return ln.call(bp, this.type, this.bubbles, this.cancelable, this.activating)
    });
    K(dp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "status", "activating")
    });
    Object.defineProperty(dp, "ACTIVITY", {
        value: "activity"
    });
    var ep = function(a, b, c, d, e) {
            $o.call(this, a, b, c);
            this.contextMenuOwner = e;
            this.isMouseTargetInaccessible = !1;
            this.mouseTarget = d
        },
        fp = function(a) {
            return a.__swiffy_v
        },
        gp = N(ep, "flash.events.ContextMenuEvent", $o);
    L(bp, "contextMenuOwner", function() {
        return fp(this).dw
    });
    M(bp, "contextMenuOwner", function(a) {
        fp(this).dw = Q(a, "flash.display.InteractiveObject", null)
    });
    L(bp, "isMouseTargetInaccessible", function() {
        return fp(this).zw
    });
    M(bp, "isMouseTargetInaccessible", function(a) {
        fp(this).zw = Q(a, "Boolean", !1)
    });
    L(bp, "mouseTarget", function() {
        return fp(this).Fw
    });
    M(bp, "mouseTarget", function(a) {
        fp(this).Fw = Q(a, "flash.display.InteractiveObject", null)
    });
    K(gp, "clone", function() {
        return ln.call(ep, this.type, this.bubbles, this.cancelable, this.mouseTarget, this.contextMenuOwner)
    });
    Object.defineProperty(gp, "MENU_ITEM_SELECT", {
        value: "menuItemSelect"
    });
    Object.defineProperty(gp, "MENU_SELECT", {
        value: "menuSelect"
    });
    var hp = function(a) {
            return a.__swiffy_v
        },
        ip = N(function(a, b, c, d, e, f, h) {
            $o.call(this, a, b, c);
            this.relatedObject = k(d) ? d : null;
            this.shiftKey = k(e) ? e : !1;
            this.keyCode = k(f) ? f : 0;
            this.direction = k(h) ? h : "none";
            this.isRelatedObjectInaccessible = !1
        }, "flash.events.FocusEvent", $o);
    L(ip, "direction", function() {
        return hp(this).direction
    });
    L(ip, "isRelatedObjectInaccessible", function() {
        return hp(this).Aw
    });
    L(ip, "keyCode", function() {
        return hp(this).keyCode
    });
    L(ip, "relatedObject", function() {
        return hp(this).Pe
    });
    L(ip, "shiftKey", function() {
        return hp(this).shiftKey
    });
    M(ip, "direction", function(a) {
        hp(this).direction = Q(a, "String")
    });
    M(ip, "isRelatedObjectInaccessible", function(a) {
        hp(this).Aw = Q(a, "Boolean")
    });
    M(ip, "keyCode", function(a) {
        hp(this).keyCode = Q(a, "uint")
    });
    M(ip, "relatedObject", function(a) {
        hp(this).Pe = Q(a, "flash.display.InteractiveObject")
    });
    M(ip, "shiftKey", function(a) {
        hp(this).shiftKey = Q(a, "Boolean")
    });
    Object.defineProperties(ip, {
        FOCUS_IN: {
            value: "focusIn"
        },
        FOCUS_OUT: {
            value: "focusOut"
        },
        KEY_FOCUS_CHANGE: {
            value: "keyFocusChange"
        },
        MOUSE_FOCUS_CHANGE: {
            value: "mouseFocusChange"
        }
    });
    var jp = N(function(a, b, c, d, e) {
        cp.call(this, a, b, c);
        a = this.__swiffy_v;
        a.fullScreen = Q(d, "Boolean", !1);
        a.yw = Q(e, "Boolean", !1)
    }, "flash.events.FullScreenEvent", cp);
    L(jp, "fullScreen", function() {
        return this.__swiffy_v.fullScreen
    });
    L(jp, "interactive", function() {
        return this.__swiffy_v.yw
    });
    K(jp, "clone", function() {
        return ln.call(jp, this.type, this.bubbles, this.cancelable, this.activating, this.fullScreen, this.interactive)
    });
    K(jp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "activating", "fullScreen", "interactive")
    });
    Object.defineProperty(jp, "FULL_SCREEN", {
        value: "fullScreen"
    });
    Object.defineProperty(jp, "FULL_SCREEN_INTERACTIVE_ACCEPTED", {
        value: "fullScreenInteractiveAccepted"
    });
    var kp = function(a, b, c, d) {
            $o.call(this, a, b, c);
            this.__swiffy_v.status = Q(d, "Number", 0);
            this.responseURL = null
        },
        lp = N(kp, "flash.events.HTTPStatusEvent", $o);
    L(lp, "status", function() {
        return this.__swiffy_v.status
    });
    K(lp, "clone", function() {
        return ln.call(lp, this.type, this.bubbles, this.cancelable, this.status)
    });
    K(lp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "status", "responseURL")
    });
    Object.defineProperties(lp, {
        HTTP_RESPONSE_STATUS: {
            value: "httpResponseStatus"
        },
        HTTP_STATUS: {
            value: "httpStatus"
        }
    });
    var mp = N(on(1001), "flash.events.IEventDispatcher");
    mp.u = mp;
    mp.prototype.addEventListener = function() {};
    mp.prototype.dispatchEvent = function() {};
    mp.prototype.hasEventListener = function() {};
    mp.prototype.removeEventListener = function() {};
    mp.prototype.willTrigger = function() {};
    Um(mp.u);
    var np = function(a, b, c) {
            this.Pc = a;
            this.km = b;
            this.Ju = c
        },
        W = function(a) {
            a = Q(a, "flash.events.IEventDispatcher", null);
            Object.defineProperty(this, "__swiffy_v", {
                value: {
                    target: a || this
                }
            })
        };
    N(W, "flash.events.EventDispatcher", void 0, [mp]);
    var op = {},
        pp = function(a, b) {
            for (var c = 1; c < arguments.length; ++c) op[arguments[c]] = a
        };
    pp(W, "activate", "deactivate");
    var qp = function(a, b) {
            var c = op[a];
            return !!c && b instanceof c
        },
        rp = function(a, b) {
            var c = b.__swiffy_d;
            c instanceof sj && c.Sd() || (c = new $o(a, !1, !1), ap(c).Oj = !0, b.dispatchEvent(c))
        };
    W.prototype.addEventListener = function(a, b, c, d) {
        this.__swiffy_listeners || Object.defineProperty(this, "__swiffy_listeners", {
            value: {}
        });
        var e = this.__swiffy_listeners,
            f = e[a];
        f || (e[a] = f = []);
        d |= 0;
        c = !!c;
        for (e = 0; e < f.length; ++e)
            if (f[e].Pc == b && f[e].km == c) return;
        0 == f.length && qp(a, this) && Ze.Nu(a, this);
        for (e = f.length; 0 < e && d > f[e - 1].Ju; --e);
        f.splice(e, 0, new np(b, c, d))
    };
    W.prototype.dispatchEvent = function(a) {
        var b = ap(a),
            c = this.__swiffy_v;
        b.target = c && c.target || this;
        if (!b.Oj) {
            for (var d = [], c = this; c = c.parent;) d.push(c);
            b.eventPhase = 1;
            for (c = d.length - 1; 0 <= c && !b.Wj; c--) b.currentTarget = d[c], sp(d[c], a, !0)
        }
        b.eventPhase = 2;
        b.currentTarget = this;
        sp(this, a);
        if (!b.Oj && b.bubbles)
            for (b.eventPhase = 3, c = 0; c < d.length && !b.Wj; c++) b.currentTarget = d[c], sp(d[c], a);
        return !b.defaultPrevented
    };
    var sp = function(a, b, c) {
        var d = a.__swiffy_listeners;
        a = ap(b);
        if (d && d[a.type])
            for (var d = d[a.type], e = 0; e < d.length && !a.pq; e++) d[e].km == !!c && d[e].Pc.call(null, b)
    };
    W.prototype.removeEventListener = function(a, b, c) {
        var d = this.__swiffy_listeners;
        if (d && d[a] && d[a].length) {
            d = d[a];
            c = !!c;
            for (var e = 0; e < d.length; e++) d[e].Pc == b && d[e].km == c && d.splice(e--, 1);
            0 == d.length && qp(a, this) && Ze.wp(a, this)
        }
    };
    W.prototype.hasEventListener = function(a) {
        var b = this.__swiffy_listeners;
        return !!b && !!b[a] && b[a].length
    };
    W.prototype.willTrigger = function(a) {
        var b = this;
        do
            if (b.hasEventListener(a)) return !0;
        while (b = b.parent);
        return !1
    };
    var up = function(a) {
            W.call(this, a);
            Object.defineProperty(this, "__swiffy_d", {
                value: new gf(this)
            });
            P(this, "actionScriptVersion", 0);
            Object.defineProperty(this, "applicationDomain", {
                get: function() {
                    R(this, "applicationDomain");
                    return tp()
                }
            });
            P(this, "bytes", null);
            P(this, "bytesLoaded", 0);
            P(this, "bytesTotal", 0);
            P(this, "childAllowsParent", !0);
            O(this, "childSandboxBridge", "Object", null);
            P(this, "contentType", "");
            P(this, "frameRate", 0);
            P(this, "height", 0);
            O(this, "isURLInaccessible", "Boolean", !1);
            P(this, "parentAllowsChild", !0);
            O(this, "parentSandboxBridge", "Object", null);
            P(this, "sameDomain", !1);
            P(this, "sharedEvents", new W);
            P(this, "swfVersion", 0);
            P(this, "uncaughtErrorEvents", null);
            P(this, "width", 0);
            R(this, "<init>")
        },
        vp = N(up, "flash.display.LoaderInfo", W);
    Object.defineProperty(up.prototype, "content", {
        get: function() {
            return this.__swiffy_d.content
        }
    });
    Object.defineProperty(up.prototype, "loader", {
        get: function() {
            return this.__swiffy_d.hq
        }
    });
    Object.defineProperty(up.prototype, "loaderURL", {
        get: function() {
            return this.__swiffy_d.pw()
        }
    });
    Object.defineProperty(up.prototype, "parameters", {
        get: function() {
            return this.__swiffy_d.dn
        }
    });
    Object.defineProperty(up.prototype, "url", {
        get: function() {
            return this.__swiffy_d.vd
        }
    });
    vp.getLoaderInfoByDefinition = function(a) {
        Q(a, "Object");
        R(up, "getLoaderInfoByDefinition");
        return null
    };
    var wp = function() {
        W.call(this)
    };
    N(wp, "flash.display.NativeMenu", W);
    wp.prototype.clone = function() {
        return new wp
    };
    var xp = function() {
        W.call(this)
    };
    N(xp, "flash.display.NativeMenuItem", W);
    xp.prototype.clone = function() {
        return new xp
    };
    var yp = function(a) {
            return a.__swiffy_v
        },
        zp = N(function(a, b, c, d, e, f, h, l, n, r, t) {
            $o.call(this, a, b, c);
            this.charCodeValue = k(d) ? d : 0;
            this.keyCodeValue = k(e) ? e : 0;
            this.keyLocationValue = k(f) ? f : 0;
            this.ctrlKeyValue = k(h) ? h : !1;
            this.altKeyValue = k(l) ? l : !1;
            this.shiftKeyValue = k(n) ? n : !1;
            this.controlKeyValue = k(r) ? r : !1;
            this.commandKeyValue = k(t) ? t : !1
        }, "flash.events.KeyboardEvent", $o);
    L(zp, "charCodeValue", function() {
        return yp(this).$v
    });
    L(zp, "keyCodeValue", function() {
        return yp(this).Bw
    });
    L(zp, "keyLocationValue", function() {
        return yp(this).Cw
    });
    L(zp, "ctrlKeyValue", function() {
        return yp(this).gw
    });
    L(zp, "altKeyValue", function() {
        return yp(this).Uv
    });
    L(zp, "shiftKeyValue", function() {
        return yp(this).dx
    });
    L(zp, "controlKeyValue", function() {
        return yp(this).ew
    });
    L(zp, "commandKeyValue", function() {
        return yp(this).bw
    });
    M(zp, "charCodeValue", function(a) {
        yp(this).$v = Q(a, "uint")
    });
    M(zp, "keyCodeValue", function(a) {
        yp(this).Bw = Q(a, "uint")
    });
    M(zp, "keyLocationValue", function(a) {
        yp(this).Cw = Q(a, "uint")
    });
    M(zp, "ctrlKeyValue", function(a) {
        yp(this).gw = Q(a, "Boolean")
    });
    M(zp, "altKeyValue", function(a) {
        yp(this).Uv = Q(a, "Boolean")
    });
    M(zp, "shiftKeyValue", function(a) {
        yp(this).dx = Q(a, "Boolean")
    });
    M(zp, "controlKeyValue", function(a) {
        yp(this).ew = Q(a, "Boolean")
    });
    M(zp, "commandKeyValue", function(a) {
        yp(this).bw = Q(a, "Boolean")
    });
    K(zp, "updateAfterEvent", function() {
        R(this, "updateAfterEvent")
    });
    Object.defineProperties(zp, {
        KEY_DOWN: {
            value: "keyDown"
        },
        KEY_UP: {
            value: "keyUp"
        }
    });
    var Bp = function(a, b, c, d, e, f, h, l, n, r, t) {
            $o.call(this, a, b, c);
            this.localX = d;
            this.localY = e;
            this.relatedObject = f;
            this.ctrlKey = h;
            this.altKey = l;
            this.shiftKey = n;
            this.buttonDown = r;
            this.delta = t;
            a = Ap(this);
            a.Yn = NaN;
            a.Zn = NaN
        },
        Ap = function(a) {
            return a.__swiffy_v
        },
        Cp = N(Bp, "flash.events.MouseEvent", $o);
    L(Cp, "localX", function() {
        return Ap(this).ao
    });
    M(Cp, "localX", function(a) {
        Ap(this).ao = Q(a, "Number", NaN)
    });
    L(Cp, "localY", function() {
        return Ap(this).bo
    });
    M(Cp, "localY", function(a) {
        Ap(this).bo = Q(a, "Number", NaN)
    });
    L(Cp, "stageX", function() {
        return Ap(this).Yn
    });
    L(Cp, "stageY", function() {
        return Ap(this).Zn
    });
    L(Cp, "relatedObject", function() {
        return Ap(this).Pe
    });
    M(Cp, "relatedObject", function(a) {
        Ap(this).Pe = Q(a, "flash.display.InteractiveObject", null)
    });
    L(Cp, "ctrlKey", function() {
        return Ap(this).ctrlKey
    });
    M(Cp, "ctrlKey", function(a) {
        Ap(this).ctrlKey = Q(a, "Boolean", !1)
    });
    L(Cp, "altKey", function() {
        return Ap(this).altKey
    });
    M(Cp, "altKey", function(a) {
        Ap(this).altKey = Q(a, "Boolean", !1)
    });
    L(Cp, "shiftKey", function() {
        return Ap(this).shiftKey
    });
    M(Cp, "shiftKey", function(a) {
        Ap(this).shiftKey = Q(a, "Boolean", !1)
    });
    L(Cp, "buttonDown", function() {
        return Ap(this).$n
    });
    M(Cp, "buttonDown", function(a) {
        Ap(this).$n = Q(a, "Boolean", !1)
    });
    L(Cp, "delta", function() {
        return Ap(this).iw
    });
    M(Cp, "delta", function(a) {
        Ap(this).iw = Q(a, "int", 0)
    });
    K(Cp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "localX", "localY", "stageX", "stageY", "relatedObject", "ctrlKey", "altKey", "shiftKey", "buttonDown", "delta")
    });
    K(Cp, "updateAfterEvent", function() {
        R(this, "updateAfterEvent")
    });
    Object.defineProperties(Cp, {
        CLICK: {
            value: "click"
        },
        CONTEXT_MENU: {
            value: "contextMenu"
        },
        DOUBLE_CLICK: {
            value: "doubleClick"
        },
        MIDDLE_CLICK: {
            value: "middleClick"
        },
        MIDDLE_MOUSE_DOWN: {
            value: "middleMouseDown"
        },
        MIDDLE_MOUSE_UP: {
            value: "middleMouseUp"
        },
        MOUSE_DOWN: {
            value: "mouseDown"
        },
        MOUSE_MOVE: {
            value: "mouseMove"
        },
        MOUSE_OUT: {
            value: "mouseOut"
        },
        MOUSE_OVER: {
            value: "mouseOver"
        },
        MOUSE_UP: {
            value: "mouseUp"
        },
        MOUSE_WHEEL: {
            value: "mouseWheel"
        },
        RIGHT_CLICK: {
            value: "rightClick"
        },
        RIGHT_MOUSE_DOWN: {
            value: "rightMouseDown"
        },
        RIGHT_MOUSE_UP: {
            value: "rightMouseUp"
        },
        ROLL_OUT: {
            value: "rollOut"
        },
        ROLL_OVER: {
            value: "rollOver"
        }
    });
    var Dp = function(a, b, c, d) {
            $o.call(this, a, b, c);
            this.info = k(d) ? d : null
        },
        Ep = N(Dp, "flash.events.NetStatusEvent", $o);
    L(Ep, "info", function() {
        return this.__swiffy_v.info
    });
    M(Ep, "info", function(a) {
        this.__swiffy_v.info = Q(a, "Object")
    });
    Object.defineProperty(Ep, "NET_STATUS", {
        value: "netStatus"
    });
    var Fp = function(a, b, c, d, e) {
            $o.call(this, a, b, c);
            this.bytesLoaded = d;
            this.bytesTotal = e
        },
        Gp = N(Fp, "flash.events.ProgressEvent", $o);
    L(Gp, "bytesLoaded", function() {
        return this.__swiffy_v.Uh
    });
    M(Gp, "bytesLoaded", function(a) {
        this.__swiffy_v.Uh = Q(a, "Number", 0)
    });
    L(Gp, "bytesTotal", function() {
        return this.__swiffy_v.Vh
    });
    M(Gp, "bytesTotal", function(a) {
        this.__swiffy_v.Vh = Q(a, "Number", 0)
    });
    K(Gp, "clone", function() {
        return ln.call(Gp, this.type, this.bubbles, this.cancelable, this.bytesLoaded, this.bytesTotal)
    });
    K(Gp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "bytesLoaded", "bytesTotal")
    });
    Object.defineProperties(Gp, {
        PROGRESS: {
            value: "progress"
        },
        SOCKET_DATA: {
            value: "socketData"
        },
        STANDARD_ERROR_DATA: {
            value: "standardErrorData"
        },
        STANDARD_INPUT_PROGRESS: {
            value: "standardInputProgress"
        },
        STANDARD_OUTPUT_DATA: {
            value: "standardOutputData"
        }
    });
    var Hp = N(function(a, b, c, d, e) {
        $o.call(this, a, b, c);
        this.code = d;
        this.level = e
    }, "flash.events.StatusEvent", $o);
    L(Hp, "code", function() {
        return this.__swiffy_v.code
    });
    M(Hp, "code", function(a) {
        this.__swiffy_v.code = Q(a, "String")
    });
    L(Hp, "level", function() {
        return this.__swiffy_v.Dw
    });
    M(Hp, "level", function(a) {
        this.__swiffy_v.Dw = Q(a, "String")
    });
    K(Hp, "clone", function() {
        return ln.call(Hp, this.type, this.bubbles, this.cancelable, this.code, this.level)
    });
    Object.defineProperty(Hp, "STATUS", {
        value: "status"
    });
    var Ip = function(a, b, c, d) {
            $o.call(this, a, b, c);
            this.text = d
        },
        Jp = N(Ip, "flash.events.TextEvent", $o);
    L(Jp, "text", function() {
        return this.__swiffy_v.text
    });
    M(Jp, "text", function(a) {
        this.__swiffy_v.text = Q(a, "String", "")
    });
    K(Jp, "clone", function() {
        return ln.call(Jp, this.type, this.bubbles, this.cancelable, this.text)
    });
    K(Jp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "text")
    });
    Object.defineProperty(Jp, "LINK", {
        value: "link"
    });
    Object.defineProperty(Jp, "TEXT_INPUT", {
        value: "textInput"
    });
    var Kp = function(a, b, c, d) {
            Ip.call(this, a, b, c, d)
        },
        Lp = N(Kp, "flash.events.ErrorEvent", Ip);
    K(Lp, "clone", function() {
        return ln.call(Lp, this.type, this.bubbles, this.cancelable, this.text)
    });
    Object.defineProperty(Lp, "ERROR", {
        value: "error"
    });
    var Mp = N(function(a, b, c, d, e) {
        Ip.call(this, a, b, c, d);
        this.error = e
    }, "flash.events.AsyncErrorEvent", Kp);
    L(Mp, "error", function() {
        return this.__swiffy_v.error
    });
    M(Mp, "error", function(a) {
        this.__swiffy_v.error = Q(a, "Error", null)
    });
    K(Mp, "clone", function() {
        return ln.call(Mp, this.type, this.bubbles, this.cancelable, this.text, this.error)
    });
    Object.defineProperty(Mp, "ASYNC_ERROR", {
        value: "asyncError"
    });
    var Np = function(a, b, c, d) {
            Ip.call(this, a, b, c, d)
        },
        Pp = function(a, b) {
            var c = J.apply(null, arguments);
            return ln.call(Np, Op.IO_ERROR, !1, !1, c.value.message)
        },
        Op = N(Np, "flash.events.IOErrorEvent", Kp);
    K(Op, "clone", function() {
        return ln.call(Op, this.type, this.bubbles, this.cancelable, this.text)
    });
    Object.defineProperties(Op, {
        IO_ERROR: {
            value: "ioError"
        },
        STANDARD_ERROR_IO_ERROR: {
            value: "standardErrorIoError"
        },
        STANDARD_INPUT_IO_ERROR: {
            value: "standardInputIoError"
        },
        STANDARD_OUTPUT_IO_ERROR: {
            value: "standardOutputIoError"
        }
    });
    var Qp = N(function(a, b, c, d) {
        Ip.call(this, a, b, c, d)
    }, "flash.events.SecurityErrorEvent", Kp);
    K(Qp, "clone", function() {
        return ln.call(Qp, this.type, this.bubbles, this.cancelable, this.text)
    });
    Object.defineProperty(Qp, "SECURITY_ERROR", {
        value: "securityError"
    });
    var Rp = function(a, b, c) {
            $o.call(this, a, b, c)
        },
        Sp = N(Rp, "flash.events.TimerEvent", $o);
    K(Sp, "clone", function() {
        return ln.call(Sp, this.type, this.bubbles, this.cancelable, this.activating)
    });
    Object.defineProperties(Sp, {
        TIMER: {
            value: "timer"
        },
        TIMER_COMPLETE: {
            value: "timerComplete"
        }
    });
    var Tp = on(2012);
    Tp.u = N(Tp, "flash.external.ExternalInterface");
    Object.defineProperty(Tp.u, "available", {
        get: Ye
    });
    O(Tp.u, "marshallExceptions", "Boolean", !1);
    Object.defineProperty(Tp.u, "objectID", {
        get: function() {
            return Ze.c.getName()
        }
    });
    Tp.u.addCallback = function(a, b) {
        af(Q(a, "String"), null, Q(b, "Function"), Tp.Yv)
    };
    Tp.Yv = function() {
        if (Tp.u.marshallExceptions) throw Error("Error in ActionScript");
        return null
    };
    Tp.u.call = function(a, b) {
		var str = Q(a, "String");
		if (str === "__parent.activityComplete")
        {
            __parent.activityComplete();
            return;
        }
	
        return ef(Q(a, "String"), Array.prototype.slice.call(arguments, 1), Tp.Wv)
    };
    Tp.Wv = function(a) {
        if (Tp.u.marshallExceptions) throw new ai(new U(String(a)));
        return null
    };
    var Up = function() {
        Object.defineProperty(this, "__swiffy_v", {
            get: function() {
                return this.Id()
            }
        })
    };
    Up.prototype.Id = function() {
        return new Ue
    };
    N(Up, "flash.filters.BitmapFilter");
    Up.prototype.clone = function() {
        return new Up
    };
    Up.prototype.toString = function() {
        return "[object BitmapFilter]"
    };
    var Vp = N(function() {}, "flash.filters.BitmapFilterQuality");
    Object.defineProperties(Vp, {
        HIGH: {
            value: 3
        },
        LOW: {
            value: 1
        },
        MEDIUM: {
            value: 2
        }
    });
    var Wp = N(function() {}, "flash.filters.BitmapFilterType");
    Object.defineProperties(Wp, {
        FULL: {
            value: "full"
        },
        INNER: {
            value: "inner"
        },
        OUTER: {
            value: "outer"
        }
    });
    var Xp = function() {
            if (!this.__swiffy_d) throw J(2012, qm(this).localName);
            W.call(this)
        },
        Yp = N(Xp, "flash.display.DisplayObject", W, [Qo]);
    pp(Xp, "enterFrame", "exitFrame", "render");
    K(Yp, "localToGlobal", function(a) {
        a = Q(a, "flash.geom.Point");
        a = new Jc(20 * a.x, 20 * a.y);
        a.na(this.__swiffy_d.Ha());
        return new Zp(a.x / 20, a.y / 20)
    });
    K(Yp, "globalToLocal", function(a) {
        a = Q(a, "flash.geom.Point");
        a = new Jc(20 * a.x, 20 * a.y);
        a.na(this.__swiffy_d.Wc());
        return new Zp(a.x / 20, a.y / 20)
    });
    Object.defineProperty(Xp.prototype, "x", {
        get: function() {
            return this.__swiffy_d.Za().p / 20
        },
        set: function(a) {
            var b = this.__swiffy_d,
                c = b.Za();
            b.setTransform(c.Cd((20 * a | 0) - c.p, 0));
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "y", {
        get: function() {
            return this.__swiffy_d.Za().q / 20
        },
        set: function(a) {
            var b = this.__swiffy_d,
                c = b.Za();
            b.setTransform(c.Cd(0, (20 * a | 0) - c.q));
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "alpha", {
        get: function() {
            return (256 * this.__swiffy_d.Fb.ua | 0) / 256
        },
        set: function(a) {
            var b = this.__swiffy_d,
                c = b.Fb;
            b.pc(new Yc(c.xa, c.sa, c.wa, c.qa, c.va, c.pa, a, c.ta));
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "visible", {
        get: function() {
            return this.__swiffy_d.ze
        },
        set: function(a) {
            this.__swiffy_d.Ii(Boolean(a))
        }
    });
    Object.defineProperty(Xp.prototype, "rotation", {
        get: function() {
            return -180 * this.__swiffy_d.Bc().angle / Math.PI
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Bc().angle = -a * Math.PI / 180;
            b.lg();
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "width", {
        get: function() {
            return this.__swiffy_d.Fa()
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.qm(Number(a));
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "height", {
        get: function() {
            return this.__swiffy_d.Ta()
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.pm(Number(a));
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "scaleX", {
        get: function() {
            return this.__swiffy_d.Bc().rd
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Bc().rd = a;
            b.lg();
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "scaleY", {
        get: function() {
            return this.__swiffy_d.Bc().Be
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Bc().Be = a;
            b.lg();
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "mouseX", {
        get: function() {
            var a = this.__swiffy_d,
                b = a.c.Rb.clone();
            b.na(a.Wc());
            return b.x / 20
        }
    });
    Object.defineProperty(Xp.prototype, "mouseY", {
        get: function() {
            var a = this.__swiffy_d,
                b = a.c.Rb.clone();
            b.na(a.Wc());
            return b.y / 20
        }
    });
    Object.defineProperty(Xp.prototype, "root", {
        get: function() {
            for (var a = this.__swiffy_d; a && !a.li && a != a.c.ia;)
                if (a.getParent())
                    if (a == a.c.kb) break;
                    else a = a.getParent();
            else a = null;
            return a ? a.$ : null
        }
    });
    Object.defineProperty(Xp.prototype, "parent", {
        get: function() {
            var a = this.__swiffy_d.getParent();
            return a ? a.$ : null
        }
    });
    Object.defineProperty(Xp.prototype, "name", {
        get: function() {
            return this.__swiffy_d.getName()
        },
        set: function(a) {
            this.__swiffy_d.Pb(a)
        }
    });
    Object.defineProperty(Xp.prototype, "loaderInfo", {
        get: function() {
            return this.__swiffy_d.cl().De
        }
    });
    Object.defineProperty(Xp.prototype, "stage", {
        get: function() {
            var a = this.__swiffy_d;
            return this.root ? a.c.ia.$ : null
        }
    });
    Object.defineProperty(Xp.prototype, "transform", {
        get: function() {
            return new $p(this)
        },
        set: function(a) {
            a = Q(a, "flash.geom.Transform");
            a = a.__swiffy_d;
            var b = this.__swiffy_d;
            b.setTransform(a.Za());
            b.pc(a.Fb);
            b.cb()
        }
    });
    Object.defineProperty(Xp.prototype, "filters", {
        get: function() {
            for (var a = [], b = this.__swiffy_d.Ib, c = 0; c < b.length; c++) a.push(b[c].pf());
            return a
        },
        set: function(a) {
            for (var b = this.__swiffy_d, c = [], d = 0; d < a.length; d++) {
                var e = a[d].__swiffy_v;
                c.push(e ? e : new Ue)
            }
            b.Cf(c)
        }
    });
    Object.defineProperty(Xp.prototype, "mask", {
        get: function() {
            var a = this.__swiffy_d.od;
            return a ? a.$ : null
        },
        set: function(a) {
            a = Q(a, "flash.display.DisplayObject");
            this.__swiffy_d.Oe(a.__swiffy_d)
        }
    });
    var aq = function(a, b, c) {
            Xp.call(this);
            a && (this.bitmapData = a);
            this.pixelSnapping = b;
            this.smoothing = c
        },
        xk = N(aq, "flash.display.Bitmap", Xp);
    Object.defineProperty(aq.prototype, "bitmapData", {
        get: function() {
            var a = this.__swiffy_d.ic;
            return a ? a.$ : null
        },
        set: function(a) {
            a = Q(a, "flash.display.BitmapData");
            this.__swiffy_d.Ow(a ? a.__swiffy_d : null)
        }
    });
    Object.defineProperty(aq.prototype, "pixelSnapping", {
        get: function() {
            return this.__swiffy_d.Gq
        },
        set: function(a) {
            this.__swiffy_d.Gq = Q(a, "String")
        }
    });
    Object.defineProperty(aq.prototype, "smoothing", {
        get: function() {
            return this.__swiffy_d.smoothing
        },
        set: function(a) {
            this.__swiffy_d.smoothing = Q(a, "Boolean")
        }
    });
    vk(aq, function(a, b) {
        return new xj(null, a, b)
    });
    var bq = function() {
        Xp.call(this);
        var a = this.__swiffy_d;
        a.Dc |= 127;
        a.vi();
        O(this, "focusRect", "Boolean", null)
    };
    N(bq, "flash.display.InteractiveObject", Xp);
    Object.defineProperty(bq.prototype, "tabIndex", {
        get: function() {
            return this.__swiffy_d.tabIndex
        },
        set: function(a) {
            this.__swiffy_d.tabIndex = Q(a, "int")
        }
    });
    Object.defineProperty(bq.prototype, "tabEnabled", {
        get: function() {
            return this.__swiffy_d.Rm()
        },
        set: function(a) {
            this.__swiffy_d.ef = Q(a, "Boolean")
        }
    });
    Object.defineProperty(bq.prototype, "mouseEnabled", {
        get: function() {
            return this.__swiffy_d.kh
        },
        set: function(a) {
            return this.__swiffy_d.Qn(!!a)
        }
    });
    Object.defineProperty(bq.prototype, "doubleClickEnabled", {
        get: function() {
            return this.__swiffy_d.Wk
        },
        set: function(a) {
            return this.__swiffy_d.Qw(!!a)
        }
    });
    var cq = function(a, b, c, d) {
            a = new Bp(a, b, !1);
            b = Ap(a);
            d.Pe && (b.Pe = d.Pe.$);
            c instanceof Xp && (b.ao = c.mouseX, b.bo = c.mouseY, c = c.__swiffy_d, b.Yn = c.c.Rb.x / 20, b.Zn = c.c.Rb.y / 20, b.$n = c.c.Mg);
            return a
        },
        dq = function(a) {
            a = new $o(a, !1, !1);
            ap(a).Oj = !0;
            return a
        },
        eq = function(a, b, c) {
            return new $o(a, b, c)
        },
        fq = {};
    fq[27] = oa(eq, bp.ADDED, !0, !1);
    fq[21] = oa(dq, bp.ADDED_TO_STAGE);
    fq[28] = oa(eq, bp.REMOVED, !0, !1);
    fq[26] = oa(dq, bp.REMOVED_FROM_STAGE);
    fq[5] = oa(dq, bp.UNLOAD);
    fq[11] = oa(cq, Cp.CLICK, !0);
    fq[25] = oa(cq, Cp.DOUBLE_CLICK, !0);
    fq[2] = oa(cq, Cp.MOUSE_UP, !0);
    fq[3] = oa(cq, Cp.MOUSE_DOWN, !0);
    fq[8] = oa(cq, Cp.ROLL_OUT, !1);
    fq[9] = oa(cq, Cp.ROLL_OVER, !1);
    fq[24] = oa(cq, Cp.MOUSE_MOVE, !1);
    fq[22] = oa(cq, Cp.MOUSE_OUT, !1);
    fq[23] = oa(cq, Cp.MOUSE_OVER, !1);
    var gq = function() {
        bq.call(this)
    };
    N(gq, "flash.display.DisplayObjectContainer", bq);
    Object.defineProperty(gq.prototype, "tabChildren", {
        value: !0,
        writable: !0
    });
    Object.defineProperty(gq.prototype, "numChildren", {
        get: function() {
            return this.__swiffy_d.yj()
        }
    });
    Object.defineProperty(bq.prototype, "mouseChildren", {
        get: function() {
            return this.__swiffy_d.wl
        },
        set: function(a) {
            return this.__swiffy_d.Vw(!!a)
        }
    });
    gq.prototype.addChild = function(a) {
        if (!a) throw J(2007, "child");
        var b = this.__swiffy_d;
        b.Te(a.__swiffy_d, b.yj())
    };
    gq.prototype.addChildAt = function(a, b) {
        if (!a) throw J(2007, "child");
        this.__swiffy_d.Te(a.__swiffy_d, b | 0)
    };
    gq.prototype.contains = function(a) {
        if (!a) throw J(2007, "child");
        return this.__swiffy_d.contains(a.__swiffy_d)
    };
    gq.prototype.getChildAt = function(a) {
        return (a = this.__swiffy_d.Ye(a | 0)) ? a.$ : a
    };
    gq.prototype.getChildByName = function(a) {
        return (a = this.__swiffy_d.Yt(a)) ? a.$ : a
    };
    gq.prototype.getChildIndex = function(a) {
        return this.__swiffy_d.yg(a.__swiffy_d)
    };
    gq.prototype.removeChild = function(a) {
        if (!a) throw J(2007, "child");
        this.__swiffy_d.hh(a.__swiffy_d)
    };
    gq.prototype.removeChildAt = function(a) {
        var b = this.__swiffy_d;
        if (a = b.Ye(a | 0)) return b.hh(a), a.$
    };
    gq.prototype.setChildIndex = function(a, b) {
        if (!a) throw J(2007, "child");
        this.__swiffy_d.Te(a.__swiffy_d, b | 0)
    };
    gq.prototype.swapChildren = function(a, b) {
        if (!a || !b) throw J(2007, "child");
        this.swapChildrenAt(this.getChildIndex(a), this.getChildIndex(b))
    };
    gq.prototype.swapChildrenAt = function(a, b) {
        var c = this.__swiffy_d,
            d = c.Ye(a | 0),
            e = c.Ye(b | 0);
        d && e && (c.Te(d, b | 0), c.Te(e, a | 0))
    };
    var hq = function() {
            bq.call(this);
            P(this, "content", null);
            var a = new up;
            P(this, "contentLoaderInfo", a);
            a = a.__swiffy_d;
            a.Ku(Ze.uf().vd);
            a.hq = this;
            P(this, "uncaughtErrorEvents", null)
        },
        iq = N(hq, "flash.display.Loader", gq);
    (new Ei(0, 0, null, null)).bm(iq);
    hq.prototype.close = function() {
        R(this, "close")
    };
    hq.prototype.load = function(a, b) {
        a = Q(a, "flash.net.URLRequest");
        b = Q(b, "flash.system.LoaderContext", null);
        R(this, "load");
        var c = a.url,
            d = this.contentLoaderInfo,
            e = d.__swiffy_d,
            f = $i(c),
            h;
        for (h in f) {
            var l = f[h];
            Object.defineProperty(e.dn, h, {
                value: l.length ? l[l.length - 1] : void 0,
                configurable: !0,
                enumerable: !0
            })
        }
        var n = this.__swiffy_d,
            f = new pd;
        f.Sg = function() {
            n.Cc(0) && (n.md(0), d.dispatchEvent(new $o(bp.UNLOAD)));
            d.dispatchEvent(new $o(bp.OPEN))
        };
        f.Td = function(a, b) {
            d.dispatchEvent(new Fp(Gp.PROGRESS, !1, !1, a, b))
        };
        f.bc = function(a, b) {
            var d = n.c,
                f = new cd,
                h = dd(a, d, f);
            d.gi(f, function() {
                var a = new fd(h, d, null);
                a.jn(!0);
                a.$b = !0;
                a.Pb(d.Ng());
                a.Wm(e);
                a.Ea();
                e.Ef(c);
                e.content = a.$;
                n.Yc(a, 0);
                d.Ua();
                n.c.ha().ik(e, b);
                d.Ua()
            })
        };
        f.Gc = function(a) {
            d.dispatchEvent(new kp(lp.HTTP_STATUS, !1, !1, a));
            200 == a ? d.dispatchEvent(Pp(2124, c)) : d.dispatchEvent(Pp(2035, c))
        };
        ud(c, n.c, a.method, a.data ? a.data.toString() : null, f, jq(a))
    };
    hq.prototype.loadBytes = function(a, b) {
        Q(a, "flash.utils.ByteArray");
        Q(b, "flash.system.LoaderContext", null);
        R(this, "loadBytes")
    };
    hq.prototype.loadFilePromise = function(a, b) {
        Q(a, "flash.desktop.IFilePromise");
        Q(b, "flash.system.LoaderContext", null);
        R(this, "loadFilePromise")
    };
    hq.prototype.unload = function() {
        R(this, "unload")
    };
    hq.prototype.unloadAndStop = function(a) {
        Q(a, "Boolean", !0);
        R(this, "unloadAndStop")
    };
    var kq = function() {
        Xp.call(this);
        P(this, "graphics", Oo.create(this.__swiffy_d))
    };
    N(kq, "flash.display.Shape", Xp);
    vk(kq, function(a, b) {
        return new Qj(a, b)
    });
    var lq = function() {
            bq.call(this);
            this.__swiffy_d.ef = !0
        },
        mq = N(lq, "flash.display.SimpleButton", bq);
    vk(lq, function(a, b) {
        var c = new mh(0, !1, [], [], []);
        return new Uj(c, a, null, b)
    });
    lq.prototype.enabled = !0;
    lq.prototype.useHandCursor = !0;
    var nq = function(a, b) {
        L(mq, a, function() {
            var a = this.__swiffy_d.Rt(b);
            return a ? a.$ : null
        });
        M(mq, a, function(a) {
            a = rn(a, Yp);
            this.__swiffy_d.St(b, a ? a.__swiffy_d : null)
        })
    };
    nq("upState", 1);
    nq("overState", 2);
    nq("downState", 4);
    nq("hitTestState", 8);
    var oq = function() {
            bq.call(this);
            var a = this.__swiffy_d;
            a.Cr(!1);
            P(this, "graphics", Oo.create(a))
        },
        pq = N(oq, "flash.display.Sprite", gq);
    kh(oq, new Ei(0, 0, null, null));
    Object.defineProperty(oq.prototype, "buttonMode", {
        set: function(a) {
            this.__swiffy_d.Cr(Boolean(a))
        },
        get: function() {
            return this.__swiffy_d.Xg
        }
    });
    Object.defineProperty(oq.prototype, "soundTransform", {
        set: function(a) {
            Q(a, "flash.media.SoundTransform");
            R(this, "soundTransform")
        },
        get: function() {
            R(this, "soundTransform");
            return new qq
        }
    });
    oq.prototype.useHandCursor = !0;
    var rq = function() {
        oq.call(this)
    };
    N(rq, "flash.display.MovieClip", oq);
    rq.prototype.addFrameScript = function(a, b) {
        for (var c = 0; c < arguments.length; c += 2) this.__swiffy_d.lp[arguments[c]] = arguments[c + 1]
    };
    rq.prototype.stop = function() {
        this.__swiffy_d.stop()
    };
    rq.prototype.play = function() {
        this.__swiffy_d.play()
    };
    rq.prototype.prevScene = function() {
        this.__swiffy_d.Jw()
    };
    rq.prototype.nextScene = function() {
        this.__swiffy_d.Hw()
    };
    rq.prototype.prevFrame = function() {
        this.__swiffy_d.Bm()
    };
    rq.prototype.nextFrame = function() {
        this.__swiffy_d.Yh()
    };
    var sq = function(a, b, c, d) {
        var e = a.__swiffy_d,
            f = e.Nf(b, c);
        if (k(f)) e.c.ha().Ce(function() {
            e.He(f, d)
        });
        else if (0 != b) throw J(2109, b, c);
    };
    rq.prototype.gotoAndStop = function(a, b) {
        sq(this, a, b, !1)
    };
    rq.prototype.gotoAndPlay = function(a, b) {
        sq(this, a, b, !0)
    };
    Object.defineProperty(rq.prototype, "currentFrame", {
        get: function() {
            return this.__swiffy_d.eb + 1
        }
    });
    Object.defineProperty(rq.prototype, "framesLoaded", {
        get: function() {
            return this.__swiffy_d.definition.frameCount
        }
    });
    Object.defineProperty(rq.prototype, "totalFrames", {
        get: function() {
            return this.__swiffy_d.definition.frameCount
        }
    });
    Object.defineProperty(rq.prototype, "cacheAsBitmap", {
        get: function() {
            return this.__swiffy_d.qr()
        },
        set: function(a) {
            this.__swiffy_d.$k(Boolean(a))
        }
    });
    var uq = function() {
            bq.call(this);
            P(this, "allowsFullScreen", !1);
            P(this, "allowsFullScreenInteractive", !1);
            O(this, "autoOrients", "Boolean", !1);
            O(this, "color", "uint", 0);
            O(this, "colorCorrection", "String", "default");
            P(this, "colorCorrectionSupport", "unsupported");
            P(this, "contentsScaleFactor", 1);
            P(this, "deviceOrientation", "unknown");
            O(this, "focus", "flash.display.InteractiveObject", null);
            O(this, "fullScreenSourceRect", "flash.geom.Rectangle", null);
            O(this, "mouseLock", "Boolean", !1);
            P(this, "nativeWindow", null);
            P(this,
                "orientation", "unknown");
            O(this, "quality", "String", Yo.HIGH);
            O(this, "showDefaultContextMenu", "Boolean", !0);
            P(this, "softKeyboardRect", new tq(0, 0, 0, 0));
            P(this, "stage3Ds", null);
            O(this, "stageFocusRect", "Boolean", !0);
            P(this, "stageVideos", null);
            P(this, "supportedOrientations", ["default"]);
            P(this, "wmodeGPU", !1)
        },
        vq = N(uq, "flash.display.Stage", gq);
    P(vq, "supportsOrientationChange", !1);
    uq.prototype.assignFocus = function(a, b) {
        Q(a, "flash.display.InteractiveObject");
        Q(b, "String");
        R(this, "assignFocus")
    };
    uq.prototype.invalidate = function() {
        this.__swiffy_d.c.Ns()
    };
    uq.prototype.isFocusInaccessible = function() {
        R(this, "isFocusInaccessible");
        return !1
    };
    uq.prototype.setAspectRatio = function(a) {
        Q(a, "String");
        R(this, "setAspectRatio")
    };
    uq.prototype.setOrientation = function(a) {
        Q(a, "String");
        R(this, "setOrientation")
    };
    Object.defineProperty(uq.prototype, "displayState", {
        get: function() {
            return "normal"
        },
        set: function(a) {
            a = Q(a, "String");
            t: {
                for (var b in Wj)
                    if (a == Wj[b]) {
                        a = Wj[b];
                        break t
                    }
                a = null
            }
            if (null === a) throw J(2008, "displayState");
            if ("normal" != a) throw J(2152);
        }
    });
    Object.defineProperty(uq.prototype, "stageWidth", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Kc ? a.Md : a.yi
        },
        set: function() {}
    });
    Object.defineProperty(uq.prototype, "stageHeight", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Kc ? a.Ld : a.xi
        },
        set: function() {}
    });
    Object.defineProperty(uq.prototype, "fullScreenWidth", {
        get: function() {
            R(this, "fullScreenWidth");
            return this.stageWidth
        }
    });
    Object.defineProperty(uq.prototype, "fullScreenHeight", {
        get: function() {
            R(this, "fullScreenHeight");
            return this.stageHeight
        }
    });
    Object.defineProperty(uq.prototype, "frameRate", {
        get: function() {
            return this.__swiffy_d.c.ql().ro
        },
        set: function(a) {
            Q(a, "Number");
            R(this, "frameRate")
        }
    });
    Object.defineProperty(uq.prototype, "scaleMode", {
        get: function() {
            return this.__swiffy_d.Kc
        },
        set: function(a) {
            a = Q(a, "String");
            var b = this.__swiffy_d;
            switch (a) {
                case "showAll":
                case "exactFit":
                case "noBorder":
                case "noScale":
                    break;
                default:
                    throw J(2008, "scaleMode");
            }
            b.Hr(a)
        }
    });
    Object.defineProperty(uq.prototype, "align", {
        get: function() {
            var a = this.__swiffy_d.ge,
                b = "";
            a & 2 && (b += "T");
            a & 8 && (b += "B");
            a & 1 && (b += "L");
            a & 4 && (b += "R");
            return b
        },
        set: function(a) {
            a = Q(a, "String");
            this.__swiffy_d.wr(a)
        }
    });
    var Fe = function(a, b, c, d, e, f, h, l, n, r, t, p) {
        Up.call(this);
        a = Q(a, "Number", 4);
        b = Q(b, "Number", 45);
        c = Q(c, "uint", 16777215);
        d = Q(d, "Number", 1);
        e = Q(e, "uint", 0);
        f = Q(f, "Number", 1);
        h = Q(h, "Number", 4);
        l = Q(l, "Number", 4);
        n = Q(n, "Number", 1);
        r = Q(r, "int", 1);
        t = Q(t, "String", "inner");
        p = Q(p, "Boolean", !1);
        O(this, "angle", "Number", b);
        O(this, "blurX", "Number", h);
        O(this, "blurY", "Number", l);
        O(this, "distance", "Number", a);
        O(this, "highlightAlpha", "Number", d);
        O(this, "highlightColor", "uint", c);
        O(this, "knockout", "Boolean", p);
        O(this, "quality",
            "int", r);
        O(this, "shadowAlpha", "Number", f);
        O(this, "shadowColor", "uint", e);
        O(this, "strength", "Number", n);
        O(this, "type", "String", t)
    };
    N(Fe, "flash.filters.BevelFilter", Up);
    Fe.prototype.Id = function() {
        return new De(this.angle * Math.PI / 180, Xc(this.highlightColor, this.highlightAlpha), Xc(this.shadowColor, this.shadowAlpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
    };
    Fe.prototype.clone = function() {
        return new Fe(this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var se = function(a, b, c) {
        Up.call(this);
        a = Q(a, "Number", 4);
        b = Q(b, "Number", 4);
        c = Q(c, "int", 1);
        O(this, "blurX", "Number", a);
        O(this, "blurY", "Number", b);
        O(this, "quality", "int", c)
    };
    N(se, "flash.filters.BlurFilter", Up);
    se.prototype.Id = function() {
        return new qe(this.quality, this.blurX, this.blurY)
    };
    se.prototype.clone = function() {
        return new se(this.blurX, this.blurY, this.quality)
    };
    var ve = function(a) {
        Up.call(this);
        var b;
        Object.defineProperty(this, "matrix", {
            get: function() {
                return b
            },
            set: function(a) {
                b = Q(a, "Array");
                if (null != b)
                    if (20 < b.length) b.length = 20;
                    else
                        for (; 20 > b.length;) b.push(0);
                else b = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
            }
        });
        this.matrix = a
    };
    N(ve, "flash.filters.ColorMatrixFilter", Up);
    ve.prototype.Id = function() {
        return new te(this.matrix)
    };
    ve.prototype.clone = function() {
        return new ve(this.matrix.slice(0))
    };
    var Ie = function(a, b, c, d, e, f, h, l, n) {
        Up.call(this);
        a = Q(a, "Number", 0);
        b = Q(b, "Number", 0);
        d = Q(d, "Number", 1);
        e = Q(e, "Number", 0);
        f = Q(f, "Boolean", !0);
        h = Q(h, "Boolean", !0);
        var r;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return r
            },
            set: function(a) {
                r = Math.min(1, Math.floor(255 * Q(a, "Number", 0)) / 255)
            }
        });
        this.alpha = n;
        O(this, "bias", "Number", e);
        O(this, "clamp", "Boolean", h);
        var t;
        Object.defineProperty(this, "color", {
            get: function() {
                return t
            },
            set: function(a) {
                t = a & 16777215
            }
        });
        this.color = l;
        O(this, "divisor", "Number",
            d);
        O(this, "matrixX", "Number", a);
        O(this, "matrixY", "Number", b);
        var p = [];
        Object.defineProperty(this, "matrix", {
            get: function() {
                return p
            },
            set: function(a) {
                p = Q(a, "Array");
                a = this.matrixY * this.matrixX;
                null != p || (p = []);
                if (p.length > a) p.length = a;
                else
                    for (; p.length < a;) p.push(0)
            }
        });
        k(c) && (this.matrix = c);
        O(this, "preserveAlpha", "Boolean", f)
    };
    N(Ie, "flash.filters.ConvolutionFilter", Up);
    Ie.prototype.Id = function() {
        return new Ge(this.bias, this.clamp, Xc(this.color, this.alpha), this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
    };
    Ie.prototype.clone = function() {
        return new Ie(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color, this.alpha)
    };
    var wq = function(a, b, c, d, e, f, h, l, n) {
        Up.call(this);
        c = Q(c, "uint", 0);
        d = Q(d, "uint", 0);
        e = Q(e, "Number", 0);
        f = Q(f, "Number", 0);
        h = Q(h, "String", "wrap");
        var r;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return r
            },
            set: function(a) {
                r = Math.min(1, Math.floor(255 * Q(a, "Number", 0)) / 255)
            }
        });
        this.alpha = n;
        var t;
        Object.defineProperty(this, "color", {
            get: function() {
                return t
            },
            set: function(a) {
                t = Q(a, "uint", 0) % 16777216
            }
        });
        this.color = l;
        O(this, "componentX", "uint", c);
        O(this, "componentY", "uint", d);
        O(this, "mapBitmap", "flash.display.BitmapData",
            a);
        var p;
        Object.defineProperty(this, "mapPoint", {
            get: function() {
                return p
            },
            set: function(a) {
                a = Q(a, "flash.geom.Point", null);
                p = null != a ? new Zp(a.x, a.y) : new Zp(0, 0)
            }
        });
        this.mapPoint = b;
        O(this, "mode", "String", h);
        O(this, "scaleX", "Number", e);
        O(this, "scaleY", "Number", f)
    };
    N(wq, "flash.filters.DisplacementMapFilter", Up);
    wq.prototype.clone = function() {
        return new wq(this.mapBitmap, this.mapPoint, this.componentX, this.componentY, this.scaleX, this.scaleY, this.mode, this.color, this.alpha)
    };
    var xq = function() {};
    xq.u = N(xq, "flash.filters.DisplacementMapFilterMode");
    Object.defineProperties(xq.u, {
        CLAMP: {
            value: "clamp"
        },
        COLOR: {
            value: "color"
        },
        IGNORE: {
            value: "ignore"
        },
        WRAP: {
            value: "wrap"
        }
    });
    var Me = function(a, b, c, d, e, f, h, l, n, r, t) {
        Up.call(this);
        a = Q(a, "Number", 4);
        b = Q(b, "Number", 45);
        c = Q(c, "uint", 0);
        d = Q(d, "Number", 1);
        e = Q(e, "Number", 4);
        f = Q(f, "Number", 4);
        h = Q(h, "Number", 1);
        l = Q(l, "int", 1);
        n = Q(n, "Boolean", !1);
        r = Q(r, "Boolean", !1);
        t = Q(t, "Boolean", !1);
        var p;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return p
            },
            set: function(a) {
                p = Math.min(1, Math.floor(255 * Q(a, "Number", 0)) / 255)
            }
        });
        this.alpha = d;
        O(this, "angle", "Number", b);
        O(this, "blurX", "Number", e);
        O(this, "blurY", "Number", f);
        var s;
        Object.defineProperty(this,
            "color", {
                get: function() {
                    return s
                },
                set: function(a) {
                    s = Q(a, "uint", 0) % 16777216
                }
            });
        this.color = c;
        O(this, "distance", "Number", a);
        O(this, "hideObject", "Boolean", t);
        O(this, "inner", "Boolean", n);
        O(this, "knockout", "Boolean", r);
        O(this, "quality", "int", l);
        O(this, "strength", "Number", h)
    };
    N(Me, "flash.filters.DropShadowFilter", Up);
    Me.prototype.Id = function() {
        return new Je(this.angle * Math.PI / 180, Xc(this.color, this.alpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, Ke(this.hideObject, this.inner, this.knockout))
    };
    Me.prototype.clone = function() {
        return new Me(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject)
    };
    var yq = function(a, b, c, d, e, f, h, l) {
        Up.call(this);
        c = Q(c, "Number", 6);
        d = Q(d, "Number", 6);
        e = Q(e, "Number", 2);
        f = Q(f, "int", 1);
        h = Q(h, "Boolean", !1);
        l = Q(l, "Boolean", !1);
        var n;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return n
            },
            set: function(a) {
                n = Math.min(1, Math.floor(255 * Q(a, "Number", 1)) / 255)
            }
        });
        this.alpha = b;
        O(this, "blurX", "Number", c);
        O(this, "blurY", "Number", d);
        var r;
        Object.defineProperty(this, "color", {
            get: function() {
                return r
            },
            set: function(a) {
                r = Q(a, "uint", 16711680) % 16777216
            }
        });
        this.color = a;
        O(this, "inner",
            "Boolean", h);
        O(this, "knockout", "Boolean", l);
        O(this, "quality", "int", f);
        O(this, "strength", "Number", e)
    };
    N(yq, "flash.filters.GlowFilter", Up);
    yq.prototype.Id = function() {
        return new Je(0, Xc(this.color, this.alpha), 0, this.strength, this.quality, this.blurX, this.blurY, Ke(!1, this.inner, this.knockout))
    };
    yq.prototype.clone = function() {
        return new yq(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout)
    };
    var Qe = function(a, b, c, d, e, f, h, l, n, r, t) {
        Up.call(this);
        a = Q(a, "Number", 4);
        b = Q(b, "Number", 45);
        f = Q(f, "Number", 4);
        h = Q(h, "Number", 4);
        l = Q(l, "Number", 1);
        n = Q(n, "int", 1);
        r = Q(r, "String", "inner");
        t = Q(t, "Boolean", !1);
        var p = [];
        Object.defineProperty(this, "colors", {
            get: function() {
                return p
            },
            set: function(a) {
                p = Q(a, "Array", []);
                k(p) || (p = []);
                for (a = 0; a < p.length; a++) p[a] = Q(p[a], "uint", 16711680) % 16777216
            }
        });
        this.colors = c;
        var s = [];
        Object.defineProperty(this, "alphas", {
            get: function() {
                return s
            },
            set: function(a) {
                s = Q(a, "Array", []);
                k(s) || (s = []);
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) s[b] = Math.min(1, Math.floor(255 * Q(s[b], "Number", 1)) / 255);
                s.length = a
            }
        });
        this.alphas = d;
        var u = [];
        Object.defineProperty(this, "ratios", {
            get: function() {
                return u
            },
            set: function(a) {
                u = Q(a, "Array", []);
                k(u) || (u = []);
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) u[b] = Math.floor(Q(u[b], "Number", 0)), 0 > u[b] ? u[b] = 0 : 255 < u[b] && (u[b] = 255);
                u.length = a
            }
        });
        this.ratios = e;
        O(this, "angle", "Number", b);
        O(this, "blurX", "Number", f);
        O(this, "blurY", "Number", h);
        O(this, "distance", "Number", a);
        O(this, "knockout", "Boolean", t);
        O(this, "quality", "int", n);
        O(this, "strength", "Number", l);
        O(this, "type", "String", r)
    };
    N(Qe, "flash.filters.GradientBevelFilter", Up);
    Qe.prototype.Id = function() {
        return new Ne(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
    };
    Qe.prototype.clone = function() {
        return new Qe(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var Te = function(a, b, c, d, e, f, h, l, n, r, t) {
        Up.call(this);
        a = Q(a, "Number", 4);
        b = Q(b, "Number", 45);
        f = Q(f, "Number", 4);
        h = Q(h, "Number", 4);
        l = Q(l, "Number", 1);
        n = Q(n, "int", 1);
        r = Q(r, "String", "inner");
        t = Q(t, "Boolean", !1);
        var p = [];
        Object.defineProperty(this, "colors", {
            get: function() {
                return p
            },
            set: function(a) {
                p = Q(a, "Array", []);
                k(p) || (p = []);
                for (a = 0; a < p.length; a++) p[a] = Q(p[a], "uint", 16711680) % 16777216
            }
        });
        this.colors = c;
        var s = [];
        Object.defineProperty(this, "alphas", {
            get: function() {
                return s
            },
            set: function(a) {
                s = Q(a, "Array", []);
                k(s) || (s = []);
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) s[b] = Math.min(1, Math.floor(255 * Q(s[b], "Number", 1)) / 255);
                s.length = a
            }
        });
        this.alphas = d;
        var u = [];
        Object.defineProperty(this, "ratios", {
            get: function() {
                return u
            },
            set: function(a) {
                u = Q(a, "Array", []);
                k(u) || (u = []);
                a = k(p) ? p.length : 0;
                for (var b = 0; b < a; b++) u[b] = Math.floor(Q(u[b], "Number", 0)), 0 > u[b] ? u[b] = 0 : 255 < u[b] && (u[b] = 255);
                u.length = a
            }
        });
        this.ratios = e;
        O(this, "angle", "Number", b);
        O(this, "blurX", "Number", f);
        O(this, "blurY", "Number", h);
        O(this, "distance", "Number", a);
        O(this, "knockout", "Boolean", t);
        O(this, "quality", "int", n);
        O(this, "strength", "Number", l);
        O(this, "type", "String", r)
    };
    N(Te, "flash.filters.GradientGlowFilter", Up);
    Te.prototype.Id = function() {
        return new Re(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, Be(this.type, this.knockout))
    };
    Te.prototype.clone = function() {
        return new Te(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var zq = function(a, b, c, d, e, f, h, l) {
        a = Q(a, "Number", 1);
        b = Q(b, "Number", 1);
        c = Q(c, "Number", 1);
        d = Q(d, "Number", 1);
        e = Q(e, "Number", 0);
        f = Q(f, "Number", 0);
        h = Q(h, "Number", 0);
        l = Q(l, "Number", 0);
        Object.defineProperty(this, "__swiffy_v", {
            writable: !0,
            value: new Yc(a, e, b, f, c, h, d, l)
        })
    };
    N(zq, "flash.geom.ColorTransform");
    var Aq = function(a) {
        return new zq(a.xa, a.wa, a.va, a.ua, a.sa, a.qa, a.pa, a.ta)
    };
    Object.defineProperty(zq.prototype, "redMultiplier", {
        get: function() {
            return this.__swiffy_v.xa
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(a, b.sa, b.wa, b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "greenMultiplier", {
        get: function() {
            return this.__swiffy_v.wa
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, a, b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "blueMultiplier", {
        get: function() {
            return this.__swiffy_v.va
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, a, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "alphaMultiplier", {
        get: function() {
            return this.__swiffy_v.ua
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, b.pa, a, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "redOffset", {
        get: function() {
            return this.__swiffy_v.sa
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, a, b.wa, b.qa, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "greenOffset", {
        get: function() {
            return this.__swiffy_v.qa
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, a, b.va, b.pa, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "blueOffset", {
        get: function() {
            return this.__swiffy_v.pa
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, a, b.ua, b.ta)
        }
    });
    Object.defineProperty(zq.prototype, "alphaOffset", {
        get: function() {
            return this.__swiffy_v.ta
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(b.xa, b.sa, b.wa, b.qa, b.va, b.pa, b.ua, a)
        }
    });
    Object.defineProperty(zq.prototype, "color", {
        get: function() {
            return (this.__swiffy_v.sa << 16 | this.__swiffy_v.qa << 8 | this.__swiffy_v.pa) >>> 0
        },
        set: function(a) {
            a = Q(a, "uint");
            var b = this.__swiffy_v;
            this.__swiffy_v = new Yc(0, a >> 16 & 255, 0, a >> 8 & 255, 0, a & 255, b.ua, b.ta)
        }
    });
    zq.prototype.concat = function(a) {
        a = Q(a, "flash.geom.ColorTransform");
        this.__swiffy_v = this.__swiffy_v.Gl(a.__swiffy_v)
    };
    zq.prototype.toString = function() {
        return "(redMultiplier=" + this.__swiffy_v.xa + ", greenMultiplier=" + this.__swiffy_v.wa + ", blueMultiplier=" + this.__swiffy_v.va + ", alphaMultiplier=" + this.__swiffy_v.ua + ", redOffset=" + this.__swiffy_v.sa + ", greenOffset=" + this.__swiffy_v.qa + ", blueOffset=" + this.__swiffy_v.pa + ", alphaOffset=" + this.__swiffy_v.ta + ")"
    };
    var Bq = function(a, b, c, d, e, f) {
        a = Q(a, "Number", 1);
        b = Q(b, "Number", 0);
        c = Q(c, "Number", 0);
        d = Q(d, "Number", 1);
        e = Q(e, "Number", 0);
        f = Q(f, "Number", 0);
        Object.defineProperty(this, "__swiffy_v", {
            writable: !0,
            value: Uc(a, b, c, d, e, f)
        })
    };
    N(Bq, "flash.geom.Matrix");
    var Po = function(a) {
            a = a.__swiffy_v;
            return a.Uc(20 * a.p, 20 * a.q)
        },
        Cq = function(a) {
            return new Bq(a.l, a.o, a.m, a.k, a.p / 20, a.q / 20)
        };
    Object.defineProperty(Bq.prototype, "a", {
        get: function() {
            return this.__swiffy_v.l
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(a, b.o, b.m, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(Bq.prototype, "b", {
        get: function() {
            return this.__swiffy_v.o
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, a, b.m, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(Bq.prototype, "c", {
        get: function() {
            return this.__swiffy_v.m
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, b.o, a, b.k, b.p, b.q)
        }
    });
    Object.defineProperty(Bq.prototype, "d", {
        get: function() {
            return this.__swiffy_v.k
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = Uc(b.l, b.o, b.m, a, b.p, b.q)
        }
    });
    Object.defineProperty(Bq.prototype, "tx", {
        get: function() {
            return this.__swiffy_v.p
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = b.Uc(a, b.q)
        }
    });
    Object.defineProperty(Bq.prototype, "ty", {
        get: function() {
            return this.__swiffy_v.q
        },
        set: function(a) {
            a = Q(a, "Number");
            var b = this.__swiffy_v;
            this.__swiffy_v = b.Uc(b.p, a)
        }
    });
    Bq.prototype.clone = function() {
        var a = new Bq;
        a.__swiffy_v = this.__swiffy_v;
        return a
    };
    Bq.prototype.concat = function(a) {
        a = Q(a, "flash.geom.Matrix");
        this.__swiffy_v = this.__swiffy_v.multiply(a.__swiffy_v)
    };
    Bq.prototype.copyColumnFrom = function(a, b) {
        a = Q(a, "uint");
        b = Q(b, "flash.geom.Vector3D");
        var c = this.__swiffy_v.l,
            d = this.__swiffy_v.o,
            e = this.__swiffy_v.m,
            f = this.__swiffy_v.k,
            h = this.__swiffy_v.p,
            l = this.__swiffy_v.q;
        switch (a) {
            case 0:
                c = b.x;
                d = b.y;
                break;
            case 1:
                e = b.x;
                f = b.y;
                break;
            case 2:
                h = b.x;
                l = b.y;
                break;
            default:
                return
        }
        this.__swiffy_v = Uc(c, d, e, f, h, l)
    };
    Bq.prototype.copyColumnTo = function(a, b) {
        a = Q(a, "uint");
        b = Q(b, "flash.geom.Vector3D");
        switch (a) {
            case 0:
                b.x = this.__swiffy_v.l;
                b.y = this.__swiffy_v.o;
                b.z = 0;
                break;
            case 1:
                b.x = this.__swiffy_v.m;
                b.y = this.__swiffy_v.k;
                b.z = 0;
                break;
            case 2:
                b.x = this.__swiffy_v.p, b.y = this.__swiffy_v.q, b.z = 1
        }
    };
    Bq.prototype.copyFrom = function(a) {
        a = Q(a, "flash.geom.Matrix");
        this.__swiffy_v = a.__swiffy_v
    };
    Bq.prototype.copyRowFrom = function(a, b) {
        a = Q(a, "uint");
        b = Q(b, "flash.geom.Vector3D");
        var c = this.__swiffy_v.l,
            d = this.__swiffy_v.o,
            e = this.__swiffy_v.m,
            f = this.__swiffy_v.k,
            h = this.__swiffy_v.p,
            l = this.__swiffy_v.q;
        switch (a) {
            case 0:
                c = b.x;
                e = b.y;
                h = b.z;
                break;
            case 1:
                d = b.x;
                f = b.y;
                l = b.z;
                break;
            default:
                return
        }
        this.__swiffy_v = Uc(c, d, e, f, h, l)
    };
    Bq.prototype.copyRowTo = function(a, b) {
        a = Q(a, "uint");
        b = Q(b, "flash.geom.Vector3D");
        switch (a) {
            case 0:
                b.x = this.__swiffy_v.l;
                b.y = this.__swiffy_v.m;
                b.z = this.__swiffy_v.p;
                break;
            case 1:
                b.x = this.__swiffy_v.m;
                b.y = this.__swiffy_v.k;
                b.z = this.__swiffy_v.q;
                break;
            case 2:
                b.x = 0, b.y = 0, b.z = 1
        }
    };
    Bq.prototype.createBox = function(a, b, c, d, e) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number", 0);
        d = Q(d, "Number", 0);
        e = Q(e, "Number", 0);
        this.__swiffy_v = Ic.Xh(-c).Ae(a, b).Cd(d, e)
    };
    Bq.prototype.createGradientBox = function(a, b, c, d, e) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number", 0);
        d = Q(d, "Number", 0);
        e = Q(e, "Number", 0);
        this.__swiffy_v = Ai(a, b, c, d, e)
    };
    Bq.prototype.deltaTransformPoint = function(a) {
        a = Q(a, "flash.geom.Point");
        return new Zp(this.__swiffy_v.l * a.x + this.__swiffy_v.m * a.y, this.__swiffy_v.o * a.x + this.__swiffy_v.k * a.y)
    };
    Bq.prototype.identity = function() {
        this.__swiffy_v = Ic
    };
    Bq.prototype.invert = function() {
        var a = this.__swiffy_v;
        this.__swiffy_v = a.Ql() ? a.Rd() : Uc(Infinity, 0, 0, Infinity, NaN, NaN)
    };
    Bq.prototype.rotate = function(a) {
        a = Q(a, "Number");
        this.__swiffy_v = this.__swiffy_v.Xh(-a)
    };
    Bq.prototype.scale = function(a, b) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        this.__swiffy_v = this.__swiffy_v.Ae(a, b)
    };
    Bq.prototype.setTo = function(a, b, c, d, e, f) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        c = Q(c, "Number");
        d = Q(d, "Number");
        e = Q(e, "Number");
        f = Q(f, "Number");
        this.__swiffy_v = Uc(a, b, c, d, e, f)
    };
    Bq.prototype.transformPoint = function(a) {
        a = Q(a, "flash.geom.Point");
        return new Zp(this.__swiffy_v.l * a.x + this.__swiffy_v.m * a.y + this.__swiffy_v.p, this.__swiffy_v.o * a.x + this.__swiffy_v.k * a.y + this.__swiffy_v.q)
    };
    Bq.prototype.translate = function(a, b) {
        a = Q(a, "Number");
        b = Q(b, "Number");
        this.__swiffy_v = this.__swiffy_v.Cd(a, b)
    };
    Bq.prototype.toString = function() {
        return "(a=" + this.__swiffy_v.l + ", b=" + this.__swiffy_v.o + ", c=" + this.__swiffy_v.m + ", d=" + this.__swiffy_v.k + ", tx=" + this.__swiffy_v.p + ", ty=" + this.__swiffy_v.q + ")"
    };
    var Zp = function(a, b) {
            a = Q(a, "Number", 0);
            b = Q(b, "Number", 0);
            O(this, "x", "Number", a);
            O(this, "y", "Number", b)
        },
        Dq = N(Zp, "flash.geom.Point");
    Object.defineProperty(Zp.prototype, "length", {
        get: function() {
            return Pc(this.x, this.y)
        }
    });
    Zp.prototype.add = function(a) {
        return new Zp(this.x + a.x, this.y + a.y)
    };
    Zp.prototype.clone = function() {
        return new Zp(this.x, this.y)
    };
    Zp.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y
    };
    Dq.distance = function(a, b) {
        return Pc(a.x - b.x, a.y - b.y)
    };
    Zp.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y
    };
    Dq.interpolate = function(a, b, c) {
        return new Zp(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c))
    };
    Zp.prototype.normalize = function(a) {
        a /= this.length;
        this.x *= a;
        this.y *= a
    };
    Zp.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    Dq.polar = function(a, b) {
        return new Zp(a * Math.cos(b), a * Math.sin(b))
    };
    Zp.prototype.setTo = function(a, b) {
        this.x = a;
        this.y = b
    };
    Zp.prototype.subtract = function(a) {
        return new Zp(this.x - a.x, this.y - a.y)
    };
    Zp.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ")"
    };
    var tq = function(a, b, c, d) {
        a = Q(a, "Number", 0);
        b = Q(b, "Number", 0);
        c = Q(c, "Number", 0);
        d = Q(d, "Number", 0);
        O(this, "x", "Number", a);
        O(this, "y", "Number", b);
        O(this, "width", "Number", c);
        O(this, "height", "Number", d)
    };
    N(tq, "flash.geom.Rectangle");
    Object.defineProperty(tq.prototype, "top", {
        get: function() {
            return this.y
        },
        set: function(a) {
            this.y = Q(a, "Number")
        }
    });
    Object.defineProperty(tq.prototype, "left", {
        get: function() {
            return this.x
        },
        set: function(a) {
            this.x = Q(a, "Number")
        }
    });
    Object.defineProperty(tq.prototype, "bottom", {
        get: function() {
            return this.y + this.height
        },
        set: function(a) {
            a = Q(a, "Number");
            this.height = a - this.y
        }
    });
    Object.defineProperty(tq.prototype, "right", {
        get: function() {
            return this.x + this.width
        },
        set: function(a) {
            a = Q(a, "Number");
            this.width = a - this.x
        }
    });
    Object.defineProperty(tq.prototype, "topLeft", {
        get: function() {
            return new Zp(this.left, this.top)
        },
        set: function(a) {
            a = Q(a, "flash.geom.Point");
            this.left = a.x;
            this.top = a.y
        }
    });
    Object.defineProperty(tq.prototype, "bottomRight", {
        get: function() {
            return new Zp(this.right, this.bottom)
        },
        set: function(a) {
            a = Q(a, "flash.geom.Point");
            this.right = a.x;
            this.bottom = a.y
        }
    });
    Object.defineProperty(tq.prototype, "size", {
        get: function() {
            return new Zp(this.width, this.height)
        },
        set: function(a) {
            a = Q(a, "flash.geom.Point");
            this.width = a.x;
            this.height = a.y
        }
    });
    tq.prototype.clone = function() {
        return new tq(this.x, this.y, this.width, this.height)
    };
    tq.prototype.contains = function(a, b) {
        return this.x <= a && this.y <= b && a < this.right && b < this.bottom
    };
    tq.prototype.containsPoint = function(a) {
        return this.contains(a.x, a.y)
    };
    tq.prototype.containsRect = function(a) {
        var b = this.right,
            c = this.bottom,
            d = a.right,
            e = a.bottom;
        return this.x <= a.x && this.y <= a.y && a.x < b && a.y < c && this.x < d && this.y < e && d <= b && e <= c
    };
    tq.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height
    };
    tq.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height
    };
    tq.prototype.inflate = function(a, b) {
        this.x -= a;
        this.y -= b;
        this.width += 2 * a;
        this.height += 2 * b
    };
    tq.prototype.inflatePoint = function(a) {
        this.inflate(a.x, a.y)
    };
    tq.prototype.intersection = function(a) {
        if (this.intersects(a)) {
            var b = Math.max(this.x, a.x),
                c = Math.max(this.y, a.y),
                d = Math.min(this.right, a.right);
            a = Math.min(this.bottom, a.bottom);
            return new tq(b, c, d - b, a - c)
        }
        return new tq
    };
    tq.prototype.intersects = function(a) {
        return 0 < a.width && 0 < a.height && 0 < this.width && 0 < this.height && a.x < this.right && a.y < this.bottom && a.right > this.x && a.bottom > this.y
    };
    tq.prototype.isEmpty = function() {
        return 0 >= this.width || 0 >= this.height
    };
    tq.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    tq.prototype.offsetPoint = function(a) {
        this.offset(a.x, a.y)
    };
    tq.prototype.setEmpty = function() {
        this.height = this.width = this.y = this.x = 0
    };
    tq.prototype.setTo = function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d
    };
    tq.prototype.union = function(a) {
        if (this.isEmpty()) return a.clone();
        if (a.isEmpty()) return this.clone();
        var b = Math.min(this.x, a.x),
            c = Math.min(this.y, a.y),
            d = Math.max(this.right, a.right);
        a = Math.max(this.bottom, a.bottom);
        return new tq(b, c, d - b, a - c)
    };
    tq.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")"
    };
    var X = function(a, b, c, d) {
        a = Q(a, "int");
        b = Q(b, "int");
        c = Q(c, "Boolean", !0);
        d = Q(d, "uint", 4294967295);
        if (!(8191 >= a && 8191 >= b && 16777215 >= a * b)) throw J(2015, "BitmapData");
        this.__swiffy_d.xb(a, b, c, d)
    };
    N(X, "flash.display.BitmapData", bn, [Qo]);
    Object.defineProperty(X.prototype, "width", {
        get: function() {
            return this.__swiffy_d.Fa()
        }
    });
    Object.defineProperty(X.prototype, "height", {
        get: function() {
            return this.__swiffy_d.Ta()
        }
    });
    Object.defineProperty(X.prototype, "rect", {
        get: function() {
            return new tq(0, 0, this.__swiffy_d.Fa(), this.__swiffy_d.Ta())
        }
    });
    Object.defineProperty(X.prototype, "transparent", {
        get: function() {
            return this.__swiffy_d.Lc
        }
    });
    X.prototype.applyFilter = function() {
        R(this, "applyFilter")
    };
    X.prototype.clone = function() {
        R(this, "clone");
        return null
    };
    X.prototype.colorTransform = function(a, b) {
        Q(a, "flash.geom.Rectangle");
        Q(b, "flash.geom.ColorTransform");
        R(this, "colorTransform")
    };
    X.prototype.compare = function(a) {
        Q(a, "flash.display.BitmapData");
        R(this, "compare");
        return 0
    };
    X.prototype.copyChannel = function(a, b, c, d, e) {
        Q(a, "flash.display.BitmapData");
        Q(b, "flash.geom.Rectangle");
        Q(c, "flash.geom.Point");
        Q(d, "uint");
        Q(e, "uint");
        R(this, "copyChannel")
    };
    X.prototype.copyPixels = function(a, b, c, d, e, f) {
        a = Q(a, "flash.display.BitmapData");
        b = Q(b, "flash.geom.Rectangle");
        c = Q(c, "flash.geom.Point");
        d = Q(d, "flash.display.BitmapData", null);
        e = Q(e, "flash.geom.Point", null);
        f = Q(f, "Boolean", !1);
        this.__swiffy_d.ar(a.__swiffy_d, b.x, b.y, b.width, b.height, c.x, c.y, d ? d.__swiffy_d : null, (e || b).x, (e || b).y, f)
    };
    X.prototype.copyPixelsToByteArray = function(a, b) {
        a = Q(a, "flash.geom.Rectangle");
        b = Q(b, "flash.utils.ByteArray");
        var c = this.__swiffy_d.tw(a.x, a.y, a.width, a.height, b.endian == Eq.LITTLE_ENDIAN),
            d = c.byteLength,
            e = void 0 === d;
        e && (d = c.length);
        if (0 != d) {
            var f = Fq(b, d);
            if (e)
                for (e = 0; e < d; ++e) f[e] = c[e];
            else f.set(new Uint8Array(c.buffer, c.byteOffset, c.byteLength))
        }
    };
    X.prototype.dispose = function() {
        this.__swiffy_d.ck()
    };
    X.prototype.draw = function() {
        R(this, "draw")
    };
    X.prototype.drawWithQuality = function(a, b, c, d, e, f, h) {
        Q(a, "flash.display.IBitmapDrawable");
        Q(b, "flash.geom.Matrix", null);
        Q(c, "flash.geom.ColorTransform", null);
        Q(d, "String", null);
        Q(e, "flash.geom.Rectangle", null);
        Q(f, "Boolean", !1);
        Q(h, "String", null);
        R(this, "drawWithQuality")
    };
    X.prototype.encode = function(a, b, c) {
        Q(a, "flash.geom.Rectangle");
        Q(b, "Object");
        Q(c, "flash.utils.ByteArray", null);
        R(this, "encode");
        return new Y
    };
    X.prototype.fillRect = function(a, b) {
        a = Q(a, "flash.geom.Rectangle");
        b = Q(b, "uint");
        this.__swiffy_d.fillRect(a.x, a.y, a.width, a.height, b)
    };
    X.prototype.floodFill = function(a, b, c) {
        Q(a, "int");
        Q(b, "int");
        Q(c, "uint");
        R(this, "floodFill")
    };
    X.prototype.generateFilterRect = function(a, b) {
        Q(a, "flash.geom.Rectangle");
        Q(b, "flash.filters.BitmapFilter");
        R(this, "generateFilterRect");
        return new tq
    };
    X.prototype.getColorBoundsRect = function(a, b, c) {
        Q(a, "uint");
        Q(b, "uint");
        Q(c, "Boolean", !0);
        R(this, "getColorBoundsRect");
        return new tq
    };
    X.prototype.getPixel = function(a, b) {
        a = Q(a, "int");
        b = Q(b, "int");
        return this.__swiffy_d.sw(a, b)
    };
    X.prototype.getPixel32 = function(a, b) {
        a = Q(a, "int");
        b = Q(b, "int");
        return this.__swiffy_d.Qm(a, b)
    };
    X.prototype.getPixels = function(a) {
        var b = new Y;
        this.copyPixelsToByteArray(a, b);
        return b
    };
    X.prototype.getVector = function(a) {
        a = Q(a, "flash.geom.Rectangle");
        a = this.__swiffy_d.uw(a.x, a.y, a.width, a.height);
        return fo(mo, a)
    };
    X.prototype.histogram = function(a) {
        Q(a, "flash.geom.Rectangle", null);
        R(this, "histogram");
        return fo(ko(no, !1, !1))
    };
    X.prototype.hitTest = function(a, b, c, d, e) {
        Q(a, "flash.geom.Point");
        Q(b, "uint");
        Q(c, "Object");
        Q(d, "flash.geom.Point", null);
        Q(e, "uint", 1);
        R(this, "hitTest");
        return !1
    };
    X.prototype.lock = function() {
        R(this, "lock");
        this.__swiffy_d.Ew()
    };
    X.prototype.merge = function(a, b, c, d, e, f, h) {
        Q(a, "flash.display.BitmapData");
        Q(b, "flash.geom.Rectangle");
        Q(c, "flash.geom.Point");
        Q(d, "uint");
        Q(e, "uint");
        Q(f, "uint");
        Q(h, "uint");
        R(this, "merge")
    };
    X.prototype.noise = function(a, b, c, d, e) {
        Q(a, "int");
        Q(b, "uint", 0);
        Q(c, "uint", 255);
        Q(d, "uint", 7);
        Q(e, "Boolean", !1);
        R(this, "noise")
    };
    X.prototype.paletteMap = function(a, b, c, d, e, f, h) {
        Q(a, "flash.display.BitmapData");
        Q(b, "flash.geom.Rectangle");
        Q(c, "flash.geom.Point");
        Q(d, "Array", null);
        Q(e, "Array", null);
        Q(f, "Array", null);
        Q(h, "Array", null);
        R(this, "paletteMap")
    };
    X.prototype.perlinNoise = function(a, b, c, d, e, f, h, l, n) {
        Q(a, "Number");
        Q(b, "Number");
        Q(c, "uint");
        Q(d, "int");
        Q(e, "Boolean");
        Q(f, "Boolean");
        Q(h, "uint", 7);
        Q(l, "Boolean", !1);
        Q(n, "Array", null);
        R(this, "perlinNoise")
    };
    X.prototype.pixelDissolve = function(a, b, c, d, e, f) {
        Q(a, "flash.display.BitmapData");
        Q(b, "flash.geom.Rectangle");
        Q(c, "flash.geom.Point");
        Q(d, "int", 0);
        Q(e, "int", 0);
        Q(f, "uint", 0);
        R(this, "pixelDissolve");
        return 0
    };
    X.prototype.scroll = function(a, b) {
        a = Q(a, "int");
        b = Q(b, "int");
        this.__swiffy_d.scroll(a, b)
    };
    X.prototype.setPixel = function(a, b, c) {
        a = Q(a, "int");
        b = Q(b, "int");
        c = Q(c, "uint");
        this.__swiffy_d.Xw(a, b, c)
    };
    X.prototype.setPixel32 = function(a, b, c) {
        a = Q(a, "int");
        b = Q(b, "int");
        c = Q(c, "uint");
        this.__swiffy_d.Vm(a, b, c)
    };
    X.prototype.setPixels = function(a, b) {
        a = Q(a, "flash.geom.Rectangle");
        b = Q(b, "flash.utils.ByteArray");
        var c = a.width,
            d = a.height,
            e = c * d * 4,
            f = Z(b),
            h = f.position;
        e + h > f.da.byteLength && (e = f.da.byteLength - h, 0 >= e && (h = 0));
        h = new Uint8Array(f.da.buffer, h, e);
        f.position += e;
        this.__swiffy_d.au(a.x, a.y, c, d, h, b.endian == Eq.LITTLE_ENDIAN)
    };
    X.prototype.setVector = function(a, b) {
        a = Q(a, "flash.geom.Rectangle");
        b = rn(b, mo);
        this.__swiffy_d.Yw(a.x, a.y, a.width, a.height, b.__swiffy_v)
    };
    X.prototype.threshold = function(a, b, c, d, e, f, h, l) {
        Q(a, "flash.display.BitmapData");
        Q(b, "flash.geom.Rectangle");
        Q(c, "flash.geom.Point");
        Q(d, "String");
        Q(e, "uint");
        Q(f, "uint", 0);
        Q(h, "uint", 4294967295);
        Q(l, "Boolean", !1);
        R(this, "threshold");
        return 0
    };
    X.prototype.unlock = function(a) {
        Q(a, "flash.geom.Rectangle", null);
        this.__swiffy_d.fx()
    };
    vk(X, function(a, b) {
        return new qj(pj, a, b)
    });
    var $p = function(a) {
        a = Q(a, "flash.display.DisplayObject");
        Object.defineProperty(this, "__swiffy_d", {
            value: a.__swiffy_d
        })
    };
    N($p, "flash.geom.Transform");
    Object.defineProperty($p.prototype, "colorTransform", {
        get: function() {
            return Aq(this.__swiffy_d.Fb)
        },
        set: function(a) {
            a = Q(a, "flash.geom.ColorTransform");
            var b = this.__swiffy_d;
            b.pc(a.__swiffy_v);
            b.cb()
        }
    });
    Object.defineProperty($p.prototype, "concatenatedColorTransform", {
        get: function() {
            return Aq(this.__swiffy_d.ld())
        }
    });
    Object.defineProperty($p.prototype, "concatenatedMatrix", {
        get: function() {
            return Cq(this.__swiffy_d.Ha())
        }
    });
    Object.defineProperty($p.prototype, "matrix", {
        get: function() {
            return Cq(this.__swiffy_d.Za())
        },
        set: function(a) {
            a = Q(a, "flash.geom.Matrix");
            var b = this.__swiffy_d;
            b.setTransform(Po(a));
            b.cb()
        }
    });
    Object.defineProperty($p.prototype, "pixelBounds", {
        get: function() {
            var a = this.__swiffy_d,
                b = a.tb().kd().clone();
            b.na(a.Ha());
            return new tq(Math.floor(b.j / 20), Math.floor(b.i / 20), Math.ceil((b.t - b.j) / 20), Math.ceil((b.s - b.i) / 20))
        }
    });
    var Gq = function(a, b, c, d) {
            this.w = k(d) ? Number(d) : 0;
            this.x = k(a) ? Number(a) : 0;
            this.y = k(b) ? Number(b) : 0;
            this.z = k(c) ? Number(c) : 0
        },
        Hq = N(Gq, "flash.geom.Vector3D");
    Object.defineProperty(Gq.prototype, "lengthSquared", {
        get: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }
    });
    Object.defineProperty(Gq.prototype, "length", {
        get: function() {
            return Math.sqrt(this.lengthSquared)
        }
    });
    Object.defineProperty(Hq, "X_AXIS", {
        value: new Gq(1, 0, 0, 0)
    });
    Object.defineProperty(Hq, "Y_AXIS", {
        value: new Gq(0, 1, 0, 0)
    });
    Object.defineProperty(Hq, "Z_AXIS", {
        value: new Gq(0, 0, 1, 0)
    });
    Gq.prototype.add = function(a) {
        return new Gq(this.x + a.x, this.y + a.y, this.z + a.z)
    };
    Hq.angleBetween = function() {
        return 0
    };
    Gq.prototype.clone = function() {
        return new Gq(this.x, this.y, this.z, this.w)
    };
    Gq.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w
    };
    Gq.prototype.crossProduct = function() {
        return new Gq
    };
    Gq.prototype.decrementBy = function() {};
    Hq.distance = function(a, b) {
        return a.subtract(b).length
    };
    Gq.prototype.dotProduct = function() {
        return 0
    };
    Gq.prototype.equals = function(a, b) {
        return this.x == a.x && this.y == a.y && this.z == a.z && (!b || this.w == a.w)
    };
    Gq.prototype.incrementBy = function() {};
    Gq.prototype.nearEquals = function() {
        return !1
    };
    Gq.prototype.negate = function() {};
    Gq.prototype.normalize = function() {
        return 0
    };
    Gq.prototype.project = function() {};
    Gq.prototype.scaleBy = function() {};
    Gq.prototype.setTo = function(a, b, c) {
        this.x = Number(a);
        this.y = Number(b);
        this.z = Number(c)
    };
    Gq.prototype.subtract = function(a) {
        return new Gq(this.x - a.x, this.y - a.y, this.z - a.z)
    };
    Gq.prototype.toString = function() {
        return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")"
    };
    var Iq = N(function() {}, "flash.media.AudioDecoder");
    Object.defineProperties(Iq, {
        DOLBY_DIGITAL: {
            value: "DolbyDigital"
        },
        DOLBY_DIGITAL_PLUS: {
            value: "DolbyDigitalPlus"
        },
        DTS: {
            value: "DTS"
        },
        DTS_EXPRESS: {
            value: "DTSExpress"
        },
        DTS_HD_HIGH_RESOLUTION_AUDIO: {
            value: "DTSHDHighResolutionAudio"
        },
        DTS_HD_MASTER_AUDIO: {
            value: "DTSHDMasterAudio"
        }
    });
    var Jq = function(a, b) {
        Q(a, "flash.net.URLRequest", null);
        Q(b, "flash.media.SoundLoaderContext", null);
        O(this, "bytesLoaded", "uint", 0);
        O(this, "bytesTotal", "Number", 0);
        O(this, "isBuffering", "Boolean", !1);
        O(this, "isURLInaccessible", "Boolean", !0);
        O(this, "length", "Number", 0);
        O(this, "url", "String", "")
    };
    N(Jq, "flash.media.Sound");
    Jq.prototype.play = function() {
        R(this, "play")
    };
    Jq.prototype.close = function() {
        R(this, "close")
    };
    Jq.prototype.connect = function() {
        R(this, "connect")
    };
    N(function(a, b) {
        a = Q(a, "Number", 1E3);
        b = Q(b, "Boolean", !1);
        O(this, "bufferTime", "Number", a);
        O(this, "checkPolicyFile", "Boolean", b)
    }, "flash.media.SoundLoaderContext");
    var qq = function(a, b) {
        a = Q(a, "Number", 1);
        b = Q(b, "Number", 0);
        O(this, "leftToLeft", "Number", 0);
        O(this, "leftToRight", "Number", 0);
        O(this, "pan", "Number", b);
        O(this, "rightToLeft", "Number", 0);
        O(this, "rightToRight", "Number", 0);
        O(this, "volume", "Number", a)
    };
    N(qq, "flash.media.SoundTransform");
    var Kq = function(a, b) {
            Xp.call(this);
            Q(a, "int", 320);
            Q(b, "int", 240);
            this.deblocking = 0;
            this.smoothing = !1
        },
        Lq = N(Kq, "flash.media.Video", Xp);
    vk(Kq, function(a, b) {
        return new Bh(Yj, a, b)
    });
    L(Lq, "deblocking", function() {
        return this.__swiffy_v.deblocking
    });
    M(Lq, "deblocking", function(a) {
        this.__swiffy_v.deblocking = Q(a, "int")
    });
    L(Lq, "smoothing", function() {
        return this.__swiffy_v.smoothing
    });
    M(Lq, "smoothing", function(a) {
        this.__swiffy_v.smoothing = Q(a, "Boolean")
    });
    L(Lq, "videoHeight", function() {
        return 0
    });
    L(Lq, "videoWidth", function() {
        return 0
    });
    Kq.prototype.attachCamera = function() {
        R(this, "attachCamera")
    };
    Kq.prototype.attachNetStream = function(a) {
        Q(a, "flash.net.NetStream", null);
        R(this, "attachNetStream")
    };
    Kq.prototype.clear = function() {
        R(this, "clear")
    };
    km.prototype["flash.net.navigateToURL"] = function(a, b) {
        if (!a) throw J(2007, "request");
        if (null == a.url) throw J(2007, "url");
        var c = k(b) ? b : "_blank",
            d = 0;
        a.data && (d = a.method == Mq.POST ? 2 : 1);
        var e = Ze;
        e.c.Yg(new Ij(e, a.data ? a.data.toString() : null, a.url, c, d))
    };
    var Nq = {};
    km.prototype["flash.net.registerClassAlias"] = function(a, b) {
        if (null == a) throw J(2007, "aliasName");
        if (null == b) throw J(2007, "classObject");
        a = Q(a, "String");
        b = Q(b, "Class");
        R(this, "flash.net.registerClassAlias");
        Nq[a] = b
    };
    km.prototype["flash.net.getClassByAlias"] = function(a) {
        if (null == a) throw J(2007, "aliasName");
        a = Q(a, "String");
        R(this, "flash.net.getClassByAlias");
        var b = Nq[a];
        if (!b) throw J(1014, a);
        return b
    };
    var Oq = function() {
            W.call(this);
            O(this, "client", "Object", null);
            P(this, "domain", "");
            O(this, "isPerUser", "Boolean", !1)
        },
        Pq = N(Oq, "flash.net.LocalConnection", W);
    Object.defineProperty(Pq, "isSupported", {
        value: !1
    });
    Oq.prototype.allowDomain = function() {
        R(this, "allowDomain")
    };
    Oq.prototype.allowInsecureDomain = function() {
        R(this, "allowInsecureDomain")
    };
    Oq.prototype.close = function() {
        R(this, "close")
    };
    Oq.prototype.connect = function(a) {
        Q(a, "String", "");
        R(this, "connect")
    };
    Oq.prototype.send = function(a, b) {
        Q(a, "String", "");
        Q(b, "String", "");
        R(this, "send")
    };
    var Qq = function() {
            W.call(this);
            O(this, "client", "Object", null);
            P(this, "connectedProxyType", "");
            P(this, "farID", "");
            P(this, "farNonce", "");
            O(this, "httpIdleTimeout", "Number", 0);
            O(this, "maxPeerConnections", "uint", 0);
            P(this, "nearID", "");
            P(this, "nearNonce", "");
            O(this, "objectEncoding", "uint", 0);
            P(this, "protocol", "");
            O(this, "proxyType", "String", "");
            P(this, "unconnectedPeerStreams", null);
            P(this, "uri", "");
            P(this, "usingTLS", !1);
            this.__swiffy_v.cw = !1
        },
        Rq = N(Qq, "flash.net.NetConnection", W);
    L(Rq, "connected", function() {
        return this.__swiffy_v.cw
    });
    Object.defineProperty(Rq, "defaultObjectEncoding", {
        value: 0
    });
    Qq.prototype.addHeader = function(a, b, c) {
        Q(a, "String", "");
        Q(b, "Boolean", !1);
        Q(c, "Object", null);
        R(this, "addHeader")
    };
    Qq.prototype.call = function(a, b) {
        Q(a, "String", "");
        Q(b, "flash.net.Responder", null);
        R(this, "call")
    };
    Qq.prototype.close = function() {
        R(this, "close")
    };
    Qq.prototype.connect = function(a) {
        Q(a, "String", "");
        R(this, "connect")
    };
    var Tq = function(a, b) {
            W.call(this);
            Q(a, "flash.net.NetConnection", null);
            Q(b, "String", "connectToFMS");
            O(this, "audioReliable", "Boolean", !1);
            O(this, "audioSampleAccess", "Boolean", !1);
            P(this, "backBufferLength", 0);
            O(this, "backBufferTime", "Number", 0);
            O(this, "bufferTimeMax", "Number", 0);
            O(this, "checkPolicyFile", "Boolean", !1);
            O(this, "dataReliable", "Boolean", !1);
            P(this, "farID", "");
            P(this, "farNonce", "");
            O(this, "inBufferSeek", "Boolean", !1);
            P(this, "info", null);
            P(this, "liveDelay", 0);
            O(this, "maxPauseBufferTime", "Number",
                0);
            O(this, "multicastAvailabilitySendToAll", "Boolean", !1);
            O(this, "multicastAvailabilityUpdatePeriod", "Number", 0);
            O(this, "multicastFetchPeriod", "Number", 0);
            P(this, "multicastInfo", null);
            O(this, "multicastPushNeighborLimit", "Number", 0);
            O(this, "multicastRelayMarginDuration", "Number", 0);
            O(this, "multicastWindowDuration", "Number", 0);
            P(this, "nearNonce", "");
            P(this, "objectEncoding", 0);
            P(this, "peerStreams", null);
            O(this, "soundTransform", "flash.media.SoundTransform", null);
            O(this, "useHardwareDecoder", "Boolean", !1);
            O(this, "useJitterBuffer", "Boolean", !1);
            O(this, "videoReliable", "Boolean", !1);
            O(this, "videoSampleAccess", "Boolean", !1);
            O(this, "videoStreamSettings", "flash.media.VideoStreamSettings", null);
            var c = Sq(this);
            c.dm = 0;
            c.Th = .1;
            c.Uh = 0;
            c.Vh = 0;
            c.em = 0;
            c.time = 0;
            c.yh = null
        },
        Sq = function(a) {
            return a.__swiffy_v
        },
        Uq = N(Tq, "flash.net.NetStream", W);
    L(Uq, "bufferTime", function() {
        return Sq(this).Th
    });
    M(Uq, "bufferTime", function(a) {
        Sq(this).Th = Q(a, "Number")
    });
    L(Uq, "bufferLength", function() {
        return Sq(this).dm
    });
    L(Uq, "bytesLoaded", function() {
        return Sq(this).Uh
    });
    L(Uq, "bytesTotal", function() {
        return Sq(this).Vh
    });
    L(Uq, "currentFPS", function() {
        return Sq(this).em
    });
    L(Uq, "time", function() {
        return Sq(this).time
    });
    L(Uq, "client", function() {
        return Sq(this).yh
    });
    M(Uq, "client", function(a) {
        Sq(this).yh = a
    });
    Object.defineProperty(Uq, "CONNECT_TO_FMS", {
        value: "connectToFMS"
    });
    Object.defineProperty(Uq, "DIRECT_CONNECTIONS", {
        value: "directConnections"
    });
    Tq.prototype.appendBytes = function(a) {
        Q(a, "flash.utils.ByteArray", null);
        R(this, "appendBytes")
    };
    Tq.prototype.appendBytesAction = function(a) {
        Q(a, "String", "");
        R(this, "appendBytesAction")
    };
    Tq.prototype.attach = function(a) {
        Q(a, "flash.net.NetConnection", null);
        R(this, "attach")
    };
    Tq.prototype.attachAudio = function() {
        R(this, "attachAudio")
    };
    Tq.prototype.attachCamera = function(a, b) {
        Q(b, "int", -1);
        R(this, "attachCamera")
    };
    Tq.prototype.close = function() {
        R(this, "close")
    };
    Tq.prototype.dispose = function() {
        R(this, "dispose")
    };
    Tq.prototype.onPeerConnect = function(a) {
        Q(a, "flash.net.NetStream", null);
        R(this, "onPeerConnect");
        return !1
    };
    Tq.prototype.pause = function() {
        R(this, "pause")
    };
    Tq.prototype.play = function() {
        R(this, "play")
    };
    Tq.prototype.play2 = function(a) {
        Q(a, "flash.net.NetStreamPlayOptions", null);
        R(this, "play2")
    };
    Tq.prototype.preloadEmbeddedData = function(a) {
        Q(a, "flash.net.NetStreamPlayOptions", null);
        R(this, "preloadEmbeddedData")
    };
    Tq.prototype.publish = function(a, b) {
        Q(a, "String", "null");
        Q(b, "String", "null");
        R(this, "publish")
    };
    Tq.prototype.receiveAudio = function(a) {
        Q(a, "Boolean", !1);
        R(this, "receiveAudio")
    };
    Tq.prototype.receiveVideo = function(a) {
        Q(a, "Boolean", !1);
        R(this, "receiveVideo")
    };
    Tq.prototype.receiveVideoFPS = function(a) {
        Q(a, "Number", 0);
        R(this, "receiveVideoFPS")
    };
    Uq.resetDRMVouchers = function() {
        R(this, "resetDRMVouchers")
    };
    Tq.prototype.resume = function() {
        R(this, "resume")
    };
    Tq.prototype.seek = function(a) {
        Q(a, "Number");
        R(this, "seek");
        this.dispatchEvent(new Dp("netStatus", !1, !1, {
            code: "NetStream.SeekStart.Notify",
            level: "status"
        }))
    };
    Tq.prototype.send = function(a) {
        Q(a, "String", "");
        R(this, "send")
    };
    Tq.prototype.setDRMAuthenticationCredentials = function(a, b, c) {
        Q(a, "String", "");
        Q(b, "String", "");
        Q(c, "String", "");
        R(this, "setDRMAuthenticationCredentials")
    };
    Tq.prototype.step = function(a) {
        Q(a, "int", 0);
        R(this, "step")
    };
    Tq.prototype.togglePause = function() {
        R(this, "togglePause")
    };
    N(function() {
        W.call(this);
        O(this, "len", "Number", 0);
        O(this, "offset", "Number", 0);
        O(this, "oldStreamName", "String", "");
        O(this, "start", "Number", 0);
        O(this, "streamName", "String", "");
        O(this, "transition", "String", "")
    }, "flash.net.NetStreamPlayOptions", W);
    var Vq = on(2012);
    Vq.u = N(Vq, "flash.net.ObjectEncoding");
    Object.defineProperty(Vq.u, "dynamicPropertyWriter", {
        value: null
    });
    Object.defineProperty(Vq.u, "AMF0", {
        value: 0
    });
    Object.defineProperty(Vq.u, "AMF3", {
        value: 3
    });
    Object.defineProperty(Vq.u, "DEFAULT", {
        value: 3
    });
    N(function(a, b) {
        Q(a, "Function", null);
        Q(b, "Function", null)
    }, "flash.net.Responder");
    var $ = on(2012);
    $.ff = function(a) {
        return a.__swiffy_v
    };
    $.Xq = function() {
        var a = jn($.u);
        W.call(a);
        var b = $.ff(a);
        b.yh = a;
        b.np = $.Sl;
        b.data = {};
        return a
    };
    $.Yq = {};
    $.Sl = Vq.u.AMF3;
    $.u = N($, "flash.net.SharedObject", W);
    L($.u, "client", function() {
        return $.ff(this).yh
    });
    M($.u, "client", function(a) {
        if (null == a) throw J(2004);
        $.ff(this).yh = a
    });
    K($.u, "clear", function() {
        R(this, "clear");
        $.ff(this).data = {}
    });
    K($.u, "close", function() {
        R(this, "close")
    });
    K($.u, "connect", function(a, b) {
        Q(a, "flash.net.NetConnection", null);
        Q(b, "String", "null");
        R(this, "connect")
    });
    L($.u, "data", function() {
        return $.ff(this).data
    });
    Object.defineProperty($.u, "defaultObjectEncoding", {
        get: function() {
            return $.Sl
        },
        set: function(a) {
            $.Sl = Q(a, "uint")
        }
    });
    K($.u, "flush", function(a) {
        Q(a, "int", 0);
        R(this, "flush");
        return Wq.u.FLUSHED
    });
    M($.u, "fps", function() {
        R(this, "fps")
    });
    $.u.getLocal = function(a, b, c) {
        a = Q(a, "String", "");
        Q(b, "String", null);
        Q(c, "Boolean", !1);
        R(this, "getLocal");
        (b = $.Yq[a]) || ($.Yq[a] = b = $.Xq());
        return b
    };
    $.u.getRemote = function(a, b, c, d) {
        Q(a, "String", "");
        Q(b, "String", "null");
        Q(c, "Object", !1);
        Q(d, "Boolean", !1);
        R(this, "getRemote");
        return $.Xq()
    };
    L($.u, "objectEncoding", function() {
        return $.ff(this).np
    });
    M($.u, "objectEncoding", function(a) {
        a = Q(a, "uint");
        R(this, "objectEncoding");
        if (a != Vq.u.AMF0 && a != Vq.u.AMF3) throw J(2008, "objectEncoding");
        $.ff(this).np = a
    });
    K($.u, "send", function() {
        R(this, "send")
    });
    K($.u, "setDirty", function(a) {
        Q(a, "String", "");
        R(this, "setDirty")
    });
    K($.u, "setProperty", function(a, b) {
        Q(a, "String", "");
        Q(b, "Object", null);
        R(this, "setProperty")
    });
    L($.u, "size", function() {
        R(this, "size");
        return 0
    });
    var Wq = on(2012);
    Wq.u = N(Wq, "flash.net.SharedObjectFlushStatus");
    Object.defineProperty(Wq.u, "FLUSHED", {
        value: "flushed"
    });
    Object.defineProperty(Wq.u, "PENDING", {
        value: "pending"
    });
    var Xq = function(a, b) {
        W.call(this);
        Q(a, "String", "null");
        Q(b, "int", 0);
        P(this, "bytesAvailable", 0);
        P(this, "bytesPending", 0);
        P(this, "connected", !1);
        O(this, "endian", "String", Eq.BIG_ENDIAN);
        P(this, "localAddress", "");
        P(this, "localPort", 0);
        O(this, "objectEncoding", "uint", 0);
        P(this, "remoteAddress", "");
        P(this, "remotePort", 0);
        O(this, "timeout", "uint", 0)
    };
    N(Xq, "flash.net.Socket", W);
    Xq.prototype.close = function() {
        R(this, "close")
    };
    Xq.prototype.connect = function(a, b) {
        Q(a, "String");
        Q(b, "int");
        R(this, "connect")
    };
    Xq.prototype.flush = function() {
        R(this, "flush")
    };
    Xq.prototype.readBoolean = function() {
        R(this, "readBoolean");
        return !1
    };
    Xq.prototype.readByte = function() {
        R(this, "readByte");
        return 0
    };
    Xq.prototype.readBytes = function(a, b, c) {
        Q(a, "flash.utils.ByteArray");
        Q(b, "uint", 0);
        Q(c, "uint", 0);
        R(this, "readBytes")
    };
    Xq.prototype.readDouble = function() {
        R(this, "readDouble");
        return 0
    };
    Xq.prototype.readFloat = function() {
        R(this, "readFloat");
        return 0
    };
    Xq.prototype.readInt = function() {
        R(this, "readInt");
        return 0
    };
    Xq.prototype.readMultiByte = function(a, b) {
        Q(a, "uint");
        Q(b, "String");
        R(this, "readMultiByte");
        return ""
    };
    Xq.prototype.readObject = function() {
        R(this, "readObject");
        return null
    };
    Xq.prototype.readShort = function() {
        R(this, "readShort");
        return 0
    };
    Xq.prototype.readUnsignedByte = function() {
        R(this, "readUnsignedByte");
        return 0
    };
    Xq.prototype.readUnsignedInt = function() {
        R(this, "readUnsignedInt");
        return 0
    };
    Xq.prototype.readUnsignedShort = function() {
        R(this, "readUnsignedShort");
        return 0
    };
    Xq.prototype.readUTF = function() {
        R(this, "readUTF");
        return ""
    };
    Xq.prototype.readUTFBytes = function(a) {
        Q(a, "uint");
        R(this, "readUTFBytes");
        return ""
    };
    Xq.prototype.writeBoolean = function(a) {
        Q(a, "Boolean");
        R(this, "writeBoolean")
    };
    Xq.prototype.writeByte = function(a) {
        Q(a, "int");
        R(this, "writeByte")
    };
    Xq.prototype.writeBytes = function(a, b, c) {
        Q(a, "flash.utils.ByteArray");
        Q(b, "uint", 0);
        Q(c, "uint", 0);
        R(this, "writeBytes")
    };
    Xq.prototype.writeDouble = function(a) {
        Q(a, "Number");
        R(this, "writeDouble")
    };
    Xq.prototype.writeFloat = function(a) {
        Q(a, "Number");
        R(this, "writeFloat")
    };
    Xq.prototype.writeInt = function(a) {
        Q(a, "int");
        R(this, "writeInt")
    };
    Xq.prototype.writeMultiByte = function(a, b) {
        Q(a, "String");
        Q(b, "String");
        R(this, "writeMultiByte")
    };
    Xq.prototype.writeObject = function(a) {
        Q(a, "*");
        R(this, "writeObject")
    };
    Xq.prototype.writeShort = function(a) {
        Q(a, "int");
        R(this, "writeShort")
    };
    Xq.prototype.writeUnsignedInt = function(a) {
        Q(a, "uint");
        R(this, "writeUnsignedInt")
    };
    Xq.prototype.writeUTF = function(a) {
        Q(a, "String");
        R(this, "writeUTF")
    };
    Xq.prototype.writeUTFBytes = function(a) {
        Q(a, "String");
        R(this, "writeUTFBytes")
    };
    var Zq = function(a) {
        W.call(this);
        a = Q(a, "flash.net.URLRequest", null);
        O(this, "bytesLoaded", "uint", 0);
        O(this, "bytesTotal", "uint", 0);
        this.data = void 0;
        O(this, "dataFormat", "String", Yq.TEXT);
        a && this.load(a)
    };
    N(Zq, "flash.net.URLLoader", W);
    Zq.prototype.close = function() {
        R(this, "close")
    };
    Zq.prototype.load = function(a) {
        a = Q(a, "flash.net.URLRequest");
        R(this, "load");
        var b = this;
        this.dispatchEvent(new $o(bp.OPEN));
        var c = new pd;
        c.bc = function(a) {
            b.bytesLoaded = 1024;
            b.bytesTotal = 1024;
            b.dispatchEvent(new Fp(Gp.PROGRESS, !1, !1, 1024, 1024));
            b.dispatchEvent(new kp(lp.HTTP_STATUS, !1, !1, 400));
            b.data = a;
            b.dispatchEvent(new $o(bp.COMPLETE))
        };
        c.Gc = function() {};
        nd(a.url, null, a.method, a.data ? a.data.toString() : null, c, jq(a))
    };
    var Yq = N(function() {}, "flash.net.URLLoaderDataFormat");
    P(Yq, "BINARY", "binary");
    P(Yq, "TEXT", "text");
    P(Yq, "VARIABLES", "variables");
    var $q = function(a, b) {
        Object.defineProperty(this, "__swiffy_v", {
            value: {
                name: Q(a, "String", ""),
                value: Q(b, "String", "")
            }
        })
    };
    N($q, "flash.net.URLRequestHeader");
    var ar = function(a) {
        return a.__swiffy_v
    };
    Object.defineProperty($q.prototype, "name", {
        get: function() {
            return ar(this).name
        },
        set: function(a) {
            ar(this).name = Q(a, "String", "")
        }
    });
    Object.defineProperty($q.prototype, "value", {
        get: function() {
            return ar(this).value
        },
        set: function(a) {
            ar(this).value = Q(a, "String", "")
        }
    });
    var jq = function(a) {
        return a.requestHeaders.map(function(a) {
            return ar(Q(a, "flash.net.URLRequestHeader"))
        })
    };
    N(function(a) {
        a = Q(a, "String", null);
        O(this, "authenticate", "Boolean", !1);
        O(this, "cacheResponse", "Boolean", !1);
        O(this, "contentType", "String", null);
        O(this, "data", "Object", null);
        O(this, "digest", "String", "");
        O(this, "followRedirects", "Boolean", !1);
        O(this, "idleTimeout", "Number", 0);
        O(this, "manageCookies", "Boolean", !1);
        O(this, "method", "String", Mq.GET);
        O(this, "url", "String", a);
        O(this, "useCache", "Boolean", !1);
        O(this, "userAgent", "String", "");
        P(this, "requestHeaders", [])
    }, "flash.net.URLRequest");
    var br = function() {},
        Mq = N(br, "flash.net.URLRequestMethod");
    P(Mq, "DELETE", "DELETE");
    P(Mq, "GET", "GET");
    P(Mq, "HEAD", "HEAD");
    P(Mq, "OPTIONS", "OPTIONS");
    P(Mq, "POST", "POST");
    P(br, "PUT", "PUT");
    var cr = function(a) {
        a = Q(a, "String", null);
        null != a && this.decode(a)
    };
    N(cr, "flash.net.URLVariables");
    Object.defineProperty(cr.prototype, "decode", {
        value: function(a) {
            a = Q(a, "String");
            a = qd(a, !0);
            var b = Object.keys(a);
            if (!b.length) throw J(2101);
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (!d.length) throw J(2101);
                var e = a[d];
                this[d] = 1 == e.length ? e[0] : e
            }
        }
    });
    Object.defineProperty(cr.prototype, "toString", {
        value: function() {
            return jd(this)
        }
    });
    var tp = function(a) {
            return ln.call(dr, a)
        },
        dr = nn(function(a) {
            hf(this, a || Ze.Pi)
        }, "flash.system.ApplicationDomain", {
            Rj: function(a) {
                a = Q(a, "flash.system.ApplicationDomain", null);
                return tp((a ? v(a) : Ze.Ao).zo())
            }
        });
    P(dr, "MIN_DOMAIN_MEMORY_LENGTH", 1024);
    Object.defineProperty(dr, "currentDomain", {
        get: function() {
            R(this, "currentDomain");
            return tp()
        }
    });
    L(dr, "parentDomain", function() {
        R(this, "parentDomain");
        return v(this).parent ? tp(v(this).parent) : null
    });
    L(dr, "domainMemory", function() {
        R(this, "domainMemory");
        return v(this).dj
    });
    M(dr, "domainMemory", function(a) {
        R(this, "domainMemory");
        if ((a = Q(a, "flash.utils.ByteArray")) && 1024 > a.length) throw J(1504);
        v(this).dj = a
    });
    K(dr, "getDefinition", function(a) {
        a = Q(a, "String");
        R(this, "getDefinition");
        var b = v(this).Em(a);
        if (!k(b)) throw J(1065, a);
        return b
    });
    K(dr, "getQualifiedDefinitionNames", function() {
        R(this, "getQualifiedDefinitionNames");
        return fo(String, [])
    });
    K(dr, "hasDefinition", function(a) {
        a = Q(a, "String");
        R(this, "hasDefinition");
        a = v(this).Em(a);
        return k(a)
    });
    var er = N(function() {}, "flash.system.Capabilities");
    Object.defineProperty(er, "avHardwareDisable", {
        value: !1
    });
    Object.defineProperty(er, "cpuArchitecture", {
        value: ""
    });
    Object.defineProperty(er, "hasAccessibility", {
        value: !1
    });
    Object.defineProperty(er, "hasAudio", {
        value: !1
    });
    Object.defineProperty(er, "hasAudioEncoder", {
        value: !1
    });
    Object.defineProperty(er, "hasEmbeddedVideo", {
        value: !1
    });
    Object.defineProperty(er, "hasIME", {
        value: !1
    });
    Object.defineProperty(er, "hasMP3", {
        value: !1
    });
    Object.defineProperty(er, "hasPrinting", {
        value: !1
    });
    Object.defineProperty(er, "hasScreenBroadcast", {
        value: !1
    });
    Object.defineProperty(er, "hasScreenPlayback", {
        value: !1
    });
    Object.defineProperty(er, "hasStreamingAudio", {
        value: !0
    });
    Object.defineProperty(er, "hasStreamingVideo", {
        value: !0
    });
    Object.defineProperty(er, "hasTLS", {
        value: !1
    });
    Object.defineProperty(er, "hasVideoEncoder", {
        value: !1
    });
    Object.defineProperty(er, "isDebugger", {
        value: !1
    });
    Object.defineProperty(er, "isEmbeddedInAcrobat", {
        value: !1
    });
    Object.defineProperty(er, "language", {
        value: ""
    });
    Object.defineProperty(er, "localFileReadDisable", {
        value: !0
    });
    Object.defineProperty(er, "manufacturer", {
        value: ""
    });
    Object.defineProperty(er, "maxLevelIDC", {
        value: "5.1"
    });
    Object.defineProperty(er, "os", {
        value: ""
    });
    Object.defineProperty(er, "pixelAspectRatio", {
        value: 1
    });
    Object.defineProperty(er, "playerType", {
        value: "PlugIn"
    });
    Object.defineProperty(er, "screenColor", {
        value: "color"
    });
    Object.defineProperty(er, "screenDPI", {
        value: 72
    });
    Object.defineProperty(er, "screenResolutionX", {
        get: function() {
            return screen.width
        }
    });
    Object.defineProperty(er, "screenResolutionY", {
        get: function() {
            return screen.height
        }
    });
    Object.defineProperty(er, "serverString", {
        get: function() {
            var a = [],
                b;
            for (b in fr) {
                var c = fr[b],
                    c = m(c) ? c(this) : this[c],
                    c = !0 === c ? "t" : !1 === c ? "f" : encodeURIComponent(c);
                a.push(b + "=" + c)
            }
            return a.join("&")
        }
    });
    Object.defineProperty(er, "supports32BitProcesses", {
        value: !1
    });
    Object.defineProperty(er, "supports64BitProcesses", {
        value: !1
    });
    Object.defineProperty(er, "touchscreenType", {
        value: ""
    });
    Object.defineProperty(er, "version", {
        get: function() {
            return "HTML 11,0,0,0"
        }
    });
    er.hasMultiChannelAudio = function(a) {
        Q(a, "String", "");
        R(this, "hasMultiChannelAudio");
        return !1
    };
    var gr = function(a) {
            return function(b) {
                return b.hasMultiChannelAudio(a)
            }
        },
        fr = {
            A: "hasAudio",
            SA: "hasStreamingAudio",
            SV: "hasStreamingVideo",
            EV: "hasEmbeddedVideo",
            MP3: "hasMP3",
            AE: "hasAudioEncoder",
            VE: "hasVideoEncoder",
            ACC: "hasAccessibility",
            PR: "hasPrinting",
            SP: "hasScreenPlayback",
            SB: "hasScreenBroadcast",
            DEB: "isDebugger",
            V: "version",
            M: "manufacturer",
            R: function(a) {
                return a.screenResolutionX + "x" + a.screenResolutionY
            },
            COL: "screenColor",
            AR: "pixelAspectRatio",
            OS: "os",
            ARCH: "cpuArchitecture",
            L: "language",
            PR32: "supports32BitProcesses",
            PR64: "supports64BitProcesses",
            PT: "playerType",
            AVD: "avHardwareDisable",
            LFD: "localFileReadDisable",
            WD: function() {
                return !1
            },
            TLS: "hasTLS",
            ML: "maxLevelIDC",
            DP: "screenDPI",
            IME: "hasIME",
            DD: gr("DolbyDigital"),
            DDP: gr("DolbyDigitalPlus"),
            DTS: gr("DTS"),
            DTE: gr("DTSExpress"),
            DTH: gr("DTSHDHighResolutionAudio"),
            DTM: gr("DTSHDMasterAudio")
        };
    N(function(a, b, c) {
        a = Q(a, "Boolean", !1);
        b = Q(b, "flash.system.ApplicationDomain", null);
        c = Q(c, "flash.system.SecurityDomain", null);
        O(this, "allowCodeImport", "Boolean", !1);
        O(this, "allowLoadBytesCodeExecution", "Boolean", !1);
        O(this, "applicationDomain", "flash.system.ApplicationDomain", b);
        O(this, "checkPolicyFile", "Boolean", a);
        O(this, "imageDecodingPolicy", "String", "");
        O(this, "parameters", "Object", null);
        O(this, "requestedContentParent", "flash.display.DisplayObjectContainer", null);
        O(this, "securityDomain", "flash.system.SecurityDomain",
            c);
        R(this, "<init>")
    }, "flash.system.LoaderContext");
    var hr = on(2012);
    hr.u = N(hr, "flash.system.Security");
    O(hr.u, "exactSettings", "Boolean", !1);
    P(hr.u, "pageDomain", void 0);
    P(hr.u, "sandboxType", "remote");
    P(hr.u, "LOCAL_TRUSTED", "localTrusted");
    P(hr.u, "LOCAL_WITH_FILE", "localWithFile");
    P(hr.u, "LOCAL_WITH_NETWORK", "localWithNetwork");
    P(hr.u, "REMOTE", "remote");
    hr.u.allowDomain = function() {
        R(hr, "allowDomain")
    };
    hr.u.allowInsecureDomain = function() {
        R(hr, "allowInsecureDomain")
    };
    hr.u.loadPolicyFile = function(a) {
        Q(a, "String");
        R(hr, "loadPolicyFile")
    };
    hr.u.showSettings = function(a) {
        Q(a, "String", "default");
        R(hr, "showSettings")
    };
    var ir = function() {},
        jr = N(ir, "flash.system.SecurityDomain");
    P(jr, "currentDomain", new ir);
    var kr = N(function() {}, "flash.text.AntiAliasType");
    P(kr, "ADVANCED", "advanced");
    P(kr, "NORMAL", "normal");
    var lr = N(function() {}, "flash.text.FontStyle");
    P(lr, "BOLD", "bold");
    P(lr, "BOLD_ITALIC", "boldItalic");
    P(lr, "ITALIC", "italic");
    P(lr, "REGULAR", "regular");
    var mr = N(function() {}, "flash.text.FontType");
    P(mr, "DEVICE", "device");
    P(mr, "EMBEDDED", "embedded");
    P(mr, "EMBEDDED_CFF", "embeddedCFF");
    var nr = function() {},
        or = N(nr, "flash.text.Font");
    Object.defineProperty(nr.prototype, "fontName", {
        get: function() {
            var a = this.__swiffy_v;
            return a ? a.name : null
        }
    });
    Object.defineProperty(nr.prototype, "fontStyle", {
        get: function() {
            var a = this.__swiffy_v;
            return a ? a.bold ? a.italic ? lr.BOLD_ITALIC : lr.BOLD : a.italic ? lr.ITALIC : lr.REGULAR : null
        }
    });
    Object.defineProperty(nr.prototype, "fontType", {
        get: function() {
            return this.__swiffy_v ? mr.EMBEDDED : null
        }
    });
    or.enumerateFonts = function(a) {
        Q(a, "Boolean", !1);
        a = [];
        var b = Ze.c.qc,
            c;
        for (c in b)
            for (var d = b[c], e = 0; e < d.length; e++) {
                var f = new nr;
                Object.defineProperty(f, "__swiffy_v", {
                    value: d[e]
                });
                a.push(f)
            }
        return a
    };
    nr.prototype.hasGlyphs = function(a) {
        a = Q(a, "String");
        var b = this.__swiffy_v;
        if (!b) return !1;
        for (var c = 0; c < a.length; c++)
            if (!b.Cm(a.charAt(c))) return !1;
        return !0
    };
    or.registerFont = function(a) {
        Q(a, "Class");
        throw J(1508, "font");
    };
    var pr = function() {
            bq.call(this)
        },
        qr = N(pr, "flash.text.TextField", bq);
    vk(pr, function(a, b) {
        return (new sk({
            id: 0,
            height: 240,
            html: !0,
            selectable: !0,
            leftMargin: 0,
            rightMargin: 0
        }, new $c(0, 0, 2E3, 2E3), a.Od)).rc(a, null, b)
    });
    L(qr, "textHeight", function() {
        return w(this).hl() / 20
    });
    L(qr, "textWidth", function() {
        return w(this).il() / 20
    });
    pr.prototype.appendText = function(a) {
        var b = w(this);
        b.Ec(b.Ka + Mj(String(a)))
    };
    pr.prototype.getTextFormat = function(a, b) {
        var c = w(this).pr(a, b);
        return rr(c)
    };
    pr.prototype.setTextFormat = function(a, b, c) {
        a = Q(a, "flash.text.TextFormat");
        if (null == a) throw J(2007, "format");
        w(this).Lj(v(a), b, c)
    };
    Object.defineProperty(pr.prototype, "text", {
        get: function() {
            var a = w(this),
                b = a.Ka;
            a.Sb && (b = Lj(b, a.definition.multiline));
            return b
        },
        set: function(a) {
            var b = w(this);
            a = String(a);
            b.Sb && (a = Mj(a), b.Hi(!1));
            b.Ec(a);
            b.Hi(!0)
        }
    });
    Object.defineProperty(pr.prototype, "htmlText", {
        get: function() {
            var a = w(this),
                b = a.Ka;
            a.Sb && (b = Nj(String(b)));
            return b
        },
        set: function(a) {
            var b = w(this),
                c = lf();
            c.color = 4278190080;
            b.Lj(c);
            b.Ec(String(a))
        }
    });
    Object.defineProperty(pr.prototype, "length", {
        get: function() {
            return this.text.length
        }
    });
    Object.defineProperty(pr.prototype, "textColor", {
        get: function() {
            return w(this).or()
        },
        set: function(a) {
            w(this).Jr(a)
        }
    });
    Object.defineProperty(pr.prototype, "autoSize", {
        get: function() {
            return w(this).yf
        },
        set: function(a) {
            switch (a) {
                case "center":
                case "left":
                case "none":
                case "right":
                    break;
                default:
                    throw J(2008, "autoSize");
            }
            w(this).yr(a)
        }
    });
    Object.defineProperty(pr.prototype, "selectable", {
        get: function() {
            return w(this).Pg
        },
        set: function(a) {
            a = Q(a, "Boolean");
            w(this).Ir(a)
        }
    });
    Object.defineProperty(pr.prototype, "border", {
        get: function() {
            return w(this).pi
        },
        set: function(a) {
            a = Q(a, "Boolean");
            w(this).Ar(a)
        }
    });
    Object.defineProperty(pr.prototype, "borderColor", {
        get: function() {
            return w(this).oi
        },
        set: function(a) {
            w(this).Br(Number(a))
        }
    });
    Object.defineProperty(pr.prototype, "background", {
        get: function() {
            return w(this).ni
        },
        set: function(a) {
            a = Q(a, "Boolean");
            w(this).xg(a)
        }
    });
    Object.defineProperty(pr.prototype, "backgroundColor", {
        get: function() {
            return w(this).mi
        },
        set: function(a) {
            w(this).zr(Number(a))
        }
    });
    Object.defineProperty(pr.prototype, "type", {
        get: function() {
            var a = sr;
            return w(this).Qi ? a.INPUT : a.DYNAMIC
        },
        set: function(a) {
            switch (a) {
                case sr.DYNAMIC:
                    a = !1;
                    break;
                case sr.INPUT:
                    a = !0;
                    break;
                default:
                    throw J(2008, "type");
            }
            w(this).Um(a)
        }
    });
    Object.defineProperty(pr.prototype, "antiAliasType", {
        get: function() {
            return "advanced" == w(this).el ? kr.ADVANCED : kr.NORMAL
        },
        set: function(a) {
            w(this).xr(a == kr.ADVANCED ? "advanced" : "normal")
        }
    });
    Object.defineProperty(pr.prototype, "numLines", {
        get: function() {
            return w(this).qd.length
        }
    });
    pr.prototype.getLineText = function(a) {
        a = w(this).ow(a);
        if (null === a) throw new RangeError;
        return a
    };
    Object.defineProperty(pr.prototype, "multiline", {
        get: function() {
            return w(this).Ke
        },
        set: function(a) {
            w(this).Er(!!a)
        }
    });
    Object.defineProperty(pr.prototype, "wordWrap", {
        get: function() {
            return w(this).bh
        },
        set: function(a) {
            w(this).Kr(!!a)
        }
    });
    Object.defineProperty(pr.prototype, "embedFonts", {
        get: function() {
            return w(this).Df
        },
        set: function(a) {
            w(this).Dr(!!a)
        }
    });
    Object.defineProperty(pr.prototype, "defaultTextFormat", {
        get: function() {
            return rr(w(this).nr())
        },
        set: function(a) {
            a = Q(a, "flash.text.TextFormat");
            if (null == a) throw J(2007, "format");
            w(this).Gr(v(a))
        }
    });
    var yn = function(a, b) {
        this.ya = a;
        this.xc = (this.parent = b || null) ? Object.create(this.parent.xc) : new km(this.ya);
        this.dj = null
    };
    g = yn.prototype;
    g.Em = function(a) {
        a = a.replace("::", ".");
        "." == a[0] && (a = a.substring(1));
        return this.xc[a]
    };
    g.iv = function(a) {
        a = a.zb(this.xc);
        return this.xc[a]
    };
    g.qh = "$";
    g.zo = function() {
        return new yn(this.ya, this)
    };
    g.Mw = function(a, b, c) {
        var d = fn();
        d.prototype = Object.create(this.xc);
        $m(d, en, gn, b.$e(a.init, void 0)(null, Jm), mn, bn, null, "global", !0);
        var e = Sm(d);
        b.dh(a.traits, null, Jm, e, c);
        var f = this;
        a = function(a) {
            Object.defineProperty(f.xc, a, {
                get: function() {
                    return sn.call(d)[a]
                },
                set: function(b) {
                    sn.call(d)[a] = b
                },
                configurable: !0
            })
        };
        for (var h in e.traits) h in this.xc || a(h)
    };
    g.ev = function(a) {
        var b = new vn(a.definition, this);
        a = a.definition.scripts;
        for (var c = 0; c < a.length; ++c) this.Mw(a[c], b, void 0)
    };
    g.fw = function(a, b, c, d) {
        var e = a.Yk.classes[c],
            f = fn(),
            h = b.Wo(f),
            l = a.We(e.name).Dd(),
            n = [];
        if (e.interfaces)
            for (var r = 0; r < e.interfaces.length; ++r) {
                var t = a.We(e.interfaces[r]).zb(this.xc);
                t && n.push(this.xc[t])
            }
        r = (r = a.$e(e.init, void 0)) ? r(d, h) : on(1001);
        nn(r, l, {
            Ve: f,
            Wi: d,
            interfaces: n
        });
        delete this.xc[l.Yb()];
        a.dh(e.traits, d, h, Sm(f), void 0);
        a.dh(e.ctraits, null, h, void 0, void 0).$i(f);
        a.classes[c] = f;
        a.$e(e.cinit, void 0)(null, b).call(f);
        return f
    };
    g.Bq = function(a, b) {
        if (null == a) throw J(1007);
        var c = a.prototype.__swiffy_buildsym;
        if (c) {
            var d = jn(a),
                c = c(this.ya.c, d);
            c instanceof sj && (c.Pb(this.ya.c.Ng()), c.$b = !0);
            c && c.Ea(!1, b);
            return d
        }
        return sn.apply(a, b)
    };
    g.jd = function(a, b) {
        var c;
        this.dj ? c = Z(this.dj).da : (tr || (tr = new DataView(new ArrayBuffer(1024))), c = tr);
        if (0 > a || a + b > c.byteLength) throw J(1506);
        return c
    };
    var Dh = function(a) {
        this.Ao = new yn(this);
        this.Pi = this.Ao.zo();
        this.c = a;
        this.startTime = Qh();
        this.Pd = new up;
        this.Vd = [];
        this.Si = {};
        this.Dk()
    };
    Dh.prototype.qh = "vm";
    S.Vv(yn);
    g = Dh.prototype;
    g.Pn = !0;
    g.trace = function(a) {
        $h(a)
    };
    g.uf = function() {
        return this.Pd.__swiffy_d
    };
    g.Wd = function() {};
    g.ag = function(a) {
        if (a) {
            a = a.Yl();
            for (var b = 0; b < a.length; b++) a[b].ag()
        }
        this.Ua()
    };
    g.dg = function() {};
    g.Xo = function() {
        return !0
    };
    g.mj = function() {};
    g.vp = function() {};
    g.lj = function() {};
    g.tp = function() {};
    g.Ce = function(a) {
        this.Vd.push(a)
    };
    g.Ua = function() {
        for (; 0 < this.Vd.length;) this.Vd.shift().call(this)
    };
    g.xp = function(a, b) {
        ++ci;
        try {
            a(), --ci
        } catch (c) {
            b(c), ei(c)
        }
    };
    g.Vk = function() {};
    g.Rn = function(a, b, c) {
        a[b] = c
    };
    g.Sn = function(a, b) {
        a[b] = null
    };
    g.Qk = function() {};
    g.Uk = function() {};
    g.bp = function() {};
    g.fireEvent = function(a, b, c, d) {
        if (a instanceof W && (b = fq[c.type])) {
            c = b(a, c);
            if (d) return a.dispatchEvent(c);
            this.Ce(na(a.dispatchEvent, a, c))
        }
        return !1
    };
    g.Nu = function(a, b) {
        var c = this.Si[a];
        c || (this.Si[a] = c = []);
        c.push(b)
    };
    g.wp = function(a, b) {
        var c = this.Si[a];
        c && Ia(c, b)
    };
    g.fo = function(a) {
        a = a.$;
        if (a instanceof W) {
            var b = a.__swiffy_listeners;
            if (b)
                for (var c in b) b[c].length && qp(c, a) && this.wp(c, a)
        }
    };
    g.Tm = function(a) {
        var b = this.Si[a];
        if (b)
            for (var c = 0; c < b.length; ++c) this.Ce(oa(rp, a, b[c]))
    };
    g.Bn = function() {
        this.Tm("enterFrame")
    };
    g.Cn = function() {
        this.Tm("exitFrame")
    };
    g.Li = function() {
        this.Tm("render")
    };
    g.ik = function(a, b) {
        var c = a && a.De;
        c && (c.dispatchEvent(new $o(bp.INIT)), k(b) && c.dispatchEvent(new kp(lp.HTTP_STATUS, !1, !1, b)), c.dispatchEvent(new $o(bp.COMPLETE)))
    };
    g.yo = function(a, b, c) {
        a.ah();
        b = a.$;
        kn(b).apply(b, c);
        a.Xf(vj, !0)
    };
    g.Ja = function(a, b) {
        var c = a.definition.Qh,
            c = jn(wk(b, c) ? c : b),
            d;
        for (d in c) m(c[d]) && (c[d] = na(c[d], c));
        return c
    };
    g.Dk = function() {
        var a = this;
        sj.prototype.Ja = function() {
            return a.Ja(this, Xp)
        };
        fd.prototype.Ja = function() {
            return a.Ja(this, this.definition.Qh && wk(pq, this.definition.Qh) ? oq : rq)
        };
        Vj.prototype.Ja = function() {
            return a.Ja(this, uq)
        };
        Bj.prototype.Ja = function() {
            return a.Ja(this, pr)
        };
        rh.prototype.Ja = function() {
            return a.Ja(this, lq)
        };
        xj.prototype.Ja = function() {
            return a.Ja(this, aq)
        };
        qj.prototype.Ja = function() {
            return a.Ja(this, X)
        };
        Bh.prototype.Ja = function() {
            return a.Ja(this, Kq)
        };
        vh.prototype.Ja = function() {
            return a.Ja(this,
                kq)
        }
    };
    g.Yp = function(a, b) {
        Object.defineProperty(this.Pd.parameters, a, {
            value: b,
            configurable: !0,
            enumerable: !0
        })
    };
    g.Ei = function(a) {
        return a instanceof fd && a.wl || a instanceof Vj
    };
    g.kp = function(a, b) {
        var c;
        c = a ? a.Yl() : [];
        var d;
        d = b ? b.Yl() : [];
        var e = c.length - 1,
            f = d.length - 1;
        if (0 < e && 0 < f)
            for (; c[e] == d[f];) e--, f--;
        for (var h = 0; h < c.length; h++) c[h].$u(b);
        for (h = 0; h <= e; h++) c[h].Dq(b);
        for (h = 0; h <= f; h++) d[h].Eq(a);
        for (h = 0; h < d.length; h++) d[h].av(b)
    };
    g.Zf = function(a) {
        var b = this.c.ac;
        b && !b.Sd() && b.fireEvent(a)
    };
    g.In = function(a, b) {
        b.Pb(a.Ng())
    };
    g.Rq = function(a, b) {
        a = String(a);
        b = String(b);
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.Qq = function(a, b) {
        a = String(a).toLowerCase();
        b = String(b).toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.Sq = function(a, b) {
        a = null !== a ? Number(a) : null;
        b = null !== b ? Number(b) : null;
        if (a !== a) throw J(1034, a, "Number");
        if (b !== b) throw J(1034, b, "Number");
        return a < b ? -1 : a > b ? 1 : 0
    };
    var tr = null;
    USING_XML_HTTP_MOCK = !!aa.USING_XML_HTTP_MOCK;
    var ur = function(a, b, c) {
        sd(b);
		__parent = b.__parent;
        this.Vc = a;
        this.Od = b.version;
        a = window.location.href;
        this.es = c && c.renderer || aa.swiffy.CANVAS;
        this.nk = this.es.cs(this);
        this.Rb = new Jc(0, 0);
        this.Mg = !1;
        this.fs = new Sd;
        this.Pr = b.fileSize;
        this.Or = !!b.truncated;
        this.wk = new Xh(b.frameRate, this);
        this.zi = [];
        this.cn = [];
        this.qc = {};
        var d = new cd,
            e = dd(b, this, d);
        this.Oa || this.Ee(z);
        this.xf = [];
        this.td = null;
        this.xk = !1;
        this.gs = 1;
        this.$m = !(c && c.dontWireEvents);
        this.lb = document.createElement("div");
        this.lb.style.position = "relative";
        this.lb.style.width =
            "100%";
        this.lb.style.height = "100%";
        this.lb.style.overflow = "hidden";
        this.lb.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
        this.jk = new Ad(this);
        this.ia = new Vj(this, b);
        this.kb = new fd(e, this, "#0");
        this.Oa instanceof Dh && (this.kb.Pb("root1"), this.kb.Wm(this.Oa.uf()));
        this.ia.Ea();
        this.kb.ds(19);
        this.kb.play();
        this.lk(this.kb, 0);
        this.ac = null;
        this.Kk = 0;
        this.gi(d);
        this.ia.hn();
        this.bn = !1;
        this.wd = [];
        this.Pf = null;
        this.tn(a);
        this.navigate = cj;
        this.as = !(c && 0 == c.allowScriptAccess);
        this.qk = !1
    };
    ba("swiffy.Stage", ur, void 0);
    ur.prototype.jw = function() {
        this.wk.stop();
        this.jk.dt();
        this.ia.Ia();
        this.nk.Ia();
        Nb(this.lb);
        var a = this.lb;
        a && a.parentNode && a.parentNode.removeChild(a);
        this.Fe().To()
    };
    ur.prototype.destroy = ur.prototype.jw;
    ur.prototype.xg = function(a) {
        this.ia.xg(a)
    };
    ur.prototype.setBackground = ur.prototype.xg;
    ur.prototype.Rw = function(a) {
        this.Zp(qd(a))
    };
    ur.prototype.setFlashVars = ur.prototype.Rw;
    ur.prototype.tn = function(a) {
        this.Oa.uf().Ef(a);
        this.Zp($i(a))
    };
    ur.prototype.setSwfUrl = ur.prototype.tn;
    ur.prototype.Fr = function(a) {
        this.navigate = a || cj
    };
    ur.prototype.setNavigateHook = ur.prototype.Fr;
    ur.prototype.cx = function(a) {
        this.Fr(a ? function(b, c, d) {
            b = a(b, d ? "POST" : "GET", c);
            cj.call(this, b, c, d)
        } : null)
    };
    ur.prototype.setUrlHook = ur.prototype.cx;
    ur.prototype.start = function() {
        var a = this.wk;
        this.Pp(function() {
            a.start()
        })
    };
    ur.prototype.start = ur.prototype.start;
    g = ur.prototype;
    g.lk = function(a, b) {
        this.ia.Yc(a, -16384 + b);
        this.ha().bp(a, b)
    };
    g.Cs = function(a) {
        return this.ia.Cc(-16384 + a)
    };
    g.oj = function() {
        this.Kk++
    };
    g.sg = function() {
        this.Kk--;
        this.Qp()
    };
    g.Tq = function() {
        return 0 == this.Kk
    };
    g.Pp = function(a) {
        this.Tq() ? a.call() : this.zi.push(a)
    };
    g.Qp = function() {
        if (this.Tq()) {
            for (var a = 0; a < this.zi.length; a++)(0, this.zi[a])();
            this.zi = []
        }
    };
    g.ls = function() {
        this.$m = !1;
        this.jk.fv();
        Fb(document, "keyup", this.dv, !1, this);
        Fb(new Zb(document), "key", this.cv, !1, this)
    };
    g.Lt = function(a) {
        this.kb.map(function(b) {
            if (b instanceof yj) return b.fireEvent(a)
        })
    };
    g.Zo = function() {
        this.Go();
        this.Mg = !0;
        this.Oa.Zf(new Kc(3));
        this.Ua();
        this.Oa.Wd();
        this.ac ? this.ac.Wd() : this.setCapture(this.ia);
        this.Ua();
        this.Jf(!1)
    };
    g.rp = function() {
        this.Mg = !1;
        this.Oa.Zf(new Kc(2));
        this.Ua();
        this.Oa.dg();
        this.ac ? this.ac.dg() : this.releaseCapture(this.ia);
        this.Ua();
        this.Jf(!0)
    };
    g.vn = function(a) {
        if (a) {
            var b = a.getParent();
            if (b) {
                do this.Oa.Ei(b) || (a = b); while (b = b.getParent())
            }
        }
        this.ac != a && (this.Oa.kp(this.jp(this.ac), this.jp(a)), this.ac = a, this.Ua(), this.Jf(!1), this.Dl())
    };
    g.Xe = function(a, b) {
        k(b) || (b = this.ia.un(a));
        this.Rb.x = a.x;
        this.Rb.y = a.y;
        this.Pf && this.Pf.ht(a.x, a.y);
        this.Oa.ag(b);
        this.vn(b)
    };
    g.Jp = function() {
        this.setCapture(this.ia, !0)
    };
    g.Lp = function() {
        this.releaseCapture(this.ia)
    };
    g.Mr = function() {
        var a = this.ia,
            b = new $c(0, 0, a.Md, a.Ld),
            c = window.pageXOffset - a.zk,
            a = window.pageYOffset - a.Ak,
            c = new $c(c, a, c + window.innerWidth, a + window.innerHeight);
        b.mk(c);
        return b
    };
    g.dv = function(a) {
        this.Oa.mj(a);
        this.Oa.Zf(new Kc(0));
        this.Ua();
        this.Oa.vp();
        this.Jf(!0)
    };
    g.cv = function(a) {
        this.Oa.lj(a);
        this.Oa.Zf(new Kc(1));
        this.Ua();
        this.Oa.tp();
        this.Lt(new Kc(20));
        this.Ua();
        this.Jf(!0)
    };
    g.jt = function() {
        return null != this.ac
    };
    g.Dl = function() {
        var a = "default";
        this.ha().Xo() ? (this.Ci() || this.it() || !this.Ne() && this.jt()) && this.ac && (a = this.ac.Xi()) : a = "none";
        this.lb.style.cursor = a
    };
    g.vo = function(a, b, c, d, e, f) {
        this.Ji();
        var h = null;
        k(c) && k(d) && k(e) && k(f) && (h = new $c(20 * c, 20 * d, 20 * e, 20 * f));
        this.Pf = new Hc(a, h, k(b) && b, this.Rb.x, this.Rb.y)
    };
    g.Ji = function() {
        this.Pf = null
    };
    g.xs = function(a) {
        return null != this.Pf && this.Pf.clip === a
    };
    g.jp = function(a) {
        return a != this.ia ? a : null
    };
    g.Ne = function() {
        return !!this.td && !this.td.Sd()
    };
    g.Ci = function() {
        return this.Ne() && this.xk
    };
    g.Mi = function(a) {
        return this.td == a && !a.Sd()
    };
    g.it = function() {
        var a = this.ac;
        return !!a && this.Mi(a)
    };
    g.setCapture = function(a, b) {
        this.releaseCapture(a);
        this.Mg = !0;
        this.td = a;
        b && (this.xk = !0, this.Dl())
    };
    g.releaseCapture = function(a) {
        this.Mg = !1;
        this.td && (this.Dl(), this.td != a && (this.Go(), this.td && (this.td.Tt(), this.Ua())), this.td = null, this.xk = !1)
    };
    g.Hs = function(a) {
        this.xf.push(a)
    };
    g.gi = function(a, b) {
        a.Bv(this, b);
        this.cn.push(a)
    };
    g.vk = function() {
        this.$m && this.ls();
        this.xf = this.xf.filter(function(a) {
            return !a.Sd()
        });
        this.Oa.Bn();
        for (var a = this.xf.length - 1; 0 <= a; --a) {
            var b = this.xf[a];
            b.fireEvent(new Kc(6));
            b.vk()
        }
        this.bn || (this.kb.$.$version = "HTML 11,0,0,0", this.kb.Ea(), this.Ua(), this.kb.Lg(7), this.kb.fireEvent(new Kc(7)), this.Oa.ik(this.Oa.uf()), this.bn = !0);
        this.Oa.Cn();
        this.Ua();
        this.ia.Da && this.jk.ok && (a = this.ia.un(this.Rb), a != this.ac && this.vn(a));
        this.Jf(!1);
        this.ia.ii()
    };
    g.Ee = function(a) {
        this.Oa || (this.Oa = new a(this));
        return this.Oa
    };
    g.ha = function() {
        return this.Oa
    };
    g.Ua = function() {
        this.Oa.Ua()
    };
    g.Jf = function(a) {
        for (var b = [], c = 0; c < this.wd.length; ++c) this.wd[c].qv(a) || b.push(this.wd[c]);
        this.wd = b
    };
    g.Go = function() {
        this.wd = []
    };
    g.Yg = function(a) {
        for (var b = 0; b < this.wd.length; ++b)
            if (this.wd[b].target == a.target) {
                this.wd[b] = a;
                return
            }
        this.wd.push(a)
    };
    g.ql = function() {
        return this.wk
    };
    g.Fe = function() {
        return this.fs
    };
    g.Zp = function(a) {
        for (var b = Object.keys(a), c = 0; c < b.length; c++) {
            var d = b[c],
                e = a[d];
            this.ha().Yp(d, e[e.length - 1])
        }
    };
    g.Ng = function() {
        return "instance" + this.gs++
    };
    g.Li = function() {
        this.qk && (this.ha().Li(), this.ha().Ua(), this.qk = !1);
        this.ia.hn();
        this.nk.Fo();
        this.lb.parentNode || (this.nk.Vi(this.lb), this.Vc.appendChild(this.lb))
    };
    g.Ns = function() {
        this.qk = !0
    };
    g.getName = function() {
        return this.Vc.id
    };
    g.kw = function() {
        if (window.top == window) return !1;
        var a = this.Vc.parentNode;
        if (!a || a != document.body) return !1;
        for (a = a.firstChild; a; a = a.nextSibling)
            if (a != this.Vc && "SCRIPT" != a.tagName && (a.nodeType != Node.TEXT_NODE || a.nodeValue.trim())) return !1;
        return !0
    };
    g.ul = function() {
        return this.as ? this.Vc : null
    };
    var vr = function() {
        this.ud = {}
    };
    q(vr, Zj);
    ng.fa(Aj, vr);
    ng.fa(fd, vr);
    ng.fa(Vj, vr);
    ng.fa(ur, vr);
    vr.prototype.Xb = function(a, b, c) {
        return this.Tp(a.la, b, c)
    };
    vr.prototype.Tp = function(a, b, c) {
        var d = [];
        for (a = a.Va; a; a = a.nextSibling)
            if (!a.Gb || c & 16) {
                for (; 0 < d.length && a.depth > d[d.length - 1];) d.pop(), b = b.yl();
                var e = c,
                    f = a.Bo() && !(c & 16);
                if (f) {
                    if (a instanceof Bj) continue;
                    d.push(a.vf);
                    b = b.Po(a.zf(), a.Ha());
                    e |= 16
                }(e & 24 ? ng.Nd(a) : pg(a)).Tc(a, b, e);
                f && (b = b.Oo())
            }
        for (c = 0; c < d.length; c++) b = b.yl()
    };
    var wr = function() {
        this.ud = {}
    };
    q(wr, vr);
    ng.fa(rh, wr);
    ng.fa(Uj, wr);
    wr.prototype.Xb = function(a, b, c) {
        this.Tp(c & 8 ? a.Me : a.la, b, c)
    };
    var xr = N(function() {}, "flash.text.TextFieldAutoSize");
    P(xr, "CENTER", "center");
    P(xr, "LEFT", "left");
    P(xr, "NONE", "none");
    P(xr, "RIGHT", "right");
    var sr = N(function() {}, "flash.text.TextFieldType");
    P(sr, "DYNAMIC", "dynamic");
    P(sr, "INPUT", "input");
    var zr = function(a, b, c, d, e, f, h, l, n, r, t, p, s) {
        hf(this, new kf);
        Jf.call(this, a);
        Zf.call(this, b);
        Df.call(this, c);
        zf.call(this, d);
        Nf.call(this, e);
        eg.call(this, f);
        gg.call(this, h);
        ag.call(this, l);
        yr.call(this, n);
        Tf.call(this, r);
        Xf.call(this, t);
        Lf.call(this, p);
        Rf.call(this, s)
    };
    N(zr, "flash.text.TextFormat");
    var rr = function(a) {
            var b = jn(zr);
            hf(b, a);
            return b
        },
        yr = function(a) {
            if (!vf.call(this, a)) throw J(2008, "align");
        };
    Object.defineProperties(zr.prototype, {
        align: {
            get: uf,
            set: yr
        },
        blockIndent: {
            get: wf,
            set: xf
        },
        bold: {
            get: yf,
            set: zf
        },
        bullet: {
            get: Af,
            set: Bf
        },
        color: {
            get: Cf,
            set: Df
        },
        font: {
            get: If,
            set: Jf
        },
        indent: {
            get: Kf,
            set: Lf
        },
        italic: {
            get: Mf,
            set: Nf
        },
        kerning: {
            get: Of,
            set: Pf
        },
        leading: {
            get: Qf,
            set: Rf
        },
        leftMargin: {
            get: Sf,
            set: Tf
        },
        letterSpacing: {
            get: Uf,
            set: Vf
        },
        rightMargin: {
            get: Wf,
            set: Xf
        },
        size: {
            get: Yf,
            set: Zf
        },
        tabStops: {
            get: bg,
            set: function(a) {
                a = Q(a, "Array", null, !0);
                cg.call(this, a)
            }
        },
        target: {
            get: $f,
            set: ag
        },
        underline: {
            get: dg,
            set: eg
        },
        url: {
            get: fg,
            set: gg
        }
    });
    var Ar = N(function() {}, "flash.text.TextFormatAlign");
    P(Ar, "CENTER", "center");
    P(Ar, "END", "end");
    P(Ar, "JUSTIFY", "justify");
    P(Ar, "LEFT", "left");
    P(Ar, "RIGHT", "right");
    P(Ar, "START", "start");
    var Br = function(a, b, c, d, e, f) {
            a = Q(a, "String", "_serif");
            b = Q(b, "String", "normal");
            c = Q(c, "String", "normal");
            d = Q(d, "String", "device");
            e = Q(e, "String", "cff");
            f = Q(f, "String", "horizontalStem");
            O(this, "cffHinting", "String", f);
            O(this, "fontLookup", "String", d);
            O(this, "fontName", "String", a);
            O(this, "fontPosture", "String", c);
            O(this, "fontWeight", "String", b);
            O(this, "locked", "Boolean", !1);
            O(this, "renderingMode", "String", e)
        },
        Cr = N(Br, "flash.text.engine.FontDescription");
    Br.prototype.clone = function() {
        return new Br(this.fontName, this.fontWeight, this.fontPosture, this.fontLookup, this.renderingMode, this.ccfHinting)
    };
    Cr.isDeviceFontCompatible = function(a, b, c) {
        Q(a, "String", "");
        Q(b, "String", "");
        Q(c, "String", "");
        R(this, "isDeviceFontCompatible");
        return !1
    };
    Cr.isFontCompatible = function(a, b, c) {
        Q(a, "String", "");
        Q(b, "String", "");
        Q(c, "String", "");
        R(this, "isFontCompatible");
        return !1
    };
    var Dr = N(function() {}, "flash.text.engine.FontPosture");
    Object.defineProperty(Dr, "ITALIC", {
        value: "italic"
    });
    Object.defineProperty(Dr, "NORMAL", {
        value: "normal"
    });
    var Er = N(function() {}, "flash.text.engine.FontWeight");
    Object.defineProperty(Er, "BOLD", {
        value: "bold"
    });
    Object.defineProperty(Er, "NORMAL", {
        value: "normal"
    });
    var Fr = function() {
            W.call(this);
            O(this, "builtInItems", "flash.ui.ContextMenuBuiltInItems", null);
            O(this, "clipboardItems", "flash.ui.ContextMenuClipboardItems", null);
            O(this, "clipboardMenu", "Boolean", !1);
            O(this, "customItems", "Array", []);
            O(this, "link", "flash.net.URLRequest", null)
        },
        Gr = N(Fr, "flash.ui.ContextMenu", wp);
    Object.defineProperty(Gr, "isSupported", {
        value: !1
    });
    Fr.prototype.clone = function() {
        return new Fr
    };
    Fr.prototype.hideBuiltInItems = function() {
        R(this, "hideBuiltInItems")
    };
    var Hr = function(a, b, c, d) {
            W.call(this);
            a = Q(a, "String");
            b = Q(b, "Boolean", !1);
            d = Q(d, "Boolean", !0);
            O(this, "caption", "String", a);
            O(this, "separatorBefore", "Boolean", b);
            O(this, "visible", "Boolean", d)
        },
        Ir = N(Hr, "flash.ui.ContextMenuItem", xp);
    Hr.prototype.clone = function() {
        return new Hr(this.caption, this.separatorBefore, this.enabled, this.visible)
    };
    Ir.systemClearMenuItem = function() {
        R(this, "systemClearMenuItem");
        return null
    };
    Ir.systemCopyLinkMenuItem = function() {
        R(this, "systemCopyLinkMenuItem");
        return null
    };
    Ir.systemCopyMenuItem = function() {
        R(this, "systemCopyMenuItem");
        return null
    };
    Ir.systemCutMenuItem = function() {
        R(this, "systemCutMenuItem");
        return null
    };
    Ir.systemOpenLinkMenuItem = function() {
        R(this, "systemOpenLinkMenuItem");
        return null
    };
    Ir.systemPasteMenuItem = function() {
        R(this, "systemPasteMenuItem");
        return null
    };
    Ir.systemSelectAllMenuItem = function() {
        R(this, "systemSelectAllMenuItem");
        return null
    };
    var Jr = N(function() {}, "flash.ui.Keyboard");
    Object.defineProperties(Jr, {
        capsLock: {
            value: !1
        },
        hasVirtualKeyboard: {
            value: !1
        },
        numLock: {
            value: !1
        },
        physicalKeyboardType: {
            value: "alphanumeric"
        },
        CharCodeStrings: {
            value: "Up Down Left Right F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 F13 F14 F15 F16 F17 F18 F19 F20 F21 F22 F23 F24 F25 F26 F27 F28 F29 F30 F31 F32 F33 F34 F35 Insert Delete Home Begin End PgUp PgDn PrntScrn ScrlLck Pause SysReq Break Reset Stop Menu User Sys Print ClrLn ClrDsp InsLn DelLn InsChr DelChr Prev Next Select Exec Undo Redo Find Help ModeSw".split(" ")
        },
        A: {
            value: 65
        },
        ALTERNATE: {
            value: 18
        },
        AUDIO: {
            value: 16777239
        },
        B: {
            value: 66
        },
        BACK: {
            value: 16777238
        },
        BACKQUOTE: {
            value: 192
        },
        BACKSLASH: {
            value: 220
        },
        BACKSPACE: {
            value: 8
        },
        BLUE: {
            value: 16777219
        },
        C: {
            value: 67
        },
        CAPS_LOCK: {
            value: 20
        },
        CHANNEL_DOWN: {
            value: 16777221
        },
        CHANNEL_UP: {
            value: 16777220
        },
        COMMA: {
            value: 188
        },
        COMMAND: {
            value: 15
        },
        CONTROL: {
            value: 17
        },
        D: {
            value: 68
        },
        DELETE: {
            value: 46
        },
        DOWN: {
            value: 40
        },
        DVR: {
            value: 16777241
        },
        E: {
            value: 69
        },
        END: {
            value: 35
        },
        ENTER: {
            value: 13
        },
        EQUAL: {
            value: 187
        },
        ESCAPE: {
            value: 27
        },
        EXIT: {
            value: 16777237
        },
        F: {
            value: 70
        },
        F1: {
            value: 112
        },
        F10: {
            value: 121
        },
        F11: {
            value: 122
        },
        F12: {
            value: 123
        },
        F13: {
            value: 124
        },
        F14: {
            value: 125
        },
        F15: {
            value: 126
        },
        F2: {
            value: 113
        },
        F3: {
            value: 114
        },
        F4: {
            value: 115
        },
        F5: {
            value: 116
        },
        F6: {
            value: 117
        },
        F7: {
            value: 118
        },
        F8: {
            value: 119
        },
        F9: {
            value: 120
        },
        FAST_FORWARD: {
            value: 16777226
        },
        G: {
            value: 71
        },
        GREEN: {
            value: 16777217
        },
        GUIDE: {
            value: 16777236
        },
        H: {
            value: 72
        },
        HELP: {
            value: 16777245
        },
        HOME: {
            value: 36
        },
        I: {
            value: 73
        },
        INFO: {
            value: 16777235
        },
        INPUT: {
            value: 16777243
        },
        INSERT: {
            value: 45
        },
        J: {
            value: 74
        },
        K: {
            value: 75
        },
        KEYNAME_BEGIN: {
            value: "Begin"
        },
        KEYNAME_BREAK: {
            value: "Break"
        },
        KEYNAME_CLEARDISPLAY: {
            value: "ClrDsp"
        },
        KEYNAME_CLEARLINE: {
            value: "ClrLn"
        },
        KEYNAME_DELETE: {
            value: "Delete"
        },
        KEYNAME_DELETECHAR: {
            value: "DelChr"
        },
        KEYNAME_DELETELINE: {
            value: "DelLn"
        },
        KEYNAME_DOWNARROW: {
            value: "Down"
        },
        KEYNAME_END: {
            value: "End"
        },
        KEYNAME_EXECUTE: {
            value: "Exec"
        },
        KEYNAME_F1: {
            value: "F1"
        },
        KEYNAME_F10: {
            value: "F10"
        },
        KEYNAME_F11: {
            value: "F11"
        },
        KEYNAME_F12: {
            value: "F12"
        },
        KEYNAME_F13: {
            value: "F13"
        },
        KEYNAME_F14: {
            value: "F14"
        },
        KEYNAME_F15: {
            value: "F15"
        },
        KEYNAME_F16: {
            value: "F16"
        },
        KEYNAME_F17: {
            value: "F17"
        },
        KEYNAME_F18: {
            value: "F18"
        },
        KEYNAME_F19: {
            value: "F19"
        },
        KEYNAME_F2: {
            value: "F2"
        },
        KEYNAME_F20: {
            value: "F20"
        },
        KEYNAME_F21: {
            value: "F21"
        },
        KEYNAME_F22: {
            value: "F22"
        },
        KEYNAME_F23: {
            value: "F23"
        },
        KEYNAME_F24: {
            value: "F24"
        },
        KEYNAME_F25: {
            value: "F25"
        },
        KEYNAME_F26: {
            value: "F26"
        },
        KEYNAME_F27: {
            value: "F27"
        },
        KEYNAME_F28: {
            value: "F28"
        },
        KEYNAME_F29: {
            value: "F29"
        },
        KEYNAME_F3: {
            value: "F3"
        },
        KEYNAME_F30: {
            value: "F30"
        },
        KEYNAME_F31: {
            value: "F31"
        },
        KEYNAME_F32: {
            value: "F32"
        },
        KEYNAME_F33: {
            value: "F33"
        },
        KEYNAME_F34: {
            value: "F34"
        },
        KEYNAME_F35: {
            value: "F35"
        },
        KEYNAME_F4: {
            value: "F4"
        },
        KEYNAME_F5: {
            value: "F5"
        },
        KEYNAME_F6: {
            value: "F6"
        },
        KEYNAME_F7: {
            value: "F7"
        },
        KEYNAME_F8: {
            value: "F8"
        },
        KEYNAME_F9: {
            value: "F9"
        },
        KEYNAME_FIND: {
            value: "Find"
        },
        KEYNAME_HELP: {
            value: "Help"
        },
        KEYNAME_HOME: {
            value: "Home"
        },
        KEYNAME_INSERT: {
            value: "Insert"
        },
        KEYNAME_INSERTCHAR: {
            value: "InsChr"
        },
        KEYNAME_INSERTLINE: {
            value: "InsLn"
        },
        KEYNAME_LEFTARROW: {
            value: "Left"
        },
        KEYNAME_MENU: {
            value: "Menu"
        },
        KEYNAME_MODESWITCH: {
            value: "ModeSw"
        },
        KEYNAME_NEXT: {
            value: "Next"
        },
        KEYNAME_PAGEDOWN: {
            value: "PgDn"
        },
        KEYNAME_PAGEUP: {
            value: "PgUp"
        },
        KEYNAME_PAUSE: {
            value: "Pause"
        },
        KEYNAME_PREV: {
            value: "Prev"
        },
        KEYNAME_PRINT: {
            value: "Print"
        },
        KEYNAME_PRINTSCREEN: {
            value: "PrntScrn"
        },
        KEYNAME_REDO: {
            value: "Redo"
        },
        KEYNAME_RESET: {
            value: "Reset"
        },
        KEYNAME_RIGHTARROW: {
            value: "Right"
        },
        KEYNAME_SCROLLLOCK: {
            value: "ScrlLck"
        },
        KEYNAME_SELECT: {
            value: "Select"
        },
        KEYNAME_STOP: {
            value: "Stop"
        },
        KEYNAME_SYSREQ: {
            value: "SysReq"
        },
        KEYNAME_SYSTEM: {
            value: "Sys"
        },
        KEYNAME_UNDO: {
            value: "Undo"
        },
        KEYNAME_UPARROW: {
            value: "Up"
        },
        KEYNAME_USER: {
            value: "User"
        },
        L: {
            value: 76
        },
        LAST: {
            value: 16777233
        },
        LEFT: {
            value: 37
        },
        LEFTBRACKET: {
            value: 219
        },
        LIVE: {
            value: 16777232
        },
        M: {
            value: 77
        },
        MASTER_SHELL: {
            value: 16777246
        },
        MENU: {
            value: 16777234
        },
        MINUS: {
            value: 189
        },
        N: {
            value: 78
        },
        NEXT: {
            value: 16777230
        },
        NUMBER_0: {
            value: 48
        },
        NUMBER_1: {
            value: 49
        },
        NUMBER_2: {
            value: 50
        },
        NUMBER_3: {
            value: 51
        },
        NUMBER_4: {
            value: 52
        },
        NUMBER_5: {
            value: 53
        },
        NUMBER_6: {
            value: 54
        },
        NUMBER_7: {
            value: 55
        },
        NUMBER_8: {
            value: 56
        },
        NUMBER_9: {
            value: 57
        },
        NUMPAD: {
            value: 21
        },
        NUMPAD_0: {
            value: 96
        },
        NUMPAD_1: {
            value: 97
        },
        NUMPAD_2: {
            value: 98
        },
        NUMPAD_3: {
            value: 99
        },
        NUMPAD_4: {
            value: 100
        },
        NUMPAD_5: {
            value: 101
        },
        NUMPAD_6: {
            value: 102
        },
        NUMPAD_7: {
            value: 103
        },
        NUMPAD_8: {
            value: 104
        },
        NUMPAD_9: {
            value: 105
        },
        NUMPAD_ADD: {
            value: 107
        },
        NUMPAD_DECIMAL: {
            value: 110
        },
        NUMPAD_DIVIDE: {
            value: 111
        },
        NUMPAD_ENTER: {
            value: 108
        },
        NUMPAD_MULTIPLY: {
            value: 106
        },
        NUMPAD_SUBTRACT: {
            value: 109
        },
        O: {
            value: 79
        },
        P: {
            value: 80
        },
        PAGE_DOWN: {
            value: 34
        },
        PAGE_UP: {
            value: 33
        },
        PAUSE: {
            value: 16777224
        },
        PERIOD: {
            value: 190
        },
        PLAY: {
            value: 16777223
        },
        PREVIOUS: {
            value: 16777231
        },
        Q: {
            value: 81
        },
        QUOTE: {
            value: 222
        },
        R: {
            value: 82
        },
        RECORD: {
            value: 16777222
        },
        RED: {
            value: 16777216
        },
        REWIND: {
            value: 16777227
        },
        RIGHT: {
            value: 39
        },
        RIGHTBRACKET: {
            value: 221
        },
        S: {
            value: 83
        },
        SEARCH: {
            value: 16777247
        },
        SEMICOLON: {
            value: 186
        },
        SETUP: {
            value: 16777244
        },
        SHIFT: {
            value: 16
        },
        SKIP_BACKWARD: {
            value: 16777229
        },
        SKIP_FORWARD: {
            value: 16777228
        },
        SLASH: {
            value: 191
        },
        SPACE: {
            value: 32
        },
        STOP: {
            value: 16777225
        },
        STRING_BEGIN: {
            value: "\uf72a"
        },
        STRING_BREAK: {
            value: "\uf732"
        },
        STRING_CLEARDISPLAY: {
            value: "\uf73a"
        },
        STRING_CLEARLINE: {
            value: "\uf739"
        },
        STRING_DELETE: {
            value: "\uf728"
        },
        STRING_DELETECHAR: {
            value: "\uf73e"
        },
        STRING_DELETELINE: {
            value: "\uf73c"
        },
        STRING_DOWNARROW: {
            value: "\uf701"
        },
        STRING_END: {
            value: "\uf72b"
        },
        STRING_EXECUTE: {
            value: "\uf742"
        },
        STRING_F1: {
            value: "\uf704"
        },
        STRING_F10: {
            value: "\uf70d"
        },
        STRING_F11: {
            value: "\uf70e"
        },
        STRING_F12: {
            value: "\uf70f"
        },
        STRING_F13: {
            value: "\uf710"
        },
        STRING_F14: {
            value: "\uf711"
        },
        STRING_F15: {
            value: "\uf712"
        },
        STRING_F16: {
            value: "\uf713"
        },
        STRING_F17: {
            value: "\uf714"
        },
        STRING_F18: {
            value: "\uf715"
        },
        STRING_F19: {
            value: "\uf716"
        },
        STRING_F2: {
            value: "\uf705"
        },
        STRING_F20: {
            value: "\uf717"
        },
        STRING_F21: {
            value: "\uf718"
        },
        STRING_F22: {
            value: "\uf719"
        },
        STRING_F23: {
            value: "\uf71a"
        },
        STRING_F24: {
            value: "\uf71b"
        },
        STRING_F25: {
            value: "\uf71c"
        },
        STRING_F26: {
            value: "\uf71d"
        },
        STRING_F27: {
            value: "\uf71e"
        },
        STRING_F28: {
            value: "\uf71f"
        },
        STRING_F29: {
            value: "\uf720"
        },
        STRING_F3: {
            value: "\uf706"
        },
        STRING_F30: {
            value: "\uf721"
        },
        STRING_F31: {
            value: "\uf722"
        },
        STRING_F32: {
            value: "\uf723"
        },
        STRING_F33: {
            value: "\uf724"
        },
        STRING_F34: {
            value: "\uf725"
        },
        STRING_F35: {
            value: "\uf726"
        },
        STRING_F4: {
            value: "\uf707"
        },
        STRING_F5: {
            value: "\uf708"
        },
        STRING_F6: {
            value: "\uf709"
        },
        STRING_F7: {
            value: "\uf70a"
        },
        STRING_F8: {
            value: "\uf70b"
        },
        STRING_F9: {
            value: "\uf70c"
        },
        STRING_FIND: {
            value: "\uf745"
        },
        STRING_HELP: {
            value: "\uf746"
        },
        STRING_HOME: {
            value: "\uf729"
        },
        STRING_INSERT: {
            value: "\uf727"
        },
        STRING_INSERTCHAR: {
            value: "\uf73d"
        },
        STRING_INSERTLINE: {
            value: "\uf73b"
        },
        STRING_LEFTARROW: {
            value: "\uf702"
        },
        STRING_MENU: {
            value: "\uf735"
        },
        STRING_MODESWITCH: {
            value: "\uf747"
        },
        STRING_NEXT: {
            value: "\uf740"
        },
        STRING_PAGEDOWN: {
            value: "\uf72d"
        },
        STRING_PAGEUP: {
            value: "\uf72c"
        },
        STRING_PAUSE: {
            value: "\uf730"
        },
        STRING_PREV: {
            value: "\uf73f"
        },
        STRING_PRINT: {
            value: "\uf738"
        },
        STRING_PRINTSCREEN: {
            value: "\uf72e"
        },
        STRING_REDO: {
            value: "\uf744"
        },
        STRING_RESET: {
            value: "\uf733"
        },
        STRING_RIGHTARROW: {
            value: "\uf703"
        },
        STRING_SCROLLLOCK: {
            value: "\uf72f"
        },
        STRING_SELECT: {
            value: "\uf741"
        },
        STRING_STOP: {
            value: "\uf734"
        },
        STRING_SYSREQ: {
            value: "\uf731"
        },
        STRING_SYSTEM: {
            value: "\uf737"
        },
        STRING_UNDO: {
            value: "\uf743"
        },
        STRING_UPARROW: {
            value: "\uf700"
        },
        STRING_USER: {
            value: "\uf736"
        },
        SUBTITLE: {
            value: 16777240
        },
        T: {
            value: 84
        },
        TAB: {
            value: 9
        },
        U: {
            value: 85
        },
        UP: {
            value: 38
        },
        V: {
            value: 86
        },
        VOD: {
            value: 16777242
        },
        W: {
            value: 87
        },
        X: {
            value: 88
        },
        Y: {
            value: 89
        },
        YELLOW: {
            value: 16777218
        },
        Z: {
            value: 90
        }
    });
    Jr.isAccessible = function() {
        R(this, "isAccessible");
        return !1
    };
    var Kr = N(function() {}, "flash.utils.CompressionAlgorithm");
    Object.defineProperties(Kr, {
        DEFLATE: {
            value: "deflate"
        },
        ZLIB: {
            value: "zlib"
        }
    });
    var Lr = {};
    var En = function() {
            this.tr = {}
        },
        Dn = null;
    En.prototype.ob = function(a) {
        var b = this.tr[a];
        b || ((b = "@" === a.charAt(0)) && (a = a.substring(1)), b = this.tr[a] = Bn("", a, b));
        return b
    };
    En.prototype.qp = function(a, b, c) {
        var d = c ? Wm : b.__swiffy_baseclass;
        if (!d) return null;
        for (var e = [], f = d; f; f = f.__swiffy_baseclass) a.af(this.ob("extendsClass")).Ac(this.ob("@type"), f.__swiffy_name.sb()), e[f.__swiffy_typeid] = !0;
        if (!c) {
            e[b.__swiffy_typeid] = !0;
            b = b.__swiffy_if;
            for (var h in b) e[h] || (c = b[h], a.af(this.ob("implementsInterface")).Ac(this.ob("@type"), c.__swiffy_name.sb()))
        }
        return d
    };
    En.prototype.Kt = function(a, b) {
        for (var c in b.traits)
            if (!(0 <= c.indexOf("."))) {
                var d = b.traits[c],
                    e;
                d instanceof Om ? (e = a.af(this.ob("accessor")), d.hd && d.re ? e.Ac(this.ob("@access"), "readwrite") : d.hd ? e.Ac(this.ob("@access"), "readonly") : d.re && e.Ac(this.ob("@access"), "writeonly")) : e = d instanceof Mm ? a.af(this.ob("method")) : d.Nt ? a.af(this.ob("constant")) : a.af(this.ob("variable"));
                e.Ac(this.ob("@name"), c)
            }
    };
    var pm = function() {
        Object.defineProperty(this, "__swiffy_v", {
            value: {}
        })
    };
    N(pm, "flash.utils.Dictionary");
    var Mr = 0,
        Nr = function(a, b) {
            this.key = fa(a) && /^[0-9]+$/.test(a) ? parseInt(a, 10) : a;
            this.value = b
        },
        Or = function(a) {
            if (!a.Ma && !a.uri) switch (a = a.localName, typeof a) {
                case "object":
                    if (null === a) return "_null";
                case "function":
                    var b = a.__swiffy_dic_key;
                    b || (a.__swiffy_dic_key = b = ++Mr);
                    return b;
                default:
                    return "_" + a
            }
        };
    Object.defineProperty(pm.prototype, "toJSON", {
        value: function(a) {
            return a = Q(a, "String")
        },
        writable: !0,
        configurable: !0
    });
    Object.defineProperty(pm.prototype, "__swiffy_proxy", {
        value: {
            rg: function(a, b) {
                var c = Or(a);
                if (c) return c = (c = this.__swiffy_v[c]) && c.value, ym(c, a), c.apply(this, b);
                throw J(1069, a.sb(), "flash.utils.Dictionary");
            },
            vc: function(a) {
                return (a = Or(a)) ? delete this.__swiffy_v[a] : !1
            },
            Fd: function(a) {
                var b = Or(a);
                if (b) return (a = this.__swiffy_v[b]) && a.value;
                throw J(1069, a.sb(), "flash.utils.Dictionary");
            },
            mf: function(a) {
                return (a = Or(a)) ? a in this.__swiffy_v : !1
            },
            Gg: function(a) {
                var b = this.__swiffy_v;
                return b[Object.keys(b)[a -
                    1]].key
            },
            tf: function(a) {
                var b = this.__swiffy_v;
                return a++ < Object.keys(b).length ? a : 0
            },
            Hg: function(a) {
                var b = this.__swiffy_v;
                return b[Object.keys(b)[a - 1]].value
            },
            setProperty: function(a, b) {
                var c = Or(a);
                if (c) this.__swiffy_v[c] = new Nr(a.localName, b);
                else throw J(1056, a.sb(), "flash.utils.Dictionary");
            }
        }
    });
    var Eq = N(function() {}, "flash.utils.Endian");
    Object.defineProperty(Eq, "BIG_ENDIAN", {
        value: "bigEndian"
    });
    Object.defineProperty(Eq, "LITTLE_ENDIAN", {
        value: "littleEndian"
    });
    var Y = function() {
            Object.defineProperty(this, "__swiffy_v", {
                value: {
                    da: new DataView(new ArrayBuffer(0)),
                    position: 0,
                    Mb: !1
                }
            });
            O(this, "objectEncoding", "uint", 0);
            O(this, "shareable", "Boolean", !1)
        },
        Z = function(a) {
            return a.__swiffy_v
        },
        Pr = N(Y, "flash.utils.ByteArray");
    L(Pr, "bytesAvailable", function() {
        var a = Z(this);
        return Math.max(0, a.da.byteLength - a.position)
    });
    L(Pr, "endian", function() {
        return Z(this).Mb ? "littleEndian" : "bigEndian"
    });
    M(Pr, "endian", function(a) {
        a = Q(a, "String");
        var b = Z(this);
        if ("littleEndian" === a) b.Mb = !0;
        else if ("bigEndian" === a) b.Mb = !1;
        else {
            if (null === a) throw J(2007, "endian");
            throw J(2008, "type");
        }
    });
    L(Pr, "position", function() {
        return Z(this).position
    });
    M(Pr, "position", function(a) {
        a = Q(a, "uint");
        Z(this).position = a
    });
    L(Pr, "length", function() {
        return Z(this).da.byteLength
    });
    M(Pr, "length", function(a) {
        a = Q(a, "uint");
        var b = Z(this);
        Qr(b, a);
        b.position > a && (b.position = a)
    });
    var Qr = function(a, b) {
            var c = a.da;
            if (b > c.buffer.byteLength) {
                var d = new Uint8Array(b + (b >> 3) + (9 > b ? 3 : 6));
                d.set(new Uint8Array(c.buffer));
                a.da = new DataView(d.buffer, 0, b)
            } else b !== c.byteLength && (a.da = new DataView(c.buffer, 0, b))
        },
        Rr = function(a, b) {
            var c = a.position;
            if (c + b > a.da.byteLength) throw J(2030);
            a.position = c + b;
            return c
        },
        Sr = function(a, b) {
            var c = a.position,
                d = c + b;
            d > a.da.byteLength && Qr(a, d);
            a.position = c + b;
            return c
        },
        Fq = function(a, b) {
            var c = Z(a),
                d = Sr(c, b);
            return new Uint8Array(c.da.buffer, d, b)
        };
    Object.defineProperty(Pr, "defaultObjectEncoding", {
        value: 0
    });
    Object.defineProperty(Y.prototype, "__swiffy_proxy", {
        value: {
            Fd: function(a) {
                a = a.Mh(1069, this);
                var b = Z(this).da;
                return a < b.byteLength ? b.getUint8(a) : void 0
            },
            mf: function(a) {
                return a.Rc() < Z(this).da.byteLength
            },
            setProperty: function(a, b) {
                var c = a.Mh(1056, this);
                b = Q(b, "int");
                var d = Z(this),
                    e = c + 1;
                e > d.da.byteLength && Qr(d, e);
                d.da.setUint8(c, b)
            }
        }
    });
    Y.prototype.atomicCompareAndSwapIntAt = function(a, b, c) {
        a = Q(a, "int");
        b = Q(b, "int");
        c = Q(c, "int");
        var d = this.position;
        try {
            this.position = a;
            var e = this.readInt();
            e == b && (this.position = a, this.writeInt(c));
            return e
        } finally {
            this.position = d
        }
    };
    Y.prototype.atomicCompareAndSwapLength = function(a, b) {
        a = Q(a, "int");
        b = Q(b, "int");
        var c = this.length;
        c == a && (this.length = b);
        return c
    };
    Y.prototype.clear = function() {
        var a = Z(this);
        a.da = new DataView(new ArrayBuffer(0));
        a.position = 0
    };
    Y.prototype.compress = function(a) {
        Q(a, "String");
        R(this, "compress")
    };
    Y.prototype.deflate = function() {
        R(this, "deflate")
    };
    Y.prototype.inflate = function() {
        this.uncompress("deflate")
    };
    Y.prototype.readBoolean = function() {
        var a = Z(this),
            b = Rr(a, 1);
        return !!a.da.getUint8(b)
    };
    Y.prototype.readByte = function() {
        var a = Z(this),
            b = Rr(a, 1);
        return a.da.getInt8(b)
    };
    Y.prototype.readBytes = function(a, b, c) {
        a = Q(a, "flash.utils.ByteArray");
        b = Q(b, "uint", 0);
        c = Q(c, "uint", 0);
        if (0 == c) {
            var d = Z(this),
                d = d.da.byteLength - d.position;
            0 < d && (c = d)
        }
        var d = c,
            e = Z(this),
            f = Rr(e, d),
            d = new Uint8Array(e.da.buffer, f, d);
        a = Z(a);
        e = b + c;
        e > a.da.byteLength && Qr(a, e);
        (new Uint8Array(a.da.buffer, b, c)).set(d)
    };
    Y.prototype.readDouble = function() {
        var a = Z(this),
            b = Rr(a, 8);
        return a.da.getFloat64(b, a.Mb)
    };
    Y.prototype.readFloat = function() {
        var a = Z(this),
            b = Rr(a, 4);
        return a.da.getFloat32(b, a.Mb)
    };
    Y.prototype.readInt = function() {
        var a = Z(this),
            b = Rr(a, 4);
        return a.da.getInt32(b, a.Mb)
    };
    Y.prototype.readMultiByte = function(a, b) {
        Q(a, "uint");
        Q(b, "String");
        R(this, "readMultiByte");
        return ""
    };
    Y.prototype.readObject = function() {
        R(this, "readObject")
    };
    Y.prototype.readShort = function() {
        var a = Z(this),
            b = Rr(a, 2);
        return a.da.getInt16(b, a.Mb)
    };
    Y.prototype.readUnsignedByte = function() {
        var a = Z(this),
            b = Rr(a, 1);
        return a.da.getUint8(b)
    };
    Y.prototype.readUnsignedInt = function() {
        var a = Z(this),
            b = Rr(a, 4);
        return a.da.getUint32(b, a.Mb)
    };
    Y.prototype.readUnsignedShort = function() {
        var a = Z(this),
            b = Rr(a, 2);
        return a.da.getUint16(b, a.Mb)
    };
    var Tr = function(a, b) {
        if (0 == b) return "";
        for (var c = Rr(a, b), d = [], e = 0; e < b; ++e, ++c) d.push(a.da.getUint8(c));
        return Zi(escape(String.fromCharCode.apply(String, d)))
    };
    Y.prototype.readUTF = function() {
        var a = Z(this),
            b = Rr(a, 2),
            b = a.da.getUint16(b, a.Mb);
        return Tr(a, b)
    };
    Y.prototype.readUTFBytes = function(a) {
        a = Q(a, "uint");
        return Tr(Z(this), a)
    };
    Y.prototype.toJSON = function(a) {
        Q(a, "String");
        return "ByteArray"
    };
    Y.prototype.uncompress = function(a) {
        a = Q(a, "String", "zlib");
        a = Lr[a];
        if (!a) throw J(2058);
        var b = Z(this);
        if (b.da.byteLength) {
            var c = new Uint8Array(b.da.byteLength + 1);
            c.set(new Uint8Array(b.da.buffer, 0, b.da.byteLength));
            try {
                var d = a(c);
                b.da = new DataView(d.buffer, 0, d.length);
                b.position = 0
            } catch (e) {
                throw J(2058);
            }
        }
    };
    Y.prototype.writeBoolean = function(a) {
        a = Q(a, "Boolean");
        var b = Z(this),
            c = Sr(b, 1);
        b.da.setUint8(c, a ? 1 : 0)
    };
    Y.prototype.writeByte = function(a) {
        a = Q(a, "int");
        var b = Z(this),
            c = Sr(b, 1);
        b.da.setInt8(c, a)
    };
    Y.prototype.writeBytes = function(a, b, c) {
        a = Q(a, "flash.utils.ByteArray");
        b = Q(b, "uint", 0);
        c = Q(c, "uint", 0);
        a = Z(a).da;
        var d = a.byteLength;
        if (b > d || b + c > d) throw J(2006);
        0 == c && (c = d - b);
        Fq(this, c).set(new Uint8Array(a.buffer, b, c))
    };
    Y.prototype.writeDouble = function(a) {
        a = Q(a, "Number");
        var b = Z(this),
            c = Sr(b, 8);
        b.da.setFloat64(c, a, b.Mb)
    };
    Y.prototype.writeFloat = function(a) {
        a = Q(a, "Number");
        var b = Z(this),
            c = Sr(b, 4);
        b.da.setFloat32(c, a, b.Mb)
    };
    Y.prototype.writeInt = function(a) {
        a = Q(a, "int");
        var b = Z(this),
            c = Sr(b, 4);
        b.da.setInt32(c, a, b.Mb)
    };
    Y.prototype.writeMultiByte = function(a, b) {
        Q(a, "String");
        Q(b, "String");
        R(this, "writeMultiByte")
    };
    Y.prototype.writeObject = function() {
        R(this, "writeObject")
    };
    Y.prototype.writeShort = function(a) {
        a = Q(a, "int");
        var b = Z(this),
            c = Sr(b, 2);
        b.da.setInt16(c, a, b.Mb)
    };
    Y.prototype.writeUnsignedInt = function(a) {
        a = Q(a, "uint");
        var b = Z(this),
            c = Sr(b, 4);
        b.da.setUint32(c, a, b.Mb)
    };
    Y.prototype.writeUTF = function(a) {
        a = Q(a, "String");
        a = unescape(encodeURIComponent(a));
        var b = a.length;
        if (65535 < b) throw J(2006);
        var c = Z(this),
            d = Sr(c, b + 2);
        c.da.setUint16(d, b, c.Mb);
        for (var d = d + 2, e = 0; e < b; ++e, ++d) c.da.setUint8(d, a.charCodeAt(e))
    };
    Y.prototype.writeUTFBytes = function(a) {
        a = Q(a, "String");
        a = unescape(encodeURIComponent(a));
        for (var b = a.length, c = Z(this), d = Sr(c, b), e = 0; e < b; ++e, ++d) c.da.setUint8(d, a.charCodeAt(e))
    };
    var Ur = function() {};
    N(Ur, "flash.utils.Proxy");
    lm("flash.utils.flash_proxy", new An(void 0, "http://www.adobe.com/2006/actionscript/flash/proxy"));
    lm(mm("http://www.adobe.com/2006/actionscript/flash/proxy", "isAttribute"), function(a) {
        return a instanceof nm && a.__swiffy_v.Ma
    });
    var Vr = function(a) {
        var b = a.localName;
        return a.Ma || a.uri || !ha(b) ? new nm(a) : String(b)
    };
    Object.defineProperty(Ur.prototype, "__swiffy_proxy", {
        value: {
            rg: function(a, b) {
                a = Vr(a);
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "callProperty")].apply(this, [a].concat(b))
            },
            vc: function(a) {
                a = Vr(a);
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "deleteProperty")].call(this, a)
            },
            Xj: function(a) {
                a = Vr(a);
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "getDescendants")].call(this, a)
            },
            Fd: function(a) {
                a = Vr(a);
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy",
                    "getProperty")].call(this, a)
            },
            mf: function(a) {
                a = a.sb();
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "hasProperty")].call(this, a)
            },
            Gg: function(a) {
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextName")].call(this, Q(a, "int"))
            },
            tf: function(a) {
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextNameIndex")].call(this, Q(a, "int"))
            },
            Hg: function(a) {
                return this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextValue")].call(this,
                    Q(a, "int"))
            },
            setProperty: function(a, b) {
                a = Vr(a);
                this[mm("http://www.adobe.com/2006/actionscript/flash/proxy", "setProperty")].call(this, a, b)
            }
        }
    });
    var Wr = function(a, b) {
        Object.defineProperty(Ur.prototype, mm("http://www.adobe.com/2006/actionscript/flash/proxy", a), {
            value: function() {
                throw J(b, a);
            }
        })
    };
    Wr("callProperty", 2090);
    Wr("deleteProperty", 2092);
    Wr("getDescendants", 2093);
    Wr("getProperty", 2088);
    Wr("hasProperty", 2091);
    Wr("setProperty", 2089);
    Wr("nextNameIndex", 2105);
    Wr("nextName", 2106);
    Wr("nextValue", 2107);
    var Xr = function(a) {
            return a.__swiffy_v
        },
        Yr = N(function(a, b) {
            W.call(this);
            var c = Xr(this);
            c.sm = null;
            c.Kj = !1;
            c.yq = Q(a, "Number");
            c.zq = Q(b, "int", 0);
            c.Mj = 0
        }, "flash.utils.Timer", W);
    L(Yr, "delay", function() {
        return Xr(this).yq
    });
    M(Yr, "delay", function(a) {
        Xr(this).yq = Q(a, "Number")
    });
    L(Yr, "repeatCount", function() {
        return Xr(this).zq
    });
    M(Yr, "repeatCount", function(a) {
        Xr(this).zq = Q(a, "int")
    });
    L(Yr, "running", function() {
        return Xr(this).Kj
    });
    L(Yr, "currentCount", function() {
        return Xr(this).Mj
    });
    K(Yr, "start", function() {
        var a = Xr(this);
        if (!a.Kj) {
            var b = this;
            a.sm = Th(function() {
                a.Mj++;
                b.dispatchEvent(sn.call(Rp, Sp.TIMER, !1, !1));
                var c = b.repeatCount;
                c && a.Mj >= c && (b.stop(), b.dispatchEvent(sn.call(Rp, Sp.TIMER_COMPLETE, !1, !1)))
            }, this.delay);
            a.Kj = !0
        }
    });
    K(Yr, "stop", function() {
        var a = Xr(this);
        Vh(a.sm);
        a.Kj = !1;
        a.sm = null
    });
    K(Yr, "reset", function() {
        this.stop();
        Xr(this).Mj = 0
    });
})()

}