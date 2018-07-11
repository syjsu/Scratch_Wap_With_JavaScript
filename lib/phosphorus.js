var P = function() {
    "use strict";
    var t = window.devicePixelRatio || 1
      , e = "ontouchstart"in document
      , o = function(t, e) {
        t.prototype = Object.create(e.prototype),
        t.parent = e,
        t.base = function(t, o) {
            return e.prototype[o].call(t, [].slice.call(arguments, 2))
        }
    }
      , n = function(t) {
        [].slice.call(arguments, 1).forEach(function(e) {
            s(t, e)
        })
    }
      , s = function(t, e) {
        var o = e[0].toUpperCase() + e.substr(1);
        t.prototype.addEventListener = t.prototype.addEventListener || function(t, e) {
            return (this["$" + t] = this["$" + t] || []).push(e),
            this
        }
        ,
        t.prototype.removeEventListener = t.prototype.removeEventListener || function(t, e) {
            var o = this["$" + t];
            if (o) {
                var n = o.indexOf(e);
                -1 !== n && o.splice(n, 1)
            }
            return this
        }
        ,
        t.prototype.dispatchEvent = t.prototype.dispatchEvent || function(t, e) {
            var o = this["$" + t];
            o && o.forEach(function(t) {
                t(e)
            });
            var n = this["on" + t];
            return n && n(e),
            this
        }
        ,
        t.prototype["on" + o] = function(t) {
            return this.addEventListener(e, t),
            this
        }
        ,
        t.prototype["dispatch" + o] = function(t) {
            return this.dispatchEvent(e, t),
            this
        }
    }
      , a = function() {
        this.loaded = 0
    };
    n(a, "load", "progress", "error"),
    a.prototype.progress = function(t, e, o) {
        this.loaded = t,
        this.total = e,
        this.lengthComputable = o,
        this.dispatchProgress({
            loaded: t,
            total: e,
            lengthComputable: o
        })
    }
    ,
    a.prototype.load = function(t) {
        this.result = t,
        this.isDone = !0,
        this.dispatchLoad(t)
    }
    ,
    a.prototype.error = function(t) {
        this.result = t,
        this.isError = !0,
        this.isDone = !0,
        this.dispatchError(t)
    }
    ;
    var i = function() {
        this.requests = [],
        this.isDone = !0,
        this.update = this.update.bind(this),
        this.error = this.error.bind(this)
    };
    o(i, a),
    i.prototype.add = function(t) {
        if (t instanceof i)
            for (var e = 0; e < t.requests.length; e++)
                this.add(t.requests[e]);
        else
            this.requests.push(t),
            t.addEventListener("progress", this.update),
            t.addEventListener("load", this.update),
            t.addEventListener("error", this.error),
            this.update()
    }
    ,
    i.prototype.update = function() {
        if (!this.isError) {
            for (var t = this.requests, e = t.length, o = 0, n = 0, s = !0, a = 0, i = 0; e--; )
                n += (l = t[e]).loaded,
                l.isDone ? (o += l.loaded,
                i += 1) : l.lengthComputable ? o += l.total : (s = !1,
                a += 1);
            if (!s && a !== t.length) {
                var r = o / (t.length - a) * a;
                for (e = t.length,
                o = 0,
                n = 0,
                s = !0; e--; ) {
                    var l = t[e];
                    l.lengthComputable ? (n += l.loaded,
                    o += l.total) : (o += r,
                    l.isDone && (n += r))
                }
            }
            this.progress(n, o, s),
            this.doneCount = i,
            this.isDone = i === t.length,
            this.isDone && !this.defer && this.load(this.getResult())
        }
    }
    ,
    i.prototype.getResult = function() {
        throw new Error("Users must implement getResult()")
    }
    ;
    var r = {
        AcousticGuitar_F3: "instruments/AcousticGuitar_F3_22k.wav",
        AcousticPiano_As3: "instruments/AcousticPiano(5)_A%233_22k.wav",
        AcousticPiano_C4: "instruments/AcousticPiano(5)_C4_22k.wav",
        AcousticPiano_G4: "instruments/AcousticPiano(5)_G4_22k.wav",
        AcousticPiano_F5: "instruments/AcousticPiano(5)_F5_22k.wav",
        AcousticPiano_C6: "instruments/AcousticPiano(5)_C6_22k.wav",
        AcousticPiano_Ds6: "instruments/AcousticPiano(5)_D%236_22k.wav",
        AcousticPiano_D7: "instruments/AcousticPiano(5)_D7_22k.wav",
        AltoSax_A3: "instruments/AltoSax_A3_22K.wav",
        AltoSax_C6: "instruments/AltoSax(3)_C6_22k.wav",
        Bassoon_C3: "instruments/Bassoon_C3_22k.wav",
        BassTrombone_A2_2: "instruments/BassTrombone_A2(2)_22k.wav",
        BassTrombone_A2_3: "instruments/BassTrombone_A2(3)_22k.wav",
        Cello_C2: "instruments/Cello(3b)_C2_22k.wav",
        Cello_As2: "instruments/Cello(3)_A%232_22k.wav",
        Choir_F3: "instruments/Choir(4)_F3_22k.wav",
        Choir_F4: "instruments/Choir(4)_F4_22k.wav",
        Choir_F5: "instruments/Choir(4)_F5_22k.wav",
        Clarinet_C4: "instruments/Clarinet_C4_22k.wav",
        ElectricBass_G1: "instruments/ElectricBass(2)_G1_22k.wav",
        ElectricGuitar_F3: "instruments/ElectricGuitar(2)_F3(1)_22k.wav",
        ElectricPiano_C2: "instruments/ElectricPiano_C2_22k.wav",
        ElectricPiano_C4: "instruments/ElectricPiano_C4_22k.wav",
        EnglishHorn_D4: "instruments/EnglishHorn(1)_D4_22k.wav",
        EnglishHorn_F3: "instruments/EnglishHorn(1)_F3_22k.wav",
        Flute_B5_1: "instruments/Flute(3)_B5(1)_22k.wav",
        Flute_B5_2: "instruments/Flute(3)_B5(2)_22k.wav",
        Marimba_C4: "instruments/Marimba_C4_22k.wav",
        MusicBox_C4: "instruments/MusicBox_C4_22k.wav",
        Organ_G2: "instruments/Organ(2)_G2_22k.wav",
        Pizz_A3: "instruments/Pizz(2)_A3_22k.wav",
        Pizz_E4: "instruments/Pizz(2)_E4_22k.wav",
        Pizz_G2: "instruments/Pizz(2)_G2_22k.wav",
        SteelDrum_D5: "instruments/SteelDrum_D5_22k.wav",
        SynthLead_C4: "instruments/SynthLead(6)_C4_22k.wav",
        SynthLead_C6: "instruments/SynthLead(6)_C6_22k.wav",
        SynthPad_A3: "instruments/SynthPad(2)_A3_22k.wav",
        SynthPad_C6: "instruments/SynthPad(2)_C6_22k.wav",
        TenorSax_C3: "instruments/TenorSax(1)_C3_22k.wav",
        Trombone_B3: "instruments/Trombone_B3_22k.wav",
        Trumpet_E5: "instruments/Trumpet_E5_22k.wav",
        Vibraphone_C3: "instruments/Vibraphone_C3_22k.wav",
        Violin_D4: "instruments/Violin(2)_D4_22K.wav",
        Violin_A4: "instruments/Violin(3)_A4_22k.wav",
        Violin_E5: "instruments/Violin(3b)_E5_22k.wav",
        WoodenFlute_C5: "instruments/WoodenFlute_C5_22k.wav",
        BassDrum: "drums/BassDrum(1b)_22k.wav",
        Bongo: "drums/Bongo_22k.wav",
        Cabasa: "drums/Cabasa(1)_22k.wav",
        Clap: "drums/Clap(1)_22k.wav",
        Claves: "drums/Claves(1)_22k.wav",
        Conga: "drums/Conga(1)_22k.wav",
        Cowbell: "drums/Cowbell(3)_22k.wav",
        Crash: "drums/Crash(2)_22k.wav",
        Cuica: "drums/Cuica(2)_22k.wav",
        GuiroLong: "drums/GuiroLong(1)_22k.wav",
        GuiroShort: "drums/GuiroShort(1)_22k.wav",
        HiHatClosed: "drums/HiHatClosed(1)_22k.wav",
        HiHatOpen: "drums/HiHatOpen(2)_22k.wav",
        HiHatPedal: "drums/HiHatPedal(1)_22k.wav",
        Maracas: "drums/Maracas(1)_22k.wav",
        SideStick: "drums/SideStick(1)_22k.wav",
        SnareDrum: "drums/SnareDrum(1)_22k.wav",
        Tambourine: "drums/Tambourine(3)_22k.wav",
        Tom: "drums/Tom(1)_22k.wav",
        Triangle: "drums/Triangle(1)_22k.wav",
        Vibraslap: "drums/Vibraslap(1)_22k.wav",
        WoodBlock: "drums/WoodBlock(1)_22k.wav"
    }
      , l = {};
    l.PROJECT_URL = "./project/",
    l.ASSET_URL = "./media/",
    l.SOUNDBANK_URL = "./soundbank/",
    l.FONTS = {
        "": "Helvetica",
        Donegal: "Donegal One",
        Gloria: "Gloria Hallelujah",
        Marker: "Permanent Marker",
        Mystery: "Mystery Quest"
    },
    l.LINE_HEIGHTS = {
        Helvetica: 1.13,
        "Donegal One": 1.25,
        "Gloria Hallelujah": 1.97,
        "Permanent Marker": 1.43,
        "Mystery Quest": 1.37
    },
    l.ADPCM_STEPS = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767],
    l.ADPCM_INDEX = [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8],
    l.init = function(t) {
        l.projectRequest = t,
        l.zip = null
    }
    ,
    l.parseJSONish = function(t) {
        if (!/^\s*\{/.test(t))
            throw new SyntaxError("Bad JSON");
        try {
            return JSON.parse(t)
        } catch (t) {}
        if (/[^,:{}\[\]0-9\.\-+EINaefilnr-uy \n\r\t]/.test(t.replace(/"(\\.|[^"\\])*"/g, "")))
            throw new SyntaxError("Bad JSON");
        return (0,
        eval)("(" + t + ")")
    }
    ,
    l.load = function(t, e, o, n) {
        var s = new a
          , i = new XMLHttpRequest;
        return i.open("GET", t, !0),
        i.onprogress = function(t) {
            s.progress(t.loaded, t.total, t.lengthComputable)
        }
        ,
        i.onload = function() {
            200 === i.status ? s.load(i.response) : s.error(new Error("HTTP " + i.status + ": " + i.statusText))
        }
        ,
        i.onerror = function() {
            s.error(new Error("XHR Error"))
        }
        ,
        i.responseType = n || "",
        setTimeout(i.send.bind(i)),
        e && s.onLoad(e.bind(o)),
        s
    }
    ,
    l.loadImage = function(t, e, o) {
        var n = new a
          , s = new Image;
        return s.crossOrigin = "anonymous",
        s.src = t,
        s.onload = function() {
            n.load(s)
        }
        ,
        s.onerror = function() {
            n.error(new Error("Failed to load image: " + t))
        }
        ,
        e && n.onLoad(e.bind(o)),
        n
    }
    ,
    l.loadScratchr2Project = function(t, e, o) {
        var n = new i;
        l.init(n),
        n.defer = !0;
        var s = l.PROJECT_URL + t + "/get/";
        return n.add(l.load(s).onLoad(function(t) {
            try {
                var i = l.parseJSONish(t)
            } catch (t) {
                return void n.add(l.load(s, null, null, "arraybuffer").onLoad(function(t) {
                    var e = new a;
                    n.add(e),
                    n.add(l.loadSB2Project(t, function(t) {
                        n.getResult = function() {
                            return t
                        }
                        ,
                        e.load()
                    })),
                    n.defer = !1
                }))
            }
            try {
                l.loadProject(i),
                e && n.onLoad(e.bind(o)),
                n.isDone ? n.load((new d).fromJSON(i)) : (n.defer = !1,
                n.getResult = function() {
                    return (new d).fromJSON(i)
                }
                )
            } catch (t) {
                n.error(t)
            }
        })),
        n
    }
    ,
    l.loadScratchr2ProjectTitle = function(t, e, o) {
        var n = new i;
        return n.defer = !0,
        n.add(P.IO.load("https://scratch.mit.edu/projects/" + t + "/").onLoad(function(t) {
            var s = /<title>\s*(.+?)(\s+on\s+Scratch)?\s*<\/title>/.exec(t);
            if (e && n.onLoad(e.bind(o)),
            s) {
                var a = document.createElement("div");
                a.innerHTML = s[1],
                n.load(a.innerText)
            } else
                n.error(new Error("No title"))
        })),
        n
    }
    ,
    l.loadJSONProject = function(t, e, o) {
        var n = new i;
        l.init(n);
        try {
            l.loadProject(t),
            e && n.onLoad(e.bind(o)),
            n.isDone ? n.load((new d).fromJSON(t)) : (n.defer = !1,
            n.getResult = function() {
                return (new d).fromJSON(t)
            }
            )
        } catch (t) {
            n.error(t)
        }
        return n
    }
    ,
    l.loadSB2Project = function(t, e, o) {
        var n = new i;
        l.init(n);
        try {
            l.zip = "[object ArrayBuffer]" === Object.prototype.toString.call(t) ? new JSZip(t) : t;
            var s = l.parseJSONish(l.zip.file("project.json").asText());
            l.loadProject(s),
            e && n.onLoad(e.bind(o)),
            n.isDone ? n.load((new d).fromJSON(s)) : (n.defer = !1,
            n.getResult = function() {
                return (new d).fromJSON(s)
            }
            )
        } catch (t) {
            n.error(t)
        }
        return n
    }
    ,
    l.loadSB2File = function(t, e, o) {
        var n = new i;
        n.defer = !0;
        var s = new a;
        n.add(s);
        var r = new FileReader;
        return r.onloadend = function() {
            n.defer = !0,
            n.add(l.loadSB2Project(r.result, function(t) {
                n.defer = !1,
                n.getResult = function() {
                    return t
                }
                ,
                n.update()
            })),
            s.load()
        }
        ,
        r.onprogress = function(t) {
            s.progress(t.loaded, t.total, t.lengthComputable)
        }
        ,
        r.readAsArrayBuffer(t),
        e && n.onLoad(e.bind(o)),
        n
    }
    ,
    l.loadProject = function(t) {
        l.loadWavs(),
        l.loadArray(t.children, l.loadObject),
        l.loadBase(t)
    }
    ,
    l.wavBuffers = Object.create(null),
    l.loadWavs = function() {
        if (E)
            for (var t in r)
                l.wavBuffers[t] ? l.wavBuffers[t]instanceof a && l.projectRequest.add(l.wavBuffers[t]) : l.projectRequest.add(l.wavBuffers[t] = l.loadWavBuffer(t))
    }
    ,
    l.loadWavBuffer = function(t) {
        var e = new a;
        return l.load(l.SOUNDBANK_URL + r[t], function(o) {
            l.decodeAudio(o, function(o) {
                l.wavBuffers[t] = o,
                e.load()
            })
        }, null, "arraybuffer").onError(function(t) {
            e.error(t)
        }),
        e
    }
    ,
    l.decodeAudio = function(t, e) {
        E ? l.decodeADPCMAudio(t, function(o, n) {
            if (n)
                return setTimeout(function() {
                    e(n)
                });
            var s = E.decodeAudioData(t, function(t) {
                e(t)
            }, function(t) {
                console.warn(o, t),
                e(null)
            });
            try {
                s.catch && s.catch(function() {})
            } catch (o) {}
        }) : setTimeout(e)
    }
    ,
    l.decodeADPCMAudio = function(t, e) {
        var o = new DataView(t);
        if (1380533830 !== o.getUint32(0) || 1463899717 !== o.getUint32(8))
            return e(new Error("Unrecognized audio format"));
        for (var n = {}, s = 12, a = o.byteLength - 8; s < a; )
            n[String.fromCharCode(o.getUint8(s), o.getUint8(s + 1), o.getUint8(s + 2), o.getUint8(s + 3))] = s,
            s += 8 + o.getUint32(s + 4, !0);
        var i = o.getUint16(20, !0)
          , r = (o.getUint16(22, !0),
        o.getUint32(24, !0));
        o.getUint32(28, !0),
        o.getUint16(32, !0),
        o.getUint16(34, !0);
        if (17 === i) {
            var h, d, u, c, p = (o.getUint16(38, !0) - 1) / 2 + 4, f = o.getUint32(n.fact + 8, !0), m = E.createBuffer(1, f, r), b = m.getChannelData(0), g = 0, y = -1, v = n.data + 8;
            s = v;
            for (var S = 0; ; )
                if ((s - v) % p == 0 && y < 0) {
                    if (s >= o.byteLength)
                        break;
                    h = o.getInt16(s, !0),
                    s += 2,
                    g = o.getUint8(s),
                    s += 1,
                    s++,
                    g > 88 && (g = 88),
                    b[S++] = h / 32767
                } else {
                    if (y < 0) {
                        if (s >= o.byteLength)
                            break;
                        y = o.getUint8(s),
                        s += 1,
                        u = 15 & y
                    } else
                        u = y >> 4 & 15,
                        y = -1;
                    d = l.ADPCM_STEPS[g],
                    c = 0,
                    4 & u && (c += d),
                    2 & u && (c += d >> 1),
                    1 & u && (c += d >> 2),
                    c += d >> 3,
                    (g += l.ADPCM_INDEX[u]) > 88 && (g = 88),
                    g < 0 && (g = 0),
                    (h += 8 & u ? -c : c) > 32767 && (h = 32767),
                    h < -32768 && (h = -32768),
                    b[S++] = h / 32768
                }
            return e(null, m)
        }
        e(new Error("Unrecognized WAV format " + i))
    }
    ,
    l.loadBase = function(t) {
        t.scripts = t.scripts || [],
        t.costumes = l.loadArray(t.costumes, l.loadCostume),
        t.sounds = l.loadArray(t.sounds, l.loadSound),
        t.variables = t.variables || [],
        t.lists = t.lists || []
    }
    ,
    l.loadArray = function(t, e) {
        if (!t)
            return [];
        for (var o = 0; o < t.length; o++)
            e(t[o]);
        return t
    }
    ,
    l.loadObject = function(t) {
        t.cmd || t.listName || l.loadBase(t)
    }
    ,
    l.loadCostume = function(t) {
        l.loadMD5(t.baseLayerMD5, t.baseLayerID, function(e) {
            t.$image = e
        }),
        t.textLayerMD5 && l.loadMD5(t.textLayerMD5, t.textLayerID, function(e) {
            t.$text = e
        })
    }
    ,
    l.loadSound = function(t) {
        l.loadMD5(t.md5, t.soundID, function(e) {
            t.$buffer = e
        }, !0)
    }
    ,
    l.fixSVG = function(t, e) {
        if (1 === e.nodeType) {
            if ("text" === e.nodeName) {
                var o = e.getAttribute("font-family") || "";
                (o = l.FONTS[o] || o) && (e.setAttribute("font-family", o),
                "Helvetica" === o && (e.style.fontWeight = "bold"));
                var n = +e.getAttribute("font-size");
                n || e.setAttribute("font-size", n = 18);
                var s = e.getBBox()
                  , a = 4 - .6 * e.transform.baseVal.consolidate().matrix.a
                  , i = 1.1 * (e.getAttribute("y") - s.y);
                e.setAttribute("x", a),
                e.setAttribute("y", i);
                var r = e.textContent.split("\n");
                if (r.length > 1) {
                    e.textContent = r[0];
                    for (var h = l.LINE_HEIGHTS[o] || 1, d = 1, u = r.length; d < u; d++) {
                        var c = document.createElementNS(null, "tspan");
                        c.textContent = r[d],
                        c.setAttribute("x", a),
                        c.setAttribute("y", i + n * d * h),
                        e.appendChild(c)
                    }
                }
            } else
                (e.hasAttribute("x") || e.hasAttribute("y")) && e.hasAttribute("transform") && (e.setAttribute("x", 0),
                e.setAttribute("y", 0));
            [].forEach.call(e.childNodes, l.fixSVG.bind(null, t))
        }
    }
    ,
    l.loadMD5 = function(t, e, o, n) {
        if (l.zip) {
            var s = n ? l.zip.file(e + ".wav") : l.zip.file(e + ".gif") || l.zip.file(e + ".png") || l.zip.file(e + ".jpg") || l.zip.file(e + ".svg");
            t = s.name
        }
        var i = t.split(".").pop();
        if ("svg" === i) {
            h = function(t) {
                var e = new DOMParser
                  , n = e.parseFromString(t, "image/svg+xml")
                  , s = n.documentElement;
                s.style || (s = (n = e.parseFromString("<body>" + t, "text/html")).querySelector("svg")),
                s.style.visibility = "hidden",
                s.style.position = "absolute",
                s.style.left = "-10000px",
                s.style.top = "-10000px",
                document.body.appendChild(s);
                var a = s.viewBox.baseVal;
                a && (a.x || a.y) && (s.width.baseVal.value = a.width - a.x,
                s.height.baseVal.value = a.height - a.y,
                a.x = 0,
                a.y = 0,
                a.width = 0,
                a.height = 0),
                l.fixSVG(s, s),
                document.body.removeChild(s),
                s.style.visibility = s.style.position = s.style.left = s.style.top = "";
                var i = document.createElement("canvas")
                  , r = new Image;
                o(r),
                canvg(i, (new XMLSerializer).serializeToString(s), {
                    ignoreMouse: !0,
                    ignoreAnimation: !0,
                    ignoreClear: !0,
                    renderCallback: function() {
                        r.src = i.toDataURL()
                    }
                })
            }
            ;
            l.zip ? h(s.asText()) : l.projectRequest.add(l.load(l.ASSET_URL + t + "/get/", h))
        } else if ("wav" === i) {
            var r = new a
              , h = function(t) {
                l.decodeAudio(t, function(t) {
                    o(t),
                    r.load(t)
                })
            };
            if (l.projectRequest.add(r),
            l.zip) {
                new Audio;
                h(s.asArrayBuffer())
            } else
                l.projectRequest.add(l.load(l.ASSET_URL + t + "/get/", h, null, "arraybuffer"))
        } else if (l.zip) {
            var r = new a
              , d = new Image;
            d.onload = function() {
                o && o(d),
                r.load()
            }
            ,
            d.src = "data:image/" + ("jpg" === i ? "jpeg" : i) + ";base64," + btoa(s.asBinary()),
            l.projectRequest.add(r)
        } else
            l.projectRequest.add(l.loadImage(l.ASSET_URL + t + "/get/", function(t) {
                o(t)
            }))
    }
    ;
    var h = function() {
        this.isClone = !1,
        this.costumes = [],
        this.currentCostumeIndex = 0,
        this.objName = "",
        this.instrument = 0,
        this.volume = 1,
        this.soundRefs = Object.create(null),
        this.sounds = [],
        this.vars = Object.create(null),
        this.watchers = Object.create(null),
        this.lists = Object.create(null),
        this.procedures = {},
        this.listeners = {
            whenClicked: [],
            whenCloned: [],
            whenGreenFlag: [],
            whenIReceive: {},
            whenKeyPressed: [],
            whenSceneStarts: [],
            whenSensorGreaterThan: []
        };
        for (var t = 0; t < 128; t++)
            this.listeners.whenKeyPressed.push([]);
        this.fns = [],
        this.scripts = [],
        this.filters = {
            color: 0,
            fisheye: 0,
            whirl: 0,
            pixelate: 0,
            mosaic: 0,
            brightness: 0,
            ghost: 0
        }
    };
    h.prototype.fromJSON = function(t) {
        return this.objName = t.objName,
        this.scripts = t.scripts,
        this.currentCostumeIndex = t.currentCostumeIndex || 0,
        this.costumes = t.costumes.map(function(t, e) {
            return new m(t,e,this)
        }, this),
        this.addSounds(t.sounds),
        this.addLists(t.lists),
        this.addVariables(t.variables),
        this
    }
    ,
    h.prototype.addSounds = function(t) {
        for (var e = 0; e < t.length; e++) {
            var o = new b(t[e]);
            this.sounds.push(o),
            this.soundRefs[o.name] = o
        }
    }
    ,
    h.prototype.addVariables = function(t) {
        for (var e = 0; e < t.length; e++) {
            if (t[e].isPeristent)
                throw new Error("Cloud variables are not supported");
            this.vars[t[e].name] = t[e].value
        }
    }
    ,
    h.prototype.addLists = function(t) {
        for (var e = 0; e < t.length; e++) {
            if (t[e].isPeristent)
                throw new Error("Cloud lists are not supported");
            this.lists[t[e].listName] = t[e].contents
        }
    }
    ,
    h.prototype.showVariable = function(t, e) {
        var o = this.watchers[t]
          , n = this.stage;
        o || ((o = this.watchers[t] = new P.Watcher(n)).x = n.defaultWatcherX,
        o.y = n.defaultWatcherY,
        n.defaultWatcherY += 26,
        n.defaultWatcherY >= 450 && (n.defaultWatcherY = 10,
        n.defaultWatcherX += 150),
        o.target = this,
        o.label = (o.target === n ? "" : o.target.objName + ": ") + t,
        o.param = t,
        n.allWatchers.push(o)),
        o.visible = e,
        o.layout()
    }
    ,
    h.prototype.showNextCostume = function() {
        this.currentCostumeIndex = (this.currentCostumeIndex + 1) % this.costumes.length,
        this.isStage && this.updateBackdrop(),
        this.saying && this.updateBubble()
    }
    ,
    h.prototype.showPreviousCostume = function() {
        var t = this.costumes.length;
        this.currentCostumeIndex = (this.currentCostumeIndex + t - 1) % t,
        this.isStage && this.updateBackdrop(),
        this.saying && this.updateBubble()
    }
    ,
    h.prototype.getCostumeName = function() {
        return this.costumes[this.currentCostumeIndex] ? this.costumes[this.currentCostumeIndex].costumeName : ""
    }
    ,
    h.prototype.setCostume = function(t) {
        if ("number" != typeof t) {
            t = "" + t;
            for (var e = 0; e < this.costumes.length; e++)
                if (this.costumes[e].costumeName === t)
                    return this.currentCostumeIndex = e,
                    this.isStage && this.updateBackdrop(),
                    void (this.saying && this.updateBubble());
            if (t === (this.isSprite ? "next costume" : "next backdrop"))
                return void this.showNextCostume();
            if (t === (this.isSprite ? "previous costume" : "previous backdrop"))
                return void this.showPreviousCostume()
        }
        (e = (Math.floor(t) - 1 || 0) % this.costumes.length) < 0 && (e += this.costumes.length),
        this.currentCostumeIndex = e,
        this.isStage && this.updateBackdrop(),
        this.saying && this.updateBubble()
    }
    ,
    h.prototype.setFilter = function(t, e) {
        switch (t) {
        case "ghost":
            e < 0 && (e = 0),
            e > 100 && (e = 100);
            break;
        case "brightness":
            e < -100 && (e = -100),
            e > 100 && (e = 100);
            break;
        case "color":
            (e %= 200) < 0 && (e += 200)
        }
        this.filters[t] = e,
        this.isStage && this.updateFilters()
    }
    ,
    h.prototype.changeFilter = function(t, e) {
        this.setFilter(t, this.filters[t] + e)
    }
    ,
    h.prototype.resetFilters = function() {
        this.filters = {
            color: 0,
            fisheye: 0,
            whirl: 0,
            pixelate: 0,
            mosaic: 0,
            brightness: 0,
            ghost: 0
        }
    }
    ,
    h.prototype.getSound = function(t) {
        if ("string" == typeof t) {
            var e = this.soundRefs[t];
            if (e)
                return e;
            t = +t
        }
        var o = this.sounds.length;
        if (o && "number" == typeof t && t === t) {
            var n = Math.round(t - 1) % o;
            return n < 0 && (n += o),
            this.sounds[n]
        }
    }
    ,
    h.prototype.stopSounds = function() {
        this.node && (this.node.disconnect(),
        this.node = null);
        for (var t = this.sounds.length; t--; ) {
            var e = this.sounds[t];
            e.node && (e.node.disconnect(),
            e.node = null)
        }
    }
    ,
    h.prototype.ask = function(t) {
        var e = this.stage;
        t ? this.isSprite && this.visible ? (this.say(t),
        e.promptTitle.style.display = "none") : (e.promptTitle.style.display = "block",
        e.promptTitle.textContent = t) : e.promptTitle.style.display = "none",
        e.hidePrompt = !1,
        e.prompter.style.display = "block",
        e.prompt.value = "",
        e.prompt.focus()
    }
    ;
    var d = function() {
        this.stage = this,
        d.parent.call(this),
        this.children = [],
        this.allWatchers = [],
        this.dragging = Object.create(null),
        this.defaultWatcherX = 10,
        this.defaultWatcherY = 10,
        this.info = {},
        this.answer = "",
        this.promptId = 0,
        this.nextPromptId = 0,
        this.tempoBPM = 60,
        this.videoAlpha = 1,
        this.zoom = 1,
        this.maxZoom = t,
        this.baseNow = 0,
        this.baseTime = 0,
        this.timerStart = 0,
        this.keys = [],
        this.keys.any = 0,
        this.rawMouseX = 0,
        this.rawMouseY = 0,
        this.mouseX = 0,
        this.mouseY = 0,
        this.mousePressed = !1,
        this.root = document.createElement("div"),
        this.root.style.position = "absolute",
        this.root.style.overflow = "hidden",
        this.root.style.width = "480px",
        this.root.style.height = "360px",
        this.root.style.fontSize = "10px",
        this.root.style.background = "#fff",
        this.root.style.contain = "strict",
        this.root.style.WebkitUserSelect = this.root.style.MozUserSelect = this.root.style.MSUserSelect = this.root.style.WebkitUserSelect = "none",
        this.backdropCanvas = document.createElement("canvas"),
        this.root.appendChild(this.backdropCanvas),
        this.backdropCanvas.width = 480 * t,
        this.backdropCanvas.height = 360 * t,
        this.backdropContext = this.backdropCanvas.getContext("2d"),
        this.penCanvas = document.createElement("canvas"),
        this.root.appendChild(this.penCanvas),
        this.penCanvas.width = 480 * t,
        this.penCanvas.height = 360 * t,
        this.penContext = this.penCanvas.getContext("2d"),
        this.penContext.lineCap = "round",
        this.penContext.scale(t, t),
        this.canvas = document.createElement("canvas"),
        this.root.appendChild(this.canvas),
        this.canvas.width = 480 * t,
        this.canvas.height = 360 * t,
        this.context = this.canvas.getContext("2d"),
        this.ui = document.createElement("div"),
        this.root.appendChild(this.ui),
        this.ui.style.pointerEvents = "none",
        this.ui.style.contain = "strict",
        this.canvas.tabIndex = 0,
        this.canvas.style.outline = "none",
        this.backdropCanvas.style.position = this.penCanvas.style.position = this.canvas.style.position = this.ui.style.position = "absolute",
        this.backdropCanvas.style.left = this.penCanvas.style.left = this.canvas.style.left = this.ui.style.left = this.backdropCanvas.style.top = this.penCanvas.style.top = this.canvas.style.top = this.ui.style.top = 0,
        this.backdropCanvas.style.width = this.penCanvas.style.width = this.canvas.style.width = this.ui.style.width = "480px",
        this.backdropCanvas.style.height = this.penCanvas.style.height = this.canvas.style.height = this.ui.style.height = "360px",
        this.backdropCanvas.style.transform = this.penCanvas.style.transform = this.canvas.style.transform = this.ui.style.transform = "translateZ(0)",
        this.root.addEventListener("keydown", function(t) {
            var e = t.keyCode;
            this.keys[e] || this.keys.any++,
            this.keys[e] = !0,
            t.ctrlKey || t.altKey || t.metaKey || 27 === e || (t.stopPropagation(),
            t.target === this.canvas && (t.preventDefault(),
            this.trigger("whenKeyPressed", e)))
        }
        .bind(this)),
        this.root.addEventListener("keyup", function(t) {
            var e = t.keyCode;
            this.keys[e] && this.keys.any--,
            this.keys[e] = !1,
            t.stopPropagation(),
            t.target === this.canvas && t.preventDefault()
        }
        .bind(this)),
        e ? (document.addEventListener("touchstart", this.onTouchStart = function(t) {
            this.mousePressed = !0;
            for (var e = 0; e < t.changedTouches.length; e++) {
                var o = t.changedTouches[e];
                this.updateMouse(o),
                t.target === this.canvas ? this.clickMouse() : null == t.target.dataset.button && null == t.target.dataset.slider || this.watcherStart(o.identifier, o, t)
            }
            t.target === this.canvas && t.preventDefault()
        }
        .bind(this)),
        document.addEventListener("touchmove", this.onTouchMove = function(t) {
            this.updateMouse(t.changedTouches[0]);
            for (var e = 0; e < t.changedTouches.length; e++) {
                var o = t.changedTouches[e];
                this.watcherMove(o.identifier, o, t)
            }
        }
        .bind(this)),
        document.addEventListener("touchend", this.onTouchEnd = function(t) {
            this.releaseMouse();
            for (var e = 0; e < t.changedTouches.length; e++) {
                var o = t.changedTouches[e];
                this.watcherEnd(o.identifier, o, t)
            }
        }
        .bind(this))) : (document.addEventListener("mousedown", this.onMouseDown = function(t) {
            this.updateMouse(t),
            this.mousePressed = !0,
            t.target === this.canvas ? (this.clickMouse(),
            t.preventDefault(),
            this.canvas.focus()) : (null == t.target.dataset.button && null == t.target.dataset.slider || this.watcherStart("mouse", t, t),
            t.target !== this.prompt && setTimeout(function() {
                this.canvas.focus()
            }
            .bind(this)))
        }
        .bind(this)),
        document.addEventListener("mousemove", this.onMouseMove = function(t) {
            this.updateMouse(t),
            this.watcherMove("mouse", t, t)
        }
        .bind(this)),
        document.addEventListener("mouseup", this.onMouseUp = function(t) {
            this.updateMouse(t),
            this.releaseMouse(),
            this.watcherEnd("mouse", t, t)
        }
        .bind(this))),
        this.prompter = document.createElement("div"),
        this.ui.appendChild(this.prompter),
        this.prompter.style.zIndex = "1",
        this.prompter.style.pointerEvents = "auto",
        this.prompter.style.position = "absolute",
        this.prompter.style.left = this.prompter.style.right = "1.4em",
        this.prompter.style.bottom = ".6em",
        this.prompter.style.padding = ".5em 3.0em .5em .5em",
        this.prompter.style.border = ".3em solid rgb(46, 174, 223)",
        this.prompter.style.borderRadius = ".8em",
        this.prompter.style.background = "#fff",
        this.prompter.style.display = "none",
        this.promptTitle = document.createElement("div"),
        this.prompter.appendChild(this.promptTitle),
        this.promptTitle.textContent = "",
        this.promptTitle.style.cursor = "default",
        this.promptTitle.style.font = "bold 1.3em sans-serif",
        this.promptTitle.style.margin = "0 " + -25 / 13 + "em " + 5 / 13 + "em 0",
        this.promptTitle.style.whiteSpace = "pre",
        this.promptTitle.style.overflow = "hidden",
        this.promptTitle.style.textOverflow = "ellipsis",
        this.prompt = document.createElement("input"),
        this.prompter.appendChild(this.prompt),
        this.prompt.style.border = "0",
        this.prompt.style.background = "#eee",
        this.prompt.style.MozBoxSizing = this.prompt.style.boxSizing = "border-box",
        this.prompt.style.font = "1.3em sans-serif",
        this.prompt.style.padding = "0 " + 3 / 13 + "em",
        this.prompt.style.outline = "0",
        this.prompt.style.margin = "0",
        this.prompt.style.width = "100%",
        this.prompt.style.height = 20 / 13 + "em",
        this.prompt.style.display = "block",
        this.prompt.style.WebkitBorderRadius = this.prompt.style.borderRadius = "0",
        this.prompt.style.WebkitBoxShadow = this.prompt.style.boxShadow = "inset " + 1 / 13 + "em " + 1 / 13 + "em " + 2 / 13 + "em rgba(0, 0, 0, .2), inset " + -1 / 13 + "em " + -1 / 13 + "em " + 1 / 13 + "em rgba(255, 255, 255, .2)",
        this.prompt.style.WebkitAppearance = "none",
        this.promptButton = document.createElement("div"),
        this.prompter.appendChild(this.promptButton),
        this.promptButton.style.width = "2.2em",
        this.promptButton.style.height = "2.2em",
        this.promptButton.style.position = "absolute",
        this.promptButton.style.right = ".4em",
        this.promptButton.style.bottom = ".4em",
        this.promptButton.style.background = "url(icons.svg) -16.5em -3.7em",
        this.promptButton.style.backgroundSize = "32.0em 9.6em",
        this.prompt.addEventListener("keydown", function(t) {
            13 === t.keyCode && this.submitPrompt()
        }
        .bind(this)),
        this.promptButton.addEventListener(e ? "touchstart" : "mousedown", this.submitPrompt.bind(this)),
        this.initRuntime()
    };
    o(d, h),
    d.prototype.isStage = !0,
    d.prototype.watcherStart = function(t, e, o) {
        for (var n = o.target; n && null == n.dataset.watcher; )
            n = n.parentElement;
        if (n) {
            var s = this.allWatchers[n.dataset.watcher];
            this.dragging[t] = {
                watcher: s,
                offset: (null == o.target.dataset.button ? -s.button.offsetWidth / 2 | 0 : s.button.getBoundingClientRect().left - e.clientX) - s.slider.getBoundingClientRect().left
            }
        }
    }
    ,
    d.prototype.watcherMove = function(t, e, o) {
        var n = this.dragging[t];
        if (n) {
            var s = n.watcher
              , a = s.slider.offsetWidth
              , i = s.button.offsetWidth
              , r = s.sliderMin + Math.max(0, Math.min(1, (e.clientX + n.offset) / (a - i))) * (s.sliderMax - s.sliderMin);
            s.target.vars[s.param] = s.isDiscrete ? Math.round(r) : Math.round(100 * r) / 100,
            s.update(),
            o.preventDefault()
        }
    }
    ,
    d.prototype.watcherEnd = function(t, e, o) {
        this.watcherMove(t, e, o),
        delete this.dragging[t]
    }
    ,
    d.prototype.destroy = function() {
        this.stopAll(),
        this.pause(),
        this.onTouchStart && document.removeEventListener("touchstart", this.onTouchStart),
        this.onTouchMove && document.removeEventListener("touchmove", this.onTouchMove),
        this.onTouchEnd && document.removeEventListener("touchend", this.onTouchEnd),
        this.onMouseDown && document.removeEventListener("mousedown", this.onMouseDown),
        this.onMouseMove && document.removeEventListener("mousemove", this.onMouseMove),
        this.onMouseUp && document.removeEventListener("mouseup", this.onMouseUp)
    }
    ,
    d.prototype.fromJSON = function(t) {
        return d.parent.prototype.fromJSON.call(this, t),
        t.children.forEach(function(t) {
            t.listName || (t.cmd ? this.allWatchers.push(new g(this).fromJSON(t)) : this.children.push(new c(this).fromJSON(t)))
        }, this),
        this.allWatchers.forEach(function(t) {
            t.resolve()
        }, this),
        P.compile(this),
        this
    }
    ,
    d.prototype.focus = function() {
        this.promptId < this.nextPromptId ? this.prompt.focus() : this.canvas.focus()
    }
    ,
    d.prototype.updateMouse = function(t) {
        var e = this.canvas.getBoundingClientRect()
          , o = (t.clientX - e.left) / this.zoom - 240
          , n = 180 - (t.clientY - e.top) / this.zoom;
        this.rawMouseX = o,
        this.rawMouseY = n,
        o < -240 && (o = -240),
        o > 240 && (o = 240),
        n < -180 && (n = -180),
        n > 180 && (n = 180),
        this.mouseX = o,
        this.mouseY = n
    }
    ,
    d.prototype.updateBackdrop = function() {
        this.backdropCanvas.width = this.zoom * t * 480,
        this.backdropCanvas.height = this.zoom * t * 360;
        var e = this.costumes[this.currentCostumeIndex];
        this.backdropContext.save();
        var o = this.zoom * t * e.scale;
        this.backdropContext.scale(o, o),
        this.backdropContext.drawImage(e.image, 0, 0),
        this.backdropContext.restore()
    }
    ,
    d.prototype.updateFilters = function() {
        this.backdropCanvas.style.opacity = Math.max(0, Math.min(1, 1 - this.filters.ghost / 100))
    }
    ,
    d.prototype.setZoom = function(e) {
        if (this.zoom !== e) {
            if (this.maxZoom < e * t) {
                this.maxZoom = e * t;
                var o = document.createElement("canvas");
                o.width = this.penCanvas.width,
                o.height = this.penCanvas.height,
                o.getContext("2d").drawImage(this.penCanvas, 0, 0),
                this.penCanvas.width = 480 * e * t,
                this.penCanvas.height = 360 * e * t,
                this.penContext.drawImage(o, 0, 0, 480 * e * t, 360 * e * t),
                this.penContext.scale(this.maxZoom, this.maxZoom),
                this.penContext.lineCap = "round"
            }
            this.root.style.width = this.canvas.style.width = this.backdropCanvas.style.width = this.penCanvas.style.width = this.ui.style.width = (480 * e | 0) + "px",
            this.root.style.height = this.canvas.style.height = this.backdropCanvas.style.height = this.penCanvas.style.height = this.ui.style.height = (360 * e | 0) + "px",
            this.root.style.fontSize = 10 * e + "px",
            this.zoom = e,
            this.updateBackdrop()
        }
    }
    ,
    d.prototype.clickMouse = function() {
        this.mouseSprite = void 0;
        for (var t = this.children.length; t--; ) {
            var e = this.children[t];
            if (e.visible && e.filters.ghost < 100 && e.touching("_mouse_"))
                return void (e.isDraggable ? (this.mouseSprite = e,
                e.mouseDown()) : this.triggerFor(e, "whenClicked"))
        }
        this.triggerFor(this, "whenClicked")
    }
    ,
    d.prototype.releaseMouse = function() {
        this.mousePressed = !1,
        this.mouseSprite && (this.mouseSprite.mouseUp(),
        this.mouseSprite = void 0)
    }
    ,
    d.prototype.stopAllSounds = function() {
        for (var t = this.children, e = t.length; e--; )
            t[e].stopSounds();
        this.stopSounds()
    }
    ,
    d.prototype.removeAllClones = function() {
        for (var t = this.children.length; t--; )
            this.children[t].isClone && (this.children[t].remove(),
            this.children.splice(t, 1))
    }
    ,
    d.prototype.getObject = function(t) {
        for (var e = 0; e < this.children.length; e++) {
            var o = this.children[e];
            if (o.objName === t && !o.isClone)
                return o
        }
        if ("_stage_" === t || t === this.objName)
            return this
    }
    ,
    d.prototype.getObjects = function(t) {
        for (var e = [], o = 0; o < this.children.length; o++)
            this.children[o].objName === t && e.push(this.children[o]);
        return e
    }
    ,
    d.prototype.draw = function() {
        var e = this.context;
        this.canvas.width = 480 * this.zoom * t,
        this.canvas.height = 360 * this.zoom * t,
        e.scale(this.zoom * t, this.zoom * t),
        this.drawOn(e);
        for (var o = this.allWatchers.length; o--; ) {
            var n = this.allWatchers[o];
            n.visible && n.update()
        }
        this.hidePrompt && (this.hidePrompt = !1,
        this.prompter.style.display = "none",
        this.canvas.focus())
    }
    ,
    d.prototype.drawOn = function(t, e) {
        for (var o = 0; o < this.children.length; o++) {
            var n = this.children[o];
            n.visible && n !== e && n.draw(t)
        }
    }
    ,
    d.prototype.drawAllOn = function(t, e) {
        var o = this.costumes[this.currentCostumeIndex];
        t.save(),
        t.scale(o.scale, o.scale),
        t.globalAlpha = Math.max(0, Math.min(1, 1 - this.filters.ghost / 100)),
        t.drawImage(o.image, 0, 0),
        t.restore(),
        t.save(),
        t.scale(1 / this.maxZoom, 1 / this.maxZoom),
        t.drawImage(this.penCanvas, 0, 0),
        t.restore(),
        this.drawOn(t, e)
    }
    ,
    d.prototype.moveTo = function() {}
    ,
    d.prototype.submitPrompt = function() {
        this.promptId < this.nextPromptId && (this.answer = this.prompt.value,
        this.promptId += 1,
        this.promptId >= this.nextPromptId && (this.hidePrompt = !0))
    }
    ;
    var u = {
        space: 32,
        "left arrow": 37,
        "up arrow": 38,
        "right arrow": 39,
        "down arrow": 40,
        any: "any"
    }
      , c = function(t) {
        this.stage = t,
        c.parent.call(this),
        this.direction = 90,
        this.indexInLibrary = -1,
        this.isDraggable = !1,
        this.isDragging = !1,
        this.rotationStyle = "normal",
        this.scale = 1,
        this.scratchX = 0,
        this.scratchY = 0,
        this.spriteInfo = {},
        this.visible = !0,
        this.penHue = 240,
        this.penSaturation = 100,
        this.penLightness = 50,
        this.penSize = 1,
        this.isPenDown = !1,
        this.isSprite = !0,
        this.bubble = null,
        this.saying = !1,
        this.thinking = !1,
        this.sayId = 0
    };
    o(c, h),
    c.prototype.fromJSON = function(t) {
        return c.parent.prototype.fromJSON.call(this, t),
        this.direction = t.direction,
        this.indexInLibrary = t.indexInLibrary,
        this.isDraggable = t.isDraggable,
        this.rotationStyle = t.rotationStyle,
        this.scale = t.scale,
        this.scratchX = t.scratchX,
        this.scratchY = t.scratchY,
        this.spriteInfo = t.spriteInfo,
        this.visible = t.visible,
        this
    }
    ,
    c.prototype.clone = function() {
        var t = new c(this.stage);
        t.isClone = !0,
        t.costumes = this.costumes,
        t.currentCostumeIndex = this.currentCostumeIndex,
        t.objName = this.objName,
        t.soundRefs = this.soundRefs,
        t.sounds = this.sounds;
        for (var e = Object.keys(this.vars), o = e.length; o--; ) {
            n = e[o];
            t.vars[n] = this.vars[n]
        }
        for (o = (e = Object.keys(this.lists)).length; o--; ) {
            var n = e[o];
            t.lists[n] = this.lists[n].slice(0)
        }
        return t.procedures = this.procedures,
        t.listeners = this.listeners,
        t.fns = this.fns,
        t.scripts = this.scripts,
        t.filters = {
            color: this.filters.color,
            fisheye: this.filters.fisheye,
            whirl: this.filters.whirl,
            pixelate: this.filters.pixelate,
            mosaic: this.filters.mosaic,
            brightness: this.filters.brightness,
            ghost: this.filters.ghost
        },
        t.direction = this.direction,
        t.instrument = this.instrument,
        t.indexInLibrary = this.indexInLibrary,
        t.isDraggable = this.isDraggable,
        t.rotationStyle = this.rotationStyle,
        t.scale = this.scale,
        t.volume = this.volume,
        t.scratchX = this.scratchX,
        t.scratchY = this.scratchY,
        t.visible = this.visible,
        t.penColor = this.penColor,
        t.penCSS = this.penCSS,
        t.penHue = this.penHue,
        t.penSaturation = this.penSaturation,
        t.penLightness = this.penLightness,
        t.penSize = this.penSize,
        t.isPenDown = this.isPenDown,
        t
    }
    ,
    c.prototype.mouseDown = function() {
        this.dragStartX = this.scratchX,
        this.dragStartY = this.scratchY,
        this.dragOffsetX = this.scratchX - this.stage.mouseX,
        this.dragOffsetY = this.scratchY - this.stage.mouseY,
        this.isDragging = !0
    }
    ,
    c.prototype.mouseUp = function() {
        this.isDragging && this.scratchX === this.dragStartX && this.scratchY === this.dragStartY && this.stage.triggerFor(this, "whenClicked"),
        this.isDragging = !1
    }
    ,
    c.prototype.forward = function(t) {
        var e = (90 - this.direction) * Math.PI / 180;
        this.moveTo(this.scratchX + t * Math.cos(e), this.scratchY + t * Math.sin(e))
    }
    ,
    c.prototype.moveTo = function(t, e) {
        var o = this.scratchX
          , n = this.scratchY;
        if (o !== t || n !== e || this.isPenDown) {
            if (this.scratchX = t,
            this.scratchY = e,
            this.isPenDown && !this.isDragging) {
                var s = this.stage.penContext;
                this.penSize % 2 > .5 && this.penSize % 2 < 1.5 && (o -= .5,
                n -= .5,
                t -= .5,
                e -= .5),
                s.strokeStyle = this.penCSS || "hsl(" + this.penHue + "," + this.penSaturation + "%," + (this.penLightness > 100 ? 200 - this.penLightness : this.penLightness) + "%)",
                s.lineWidth = this.penSize,
                s.beginPath(),
                s.moveTo(240 + o, 180 - n),
                s.lineTo(240 + t, 180 - e),
                s.stroke()
            }
            this.saying && this.updateBubble()
        }
    }
    ,
    c.prototype.dotPen = function() {
        var t = this.stage.penContext
          , e = this.scratchX
          , o = this.scratchY;
        t.fillStyle = this.penCSS || "hsl(" + this.penHue + "," + this.penSaturation + "%," + (this.penLightness > 100 ? 200 - this.penLightness : this.penLightness) + "%)",
        t.beginPath(),
        t.arc(240 + e, 180 - o, this.penSize / 2, 0, 2 * Math.PI, !1),
        t.fill()
    }
    ,
    c.prototype.draw = function(e, o) {
        var n = this.costumes[this.currentCostumeIndex];
        if (this.isDragging && this.moveTo(this.dragOffsetX + this.stage.mouseX, this.dragOffsetY + this.stage.mouseY),
        n) {
            e.save();
            var s = this.stage.zoom * t;
            e.translate(((this.scratchX + 240) * s | 0) / s, ((180 - this.scratchY) * s | 0) / s),
            "normal" === this.rotationStyle ? e.rotate((this.direction - 90) * Math.PI / 180) : "leftRight" === this.rotationStyle && this.direction < 0 && e.scale(-1, 1),
            e.scale(this.scale, this.scale),
            e.scale(n.scale, n.scale),
            e.translate(-n.rotationCenterX, -n.rotationCenterY),
            o || (e.globalAlpha = Math.max(0, Math.min(1, 1 - this.filters.ghost / 100))),
            e.drawImage(n.image, 0, 0),
            e.restore()
        }
    }
    ,
    c.prototype.setDirection = function(t) {
        var e = t % 360;
        e > 180 && (e -= 360),
        e <= -180 && (e += 360),
        this.direction = e,
        this.saying && this.updateBubble()
    }
    ;
    var p = document.createElement("canvas")
      , f = p.getContext("2d");
    c.prototype.touching = function(t) {
        var e = this.costumes[this.currentCostumeIndex];
        if ("_mouse_" === t) {
            var o = this.rotatedBounds()
              , n = this.stage.rawMouseX
              , s = this.stage.rawMouseY;
            if (n < o.left || s < o.bottom || n > o.right || s > o.top)
                return !1;
            var a = (n - this.scratchX) / this.scale
              , i = (this.scratchY - s) / this.scale;
            if ("normal" === this.rotationStyle && 90 !== this.direction) {
                var r = (90 - this.direction) * Math.PI / 180
                  , l = a
                  , h = Math.sin(r)
                  , d = Math.cos(r);
                a = d * l - h * i,
                i = h * l + d * i
            } else
                "leftRight" === this.rotationStyle && this.direction < 0 && (a = -a);
            return 0 !== (r = e.context.getImageData(a * e.bitmapResolution + e.rotationCenterX, i * e.bitmapResolution + e.rotationCenterY, 1, 1).data)[3]
        }
        if ("_edge_" === t)
            return (o = this.rotatedBounds()).left <= -240 || o.right >= 240 || o.top >= 180 || o.bottom <= -180;
        if (!this.visible)
            return !1;
        for (var u = this.stage.getObjects(t), c = u.length; c--; ) {
            var m = u[c];
            if (m.visible) {
                var b = this.rotatedBounds()
                  , g = m.rotatedBounds();
                if (!(b.bottom >= g.top || g.bottom >= b.top || b.left >= g.right || g.left >= b.right)) {
                    var y = Math.max(b.left, g.left)
                      , v = Math.min(b.top, g.top)
                      , E = Math.min(b.right, g.right)
                      , S = Math.max(b.bottom, g.bottom);
                    p.width = E - y,
                    p.height = v - S,
                    f.save(),
                    f.translate(-(y + 240), -(180 - v)),
                    this.draw(f, !0),
                    f.globalCompositeOperation = "source-in",
                    m.draw(f, !0),
                    f.restore();
                    try{
                    for (var w = f.getImageData(0, 0, E - y, v - S).data, C = (E - y) * (v - S) * 4, k = 0; k < C; k += 4)
                        if (w[k + 3])
                            return !0
                    }catch(e){};
                }
            }
        }
        return !1
    }
    ,
    c.prototype.touchingColor = function(t) {
        var e = this.rotatedBounds();
        p.width = e.right - e.left,
        p.height = e.top - e.bottom,
        f.save(),
        f.translate(-(240 + e.left), -(180 - e.top)),
        this.stage.drawAllOn(f, this),
        f.globalCompositeOperation = "destination-in",
        this.draw(f, !0),
        f.restore();
        var o = f.getImageData(0, 0, e.right - e.left, e.top - e.bottom).data;
        t &= 16777215;
        for (var n = (e.right - e.left) * (e.top - e.bottom) * 4, s = 0; s < n; s += 4)
            if ((o[s] << 16 | o[s + 1] << 8 | o[s + 2]) === t && o[s + 3])
                return !0;
        return !1
    }
    ,
    c.prototype.bounceOffEdge = function() {
        var t = this.rotatedBounds()
          , e = 240 + t.left
          , o = 180 - t.top
          , n = 240 - t.right
          , s = 180 + t.bottom
          , a = Math.min(e, o, n, s);
        if (!(a > 0)) {
            var i = this.direction * Math.PI / 180
              , r = Math.sin(i)
              , l = -Math.cos(i);
            switch (a) {
            case e:
                r = Math.max(.2, Math.abs(r));
                break;
            case o:
                l = Math.max(.2, Math.abs(l));
                break;
            case n:
                r = -Math.max(.2, Math.abs(r));
                break;
            case s:
                l = -Math.max(.2, Math.abs(l))
            }
            this.direction = 180 * Math.atan2(l, r) / Math.PI + 90,
            this.saying && this.updateBubble(),
            t = this.rotatedBounds();
            this.scratchX,
            this.scratchY;
            t.left < -240 && -240 - t.left,
            t.top > 180 && 180 - t.top,
            t.right > 240 && 240 - t.left,
            t.bottom < -180 && -180 - t.top
        }
    }
    ,
    c.prototype.rotatedBounds = function() {
        var t = this.costumes[this.currentCostumeIndex]
          , e = t.scale * this.scale
          , o = -t.rotationCenterX * e
          , n = t.rotationCenterY * e
          , s = o + t.image.width * e
          , a = n - t.image.height * e;
        if ("normal" !== this.rotationStyle)
            return "leftRight" === this.rotationStyle && this.direction < 0 && (o = (s = -o) - t.image.width * t.scale * this.scale),
            {
                left: this.scratchX + o,
                right: this.scratchX + s,
                top: this.scratchY + n,
                bottom: this.scratchY + a
            };
        var i = Math.sin(this.direction * Math.PI / 180)
          , r = Math.cos(this.direction * Math.PI / 180)
          , l = i * o - r * n
          , h = r * o + i * n
          , d = i * s - r * n
          , u = r * s + i * n
          , c = i * o - r * a
          , p = r * o + i * a
          , f = i * s - r * a
          , m = r * s + i * a;
        return {
            left: this.scratchX + Math.min(l, d, c, f),
            right: this.scratchX + Math.max(l, d, c, f),
            top: this.scratchY + Math.max(h, u, p, m),
            bottom: this.scratchY + Math.min(h, u, p, m)
        }
    }
    ,
    c.prototype.showRotatedBounds = function() {
        var t = this.rotatedBounds()
          , e = document.createElement("div");
        e.style.outline = "1px solid red",
        e.style.position = "absolute",
        e.style.left = 240 + t.left + "px",
        e.style.top = 180 - t.top + "px",
        e.style.width = t.right - t.left + "px",
        e.style.height = t.top - t.bottom + "px",
        this.stage.canvas.parentNode.appendChild(e)
    }
    ,
    c.prototype.distanceTo = function(t) {
        if ("_mouse_" === t)
            var e = this.stage.mouseX
              , o = this.stage.mouseY;
        else {
            var n = this.stage.getObject(t);
            if (!n)
                return 1e4;
            e = n.scratchX,
            o = n.scratchY
        }
        return Math.sqrt((this.scratchX - e) * (this.scratchX - e) + (this.scratchY - o) * (this.scratchY - o))
    }
    ,
    c.prototype.gotoObject = function(t) {
        if ("_mouse_" === t)
            this.moveTo(this.stage.mouseX, this.stage.mouseY);
        else if ("_random_" === t) {
            var e = Math.round(480 * Math.random() - 240)
              , o = Math.round(360 * Math.random() - 180);
            this.moveTo(e, o)
        } else {
            var n = this.stage.getObject(t);
            if (!n)
                return 0;
            this.moveTo(n.scratchX, n.scratchY)
        }
    }
    ,
    c.prototype.pointTowards = function(t) {
        if ("_mouse_" === t)
            var e = this.stage.mouseX
              , o = this.stage.mouseY;
        else {
            var n = this.stage.getObject(t);
            if (!n)
                return 0;
            e = n.scratchX,
            o = n.scratchY
        }
        var s = e - this.scratchX
          , a = o - this.scratchY;
        this.direction = 0 === s && 0 === a ? 90 : 180 * Math.atan2(s, a) / Math.PI,
        this.saying && this.updateBubble()
    }
    ,
    c.prototype.say = function(t, e) {
        if (!(t = "" + t)) {
            if (this.saying = !1,
            !this.bubble)
                return;
            return this.bubble.style.display = "none",
            ++this.sayId
        }
        return this.saying = !0,
        this.thinking = e,
        this.bubble || (this.bubble = document.createElement("div"),
        this.bubble.style.maxWidth = 127 / 14 + "em",
        this.bubble.style.minWidth = 48 / 14 + "em",
        this.bubble.style.padding = 8 / 14 + "em " + 10 / 14 + "em",
        this.bubble.style.border = 3 / 14 + "em solid rgb(160, 160, 160)",
        this.bubble.style.borderRadius = 10 / 14 + "em",
        this.bubble.style.background = "#fff",
        this.bubble.style.position = "absolute",
        this.bubble.style.font = "bold 1.4em sans-serif",
        this.bubble.style.whiteSpace = "pre-wrap",
        this.bubble.style.wordWrap = "break-word",
        this.bubble.style.textAlign = "center",
        this.bubble.style.cursor = "default",
        this.bubble.style.pointerEvents = "auto",
        this.bubble.appendChild(this.bubbleText = document.createTextNode("")),
        this.bubble.appendChild(this.bubblePointer = document.createElement("div")),
        this.bubblePointer.style.position = "absolute",
        this.bubblePointer.style.height = "1.5em",
        this.bubblePointer.style.width = 44 / 14 + "em",
        this.bubblePointer.style.background = "url(icons.svg) " + -195 / 14 + "em " + -4 / 14 + "em",
        this.bubblePointer.style.backgroundSize = 320 / 14 + "em " + 96 / 14 + "em",
        this.stage.ui.appendChild(this.bubble)),
        this.bubblePointer.style.backgroundPositionX = (e ? -259 : -195) / 14 + "em",
        this.bubble.style.display = "block",
        this.bubbleText.nodeValue = t,
        this.updateBubble(),
        ++this.sayId
    }
    ,
    c.prototype.updateBubble = function() {
        if (this.visible && this.saying) {
            var t = this.rotatedBounds()
              , e = 240 + t.right
              , o = 180 + t.top
              , n = this.bubble.offsetWidth / this.stage.zoom
              , s = this.bubble.offsetHeight / this.stage.zoom;
            this.bubblePointer.style.top = (s - 6) / 14 + "em",
            e + n + 2 > 480 ? (this.bubble.style.right = (240 - t.left) / 14 + "em",
            this.bubble.style.left = "auto",
            this.bubblePointer.style.right = 3 / 14 + "em",
            this.bubblePointer.style.left = "auto",
            this.bubblePointer.style.backgroundPositionY = -36 / 14 + "em") : (this.bubble.style.left = e / 14 + "em",
            this.bubble.style.right = "auto",
            this.bubblePointer.style.left = 3 / 14 + "em",
            this.bubblePointer.style.right = "auto",
            this.bubblePointer.style.backgroundPositionY = -4 / 14 + "em"),
            o + s + 2 > 360 && (o = 360 - s - 2),
            o < 19 && (o = 19),
            this.bubble.style.bottom = o / 14 + "em"
        } else
            this.bubble.style.display = "none"
    }
    ,
    c.prototype.remove = function() {
        this.bubble && (this.stage.ui.removeChild(this.bubble),
        this.bubble = null),
        this.node && (this.node.disconnect(),
        this.node = null)
    }
    ;
    var m = function(t, e, o) {
        this.index = e,
        this.base = o,
        this.baseLayerID = t.baseLayerID,
        this.baseLayerMD5 = t.baseLayerMD5,
        this.baseLayer = t.$image,
        this.bitmapResolution = t.bitmapResolution || 1,
        this.scale = 1 / this.bitmapResolution,
        this.costumeName = t.costumeName,
        this.rotationCenterX = t.rotationCenterX,
        this.rotationCenterY = t.rotationCenterY,
        this.textLayer = t.$text,
        this.image = document.createElement("canvas"),
        this.context = this.image.getContext("2d"),
        this.render(),
        this.baseLayer.onload = function() {
            this.render()
        }
        .bind(this),
        this.textLayer && (this.textLayer.onload = this.baseLayer.onload)
    };
    n(m, "load"),
    m.prototype.render = function() {
        !this.baseLayer.width || this.textLayer && !this.textLayer.width || (this.image.width = this.baseLayer.width,
        this.image.height = this.baseLayer.height,
        this.context.drawImage(this.baseLayer, 0, 0),
        this.textLayer && this.context.drawImage(this.textLayer, 0, 0),
        this.base.isStage && this.index == this.base.currentCostumeIndex && setTimeout(function() {
            this.base.updateBackdrop()
        }
        .bind(this)))
    }
    ;
    var b = function(t) {
        this.name = t.soundName,
        this.buffer = t.$buffer,
        this.duration = this.buffer ? this.buffer.duration : 0
    }
      , g = function(t) {
        this.stage = t,
        this.cmd = "getVar:",
        this.color = "#ee7d16",
        this.isDiscrete = !0,
        this.label = "watcher",
        this.mode = 1,
        this.param = "var",
        this.sliderMax = 100,
        this.sliderMin = 0,
        this.target = void 0,
        this.visible = !0,
        this.x = 0,
        this.y = 0,
        this.el = null,
        this.labelEl = null,
        this.readout = null,
        this.slider = null,
        this.button = null
    };
    g.prototype.fromJSON = function(t) {
        if (this.cmd = t.cmd || "getVar:",
        t.color) {
            var e = (t.color < 0 ? t.color + 16777216 : t.color).toString(16);
            this.color = "#000000".slice(0, -e.length) + e
        }
        return this.isDiscrete = null == t.isDiscrete || t.isDiscrete,
        this.label = t.label || "",
        this.mode = t.mode || 1,
        this.param = t.param,
        this.sliderMax = null == t.sliderMax ? 100 : t.sliderMax,
        this.sliderMin = t.sliderMin || 0,
        this.targetName = t.target,
        this.visible = null == t.visible || t.visible,
        this.x = t.x || 0,
        this.y = t.y || 0,
        this
    }
    ,
    g.prototype.resolve = function() {
        this.target = this.stage.getObject(this.targetName),
        this.target && "getVar:" === this.cmd && (this.target.watchers[this.param] = this),
        this.label || (this.label = this.getLabel(),
        this.target.isSprite && (this.label = this.target.objName + ": " + this.label)),
        this.layout()
    }
    ;
    var y = {
        costumeIndex: "costume #",
        xpos: "x position",
        ypos: "y position",
        heading: "direction",
        scale: "size",
        backgroundIndex: "background #",
        sceneName: "background name",
        tempo: "tempo",
        volume: "volume",
        answer: "answer",
        timer: "timer",
        soundLevel: "loudness",
        isLoud: "loud?",
        xScroll: "x scroll",
        yScroll: "y scroll"
    };
    g.prototype.getLabel = function() {
        switch (this.cmd) {
        case "getVar:":
            return this.param;
        case "sensor:":
            return this.param + " sensor value";
        case "sensorPressed":
            return "sensor " + this.param + "?";
        case "timeAndDate":
            return this.param;
        case "senseVideoMotion":
            return "video " + this.param
        }
        return y[this.cmd] || ""
    }
    ,
    g.prototype.update = function(t) {
        var e = 0;
        if (this.target) {
            switch (this.cmd) {
            case "answer":
                e = this.stage.answer;
                break;
            case "backgroundIndex":
                e = this.stage.currentCostumeIndex + 1;
                break;
            case "costumeIndex":
                e = this.target.currentCostumeIndex + 1;
                break;
            case "getVar:":
                e = this.target.vars[this.param];
                break;
            case "heading":
                e = this.target.direction;
                break;
            case "scale":
                e = 100 * this.target.scale;
                break;
            case "sceneName":
                e = this.stage.getCostumeName();
                break;
            case "senseVideoMotion":
            case "soundLevel":
                break;
            case "tempo":
                e = this.stage.tempoBPM;
                break;
            case "timeAndDate":
                e = this.timeAndDate(this.param);
                break;
            case "timer":
                e = Math.round((this.stage.rightNow() - this.stage.timerStart) / 100) / 10;
                break;
            case "volume":
                e = 100 * this.target.volume;
                break;
            case "xpos":
                e = this.target.scratchX;
                break;
            case "ypos":
                e = this.target.scratchY
            }
            "number" == typeof e && (e < .001 || e > .001) && (e = Math.round(1e3 * e) / 1e3),
            this.readout.textContent = "" + e,
            this.slider && (this.buttonWrap.style.transform = "translate(" + ((+e || 0) - this.sliderMin) / (this.sliderMax - this.sliderMin) * 100 + "%,0)")
        }
    }
    ,
    g.prototype.layout = function() {
        if (this.el)
            this.el.style.display = this.visible ? "block" : "none";
        else if (this.visible) {
            this.el = document.createElement("div"),
            this.el.dataset.watcher = this.stage.allWatchers.indexOf(this),
            this.el.style.whiteSpace = "pre",
            this.el.style.position = "absolute",
            this.el.style.left = this.el.style.top = "0",
            this.el.style.transform = "translate(" + (0 | this.x) / 10 + "em," + (0 | this.y) / 10 + "em)",
            this.el.style.cursor = "default",
            this.el.style.pointerEvents = "auto",
            2 === this.mode ? (this.el.appendChild(this.readout = document.createElement("div")),
            this.readout.style.minWidth = 38 / 15 + "em",
            this.readout.style.font = "bold 1.5em/" + 19 / 15 + " sans-serif",
            this.readout.style.height = 19 / 15 + "em",
            this.readout.style.borderRadius = 4 / 15 + "em",
            this.readout.style.margin = "0.2em 0 0 0",
            this.readout.style.padding = "0 0.3em") : (this.el.appendChild(this.labelEl = document.createElement("div"), this.el.firstChild),
            this.el.appendChild(this.readout = document.createElement("div")),
            this.el.style.border = ".1em solid rgb(148,145,145)",
            this.el.style.borderRadius = ".4em",
            this.el.style.background = "rgb(193,196,199)",
            this.el.style.padding = ".2em .6em .3em .5em",
            this.labelEl.textContent = this.label,
            this.labelEl.style.font = "bold 1.1em/1 sans-serif",
            this.labelEl.style.display = "inline-block",
            this.labelEl.style.verticalAlign = this.readout.style.verticalAlign = "middle",
            this.readout.style.minWidth = "3.7em",
            this.readout.style.padding = "0 0.1em",
            this.readout.style.font = "bold 1.0em/1.3 sans-serif",
            this.readout.style.height = "1.3em",
            this.readout.style.borderRadius = "0.4em",
            this.readout.style.marginLeft = "0.6em"),
            this.readout.style.color = "#fff";
            var t = 1 / (2 === this.mode ? 15 : 10);
            this.readout.style.border = t + "em solid #fff",
            this.readout.style.boxShadow = "inset " + t + "em " + t + "em " + t + "em rgba(0,0,0,.5), inset -" + t + "em -" + t + "em " + t + "em rgba(255,255,255,.5)",
            this.readout.style.textAlign = "center",
            this.readout.style.background = this.color,
            this.readout.style.display = "inline-block",
            3 === this.mode && (this.el.appendChild(this.slider = document.createElement("div")),
            this.slider.appendChild(this.buttonWrap = document.createElement("div")),
            this.buttonWrap.appendChild(this.button = document.createElement("div")),
            this.slider.style.height = this.slider.style.borderRadius = ".5em",
            this.slider.style.background = "rgb(192,192,192)",
            this.slider.style.margin = ".4em 0 .1em",
            this.slider.style.boxShadow = "inset .125em .125em .125em rgba(0,0,0,.5), inset -.125em -.125em .125em rgba(255,255,255,.5)",
            this.slider.style.position = "relative",
            this.slider.dataset.slider = "",
            this.slider.style.paddingRight = this.button.style.width = this.button.style.height = this.button.style.borderRadius = "1.1em",
            this.button.style.position = "absolute",
            this.button.style.left = "0",
            this.button.style.top = "-.3em",
            this.button.style.background = "#fff",
            this.button.style.boxShadow = "inset .3em .3em .2em -.2em rgba(255,255,255,.9), inset -.3em -.3em .2em -.2em rgba(0,0,0,.9), inset 0 0 0 .1em #777",
            this.button.dataset.button = ""),
            this.stage.ui.appendChild(this.el)
        }
    }
    ;
    var v = window.AudioContext || window.webkitAudioContext
      , E = v && new v;
    return {
        hasTouchEvents: e,
        getKeyCode: function(t) {
            return u[t.toLowerCase()] || t.toUpperCase().charCodeAt(0)
        },
        audioContext: E,
        IO: l,
        Base: h,
        Stage: d,
        Sprite: c,
        Watcher: g
    }
}();
P.compile = function() {
    "use strict";
    var t, e = ["procDef", "whenClicked", "whenCloned", "whenGreenFlag", "whenIReceive", "whenKeyPressed", "whenSceneStarts", "whenSensorGreaterThan"], o = function(t) {
        for (var e = 0; e < t.scripts.length; e++)
            s(t, t.scripts[e][2])
    }, n = function(e) {
        t[e] = (t[e] || 0) + 1
    }, s = function(t, o) {
        if (o[0] && -1 !== e.indexOf(o[0][0])) {
            var s = function() {
                return t.fns.length + M.length
            }
              , a = function() {
                var t = s();
                return M.push(_.length),
                k = 0,
                t
            }
              , i = function() {
                _ += "return;\n",
                a()
            }
              , r = function(t) {
                _ += "queue(" + t + ");\n",
                _ += "return;\n"
            }
              , l = function(t) {
                _ += "forceQueue(" + t + ");\n",
                _ += "return;\n"
            }
              , h = function(t) {
                if (t)
                    for (var e = 0; e < t.length; e++)
                        x(t[e])
            }
              , d = function(e) {
                return "string" != typeof e ? "getVars(" + f(e) + ")[" + f(e) + "]" : (void 0 !== t.stage.vars[e] ? "self" : "S") + ".vars[" + f(e) + "]"
            }
              , u = function(e) {
                if ("string" != typeof e)
                    return "getLists(" + f(e) + ")[" + f(e) + "]";
                var o = void 0 !== t.stage.lists[e] ? "self" : "S";
                return "S" !== o || t.lists[e] || (t.lists[e] = []),
                o + ".lists[" + f(e) + "]"
            }
              , c = function(t, e, o) {
                if ("string" != typeof t)
                    throw new Error("Dynamic parameters are not supported");
                if (!A)
                    return "0";
                var n = A.indexOf(t);
                if (-1 === n)
                    return "0";
                var s = T[n]
                  , a = "%n" === s || "%d" === s || "%c" === s ? "num" : "%b" === s ? "bool" : "";
                if ("num" === a && e)
                    return L[n] = !0,
                    "C.numargs[" + n + "]";
                if ("bool" === a && o)
                    return L[n] = !0,
                    "C.boolargs[" + n + "]";
                var i = "C.args[" + n + "]";
                return e ? "(+" + i + " || 0)" : o ? "bool(" + i + ")" : i
            }
              , p = function(t) {
                return "costumeName" === t[0] ? "S.getCostumeName()" : "sceneName" === t[0] ? "self.getCostumeName()" : "readVariable" === t[0] ? d(t[1]) : "contentsOfList:" === t[0] ? "contentsOfList(" + u(t[1]) + ")" : "getLine:ofList:" === t[0] ? "getLineOfList(" + u(t[2]) + ", " + f(t[1]) + ")" : "concatenate:with:" === t[0] ? '("" + ' + f(t[1]) + " + " + f(t[2]) + ")" : "letter:of:" === t[0] ? '(("" + ' + f(t[2]) + ")[(" + v(t[1]) + ' | 0) - 1] || "")' : "answer" === t[0] ? "self.answer" : "getAttribute:of:" === t[0] ? "attribute(" + f(t[1]) + ", " + f(t[2]) + ")" : "getUserId" === t[0] ? "0" : "getUserName" === t[0] ? '""' : void n("Undefined val: " + t[0])
            }
              , f = function(t, e, o) {
                var n;
                return "number" == typeof t || "boolean" == typeof t ? "" + t : "string" == typeof t ? '"' + t.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/"/g, '\\"').replace(/\{/g, "\\x7b").replace(/\}/g, "\\x7d") + '"' : "getParam" === t[0] ? c(t[1], e, o) : null != (n = m(t)) || null != (n = g(t)) ? n : (n = p(t),
                e ? "(+" + n + " || 0)" : o ? "bool(" + n + ")" : n)
            }
              , m = function(t) {
                if ("xpos" === t[0])
                    return "S.scratchX";
                if ("ypos" === t[0])
                    return "S.scratchY";
                if ("heading" === t[0])
                    return "S.direction";
                if ("costumeIndex" === t[0])
                    return "(S.currentCostumeIndex + 1)";
                if ("backgroundIndex" === t[0])
                    return "(self.currentCostumeIndex + 1)";
                if ("scale" === t[0])
                    return "(S.scale * 100)";
                if ("volume" === t[0])
                    return "(S.volume * 100)";
                if ("tempo" === t[0])
                    return "self.tempoBPM";
                if ("lineCountOfList:" === t[0])
                    return u(t[1]) + ".length";
                if ("+" === t[0])
                    return "(" + v(t[1]) + " + " + v(t[2]) + " || 0)";
                if ("-" === t[0])
                    return "(" + v(t[1]) + " - " + v(t[2]) + " || 0)";
                if ("*" === t[0])
                    return "(" + v(t[1]) + " * " + v(t[2]) + " || 0)";
                if ("/" === t[0])
                    return "(" + v(t[1]) + " / " + v(t[2]) + " || 0)";
                if ("randomFrom:to:" === t[0])
                    return "random(" + v(t[1]) + ", " + v(t[2]) + ")";
                if ("abs" === t[0])
                    return "Math.abs(" + v(t[1]) + ")";
                if ("sqrt" === t[0])
                    return "Math.sqrt(" + v(t[1]) + ")";
                if ("stringLength:" === t[0])
                    return '("" + ' + f(t[1]) + ").length";
                if ("%" === t[0] || "\\\\" === t[0])
                    return "mod(" + v(t[1]) + ", " + v(t[2]) + ")";
                if ("rounded" === t[0])
                    return "Math.round(" + v(t[1]) + ")";
                if ("computeFunction:of:" === t[0]) {
                    if ("object" != typeof t[1]) {
                        switch ("" + t[1]) {
                        case "abs":
                            return "Math.abs(" + v(t[2]) + ")";
                        case "floor":
                            return "Math.floor(" + v(t[2]) + ")";
                        case "sqrt":
                            return "Math.sqrt(" + v(t[2]) + ")";
                        case "ceiling":
                            return "Math.ceil(" + v(t[2]) + ")";
                        case "cos":
                            return "Math.cos(" + v(t[2]) + " * Math.PI / 180)";
                        case "sin":
                            return "Math.sin(" + v(t[2]) + " * Math.PI / 180)";
                        case "tan":
                            return "Math.tan(" + v(t[2]) + " * Math.PI / 180)";
                        case "asin":
                            return "Math.asin(" + v(t[2]) + ") * 180 / Math.PI";
                        case "acos":
                            return "Math.acos(" + v(t[2]) + ") * 180 / Math.PI";
                        case "atan":
                            return "Math.atan(" + v(t[2]) + ") * 180 / Math.PI";
                        case "ln":
                            return "Math.log(" + v(t[2]) + ")";
                        case "log":
                            return "Math.log(" + v(t[2]) + ") / Math.LN10";
                        case "e ^":
                            return "Math.exp(" + v(t[2]) + ")";
                        case "10 ^":
                            return "Math.exp(" + v(t[2]) + " * Math.LN10)"
                        }
                        return "0"
                    }
                    return "mathFunc(" + f(t[1]) + ", " + v(t[2]) + ")"
                }
                return "mouseX" === t[0] ? "self.mouseX" : "mouseY" === t[0] ? "self.mouseY" : "timer" === t[0] ? "((self.now - self.timerStart) / 1000)" : "distanceTo:" === t[0] ? "S.distanceTo(" + f(t[1]) + ")" : "timestamp" === t[0] ? "((Date.now() - epoch) / 86400000)" : "timeAndDate" === t[0] ? "timeAndDate(" + f(t[1]) + ")" : void 0
            }
              , b = /\d/
              , g = function(t) {
                if ("list:contains:" === t[0])
                    return "listContains(" + u(t[1]) + ", " + f(t[2]) + ")";
                if ("<" === t[0] || ">" === t[0]) {
                    if ("string" == typeof t[1] && b.test(t[1]) || "number" == typeof t[1])
                        var e = "<" === t[0]
                          , o = t[1]
                          , n = t[2];
                    else if ("string" == typeof t[2] && b.test(t[2]) || "number" == typeof t[2])
                        var e = ">" === t[0]
                          , o = t[2]
                          , n = t[1];
                    s = +o;
                    return null == o || s !== s ? "(compare(" + f(t[1]) + ", " + f(t[2]) + ") === " + ("<" === t[0] ? -1 : 1) + ")" : (e ? "numLess" : "numGreater") + "(" + s + ", " + f(n) + ")"
                }
                if ("=" === t[0]) {
                    if ("string" == typeof t[1] && b.test(t[1]) || "number" == typeof t[1])
                        var o = t[1]
                          , n = t[2];
                    else if ("string" == typeof t[2] && b.test(t[2]) || "number" == typeof t[2])
                        var o = t[2]
                          , n = t[1];
                    var s = +o;
                    return null == o || s !== s ? "(equal(" + f(t[1]) + ", " + f(t[2]) + "))" : "(numEqual(" + s + ", " + f(n) + "))"
                }
                return "&" === t[0] ? "(" + y(t[1]) + " && " + y(t[2]) + ")" : "|" === t[0] ? "(" + y(t[1]) + " || " + y(t[2]) + ")" : "not" === t[0] ? "!" + y(t[1]) : "mousePressed" === t[0] ? "self.mousePressed" : "touching:" === t[0] ? "S.touching(" + f(t[1]) + ")" : "touchingColor:" === t[0] ? "S.touchingColor(" + f(t[1]) + ")" : "keyPressed:" === t[0] ? "!!self.keys[" + ("object" == typeof t[1] ? "P.getKeyCode(" + f(t[1]) + ")" : f(P.getKeyCode(t[1]))) + "]" : void 0
            }
              , y = function(t) {
                if ("boolean" == typeof t)
                    return t;
                if ("number" == typeof t || "string" == typeof t)
                    return 0 != +t && "" !== t && "false" !== t && !1 !== t;
                var e = g(t);
                return null != e ? e : f(t, !1, !0)
            }
              , v = function(t) {
                if ("number" == typeof t)
                    return t || 0;
                if ("boolean" == typeof t || "string" == typeof t)
                    return +t || 0;
                var e = m(t);
                return null != e ? e : f(t, !0)
            }
              , E = function(t) {
                _ += "save();\n",
                _ += "R.start = self.now;\n",
                _ += "R.duration = " + v(t) + " * 60 / self.tempoBPM;\n",
                _ += "var first = true;\n"
            }
              , S = function(t) {
                var e = a();
                _ += "if (self.now - R.start < R.duration * 1000 || first) {\n",
                _ += "  var first;\n",
                l(e),
                _ += "}\n",
                _ += "restore();\n"
            }
              , w = function(t) {
                _ += "save();\n",
                _ += "R.start = self.now;\n",
                _ += "R.duration = " + t + ";\n",
                _ += "var first = true;\n";
                var e = a();
                _ += "if (self.now - R.start < R.duration * 1000 || first) {\n",
                _ += "  var first;\n",
                l(e),
                _ += "}\n",
                _ += "restore();\n"
            }
              , C = "";
            C += "if (S.penCSS) {\n",
            C += "  var hsl = rgb2hsl(S.penColor & 0xffffff);\n",
            C += "  S.penHue = hsl[0];\n",
            C += "  S.penSaturation = hsl[1];\n",
            C += "  S.penLightness = hsl[2];\n",
            C += "  S.penCSS = null;",
            C += "}\n";
            var k = 0
              , x = function(e) {
                if (-1 !== ["turnRight:", "turnLeft:", "heading:", "pointTowards:", "setRotationStyle", "lookLike:", "nextCostume", "say:duration:elapsed:from:", "say:", "think:duration:elapsed:from:", "think:", "changeGraphicEffect:by:", "setGraphicEffect:to:", "filterReset", "changeSizeBy:", "setSizeTo:", "comeToFront", "goBackByLayers:"].indexOf(e[0]) ? k < 2 && (_ += "if (S.visible) VISUAL = true;\n",
                k = 2) : -1 !== ["forward:", "gotoX:y:", "gotoSpriteOrMouse:", "changeXposBy:", "xpos:", "changeYposBy:", "ypos:", "bounceOffEdge", "glideSecs:toX:y:elapsed:from:"].indexOf(e[0]) ? k < 1 && (_ += "if (S.visible || S.isPenDown) VISUAL = true;\n",
                k = 1) : -1 !== ["showBackground:", "startScene", "nextBackground", "nextScene", "startSceneAndWait", "show", "hide", "putPenDown", "stampCostume", "showVariable:", "hideVariable:", "doAsk", "setVolumeTo:", "changeVolumeBy:", "setTempoTo:", "changeTempoBy:"].indexOf(e[0]) && k < 3 && (_ += "VISUAL = true;\n",
                k = 3),
                "forward:" === e[0])
                    _ += "S.forward(" + v(e[1]) + ");\n";
                else if ("turnRight:" === e[0])
                    _ += "S.setDirection(S.direction + " + v(e[1]) + ");\n";
                else if ("turnLeft:" === e[0])
                    _ += "S.setDirection(S.direction - " + v(e[1]) + ");\n";
                else if ("heading:" === e[0])
                    _ += "S.setDirection(" + v(e[1]) + ");\n";
                else if ("pointTowards:" === e[0])
                    _ += "S.pointTowards(" + f(e[1]) + ");\n";
                else if ("gotoX:y:" === e[0])
                    _ += "S.moveTo(" + v(e[1]) + ", " + v(e[2]) + ");\n";
                else if ("gotoSpriteOrMouse:" === e[0])
                    _ += "S.gotoObject(" + f(e[1]) + ");\n";
                else if ("changeXposBy:" === e[0])
                    _ += "S.moveTo(S.scratchX + " + v(e[1]) + ", S.scratchY);\n";
                else if ("xpos:" === e[0])
                    _ += "S.moveTo(" + v(e[1]) + ", S.scratchY);\n";
                else if ("changeYposBy:" === e[0])
                    _ += "S.moveTo(S.scratchX, S.scratchY + " + v(e[1]) + ");\n";
                else if ("ypos:" === e[0])
                    _ += "S.moveTo(S.scratchX, " + v(e[1]) + ");\n";
                else if ("bounceOffEdge" === e[0])
                    _ += "S.bounceOffEdge();\n";
                else if ("setRotationStyle" === e[0])
                    _ += "var style = " + f(e[1]) + ";\n",
                    _ += 'S.rotationStyle = style === "left-right" ? "leftRight" : style === "don\'t rotate" ? "none" : "normal";\n';
                else if ("lookLike:" === e[0])
                    _ += "S.setCostume(" + f(e[1]) + ");\n";
                else if ("nextCostume" === e[0])
                    _ += "S.showNextCostume();\n";
                else if ("showBackground:" === e[0] || "startScene" === e[0])
                    _ += "self.setCostume(" + f(e[1]) + ");\n",
                    _ += "var threads = sceneChange();\n",
                    _ += "if (threads.indexOf(BASE) !== -1) {return;}\n";
                else if ("nextBackground" === e[0] || "nextScene" === e[0])
                    _ += "S.showNextCostume();\n",
                    _ += "var threads = sceneChange();\n",
                    _ += "if (threads.indexOf(BASE) !== -1) {return;}\n";
                else if ("startSceneAndWait" === e[0]) {
                    _ += "save();\n",
                    _ += "self.setCostume(" + f(e[1]) + ");\n",
                    _ += "R.threads = sceneChange();\n",
                    _ += "if (R.threads.indexOf(BASE) !== -1) {return;}\n";
                    b = a();
                    _ += "if (!running(R.threads)) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "restore();\n"
                } else if ("say:duration:elapsed:from:" === e[0]) {
                    _ += "save();\n",
                    _ += "R.id = S.say(" + f(e[1]) + ", false);\n",
                    _ += "R.start = self.now;\n",
                    _ += "R.duration = " + v(e[2]) + ";\n";
                    b = a();
                    _ += "if (self.now - R.start < R.duration * 1000) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "if (S.sayId === R.id) {\n",
                    _ += '  S.say("");\n',
                    _ += "}\n",
                    _ += "restore();\n"
                } else if ("say:" === e[0])
                    _ += "S.say(" + f(e[1]) + ", false);\n";
                else if ("think:duration:elapsed:from:" === e[0]) {
                    _ += "save();\n",
                    _ += "R.id = S.say(" + f(e[1]) + ", true);\n",
                    _ += "R.start = self.now;\n",
                    _ += "R.duration = " + v(e[2]) + ";\n";
                    b = a();
                    _ += "if (self.now - R.start < R.duration * 1000) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "if (S.sayId === R.id) {\n",
                    _ += '  S.say("");\n',
                    _ += "}\n",
                    _ += "restore();\n"
                } else if ("think:" === e[0])
                    _ += "S.say(" + f(e[1]) + ", true);\n";
                else if ("changeGraphicEffect:by:" === e[0])
                    _ += "S.changeFilter(" + f(e[1]) + ", " + v(e[2]) + ");\n";
                else if ("setGraphicEffect:to:" === e[0])
                    _ += "S.setFilter(" + f(e[1]) + ", " + v(e[2]) + ");\n";
                else if ("filterReset" === e[0])
                    _ += "S.resetFilters();\n";
                else if ("changeSizeBy:" === e[0])
                    _ += "var f = S.scale + " + v(e[1]) + " / 100;\n",
                    _ += "S.scale = f < 0 ? 0 : f;\n";
                else if ("setSizeTo:" === e[0])
                    _ += "var f = " + v(e[1]) + " / 100;\n",
                    _ += "S.scale = f < 0 ? 0 : f;\n";
                else if ("show" === e[0])
                    _ += "S.visible = true;\n",
                    _ += "if (S.saying) S.updateBubble();\n";
                else if ("hide" === e[0])
                    _ += "S.visible = false;\n",
                    _ += "if (S.saying) S.updateBubble();\n";
                else if ("comeToFront" === e[0])
                    _ += "var i = self.children.indexOf(S);\n",
                    _ += "if (i !== -1) self.children.splice(i, 1);\n",
                    _ += "self.children.push(S);\n";
                else if ("goBackByLayers:" === e[0])
                    _ += "var i = self.children.indexOf(S);\n",
                    _ += "if (i !== -1) {\n",
                    _ += "  self.children.splice(i, 1);\n",
                    _ += "  self.children.splice(Math.max(0, i - " + v(e[1]) + "), 0, S);\n",
                    _ += "}\n";
                else if ("playSound:" === e[0])
                    P.audioContext && (_ += "var sound = S.getSound(" + f(e[1]) + ");\n",
                    _ += "if (sound) playSound(sound);\n");
                else if ("doPlaySoundAndWait" === e[0])
                    P.audioContext && (_ += "var sound = S.getSound(" + f(e[1]) + ");\n",
                    _ += "if (sound) {\n",
                    _ += "  playSound(sound);\n",
                    w("sound.duration"),
                    _ += "}\n");
                else if ("stopAllSounds" === e[0])
                    P.audioContext && (_ += "self.stopAllSounds();\n");
                else if ("playDrum" === e[0])
                    E(e[2]),
                    P.audioContext && (_ += "playSpan(DRUMS[Math.round(" + v(e[1]) + ") - 1] || DRUMS[2], 60, 10);\n"),
                    S();
                else if ("rest:elapsed:from:" === e[0])
                    E(e[1]),
                    S();
                else if ("noteOn:duration:elapsed:from:" === e[0])
                    E(e[2]),
                    P.audioContext && (_ += "playNote(" + v(e[1]) + ", R.duration);\n"),
                    S();
                else if ("instrument:" === e[0])
                    _ += "S.instrument = Math.max(0, Math.min(INSTRUMENTS.length - 1, " + v(e[1]) + " - 1)) | 0;";
                else if ("changeVolumeBy:" === e[0] || "setVolumeTo:" === e[0])
                    _ += "S.volume = Math.min(1, Math.max(0, " + ("changeVolumeBy:" === e[0] ? "S.volume + " : "") + v(e[1]) + " / 100));\n",
                    _ += "if (S.node) S.node.gain.setValueAtTime(S.volume, audioContext.currentTime);\n",
                    _ += "for (var sounds = S.sounds, i = sounds.length; i--;) {\n",
                    _ += "  var sound = sounds[i];\n",
                    _ += "  if (sound.node && sound.target === S) {\n",
                    _ += "    sound.node.gain.setValueAtTime(S.volume, audioContext.currentTime);\n",
                    _ += "  }\n",
                    _ += "}\n";
                else if ("changeTempoBy:" === e[0])
                    _ += "self.tempoBPM += " + v(e[1]) + ";\n";
                else if ("setTempoTo:" === e[0])
                    _ += "self.tempoBPM = " + v(e[1]) + ";\n";
                else if ("clearPenTrails" === e[0])
                    _ += "self.penCanvas.width = 480 * self.maxZoom;\n",
                    _ += "self.penContext.scale(self.maxZoom, self.maxZoom);\n",
                    _ += 'self.penContext.lineCap = "round";\n';
                else if ("putPenDown" === e[0])
                    _ += "S.isPenDown = true;\n",
                    _ += "S.dotPen();\n";
                else if ("putPenUp" === e[0])
                    _ += "S.isPenDown = false;\n",
                    _ += "S.penState = null;\n";
                else if ("penColor:" === e[0])
                    _ += "var c = " + v(e[1]) + ";\n",
                    _ += "S.penColor = c;\n",
                    _ += "var a = (c >> 24 & 0xff) / 0xff;\n",
                    _ += 'S.penCSS = "rgba(" + (c >> 16 & 0xff) + "," + (c >> 8 & 0xff) + "," + (c & 0xff) + ", " + (a || 1) + ")";\n';
                else if ("setPenHueTo:" === e[0])
                    _ += C,
                    _ += "S.penHue = " + v(e[1]) + " * 360 / 200;\n",
                    _ += "S.penSaturation = 100;\n";
                else if ("changePenHueBy:" === e[0])
                    _ += C,
                    _ += "S.penHue += " + v(e[1]) + " * 360 / 200;\n",
                    _ += "S.penSaturation = 100;\n";
                else if ("setPenShadeTo:" === e[0])
                    _ += C,
                    _ += "S.penLightness = " + v(e[1]) + " % 200;\n",
                    _ += "if (S.penLightness < 0) S.penLightness += 200;\n",
                    _ += "S.penSaturation = 100;\n";
                else if ("changePenShadeBy:" === e[0])
                    _ += C,
                    _ += "S.penLightness = (S.penLightness + " + v(e[1]) + ") % 200;\n",
                    _ += "if (S.penLightness < 0) S.penLightness += 200;\n",
                    _ += "S.penSaturation = 100;\n";
                else if ("penSize:" === e[0])
                    _ += "var f = " + v(e[1]) + ";\n",
                    _ += "S.penSize = f < 1 ? 1 : f;\n";
                else if ("changePenSizeBy:" === e[0])
                    _ += "var f = S.penSize + " + v(e[1]) + ";\n",
                    _ += "S.penSize = f < 1 ? 1 : f;\n";
                else if ("stampCostume" === e[0])
                    _ += "S.draw(self.penContext);\n";
                else if ("setVar:to:" === e[0])
                    _ += d(e[1]) + " = " + f(e[2]) + ";\n";
                else if ("changeVar:by:" === e[0]) {
                    var o = d(e[1]);
                    _ += o + " = (+" + o + " || 0) + " + v(e[2]) + ";\n"
                } else if ("append:toList:" === e[0])
                    _ += "appendToList(" + u(e[2]) + ", " + f(e[1]) + ");\n";
                else if ("deleteLine:ofList:" === e[0])
                    _ += "deleteLineOfList(" + u(e[2]) + ", " + f(e[1]) + ");\n";
                else if ("insert:at:ofList:" === e[0])
                    _ += "insertInList(" + u(e[3]) + ", " + f(e[2]) + ", " + f(e[1]) + ");\n";
                else if ("setLine:ofList:to:" === e[0])
                    _ += "setLineOfList(" + u(e[2]) + ", " + f(e[1]) + ", " + f(e[3]) + ");\n";
                else if ("showVariable:" === e[0] || "hideVariable:" === e[0]) {
                    var c = "showVariable:" === e[0];
                    if ("string" != typeof e[1])
                        throw new Error("Dynamic variables are not supported");
                    var p = void 0 !== t.vars[e[1]] ? "S" : "self";
                    _ += p + ".showVariable(" + f(e[1]) + ", " + c + ");\n"
                } else if ("broadcast:" === e[0])
                    _ += "var threads = broadcast(" + f(e[1]) + ");\n",
                    _ += "if (threads.indexOf(BASE) !== -1) {return;}\n";
                else if ("call" === e[0]) {
                    _ += "call(S.procedures[" + f(e[1]) + "], " + s() + ", [";
                    for (var m = 2; m < e.length; m++)
                        m > 2 && (_ += ", "),
                        _ += f(e[m]);
                    _ += "]);\n",
                    i()
                } else if ("doBroadcastAndWait" === e[0]) {
                    _ += "save();\n",
                    _ += "R.threads = broadcast(" + f(e[1]) + ");\n",
                    _ += "if (R.threads.indexOf(BASE) !== -1) {return;}\n";
                    b = a();
                    _ += "if (running(R.threads)) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "restore();\n"
                } else if ("doForever" === e[0]) {
                    b = a();
                    h(e[1]),
                    l(b)
                } else if ("doForeverIf" === e[0]) {
                    b = a();
                    _ += "if (" + y(e[1]) + ") {\n",
                    h(e[2]),
                    _ += "}\n",
                    l(b)
                } else if ("doIf" === e[0])
                    _ += "if (" + y(e[1]) + ") {\n",
                    h(e[2]),
                    _ += "}\n";
                else if ("doIfElse" === e[0])
                    _ += "if (" + y(e[1]) + ") {\n",
                    h(e[2]),
                    _ += "} else {\n",
                    h(e[3]),
                    _ += "}\n";
                else if ("doRepeat" === e[0]) {
                    _ += "save();\n",
                    _ += "R.count = " + v(e[1]) + ";\n";
                    b = a();
                    _ += "if (R.count >= 0.5) {\n",
                    _ += "  R.count -= 1;\n",
                    h(e[2]),
                    r(b),
                    _ += "} else {\n",
                    _ += "  restore();\n",
                    _ += "}\n"
                } else if ("doReturn" === e[0])
                    _ += "endCall();\n",
                    _ += "return;\n";
                else if ("doUntil" === e[0]) {
                    b = a();
                    _ += "if (!" + y(e[1]) + ") {\n",
                    h(e[2]),
                    r(b),
                    _ += "}\n"
                } else if ("doWhile" === e[0]) {
                    b = a();
                    _ += "if (" + y(e[1]) + ") {\n",
                    h(e[2]),
                    r(b),
                    _ += "}\n"
                } else if ("doWaitUntil" === e[0]) {
                    b = a();
                    _ += "if (!" + y(e[1]) + ") {\n",
                    r(b),
                    _ += "}\n"
                } else if ("glideSecs:toX:y:elapsed:from:" === e[0]) {
                    _ += "save();\n",
                    _ += "R.start = self.now;\n",
                    _ += "R.duration = " + v(e[1]) + ";\n",
                    _ += "R.baseX = S.scratchX;\n",
                    _ += "R.baseY = S.scratchY;\n",
                    _ += "R.deltaX = " + v(e[2]) + " - S.scratchX;\n",
                    _ += "R.deltaY = " + v(e[3]) + " - S.scratchY;\n";
                    b = a();
                    _ += "var f = (self.now - R.start) / (R.duration * 1000);\n",
                    _ += "if (f > 1) f = 1;\n",
                    _ += "S.moveTo(R.baseX + f * R.deltaX, R.baseY + f * R.deltaY);\n",
                    _ += "if (f < 1) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "restore();\n"
                } else if ("stopAll" === e[0])
                    _ += "self.stopAll();\n",
                    _ += "return;\n";
                else if ("stopScripts" === e[0])
                    _ += "switch (" + f(e[1]) + ") {\n",
                    _ += '  case "all":\n',
                    _ += "    self.stopAll();\n",
                    _ += "    return;\n",
                    _ += '  case "this script":\n',
                    _ += "    endCall();\n",
                    _ += "    return;\n",
                    _ += '  case "other scripts in sprite":\n',
                    _ += '  case "other scripts in stage":\n',
                    _ += "    for (var i = 0; i < self.queue.length; i++) {\n",
                    _ += "      if (i !== THREAD && self.queue[i] && self.queue[i].sprite === S) {\n",
                    _ += "        self.queue[i] = undefined;\n",
                    _ += "      }\n",
                    _ += "    }\n",
                    _ += "    break;\n",
                    _ += "}\n";
                else if ("wait:elapsed:from:" === e[0])
                    w(v(e[1]));
                else if ("warpSpeed" === e[0])
                    _ += "WARP++;\n",
                    h(e[1]),
                    _ += "WARP--;\n";
                else if ("createCloneOf" === e[0])
                    _ += "clone(" + f(e[1]) + ");\n";
                else if ("deleteClone" === e[0])
                    _ += "if (S.isClone) {\n",
                    _ += "  S.remove();\n",
                    _ += "  var i = self.children.indexOf(S);\n",
                    _ += "  if (i !== -1) self.children.splice(i, 1);\n",
                    _ += "  for (var i = 0; i < self.queue.length; i++) {\n",
                    _ += "    if (self.queue[i] && self.queue[i].sprite === S) {\n",
                    _ += "      self.queue[i] = undefined;\n",
                    _ += "    }\n",
                    _ += "  }\n",
                    _ += "  return;\n",
                    _ += "}\n";
                else if ("doAsk" === e[0]) {
                    _ += "R.id = self.nextPromptId++;\n";
                    b = a();
                    _ += "if (self.promptId < R.id) {\n",
                    l(b),
                    _ += "}\n",
                    _ += "S.ask(" + f(e[1]) + ");\n";
                    var b = a();
                    _ += "if (self.promptId === R.id) {\n",
                    l(b),
                    _ += "}\n"
                } else
                    "timerReset" === e[0] ? _ += "self.timerStart = self.now;\n" : n("Undefined command: " + e[0])
            }
              , _ = ""
              , R = t.fns.length
              , M = [0];
            if ("procDef" === o[0][0])
                var A = o[0][2]
                  , T = o[0][1].match(/%[snmdcb]/g) || []
                  , L = [];
            for (D = 1; D < o.length; D++)
                x(o[D]);
            if ("procDef" === o[0][0]) {
                for (var I = "", D = T.length; D--; )
                    if (L[D]) {
                        var B = T[D];
                        "%d" === B || "%n" === B || "%c" === B ? I += "C.numargs[" + D + "] = +C.args[" + D + "] || 0;\n" : "%b" === B && (I += "C.boolargs[" + D + "] = bool(C.args[" + D + "]);\n")
                    }
                _ = I + _;
                for (var D = 1, O = M.length; D < O; ++D)
                    M[D] += I.length;
                _ += "endCall();\n",
                _ += "return;\n"
            }
            for (D = 0; D < M.length; D++)
                t.fns.push(function(t) {
                    for (var e = "(function() {\n", o = 0, n = 0, s = !1, a = 0, i = t.length; a < i; ) {
                        var r = t.indexOf("{", a)
                          , l = t.indexOf("}", a)
                          , h = t.indexOf("return;", a);
                        if (-1 === h && (h = i),
                        -1 === r && -1 === l) {
                            s || (e += t.slice(a, h));
                            break
                        }
                        if (-1 === r && (r = i),
                        -1 === l && (l = i),
                        s)
                            r < l ? (n++,
                            a = r + 1) : (--n || (s = !1),
                            a = l + 1);
                        else {
                            if (0 === o && h < r && h < l) {
                                e += t.slice(a, h);
                                break
                            }
                            r < l ? (e += t.slice(a, r + 1),
                            o++,
                            a = r + 1) : (e += t.slice(a, l),
                            a = l + 1,
                            "} else {" === t.substr(l, 8) ? o > 0 ? (e += "} else {",
                            a = l + 8) : (s = !0,
                            n = 0) : o > 0 && (e += "}",
                            o--))
                        }
                    }
                    return e += "})",
                    P.runtime.scopedEval(e)
                }(_.slice(M[D])));
            var N = t.fns[R];
            if ("whenClicked" === o[0][0])
                t.listeners.whenClicked.push(N);
            else if ("whenGreenFlag" === o[0][0])
                t.listeners.whenGreenFlag.push(N);
            else if ("whenCloned" === o[0][0])
                t.listeners.whenCloned.push(N);
            else if ("whenIReceive" === o[0][0]) {
                z = o[0][1].toLowerCase();
                (t.listeners.whenIReceive[z] || (t.listeners.whenIReceive[z] = [])).push(N)
            } else if ("whenKeyPressed" === o[0][0])
                if ("any" === o[0][1])
                    for (D = 128; D--; )
                        t.listeners.whenKeyPressed[D].push(N);
                else
                    t.listeners.whenKeyPressed[P.getKeyCode(o[0][1])].push(N);
            else if ("whenSceneStarts" === o[0][0]) {
                var z = o[0][1].toLowerCase();
                (t.listeners.whenSceneStarts[z] || (t.listeners.whenSceneStarts[z] = [])).push(N)
            } else
                "procDef" === o[0][0] ? t.procedures[o[0][1]] = {
                    inputs: A,
                    warp: o[0][4],
                    fn: N
                } : n("Undefined event: " + o[0][0])
        }
    };
    return function(e) {
        t = Object.create(null),
        o(e);
        for (var n = 0; n < e.children.length; n++)
            o(e.children[n]);
        for (var s in t)
            console.warn(s + (t[s] > 1 ? " (repeated " + t[s] + " times)" : ""))
    }
}(),
P.runtime = function() {
    "use strict";
    var self, S, R, STACK, C, WARP, CALLS, BASE, THREAD, IMMEDIATE, VISUAL, bool = function(t) {
        return 0 != +t && "" !== t && "false" !== t && !1 !== t
    }, DIGIT = /\d/, compare = function(t, e) {
        if (("number" == typeof t || DIGIT.test(t)) && ("number" == typeof e || DIGIT.test(e))) {
            var o = +t
              , n = +e;
            if (o === o && n === n)
                return o < n ? -1 : o === n ? 0 : 1
        }
        var s = ("" + t).toLowerCase()
          , a = ("" + e).toLowerCase();
        return s < a ? -1 : s === a ? 0 : 1
    }, numLess = function(t, e) {
        if ("number" == typeof e || DIGIT.test(e)) {
            var o = +e;
            if (o === o)
                return t < o
        }
        return "" + t < ("" + e).toLowerCase()
    }, numGreater = function(t, e) {
        if ("number" == typeof e || DIGIT.test(e)) {
            var o = +e;
            if (o === o)
                return t > o
        }
        return "" + t > ("" + e).toLowerCase()
    }, equal = function(t, e) {
        if (("number" == typeof t || DIGIT.test(t)) && ("number" == typeof e || DIGIT.test(e))) {
            var o = +t
              , n = +e;
            if (o === o && n === n)
                return o === n
        }
        return ("" + t).toLowerCase() === ("" + e).toLowerCase()
    }, numEqual = function(t, e) {
        if ("number" == typeof e || DIGIT.test(e)) {
            var o = +e;
            return o === o && t === o
        }
        return !1
    }, mod = function(t, e) {
        var o = t % e;
        return o / e < 0 && (o += e),
        o
    }, random = function(t, e) {
        if (t = +t || 0,
        e = +e || 0,
        t > e) {
            var o = e;
            e = t,
            t = o
        }
        return t % 1 == 0 && e % 1 == 0 ? Math.floor(Math.random() * (e - t + 1)) + t : Math.random() * (e - t) + t
    }, rgb2hsl = function(t) {
        var e = (t >> 16 & 255) / 255
          , o = (t >> 8 & 255) / 255
          , n = (255 & t) / 255
          , s = Math.min(e, o, n)
          , a = Math.max(e, o, n);
        if (s === a)
            return [0, 0, 100 * e];
        var i, r = a - s, l = (s + a) / 2, h = r / (1 - Math.abs(2 * l - 1));
        switch (a) {
        case e:
            i = ((o - n) / r + 6) % 6;
            break;
        case o:
            i = (n - e) / r + 2;
            break;
        case n:
            i = (e - o) / r + 4
        }
        return i *= 60,
        [i, 100 * h, 100 * l]
    }, clone = function(t) {
        var e = "_myself_" === t ? S : self.getObject(t)
          , o = e.clone();
        self.children.splice(self.children.indexOf(e), 0, o),
        self.triggerFor(o, "whenCloned")
    }, epoch = Date.UTC(2e3, 0, 1), timeAndDate = P.Watcher.prototype.timeAndDate = function(t) {
        switch (t) {
        case "year":
            return (new Date).getFullYear();
        case "month":
            return (new Date).getMonth() + 1;
        case "date":
            return (new Date).getDate();
        case "day of week":
            return (new Date).getDay() + 1;
        case "hour":
            return (new Date).getHours();
        case "minute":
            return (new Date).getMinutes();
        case "second":
            return (new Date).getSeconds()
        }
        return 0
    }
    , getVars = function(t) {
        return void 0 !== self.vars[t] ? self.vars : S.vars
    }, getLists = function(t) {
        return void 0 !== self.lists[t] ? self.lists : (void 0 === S.lists[t] && (S.lists[t] = []),
        S.lists)
    }, listIndex = function(t, e, o) {
        var n = 0 | e;
        return n === e ? n > 0 && n <= o ? n - 1 : -1 : "random" === e || "any" === e ? Math.random() * o | 0 : "last" === e ? o - 1 : n > 0 && n <= o ? n - 1 : -1
    }, contentsOfList = function(t) {
        for (var e = !0, o = t.length; o--; )
            if (1 !== t[o].length) {
                e = !1;
                break
            }
        return t.join(e ? "" : " ")
    }, getLineOfList = function(t, e) {
        var o = listIndex(t, e, t.length);
        return -1 !== o ? t[o] : ""
    }, listContains = function(t, e) {
        for (var o = t.length; o--; )
            if (equal(t[o], e))
                return !0;
        return !1
    }, appendToList = function(t, e) {
        t.push(e)
    }, deleteLineOfList = function(t, e) {
        if ("all" === e)
            t.length = 0;
        else {
            var o = listIndex(t, e, t.length);
            o === t.length - 1 ? t.pop() : -1 !== o && t.splice(o, 1)
        }
    }, insertInList = function(t, e, o) {
        var n = listIndex(t, e, t.length + 1);
        n === t.length ? t.push(o) : -1 !== n && t.splice(n, 0, o)
    }, setLineOfList = function(t, e, o) {
        var n = listIndex(t, e, t.length);
        -1 !== n && (t[n] = o)
    }, mathFunc = function(t, e) {
        switch (t) {
        case "abs":
            return Math.abs(e);
        case "floor":
            return Math.floor(e);
        case "sqrt":
            return Math.sqrt(e);
        case "ceiling":
            return Math.ceil(e);
        case "cos":
            return Math.cos(e * Math.PI / 180);
        case "sin":
            return Math.sin(e * Math.PI / 180);
        case "tan":
            return Math.tan(e * Math.PI / 180);
        case "asin":
            return 180 * Math.asin(e) / Math.PI;
        case "acos":
            return 180 * Math.acos(e) / Math.PI;
        case "atan":
            return 180 * Math.atan(e) / Math.PI;
        case "ln":
            return Math.log(e);
        case "log":
            return Math.log(e) / Math.LN10;
        case "e ^":
            return Math.exp(e);
        case "10 ^":
            return Math.exp(e * Math.LN10)
        }
        return 0
    }, attribute = function(t, e) {
        var o = self.getObject(e);
        if (!o)
            return 0;
        if (o.isSprite)
            switch (t) {
            case "x position":
                return o.scratchX;
            case "y position":
                return o.scratchY;
            case "direction":
                return o.direction;
            case "costume #":
                return o.currentCostumeIndex + 1;
            case "costume name":
                return o.costumes[o.currentCostumeIndex].costumeName;
            case "size":
                return 100 * o.scale;
            case "volume":
                return 0
            }
        else
            switch (t) {
            case "background #":
            case "backdrop #":
                return o.currentCostumeIndex + 1;
            case "backdrop name":
                return o.costumes[o.currentCostumeIndex].costumeName;
            case "volume":
                return 0
            }
        var n = o.vars[t];
        return void 0 !== n ? n : 0
    }, VOLUME = .3, audioContext = P.audioContext;
    if (audioContext) {
        var wavBuffers = P.IO.wavBuffers
          , volumeNode = audioContext.createGain();
        volumeNode.gain.value = VOLUME,
        volumeNode.connect(audioContext.destination);
        var playNote = function(t, e) {
            for (var o = INSTRUMENTS[S.instrument], n = 0, s = o.length; n < s; n++) {
                var a = o[n];
                if (a.top >= t || 128 === a.top)
                    break
            }
            playSpan(a, Math.max(0, Math.min(127, t)), e)
        }
          , playSpan = function(t, e, o) {
            S.node || (S.node = audioContext.createGain(),
            S.node.gain.value = S.volume,
            S.node.connect(volumeNode));
            var n = audioContext.createBufferSource()
              , s = audioContext.createGain()
              , a = wavBuffers[t.name];
            if (a) {
                n.buffer = a,
                (n.loop = t.loop) && (n.loopStart = t.loopStart,
                n.loopEnd = t.loopEnd),
                n.connect(s),
                s.connect(S.node);
                var i = audioContext.currentTime;
                n.playbackRate.value = Math.pow(2, (e - 69) / 12) / t.baseRatio;
                var r = s.gain;
                r.value = 0,
                r.setValueAtTime(0, i),
                t.attackEnd < o ? (r.linearRampToValueAtTime(1, i + t.attackEnd),
                t.decayTime > 0 && t.holdEnd < o ? (r.linearRampToValueAtTime(1, i + t.holdEnd),
                t.decayEnd < o ? r.linearRampToValueAtTime(0, i + t.decayEnd) : r.linearRampToValueAtTime(1 - (o - holdEnd) / t.decayTime, i + o)) : r.linearRampToValueAtTime(1, i + o)) : r.linearRampToValueAtTime(1, i + o),
                r.linearRampToValueAtTime(0, i + o + .02267573696),
                n.start(i),
                n.stop(i + o + .02267573696)
            }
        }
          , playSound = function(t) {
            t.buffer && (t.node || (t.node = audioContext.createGain(),
            t.node.gain.value = S.volume,
            t.node.connect(volumeNode)),
            t.target = S,
            t.node.gain.setValueAtTime(S.volume, audioContext.currentTime),
            t.source && t.source.disconnect(),
            t.source = audioContext.createBufferSource(),
            t.source.buffer = t.buffer,
            t.source.connect(t.node),
            t.source.start(audioContext.currentTime))
        }
    }
    var save = function() {
        STACK.push(R),
        R = {}
    }
      , restore = function() {
        R = STACK.pop()
    }
      , call = function(t, e, o) {
        if (t)
            if (STACK.push(R),
            CALLS.push(C),
            C = {
                base: t.fn,
                fn: S.fns[e],
                args: o,
                numargs: [],
                boolargs: [],
                stack: STACK = [],
                warp: t.warp
            },
            R = {},
            C.warp || WARP)
                WARP++,
                IMMEDIATE = t.fn;
            else {
                for (var n = CALLS.length, s = 5; n-- && s--; )
                    if (CALLS[n].base === t.fn) {
                        var a = !0;
                        break
                    }
                a ? self.queue[THREAD] = {
                    sprite: S,
                    base: BASE,
                    fn: t.fn,
                    calls: CALLS
                } : IMMEDIATE = t.fn
            }
        else
            IMMEDIATE = S.fns[e]
    }
      , endCall = function() {
        CALLS.length && (WARP && WARP--,
        IMMEDIATE = C.fn,
        C = CALLS.pop(),
        STACK = C.stack,
        R = STACK.pop())
    }
      , sceneChange = function() {
        return self.trigger("whenSceneStarts", self.costumes[self.currentCostumeIndex].costumeName)
    }
      , broadcast = function(t) {
        return self.trigger("whenIReceive", t)
    }
      , running = function(t) {
        for (var e = 0; e < self.queue.length; e++)
            if (self.queue[e] && -1 !== t.indexOf(self.queue[e].base))
                return !0;
        return !1
    }
      , queue = function(t) {
        WARP ? IMMEDIATE = S.fns[t] : forceQueue(t)
    }
      , forceQueue = function(t) {
        self.queue[THREAD] = {
            sprite: S,
            base: BASE,
            fn: S.fns[t],
            calls: CALLS
        }
    };
    P.Stage.prototype.framerate = 30,
    P.Stage.prototype.initRuntime = function() {
        this.queue = [],
        this.onError = this.onError.bind(this)
    }
    ,
    P.Stage.prototype.startThread = function(t, e) {
        for (var o = {
            sprite: t,
            base: e,
            fn: e,
            calls: [{
                args: [],
                stack: [{}]
            }]
        }, n = 0; n < this.queue.length; n++) {
            var s = this.queue[n];
            if (s && s.sprite === t && s.base === e)
                return void (this.queue[n] = o)
        }
        this.queue.push(o)
    }
    ,
    P.Stage.prototype.triggerFor = function(t, e, o) {
        var n;
        if ("whenClicked" === e ? n = t.listeners.whenClicked : "whenCloned" === e ? n = t.listeners.whenCloned : "whenGreenFlag" === e ? n = t.listeners.whenGreenFlag : "whenIReceive" === e ? n = t.listeners.whenIReceive[("" + o).toLowerCase()] : "whenKeyPressed" === e ? n = t.listeners.whenKeyPressed[o] : "whenSceneStarts" === e && (n = t.listeners.whenSceneStarts[("" + o).toLowerCase()]),
        n)
            for (var s = 0; s < n.length; s++)
                this.startThread(t, n[s]);
        return n || []
    }
    ,
    P.Stage.prototype.trigger = function(t, e) {
        for (var o = [], n = this.children.length; n--; )
            o = o.concat(this.triggerFor(this.children[n], t, e));
        return o.concat(this.triggerFor(this, t, e))
    }
    ,
    P.Stage.prototype.triggerGreenFlag = function() {
        this.timerStart = this.rightNow(),
        this.trigger("whenGreenFlag")
    }
    ,
    P.Stage.prototype.start = function() {
        this.isRunning = !0,
        this.interval || (addEventListener("error", this.onError),
        this.baseTime = Date.now(),
        this.interval = setInterval(this.step.bind(this), 1e3 / this.framerate),
        audioContext && audioContext.resume())
    }
    ,
    P.Stage.prototype.pause = function() {
        this.interval && (this.baseNow = this.rightNow(),
        clearInterval(this.interval),
        delete this.interval,
        removeEventListener("error", this.onError),
        audioContext && audioContext.suspend()),
        this.isRunning = !1
    }
    ,
    P.Stage.prototype.stopAll = function() {
        this.hidePrompt = !1,
        this.prompter.style.display = "none",
        this.promptId = this.nextPromptId = 0,
        this.queue.length = 0,
        this.resetFilters(),
        this.stopSounds();
        for (var t = 0; t < this.children.length; t++) {
            var e = this.children[t];
            e.isClone ? (e.remove(),
            this.children.splice(t, 1),
            t -= 1) : (e.resetFilters(),
            e.saying && e.say(""),
            e.stopSounds())
        }
    }
    ,
    P.Stage.prototype.rightNow = function() {
        return this.baseNow + Date.now() - this.baseTime
    }
    ,
    P.Stage.prototype.step = function() {
        self = this,
        VISUAL = !1;
        var t = Date.now();
        do {
            var e = this.queue;
            for (this.now = this.rightNow(),
            THREAD = 0; THREAD < e.length; THREAD++)
                if (e[THREAD]) {
                    for (S = e[THREAD].sprite,
                    IMMEDIATE = e[THREAD].fn,
                    BASE = e[THREAD].base,
                    CALLS = e[THREAD].calls,
                    C = CALLS.pop(),
                    STACK = C.stack,
                    R = STACK.pop(),
                    e[THREAD] = void 0,
                    WARP = 0; IMMEDIATE; ) {
                        var o = IMMEDIATE;
                        IMMEDIATE = null,
                        o()
                    }
                    STACK.push(R),
                    CALLS.push(C)
                }
            for (var n = e.length; n--; )
                e[n] || e.splice(n, 1)
        } while ((self.isTurbo || !VISUAL) && Date.now() - t < 1e3 / this.framerate && e.length);this.draw(),
        S = null
    }
    ,
    P.Stage.prototype.onError = function(t) {
        this.handleError(t.error),
        clearInterval(this.interval)
    }
    ,
    P.Stage.prototype.handleError = function(t) {
        console.log(t.stack)
    }
    ;
    var INSTRUMENTS = [[{
        top: 38,
        name: "AcousticPiano_As3",
        baseRatio: .5316313272700484,
        loop: !0,
        loopStart: .465578231292517,
        loopEnd: .7733786848072562,
        attackEnd: 0,
        holdEnd: .1,
        decayEnd: 22.1
    }, {
        top: 44,
        name: "AcousticPiano_C4",
        baseRatio: .5905141892259927,
        loop: !0,
        loopStart: .6334693877551021,
        loopEnd: .8605442176870748,
        attackEnd: 0,
        holdEnd: .1,
        decayEnd: 20.1
    }, {
        top: 51,
        name: "AcousticPiano_G4",
        baseRatio: .8843582887700535,
        loop: !0,
        loopStart: .5532879818594104,
        loopEnd: .5609977324263039,
        attackEnd: 0,
        holdEnd: .08,
        decayEnd: 18.08
    }, {
        top: 62,
        name: "AcousticPiano_C6",
        baseRatio: 2.3557692307692304,
        loop: !0,
        loopStart: .5914739229024943,
        loopEnd: .6020861678004535,
        attackEnd: 0,
        holdEnd: .08,
        decayEnd: 16.08
    }, {
        top: 70,
        name: "AcousticPiano_F5",
        baseRatio: 1.5776515151515151,
        loop: !0,
        loopStart: .5634920634920635,
        loopEnd: .5879818594104308,
        attackEnd: 0,
        holdEnd: .04,
        decayEnd: 14.04
    }, {
        top: 77,
        name: "AcousticPiano_Ds6",
        baseRatio: 2.800762112139358,
        loop: !0,
        loopStart: .560907029478458,
        loopEnd: .5836281179138322,
        attackEnd: 0,
        holdEnd: .02,
        decayEnd: 10.02
    }, {
        top: 85,
        name: "AcousticPiano_Ds6",
        baseRatio: 2.800762112139358,
        loop: !0,
        loopStart: .560907029478458,
        loopEnd: .5836281179138322,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 8
    }, {
        top: 90,
        name: "AcousticPiano_Ds6",
        baseRatio: 2.800762112139358,
        loop: !0,
        loopStart: .560907029478458,
        loopEnd: .5836281179138322,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 6
    }, {
        top: 96,
        name: "AcousticPiano_D7",
        baseRatio: 5.275119617224881,
        loop: !0,
        loopStart: .3380498866213152,
        loopEnd: .34494331065759637,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 3
    }, {
        top: 128,
        name: "AcousticPiano_D7",
        baseRatio: 5.275119617224881,
        loop: !0,
        loopStart: .3380498866213152,
        loopEnd: .34494331065759637,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2
    }], [{
        top: 48,
        name: "ElectricPiano_C2",
        baseRatio: .14870515241435123,
        loop: !0,
        loopStart: .6956009070294784,
        loopEnd: .7873015873015873,
        attackEnd: 0,
        holdEnd: .08,
        decayEnd: 10.08
    }, {
        top: 74,
        name: "ElectricPiano_C4",
        baseRatio: .5945685670261941,
        loop: !0,
        loopStart: .5181859410430839,
        loopEnd: .5449433106575964,
        attackEnd: 0,
        holdEnd: .04,
        decayEnd: 8.04
    }, {
        top: 128,
        name: "ElectricPiano_C4",
        baseRatio: .5945685670261941,
        loop: !0,
        loopStart: .5181859410430839,
        loopEnd: .5449433106575964,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 6
    }], [{
        top: 128,
        name: "Organ_G2",
        baseRatio: .22283731584620914,
        loop: !0,
        loopStart: .05922902494331066,
        loopEnd: .1510204081632653,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 40,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 15
    }, {
        top: 56,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 13.5
    }, {
        top: 60,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 12
    }, {
        top: 67,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 8.5
    }, {
        top: 72,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 7
    }, {
        top: 83,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 5.5
    }, {
        top: 128,
        name: "AcousticGuitar_F3",
        baseRatio: .3977272727272727,
        loop: !0,
        loopStart: 1.6628117913832199,
        loopEnd: 1.6685260770975057,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 4.5
    }], [{
        top: 40,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 15
    }, {
        top: 56,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 13.5
    }, {
        top: 60,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 12
    }, {
        top: 67,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 8.5
    }, {
        top: 72,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 7
    }, {
        top: 83,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 5.5
    }, {
        top: 128,
        name: "ElectricGuitar_F3",
        baseRatio: .39615522817103843,
        loop: !0,
        loopStart: 1.5733333333333333,
        loopEnd: 1.5848072562358277,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 4.5
    }], [{
        top: 34,
        name: "ElectricBass_G1",
        baseRatio: .11111671034065712,
        loop: !0,
        loopStart: 1.9007709750566892,
        loopEnd: 1.9212244897959183,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 17
    }, {
        top: 48,
        name: "ElectricBass_G1",
        baseRatio: .11111671034065712,
        loop: !0,
        loopStart: 1.9007709750566892,
        loopEnd: 1.9212244897959183,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 14
    }, {
        top: 64,
        name: "ElectricBass_G1",
        baseRatio: .11111671034065712,
        loop: !0,
        loopStart: 1.9007709750566892,
        loopEnd: 1.9212244897959183,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 12
    }, {
        top: 128,
        name: "ElectricBass_G1",
        baseRatio: .11111671034065712,
        loop: !0,
        loopStart: 1.9007709750566892,
        loopEnd: 1.9212244897959183,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 10
    }], [{
        top: 38,
        name: "Pizz_G2",
        baseRatio: .21979665071770335,
        loop: !0,
        loopStart: .3879365079365079,
        loopEnd: .3982766439909297,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 5
    }, {
        top: 45,
        name: "Pizz_G2",
        baseRatio: .21979665071770335,
        loop: !0,
        loopStart: .3879365079365079,
        loopEnd: .3982766439909297,
        attackEnd: 0,
        holdEnd: .012,
        decayEnd: 4.012
    }, {
        top: 56,
        name: "Pizz_A3",
        baseRatio: .503654636820466,
        loop: !0,
        loopStart: .5197278911564626,
        loopEnd: .5287528344671202,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 4
    }, {
        top: 64,
        name: "Pizz_A3",
        baseRatio: .503654636820466,
        loop: !0,
        loopStart: .5197278911564626,
        loopEnd: .5287528344671202,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 3.2
    }, {
        top: 72,
        name: "Pizz_E4",
        baseRatio: .7479647218453188,
        loop: !0,
        loopStart: .7947845804988662,
        loopEnd: .7978231292517007,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2.8
    }, {
        top: 80,
        name: "Pizz_E4",
        baseRatio: .7479647218453188,
        loop: !0,
        loopStart: .7947845804988662,
        loopEnd: .7978231292517007,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2.2
    }, {
        top: 128,
        name: "Pizz_E4",
        baseRatio: .7479647218453188,
        loop: !0,
        loopStart: .7947845804988662,
        loopEnd: .7978231292517007,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 1.5
    }], [{
        top: 41,
        name: "Cello_C2",
        baseRatio: .14870515241435123,
        loop: !0,
        loopStart: .3876643990929705,
        loopEnd: .40294784580498866,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 52,
        name: "Cello_As2",
        baseRatio: .263755980861244,
        loop: !0,
        loopStart: .3385487528344671,
        loopEnd: .35578231292517004,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 62,
        name: "Violin_D4",
        baseRatio: .6664047388781432,
        loop: !0,
        loopStart: .48108843537414964,
        loopEnd: .5151927437641723,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 75,
        name: "Violin_A4",
        baseRatio: .987460815047022,
        loop: !0,
        loopStart: .14108843537414967,
        loopEnd: .15029478458049886,
        attackEnd: .07,
        holdEnd: .07,
        decayEnd: .07
    }, {
        top: 128,
        name: "Violin_E5",
        baseRatio: 1.4885238523852387,
        loop: !0,
        loopStart: .10807256235827664,
        loopEnd: .1126530612244898,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 30,
        name: "BassTrombone_A2_3",
        baseRatio: .24981872564125807,
        loop: !0,
        loopStart: .061541950113378686,
        loopEnd: .10702947845804989,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 40,
        name: "BassTrombone_A2_2",
        baseRatio: .24981872564125807,
        loop: !0,
        loopStart: .08585034013605441,
        loopEnd: .13133786848072562,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 55,
        name: "Trombone_B3",
        baseRatio: .5608240680183126,
        loop: !0,
        loopStart: .12,
        loopEnd: .17673469387755103,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 88,
        name: "Trombone_B3",
        baseRatio: .5608240680183126,
        loop: !0,
        loopStart: .12,
        loopEnd: .17673469387755103,
        attackEnd: .05,
        holdEnd: .05,
        decayEnd: .05
    }, {
        top: 128,
        name: "Trumpet_E5",
        baseRatio: 1.4959294436906376,
        loop: !0,
        loopStart: .1307936507936508,
        loopEnd: .14294784580498865,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 128,
        name: "Clarinet_C4",
        baseRatio: .5940193965517241,
        loop: !0,
        loopStart: .6594104308390023,
        loopEnd: .7014965986394558,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 40,
        name: "TenorSax_C3",
        baseRatio: .2971698113207547,
        loop: !0,
        loopStart: .4053968253968254,
        loopEnd: .4895238095238095,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 50,
        name: "TenorSax_C3",
        baseRatio: .2971698113207547,
        loop: !0,
        loopStart: .4053968253968254,
        loopEnd: .4895238095238095,
        attackEnd: .02,
        holdEnd: .02,
        decayEnd: .02
    }, {
        top: 59,
        name: "TenorSax_C3",
        baseRatio: .2971698113207547,
        loop: !0,
        loopStart: .4053968253968254,
        loopEnd: .4895238095238095,
        attackEnd: .04,
        holdEnd: .04,
        decayEnd: .04
    }, {
        top: 67,
        name: "AltoSax_A3",
        baseRatio: .49814747876378096,
        loop: !0,
        loopStart: .3875736961451247,
        loopEnd: .4103854875283447,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 75,
        name: "AltoSax_A3",
        baseRatio: .49814747876378096,
        loop: !0,
        loopStart: .3875736961451247,
        loopEnd: .4103854875283447,
        attackEnd: .02,
        holdEnd: .02,
        decayEnd: .02
    }, {
        top: 80,
        name: "AltoSax_A3",
        baseRatio: .49814747876378096,
        loop: !0,
        loopStart: .3875736961451247,
        loopEnd: .4103854875283447,
        attackEnd: .02,
        holdEnd: .02,
        decayEnd: .02
    }, {
        top: 128,
        name: "AltoSax_C6",
        baseRatio: 2.3782742681047764,
        loop: !0,
        loopStart: .05705215419501134,
        loopEnd: .0838095238095238,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 61,
        name: "Flute_B5_2",
        baseRatio: 2.255113636363636,
        loop: !0,
        loopStart: .08430839002267573,
        loopEnd: .10244897959183673,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 128,
        name: "Flute_B5_1",
        baseRatio: 2.255113636363636,
        loop: !0,
        loopStart: .10965986394557824,
        loopEnd: .12780045351473923,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 128,
        name: "WoodenFlute_C5",
        baseRatio: 1.1892952324548416,
        loop: !0,
        loopStart: .5181859410430839,
        loopEnd: .7131065759637188,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 57,
        name: "Bassoon_C3",
        baseRatio: .29700969827586204,
        loop: !0,
        loopStart: .11011337868480725,
        loopEnd: .19428571428571428,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 67,
        name: "Bassoon_C3",
        baseRatio: .29700969827586204,
        loop: !0,
        loopStart: .11011337868480725,
        loopEnd: .19428571428571428,
        attackEnd: .04,
        holdEnd: .04,
        decayEnd: .04
    }, {
        top: 76,
        name: "Bassoon_C3",
        baseRatio: .29700969827586204,
        loop: !0,
        loopStart: .11011337868480725,
        loopEnd: .19428571428571428,
        attackEnd: .08,
        holdEnd: .08,
        decayEnd: .08
    }, {
        top: 84,
        name: "EnglishHorn_F3",
        baseRatio: .39601293103448276,
        loop: !0,
        loopStart: .341859410430839,
        loopEnd: .4049886621315193,
        attackEnd: .04,
        holdEnd: .04,
        decayEnd: .04
    }, {
        top: 128,
        name: "EnglishHorn_D4",
        baseRatio: .6699684005833739,
        loop: !0,
        loopStart: .22027210884353743,
        loopEnd: .23723356009070296,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 39,
        name: "Choir_F3",
        baseRatio: .3968814788643197,
        loop: !0,
        loopStart: .6352380952380953,
        loopEnd: 1.8721541950113378,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 50,
        name: "Choir_F3",
        baseRatio: .3968814788643197,
        loop: !0,
        loopStart: .6352380952380953,
        loopEnd: 1.8721541950113378,
        attackEnd: .04,
        holdEnd: .04,
        decayEnd: .04
    }, {
        top: 61,
        name: "Choir_F3",
        baseRatio: .3968814788643197,
        loop: !0,
        loopStart: .6352380952380953,
        loopEnd: 1.8721541950113378,
        attackEnd: .06,
        holdEnd: .06,
        decayEnd: .06
    }, {
        top: 72,
        name: "Choir_F4",
        baseRatio: .7928898424161845,
        loop: !0,
        loopStart: .7415419501133786,
        loopEnd: 2.1059410430839,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 128,
        name: "Choir_F5",
        baseRatio: 1.5879576065654504,
        loop: !0,
        loopStart: .836281179138322,
        loopEnd: 2.0585487528344673,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 38,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: .1,
        decayEnd: 8.1
    }, {
        top: 48,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: .1,
        decayEnd: 7.6
    }, {
        top: 59,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: .06,
        decayEnd: 7.06
    }, {
        top: 70,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: .04,
        decayEnd: 6.04
    }, {
        top: 78,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: .02,
        decayEnd: 5.02
    }, {
        top: 86,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 4
    }, {
        top: 128,
        name: "Vibraphone_C3",
        baseRatio: .29829545454545453,
        loop: !0,
        loopStart: .2812698412698413,
        loopEnd: .28888888888888886,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 3
    }], [{
        top: 128,
        name: "MusicBox_C4",
        baseRatio: .5937634640241276,
        loop: !0,
        loopStart: .6475283446712018,
        loopEnd: .6666666666666666,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2
    }], [{
        top: 128,
        name: "SteelDrum_D5",
        baseRatio: 1.3660402567543959,
        loop: !1,
        loopStart: -45351473922902495e-21,
        loopEnd: -45351473922902495e-21,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2
    }], [{
        top: 128,
        name: "Marimba_C4",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: -45351473922902495e-21,
        loopEnd: -45351473922902495e-21,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 80,
        name: "SynthLead_C4",
        baseRatio: .5942328422565577,
        loop: !0,
        loopStart: .006122448979591836,
        loopEnd: .06349206349206349,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        top: 128,
        name: "SynthLead_C6",
        baseRatio: 2.3760775862068964,
        loop: !0,
        loopStart: .005623582766439909,
        loopEnd: .01614512471655329,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }], [{
        top: 38,
        name: "SynthPad_A3",
        baseRatio: .4999105065330231,
        loop: !0,
        loopStart: .1910204081632653,
        loopEnd: 3.9917006802721087,
        attackEnd: .05,
        holdEnd: .05,
        decayEnd: .05
    }, {
        top: 50,
        name: "SynthPad_A3",
        baseRatio: .4999105065330231,
        loop: !0,
        loopStart: .1910204081632653,
        loopEnd: 3.9917006802721087,
        attackEnd: .08,
        holdEnd: .08,
        decayEnd: .08
    }, {
        top: 62,
        name: "SynthPad_A3",
        baseRatio: .4999105065330231,
        loop: !0,
        loopStart: .1910204081632653,
        loopEnd: 3.9917006802721087,
        attackEnd: .11,
        holdEnd: .11,
        decayEnd: .11
    }, {
        top: 74,
        name: "SynthPad_A3",
        baseRatio: .4999105065330231,
        loop: !0,
        loopStart: .1910204081632653,
        loopEnd: 3.9917006802721087,
        attackEnd: .15,
        holdEnd: .15,
        decayEnd: .15
    }, {
        top: 86,
        name: "SynthPad_A3",
        baseRatio: .4999105065330231,
        loop: !0,
        loopStart: .1910204081632653,
        loopEnd: 3.9917006802721087,
        attackEnd: .2,
        holdEnd: .2,
        decayEnd: .2
    }, {
        top: 128,
        name: "SynthPad_C6",
        baseRatio: 2.3820424708835755,
        loop: !0,
        loopStart: .11678004535147392,
        loopEnd: .41732426303854875,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }]]
      , DRUMS = [{
        name: "SnareDrum",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Tom",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "SideStick",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Crash",
        baseRatio: .8908987181403393,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "HiHatOpen",
        baseRatio: .9438743126816935,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "HiHatClosed",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Tambourine",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Clap",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Claves",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "WoodBlock",
        baseRatio: .7491535384383408,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Cowbell",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Triangle",
        baseRatio: .8514452780229479,
        loop: !0,
        loopStart: .7638548752834468,
        loopEnd: .7825396825396825,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2
    }, {
        name: "Bongo",
        baseRatio: .5297315471796477,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Conga",
        baseRatio: .7954545454545454,
        loop: !0,
        loopStart: .1926077097505669,
        loopEnd: .20403628117913833,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 2
    }, {
        name: "Cabasa",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "GuiroLong",
        baseRatio: .5946035575013605,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Vibraslap",
        baseRatio: .8408964152537145,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }, {
        name: "Cuica",
        baseRatio: .7937005259840998,
        loop: !1,
        loopStart: null,
        loopEnd: null,
        attackEnd: 0,
        holdEnd: 0,
        decayEnd: 0
    }];
    return {
        scopedEval: function(source) {
            return eval(source)
        }
    }
}();
