/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var support = {};


    function DOMEval(code, doc) {
        doc = doc || document;

        var script = doc.createElement("script");

        script.text = code;
        doc.head.appendChild(script).parentNode.removeChild(script);
    }

    /* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module


    var
        version = "3.1.1",

        // Define a local copy of jQuery
        jQuery = function (selector, context) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {

            // Return all the elements in a clean array
            if (num == null) {
                return slice.call(this);
            }

            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function (callback) {
            return jQuery.each(this, callback);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if (( options = arguments[i] ) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( jQuery.isPlainObject(copy) ||
                        ( copyIsArray = jQuery.isArray(copy) ) )) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {
        },

        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function (obj) {

            // As of jQuery 3.0, isNumeric is limited to
            // strings and numbers (primitives or objects)
            // that can be coerced to finite numbers (gh-2662)
            var type = jQuery.type(obj);
            return ( type === "number" || type === "string" ) &&

                // parseFloat NaNs numeric-cast false positives ("")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                !isNaN(obj - parseFloat(obj));
        },

        isPlainObject: function (obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        isEmptyObject: function (obj) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        },

        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        globalEval: function (code) {
            DOMEval(code);
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE <=9 - 11, Edge 12 - 13
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        each: function (obj, callback) {
            var length, i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Support: Android <=4.0 only
        trim: function (text) {
            return text == null ?
                "" :
                ( text + "" ).replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            var tmp, args, proxy;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: Date.now,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    function isArrayLike(obj) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }

    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        (function (window) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function (list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                    // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                    // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                    // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                    // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode(high + 0x10000) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                },

                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {

                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if (ch === "\0") {
                            return "\uFFFD";
                        }

                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }

                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function () {
                    setDocument();
                },

                disabledAncestor = addCombinator(
                    function (elem) {
                        return elem.disabled === true && ("form" in elem || "label" in elem);
                    },
                    {dir: "parentNode", next: "legend"}
                );

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) {
                            }
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {

                    if (( context ? context.ownerDocument || context : preferredDoc ) !== document) {
                        setDocument(context);
                    }
                    context = context || document;

                    if (documentIsHTML) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                            // ID selector
                            if ((m = match[1])) {

                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {

                                        results.push(elem);
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;

                                // Class selector
                            } else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {

                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if (support.qsa && !compilerCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {

                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;

                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            } else if (context.nodeName.toLowerCase() !== "object") {

                                // Capture the context ID, setting it first if necessary
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape);
                                } else {
                                    context.setAttribute("id", (nid = expando));
                                }

                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");

                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }

                            if (newSelector) {
                                try {
                                    push.apply(results,
                                        newContext.querySelectorAll(newSelector)
                                    );
                                    return results;
                                } catch (qsaError) {
                                } finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *    deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }

                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");

                try {
                    return !!fn(el);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    // release memory in IE
                    el = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {

                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {

                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {

                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {

                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                } else {
                                    return elem.disabled === disabled;
                                }
                            }

                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||

                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                disabledAncestor(elem) === disabled;
                        }

                        return elem.disabled === disabled;

                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    } else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }

                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare, subWindow,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {

                    // Support: IE 11, Edge
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);

                        // Support: IE 9 - 10 only
                    } else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler);
                    }
                }

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    docElem.appendChild(el).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });

                // ID filter and find
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                } else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };

                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems,
                                elem = context.getElementById(id);

                            if (elem) {

                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }

                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }

                            return [];
                        }
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);

                            // DocumentFragment nodes don't have gEBTN
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :

                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                            return context.getElementsByClassName(className);
                        }
                    };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (el) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";

                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild(el).disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                        docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector)))) {

                    assert(function (el) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(el, "*");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                 ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                                adown.contains ?
                                    adown.contains(bup) :
                                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                            ));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf(sortInput, a) - indexOf(sortInput, b) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf(sortInput, a) - indexOf(sortInput, b) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return document;
            };

            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if (( elem.ownerDocument || elem ) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] &&
                    ( !rbuggyMatches || !rbuggyMatches.test(expr) ) &&
                    ( !rbuggyQSA || !rbuggyQSA.test(expr) )) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {
                    }
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if (( context.ownerDocument || context ) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if (( elem.ownerDocument || elem ) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                        fn(elem, name, !documentIsHTML) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            };

            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": {dir: "parentNode", first: true},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: true},
                    "~": {dir: "previousSibling"}
                },

                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[3] || match[4] || match[5] || "" ).replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? ( " " + result.replace(rwhitespace, " ") + " " ).indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :

                            function (elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {

                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});

                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                    } else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});

                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {

                                                if (( ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1 ) && ++diff) {

                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});

                                                        uniqueCache[type] = [dirruns, diff];
                                                    }

                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !( matches[idx] = matched[i] );
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return ( elem.textContent || elem.innerText || getText(elem) ).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function (elem) {
                        return elem === docElem;
                    },

                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),

                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for (i in {radio: true, checkbox: true, file: true, password: true, image: true}) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {submit: true, reset: true}) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

// Easy API for creating new setFilters
            function setFilters() {
            }

            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :

                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    } else if ((oldCache = uniqueCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[key] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense(elems, preMap, preFilter, context, xml) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice(preexisting, matcherOut.length) :
                                matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                    matchContext(elem, context, xml) :
                                    matchAnyContext(elem, context, xml) );
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {
                            outermostContext = context === document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                if (!context && elem.ownerDocument !== document) {
                                    setDocument(elem);
                                    xml = !documentIsHTML;
                                }
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context || document, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function (selector, context, results, seed) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

                        context = ( Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [] )[0];
                        if (!context) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if (compiled) {
                            context = context.parentNode;
                        }

                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                    token.matches[0].replace(runescape, funescape),
                                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                ( compiled || compile(selector, match) )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    !context || rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            };

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (el) {
                    el.innerHTML = "<a href='#'></a>";
                    return el.firstChild.getAttribute("href") === "#";
                })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (el) {
                    el.innerHTML = "<input/>";
                    el.firstChild.setAttribute("value", "");
                    return el.firstChild.getAttribute("value") === "";
                })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (el) {
                    return el.getAttribute("disabled") == null;
                })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })(window);


    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

// Deprecated
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;


    var dir = function (elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while (( elem = elem[dir] ) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };


    var siblings = function (n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );


    var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }

        // Single element
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return ( elem === qualifier ) !== not;
            });
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function (elem) {
                return ( indexOf.call(qualifier, elem) > -1 ) !== not;
            });
        }

        // Simple selector that can be filtered directly, removing non-Elements
        if (risSimple.test(qualifier)) {
            return jQuery.filter(qualifier, elements, not);
        }

        // Complex selector, compare the two sets, removing non-Elements
        qualifier = jQuery.filter(qualifier, elements);
        return jQuery.grep(elements, function (elem) {
            return ( indexOf.call(qualifier, elem) > -1 ) !== not && elem.nodeType === 1;
        });
    }

    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }

        return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
        }));
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i, ret,
                len = this.length,
                self = this;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            ret = this.pushStack([]);

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                selector || [],
                false
            ).length;
        }
    });


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && ( match[1] || !context )) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {

                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        if (elem) {

                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return ( context || root ).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :

                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            return jQuery.makeArray(selector, this);
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend({
        has: function (target) {
            var targets = jQuery(target, this),
                l = targets.length;

            return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery(selectors);

            // Positional selectors never match, since there's no _selection_ context
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

                        // Always skip document fragments
                        if (cur.nodeType < 11 && ( targets ?
                            targets.index(cur) > -1 :

                                // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors) )) {

                            matched.push(cur);
                            break;
                        }
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },

        // Determine the position of an element within the set
        index: function (elem) {

            // No argument, return index in parent
            if (!elem) {
                return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }

            // Locate the position of the desired element
            return indexOf.call(this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
            );
        },

        add: function (selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        while (( cur = cur[dir] ) && cur.nodeType !== 1) {
        }
        return cur;
    }

    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return siblings(( elem.parentNode || {} ).firstChild, elem);
        },
        children: function (elem) {
            return siblings(elem.firstChild);
        },
        contents: function (elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var matched = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }

            if (this.length > 1) {

                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }

            return this.pushStack(matched);
        };
    });
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions(options) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function () {

                // Enforce single-firing
                locked = options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {

                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {

                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {

                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }

                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && jQuery.type(arg) !== "string") {

                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);

                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while (( index = jQuery.inArray(arg, list, index) ) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                    jQuery.inArray(fn, list) > -1 :
                    list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };


    function Identity(v) {
        return v;
    }

    function Thrower(ex) {
        throw ex;
    }

    function adoptValue(value, resolve, reject) {
        var method;

        try {

            // Check for promise aspect first to privilege synchronous behavior
            if (value && jQuery.isFunction(( method = value.promise ))) {
                method.call(value).done(resolve).fail(reject);

                // Other thenables
            } else if (value && jQuery.isFunction(( method = value.then ))) {
                method.call(value, resolve, reject);

                // Other non-thenables
            } else {

                // Support: Android 4.0 only
                // Strict mode functions invoked without .call/.apply get global-object context
                resolve.call(undefined, value);
            }

            // For Promises/A+, convert exceptions into rejections
            // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
            // Deferred#then to conditionally suppress rejection.
        } catch (value) {

            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.call(undefined, value);
        }
    }

    jQuery.extend({

        Deferred: function (func) {
            var tuples = [

                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    ["notify", "progress", jQuery.Callbacks("memory"),
                        jQuery.Callbacks("memory"), 2],
                    ["resolve", "done", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 1, "rejected"]
                ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },

                    // Keep pipe for back-compat
                    pipe: function (/* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;

                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {

                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + "With"](
                                            this,
                                            fn ? [returned] : arguments
                                        );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;

                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function () {
                                        var returned, then;

                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if (depth < maxDepth) {
                                            return;
                                        }

                                        returned = handler.apply(that, args);

                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if (returned === deferred.promise()) {
                                            throw new TypeError("Thenable self-resolution");
                                        }

                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&

                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            ( typeof returned === "object" ||
                                            typeof returned === "function" ) &&
                                            returned.then;

                                        // Handle a returned thenable
                                        if (jQuery.isFunction(then)) {

                                            // Special processors (notify) just wait for resolution
                                            if (special) {
                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special)
                                                );

                                                // Normal processors (resolve) also hook into progress
                                            } else {

                                                // ...and disregard older resolution values
                                                maxDepth++;

                                                then.call(
                                                    returned,
                                                    resolve(maxDepth, deferred, Identity, special),
                                                    resolve(maxDepth, deferred, Thrower, special),
                                                    resolve(maxDepth, deferred, Identity,
                                                        deferred.notifyWith)
                                                );
                                            }

                                            // Handle all other returned values
                                        } else {

                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if (handler !== Identity) {
                                                that = undefined;
                                                args = [returned];
                                            }

                                            // Process the value(s)
                                            // Default process is resolve
                                            ( special || deferred.resolveWith )(that, args);
                                        }
                                    },

                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function () {
                                            try {
                                                mightThrow();
                                            } catch (e) {

                                                if (jQuery.Deferred.exceptionHook) {
                                                    jQuery.Deferred.exceptionHook(e,
                                                        process.stackTrace);
                                                }

                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if (depth + 1 >= maxDepth) {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if (handler !== Thrower) {
                                                        that = undefined;
                                                        args = [e];
                                                    }

                                                    deferred.rejectWith(that, args);
                                                }
                                            }
                                        };

                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                } else {

                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getStackHook) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }

                        return jQuery.Deferred(function (newDefer) {

                            // progress_handlers.add( ... )
                            tuples[0][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction(onProgress) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );

                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction(onFulfilled) ?
                                        onFulfilled :
                                        Identity
                                )
                            );

                            // rejected_handlers.add( ... )
                            tuples[2][3].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction(onRejected) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        }).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[5];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(
                        function () {

                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },

                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable,

                        // progress_callbacks.lock
                        tuples[0][2].lock
                    );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add(tuple[3].fire);

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                    return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (singleValue) {
            var

                // count of uncompleted subordinates
                remaining = arguments.length,

                // count of unprocessed arguments
                i = remaining,

                // subordinate fulfillment data
                resolveContexts = Array(i),
                resolveValues = slice.call(arguments),

                // the master Deferred
                master = jQuery.Deferred(),

                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!( --remaining )) {
                            master.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };

            // Single- and empty arguments are adopted like Promise.resolve
            if (remaining <= 1) {
                adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if (master.state() === "pending" ||
                    jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

                    return master.then();
                }
            }

            // Multiple arguments are aggregated like Promise.all array elements
            while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
            }

            return master.promise();
        }
    });


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function (error, stack) {

        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
    };


    jQuery.readyException = function (error) {
        window.setTimeout(function () {
            throw error;
        });
    };




// The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function (fn) {

        readyList
            .then(fn)

            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch(function (error) {
                jQuery.readyException(error);
            });

        return this;
    };

    jQuery.extend({

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);
        }
    });

    jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
    }

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
    if (document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll )) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(jQuery.ready);

    } else {

        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed);
    }


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!jQuery.isFunction(value)) {
                raw = true;
            }

            if (bulk) {

                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < len; i++) {
                    fn(
                        elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        if (chainable) {
            return elems;
        }

        // Gets
        if (bulk) {
            return fn.call(elems);
        }

        return len ? fn(elems[0], key) : emptyGet;
    };
    var acceptData = function (owner) {

        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };


    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

        cache: function (owner) {

            // Check if the owner object already has a cache
            var value = owner[this.expando];

            // If not, create one
            if (!value) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if (acceptData(owner)) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if (owner.nodeType) {
                        owner[this.expando] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }

            return value;
        },
        set: function (owner, data, value) {
            var prop,
                cache = this.cache(owner);

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if (typeof data === "string") {
                cache[jQuery.camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                    cache[jQuery.camelCase(prop)] = data[prop];
                }
            }
            return cache;
        },
        get: function (owner, key) {
            return key === undefined ?
                this.cache(owner) :

                // Always use camelCase key (gh-2257)
            owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
        },
        access: function (owner, key, value) {

            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if (key === undefined ||
                ( ( key && typeof key === "string" ) && value === undefined )) {

                return this.get(owner, key);
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set(owner, key, value);

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function (owner, key) {
            var i,
                cache = owner[this.expando];

            if (cache === undefined) {
                return;
            }

            if (key !== undefined) {

                // Support array or space separated string of keys
                if (jQuery.isArray(key)) {

                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map(jQuery.camelCase);
                } else {
                    key = jQuery.camelCase(key);

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ?
                        [key] :
                        ( key.match(rnothtmlwhite) || [] );
                }

                i = key.length;

                while (i--) {
                    delete cache[key[i]];
                }
            }

            // Remove the expando if there's no more data
            if (key === undefined || jQuery.isEmptyObject(cache)) {

                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                } else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function (owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data();

    var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData(data) {
        if (data === "true") {
            return true;
        }

        if (data === "false") {
            return false;
        }

        if (data === "null") {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if (data === +data + "") {
            return +data;
        }

        if (rbrace.test(data)) {
            return JSON.parse(data);
        }

        return data;
    }

    function dataAttr(elem, key, data) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = getData(data);
                } catch (e) {
                }

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend({
        hasData: function (elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },

        data: function (elem, name, data) {
            return dataUser.access(elem, name, data);
        },

        removeData: function (elem, name) {
            dataUser.remove(elem, name);
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function (elem, name, data) {
            return dataPriv.access(elem, name, data);
        },

        _removeData: function (elem, name) {
            dataPriv.remove(elem, name);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);

                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE 11 only
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    dataUser.set(this, key);
                });
            }

            return access(this, function (value) {
                var data;

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if (elem && value === undefined) {

                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each(function () {

                    // We always store the camelCased key
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },

        removeData: function (key) {
            return this.each(function () {
                dataUser.remove(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = ( type || "fx" ) + "queue";
                queue = dataPriv.get(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        dataPriv.remove(elem, [type + "queue", key]);
                    })
                });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // Ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!( --count )) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHiddenWithinTree = function (elem, el) {

        // isHiddenWithinTree might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;

        // Inline style trumps all
        return elem.style.display === "none" ||
            elem.style.display === "" &&

            // Otherwise, check computed style
            // Support: Firefox <=43 - 45
            // Disconnected elements can have computed display: none, so first confirm that elem is
            // in the document.
            jQuery.contains(elem.ownerDocument, elem) &&

            jQuery.css(elem, "display") === "none";
    };

    var swap = function (elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted,
            scale = 1,
            maxIterations = 20,
            currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || ( jQuery.cssNumber[prop] ? "" : "px" ),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = ( jQuery.cssNumber[prop] || unit !== "px" && +initial ) &&
                rcssNum.exec(jQuery.css(elem, prop));

        if (initialInUnit && initialInUnit[3] !== unit) {

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[3];

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            do {

                // If previous iteration zeroed out, double until we get *something*.
                // Use string for doubling so we don't accidentally see scale as unchanged below
                scale = scale || ".5";

                // Adjust and apply
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit);

                // Update scale, tolerating zero or NaN from tween.cur()
                // Break the loop if scale is unchanged or perfect, or if we've just had enough.
            } while (
            scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
                );
        }

        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[1] ?
            initialInUnit + ( valueParts[1] + 1 ) * valueParts[2] :
                +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay(elem) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[nodeName];

        if (display) {
            return display;
        }

        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");

        temp.parentNode.removeChild(temp);

        if (display === "none") {
            display = "block";
        }
        defaultDisplayMap[nodeName] = display;

        return display;
    }

    function showHide(elements, show) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;

        // Determine new display value for elements that need to change
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            display = elem.style.display;
            if (show) {

                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === "none") {
                    values[index] = dataPriv.get(elem, "display") || null;
                    if (!values[index]) {
                        elem.style.display = "";
                    }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                    values[index] = getDefaultDisplay(elem);
                }
            } else {
                if (display !== "none") {
                    values[index] = "none";

                    // Remember what we're overwriting
                    dataPriv.set(elem, "display", display);
                }
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for (index = 0; index < length; index++) {
            if (values[index] != null) {
                elements[index].style.display = values[index];
            }
        }

        return elements;
    }

    jQuery.fn.extend({
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function () {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    var rcheckableType = ( /^(?:checkbox|radio)$/i );

    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

    var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
    var wrapMap = {

        // Support: IE <=9 only
        option: [1, "<select multiple='multiple'>", "</select>"],

        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

        _default: [0, "", ""]
    };

// Support: IE <=9 only
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll(context, tag) {

        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (#15151)
        var ret;

        if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");

        } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");

        } else {
            ret = [];
        }

        if (tag === undefined || tag && jQuery.nodeName(context, tag)) {
            return jQuery.merge([context], ret);
        }

        return ret;
    }


// Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var i = 0,
            l = elems.length;

        for (; i < l; i++) {
            dataPriv.set(
                elems[i],
                "globalEval",
                !refElements || dataPriv.get(refElements[i], "globalEval")
            );
        }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, contains, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for (; i < l; i++) {
            elem = elems[i];

            if (elem || elem === 0) {

                // Add nodes directly
                if (jQuery.type(elem) === "object") {

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                    // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));

                    // Deserialize a standard representation
                    tag = ( rtagName.exec(elem) || ["", ""] )[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                    // Descend through wrappers to the right content
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge(nodes, tmp.childNodes);

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (#12392)
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while (( elem = nodes[i++] )) {

            // Skip elements already in the context collection (trac-4087)
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }

            contains = jQuery.contains(elem.ownerDocument, elem);

            // Append to fragment
            tmp = getAll(fragment.appendChild(elem), "script");

            // Preserve script evaluation history
            if (contains) {
                setGlobalEval(tmp);
            }

            // Capture executables
            if (scripts) {
                j = 0;
                while (( elem = tmp[j++] )) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }

        return fragment;
    }


    (function () {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");

        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");

        div.appendChild(input);

        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var documentElement = document.documentElement;


    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

// Support: IE <=9 only
// See #13393 for more info
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {
        }
    }

    function on(elem, types, selector, data, fn, one) {
        var origFn, type;

        // Types can be a map of types/handlers
        if (typeof types === "object") {

            // ( types-Object, selector, data )
            if (typeof selector !== "string") {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }

        if (data == null && fn == null) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }

        if (one === 1) {
            origFn = fn;
            fn = function (event) {

                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        return elem.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!( events = elemData.events )) {
                events = elemData.events = {};
            }
            if (!( eventHandle = elemData.handle )) {
                eventHandle = elemData.handle = function (e) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!( handlers = events[type] )) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if (!special.setup ||
                        special.setup.call(elem, data, namespaces, eventHandle) === false) {

                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

            if (!elemData || !( events = elemData.events )) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[type] || [];
                tmp = tmp[2] &&
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if (( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test(handleObj.namespace) ) &&
                        ( !selector || selector === handleObj.selector ||
                        selector === "**" && handleObj.selector )) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown ||
                        special.teardown.call(elem, namespaces, elemData.handle) === false) {

                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove data and the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
            }
        },

        dispatch: function (nativeEvent) {

            // Make a writable jQuery.Event from the native event object
            var event = jQuery.event.fix(nativeEvent);

            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array(arguments.length),
                handlers = ( dataPriv.get(this, "events") || {} )[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;

            for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while (( matched = handlerQueue[i++] ) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while (( handleObj = matched.handlers[j++] ) && !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( ( jQuery.event.special[handleObj.origType] || {} ).handle ||
                        handleObj.handler ).apply(matched.elem, args);

                        if (ret !== undefined) {
                            if (( event.result = ret ) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            if (delegateCount &&

                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&

                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !( event.type === "click" && event.button >= 1 )) {

                for (; cur !== this; cur = cur.parentNode || this) {

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true )) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matchedSelectors[sel] === undefined) {
                                matchedSelectors[sel] = handleObj.needsContext ?
                                jQuery(sel, this).index(cur) > -1 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matchedSelectors[sel]) {
                                matchedHandlers.push(handleObj);
                            }
                        }
                        if (matchedHandlers.length) {
                            handlerQueue.push({elem: cur, handlers: matchedHandlers});
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            cur = this;
            if (delegateCount < handlers.length) {
                handlerQueue.push({elem: cur, handlers: handlers.slice(delegateCount)});
            }

            return handlerQueue;
        },

        addProp: function (name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: jQuery.isFunction(hook) ?
                    function () {
                        if (this.originalEvent) {
                            return hook(this.originalEvent);
                        }
                    } :
                    function () {
                        if (this.originalEvent) {
                            return this.originalEvent[name];
                        }
                    },

                set: function (value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },

        fix: function (originalEvent) {
            return originalEvent[jQuery.expando] ?
                originalEvent :
                new jQuery.Event(originalEvent);
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {

                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {

                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };

    jQuery.removeEvent = function (elem, type, handle) {

        // This "if" is needed for plain objects
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    };

    jQuery.Event = function (src, props) {

        // Allow instantiation without the 'new' keyword
        if (!( this instanceof jQuery.Event )) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&

            // Support: Android <=2.3 only
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = ( src.target && src.target.nodeType === 3 ) ?
                src.target.parentNode :
                src.target;

            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

// Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,

        which: function (event) {
            var button = event.button;

            // Add which for key events
            if (event.which == null && rkeyEvent.test(event.type)) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                if (button & 1) {
                    return 1;
                }

                if (button & 2) {
                    return 3;
                }

                if (button & 4) {
                    return 2;
                }

                return 0;
            }

            return event.which;
        }
    }, jQuery.event.addProp);

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function (event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || ( related !== target && !jQuery.contains(target, related) )) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    jQuery.fn.extend({

        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ?
                    handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {

                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });


    var

        /* eslint-disable max-len */

        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

        /* eslint-enable */

        // Support: IE <=10 - 11, Edge 12 - 13
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function manipulationTarget(elem, content) {
        if (jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

            return elem.getElementsByTagName("tbody")[0] || elem;
        }

        return elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = ( elem.getAttribute("type") !== null ) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);

        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if (dest.nodeType !== 1) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.access(src);
            pdataCur = dataPriv.set(dest, pdataOld);
            events = pdataOld.events;

            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }

        // 2. Copy user data
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);

            dataUser.set(dest, udataCur);
        }
    }

// Fix IE bugs, see support tests
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip(collection, args, callback, ignored) {

        // Flatten any nested arrays
        args = concat.apply([], args);

        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            isFunction = jQuery.isFunction(value);

        // We can't cloneNode fragments that contain checked, in WebKit
        if (isFunction ||
            ( l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value) )) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                if (isFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }

        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;

            if (fragment.childNodes.length === 1) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                    node = fragment;

                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);

                        // Keep references to cloned scripts for later restoration
                        if (hasScripts) {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }

                    callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;

                    // Reenable scripts
                    jQuery.map(scripts, restoreScript);

                    // Evaluate executable scripts on first document insertion
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") &&
                            jQuery.contains(doc, node)) {

                            if (node.src) {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src);
                                }
                            } else {
                                DOMEval(node.textContent.replace(rcleanScript, ""), doc);
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    function remove(elem, selector, keepData) {
        var node,
            nodes = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;

        for (; ( node = nodes[i] ) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }

            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }

        return elem;
    }

    jQuery.extend({
        htmlPrefilter: function (html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },

        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode(true),
                inPage = jQuery.contains(elem.ownerDocument, elem);

            // Fix IE cloning issues
            if (!support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function (elems) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;

            for (; ( elem = elems[i] ) !== undefined; i++) {
                if (acceptData(elem)) {
                    if (( data = elem[dataPriv.expando] )) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        detach: function (selector) {
            return remove(this, selector, true);
        },

        remove: function (selector) {
            return remove(this, selector);
        },

        text: function (value) {
            return access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().each(function () {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length);
        },

        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        empty: function () {
            var elem,
                i = 0;

            for (; ( elem = this[i] ) != null; i++) {
                if (elem.nodeType === 1) {

                    // Prevent memory leaks
                    jQuery.cleanData(getAll(elem, false));

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[( rtagName.exec(value) || ["", ""] )[1].toLowerCase()]) {

                    value = jQuery.htmlPrefilter(value);

                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};

                            // Remove element nodes and prevent memory leaks
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {
                    }
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function () {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;

                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }

                // Force callback invocation
            }, ignored);
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1,
                i = 0;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });
    var rmargin = ( /^margin/ );

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var getStyles = function (elem) {

        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if (!view || !view.opener) {
            view = window;
        }

        return view.getComputedStyle(elem);
    };


    (function () {

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if (!div) {
                return;
            }

            div.style.cssText =
                "box-sizing:border-box;" +
                "position:relative;display:block;" +
                "margin:auto;border:1px;padding:1px;" +
                "top:1%;width:50%";
            div.innerHTML = "";
            documentElement.appendChild(container);

            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = divStyle.marginLeft === "2px";
            boxSizingReliableVal = divStyle.width === "4px";

            // Support: Android 4.0 - 4.3 only
            // Some styles come back with percentage values, even though they shouldn't
            div.style.marginRight = "50%";
            pixelMarginRightVal = divStyle.marginRight === "4px";

            documentElement.removeChild(container);

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }

        var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
            container = document.createElement("div"),
            div = document.createElement("div");

        // Finish early in limited (non-browser) environments
        if (!div.style) {
            return;
        }

        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
            "padding:0;margin-top:1px;position:absolute";
        container.appendChild(div);

        jQuery.extend(support, {
            pixelPosition: function () {
                computeStyleTests();
                return pixelPositionVal;
            },
            boxSizingReliable: function () {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelMarginRight: function () {
                computeStyleTests();
                return pixelMarginRightVal;
            },
            reliableMarginLeft: function () {
                computeStyleTests();
                return reliableMarginLeftVal;
            }
        });
    })();


    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret,
            style = elem.style;

        computed = computed || getStyles(elem);

        // Support: IE <=9 only
        // getPropertyValue is only needed for .css('filter') (#12537)
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];

            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
        ret + "" :
            ret;
    }


    function addGetHookIf(conditionFn, hookFn) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function () {
                if (conditionFn()) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return ( this.get = hookFn ).apply(this, arguments);
            }
        };
    }


    var

        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        cssShow = {position: "absolute", visibility: "hidden", display: "block"},
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = ["Webkit", "Moz", "ms"],
        emptyStyle = document.createElement("div").style;

// Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(name) {

        // Shortcut for names that are not vendor prefixed
        if (name in emptyStyle) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[0].toUpperCase() + name.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }

    function setPositiveNumber(elem, value, subtract) {

        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec(value);
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, matches[2] - ( subtract || 0 )) + ( matches[3] || "px" ) :
            value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i,
            val = 0;

        // If we already have the right measurement, avoid augmentation
        if (extra === ( isBorderBox ? "border" : "content" )) {
            i = 4;

            // Otherwise initialize for horizontal or vertical properties
        } else {
            i = name === "width" ? 1 : 0;
        }

        for (; i < 4; i += 2) {

            // Both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }

            if (isBorderBox) {

                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // At this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {

                // At this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // At this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        return val;
    }

    function getWidthOrHeight(elem, name, extra) {

        // Start with offset property, which is equivalent to the border-box value
        var val,
            valueIsBorderBox = true,
            styles = getStyles(elem),
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

        // Support: IE <=11 only
        // Running getBoundingClientRect on a disconnected node
        // in IE throws an error.
        if (elem.getClientRects().length) {
            val = elem.getBoundingClientRect()[name];
        }

        // Some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {

            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }

            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
                ( support.boxSizingReliable() || val === elem.style[name] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }

        // Use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra || ( isBorderBox ? "border" : "content" ),
                    valueIsBorderBox,
                    styles
                )
            ) + "px";
    }

    jQuery.extend({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {

                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            "float": "cssFloat"
        },

        // Get and set the style property on a DOM Node
        style: function (elem, name, value, extra) {

            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;

            name = jQuery.cssProps[origName] ||
                ( jQuery.cssProps[origName] = vendorPropName(origName) || origName );

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (type === "string" && ( ret = rcssNum.exec(value) ) && ret[1]) {
                    value = adjustCSS(elem, name, ret);

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if (type === "number") {
                    value += ret && ret[3] || ( jQuery.cssNumber[origName] ? "" : "px" );
                }

                // background-* props affect original clone's values
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !( "set" in hooks ) ||
                    ( value = hooks.set(elem, value, extra) ) !== undefined) {

                    style[name] = value;
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks &&
                    ( ret = hooks.get(elem, false, extra) ) !== undefined) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function (elem, name, extra, styles) {
            var val, num, hooks,
                origName = jQuery.camelCase(name);

            // Make sure that we're working with the right name
            name = jQuery.cssProps[origName] ||
                ( jQuery.cssProps[origName] = vendorPropName(origName) || origName );

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            // Convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test(jQuery.css(elem, "display")) &&

                    // Support: Safari 8+
                    // Table columns in Safari have non-zero offsetWidth & zero
                    // getBoundingClientRect().width unless display is changed.
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a disconnected node
                    // in IE throws an error.
                    ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
                        swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, name, extra);
                        }) :
                        getWidthOrHeight(elem, name, extra);
                }
            },

            set: function (elem, value, extra) {
                var matches,
                    styles = extra && getStyles(elem),
                    subtract = extra && augmentWidthOrHeight(
                            elem,
                            name,
                            extra,
                            jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                            styles
                        );

                // Convert to pixels if value adjustment is needed
                if (subtract && ( matches = rcssNum.exec(value) ) &&
                    ( matches[3] || "px" ) !== "px") {

                    elem.style[name] = value;
                    value = jQuery.css(elem, name);
                }

                return setPositiveNumber(elem, value, subtract);
            }
        };
    });

    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
        function (elem, computed) {
            if (computed) {
                return ( parseFloat(curCSS(elem, "marginLeft")) ||
                        elem.getBoundingClientRect().left -
                        swap(elem, {marginLeft: 0}, function () {
                            return elem.getBoundingClientRect().left;
                        })
                    ) + "px";
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }

    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[prop] ? "" : "px" );
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (tween.elem.nodeType !== 1 ||
                    tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css(tween.elem, tween.prop, "");

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {

                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 &&
                    ( tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                    jQuery.cssHooks[tween.prop] )) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
    jQuery.fx.step = {};


    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function raf() {
        if (timerId) {
            window.requestAnimationFrame(raf);
            jQuery.fx.tick();
        }
    }

// Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout(function () {
            fxNow = undefined;
        });
        return ( fxNow = jQuery.now() );
    }

// Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            i = 0,
            attrs = {height: type};

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = ( Animation.tweeners[prop] || [] ).concat(Animation.tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if (( tween = collection[index].call(animation, prop, value) )) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree(elem),
            dataShow = dataPriv.get(elem, "fxshow");

        // Queue-skipping animations hijack the fx hooks
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function () {

                // Ensure the complete handler is called before this completes
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // Detect show/hide animations
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === ( hidden ? "hide" : "show" )) {

                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;

                        // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }

        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
        }

        // Restrict "overflow" and "display" styles during box animations
        if (isBox && elem.nodeType === 1) {

            // Support: IE <=9 - 11, Edge 12 - 13
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
                if (restoreDisplay) {
                    display = restoreDisplay;
                } else {

                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide([elem], true);
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css(elem, "display");
                    showHide([elem]);
                }
            }

            // Animate inline elements as inline-block
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                if (jQuery.css(elem, "float") === "none") {

                    // Restore the original display value at the end of pure show/hide animations
                    if (!propTween) {
                        anim.done(function () {
                            style.display = restoreDisplay;
                        });
                        if (restoreDisplay == null) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function () {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }

        // Implement show/hide animations
        propTween = false;
        for (prop in orig) {

            // General show/hide setup for this element animation
            if (!propTween) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access(elem, "fxshow", {display: restoreDisplay});
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if (toggle) {
                    dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if (hidden) {
                    showHide([elem], true);
                }

                /* eslint-disable no-loop-func */

                anim.done(function () {

                    /* eslint-enable no-loop-func */

                    // The final step of a "hide" animation is actually hiding the element
                    if (!hidden) {
                        showHide([elem]);
                    }
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
            }

            // Per-property setup
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!( prop in dataShow )) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for (index in value) {
                    if (!( index in props )) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always(function () {

                // Don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,

                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (jQuery.isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                        jQuery.proxy(result.stop, result);
                }
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    }

    jQuery.Animation = jQuery.extend(Animation, {

        tweeners: {
            "*": [function (prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween;
            }]
        },

        tweener: function (props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.match(rnothtmlwhite);
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },

        prefilters: [defaultPrefilter],

        prefilter: function (callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });

    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
            jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };

        // Go to the end state if fx are off or if document is hidden
        if (jQuery.fx.off || document.hidden) {
            opt.duration = 0;

        } else {
            if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                    opt.duration = jQuery.fx.speeds[opt.duration];

                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }

        // Normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function () {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {

            // Show any hidden elements after setting opacity to 0
            return this.filter(isHiddenWithinTree).css("opacity", 0).show()

            // Animate to the value specified
                .end().animate({opacity: to}, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this &&
                        ( type == null || timers[index].queue === type )) {

                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index,
                    data = dataPriv.get(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // Look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // Look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

// Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = jQuery.now();

        for (; i < timers.length; i++) {
            timer = timers[i];

            // Checks the timer has not already been removed
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (!timerId) {
            timerId = window.requestAnimationFrame ?
                window.requestAnimationFrame(raf) :
                window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };

    jQuery.fx.stop = function () {
        if (window.cancelAnimationFrame) {
            window.cancelAnimationFrame(timerId);
        } else {
            window.clearInterval(timerId);
        }

        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function () {
                window.clearTimeout(timeout);
            };
        });
    };


    (function () {
        var input = document.createElement("input"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));

        input.type = "checkbox";

        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();


    var boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()] ||
                    ( jQuery.expr.match.bool.test(name) ? boolHook : undefined );
            }

            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }

                if (hooks && "set" in hooks &&
                    ( ret = hooks.set(elem, value, name) ) !== undefined) {
                    return ret;
                }

                elem.setAttribute(name, value + "");
                return value;
            }

            if (hooks && "get" in hooks && ( ret = hooks.get(elem, name) ) !== null) {
                return ret;
            }

            ret = jQuery.find.attr(elem, name);

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" &&
                        jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function (elem, value) {
            var name,
                i = 0,

                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);

            if (attrNames && elem.nodeType === 1) {
                while (( name = attrNames[i++] )) {
                    elem.removeAttribute(name);
                }
            }
        }
    });

// Hooks for boolean attributes
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };

    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;

        attrHandle[name] = function (elem, name, isXML) {
            var ret, handle,
                lowercaseName = name.toLowerCase();

            if (!isXML) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ?
                    lowercaseName :
                    null;
                attrHandle[lowercaseName] = handle;
            }
            return ret;
        };
    });


    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function (name) {
            return this.each(function () {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });

    jQuery.extend({
        prop: function (elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                if (hooks && "set" in hooks &&
                    ( ret = hooks.set(elem, value, name) ) !== undefined) {
                    return ret;
                }

                return ( elem[name] = value );
            }

            if (hooks && "get" in hooks && ( ret = hooks.get(elem, name) ) !== null) {
                return ret;
            }

            return elem[name];
        },

        propHooks: {
            tabIndex: {
                get: function (elem) {

                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }

                    if (
                        rfocusable.test(elem.nodeName) ||
                        rclickable.test(elem.nodeName) &&
                        elem.href
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function (elem) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;

                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });


    // Strip and collapse whitespace according to HTML spec
    // https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }


    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }

    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];

                while (( elem = this[i++] )) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse(curValue) + " " );

                    if (cur) {
                        j = 0;
                        while (( clazz = classes[j++] )) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr("class", "");
            }

            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];

                while (( elem = this[i++] )) {
                    curValue = getClass(elem);

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse(curValue) + " " );

                    if (cur) {
                        j = 0;
                        while (( clazz = classes[j++] )) {

                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value;

            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            return this.each(function () {
                var className, i, self, classNames;

                if (type === "string") {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery(this);
                    classNames = value.match(rnothtmlwhite) || [];

                    while (( className = classNames[i++] )) {

                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {

                        // Store className if set
                        dataPriv.set(this, "__className__", className);
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if (this.setAttribute) {
                        this.setAttribute("class",
                            className || value === false ?
                                "" :
                            dataPriv.get(this, "__className__") || ""
                        );
                    }
                }
            });
        },

        hasClass: function (selector) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while (( elem = this[i++] )) {
                if (elem.nodeType === 1 &&
                    ( " " + stripAndCollapse(getClass(elem)) + " " ).indexOf(className) > -1) {
                    return true;
                }
            }

            return false;
        }
    });


    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, isFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (hooks &&
                        "get" in hooks &&
                        ( ret = hooks.get(elem, "value") ) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle most common string cases
                    if (typeof ret === "string") {
                        return ret.replace(rreturn, "");
                    }

                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";

                } else if (typeof val === "number") {
                    val += "";

                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !( "set" in hooks ) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {

                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :

                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function (elem) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if (index < 0) {
                        i = max;

                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (#2551)
                        if (( option.selected || i === index ) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            ( !option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup") )) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function (elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        /* eslint-disable no-cond-assign */

                        if (option.selected =
                                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
                        ) {
                            optionSet = true;
                        }

                        /* eslint-enable no-cond-assign */
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });

// Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (jQuery.isArray(value)) {
                    return ( elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1 );
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });


// Return jQuery for attributes-only inclusion


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

    jQuery.extend(jQuery.event, {

        trigger: function (event, data, elem, onlyHandlers) {

            var i, cur, tmp, bubbleType, ontype, handle, special,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") > -1) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === ( elem.ownerDocument || document )) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while (( cur = eventPath[i++] ) && !event.isPropagationStopped()) {

                event.type = i > 1 ?
                    bubbleType :
                special.bindType || type;

                // jQuery handler
                handle = ( dataPriv.get(cur, "events") || {} )[event.type] &&
                    dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if (( !special._default ||
                    special._default.apply(eventPath.pop(), data) === false ) &&
                    acceptData(elem)) {

                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function (type, elem, event) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true
                }
            );

            jQuery.event.trigger(e, null, elem);
        }

    });

    jQuery.fn.extend({

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    jQuery.each(( "blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu" ).split(" "),
        function (i, name) {

            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });

    jQuery.fn.extend({
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });


    support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if (!support.focusin) {
        jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };

            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, ( attaches || 0 ) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix);

                    } else {
                        dataPriv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    var location = window.location;

    var nonce = jQuery.now();

    var rquery = ( /\?/ );



// Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null;
        }

        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = ( new window.DOMParser() ).parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }

        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {

            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {

                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                        v,
                        traditional,
                        add
                    );
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {

            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {

            // Serialize scalar item.
            add(prefix, obj);
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, valueOrFunction) {

                // If value is a function, invoke it and use its return value
                var value = jQuery.isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;

                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {

            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {

                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        ( this.checked || !rcheckableType.test(type) );
                })
                .map(function (i, elem) {
                    var val = jQuery(this).val();

                    if (val == null) {
                        return null;
                    }

                    if (jQuery.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                        });
                    }

                    return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
                }).get();
        }
    });


    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"),

        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
    originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

            if (jQuery.isFunction(func)) {

                // For each dataType in the dataTypeExpression
                while (( dataType = dataTypes[i++] )) {

                    // Prepend if requested
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        ( structure[dataType] = structure[dataType] || [] ).unshift(func);

                        // Otherwise append
                    } else {
                        ( structure[dataType] = structure[dataType] || [] ).push(func);
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !( selected = dataTypeOrTransport );
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend(target, src) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                ( flatOptions[key] ? target : ( deep || ( deep = {} ) ) )[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {

            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {

                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s.throws) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return {state: "success", data: response};
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

                // URL without anti-cache param
                cacheURL,

                // Response headers
                responseHeadersString,
                responseHeaders,

                // timeout handle
                timeoutTimer,

                // Url cleanup var
                urlAnchor,

                // Request state (becomes false upon send and true upon completion)
                completed,

                // To know if global events are to be dispatched
                fireGlobals,

                // Loop variable
                i,

                // uncached part of the url
                uncached,

                // Create the final options object
                s = jQuery.ajaxSetup({}, options),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery(callbackContext) :
                    jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (( match = rheaders.exec(responseHeadersString) )) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {

                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            } else {

                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR);

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || location.href ) + "" )
                .replace(rprotocol, location.protocol + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = ( s.dataType || "*" ).toLowerCase().match(rnothtmlwhite) || [""];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");

                // Support: IE <=8 - 11, Edge 12 - 13
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (completed) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace(rhash, "");

            // More options handling for requests with no content
            if (!s.hasContent) {

                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available, append data to url
                if (s.data) {
                    cacheURL += ( rquery.test(cacheURL) ? "&" : "?" ) + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = ( rquery.test(cacheURL) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if (s.data && s.processData &&
                ( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                s.accepts[s.dataTypes[0]] +
                ( s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend &&
                ( s.beforeSend.call(callbackContext, jqXHR, s) === false || completed )) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (completed) {
                    return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    completed = false;
                    transport.send(requestHeaders, done);
                } catch (e) {

                    // Rethrow post-completion exceptions
                    if (completed) {
                        throw e;
                    }

                    // Propagate others as results
                    done(-1, e);
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Ignore repeat invocations
                if (completed) {
                    return;
                }

                completed = true;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                        [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                    // Handle the global AJAX counter
                    if (!( --jQuery.active )) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {

            // Shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });


    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function (html) {
            var wrap;

            if (this[0]) {
                if (jQuery.isFunction(html)) {
                    html = html.call(this[0]);
                }

                // The elements to wrap the target around
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function () {
                    var elem = this;

                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function (html) {
            var isFunction = jQuery.isFunction(html);

            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function (selector) {
            this.parent(selector).not("body").each(function () {
                jQuery(this).replaceWith(this.childNodes);
            });
            return this;
        }
    });


    jQuery.expr.pseudos.hidden = function (elem) {
        return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function (elem) {
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    };


    jQuery.ajaxSettings.xhr = function () {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {
        }
    };

    var xhrSuccessStatus = {

            // File protocol always yields status code 0, assume 200
            0: 200,

            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport(function (options) {
        var callback, errorCallback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function (headers, complete) {
                    var i,
                        xhr = options.xhr();

                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }

                    // Override mime type if needed
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }

                    // Set headers
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }

                    // Callback
                    callback = function (type) {
                        return function () {
                            if (callback) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {

                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error");
                                    } else {
                                        complete(
                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[xhr.status] || xhr.status,
                                        xhr.statusText,

                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        ( xhr.responseType || "text" ) !== "text" ||
                                        typeof xhr.responseText !== "string" ?
                                        {binary: xhr.response} :
                                        {text: xhr.responseText},
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = callback("error");

                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function () {

                            // Check readyState before timeout as it changes
                            if (xhr.readyState === 4) {

                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout(function () {
                                    if (callback) {
                                        errorCallback();
                                    }
                                });
                            }
                        };
                    }

                    // Create the abort callback
                    callback = callback("abort");

                    try {

                        // Do send the request (this may raise an exception)
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {

                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if (callback) {
                            throw e;
                        }
                    }
                },

                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter(function (s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });

// Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " +
            "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

// Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function (_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on(
                        "load error",
                        callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        }
                    );

                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild(script[0]);
                },
                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });


    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[callback] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test(s.url) ?
                        "url" :
                    typeof s.data === "string" &&
                    ( s.contentType || "" )
                        .indexOf("application/x-www-form-urlencoded") === 0 &&
                    rjsonp.test(s.data) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += ( rquery.test(s.url) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // Force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {

                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                } else {
                    window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });


// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = (function () {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    })();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== "string") {
            return [];
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }

        var base, parsed, scripts;

        if (!context) {

            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
            } else {
                context = document;
            }
        }

        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function (url, params, callback) {
        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
        }

        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function (responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            }).always(callback && function (jqXHR, status) {
                    self.each(function () {
                        callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                    });
                });
        }

        return this;
    };


// Attach a bunch of functions for handling common AJAX events
    jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });


    jQuery.expr.pseudos.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };


    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
                ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (jQuery.isFunction(options)) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }

            if (options.top != null) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if (options.left != null) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);

            } else {
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({
        offset: function (options) {

            // Preserve chaining for setter
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var docElem, win, rect, doc,
                elem = this[0];

            if (!elem) {
                return;
            }

            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if (!elem.getClientRects().length) {
                return {top: 0, left: 0};
            }

            rect = elem.getBoundingClientRect();

            // Make sure element is not hidden (display: none)
            if (rect.width || rect.height) {
                doc = elem.ownerDocument;
                win = getWindow(doc);
                docElem = doc.documentElement;

                return {
                    top: rect.top + win.pageYOffset - docElem.clientTop,
                    left: rect.left + win.pageXOffset - docElem.clientLeft
                };
            }

            // Return zeros for disconnected and hidden elements (gh-2310)
            return rect;
        },

        position: function () {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset,
                elem = this[0],
                parentOffset = {top: 0, left: 0};

            // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
            // because it is its only offset parent
            if (jQuery.css(elem, "position") === "fixed") {

                // Assume getBoundingClientRect is there when computed position is fixed
                offset = elem.getBoundingClientRect();

            } else {

                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset = {
                    top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
                    left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
                };
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent;

                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            });
        }
    });

// Create scrollLeft and scrollTop methods
    jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (method, prop) {
        var top = "pageYOffset" === prop;

        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {
                var win = getWindow(elem);

                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }

                if (win) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length);
        };
    });

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
    jQuery.each(["top", "left"], function (i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                    jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({Height: "height", Width: "width"}, function (name, type) {
        jQuery.each({padding: "inner" + name, content: type, "": "outer" + name},
            function (defaultExtra, funcName) {

                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                    return access(this, function (elem, type, value) {
                        var doc;

                        if (jQuery.isWindow(elem)) {

                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(
                                elem.body["scroll" + name], doc["scroll" + name],
                                elem.body["offset" + name], doc["offset" + name],
                                doc["client" + name]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :

                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
    });


    jQuery.fn.extend({

        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off(selector, "**") :
                this.off(types, selector || "**", fn);
        }
    });

    jQuery.parseJSON = JSON.parse;


// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }


    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }


    return jQuery;
});

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), +function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)if (void 0 !== a.style[c])return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                if (a(b.target).is(this))return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }

    var c = '[data-dismiss="alert"]', d = function (b) {
        a(b).on("click", c, this.close)
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }

        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {loadingText: "loading..."}, c.prototype.setState = function (b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }

    var c = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap)return b;
        var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function (a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0))return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        if (!this.sliding)return this.slide("next")
    }, c.prototype.prev = function () {
        if (!this.sliding)return this.slide("prev")
    }, c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = this;
        if (f.hasClass("active"))return this.sliding = !1;
        var j = f[0], k = a.Event("slide.bs.carousel", {relatedTarget: j, direction: h});
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {relatedTarget: j, direction: h});
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    };
    var e = function (c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }

    var d = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {toggle: !0}, d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition)return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function () {
            var d = a(this), e = b(d), f = {relatedTarget: this};
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
        }))
    }

    function d(b) {
        return this.each(function () {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }

    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e), g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {relatedTarget: this};
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented())return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
            }
            return !1
        }
    }, g.prototype.keydown = function (c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d), g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which)return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a", i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), +function (a) {
    "use strict";
    function b(b, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }

    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var d = this, e = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {relatedTarget: b});
            e ? d.$dialog.one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function () {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function () {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function () {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, c.prototype.init = function (b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector)throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g)this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function () {
        for (var a in this.inState)if (this.inState[a])return !0;
        return !1
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue())return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d)return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function () {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function (b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }

        var e = this, f = a(this.$tip), g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented())return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {width: e.right - e.left, height: e.bottom - e.top}));
        var f = window.SVGElement && c instanceof window.SVGElement, g = d ? {
            top: 0,
            left: 0
        } : f ? null : b.offset(), h = {scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()}, i = d ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {top: 0, left: 0};
        if (!this.$viewport)return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length))throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout), this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery), +function (a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }

    b.VERSION = "3.3.7", b.DEFAULTS = {offset: 10}, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = this, c = "offset", d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var b = a(this), e = b.data("target") || b.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d)return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0])return this.activeTarget = null, this.clear();
        for (a = e.length; a--;)g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {relatedTarget: b[0]}), g = a.Event("show.bs.tab", {relatedTarget: e[0]});
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                    e.trigger({type: "hidden.bs.tab", relatedTarget: b[0]}), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function (b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }

        var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    };
    var e = function (c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed)return e < c && "top";
        if ("bottom" == this.affixed)return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented())return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({top: g - b - f})
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
/*! Summernote v0.8.2 | (c) 2013-2015 Alan Hong and other contributors | MIT license */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(window.jQuery)
}(function ($) {
    "use strict";
    var func = function () {
        var a = function (a) {
            return function (b) {
                return a === b
            }
        }, b = function (a, b) {
            return a === b
        }, c = function (a) {
            return function (b, c) {
                return b[a] === c[a]
            }
        }, d = function () {
            return !0
        }, e = function () {
            return !1
        }, f = function (a) {
            return function () {
                return !a.apply(a, arguments)
            }
        }, g = function (a, b) {
            return function (c) {
                return a(c) && b(c)
            }
        }, h = function (a) {
            return a
        }, i = function (a, b) {
            return function () {
                return a[b].apply(a, arguments)
            }
        }, j = 0, k = function (a) {
            var b = ++j + "";
            return a ? a + b : b
        }, l = function (a) {
            var b = $(document);
            return {
                top: a.top + b.scrollTop(),
                left: a.left + b.scrollLeft(),
                width: a.right - a.left,
                height: a.bottom - a.top
            }
        }, m = function (a) {
            var b = {};
            for (var c in a)a.hasOwnProperty(c) && (b[a[c]] = c);
            return b
        }, n = function (a, b) {
            return b = b || "", b + a.split(".").map(function (a) {
                return a.substring(0, 1).toUpperCase() + a.substring(1)
            }).join("")
        }, o = function (a, b, c) {
            var d;
            return function () {
                var e = this, f = arguments, g = function () {
                    d = null, c || a.apply(e, f)
                }, h = c && !d;
                clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f)
            }
        };
        return {
            eq: a,
            eq2: b,
            peq2: c,
            ok: d,
            fail: e,
            self: h,
            not: f,
            and: g,
            invoke: i,
            uniqueId: k,
            rect2bnd: l,
            invertObject: m,
            namespaceToCamel: n,
            debounce: o
        }
    }(), list = function () {
        var a = function (a) {
            return a[0]
        }, b = function (a) {
            return a[a.length - 1]
        }, c = function (a) {
            return a.slice(0, a.length - 1)
        }, d = function (a) {
            return a.slice(1)
        }, e = function (a, b) {
            for (var c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                if (b(e))return e
            }
        }, f = function (a, b) {
            for (var c = 0, d = a.length; d > c; c++)if (!b(a[c]))return !1;
            return !0
        }, g = function (a, b) {
            return $.inArray(b, a)
        }, h = function (a, b) {
            return -1 !== g(a, b)
        }, i = function (a, b) {
            return b = b || func.self, a.reduce(function (a, c) {
                return a + b(c)
            }, 0)
        }, j = function (a) {
            for (var b = [], c = -1, d = a.length; ++c < d;)b[c] = a[c];
            return b
        }, k = function (a) {
            return !a || !a.length
        }, l = function (c, e) {
            if (!c.length)return [];
            var f = d(c);
            return f.reduce(function (a, c) {
                var d = b(a);
                return e(b(d), c) ? d[d.length] = c : a[a.length] = [c], a
            }, [[a(c)]])
        }, m = function (a) {
            for (var b = [], c = 0, d = a.length; d > c; c++)a[c] && b.push(a[c]);
            return b
        }, n = function (a) {
            for (var b = [], c = 0, d = a.length; d > c; c++)h(b, a[c]) || b.push(a[c]);
            return b
        }, o = function (a, b) {
            var c = g(a, b);
            return -1 === c ? null : a[c + 1]
        }, p = function (a, b) {
            var c = g(a, b);
            return -1 === c ? null : a[c - 1]
        };
        return {
            head: a,
            last: b,
            initial: c,
            tail: d,
            prev: p,
            next: o,
            find: e,
            contains: h,
            all: f,
            sum: i,
            from: j,
            isEmpty: k,
            clusterBy: l,
            compact: m,
            unique: n
        }
    }(), isSupportAmd = "function" == typeof define && define.amd, isFontInstalled = function (a) {
        var b = "Comic Sans MS" === a ? "Courier New" : "Comic Sans MS", c = $("<div>").css({
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            fontSize: "200px"
        }).text("mmmmmmmmmwwwwwww").appendTo(document.body), d = c.css("fontFamily", b).width(), e = c.css("fontFamily", a + "," + b).width();
        return c.remove(), d !== e
    }, userAgent = navigator.userAgent, isMSIE = /MSIE|Trident/i.test(userAgent), browserVersion;
    if (isMSIE) {
        var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
        matches && (browserVersion = parseFloat(matches[1])), matches = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(userAgent), matches && (browserVersion = parseFloat(matches[1]))
    }
    var isEdge = /Edge\/\d+/.test(userAgent), hasCodeMirror = !!window.CodeMirror;
    if (!hasCodeMirror && isSupportAmd && "undefined" != typeof require)if ("undefined" != typeof require.resolve)try {
        require.resolve("codemirror"), hasCodeMirror = !0
    } catch (e) {
    } else"undefined" != typeof eval("require").specified && (hasCodeMirror = eval("require").specified("codemirror"));
    var agent = {
        isMac: navigator.appVersion.indexOf("Mac") > -1,
        isMSIE: isMSIE,
        isEdge: isEdge,
        isFF: !isEdge && /firefox/i.test(userAgent),
        isPhantom: /PhantomJS/i.test(userAgent),
        isWebkit: !isEdge && /webkit/i.test(userAgent),
        isChrome: !isEdge && /chrome/i.test(userAgent),
        isSafari: !isEdge && /safari/i.test(userAgent),
        browserVersion: browserVersion,
        jqueryVersion: parseFloat($.fn.jquery),
        isSupportAmd: isSupportAmd,
        hasCodeMirror: hasCodeMirror,
        isFontInstalled: isFontInstalled,
        isW3CRangeSupport: !!document.createRange
    }, NBSP_CHAR = String.fromCharCode(160), ZERO_WIDTH_NBSP_CHAR = "\ufeff", dom = function () {
        var a = function (a) {
            return a && $(a).hasClass("note-editable")
        }, b = function (a) {
            return a && $(a).hasClass("note-control-sizing")
        }, c = function (a) {
            return a = a.toUpperCase(), function (b) {
                return b && b.nodeName.toUpperCase() === a
            }
        }, d = function (a) {
            return a && 3 === a.nodeType
        }, e = function (a) {
            return a && 1 === a.nodeType
        }, f = function (a) {
            return a && /^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(a.nodeName.toUpperCase())
        }, g = function (b) {
            return a(b) ? !1 : b && /^DIV|^P|^LI|^H[1-7]/.test(b.nodeName.toUpperCase())
        }, h = function (a) {
            return a && /^H[1-7]/.test(a.nodeName.toUpperCase())
        }, i = c("PRE"), j = c("LI"), k = function (a) {
            return g(a) && !j(a)
        }, l = c("TABLE"), m = c("DATA"), n = function (a) {
            return !(s(a) || o(a) || p(a) || g(a) || l(a) || r(a) || m(a))
        }, o = function (a) {
            return a && /^UL|^OL/.test(a.nodeName.toUpperCase())
        }, p = c("HR"), q = function (a) {
            return a && /^TD|^TH/.test(a.nodeName.toUpperCase())
        }, r = c("BLOCKQUOTE"), s = function (b) {
            return q(b) || r(b) || a(b)
        }, t = c("A"), u = function (a) {
            return n(a) && !!D(a, g)
        }, v = function (a) {
            return n(a) && !D(a, g)
        }, w = c("BODY"), x = function (a, b) {
            return a.nextSibling === b || a.previousSibling === b
        }, y = function (a, b) {
            b = b || func.ok;
            var c = [];
            return a.previousSibling && b(a.previousSibling) && c.push(a.previousSibling), c.push(a), a.nextSibling && b(a.nextSibling) && c.push(a.nextSibling), c
        }, z = agent.isMSIE && agent.browserVersion < 11 ? "&nbsp;" : "<br>", A = function (a) {
            return d(a) ? a.nodeValue.length : a ? a.childNodes.length : 0
        }, B = function (a) {
            var b = A(a);
            return 0 === b ? !0 : d(a) || 1 !== b || a.innerHTML !== z ? list.all(a.childNodes, d) && "" === a.innerHTML ? !0 : !1 : !0
        }, C = function (a) {
            f(a) || A(a) || (a.innerHTML = z)
        }, D = function (b, c) {
            for (; b;) {
                if (c(b))return b;
                if (a(b))break;
                b = b.parentNode
            }
            return null
        }, E = function (b, c) {
            for (b = b.parentNode; b && 1 === A(b);) {
                if (c(b))return b;
                if (a(b))break;
                b = b.parentNode
            }
            return null
        }, F = function (b, c) {
            c = c || func.fail;
            var d = [];
            return D(b, function (b) {
                return a(b) || d.push(b), c(b)
            }), d
        }, G = function (a, b) {
            var c = F(a);
            return list.last(c.filter(b))
        }, H = function (a, b) {
            for (var c = F(a), d = b; d; d = d.parentNode)if ($.inArray(d, c) > -1)return d;
            return null
        }, I = function (a, b) {
            b = b || func.fail;
            for (var c = []; a && !b(a);)c.push(a), a = a.previousSibling;
            return c
        }, J = function (a, b) {
            b = b || func.fail;
            for (var c = []; a && !b(a);)c.push(a), a = a.nextSibling;
            return c
        }, K = function (a, b) {
            var c = [];
            return b = b || func.ok, function d(e) {
                a !== e && b(e) && c.push(e);
                for (var f = 0, g = e.childNodes.length; g > f; f++)d(e.childNodes[f])
            }(a), c
        }, L = function (a, b) {
            var c = a.parentNode, d = $("<" + b + ">")[0];
            return c.insertBefore(d, a), d.appendChild(a), d
        }, M = function (a, b) {
            var c = b.nextSibling, d = b.parentNode;
            return c ? d.insertBefore(a, c) : d.appendChild(a), a
        }, N = function (a, b) {
            return $.each(b, function (b, c) {
                a.appendChild(c)
            }), a
        }, O = function (a) {
            return 0 === a.offset
        }, P = function (a) {
            return a.offset === A(a.node)
        }, Q = function (a) {
            return O(a) || P(a)
        }, R = function (a, b) {
            for (; a && a !== b;) {
                if (0 !== V(a))return !1;
                a = a.parentNode
            }
            return !0
        }, S = function (a, b) {
            if (!b)return !1;
            for (; a && a !== b;) {
                if (V(a) !== A(a.parentNode) - 1)return !1;
                a = a.parentNode
            }
            return !0
        }, T = function (a, b) {
            return O(a) && R(a.node, b)
        }, U = function (a, b) {
            return P(a) && S(a.node, b)
        }, V = function (a) {
            for (var b = 0; a = a.previousSibling;)b += 1;
            return b
        }, W = function (a) {
            return !!(a && a.childNodes && a.childNodes.length)
        }, X = function (b, c) {
            var d, e;
            if (0 === b.offset) {
                if (a(b.node))return null;
                d = b.node.parentNode, e = V(b.node)
            } else W(b.node) ? (d = b.node.childNodes[b.offset - 1], e = A(d)) : (d = b.node, e = c ? 0 : b.offset - 1);
            return {node: d, offset: e}
        }, Y = function (b, c) {
            var d, e;
            if (A(b.node) === b.offset) {
                if (a(b.node))return null;
                d = b.node.parentNode, e = V(b.node) + 1
            } else W(b.node) ? (d = b.node.childNodes[b.offset], e = 0) : (d = b.node, e = c ? A(b.node) : b.offset + 1);
            return {node: d, offset: e}
        }, Z = function (a, b) {
            return a.node === b.node && a.offset === b.offset
        }, _ = function (a) {
            if (d(a.node) || !W(a.node) || B(a.node))return !0;
            var b = a.node.childNodes[a.offset - 1], c = a.node.childNodes[a.offset];
            return b && !f(b) || c && !f(c) ? !1 : !0
        }, aa = function (a, b) {
            for (; a;) {
                if (b(a))return a;
                a = X(a)
            }
            return null
        }, ba = function (a, b) {
            for (; a;) {
                if (b(a))return a;
                a = Y(a)
            }
            return null
        }, ca = function (a) {
            if (!d(a.node))return !1;
            var b = a.node.nodeValue.charAt(a.offset - 1);
            return b && " " !== b && b !== NBSP_CHAR
        }, da = function (a, b, c, d) {
            for (var e = a; e && (c(e), !Z(e, b));) {
                var f = d && a.node !== e.node && b.node !== e.node;
                e = Y(e, f)
            }
        }, ea = function (a, b) {
            var c = F(b, func.eq(a));
            return c.map(V).reverse()
        }, fa = function (a, b) {
            for (var c = a, d = 0, e = b.length; e > d; d++)c = c.childNodes.length <= b[d] ? c.childNodes[c.childNodes.length - 1] : c.childNodes[b[d]];
            return c
        }, ga = function (a, b) {
            var c = b && b.isSkipPaddingBlankHTML, e = b && b.isNotSplitEdgePoint;
            if (Q(a) && (d(a.node) || e)) {
                if (O(a))return a.node;
                if (P(a))return a.node.nextSibling
            }
            if (d(a.node))return a.node.splitText(a.offset);
            var f = a.node.childNodes[a.offset], g = M(a.node.cloneNode(!1), a.node);
            return N(g, J(f)), c || (C(a.node), C(g)), g
        }, ha = function (a, b, c) {
            var d = F(b.node, func.eq(a));
            return d.length ? 1 === d.length ? ga(b, c) : d.reduce(function (a, d) {
                return a === b.node && (a = ga(b, c)), ga({node: d, offset: a ? dom.position(a) : A(d)}, c)
            }) : null
        }, ia = function (a, b) {
            var c, d, e = b ? g : s, f = F(a.node, e), h = list.last(f) || a.node;
            e(h) ? (c = f[f.length - 2], d = h) : (c = h, d = c.parentNode);
            var i = c && ha(c, a, {isSkipPaddingBlankHTML: b, isNotSplitEdgePoint: b});
            return i || d !== a.node || (i = a.node.childNodes[a.offset]), {rightNode: i, container: d}
        }, ja = function (a) {
            return document.createElement(a)
        }, ka = function (a) {
            return document.createTextNode(a)
        }, la = function (a, b) {
            if (a && a.parentNode) {
                if (a.removeNode)return a.removeNode(b);
                var c = a.parentNode;
                if (!b) {
                    var d, e, f = [];
                    for (d = 0, e = a.childNodes.length; e > d; d++)f.push(a.childNodes[d]);
                    for (d = 0, e = f.length; e > d; d++)c.insertBefore(f[d], a)
                }
                c.removeChild(a)
            }
        }, ma = function (b, c) {
            for (; b && !a(b) && c(b);) {
                var d = b.parentNode;
                la(b), b = d
            }
        }, na = function (a, b) {
            if (a.nodeName.toUpperCase() === b.toUpperCase())return a;
            var c = ja(b);
            return a.style.cssText && (c.style.cssText = a.style.cssText), N(c, list.from(a.childNodes)), M(c, a), la(a), c
        }, oa = c("TEXTAREA"), pa = function (a, b) {
            var c = oa(a[0]) ? a.val() : a.html();
            return b ? c.replace(/[\n\r]/g, "") : c
        }, qa = function (a, b) {
            var c = pa(a);
            if (b) {
                var d = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
                c = c.replace(d, function (a, b, c) {
                    c = c.toUpperCase();
                    var d = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(c) && !!b, e = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(c);
                    return a + (d || e ? "\n" : "")
                }), c = $.trim(c)
            }
            return c
        }, ra = function (a) {
            var b = $(a), c = b.offset(), d = b.outerHeight(!0);
            return {left: c.left, top: c.top + d}
        }, sa = function (a, b) {
            Object.keys(b).forEach(function (c) {
                a.on(c, b[c])
            })
        }, ta = function (a, b) {
            Object.keys(b).forEach(function (c) {
                a.off(c, b[c])
            })
        };
        return {
            NBSP_CHAR: NBSP_CHAR,
            ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
            blank: z,
            emptyPara: "<p>" + z + "</p>",
            makePredByNodeName: c,
            isEditable: a,
            isControlSizing: b,
            isText: d,
            isElement: e,
            isVoid: f,
            isPara: g,
            isPurePara: k,
            isHeading: h,
            isInline: n,
            isBlock: func.not(n),
            isBodyInline: v,
            isBody: w,
            isParaInline: u,
            isPre: i,
            isList: o,
            isTable: l,
            isData: m,
            isCell: q,
            isBlockquote: r,
            isBodyContainer: s,
            isAnchor: t,
            isDiv: c("DIV"),
            isLi: j,
            isBR: c("BR"),
            isSpan: c("SPAN"),
            isB: c("B"),
            isU: c("U"),
            isS: c("S"),
            isI: c("I"),
            isImg: c("IMG"),
            isTextarea: oa,
            isEmpty: B,
            isEmptyAnchor: func.and(t, B),
            isClosestSibling: x,
            withClosestSiblings: y,
            nodeLength: A,
            isLeftEdgePoint: O,
            isRightEdgePoint: P,
            isEdgePoint: Q,
            isLeftEdgeOf: R,
            isRightEdgeOf: S,
            isLeftEdgePointOf: T,
            isRightEdgePointOf: U,
            prevPoint: X,
            nextPoint: Y,
            isSamePoint: Z,
            isVisiblePoint: _,
            prevPointUntil: aa,
            nextPointUntil: ba,
            isCharPoint: ca,
            walkPoint: da,
            ancestor: D,
            singleChildAncestor: E,
            listAncestor: F,
            lastAncestor: G,
            listNext: J,
            listPrev: I,
            listDescendant: K,
            commonAncestor: H,
            wrap: L,
            insertAfter: M,
            appendChildNodes: N,
            position: V,
            hasChildren: W,
            makeOffsetPath: ea,
            fromOffsetPath: fa,
            splitTree: ha,
            splitPoint: ia,
            create: ja,
            createText: ka,
            remove: la,
            removeWhile: ma,
            replace: na,
            html: qa,
            value: pa,
            posFromPlaceholder: ra,
            attachEvents: sa,
            detachEvents: ta
        }
    }(), Context = function (a, b) {
        var c = this, d = $.summernote.ui;
        return this.memos = {}, this.modules = {}, this.layoutInfo = {}, this.options = b, this.initialize = function () {
            return this.layoutInfo = d.createLayout(a, b), this._initialize(), a.hide(), this
        }, this.destroy = function () {
            this._destroy(), a.removeData("summernote"), d.removeLayout(a, this.layoutInfo)
        }, this.reset = function () {
            var a = c.isDisabled();
            this.code(dom.emptyPara), this._destroy(), this._initialize(), a && c.disable()
        }, this._initialize = function () {
            var a = $.extend({}, this.options.buttons);
            Object.keys(a).forEach(function (b) {
                c.memo("button." + b, a[b])
            });
            var b = $.extend({}, this.options.modules, $.summernote.plugins || {});
            Object.keys(b).forEach(function (a) {
                c.module(a, b[a], !0)
            }), Object.keys(this.modules).forEach(function (a) {
                c.initializeModule(a)
            })
        }, this._destroy = function () {
            Object.keys(this.modules).reverse().forEach(function (a) {
                c.removeModule(a)
            }), Object.keys(this.memos).forEach(function (a) {
                c.removeMemo(a)
            })
        }, this.code = function (b) {
            var c = this.invoke("codeview.isActivated");
            return void 0 === b ? (this.invoke("codeview.sync"), c ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html()) : (c ? this.layoutInfo.codable.val(b) : this.layoutInfo.editable.html(b), a.val(b), this.triggerEvent("change", b), void 0)
        }, this.isDisabled = function () {
            return "false" === this.layoutInfo.editable.attr("contenteditable")
        }, this.enable = function () {
            this.layoutInfo.editable.attr("contenteditable", !0), this.invoke("toolbar.activate", !0)
        }, this.disable = function () {
            this.invoke("codeview.isActivated") && this.invoke("codeview.deactivate"), this.layoutInfo.editable.attr("contenteditable", !1), this.invoke("toolbar.deactivate", !0)
        }, this.triggerEvent = function () {
            var b = list.head(arguments), c = list.tail(list.from(arguments)), d = this.options.callbacks[func.namespaceToCamel(b, "on")];
            d && d.apply(a[0], c), a.trigger("summernote." + b, c)
        }, this.initializeModule = function (b) {
            var c = this.modules[b];
            c.shouldInitialize = c.shouldInitialize || func.ok, c.shouldInitialize() && (c.initialize && c.initialize(), c.events && dom.attachEvents(a, c.events))
        }, this.module = function (a, b, c) {
            return 1 === arguments.length ? this.modules[a] : (this.modules[a] = new b(this), void(c || this.initializeModule(a)))
        }, this.removeModule = function (b) {
            var c = this.modules[b];
            c.shouldInitialize() && (c.events && dom.detachEvents(a, c.events), c.destroy && c.destroy()), delete this.modules[b]
        }, this.memo = function (a, b) {
            return 1 === arguments.length ? this.memos[a] : void(this.memos[a] = b)
        }, this.removeMemo = function (a) {
            this.memos[a] && this.memos[a].destroy && this.memos[a].destroy(), delete this.memos[a]
        }, this.createInvokeHandler = function (a, b) {
            return function (d) {
                d.preventDefault(), c.invoke(a, b || $(d.target).closest("[data-value]").data("value"))
            }
        }, this.invoke = function () {
            var a = list.head(arguments), b = list.tail(list.from(arguments)), c = a.split("."), d = c.length > 1, e = d && list.head(c), f = d ? list.last(c) : list.head(c), g = this.modules[e || "editor"];
            return !e && this[f] ? this[f].apply(this, b) : g && g[f] && g.shouldInitialize() ? g[f].apply(g, b) : void 0
        }, this.initialize()
    };
    $.fn.extend({
        summernote: function () {
            var a = $.type(list.head(arguments)), b = "string" === a, c = "object" === a, d = c ? list.head(arguments) : {};
            d = $.extend({}, $.summernote.options, d), d.langInfo = $.extend(!0, {}, $.summernote.lang["en-US"], $.summernote.lang[d.lang]), d.icons = $.extend(!0, {}, $.summernote.options.icons, d.icons), this.each(function (a, b) {
                var c = $(b);
                if (!c.data("summernote")) {
                    var e = new Context(c, d);
                    c.data("summernote", e), c.data("summernote").triggerEvent("init", e.layoutInfo)
                }
            });
            var e = this.first();
            if (e.length) {
                var f = e.data("summernote");
                if (b)return f.invoke.apply(f, list.from(arguments));
                d.focus && f.invoke("editor.focus")
            }
            return this
        }
    });
    var Renderer = function (a, b, c, d) {
        this.render = function (e) {
            var f = $(a);
            if (c && c.contents && f.html(c.contents), c && c.className && f.addClass(c.className), c && c.data && $.each(c.data, function (a, b) {
                    f.attr("data-" + a, b)
                }), c && c.click && f.on("click", c.click), b) {
                var g = f.find(".note-children-container");
                b.forEach(function (a) {
                    a.render(g.length ? g : f)
                })
            }
            return d && d(f, c), c && c.callback && c.callback(f), e && e.append(f), f
        }
    }, renderer = {
        create: function (a, b) {
            return function () {
                var c = $.isArray(arguments[0]) ? arguments[0] : [], d = "object" == typeof arguments[1] ? arguments[1] : arguments[0];
                return d && d.children && (c = d.children), new Renderer(a, c, d, b)
            }
        }
    }, editor = renderer.create('<div class="note-editor note-frame panel panel-default"/>'), toolbar = renderer.create('<div class="note-toolbar panel-heading"/>'), editingArea = renderer.create('<div class="note-editing-area"/>'), codable = renderer.create('<textarea class="note-codable"/>'), editable = renderer.create('<div class="note-editable panel-body" contentEditable="true"/>'), statusbar = renderer.create(['<div class="note-statusbar">', '  <div class="note-resizebar">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', "  </div>", "</div>"].join("")), airEditor = renderer.create('<div class="note-editor"/>'), airEditable = renderer.create('<div class="note-editable" contentEditable="true"/>'), buttonGroup = renderer.create('<div class="note-btn-group btn-group">'), button = renderer.create('<button type="button" class="note-btn btn btn-default btn-sm" tabindex="-1">', function (a, b) {
        b && b.tooltip && a.attr({title: b.tooltip}).tooltip({container: "body", trigger: "hover", placement: "bottom"})
    }), dropdown = renderer.create('<div class="dropdown-menu">', function (a, b) {
        var c = $.isArray(b.items) ? b.items.map(function (a) {
            var c = "string" == typeof a ? a : a.value || "", d = b.template ? b.template(a) : a;
            return '<li><a href="#" data-value="' + c + '">' + d + "</a></li>"
        }).join("") : b.items;
        a.html(c)
    }), dropdownCheck = renderer.create('<div class="dropdown-menu note-check">', function (a, b) {
        var c = $.isArray(b.items) ? b.items.map(function (a) {
            var c = "string" == typeof a ? a : a.value || "", d = b.template ? b.template(a) : a;
            return '<li><a href="#" data-value="' + c + '">' + icon(b.checkClassName) + " " + d + "</a></li>"
        }).join("") : b.items;
        a.html(c)
    }), palette = renderer.create('<div class="note-color-palette"/>', function (a, b) {
        for (var c = [], d = 0, e = b.colors.length; e > d; d++) {
            for (var f = b.eventName, g = b.colors[d], h = [], i = 0, j = g.length; j > i; i++) {
                var k = g[i];
                h.push(['<button type="button" class="note-color-btn"', 'style="background-color:', k, '" ', 'data-event="', f, '" ', 'data-value="', k, '" ', 'title="', k, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(""))
            }
            c.push('<div class="note-color-row">' + h.join("") + "</div>")
        }
        a.html(c.join("")), a.find(".note-color-btn").tooltip({
            container: "body",
            trigger: "hover",
            placement: "bottom"
        })
    }), dialog = renderer.create('<div class="modal" aria-hidden="false" tabindex="-1"/>', function (a, b) {
        b.fade && a.addClass("fade"), a.html(['<div class="modal-dialog">', '  <div class="modal-content">', b.title ? '    <div class="modal-header">      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>      <h4 class="modal-title">' + b.title + "</h4>    </div>" : "", '    <div class="modal-body">' + b.body + "</div>", b.footer ? '    <div class="modal-footer">' + b.footer + "</div>" : "", "  </div>", "</div>"].join(""))
    }), popover = renderer.create(['<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', "</div>"].join(""), function (a, b) {
        var c = "undefined" != typeof b.direction ? b.direction : "bottom";
        a.addClass(c), b.hideArrow && a.find(".arrow").hide()
    }), icon = function (a, b) {
        return b = b || "i", "<" + b + ' class="' + a + '"/>'
    }, ui = {
        editor: editor,
        toolbar: toolbar,
        editingArea: editingArea,
        codable: codable,
        editable: editable,
        statusbar: statusbar,
        airEditor: airEditor,
        airEditable: airEditable,
        buttonGroup: buttonGroup,
        button: button,
        dropdown: dropdown,
        dropdownCheck: dropdownCheck,
        palette: palette,
        dialog: dialog,
        popover: popover,
        icon: icon,
        toggleBtn: function (a, b) {
            a.toggleClass("disabled", !b), a.attr("disabled", !b)
        },
        toggleBtnActive: function (a, b) {
            a.toggleClass("active", b)
        },
        onDialogShown: function (a, b) {
            a.one("shown.bs.modal", b)
        },
        onDialogHidden: function (a, b) {
            a.one("hidden.bs.modal", b)
        },
        showDialog: function (a) {
            a.modal("show")
        },
        hideDialog: function (a) {
            a.modal("hide")
        },
        createLayout: function (a, b) {
            var c = (b.airMode ? ui.airEditor([ui.editingArea([ui.airEditable()])]) : ui.editor([ui.toolbar(), ui.editingArea([ui.codable(), ui.editable()]), ui.statusbar()])).render();
            return c.insertAfter(a), {
                note: a,
                editor: c,
                toolbar: c.find(".note-toolbar"),
                editingArea: c.find(".note-editing-area"),
                editable: c.find(".note-editable"),
                codable: c.find(".note-codable"),
                statusbar: c.find(".note-statusbar")
            }
        },
        removeLayout: function (a, b) {
            a.html(b.editable.html()), b.editor.remove(), a.show()
        }
    };
    $.summernote = $.summernote || {lang: {}}, $.extend($.summernote.lang, {
        "en-US": {
            font: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline",
                clear: "Remove Font Style",
                height: "Line Height",
                name: "Font Family",
                strikethrough: "Strikethrough",
                subscript: "Subscript",
                superscript: "Superscript",
                size: "Font Size"
            },
            image: {
                image: "Picture",
                insert: "Insert Image",
                resizeFull: "Resize Full",
                resizeHalf: "Resize Half",
                resizeQuarter: "Resize Quarter",
                floatLeft: "Float Left",
                floatRight: "Float Right",
                floatNone: "Float None",
                shapeRounded: "Shape: Rounded",
                shapeCircle: "Shape: Circle",
                shapeThumbnail: "Shape: Thumbnail",
                shapeNone: "Shape: None",
                dragImageHere: "Drag image or text here",
                dropImage: "Drop image or Text",
                selectFromFiles: "Select from files",
                maximumFileSize: "Maximum file size",
                maximumFileSizeError: "Maximum file size exceeded.",
                url: "Image URL",
                remove: "Remove Image"
            },
            video: {
                video: "Video",
                videoLink: "Video Link",
                insert: "Insert Video",
                url: "Video URL?",
                providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)"
            },
            link: {
                link: "Link",
                insert: "Insert Link",
                unlink: "Unlink",
                edit: "Edit",
                textToDisplay: "Text to display",
                url: "To what URL should this link go?",
                openInNewWindow: "Open in new window"
            },
            table: {table: "Table"},
            hr: {insert: "Insert Horizontal Rule"},
            style: {
                style: "Style",
                normal: "Normal",
                blockquote: "Quote",
                pre: "Code",
                h1: "Header 1",
                h2: "Header 2",
                h3: "Header 3",
                h4: "Header 4",
                h5: "Header 5",
                h6: "Header 6"
            },
            lists: {unordered: "Unordered list", ordered: "Ordered list"},
            options: {help: "Help", fullscreen: "Full Screen", codeview: "Code View"},
            paragraph: {
                paragraph: "Paragraph",
                outdent: "Outdent",
                indent: "Indent",
                left: "Align left",
                center: "Align center",
                right: "Align right",
                justify: "Justify full"
            },
            color: {
                recent: "Recent Color",
                more: "More Color",
                background: "Background Color",
                foreground: "Foreground Color",
                transparent: "Transparent",
                setTransparent: "Set transparent",
                reset: "Reset",
                resetToDefault: "Reset to default"
            },
            shortcut: {
                shortcuts: "Keyboard shortcuts",
                close: "Close",
                textFormatting: "Text formatting",
                action: "Action",
                paragraphFormatting: "Paragraph formatting",
                documentStyle: "Document Style",
                extraKeys: "Extra keys"
            },
            help: {
                insertParagraph: "Insert Paragraph",
                undo: "Undoes the last command",
                redo: "Redoes the last command",
                tab: "Tab",
                untab: "Untab",
                bold: "Set a bold style",
                italic: "Set a italic style",
                underline: "Set a underline style",
                strikethrough: "Set a strikethrough style",
                removeFormat: "Clean a style",
                justifyLeft: "Set left align",
                justifyCenter: "Set center align",
                justifyRight: "Set right align",
                justifyFull: "Set full align",
                insertUnorderedList: "Toggle unordered list",
                insertOrderedList: "Toggle ordered list",
                outdent: "Outdent on current paragraph",
                indent: "Indent on current paragraph",
                formatPara: "Change current block's format as a paragraph(P tag)",
                formatH1: "Change current block's format as H1",
                formatH2: "Change current block's format as H2",
                formatH3: "Change current block's format as H3",
                formatH4: "Change current block's format as H4",
                formatH5: "Change current block's format as H5",
                formatH6: "Change current block's format as H6",
                insertHorizontalRule: "Insert horizontal rule",
                "linkDialog.show": "Show Link Dialog"
            },
            history: {undo: "Undo", redo: "Redo"},
            specialChar: {specialChar: "SPECIAL CHARACTERS", select: "Select Special characters"}
        }
    });
    var key = function () {
        var a = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            NUM0: 48,
            NUM1: 49,
            NUM2: 50,
            NUM3: 51,
            NUM4: 52,
            NUM5: 53,
            NUM6: 54,
            NUM7: 55,
            NUM8: 56,
            B: 66,
            E: 69,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            R: 82,
            S: 83,
            U: 85,
            V: 86,
            Y: 89,
            Z: 90,
            SLASH: 191,
            LEFTBRACKET: 219,
            BACKSLASH: 220,
            RIGHTBRACKET: 221
        };
        return {
            isEdit: function (b) {
                return list.contains([a.BACKSPACE, a.TAB, a.ENTER, a.SPACE], b)
            }, isMove: function (b) {
                return list.contains([a.LEFT, a.UP, a.RIGHT, a.DOWN], b)
            }, nameFromCode: func.invertObject(a), code: a
        }
    }(), range = function () {
        var a = function (a, b) {
            var c, d, e = a.parentElement(), f = document.body.createTextRange(), g = list.from(e.childNodes);
            for (c = 0; c < g.length; c++)if (!dom.isText(g[c])) {
                if (f.moveToElementText(g[c]), f.compareEndPoints("StartToStart", a) >= 0)break;
                d = g[c]
            }
            if (0 !== c && dom.isText(g[c - 1])) {
                var h = document.body.createTextRange(), i = null;
                h.moveToElementText(d || e), h.collapse(!d), i = d ? d.nextSibling : e.firstChild;
                var j = a.duplicate();
                j.setEndPoint("StartToStart", h);
                for (var k = j.text.replace(/[\r\n]/g, "").length; k > i.nodeValue.length && i.nextSibling;)k -= i.nodeValue.length, i = i.nextSibling;
                i.nodeValue;
                b && i.nextSibling && dom.isText(i.nextSibling) && k === i.nodeValue.length && (k -= i.nodeValue.length, i = i.nextSibling), e = i, c = k
            }
            return {cont: e, offset: c}
        }, b = function (a) {
            var b = function (a, c) {
                var d, e;
                if (dom.isText(a)) {
                    var f = dom.listPrev(a, func.not(dom.isText)), g = list.last(f).previousSibling;
                    d = g || a.parentNode, c += list.sum(list.tail(f), dom.nodeLength), e = !g
                } else {
                    if (d = a.childNodes[c] || a, dom.isText(d))return b(d, 0);
                    c = 0, e = !1
                }
                return {node: d, collapseToStart: e, offset: c}
            }, c = document.body.createTextRange(), d = b(a.node, a.offset);
            return c.moveToElementText(d.node), c.collapse(d.collapseToStart), c.moveStart("character", d.offset), c
        }, c = function (a, d, e, f) {
            this.sc = a, this.so = d, this.ec = e, this.eo = f;
            var g = function () {
                if (agent.isW3CRangeSupport) {
                    var c = document.createRange();
                    return c.setStart(a, d), c.setEnd(e, f), c
                }
                var g = b({node: a, offset: d});
                return g.setEndPoint("EndToEnd", b({node: e, offset: f})), g
            };
            this.getPoints = function () {
                return {sc: a, so: d, ec: e, eo: f}
            }, this.getStartPoint = function () {
                return {node: a, offset: d}
            }, this.getEndPoint = function () {
                return {node: e, offset: f}
            }, this.select = function () {
                var a = g();
                if (agent.isW3CRangeSupport) {
                    var b = document.getSelection();
                    b.rangeCount > 0 && b.removeAllRanges(), b.addRange(a)
                } else a.select();
                return this
            }, this.scrollIntoView = function (a) {
                var b = $(a).height();
                return a.scrollTop + b < this.sc.offsetTop && (a.scrollTop += Math.abs(a.scrollTop + b - this.sc.offsetTop)), this
            }, this.normalize = function () {
                var a = function (a, b) {
                    if (dom.isVisiblePoint(a) && !dom.isEdgePoint(a) || dom.isVisiblePoint(a) && dom.isRightEdgePoint(a) && !b || dom.isVisiblePoint(a) && dom.isLeftEdgePoint(a) && b || dom.isVisiblePoint(a) && dom.isBlock(a.node) && dom.isEmpty(a.node))return a;
                    var c = dom.ancestor(a.node, dom.isBlock);
                    if ((dom.isLeftEdgePointOf(a, c) || dom.isVoid(dom.prevPoint(a).node)) && !b || (dom.isRightEdgePointOf(a, c) || dom.isVoid(dom.nextPoint(a).node)) && b) {
                        if (dom.isVisiblePoint(a))return a;
                        b = !b
                    }
                    var d = b ? dom.nextPointUntil(dom.nextPoint(a), dom.isVisiblePoint) : dom.prevPointUntil(dom.prevPoint(a), dom.isVisiblePoint);
                    return d || a
                }, b = a(this.getEndPoint(), !1), d = this.isCollapsed() ? b : a(this.getStartPoint(), !0);
                return new c(d.node, d.offset, b.node, b.offset)
            }, this.nodes = function (a, b) {
                a = a || func.ok;
                var c = b && b.includeAncestor, d = b && b.fullyContains, e = this.getStartPoint(), f = this.getEndPoint(), g = [], h = [];
                return dom.walkPoint(e, f, function (b) {
                    if (!dom.isEditable(b.node)) {
                        var e;
                        d ? (dom.isLeftEdgePoint(b) && h.push(b.node), dom.isRightEdgePoint(b) && list.contains(h, b.node) && (e = b.node)) : e = c ? dom.ancestor(b.node, a) : b.node, e && a(e) && g.push(e)
                    }
                }, !0), list.unique(g)
            }, this.commonAncestor = function () {
                return dom.commonAncestor(a, e)
            }, this.expand = function (b) {
                var g = dom.ancestor(a, b), h = dom.ancestor(e, b);
                if (!g && !h)return new c(a, d, e, f);
                var i = this.getPoints();
                return g && (i.sc = g, i.so = 0), h && (i.ec = h, i.eo = dom.nodeLength(h)), new c(i.sc, i.so, i.ec, i.eo)
            }, this.collapse = function (b) {
                return b ? new c(a, d, a, d) : new c(e, f, e, f)
            }, this.splitText = function () {
                var b = a === e, g = this.getPoints();
                return dom.isText(e) && !dom.isEdgePoint(this.getEndPoint()) && e.splitText(f), dom.isText(a) && !dom.isEdgePoint(this.getStartPoint()) && (g.sc = a.splitText(d), g.so = 0, b && (g.ec = g.sc, g.eo = f - d)), new c(g.sc, g.so, g.ec, g.eo)
            }, this.deleteContents = function () {
                if (this.isCollapsed())return this;
                var a = this.splitText(), b = a.nodes(null, {fullyContains: !0}), d = dom.prevPointUntil(a.getStartPoint(), function (a) {
                    return !list.contains(b, a.node)
                }), e = [];
                return $.each(b, function (a, b) {
                    var c = b.parentNode;
                    d.node !== c && 1 === dom.nodeLength(c) && e.push(c), dom.remove(b, !1)
                }), $.each(e, function (a, b) {
                    dom.remove(b, !1)
                }), new c(d.node, d.offset, d.node, d.offset).normalize()
            };
            var h = function (b) {
                return function () {
                    var c = dom.ancestor(a, b);
                    return !!c && c === dom.ancestor(e, b)
                }
            };
            this.isOnEditable = h(dom.isEditable), this.isOnList = h(dom.isList), this.isOnAnchor = h(dom.isAnchor), this.isOnCell = h(dom.isCell), this.isOnData = h(dom.isData), this.isLeftEdgeOf = function (a) {
                if (!dom.isLeftEdgePoint(this.getStartPoint()))return !1;
                var b = dom.ancestor(this.sc, a);
                return b && dom.isLeftEdgeOf(this.sc, b)
            }, this.isCollapsed = function () {
                return a === e && d === f
            }, this.wrapBodyInlineWithPara = function () {
                if (dom.isBodyContainer(a) && dom.isEmpty(a))return a.innerHTML = dom.emptyPara, new c(a.firstChild, 0, a.firstChild, 0);
                var b = this.normalize();
                if (dom.isParaInline(a) || dom.isPara(a))return b;
                var d;
                if (dom.isInline(b.sc)) {
                    var e = dom.listAncestor(b.sc, func.not(dom.isInline));
                    d = list.last(e), dom.isInline(d) || (d = e[e.length - 2] || b.sc.childNodes[b.so])
                } else d = b.sc.childNodes[b.so > 0 ? b.so - 1 : 0];
                var f = dom.listPrev(d, dom.isParaInline).reverse();
                if (f = f.concat(dom.listNext(d.nextSibling, dom.isParaInline)), f.length) {
                    var g = dom.wrap(list.head(f), "p");
                    dom.appendChildNodes(g, list.tail(f))
                }
                return this.normalize()
            }, this.insertNode = function (a) {
                var b = this.wrapBodyInlineWithPara().deleteContents(), c = dom.splitPoint(b.getStartPoint(), dom.isInline(a));
                return c.rightNode ? c.rightNode.parentNode.insertBefore(a, c.rightNode) : c.container.appendChild(a), a
            }, this.pasteHTML = function (a) {
                var b = $("<div></div>").html(a)[0], c = list.from(b.childNodes), d = this.wrapBodyInlineWithPara().deleteContents();
                return c.reverse().map(function (a) {
                    return d.insertNode(a)
                }).reverse()
            }, this.toString = function () {
                var a = g();
                return agent.isW3CRangeSupport ? a.toString() : a.text
            }, this.getWordRange = function (a) {
                var b = this.getEndPoint();
                if (!dom.isCharPoint(b))return this;
                var d = dom.prevPointUntil(b, function (a) {
                    return !dom.isCharPoint(a)
                });
                return a && (b = dom.nextPointUntil(b, function (a) {
                    return !dom.isCharPoint(a)
                })), new c(d.node, d.offset, b.node, b.offset)
            }, this.bookmark = function (b) {
                return {s: {path: dom.makeOffsetPath(b, a), offset: d}, e: {path: dom.makeOffsetPath(b, e), offset: f}}
            }, this.paraBookmark = function (b) {
                return {
                    s: {path: list.tail(dom.makeOffsetPath(list.head(b), a)), offset: d},
                    e: {path: list.tail(dom.makeOffsetPath(list.last(b), e)), offset: f}
                }
            }, this.getClientRects = function () {
                var a = g();
                return a.getClientRects()
            }
        };
        return {
            create: function (a, b, d, e) {
                if (4 === arguments.length)return new c(a, b, d, e);
                if (2 === arguments.length)return d = a, e = b, new c(a, b, d, e);
                var f = this.createFromSelection();
                return f || 1 !== arguments.length ? f : (f = this.createFromNode(arguments[0]), f.collapse(dom.emptyPara === arguments[0].innerHTML))
            }, createFromSelection: function () {
                var b, d, e, f;
                if (agent.isW3CRangeSupport) {
                    var g = document.getSelection();
                    if (!g || 0 === g.rangeCount)return null;
                    if (dom.isBody(g.anchorNode))return null;
                    var h = g.getRangeAt(0);
                    b = h.startContainer, d = h.startOffset, e = h.endContainer, f = h.endOffset
                } else {
                    var i = document.selection.createRange(), j = i.duplicate();
                    j.collapse(!1);
                    var k = i;
                    k.collapse(!0);
                    var l = a(k, !0), m = a(j, !1);
                    dom.isText(l.node) && dom.isLeftEdgePoint(l) && dom.isTextNode(m.node) && dom.isRightEdgePoint(m) && m.node.nextSibling === l.node && (l = m), b = l.cont, d = l.offset, e = m.cont, f = m.offset
                }
                return new c(b, d, e, f)
            }, createFromNode: function (a) {
                var b = a, c = 0, d = a, e = dom.nodeLength(d);
                return dom.isVoid(b) && (c = dom.listPrev(b).length - 1, b = b.parentNode), dom.isBR(d) ? (e = dom.listPrev(d).length - 1, d = d.parentNode) : dom.isVoid(d) && (e = dom.listPrev(d).length, d = d.parentNode), this.create(b, c, d, e)
            }, createFromNodeBefore: function (a) {
                return this.createFromNode(a).collapse(!0)
            }, createFromNodeAfter: function (a) {
                return this.createFromNode(a).collapse()
            }, createFromBookmark: function (a, b) {
                var d = dom.fromOffsetPath(a, b.s.path), e = b.s.offset, f = dom.fromOffsetPath(a, b.e.path), g = b.e.offset;
                return new c(d, e, f, g)
            }, createFromParaBookmark: function (a, b) {
                var d = a.s.offset, e = a.e.offset, f = dom.fromOffsetPath(list.head(b), a.s.path), g = dom.fromOffsetPath(list.last(b), a.e.path);
                return new c(f, d, g, e)
            }
        }
    }(), async = function () {
        var a = function (a) {
            return $.Deferred(function (b) {
                $.extend(new FileReader, {
                    onload: function (a) {
                        var c = a.target.result;
                        b.resolve(c)
                    }, onerror: function () {
                        b.reject(this)
                    }
                }).readAsDataURL(a)
            }).promise()
        }, b = function (a) {
            return $.Deferred(function (b) {
                var c = $("<img>");
                c.one("load", function () {
                    c.off("error abort"), b.resolve(c)
                }).one("error abort", function () {
                    c.off("load").detach(), b.reject(c)
                }).css({display: "none"}).appendTo(document.body).attr("src", a)
            }).promise()
        };
        return {
            readFileAsDataURL: a, createImage: b
        }
    }(), History = function (a) {
        var b = [], c = -1, d = a[0], e = function () {
            var b = range.create(d), c = {s: {path: [], offset: 0}, e: {path: [], offset: 0}};
            return {contents: a.html(), bookmark: b ? b.bookmark(d) : c}
        }, f = function (b) {
            null !== b.contents && a.html(b.contents), null !== b.bookmark && range.createFromBookmark(d, b.bookmark).select()
        };
        this.rewind = function () {
            a.html() !== b[c].contents && this.recordUndo(), c = 0, f(b[c])
        }, this.reset = function () {
            b = [], c = -1, a.html(""), this.recordUndo()
        }, this.undo = function () {
            a.html() !== b[c].contents && this.recordUndo(), c > 0 && (c--, f(b[c]))
        }, this.redo = function () {
            b.length - 1 > c && (c++, f(b[c]))
        }, this.recordUndo = function () {
            c++, b.length > c && (b = b.slice(0, c)), b.push(e())
        }
    }, Style = function () {
        var a = function (a, b) {
            if (agent.jqueryVersion < 1.9) {
                var c = {};
                return $.each(b, function (b, d) {
                    c[d] = a.css(d)
                }), c
            }
            return a.css.call(a, b)
        };
        this.fromNode = function (b) {
            var c = ["font-family", "font-size", "text-align", "list-style-type", "line-height"], d = a(b, c) || {};
            return d["font-size"] = parseInt(d["font-size"], 10), d
        }, this.stylePara = function (a, b) {
            $.each(a.nodes(dom.isPara, {includeAncestor: !0}), function (a, c) {
                $(c).css(b)
            })
        }, this.styleNodes = function (a, b) {
            a = a.splitText();
            var c = b && b.nodeName || "SPAN", d = !(!b || !b.expandClosestSibling), e = !(!b || !b.onlyPartialContains);
            if (a.isCollapsed())return [a.insertNode(dom.create(c))];
            var f = dom.makePredByNodeName(c), g = a.nodes(dom.isText, {fullyContains: !0}).map(function (a) {
                return dom.singleChildAncestor(a, f) || dom.wrap(a, c)
            });
            if (d) {
                if (e) {
                    var h = a.nodes();
                    f = func.and(f, function (a) {
                        return list.contains(h, a)
                    })
                }
                return g.map(function (a) {
                    var b = dom.withClosestSiblings(a, f), c = list.head(b), d = list.tail(b);
                    return $.each(d, function (a, b) {
                        dom.appendChildNodes(c, b.childNodes), dom.remove(b)
                    }), list.head(b)
                })
            }
            return g
        }, this.current = function (a) {
            var b = $(dom.isElement(a.sc) ? a.sc : a.sc.parentNode), c = this.fromNode(b);
            try {
                c = $.extend(c, {
                    "font-bold": document.queryCommandState("bold") ? "bold" : "normal",
                    "font-italic": document.queryCommandState("italic") ? "italic" : "normal",
                    "font-underline": document.queryCommandState("underline") ? "underline" : "normal",
                    "font-subscript": document.queryCommandState("subscript") ? "subscript" : "normal",
                    "font-superscript": document.queryCommandState("superscript") ? "superscript" : "normal",
                    "font-strikethrough": document.queryCommandState("strikethrough") ? "strikethrough" : "normal"
                })
            } catch (d) {
            }
            if (a.isOnList()) {
                var e = ["circle", "disc", "disc-leading-zero", "square"], f = $.inArray(c["list-style-type"], e) > -1;
                c["list-style"] = f ? "unordered" : "ordered"
            } else c["list-style"] = "none";
            var g = dom.ancestor(a.sc, dom.isPara);
            if (g && g.style["line-height"])c["line-height"] = g.style.lineHeight; else {
                var h = parseInt(c["line-height"], 10) / parseInt(c["font-size"], 10);
                c["line-height"] = h.toFixed(1)
            }
            return c.anchor = a.isOnAnchor() && dom.ancestor(a.sc, dom.isAnchor), c.ancestors = dom.listAncestor(a.sc, dom.isEditable), c.range = a, c
        }
    }, Bullet = function () {
        var a = this;
        this.insertOrderedList = function (a) {
            this.toggleList("OL", a)
        }, this.insertUnorderedList = function (a) {
            this.toggleList("UL", a)
        }, this.indent = function (a) {
            var b = this, c = range.create(a).wrapBodyInlineWithPara(), d = c.nodes(dom.isPara, {includeAncestor: !0}), e = list.clusterBy(d, func.peq2("parentNode"));
            $.each(e, function (a, c) {
                var d = list.head(c);
                dom.isLi(d) ? b.wrapList(c, d.parentNode.nodeName) : $.each(c, function (a, b) {
                    $(b).css("marginLeft", function (a, b) {
                        return (parseInt(b, 10) || 0) + 25
                    })
                })
            }), c.select()
        }, this.outdent = function (a) {
            var b = this, c = range.create(a).wrapBodyInlineWithPara(), d = c.nodes(dom.isPara, {includeAncestor: !0}), e = list.clusterBy(d, func.peq2("parentNode"));
            $.each(e, function (a, c) {
                var d = list.head(c);
                dom.isLi(d) ? b.releaseList([c]) : $.each(c, function (a, b) {
                    $(b).css("marginLeft", function (a, b) {
                        return b = parseInt(b, 10) || 0, b > 25 ? b - 25 : ""
                    })
                })
            }), c.select()
        }, this.toggleList = function (b, c) {
            var d = range.create(c).wrapBodyInlineWithPara(), e = d.nodes(dom.isPara, {includeAncestor: !0}), f = d.paraBookmark(e), g = list.clusterBy(e, func.peq2("parentNode"));
            if (list.find(e, dom.isPurePara)) {
                var h = [];
                $.each(g, function (c, d) {
                    h = h.concat(a.wrapList(d, b))
                }), e = h
            } else {
                var i = d.nodes(dom.isList, {includeAncestor: !0}).filter(function (a) {
                    return !$.nodeName(a, b)
                });
                i.length ? $.each(i, function (a, c) {
                    dom.replace(c, b)
                }) : e = this.releaseList(g, !0)
            }
            range.createFromParaBookmark(f, e).select()
        }, this.wrapList = function (a, b) {
            var c = list.head(a), d = list.last(a), e = dom.isList(c.previousSibling) && c.previousSibling, f = dom.isList(d.nextSibling) && d.nextSibling, g = e || dom.insertAfter(dom.create(b || "UL"), d);
            return a = a.map(function (a) {
                return dom.isPurePara(a) ? dom.replace(a, "LI") : a
            }), dom.appendChildNodes(g, a), f && (dom.appendChildNodes(g, list.from(f.childNodes)), dom.remove(f)), a
        }, this.releaseList = function (a, b) {
            var c = [];
            return $.each(a, function (a, d) {
                var e = list.head(d), f = list.last(d), g = b ? dom.lastAncestor(e, dom.isList) : e.parentNode, h = g.childNodes.length > 1 ? dom.splitTree(g, {
                    node: f.parentNode,
                    offset: dom.position(f) + 1
                }, {isSkipPaddingBlankHTML: !0}) : null, i = dom.splitTree(g, {
                    node: e.parentNode,
                    offset: dom.position(e)
                }, {isSkipPaddingBlankHTML: !0});
                d = b ? dom.listDescendant(i, dom.isLi) : list.from(i.childNodes).filter(dom.isLi), (b || !dom.isList(g.parentNode)) && (d = d.map(function (a) {
                    return dom.replace(a, "P")
                })), $.each(list.from(d).reverse(), function (a, b) {
                    dom.insertAfter(b, g)
                });
                var j = list.compact([g, i, h]);
                $.each(j, function (a, b) {
                    var c = [b].concat(dom.listDescendant(b, dom.isList));
                    $.each(c.reverse(), function (a, b) {
                        dom.nodeLength(b) || dom.remove(b, !0)
                    })
                }), c = c.concat(d)
            }), c
        }
    }, Typing = function () {
        var a = new Bullet;
        this.insertTab = function (a, b) {
            var c = dom.createText(new Array(b + 1).join(dom.NBSP_CHAR));
            a = a.deleteContents(), a.insertNode(c, !0), a = range.create(c, b), a.select()
        }, this.insertParagraph = function (b) {
            var c = range.create(b);
            c = c.deleteContents(), c = c.wrapBodyInlineWithPara();
            var d, e = dom.ancestor(c.sc, dom.isPara);
            if (e) {
                if (dom.isEmpty(e) && dom.isLi(e))return void a.toggleList(e.parentNode.nodeName);
                if (dom.isEmpty(e) && dom.isPara(e) && dom.isBlockquote(e.parentNode))dom.insertAfter(e, e.parentNode), d = e; else {
                    d = dom.splitTree(e, c.getStartPoint());
                    var f = dom.listDescendant(e, dom.isEmptyAnchor);
                    f = f.concat(dom.listDescendant(d, dom.isEmptyAnchor)), $.each(f, function (a, b) {
                        dom.remove(b)
                    }), (dom.isHeading(d) || dom.isPre(d)) && dom.isEmpty(d) && (d = dom.replace(d, "p"))
                }
            } else {
                var g = c.sc.childNodes[c.so];
                d = $(dom.emptyPara)[0], g ? c.sc.insertBefore(d, g) : c.sc.appendChild(d)
            }
            range.create(d, 0).normalize().select().scrollIntoView(b)
        }
    }, Table = function () {
        this.tab = function (a, b) {
            var c = dom.ancestor(a.commonAncestor(), dom.isCell), d = dom.ancestor(c, dom.isTable), e = dom.listDescendant(d, dom.isCell), f = list[b ? "prev" : "next"](e, c);
            f && range.create(f, 0).select()
        }, this.createTable = function (a, b, c) {
            for (var d, e = [], f = 0; a > f; f++)e.push("<td>" + dom.blank + "</td>");
            d = e.join("");
            for (var g, h = [], i = 0; b > i; i++)h.push("<tr>" + d + "</tr>");
            g = h.join("");
            var j = $("<table>" + g + "</table>");
            return c && c.tableClassName && j.addClass(c.tableClassName), j[0]
        }
    }, KEY_BOGUS = "bogus", Editor = function (a) {
        var b = this, c = a.layoutInfo.note, d = a.layoutInfo.editor, e = a.layoutInfo.editable, f = a.options, g = f.langInfo, h = e[0], i = null, j = new Style, k = new Table, l = new Typing, m = new Bullet, n = new History(e);
        this.initialize = function () {
            e.on("keydown", function (c) {
                c.keyCode === key.code.ENTER && a.triggerEvent("enter", c), a.triggerEvent("keydown", c), c.isDefaultPrevented() || (f.shortcuts ? b.handleKeyMap(c) : b.preventDefaultEditableShortCuts(c))
            }).on("keyup", function (b) {
                a.triggerEvent("keyup", b)
            }).on("focus", function (b) {
                a.triggerEvent("focus", b)
            }).on("blur", function (b) {
                a.triggerEvent("blur", b)
            }).on("mousedown", function (b) {
                a.triggerEvent("mousedown", b)
            }).on("mouseup", function (b) {
                a.triggerEvent("mouseup", b)
            }).on("scroll", function (b) {
                a.triggerEvent("scroll", b)
            }).on("paste", function (b) {
                a.triggerEvent("paste", b)
            }), e.html(dom.html(c) || dom.emptyPara);
            var g = agent.isMSIE ? "DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted" : "input";
            e.on(g, func.debounce(function () {
                a.triggerEvent("change", e.html())
            }, 250)), d.on("focusin", function (b) {
                a.triggerEvent("focusin", b)
            }).on("focusout", function (b) {
                a.triggerEvent("focusout", b)
            }), f.airMode || (f.width && d.outerWidth(f.width), f.height && e.outerHeight(f.height), f.maxHeight && e.css("max-height", f.maxHeight), f.minHeight && e.css("min-height", f.minHeight)), n.recordUndo()
        }, this.destroy = function () {
            e.off()
        }, this.handleKeyMap = function (b) {
            var c = f.keyMap[agent.isMac ? "mac" : "pc"], d = [];
            b.metaKey && d.push("CMD"), b.ctrlKey && !b.altKey && d.push("CTRL"), b.shiftKey && d.push("SHIFT");
            var e = key.nameFromCode[b.keyCode];
            e && d.push(e);
            var g = c[d.join("+")];
            g ? (b.preventDefault(), a.invoke(g)) : key.isEdit(b.keyCode) && this.afterCommand()
        }, this.preventDefaultEditableShortCuts = function (a) {
            (a.ctrlKey || a.metaKey) && list.contains([66, 73, 85], a.keyCode) && a.preventDefault()
        }, this.createRange = function () {
            return this.focus(), range.create(h)
        }, this.saveRange = function (a) {
            i = this.createRange(), a && i.collapse().select()
        }, this.restoreRange = function () {
            i && (i.select(), this.focus())
        }, this.saveTarget = function (a) {
            e.data("target", a)
        }, this.clearTarget = function () {
            e.removeData("target")
        }, this.restoreTarget = function () {
            return e.data("target")
        }, this.currentStyle = function () {
            var a = range.create();
            return a && (a = a.normalize()), a ? j.current(a) : j.fromNode(e)
        }, this.styleFromNode = function (a) {
            return j.fromNode(a)
        }, this.undo = function () {
            a.triggerEvent("before.command", e.html()), n.undo(), a.triggerEvent("change", e.html())
        }, a.memo("help.undo", g.help.undo), this.redo = function () {
            a.triggerEvent("before.command", e.html()), n.redo(), a.triggerEvent("change", e.html())
        }, a.memo("help.redo", g.help.redo);
        for (var o = this.beforeCommand = function () {
            a.triggerEvent("before.command", e.html()), b.focus()
        }, p = this.afterCommand = function (b) {
            n.recordUndo(), b || a.triggerEvent("change", e.html())
        }, q = ["bold", "italic", "underline", "strikethrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "formatBlock", "removeFormat", "backColor", "foreColor", "fontName"], r = 0, s = q.length; s > r; r++)this[q[r]] = function (a) {
            return function (b) {
                o(), document.execCommand(a, !1, b), p(!0)
            }
        }(q[r]), a.memo("help." + q[r], g.help[q[r]]);
        this.tab = function () {
            var a = this.createRange();
            a.isCollapsed() && a.isOnCell() ? k.tab(a) : (o(), l.insertTab(a, f.tabSize), p())
        }, a.memo("help.tab", g.help.tab), this.untab = function () {
            var a = this.createRange();
            a.isCollapsed() && a.isOnCell() && k.tab(a, !0)
        }, a.memo("help.untab", g.help.untab), this.wrapCommand = function (a) {
            return function () {
                o(), a.apply(b, arguments), p()
            }
        }, this.insertParagraph = this.wrapCommand(function () {
            l.insertParagraph(h)
        }), a.memo("help.insertParagraph", g.help.insertParagraph), this.insertOrderedList = this.wrapCommand(function () {
            m.insertOrderedList(h)
        }), a.memo("help.insertOrderedList", g.help.insertOrderedList), this.insertUnorderedList = this.wrapCommand(function () {
            m.insertUnorderedList(h)
        }), a.memo("help.insertUnorderedList", g.help.insertUnorderedList), this.indent = this.wrapCommand(function () {
            m.indent(h)
        }), a.memo("help.indent", g.help.indent), this.outdent = this.wrapCommand(function () {
            m.outdent(h)
        }), a.memo("help.outdent", g.help.outdent), this.insertImage = function (b, c) {
            return async.createImage(b, c).then(function (a) {
                o(), "function" == typeof c ? c(a) : ("string" == typeof c && a.attr("data-filename", c), a.css("width", Math.min(e.width(), a.width()))), a.show(), range.create(h).insertNode(a[0]), range.createFromNodeAfter(a[0]).select(), p()
            }).fail(function (b) {
                a.triggerEvent("image.upload.error", b)
            })
        }, this.insertImages = function (c) {
            $.each(c, function (c, d) {
                var e = d.name;
                f.maximumImageFileSize && f.maximumImageFileSize < d.size ? a.triggerEvent("image.upload.error", g.image.maximumFileSizeError) : async.readFileAsDataURL(d).then(function (a) {
                    return b.insertImage(a, e)
                }).fail(function () {
                    a.triggerEvent("image.upload.error")
                })
            })
        }, this.insertImagesOrCallback = function (b) {
            var c = f.callbacks;
            c.onImageUpload ? a.triggerEvent("image.upload", b) : this.insertImages(b)
        }, this.insertNode = this.wrapCommand(function (a) {
            var b = this.createRange();
            b.insertNode(a), range.createFromNodeAfter(a).select()
        }), this.insertText = this.wrapCommand(function (a) {
            var b = this.createRange(), c = b.insertNode(dom.createText(a));
            range.create(c, dom.nodeLength(c)).select()
        }), this.getSelectedText = function () {
            var a = this.createRange();
            return a.isOnAnchor() && (a = range.createFromNode(dom.ancestor(a.sc, dom.isAnchor))), a.toString()
        }, this.pasteHTML = this.wrapCommand(function (a) {
            var b = this.createRange().pasteHTML(a);
            range.createFromNodeAfter(list.last(b)).select()
        }), this.formatBlock = this.wrapCommand(function (a) {
            a = agent.isMSIE ? "<" + a + ">" : a, document.execCommand("FormatBlock", !1, a)
        }), this.formatPara = function () {
            this.formatBlock("P")
        }, a.memo("help.formatPara", g.help.formatPara);
        for (var r = 1; 6 >= r; r++)this["formatH" + r] = function (a) {
            return function () {
                this.formatBlock("H" + a)
            }
        }(r), a.memo("help.formatH" + r, g.help["formatH" + r]);
        this.fontSize = function (a) {
            var b = this.createRange();
            if (b && b.isCollapsed()) {
                var c = j.styleNodes(b), d = list.head(c);
                $(c).css({"font-size": a + "px"}), d && !dom.nodeLength(d) && (d.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR, range.createFromNodeAfter(d.firstChild).select(), e.data(KEY_BOGUS, d))
            } else o(), $(j.styleNodes(b)).css({"font-size": a + "px"}), p()
        }, this.insertHorizontalRule = this.wrapCommand(function () {
            var a = this.createRange().insertNode(dom.create("HR"));
            a.nextSibling && range.create(a.nextSibling, 0).normalize().select()
        }), a.memo("help.insertHorizontalRule", g.help.insertHorizontalRule), this.removeBogus = function () {
            var a = e.data(KEY_BOGUS);
            if (a) {
                var b = list.find(list.from(a.childNodes), dom.isText), c = b.nodeValue.indexOf(dom.ZERO_WIDTH_NBSP_CHAR);
                -1 !== c && b.deleteData(c, 1), dom.isEmpty(a) && dom.remove(a), e.removeData(KEY_BOGUS)
            }
        }, this.lineHeight = this.wrapCommand(function (a) {
            j.stylePara(this.createRange(), {lineHeight: a})
        }), this.unlink = function () {
            var a = this.createRange();
            if (a.isOnAnchor()) {
                var b = dom.ancestor(a.sc, dom.isAnchor);
                a = range.createFromNode(b), a.select(), o(), document.execCommand("unlink"), p()
            }
        }, this.createLink = this.wrapCommand(function (a) {
            var b = a.url, c = a.text, d = a.isNewWindow, e = a.range || this.createRange(), g = e.toString() !== c;
            "string" == typeof b && (b = b.trim()), f.onCreateLink && (b = f.onCreateLink(b));
            var h = [];
            if (g) {
                e = e.deleteContents();
                var i = e.insertNode($("<A>" + c + "</A>")[0]);
                h.push(i)
            } else h = j.styleNodes(e, {nodeName: "A", expandClosestSibling: !0, onlyPartialContains: !0});
            $.each(h, function (a, c) {
                b = /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(b) ? b : "http://" + b, $(c).attr("href", b), d ? $(c).attr("target", "_blank") : $(c).removeAttr("target")
            });
            var k = range.createFromNodeBefore(list.head(h)), l = k.getStartPoint(), m = range.createFromNodeAfter(list.last(h)), n = m.getEndPoint();
            range.create(l.node, l.offset, n.node, n.offset).select()
        }), this.getLinkInfo = function () {
            var a = this.createRange().expand(dom.isAnchor), b = $(list.head(a.nodes(dom.isAnchor)));
            return {
                range: a,
                text: a.toString(),
                isNewWindow: b.length ? "_blank" === b.attr("target") : !1,
                url: b.length ? b.attr("href") : ""
            }
        }, this.color = this.wrapCommand(function (a) {
            var b = a.foreColor, c = a.backColor;
            b && document.execCommand("foreColor", !1, b), c && document.execCommand("backColor", !1, c)
        }), this.insertTable = this.wrapCommand(function (a) {
            var b = a.split("x"), c = this.createRange().deleteContents();
            c.insertNode(k.createTable(b[0], b[1], f))
        }), this.floatMe = this.wrapCommand(function (a) {
            var b = $(this.restoreTarget());
            b.css("float", a)
        }), this.resize = this.wrapCommand(function (a) {
            var b = $(this.restoreTarget());
            b.css({width: 100 * a + "%", height: ""})
        }), this.resizeTo = function (a, b, c) {
            var d;
            if (c) {
                var e = a.y / a.x, f = b.data("ratio");
                d = {width: f > e ? a.x : a.y / f, height: f > e ? a.x * f : a.y}
            } else d = {width: a.x, height: a.y};
            b.css(d)
        }, this.removeMedia = this.wrapCommand(function () {
            var b = $(this.restoreTarget()).detach();
            a.triggerEvent("media.delete", b, e)
        }), this.hasFocus = function () {
            return e.is(":focus")
        }, this.focus = function () {
            this.hasFocus() || e.focus()
        }, this.isEmpty = function () {
            return dom.isEmpty(e[0]) || dom.emptyPara === e.html()
        }, this.empty = function () {
            a.invoke("code", dom.emptyPara)
        }
    }, Clipboard = function (a) {
        var b = this, c = a.layoutInfo.editable;
        this.events = {
            "summernote.keydown": function (c, d) {
                b.needKeydownHook() && (d.ctrlKey || d.metaKey) && d.keyCode === key.code.V && (a.invoke("editor.saveRange"), b.$paste.focus(), setTimeout(function () {
                    b.pasteByHook()
                }, 0))
            }
        }, this.needKeydownHook = function () {
            return agent.isMSIE && agent.browserVersion > 10 || agent.isFF
        }, this.initialize = function () {
            this.needKeydownHook() ? (this.$paste = $('<div tabindex="-1" />').attr("contenteditable", !0).css({
                position: "absolute",
                left: -1e5,
                opacity: 0
            }), c.before(this.$paste), this.$paste.on("paste", function (b) {
                a.triggerEvent("paste", b)
            })) : c.on("paste", this.pasteByEvent)
        }, this.destroy = function () {
            this.needKeydownHook() && (this.$paste.remove(), this.$paste = null)
        }, this.pasteByHook = function () {
            var b = this.$paste[0].firstChild;
            if (dom.isImg(b)) {
                for (var c = b.src, d = atob(c.split(",")[1]), e = new Uint8Array(d.length), f = 0; f < d.length; f++)e[f] = d.charCodeAt(f);
                var g = new Blob([e], {type: "image/png"});
                g.name = "clipboard.png", a.invoke("editor.restoreRange"), a.invoke("editor.focus"), a.invoke("editor.insertImagesOrCallback", [g])
            } else {
                var h = $("<div />").html(this.$paste.html()).html();
                a.invoke("editor.restoreRange"), a.invoke("editor.focus"), h && a.invoke("editor.pasteHTML", h)
            }
            this.$paste.empty()
        }, this.pasteByEvent = function (b) {
            var c = b.originalEvent.clipboardData;
            if (c && c.items && c.items.length) {
                var d = list.head(c.items);
                "file" === d.kind && -1 !== d.type.indexOf("image/") && a.invoke("editor.insertImagesOrCallback", [d.getAsFile()]), a.invoke("editor.afterCommand")
            }
        }
    }, Dropzone = function (a) {
        var b = $(document), c = a.layoutInfo.editor, d = a.layoutInfo.editable, e = a.options, f = e.langInfo, g = {}, h = $(['<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', "</div>"].join("")).prependTo(c), i = function () {
            Object.keys(g).forEach(function (a) {
                b.off(a.substr(2).toLowerCase(), g[a])
            }), g = {}
        };
        this.initialize = function () {
            e.disableDragAndDrop ? (g.onDrop = function (a) {
                a.preventDefault()
            }, b.on("drop", g.onDrop)) : this.attachDragAndDropEvent()
        }, this.attachDragAndDropEvent = function () {
            var e = $(), i = h.find(".note-dropzone-message");
            g.onDragenter = function (b) {
                var d = a.invoke("codeview.isActivated"), g = c.width() > 0 && c.height() > 0;
                d || e.length || !g || (c.addClass("dragover"), h.width(c.width()), h.height(c.height()), i.text(f.image.dragImageHere)), e = e.add(b.target)
            }, g.onDragleave = function (a) {
                e = e.not(a.target), e.length || c.removeClass("dragover")
            }, g.onDrop = function () {
                e = $(), c.removeClass("dragover")
            }, b.on("dragenter", g.onDragenter).on("dragleave", g.onDragleave).on("drop", g.onDrop), h.on("dragenter", function () {
                h.addClass("hover"), i.text(f.image.dropImage)
            }).on("dragleave", function () {
                h.removeClass("hover"), i.text(f.image.dragImageHere)
            }), h.on("drop", function (b) {
                var c = b.originalEvent.dataTransfer;
                c && c.files && c.files.length ? (b.preventDefault(), d.focus(), a.invoke("editor.insertImagesOrCallback", c.files)) : $.each(c.types, function (b, d) {
                    var e = c.getData(d);
                    d.toLowerCase().indexOf("text") > -1 ? a.invoke("editor.pasteHTML", e) : $(e).each(function () {
                        a.invoke("editor.insertNode", this)
                    })
                })
            }).on("dragover", !1)
        }, this.destroy = function () {
            i()
        }
    }, CodeMirror;
    agent.hasCodeMirror && (agent.isSupportAmd ? require(["codemirror"], function (a) {
        CodeMirror = a
    }) : CodeMirror = window.CodeMirror);
    var Codeview = function (a) {
        var b = a.layoutInfo.editor, c = a.layoutInfo.editable, d = a.layoutInfo.codable, e = a.options;
        this.sync = function () {
            var a = this.isActivated();
            a && agent.hasCodeMirror && d.data("cmEditor").save()
        }, this.isActivated = function () {
            return b.hasClass("codeview")
        }, this.toggle = function () {
            this.isActivated() ? this.deactivate() : this.activate(), a.triggerEvent("codeview.toggled")
        }, this.activate = function () {
            if (d.val(dom.html(c, e.prettifyHtml)), d.height(c.height()), a.invoke("toolbar.updateCodeview", !0), b.addClass("codeview"), d.focus(), agent.hasCodeMirror) {
                var f = CodeMirror.fromTextArea(d[0], e.codemirror);
                if (e.codemirror.tern) {
                    var g = new CodeMirror.TernServer(e.codemirror.tern);
                    f.ternServer = g, f.on("cursorActivity", function (a) {
                        g.updateArgHints(a)
                    })
                }
                f.setSize(null, c.outerHeight()), d.data("cmEditor", f)
            }
        }, this.deactivate = function () {
            if (agent.hasCodeMirror) {
                var f = d.data("cmEditor");
                d.val(f.getValue()), f.toTextArea()
            }
            var g = dom.value(d, e.prettifyHtml) || dom.emptyPara, h = c.html() !== g;
            c.html(g), c.height(e.height ? d.height() : "auto"), b.removeClass("codeview"), h && a.triggerEvent("change", c.html(), c), c.focus(), a.invoke("toolbar.updateCodeview", !1)
        }, this.destroy = function () {
            this.isActivated() && this.deactivate()
        }
    }, EDITABLE_PADDING = 24, Statusbar = function (a) {
        var b = $(document), c = a.layoutInfo.statusbar, d = a.layoutInfo.editable, e = a.options;
        this.initialize = function () {
            e.airMode || e.disableResizeEditor || c.on("mousedown", function (a) {
                a.preventDefault(), a.stopPropagation();
                var c = d.offset().top - b.scrollTop();
                b.on("mousemove", function (a) {
                    var b = a.clientY - (c + EDITABLE_PADDING);
                    b = e.minheight > 0 ? Math.max(b, e.minheight) : b, b = e.maxHeight > 0 ? Math.min(b, e.maxHeight) : b, d.height(b)
                }).one("mouseup", function () {
                    b.off("mousemove")
                })
            })
        }, this.destroy = function () {
            c.off(), c.remove()
        }
    }, Fullscreen = function (a) {
        var b = a.layoutInfo.editor, c = a.layoutInfo.toolbar, d = a.layoutInfo.editable, e = a.layoutInfo.codable, f = $(window), g = $("html, body");
        this.toggle = function () {
            var h = function (a) {
                d.css("height", a.h), e.css("height", a.h), e.data("cmeditor") && e.data("cmeditor").setsize(null, a.h)
            };
            b.toggleClass("fullscreen"), this.isFullscreen() ? (d.data("orgHeight", d.css("height")), f.on("resize", function () {
                h({h: f.height() - c.outerHeight()})
            }).trigger("resize"), g.css("overflow", "hidden")) : (f.off("resize"), h({h: d.data("orgHeight")}), g.css("overflow", "visible")), a.invoke("toolbar.updateFullscreen", this.isFullscreen())
        }, this.isFullscreen = function () {
            return b.hasClass("fullscreen")
        }
    }, Handle = function (a) {
        var b = this, c = $(document), d = a.layoutInfo.editingArea, e = a.options;
        this.events = {
            "summernote.mousedown": function (a, c) {
                b.update(c.target) && c.preventDefault()
            }, "summernote.keyup summernote.scroll summernote.change summernote.dialog.shown": function () {
                b.update()
            }
        }, this.initialize = function () {
            this.$handle = $(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', e.disableResizeImage ? "note-control-holder" : "note-control-sizing", ' note-control-se"></div>', e.disableResizeImage ? "" : '<div class="note-control-selection-info"></div>', "</div>", "</div>"].join("")).prependTo(d), this.$handle.on("mousedown", function (d) {
                if (dom.isControlSizing(d.target)) {
                    d.preventDefault(), d.stopPropagation();
                    var e = b.$handle.find(".note-control-selection").data("target"), f = e.offset(), g = c.scrollTop();
                    c.on("mousemove", function (c) {
                        a.invoke("editor.resizeTo", {
                            x: c.clientX - f.left,
                            y: c.clientY - (f.top - g)
                        }, e, !c.shiftKey), b.update(e[0])
                    }).one("mouseup", function (b) {
                        b.preventDefault(), c.off("mousemove"), a.invoke("editor.afterCommand")
                    }), e.data("ratio") || e.data("ratio", e.height() / e.width())
                }
            })
        }, this.destroy = function () {
            this.$handle.remove()
        }, this.update = function (b) {
            var c = dom.isImg(b), d = this.$handle.find(".note-control-selection");
            if (a.invoke("imagePopover.update", b), c) {
                var e = $(b), f = e.position(), g = {w: e.outerWidth(!0), h: e.outerHeight(!0)};
                d.css({display: "block", left: f.left, top: f.top, width: g.w, height: g.h}).data("target", e);
                var h = g.w + "x" + g.h;
                d.find(".note-control-selection-info").text(h), a.invoke("editor.saveTarget", b)
            } else this.hide();
            return c
        }, this.hide = function () {
            a.invoke("editor.clearTarget"), this.$handle.children().hide()
        }
    }, AutoLink = function (a) {
        var b = this, c = "http://", d = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
        this.events = {
            "summernote.keyup": function (a, c) {
                c.isDefaultPrevented() || b.handleKeyup(c)
            }, "summernote.keydown": function (a, c) {
                b.handleKeydown(c)
            }
        }, this.initialize = function () {
            this.lastWordRange = null
        }, this.destroy = function () {
            this.lastWordRange = null
        }, this.replace = function () {
            if (this.lastWordRange) {
                var b = this.lastWordRange.toString(), e = b.match(d);
                if (e && (e[1] || e[2])) {
                    var f = e[1] ? b : c + b, g = $("<a />").html(b).attr("href", f)[0];
                    this.lastWordRange.insertNode(g), this.lastWordRange = null, a.invoke("editor.focus")
                }
            }
        }, this.handleKeydown = function (b) {
            if (list.contains([key.code.ENTER, key.code.SPACE], b.keyCode)) {
                var c = a.invoke("editor.createRange").getWordRange();
                this.lastWordRange = c
            }
        }, this.handleKeyup = function (a) {
            list.contains([key.code.ENTER, key.code.SPACE], a.keyCode) && this.replace()
        }
    }, AutoSync = function (a) {
        var b = a.layoutInfo.note;
        this.events = {
            "summernote.change": function () {
                b.val(a.invoke("code"))
            }
        }, this.shouldInitialize = function () {
            return dom.isTextarea(b[0])
        }
    }, Placeholder = function (a) {
        var b = this, c = a.layoutInfo.editingArea, d = a.options;
        this.events = {
            "summernote.init summernote.change": function () {
                b.update()
            }, "summernote.codeview.toggled": function () {
                b.update()
            }
        }, this.shouldInitialize = function () {
            return !!d.placeholder
        }, this.initialize = function () {
            this.$placeholder = $('<div class="note-placeholder">'), this.$placeholder.on("click", function () {
                a.invoke("focus")
            }).text(d.placeholder).prependTo(c)
        }, this.destroy = function () {
            this.$placeholder.remove()
        }, this.update = function () {
            var b = !a.invoke("codeview.isActivated") && a.invoke("editor.isEmpty");
            this.$placeholder.toggle(b)
        }
    }, Buttons = function (a) {
        var b = this, c = $.summernote.ui, d = a.layoutInfo.toolbar, e = a.options, f = e.langInfo, g = func.invertObject(e.keyMap[agent.isMac ? "mac" : "pc"]), h = this.representShortcut = function (a) {
            var b = g[a];
            return e.shortcuts && b ? (agent.isMac && (b = b.replace("CMD", "⌘").replace("SHIFT", "⇧")), b = b.replace("BACKSLASH", "\\").replace("SLASH", "/").replace("LEFTBRACKET", "[").replace("RIGHTBRACKET", "]"), " (" + b + ")") : ""
        };
        this.initialize = function () {
            this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), this.fontInstalledMap = {}
        }, this.destroy = function () {
            delete this.fontInstalledMap
        }, this.isFontInstalled = function (a) {
            return b.fontInstalledMap.hasOwnProperty(a) || (b.fontInstalledMap[a] = agent.isFontInstalled(a) || list.contains(e.fontNamesIgnoreCheck, a)), b.fontInstalledMap[a]
        }, this.addToolbarButtons = function () {
            a.memo("button.style", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: c.icon(e.icons.magic) + " " + c.icon(e.icons.caret, "span"),
                    tooltip: f.style.style,
                    data: {toggle: "dropdown"}
                }), c.dropdown({
                    className: "dropdown-style", items: a.options.styleTags, template: function (a) {
                        "string" == typeof a && (a = {tag: a, title: f.style.hasOwnProperty(a) ? f.style[a] : a});
                        var b = a.tag, c = a.title, d = a.style ? ' style="' + a.style + '" ' : "", e = a.className ? ' class="' + a.className + '"' : "";
                        return "<" + b + d + e + ">" + c + "</" + b + ">"
                    }, click: a.createInvokeHandler("editor.formatBlock")
                })]).render()
            }), a.memo("button.bold", function () {
                return c.button({
                    className: "note-btn-bold",
                    contents: c.icon(e.icons.bold),
                    tooltip: f.font.bold + h("bold"),
                    click: a.createInvokeHandler("editor.bold")
                }).render()
            }), a.memo("button.italic", function () {
                return c.button({
                    className: "note-btn-italic",
                    contents: c.icon(e.icons.italic),
                    tooltip: f.font.italic + h("italic"),
                    click: a.createInvokeHandler("editor.italic")
                }).render()
            }), a.memo("button.underline", function () {
                return c.button({
                    className: "note-btn-underline",
                    contents: c.icon(e.icons.underline),
                    tooltip: f.font.underline + h("underline"),
                    click: a.createInvokeHandler("editor.underline")
                }).render()
            }), a.memo("button.clear", function () {
                return c.button({
                    contents: c.icon(e.icons.eraser),
                    tooltip: f.font.clear + h("removeFormat"),
                    click: a.createInvokeHandler("editor.removeFormat")
                }).render()
            }), a.memo("button.strikethrough", function () {
                return c.button({
                    className: "note-btn-strikethrough",
                    contents: c.icon(e.icons.strikethrough),
                    tooltip: f.font.strikethrough + h("strikethrough"),
                    click: a.createInvokeHandler("editor.strikethrough")
                }).render()
            }), a.memo("button.superscript", function () {
                return c.button({
                    className: "note-btn-superscript",
                    contents: c.icon(e.icons.superscript),
                    tooltip: f.font.superscript,
                    click: a.createInvokeHandler("editor.superscript")
                }).render()
            }), a.memo("button.subscript", function () {
                return c.button({
                    className: "note-btn-subscript",
                    contents: c.icon(e.icons.subscript),
                    tooltip: f.font.subscript,
                    click: a.createInvokeHandler("editor.subscript")
                }).render()
            }), a.memo("button.fontname", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: '<span class="note-current-fontname"/> ' + c.icon(e.icons.caret, "span"),
                    tooltip: f.font.name,
                    data: {toggle: "dropdown"}
                }), c.dropdownCheck({
                    className: "dropdown-fontname",
                    checkClassName: e.icons.menuCheck,
                    items: e.fontNames.filter(b.isFontInstalled),
                    template: function (a) {
                        return '<span style="font-family:' + a + '">' + a + "</span>"
                    },
                    click: a.createInvokeHandler("editor.fontName")
                })]).render()
            }), a.memo("button.fontsize", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: '<span class="note-current-fontsize"/>' + c.icon(e.icons.caret, "span"),
                    tooltip: f.font.size,
                    data: {toggle: "dropdown"}
                }), c.dropdownCheck({
                    className: "dropdown-fontsize",
                    checkClassName: e.icons.menuCheck,
                    items: e.fontSizes,
                    click: a.createInvokeHandler("editor.fontSize")
                })]).render()
            }), a.memo("button.color", function () {
                return c.buttonGroup({
                    className: "note-color",
                    children: [c.button({
                        className: "note-current-color-button",
                        contents: c.icon(e.icons.font + " note-recent-color"),
                        tooltip: f.color.recent,
                        click: function (b) {
                            var c = $(b.currentTarget);
                            a.invoke("editor.color", {
                                backColor: c.attr("data-backColor"),
                                foreColor: c.attr("data-foreColor")
                            })
                        },
                        callback: function (a) {
                            var b = a.find(".note-recent-color");
                            b.css("background-color", "#FFFF00"), a.attr("data-backColor", "#FFFF00")
                        }
                    }), c.button({
                        className: "dropdown-toggle",
                        contents: c.icon(e.icons.caret, "span"),
                        tooltip: f.color.more,
                        data: {toggle: "dropdown"}
                    }), c.dropdown({
                        items: ["<li>", '<div class="btn-group">', '  <div class="note-palette-title">' + f.color.background + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-default" data-event="backColor" data-value="inherit">', f.color.transparent, "    </button>", "  </div>", '  <div class="note-holder" data-event="backColor"/>', "</div>", '<div class="btn-group">', '  <div class="note-palette-title">' + f.color.foreground + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-default" data-event="removeFormat" data-value="foreColor">', f.color.resetToDefault, "    </button>", "  </div>", '  <div class="note-holder" data-event="foreColor"/>', "</div>", "</li>"].join(""),
                        callback: function (a) {
                            a.find(".note-holder").each(function () {
                                var a = $(this);
                                a.append(c.palette({colors: e.colors, eventName: a.data("event")}).render())
                            })
                        },
                        click: function (b) {
                            var c = $(b.target), d = c.data("event"), e = c.data("value");
                            if (d && e) {
                                var f = "backColor" === d ? "background-color" : "color", g = c.closest(".note-color").find(".note-recent-color"), h = c.closest(".note-color").find(".note-current-color-button");
                                g.css(f, e), h.attr("data-" + d, e), a.invoke("editor." + d, e)
                            }
                        }
                    })]
                }).render()
            }), a.memo("button.ul", function () {
                return c.button({
                    contents: c.icon(e.icons.unorderedlist),
                    tooltip: f.lists.unordered + h("insertUnorderedList"),
                    click: a.createInvokeHandler("editor.insertUnorderedList")
                }).render()
            }), a.memo("button.ol", function () {
                return c.button({
                    contents: c.icon(e.icons.orderedlist),
                    tooltip: f.lists.ordered + h("insertOrderedList"),
                    click: a.createInvokeHandler("editor.insertOrderedList")
                }).render()
            });
            var d = c.button({
                contents: c.icon(e.icons.alignLeft),
                tooltip: f.paragraph.left + h("justifyLeft"),
                click: a.createInvokeHandler("editor.justifyLeft")
            }), g = c.button({
                contents: c.icon(e.icons.alignCenter),
                tooltip: f.paragraph.center + h("justifyCenter"),
                click: a.createInvokeHandler("editor.justifyCenter")
            }), i = c.button({
                contents: c.icon(e.icons.alignRight),
                tooltip: f.paragraph.right + h("justifyRight"),
                click: a.createInvokeHandler("editor.justifyRight")
            }), j = c.button({
                contents: c.icon(e.icons.alignJustify),
                tooltip: f.paragraph.justify + h("justifyFull"),
                click: a.createInvokeHandler("editor.justifyFull")
            }), k = c.button({
                contents: c.icon(e.icons.outdent),
                tooltip: f.paragraph.outdent + h("outdent"),
                click: a.createInvokeHandler("editor.outdent")
            }), l = c.button({
                contents: c.icon(e.icons.indent),
                tooltip: f.paragraph.indent + h("indent"),
                click: a.createInvokeHandler("editor.indent")
            });
            a.memo("button.justifyLeft", func.invoke(d, "render")), a.memo("button.justifyCenter", func.invoke(g, "render")), a.memo("button.justifyRight", func.invoke(i, "render")), a.memo("button.justifyFull", func.invoke(j, "render")), a.memo("button.outdent", func.invoke(k, "render")), a.memo("button.indent", func.invoke(l, "render")), a.memo("button.paragraph", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: c.icon(e.icons.alignLeft) + " " + c.icon(e.icons.caret, "span"),
                    tooltip: f.paragraph.paragraph,
                    data: {toggle: "dropdown"}
                }), c.dropdown([c.buttonGroup({
                    className: "note-align", children: [d, g, i, j]
                }), c.buttonGroup({className: "note-list", children: [k, l]})])]).render()
            }), a.memo("button.height", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: c.icon(e.icons.textHeight) + " " + c.icon(e.icons.caret, "span"),
                    tooltip: f.font.height,
                    data: {toggle: "dropdown"}
                }), c.dropdownCheck({
                    items: e.lineHeights,
                    checkClassName: e.icons.menuCheck,
                    className: "dropdown-line-height",
                    click: a.createInvokeHandler("editor.lineHeight")
                })]).render()
            }), a.memo("button.table", function () {
                return c.buttonGroup([c.button({
                    className: "dropdown-toggle",
                    contents: c.icon(e.icons.table) + " " + c.icon(e.icons.caret, "span"),
                    tooltip: f.table.table,
                    data: {toggle: "dropdown"}
                }), c.dropdown({
                    className: "note-table",
                    items: ['<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', "</div>", '<div class="note-dimension-display">1 x 1</div>'].join("")
                })], {
                    callback: function (c) {
                        var d = c.find(".note-dimension-picker-mousecatcher");
                        d.css({
                            width: e.insertTableMaxSize.col + "em",
                            height: e.insertTableMaxSize.row + "em"
                        }).mousedown(a.createInvokeHandler("editor.insertTable")).on("mousemove", b.tableMoveHandler)
                    }
                }).render()
            }), a.memo("button.link", function () {
                return c.button({
                    contents: c.icon(e.icons.link),
                    tooltip: f.link.link + h("linkDialog.show"),
                    click: a.createInvokeHandler("linkDialog.show")
                }).render()
            }), a.memo("button.picture", function () {
                return c.button({
                    contents: c.icon(e.icons.picture),
                    tooltip: f.image.image,
                    click: a.createInvokeHandler("imageDialog.show")
                }).render()
            }), a.memo("button.video", function () {
                return c.button({
                    contents: c.icon(e.icons.video),
                    tooltip: f.video.video,
                    click: a.createInvokeHandler("videoDialog.show")
                }).render()
            }), a.memo("button.hr", function () {
                return c.button({
                    contents: c.icon(e.icons.minus),
                    tooltip: f.hr.insert + h("insertHorizontalRule"),
                    click: a.createInvokeHandler("editor.insertHorizontalRule")
                }).render()
            }), a.memo("button.fullscreen", function () {
                return c.button({
                    className: "btn-fullscreen",
                    contents: c.icon(e.icons.arrowsAlt),
                    tooltip: f.options.fullscreen,
                    click: a.createInvokeHandler("fullscreen.toggle")
                }).render()
            }), a.memo("button.codeview", function () {
                return c.button({
                    className: "btn-codeview",
                    contents: c.icon(e.icons.code),
                    tooltip: f.options.codeview,
                    click: a.createInvokeHandler("codeview.toggle")
                }).render()
            }), a.memo("button.redo", function () {
                return c.button({
                    contents: c.icon(e.icons.redo),
                    tooltip: f.history.redo + h("redo"),
                    click: a.createInvokeHandler("editor.redo")
                }).render()
            }), a.memo("button.undo", function () {
                return c.button({
                    contents: c.icon(e.icons.undo),
                    tooltip: f.history.undo + h("undo"),
                    click: a.createInvokeHandler("editor.undo")
                }).render()
            }), a.memo("button.help", function () {
                return c.button({
                    contents: c.icon(e.icons.question),
                    tooltip: f.options.help,
                    click: a.createInvokeHandler("helpDialog.show")
                }).render()
            })
        }, this.addImagePopoverButtons = function () {
            a.memo("button.imageSize100", function () {
                return c.button({
                    contents: '<span class="note-fontsize-10">100%</span>',
                    tooltip: f.image.resizeFull,
                    click: a.createInvokeHandler("editor.resize", "1")
                }).render()
            }), a.memo("button.imageSize50", function () {
                return c.button({
                    contents: '<span class="note-fontsize-10">50%</span>',
                    tooltip: f.image.resizeHalf,
                    click: a.createInvokeHandler("editor.resize", "0.5")
                }).render()
            }), a.memo("button.imageSize25", function () {
                return c.button({
                    contents: '<span class="note-fontsize-10">25%</span>',
                    tooltip: f.image.resizeQuarter,
                    click: a.createInvokeHandler("editor.resize", "0.25")
                }).render()
            }), a.memo("button.floatLeft", function () {
                return c.button({
                    contents: c.icon(e.icons.alignLeft),
                    tooltip: f.image.floatLeft,
                    click: a.createInvokeHandler("editor.floatMe", "left")
                }).render()
            }), a.memo("button.floatRight", function () {
                return c.button({
                    contents: c.icon(e.icons.alignRight),
                    tooltip: f.image.floatRight,
                    click: a.createInvokeHandler("editor.floatMe", "right")
                }).render()
            }), a.memo("button.floatNone", function () {
                return c.button({
                    contents: c.icon(e.icons.alignJustify),
                    tooltip: f.image.floatNone,
                    click: a.createInvokeHandler("editor.floatMe", "none")
                }).render()
            }), a.memo("button.removeMedia", function () {
                return c.button({
                    contents: c.icon(e.icons.trash),
                    tooltip: f.image.remove,
                    click: a.createInvokeHandler("editor.removeMedia")
                }).render()
            })
        }, this.addLinkPopoverButtons = function () {
            a.memo("button.linkDialogShow", function () {
                return c.button({
                    contents: c.icon(e.icons.link),
                    tooltip: f.link.edit,
                    click: a.createInvokeHandler("linkDialog.show")
                }).render()
            }), a.memo("button.unlink", function () {
                return c.button({
                    contents: c.icon(e.icons.unlink),
                    tooltip: f.link.unlink,
                    click: a.createInvokeHandler("editor.unlink")
                }).render()
            })
        }, this.build = function (b, d) {
            for (var e = 0, f = d.length; f > e; e++) {
                for (var g = d[e], h = g[0], i = g[1], j = c.buttonGroup({className: "note-" + h}).render(), k = 0, l = i.length; l > k; k++) {
                    var m = a.memo("button." + i[k]);
                    m && j.append("function" == typeof m ? m(a) : m)
                }
                j.appendTo(b)
            }
        }, this.updateCurrentStyle = function () {
            var c = a.invoke("editor.currentStyle");
            if (this.updateBtnStates({
                    ".note-btn-bold": function () {
                        return "bold" === c["font-bold"]
                    }, ".note-btn-italic": function () {
                        return "italic" === c["font-italic"]
                    }, ".note-btn-underline": function () {
                        return "underline" === c["font-underline"]
                    }, ".note-btn-subscript": function () {
                        return "subscript" === c["font-subscript"]
                    }, ".note-btn-superscript": function () {
                        return "superscript" === c["font-superscript"]
                    }, ".note-btn-strikethrough": function () {
                        return "strikethrough" === c["font-strikethrough"]
                    }
                }), c["font-family"]) {
                var e = c["font-family"].split(",").map(function (a) {
                    return a.replace(/[\'\"]/g, "").replace(/\s+$/, "").replace(/^\s+/, "")
                }), f = list.find(e, b.isFontInstalled);
                d.find(".dropdown-fontname li a").each(function () {
                    var a = $(this).data("value") + "" == f + "";
                    this.className = a ? "checked" : ""
                }), d.find(".note-current-fontname").text(f)
            }
            if (c["font-size"]) {
                var g = c["font-size"];
                d.find(".dropdown-fontsize li a").each(function () {
                    var a = $(this).data("value") + "" == g + "";
                    this.className = a ? "checked" : ""
                }), d.find(".note-current-fontsize").text(g)
            }
            if (c["line-height"]) {
                var h = c["line-height"];
                d.find(".dropdown-line-height li a").each(function () {
                    var a = $(this).data("value") + "" == h + "";
                    this.className = a ? "checked" : ""
                })
            }
        }, this.updateBtnStates = function (a) {
            $.each(a, function (a, b) {
                c.toggleBtnActive(d.find(a), b())
            })
        }, this.tableMoveHandler = function (a) {
            var b, c = 18, d = $(a.target.parentNode), f = d.next(), g = d.find(".note-dimension-picker-mousecatcher"), h = d.find(".note-dimension-picker-highlighted"), i = d.find(".note-dimension-picker-unhighlighted");
            if (void 0 === a.offsetX) {
                var j = $(a.target).offset();
                b = {x: a.pageX - j.left, y: a.pageY - j.top}
            } else b = {x: a.offsetX, y: a.offsetY};
            var k = {c: Math.ceil(b.x / c) || 1, r: Math.ceil(b.y / c) || 1};
            h.css({
                width: k.c + "em",
                height: k.r + "em"
            }), g.data("value", k.c + "x" + k.r), 3 < k.c && k.c < e.insertTableMaxSize.col && i.css({width: k.c + 1 + "em"}), 3 < k.r && k.r < e.insertTableMaxSize.row && i.css({height: k.r + 1 + "em"}), f.html(k.c + " x " + k.r)
        }
    }, Toolbar = function (a) {
        var b = $.summernote.ui, c = a.layoutInfo.note, d = a.layoutInfo.toolbar, e = a.options;
        this.shouldInitialize = function () {
            return !e.airMode
        }, this.initialize = function () {
            e.toolbar = e.toolbar || [], e.toolbar.length ? a.invoke("buttons.build", d, e.toolbar) : d.hide(), e.toolbarContainer && d.appendTo(e.toolbarContainer), c.on("summernote.keyup summernote.mouseup summernote.change", function () {
                a.invoke("buttons.updateCurrentStyle")
            }), a.invoke("buttons.updateCurrentStyle")
        }, this.destroy = function () {
            d.children().remove()
        }, this.updateFullscreen = function (a) {
            b.toggleBtnActive(d.find(".btn-fullscreen"), a)
        }, this.updateCodeview = function (a) {
            b.toggleBtnActive(d.find(".btn-codeview"), a), a ? this.deactivate() : this.activate()
        }, this.activate = function (a) {
            var c = d.find("button");
            a || (c = c.not(".btn-codeview")), b.toggleBtn(c, !0)
        }, this.deactivate = function (a) {
            var c = d.find("button");
            a || (c = c.not(".btn-codeview")), b.toggleBtn(c, !1)
        }
    }, LinkDialog = function (a) {
        var b = this, c = $.summernote.ui, d = a.layoutInfo.editor, e = a.options, f = e.langInfo;
        this.initialize = function () {
            var a = e.dialogsInBody ? $(document.body) : d, b = '<div class="form-group"><label>' + f.link.textToDisplay + '</label><input class="note-link-text form-control" type="text" /></div><div class="form-group"><label>' + f.link.url + '</label><input class="note-link-url form-control" type="text" value="http://" /></div>' + (e.disableLinkTarget ? "" : '<div class="checkbox"><label><input type="checkbox" checked> ' + f.link.openInNewWindow + "</label></div>"), g = '<button href="#" class="btn btn-primary note-link-btn disabled" disabled>' + f.link.insert + "</button>";
            this.$dialog = c.dialog({
                className: "link-dialog",
                title: f.link.insert,
                fade: e.dialogsFade,
                body: b,
                footer: g
            }).render().appendTo(a)
        }, this.destroy = function () {
            c.hideDialog(this.$dialog), this.$dialog.remove()
        }, this.bindEnterKey = function (a, b) {
            a.on("keypress", function (a) {
                a.keyCode === key.code.ENTER && b.trigger("click")
            })
        }, this.toggleLinkBtn = function (a, b, d) {
            c.toggleBtn(a, b.val() && d.val())
        }, this.showLinkDialog = function (d) {
            return $.Deferred(function (e) {
                var f = b.$dialog.find(".note-link-text"), g = b.$dialog.find(".note-link-url"), h = b.$dialog.find(".note-link-btn"), i = b.$dialog.find("input[type=checkbox]");
                c.onDialogShown(b.$dialog, function () {
                    a.triggerEvent("dialog.shown"), d.url || (d.url = d.text), f.val(d.text);
                    var c = function () {
                        b.toggleLinkBtn(h, f, g), d.text = f.val()
                    };
                    f.on("input", c).on("paste", function () {
                        setTimeout(c, 0)
                    });
                    var j = function () {
                        b.toggleLinkBtn(h, f, g), d.text || f.val(g.val())
                    };
                    g.on("input", j).on("paste", function () {
                        setTimeout(j, 0)
                    }).val(d.url).trigger("focus"), b.toggleLinkBtn(h, f, g), b.bindEnterKey(g, h), b.bindEnterKey(f, h), i.prop("checked", d.isNewWindow), h.one("click", function (a) {
                        a.preventDefault(), e.resolve({
                            range: d.range,
                            url: g.val(),
                            text: f.val(),
                            isNewWindow: i.is(":checked")
                        }), b.$dialog.modal("hide")
                    })
                }), c.onDialogHidden(b.$dialog, function () {
                    f.off("input paste keypress"), g.off("input paste keypress"), h.off("click"), "pending" === e.state() && e.reject()
                }), c.showDialog(b.$dialog)
            }).promise()
        }, this.show = function () {
            var b = a.invoke("editor.getLinkInfo");
            a.invoke("editor.saveRange"), this.showLinkDialog(b).then(function (b) {
                a.invoke("editor.restoreRange"), a.invoke("editor.createLink", b)
            }).fail(function () {
                a.invoke("editor.restoreRange")
            })
        }, a.memo("help.linkDialog.show", e.langInfo.help["linkDialog.show"])
    }, LinkPopover = function (a) {
        var b = this, c = $.summernote.ui, d = a.options;
        this.events = {
            "summernote.keyup summernote.mouseup summernote.change summernote.scroll": function () {
                b.update()
            }, "summernote.dialog.shown": function () {
                b.hide()
            }
        }, this.shouldInitialize = function () {
            return !list.isEmpty(d.popover.link)
        }, this.initialize = function () {
            this.$popover = c.popover({
                className: "note-link-popover", callback: function (a) {
                    var b = a.find(".popover-content");
                    b.prepend('<span><a target="_blank"></a>&nbsp;</span>')
                }
            }).render().appendTo("body");
            var b = this.$popover.find(".popover-content");
            a.invoke("buttons.build", b, d.popover.link)
        }, this.destroy = function () {
            this.$popover.remove()
        }, this.update = function () {
            if (!a.invoke("editor.hasFocus"))return void this.hide();
            var b = a.invoke("editor.createRange");
            if (b.isCollapsed() && b.isOnAnchor()) {
                var c = dom.ancestor(b.sc, dom.isAnchor), d = $(c).attr("href");
                this.$popover.find("a").attr("href", d).html(d);
                var e = dom.posFromPlaceholder(c);
                this.$popover.css({display: "block", left: e.left, top: e.top})
            } else this.hide()
        }, this.hide = function () {
            this.$popover.hide()
        }
    }, ImageDialog = function (a) {
        var b = this, c = $.summernote.ui, d = a.layoutInfo.editor, e = a.options, f = e.langInfo;
        this.initialize = function () {
            var a = e.dialogsInBody ? $(document.body) : d, b = "";
            if (e.maximumImageFileSize) {
                var g = Math.floor(Math.log(e.maximumImageFileSize) / Math.log(1024)), h = 1 * (e.maximumImageFileSize / Math.pow(1024, g)).toFixed(2) + " " + " KMGTP"[g] + "B";
                b = "<small>" + f.image.maximumFileSize + " : " + h + "</small>"
            }
            var i = '<div class="form-group note-group-select-from-files"><label>' + f.image.selectFromFiles + '</label><input class="note-image-input form-control" type="file" name="files" accept="image/*" multiple="multiple" />' + b + '</div><div class="form-group note-group-image-url" style="overflow:auto;"><label>' + f.image.url + '</label><input class="note-image-url form-control col-md-12" type="text" /></div>', j = '<button href="#" class="btn btn-primary note-image-btn disabled" disabled>' + f.image.insert + "</button>";
            this.$dialog = c.dialog({
                title: f.image.insert,
                fade: e.dialogsFade,
                body: i,
                footer: j
            }).render().appendTo(a)
        }, this.destroy = function () {
            c.hideDialog(this.$dialog), this.$dialog.remove()
        }, this.bindEnterKey = function (a, b) {
            a.on("keypress", function (a) {
                a.keyCode === key.code.ENTER && b.trigger("click")
            })
        }, this.show = function () {
            a.invoke("editor.saveRange"), this.showImageDialog().then(function (d) {
                c.hideDialog(b.$dialog), a.invoke("editor.restoreRange"), "string" == typeof d ? a.invoke("editor.insertImage", d) : a.invoke("editor.insertImagesOrCallback", d)
            }).fail(function () {
                a.invoke("editor.restoreRange")
            })
        }, this.showImageDialog = function () {
            return $.Deferred(function (d) {
                var e = b.$dialog.find(".note-image-input"), f = b.$dialog.find(".note-image-url"), g = b.$dialog.find(".note-image-btn");
                c.onDialogShown(b.$dialog, function () {
                    a.triggerEvent("dialog.shown"), e.replaceWith(e.clone().on("change", function () {
                        d.resolve(this.files || this.value)
                    }).val("")), g.click(function (a) {
                        a.preventDefault(), d.resolve(f.val())
                    }), f.on("keyup paste", function () {
                        var a = f.val();
                        c.toggleBtn(g, a)
                    }).val("").trigger("focus"), b.bindEnterKey(f, g)
                }), c.onDialogHidden(b.$dialog, function () {
                    e.off("change"), f.off("keyup paste keypress"), g.off("click"), "pending" === d.state() && d.reject()
                }), c.showDialog(b.$dialog)
            })
        }
    }, ImagePopover = function (a) {
        var b = $.summernote.ui, c = a.options;
        this.shouldInitialize = function () {
            return !list.isEmpty(c.popover.image)
        }, this.initialize = function () {
            this.$popover = b.popover({className: "note-image-popover"}).render().appendTo("body");
            var d = this.$popover.find(".popover-content");
            a.invoke("buttons.build", d, c.popover.image)
        }, this.destroy = function () {
            this.$popover.remove()
        }, this.update = function (a) {
            if (dom.isImg(a)) {
                var b = dom.posFromPlaceholder(a);
                this.$popover.css({display: "block", left: b.left, top: b.top})
            } else this.hide()
        }, this.hide = function () {
            this.$popover.hide()
        }
    }, VideoDialog = function (a) {
        var b = this, c = $.summernote.ui, d = a.layoutInfo.editor, e = a.options, f = e.langInfo;
        this.initialize = function () {
            var a = e.dialogsInBody ? $(document.body) : d, b = '<div class="form-group row-fluid"><label>' + f.video.url + ' <small class="text-muted">' + f.video.providers + '</small></label><input class="note-video-url form-control span12" type="text" /></div>', g = '<button href="#" class="btn btn-primary note-video-btn disabled" disabled>' + f.video.insert + "</button>";
            this.$dialog = c.dialog({
                title: f.video.insert,
                fade: e.dialogsFade,
                body: b,
                footer: g
            }).render().appendTo(a)
        }, this.destroy = function () {
            c.hideDialog(this.$dialog), this.$dialog.remove()
        }, this.bindEnterKey = function (a, b) {
            a.on("keypress", function (a) {
                a.keyCode === key.code.ENTER && b.trigger("click")
            })
        }, this.createVideoNode = function (a) {
            var b, c = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/, d = a.match(c), e = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/, f = a.match(e), g = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/, h = a.match(g), i = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/, j = a.match(i), k = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/, l = a.match(k), m = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/, n = a.match(m), o = /^.+.(mp4|m4v)$/, p = a.match(o), q = /^.+.(ogg|ogv)$/, r = a.match(q), s = /^.+.(webm)$/, t = a.match(s);
            if (d && 11 === d[1].length) {
                var u = d[1];
                b = $("<iframe>").attr("frameborder", 0).attr("src", "//www.youtube.com/embed/" + u).attr("width", "640").attr("height", "360")
            } else if (f && f[0].length)b = $("<iframe>").attr("frameborder", 0).attr("src", "https://instagram.com/p/" + f[1] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true"); else if (h && h[0].length)b = $("<iframe>").attr("frameborder", 0).attr("src", h[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed"); else if (j && j[3].length)b = $("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("src", "//player.vimeo.com/video/" + j[3]).attr("width", "640").attr("height", "360"); else if (l && l[2].length)b = $("<iframe>").attr("frameborder", 0).attr("src", "//www.dailymotion.com/embed/video/" + l[2]).attr("width", "640").attr("height", "360"); else if (n && n[1].length)b = $("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "498").attr("width", "510").attr("src", "//player.youku.com/embed/" + n[1]); else {
                if (!(p || r || t))return !1;
                b = $("<video controls>").attr("src", a).attr("width", "640").attr("height", "360")
            }
            return b.addClass("note-video-clip"), b[0]
        }, this.show = function () {
            var d = a.invoke("editor.getSelectedText");
            a.invoke("editor.saveRange"), this.showVideoDialog(d).then(function (d) {
                c.hideDialog(b.$dialog), a.invoke("editor.restoreRange");
                var e = b.createVideoNode(d);
                e && a.invoke("editor.insertNode", e)
            }).fail(function () {
                a.invoke("editor.restoreRange")
            })
        }, this.showVideoDialog = function (d) {
            return $.Deferred(function (e) {
                var f = b.$dialog.find(".note-video-url"), g = b.$dialog.find(".note-video-btn");
                c.onDialogShown(b.$dialog, function () {
                    a.triggerEvent("dialog.shown"), f.val(d).on("input", function () {
                        c.toggleBtn(g, f.val())
                    }).trigger("focus"), g.click(function (a) {
                        a.preventDefault(), e.resolve(f.val())
                    }), b.bindEnterKey(f, g)
                }), c.onDialogHidden(b.$dialog, function () {
                    f.off("input"), g.off("click"), "pending" === e.state() && e.reject()
                }), c.showDialog(b.$dialog)
            })
        }
    }, HelpDialog = function (a) {
        var b = this, c = $.summernote.ui, d = a.layoutInfo.editor, e = a.options, f = e.langInfo;
        this.createShortCutList = function () {
            var b = e.keyMap[agent.isMac ? "mac" : "pc"];
            return Object.keys(b).map(function (c) {
                var d = b[c], e = $('<div><div class="help-list-item"/></div>');
                return e.append($("<label><kbd>" + c + "</kdb></label>").css({
                    width: 180,
                    "margin-right": 10
                })).append($("<span/>").html(a.memo("help." + d) || d)), e.html()
            }).join("")
        }, this.initialize = function () {
            var a = e.dialogsInBody ? $(document.body) : d, b = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.2</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', "</p>"].join("");
            this.$dialog = c.dialog({
                title: f.options.help,
                fade: e.dialogsFade,
                body: this.createShortCutList(),
                footer: b,
                callback: function (a) {
                    a.find(".modal-body").css({"max-height": 300, overflow: "scroll"})
                }
            }).render().appendTo(a)
        }, this.destroy = function () {
            c.hideDialog(this.$dialog), this.$dialog.remove()
        }, this.showHelpDialog = function () {
            return $.Deferred(function (d) {
                c.onDialogShown(b.$dialog, function () {
                    a.triggerEvent("dialog.shown"), d.resolve()
                }), c.showDialog(b.$dialog)
            }).promise()
        }, this.show = function () {
            a.invoke("editor.saveRange"), this.showHelpDialog().then(function () {
                a.invoke("editor.restoreRange")
            })
        }
    }, AirPopover = function (a) {
        var b = this, c = $.summernote.ui, d = a.options, e = 20;
        this.events = {
            "summernote.keyup summernote.mouseup summernote.scroll": function () {
                b.update()
            }, "summernote.change summernote.dialog.shown": function () {
                b.hide()
            }, "summernote.focusout": function (a, c) {
                agent.isFF || c.relatedTarget && dom.ancestor(c.relatedTarget, func.eq(b.$popover[0])) || b.hide()
            }
        }, this.shouldInitialize = function () {
            return d.airMode && !list.isEmpty(d.popover.air)
        }, this.initialize = function () {
            this.$popover = c.popover({className: "note-air-popover"}).render().appendTo("body");
            var b = this.$popover.find(".popover-content");
            a.invoke("buttons.build", b, d.popover.air)
        }, this.destroy = function () {
            this.$popover.remove()
        }, this.update = function () {
            var b = a.invoke("editor.currentStyle");
            if (b.range && !b.range.isCollapsed()) {
                var c = list.last(b.range.getClientRects());
                if (c) {
                    var d = func.rect2bnd(c);
                    this.$popover.css({
                        display: "block",
                        left: Math.max(d.left + d.width / 2, 0) - e,
                        top: d.top + d.height
                    })
                }
            } else this.hide()
        }, this.hide = function () {
            this.$popover.hide()
        }
    }, HintPopover = function (a) {
        var b = this, c = $.summernote.ui, d = 5, e = a.options.hint || [], f = a.options.hintDirection || "bottom", g = $.isArray(e) ? e : [e];
        this.events = {
            "summernote.keyup": function (a, c) {
                c.isDefaultPrevented() || b.handleKeyup(c)
            }, "summernote.keydown": function (a, c) {
                b.handleKeydown(c)
            }, "summernote.dialog.shown": function () {
                b.hide()
            }
        }, this.shouldInitialize = function () {
            return g.length > 0
        }, this.initialize = function () {
            this.lastWordRange = null, this.$popover = c.popover({
                className: "note-hint-popover",
                hideArrow: !0,
                direction: ""
            }).render().appendTo("body"), this.$popover.hide(), this.$content = this.$popover.find(".popover-content"), this.$content.on("click", ".note-hint-item", function () {
                b.$content.find(".active").removeClass("active"), $(this).addClass("active"), b.replace()
            })
        }, this.destroy = function () {
            this.$popover.remove()
        }, this.selectItem = function (a) {
            this.$content.find(".active").removeClass("active"), a.addClass("active"), this.$content[0].scrollTop = a[0].offsetTop - this.$content.innerHeight() / 2
        }, this.moveDown = function () {
            var a = this.$content.find(".note-hint-item.active"), b = a.next();
            if (b.length)this.selectItem(b); else {
                var c = a.parent().next();
                c.length || (c = this.$content.find(".note-hint-group").first()), this.selectItem(c.find(".note-hint-item").first())
            }
        }, this.moveUp = function () {
            var a = this.$content.find(".note-hint-item.active"), b = a.prev();
            if (b.length)this.selectItem(b); else {
                var c = a.parent().prev();
                c.length || (c = this.$content.find(".note-hint-group").last()), this.selectItem(c.find(".note-hint-item").last())
            }
        }, this.replace = function () {
            var b = this.$content.find(".note-hint-item.active");
            if (b.length) {
                var c = this.nodeFromItem(b);
                this.lastWordRange.insertNode(c), range.createFromNode(c).collapse().select(), this.lastWordRange = null, this.hide(), a.invoke("editor.focus")
            }
        }, this.nodeFromItem = function (a) {
            var b = g[a.data("index")], c = a.data("item"), d = b.content ? b.content(c) : c;
            return "string" == typeof d && (d = dom.createText(d)), d
        }, this.createItemTemplates = function (a, b) {
            var c = g[a];
            return b.map(function (b, d) {
                var e = $('<div class="note-hint-item"/>');
                return e.append(c.template ? c.template(b) : b + ""), e.data({
                    index: a,
                    item: b
                }), 0 === a && 0 === d && e.addClass("active"), e
            })
        }, this.handleKeydown = function (a) {
            this.$popover.is(":visible") && (a.keyCode === key.code.ENTER ? (a.preventDefault(), this.replace()) : a.keyCode === key.code.UP ? (a.preventDefault(), this.moveUp()) : a.keyCode === key.code.DOWN && (a.preventDefault(), this.moveDown()))
        }, this.searchKeyword = function (a, b, c) {
            var d = g[a];
            if (d && d.match.test(b) && d.search) {
                var e = d.match.exec(b);
                d.search(e[1], c)
            } else c()
        }, this.createGroup = function (a, c) {
            var d = $('<div class="note-hint-group note-hint-group-' + a + '"/>');
            return this.searchKeyword(a, c, function (c) {
                c = c || [], c.length && (d.html(b.createItemTemplates(a, c)), b.show())
            }), d
        }, this.handleKeyup = function (c) {
            if (list.contains([key.code.ENTER, key.code.UP, key.code.DOWN], c.keyCode)) {
                if (c.keyCode === key.code.ENTER && this.$popover.is(":visible"))return
            } else {
                var e = a.invoke("editor.createRange").getWordRange(), h = e.toString();
                if (g.length && h) {
                    this.$content.empty();
                    var i = func.rect2bnd(list.last(e.getClientRects()));
                    i && (this.$popover.hide(), this.lastWordRange = e, g.forEach(function (a, c) {
                        a.match.test(h) && b.createGroup(c, h).appendTo(b.$content)
                    }), "top" === f ? this.$popover.css({
                        left: i.left,
                        top: i.top - this.$popover.outerHeight() - d
                    }) : this.$popover.css({left: i.left, top: i.top + i.height + d}))
                } else this.hide()
            }
        }, this.show = function () {
            this.$popover.show()
        }, this.hide = function () {
            this.$popover.hide()
        }
    };
    $.summernote = $.extend($.summernote, {
        version: "0.8.2",
        ui: ui,
        dom: dom,
        plugins: {},
        options: {
            modules: {
                editor: Editor,
                clipboard: Clipboard,
                dropzone: Dropzone,
                codeview: Codeview,
                statusbar: Statusbar,
                fullscreen: Fullscreen,
                handle: Handle,
                hintPopover: HintPopover,
                autoLink: AutoLink,
                autoSync: AutoSync,
                placeholder: Placeholder,
                buttons: Buttons,
                toolbar: Toolbar,
                linkDialog: LinkDialog,
                linkPopover: LinkPopover,
                imageDialog: ImageDialog,
                imagePopover: ImagePopover,
                videoDialog: VideoDialog,
                helpDialog: HelpDialog,
                airPopover: AirPopover
            },
            buttons: {},
            lang: "en-US",
            toolbar: [["style", ["style"]], ["font", ["bold", "underline", "clear"]], ["fontname", ["fontname"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["table", ["table"]], ["insert", ["link", "picture", "video"]], ["view", ["fullscreen", "codeview", "help"]]],
            popover: {
                image: [["imagesize", ["imageSize100", "imageSize50", "imageSize25"]], ["float", ["floatLeft", "floatRight", "floatNone"]], ["remove", ["removeMedia"]]],
                link: [["link", ["linkDialogShow", "unlink"]]],
                air: [["color", ["color"]], ["font", ["bold", "underline", "clear"]], ["para", ["ul", "paragraph"]], ["table", ["table"]], ["insert", ["link", "picture"]]]
            },
            airMode: !1,
            width: null,
            height: null,
            focus: !1,
            tabSize: 4,
            styleWithSpan: !0,
            shortcuts: !0,
            textareaAutoSync: !0,
            direction: null,
            styleTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"],
            fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana"],
            fontSizes: ["8", "9", "10", "11", "12", "14", "18", "24", "36"],
            colors: [["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"], ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"], ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"], ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"], ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"], ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"], ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"], ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]],
            lineHeights: ["1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "3.0"],
            tableClassName: "table table-bordered",
            insertTableMaxSize: {col: 10, row: 10},
            dialogsInBody: !1,
            dialogsFade: !1,
            maximumImageFileSize: null,
            callbacks: {
                onInit: null,
                onFocus: null,
                onBlur: null,
                onEnter: null,
                onKeyup: null,
                onKeydown: null,
                onImageUpload: null,
                onImageUploadError: null
            },
            codemirror: {mode: "text/html", htmlMode: !0, lineNumbers: !0},
            keyMap: {
                pc: {
                    ENTER: "insertParagraph",
                    "CTRL+Z": "undo",
                    "CTRL+Y": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CTRL+B": "bold",
                    "CTRL+I": "italic",
                    "CTRL+U": "underline",
                    "CTRL+SHIFT+S": "strikethrough",
                    "CTRL+BACKSLASH": "removeFormat",
                    "CTRL+SHIFT+L": "justifyLeft",
                    "CTRL+SHIFT+E": "justifyCenter",
                    "CTRL+SHIFT+R": "justifyRight",
                    "CTRL+SHIFT+J": "justifyFull",
                    "CTRL+SHIFT+NUM7": "insertUnorderedList",
                    "CTRL+SHIFT+NUM8": "insertOrderedList",
                    "CTRL+LEFTBRACKET": "outdent",
                    "CTRL+RIGHTBRACKET": "indent",
                    "CTRL+NUM0": "formatPara",
                    "CTRL+NUM1": "formatH1",
                    "CTRL+NUM2": "formatH2",
                    "CTRL+NUM3": "formatH3",
                    "CTRL+NUM4": "formatH4",
                    "CTRL+NUM5": "formatH5",
                    "CTRL+NUM6": "formatH6",
                    "CTRL+ENTER": "insertHorizontalRule",
                    "CTRL+K": "linkDialog.show"
                },
                mac: {
                    ENTER: "insertParagraph",
                    "CMD+Z": "undo",
                    "CMD+SHIFT+Z": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CMD+B": "bold",
                    "CMD+I": "italic",
                    "CMD+U": "underline",
                    "CMD+SHIFT+S": "strikethrough",
                    "CMD+BACKSLASH": "removeFormat",
                    "CMD+SHIFT+L": "justifyLeft",
                    "CMD+SHIFT+E": "justifyCenter",
                    "CMD+SHIFT+R": "justifyRight",
                    "CMD+SHIFT+J": "justifyFull",
                    "CMD+SHIFT+NUM7": "insertUnorderedList",
                    "CMD+SHIFT+NUM8": "insertOrderedList",
                    "CMD+LEFTBRACKET": "outdent",
                    "CMD+RIGHTBRACKET": "indent",
                    "CMD+NUM0": "formatPara",
                    "CMD+NUM1": "formatH1",
                    "CMD+NUM2": "formatH2",
                    "CMD+NUM3": "formatH3",
                    "CMD+NUM4": "formatH4",
                    "CMD+NUM5": "formatH5",
                    "CMD+NUM6": "formatH6",
                    "CMD+ENTER": "insertHorizontalRule",
                    "CMD+K": "linkDialog.show"
                }
            },
            icons: {
                align: "note-icon-align",
                alignCenter: "note-icon-align-center",
                alignJustify: "note-icon-align-justify",
                alignLeft: "note-icon-align-left",
                alignRight: "note-icon-align-right",
                indent: "note-icon-align-indent",
                outdent: "note-icon-align-outdent",
                arrowsAlt: "note-icon-arrows-alt",
                bold: "note-icon-bold",
                caret: "note-icon-caret",
                circle: "note-icon-circle",
                close: "note-icon-close",
                code: "note-icon-code",
                eraser: "note-icon-eraser",
                font: "note-icon-font",
                frame: "note-icon-frame",
                italic: "note-icon-italic",
                link: "note-icon-link",
                unlink: "note-icon-chain-broken",
                magic: "note-icon-magic",
                menuCheck: "note-icon-check",
                minus: "note-icon-minus",
                orderedlist: "note-icon-orderedlist",
                pencil: "note-icon-pencil",
                picture: "note-icon-picture",
                question: "note-icon-question",
                redo: "note-icon-redo",
                square: "note-icon-square",
                strikethrough: "note-icon-strikethrough",
                subscript: "note-icon-subscript",
                superscript: "note-icon-superscript",
                table: "note-icon-table",
                textHeight: "note-icon-text-height",
                trash: "note-icon-trash",
                underline: "note-icon-underline",
                undo: "note-icon-undo",
                unorderedlist: "note-icon-unorderedlist",
                video: "note-icon-video"
            }
        }
    })
});
/*
 * FormCollections
 * Stuart Bradley
 * 2017-03-19
 *
 * JS for nesting of forms within forms.
 * Appends add and remove buttons dynamically,
 * as well as allowing for multilevel nesting
 * by defining the structure in
 * self.renamePrototype.
 */

function FormCollections(collection_classes) {

    // Button prototypes.
    self.prototype_buttons = {};
    self.prototype_buttons['files'] = '<button type="button" class="btn btn-statuses btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Status </button>';
    self.prototype_buttons['statuses'] = '<button type="button" class="btn btn-files btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add File </button>';
    self.prototype_buttons['omics_experiment_types'] = '<button type="button" class="btn btn-omics_experiment_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Type </button>';
    self.prototype_buttons['omics_experiment_sub_types'] = '<button type="button" class="btn btn-omics_experiment_sub_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Sub-Type </button>';
    self.prototype_buttons['samples'] = '<button type="button" class="btn btn-samples btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sample </button>';

    // Nesting relations for recursive button addition.
    self.relations = {};
    self.relations['omics_experiment_types'] = 'omics_experiment_sub_types';
    self.relations['omics_experiment_sub_types'] = 'samples';

    // Ul classes for nested relations.
    self.ul_classes = {};
    self.ul_classes['omics_experiment_sub_types'] = '<ul style="list-style-type: none;" class="col-omics_experiment_sub_types"></ul>';
    self.ul_classes['samples'] = '<ul style="list-style-type: none;" class="col-samples"></ul>';

    /*
     * Generates buttons for already present entities.
     */
    self.construct = function () {
        $.each(collection_classes, function (i, val) {
            var group = $('.col-' + val);
            // Add delete links to every LI group on the page.
            group.each(function () {
                $(this).children().each(function () {
                    // Check if tag is LI AND is NOT empty.
                    // There are unitialized LI tags that don't need buttons.
                    if ($(this).prop('tagName') == "LI" && $(this).children().length > 0) {
                        self.addDeleteLink($(this));
                    }
                });
            });

            // Add addNew events to every Add button the page.
            $(".btn-" + val).each(function () {
                var parent_ul = $(this).prev('ul');
                $(this).data('index', parent_ul.children().length);
                var div_name = val;
                $(this).on("click", function (e) {
                    e.preventDefault();
                    self.addNew(this, parent_ul, val);
                });
            });

        });
    };

    /**
     * onClick event handler -- adds a new input.
     */
    self.addNew = function (button, parent_ul, div_name) {
        // Get the data-prototype from div on form.
        var prototype = $('#proto-' + div_name).data('prototype');
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = self.renamePrototype(button, prototype, div_name);
        // If the newForm is nested, add the nested form to it as well.
        if (self.relations.hasOwnProperty(div_name)) {
            // Get child name and nested surrounding code.
            var nested_name = self.relations[div_name];
            var nested_ul = $(self.ul_classes[nested_name]);
            // Set index.
            nested_ul.data('index', parent_ul.data('index'));
            newForm.append(nested_ul);
            var new_button = $(self.prototype_buttons[nested_name]);
            $(new_button).data('index', 0);
            new_button.on("click", function (e) {
                // Recursive call.
                self.addNew(new_button, nested_ul, nested_name);
                e.preventDefault();
            });

        }

        // add a delete link to the new form
        newForm.append(new_button);
        self.addDeleteLink(newForm);

        parent_ul.append(newForm);

        return $(newForm);
    };

    /*
     * Adds a bootstrap delete button which removes the li element.
     */
    self.addDeleteLink = function (row) {
        var removeForm;
        // Correctly handle button vs form-control spacing.
        if ($(row).children().last().prop('tagName') == 'DIV') {
            removeForm = $('<br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        } else {
            removeForm = $('<br><br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        }
        row.append(removeForm);
        removeForm.on('click', function (e) {
            // prevent the link from creating a "#" on the URL
            e.preventDefault();

            // remove the li for the tag form
            row.remove();
        });
    };

    /*
     * Renames prototypes with correct indexing.
     *
     * If the structure changes in the form the id commands will
     * have to change.
     */
    self.renamePrototype = function (button, prototype, div_name) {
        var find, newForm, re, curr_index, id;
        newForm = prototype;

        /*
         * Statues, files, and omics_experiment_types
         * are single level forms - and can be indexed by the
         * data attribute on their single add buttons.
         */
        if (div_name == "statuses") {
            find = '__' + 'status' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
        } else if (div_name == "files") {
            find = '__' + 'file' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
        } else if (div_name == "omics_experiment_types") {
            find = '__' + 'exptype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
            /*
             * omics_experiment_sub_types is a child of
             * omics_experiment_types - sub_types gets it's index of it's
             * specific add button, and it's parents index
             * by getting the index of the parent selector.
             */
        } else if (div_name == "omics_experiment_sub_types") {
            find = '__' + 'expsubtype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);

            id = $(button).parent().find('div').children('select').attr('id');
            find = '__' + 'exptype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = /(\d+)_omicsExperimentTypeString/.exec(id)[1];
            newForm = newForm.replace(re, curr_index);
            /*
             * samples does a similar thing as above, just with two
             * levels of selector ids to find.
             */
        } else {
            find = '__' + 'samples' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);

            try {
                id = $(button).parent().find('div').children('select').attr('id');
                find = '__' + 'expsubtype' + '_prot__';
                re = new RegExp(find, 'g');
                curr_index = /omicsExperimentSubTypes_(\d+)/.exec(id)[1];
                newForm = newForm.replace(re, curr_index);

                find = '__' + 'exptype' + '_prot__';
                re = new RegExp(find, 'g');
                curr_index = /omicsExperimentTypes_(\d+)/.exec(id)[1];
                newForm = newForm.replace(re, curr_index);
            } catch (err) {
            }

        }
        return $(newForm);
    };

    self.construct();

}
/*
 * ExpSubTypeSelectionUpdater
 * Stuart Bradley
 * 2017-03-19
 *
 * Changes omicsExperimentSubTypes based on the
 * parent omicsExperimentType value.
 */
function ExpSubTypeSelectionUpdater(selection_relations) {
    /*
     * Creates on change events for all omicsExperimentType
     * changes (even ones added later).
     */
    self.construct = function () {
        var omics_experiment_selector = $('ul.col-omics_experiment_types');
        // Monitors experiment_type selects for change.
        // on selector allows for selectors to be added without adding new events.
        omics_experiment_selector.on('change', 'select[id$="omicsExperimentTypeString"]', function (e) {
            self.modify(e.target);
        });

        // Observes new sub_type additions and updates them accordingly.
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var nodes = mutation.addedNodes[0];
                var sub_type_select = $(nodes).find("select[id$='omicsExperimentSubTypeString']");
                // Checks if added node is a sub_type.
                if ($(sub_type_select).length) {
                    var sub_type_select_id = $(sub_type_select).attr('id').match(/^omics_experiment_omicsExperimentTypes_(\d+)/)[1];
                    var type_select = $('select#omics_experiment_omicsExperimentTypes_' + sub_type_select_id + '_omicsExperimentTypeString');
                    var parent_val = $("option:selected", type_select).text();
                    self.update_child(sub_type_select, parent_val);
                }

            });
        });

        var observerConfig = {
            subtree: true,
            childList: true
        };

        observer.observe(omics_experiment_selector[0], observerConfig);
    };

    /*
     * Finds parent value and passes it to the update method.
     */
    self.modify = function (selector) {
        var frame = $('ul.col-omics_experiment_types');
        var parent_val = $("option:selected", selector).text();
        // Finds experiment_sub_type select children.
        var child_selectors = $(frame).find("select[id$='omicsExperimentSubTypeString']");
        $.each(child_selectors, function (i, val) {
            self.update_child(val, parent_val);
        });
    };

    /*
     * Takes parent value, and finds correct options before revealing them in list.
     */
    self.update_child = function (child_selector, parent_val) {
        // Hides ALL options.
        $(child_selector).children('option').hide();
        // Shows relevant options.
        $.each(selection_relations[parent_val], function (i, val) {
            $(child_selector).children('option').filter(function () {
                return $(this).html() == val;
            }).show();
        });
        // Gets first non-hidden option.
        var first_non_hidden_option = $(child_selector).children('option').filter(function () {
            return $(this).css('display') != 'none';
        }).first()[0];
        // If it exists set it as selected, else set blank.
        if (typeof(first_non_hidden_option) != 'undefined') {
            $(child_selector).val(first_non_hidden_option.value);
        } else {
            $(child_selector).val('');
        }
    };

    self.construct();
}
/**
 * Created by wackm on 19-Mar-17.
 */
$(document).ready(function () {
    $('.summernote').summernote();
});
/**
 * Created by wackm on 28-Mar-17.
 *
 * Copied from https://gist.github.com/daverogers/5375778
 */
$(document).ready(function () {
    // get current URL path and assign 'active' class.
    // Updated so that it matches first block (can now be used in forms with different url ends (e.g. /new).
    var pathname = window.location.pathname.split("/")[1];
    $('.nav > li > a[href*="' + pathname + '"]').parent().addClass('active');
});

function redirectConfirm() {

    var chunked_pathname = window.location.pathname.split("/");
    var pathname = chunked_pathname[chunked_pathname.length - 1];
    if (pathname == "edit" || pathname == "new") {
        return confirm('Are you sure you want to leave this page? You will lose all new data.')
    }
    return true;
}