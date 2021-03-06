!function(e) {
    "use strict";
    var t = function() {
        this.cssImportStatements = [],
        this.cssKeyframeStatements = [],
        this.cssRegex = new RegExp("([\\s\\S]*?){([\\s\\S]*?)}","gi"),
        this.cssMediaQueryRegex = "((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})",
        this.cssKeyframeRegex = "((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})",
        this.combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",
        this.cssCommentsRegex = "(\\/\\*[\\s\\S]*?\\*\\/)",
        this.cssImportStatementRegex = new RegExp("@import .*?;","gi")
    };
    t.prototype.stripComments = function(e) {
        var t = new RegExp(this.cssCommentsRegex,"gi");
        return e.replace(t, "")
    }
    ,
    t.prototype.parseCSS = function(e) {
        if (void 0 === e)
            return [];
        for (var t = []; ; ) {
            var s = this.cssImportStatementRegex.exec(e);
            if (null === s)
                break;
            this.cssImportStatements.push(s[0]),
            t.push({
                selector: "@imports",
                type: "imports",
                styles: s[0]
            })
        }
        e = e.replace(this.cssImportStatementRegex, "");
        for (var r, o = new RegExp(this.cssKeyframeRegex,"gi"); null !== (r = o.exec(e)); )
            t.push({
                selector: "@keyframes",
                type: "keyframes",
                styles: r[0]
            });
        e = e.replace(o, "");
        for (var n = new RegExp(this.combinedCSSRegex,"gi"); null !== (r = n.exec(e)); ) {
            var i = "";
            i = void 0 === r[2] ? r[5].split("\r\n").join("\n").trim() : r[2].split("\r\n").join("\n").trim();
            var l = new RegExp(this.cssCommentsRegex,"gi")
              , a = l.exec(i);
            if (null !== a && (i = i.replace(l, "").trim()),
            -1 !== (i = i.replace(/\n+/, "\n")).indexOf("@media")) {
                var p = {
                    selector: i,
                    type: "media",
                    subStyles: this.parseCSS(r[3] + "\n}")
                };
                null !== a && (p.comments = a[0]),
                t.push(p)
            } else {
                var c = {
                    selector: i,
                    rules: this.parseRules(r[6])
                };
                "@font-face" === i && (c.type = "font-face"),
                null !== a && (c.comments = a[0]),
                t.push(c)
            }
        }
        return t
    }
    ,
    t.prototype.parseRules = function(e) {
        var t = [];
        e = (e = e.split("\r\n").join("\n")).split(";");
        for (var s = 0; s < e.length; s++) {
            var r = e[s];
            if (-1 !== (r = r.trim()).indexOf(":")) {
                var o = (r = r.split(":"))[0].trim()
                  , n = r.slice(1).join(":").trim();
                if (o.length < 1 || n.length < 1)
                    continue;
                t.push({
                    directive: o,
                    value: n
                })
            } else
                "base64," === r.trim().substr(0, 7) ? t[t.length - 1].value += r.trim() : r.length > 0 && t.push({
                    directive: "",
                    value: r,
                    defective: !0
                })
        }
        return t
    }
    ,
    t.prototype.findCorrespondingRule = function(e, t, s) {
        void 0 === s && (s = !1);
        for (var r = !1, o = 0; o < e.length && (e[o].directive !== t || (r = e[o],
        s !== e[o].value)); o++)
            ;
        return r
    }
    ,
    t.prototype.findBySelector = function(e, t, s) {
        void 0 === s && (s = !1);
        for (var r = [], o = 0; o < e.length; o++)
            !1 === s ? e[o].selector === t && r.push(e[o]) : -1 !== e[o].selector.indexOf(t) && r.push(e[o]);
        if ("@imports" === t || r.length < 2)
            return r;
        var n = r[0];
        for (o = 1; o < r.length; o++)
            this.intelligentCSSPush([n], r[o]);
        return [n]
    }
    ,
    t.prototype.deleteBySelector = function(e, t) {
        for (var s = [], r = 0; r < e.length; r++)
            e[r].selector !== t && s.push(e[r]);
        return s
    }
    ,
    t.prototype.compressCSS = function(e) {
        for (var t = [], s = {}, r = 0; r < e.length; r++) {
            var o = e[r];
            if (!0 !== s[o.selector]) {
                var n = this.findBySelector(e, o.selector);
                0 !== n.length && (t = t.concat(n),
                s[o.selector] = !0)
            }
        }
        return t
    }
    ,
    t.prototype.cssDiff = function(e, t) {
        if (e.selector !== t.selector)
            return !1;
        if ("media" === e.type || "media" === t.type)
            return !1;
        for (var s, r, o = {
            selector: e.selector,
            rules: []
        }, n = 0; n < e.rules.length; n++)
            s = e.rules[n],
            !1 === (r = this.findCorrespondingRule(t.rules, s.directive, s.value)) ? o.rules.push(s) : s.value !== r.value && o.rules.push(s);
        for (var i = 0; i < t.rules.length; i++)
            r = t.rules[i],
            !1 === (s = this.findCorrespondingRule(e.rules, r.directive)) && (r.type = "DELETED",
            o.rules.push(r));
        return 0 !== o.rules.length && o
    }
    ,
    t.prototype.intelligentMerge = function(e, t, s) {
        void 0 === s && (s = !1);
        for (var r = 0; r < t.length; r++)
            this.intelligentCSSPush(e, t[r], s);
        for (r = 0; r < e.length; r++) {
            var o = e[r];
            "media" !== o.type && "keyframes" !== o.type && (o.rules = this.compactRules(o.rules))
        }
    }
    ,
    t.prototype.intelligentCSSPush = function(e, t, s) {
        var r = t.selector
          , o = !1;
        if (void 0 === s && (s = !1),
        !1 === s) {
            for (var n = 0; n < e.length; n++)
                if (e[n].selector === r) {
                    o = e[n];
                    break
                }
        } else
            for (var i = e.length - 1; i > -1; i--)
                if (e[i].selector === r) {
                    o = e[i];
                    break
                }
        if (!1 === o)
            e.push(t);
        else if ("media" !== t.type)
            for (var l = 0; l < t.rules.length; l++) {
                var a = t.rules[l]
                  , p = this.findCorrespondingRule(o.rules, a.directive);
                !1 === p ? o.rules.push(a) : "DELETED" === a.type ? p.type = "DELETED" : p.value = a.value
            }
        else
            o.subStyles = o.subStyles.concat(t.subStyles)
    }
    ,
    t.prototype.compactRules = function(e) {
        for (var t = [], s = 0; s < e.length; s++)
            "DELETED" !== e[s].type && t.push(e[s]);
        return t
    }
    ,
    t.prototype.getCSSForEditor = function(e, t) {
        void 0 === t && (t = 0);
        var s = "";
        void 0 === e && (e = this.css);
        for (var r = 0; r < e.length; r++)
            "imports" === e[r].type && (s += e[r].styles + "\n\n");
        for (r = 0; r < e.length; r++) {
            var o = e[r];
            if (void 0 !== o.selector) {
                var n = "";
                void 0 !== o.comments && (n = o.comments + "\n"),
                "media" === o.type ? (s += n + o.selector + "{\n",
                s += this.getCSSForEditor(o.subStyles, t + 1),
                s += "}\n\n") : "keyframes" !== o.type && "imports" !== o.type && (s += this.getSpaces(t) + n + o.selector + " {\n",
                s += this.getCSSOfRules(o.rules, t + 1),
                s += this.getSpaces(t) + "}\n\n")
            }
        }
        for (r = 0; r < e.length; r++)
            "keyframes" === e[r].type && (s += e[r].styles + "\n\n");
        return s
    }
    ,
    t.prototype.getImports = function(e) {
        for (var t = [], s = 0; s < e.length; s++)
            "imports" === e[s].type && t.push(e[s].styles);
        return t
    }
    ,
    t.prototype.getCSSOfRules = function(e, t) {
        for (var s = "", r = 0; r < e.length; r++)
            void 0 !== e[r] && (void 0 === e[r].defective ? s += this.getSpaces(t) + e[r].directive + ": " + e[r].value + ";\n" : s += this.getSpaces(t) + e[r].value + ";\n");
        return s || "\n"
    }
    ,
    t.prototype.getSpaces = function(e) {
        for (var t = "", s = 0; s < 4 * e; s++)
            t += " ";
        return t
    }
    ,
    t.prototype.applyNamespacing = function(e, t) {
        var s = e
          , r = "." + this.cssPreviewNamespace;
        void 0 !== t && (r = t),
        "string" == typeof e && (s = this.parseCSS(e));
        for (var o = 0; o < s.length; o++) {
            var n = s[o];
            if (!(n.selector.indexOf("@font-face") > -1 || n.selector.indexOf("keyframes") > -1 || n.selector.indexOf("@import") > -1 || n.selector.indexOf(".form-all") > -1 || n.selector.indexOf("#stage") > -1))
                if ("media" !== n.type) {
                    for (var i = n.selector.split(","), l = [], a = 0; a < i.length; a++)
                        -1 === i[a].indexOf(".supernova") ? l.push(r + " " + i[a]) : l.push(i[a]);
                    n.selector = l.join(",")
                } else
                    n.subStyles = this.applyNamespacing(n.subStyles, t)
        }
        return s
    }
    ,
    t.prototype.clearNamespacing = function(e, t) {
        void 0 === t && (t = !1);
        var s = e
          , r = "." + this.cssPreviewNamespace;
        "string" == typeof e && (s = this.parseCSS(e));
        for (var o = 0; o < s.length; o++) {
            var n = s[o];
            if ("media" !== n.type) {
                for (var i = n.selector.split(","), l = [], a = 0; a < i.length; a++)
                    l.push(i[a].split(r + " ").join(""));
                n.selector = l.join(",")
            } else
                n.subStyles = this.clearNamespacing(n.subStyles, !0)
        }
        return !1 === t ? this.getCSSForEditor(s) : s
    }
    ,
    t.prototype.createStyleElement = function(e, t, s) {
        if (void 0 === s && (s = !1),
        !1 === this.testMode && "nonamespace" !== s && (t = this.applyNamespacing(t)),
        "string" != typeof t && (t = this.getCSSForEditor(t)),
        !0 === s && (t = this.getCSSForEditor(this.parseCSS(t))),
        !1 !== this.testMode)
            return this.testMode("create style #" + e, t);
        var r = document.getElementById(e);
        r && r.parentNode.removeChild(r);
        var o = document.head || document.getElementsByTagName("head")[0]
          , n = document.createElement("style");
        n.id = e,
        n.type = "text/css",
        o.appendChild(n),
        n.styleSheet && !n.sheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t))
    }
    ,
    e.cssjs = t
}(this);
let hasExternalCss = !1;
const maniuplatedProperties = []
  , selectorTypes = {
    tag: !1,
    id: !1,
    class: !1,
    attribute: !1
}
  , cssProperties = {}
  , otherOptions = {
    externalCSS: [],
    hexCode: [],
    CSSanimation: [],
    CSSvariable: [],
    mediaQuery: [],
    googleFont: []
};
var parser = new cssjs;
const inStyleTag = [];
document.querySelectorAll("style").forEach(e=>{
    inStyleTag.push(parser.parseCSS(e.innerHTML))
}
);
const inStyleTagStyles = [].concat.apply([], inStyleTag);
document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]').forEach(e=>{
    otherOptions.googleFont.push(e.getAttribute("href"))
}
);
const urls = Array.from(document.querySelectorAll('link[href$=".css"]')).map(e=>e.getAttribute("href"));
let styles = [];
Promise.all(urls.filter(e=>!(e.includes("http") && !e.includes(window.location.hostname))).map(e=>fetch(e))).then(e=>Promise.all(e.map(e=>e.text()))).then(e=>{
    e.length && (otherOptions.externalCSS = urls),
    styles = e.map(e=>parser.parseCSS(e)),
    [].concat.apply([], styles, inStyleTagStyles).forEach(e=>{
        e.selector.split(" ").forEach(e=>{
            e && (e[0].toUpperCase() !== e[0].toLowerCase() && (selectorTypes.tag = !0),
            "." === e[0] && (selectorTypes.class = !0),
            "#" === e[0] && (selectorTypes.id = !0),
            e.includes("[") && e.includes("]") && (selectorTypes.attribute = !0))
        }
        ),
        "@" === e.selector[0] && (e.selector.includes("@keyframe") ? otherOptions.CSSanimation.push(e.styles) : e.selector.includes("@media") && otherOptions.mediaQuery.push(e.selector)),
        e.rules && e.rules.forEach(e=>{
            cssProperties[e.directive] = !0,
            e.value && e.value.includes("var(--") && otherOptions.CSSvariable.push(e.value),
            e.value && /^#([0-9A-F]{3}){1,2}$/i.test(e.value) && otherOptions.hexCode.push(e.value)
        }
        )
    }
    ),
    Object.keys(cssProperties).length >= 5 ? console.log(`SUCCESS, there are five or more CSS Properties: ${cssProperties.length} found`, cssProperties) : console.warn(`PROBLEM: There are fewer than five CSS Properties ${cssProperties.length} found`, cssProperties);
    const t = [];
    Object.keys(selectorTypes).forEach(e=>{
        !0 === selectorTypes[e] && t.push(e)
    }
    ),
    t.length >= 2 ? console.log(`SUCCESS, two or more selector types were used: ${t.length} found`, t) : console.warn(`PROBLEM: there were fewer than two selector types used: ${t.length} found`, t);
    console.log(selectorTypes)
    const s = {};
    Object.keys(otherOptions).forEach(e=>{
        otherOptions[e].length && (s[e] = otherOptions[e],
        delete otherOptions[e])
    }
    ),
    usedKeys = Object.keys(s),
    usedKeys.length ? (console.log(`SUCCESS at least 1 of the minimum additional requirements was met. ${usedKeys.length} total: ${usedKeys.join(", ")}`),
    usedKeys.forEach((e,t)=>{
        console.log(`Nice! ${e} : ${s[e].length} uses`, s[e])
    }
    )) : console.warn(`PROBLEM: at least 1 additinal requirement was needed, but none were present. Missing ${Object.keys(otherOptions).join()}`)
}
);
