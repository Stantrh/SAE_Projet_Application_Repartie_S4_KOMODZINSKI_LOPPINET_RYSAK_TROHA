(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // lib/config.js
  var stationInfoUrl, stationStatusUrl, API_SERVEUR_URL;
  var init_config = __esm({
    "lib/config.js"() {
      stationInfoUrl = "https://transport.data.gouv.fr/gbfs/nancy/station_information.json";
      stationStatusUrl = "https://transport.data.gouv.fr/gbfs/nancy/station_status.json";
      API_SERVEUR_URL = "http://localhost:8080";
    }
  });

  // lib/dataloader.js
  function fetchApi(api, options) {
    return __async(this, null, function* () {
      console.log("fetch api");
      return yield fetch(api, options);
    });
  }
  var init_dataloader = __esm({
    "lib/dataloader.js"() {
    }
  });

  // node_modules/leaflet/dist/leaflet-src.js
  var require_leaflet_src = __commonJS({
    "node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.leaflet = {}));
      })(exports, function(exports2) {
        "use strict";
        var version = "1.9.4";
        function extend(dest) {
          var i, j, len, src;
          for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j];
            for (i in src) {
              dest[i] = src[i];
            }
          }
          return dest;
        }
        var create$2 = Object.create || function() {
          function F() {
          }
          return function(proto) {
            F.prototype = proto;
            return new F();
          };
        }();
        function bind(fn, obj) {
          var slice = Array.prototype.slice;
          if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
          }
          var args = slice.call(arguments, 2);
          return function() {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
          };
        }
        var lastId2 = 0;
        function stamp2(obj) {
          if (!("_leaflet_id" in obj)) {
            obj["_leaflet_id"] = ++lastId2;
          }
          return obj._leaflet_id;
        }
        function throttle(fn, time, context) {
          var lock, args, wrapperFn, later;
          later = function() {
            lock = false;
            if (args) {
              wrapperFn.apply(context, args);
              args = false;
            }
          };
          wrapperFn = function() {
            if (lock) {
              args = arguments;
            } else {
              fn.apply(context, arguments);
              setTimeout(later, time);
              lock = true;
            }
          };
          return wrapperFn;
        }
        function wrapNum(x, range, includeMax) {
          var max = range[1], min = range[0], d = max - min;
          return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
        }
        function falseFn2() {
          return false;
        }
        function formatNum2(num, precision) {
          if (precision === false) {
            return num;
          }
          var pow = Math.pow(10, precision === void 0 ? 6 : precision);
          return Math.round(num * pow) / pow;
        }
        function trim2(str) {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
        }
        function splitWords2(str) {
          return trim2(str).split(/\s+/);
        }
        function setOptions(obj, options) {
          if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
            obj.options = obj.options ? create$2(obj.options) : {};
          }
          for (var i in options) {
            obj.options[i] = options[i];
          }
          return obj.options;
        }
        function getParamString2(obj, existingUrl, uppercase) {
          var params = [];
          for (var i in obj) {
            params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
          }
          return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
        }
        var templateRe = /\{ *([\w_ -]+) *\}/g;
        function template2(str, data) {
          return str.replace(templateRe, function(str2, key) {
            var value = data[key];
            if (value === void 0) {
              throw new Error("No value provided for variable " + str2);
            } else if (typeof value === "function") {
              value = value(data);
            }
            return value;
          });
        }
        var isArray2 = Array.isArray || function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        function indexOf2(array, el) {
          for (var i = 0; i < array.length; i++) {
            if (array[i] === el) {
              return i;
            }
          }
          return -1;
        }
        var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        function getPrefixed2(name) {
          return window["webkit" + name] || window["moz" + name] || window["ms" + name];
        }
        var lastTime2 = 0;
        function timeoutDefer2(fn) {
          var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime2));
          lastTime2 = time + timeToCall;
          return window.setTimeout(fn, timeToCall);
        }
        var requestFn2 = window.requestAnimationFrame || getPrefixed2("RequestAnimationFrame") || timeoutDefer2;
        var cancelFn2 = window.cancelAnimationFrame || getPrefixed2("CancelAnimationFrame") || getPrefixed2("CancelRequestAnimationFrame") || function(id) {
          window.clearTimeout(id);
        };
        function requestAnimFrame(fn, context, immediate) {
          if (immediate && requestFn2 === timeoutDefer2) {
            fn.call(context);
          } else {
            return requestFn2.call(window, bind(fn, context));
          }
        }
        function cancelAnimFrame(id) {
          if (id) {
            cancelFn2.call(window, id);
          }
        }
        var Util = {
          __proto__: null,
          extend,
          create: create$2,
          bind,
          get lastId() {
            return lastId2;
          },
          stamp: stamp2,
          throttle,
          wrapNum,
          falseFn: falseFn2,
          formatNum: formatNum2,
          trim: trim2,
          splitWords: splitWords2,
          setOptions,
          getParamString: getParamString2,
          template: template2,
          isArray: isArray2,
          indexOf: indexOf2,
          emptyImageUrl,
          requestFn: requestFn2,
          cancelFn: cancelFn2,
          requestAnimFrame,
          cancelAnimFrame
        };
        function Class() {
        }
        Class.extend = function(props) {
          var NewClass = function() {
            setOptions(this);
            if (this.initialize) {
              this.initialize.apply(this, arguments);
            }
            this.callInitHooks();
          };
          var parentProto = NewClass.__super__ = this.prototype;
          var proto = create$2(parentProto);
          proto.constructor = NewClass;
          NewClass.prototype = proto;
          for (var i in this) {
            if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
              NewClass[i] = this[i];
            }
          }
          if (props.statics) {
            extend(NewClass, props.statics);
          }
          if (props.includes) {
            checkDeprecatedMixinEvents(props.includes);
            extend.apply(null, [proto].concat(props.includes));
          }
          extend(proto, props);
          delete proto.statics;
          delete proto.includes;
          if (proto.options) {
            proto.options = parentProto.options ? create$2(parentProto.options) : {};
            extend(proto.options, props.options);
          }
          proto._initHooks = [];
          proto.callInitHooks = function() {
            if (this._initHooksCalled) {
              return;
            }
            if (parentProto.callInitHooks) {
              parentProto.callInitHooks.call(this);
            }
            this._initHooksCalled = true;
            for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
              proto._initHooks[i2].call(this);
            }
          };
          return NewClass;
        };
        Class.include = function(props) {
          var parentOptions = this.prototype.options;
          extend(this.prototype, props);
          if (props.options) {
            this.prototype.options = parentOptions;
            this.mergeOptions(props.options);
          }
          return this;
        };
        Class.mergeOptions = function(options) {
          extend(this.prototype.options, options);
          return this;
        };
        Class.addInitHook = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          var init = typeof fn === "function" ? fn : function() {
            this[fn].apply(this, args);
          };
          this.prototype._initHooks = this.prototype._initHooks || [];
          this.prototype._initHooks.push(init);
          return this;
        };
        function checkDeprecatedMixinEvents(includes) {
          if (typeof L === "undefined" || !L || !L.Mixin) {
            return;
          }
          includes = isArray2(includes) ? includes : [includes];
          for (var i = 0; i < includes.length; i++) {
            if (includes[i] === L.Mixin.Events) {
              console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
            }
          }
        }
        var Events = {
          /* @method on(type: String, fn: Function, context?: Object): this
           * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
           *
           * @alternative
           * @method on(eventMap: Object): this
           * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
           */
          on: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type in types) {
                this._on(type, types[type], fn);
              }
            } else {
              types = splitWords2(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
              }
            }
            return this;
          },
          /* @method off(type: String, fn?: Function, context?: Object): this
           * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
           *
           * @alternative
           * @method off(eventMap: Object): this
           * Removes a set of type/listener pairs.
           *
           * @alternative
           * @method off: this
           * Removes all listeners to all events on the object. This includes implicitly attached events.
           */
          off: function(types, fn, context) {
            if (!arguments.length) {
              delete this._events;
            } else if (typeof types === "object") {
              for (var type in types) {
                this._off(type, types[type], fn);
              }
            } else {
              types = splitWords2(types);
              var removeAll = arguments.length === 1;
              for (var i = 0, len = types.length; i < len; i++) {
                if (removeAll) {
                  this._off(types[i]);
                } else {
                  this._off(types[i], fn, context);
                }
              }
            }
            return this;
          },
          // attach listener (without syntactic sugar now)
          _on: function(type, fn, context, _once) {
            if (typeof fn !== "function") {
              console.warn("wrong listener type: " + typeof fn);
              return;
            }
            if (this._listens(type, fn, context) !== false) {
              return;
            }
            if (context === this) {
              context = void 0;
            }
            var newListener = { fn, ctx: context };
            if (_once) {
              newListener.once = true;
            }
            this._events = this._events || {};
            this._events[type] = this._events[type] || [];
            this._events[type].push(newListener);
          },
          _off: function(type, fn, context) {
            var listeners, i, len;
            if (!this._events) {
              return;
            }
            listeners = this._events[type];
            if (!listeners) {
              return;
            }
            if (arguments.length === 1) {
              if (this._firingCount) {
                for (i = 0, len = listeners.length; i < len; i++) {
                  listeners[i].fn = falseFn2;
                }
              }
              delete this._events[type];
              return;
            }
            if (typeof fn !== "function") {
              console.warn("wrong listener type: " + typeof fn);
              return;
            }
            var index2 = this._listens(type, fn, context);
            if (index2 !== false) {
              var listener = listeners[index2];
              if (this._firingCount) {
                listener.fn = falseFn2;
                this._events[type] = listeners = listeners.slice();
              }
              listeners.splice(index2, 1);
            }
          },
          // @method fire(type: String, data?: Object, propagate?: Boolean): this
          // Fires an event of the specified type. You can optionally provide a data
          // object — the first argument of the listener function will contain its
          // properties. The event can optionally be propagated to event parents.
          fire: function(type, data, propagate) {
            if (!this.listens(type, propagate)) {
              return this;
            }
            var event = extend({}, data, {
              type,
              target: this,
              sourceTarget: data && data.sourceTarget || this
            });
            if (this._events) {
              var listeners = this._events[type];
              if (listeners) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var i = 0, len = listeners.length; i < len; i++) {
                  var l = listeners[i];
                  var fn = l.fn;
                  if (l.once) {
                    this.off(type, fn, l.ctx);
                  }
                  fn.call(l.ctx || this, event);
                }
                this._firingCount--;
              }
            }
            if (propagate) {
              this._propagateEvent(event);
            }
            return this;
          },
          // @method listens(type: String, propagate?: Boolean): Boolean
          // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
          // Returns `true` if a particular event type has any listeners attached to it.
          // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
          listens: function(type, fn, context, propagate) {
            if (typeof type !== "string") {
              console.warn('"string" type argument expected');
            }
            var _fn = fn;
            if (typeof fn !== "function") {
              propagate = !!fn;
              _fn = void 0;
              context = void 0;
            }
            var listeners = this._events && this._events[type];
            if (listeners && listeners.length) {
              if (this._listens(type, _fn, context) !== false) {
                return true;
              }
            }
            if (propagate) {
              for (var id in this._eventParents) {
                if (this._eventParents[id].listens(type, fn, context, propagate)) {
                  return true;
                }
              }
            }
            return false;
          },
          // returns the index (number) or false
          _listens: function(type, fn, context) {
            if (!this._events) {
              return false;
            }
            var listeners = this._events[type] || [];
            if (!fn) {
              return !!listeners.length;
            }
            if (context === this) {
              context = void 0;
            }
            for (var i = 0, len = listeners.length; i < len; i++) {
              if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return i;
              }
            }
            return false;
          },
          // @method once(…): this
          // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
          once: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type in types) {
                this._on(type, types[type], fn, true);
              }
            } else {
              types = splitWords2(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context, true);
              }
            }
            return this;
          },
          // @method addEventParent(obj: Evented): this
          // Adds an event parent - an `Evented` that will receive propagated events
          addEventParent: function(obj) {
            this._eventParents = this._eventParents || {};
            this._eventParents[stamp2(obj)] = obj;
            return this;
          },
          // @method removeEventParent(obj: Evented): this
          // Removes an event parent, so it will stop receiving propagated events
          removeEventParent: function(obj) {
            if (this._eventParents) {
              delete this._eventParents[stamp2(obj)];
            }
            return this;
          },
          _propagateEvent: function(e) {
            for (var id in this._eventParents) {
              this._eventParents[id].fire(e.type, extend({
                layer: e.target,
                propagatedFrom: e.target
              }, e), true);
            }
          }
        };
        Events.addEventListener = Events.on;
        Events.removeEventListener = Events.clearAllEventListeners = Events.off;
        Events.addOneTimeEventListener = Events.once;
        Events.fireEvent = Events.fire;
        Events.hasEventListeners = Events.listens;
        var Evented = Class.extend(Events);
        function Point2(x, y, round) {
          this.x = round ? Math.round(x) : x;
          this.y = round ? Math.round(y) : y;
        }
        var trunc2 = Math.trunc || function(v) {
          return v > 0 ? Math.floor(v) : Math.ceil(v);
        };
        Point2.prototype = {
          // @method clone(): Point
          // Returns a copy of the current point.
          clone: function() {
            return new Point2(this.x, this.y);
          },
          // @method add(otherPoint: Point): Point
          // Returns the result of addition of the current and the given points.
          add: function(point) {
            return this.clone()._add(toPoint2(point));
          },
          _add: function(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
          },
          // @method subtract(otherPoint: Point): Point
          // Returns the result of subtraction of the given point from the current.
          subtract: function(point) {
            return this.clone()._subtract(toPoint2(point));
          },
          _subtract: function(point) {
            this.x -= point.x;
            this.y -= point.y;
            return this;
          },
          // @method divideBy(num: Number): Point
          // Returns the result of division of the current point by the given number.
          divideBy: function(num) {
            return this.clone()._divideBy(num);
          },
          _divideBy: function(num) {
            this.x /= num;
            this.y /= num;
            return this;
          },
          // @method multiplyBy(num: Number): Point
          // Returns the result of multiplication of the current point by the given number.
          multiplyBy: function(num) {
            return this.clone()._multiplyBy(num);
          },
          _multiplyBy: function(num) {
            this.x *= num;
            this.y *= num;
            return this;
          },
          // @method scaleBy(scale: Point): Point
          // Multiply each coordinate of the current point by each coordinate of
          // `scale`. In linear algebra terms, multiply the point by the
          // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
          // defined by `scale`.
          scaleBy: function(point) {
            return new Point2(this.x * point.x, this.y * point.y);
          },
          // @method unscaleBy(scale: Point): Point
          // Inverse of `scaleBy`. Divide each coordinate of the current point by
          // each coordinate of `scale`.
          unscaleBy: function(point) {
            return new Point2(this.x / point.x, this.y / point.y);
          },
          // @method round(): Point
          // Returns a copy of the current point with rounded coordinates.
          round: function() {
            return this.clone()._round();
          },
          _round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
          },
          // @method floor(): Point
          // Returns a copy of the current point with floored coordinates (rounded down).
          floor: function() {
            return this.clone()._floor();
          },
          _floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
          },
          // @method ceil(): Point
          // Returns a copy of the current point with ceiled coordinates (rounded up).
          ceil: function() {
            return this.clone()._ceil();
          },
          _ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
          },
          // @method trunc(): Point
          // Returns a copy of the current point with truncated coordinates (rounded towards zero).
          trunc: function() {
            return this.clone()._trunc();
          },
          _trunc: function() {
            this.x = trunc2(this.x);
            this.y = trunc2(this.y);
            return this;
          },
          // @method distanceTo(otherPoint: Point): Number
          // Returns the cartesian distance between the current and the given points.
          distanceTo: function(point) {
            point = toPoint2(point);
            var x = point.x - this.x, y = point.y - this.y;
            return Math.sqrt(x * x + y * y);
          },
          // @method equals(otherPoint: Point): Boolean
          // Returns `true` if the given point has the same coordinates.
          equals: function(point) {
            point = toPoint2(point);
            return point.x === this.x && point.y === this.y;
          },
          // @method contains(otherPoint: Point): Boolean
          // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
          contains: function(point) {
            point = toPoint2(point);
            return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
          },
          // @method toString(): String
          // Returns a string representation of the point for debugging purposes.
          toString: function() {
            return "Point(" + formatNum2(this.x) + ", " + formatNum2(this.y) + ")";
          }
        };
        function toPoint2(x, y, round) {
          if (x instanceof Point2) {
            return x;
          }
          if (isArray2(x)) {
            return new Point2(x[0], x[1]);
          }
          if (x === void 0 || x === null) {
            return x;
          }
          if (typeof x === "object" && "x" in x && "y" in x) {
            return new Point2(x.x, x.y);
          }
          return new Point2(x, y, round);
        }
        function Bounds(a, b) {
          if (!a) {
            return;
          }
          var points = b ? [a, b] : a;
          for (var i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
          }
        }
        Bounds.prototype = {
          // @method extend(point: Point): this
          // Extends the bounds to contain the given point.
          // @alternative
          // @method extend(otherBounds: Bounds): this
          // Extend the bounds to contain the given bounds
          extend: function(obj) {
            var min2, max2;
            if (!obj) {
              return this;
            }
            if (obj instanceof Point2 || typeof obj[0] === "number" || "x" in obj) {
              min2 = max2 = toPoint2(obj);
            } else {
              obj = toBounds(obj);
              min2 = obj.min;
              max2 = obj.max;
              if (!min2 || !max2) {
                return this;
              }
            }
            if (!this.min && !this.max) {
              this.min = min2.clone();
              this.max = max2.clone();
            } else {
              this.min.x = Math.min(min2.x, this.min.x);
              this.max.x = Math.max(max2.x, this.max.x);
              this.min.y = Math.min(min2.y, this.min.y);
              this.max.y = Math.max(max2.y, this.max.y);
            }
            return this;
          },
          // @method getCenter(round?: Boolean): Point
          // Returns the center point of the bounds.
          getCenter: function(round) {
            return toPoint2(
              (this.min.x + this.max.x) / 2,
              (this.min.y + this.max.y) / 2,
              round
            );
          },
          // @method getBottomLeft(): Point
          // Returns the bottom-left point of the bounds.
          getBottomLeft: function() {
            return toPoint2(this.min.x, this.max.y);
          },
          // @method getTopRight(): Point
          // Returns the top-right point of the bounds.
          getTopRight: function() {
            return toPoint2(this.max.x, this.min.y);
          },
          // @method getTopLeft(): Point
          // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
          getTopLeft: function() {
            return this.min;
          },
          // @method getBottomRight(): Point
          // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
          getBottomRight: function() {
            return this.max;
          },
          // @method getSize(): Point
          // Returns the size of the given bounds
          getSize: function() {
            return this.max.subtract(this.min);
          },
          // @method contains(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle contains the given one.
          // @alternative
          // @method contains(point: Point): Boolean
          // Returns `true` if the rectangle contains the given point.
          contains: function(obj) {
            var min, max;
            if (typeof obj[0] === "number" || obj instanceof Point2) {
              obj = toPoint2(obj);
            } else {
              obj = toBounds(obj);
            }
            if (obj instanceof Bounds) {
              min = obj.min;
              max = obj.max;
            } else {
              min = max = obj;
            }
            return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
          },
          // @method intersects(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle intersects the given bounds. Two bounds
          // intersect if they have at least one point in common.
          intersects: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
            return xIntersects && yIntersects;
          },
          // @method overlaps(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle overlaps the given bounds. Two bounds
          // overlap if their intersection is an area.
          overlaps: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
            return xOverlaps && yOverlaps;
          },
          // @method isValid(): Boolean
          // Returns `true` if the bounds are properly initialized.
          isValid: function() {
            return !!(this.min && this.max);
          },
          // @method pad(bufferRatio: Number): Bounds
          // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
          // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
          // Negative values will retract the bounds.
          pad: function(bufferRatio) {
            var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
            return toBounds(
              toPoint2(min.x - heightBuffer, min.y - widthBuffer),
              toPoint2(max.x + heightBuffer, max.y + widthBuffer)
            );
          },
          // @method equals(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle is equivalent to the given bounds.
          equals: function(bounds) {
            if (!bounds) {
              return false;
            }
            bounds = toBounds(bounds);
            return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
          }
        };
        function toBounds(a, b) {
          if (!a || a instanceof Bounds) {
            return a;
          }
          return new Bounds(a, b);
        }
        function LatLngBounds(corner1, corner2) {
          if (!corner1) {
            return;
          }
          var latlngs = corner2 ? [corner1, corner2] : corner1;
          for (var i = 0, len = latlngs.length; i < len; i++) {
            this.extend(latlngs[i]);
          }
        }
        LatLngBounds.prototype = {
          // @method extend(latlng: LatLng): this
          // Extend the bounds to contain the given point
          // @alternative
          // @method extend(otherBounds: LatLngBounds): this
          // Extend the bounds to contain the given bounds
          extend: function(obj) {
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLng2) {
              sw2 = obj;
              ne2 = obj;
            } else if (obj instanceof LatLngBounds) {
              sw2 = obj._southWest;
              ne2 = obj._northEast;
              if (!sw2 || !ne2) {
                return this;
              }
            } else {
              return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
            }
            if (!sw && !ne) {
              this._southWest = new LatLng2(sw2.lat, sw2.lng);
              this._northEast = new LatLng2(ne2.lat, ne2.lng);
            } else {
              sw.lat = Math.min(sw2.lat, sw.lat);
              sw.lng = Math.min(sw2.lng, sw.lng);
              ne.lat = Math.max(ne2.lat, ne.lat);
              ne.lng = Math.max(ne2.lng, ne.lng);
            }
            return this;
          },
          // @method pad(bufferRatio: Number): LatLngBounds
          // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
          // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
          // Negative values will retract the bounds.
          pad: function(bufferRatio) {
            var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
            return new LatLngBounds(
              new LatLng2(sw.lat - heightBuffer, sw.lng - widthBuffer),
              new LatLng2(ne.lat + heightBuffer, ne.lng + widthBuffer)
            );
          },
          // @method getCenter(): LatLng
          // Returns the center point of the bounds.
          getCenter: function() {
            return new LatLng2(
              (this._southWest.lat + this._northEast.lat) / 2,
              (this._southWest.lng + this._northEast.lng) / 2
            );
          },
          // @method getSouthWest(): LatLng
          // Returns the south-west point of the bounds.
          getSouthWest: function() {
            return this._southWest;
          },
          // @method getNorthEast(): LatLng
          // Returns the north-east point of the bounds.
          getNorthEast: function() {
            return this._northEast;
          },
          // @method getNorthWest(): LatLng
          // Returns the north-west point of the bounds.
          getNorthWest: function() {
            return new LatLng2(this.getNorth(), this.getWest());
          },
          // @method getSouthEast(): LatLng
          // Returns the south-east point of the bounds.
          getSouthEast: function() {
            return new LatLng2(this.getSouth(), this.getEast());
          },
          // @method getWest(): Number
          // Returns the west longitude of the bounds
          getWest: function() {
            return this._southWest.lng;
          },
          // @method getSouth(): Number
          // Returns the south latitude of the bounds
          getSouth: function() {
            return this._southWest.lat;
          },
          // @method getEast(): Number
          // Returns the east longitude of the bounds
          getEast: function() {
            return this._northEast.lng;
          },
          // @method getNorth(): Number
          // Returns the north latitude of the bounds
          getNorth: function() {
            return this._northEast.lat;
          },
          // @method contains(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle contains the given one.
          // @alternative
          // @method contains (latlng: LatLng): Boolean
          // Returns `true` if the rectangle contains the given point.
          contains: function(obj) {
            if (typeof obj[0] === "number" || obj instanceof LatLng2 || "lat" in obj) {
              obj = toLatLng(obj);
            } else {
              obj = toLatLngBounds(obj);
            }
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLngBounds) {
              sw2 = obj.getSouthWest();
              ne2 = obj.getNorthEast();
            } else {
              sw2 = ne2 = obj;
            }
            return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
          },
          // @method intersects(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
          intersects: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
            return latIntersects && lngIntersects;
          },
          // @method overlaps(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
          overlaps: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
            return latOverlaps && lngOverlaps;
          },
          // @method toBBoxString(): String
          // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
          toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
          },
          // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
          // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
          equals: function(bounds, maxMargin) {
            if (!bounds) {
              return false;
            }
            bounds = toLatLngBounds(bounds);
            return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
          },
          // @method isValid(): Boolean
          // Returns `true` if the bounds are properly initialized.
          isValid: function() {
            return !!(this._southWest && this._northEast);
          }
        };
        function toLatLngBounds(a, b) {
          if (a instanceof LatLngBounds) {
            return a;
          }
          return new LatLngBounds(a, b);
        }
        function LatLng2(lat, lng, alt) {
          if (isNaN(lat) || isNaN(lng)) {
            throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
          }
          this.lat = +lat;
          this.lng = +lng;
          if (alt !== void 0) {
            this.alt = +alt;
          }
        }
        LatLng2.prototype = {
          // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
          // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
          equals: function(obj, maxMargin) {
            if (!obj) {
              return false;
            }
            obj = toLatLng(obj);
            var margin = Math.max(
              Math.abs(this.lat - obj.lat),
              Math.abs(this.lng - obj.lng)
            );
            return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
          },
          // @method toString(): String
          // Returns a string representation of the point (for debugging purposes).
          toString: function(precision) {
            return "LatLng(" + formatNum2(this.lat, precision) + ", " + formatNum2(this.lng, precision) + ")";
          },
          // @method distanceTo(otherLatLng: LatLng): Number
          // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
          distanceTo: function(other) {
            return Earth.distance(this, toLatLng(other));
          },
          // @method wrap(): LatLng
          // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
          wrap: function() {
            return Earth.wrapLatLng(this);
          },
          // @method toBounds(sizeInMeters: Number): LatLngBounds
          // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
          toBounds: function(sizeInMeters) {
            var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
            return toLatLngBounds(
              [this.lat - latAccuracy, this.lng - lngAccuracy],
              [this.lat + latAccuracy, this.lng + lngAccuracy]
            );
          },
          clone: function() {
            return new LatLng2(this.lat, this.lng, this.alt);
          }
        };
        function toLatLng(a, b, c) {
          if (a instanceof LatLng2) {
            return a;
          }
          if (isArray2(a) && typeof a[0] !== "object") {
            if (a.length === 3) {
              return new LatLng2(a[0], a[1], a[2]);
            }
            if (a.length === 2) {
              return new LatLng2(a[0], a[1]);
            }
            return null;
          }
          if (a === void 0 || a === null) {
            return a;
          }
          if (typeof a === "object" && "lat" in a) {
            return new LatLng2(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
          }
          if (b === void 0) {
            return null;
          }
          return new LatLng2(a, b, c);
        }
        var CRS = {
          // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
          // Projects geographical coordinates into pixel coordinates for a given zoom.
          latLngToPoint: function(latlng, zoom2) {
            var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
            return this.transformation._transform(projectedPoint, scale2);
          },
          // @method pointToLatLng(point: Point, zoom: Number): LatLng
          // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
          // zoom into geographical coordinates.
          pointToLatLng: function(point, zoom2) {
            var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
            return this.projection.unproject(untransformedPoint);
          },
          // @method project(latlng: LatLng): Point
          // Projects geographical coordinates into coordinates in units accepted for
          // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
          project: function(latlng) {
            return this.projection.project(latlng);
          },
          // @method unproject(point: Point): LatLng
          // Given a projected coordinate returns the corresponding LatLng.
          // The inverse of `project`.
          unproject: function(point) {
            return this.projection.unproject(point);
          },
          // @method scale(zoom: Number): Number
          // Returns the scale used when transforming projected coordinates into
          // pixel coordinates for a particular zoom. For example, it returns
          // `256 * 2^zoom` for Mercator-based CRS.
          scale: function(zoom2) {
            return 256 * Math.pow(2, zoom2);
          },
          // @method zoom(scale: Number): Number
          // Inverse of `scale()`, returns the zoom level corresponding to a scale
          // factor of `scale`.
          zoom: function(scale2) {
            return Math.log(scale2 / 256) / Math.LN2;
          },
          // @method getProjectedBounds(zoom: Number): Bounds
          // Returns the projection's bounds scaled and transformed for the provided `zoom`.
          getProjectedBounds: function(zoom2) {
            if (this.infinite) {
              return null;
            }
            var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
            return new Bounds(min, max);
          },
          // @method distance(latlng1: LatLng, latlng2: LatLng): Number
          // Returns the distance between two geographical coordinates.
          // @property code: String
          // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
          //
          // @property wrapLng: Number[]
          // An array of two numbers defining whether the longitude (horizontal) coordinate
          // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
          // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
          //
          // @property wrapLat: Number[]
          // Like `wrapLng`, but for the latitude (vertical) axis.
          // wrapLng: [min, max],
          // wrapLat: [min, max],
          // @property infinite: Boolean
          // If true, the coordinate space will be unbounded (infinite in both axes)
          infinite: false,
          // @method wrapLatLng(latlng: LatLng): LatLng
          // Returns a `LatLng` where lat and lng has been wrapped according to the
          // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
          wrapLatLng: function(latlng) {
            var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
            return new LatLng2(lat, lng, alt);
          },
          // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
          // Returns a `LatLngBounds` with the same size as the given one, ensuring
          // that its center is within the CRS's bounds.
          // Only accepts actual `L.LatLngBounds` instances, not arrays.
          wrapLatLngBounds: function(bounds) {
            var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
            if (latShift === 0 && lngShift === 0) {
              return bounds;
            }
            var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng2(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng2(ne.lat - latShift, ne.lng - lngShift);
            return new LatLngBounds(newSw, newNe);
          }
        };
        var Earth = extend({}, CRS, {
          wrapLng: [-180, 180],
          // Mean Earth Radius, as recommended for use by
          // the International Union of Geodesy and Geophysics,
          // see https://rosettacode.org/wiki/Haversine_formula
          R: 6371e3,
          // distance between two geographical points using spherical law of cosines approximation
          distance: function(latlng1, latlng2) {
            var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return this.R * c;
          }
        });
        var earthRadius = 6378137;
        var SphericalMercator = {
          R: earthRadius,
          MAX_LATITUDE: 85.0511287798,
          project: function(latlng) {
            var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
            return new Point2(
              this.R * latlng.lng * d,
              this.R * Math.log((1 + sin) / (1 - sin)) / 2
            );
          },
          unproject: function(point) {
            var d = 180 / Math.PI;
            return new LatLng2(
              (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
              point.x * d / this.R
            );
          },
          bounds: function() {
            var d = earthRadius * Math.PI;
            return new Bounds([-d, -d], [d, d]);
          }()
        };
        function Transformation(a, b, c, d) {
          if (isArray2(a)) {
            this._a = a[0];
            this._b = a[1];
            this._c = a[2];
            this._d = a[3];
            return;
          }
          this._a = a;
          this._b = b;
          this._c = c;
          this._d = d;
        }
        Transformation.prototype = {
          // @method transform(point: Point, scale?: Number): Point
          // Returns a transformed point, optionally multiplied by the given scale.
          // Only accepts actual `L.Point` instances, not arrays.
          transform: function(point, scale2) {
            return this._transform(point.clone(), scale2);
          },
          // destructive transform (faster)
          _transform: function(point, scale2) {
            scale2 = scale2 || 1;
            point.x = scale2 * (this._a * point.x + this._b);
            point.y = scale2 * (this._c * point.y + this._d);
            return point;
          },
          // @method untransform(point: Point, scale?: Number): Point
          // Returns the reverse transformation of the given point, optionally divided
          // by the given scale. Only accepts actual `L.Point` instances, not arrays.
          untransform: function(point, scale2) {
            scale2 = scale2 || 1;
            return new Point2(
              (point.x / scale2 - this._b) / this._a,
              (point.y / scale2 - this._d) / this._c
            );
          }
        };
        function toTransformation(a, b, c, d) {
          return new Transformation(a, b, c, d);
        }
        var EPSG3857 = extend({}, Earth, {
          code: "EPSG:3857",
          projection: SphericalMercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG900913 = extend({}, EPSG3857, {
          code: "EPSG:900913"
        });
        function svgCreate2(name) {
          return document.createElementNS("http://www.w3.org/2000/svg", name);
        }
        function pointsToPath(rings, closed) {
          var str = "", i, j, len, len2, points, p;
          for (i = 0, len = rings.length; i < len; i++) {
            points = rings[i];
            for (j = 0, len2 = points.length; j < len2; j++) {
              p = points[j];
              str += (j ? "L" : "M") + p.x + " " + p.y;
            }
            str += closed ? Browser.svg ? "z" : "x" : "";
          }
          return str || "M0 0";
        }
        var style2 = document.documentElement.style;
        var ie2 = "ActiveXObject" in window;
        var ielt92 = ie2 && !document.addEventListener;
        var edge2 = "msLaunchUri" in navigator && !("documentMode" in document);
        var webkit2 = userAgentContains2("webkit");
        var android2 = userAgentContains2("android");
        var android232 = userAgentContains2("android 2") || userAgentContains2("android 3");
        var webkitVer2 = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
        var androidStock2 = android2 && userAgentContains2("Google") && webkitVer2 < 537 && !("AudioNode" in window);
        var opera2 = !!window.opera;
        var chrome2 = !edge2 && userAgentContains2("chrome");
        var gecko2 = userAgentContains2("gecko") && !webkit2 && !opera2 && !ie2;
        var safari2 = !chrome2 && userAgentContains2("safari");
        var phantom2 = userAgentContains2("phantom");
        var opera122 = "OTransition" in style2;
        var win2 = navigator.platform.indexOf("Win") === 0;
        var ie3d2 = ie2 && "transition" in style2;
        var webkit3d2 = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android232;
        var gecko3d2 = "MozPerspective" in style2;
        var any3d2 = !window.L_DISABLE_3D && (ie3d2 || webkit3d2 || gecko3d2) && !opera122 && !phantom2;
        var mobile2 = typeof orientation !== "undefined" || userAgentContains2("mobile");
        var mobileWebkit2 = mobile2 && webkit2;
        var mobileWebkit3d2 = mobile2 && webkit3d2;
        var msPointer2 = !window.PointerEvent && window.MSPointerEvent;
        var pointer2 = !!(window.PointerEvent || msPointer2);
        var touchNative2 = "ontouchstart" in window || !!window.TouchEvent;
        var touch2 = !window.L_NO_TOUCH && (touchNative2 || pointer2);
        var mobileOpera2 = mobile2 && opera2;
        var mobileGecko2 = mobile2 && gecko2;
        var retina2 = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
        var passiveEvents2 = function() {
          var supportsPassiveOption = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supportsPassiveOption = true;
              }
            });
            window.addEventListener("testPassiveEventSupport", falseFn2, opts);
            window.removeEventListener("testPassiveEventSupport", falseFn2, opts);
          } catch (e) {
          }
          return supportsPassiveOption;
        }();
        var canvas$1 = function() {
          return !!document.createElement("canvas").getContext;
        }();
        var svg$1 = !!(document.createElementNS && svgCreate2("svg").createSVGRect);
        var inlineSvg2 = !!svg$1 && function() {
          var div = document.createElement("div");
          div.innerHTML = "<svg/>";
          return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
        }();
        var vml2 = !svg$1 && function() {
          try {
            var div = document.createElement("div");
            div.innerHTML = '<v:shape adj="1"/>';
            var shape = div.firstChild;
            shape.style.behavior = "url(#default#VML)";
            return shape && typeof shape.adj === "object";
          } catch (e) {
            return false;
          }
        }();
        var mac2 = navigator.platform.indexOf("Mac") === 0;
        var linux2 = navigator.platform.indexOf("Linux") === 0;
        function userAgentContains2(str) {
          return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
        }
        var Browser = {
          ie: ie2,
          ielt9: ielt92,
          edge: edge2,
          webkit: webkit2,
          android: android2,
          android23: android232,
          androidStock: androidStock2,
          opera: opera2,
          chrome: chrome2,
          gecko: gecko2,
          safari: safari2,
          phantom: phantom2,
          opera12: opera122,
          win: win2,
          ie3d: ie3d2,
          webkit3d: webkit3d2,
          gecko3d: gecko3d2,
          any3d: any3d2,
          mobile: mobile2,
          mobileWebkit: mobileWebkit2,
          mobileWebkit3d: mobileWebkit3d2,
          msPointer: msPointer2,
          pointer: pointer2,
          touch: touch2,
          touchNative: touchNative2,
          mobileOpera: mobileOpera2,
          mobileGecko: mobileGecko2,
          retina: retina2,
          passiveEvents: passiveEvents2,
          canvas: canvas$1,
          svg: svg$1,
          vml: vml2,
          inlineSvg: inlineSvg2,
          mac: mac2,
          linux: linux2
        };
        var POINTER_DOWN2 = Browser.msPointer ? "MSPointerDown" : "pointerdown";
        var POINTER_MOVE2 = Browser.msPointer ? "MSPointerMove" : "pointermove";
        var POINTER_UP2 = Browser.msPointer ? "MSPointerUp" : "pointerup";
        var POINTER_CANCEL2 = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
        var pEvent2 = {
          touchstart: POINTER_DOWN2,
          touchmove: POINTER_MOVE2,
          touchend: POINTER_UP2,
          touchcancel: POINTER_CANCEL2
        };
        var handle2 = {
          touchstart: _onPointerStart2,
          touchmove: _handlePointer2,
          touchend: _handlePointer2,
          touchcancel: _handlePointer2
        };
        var _pointers2 = {};
        var _pointerDocListener2 = false;
        function addPointerListener2(obj, type, handler) {
          if (type === "touchstart") {
            _addPointerDocListener2();
          }
          if (!handle2[type]) {
            console.warn("wrong event specified:", type);
            return falseFn2;
          }
          handler = handle2[type].bind(this, handler);
          obj.addEventListener(pEvent2[type], handler, false);
          return handler;
        }
        function removePointerListener2(obj, type, handler) {
          if (!pEvent2[type]) {
            console.warn("wrong event specified:", type);
            return;
          }
          obj.removeEventListener(pEvent2[type], handler, false);
        }
        function _globalPointerDown2(e) {
          _pointers2[e.pointerId] = e;
        }
        function _globalPointerMove2(e) {
          if (_pointers2[e.pointerId]) {
            _pointers2[e.pointerId] = e;
          }
        }
        function _globalPointerUp2(e) {
          delete _pointers2[e.pointerId];
        }
        function _addPointerDocListener2() {
          if (!_pointerDocListener2) {
            document.addEventListener(POINTER_DOWN2, _globalPointerDown2, true);
            document.addEventListener(POINTER_MOVE2, _globalPointerMove2, true);
            document.addEventListener(POINTER_UP2, _globalPointerUp2, true);
            document.addEventListener(POINTER_CANCEL2, _globalPointerUp2, true);
            _pointerDocListener2 = true;
          }
        }
        function _handlePointer2(handler, e) {
          if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
            return;
          }
          e.touches = [];
          for (var i in _pointers2) {
            e.touches.push(_pointers2[i]);
          }
          e.changedTouches = [e];
          handler(e);
        }
        function _onPointerStart2(handler, e) {
          if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
            preventDefault2(e);
          }
          _handlePointer2(handler, e);
        }
        function makeDblclick2(event) {
          var newEvent = {}, prop, i;
          for (i in event) {
            prop = event[i];
            newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
          }
          event = newEvent;
          newEvent.type = "dblclick";
          newEvent.detail = 2;
          newEvent.isTrusted = false;
          newEvent._simulated = true;
          return newEvent;
        }
        var delay2 = 200;
        function addDoubleTapListener2(obj, handler) {
          obj.addEventListener("dblclick", handler);
          var last = 0, detail;
          function simDblclick(e) {
            if (e.detail !== 1) {
              detail = e.detail;
              return;
            }
            if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
              return;
            }
            var path = getPropagationPath2(e);
            if (path.some(function(el) {
              return el instanceof HTMLLabelElement && el.attributes.for;
            }) && !path.some(function(el) {
              return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
            })) {
              return;
            }
            var now = Date.now();
            if (now - last <= delay2) {
              detail++;
              if (detail === 2) {
                handler(makeDblclick2(e));
              }
            } else {
              detail = 1;
            }
            last = now;
          }
          obj.addEventListener("click", simDblclick);
          return {
            dblclick: handler,
            simDblclick
          };
        }
        function removeDoubleTapListener2(obj, handlers) {
          obj.removeEventListener("dblclick", handlers.dblclick);
          obj.removeEventListener("click", handlers.simDblclick);
        }
        var TRANSFORM2 = testProp2(
          ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
        );
        var TRANSITION2 = testProp2(
          ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
        );
        var TRANSITION_END2 = TRANSITION2 === "webkitTransition" || TRANSITION2 === "OTransition" ? TRANSITION2 + "End" : "transitionend";
        function get2(id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        }
        function getStyle(el, style3) {
          var value = el.style[style3] || el.currentStyle && el.currentStyle[style3];
          if ((!value || value === "auto") && document.defaultView) {
            var css = document.defaultView.getComputedStyle(el, null);
            value = css ? css[style3] : null;
          }
          return value === "auto" ? null : value;
        }
        function create$1(tagName, className, container) {
          var el = document.createElement(tagName);
          el.className = className || "";
          if (container) {
            container.appendChild(el);
          }
          return el;
        }
        function remove(el) {
          var parent = el.parentNode;
          if (parent) {
            parent.removeChild(el);
          }
        }
        function empty(el) {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
        }
        function toFront(el) {
          var parent = el.parentNode;
          if (parent && parent.lastChild !== el) {
            parent.appendChild(el);
          }
        }
        function toBack(el) {
          var parent = el.parentNode;
          if (parent && parent.firstChild !== el) {
            parent.insertBefore(el, parent.firstChild);
          }
        }
        function hasClass(el, name) {
          if (el.classList !== void 0) {
            return el.classList.contains(name);
          }
          var className = getClass(el);
          return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
        }
        function addClass(el, name) {
          if (el.classList !== void 0) {
            var classes = splitWords2(name);
            for (var i = 0, len = classes.length; i < len; i++) {
              el.classList.add(classes[i]);
            }
          } else if (!hasClass(el, name)) {
            var className = getClass(el);
            setClass(el, (className ? className + " " : "") + name);
          }
        }
        function removeClass(el, name) {
          if (el.classList !== void 0) {
            el.classList.remove(name);
          } else {
            setClass(el, trim2((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
          }
        }
        function setClass(el, name) {
          if (el.className.baseVal === void 0) {
            el.className = name;
          } else {
            el.className.baseVal = name;
          }
        }
        function getClass(el) {
          if (el.correspondingElement) {
            el = el.correspondingElement;
          }
          return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
        }
        function setOpacity(el, value) {
          if ("opacity" in el.style) {
            el.style.opacity = value;
          } else if ("filter" in el.style) {
            _setOpacityIE(el, value);
          }
        }
        function _setOpacityIE(el, value) {
          var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
          try {
            filter = el.filters.item(filterName);
          } catch (e) {
            if (value === 1) {
              return;
            }
          }
          value = Math.round(value * 100);
          if (filter) {
            filter.Enabled = value !== 100;
            filter.Opacity = value;
          } else {
            el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
          }
        }
        function testProp2(props) {
          var style3 = document.documentElement.style;
          for (var i = 0; i < props.length; i++) {
            if (props[i] in style3) {
              return props[i];
            }
          }
          return false;
        }
        function setTransform(el, offset, scale2) {
          var pos = offset || new Point2(0, 0);
          el.style[TRANSFORM2] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
        }
        function setPosition(el, point) {
          el._leaflet_pos = point;
          if (Browser.any3d) {
            setTransform(el, point);
          } else {
            el.style.left = point.x + "px";
            el.style.top = point.y + "px";
          }
        }
        function getPosition(el) {
          return el._leaflet_pos || new Point2(0, 0);
        }
        var disableTextSelection2;
        var enableTextSelection2;
        var _userSelect2;
        if ("onselectstart" in document) {
          disableTextSelection2 = function() {
            on2(window, "selectstart", preventDefault2);
          };
          enableTextSelection2 = function() {
            off2(window, "selectstart", preventDefault2);
          };
        } else {
          var userSelectProperty = testProp2(
            ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
          );
          disableTextSelection2 = function() {
            if (userSelectProperty) {
              var style3 = document.documentElement.style;
              _userSelect2 = style3[userSelectProperty];
              style3[userSelectProperty] = "none";
            }
          };
          enableTextSelection2 = function() {
            if (userSelectProperty) {
              document.documentElement.style[userSelectProperty] = _userSelect2;
              _userSelect2 = void 0;
            }
          };
        }
        function disableImageDrag() {
          on2(window, "dragstart", preventDefault2);
        }
        function enableImageDrag() {
          off2(window, "dragstart", preventDefault2);
        }
        var _outlineElement, _outlineStyle;
        function preventOutline(element) {
          while (element.tabIndex === -1) {
            element = element.parentNode;
          }
          if (!element.style) {
            return;
          }
          restoreOutline();
          _outlineElement = element;
          _outlineStyle = element.style.outlineStyle;
          element.style.outlineStyle = "none";
          on2(window, "keydown", restoreOutline);
        }
        function restoreOutline() {
          if (!_outlineElement) {
            return;
          }
          _outlineElement.style.outlineStyle = _outlineStyle;
          _outlineElement = void 0;
          _outlineStyle = void 0;
          off2(window, "keydown", restoreOutline);
        }
        function getSizedParentNode(element) {
          do {
            element = element.parentNode;
          } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
          return element;
        }
        function getScale2(element) {
          var rect = element.getBoundingClientRect();
          return {
            x: rect.width / element.offsetWidth || 1,
            y: rect.height / element.offsetHeight || 1,
            boundingClientRect: rect
          };
        }
        var DomUtil = {
          __proto__: null,
          TRANSFORM: TRANSFORM2,
          TRANSITION: TRANSITION2,
          TRANSITION_END: TRANSITION_END2,
          get: get2,
          getStyle,
          create: create$1,
          remove,
          empty,
          toFront,
          toBack,
          hasClass,
          addClass,
          removeClass,
          setClass,
          getClass,
          setOpacity,
          testProp: testProp2,
          setTransform,
          setPosition,
          getPosition,
          get disableTextSelection() {
            return disableTextSelection2;
          },
          get enableTextSelection() {
            return enableTextSelection2;
          },
          disableImageDrag,
          enableImageDrag,
          preventOutline,
          restoreOutline,
          getSizedParentNode,
          getScale: getScale2
        };
        function on2(obj, types, fn, context) {
          if (types && typeof types === "object") {
            for (var type in types) {
              addOne2(obj, type, types[type], fn);
            }
          } else {
            types = splitWords2(types);
            for (var i = 0, len = types.length; i < len; i++) {
              addOne2(obj, types[i], fn, context);
            }
          }
          return this;
        }
        var eventsKey2 = "_leaflet_events";
        function off2(obj, types, fn, context) {
          if (arguments.length === 1) {
            batchRemove2(obj);
            delete obj[eventsKey2];
          } else if (types && typeof types === "object") {
            for (var type in types) {
              removeOne2(obj, type, types[type], fn);
            }
          } else {
            types = splitWords2(types);
            if (arguments.length === 2) {
              batchRemove2(obj, function(type2) {
                return indexOf2(types, type2) !== -1;
              });
            } else {
              for (var i = 0, len = types.length; i < len; i++) {
                removeOne2(obj, types[i], fn, context);
              }
            }
          }
          return this;
        }
        function batchRemove2(obj, filterFn) {
          for (var id in obj[eventsKey2]) {
            var type = id.split(/\d/)[0];
            if (!filterFn || filterFn(type)) {
              removeOne2(obj, type, null, null, id);
            }
          }
        }
        var mouseSubst2 = {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          wheel: !("onwheel" in window) && "mousewheel"
        };
        function addOne2(obj, type, fn, context) {
          var id = type + stamp2(fn) + (context ? "_" + stamp2(context) : "");
          if (obj[eventsKey2] && obj[eventsKey2][id]) {
            return this;
          }
          var handler = function(e) {
            return fn.call(context || obj, e || window.event);
          };
          var originalHandler = handler;
          if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
            handler = addPointerListener2(obj, type, handler);
          } else if (Browser.touch && type === "dblclick") {
            handler = addDoubleTapListener2(obj, handler);
          } else if ("addEventListener" in obj) {
            if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
              obj.addEventListener(mouseSubst2[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
            } else if (type === "mouseenter" || type === "mouseleave") {
              handler = function(e) {
                e = e || window.event;
                if (isExternalTarget2(obj, e)) {
                  originalHandler(e);
                }
              };
              obj.addEventListener(mouseSubst2[type], handler, false);
            } else {
              obj.addEventListener(type, originalHandler, false);
            }
          } else {
            obj.attachEvent("on" + type, handler);
          }
          obj[eventsKey2] = obj[eventsKey2] || {};
          obj[eventsKey2][id] = handler;
        }
        function removeOne2(obj, type, fn, context, id) {
          id = id || type + stamp2(fn) + (context ? "_" + stamp2(context) : "");
          var handler = obj[eventsKey2] && obj[eventsKey2][id];
          if (!handler) {
            return this;
          }
          if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
            removePointerListener2(obj, type, handler);
          } else if (Browser.touch && type === "dblclick") {
            removeDoubleTapListener2(obj, handler);
          } else if ("removeEventListener" in obj) {
            obj.removeEventListener(mouseSubst2[type] || type, handler, false);
          } else {
            obj.detachEvent("on" + type, handler);
          }
          obj[eventsKey2][id] = null;
        }
        function stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (e.originalEvent) {
            e.originalEvent._stopped = true;
          } else {
            e.cancelBubble = true;
          }
          return this;
        }
        function disableScrollPropagation(el) {
          addOne2(el, "wheel", stopPropagation);
          return this;
        }
        function disableClickPropagation(el) {
          on2(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
          el["_leaflet_disable_click"] = true;
          return this;
        }
        function preventDefault2(e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
          return this;
        }
        function stop(e) {
          preventDefault2(e);
          stopPropagation(e);
          return this;
        }
        function getPropagationPath2(ev) {
          if (ev.composedPath) {
            return ev.composedPath();
          }
          var path = [];
          var el = ev.target;
          while (el) {
            path.push(el);
            el = el.parentNode;
          }
          return path;
        }
        function getMousePosition(e, container) {
          if (!container) {
            return new Point2(e.clientX, e.clientY);
          }
          var scale2 = getScale2(container), offset = scale2.boundingClientRect;
          return new Point2(
            // offset.left/top values are in page scale (like clientX/Y),
            // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
            (e.clientX - offset.left) / scale2.x - container.clientLeft,
            (e.clientY - offset.top) / scale2.y - container.clientTop
          );
        }
        var wheelPxFactor2 = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
        function getWheelDelta(e) {
          return Browser.edge ? e.wheelDeltaY / 2 : (
            // Don't trust window-geometry-based delta
            e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor2 : (
              // Pixels
              e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
                // Lines
                e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
                  // Pages
                  e.deltaX || e.deltaZ ? 0 : (
                    // Skip horizontal/depth wheel events
                    e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
                      // Legacy IE pixels
                      e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                        // Legacy Moz lines
                        e.detail ? e.detail / -32765 * 60 : (
                          // Legacy Moz pages
                          0
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        }
        function isExternalTarget2(el, e) {
          var related = e.relatedTarget;
          if (!related) {
            return true;
          }
          try {
            while (related && related !== el) {
              related = related.parentNode;
            }
          } catch (err) {
            return false;
          }
          return related !== el;
        }
        var DomEvent = {
          __proto__: null,
          on: on2,
          off: off2,
          stopPropagation,
          disableScrollPropagation,
          disableClickPropagation,
          preventDefault: preventDefault2,
          stop,
          getPropagationPath: getPropagationPath2,
          getMousePosition,
          getWheelDelta,
          isExternalTarget: isExternalTarget2,
          addListener: on2,
          removeListener: off2
        };
        var PosAnimation = Evented.extend({
          // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
          // Run an animation of a given element to a new position, optionally setting
          // duration in seconds (`0.25` by default) and easing linearity factor (3rd
          // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
          // `0.5` by default).
          run: function(el, newPos, duration, easeLinearity) {
            this.stop();
            this._el = el;
            this._inProgress = true;
            this._duration = duration || 0.25;
            this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
            this._startPos = getPosition(el);
            this._offset = newPos.subtract(this._startPos);
            this._startTime = +/* @__PURE__ */ new Date();
            this.fire("start");
            this._animate();
          },
          // @method stop()
          // Stops the animation (if currently running).
          stop: function() {
            if (!this._inProgress) {
              return;
            }
            this._step(true);
            this._complete();
          },
          _animate: function() {
            this._animId = requestAnimFrame(this._animate, this);
            this._step();
          },
          _step: function(round) {
            var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
            if (elapsed < duration) {
              this._runFrame(this._easeOut(elapsed / duration), round);
            } else {
              this._runFrame(1);
              this._complete();
            }
          },
          _runFrame: function(progress, round) {
            var pos = this._startPos.add(this._offset.multiplyBy(progress));
            if (round) {
              pos._round();
            }
            setPosition(this._el, pos);
            this.fire("step");
          },
          _complete: function() {
            cancelAnimFrame(this._animId);
            this._inProgress = false;
            this.fire("end");
          },
          _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower);
          }
        });
        var Map = Evented.extend({
          options: {
            // @section Map State Options
            // @option crs: CRS = L.CRS.EPSG3857
            // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
            // sure what it means.
            crs: EPSG3857,
            // @option center: LatLng = undefined
            // Initial geographic center of the map
            center: void 0,
            // @option zoom: Number = undefined
            // Initial map zoom level
            zoom: void 0,
            // @option minZoom: Number = *
            // Minimum zoom level of the map.
            // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
            // the lowest of their `minZoom` options will be used instead.
            minZoom: void 0,
            // @option maxZoom: Number = *
            // Maximum zoom level of the map.
            // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
            // the highest of their `maxZoom` options will be used instead.
            maxZoom: void 0,
            // @option layers: Layer[] = []
            // Array of layers that will be added to the map initially
            layers: [],
            // @option maxBounds: LatLngBounds = null
            // When this option is set, the map restricts the view to the given
            // geographical bounds, bouncing the user back if the user tries to pan
            // outside the view. To set the restriction dynamically, use
            // [`setMaxBounds`](#map-setmaxbounds) method.
            maxBounds: void 0,
            // @option renderer: Renderer = *
            // The default method for drawing vector layers on the map. `L.SVG`
            // or `L.Canvas` by default depending on browser support.
            renderer: void 0,
            // @section Animation Options
            // @option zoomAnimation: Boolean = true
            // Whether the map zoom animation is enabled. By default it's enabled
            // in all browsers that support CSS3 Transitions except Android.
            zoomAnimation: true,
            // @option zoomAnimationThreshold: Number = 4
            // Won't animate zoom if the zoom difference exceeds this value.
            zoomAnimationThreshold: 4,
            // @option fadeAnimation: Boolean = true
            // Whether the tile fade animation is enabled. By default it's enabled
            // in all browsers that support CSS3 Transitions except Android.
            fadeAnimation: true,
            // @option markerZoomAnimation: Boolean = true
            // Whether markers animate their zoom with the zoom animation, if disabled
            // they will disappear for the length of the animation. By default it's
            // enabled in all browsers that support CSS3 Transitions except Android.
            markerZoomAnimation: true,
            // @option transform3DLimit: Number = 2^23
            // Defines the maximum size of a CSS translation transform. The default
            // value should not be changed unless a web browser positions layers in
            // the wrong place after doing a large `panBy`.
            transform3DLimit: 8388608,
            // Precision limit of a 32-bit float
            // @section Interaction Options
            // @option zoomSnap: Number = 1
            // Forces the map's zoom level to always be a multiple of this, particularly
            // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
            // By default, the zoom level snaps to the nearest integer; lower values
            // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
            // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
            zoomSnap: 1,
            // @option zoomDelta: Number = 1
            // Controls how much the map's zoom level will change after a
            // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
            // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
            // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
            zoomDelta: 1,
            // @option trackResize: Boolean = true
            // Whether the map automatically handles browser window resize to update itself.
            trackResize: true
          },
          initialize: function(id, options) {
            options = setOptions(this, options);
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._sizeChanged = true;
            this._initContainer(id);
            this._initLayout();
            this._onResize = bind(this._onResize, this);
            this._initEvents();
            if (options.maxBounds) {
              this.setMaxBounds(options.maxBounds);
            }
            if (options.zoom !== void 0) {
              this._zoom = this._limitZoom(options.zoom);
            }
            if (options.center && options.zoom !== void 0) {
              this.setView(toLatLng(options.center), options.zoom, { reset: true });
            }
            this.callInitHooks();
            this._zoomAnimated = TRANSITION2 && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
            if (this._zoomAnimated) {
              this._createAnimProxy();
              on2(this._proxy, TRANSITION_END2, this._catchTransitionEnd, this);
            }
            this._addLayers(this.options.layers);
          },
          // @section Methods for modifying map state
          // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
          // Sets the view of the map (geographical center and zoom) with the given
          // animation options.
          setView: function(center, zoom2, options) {
            zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
            center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
            options = options || {};
            this._stop();
            if (this._loaded && !options.reset && options !== true) {
              if (options.animate !== void 0) {
                options.zoom = extend({ animate: options.animate }, options.zoom);
                options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
              }
              var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
              if (moved) {
                clearTimeout(this._sizeTimer);
                return this;
              }
            }
            this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
            return this;
          },
          // @method setZoom(zoom: Number, options?: Zoom/pan options): this
          // Sets the zoom of the map.
          setZoom: function(zoom2, options) {
            if (!this._loaded) {
              this._zoom = zoom2;
              return this;
            }
            return this.setView(this.getCenter(), zoom2, { zoom: options });
          },
          // @method zoomIn(delta?: Number, options?: Zoom options): this
          // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
          zoomIn: function(delta, options) {
            delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom + delta, options);
          },
          // @method zoomOut(delta?: Number, options?: Zoom options): this
          // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
          zoomOut: function(delta, options) {
            delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom - delta, options);
          },
          // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
          // Zooms the map while keeping a specified geographical point on the map
          // stationary (e.g. used internally for scroll zoom and double-click zoom).
          // @alternative
          // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
          // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
          setZoomAround: function(latlng, zoom2, options) {
            var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point2 ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
            return this.setView(newCenter, zoom2, { zoom: options });
          },
          _getBoundsCenterZoom: function(bounds, options) {
            options = options || {};
            bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
            var paddingTL = toPoint2(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint2(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
            zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
            if (zoom2 === Infinity) {
              return {
                center: bounds.getCenter(),
                zoom: zoom2
              };
            }
            var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
            return {
              center,
              zoom: zoom2
            };
          },
          // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
          // Sets a map view that contains the given geographical bounds with the
          // maximum zoom level possible.
          fitBounds: function(bounds, options) {
            bounds = toLatLngBounds(bounds);
            if (!bounds.isValid()) {
              throw new Error("Bounds are not valid.");
            }
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.setView(target.center, target.zoom, options);
          },
          // @method fitWorld(options?: fitBounds options): this
          // Sets a map view that mostly contains the whole world with the maximum
          // zoom level possible.
          fitWorld: function(options) {
            return this.fitBounds([[-90, -180], [90, 180]], options);
          },
          // @method panTo(latlng: LatLng, options?: Pan options): this
          // Pans the map to a given center.
          panTo: function(center, options) {
            return this.setView(center, this._zoom, { pan: options });
          },
          // @method panBy(offset: Point, options?: Pan options): this
          // Pans the map by a given number of pixels (animated).
          panBy: function(offset, options) {
            offset = toPoint2(offset).round();
            options = options || {};
            if (!offset.x && !offset.y) {
              return this.fire("moveend");
            }
            if (options.animate !== true && !this.getSize().contains(offset)) {
              this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
              return this;
            }
            if (!this._panAnim) {
              this._panAnim = new PosAnimation();
              this._panAnim.on({
                "step": this._onPanTransitionStep,
                "end": this._onPanTransitionEnd
              }, this);
            }
            if (!options.noMoveStart) {
              this.fire("movestart");
            }
            if (options.animate !== false) {
              addClass(this._mapPane, "leaflet-pan-anim");
              var newPos = this._getMapPanePos().subtract(offset).round();
              this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
            } else {
              this._rawPanBy(offset);
              this.fire("move").fire("moveend");
            }
            return this;
          },
          // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
          // Sets the view of the map (geographical center and zoom) performing a smooth
          // pan-zoom animation.
          flyTo: function(targetCenter, targetZoom, options) {
            options = options || {};
            if (options.animate === false || !Browser.any3d) {
              return this.setView(targetCenter, targetZoom, options);
            }
            this._stop();
            var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
            targetCenter = toLatLng(targetCenter);
            targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
            var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
            function r(i) {
              var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
              var log = sq < 1e-9 ? -18 : Math.log(sq);
              return log;
            }
            function sinh(n) {
              return (Math.exp(n) - Math.exp(-n)) / 2;
            }
            function cosh(n) {
              return (Math.exp(n) + Math.exp(-n)) / 2;
            }
            function tanh(n) {
              return sinh(n) / cosh(n);
            }
            var r0 = r(0);
            function w(s) {
              return w0 * (cosh(r0) / cosh(r0 + rho * s));
            }
            function u(s) {
              return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
            }
            function easeOut(t) {
              return 1 - Math.pow(1 - t, 1.5);
            }
            var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
            function frame() {
              var t = (Date.now() - start) / duration, s = easeOut(t) * S;
              if (t <= 1) {
                this._flyToFrame = requestAnimFrame(frame, this);
                this._move(
                  this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
                  this.getScaleZoom(w0 / w(s), startZoom),
                  { flyTo: true }
                );
              } else {
                this._move(targetCenter, targetZoom)._moveEnd(true);
              }
            }
            this._moveStart(true, options.noMoveStart);
            frame.call(this);
            return this;
          },
          // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
          // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
          // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
          flyToBounds: function(bounds, options) {
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.flyTo(target.center, target.zoom, options);
          },
          // @method setMaxBounds(bounds: LatLngBounds): this
          // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
          setMaxBounds: function(bounds) {
            bounds = toLatLngBounds(bounds);
            if (this.listens("moveend", this._panInsideMaxBounds)) {
              this.off("moveend", this._panInsideMaxBounds);
            }
            if (!bounds.isValid()) {
              this.options.maxBounds = null;
              return this;
            }
            this.options.maxBounds = bounds;
            if (this._loaded) {
              this._panInsideMaxBounds();
            }
            return this.on("moveend", this._panInsideMaxBounds);
          },
          // @method setMinZoom(zoom: Number): this
          // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
          setMinZoom: function(zoom2) {
            var oldZoom = this.options.minZoom;
            this.options.minZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() < this.options.minZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          // @method setMaxZoom(zoom: Number): this
          // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
          setMaxZoom: function(zoom2) {
            var oldZoom = this.options.maxZoom;
            this.options.maxZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() > this.options.maxZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
          // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
          panInsideBounds: function(bounds, options) {
            this._enforcingBounds = true;
            var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
            if (!center.equals(newCenter)) {
              this.panTo(newCenter, options);
            }
            this._enforcingBounds = false;
            return this;
          },
          // @method panInside(latlng: LatLng, options?: padding options): this
          // Pans the map the minimum amount to make the `latlng` visible. Use
          // padding options to fit the display to more restricted bounds.
          // If `latlng` is already within the (optionally padded) display bounds,
          // the map will not be panned.
          panInside: function(latlng, options) {
            options = options || {};
            var paddingTL = toPoint2(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint2(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
            if (!paddedBounds.contains(pixelPoint)) {
              this._enforcingBounds = true;
              var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
              var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
              pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
              pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
              this.panTo(this.unproject(pixelCenter), options);
              this._enforcingBounds = false;
            }
            return this;
          },
          // @method invalidateSize(options: Zoom/pan options): this
          // Checks if the map container size changed and updates the map if so —
          // call it after you've changed the map size dynamically, also animating
          // pan by default. If `options.pan` is `false`, panning will not occur.
          // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
          // that it doesn't happen often even if the method is called many
          // times in a row.
          // @alternative
          // @method invalidateSize(animate: Boolean): this
          // Checks if the map container size changed and updates the map if so —
          // call it after you've changed the map size dynamically, also animating
          // pan by default.
          invalidateSize: function(options) {
            if (!this._loaded) {
              return this;
            }
            options = extend({
              animate: false,
              pan: true
            }, options === true ? { animate: true } : options);
            var oldSize = this.getSize();
            this._sizeChanged = true;
            this._lastCenter = null;
            var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
            if (!offset.x && !offset.y) {
              return this;
            }
            if (options.animate && options.pan) {
              this.panBy(offset);
            } else {
              if (options.pan) {
                this._rawPanBy(offset);
              }
              this.fire("move");
              if (options.debounceMoveend) {
                clearTimeout(this._sizeTimer);
                this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
              } else {
                this.fire("moveend");
              }
            }
            return this.fire("resize", {
              oldSize,
              newSize
            });
          },
          // @section Methods for modifying map state
          // @method stop(): this
          // Stops the currently running `panTo` or `flyTo` animation, if any.
          stop: function() {
            this.setZoom(this._limitZoom(this._zoom));
            if (!this.options.zoomSnap) {
              this.fire("viewreset");
            }
            return this._stop();
          },
          // @section Geolocation methods
          // @method locate(options?: Locate options): this
          // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
          // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
          // and optionally sets the map view to the user's location with respect to
          // detection accuracy (or to the world view if geolocation failed).
          // Note that, if your page doesn't use HTTPS, this method will fail in
          // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
          // See `Locate options` for more details.
          locate: function(options) {
            options = this._locateOptions = extend({
              timeout: 1e4,
              watch: false
              // setView: false
              // maxZoom: <Number>
              // maximumAge: 0
              // enableHighAccuracy: false
            }, options);
            if (!("geolocation" in navigator)) {
              this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
              });
              return this;
            }
            var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
            if (options.watch) {
              this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
            } else {
              navigator.geolocation.getCurrentPosition(onResponse, onError, options);
            }
            return this;
          },
          // @method stopLocate(): this
          // Stops watching location previously initiated by `map.locate({watch: true})`
          // and aborts resetting the map view if map.locate was called with
          // `{setView: true}`.
          stopLocate: function() {
            if (navigator.geolocation && navigator.geolocation.clearWatch) {
              navigator.geolocation.clearWatch(this._locationWatchId);
            }
            if (this._locateOptions) {
              this._locateOptions.setView = false;
            }
            return this;
          },
          _handleGeolocationError: function(error) {
            if (!this._container._leaflet_id) {
              return;
            }
            var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
            if (this._locateOptions.setView && !this._loaded) {
              this.fitWorld();
            }
            this.fire("locationerror", {
              code: c,
              message: "Geolocation error: " + message + "."
            });
          },
          _handleGeolocationResponse: function(pos) {
            if (!this._container._leaflet_id) {
              return;
            }
            var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng2(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
            if (options.setView) {
              var zoom2 = this.getBoundsZoom(bounds);
              this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
            }
            var data = {
              latlng,
              bounds,
              timestamp: pos.timestamp
            };
            for (var i in pos.coords) {
              if (typeof pos.coords[i] === "number") {
                data[i] = pos.coords[i];
              }
            }
            this.fire("locationfound", data);
          },
          // TODO Appropriate docs section?
          // @section Other Methods
          // @method addHandler(name: String, HandlerClass: Function): this
          // Adds a new `Handler` to the map, given its name and constructor function.
          addHandler: function(name, HandlerClass) {
            if (!HandlerClass) {
              return this;
            }
            var handler = this[name] = new HandlerClass(this);
            this._handlers.push(handler);
            if (this.options[name]) {
              handler.enable();
            }
            return this;
          },
          // @method remove(): this
          // Destroys the map and clears all related event listeners.
          remove: function() {
            this._initEvents(true);
            if (this.options.maxBounds) {
              this.off("moveend", this._panInsideMaxBounds);
            }
            if (this._containerId !== this._container._leaflet_id) {
              throw new Error("Map container is being reused by another instance");
            }
            try {
              delete this._container._leaflet_id;
              delete this._containerId;
            } catch (e) {
              this._container._leaflet_id = void 0;
              this._containerId = void 0;
            }
            if (this._locationWatchId !== void 0) {
              this.stopLocate();
            }
            this._stop();
            remove(this._mapPane);
            if (this._clearControlPos) {
              this._clearControlPos();
            }
            if (this._resizeRequest) {
              cancelAnimFrame(this._resizeRequest);
              this._resizeRequest = null;
            }
            this._clearHandlers();
            if (this._loaded) {
              this.fire("unload");
            }
            var i;
            for (i in this._layers) {
              this._layers[i].remove();
            }
            for (i in this._panes) {
              remove(this._panes[i]);
            }
            this._layers = [];
            this._panes = [];
            delete this._mapPane;
            delete this._renderer;
            return this;
          },
          // @section Other Methods
          // @method createPane(name: String, container?: HTMLElement): HTMLElement
          // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
          // then returns it. The pane is created as a child of `container`, or
          // as a child of the main map pane if not set.
          createPane: function(name, container) {
            var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
            if (name) {
              this._panes[name] = pane;
            }
            return pane;
          },
          // @section Methods for Getting Map State
          // @method getCenter(): LatLng
          // Returns the geographical center of the map view
          getCenter: function() {
            this._checkIfLoaded();
            if (this._lastCenter && !this._moved()) {
              return this._lastCenter.clone();
            }
            return this.layerPointToLatLng(this._getCenterLayerPoint());
          },
          // @method getZoom(): Number
          // Returns the current zoom level of the map view
          getZoom: function() {
            return this._zoom;
          },
          // @method getBounds(): LatLngBounds
          // Returns the geographical bounds visible in the current map view
          getBounds: function() {
            var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
            return new LatLngBounds(sw, ne);
          },
          // @method getMinZoom(): Number
          // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
          getMinZoom: function() {
            return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
          },
          // @method getMaxZoom(): Number
          // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
          getMaxZoom: function() {
            return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
          },
          // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
          // Returns the maximum zoom level on which the given bounds fit to the map
          // view in its entirety. If `inside` (optional) is set to `true`, the method
          // instead returns the minimum zoom level on which the map view fits into
          // the given bounds in its entirety.
          getBoundsZoom: function(bounds, inside, padding) {
            bounds = toLatLngBounds(bounds);
            padding = toPoint2(padding || [0, 0]);
            var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
            zoom2 = this.getScaleZoom(scale2, zoom2);
            if (snap) {
              zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
              zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          // @method getSize(): Point
          // Returns the current size of the map container (in pixels).
          getSize: function() {
            if (!this._size || this._sizeChanged) {
              this._size = new Point2(
                this._container.clientWidth || 0,
                this._container.clientHeight || 0
              );
              this._sizeChanged = false;
            }
            return this._size.clone();
          },
          // @method getPixelBounds(): Bounds
          // Returns the bounds of the current map view in projected pixel
          // coordinates (sometimes useful in layer and overlay implementations).
          getPixelBounds: function(center, zoom2) {
            var topLeftPoint = this._getTopLeftPoint(center, zoom2);
            return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
          },
          // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
          // the map pane? "left point of the map layer" can be confusing, specially
          // since there can be negative offsets.
          // @method getPixelOrigin(): Point
          // Returns the projected pixel coordinates of the top left point of
          // the map layer (useful in custom layer and overlay implementations).
          getPixelOrigin: function() {
            this._checkIfLoaded();
            return this._pixelOrigin;
          },
          // @method getPixelWorldBounds(zoom?: Number): Bounds
          // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
          // If `zoom` is omitted, the map's current zoom level is used.
          getPixelWorldBounds: function(zoom2) {
            return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
          },
          // @section Other Methods
          // @method getPane(pane: String|HTMLElement): HTMLElement
          // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
          getPane: function(pane) {
            return typeof pane === "string" ? this._panes[pane] : pane;
          },
          // @method getPanes(): Object
          // Returns a plain object containing the names of all [panes](#map-pane) as keys and
          // the panes as values.
          getPanes: function() {
            return this._panes;
          },
          // @method getContainer: HTMLElement
          // Returns the HTML element that contains the map.
          getContainer: function() {
            return this._container;
          },
          // @section Conversion Methods
          // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
          // Returns the scale factor to be applied to a map transition from zoom level
          // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
          getZoomScale: function(toZoom, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            return crs.scale(toZoom) / crs.scale(fromZoom);
          },
          // @method getScaleZoom(scale: Number, fromZoom: Number): Number
          // Returns the zoom level that the map would end up at, if it is at `fromZoom`
          // level and everything is scaled by a factor of `scale`. Inverse of
          // [`getZoomScale`](#map-getZoomScale).
          getScaleZoom: function(scale2, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
            return isNaN(zoom2) ? Infinity : zoom2;
          },
          // @method project(latlng: LatLng, zoom: Number): Point
          // Projects a geographical coordinate `LatLng` according to the projection
          // of the map's CRS, then scales it according to `zoom` and the CRS's
          // `Transformation`. The result is pixel coordinate relative to
          // the CRS origin.
          project: function(latlng, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
          },
          // @method unproject(point: Point, zoom: Number): LatLng
          // Inverse of [`project`](#map-project).
          unproject: function(point, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.pointToLatLng(toPoint2(point), zoom2);
          },
          // @method layerPointToLatLng(point: Point): LatLng
          // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
          // returns the corresponding geographical coordinate (for the current zoom level).
          layerPointToLatLng: function(point) {
            var projectedPoint = toPoint2(point).add(this.getPixelOrigin());
            return this.unproject(projectedPoint);
          },
          // @method latLngToLayerPoint(latlng: LatLng): Point
          // Given a geographical coordinate, returns the corresponding pixel coordinate
          // relative to the [origin pixel](#map-getpixelorigin).
          latLngToLayerPoint: function(latlng) {
            var projectedPoint = this.project(toLatLng(latlng))._round();
            return projectedPoint._subtract(this.getPixelOrigin());
          },
          // @method wrapLatLng(latlng: LatLng): LatLng
          // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
          // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
          // CRS's bounds.
          // By default this means longitude is wrapped around the dateline so its
          // value is between -180 and +180 degrees.
          wrapLatLng: function(latlng) {
            return this.options.crs.wrapLatLng(toLatLng(latlng));
          },
          // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
          // Returns a `LatLngBounds` with the same size as the given one, ensuring that
          // its center is within the CRS's bounds.
          // By default this means the center longitude is wrapped around the dateline so its
          // value is between -180 and +180 degrees, and the majority of the bounds
          // overlaps the CRS's bounds.
          wrapLatLngBounds: function(latlng) {
            return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
          },
          // @method distance(latlng1: LatLng, latlng2: LatLng): Number
          // Returns the distance between two geographical coordinates according to
          // the map's CRS. By default this measures distance in meters.
          distance: function(latlng1, latlng2) {
            return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
          },
          // @method containerPointToLayerPoint(point: Point): Point
          // Given a pixel coordinate relative to the map container, returns the corresponding
          // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
          containerPointToLayerPoint: function(point) {
            return toPoint2(point).subtract(this._getMapPanePos());
          },
          // @method layerPointToContainerPoint(point: Point): Point
          // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
          // returns the corresponding pixel coordinate relative to the map container.
          layerPointToContainerPoint: function(point) {
            return toPoint2(point).add(this._getMapPanePos());
          },
          // @method containerPointToLatLng(point: Point): LatLng
          // Given a pixel coordinate relative to the map container, returns
          // the corresponding geographical coordinate (for the current zoom level).
          containerPointToLatLng: function(point) {
            var layerPoint = this.containerPointToLayerPoint(toPoint2(point));
            return this.layerPointToLatLng(layerPoint);
          },
          // @method latLngToContainerPoint(latlng: LatLng): Point
          // Given a geographical coordinate, returns the corresponding pixel coordinate
          // relative to the map container.
          latLngToContainerPoint: function(latlng) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
          },
          // @method mouseEventToContainerPoint(ev: MouseEvent): Point
          // Given a MouseEvent object, returns the pixel coordinate relative to the
          // map container where the event took place.
          mouseEventToContainerPoint: function(e) {
            return getMousePosition(e, this._container);
          },
          // @method mouseEventToLayerPoint(ev: MouseEvent): Point
          // Given a MouseEvent object, returns the pixel coordinate relative to
          // the [origin pixel](#map-getpixelorigin) where the event took place.
          mouseEventToLayerPoint: function(e) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
          },
          // @method mouseEventToLatLng(ev: MouseEvent): LatLng
          // Given a MouseEvent object, returns geographical coordinate where the
          // event took place.
          mouseEventToLatLng: function(e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
          },
          // map initialization methods
          _initContainer: function(id) {
            var container = this._container = get2(id);
            if (!container) {
              throw new Error("Map container not found.");
            } else if (container._leaflet_id) {
              throw new Error("Map container is already initialized.");
            }
            on2(container, "scroll", this._onScroll, this);
            this._containerId = stamp2(container);
          },
          _initLayout: function() {
            var container = this._container;
            this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
            addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var position = getStyle(container, "position");
            if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
              container.style.position = "relative";
            }
            this._initPanes();
            if (this._initControlPos) {
              this._initControlPos();
            }
          },
          _initPanes: function() {
            var panes = this._panes = {};
            this._paneRenderers = {};
            this._mapPane = this.createPane("mapPane", this._container);
            setPosition(this._mapPane, new Point2(0, 0));
            this.createPane("tilePane");
            this.createPane("overlayPane");
            this.createPane("shadowPane");
            this.createPane("markerPane");
            this.createPane("tooltipPane");
            this.createPane("popupPane");
            if (!this.options.markerZoomAnimation) {
              addClass(panes.markerPane, "leaflet-zoom-hide");
              addClass(panes.shadowPane, "leaflet-zoom-hide");
            }
          },
          // private methods that modify map state
          // @section Map state change events
          _resetView: function(center, zoom2, noMoveStart) {
            setPosition(this._mapPane, new Point2(0, 0));
            var loading = !this._loaded;
            this._loaded = true;
            zoom2 = this._limitZoom(zoom2);
            this.fire("viewprereset");
            var zoomChanged = this._zoom !== zoom2;
            this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
            this.fire("viewreset");
            if (loading) {
              this.fire("load");
            }
          },
          _moveStart: function(zoomChanged, noMoveStart) {
            if (zoomChanged) {
              this.fire("zoomstart");
            }
            if (!noMoveStart) {
              this.fire("movestart");
            }
            return this;
          },
          _move: function(center, zoom2, data, supressEvent) {
            if (zoom2 === void 0) {
              zoom2 = this._zoom;
            }
            var zoomChanged = this._zoom !== zoom2;
            this._zoom = zoom2;
            this._lastCenter = center;
            this._pixelOrigin = this._getNewPixelOrigin(center);
            if (!supressEvent) {
              if (zoomChanged || data && data.pinch) {
                this.fire("zoom", data);
              }
              this.fire("move", data);
            } else if (data && data.pinch) {
              this.fire("zoom", data);
            }
            return this;
          },
          _moveEnd: function(zoomChanged) {
            if (zoomChanged) {
              this.fire("zoomend");
            }
            return this.fire("moveend");
          },
          _stop: function() {
            cancelAnimFrame(this._flyToFrame);
            if (this._panAnim) {
              this._panAnim.stop();
            }
            return this;
          },
          _rawPanBy: function(offset) {
            setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
          },
          _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom();
          },
          _panInsideMaxBounds: function() {
            if (!this._enforcingBounds) {
              this.panInsideBounds(this.options.maxBounds);
            }
          },
          _checkIfLoaded: function() {
            if (!this._loaded) {
              throw new Error("Set map center and zoom first.");
            }
          },
          // DOM event handling
          // @section Interaction events
          _initEvents: function(remove2) {
            this._targets = {};
            this._targets[stamp2(this._container)] = this;
            var onOff = remove2 ? off2 : on2;
            onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
            if (this.options.trackResize) {
              onOff(window, "resize", this._onResize, this);
            }
            if (Browser.any3d && this.options.transform3DLimit) {
              (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
            }
          },
          _onResize: function() {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = requestAnimFrame(
              function() {
                this.invalidateSize({ debounceMoveend: true });
              },
              this
            );
          },
          _onScroll: function() {
            this._container.scrollTop = 0;
            this._container.scrollLeft = 0;
          },
          _onMoveEnd: function() {
            var pos = this._getMapPanePos();
            if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
              this._resetView(this.getCenter(), this.getZoom());
            }
          },
          _findEventTargets: function(e, type) {
            var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
            while (src) {
              target = this._targets[stamp2(src)];
              if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
                dragging = true;
                break;
              }
              if (target && target.listens(type, true)) {
                if (isHover && !isExternalTarget2(src, e)) {
                  break;
                }
                targets.push(target);
                if (isHover) {
                  break;
                }
              }
              if (src === this._container) {
                break;
              }
              src = src.parentNode;
            }
            if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
              targets = [this];
            }
            return targets;
          },
          _isClickDisabled: function(el) {
            while (el && el !== this._container) {
              if (el["_leaflet_disable_click"]) {
                return true;
              }
              el = el.parentNode;
            }
          },
          _handleDOMEvent: function(e) {
            var el = e.target || e.srcElement;
            if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
              return;
            }
            var type = e.type;
            if (type === "mousedown") {
              preventOutline(el);
            }
            this._fireDOMEvent(e, type);
          },
          _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
          _fireDOMEvent: function(e, type, canvasTargets) {
            if (e.type === "click") {
              var synth = extend({}, e);
              synth.type = "preclick";
              this._fireDOMEvent(synth, synth.type, canvasTargets);
            }
            var targets = this._findEventTargets(e, type);
            if (canvasTargets) {
              var filtered = [];
              for (var i = 0; i < canvasTargets.length; i++) {
                if (canvasTargets[i].listens(type, true)) {
                  filtered.push(canvasTargets[i]);
                }
              }
              targets = filtered.concat(targets);
            }
            if (!targets.length) {
              return;
            }
            if (type === "contextmenu") {
              preventDefault2(e);
            }
            var target = targets[0];
            var data = {
              originalEvent: e
            };
            if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
              var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
              data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
              data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
              data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
            }
            for (i = 0; i < targets.length; i++) {
              targets[i].fire(type, data, true);
              if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf2(this._mouseEvents, type) !== -1) {
                return;
              }
            }
          },
          _draggableMoved: function(obj) {
            obj = obj.dragging && obj.dragging.enabled() ? obj : this;
            return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
          },
          _clearHandlers: function() {
            for (var i = 0, len = this._handlers.length; i < len; i++) {
              this._handlers[i].disable();
            }
          },
          // @section Other Methods
          // @method whenReady(fn: Function, context?: Object): this
          // Runs the given function `fn` when the map gets initialized with
          // a view (center and zoom) and at least one layer, or immediately
          // if it's already initialized, optionally passing a function context.
          whenReady: function(callback, context) {
            if (this._loaded) {
              callback.call(context || this, { target: this });
            } else {
              this.on("load", callback, context);
            }
            return this;
          },
          // private methods for getting map state
          _getMapPanePos: function() {
            return getPosition(this._mapPane) || new Point2(0, 0);
          },
          _moved: function() {
            var pos = this._getMapPanePos();
            return pos && !pos.equals([0, 0]);
          },
          _getTopLeftPoint: function(center, zoom2) {
            var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
            return pixelOrigin.subtract(this._getMapPanePos());
          },
          _getNewPixelOrigin: function(center, zoom2) {
            var viewHalf = this.getSize()._divideBy(2);
            return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
          },
          _latLngToNewLayerPoint: function(latlng, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return this.project(latlng, zoom2)._subtract(topLeft);
          },
          _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return toBounds([
              this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
            ]);
          },
          // layer point of the current center
          _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
          },
          // offset of the specified place to the current center in pixels
          _getCenterOffset: function(latlng) {
            return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
          },
          // adjust center for view to get inside bounds
          _limitCenter: function(center, zoom2, bounds) {
            if (!bounds) {
              return center;
            }
            var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
            if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
              return center;
            }
            return this.unproject(centerPoint.add(offset), zoom2);
          },
          // adjust offset for view to get inside bounds
          _limitOffset: function(offset, bounds) {
            if (!bounds) {
              return offset;
            }
            var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
            return offset.add(this._getBoundsOffset(newBounds, bounds));
          },
          // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
          _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
            var projectedMaxBounds = toBounds(
              this.project(maxBounds.getNorthEast(), zoom2),
              this.project(maxBounds.getSouthWest(), zoom2)
            ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
            return new Point2(dx, dy);
          },
          _rebound: function(left, right) {
            return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
          },
          _limitZoom: function(zoom2) {
            var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
              zoom2 = Math.round(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          _onPanTransitionStep: function() {
            this.fire("move");
          },
          _onPanTransitionEnd: function() {
            removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend");
          },
          _tryAnimatedPan: function(center, options) {
            var offset = this._getCenterOffset(center)._trunc();
            if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
              return false;
            }
            this.panBy(offset, options);
            return true;
          },
          _createAnimProxy: function() {
            var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(proxy);
            this.on("zoomanim", function(e) {
              var prop = TRANSFORM2, transform = this._proxy.style[prop];
              setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
              if (transform === this._proxy.style[prop] && this._animatingZoom) {
                this._onZoomTransitionEnd();
              }
            }, this);
            this.on("load moveend", this._animMoveEnd, this);
            this._on("unload", this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function() {
            remove(this._proxy);
            this.off("load moveend", this._animMoveEnd, this);
            delete this._proxy;
          },
          _animMoveEnd: function() {
            var c = this.getCenter(), z = this.getZoom();
            setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
          },
          _catchTransitionEnd: function(e) {
            if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
              this._onZoomTransitionEnd();
            }
          },
          _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
          },
          _tryAnimatedZoom: function(center, zoom2, options) {
            if (this._animatingZoom) {
              return true;
            }
            options = options || {};
            if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
              return false;
            }
            var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
            if (options.animate !== true && !this.getSize().contains(offset)) {
              return false;
            }
            requestAnimFrame(function() {
              this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
            }, this);
            return true;
          },
          _animateZoom: function(center, zoom2, startAnim, noUpdate) {
            if (!this._mapPane) {
              return;
            }
            if (startAnim) {
              this._animatingZoom = true;
              this._animateToCenter = center;
              this._animateToZoom = zoom2;
              addClass(this._mapPane, "leaflet-zoom-anim");
            }
            this.fire("zoomanim", {
              center,
              zoom: zoom2,
              noUpdate
            });
            if (!this._tempFireZoomEvent) {
              this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
            }
            this._move(this._animateToCenter, this._animateToZoom, void 0, true);
            setTimeout(bind(this._onZoomTransitionEnd, this), 250);
          },
          _onZoomTransitionEnd: function() {
            if (!this._animatingZoom) {
              return;
            }
            if (this._mapPane) {
              removeClass(this._mapPane, "leaflet-zoom-anim");
            }
            this._animatingZoom = false;
            this._move(this._animateToCenter, this._animateToZoom, void 0, true);
            if (this._tempFireZoomEvent) {
              this.fire("zoom");
            }
            delete this._tempFireZoomEvent;
            this.fire("move");
            this._moveEnd(true);
          }
        });
        function createMap(id, options) {
          return new Map(id, options);
        }
        var Control = Class.extend({
          // @section
          // @aka Control Options
          options: {
            // @option position: String = 'topright'
            // The position of the control (one of the map corners). Possible values are `'topleft'`,
            // `'topright'`, `'bottomleft'` or `'bottomright'`
            position: "topright"
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          /* @section
           * Classes extending L.Control will inherit the following methods:
           *
           * @method getPosition: string
           * Returns the position of the control.
           */
          getPosition: function() {
            return this.options.position;
          },
          // @method setPosition(position: string): this
          // Sets the position of the control.
          setPosition: function(position) {
            var map = this._map;
            if (map) {
              map.removeControl(this);
            }
            this.options.position = position;
            if (map) {
              map.addControl(this);
            }
            return this;
          },
          // @method getContainer: HTMLElement
          // Returns the HTMLElement that contains the control.
          getContainer: function() {
            return this._container;
          },
          // @method addTo(map: Map): this
          // Adds the control to the given map.
          addTo: function(map) {
            this.remove();
            this._map = map;
            var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
            addClass(container, "leaflet-control");
            if (pos.indexOf("bottom") !== -1) {
              corner.insertBefore(container, corner.firstChild);
            } else {
              corner.appendChild(container);
            }
            this._map.on("unload", this.remove, this);
            return this;
          },
          // @method remove: this
          // Removes the control from the map it is currently active on.
          remove: function() {
            if (!this._map) {
              return this;
            }
            remove(this._container);
            if (this.onRemove) {
              this.onRemove(this._map);
            }
            this._map.off("unload", this.remove, this);
            this._map = null;
            return this;
          },
          _refocusOnMap: function(e) {
            if (this._map && e && e.screenX > 0 && e.screenY > 0) {
              this._map.getContainer().focus();
            }
          }
        });
        var control = function(options) {
          return new Control(options);
        };
        Map.include({
          // @method addControl(control: Control): this
          // Adds the given control to the map
          addControl: function(control2) {
            control2.addTo(this);
            return this;
          },
          // @method removeControl(control: Control): this
          // Removes the given control from the map
          removeControl: function(control2) {
            control2.remove();
            return this;
          },
          _initControlPos: function() {
            var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
            function createCorner(vSide, hSide) {
              var className = l + vSide + " " + l + hSide;
              corners[vSide + hSide] = create$1("div", className, container);
            }
            createCorner("top", "left");
            createCorner("top", "right");
            createCorner("bottom", "left");
            createCorner("bottom", "right");
          },
          _clearControlPos: function() {
            for (var i in this._controlCorners) {
              remove(this._controlCorners[i]);
            }
            remove(this._controlContainer);
            delete this._controlCorners;
            delete this._controlContainer;
          }
        });
        var Layers = Control.extend({
          // @section
          // @aka Control.Layers options
          options: {
            // @option collapsed: Boolean = true
            // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
            collapsed: true,
            position: "topright",
            // @option autoZIndex: Boolean = true
            // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
            autoZIndex: true,
            // @option hideSingleBase: Boolean = false
            // If `true`, the base layers in the control will be hidden when there is only one.
            hideSingleBase: false,
            // @option sortLayers: Boolean = false
            // Whether to sort the layers. When `false`, layers will keep the order
            // in which they were added to the control.
            sortLayers: false,
            // @option sortFunction: Function = *
            // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
            // that will be used for sorting the layers, when `sortLayers` is `true`.
            // The function receives both the `L.Layer` instances and their names, as in
            // `sortFunction(layerA, layerB, nameA, nameB)`.
            // By default, it sorts layers alphabetically by their name.
            sortFunction: function(layerA, layerB, nameA, nameB) {
              return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
            }
          },
          initialize: function(baseLayers, overlays, options) {
            setOptions(this, options);
            this._layerControlInputs = [];
            this._layers = [];
            this._lastZIndex = 0;
            this._handlingClick = false;
            this._preventClick = false;
            for (var i in baseLayers) {
              this._addLayer(baseLayers[i], i);
            }
            for (i in overlays) {
              this._addLayer(overlays[i], i, true);
            }
          },
          onAdd: function(map) {
            this._initLayout();
            this._update();
            this._map = map;
            map.on("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.on("add remove", this._onLayerChange, this);
            }
            return this._container;
          },
          addTo: function(map) {
            Control.prototype.addTo.call(this, map);
            return this._expandIfNotCollapsed();
          },
          onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.off("add remove", this._onLayerChange, this);
            }
          },
          // @method addBaseLayer(layer: Layer, name: String): this
          // Adds a base layer (radio button entry) with the given name to the control.
          addBaseLayer: function(layer, name) {
            this._addLayer(layer, name);
            return this._map ? this._update() : this;
          },
          // @method addOverlay(layer: Layer, name: String): this
          // Adds an overlay (checkbox entry) with the given name to the control.
          addOverlay: function(layer, name) {
            this._addLayer(layer, name, true);
            return this._map ? this._update() : this;
          },
          // @method removeLayer(layer: Layer): this
          // Remove the given layer from the control.
          removeLayer: function(layer) {
            layer.off("add remove", this._onLayerChange, this);
            var obj = this._getLayer(stamp2(layer));
            if (obj) {
              this._layers.splice(this._layers.indexOf(obj), 1);
            }
            return this._map ? this._update() : this;
          },
          // @method expand(): this
          // Expand the control container if collapsed.
          expand: function() {
            addClass(this._container, "leaflet-control-layers-expanded");
            this._section.style.height = null;
            var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
            if (acceptableHeight < this._section.clientHeight) {
              addClass(this._section, "leaflet-control-layers-scrollbar");
              this._section.style.height = acceptableHeight + "px";
            } else {
              removeClass(this._section, "leaflet-control-layers-scrollbar");
            }
            this._checkDisabledLayers();
            return this;
          },
          // @method collapse(): this
          // Collapse the control container if expanded.
          collapse: function() {
            removeClass(this._container, "leaflet-control-layers-expanded");
            return this;
          },
          _initLayout: function() {
            var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
            container.setAttribute("aria-haspopup", true);
            disableClickPropagation(container);
            disableScrollPropagation(container);
            var section = this._section = create$1("section", className + "-list");
            if (collapsed) {
              this._map.on("click", this.collapse, this);
              on2(container, {
                mouseenter: this._expandSafely,
                mouseleave: this.collapse
              }, this);
            }
            var link = this._layersLink = create$1("a", className + "-toggle", container);
            link.href = "#";
            link.title = "Layers";
            link.setAttribute("role", "button");
            on2(link, {
              keydown: function(e) {
                if (e.keyCode === 13) {
                  this._expandSafely();
                }
              },
              // Certain screen readers intercept the key event and instead send a click event
              click: function(e) {
                preventDefault2(e);
                this._expandSafely();
              }
            }, this);
            if (!collapsed) {
              this.expand();
            }
            this._baseLayersList = create$1("div", className + "-base", section);
            this._separator = create$1("div", className + "-separator", section);
            this._overlaysList = create$1("div", className + "-overlays", section);
            container.appendChild(section);
          },
          _getLayer: function(id) {
            for (var i = 0; i < this._layers.length; i++) {
              if (this._layers[i] && stamp2(this._layers[i].layer) === id) {
                return this._layers[i];
              }
            }
          },
          _addLayer: function(layer, name, overlay) {
            if (this._map) {
              layer.on("add remove", this._onLayerChange, this);
            }
            this._layers.push({
              layer,
              name,
              overlay
            });
            if (this.options.sortLayers) {
              this._layers.sort(bind(function(a, b) {
                return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
              }, this));
            }
            if (this.options.autoZIndex && layer.setZIndex) {
              this._lastZIndex++;
              layer.setZIndex(this._lastZIndex);
            }
            this._expandIfNotCollapsed();
          },
          _update: function() {
            if (!this._container) {
              return this;
            }
            empty(this._baseLayersList);
            empty(this._overlaysList);
            this._layerControlInputs = [];
            var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
            for (i = 0; i < this._layers.length; i++) {
              obj = this._layers[i];
              this._addItem(obj);
              overlaysPresent = overlaysPresent || obj.overlay;
              baseLayersPresent = baseLayersPresent || !obj.overlay;
              baseLayersCount += !obj.overlay ? 1 : 0;
            }
            if (this.options.hideSingleBase) {
              baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
              this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
            }
            this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
            return this;
          },
          _onLayerChange: function(e) {
            if (!this._handlingClick) {
              this._update();
            }
            var obj = this._getLayer(stamp2(e.target));
            var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
            if (type) {
              this._map.fire(type, obj);
            }
          },
          // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
          _createRadioElement: function(name, checked) {
            var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
            var radioFragment = document.createElement("div");
            radioFragment.innerHTML = radioHtml;
            return radioFragment.firstChild;
          },
          _addItem: function(obj) {
            var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
            if (obj.overlay) {
              input = document.createElement("input");
              input.type = "checkbox";
              input.className = "leaflet-control-layers-selector";
              input.defaultChecked = checked;
            } else {
              input = this._createRadioElement("leaflet-base-layers_" + stamp2(this), checked);
            }
            this._layerControlInputs.push(input);
            input.layerId = stamp2(obj.layer);
            on2(input, "click", this._onInputClick, this);
            var name = document.createElement("span");
            name.innerHTML = " " + obj.name;
            var holder = document.createElement("span");
            label.appendChild(holder);
            holder.appendChild(input);
            holder.appendChild(name);
            var container = obj.overlay ? this._overlaysList : this._baseLayersList;
            container.appendChild(label);
            this._checkDisabledLayers();
            return label;
          },
          _onInputClick: function() {
            if (this._preventClick) {
              return;
            }
            var inputs = this._layerControlInputs, input, layer;
            var addedLayers = [], removedLayers = [];
            this._handlingClick = true;
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              if (input.checked) {
                addedLayers.push(layer);
              } else if (!input.checked) {
                removedLayers.push(layer);
              }
            }
            for (i = 0; i < removedLayers.length; i++) {
              if (this._map.hasLayer(removedLayers[i])) {
                this._map.removeLayer(removedLayers[i]);
              }
            }
            for (i = 0; i < addedLayers.length; i++) {
              if (!this._map.hasLayer(addedLayers[i])) {
                this._map.addLayer(addedLayers[i]);
              }
            }
            this._handlingClick = false;
            this._refocusOnMap();
          },
          _checkDisabledLayers: function() {
            var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
            }
          },
          _expandIfNotCollapsed: function() {
            if (this._map && !this.options.collapsed) {
              this.expand();
            }
            return this;
          },
          _expandSafely: function() {
            var section = this._section;
            this._preventClick = true;
            on2(section, "click", preventDefault2);
            this.expand();
            var that = this;
            setTimeout(function() {
              off2(section, "click", preventDefault2);
              that._preventClick = false;
            });
          }
        });
        var layers = function(baseLayers, overlays, options) {
          return new Layers(baseLayers, overlays, options);
        };
        var Zoom = Control.extend({
          // @section
          // @aka Control.Zoom options
          options: {
            position: "topleft",
            // @option zoomInText: String = '<span aria-hidden="true">+</span>'
            // The text set on the 'zoom in' button.
            zoomInText: '<span aria-hidden="true">+</span>',
            // @option zoomInTitle: String = 'Zoom in'
            // The title set on the 'zoom in' button.
            zoomInTitle: "Zoom in",
            // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
            // The text set on the 'zoom out' button.
            zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
            // @option zoomOutTitle: String = 'Zoom out'
            // The title set on the 'zoom out' button.
            zoomOutTitle: "Zoom out"
          },
          onAdd: function(map) {
            var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
            this._zoomInButton = this._createButton(
              options.zoomInText,
              options.zoomInTitle,
              zoomName + "-in",
              container,
              this._zoomIn
            );
            this._zoomOutButton = this._createButton(
              options.zoomOutText,
              options.zoomOutTitle,
              zoomName + "-out",
              container,
              this._zoomOut
            );
            this._updateDisabled();
            map.on("zoomend zoomlevelschange", this._updateDisabled, this);
            return container;
          },
          onRemove: function(map) {
            map.off("zoomend zoomlevelschange", this._updateDisabled, this);
          },
          disable: function() {
            this._disabled = true;
            this._updateDisabled();
            return this;
          },
          enable: function() {
            this._disabled = false;
            this._updateDisabled();
            return this;
          },
          _zoomIn: function(e) {
            if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
              this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _zoomOut: function(e) {
            if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
              this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _createButton: function(html, title, className, container, fn) {
            var link = create$1("a", className, container);
            link.innerHTML = html;
            link.href = "#";
            link.title = title;
            link.setAttribute("role", "button");
            link.setAttribute("aria-label", title);
            disableClickPropagation(link);
            on2(link, "click", stop);
            on2(link, "click", fn, this);
            on2(link, "click", this._refocusOnMap, this);
            return link;
          },
          _updateDisabled: function() {
            var map = this._map, className = "leaflet-disabled";
            removeClass(this._zoomInButton, className);
            removeClass(this._zoomOutButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "false");
            this._zoomOutButton.setAttribute("aria-disabled", "false");
            if (this._disabled || map._zoom === map.getMinZoom()) {
              addClass(this._zoomOutButton, className);
              this._zoomOutButton.setAttribute("aria-disabled", "true");
            }
            if (this._disabled || map._zoom === map.getMaxZoom()) {
              addClass(this._zoomInButton, className);
              this._zoomInButton.setAttribute("aria-disabled", "true");
            }
          }
        });
        Map.mergeOptions({
          zoomControl: true
        });
        Map.addInitHook(function() {
          if (this.options.zoomControl) {
            this.zoomControl = new Zoom();
            this.addControl(this.zoomControl);
          }
        });
        var zoom = function(options) {
          return new Zoom(options);
        };
        var Scale = Control.extend({
          // @section
          // @aka Control.Scale options
          options: {
            position: "bottomleft",
            // @option maxWidth: Number = 100
            // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
            maxWidth: 100,
            // @option metric: Boolean = True
            // Whether to show the metric scale line (m/km).
            metric: true,
            // @option imperial: Boolean = True
            // Whether to show the imperial scale line (mi/ft).
            imperial: true
            // @option updateWhenIdle: Boolean = false
            // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
          },
          onAdd: function(map) {
            var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
            this._addScales(options, className + "-line", container);
            map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
            map.whenReady(this._update, this);
            return container;
          },
          onRemove: function(map) {
            map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
          },
          _addScales: function(options, className, container) {
            if (options.metric) {
              this._mScale = create$1("div", className, container);
            }
            if (options.imperial) {
              this._iScale = create$1("div", className, container);
            }
          },
          _update: function() {
            var map = this._map, y = map.getSize().y / 2;
            var maxMeters = map.distance(
              map.containerPointToLatLng([0, y]),
              map.containerPointToLatLng([this.options.maxWidth, y])
            );
            this._updateScales(maxMeters);
          },
          _updateScales: function(maxMeters) {
            if (this.options.metric && maxMeters) {
              this._updateMetric(maxMeters);
            }
            if (this.options.imperial && maxMeters) {
              this._updateImperial(maxMeters);
            }
          },
          _updateMetric: function(maxMeters) {
            var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
            this._updateScale(this._mScale, label, meters / maxMeters);
          },
          _updateImperial: function(maxMeters) {
            var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
            if (maxFeet > 5280) {
              maxMiles = maxFeet / 5280;
              miles = this._getRoundNum(maxMiles);
              this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
            } else {
              feet = this._getRoundNum(maxFeet);
              this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
            }
          },
          _updateScale: function(scale2, text, ratio) {
            scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
            scale2.innerHTML = text;
          },
          _getRoundNum: function(num) {
            var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
            d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
            return pow10 * d;
          }
        });
        var scale = function(options) {
          return new Scale(options);
        };
        var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
        var Attribution = Control.extend({
          // @section
          // @aka Control.Attribution options
          options: {
            position: "bottomright",
            // @option prefix: String|false = 'Leaflet'
            // The HTML text shown before the attributions. Pass `false` to disable.
            prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
          },
          initialize: function(options) {
            setOptions(this, options);
            this._attributions = {};
          },
          onAdd: function(map) {
            map.attributionControl = this;
            this._container = create$1("div", "leaflet-control-attribution");
            disableClickPropagation(this._container);
            for (var i in map._layers) {
              if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
              }
            }
            this._update();
            map.on("layeradd", this._addAttribution, this);
            return this._container;
          },
          onRemove: function(map) {
            map.off("layeradd", this._addAttribution, this);
          },
          _addAttribution: function(ev) {
            if (ev.layer.getAttribution) {
              this.addAttribution(ev.layer.getAttribution());
              ev.layer.once("remove", function() {
                this.removeAttribution(ev.layer.getAttribution());
              }, this);
            }
          },
          // @method setPrefix(prefix: String|false): this
          // The HTML text shown before the attributions. Pass `false` to disable.
          setPrefix: function(prefix) {
            this.options.prefix = prefix;
            this._update();
            return this;
          },
          // @method addAttribution(text: String): this
          // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
          addAttribution: function(text) {
            if (!text) {
              return this;
            }
            if (!this._attributions[text]) {
              this._attributions[text] = 0;
            }
            this._attributions[text]++;
            this._update();
            return this;
          },
          // @method removeAttribution(text: String): this
          // Removes an attribution text.
          removeAttribution: function(text) {
            if (!text) {
              return this;
            }
            if (this._attributions[text]) {
              this._attributions[text]--;
              this._update();
            }
            return this;
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            var attribs = [];
            for (var i in this._attributions) {
              if (this._attributions[i]) {
                attribs.push(i);
              }
            }
            var prefixAndAttribs = [];
            if (this.options.prefix) {
              prefixAndAttribs.push(this.options.prefix);
            }
            if (attribs.length) {
              prefixAndAttribs.push(attribs.join(", "));
            }
            this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
          }
        });
        Map.mergeOptions({
          attributionControl: true
        });
        Map.addInitHook(function() {
          if (this.options.attributionControl) {
            new Attribution().addTo(this);
          }
        });
        var attribution = function(options) {
          return new Attribution(options);
        };
        Control.Layers = Layers;
        Control.Zoom = Zoom;
        Control.Scale = Scale;
        Control.Attribution = Attribution;
        control.layers = layers;
        control.zoom = zoom;
        control.scale = scale;
        control.attribution = attribution;
        var Handler = Class.extend({
          initialize: function(map) {
            this._map = map;
          },
          // @method enable(): this
          // Enables the handler
          enable: function() {
            if (this._enabled) {
              return this;
            }
            this._enabled = true;
            this.addHooks();
            return this;
          },
          // @method disable(): this
          // Disables the handler
          disable: function() {
            if (!this._enabled) {
              return this;
            }
            this._enabled = false;
            this.removeHooks();
            return this;
          },
          // @method enabled(): Boolean
          // Returns `true` if the handler is enabled
          enabled: function() {
            return !!this._enabled;
          }
          // @section Extension methods
          // Classes inheriting from `Handler` must implement the two following methods:
          // @method addHooks()
          // Called when the handler is enabled, should add event hooks.
          // @method removeHooks()
          // Called when the handler is disabled, should remove the event hooks added previously.
        });
        Handler.addTo = function(map, name) {
          map.addHandler(name, this);
          return this;
        };
        var Mixin = { Events };
        var START = Browser.touch ? "touchstart mousedown" : "mousedown";
        var Draggable = Evented.extend({
          options: {
            // @section
            // @aka Draggable options
            // @option clickTolerance: Number = 3
            // The max number of pixels a user can shift the mouse pointer during a click
            // for it to be considered a valid click (as opposed to a mouse drag).
            clickTolerance: 3
          },
          // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
          // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
          initialize: function(element, dragStartTarget, preventOutline2, options) {
            setOptions(this, options);
            this._element = element;
            this._dragStartTarget = dragStartTarget || element;
            this._preventOutline = preventOutline2;
          },
          // @method enable()
          // Enables the dragging ability
          enable: function() {
            if (this._enabled) {
              return;
            }
            on2(this._dragStartTarget, START, this._onDown, this);
            this._enabled = true;
          },
          // @method disable()
          // Disables the dragging ability
          disable: function() {
            if (!this._enabled) {
              return;
            }
            if (Draggable._dragging === this) {
              this.finishDrag(true);
            }
            off2(this._dragStartTarget, START, this._onDown, this);
            this._enabled = false;
            this._moved = false;
          },
          _onDown: function(e) {
            if (!this._enabled) {
              return;
            }
            this._moved = false;
            if (hasClass(this._element, "leaflet-zoom-anim")) {
              return;
            }
            if (e.touches && e.touches.length !== 1) {
              if (Draggable._dragging === this) {
                this.finishDrag();
              }
              return;
            }
            if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
              return;
            }
            Draggable._dragging = this;
            if (this._preventOutline) {
              preventOutline(this._element);
            }
            disableImageDrag();
            disableTextSelection2();
            if (this._moving) {
              return;
            }
            this.fire("down");
            var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
            this._startPoint = new Point2(first.clientX, first.clientY);
            this._startPos = getPosition(this._element);
            this._parentScale = getScale2(sizedParent);
            var mouseevent = e.type === "mousedown";
            on2(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
            on2(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
          },
          _onMove: function(e) {
            if (!this._enabled) {
              return;
            }
            if (e.touches && e.touches.length > 1) {
              this._moved = true;
              return;
            }
            var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point2(first.clientX, first.clientY)._subtract(this._startPoint);
            if (!offset.x && !offset.y) {
              return;
            }
            if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
              return;
            }
            offset.x /= this._parentScale.x;
            offset.y /= this._parentScale.y;
            preventDefault2(e);
            if (!this._moved) {
              this.fire("dragstart");
              this._moved = true;
              addClass(document.body, "leaflet-dragging");
              this._lastTarget = e.target || e.srcElement;
              if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
                this._lastTarget = this._lastTarget.correspondingUseElement;
              }
              addClass(this._lastTarget, "leaflet-drag-target");
            }
            this._newPos = this._startPos.add(offset);
            this._moving = true;
            this._lastEvent = e;
            this._updatePosition();
          },
          _updatePosition: function() {
            var e = { originalEvent: this._lastEvent };
            this.fire("predrag", e);
            setPosition(this._element, this._newPos);
            this.fire("drag", e);
          },
          _onUp: function() {
            if (!this._enabled) {
              return;
            }
            this.finishDrag();
          },
          finishDrag: function(noInertia) {
            removeClass(document.body, "leaflet-dragging");
            if (this._lastTarget) {
              removeClass(this._lastTarget, "leaflet-drag-target");
              this._lastTarget = null;
            }
            off2(document, "mousemove touchmove", this._onMove, this);
            off2(document, "mouseup touchend touchcancel", this._onUp, this);
            enableImageDrag();
            enableTextSelection2();
            var fireDragend = this._moved && this._moving;
            this._moving = false;
            Draggable._dragging = false;
            if (fireDragend) {
              this.fire("dragend", {
                noInertia,
                distance: this._newPos.distanceTo(this._startPos)
              });
            }
          }
        });
        function clipPolygon(points, bounds, round) {
          var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b, len, edge3, p;
          for (i = 0, len = points.length; i < len; i++) {
            points[i]._code = _getBitCode(points[i], bounds);
          }
          for (k = 0; k < 4; k++) {
            edge3 = edges[k];
            clippedPoints = [];
            for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
              a = points[i];
              b = points[j];
              if (!(a._code & edge3)) {
                if (b._code & edge3) {
                  p = _getEdgeIntersection(b, a, edge3, bounds, round);
                  p._code = _getBitCode(p, bounds);
                  clippedPoints.push(p);
                }
                clippedPoints.push(a);
              } else if (!(b._code & edge3)) {
                p = _getEdgeIntersection(b, a, edge3, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
            }
            points = clippedPoints;
          }
          return points;
        }
        function polygonCenter(latlngs, crs) {
          var i, j, p1, p2, f, area, x, y, center;
          if (!latlngs || latlngs.length === 0) {
            throw new Error("latlngs not passed");
          }
          if (!isFlat(latlngs)) {
            console.warn("latlngs are not flat! Only the first ring will be used");
            latlngs = latlngs[0];
          }
          var centroidLatLng = toLatLng([0, 0]);
          var bounds = toLatLngBounds(latlngs);
          var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
          if (areaBounds < 1700) {
            centroidLatLng = centroid(latlngs);
          }
          var len = latlngs.length;
          var points = [];
          for (i = 0; i < len; i++) {
            var latlng = toLatLng(latlngs[i]);
            points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
          }
          area = x = y = 0;
          for (i = 0, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
          }
          if (area === 0) {
            center = points[0];
          } else {
            center = [x / area, y / area];
          }
          var latlngCenter = crs.unproject(toPoint2(center));
          return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
        }
        function centroid(coords) {
          var latSum = 0;
          var lngSum = 0;
          var len = 0;
          for (var i = 0; i < coords.length; i++) {
            var latlng = toLatLng(coords[i]);
            latSum += latlng.lat;
            lngSum += latlng.lng;
            len++;
          }
          return toLatLng([latSum / len, lngSum / len]);
        }
        var PolyUtil = {
          __proto__: null,
          clipPolygon,
          polygonCenter,
          centroid
        };
        function simplify(points, tolerance) {
          if (!tolerance || !points.length) {
            return points.slice();
          }
          var sqTolerance = tolerance * tolerance;
          points = _reducePoints(points, sqTolerance);
          points = _simplifyDP(points, sqTolerance);
          return points;
        }
        function pointToSegmentDistance(p, p1, p2) {
          return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
        }
        function closestPointOnSegment(p, p1, p2) {
          return _sqClosestPointOnSegment(p, p1, p2);
        }
        function _simplifyDP(points, sqTolerance) {
          var len = points.length, ArrayConstructor = typeof Uint8Array !== void 0 + "" ? Uint8Array : Array, markers = new ArrayConstructor(len);
          markers[0] = markers[len - 1] = 1;
          _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
          var i, newPoints = [];
          for (i = 0; i < len; i++) {
            if (markers[i]) {
              newPoints.push(points[i]);
            }
          }
          return newPoints;
        }
        function _simplifyDPStep(points, markers, sqTolerance, first, last) {
          var maxSqDist = 0, index2, i, sqDist;
          for (i = first + 1; i <= last - 1; i++) {
            sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
            if (sqDist > maxSqDist) {
              index2 = i;
              maxSqDist = sqDist;
            }
          }
          if (maxSqDist > sqTolerance) {
            markers[index2] = 1;
            _simplifyDPStep(points, markers, sqTolerance, first, index2);
            _simplifyDPStep(points, markers, sqTolerance, index2, last);
          }
        }
        function _reducePoints(points, sqTolerance) {
          var reducedPoints = [points[0]];
          for (var i = 1, prev = 0, len = points.length; i < len; i++) {
            if (_sqDist(points[i], points[prev]) > sqTolerance) {
              reducedPoints.push(points[i]);
              prev = i;
            }
          }
          if (prev < len - 1) {
            reducedPoints.push(points[len - 1]);
          }
          return reducedPoints;
        }
        var _lastCode;
        function clipSegment(a, b, bounds, useLastCode, round) {
          var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
          _lastCode = codeB;
          while (true) {
            if (!(codeA | codeB)) {
              return [a, b];
            }
            if (codeA & codeB) {
              return false;
            }
            codeOut = codeA || codeB;
            p = _getEdgeIntersection(a, b, codeOut, bounds, round);
            newCode = _getBitCode(p, bounds);
            if (codeOut === codeA) {
              a = p;
              codeA = newCode;
            } else {
              b = p;
              codeB = newCode;
            }
          }
        }
        function _getEdgeIntersection(a, b, code, bounds, round) {
          var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
          if (code & 8) {
            x = a.x + dx * (max.y - a.y) / dy;
            y = max.y;
          } else if (code & 4) {
            x = a.x + dx * (min.y - a.y) / dy;
            y = min.y;
          } else if (code & 2) {
            x = max.x;
            y = a.y + dy * (max.x - a.x) / dx;
          } else if (code & 1) {
            x = min.x;
            y = a.y + dy * (min.x - a.x) / dx;
          }
          return new Point2(x, y, round);
        }
        function _getBitCode(p, bounds) {
          var code = 0;
          if (p.x < bounds.min.x) {
            code |= 1;
          } else if (p.x > bounds.max.x) {
            code |= 2;
          }
          if (p.y < bounds.min.y) {
            code |= 4;
          } else if (p.y > bounds.max.y) {
            code |= 8;
          }
          return code;
        }
        function _sqDist(p1, p2) {
          var dx = p2.x - p1.x, dy = p2.y - p1.y;
          return dx * dx + dy * dy;
        }
        function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
          var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
          if (dot > 0) {
            t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
            if (t > 1) {
              x = p2.x;
              y = p2.y;
            } else if (t > 0) {
              x += dx * t;
              y += dy * t;
            }
          }
          dx = p.x - x;
          dy = p.y - y;
          return sqDist ? dx * dx + dy * dy : new Point2(x, y);
        }
        function isFlat(latlngs) {
          return !isArray2(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
        }
        function _flat(latlngs) {
          console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
          return isFlat(latlngs);
        }
        function polylineCenter(latlngs, crs) {
          var i, halfDist, segDist, dist, p1, p2, ratio, center;
          if (!latlngs || latlngs.length === 0) {
            throw new Error("latlngs not passed");
          }
          if (!isFlat(latlngs)) {
            console.warn("latlngs are not flat! Only the first ring will be used");
            latlngs = latlngs[0];
          }
          var centroidLatLng = toLatLng([0, 0]);
          var bounds = toLatLngBounds(latlngs);
          var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
          if (areaBounds < 1700) {
            centroidLatLng = centroid(latlngs);
          }
          var len = latlngs.length;
          var points = [];
          for (i = 0; i < len; i++) {
            var latlng = toLatLng(latlngs[i]);
            points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
          }
          for (i = 0, halfDist = 0; i < len - 1; i++) {
            halfDist += points[i].distanceTo(points[i + 1]) / 2;
          }
          if (halfDist === 0) {
            center = points[0];
          } else {
            for (i = 0, dist = 0; i < len - 1; i++) {
              p1 = points[i];
              p2 = points[i + 1];
              segDist = p1.distanceTo(p2);
              dist += segDist;
              if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                center = [
                  p2.x - ratio * (p2.x - p1.x),
                  p2.y - ratio * (p2.y - p1.y)
                ];
                break;
              }
            }
          }
          var latlngCenter = crs.unproject(toPoint2(center));
          return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
        }
        var LineUtil = {
          __proto__: null,
          simplify,
          pointToSegmentDistance,
          closestPointOnSegment,
          clipSegment,
          _getEdgeIntersection,
          _getBitCode,
          _sqClosestPointOnSegment,
          isFlat,
          _flat,
          polylineCenter
        };
        var LonLat = {
          project: function(latlng) {
            return new Point2(latlng.lng, latlng.lat);
          },
          unproject: function(point) {
            return new LatLng2(point.y, point.x);
          },
          bounds: new Bounds([-180, -90], [180, 90])
        };
        var Mercator = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
          project: function(latlng) {
            var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
            var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
            y = -r * Math.log(Math.max(ts, 1e-10));
            return new Point2(latlng.lng * d * r, y);
          },
          unproject: function(point) {
            var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
            for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
              con = e * Math.sin(phi);
              con = Math.pow((1 - con) / (1 + con), e / 2);
              dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
              phi += dphi;
            }
            return new LatLng2(phi * d, point.x * d / r);
          }
        };
        var index = {
          __proto__: null,
          LonLat,
          Mercator,
          SphericalMercator
        };
        var EPSG3395 = extend({}, Earth, {
          code: "EPSG:3395",
          projection: Mercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * Mercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG4326 = extend({}, Earth, {
          code: "EPSG:4326",
          projection: LonLat,
          transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
        });
        var Simple = extend({}, CRS, {
          projection: LonLat,
          transformation: toTransformation(1, 0, -1, 0),
          scale: function(zoom2) {
            return Math.pow(2, zoom2);
          },
          zoom: function(scale2) {
            return Math.log(scale2) / Math.LN2;
          },
          distance: function(latlng1, latlng2) {
            var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
            return Math.sqrt(dx * dx + dy * dy);
          },
          infinite: true
        });
        CRS.Earth = Earth;
        CRS.EPSG3395 = EPSG3395;
        CRS.EPSG3857 = EPSG3857;
        CRS.EPSG900913 = EPSG900913;
        CRS.EPSG4326 = EPSG4326;
        CRS.Simple = Simple;
        var Layer = Evented.extend({
          // Classes extending `L.Layer` will inherit the following options:
          options: {
            // @option pane: String = 'overlayPane'
            // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
            pane: "overlayPane",
            // @option attribution: String = null
            // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
            attribution: null,
            bubblingMouseEvents: true
          },
          /* @section
           * Classes extending `L.Layer` will inherit the following methods:
           *
           * @method addTo(map: Map|LayerGroup): this
           * Adds the layer to the given map or layer group.
           */
          addTo: function(map) {
            map.addLayer(this);
            return this;
          },
          // @method remove: this
          // Removes the layer from the map it is currently active on.
          remove: function() {
            return this.removeFrom(this._map || this._mapToAdd);
          },
          // @method removeFrom(map: Map): this
          // Removes the layer from the given map
          //
          // @alternative
          // @method removeFrom(group: LayerGroup): this
          // Removes the layer from the given `LayerGroup`
          removeFrom: function(obj) {
            if (obj) {
              obj.removeLayer(this);
            }
            return this;
          },
          // @method getPane(name? : String): HTMLElement
          // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
          getPane: function(name) {
            return this._map.getPane(name ? this.options[name] || name : this.options.pane);
          },
          addInteractiveTarget: function(targetEl) {
            this._map._targets[stamp2(targetEl)] = this;
            return this;
          },
          removeInteractiveTarget: function(targetEl) {
            delete this._map._targets[stamp2(targetEl)];
            return this;
          },
          // @method getAttribution: String
          // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
          getAttribution: function() {
            return this.options.attribution;
          },
          _layerAdd: function(e) {
            var map = e.target;
            if (!map.hasLayer(this)) {
              return;
            }
            this._map = map;
            this._zoomAnimated = map._zoomAnimated;
            if (this.getEvents) {
              var events = this.getEvents();
              map.on(events, this);
              this.once("remove", function() {
                map.off(events, this);
              }, this);
            }
            this.onAdd(map);
            this.fire("add");
            map.fire("layeradd", { layer: this });
          }
        });
        Map.include({
          // @method addLayer(layer: Layer): this
          // Adds the given layer to the map
          addLayer: function(layer) {
            if (!layer._layerAdd) {
              throw new Error("The provided object is not a Layer.");
            }
            var id = stamp2(layer);
            if (this._layers[id]) {
              return this;
            }
            this._layers[id] = layer;
            layer._mapToAdd = this;
            if (layer.beforeAdd) {
              layer.beforeAdd(this);
            }
            this.whenReady(layer._layerAdd, layer);
            return this;
          },
          // @method removeLayer(layer: Layer): this
          // Removes the given layer from the map.
          removeLayer: function(layer) {
            var id = stamp2(layer);
            if (!this._layers[id]) {
              return this;
            }
            if (this._loaded) {
              layer.onRemove(this);
            }
            delete this._layers[id];
            if (this._loaded) {
              this.fire("layerremove", { layer });
              layer.fire("remove");
            }
            layer._map = layer._mapToAdd = null;
            return this;
          },
          // @method hasLayer(layer: Layer): Boolean
          // Returns `true` if the given layer is currently added to the map
          hasLayer: function(layer) {
            return stamp2(layer) in this._layers;
          },
          /* @method eachLayer(fn: Function, context?: Object): this
           * Iterates over the layers of the map, optionally specifying context of the iterator function.
           * ```
           * map.eachLayer(function(layer){
           *     layer.bindPopup('Hello');
           * });
           * ```
           */
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          _addLayers: function(layers2) {
            layers2 = layers2 ? isArray2(layers2) ? layers2 : [layers2] : [];
            for (var i = 0, len = layers2.length; i < len; i++) {
              this.addLayer(layers2[i]);
            }
          },
          _addZoomLimit: function(layer) {
            if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
              this._zoomBoundLayers[stamp2(layer)] = layer;
              this._updateZoomLevels();
            }
          },
          _removeZoomLimit: function(layer) {
            var id = stamp2(layer);
            if (this._zoomBoundLayers[id]) {
              delete this._zoomBoundLayers[id];
              this._updateZoomLevels();
            }
          },
          _updateZoomLevels: function() {
            var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
            for (var i in this._zoomBoundLayers) {
              var options = this._zoomBoundLayers[i].options;
              minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
              maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
            }
            this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
            this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
            if (oldZoomSpan !== this._getZoomSpan()) {
              this.fire("zoomlevelschange");
            }
            if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
              this.setZoom(this._layersMaxZoom);
            }
            if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
              this.setZoom(this._layersMinZoom);
            }
          }
        });
        var LayerGroup = Layer.extend({
          initialize: function(layers2, options) {
            setOptions(this, options);
            this._layers = {};
            var i, len;
            if (layers2) {
              for (i = 0, len = layers2.length; i < len; i++) {
                this.addLayer(layers2[i]);
              }
            }
          },
          // @method addLayer(layer: Layer): this
          // Adds the given layer to the group.
          addLayer: function(layer) {
            var id = this.getLayerId(layer);
            this._layers[id] = layer;
            if (this._map) {
              this._map.addLayer(layer);
            }
            return this;
          },
          // @method removeLayer(layer: Layer): this
          // Removes the given layer from the group.
          // @alternative
          // @method removeLayer(id: Number): this
          // Removes the layer with the given internal ID from the group.
          removeLayer: function(layer) {
            var id = layer in this._layers ? layer : this.getLayerId(layer);
            if (this._map && this._layers[id]) {
              this._map.removeLayer(this._layers[id]);
            }
            delete this._layers[id];
            return this;
          },
          // @method hasLayer(layer: Layer): Boolean
          // Returns `true` if the given layer is currently added to the group.
          // @alternative
          // @method hasLayer(id: Number): Boolean
          // Returns `true` if the given internal ID is currently added to the group.
          hasLayer: function(layer) {
            var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
            return layerId in this._layers;
          },
          // @method clearLayers(): this
          // Removes all the layers from the group.
          clearLayers: function() {
            return this.eachLayer(this.removeLayer, this);
          },
          // @method invoke(methodName: String, …): this
          // Calls `methodName` on every layer contained in this group, passing any
          // additional parameters. Has no effect if the layers contained do not
          // implement `methodName`.
          invoke: function(methodName) {
            var args = Array.prototype.slice.call(arguments, 1), i, layer;
            for (i in this._layers) {
              layer = this._layers[i];
              if (layer[methodName]) {
                layer[methodName].apply(layer, args);
              }
            }
            return this;
          },
          onAdd: function(map) {
            this.eachLayer(map.addLayer, map);
          },
          onRemove: function(map) {
            this.eachLayer(map.removeLayer, map);
          },
          // @method eachLayer(fn: Function, context?: Object): this
          // Iterates over the layers of the group, optionally specifying context of the iterator function.
          // ```js
          // group.eachLayer(function (layer) {
          // 	layer.bindPopup('Hello');
          // });
          // ```
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          // @method getLayer(id: Number): Layer
          // Returns the layer with the given internal ID.
          getLayer: function(id) {
            return this._layers[id];
          },
          // @method getLayers(): Layer[]
          // Returns an array of all the layers added to the group.
          getLayers: function() {
            var layers2 = [];
            this.eachLayer(layers2.push, layers2);
            return layers2;
          },
          // @method setZIndex(zIndex: Number): this
          // Calls `setZIndex` on every layer contained in this group, passing the z-index.
          setZIndex: function(zIndex) {
            return this.invoke("setZIndex", zIndex);
          },
          // @method getLayerId(layer: Layer): Number
          // Returns the internal ID for a layer
          getLayerId: function(layer) {
            return stamp2(layer);
          }
        });
        var layerGroup = function(layers2, options) {
          return new LayerGroup(layers2, options);
        };
        var FeatureGroup = LayerGroup.extend({
          addLayer: function(layer) {
            if (this.hasLayer(layer)) {
              return this;
            }
            layer.addEventParent(this);
            LayerGroup.prototype.addLayer.call(this, layer);
            return this.fire("layeradd", { layer });
          },
          removeLayer: function(layer) {
            if (!this.hasLayer(layer)) {
              return this;
            }
            if (layer in this._layers) {
              layer = this._layers[layer];
            }
            layer.removeEventParent(this);
            LayerGroup.prototype.removeLayer.call(this, layer);
            return this.fire("layerremove", { layer });
          },
          // @method setStyle(style: Path options): this
          // Sets the given path options to each layer of the group that has a `setStyle` method.
          setStyle: function(style3) {
            return this.invoke("setStyle", style3);
          },
          // @method bringToFront(): this
          // Brings the layer group to the top of all other layers
          bringToFront: function() {
            return this.invoke("bringToFront");
          },
          // @method bringToBack(): this
          // Brings the layer group to the back of all other layers
          bringToBack: function() {
            return this.invoke("bringToBack");
          },
          // @method getBounds(): LatLngBounds
          // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
          getBounds: function() {
            var bounds = new LatLngBounds();
            for (var id in this._layers) {
              var layer = this._layers[id];
              bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
            }
            return bounds;
          }
        });
        var featureGroup = function(layers2, options) {
          return new FeatureGroup(layers2, options);
        };
        var Icon = Class.extend({
          /* @section
           * @aka Icon options
           *
           * @option iconUrl: String = null
           * **(required)** The URL to the icon image (absolute or relative to your script path).
           *
           * @option iconRetinaUrl: String = null
           * The URL to a retina sized version of the icon image (absolute or relative to your
           * script path). Used for Retina screen devices.
           *
           * @option iconSize: Point = null
           * Size of the icon image in pixels.
           *
           * @option iconAnchor: Point = null
           * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
           * will be aligned so that this point is at the marker's geographical location. Centered
           * by default if size is specified, also can be set in CSS with negative margins.
           *
           * @option popupAnchor: Point = [0, 0]
           * The coordinates of the point from which popups will "open", relative to the icon anchor.
           *
           * @option tooltipAnchor: Point = [0, 0]
           * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
           *
           * @option shadowUrl: String = null
           * The URL to the icon shadow image. If not specified, no shadow image will be created.
           *
           * @option shadowRetinaUrl: String = null
           *
           * @option shadowSize: Point = null
           * Size of the shadow image in pixels.
           *
           * @option shadowAnchor: Point = null
           * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
           * as iconAnchor if not specified).
           *
           * @option className: String = ''
           * A custom class name to assign to both icon and shadow images. Empty by default.
           */
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0],
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the tiles.
            // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          // @method createIcon(oldIcon?: HTMLElement): HTMLElement
          // Called internally when the icon has to be shown, returns a `<img>` HTML element
          // styled according to the options.
          createIcon: function(oldIcon) {
            return this._createIcon("icon", oldIcon);
          },
          // @method createShadow(oldIcon?: HTMLElement): HTMLElement
          // As `createIcon`, but for the shadow beneath it.
          createShadow: function(oldIcon) {
            return this._createIcon("shadow", oldIcon);
          },
          _createIcon: function(name, oldIcon) {
            var src = this._getIconUrl(name);
            if (!src) {
              if (name === "icon") {
                throw new Error("iconUrl not set in Icon options (see the docs).");
              }
              return null;
            }
            var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
            this._setIconStyles(img, name);
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            return img;
          },
          _setIconStyles: function(img, name) {
            var options = this.options;
            var sizeOption = options[name + "Size"];
            if (typeof sizeOption === "number") {
              sizeOption = [sizeOption, sizeOption];
            }
            var size = toPoint2(sizeOption), anchor = toPoint2(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
            img.className = "leaflet-marker-" + name + " " + (options.className || "");
            if (anchor) {
              img.style.marginLeft = -anchor.x + "px";
              img.style.marginTop = -anchor.y + "px";
            }
            if (size) {
              img.style.width = size.x + "px";
              img.style.height = size.y + "px";
            }
          },
          _createImg: function(src, el) {
            el = el || document.createElement("img");
            el.src = src;
            return el;
          },
          _getIconUrl: function(name) {
            return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
          }
        });
        function icon(options) {
          return new Icon(options);
        }
        var IconDefault = Icon.extend({
          options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          },
          _getIconUrl: function(name) {
            if (typeof IconDefault.imagePath !== "string") {
              IconDefault.imagePath = this._detectIconPath();
            }
            return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
          },
          _stripUrl: function(path) {
            var strip = function(str, re, idx) {
              var match = re.exec(str);
              return match && match[idx];
            };
            path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
            return path && strip(path, /^(.*)marker-icon\.png$/, 1);
          },
          _detectIconPath: function() {
            var el = create$1("div", "leaflet-default-icon-path", document.body);
            var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
            document.body.removeChild(el);
            path = this._stripUrl(path);
            if (path) {
              return path;
            }
            var link = document.querySelector('link[href$="leaflet.css"]');
            if (!link) {
              return "";
            }
            return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
          }
        });
        var MarkerDrag = Handler.extend({
          initialize: function(marker2) {
            this._marker = marker2;
          },
          addHooks: function() {
            var icon2 = this._marker._icon;
            if (!this._draggable) {
              this._draggable = new Draggable(icon2, icon2, true);
            }
            this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).enable();
            addClass(icon2, "leaflet-marker-draggable");
          },
          removeHooks: function() {
            this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).disable();
            if (this._marker._icon) {
              removeClass(this._marker._icon, "leaflet-marker-draggable");
            }
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function(e) {
            var marker2 = this._marker, map = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
            var panBounds = toBounds(
              bounds.min._subtract(origin).add(padding),
              bounds.max._subtract(origin).subtract(padding)
            );
            if (!panBounds.contains(iconPos)) {
              var movement = toPoint2(
                (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
                (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
              ).multiplyBy(speed);
              map.panBy(movement, { animate: false });
              this._draggable._newPos._add(movement);
              this._draggable._startPos._add(movement);
              setPosition(marker2._icon, this._draggable._newPos);
              this._onDrag(e);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng();
            this._marker.closePopup && this._marker.closePopup();
            this._marker.fire("movestart").fire("dragstart");
          },
          _onPreDrag: function(e) {
            if (this._marker.options.autoPan) {
              cancelAnimFrame(this._panRequest);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDrag: function(e) {
            var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
            if (shadow) {
              setPosition(shadow, iconPos);
            }
            marker2._latlng = latlng;
            e.latlng = latlng;
            e.oldLatLng = this._oldLatLng;
            marker2.fire("move", e).fire("drag", e);
          },
          _onDragEnd: function(e) {
            cancelAnimFrame(this._panRequest);
            delete this._oldLatLng;
            this._marker.fire("moveend").fire("dragend", e);
          }
        });
        var Marker = Layer.extend({
          // @section
          // @aka Marker options
          options: {
            // @option icon: Icon = *
            // Icon instance to use for rendering the marker.
            // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
            // If not specified, a common instance of `L.Icon.Default` is used.
            icon: new IconDefault(),
            // Option inherited from "Interactive layer" abstract class
            interactive: true,
            // @option keyboard: Boolean = true
            // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
            keyboard: true,
            // @option title: String = ''
            // Text for the browser tooltip that appear on marker hover (no tooltip by default).
            // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
            title: "",
            // @option alt: String = 'Marker'
            // Text for the `alt` attribute of the icon image.
            // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
            alt: "Marker",
            // @option zIndexOffset: Number = 0
            // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
            zIndexOffset: 0,
            // @option opacity: Number = 1.0
            // The opacity of the marker.
            opacity: 1,
            // @option riseOnHover: Boolean = false
            // If `true`, the marker will get on top of others when you hover the mouse over it.
            riseOnHover: false,
            // @option riseOffset: Number = 250
            // The z-index offset used for the `riseOnHover` feature.
            riseOffset: 250,
            // @option pane: String = 'markerPane'
            // `Map pane` where the markers icon will be added.
            pane: "markerPane",
            // @option shadowPane: String = 'shadowPane'
            // `Map pane` where the markers shadow will be added.
            shadowPane: "shadowPane",
            // @option bubblingMouseEvents: Boolean = false
            // When `true`, a mouse event on this marker will trigger the same event on the map
            // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
            bubblingMouseEvents: false,
            // @option autoPanOnFocus: Boolean = true
            // When `true`, the map will pan whenever the marker is focused (via
            // e.g. pressing `tab` on the keyboard) to ensure the marker is
            // visible within the map's bounds
            autoPanOnFocus: true,
            // @section Draggable marker options
            // @option draggable: Boolean = false
            // Whether the marker is draggable with mouse/touch or not.
            draggable: false,
            // @option autoPan: Boolean = false
            // Whether to pan the map when dragging this marker near its edge or not.
            autoPan: false,
            // @option autoPanPadding: Point = Point(50, 50)
            // Distance (in pixels to the left/right and to the top/bottom) of the
            // map edge to start panning the map.
            autoPanPadding: [50, 50],
            // @option autoPanSpeed: Number = 10
            // Number of pixels the map should pan by.
            autoPanSpeed: 10
          },
          /* @section
           *
           * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
           */
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
          },
          onAdd: function(map) {
            this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
            if (this._zoomAnimated) {
              map.on("zoomanim", this._animateZoom, this);
            }
            this._initIcon();
            this.update();
          },
          onRemove: function(map) {
            if (this.dragging && this.dragging.enabled()) {
              this.options.draggable = true;
              this.dragging.removeHooks();
            }
            delete this.dragging;
            if (this._zoomAnimated) {
              map.off("zoomanim", this._animateZoom, this);
            }
            this._removeIcon();
            this._removeShadow();
          },
          getEvents: function() {
            return {
              zoom: this.update,
              viewreset: this.update
            };
          },
          // @method getLatLng: LatLng
          // Returns the current geographical position of the marker.
          getLatLng: function() {
            return this._latlng;
          },
          // @method setLatLng(latlng: LatLng): this
          // Changes the marker position to the given point.
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.update();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          // @method setZIndexOffset(offset: Number): this
          // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
          setZIndexOffset: function(offset) {
            this.options.zIndexOffset = offset;
            return this.update();
          },
          // @method getIcon: Icon
          // Returns the current icon used by the marker
          getIcon: function() {
            return this.options.icon;
          },
          // @method setIcon(icon: Icon): this
          // Changes the marker icon.
          setIcon: function(icon2) {
            this.options.icon = icon2;
            if (this._map) {
              this._initIcon();
              this.update();
            }
            if (this._popup) {
              this.bindPopup(this._popup, this._popup.options);
            }
            return this;
          },
          getElement: function() {
            return this._icon;
          },
          update: function() {
            if (this._icon && this._map) {
              var pos = this._map.latLngToLayerPoint(this._latlng).round();
              this._setPos(pos);
            }
            return this;
          },
          _initIcon: function() {
            var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            var icon2 = options.icon.createIcon(this._icon), addIcon = false;
            if (icon2 !== this._icon) {
              if (this._icon) {
                this._removeIcon();
              }
              addIcon = true;
              if (options.title) {
                icon2.title = options.title;
              }
              if (icon2.tagName === "IMG") {
                icon2.alt = options.alt || "";
              }
            }
            addClass(icon2, classToAdd);
            if (options.keyboard) {
              icon2.tabIndex = "0";
              icon2.setAttribute("role", "button");
            }
            this._icon = icon2;
            if (options.riseOnHover) {
              this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            if (this.options.autoPanOnFocus) {
              on2(icon2, "focus", this._panOnFocus, this);
            }
            var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
            if (newShadow !== this._shadow) {
              this._removeShadow();
              addShadow = true;
            }
            if (newShadow) {
              addClass(newShadow, classToAdd);
              newShadow.alt = "";
            }
            this._shadow = newShadow;
            if (options.opacity < 1) {
              this._updateOpacity();
            }
            if (addIcon) {
              this.getPane().appendChild(this._icon);
            }
            this._initInteraction();
            if (newShadow && addShadow) {
              this.getPane(options.shadowPane).appendChild(this._shadow);
            }
          },
          _removeIcon: function() {
            if (this.options.riseOnHover) {
              this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            if (this.options.autoPanOnFocus) {
              off2(this._icon, "focus", this._panOnFocus, this);
            }
            remove(this._icon);
            this.removeInteractiveTarget(this._icon);
            this._icon = null;
          },
          _removeShadow: function() {
            if (this._shadow) {
              remove(this._shadow);
            }
            this._shadow = null;
          },
          _setPos: function(pos) {
            if (this._icon) {
              setPosition(this._icon, pos);
            }
            if (this._shadow) {
              setPosition(this._shadow, pos);
            }
            this._zIndex = pos.y + this.options.zIndexOffset;
            this._resetZIndex();
          },
          _updateZIndex: function(offset) {
            if (this._icon) {
              this._icon.style.zIndex = this._zIndex + offset;
            }
          },
          _animateZoom: function(opt) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
            this._setPos(pos);
          },
          _initInteraction: function() {
            if (!this.options.interactive) {
              return;
            }
            addClass(this._icon, "leaflet-interactive");
            this.addInteractiveTarget(this._icon);
            if (MarkerDrag) {
              var draggable = this.options.draggable;
              if (this.dragging) {
                draggable = this.dragging.enabled();
                this.dragging.disable();
              }
              this.dragging = new MarkerDrag(this);
              if (draggable) {
                this.dragging.enable();
              }
            }
          },
          // @method setOpacity(opacity: Number): this
          // Changes the opacity of the marker.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._map) {
              this._updateOpacity();
            }
            return this;
          },
          _updateOpacity: function() {
            var opacity = this.options.opacity;
            if (this._icon) {
              setOpacity(this._icon, opacity);
            }
            if (this._shadow) {
              setOpacity(this._shadow, opacity);
            }
          },
          _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset);
          },
          _resetZIndex: function() {
            this._updateZIndex(0);
          },
          _panOnFocus: function() {
            var map = this._map;
            if (!map) {
              return;
            }
            var iconOpts = this.options.icon.options;
            var size = iconOpts.iconSize ? toPoint2(iconOpts.iconSize) : toPoint2(0, 0);
            var anchor = iconOpts.iconAnchor ? toPoint2(iconOpts.iconAnchor) : toPoint2(0, 0);
            map.panInside(this._latlng, {
              paddingTopLeft: anchor,
              paddingBottomRight: size.subtract(anchor)
            });
          },
          _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor;
          },
          _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor;
          }
        });
        function marker(latlng, options) {
          return new Marker(latlng, options);
        }
        var Path = Layer.extend({
          // @section
          // @aka Path options
          options: {
            // @option stroke: Boolean = true
            // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
            stroke: true,
            // @option color: String = '#3388ff'
            // Stroke color
            color: "#3388ff",
            // @option weight: Number = 3
            // Stroke width in pixels
            weight: 3,
            // @option opacity: Number = 1.0
            // Stroke opacity
            opacity: 1,
            // @option lineCap: String= 'round'
            // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
            lineCap: "round",
            // @option lineJoin: String = 'round'
            // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
            lineJoin: "round",
            // @option dashArray: String = null
            // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
            dashArray: null,
            // @option dashOffset: String = null
            // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
            dashOffset: null,
            // @option fill: Boolean = depends
            // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
            fill: false,
            // @option fillColor: String = *
            // Fill color. Defaults to the value of the [`color`](#path-color) option
            fillColor: null,
            // @option fillOpacity: Number = 0.2
            // Fill opacity.
            fillOpacity: 0.2,
            // @option fillRule: String = 'evenodd'
            // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
            fillRule: "evenodd",
            // className: '',
            // Option inherited from "Interactive layer" abstract class
            interactive: true,
            // @option bubblingMouseEvents: Boolean = true
            // When `true`, a mouse event on this path will trigger the same event on the map
            // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
            bubblingMouseEvents: true
          },
          beforeAdd: function(map) {
            this._renderer = map.getRenderer(this);
          },
          onAdd: function() {
            this._renderer._initPath(this);
            this._reset();
            this._renderer._addPath(this);
          },
          onRemove: function() {
            this._renderer._removePath(this);
          },
          // @method redraw(): this
          // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
          redraw: function() {
            if (this._map) {
              this._renderer._updatePath(this);
            }
            return this;
          },
          // @method setStyle(style: Path options): this
          // Changes the appearance of a Path based on the options in the `Path options` object.
          setStyle: function(style3) {
            setOptions(this, style3);
            if (this._renderer) {
              this._renderer._updateStyle(this);
              if (this.options.stroke && style3 && Object.prototype.hasOwnProperty.call(style3, "weight")) {
                this._updateBounds();
              }
            }
            return this;
          },
          // @method bringToFront(): this
          // Brings the layer to the top of all path layers.
          bringToFront: function() {
            if (this._renderer) {
              this._renderer._bringToFront(this);
            }
            return this;
          },
          // @method bringToBack(): this
          // Brings the layer to the bottom of all path layers.
          bringToBack: function() {
            if (this._renderer) {
              this._renderer._bringToBack(this);
            }
            return this;
          },
          getElement: function() {
            return this._path;
          },
          _reset: function() {
            this._project();
            this._update();
          },
          _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
          }
        });
        var CircleMarker = Path.extend({
          // @section
          // @aka CircleMarker options
          options: {
            fill: true,
            // @option radius: Number = 10
            // Radius of the circle marker, in pixels
            radius: 10
          },
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            this._radius = this.options.radius;
          },
          // @method setLatLng(latLng: LatLng): this
          // Sets the position of a circle marker to a new location.
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.redraw();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          // @method getLatLng(): LatLng
          // Returns the current geographical position of the circle marker
          getLatLng: function() {
            return this._latlng;
          },
          // @method setRadius(radius: Number): this
          // Sets the radius of a circle marker. Units are in pixels.
          setRadius: function(radius) {
            this.options.radius = this._radius = radius;
            return this.redraw();
          },
          // @method getRadius(): Number
          // Returns the current radius of the circle
          getRadius: function() {
            return this._radius;
          },
          setStyle: function(options) {
            var radius = options && options.radius || this._radius;
            Path.prototype.setStyle.call(this, options);
            this.setRadius(radius);
            return this;
          },
          _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._updateBounds();
          },
          _updateBounds: function() {
            var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
            this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
          },
          _update: function() {
            if (this._map) {
              this._updatePath();
            }
          },
          _updatePath: function() {
            this._renderer._updateCircle(this);
          },
          _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p) {
            return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
          }
        });
        function circleMarker(latlng, options) {
          return new CircleMarker(latlng, options);
        }
        var Circle = CircleMarker.extend({
          initialize: function(latlng, options, legacyOptions) {
            if (typeof options === "number") {
              options = extend({}, legacyOptions, { radius: options });
            }
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            if (isNaN(this.options.radius)) {
              throw new Error("Circle radius cannot be NaN");
            }
            this._mRadius = this.options.radius;
          },
          // @method setRadius(radius: Number): this
          // Sets the radius of a circle. Units are in meters.
          setRadius: function(radius) {
            this._mRadius = radius;
            return this.redraw();
          },
          // @method getRadius(): Number
          // Returns the current radius of a circle. Units are in meters.
          getRadius: function() {
            return this._mRadius;
          },
          // @method getBounds(): LatLngBounds
          // Returns the `LatLngBounds` of the path.
          getBounds: function() {
            var half = [this._radius, this._radiusY || this._radius];
            return new LatLngBounds(
              this._map.layerPointToLatLng(this._point.subtract(half)),
              this._map.layerPointToLatLng(this._point.add(half))
            );
          },
          setStyle: Path.prototype.setStyle,
          _project: function() {
            var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
            if (crs.distance === Earth.distance) {
              var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
              if (isNaN(lngR) || lngR === 0) {
                lngR = latR / Math.cos(Math.PI / 180 * lat);
              }
              this._point = p.subtract(map.getPixelOrigin());
              this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
              this._radiusY = p.y - top.y;
            } else {
              var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
              this._point = map.latLngToLayerPoint(this._latlng);
              this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
            }
            this._updateBounds();
          }
        });
        function circle(latlng, options, legacyOptions) {
          return new Circle(latlng, options, legacyOptions);
        }
        var Polyline = Path.extend({
          // @section
          // @aka Polyline options
          options: {
            // @option smoothFactor: Number = 1.0
            // How much to simplify the polyline on each zoom level. More means
            // better performance and smoother look, and less means more accurate representation.
            smoothFactor: 1,
            // @option noClip: Boolean = false
            // Disable polyline clipping.
            noClip: false
          },
          initialize: function(latlngs, options) {
            setOptions(this, options);
            this._setLatLngs(latlngs);
          },
          // @method getLatLngs(): LatLng[]
          // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
          getLatLngs: function() {
            return this._latlngs;
          },
          // @method setLatLngs(latlngs: LatLng[]): this
          // Replaces all the points in the polyline with the given array of geographical points.
          setLatLngs: function(latlngs) {
            this._setLatLngs(latlngs);
            return this.redraw();
          },
          // @method isEmpty(): Boolean
          // Returns `true` if the Polyline has no LatLngs.
          isEmpty: function() {
            return !this._latlngs.length;
          },
          // @method closestLayerPoint(p: Point): Point
          // Returns the point closest to `p` on the Polyline.
          closestLayerPoint: function(p) {
            var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
            for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
              var points = this._parts[j];
              for (var i = 1, len = points.length; i < len; i++) {
                p1 = points[i - 1];
                p2 = points[i];
                var sqDist = closest(p, p1, p2, true);
                if (sqDist < minDistance) {
                  minDistance = sqDist;
                  minPoint = closest(p, p1, p2);
                }
              }
            }
            if (minPoint) {
              minPoint.distance = Math.sqrt(minDistance);
            }
            return minPoint;
          },
          // @method getCenter(): LatLng
          // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            return polylineCenter(this._defaultShape(), this._map.options.crs);
          },
          // @method getBounds(): LatLngBounds
          // Returns the `LatLngBounds` of the path.
          getBounds: function() {
            return this._bounds;
          },
          // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
          // Adds a given point to the polyline. By default, adds to the first ring of
          // the polyline in case of a multi-polyline, but can be overridden by passing
          // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
          addLatLng: function(latlng, latlngs) {
            latlngs = latlngs || this._defaultShape();
            latlng = toLatLng(latlng);
            latlngs.push(latlng);
            this._bounds.extend(latlng);
            return this.redraw();
          },
          _setLatLngs: function(latlngs) {
            this._bounds = new LatLngBounds();
            this._latlngs = this._convertLatLngs(latlngs);
          },
          _defaultShape: function() {
            return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
          },
          // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
          _convertLatLngs: function(latlngs) {
            var result = [], flat = isFlat(latlngs);
            for (var i = 0, len = latlngs.length; i < len; i++) {
              if (flat) {
                result[i] = toLatLng(latlngs[i]);
                this._bounds.extend(result[i]);
              } else {
                result[i] = this._convertLatLngs(latlngs[i]);
              }
            }
            return result;
          },
          _project: function() {
            var pxBounds = new Bounds();
            this._rings = [];
            this._projectLatlngs(this._latlngs, this._rings, pxBounds);
            if (this._bounds.isValid() && pxBounds.isValid()) {
              this._rawPxBounds = pxBounds;
              this._updateBounds();
            }
          },
          _updateBounds: function() {
            var w = this._clickTolerance(), p = new Point2(w, w);
            if (!this._rawPxBounds) {
              return;
            }
            this._pxBounds = new Bounds([
              this._rawPxBounds.min.subtract(p),
              this._rawPxBounds.max.add(p)
            ]);
          },
          // recursively turns latlngs into a set of rings with projected coordinates
          _projectLatlngs: function(latlngs, result, projectedBounds) {
            var flat = latlngs[0] instanceof LatLng2, len = latlngs.length, i, ring;
            if (flat) {
              ring = [];
              for (i = 0; i < len; i++) {
                ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
                projectedBounds.extend(ring[i]);
              }
              result.push(ring);
            } else {
              for (i = 0; i < len; i++) {
                this._projectLatlngs(latlngs[i], result, projectedBounds);
              }
            }
          },
          // clip polyline by renderer bounds so that we have less to render for performance
          _clipPoints: function() {
            var bounds = this._renderer._bounds;
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var parts = this._parts, i, j, k, len, len2, segment, points;
            for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
              points = this._rings[i];
              for (j = 0, len2 = points.length; j < len2 - 1; j++) {
                segment = clipSegment(points[j], points[j + 1], bounds, j, true);
                if (!segment) {
                  continue;
                }
                parts[k] = parts[k] || [];
                parts[k].push(segment[0]);
                if (segment[1] !== points[j + 1] || j === len2 - 2) {
                  parts[k].push(segment[1]);
                  k++;
                }
              }
            }
          },
          // simplify each clipped part of the polyline for performance
          _simplifyPoints: function() {
            var parts = this._parts, tolerance = this.options.smoothFactor;
            for (var i = 0, len = parts.length; i < len; i++) {
              parts[i] = simplify(parts[i], tolerance);
            }
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            this._clipPoints();
            this._simplifyPoints();
            this._updatePath();
          },
          _updatePath: function() {
            this._renderer._updatePoly(this);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p, closed) {
            var i, j, k, len, len2, part, w = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                if (!closed && j === 0) {
                  continue;
                }
                if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
                  return true;
                }
              }
            }
            return false;
          }
        });
        function polyline(latlngs, options) {
          return new Polyline(latlngs, options);
        }
        Polyline._flat = _flat;
        var Polygon = Polyline.extend({
          options: {
            fill: true
          },
          isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length;
          },
          // @method getCenter(): LatLng
          // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            return polygonCenter(this._defaultShape(), this._map.options.crs);
          },
          _convertLatLngs: function(latlngs) {
            var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
            if (len >= 2 && result[0] instanceof LatLng2 && result[0].equals(result[len - 1])) {
              result.pop();
            }
            return result;
          },
          _setLatLngs: function(latlngs) {
            Polyline.prototype._setLatLngs.call(this, latlngs);
            if (isFlat(this._latlngs)) {
              this._latlngs = [this._latlngs];
            }
          },
          _defaultShape: function() {
            return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
          },
          _clipPoints: function() {
            var bounds = this._renderer._bounds, w = this.options.weight, p = new Point2(w, w);
            bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
              clipped = clipPolygon(this._rings[i], bounds, true);
              if (clipped.length) {
                this._parts.push(clipped);
              }
            }
          },
          _updatePath: function() {
            this._renderer._updatePoly(this, true);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p) {
            var inside = false, part, p1, p2, i, j, k, len, len2;
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                p1 = part[j];
                p2 = part[k];
                if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                  inside = !inside;
                }
              }
            }
            return inside || Polyline.prototype._containsPoint.call(this, p, true);
          }
        });
        function polygon(latlngs, options) {
          return new Polygon(latlngs, options);
        }
        var GeoJSON = FeatureGroup.extend({
          /* @section
           * @aka GeoJSON options
           *
           * @option pointToLayer: Function = *
           * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
           * called when data is added, passing the GeoJSON point feature and its `LatLng`.
           * The default is to spawn a default `Marker`:
           * ```js
           * function(geoJsonPoint, latlng) {
           * 	return L.marker(latlng);
           * }
           * ```
           *
           * @option style: Function = *
           * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
           * called internally when data is added.
           * The default value is to not override any defaults:
           * ```js
           * function (geoJsonFeature) {
           * 	return {}
           * }
           * ```
           *
           * @option onEachFeature: Function = *
           * A `Function` that will be called once for each created `Feature`, after it has
           * been created and styled. Useful for attaching events and popups to features.
           * The default is to do nothing with the newly created layers:
           * ```js
           * function (feature, layer) {}
           * ```
           *
           * @option filter: Function = *
           * A `Function` that will be used to decide whether to include a feature or not.
           * The default is to include all features:
           * ```js
           * function (geoJsonFeature) {
           * 	return true;
           * }
           * ```
           * Note: dynamically changing the `filter` option will have effect only on newly
           * added data. It will _not_ re-evaluate already included features.
           *
           * @option coordsToLatLng: Function = *
           * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
           * The default is the `coordsToLatLng` static method.
           *
           * @option markersInheritOptions: Boolean = false
           * Whether default Markers for "Point" type Features inherit from group options.
           */
          initialize: function(geojson, options) {
            setOptions(this, options);
            this._layers = {};
            if (geojson) {
              this.addData(geojson);
            }
          },
          // @method addData( <GeoJSON> data ): this
          // Adds a GeoJSON object to the layer.
          addData: function(geojson) {
            var features = isArray2(geojson) ? geojson : geojson.features, i, len, feature;
            if (features) {
              for (i = 0, len = features.length; i < len; i++) {
                feature = features[i];
                if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                  this.addData(feature);
                }
              }
              return this;
            }
            var options = this.options;
            if (options.filter && !options.filter(geojson)) {
              return this;
            }
            var layer = geometryToLayer(geojson, options);
            if (!layer) {
              return this;
            }
            layer.feature = asFeature(geojson);
            layer.defaultOptions = layer.options;
            this.resetStyle(layer);
            if (options.onEachFeature) {
              options.onEachFeature(geojson, layer);
            }
            return this.addLayer(layer);
          },
          // @method resetStyle( <Path> layer? ): this
          // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
          // If `layer` is omitted, the style of all features in the current layer is reset.
          resetStyle: function(layer) {
            if (layer === void 0) {
              return this.eachLayer(this.resetStyle, this);
            }
            layer.options = extend({}, layer.defaultOptions);
            this._setLayerStyle(layer, this.options.style);
            return this;
          },
          // @method setStyle( <Function> style ): this
          // Changes styles of GeoJSON vector layers with the given style function.
          setStyle: function(style3) {
            return this.eachLayer(function(layer) {
              this._setLayerStyle(layer, style3);
            }, this);
          },
          _setLayerStyle: function(layer, style3) {
            if (layer.setStyle) {
              if (typeof style3 === "function") {
                style3 = style3(layer.feature);
              }
              layer.setStyle(style3);
            }
          }
        });
        function geometryToLayer(geojson, options) {
          var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
          if (!coords && !geometry) {
            return null;
          }
          switch (geometry.type) {
            case "Point":
              latlng = _coordsToLatLng(coords);
              return _pointToLayer(pointToLayer, geojson, latlng, options);
            case "MultiPoint":
              for (i = 0, len = coords.length; i < len; i++) {
                latlng = _coordsToLatLng(coords[i]);
                layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
              }
              return new FeatureGroup(layers2);
            case "LineString":
            case "MultiLineString":
              latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
              return new Polyline(latlngs, options);
            case "Polygon":
            case "MultiPolygon":
              latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
              return new Polygon(latlngs, options);
            case "GeometryCollection":
              for (i = 0, len = geometry.geometries.length; i < len; i++) {
                var geoLayer = geometryToLayer({
                  geometry: geometry.geometries[i],
                  type: "Feature",
                  properties: geojson.properties
                }, options);
                if (geoLayer) {
                  layers2.push(geoLayer);
                }
              }
              return new FeatureGroup(layers2);
            case "FeatureCollection":
              for (i = 0, len = geometry.features.length; i < len; i++) {
                var featureLayer = geometryToLayer(geometry.features[i], options);
                if (featureLayer) {
                  layers2.push(featureLayer);
                }
              }
              return new FeatureGroup(layers2);
            default:
              throw new Error("Invalid GeoJSON object.");
          }
        }
        function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
          return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
        }
        function coordsToLatLng(coords) {
          return new LatLng2(coords[1], coords[0], coords[2]);
        }
        function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
          var latlngs = [];
          for (var i = 0, len = coords.length, latlng; i < len; i++) {
            latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
            latlngs.push(latlng);
          }
          return latlngs;
        }
        function latLngToCoords(latlng, precision) {
          latlng = toLatLng(latlng);
          return latlng.alt !== void 0 ? [formatNum2(latlng.lng, precision), formatNum2(latlng.lat, precision), formatNum2(latlng.alt, precision)] : [formatNum2(latlng.lng, precision), formatNum2(latlng.lat, precision)];
        }
        function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
          var coords = [];
          for (var i = 0, len = latlngs.length; i < len; i++) {
            coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
          }
          if (!levelsDeep && closed && coords.length > 0) {
            coords.push(coords[0].slice());
          }
          return coords;
        }
        function getFeature(layer, newGeometry) {
          return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
        }
        function asFeature(geojson) {
          if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
            return geojson;
          }
          return {
            type: "Feature",
            properties: {},
            geometry: geojson
          };
        }
        var PointToGeoJSON = {
          toGeoJSON: function(precision) {
            return getFeature(this, {
              type: "Point",
              coordinates: latLngToCoords(this.getLatLng(), precision)
            });
          }
        };
        Marker.include(PointToGeoJSON);
        Circle.include(PointToGeoJSON);
        CircleMarker.include(PointToGeoJSON);
        Polyline.include({
          toGeoJSON: function(precision) {
            var multi = !isFlat(this._latlngs);
            var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "LineString",
              coordinates: coords
            });
          }
        });
        Polygon.include({
          toGeoJSON: function(precision) {
            var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
            var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
            if (!holes) {
              coords = [coords];
            }
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "Polygon",
              coordinates: coords
            });
          }
        });
        LayerGroup.include({
          toMultiPoint: function(precision) {
            var coords = [];
            this.eachLayer(function(layer) {
              coords.push(layer.toGeoJSON(precision).geometry.coordinates);
            });
            return getFeature(this, {
              type: "MultiPoint",
              coordinates: coords
            });
          },
          // @method toGeoJSON(precision?: Number|false): Object
          // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
          // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
          toGeoJSON: function(precision) {
            var type = this.feature && this.feature.geometry && this.feature.geometry.type;
            if (type === "MultiPoint") {
              return this.toMultiPoint(precision);
            }
            var isGeometryCollection = type === "GeometryCollection", jsons = [];
            this.eachLayer(function(layer) {
              if (layer.toGeoJSON) {
                var json = layer.toGeoJSON(precision);
                if (isGeometryCollection) {
                  jsons.push(json.geometry);
                } else {
                  var feature = asFeature(json);
                  if (feature.type === "FeatureCollection") {
                    jsons.push.apply(jsons, feature.features);
                  } else {
                    jsons.push(feature);
                  }
                }
              }
            });
            if (isGeometryCollection) {
              return getFeature(this, {
                geometries: jsons,
                type: "GeometryCollection"
              });
            }
            return {
              type: "FeatureCollection",
              features: jsons
            };
          }
        });
        function geoJSON(geojson, options) {
          return new GeoJSON(geojson, options);
        }
        var geoJson = geoJSON;
        var ImageOverlay = Layer.extend({
          // @section
          // @aka ImageOverlay options
          options: {
            // @option opacity: Number = 1.0
            // The opacity of the image overlay.
            opacity: 1,
            // @option alt: String = ''
            // Text for the `alt` attribute of the image (useful for accessibility).
            alt: "",
            // @option interactive: Boolean = false
            // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
            interactive: false,
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the image.
            // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false,
            // @option errorOverlayUrl: String = ''
            // URL to the overlay image to show in place of the overlay that failed to load.
            errorOverlayUrl: "",
            // @option zIndex: Number = 1
            // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
            zIndex: 1,
            // @option className: String = ''
            // A custom class name to assign to the image. Empty by default.
            className: ""
          },
          initialize: function(url, bounds, options) {
            this._url = url;
            this._bounds = toLatLngBounds(bounds);
            setOptions(this, options);
          },
          onAdd: function() {
            if (!this._image) {
              this._initImage();
              if (this.options.opacity < 1) {
                this._updateOpacity();
              }
            }
            if (this.options.interactive) {
              addClass(this._image, "leaflet-interactive");
              this.addInteractiveTarget(this._image);
            }
            this.getPane().appendChild(this._image);
            this._reset();
          },
          onRemove: function() {
            remove(this._image);
            if (this.options.interactive) {
              this.removeInteractiveTarget(this._image);
            }
          },
          // @method setOpacity(opacity: Number): this
          // Sets the opacity of the overlay.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._image) {
              this._updateOpacity();
            }
            return this;
          },
          setStyle: function(styleOpts) {
            if (styleOpts.opacity) {
              this.setOpacity(styleOpts.opacity);
            }
            return this;
          },
          // @method bringToFront(): this
          // Brings the layer to the top of all overlays.
          bringToFront: function() {
            if (this._map) {
              toFront(this._image);
            }
            return this;
          },
          // @method bringToBack(): this
          // Brings the layer to the bottom of all overlays.
          bringToBack: function() {
            if (this._map) {
              toBack(this._image);
            }
            return this;
          },
          // @method setUrl(url: String): this
          // Changes the URL of the image.
          setUrl: function(url) {
            this._url = url;
            if (this._image) {
              this._image.src = url;
            }
            return this;
          },
          // @method setBounds(bounds: LatLngBounds): this
          // Update the bounds that this ImageOverlay covers
          setBounds: function(bounds) {
            this._bounds = toLatLngBounds(bounds);
            if (this._map) {
              this._reset();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              zoom: this._reset,
              viewreset: this._reset
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @method setZIndex(value: Number): this
          // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
          setZIndex: function(value) {
            this.options.zIndex = value;
            this._updateZIndex();
            return this;
          },
          // @method getBounds(): LatLngBounds
          // Get the bounds that this ImageOverlay covers
          getBounds: function() {
            return this._bounds;
          },
          // @method getElement(): HTMLElement
          // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
          // used by this overlay.
          getElement: function() {
            return this._image;
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "IMG";
            var img = this._image = wasElementSupplied ? this._url : create$1("img");
            addClass(img, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(img, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(img, this.options.className);
            }
            img.onselectstart = falseFn2;
            img.onmousemove = falseFn2;
            img.onload = bind(this.fire, this, "load");
            img.onerror = bind(this._overlayOnError, this, "error");
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            if (this.options.zIndex) {
              this._updateZIndex();
            }
            if (wasElementSupplied) {
              this._url = img.src;
              return;
            }
            img.src = this._url;
            img.alt = this.options.alt;
          },
          _animateZoom: function(e) {
            var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
            setTransform(this._image, offset, scale2);
          },
          _reset: function() {
            var image = this._image, bounds = new Bounds(
              this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
              this._map.latLngToLayerPoint(this._bounds.getSouthEast())
            ), size = bounds.getSize();
            setPosition(image, bounds.min);
            image.style.width = size.x + "px";
            image.style.height = size.y + "px";
          },
          _updateOpacity: function() {
            setOpacity(this._image, this.options.opacity);
          },
          _updateZIndex: function() {
            if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._image.style.zIndex = this.options.zIndex;
            }
          },
          _overlayOnError: function() {
            this.fire("error");
            var errorUrl = this.options.errorOverlayUrl;
            if (errorUrl && this._url !== errorUrl) {
              this._url = errorUrl;
              this._image.src = errorUrl;
            }
          },
          // @method getCenter(): LatLng
          // Returns the center of the ImageOverlay.
          getCenter: function() {
            return this._bounds.getCenter();
          }
        });
        var imageOverlay = function(url, bounds, options) {
          return new ImageOverlay(url, bounds, options);
        };
        var VideoOverlay = ImageOverlay.extend({
          // @section
          // @aka VideoOverlay options
          options: {
            // @option autoplay: Boolean = true
            // Whether the video starts playing automatically when loaded.
            // On some browsers autoplay will only work with `muted: true`
            autoplay: true,
            // @option loop: Boolean = true
            // Whether the video will loop back to the beginning when played.
            loop: true,
            // @option keepAspectRatio: Boolean = true
            // Whether the video will save aspect ratio after the projection.
            // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
            keepAspectRatio: true,
            // @option muted: Boolean = false
            // Whether the video starts on mute when loaded.
            muted: false,
            // @option playsInline: Boolean = true
            // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
            playsInline: true
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "VIDEO";
            var vid = this._image = wasElementSupplied ? this._url : create$1("video");
            addClass(vid, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(vid, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(vid, this.options.className);
            }
            vid.onselectstart = falseFn2;
            vid.onmousemove = falseFn2;
            vid.onloadeddata = bind(this.fire, this, "load");
            if (wasElementSupplied) {
              var sourceElements = vid.getElementsByTagName("source");
              var sources = [];
              for (var j = 0; j < sourceElements.length; j++) {
                sources.push(sourceElements[j].src);
              }
              this._url = sourceElements.length > 0 ? sources : [vid.src];
              return;
            }
            if (!isArray2(this._url)) {
              this._url = [this._url];
            }
            if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
              vid.style["objectFit"] = "fill";
            }
            vid.autoplay = !!this.options.autoplay;
            vid.loop = !!this.options.loop;
            vid.muted = !!this.options.muted;
            vid.playsInline = !!this.options.playsInline;
            for (var i = 0; i < this._url.length; i++) {
              var source = create$1("source");
              source.src = this._url[i];
              vid.appendChild(source);
            }
          }
          // @method getElement(): HTMLVideoElement
          // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
          // used by this overlay.
        });
        function videoOverlay(video, bounds, options) {
          return new VideoOverlay(video, bounds, options);
        }
        var SVGOverlay = ImageOverlay.extend({
          _initImage: function() {
            var el = this._image = this._url;
            addClass(el, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(el, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(el, this.options.className);
            }
            el.onselectstart = falseFn2;
            el.onmousemove = falseFn2;
          }
          // @method getElement(): SVGElement
          // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
          // used by this overlay.
        });
        function svgOverlay(el, bounds, options) {
          return new SVGOverlay(el, bounds, options);
        }
        var DivOverlay = Layer.extend({
          // @section
          // @aka DivOverlay options
          options: {
            // @option interactive: Boolean = false
            // If true, the popup/tooltip will listen to the mouse events.
            interactive: false,
            // @option offset: Point = Point(0, 0)
            // The offset of the overlay position.
            offset: [0, 0],
            // @option className: String = ''
            // A custom CSS class name to assign to the overlay.
            className: "",
            // @option pane: String = undefined
            // `Map pane` where the overlay will be added.
            pane: void 0,
            // @option content: String|HTMLElement|Function = ''
            // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
            // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
            content: ""
          },
          initialize: function(options, source) {
            if (options && (options instanceof LatLng2 || isArray2(options))) {
              this._latlng = toLatLng(options);
              setOptions(this, source);
            } else {
              setOptions(this, options);
              this._source = source;
            }
            if (this.options.content) {
              this._content = this.options.content;
            }
          },
          // @method openOn(map: Map): this
          // Adds the overlay to the map.
          // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
          openOn: function(map) {
            map = arguments.length ? map : this._source._map;
            if (!map.hasLayer(this)) {
              map.addLayer(this);
            }
            return this;
          },
          // @method close(): this
          // Closes the overlay.
          // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
          // and `layer.closePopup()`/`.closeTooltip()`.
          close: function() {
            if (this._map) {
              this._map.removeLayer(this);
            }
            return this;
          },
          // @method toggle(layer?: Layer): this
          // Opens or closes the overlay bound to layer depending on its current state.
          // Argument may be omitted only for overlay bound to layer.
          // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
          toggle: function(layer) {
            if (this._map) {
              this.close();
            } else {
              if (arguments.length) {
                this._source = layer;
              } else {
                layer = this._source;
              }
              this._prepareOpen();
              this.openOn(layer._map);
            }
            return this;
          },
          onAdd: function(map) {
            this._zoomAnimated = map._zoomAnimated;
            if (!this._container) {
              this._initLayout();
            }
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
            }
            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();
            if (map._fadeAnimated) {
              setOpacity(this._container, 1);
            }
            this.bringToFront();
            if (this.options.interactive) {
              addClass(this._container, "leaflet-interactive");
              this.addInteractiveTarget(this._container);
            }
          },
          onRemove: function(map) {
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
              this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
            } else {
              remove(this._container);
            }
            if (this.options.interactive) {
              removeClass(this._container, "leaflet-interactive");
              this.removeInteractiveTarget(this._container);
            }
          },
          // @namespace DivOverlay
          // @method getLatLng: LatLng
          // Returns the geographical point of the overlay.
          getLatLng: function() {
            return this._latlng;
          },
          // @method setLatLng(latlng: LatLng): this
          // Sets the geographical point where the overlay will open.
          setLatLng: function(latlng) {
            this._latlng = toLatLng(latlng);
            if (this._map) {
              this._updatePosition();
              this._adjustPan();
            }
            return this;
          },
          // @method getContent: String|HTMLElement
          // Returns the content of the overlay.
          getContent: function() {
            return this._content;
          },
          // @method setContent(htmlContent: String|HTMLElement|Function): this
          // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
          // The function should return a `String` or `HTMLElement` to be used in the overlay.
          setContent: function(content) {
            this._content = content;
            this.update();
            return this;
          },
          // @method getElement: String|HTMLElement
          // Returns the HTML container of the overlay.
          getElement: function() {
            return this._container;
          },
          // @method update: null
          // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
          update: function() {
            if (!this._map) {
              return;
            }
            this._container.style.visibility = "hidden";
            this._updateContent();
            this._updateLayout();
            this._updatePosition();
            this._container.style.visibility = "";
            this._adjustPan();
          },
          getEvents: function() {
            var events = {
              zoom: this._updatePosition,
              viewreset: this._updatePosition
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @method isOpen: Boolean
          // Returns `true` when the overlay is visible on the map.
          isOpen: function() {
            return !!this._map && this._map.hasLayer(this);
          },
          // @method bringToFront: this
          // Brings this overlay in front of other overlays (in the same map pane).
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
            }
            return this;
          },
          // @method bringToBack: this
          // Brings this overlay to the back of other overlays (in the same map pane).
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
            }
            return this;
          },
          // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
          _prepareOpen: function(latlng) {
            var source = this._source;
            if (!source._map) {
              return false;
            }
            if (source instanceof FeatureGroup) {
              source = null;
              var layers2 = this._source._layers;
              for (var id in layers2) {
                if (layers2[id]._map) {
                  source = layers2[id];
                  break;
                }
              }
              if (!source) {
                return false;
              }
              this._source = source;
            }
            if (!latlng) {
              if (source.getCenter) {
                latlng = source.getCenter();
              } else if (source.getLatLng) {
                latlng = source.getLatLng();
              } else if (source.getBounds) {
                latlng = source.getBounds().getCenter();
              } else {
                throw new Error("Unable to get source layer LatLng.");
              }
            }
            this.setLatLng(latlng);
            if (this._map) {
              this.update();
            }
            return true;
          },
          _updateContent: function() {
            if (!this._content) {
              return;
            }
            var node = this._contentNode;
            var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
            if (typeof content === "string") {
              node.innerHTML = content;
            } else {
              while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
              }
              node.appendChild(content);
            }
            this.fire("contentupdate");
          },
          _updatePosition: function() {
            if (!this._map) {
              return;
            }
            var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint2(this.options.offset), anchor = this._getAnchor();
            if (this._zoomAnimated) {
              setPosition(this._container, pos.add(anchor));
            } else {
              offset = offset.add(pos).add(anchor);
            }
            var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
            this._container.style.bottom = bottom + "px";
            this._container.style.left = left + "px";
          },
          _getAnchor: function() {
            return [0, 0];
          }
        });
        Map.include({
          _initOverlay: function(OverlayClass, content, latlng, options) {
            var overlay = content;
            if (!(overlay instanceof OverlayClass)) {
              overlay = new OverlayClass(options).setContent(content);
            }
            if (latlng) {
              overlay.setLatLng(latlng);
            }
            return overlay;
          }
        });
        Layer.include({
          _initOverlay: function(OverlayClass, old, content, options) {
            var overlay = content;
            if (overlay instanceof OverlayClass) {
              setOptions(overlay, options);
              overlay._source = this;
            } else {
              overlay = old && !options ? old : new OverlayClass(options, this);
              overlay.setContent(content);
            }
            return overlay;
          }
        });
        var Popup = DivOverlay.extend({
          // @section
          // @aka Popup options
          options: {
            // @option pane: String = 'popupPane'
            // `Map pane` where the popup will be added.
            pane: "popupPane",
            // @option offset: Point = Point(0, 7)
            // The offset of the popup position.
            offset: [0, 7],
            // @option maxWidth: Number = 300
            // Max width of the popup, in pixels.
            maxWidth: 300,
            // @option minWidth: Number = 50
            // Min width of the popup, in pixels.
            minWidth: 50,
            // @option maxHeight: Number = null
            // If set, creates a scrollable container of the given height
            // inside a popup if its content exceeds it.
            // The scrollable container can be styled using the
            // `leaflet-popup-scrolled` CSS class selector.
            maxHeight: null,
            // @option autoPan: Boolean = true
            // Set it to `false` if you don't want the map to do panning animation
            // to fit the opened popup.
            autoPan: true,
            // @option autoPanPaddingTopLeft: Point = null
            // The margin between the popup and the top left corner of the map
            // view after autopanning was performed.
            autoPanPaddingTopLeft: null,
            // @option autoPanPaddingBottomRight: Point = null
            // The margin between the popup and the bottom right corner of the map
            // view after autopanning was performed.
            autoPanPaddingBottomRight: null,
            // @option autoPanPadding: Point = Point(5, 5)
            // Equivalent of setting both top left and bottom right autopan padding to the same value.
            autoPanPadding: [5, 5],
            // @option keepInView: Boolean = false
            // Set it to `true` if you want to prevent users from panning the popup
            // off of the screen while it is open.
            keepInView: false,
            // @option closeButton: Boolean = true
            // Controls the presence of a close button in the popup.
            closeButton: true,
            // @option autoClose: Boolean = true
            // Set it to `false` if you want to override the default behavior of
            // the popup closing when another popup is opened.
            autoClose: true,
            // @option closeOnEscapeKey: Boolean = true
            // Set it to `false` if you want to override the default behavior of
            // the ESC key for closing of the popup.
            closeOnEscapeKey: true,
            // @option closeOnClick: Boolean = *
            // Set it if you want to override the default behavior of the popup closing when user clicks
            // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
            // @option className: String = ''
            // A custom CSS class name to assign to the popup.
            className: ""
          },
          // @namespace Popup
          // @method openOn(map: Map): this
          // Alternative to `map.openPopup(popup)`.
          // Adds the popup to the map and closes the previous one.
          openOn: function(map) {
            map = arguments.length ? map : this._source._map;
            if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
              map.removeLayer(map._popup);
            }
            map._popup = this;
            return DivOverlay.prototype.openOn.call(this, map);
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            map.fire("popupopen", { popup: this });
            if (this._source) {
              this._source.fire("popupopen", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.on("preclick", stopPropagation);
              }
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("popupclose", { popup: this });
            if (this._source) {
              this._source.fire("popupclose", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.off("preclick", stopPropagation);
              }
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
              events.preclick = this.close;
            }
            if (this.options.keepInView) {
              events.moveend = this._adjustPan;
            }
            return events;
          },
          _initLayout: function() {
            var prefix = "leaflet-popup", container = this._container = create$1(
              "div",
              prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
            );
            var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
            this._contentNode = create$1("div", prefix + "-content", wrapper);
            disableClickPropagation(container);
            disableScrollPropagation(this._contentNode);
            on2(container, "contextmenu", stopPropagation);
            this._tipContainer = create$1("div", prefix + "-tip-container", container);
            this._tip = create$1("div", prefix + "-tip", this._tipContainer);
            if (this.options.closeButton) {
              var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
              closeButton.setAttribute("role", "button");
              closeButton.setAttribute("aria-label", "Close popup");
              closeButton.href = "#close";
              closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
              on2(closeButton, "click", function(ev) {
                preventDefault2(ev);
                this.close();
              }, this);
            }
          },
          _updateLayout: function() {
            var container = this._contentNode, style3 = container.style;
            style3.width = "";
            style3.whiteSpace = "nowrap";
            var width = container.offsetWidth;
            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);
            style3.width = width + 1 + "px";
            style3.whiteSpace = "";
            style3.height = "";
            var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
            if (maxHeight && height > maxHeight) {
              style3.height = maxHeight + "px";
              addClass(container, scrolledClass);
            } else {
              removeClass(container, scrolledClass);
            }
            this._containerWidth = this._container.offsetWidth;
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
            setPosition(this._container, pos.add(anchor));
          },
          _adjustPan: function() {
            if (!this.options.autoPan) {
              return;
            }
            if (this._map._panAnim) {
              this._map._panAnim.stop();
            }
            if (this._autopanning) {
              this._autopanning = false;
              return;
            }
            var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point2(this._containerLeft, -containerHeight - this._containerBottom);
            layerPos._add(getPosition(this._container));
            var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint2(this.options.autoPanPadding), paddingTL = toPoint2(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint2(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
            if (containerPos.x + containerWidth + paddingBR.x > size.x) {
              dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) {
              dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) {
              dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) {
              dy = containerPos.y - paddingTL.y;
            }
            if (dx || dy) {
              if (this.options.keepInView) {
                this._autopanning = true;
              }
              map.fire("autopanstart").panBy([dx, dy]);
            }
          },
          _getAnchor: function() {
            return toPoint2(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
          }
        });
        var popup = function(options, source) {
          return new Popup(options, source);
        };
        Map.mergeOptions({
          closePopupOnClick: true
        });
        Map.include({
          // @method openPopup(popup: Popup): this
          // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
          // @alternative
          // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
          // Creates a popup with the specified content and options and opens it in the given point on a map.
          openPopup: function(popup2, latlng, options) {
            this._initOverlay(Popup, popup2, latlng, options).openOn(this);
            return this;
          },
          // @method closePopup(popup?: Popup): this
          // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
          closePopup: function(popup2) {
            popup2 = arguments.length ? popup2 : this._popup;
            if (popup2) {
              popup2.close();
            }
            return this;
          }
        });
        Layer.include({
          // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
          // Binds a popup to the layer with the passed `content` and sets up the
          // necessary event listeners. If a `Function` is passed it will receive
          // the layer as the first argument and should return a `String` or `HTMLElement`.
          bindPopup: function(content, options) {
            this._popup = this._initOverlay(Popup, this._popup, content, options);
            if (!this._popupHandlersAdded) {
              this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = true;
            }
            return this;
          },
          // @method unbindPopup(): this
          // Removes the popup previously bound with `bindPopup`.
          unbindPopup: function() {
            if (this._popup) {
              this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = false;
              this._popup = null;
            }
            return this;
          },
          // @method openPopup(latlng?: LatLng): this
          // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
          openPopup: function(latlng) {
            if (this._popup) {
              if (!(this instanceof FeatureGroup)) {
                this._popup._source = this;
              }
              if (this._popup._prepareOpen(latlng || this._latlng)) {
                this._popup.openOn(this._map);
              }
            }
            return this;
          },
          // @method closePopup(): this
          // Closes the popup bound to this layer if it is open.
          closePopup: function() {
            if (this._popup) {
              this._popup.close();
            }
            return this;
          },
          // @method togglePopup(): this
          // Opens or closes the popup bound to this layer depending on its current state.
          togglePopup: function() {
            if (this._popup) {
              this._popup.toggle(this);
            }
            return this;
          },
          // @method isPopupOpen(): boolean
          // Returns `true` if the popup bound to this layer is currently open.
          isPopupOpen: function() {
            return this._popup ? this._popup.isOpen() : false;
          },
          // @method setPopupContent(content: String|HTMLElement|Popup): this
          // Sets the content of the popup bound to this layer.
          setPopupContent: function(content) {
            if (this._popup) {
              this._popup.setContent(content);
            }
            return this;
          },
          // @method getPopup(): Popup
          // Returns the popup bound to this layer.
          getPopup: function() {
            return this._popup;
          },
          _openPopup: function(e) {
            if (!this._popup || !this._map) {
              return;
            }
            stop(e);
            var target = e.layer || e.target;
            if (this._popup._source === target && !(target instanceof Path)) {
              if (this._map.hasLayer(this._popup)) {
                this.closePopup();
              } else {
                this.openPopup(e.latlng);
              }
              return;
            }
            this._popup._source = target;
            this.openPopup(e.latlng);
          },
          _movePopup: function(e) {
            this._popup.setLatLng(e.latlng);
          },
          _onKeyPress: function(e) {
            if (e.originalEvent.keyCode === 13) {
              this._openPopup(e);
            }
          }
        });
        var Tooltip = DivOverlay.extend({
          // @section
          // @aka Tooltip options
          options: {
            // @option pane: String = 'tooltipPane'
            // `Map pane` where the tooltip will be added.
            pane: "tooltipPane",
            // @option offset: Point = Point(0, 0)
            // Optional offset of the tooltip position.
            offset: [0, 0],
            // @option direction: String = 'auto'
            // Direction where to open the tooltip. Possible values are: `right`, `left`,
            // `top`, `bottom`, `center`, `auto`.
            // `auto` will dynamically switch between `right` and `left` according to the tooltip
            // position on the map.
            direction: "auto",
            // @option permanent: Boolean = false
            // Whether to open the tooltip permanently or only on mouseover.
            permanent: false,
            // @option sticky: Boolean = false
            // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
            sticky: false,
            // @option opacity: Number = 0.9
            // Tooltip container opacity.
            opacity: 0.9
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            this.setOpacity(this.options.opacity);
            map.fire("tooltipopen", { tooltip: this });
            if (this._source) {
              this.addEventParent(this._source);
              this._source.fire("tooltipopen", { tooltip: this }, true);
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("tooltipclose", { tooltip: this });
            if (this._source) {
              this.removeEventParent(this._source);
              this._source.fire("tooltipclose", { tooltip: this }, true);
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (!this.options.permanent) {
              events.preclick = this.close;
            }
            return events;
          },
          _initLayout: function() {
            var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = create$1("div", className);
            this._container.setAttribute("role", "tooltip");
            this._container.setAttribute("id", "leaflet-tooltip-" + stamp2(this));
          },
          _updateLayout: function() {
          },
          _adjustPan: function() {
          },
          _setPosition: function(pos) {
            var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint2(this.options.offset), anchor = this._getAnchor();
            if (direction === "top") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight;
            } else if (direction === "bottom") {
              subX = tooltipWidth / 2;
              subY = 0;
            } else if (direction === "center") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight / 2;
            } else if (direction === "right") {
              subX = 0;
              subY = tooltipHeight / 2;
            } else if (direction === "left") {
              subX = tooltipWidth;
              subY = tooltipHeight / 2;
            } else if (tooltipPoint.x < centerPoint.x) {
              direction = "right";
              subX = 0;
              subY = tooltipHeight / 2;
            } else {
              direction = "left";
              subX = tooltipWidth + (offset.x + anchor.x) * 2;
              subY = tooltipHeight / 2;
            }
            pos = pos.subtract(toPoint2(subX, subY, true)).add(offset).add(anchor);
            removeClass(container, "leaflet-tooltip-right");
            removeClass(container, "leaflet-tooltip-left");
            removeClass(container, "leaflet-tooltip-top");
            removeClass(container, "leaflet-tooltip-bottom");
            addClass(container, "leaflet-tooltip-" + direction);
            setPosition(container, pos);
          },
          _updatePosition: function() {
            var pos = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(pos);
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._container) {
              setOpacity(this._container, opacity);
            }
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            this._setPosition(pos);
          },
          _getAnchor: function() {
            return toPoint2(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
          }
        });
        var tooltip = function(options, source) {
          return new Tooltip(options, source);
        };
        Map.include({
          // @method openTooltip(tooltip: Tooltip): this
          // Opens the specified tooltip.
          // @alternative
          // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
          // Creates a tooltip with the specified content and options and open it.
          openTooltip: function(tooltip2, latlng, options) {
            this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
            return this;
          },
          // @method closeTooltip(tooltip: Tooltip): this
          // Closes the tooltip given as parameter.
          closeTooltip: function(tooltip2) {
            tooltip2.close();
            return this;
          }
        });
        Layer.include({
          // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
          // Binds a tooltip to the layer with the passed `content` and sets up the
          // necessary event listeners. If a `Function` is passed it will receive
          // the layer as the first argument and should return a `String` or `HTMLElement`.
          bindTooltip: function(content, options) {
            if (this._tooltip && this.isTooltipOpen()) {
              this.unbindTooltip();
            }
            this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
            this._initTooltipInteractions();
            if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
              this.openTooltip();
            }
            return this;
          },
          // @method unbindTooltip(): this
          // Removes the tooltip previously bound with `bindTooltip`.
          unbindTooltip: function() {
            if (this._tooltip) {
              this._initTooltipInteractions(true);
              this.closeTooltip();
              this._tooltip = null;
            }
            return this;
          },
          _initTooltipInteractions: function(remove2) {
            if (!remove2 && this._tooltipHandlersAdded) {
              return;
            }
            var onOff = remove2 ? "off" : "on", events = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            if (!this._tooltip.options.permanent) {
              events.mouseover = this._openTooltip;
              events.mouseout = this.closeTooltip;
              events.click = this._openTooltip;
              if (this._map) {
                this._addFocusListeners();
              } else {
                events.add = this._addFocusListeners;
              }
            } else {
              events.add = this._openTooltip;
            }
            if (this._tooltip.options.sticky) {
              events.mousemove = this._moveTooltip;
            }
            this[onOff](events);
            this._tooltipHandlersAdded = !remove2;
          },
          // @method openTooltip(latlng?: LatLng): this
          // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
          openTooltip: function(latlng) {
            if (this._tooltip) {
              if (!(this instanceof FeatureGroup)) {
                this._tooltip._source = this;
              }
              if (this._tooltip._prepareOpen(latlng)) {
                this._tooltip.openOn(this._map);
                if (this.getElement) {
                  this._setAriaDescribedByOnLayer(this);
                } else if (this.eachLayer) {
                  this.eachLayer(this._setAriaDescribedByOnLayer, this);
                }
              }
            }
            return this;
          },
          // @method closeTooltip(): this
          // Closes the tooltip bound to this layer if it is open.
          closeTooltip: function() {
            if (this._tooltip) {
              return this._tooltip.close();
            }
          },
          // @method toggleTooltip(): this
          // Opens or closes the tooltip bound to this layer depending on its current state.
          toggleTooltip: function() {
            if (this._tooltip) {
              this._tooltip.toggle(this);
            }
            return this;
          },
          // @method isTooltipOpen(): boolean
          // Returns `true` if the tooltip bound to this layer is currently open.
          isTooltipOpen: function() {
            return this._tooltip.isOpen();
          },
          // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
          // Sets the content of the tooltip bound to this layer.
          setTooltipContent: function(content) {
            if (this._tooltip) {
              this._tooltip.setContent(content);
            }
            return this;
          },
          // @method getTooltip(): Tooltip
          // Returns the tooltip bound to this layer.
          getTooltip: function() {
            return this._tooltip;
          },
          _addFocusListeners: function() {
            if (this.getElement) {
              this._addFocusListenersOnLayer(this);
            } else if (this.eachLayer) {
              this.eachLayer(this._addFocusListenersOnLayer, this);
            }
          },
          _addFocusListenersOnLayer: function(layer) {
            var el = typeof layer.getElement === "function" && layer.getElement();
            if (el) {
              on2(el, "focus", function() {
                this._tooltip._source = layer;
                this.openTooltip();
              }, this);
              on2(el, "blur", this.closeTooltip, this);
            }
          },
          _setAriaDescribedByOnLayer: function(layer) {
            var el = typeof layer.getElement === "function" && layer.getElement();
            if (el) {
              el.setAttribute("aria-describedby", this._tooltip._container.id);
            }
          },
          _openTooltip: function(e) {
            if (!this._tooltip || !this._map) {
              return;
            }
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = true;
              var that = this;
              this._map.once("moveend", function() {
                that._openOnceFlag = false;
                that._openTooltip(e);
              });
              return;
            }
            this._tooltip._source = e.layer || e.target;
            this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
          },
          _moveTooltip: function(e) {
            var latlng = e.latlng, containerPoint, layerPoint;
            if (this._tooltip.options.sticky && e.originalEvent) {
              containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
              layerPoint = this._map.containerPointToLayerPoint(containerPoint);
              latlng = this._map.layerPointToLatLng(layerPoint);
            }
            this._tooltip.setLatLng(latlng);
          }
        });
        var DivIcon = Icon.extend({
          options: {
            // @section
            // @aka DivIcon options
            iconSize: [12, 12],
            // also can be set through CSS
            // iconAnchor: (Point),
            // popupAnchor: (Point),
            // @option html: String|HTMLElement = ''
            // Custom HTML code to put inside the div element, empty by default. Alternatively,
            // an instance of `HTMLElement`.
            html: false,
            // @option bgPos: Point = [0, 0]
            // Optional relative position of the background, in pixels
            bgPos: null,
            className: "leaflet-div-icon"
          },
          createIcon: function(oldIcon) {
            var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
            if (options.html instanceof Element) {
              empty(div);
              div.appendChild(options.html);
            } else {
              div.innerHTML = options.html !== false ? options.html : "";
            }
            if (options.bgPos) {
              var bgPos = toPoint2(options.bgPos);
              div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
            }
            this._setIconStyles(div, "icon");
            return div;
          },
          createShadow: function() {
            return null;
          }
        });
        function divIcon(options) {
          return new DivIcon(options);
        }
        Icon.Default = IconDefault;
        var GridLayer = Layer.extend({
          // @section
          // @aka GridLayer options
          options: {
            // @option tileSize: Number|Point = 256
            // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
            tileSize: 256,
            // @option opacity: Number = 1.0
            // Opacity of the tiles. Can be used in the `createTile()` function.
            opacity: 1,
            // @option updateWhenIdle: Boolean = (depends)
            // Load new tiles only when panning ends.
            // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
            // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
            // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
            updateWhenIdle: Browser.mobile,
            // @option updateWhenZooming: Boolean = true
            // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
            updateWhenZooming: true,
            // @option updateInterval: Number = 200
            // Tiles will not update more than once every `updateInterval` milliseconds when panning.
            updateInterval: 200,
            // @option zIndex: Number = 1
            // The explicit zIndex of the tile layer.
            zIndex: 1,
            // @option bounds: LatLngBounds = undefined
            // If set, tiles will only be loaded inside the set `LatLngBounds`.
            bounds: null,
            // @option minZoom: Number = 0
            // The minimum zoom level down to which this layer will be displayed (inclusive).
            minZoom: 0,
            // @option maxZoom: Number = undefined
            // The maximum zoom level up to which this layer will be displayed (inclusive).
            maxZoom: void 0,
            // @option maxNativeZoom: Number = undefined
            // Maximum zoom number the tile source has available. If it is specified,
            // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
            // from `maxNativeZoom` level and auto-scaled.
            maxNativeZoom: void 0,
            // @option minNativeZoom: Number = undefined
            // Minimum zoom number the tile source has available. If it is specified,
            // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
            // from `minNativeZoom` level and auto-scaled.
            minNativeZoom: void 0,
            // @option noWrap: Boolean = false
            // Whether the layer is wrapped around the antimeridian. If `true`, the
            // GridLayer will only be displayed once at low zoom levels. Has no
            // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
            // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
            // tiles outside the CRS limits.
            noWrap: false,
            // @option pane: String = 'tilePane'
            // `Map pane` where the grid layer will be added.
            pane: "tilePane",
            // @option className: String = ''
            // A custom class name to assign to the tile layer. Empty by default.
            className: "",
            // @option keepBuffer: Number = 2
            // When panning the map, keep this many rows and columns of tiles before unloading them.
            keepBuffer: 2
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          onAdd: function() {
            this._initContainer();
            this._levels = {};
            this._tiles = {};
            this._resetView();
          },
          beforeAdd: function(map) {
            map._addZoomLimit(this);
          },
          onRemove: function(map) {
            this._removeAllTiles();
            remove(this._container);
            map._removeZoomLimit(this);
            this._container = null;
            this._tileZoom = void 0;
          },
          // @method bringToFront: this
          // Brings the tile layer to the top of all tile layers.
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
              this._setAutoZIndex(Math.max);
            }
            return this;
          },
          // @method bringToBack: this
          // Brings the tile layer to the bottom of all tile layers.
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
              this._setAutoZIndex(Math.min);
            }
            return this;
          },
          // @method getContainer: HTMLElement
          // Returns the HTML element that contains the tiles for this layer.
          getContainer: function() {
            return this._container;
          },
          // @method setOpacity(opacity: Number): this
          // Changes the [opacity](#gridlayer-opacity) of the grid layer.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            this._updateOpacity();
            return this;
          },
          // @method setZIndex(zIndex: Number): this
          // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
          setZIndex: function(zIndex) {
            this.options.zIndex = zIndex;
            this._updateZIndex();
            return this;
          },
          // @method isLoading: Boolean
          // Returns `true` if any tile in the grid layer has not finished loading.
          isLoading: function() {
            return this._loading;
          },
          // @method redraw: this
          // Causes the layer to clear all the tiles and request them again.
          redraw: function() {
            if (this._map) {
              this._removeAllTiles();
              var tileZoom = this._clampZoom(this._map.getZoom());
              if (tileZoom !== this._tileZoom) {
                this._tileZoom = tileZoom;
                this._updateLevels();
              }
              this._update();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              viewprereset: this._invalidateAll,
              viewreset: this._resetView,
              zoom: this._resetView,
              moveend: this._onMoveEnd
            };
            if (!this.options.updateWhenIdle) {
              if (!this._onMove) {
                this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
              }
              events.move = this._onMove;
            }
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @section Extension methods
          // Layers extending `GridLayer` shall reimplement the following method.
          // @method createTile(coords: Object, done?: Function): HTMLElement
          // Called only internally, must be overridden by classes extending `GridLayer`.
          // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
          // is specified, it must be called when the tile has finished loading and drawing.
          createTile: function() {
            return document.createElement("div");
          },
          // @section
          // @method getTileSize: Point
          // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
          getTileSize: function() {
            var s = this.options.tileSize;
            return s instanceof Point2 ? s : new Point2(s, s);
          },
          _updateZIndex: function() {
            if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._container.style.zIndex = this.options.zIndex;
            }
          },
          _setAutoZIndex: function(compare) {
            var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
            for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
              zIndex = layers2[i].style.zIndex;
              if (layers2[i] !== this._container && zIndex) {
                edgeZIndex = compare(edgeZIndex, +zIndex);
              }
            }
            if (isFinite(edgeZIndex)) {
              this.options.zIndex = edgeZIndex + compare(-1, 1);
              this._updateZIndex();
            }
          },
          _updateOpacity: function() {
            if (!this._map) {
              return;
            }
            if (Browser.ielt9) {
              return;
            }
            setOpacity(this._container, this.options.opacity);
            var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
            for (var key in this._tiles) {
              var tile = this._tiles[key];
              if (!tile.current || !tile.loaded) {
                continue;
              }
              var fade = Math.min(1, (now - tile.loaded) / 200);
              setOpacity(tile.el, fade);
              if (fade < 1) {
                nextFrame = true;
              } else {
                if (tile.active) {
                  willPrune = true;
                } else {
                  this._onOpaqueTile(tile);
                }
                tile.active = true;
              }
            }
            if (willPrune && !this._noPrune) {
              this._pruneTiles();
            }
            if (nextFrame) {
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            }
          },
          _onOpaqueTile: falseFn2,
          _initContainer: function() {
            if (this._container) {
              return;
            }
            this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
            this._updateZIndex();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
            this.getPane().appendChild(this._container);
          },
          _updateLevels: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
            if (zoom2 === void 0) {
              return void 0;
            }
            for (var z in this._levels) {
              z = Number(z);
              if (this._levels[z].el.children.length || z === zoom2) {
                this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
                this._onUpdateLevel(z);
              } else {
                remove(this._levels[z].el);
                this._removeTilesAtZoom(z);
                this._onRemoveLevel(z);
                delete this._levels[z];
              }
            }
            var level = this._levels[zoom2], map = this._map;
            if (!level) {
              level = this._levels[zoom2] = {};
              level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
              level.el.style.zIndex = maxZoom;
              level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
              level.zoom = zoom2;
              this._setZoomTransform(level, map.getCenter(), map.getZoom());
              falseFn2(level.el.offsetWidth);
              this._onCreateLevel(level);
            }
            this._level = level;
            return level;
          },
          _onUpdateLevel: falseFn2,
          _onRemoveLevel: falseFn2,
          _onCreateLevel: falseFn2,
          _pruneTiles: function() {
            if (!this._map) {
              return;
            }
            var key, tile;
            var zoom2 = this._map.getZoom();
            if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              tile.retain = tile.current;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              if (tile.current && !tile.active) {
                var coords = tile.coords;
                if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                  this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
              }
            }
            for (key in this._tiles) {
              if (!this._tiles[key].retain) {
                this._removeTile(key);
              }
            }
          },
          _removeTilesAtZoom: function(zoom2) {
            for (var key in this._tiles) {
              if (this._tiles[key].coords.z !== zoom2) {
                continue;
              }
              this._removeTile(key);
            }
          },
          _removeAllTiles: function() {
            for (var key in this._tiles) {
              this._removeTile(key);
            }
          },
          _invalidateAll: function() {
            for (var z in this._levels) {
              remove(this._levels[z].el);
              this._onRemoveLevel(Number(z));
              delete this._levels[z];
            }
            this._removeAllTiles();
            this._tileZoom = void 0;
          },
          _retainParent: function(x, y, z, minZoom) {
            var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point2(+x2, +y2);
            coords2.z = +z2;
            var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
            if (tile && tile.active) {
              tile.retain = true;
              return true;
            } else if (tile && tile.loaded) {
              tile.retain = true;
            }
            if (z2 > minZoom) {
              return this._retainParent(x2, y2, z2, minZoom);
            }
            return false;
          },
          _retainChildren: function(x, y, z, maxZoom) {
            for (var i = 2 * x; i < 2 * x + 2; i++) {
              for (var j = 2 * y; j < 2 * y + 2; j++) {
                var coords = new Point2(i, j);
                coords.z = z + 1;
                var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
                if (tile && tile.active) {
                  tile.retain = true;
                  continue;
                } else if (tile && tile.loaded) {
                  tile.retain = true;
                }
                if (z + 1 < maxZoom) {
                  this._retainChildren(i, j, z + 1, maxZoom);
                }
              }
            }
          },
          _resetView: function(e) {
            var animating = e && (e.pinch || e.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
          },
          _animateZoom: function(e) {
            this._setView(e.center, e.zoom, true, e.noUpdate);
          },
          _clampZoom: function(zoom2) {
            var options = this.options;
            if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
              return options.minNativeZoom;
            }
            if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
              return options.maxNativeZoom;
            }
            return zoom2;
          },
          _setView: function(center, zoom2, noPrune, noUpdate) {
            var tileZoom = Math.round(zoom2);
            if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
              tileZoom = void 0;
            } else {
              tileZoom = this._clampZoom(tileZoom);
            }
            var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
            if (!noUpdate || tileZoomChanged) {
              this._tileZoom = tileZoom;
              if (this._abortLoading) {
                this._abortLoading();
              }
              this._updateLevels();
              this._resetGrid();
              if (tileZoom !== void 0) {
                this._update(center);
              }
              if (!noPrune) {
                this._pruneTiles();
              }
              this._noPrune = !!noPrune;
            }
            this._setZoomTransforms(center, zoom2);
          },
          _setZoomTransforms: function(center, zoom2) {
            for (var i in this._levels) {
              this._setZoomTransform(this._levels[i], center, zoom2);
            }
          },
          _setZoomTransform: function(level, center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
            if (Browser.any3d) {
              setTransform(level.el, translate, scale2);
            } else {
              setPosition(level.el, translate);
            }
          },
          _resetGrid: function() {
            var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
            var bounds = this._map.getPixelWorldBounds(this._tileZoom);
            if (bounds) {
              this._globalTileRange = this._pxBoundsToTileRange(bounds);
            }
            this._wrapX = crs.wrapLng && !this.options.noWrap && [
              Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
              Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
            ];
            this._wrapY = crs.wrapLat && !this.options.noWrap && [
              Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
              Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
            ];
          },
          _onMoveEnd: function() {
            if (!this._map || this._map._animatingZoom) {
              return;
            }
            this._update();
          },
          _getTiledPixelBounds: function(center) {
            var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
            return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
          },
          // Private method to load tiles in the grid's active zoom level according to map bounds
          _update: function(center) {
            var map = this._map;
            if (!map) {
              return;
            }
            var zoom2 = this._clampZoom(map.getZoom());
            if (center === void 0) {
              center = map.getCenter();
            }
            if (this._tileZoom === void 0) {
              return;
            }
            var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
              tileRange.getBottomLeft().subtract([margin, -margin]),
              tileRange.getTopRight().add([margin, -margin])
            );
            if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
              throw new Error("Attempted to load an infinite number of tiles");
            }
            for (var key in this._tiles) {
              var c = this._tiles[key].coords;
              if (c.z !== this._tileZoom || !noPruneRange.contains(new Point2(c.x, c.y))) {
                this._tiles[key].current = false;
              }
            }
            if (Math.abs(zoom2 - this._tileZoom) > 1) {
              this._setView(center, zoom2);
              return;
            }
            for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
              for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                var coords = new Point2(i, j);
                coords.z = this._tileZoom;
                if (!this._isValidTile(coords)) {
                  continue;
                }
                var tile = this._tiles[this._tileCoordsToKey(coords)];
                if (tile) {
                  tile.current = true;
                } else {
                  queue.push(coords);
                }
              }
            }
            queue.sort(function(a, b) {
              return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
            });
            if (queue.length !== 0) {
              if (!this._loading) {
                this._loading = true;
                this.fire("loading");
              }
              var fragment = document.createDocumentFragment();
              for (i = 0; i < queue.length; i++) {
                this._addTile(queue[i], fragment);
              }
              this._level.el.appendChild(fragment);
            }
          },
          _isValidTile: function(coords) {
            var crs = this._map.options.crs;
            if (!crs.infinite) {
              var bounds = this._globalTileRange;
              if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
                return false;
              }
            }
            if (!this.options.bounds) {
              return true;
            }
            var tileBounds = this._tileCoordsToBounds(coords);
            return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
          },
          _keyToBounds: function(key) {
            return this._tileCoordsToBounds(this._keyToTileCoords(key));
          },
          _tileCoordsToNwSe: function(coords) {
            var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se = map.unproject(sePoint, coords.z);
            return [nw, se];
          },
          // converts tile coordinates to its geographical bounds
          _tileCoordsToBounds: function(coords) {
            var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
            if (!this.options.noWrap) {
              bounds = this._map.wrapLatLngBounds(bounds);
            }
            return bounds;
          },
          // converts tile coordinates to key for the tile cache
          _tileCoordsToKey: function(coords) {
            return coords.x + ":" + coords.y + ":" + coords.z;
          },
          // converts tile cache key to coordinates
          _keyToTileCoords: function(key) {
            var k = key.split(":"), coords = new Point2(+k[0], +k[1]);
            coords.z = +k[2];
            return coords;
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            remove(tile.el);
            delete this._tiles[key];
            this.fire("tileunload", {
              tile: tile.el,
              coords: this._keyToTileCoords(key)
            });
          },
          _initTile: function(tile) {
            addClass(tile, "leaflet-tile");
            var tileSize = this.getTileSize();
            tile.style.width = tileSize.x + "px";
            tile.style.height = tileSize.y + "px";
            tile.onselectstart = falseFn2;
            tile.onmousemove = falseFn2;
            if (Browser.ielt9 && this.options.opacity < 1) {
              setOpacity(tile, this.options.opacity);
            }
          },
          _addTile: function(coords, container) {
            var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
            var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
            this._initTile(tile);
            if (this.createTile.length < 2) {
              requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
            }
            setPosition(tile, tilePos);
            this._tiles[key] = {
              el: tile,
              coords,
              current: true
            };
            container.appendChild(tile);
            this.fire("tileloadstart", {
              tile,
              coords
            });
          },
          _tileReady: function(coords, err, tile) {
            if (err) {
              this.fire("tileerror", {
                error: err,
                tile,
                coords
              });
            }
            var key = this._tileCoordsToKey(coords);
            tile = this._tiles[key];
            if (!tile) {
              return;
            }
            tile.loaded = +/* @__PURE__ */ new Date();
            if (this._map._fadeAnimated) {
              setOpacity(tile.el, 0);
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            } else {
              tile.active = true;
              this._pruneTiles();
            }
            if (!err) {
              addClass(tile.el, "leaflet-tile-loaded");
              this.fire("tileload", {
                tile: tile.el,
                coords
              });
            }
            if (this._noTilesToLoad()) {
              this._loading = false;
              this.fire("load");
              if (Browser.ielt9 || !this._map._fadeAnimated) {
                requestAnimFrame(this._pruneTiles, this);
              } else {
                setTimeout(bind(this._pruneTiles, this), 250);
              }
            }
          },
          _getTilePos: function(coords) {
            return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
          },
          _wrapCoords: function(coords) {
            var newCoords = new Point2(
              this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
              this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
            );
            newCoords.z = coords.z;
            return newCoords;
          },
          _pxBoundsToTileRange: function(bounds) {
            var tileSize = this.getTileSize();
            return new Bounds(
              bounds.min.unscaleBy(tileSize).floor(),
              bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
            );
          },
          _noTilesToLoad: function() {
            for (var key in this._tiles) {
              if (!this._tiles[key].loaded) {
                return false;
              }
            }
            return true;
          }
        });
        function gridLayer(options) {
          return new GridLayer(options);
        }
        var TileLayer = GridLayer.extend({
          // @section
          // @aka TileLayer options
          options: {
            // @option minZoom: Number = 0
            // The minimum zoom level down to which this layer will be displayed (inclusive).
            minZoom: 0,
            // @option maxZoom: Number = 18
            // The maximum zoom level up to which this layer will be displayed (inclusive).
            maxZoom: 18,
            // @option subdomains: String|String[] = 'abc'
            // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
            subdomains: "abc",
            // @option errorTileUrl: String = ''
            // URL to the tile image to show in place of the tile that failed to load.
            errorTileUrl: "",
            // @option zoomOffset: Number = 0
            // The zoom number used in tile URLs will be offset with this value.
            zoomOffset: 0,
            // @option tms: Boolean = false
            // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
            tms: false,
            // @option zoomReverse: Boolean = false
            // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
            zoomReverse: false,
            // @option detectRetina: Boolean = false
            // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
            detectRetina: false,
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the tiles.
            // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false,
            // @option referrerPolicy: Boolean|String = false
            // Whether the referrerPolicy attribute will be added to the tiles.
            // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
            // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
            // (e.g. to validate an API token).
            // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
            referrerPolicy: false
          },
          initialize: function(url, options) {
            this._url = url;
            options = setOptions(this, options);
            if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
              options.tileSize = Math.floor(options.tileSize / 2);
              if (!options.zoomReverse) {
                options.zoomOffset++;
                options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
              } else {
                options.zoomOffset--;
                options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
              }
              options.minZoom = Math.max(0, options.minZoom);
            } else if (!options.zoomReverse) {
              options.maxZoom = Math.max(options.minZoom, options.maxZoom);
            } else {
              options.minZoom = Math.min(options.maxZoom, options.minZoom);
            }
            if (typeof options.subdomains === "string") {
              options.subdomains = options.subdomains.split("");
            }
            this.on("tileunload", this._onTileRemove);
          },
          // @method setUrl(url: String, noRedraw?: Boolean): this
          // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
          // If the URL does not change, the layer will not be redrawn unless
          // the noRedraw parameter is set to false.
          setUrl: function(url, noRedraw) {
            if (this._url === url && noRedraw === void 0) {
              noRedraw = true;
            }
            this._url = url;
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          },
          // @method createTile(coords: Object, done?: Function): HTMLElement
          // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
          // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
          // callback is called when the tile has been loaded.
          createTile: function(coords, done) {
            var tile = document.createElement("img");
            on2(tile, "load", bind(this._tileOnLoad, this, done, tile));
            on2(tile, "error", bind(this._tileOnError, this, done, tile));
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            if (typeof this.options.referrerPolicy === "string") {
              tile.referrerPolicy = this.options.referrerPolicy;
            }
            tile.alt = "";
            tile.src = this.getTileUrl(coords);
            return tile;
          },
          // @section Extension methods
          // @uninheritable
          // Layers extending `TileLayer` might reimplement the following method.
          // @method getTileUrl(coords: Object): String
          // Called only internally, returns the URL for a tile given its coordinates.
          // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
          getTileUrl: function(coords) {
            var data = {
              r: Browser.retina ? "@2x" : "",
              s: this._getSubdomain(coords),
              x: coords.x,
              y: coords.y,
              z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
              var invertedY = this._globalTileRange.max.y - coords.y;
              if (this.options.tms) {
                data["y"] = invertedY;
              }
              data["-y"] = invertedY;
            }
            return template2(this._url, extend(data, this.options));
          },
          _tileOnLoad: function(done, tile) {
            if (Browser.ielt9) {
              setTimeout(bind(done, this, null, tile), 0);
            } else {
              done(null, tile);
            }
          },
          _tileOnError: function(done, tile, e) {
            var errorUrl = this.options.errorTileUrl;
            if (errorUrl && tile.getAttribute("src") !== errorUrl) {
              tile.src = errorUrl;
            }
            done(e, tile);
          },
          _onTileRemove: function(e) {
            e.tile.onload = null;
          },
          _getZoomForUrl: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
            if (zoomReverse) {
              zoom2 = maxZoom - zoom2;
            }
            return zoom2 + zoomOffset;
          },
          _getSubdomain: function(tilePoint) {
            var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
            return this.options.subdomains[index2];
          },
          // stops loading all tiles in the background layer
          _abortLoading: function() {
            var i, tile;
            for (i in this._tiles) {
              if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;
                tile.onload = falseFn2;
                tile.onerror = falseFn2;
                if (!tile.complete) {
                  tile.src = emptyImageUrl;
                  var coords = this._tiles[i].coords;
                  remove(tile);
                  delete this._tiles[i];
                  this.fire("tileabort", {
                    tile,
                    coords
                  });
                }
              }
            }
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            tile.el.setAttribute("src", emptyImageUrl);
            return GridLayer.prototype._removeTile.call(this, key);
          },
          _tileReady: function(coords, err, tile) {
            if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
              return;
            }
            return GridLayer.prototype._tileReady.call(this, coords, err, tile);
          }
        });
        function tileLayer(url, options) {
          return new TileLayer(url, options);
        }
        var TileLayerWMS = TileLayer.extend({
          // @section
          // @aka TileLayer.WMS options
          // If any custom options not documented here are used, they will be sent to the
          // WMS server as extra parameters in each request URL. This can be useful for
          // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
          defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            // @option layers: String = ''
            // **(required)** Comma-separated list of WMS layers to show.
            layers: "",
            // @option styles: String = ''
            // Comma-separated list of WMS styles.
            styles: "",
            // @option format: String = 'image/jpeg'
            // WMS image format (use `'image/png'` for layers with transparency).
            format: "image/jpeg",
            // @option transparent: Boolean = false
            // If `true`, the WMS service will return images with transparency.
            transparent: false,
            // @option version: String = '1.1.1'
            // Version of the WMS service to use
            version: "1.1.1"
          },
          options: {
            // @option crs: CRS = null
            // Coordinate Reference System to use for the WMS requests, defaults to
            // map CRS. Don't change this if you're not sure what it means.
            crs: null,
            // @option uppercase: Boolean = false
            // If `true`, WMS request parameter keys will be uppercase.
            uppercase: false
          },
          initialize: function(url, options) {
            this._url = url;
            var wmsParams = extend({}, this.defaultWmsParams);
            for (var i in options) {
              if (!(i in this.options)) {
                wmsParams[i] = options[i];
              }
            }
            options = setOptions(this, options);
            var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
            var tileSize = this.getTileSize();
            wmsParams.width = tileSize.x * realRetina;
            wmsParams.height = tileSize.y * realRetina;
            this.wmsParams = wmsParams;
          },
          onAdd: function(map) {
            this._crs = this.options.crs || map.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[projectionKey] = this._crs.code;
            TileLayer.prototype.onAdd.call(this, map);
          },
          getTileUrl: function(coords) {
            var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
            return url + getParamString2(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
          },
          // @method setParams(params: Object, noRedraw?: Boolean): this
          // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
          setParams: function(params, noRedraw) {
            extend(this.wmsParams, params);
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          }
        });
        function tileLayerWMS(url, options) {
          return new TileLayerWMS(url, options);
        }
        TileLayer.WMS = TileLayerWMS;
        tileLayer.wms = tileLayerWMS;
        var Renderer = Layer.extend({
          // @section
          // @aka Renderer options
          options: {
            // @option padding: Number = 0.1
            // How much to extend the clip area around the map view (relative to its size)
            // e.g. 0.1 would be 10% of map view in each direction
            padding: 0.1
          },
          initialize: function(options) {
            setOptions(this, options);
            stamp2(this);
            this._layers = this._layers || {};
          },
          onAdd: function() {
            if (!this._container) {
              this._initContainer();
              addClass(this._container, "leaflet-zoom-animated");
            }
            this.getPane().appendChild(this._container);
            this._update();
            this.on("update", this._updatePaths, this);
          },
          onRemove: function() {
            this.off("update", this._updatePaths, this);
            this._destroyContainer();
          },
          getEvents: function() {
            var events = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._onAnimZoom;
            }
            return events;
          },
          _onAnimZoom: function(ev) {
            this._updateTransform(ev.center, ev.zoom);
          },
          _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom());
          },
          _updateTransform: function(center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
            if (Browser.any3d) {
              setTransform(this._container, topLeftOffset, scale2);
            } else {
              setPosition(this._container, topLeftOffset);
            }
          },
          _reset: function() {
            this._update();
            this._updateTransform(this._center, this._zoom);
            for (var id in this._layers) {
              this._layers[id]._reset();
            }
          },
          _onZoomEnd: function() {
            for (var id in this._layers) {
              this._layers[id]._project();
            }
          },
          _updatePaths: function() {
            for (var id in this._layers) {
              this._layers[id]._update();
            }
          },
          _update: function() {
            var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
            this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom();
          }
        });
        var Canvas = Renderer.extend({
          // @section
          // @aka Canvas options
          options: {
            // @option tolerance: Number = 0
            // How much to extend the click tolerance around a path/object on the map.
            tolerance: 0
          },
          getEvents: function() {
            var events = Renderer.prototype.getEvents.call(this);
            events.viewprereset = this._onViewPreReset;
            return events;
          },
          _onViewPreReset: function() {
            this._postponeUpdatePaths = true;
          },
          onAdd: function() {
            Renderer.prototype.onAdd.call(this);
            this._draw();
          },
          _initContainer: function() {
            var container = this._container = document.createElement("canvas");
            on2(container, "mousemove", this._onMouseMove, this);
            on2(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
            on2(container, "mouseout", this._handleMouseOut, this);
            container["_leaflet_disable_events"] = true;
            this._ctx = container.getContext("2d");
          },
          _destroyContainer: function() {
            cancelAnimFrame(this._redrawRequest);
            delete this._ctx;
            remove(this._container);
            off2(this._container);
            delete this._container;
          },
          _updatePaths: function() {
            if (this._postponeUpdatePaths) {
              return;
            }
            var layer;
            this._redrawBounds = null;
            for (var id in this._layers) {
              layer = this._layers[id];
              layer._update();
            }
            this._redraw();
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, container = this._container, size = b.getSize(), m = Browser.retina ? 2 : 1;
            setPosition(container, b.min);
            container.width = m * size.x;
            container.height = m * size.y;
            container.style.width = size.x + "px";
            container.style.height = size.y + "px";
            if (Browser.retina) {
              this._ctx.scale(2, 2);
            }
            this._ctx.translate(-b.min.x, -b.min.y);
            this.fire("update");
          },
          _reset: function() {
            Renderer.prototype._reset.call(this);
            if (this._postponeUpdatePaths) {
              this._postponeUpdatePaths = false;
              this._updatePaths();
            }
          },
          _initPath: function(layer) {
            this._updateDashArray(layer);
            this._layers[stamp2(layer)] = layer;
            var order = layer._order = {
              layer,
              prev: this._drawLast,
              next: null
            };
            if (this._drawLast) {
              this._drawLast.next = order;
            }
            this._drawLast = order;
            this._drawFirst = this._drawFirst || this._drawLast;
          },
          _addPath: function(layer) {
            this._requestRedraw(layer);
          },
          _removePath: function(layer) {
            var order = layer._order;
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              this._drawLast = prev;
            }
            if (prev) {
              prev.next = next;
            } else {
              this._drawFirst = next;
            }
            delete layer._order;
            delete this._layers[stamp2(layer)];
            this._requestRedraw(layer);
          },
          _updatePath: function(layer) {
            this._extendRedrawBounds(layer);
            layer._project();
            layer._update();
            this._requestRedraw(layer);
          },
          _updateStyle: function(layer) {
            this._updateDashArray(layer);
            this._requestRedraw(layer);
          },
          _updateDashArray: function(layer) {
            if (typeof layer.options.dashArray === "string") {
              var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
              for (i = 0; i < parts.length; i++) {
                dashValue = Number(parts[i]);
                if (isNaN(dashValue)) {
                  return;
                }
                dashArray.push(dashValue);
              }
              layer.options._dashArray = dashArray;
            } else {
              layer.options._dashArray = layer.options.dashArray;
            }
          },
          _requestRedraw: function(layer) {
            if (!this._map) {
              return;
            }
            this._extendRedrawBounds(layer);
            this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
          },
          _extendRedrawBounds: function(layer) {
            if (layer._pxBounds) {
              var padding = (layer.options.weight || 0) + 1;
              this._redrawBounds = this._redrawBounds || new Bounds();
              this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
              this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
            }
          },
          _redraw: function() {
            this._redrawRequest = null;
            if (this._redrawBounds) {
              this._redrawBounds.min._floor();
              this._redrawBounds.max._ceil();
            }
            this._clear();
            this._draw();
            this._redrawBounds = null;
          },
          _clear: function() {
            var bounds = this._redrawBounds;
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
            } else {
              this._ctx.save();
              this._ctx.setTransform(1, 0, 0, 1, 0, 0);
              this._ctx.clearRect(0, 0, this._container.width, this._container.height);
              this._ctx.restore();
            }
          },
          _draw: function() {
            var layer, bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.beginPath();
              this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
              this._ctx.clip();
            }
            this._drawing = true;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
                layer._updatePath();
              }
            }
            this._drawing = false;
            this._ctx.restore();
          },
          _updatePoly: function(layer, closed) {
            if (!this._drawing) {
              return;
            }
            var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
            if (!len) {
              return;
            }
            ctx.beginPath();
            for (i = 0; i < len; i++) {
              for (j = 0, len2 = parts[i].length; j < len2; j++) {
                p = parts[i][j];
                ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
              }
              if (closed) {
                ctx.closePath();
              }
            }
            this._fillStroke(ctx, layer);
          },
          _updateCircle: function(layer) {
            if (!this._drawing || layer._empty()) {
              return;
            }
            var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
            if (s !== 1) {
              ctx.save();
              ctx.scale(1, s);
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
            if (s !== 1) {
              ctx.restore();
            }
            this._fillStroke(ctx, layer);
          },
          _fillStroke: function(ctx, layer) {
            var options = layer.options;
            if (options.fill) {
              ctx.globalAlpha = options.fillOpacity;
              ctx.fillStyle = options.fillColor || options.color;
              ctx.fill(options.fillRule || "evenodd");
            }
            if (options.stroke && options.weight !== 0) {
              if (ctx.setLineDash) {
                ctx.setLineDash(layer.options && layer.options._dashArray || []);
              }
              ctx.globalAlpha = options.opacity;
              ctx.lineWidth = options.weight;
              ctx.strokeStyle = options.color;
              ctx.lineCap = options.lineCap;
              ctx.lineJoin = options.lineJoin;
              ctx.stroke();
            }
          },
          // Canvas obviously doesn't have mouse events for individual drawn objects,
          // so we emulate that by calculating what's under the mouse on mousemove/click manually
          _onClick: function(e) {
            var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
                  clickedLayer = layer;
                }
              }
            }
            this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
          },
          _onMouseMove: function(e) {
            if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
              return;
            }
            var point = this._map.mouseEventToLayerPoint(e);
            this._handleMouseHover(e, point);
          },
          _handleMouseOut: function(e) {
            var layer = this._hoveredLayer;
            if (layer) {
              removeClass(this._container, "leaflet-interactive");
              this._fireEvent([layer], e, "mouseout");
              this._hoveredLayer = null;
              this._mouseHoverThrottled = false;
            }
          },
          _handleMouseHover: function(e, point) {
            if (this._mouseHoverThrottled) {
              return;
            }
            var layer, candidateHoveredLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                candidateHoveredLayer = layer;
              }
            }
            if (candidateHoveredLayer !== this._hoveredLayer) {
              this._handleMouseOut(e);
              if (candidateHoveredLayer) {
                addClass(this._container, "leaflet-interactive");
                this._fireEvent([candidateHoveredLayer], e, "mouseover");
                this._hoveredLayer = candidateHoveredLayer;
              }
            }
            this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
            this._mouseHoverThrottled = true;
            setTimeout(bind(function() {
              this._mouseHoverThrottled = false;
            }, this), 32);
          },
          _fireEvent: function(layers2, e, type) {
            this._map._fireDOMEvent(e, type || e.type, layers2);
          },
          _bringToFront: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              return;
            }
            if (prev) {
              prev.next = next;
            } else if (next) {
              this._drawFirst = next;
            }
            order.prev = this._drawLast;
            this._drawLast.next = order;
            order.next = null;
            this._drawLast = order;
            this._requestRedraw(layer);
          },
          _bringToBack: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (prev) {
              prev.next = next;
            } else {
              return;
            }
            if (next) {
              next.prev = prev;
            } else if (prev) {
              this._drawLast = prev;
            }
            order.prev = null;
            order.next = this._drawFirst;
            this._drawFirst.prev = order;
            this._drawFirst = order;
            this._requestRedraw(layer);
          }
        });
        function canvas2(options) {
          return Browser.canvas ? new Canvas(options) : null;
        }
        var vmlCreate = function() {
          try {
            document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
            return function(name) {
              return document.createElement("<lvml:" + name + ' class="lvml">');
            };
          } catch (e) {
          }
          return function(name) {
            return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
          };
        }();
        var vmlMixin = {
          _initContainer: function() {
            this._container = create$1("div", "leaflet-vml-container");
          },
          _update: function() {
            if (this._map._animatingZoom) {
              return;
            }
            Renderer.prototype._update.call(this);
            this.fire("update");
          },
          _initPath: function(layer) {
            var container = layer._container = vmlCreate("shape");
            addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
            container.coordsize = "1 1";
            layer._path = vmlCreate("path");
            container.appendChild(layer._path);
            this._updateStyle(layer);
            this._layers[stamp2(layer)] = layer;
          },
          _addPath: function(layer) {
            var container = layer._container;
            this._container.appendChild(container);
            if (layer.options.interactive) {
              layer.addInteractiveTarget(container);
            }
          },
          _removePath: function(layer) {
            var container = layer._container;
            remove(container);
            layer.removeInteractiveTarget(container);
            delete this._layers[stamp2(layer)];
          },
          _updateStyle: function(layer) {
            var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
            container.stroked = !!options.stroke;
            container.filled = !!options.fill;
            if (options.stroke) {
              if (!stroke) {
                stroke = layer._stroke = vmlCreate("stroke");
              }
              container.appendChild(stroke);
              stroke.weight = options.weight + "px";
              stroke.color = options.color;
              stroke.opacity = options.opacity;
              if (options.dashArray) {
                stroke.dashStyle = isArray2(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
              } else {
                stroke.dashStyle = "";
              }
              stroke.endcap = options.lineCap.replace("butt", "flat");
              stroke.joinstyle = options.lineJoin;
            } else if (stroke) {
              container.removeChild(stroke);
              layer._stroke = null;
            }
            if (options.fill) {
              if (!fill) {
                fill = layer._fill = vmlCreate("fill");
              }
              container.appendChild(fill);
              fill.color = options.fillColor || options.color;
              fill.opacity = options.fillOpacity;
            } else if (fill) {
              container.removeChild(fill);
              layer._fill = null;
            }
          },
          _updateCircle: function(layer) {
            var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
            this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
          },
          _setPath: function(layer, path) {
            layer._path.v = path;
          },
          _bringToFront: function(layer) {
            toFront(layer._container);
          },
          _bringToBack: function(layer) {
            toBack(layer._container);
          }
        };
        var create2 = Browser.vml ? vmlCreate : svgCreate2;
        var SVG = Renderer.extend({
          _initContainer: function() {
            this._container = create2("svg");
            this._container.setAttribute("pointer-events", "none");
            this._rootGroup = create2("g");
            this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function() {
            remove(this._container);
            off2(this._container);
            delete this._container;
            delete this._rootGroup;
            delete this._svgSize;
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, size = b.getSize(), container = this._container;
            if (!this._svgSize || !this._svgSize.equals(size)) {
              this._svgSize = size;
              container.setAttribute("width", size.x);
              container.setAttribute("height", size.y);
            }
            setPosition(container, b.min);
            container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
            this.fire("update");
          },
          // methods below are called by vector layers implementations
          _initPath: function(layer) {
            var path = layer._path = create2("path");
            if (layer.options.className) {
              addClass(path, layer.options.className);
            }
            if (layer.options.interactive) {
              addClass(path, "leaflet-interactive");
            }
            this._updateStyle(layer);
            this._layers[stamp2(layer)] = layer;
          },
          _addPath: function(layer) {
            if (!this._rootGroup) {
              this._initContainer();
            }
            this._rootGroup.appendChild(layer._path);
            layer.addInteractiveTarget(layer._path);
          },
          _removePath: function(layer) {
            remove(layer._path);
            layer.removeInteractiveTarget(layer._path);
            delete this._layers[stamp2(layer)];
          },
          _updatePath: function(layer) {
            layer._project();
            layer._update();
          },
          _updateStyle: function(layer) {
            var path = layer._path, options = layer.options;
            if (!path) {
              return;
            }
            if (options.stroke) {
              path.setAttribute("stroke", options.color);
              path.setAttribute("stroke-opacity", options.opacity);
              path.setAttribute("stroke-width", options.weight);
              path.setAttribute("stroke-linecap", options.lineCap);
              path.setAttribute("stroke-linejoin", options.lineJoin);
              if (options.dashArray) {
                path.setAttribute("stroke-dasharray", options.dashArray);
              } else {
                path.removeAttribute("stroke-dasharray");
              }
              if (options.dashOffset) {
                path.setAttribute("stroke-dashoffset", options.dashOffset);
              } else {
                path.removeAttribute("stroke-dashoffset");
              }
            } else {
              path.setAttribute("stroke", "none");
            }
            if (options.fill) {
              path.setAttribute("fill", options.fillColor || options.color);
              path.setAttribute("fill-opacity", options.fillOpacity);
              path.setAttribute("fill-rule", options.fillRule || "evenodd");
            } else {
              path.setAttribute("fill", "none");
            }
          },
          _updatePoly: function(layer, closed) {
            this._setPath(layer, pointsToPath(layer._parts, closed));
          },
          _updateCircle: function(layer) {
            var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
            var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
            this._setPath(layer, d);
          },
          _setPath: function(layer, path) {
            layer._path.setAttribute("d", path);
          },
          // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
          _bringToFront: function(layer) {
            toFront(layer._path);
          },
          _bringToBack: function(layer) {
            toBack(layer._path);
          }
        });
        if (Browser.vml) {
          SVG.include(vmlMixin);
        }
        function svg2(options) {
          return Browser.svg || Browser.vml ? new SVG(options) : null;
        }
        Map.include({
          // @namespace Map; @method getRenderer(layer: Path): Renderer
          // Returns the instance of `Renderer` that should be used to render the given
          // `Path`. It will ensure that the `renderer` options of the map and paths
          // are respected, and that the renderers do exist on the map.
          getRenderer: function(layer) {
            var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
            if (!renderer) {
              renderer = this._renderer = this._createRenderer();
            }
            if (!this.hasLayer(renderer)) {
              this.addLayer(renderer);
            }
            return renderer;
          },
          _getPaneRenderer: function(name) {
            if (name === "overlayPane" || name === void 0) {
              return false;
            }
            var renderer = this._paneRenderers[name];
            if (renderer === void 0) {
              renderer = this._createRenderer({ pane: name });
              this._paneRenderers[name] = renderer;
            }
            return renderer;
          },
          _createRenderer: function(options) {
            return this.options.preferCanvas && canvas2(options) || svg2(options);
          }
        });
        var Rectangle = Polygon.extend({
          initialize: function(latLngBounds, options) {
            Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
          },
          // @method setBounds(latLngBounds: LatLngBounds): this
          // Redraws the rectangle with the passed bounds.
          setBounds: function(latLngBounds) {
            return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
          },
          _boundsToLatLngs: function(latLngBounds) {
            latLngBounds = toLatLngBounds(latLngBounds);
            return [
              latLngBounds.getSouthWest(),
              latLngBounds.getNorthWest(),
              latLngBounds.getNorthEast(),
              latLngBounds.getSouthEast()
            ];
          }
        });
        function rectangle(latLngBounds, options) {
          return new Rectangle(latLngBounds, options);
        }
        SVG.create = create2;
        SVG.pointsToPath = pointsToPath;
        GeoJSON.geometryToLayer = geometryToLayer;
        GeoJSON.coordsToLatLng = coordsToLatLng;
        GeoJSON.coordsToLatLngs = coordsToLatLngs;
        GeoJSON.latLngToCoords = latLngToCoords;
        GeoJSON.latLngsToCoords = latLngsToCoords;
        GeoJSON.getFeature = getFeature;
        GeoJSON.asFeature = asFeature;
        Map.mergeOptions({
          // @option boxZoom: Boolean = true
          // Whether the map can be zoomed to a rectangular area specified by
          // dragging the mouse while pressing the shift key.
          boxZoom: true
        });
        var BoxZoom = Handler.extend({
          initialize: function(map) {
            this._map = map;
            this._container = map._container;
            this._pane = map._panes.overlayPane;
            this._resetStateTimeout = 0;
            map.on("unload", this._destroy, this);
          },
          addHooks: function() {
            on2(this._container, "mousedown", this._onMouseDown, this);
          },
          removeHooks: function() {
            off2(this._container, "mousedown", this._onMouseDown, this);
          },
          moved: function() {
            return this._moved;
          },
          _destroy: function() {
            remove(this._pane);
            delete this._pane;
          },
          _resetState: function() {
            this._resetStateTimeout = 0;
            this._moved = false;
          },
          _clearDeferredResetState: function() {
            if (this._resetStateTimeout !== 0) {
              clearTimeout(this._resetStateTimeout);
              this._resetStateTimeout = 0;
            }
          },
          _onMouseDown: function(e) {
            if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
              return false;
            }
            this._clearDeferredResetState();
            this._resetState();
            disableTextSelection2();
            disableImageDrag();
            this._startPoint = this._map.mouseEventToContainerPoint(e);
            on2(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseMove: function(e) {
            if (!this._moved) {
              this._moved = true;
              this._box = create$1("div", "leaflet-zoom-box", this._container);
              addClass(this._container, "leaflet-crosshair");
              this._map.fire("boxzoomstart");
            }
            this._point = this._map.mouseEventToContainerPoint(e);
            var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
            setPosition(this._box, bounds.min);
            this._box.style.width = size.x + "px";
            this._box.style.height = size.y + "px";
          },
          _finish: function() {
            if (this._moved) {
              remove(this._box);
              removeClass(this._container, "leaflet-crosshair");
            }
            enableTextSelection2();
            enableImageDrag();
            off2(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseUp: function(e) {
            if (e.which !== 1 && e.button !== 1) {
              return;
            }
            this._finish();
            if (!this._moved) {
              return;
            }
            this._clearDeferredResetState();
            this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
            var bounds = new LatLngBounds(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
          },
          _onKeyDown: function(e) {
            if (e.keyCode === 27) {
              this._finish();
              this._clearDeferredResetState();
              this._resetState();
            }
          }
        });
        Map.addInitHook("addHandler", "boxZoom", BoxZoom);
        Map.mergeOptions({
          // @option doubleClickZoom: Boolean|String = true
          // Whether the map can be zoomed in by double clicking on it and
          // zoomed out by double clicking while holding shift. If passed
          // `'center'`, double-click zoom will zoom to the center of the
          //  view regardless of where the mouse was.
          doubleClickZoom: true
        });
        var DoubleClickZoom = Handler.extend({
          addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this);
          },
          removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this);
          },
          _onDoubleClick: function(e) {
            var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
            if (map.options.doubleClickZoom === "center") {
              map.setZoom(zoom2);
            } else {
              map.setZoomAround(e.containerPoint, zoom2);
            }
          }
        });
        Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
        Map.mergeOptions({
          // @option dragging: Boolean = true
          // Whether the map is draggable with mouse/touch or not.
          dragging: true,
          // @section Panning Inertia Options
          // @option inertia: Boolean = *
          // If enabled, panning of the map will have an inertia effect where
          // the map builds momentum while dragging and continues moving in
          // the same direction for some time. Feels especially nice on touch
          // devices. Enabled by default.
          inertia: true,
          // @option inertiaDeceleration: Number = 3000
          // The rate with which the inertial movement slows down, in pixels/second².
          inertiaDeceleration: 3400,
          // px/s^2
          // @option inertiaMaxSpeed: Number = Infinity
          // Max speed of the inertial movement, in pixels/second.
          inertiaMaxSpeed: Infinity,
          // px/s
          // @option easeLinearity: Number = 0.2
          easeLinearity: 0.2,
          // TODO refactor, move to CRS
          // @option worldCopyJump: Boolean = false
          // With this option enabled, the map tracks when you pan to another "copy"
          // of the world and seamlessly jumps to the original one so that all overlays
          // like markers and vector layers are still visible.
          worldCopyJump: false,
          // @option maxBoundsViscosity: Number = 0.0
          // If `maxBounds` is set, this option will control how solid the bounds
          // are when dragging the map around. The default value of `0.0` allows the
          // user to drag outside the bounds at normal speed, higher values will
          // slow down map dragging outside bounds, and `1.0` makes the bounds fully
          // solid, preventing the user from dragging outside the bounds.
          maxBoundsViscosity: 0
        });
        var Drag = Handler.extend({
          addHooks: function() {
            if (!this._draggable) {
              var map = this._map;
              this._draggable = new Draggable(map._mapPane, map._container);
              this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
              }, this);
              this._draggable.on("predrag", this._onPreDragLimit, this);
              if (map.options.worldCopyJump) {
                this._draggable.on("predrag", this._onPreDragWrap, this);
                map.on("zoomend", this._onZoomEnd, this);
                map.whenReady(this._onZoomEnd, this);
              }
            }
            addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
            this._draggable.enable();
            this._positions = [];
            this._times = [];
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-grab");
            removeClass(this._map._container, "leaflet-touch-drag");
            this._draggable.disable();
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          moving: function() {
            return this._draggable && this._draggable._moving;
          },
          _onDragStart: function() {
            var map = this._map;
            map._stop();
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
              var bounds = toLatLngBounds(this._map.options.maxBounds);
              this._offsetLimit = toBounds(
                this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
                this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
              );
              this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
            } else {
              this._offsetLimit = null;
            }
            map.fire("movestart").fire("dragstart");
            if (map.options.inertia) {
              this._positions = [];
              this._times = [];
            }
          },
          _onDrag: function(e) {
            if (this._map.options.inertia) {
              var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
              this._positions.push(pos);
              this._times.push(time);
              this._prunePositions(time);
            }
            this._map.fire("move", e).fire("drag", e);
          },
          _prunePositions: function(time) {
            while (this._positions.length > 1 && time - this._times[0] > 50) {
              this._positions.shift();
              this._times.shift();
            }
          },
          _onZoomEnd: function() {
            var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
          },
          _viscousLimit: function(value, threshold) {
            return value - (value - threshold) * this._viscosity;
          },
          _onPreDragLimit: function() {
            if (!this._viscosity || !this._offsetLimit) {
              return;
            }
            var offset = this._draggable._newPos.subtract(this._draggable._startPos);
            var limit = this._offsetLimit;
            if (offset.x < limit.min.x) {
              offset.x = this._viscousLimit(offset.x, limit.min.x);
            }
            if (offset.y < limit.min.y) {
              offset.y = this._viscousLimit(offset.y, limit.min.y);
            }
            if (offset.x > limit.max.x) {
              offset.x = this._viscousLimit(offset.x, limit.max.x);
            }
            if (offset.y > limit.max.y) {
              offset.y = this._viscousLimit(offset.y, limit.max.y);
            }
            this._draggable._newPos = this._draggable._startPos.add(offset);
          },
          _onPreDragWrap: function() {
            var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
            this._draggable._absPos = this._draggable._newPos.clone();
            this._draggable._newPos.x = newX;
          },
          _onDragEnd: function(e) {
            var map = this._map, options = map.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
            map.fire("dragend", e);
            if (noInertia) {
              map.fire("moveend");
            } else {
              this._prunePositions(+/* @__PURE__ */ new Date());
              var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
              if (!offset.x && !offset.y) {
                map.fire("moveend");
              } else {
                offset = map._limitOffset(offset, map.options.maxBounds);
                requestAnimFrame(function() {
                  map.panBy(offset, {
                    duration: decelerationDuration,
                    easeLinearity: ease,
                    noMoveStart: true,
                    animate: true
                  });
                });
              }
            }
          }
        });
        Map.addInitHook("addHandler", "dragging", Drag);
        Map.mergeOptions({
          // @option keyboard: Boolean = true
          // Makes the map focusable and allows users to navigate the map with keyboard
          // arrows and `+`/`-` keys.
          keyboard: true,
          // @option keyboardPanDelta: Number = 80
          // Amount of pixels to pan when pressing an arrow key.
          keyboardPanDelta: 80
        });
        var Keyboard = Handler.extend({
          keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
          },
          initialize: function(map) {
            this._map = map;
            this._setPanDelta(map.options.keyboardPanDelta);
            this._setZoomDelta(map.options.zoomDelta);
          },
          addHooks: function() {
            var container = this._map._container;
            if (container.tabIndex <= 0) {
              container.tabIndex = "0";
            }
            on2(container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.on({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          removeHooks: function() {
            this._removeHooks();
            off2(this._map._container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.off({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          _onMouseDown: function() {
            if (this._focused) {
              return;
            }
            var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
            this._map._container.focus();
            window.scrollTo(left, top);
          },
          _onFocus: function() {
            this._focused = true;
            this._map.fire("focus");
          },
          _onBlur: function() {
            this._focused = false;
            this._map.fire("blur");
          },
          _setPanDelta: function(panDelta) {
            var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.left.length; i < len; i++) {
              keys[codes.left[i]] = [-1 * panDelta, 0];
            }
            for (i = 0, len = codes.right.length; i < len; i++) {
              keys[codes.right[i]] = [panDelta, 0];
            }
            for (i = 0, len = codes.down.length; i < len; i++) {
              keys[codes.down[i]] = [0, panDelta];
            }
            for (i = 0, len = codes.up.length; i < len; i++) {
              keys[codes.up[i]] = [0, -1 * panDelta];
            }
          },
          _setZoomDelta: function(zoomDelta) {
            var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.zoomIn.length; i < len; i++) {
              keys[codes.zoomIn[i]] = zoomDelta;
            }
            for (i = 0, len = codes.zoomOut.length; i < len; i++) {
              keys[codes.zoomOut[i]] = -zoomDelta;
            }
          },
          _addHooks: function() {
            on2(document, "keydown", this._onKeyDown, this);
          },
          _removeHooks: function() {
            off2(document, "keydown", this._onKeyDown, this);
          },
          _onKeyDown: function(e) {
            if (e.altKey || e.ctrlKey || e.metaKey) {
              return;
            }
            var key = e.keyCode, map = this._map, offset;
            if (key in this._panKeys) {
              if (!map._panAnim || !map._panAnim._inProgress) {
                offset = this._panKeys[key];
                if (e.shiftKey) {
                  offset = toPoint2(offset).multiplyBy(3);
                }
                if (map.options.maxBounds) {
                  offset = map._limitOffset(toPoint2(offset), map.options.maxBounds);
                }
                if (map.options.worldCopyJump) {
                  var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
                  map.panTo(newLatLng);
                } else {
                  map.panBy(offset);
                }
              }
            } else if (key in this._zoomKeys) {
              map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
            } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
              map.closePopup();
            } else {
              return;
            }
            stop(e);
          }
        });
        Map.addInitHook("addHandler", "keyboard", Keyboard);
        Map.mergeOptions({
          // @section Mouse wheel options
          // @option scrollWheelZoom: Boolean|String = true
          // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
          // it will zoom to the center of the view regardless of where the mouse was.
          scrollWheelZoom: true,
          // @option wheelDebounceTime: Number = 40
          // Limits the rate at which a wheel can fire (in milliseconds). By default
          // user can't zoom via wheel more often than once per 40 ms.
          wheelDebounceTime: 40,
          // @option wheelPxPerZoomLevel: Number = 60
          // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
          // mean a change of one full zoom level. Smaller values will make wheel-zooming
          // faster (and vice versa).
          wheelPxPerZoomLevel: 60
        });
        var ScrollWheelZoom = Handler.extend({
          addHooks: function() {
            on2(this._map._container, "wheel", this._onWheelScroll, this);
            this._delta = 0;
          },
          removeHooks: function() {
            off2(this._map._container, "wheel", this._onWheelScroll, this);
          },
          _onWheelScroll: function(e) {
            var delta = getWheelDelta(e);
            var debounce = this._map.options.wheelDebounceTime;
            this._delta += delta;
            this._lastMousePos = this._map.mouseEventToContainerPoint(e);
            if (!this._startTime) {
              this._startTime = +/* @__PURE__ */ new Date();
            }
            var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(bind(this._performZoom, this), left);
            stop(e);
          },
          _performZoom: function() {
            var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
            map._stop();
            var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
            this._delta = 0;
            this._startTime = null;
            if (!delta) {
              return;
            }
            if (map.options.scrollWheelZoom === "center") {
              map.setZoom(zoom2 + delta);
            } else {
              map.setZoomAround(this._lastMousePos, zoom2 + delta);
            }
          }
        });
        Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
        var tapHoldDelay = 600;
        Map.mergeOptions({
          // @section Touch interaction options
          // @option tapHold: Boolean
          // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
          tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
          // @option tapTolerance: Number = 15
          // The max number of pixels a user can shift his finger during touch
          // for it to be considered a valid tap.
          tapTolerance: 15
        });
        var TapHold = Handler.extend({
          addHooks: function() {
            on2(this._map._container, "touchstart", this._onDown, this);
          },
          removeHooks: function() {
            off2(this._map._container, "touchstart", this._onDown, this);
          },
          _onDown: function(e) {
            clearTimeout(this._holdTimeout);
            if (e.touches.length !== 1) {
              return;
            }
            var first = e.touches[0];
            this._startPos = this._newPos = new Point2(first.clientX, first.clientY);
            this._holdTimeout = setTimeout(bind(function() {
              this._cancel();
              if (!this._isTapValid()) {
                return;
              }
              on2(document, "touchend", preventDefault2);
              on2(document, "touchend touchcancel", this._cancelClickPrevent);
              this._simulateEvent("contextmenu", first);
            }, this), tapHoldDelay);
            on2(document, "touchend touchcancel contextmenu", this._cancel, this);
            on2(document, "touchmove", this._onMove, this);
          },
          _cancelClickPrevent: function cancelClickPrevent() {
            off2(document, "touchend", preventDefault2);
            off2(document, "touchend touchcancel", cancelClickPrevent);
          },
          _cancel: function() {
            clearTimeout(this._holdTimeout);
            off2(document, "touchend touchcancel contextmenu", this._cancel, this);
            off2(document, "touchmove", this._onMove, this);
          },
          _onMove: function(e) {
            var first = e.touches[0];
            this._newPos = new Point2(first.clientX, first.clientY);
          },
          _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
          },
          _simulateEvent: function(type, e) {
            var simulatedEvent = new MouseEvent(type, {
              bubbles: true,
              cancelable: true,
              view: window,
              // detail: 1,
              screenX: e.screenX,
              screenY: e.screenY,
              clientX: e.clientX,
              clientY: e.clientY
              // button: 2,
              // buttons: 2
            });
            simulatedEvent._simulated = true;
            e.target.dispatchEvent(simulatedEvent);
          }
        });
        Map.addInitHook("addHandler", "tapHold", TapHold);
        Map.mergeOptions({
          // @section Touch interaction options
          // @option touchZoom: Boolean|String = *
          // Whether the map can be zoomed by touch-dragging with two fingers. If
          // passed `'center'`, it will zoom to the center of the view regardless of
          // where the touch events (fingers) were. Enabled for touch-capable web
          // browsers.
          touchZoom: Browser.touch,
          // @option bounceAtZoomLimits: Boolean = true
          // Set it to false if you don't want the map to zoom beyond min/max zoom
          // and then bounce back when pinch-zooming.
          bounceAtZoomLimits: true
        });
        var TouchZoom = Handler.extend({
          addHooks: function() {
            addClass(this._map._container, "leaflet-touch-zoom");
            on2(this._map._container, "touchstart", this._onTouchStart, this);
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-touch-zoom");
            off2(this._map._container, "touchstart", this._onTouchStart, this);
          },
          _onTouchStart: function(e) {
            var map = this._map;
            if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) {
              return;
            }
            var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
            this._centerPoint = map.getSize()._divideBy(2);
            this._startLatLng = map.containerPointToLatLng(this._centerPoint);
            if (map.options.touchZoom !== "center") {
              this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
            }
            this._startDist = p1.distanceTo(p2);
            this._startZoom = map.getZoom();
            this._moved = false;
            this._zooming = true;
            map._stop();
            on2(document, "touchmove", this._onTouchMove, this);
            on2(document, "touchend touchcancel", this._onTouchEnd, this);
            preventDefault2(e);
          },
          _onTouchMove: function(e) {
            if (!e.touches || e.touches.length !== 2 || !this._zooming) {
              return;
            }
            var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
            this._zoom = map.getScaleZoom(scale2, this._startZoom);
            if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
              this._zoom = map._limitZoom(this._zoom);
            }
            if (map.options.touchZoom === "center") {
              this._center = this._startLatLng;
              if (scale2 === 1) {
                return;
              }
            } else {
              var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
              if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
                return;
              }
              this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
            }
            if (!this._moved) {
              map._moveStart(true, false);
              this._moved = true;
            }
            cancelAnimFrame(this._animRequest);
            var moveFn = bind(map._move, map, this._center, this._zoom, { pinch: true, round: false }, void 0);
            this._animRequest = requestAnimFrame(moveFn, this, true);
            preventDefault2(e);
          },
          _onTouchEnd: function() {
            if (!this._moved || !this._zooming) {
              this._zooming = false;
              return;
            }
            this._zooming = false;
            cancelAnimFrame(this._animRequest);
            off2(document, "touchmove", this._onTouchMove, this);
            off2(document, "touchend touchcancel", this._onTouchEnd, this);
            if (this._map.options.zoomAnimation) {
              this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
            } else {
              this._map._resetView(this._center, this._map._limitZoom(this._zoom));
            }
          }
        });
        Map.addInitHook("addHandler", "touchZoom", TouchZoom);
        Map.BoxZoom = BoxZoom;
        Map.DoubleClickZoom = DoubleClickZoom;
        Map.Drag = Drag;
        Map.Keyboard = Keyboard;
        Map.ScrollWheelZoom = ScrollWheelZoom;
        Map.TapHold = TapHold;
        Map.TouchZoom = TouchZoom;
        exports2.Bounds = Bounds;
        exports2.Browser = Browser;
        exports2.CRS = CRS;
        exports2.Canvas = Canvas;
        exports2.Circle = Circle;
        exports2.CircleMarker = CircleMarker;
        exports2.Class = Class;
        exports2.Control = Control;
        exports2.DivIcon = DivIcon;
        exports2.DivOverlay = DivOverlay;
        exports2.DomEvent = DomEvent;
        exports2.DomUtil = DomUtil;
        exports2.Draggable = Draggable;
        exports2.Evented = Evented;
        exports2.FeatureGroup = FeatureGroup;
        exports2.GeoJSON = GeoJSON;
        exports2.GridLayer = GridLayer;
        exports2.Handler = Handler;
        exports2.Icon = Icon;
        exports2.ImageOverlay = ImageOverlay;
        exports2.LatLng = LatLng2;
        exports2.LatLngBounds = LatLngBounds;
        exports2.Layer = Layer;
        exports2.LayerGroup = LayerGroup;
        exports2.LineUtil = LineUtil;
        exports2.Map = Map;
        exports2.Marker = Marker;
        exports2.Mixin = Mixin;
        exports2.Path = Path;
        exports2.Point = Point2;
        exports2.PolyUtil = PolyUtil;
        exports2.Polygon = Polygon;
        exports2.Polyline = Polyline;
        exports2.Popup = Popup;
        exports2.PosAnimation = PosAnimation;
        exports2.Projection = index;
        exports2.Rectangle = Rectangle;
        exports2.Renderer = Renderer;
        exports2.SVG = SVG;
        exports2.SVGOverlay = SVGOverlay;
        exports2.TileLayer = TileLayer;
        exports2.Tooltip = Tooltip;
        exports2.Transformation = Transformation;
        exports2.Util = Util;
        exports2.VideoOverlay = VideoOverlay;
        exports2.bind = bind;
        exports2.bounds = toBounds;
        exports2.canvas = canvas2;
        exports2.circle = circle;
        exports2.circleMarker = circleMarker;
        exports2.control = control;
        exports2.divIcon = divIcon;
        exports2.extend = extend;
        exports2.featureGroup = featureGroup;
        exports2.geoJSON = geoJSON;
        exports2.geoJson = geoJson;
        exports2.gridLayer = gridLayer;
        exports2.icon = icon;
        exports2.imageOverlay = imageOverlay;
        exports2.latLng = toLatLng;
        exports2.latLngBounds = toLatLngBounds;
        exports2.layerGroup = layerGroup;
        exports2.map = createMap;
        exports2.marker = marker;
        exports2.point = toPoint2;
        exports2.polygon = polygon;
        exports2.polyline = polyline;
        exports2.popup = popup;
        exports2.rectangle = rectangle;
        exports2.setOptions = setOptions;
        exports2.stamp = stamp2;
        exports2.svg = svg2;
        exports2.svgOverlay = svgOverlay;
        exports2.tileLayer = tileLayer;
        exports2.tooltip = tooltip;
        exports2.transformation = toTransformation;
        exports2.version = version;
        exports2.videoOverlay = videoOverlay;
        var oldL = window.L;
        exports2.noConflict = function() {
          window.L = oldL;
          return this;
        };
        window.L = exports2;
      });
    }
  });

  // node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js
  var require_leaflet_markercluster_src = __commonJS({
    "node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory((global.Leaflet = global.Leaflet || {}, global.Leaflet.markercluster = {})));
      })(exports, function(exports2) {
        "use strict";
        var MarkerClusterGroup = L.MarkerClusterGroup = L.FeatureGroup.extend({
          options: {
            maxClusterRadius: 80,
            //A cluster will cover at most this many pixels from its center
            iconCreateFunction: null,
            clusterPane: L.Marker.prototype.options.pane,
            spiderfyOnEveryZoom: false,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: true,
            singleMarkerMode: false,
            disableClusteringAtZoom: null,
            // Setting this to false prevents the removal of any clusters outside of the viewpoint, which
            // is the default behaviour for performance reasons.
            removeOutsideVisibleBounds: true,
            // Set to false to disable all animations (zoom and spiderfy).
            // If false, option animateAddingMarkers below has no effect.
            // If L.DomUtil.TRANSITION is falsy, this option has no effect.
            animate: true,
            //Whether to animate adding markers after adding the MarkerClusterGroup to the map
            // If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
            animateAddingMarkers: false,
            // Make it possible to provide custom function to calculate spiderfy shape positions
            spiderfyShapePositions: null,
            //Increase to increase the distance away that spiderfied markers appear from the center
            spiderfyDistanceMultiplier: 1,
            // Make it possible to specify a polyline options on a spider leg
            spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0.5 },
            // When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
            chunkedLoading: false,
            chunkInterval: 200,
            // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
            chunkDelay: 50,
            // at the end of each interval, give n milliseconds back to system/browser
            chunkProgress: null,
            // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)
            //Options to pass to the L.Polygon constructor
            polygonOptions: {}
          },
          initialize: function(options) {
            L.Util.setOptions(this, options);
            if (!this.options.iconCreateFunction) {
              this.options.iconCreateFunction = this._defaultIconCreateFunction;
            }
            this._featureGroup = L.featureGroup();
            this._featureGroup.addEventParent(this);
            this._nonPointGroup = L.featureGroup();
            this._nonPointGroup.addEventParent(this);
            this._inZoomAnimation = 0;
            this._needsClustering = [];
            this._needsRemoving = [];
            this._currentShownBounds = null;
            this._queue = [];
            this._childMarkerEventHandlers = {
              "dragstart": this._childMarkerDragStart,
              "move": this._childMarkerMoved,
              "dragend": this._childMarkerDragEnd
            };
            var animate = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, animate ? this._withAnimation : this._noAnimation);
            this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
          },
          addLayer: function(layer) {
            if (layer instanceof L.LayerGroup) {
              return this.addLayers([layer]);
            }
            if (!layer.getLatLng) {
              this._nonPointGroup.addLayer(layer);
              this.fire("layeradd", { layer });
              return this;
            }
            if (!this._map) {
              this._needsClustering.push(layer);
              this.fire("layeradd", { layer });
              return this;
            }
            if (this.hasLayer(layer)) {
              return this;
            }
            if (this._unspiderfy) {
              this._unspiderfy();
            }
            this._addLayer(layer, this._maxZoom);
            this.fire("layeradd", { layer });
            this._topClusterLevel._recalculateBounds();
            this._refreshClustersIcons();
            var visibleLayer = layer, currentZoom = this._zoom;
            if (layer.__parent) {
              while (visibleLayer.__parent._zoom >= currentZoom) {
                visibleLayer = visibleLayer.__parent;
              }
            }
            if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
              if (this.options.animateAddingMarkers) {
                this._animationAddLayer(layer, visibleLayer);
              } else {
                this._animationAddLayerNonAnimated(layer, visibleLayer);
              }
            }
            return this;
          },
          removeLayer: function(layer) {
            if (layer instanceof L.LayerGroup) {
              return this.removeLayers([layer]);
            }
            if (!layer.getLatLng) {
              this._nonPointGroup.removeLayer(layer);
              this.fire("layerremove", { layer });
              return this;
            }
            if (!this._map) {
              if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
                this._needsRemoving.push({ layer, latlng: layer._latlng });
              }
              this.fire("layerremove", { layer });
              return this;
            }
            if (!layer.__parent) {
              return this;
            }
            if (this._unspiderfy) {
              this._unspiderfy();
              this._unspiderfyLayer(layer);
            }
            this._removeLayer(layer, true);
            this.fire("layerremove", { layer });
            this._topClusterLevel._recalculateBounds();
            this._refreshClustersIcons();
            layer.off(this._childMarkerEventHandlers, this);
            if (this._featureGroup.hasLayer(layer)) {
              this._featureGroup.removeLayer(layer);
              if (layer.clusterShow) {
                layer.clusterShow();
              }
            }
            return this;
          },
          //Takes an array of markers and adds them in bulk
          addLayers: function(layersArray, skipLayerAddEvent) {
            if (!L.Util.isArray(layersArray)) {
              return this.addLayer(layersArray);
            }
            var fg = this._featureGroup, npg = this._nonPointGroup, chunked = this.options.chunkedLoading, chunkInterval = this.options.chunkInterval, chunkProgress = this.options.chunkProgress, l = layersArray.length, offset = 0, originalArray = true, m;
            if (this._map) {
              var started = (/* @__PURE__ */ new Date()).getTime();
              var process = L.bind(function() {
                var start = (/* @__PURE__ */ new Date()).getTime();
                if (this._map && this._unspiderfy) {
                  this._unspiderfy();
                }
                for (; offset < l; offset++) {
                  if (chunked && offset % 200 === 0) {
                    var elapsed = (/* @__PURE__ */ new Date()).getTime() - start;
                    if (elapsed > chunkInterval) {
                      break;
                    }
                  }
                  m = layersArray[offset];
                  if (m instanceof L.LayerGroup) {
                    if (originalArray) {
                      layersArray = layersArray.slice();
                      originalArray = false;
                    }
                    this._extractNonGroupLayers(m, layersArray);
                    l = layersArray.length;
                    continue;
                  }
                  if (!m.getLatLng) {
                    npg.addLayer(m);
                    if (!skipLayerAddEvent) {
                      this.fire("layeradd", { layer: m });
                    }
                    continue;
                  }
                  if (this.hasLayer(m)) {
                    continue;
                  }
                  this._addLayer(m, this._maxZoom);
                  if (!skipLayerAddEvent) {
                    this.fire("layeradd", { layer: m });
                  }
                  if (m.__parent) {
                    if (m.__parent.getChildCount() === 2) {
                      var markers = m.__parent.getAllChildMarkers(), otherMarker = markers[0] === m ? markers[1] : markers[0];
                      fg.removeLayer(otherMarker);
                    }
                  }
                }
                if (chunkProgress) {
                  chunkProgress(offset, l, (/* @__PURE__ */ new Date()).getTime() - started);
                }
                if (offset === l) {
                  this._topClusterLevel._recalculateBounds();
                  this._refreshClustersIcons();
                  this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
                } else {
                  setTimeout(process, this.options.chunkDelay);
                }
              }, this);
              process();
            } else {
              var needsClustering = this._needsClustering;
              for (; offset < l; offset++) {
                m = layersArray[offset];
                if (m instanceof L.LayerGroup) {
                  if (originalArray) {
                    layersArray = layersArray.slice();
                    originalArray = false;
                  }
                  this._extractNonGroupLayers(m, layersArray);
                  l = layersArray.length;
                  continue;
                }
                if (!m.getLatLng) {
                  npg.addLayer(m);
                  continue;
                }
                if (this.hasLayer(m)) {
                  continue;
                }
                needsClustering.push(m);
              }
            }
            return this;
          },
          //Takes an array of markers and removes them in bulk
          removeLayers: function(layersArray) {
            var i, m, l = layersArray.length, fg = this._featureGroup, npg = this._nonPointGroup, originalArray = true;
            if (!this._map) {
              for (i = 0; i < l; i++) {
                m = layersArray[i];
                if (m instanceof L.LayerGroup) {
                  if (originalArray) {
                    layersArray = layersArray.slice();
                    originalArray = false;
                  }
                  this._extractNonGroupLayers(m, layersArray);
                  l = layersArray.length;
                  continue;
                }
                this._arraySplice(this._needsClustering, m);
                npg.removeLayer(m);
                if (this.hasLayer(m)) {
                  this._needsRemoving.push({ layer: m, latlng: m._latlng });
                }
                this.fire("layerremove", { layer: m });
              }
              return this;
            }
            if (this._unspiderfy) {
              this._unspiderfy();
              var layersArray2 = layersArray.slice(), l2 = l;
              for (i = 0; i < l2; i++) {
                m = layersArray2[i];
                if (m instanceof L.LayerGroup) {
                  this._extractNonGroupLayers(m, layersArray2);
                  l2 = layersArray2.length;
                  continue;
                }
                this._unspiderfyLayer(m);
              }
            }
            for (i = 0; i < l; i++) {
              m = layersArray[i];
              if (m instanceof L.LayerGroup) {
                if (originalArray) {
                  layersArray = layersArray.slice();
                  originalArray = false;
                }
                this._extractNonGroupLayers(m, layersArray);
                l = layersArray.length;
                continue;
              }
              if (!m.__parent) {
                npg.removeLayer(m);
                this.fire("layerremove", { layer: m });
                continue;
              }
              this._removeLayer(m, true, true);
              this.fire("layerremove", { layer: m });
              if (fg.hasLayer(m)) {
                fg.removeLayer(m);
                if (m.clusterShow) {
                  m.clusterShow();
                }
              }
            }
            this._topClusterLevel._recalculateBounds();
            this._refreshClustersIcons();
            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
            return this;
          },
          //Removes all layers from the MarkerClusterGroup
          clearLayers: function() {
            if (!this._map) {
              this._needsClustering = [];
              this._needsRemoving = [];
              delete this._gridClusters;
              delete this._gridUnclustered;
            }
            if (this._noanimationUnspiderfy) {
              this._noanimationUnspiderfy();
            }
            this._featureGroup.clearLayers();
            this._nonPointGroup.clearLayers();
            this.eachLayer(function(marker) {
              marker.off(this._childMarkerEventHandlers, this);
              delete marker.__parent;
            }, this);
            if (this._map) {
              this._generateInitialClusters();
            }
            return this;
          },
          //Override FeatureGroup.getBounds as it doesn't work
          getBounds: function() {
            var bounds = new L.LatLngBounds();
            if (this._topClusterLevel) {
              bounds.extend(this._topClusterLevel._bounds);
            }
            for (var i = this._needsClustering.length - 1; i >= 0; i--) {
              bounds.extend(this._needsClustering[i].getLatLng());
            }
            bounds.extend(this._nonPointGroup.getBounds());
            return bounds;
          },
          //Overrides LayerGroup.eachLayer
          eachLayer: function(method, context) {
            var markers = this._needsClustering.slice(), needsRemoving = this._needsRemoving, thisNeedsRemoving, i, j;
            if (this._topClusterLevel) {
              this._topClusterLevel.getAllChildMarkers(markers);
            }
            for (i = markers.length - 1; i >= 0; i--) {
              thisNeedsRemoving = true;
              for (j = needsRemoving.length - 1; j >= 0; j--) {
                if (needsRemoving[j].layer === markers[i]) {
                  thisNeedsRemoving = false;
                  break;
                }
              }
              if (thisNeedsRemoving) {
                method.call(context, markers[i]);
              }
            }
            this._nonPointGroup.eachLayer(method, context);
          },
          //Overrides LayerGroup.getLayers
          getLayers: function() {
            var layers = [];
            this.eachLayer(function(l) {
              layers.push(l);
            });
            return layers;
          },
          //Overrides LayerGroup.getLayer, WARNING: Really bad performance
          getLayer: function(id) {
            var result = null;
            id = parseInt(id, 10);
            this.eachLayer(function(l) {
              if (L.stamp(l) === id) {
                result = l;
              }
            });
            return result;
          },
          //Returns true if the given layer is in this MarkerClusterGroup
          hasLayer: function(layer) {
            if (!layer) {
              return false;
            }
            var i, anArray = this._needsClustering;
            for (i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i] === layer) {
                return true;
              }
            }
            anArray = this._needsRemoving;
            for (i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i].layer === layer) {
                return false;
              }
            }
            return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
          },
          //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
          zoomToShowLayer: function(layer, callback) {
            var map = this._map;
            if (typeof callback !== "function") {
              callback = function() {
              };
            }
            var showMarker = function() {
              if ((map.hasLayer(layer) || map.hasLayer(layer.__parent)) && !this._inZoomAnimation) {
                this._map.off("moveend", showMarker, this);
                this.off("animationend", showMarker, this);
                if (map.hasLayer(layer)) {
                  callback();
                } else if (layer.__parent._icon) {
                  this.once("spiderfied", callback, this);
                  layer.__parent.spiderfy();
                }
              }
            };
            if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
              callback();
            } else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
              this._map.on("moveend", showMarker, this);
              this._map.panTo(layer.getLatLng());
            } else {
              this._map.on("moveend", showMarker, this);
              this.on("animationend", showMarker, this);
              layer.__parent.zoomToBounds();
            }
          },
          //Overrides FeatureGroup.onAdd
          onAdd: function(map) {
            this._map = map;
            var i, l, layer;
            if (!isFinite(this._map.getMaxZoom())) {
              throw "Map has no maxZoom specified";
            }
            this._featureGroup.addTo(map);
            this._nonPointGroup.addTo(map);
            if (!this._gridClusters) {
              this._generateInitialClusters();
            }
            this._maxLat = map.options.crs.projection.MAX_LATITUDE;
            for (i = 0, l = this._needsRemoving.length; i < l; i++) {
              layer = this._needsRemoving[i];
              layer.newlatlng = layer.layer._latlng;
              layer.layer._latlng = layer.latlng;
            }
            for (i = 0, l = this._needsRemoving.length; i < l; i++) {
              layer = this._needsRemoving[i];
              this._removeLayer(layer.layer, true);
              layer.layer._latlng = layer.newlatlng;
            }
            this._needsRemoving = [];
            this._zoom = Math.round(this._map._zoom);
            this._currentShownBounds = this._getExpandedVisibleBounds();
            this._map.on("zoomend", this._zoomEnd, this);
            this._map.on("moveend", this._moveEnd, this);
            if (this._spiderfierOnAdd) {
              this._spiderfierOnAdd();
            }
            this._bindEvents();
            l = this._needsClustering;
            this._needsClustering = [];
            this.addLayers(l, true);
          },
          //Overrides FeatureGroup.onRemove
          onRemove: function(map) {
            map.off("zoomend", this._zoomEnd, this);
            map.off("moveend", this._moveEnd, this);
            this._unbindEvents();
            this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
            if (this._spiderfierOnRemove) {
              this._spiderfierOnRemove();
            }
            delete this._maxLat;
            this._hideCoverage();
            this._featureGroup.remove();
            this._nonPointGroup.remove();
            this._featureGroup.clearLayers();
            this._map = null;
          },
          getVisibleParent: function(marker) {
            var vMarker = marker;
            while (vMarker && !vMarker._icon) {
              vMarker = vMarker.__parent;
            }
            return vMarker || null;
          },
          //Remove the given object from the given array
          _arraySplice: function(anArray, obj) {
            for (var i = anArray.length - 1; i >= 0; i--) {
              if (anArray[i] === obj) {
                anArray.splice(i, 1);
                return true;
              }
            }
          },
          /**
           * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
           * @param marker to be removed from _gridUnclustered.
           * @param z integer bottom start zoom level (included)
           * @private
           */
          _removeFromGridUnclustered: function(marker, z) {
            var map = this._map, gridUnclustered = this._gridUnclustered, minZoom = Math.floor(this._map.getMinZoom());
            for (; z >= minZoom; z--) {
              if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
                break;
              }
            }
          },
          _childMarkerDragStart: function(e) {
            e.target.__dragStart = e.target._latlng;
          },
          _childMarkerMoved: function(e) {
            if (!this._ignoreMove && !e.target.__dragStart) {
              var isPopupOpen = e.target._popup && e.target._popup.isOpen();
              this._moveChild(e.target, e.oldLatLng, e.latlng);
              if (isPopupOpen) {
                e.target.openPopup();
              }
            }
          },
          _moveChild: function(layer, from, to) {
            layer._latlng = from;
            this.removeLayer(layer);
            layer._latlng = to;
            this.addLayer(layer);
          },
          _childMarkerDragEnd: function(e) {
            var dragStart = e.target.__dragStart;
            delete e.target.__dragStart;
            if (dragStart) {
              this._moveChild(e.target, dragStart, e.target._latlng);
            }
          },
          //Internal function for removing a marker from everything.
          //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
          _removeLayer: function(marker, removeFromDistanceGrid, dontUpdateMap) {
            var gridClusters = this._gridClusters, gridUnclustered = this._gridUnclustered, fg = this._featureGroup, map = this._map, minZoom = Math.floor(this._map.getMinZoom());
            if (removeFromDistanceGrid) {
              this._removeFromGridUnclustered(marker, this._maxZoom);
            }
            var cluster = marker.__parent, markers = cluster._markers, otherMarker;
            this._arraySplice(markers, marker);
            while (cluster) {
              cluster._childCount--;
              cluster._boundsNeedUpdate = true;
              if (cluster._zoom < minZoom) {
                break;
              } else if (removeFromDistanceGrid && cluster._childCount <= 1) {
                otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];
                gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
                gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));
                this._arraySplice(cluster.__parent._childClusters, cluster);
                cluster.__parent._markers.push(otherMarker);
                otherMarker.__parent = cluster.__parent;
                if (cluster._icon) {
                  fg.removeLayer(cluster);
                  if (!dontUpdateMap) {
                    fg.addLayer(otherMarker);
                  }
                }
              } else {
                cluster._iconNeedsUpdate = true;
              }
              cluster = cluster.__parent;
            }
            delete marker.__parent;
          },
          _isOrIsParent: function(el, oel) {
            while (oel) {
              if (el === oel) {
                return true;
              }
              oel = oel.parentNode;
            }
            return false;
          },
          //Override L.Evented.fire
          fire: function(type, data, propagate) {
            if (data && data.layer instanceof L.MarkerCluster) {
              if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
                return;
              }
              type = "cluster" + type;
            }
            L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
          },
          //Override L.Evented.listens
          listens: function(type, propagate) {
            return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, "cluster" + type, propagate);
          },
          //Default functionality
          _defaultIconCreateFunction: function(cluster) {
            var childCount = cluster.getChildCount();
            var c = " marker-cluster-";
            if (childCount < 10) {
              c += "small";
            } else if (childCount < 100) {
              c += "medium";
            } else {
              c += "large";
            }
            return new L.DivIcon({ html: "<div><span>" + childCount + "</span></div>", className: "marker-cluster" + c, iconSize: new L.Point(40, 40) });
          },
          _bindEvents: function() {
            var map = this._map, spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom, showCoverageOnHover = this.options.showCoverageOnHover, zoomToBoundsOnClick = this.options.zoomToBoundsOnClick, spiderfyOnEveryZoom = this.options.spiderfyOnEveryZoom;
            if (spiderfyOnMaxZoom || zoomToBoundsOnClick || spiderfyOnEveryZoom) {
              this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this);
            }
            if (showCoverageOnHover) {
              this.on("clustermouseover", this._showCoverage, this);
              this.on("clustermouseout", this._hideCoverage, this);
              map.on("zoomend", this._hideCoverage, this);
            }
          },
          _zoomOrSpiderfy: function(e) {
            var cluster = e.layer, bottomCluster = cluster;
            if (e.type === "clusterkeypress" && e.originalEvent && e.originalEvent.keyCode !== 13) {
              return;
            }
            while (bottomCluster._childClusters.length === 1) {
              bottomCluster = bottomCluster._childClusters[0];
            }
            if (bottomCluster._zoom === this._maxZoom && bottomCluster._childCount === cluster._childCount && this.options.spiderfyOnMaxZoom) {
              cluster.spiderfy();
            } else if (this.options.zoomToBoundsOnClick) {
              cluster.zoomToBounds();
            }
            if (this.options.spiderfyOnEveryZoom) {
              cluster.spiderfy();
            }
            if (e.originalEvent && e.originalEvent.keyCode === 13) {
              this._map._container.focus();
            }
          },
          _showCoverage: function(e) {
            var map = this._map;
            if (this._inZoomAnimation) {
              return;
            }
            if (this._shownPolygon) {
              map.removeLayer(this._shownPolygon);
            }
            if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
              this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
              map.addLayer(this._shownPolygon);
            }
          },
          _hideCoverage: function() {
            if (this._shownPolygon) {
              this._map.removeLayer(this._shownPolygon);
              this._shownPolygon = null;
            }
          },
          _unbindEvents: function() {
            var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom, showCoverageOnHover = this.options.showCoverageOnHover, zoomToBoundsOnClick = this.options.zoomToBoundsOnClick, spiderfyOnEveryZoom = this.options.spiderfyOnEveryZoom, map = this._map;
            if (spiderfyOnMaxZoom || zoomToBoundsOnClick || spiderfyOnEveryZoom) {
              this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this);
            }
            if (showCoverageOnHover) {
              this.off("clustermouseover", this._showCoverage, this);
              this.off("clustermouseout", this._hideCoverage, this);
              map.off("zoomend", this._hideCoverage, this);
            }
          },
          _zoomEnd: function() {
            if (!this._map) {
              return;
            }
            this._mergeSplitClusters();
            this._zoom = Math.round(this._map._zoom);
            this._currentShownBounds = this._getExpandedVisibleBounds();
          },
          _moveEnd: function() {
            if (this._inZoomAnimation) {
              return;
            }
            var newBounds = this._getExpandedVisibleBounds();
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, newBounds);
            this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);
            this._currentShownBounds = newBounds;
            return;
          },
          _generateInitialClusters: function() {
            var maxZoom = Math.ceil(this._map.getMaxZoom()), minZoom = Math.floor(this._map.getMinZoom()), radius = this.options.maxClusterRadius, radiusFn = radius;
            if (typeof radius !== "function") {
              radiusFn = function() {
                return radius;
              };
            }
            if (this.options.disableClusteringAtZoom !== null) {
              maxZoom = this.options.disableClusteringAtZoom - 1;
            }
            this._maxZoom = maxZoom;
            this._gridClusters = {};
            this._gridUnclustered = {};
            for (var zoom = maxZoom; zoom >= minZoom; zoom--) {
              this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
              this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
            }
            this._topClusterLevel = new this._markerCluster(this, minZoom - 1);
          },
          //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
          _addLayer: function(layer, zoom) {
            var gridClusters = this._gridClusters, gridUnclustered = this._gridUnclustered, minZoom = Math.floor(this._map.getMinZoom()), markerPoint, z;
            if (this.options.singleMarkerMode) {
              this._overrideMarkerIcon(layer);
            }
            layer.on(this._childMarkerEventHandlers, this);
            for (; zoom >= minZoom; zoom--) {
              markerPoint = this._map.project(layer.getLatLng(), zoom);
              var closest = gridClusters[zoom].getNearObject(markerPoint);
              if (closest) {
                closest._addChild(layer);
                layer.__parent = closest;
                return;
              }
              closest = gridUnclustered[zoom].getNearObject(markerPoint);
              if (closest) {
                var parent = closest.__parent;
                if (parent) {
                  this._removeLayer(closest, false);
                }
                var newCluster = new this._markerCluster(this, zoom, closest, layer);
                gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
                closest.__parent = newCluster;
                layer.__parent = newCluster;
                var lastParent = newCluster;
                for (z = zoom - 1; z > parent._zoom; z--) {
                  lastParent = new this._markerCluster(this, z, lastParent);
                  gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
                }
                parent._addChild(lastParent);
                this._removeFromGridUnclustered(closest, zoom);
                return;
              }
              gridUnclustered[zoom].addObject(layer, markerPoint);
            }
            this._topClusterLevel._addChild(layer);
            layer.__parent = this._topClusterLevel;
            return;
          },
          /**
           * Refreshes the icon of all "dirty" visible clusters.
           * Non-visible "dirty" clusters will be updated when they are added to the map.
           * @private
           */
          _refreshClustersIcons: function() {
            this._featureGroup.eachLayer(function(c) {
              if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
                c._updateIcon();
              }
            });
          },
          //Enqueue code to fire after the marker expand/contract has happened
          _enqueue: function(fn) {
            this._queue.push(fn);
            if (!this._queueTimeout) {
              this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
            }
          },
          _processQueue: function() {
            for (var i = 0; i < this._queue.length; i++) {
              this._queue[i].call(this);
            }
            this._queue.length = 0;
            clearTimeout(this._queueTimeout);
            this._queueTimeout = null;
          },
          //Merge and split any existing clusters that are too big or small
          _mergeSplitClusters: function() {
            var mapZoom = Math.round(this._map._zoom);
            this._processQueue();
            if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) {
              this._animationStart();
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds());
              this._animationZoomIn(this._zoom, mapZoom);
            } else if (this._zoom > mapZoom) {
              this._animationStart();
              this._animationZoomOut(this._zoom, mapZoom);
            } else {
              this._moveEnd();
            }
          },
          //Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
          _getExpandedVisibleBounds: function() {
            if (!this.options.removeOutsideVisibleBounds) {
              return this._mapBoundsInfinite;
            } else if (L.Browser.mobile) {
              return this._checkBoundsMaxLat(this._map.getBounds());
            }
            return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
          },
          /**
           * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
           * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
           * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
           * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
           * making the user think that MCG "eats" them and never displays them again.
           * @param bounds L.LatLngBounds
           * @returns {L.LatLngBounds}
           * @private
           */
          _checkBoundsMaxLat: function(bounds) {
            var maxLat = this._maxLat;
            if (maxLat !== void 0) {
              if (bounds.getNorth() >= maxLat) {
                bounds._northEast.lat = Infinity;
              }
              if (bounds.getSouth() <= -maxLat) {
                bounds._southWest.lat = -Infinity;
              }
            }
            return bounds;
          },
          //Shared animation code
          _animationAddLayerNonAnimated: function(layer, newCluster) {
            if (newCluster === layer) {
              this._featureGroup.addLayer(layer);
            } else if (newCluster._childCount === 2) {
              newCluster._addToMap();
              var markers = newCluster.getAllChildMarkers();
              this._featureGroup.removeLayer(markers[0]);
              this._featureGroup.removeLayer(markers[1]);
            } else {
              newCluster._updateIcon();
            }
          },
          /**
           * Extracts individual (i.e. non-group) layers from a Layer Group.
           * @param group to extract layers from.
           * @param output {Array} in which to store the extracted layers.
           * @returns {*|Array}
           * @private
           */
          _extractNonGroupLayers: function(group, output) {
            var layers = group.getLayers(), i = 0, layer;
            output = output || [];
            for (; i < layers.length; i++) {
              layer = layers[i];
              if (layer instanceof L.LayerGroup) {
                this._extractNonGroupLayers(layer, output);
                continue;
              }
              output.push(layer);
            }
            return output;
          },
          /**
           * Implements the singleMarkerMode option.
           * @param layer Marker to re-style using the Clusters iconCreateFunction.
           * @returns {L.Icon} The newly created icon.
           * @private
           */
          _overrideMarkerIcon: function(layer) {
            var icon = layer.options.icon = this.options.iconCreateFunction({
              getChildCount: function() {
                return 1;
              },
              getAllChildMarkers: function() {
                return [layer];
              }
            });
            return icon;
          }
        });
        L.MarkerClusterGroup.include({
          _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
        });
        L.MarkerClusterGroup.include({
          _noAnimation: {
            //Non Animated versions of everything
            _animationStart: function() {
            },
            _animationZoomIn: function(previousZoomLevel, newZoomLevel) {
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
              this.fire("animationend");
            },
            _animationZoomOut: function(previousZoomLevel, newZoomLevel) {
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel);
              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
              this.fire("animationend");
            },
            _animationAddLayer: function(layer, newCluster) {
              this._animationAddLayerNonAnimated(layer, newCluster);
            }
          },
          _withAnimation: {
            //Animated versions here
            _animationStart: function() {
              this._map._mapPane.className += " leaflet-cluster-anim";
              this._inZoomAnimation++;
            },
            _animationZoomIn: function(previousZoomLevel, newZoomLevel) {
              var bounds = this._getExpandedVisibleBounds(), fg = this._featureGroup, minZoom = Math.floor(this._map.getMinZoom()), i;
              this._ignoreMove = true;
              this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function(c) {
                var startPos = c._latlng, markers = c._markers, m;
                if (!bounds.contains(startPos)) {
                  startPos = null;
                }
                if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) {
                  fg.removeLayer(c);
                  c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
                } else {
                  c.clusterHide();
                  c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
                }
                for (i = markers.length - 1; i >= 0; i--) {
                  m = markers[i];
                  if (!bounds.contains(m._latlng)) {
                    fg.removeLayer(m);
                  }
                }
              });
              this._forceLayout();
              this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
              fg.eachLayer(function(n) {
                if (!(n instanceof L.MarkerCluster) && n._icon) {
                  n.clusterShow();
                }
              });
              this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function(c) {
                c._recursivelyRestoreChildPositions(newZoomLevel);
              });
              this._ignoreMove = false;
              this._enqueue(function() {
                this._topClusterLevel._recursively(bounds, previousZoomLevel, minZoom, function(c) {
                  fg.removeLayer(c);
                  c.clusterShow();
                });
                this._animationEnd();
              });
            },
            _animationZoomOut: function(previousZoomLevel, newZoomLevel) {
              this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);
              this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
              this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), previousZoomLevel, this._getExpandedVisibleBounds());
            },
            _animationAddLayer: function(layer, newCluster) {
              var me = this, fg = this._featureGroup;
              fg.addLayer(layer);
              if (newCluster !== layer) {
                if (newCluster._childCount > 2) {
                  newCluster._updateIcon();
                  this._forceLayout();
                  this._animationStart();
                  layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
                  layer.clusterHide();
                  this._enqueue(function() {
                    fg.removeLayer(layer);
                    layer.clusterShow();
                    me._animationEnd();
                  });
                } else {
                  this._forceLayout();
                  me._animationStart();
                  me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
                }
              }
            }
          },
          // Private methods for animated versions.
          _animationZoomOutSingle: function(cluster, previousZoomLevel, newZoomLevel) {
            var bounds = this._getExpandedVisibleBounds(), minZoom = Math.floor(this._map.getMinZoom());
            cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, minZoom, previousZoomLevel + 1, newZoomLevel);
            var me = this;
            this._forceLayout();
            cluster._recursivelyBecomeVisible(bounds, newZoomLevel);
            this._enqueue(function() {
              if (cluster._childCount === 1) {
                var m = cluster._markers[0];
                this._ignoreMove = true;
                m.setLatLng(m.getLatLng());
                this._ignoreMove = false;
                if (m.clusterShow) {
                  m.clusterShow();
                }
              } else {
                cluster._recursively(bounds, newZoomLevel, minZoom, function(c) {
                  c._recursivelyRemoveChildrenFromMap(bounds, minZoom, previousZoomLevel + 1);
                });
              }
              me._animationEnd();
            });
          },
          _animationEnd: function() {
            if (this._map) {
              this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
            }
            this._inZoomAnimation--;
            this.fire("animationend");
          },
          //Force a browser layout of stuff in the map
          // Should apply the current opacity and location to all elements so we can update them again for an animation
          _forceLayout: function() {
            L.Util.falseFn(document.body.offsetWidth);
          }
        });
        L.markerClusterGroup = function(options) {
          return new L.MarkerClusterGroup(options);
        };
        var MarkerCluster = L.MarkerCluster = L.Marker.extend({
          options: L.Icon.prototype.options,
          initialize: function(group, zoom, a, b) {
            L.Marker.prototype.initialize.call(
              this,
              a ? a._cLatLng || a.getLatLng() : new L.LatLng(0, 0),
              { icon: this, pane: group.options.clusterPane }
            );
            this._group = group;
            this._zoom = zoom;
            this._markers = [];
            this._childClusters = [];
            this._childCount = 0;
            this._iconNeedsUpdate = true;
            this._boundsNeedUpdate = true;
            this._bounds = new L.LatLngBounds();
            if (a) {
              this._addChild(a);
            }
            if (b) {
              this._addChild(b);
            }
          },
          //Recursively retrieve all child markers of this cluster
          getAllChildMarkers: function(storageArray, ignoreDraggedMarker) {
            storageArray = storageArray || [];
            for (var i = this._childClusters.length - 1; i >= 0; i--) {
              this._childClusters[i].getAllChildMarkers(storageArray, ignoreDraggedMarker);
            }
            for (var j = this._markers.length - 1; j >= 0; j--) {
              if (ignoreDraggedMarker && this._markers[j].__dragStart) {
                continue;
              }
              storageArray.push(this._markers[j]);
            }
            return storageArray;
          },
          //Returns the count of how many child markers we have
          getChildCount: function() {
            return this._childCount;
          },
          //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
          zoomToBounds: function(fitBoundsOptions) {
            var childClusters = this._childClusters.slice(), map = this._group._map, boundsZoom = map.getBoundsZoom(this._bounds), zoom = this._zoom + 1, mapZoom = map.getZoom(), i;
            while (childClusters.length > 0 && boundsZoom > zoom) {
              zoom++;
              var newClusters = [];
              for (i = 0; i < childClusters.length; i++) {
                newClusters = newClusters.concat(childClusters[i]._childClusters);
              }
              childClusters = newClusters;
            }
            if (boundsZoom > zoom) {
              this._group._map.setView(this._latlng, zoom);
            } else if (boundsZoom <= mapZoom) {
              this._group._map.setView(this._latlng, mapZoom + 1);
            } else {
              this._group._map.fitBounds(this._bounds, fitBoundsOptions);
            }
          },
          getBounds: function() {
            var bounds = new L.LatLngBounds();
            bounds.extend(this._bounds);
            return bounds;
          },
          _updateIcon: function() {
            this._iconNeedsUpdate = true;
            if (this._icon) {
              this.setIcon(this);
            }
          },
          //Cludge for Icon, we pretend to be an icon for performance
          createIcon: function() {
            if (this._iconNeedsUpdate) {
              this._iconObj = this._group.options.iconCreateFunction(this);
              this._iconNeedsUpdate = false;
            }
            return this._iconObj.createIcon();
          },
          createShadow: function() {
            return this._iconObj.createShadow();
          },
          _addChild: function(new1, isNotificationFromChild) {
            this._iconNeedsUpdate = true;
            this._boundsNeedUpdate = true;
            this._setClusterCenter(new1);
            if (new1 instanceof L.MarkerCluster) {
              if (!isNotificationFromChild) {
                this._childClusters.push(new1);
                new1.__parent = this;
              }
              this._childCount += new1._childCount;
            } else {
              if (!isNotificationFromChild) {
                this._markers.push(new1);
              }
              this._childCount++;
            }
            if (this.__parent) {
              this.__parent._addChild(new1, true);
            }
          },
          /**
           * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
           * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
           * @private
           */
          _setClusterCenter: function(child) {
            if (!this._cLatLng) {
              this._cLatLng = child._cLatLng || child._latlng;
            }
          },
          /**
           * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
           * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
           * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
           * @private
           */
          _resetBounds: function() {
            var bounds = this._bounds;
            if (bounds._southWest) {
              bounds._southWest.lat = Infinity;
              bounds._southWest.lng = Infinity;
            }
            if (bounds._northEast) {
              bounds._northEast.lat = -Infinity;
              bounds._northEast.lng = -Infinity;
            }
          },
          _recalculateBounds: function() {
            var markers = this._markers, childClusters = this._childClusters, latSum = 0, lngSum = 0, totalCount = this._childCount, i, child, childLatLng, childCount;
            if (totalCount === 0) {
              return;
            }
            this._resetBounds();
            for (i = 0; i < markers.length; i++) {
              childLatLng = markers[i]._latlng;
              this._bounds.extend(childLatLng);
              latSum += childLatLng.lat;
              lngSum += childLatLng.lng;
            }
            for (i = 0; i < childClusters.length; i++) {
              child = childClusters[i];
              if (child._boundsNeedUpdate) {
                child._recalculateBounds();
              }
              this._bounds.extend(child._bounds);
              childLatLng = child._wLatLng;
              childCount = child._childCount;
              latSum += childLatLng.lat * childCount;
              lngSum += childLatLng.lng * childCount;
            }
            this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);
            this._boundsNeedUpdate = false;
          },
          //Set our markers position as given and add it to the map
          _addToMap: function(startPos) {
            if (startPos) {
              this._backupLatlng = this._latlng;
              this.setLatLng(startPos);
            }
            this._group._featureGroup.addLayer(this);
          },
          _recursivelyAnimateChildrenIn: function(bounds, center, maxZoom) {
            this._recursively(
              bounds,
              this._group._map.getMinZoom(),
              maxZoom - 1,
              function(c) {
                var markers = c._markers, i, m;
                for (i = markers.length - 1; i >= 0; i--) {
                  m = markers[i];
                  if (m._icon) {
                    m._setPos(center);
                    m.clusterHide();
                  }
                }
              },
              function(c) {
                var childClusters = c._childClusters, j, cm;
                for (j = childClusters.length - 1; j >= 0; j--) {
                  cm = childClusters[j];
                  if (cm._icon) {
                    cm._setPos(center);
                    cm.clusterHide();
                  }
                }
              }
            );
          },
          _recursivelyAnimateChildrenInAndAddSelfToMap: function(bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
            this._recursively(
              bounds,
              newZoomLevel,
              mapMinZoom,
              function(c) {
                c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);
                if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
                  c.clusterShow();
                  c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel);
                } else {
                  c.clusterHide();
                }
                c._addToMap();
              }
            );
          },
          _recursivelyBecomeVisible: function(bounds, zoomLevel) {
            this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function(c) {
              c.clusterShow();
            });
          },
          _recursivelyAddChildrenToMap: function(startPos, zoomLevel, bounds) {
            this._recursively(
              bounds,
              this._group._map.getMinZoom() - 1,
              zoomLevel,
              function(c) {
                if (zoomLevel === c._zoom) {
                  return;
                }
                for (var i = c._markers.length - 1; i >= 0; i--) {
                  var nm = c._markers[i];
                  if (!bounds.contains(nm._latlng)) {
                    continue;
                  }
                  if (startPos) {
                    nm._backupLatlng = nm.getLatLng();
                    nm.setLatLng(startPos);
                    if (nm.clusterHide) {
                      nm.clusterHide();
                    }
                  }
                  c._group._featureGroup.addLayer(nm);
                }
              },
              function(c) {
                c._addToMap(startPos);
              }
            );
          },
          _recursivelyRestoreChildPositions: function(zoomLevel) {
            for (var i = this._markers.length - 1; i >= 0; i--) {
              var nm = this._markers[i];
              if (nm._backupLatlng) {
                nm.setLatLng(nm._backupLatlng);
                delete nm._backupLatlng;
              }
            }
            if (zoomLevel - 1 === this._zoom) {
              for (var j = this._childClusters.length - 1; j >= 0; j--) {
                this._childClusters[j]._restorePosition();
              }
            } else {
              for (var k = this._childClusters.length - 1; k >= 0; k--) {
                this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
              }
            }
          },
          _restorePosition: function() {
            if (this._backupLatlng) {
              this.setLatLng(this._backupLatlng);
              delete this._backupLatlng;
            }
          },
          //exceptBounds: If set, don't remove any markers/clusters in it
          _recursivelyRemoveChildrenFromMap: function(previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
            var m, i;
            this._recursively(
              previousBounds,
              mapMinZoom - 1,
              zoomLevel - 1,
              function(c) {
                for (i = c._markers.length - 1; i >= 0; i--) {
                  m = c._markers[i];
                  if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                    c._group._featureGroup.removeLayer(m);
                    if (m.clusterShow) {
                      m.clusterShow();
                    }
                  }
                }
              },
              function(c) {
                for (i = c._childClusters.length - 1; i >= 0; i--) {
                  m = c._childClusters[i];
                  if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                    c._group._featureGroup.removeLayer(m);
                    if (m.clusterShow) {
                      m.clusterShow();
                    }
                  }
                }
              }
            );
          },
          //Run the given functions recursively to this and child clusters
          // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
          // zoomLevelToStart: zoom level to start running functions (inclusive)
          // zoomLevelToStop: zoom level to stop running functions (inclusive)
          // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
          // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
          _recursively: function(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
            var childClusters = this._childClusters, zoom = this._zoom, i, c;
            if (zoomLevelToStart <= zoom) {
              if (runAtEveryLevel) {
                runAtEveryLevel(this);
              }
              if (runAtBottomLevel && zoom === zoomLevelToStop) {
                runAtBottomLevel(this);
              }
            }
            if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) {
              for (i = childClusters.length - 1; i >= 0; i--) {
                c = childClusters[i];
                if (c._boundsNeedUpdate) {
                  c._recalculateBounds();
                }
                if (boundsToApplyTo.intersects(c._bounds)) {
                  c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
                }
              }
            }
          },
          //Returns true if we are the parent of only one cluster and that cluster is the same as us
          _isSingleParent: function() {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
          }
        });
        L.Marker.include({
          clusterHide: function() {
            var backup = this.options.opacity;
            this.setOpacity(0);
            this.options.opacity = backup;
            return this;
          },
          clusterShow: function() {
            return this.setOpacity(this.options.opacity);
          }
        });
        L.DistanceGrid = function(cellSize) {
          this._cellSize = cellSize;
          this._sqCellSize = cellSize * cellSize;
          this._grid = {};
          this._objectPoint = {};
        };
        L.DistanceGrid.prototype = {
          addObject: function(obj, point) {
            var x = this._getCoord(point.x), y = this._getCoord(point.y), grid = this._grid, row = grid[y] = grid[y] || {}, cell = row[x] = row[x] || [], stamp2 = L.Util.stamp(obj);
            this._objectPoint[stamp2] = point;
            cell.push(obj);
          },
          updateObject: function(obj, point) {
            this.removeObject(obj);
            this.addObject(obj, point);
          },
          //Returns true if the object was found
          removeObject: function(obj, point) {
            var x = this._getCoord(point.x), y = this._getCoord(point.y), grid = this._grid, row = grid[y] = grid[y] || {}, cell = row[x] = row[x] || [], i, len;
            delete this._objectPoint[L.Util.stamp(obj)];
            for (i = 0, len = cell.length; i < len; i++) {
              if (cell[i] === obj) {
                cell.splice(i, 1);
                if (len === 1) {
                  delete row[x];
                }
                return true;
              }
            }
          },
          eachObject: function(fn, context) {
            var i, j, k, len, row, cell, removed, grid = this._grid;
            for (i in grid) {
              row = grid[i];
              for (j in row) {
                cell = row[j];
                for (k = 0, len = cell.length; k < len; k++) {
                  removed = fn.call(context, cell[k]);
                  if (removed) {
                    k--;
                    len--;
                  }
                }
              }
            }
          },
          getNearObject: function(point) {
            var x = this._getCoord(point.x), y = this._getCoord(point.y), i, j, k, row, cell, len, obj, dist, objectPoint = this._objectPoint, closestDistSq = this._sqCellSize, closest = null;
            for (i = y - 1; i <= y + 1; i++) {
              row = this._grid[i];
              if (row) {
                for (j = x - 1; j <= x + 1; j++) {
                  cell = row[j];
                  if (cell) {
                    for (k = 0, len = cell.length; k < len; k++) {
                      obj = cell[k];
                      dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);
                      if (dist < closestDistSq || dist <= closestDistSq && closest === null) {
                        closestDistSq = dist;
                        closest = obj;
                      }
                    }
                  }
                }
              }
            }
            return closest;
          },
          _getCoord: function(x) {
            var coord = Math.floor(x / this._cellSize);
            return isFinite(coord) ? coord : x;
          },
          _sqDist: function(p, p2) {
            var dx = p2.x - p.x, dy = p2.y - p.y;
            return dx * dx + dy * dy;
          }
        };
        (function() {
          L.QuickHull = {
            /*
             * @param {Object} cpt a point to be measured from the baseline
             * @param {Array} bl the baseline, as represented by a two-element
             *   array of latlng objects.
             * @returns {Number} an approximate distance measure
             */
            getDistant: function(cpt, bl) {
              var vY = bl[1].lat - bl[0].lat, vX = bl[0].lng - bl[1].lng;
              return vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng);
            },
            /*
             * @param {Array} baseLine a two-element array of latlng objects
             *   representing the baseline to project from
             * @param {Array} latLngs an array of latlng objects
             * @returns {Object} the maximum point and all new points to stay
             *   in consideration for the hull.
             */
            findMostDistantPointFromBaseLine: function(baseLine, latLngs) {
              var maxD = 0, maxPt = null, newPoints = [], i, pt, d;
              for (i = latLngs.length - 1; i >= 0; i--) {
                pt = latLngs[i];
                d = this.getDistant(pt, baseLine);
                if (d > 0) {
                  newPoints.push(pt);
                } else {
                  continue;
                }
                if (d > maxD) {
                  maxD = d;
                  maxPt = pt;
                }
              }
              return { maxPoint: maxPt, newPoints };
            },
            /*
             * Given a baseline, compute the convex hull of latLngs as an array
             * of latLngs.
             *
             * @param {Array} latLngs
             * @returns {Array}
             */
            buildConvexHull: function(baseLine, latLngs) {
              var convexHullBaseLines = [], t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);
              if (t.maxPoint) {
                convexHullBaseLines = convexHullBaseLines.concat(
                  this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
                );
                convexHullBaseLines = convexHullBaseLines.concat(
                  this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
                );
                return convexHullBaseLines;
              } else {
                return [baseLine[0]];
              }
            },
            /*
             * Given an array of latlngs, compute a convex hull as an array
             * of latlngs
             *
             * @param {Array} latLngs
             * @returns {Array}
             */
            getConvexHull: function(latLngs) {
              var maxLat = false, minLat = false, maxLng = false, minLng = false, maxLatPt = null, minLatPt = null, maxLngPt = null, minLngPt = null, maxPt = null, minPt = null, i;
              for (i = latLngs.length - 1; i >= 0; i--) {
                var pt = latLngs[i];
                if (maxLat === false || pt.lat > maxLat) {
                  maxLatPt = pt;
                  maxLat = pt.lat;
                }
                if (minLat === false || pt.lat < minLat) {
                  minLatPt = pt;
                  minLat = pt.lat;
                }
                if (maxLng === false || pt.lng > maxLng) {
                  maxLngPt = pt;
                  maxLng = pt.lng;
                }
                if (minLng === false || pt.lng < minLng) {
                  minLngPt = pt;
                  minLng = pt.lng;
                }
              }
              if (minLat !== maxLat) {
                minPt = minLatPt;
                maxPt = maxLatPt;
              } else {
                minPt = minLngPt;
                maxPt = maxLngPt;
              }
              var ch = [].concat(
                this.buildConvexHull([minPt, maxPt], latLngs),
                this.buildConvexHull([maxPt, minPt], latLngs)
              );
              return ch;
            }
          };
        })();
        L.MarkerCluster.include({
          getConvexHull: function() {
            var childMarkers = this.getAllChildMarkers(), points = [], p, i;
            for (i = childMarkers.length - 1; i >= 0; i--) {
              p = childMarkers[i].getLatLng();
              points.push(p);
            }
            return L.QuickHull.getConvexHull(points);
          }
        });
        L.MarkerCluster.include({
          _2PI: Math.PI * 2,
          _circleFootSeparation: 25,
          //related to circumference of circle
          _circleStartAngle: 0,
          _spiralFootSeparation: 28,
          //related to size of spiral (experiment!)
          _spiralLengthStart: 11,
          _spiralLengthFactor: 5,
          _circleSpiralSwitchover: 9,
          //show spiral instead of circle from this marker count upwards.
          // 0 -> always spiral; Infinity -> always circle
          spiderfy: function() {
            if (this._group._spiderfied === this || this._group._inZoomAnimation) {
              return;
            }
            var childMarkers = this.getAllChildMarkers(null, true), group = this._group, map = group._map, center = map.latLngToLayerPoint(this._latlng), positions;
            this._group._unspiderfy();
            this._group._spiderfied = this;
            if (this._group.options.spiderfyShapePositions) {
              positions = this._group.options.spiderfyShapePositions(childMarkers.length, center);
            } else if (childMarkers.length >= this._circleSpiralSwitchover) {
              positions = this._generatePointsSpiral(childMarkers.length, center);
            } else {
              center.y += 10;
              positions = this._generatePointsCircle(childMarkers.length, center);
            }
            this._animationSpiderfy(childMarkers, positions);
          },
          unspiderfy: function(zoomDetails) {
            if (this._group._inZoomAnimation) {
              return;
            }
            this._animationUnspiderfy(zoomDetails);
            this._group._spiderfied = null;
          },
          _generatePointsCircle: function(count, centerPt) {
            var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count), legLength = circumference / this._2PI, angleStep = this._2PI / count, res = [], i, angle;
            legLength = Math.max(legLength, 35);
            res.length = count;
            for (i = 0; i < count; i++) {
              angle = this._circleStartAngle + i * angleStep;
              res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
            }
            return res;
          },
          _generatePointsSpiral: function(count, centerPt) {
            var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier, legLength = spiderfyDistanceMultiplier * this._spiralLengthStart, separation = spiderfyDistanceMultiplier * this._spiralFootSeparation, lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI, angle = 0, res = [], i;
            res.length = count;
            for (i = count; i >= 0; i--) {
              if (i < count) {
                res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
              }
              angle += separation / legLength + i * 5e-4;
              legLength += lengthFactor / angle;
            }
            return res;
          },
          _noanimationUnspiderfy: function() {
            var group = this._group, map = group._map, fg = group._featureGroup, childMarkers = this.getAllChildMarkers(null, true), m, i;
            group._ignoreMove = true;
            this.setOpacity(1);
            for (i = childMarkers.length - 1; i >= 0; i--) {
              m = childMarkers[i];
              fg.removeLayer(m);
              if (m._preSpiderfyLatlng) {
                m.setLatLng(m._preSpiderfyLatlng);
                delete m._preSpiderfyLatlng;
              }
              if (m.setZIndexOffset) {
                m.setZIndexOffset(0);
              }
              if (m._spiderLeg) {
                map.removeLayer(m._spiderLeg);
                delete m._spiderLeg;
              }
            }
            group.fire("unspiderfied", {
              cluster: this,
              markers: childMarkers
            });
            group._ignoreMove = false;
            group._spiderfied = null;
          }
        });
        L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
          _animationSpiderfy: function(childMarkers, positions) {
            var group = this._group, map = group._map, fg = group._featureGroup, legOptions = this._group.options.spiderLegPolylineOptions, i, m, leg, newPos;
            group._ignoreMove = true;
            for (i = 0; i < childMarkers.length; i++) {
              newPos = map.layerPointToLatLng(positions[i]);
              m = childMarkers[i];
              leg = new L.Polyline([this._latlng, newPos], legOptions);
              map.addLayer(leg);
              m._spiderLeg = leg;
              m._preSpiderfyLatlng = m._latlng;
              m.setLatLng(newPos);
              if (m.setZIndexOffset) {
                m.setZIndexOffset(1e6);
              }
              fg.addLayer(m);
            }
            this.setOpacity(0.3);
            group._ignoreMove = false;
            group.fire("spiderfied", {
              cluster: this,
              markers: childMarkers
            });
          },
          _animationUnspiderfy: function() {
            this._noanimationUnspiderfy();
          }
        });
        L.MarkerCluster.include({
          _animationSpiderfy: function(childMarkers, positions) {
            var me = this, group = this._group, map = group._map, fg = group._featureGroup, thisLayerLatLng = this._latlng, thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng), svg2 = L.Path.SVG, legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), finalLegOpacity = legOptions.opacity, i, m, leg, legPath, legLength, newPos;
            if (finalLegOpacity === void 0) {
              finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
            }
            if (svg2) {
              legOptions.opacity = 0;
              legOptions.className = (legOptions.className || "") + " leaflet-cluster-spider-leg";
            } else {
              legOptions.opacity = finalLegOpacity;
            }
            group._ignoreMove = true;
            for (i = 0; i < childMarkers.length; i++) {
              m = childMarkers[i];
              newPos = map.layerPointToLatLng(positions[i]);
              leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
              map.addLayer(leg);
              m._spiderLeg = leg;
              if (svg2) {
                legPath = leg._path;
                legLength = legPath.getTotalLength() + 0.1;
                legPath.style.strokeDasharray = legLength;
                legPath.style.strokeDashoffset = legLength;
              }
              if (m.setZIndexOffset) {
                m.setZIndexOffset(1e6);
              }
              if (m.clusterHide) {
                m.clusterHide();
              }
              fg.addLayer(m);
              if (m._setPos) {
                m._setPos(thisLayerPos);
              }
            }
            group._forceLayout();
            group._animationStart();
            for (i = childMarkers.length - 1; i >= 0; i--) {
              newPos = map.layerPointToLatLng(positions[i]);
              m = childMarkers[i];
              m._preSpiderfyLatlng = m._latlng;
              m.setLatLng(newPos);
              if (m.clusterShow) {
                m.clusterShow();
              }
              if (svg2) {
                leg = m._spiderLeg;
                legPath = leg._path;
                legPath.style.strokeDashoffset = 0;
                leg.setStyle({ opacity: finalLegOpacity });
              }
            }
            this.setOpacity(0.3);
            group._ignoreMove = false;
            setTimeout(function() {
              group._animationEnd();
              group.fire("spiderfied", {
                cluster: me,
                markers: childMarkers
              });
            }, 200);
          },
          _animationUnspiderfy: function(zoomDetails) {
            var me = this, group = this._group, map = group._map, fg = group._featureGroup, thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng), childMarkers = this.getAllChildMarkers(null, true), svg2 = L.Path.SVG, m, i, leg, legPath, legLength, nonAnimatable;
            group._ignoreMove = true;
            group._animationStart();
            this.setOpacity(1);
            for (i = childMarkers.length - 1; i >= 0; i--) {
              m = childMarkers[i];
              if (!m._preSpiderfyLatlng) {
                continue;
              }
              m.closePopup();
              m.setLatLng(m._preSpiderfyLatlng);
              delete m._preSpiderfyLatlng;
              nonAnimatable = true;
              if (m._setPos) {
                m._setPos(thisLayerPos);
                nonAnimatable = false;
              }
              if (m.clusterHide) {
                m.clusterHide();
                nonAnimatable = false;
              }
              if (nonAnimatable) {
                fg.removeLayer(m);
              }
              if (svg2) {
                leg = m._spiderLeg;
                legPath = leg._path;
                legLength = legPath.getTotalLength() + 0.1;
                legPath.style.strokeDashoffset = legLength;
                leg.setStyle({ opacity: 0 });
              }
            }
            group._ignoreMove = false;
            setTimeout(function() {
              var stillThereChildCount = 0;
              for (i = childMarkers.length - 1; i >= 0; i--) {
                m = childMarkers[i];
                if (m._spiderLeg) {
                  stillThereChildCount++;
                }
              }
              for (i = childMarkers.length - 1; i >= 0; i--) {
                m = childMarkers[i];
                if (!m._spiderLeg) {
                  continue;
                }
                if (m.clusterShow) {
                  m.clusterShow();
                }
                if (m.setZIndexOffset) {
                  m.setZIndexOffset(0);
                }
                if (stillThereChildCount > 1) {
                  fg.removeLayer(m);
                }
                map.removeLayer(m._spiderLeg);
                delete m._spiderLeg;
              }
              group._animationEnd();
              group.fire("unspiderfied", {
                cluster: me,
                markers: childMarkers
              });
            }, 200);
          }
        });
        L.MarkerClusterGroup.include({
          //The MarkerCluster currently spiderfied (if any)
          _spiderfied: null,
          unspiderfy: function() {
            this._unspiderfy.apply(this, arguments);
          },
          _spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this);
            if (this._map.options.zoomAnimation) {
              this._map.on("zoomstart", this._unspiderfyZoomStart, this);
            }
            this._map.on("zoomend", this._noanimationUnspiderfy, this);
            if (!L.Browser.touch) {
              this._map.getRenderer(this);
            }
          },
          _spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this);
            this._map.off("zoomstart", this._unspiderfyZoomStart, this);
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
            this._map.off("zoomend", this._noanimationUnspiderfy, this);
            this._noanimationUnspiderfy();
          },
          //On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
          //This means we can define the animation they do rather than Markers doing an animation to their actual location
          _unspiderfyZoomStart: function() {
            if (!this._map) {
              return;
            }
            this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
          },
          _unspiderfyZoomAnim: function(zoomDetails) {
            if (L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching")) {
              return;
            }
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
            this._unspiderfy(zoomDetails);
          },
          _unspiderfyWrapper: function() {
            this._unspiderfy();
          },
          _unspiderfy: function(zoomDetails) {
            if (this._spiderfied) {
              this._spiderfied.unspiderfy(zoomDetails);
            }
          },
          _noanimationUnspiderfy: function() {
            if (this._spiderfied) {
              this._spiderfied._noanimationUnspiderfy();
            }
          },
          //If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
          _unspiderfyLayer: function(layer) {
            if (layer._spiderLeg) {
              this._featureGroup.removeLayer(layer);
              if (layer.clusterShow) {
                layer.clusterShow();
              }
              if (layer.setZIndexOffset) {
                layer.setZIndexOffset(0);
              }
              this._map.removeLayer(layer._spiderLeg);
              delete layer._spiderLeg;
            }
          }
        });
        L.MarkerClusterGroup.include({
          /**
           * Updates the icon of all clusters which are parents of the given marker(s).
           * In singleMarkerMode, also updates the given marker(s) icon.
           * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
           * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
           * clusters need to be updated. If not provided, retrieves all child markers of this.
           * @returns {L.MarkerClusterGroup}
           */
          refreshClusters: function(layers) {
            if (!layers) {
              layers = this._topClusterLevel.getAllChildMarkers();
            } else if (layers instanceof L.MarkerClusterGroup) {
              layers = layers._topClusterLevel.getAllChildMarkers();
            } else if (layers instanceof L.LayerGroup) {
              layers = layers._layers;
            } else if (layers instanceof L.MarkerCluster) {
              layers = layers.getAllChildMarkers();
            } else if (layers instanceof L.Marker) {
              layers = [layers];
            }
            this._flagParentsIconsNeedUpdate(layers);
            this._refreshClustersIcons();
            if (this.options.singleMarkerMode) {
              this._refreshSingleMarkerModeMarkers(layers);
            }
            return this;
          },
          /**
           * Simply flags all parent clusters of the given markers as having a "dirty" icon.
           * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
           * @private
           */
          _flagParentsIconsNeedUpdate: function(layers) {
            var id, parent;
            for (id in layers) {
              parent = layers[id].__parent;
              while (parent) {
                parent._iconNeedsUpdate = true;
                parent = parent.__parent;
              }
            }
          },
          /**
           * Re-draws the icon of the supplied markers.
           * To be used in singleMarkerMode only.
           * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
           * @private
           */
          _refreshSingleMarkerModeMarkers: function(layers) {
            var id, layer;
            for (id in layers) {
              layer = layers[id];
              if (this.hasLayer(layer)) {
                layer.setIcon(this._overrideMarkerIcon(layer));
              }
            }
          }
        });
        L.Marker.include({
          /**
           * Updates the given options in the marker's icon and refreshes the marker.
           * @param options map object of icon options.
           * @param directlyRefreshClusters boolean (optional) true to trigger
           * MCG.refreshClustersOf() right away with this single marker.
           * @returns {L.Marker}
           */
          refreshIconOptions: function(options, directlyRefreshClusters) {
            var icon = this.options.icon;
            L.setOptions(icon, options);
            this.setIcon(icon);
            if (directlyRefreshClusters && this.__parent) {
              this.__parent._group.refreshClusters(this);
            }
            return this;
          }
        });
        exports2.MarkerClusterGroup = MarkerClusterGroup;
        exports2.MarkerCluster = MarkerCluster;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/leaflet.heat/dist/leaflet-heat.js
  var init_leaflet_heat = __esm({
    "node_modules/leaflet.heat/dist/leaflet-heat.js"() {
      !function() {
        "use strict";
        function t(i) {
          return this instanceof t ? (this._canvas = i = "string" == typeof i ? document.getElementById(i) : i, this._ctx = i.getContext("2d"), this._width = i.width, this._height = i.height, this._max = 1, void this.clear()) : new t(i);
        }
        t.prototype = { defaultRadius: 25, defaultGradient: { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1: "red" }, data: function(t2, i) {
          return this._data = t2, this;
        }, max: function(t2) {
          return this._max = t2, this;
        }, add: function(t2) {
          return this._data.push(t2), this;
        }, clear: function() {
          return this._data = [], this;
        }, radius: function(t2, i) {
          i = i || 15;
          var a = this._circle = document.createElement("canvas"), s = a.getContext("2d"), e = this._r = t2 + i;
          return a.width = a.height = 2 * e, s.shadowOffsetX = s.shadowOffsetY = 200, s.shadowBlur = i, s.shadowColor = "black", s.beginPath(), s.arc(e - 200, e - 200, t2, 0, 2 * Math.PI, true), s.closePath(), s.fill(), this;
        }, gradient: function(t2) {
          var i = document.createElement("canvas"), a = i.getContext("2d"), s = a.createLinearGradient(0, 0, 0, 256);
          i.width = 1, i.height = 256;
          for (var e in t2)
            s.addColorStop(e, t2[e]);
          return a.fillStyle = s, a.fillRect(0, 0, 1, 256), this._grad = a.getImageData(0, 0, 1, 256).data, this;
        }, draw: function(t2) {
          this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
          var i = this._ctx;
          i.clearRect(0, 0, this._width, this._height);
          for (var a, s = 0, e = this._data.length; e > s; s++)
            a = this._data[s], i.globalAlpha = Math.max(a[2] / this._max, t2 || 0.05), i.drawImage(this._circle, a[0] - this._r, a[1] - this._r);
          var n = i.getImageData(0, 0, this._width, this._height);
          return this._colorize(n.data, this._grad), i.putImageData(n, 0, 0), this;
        }, _colorize: function(t2, i) {
          for (var a, s = 3, e = t2.length; e > s; s += 4)
            a = 4 * t2[s], a && (t2[s - 3] = i[a], t2[s - 2] = i[a + 1], t2[s - 1] = i[a + 2]);
        } }, window.simpleheat = t;
      }(), /*
       (c) 2014, Vladimir Agafonkin
       Leaflet.heat, a tiny and fast heatmap plugin for Leaflet.
       https://github.com/Leaflet/Leaflet.heat
      */
      L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({ initialize: function(t, i) {
        this._latlngs = t, L.setOptions(this, i);
      }, setLatLngs: function(t) {
        return this._latlngs = t, this.redraw();
      }, addLatLng: function(t) {
        return this._latlngs.push(t), this.redraw();
      }, setOptions: function(t) {
        return L.setOptions(this, t), this._heat && this._updateOptions(), this.redraw();
      }, redraw: function() {
        return !this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this;
      }, onAdd: function(t) {
        this._map = t, this._canvas || this._initCanvas(), t._panes.overlayPane.appendChild(this._canvas), t.on("moveend", this._reset, this), t.options.zoomAnimation && L.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset();
      }, onRemove: function(t) {
        t.getPanes().overlayPane.removeChild(this._canvas), t.off("moveend", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this);
      }, addTo: function(t) {
        return t.addLayer(this), this;
      }, _initCanvas: function() {
        var t = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer"), i = L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"]);
        t.style[i] = "50% 50%";
        var a = this._map.getSize();
        t.width = a.x, t.height = a.y;
        var s = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(t, "leaflet-zoom-" + (s ? "animated" : "hide")), this._heat = simpleheat(t), this._updateOptions();
      }, _updateOptions: function() {
        this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max);
      }, _reset: function() {
        var t = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, t);
        var i = this._map.getSize();
        this._heat._width !== i.x && (this._canvas.width = this._heat._width = i.x), this._heat._height !== i.y && (this._canvas.height = this._heat._height = i.y), this._redraw();
      }, _redraw: function() {
        var t, i, a, s, e, n, h, o, r, d = [], _ = this._heat._r, l = this._map.getSize(), m = new L.Bounds(L.point([-_, -_]), l.add([_, _])), c = void 0 === this.options.max ? 1 : this.options.max, u = void 0 === this.options.maxZoom ? this._map.getMaxZoom() : this.options.maxZoom, f = 1 / Math.pow(2, Math.max(0, Math.min(u - this._map.getZoom(), 12))), g = _ / 2, p = [], v = this._map._getMapPanePos(), w = v.x % g, y = v.y % g;
        for (t = 0, i = this._latlngs.length; i > t; t++)
          if (a = this._map.latLngToContainerPoint(this._latlngs[t]), m.contains(a)) {
            e = Math.floor((a.x - w) / g) + 2, n = Math.floor((a.y - y) / g) + 2;
            var x = void 0 !== this._latlngs[t].alt ? this._latlngs[t].alt : void 0 !== this._latlngs[t][2] ? +this._latlngs[t][2] : 1;
            r = x * f, p[n] = p[n] || [], s = p[n][e], s ? (s[0] = (s[0] * s[2] + a.x * r) / (s[2] + r), s[1] = (s[1] * s[2] + a.y * r) / (s[2] + r), s[2] += r) : p[n][e] = [a.x, a.y, r];
          }
        for (t = 0, i = p.length; i > t; t++)
          if (p[t])
            for (h = 0, o = p[t].length; o > h; h++)
              s = p[t][h], s && d.push([Math.round(s[0]), Math.round(s[1]), Math.min(s[2], c)]);
        this._heat.data(d).draw(this.options.minOpacity), this._frame = null;
      }, _animateZoom: function(t) {
        var i = this._map.getZoomScale(t.zoom), a = this._map._getCenterOffset(t.center)._multiplyBy(-i).subtract(this._map._getMapPanePos());
        L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, a, i) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(a) + " scale(" + i + ")";
      } }), L.heatLayer = function(t, i) {
        return new L.HeatLayer(t, i);
      };
    }
  });

  // node_modules/leaflet-control-geocoder/src/util.js
  function escapeChar(chr) {
    return escape[chr];
  }
  function htmlEscape(string) {
    if (string == null) {
      return "";
    } else if (!string) {
      return string + "";
    }
    string = "" + string;
    if (!possible.test(string)) {
      return string;
    }
    return string.replace(badChars, escapeChar);
  }
  function jsonp(url, params, callback, context, jsonpParam) {
    var callbackId = "_l_geocoder_" + lastCallbackId++;
    params[jsonpParam || "callback"] = callbackId;
    window[callbackId] = import_leaflet.default.Util.bind(callback, context);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url + getParamString(params);
    script.id = callbackId;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  function getJSON(url, params, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState !== 4) {
        return;
      }
      var message;
      if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
        message = "";
      } else if (typeof xmlHttp.response === "string") {
        try {
          message = JSON.parse(xmlHttp.response);
        } catch (e) {
          message = xmlHttp.response;
        }
      } else {
        message = xmlHttp.response;
      }
      callback(message);
    };
    xmlHttp.open("GET", url + getParamString(params), true);
    xmlHttp.responseType = "json";
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.send(null);
  }
  function template(str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function(str2, key) {
      var value = data[key];
      if (value === void 0) {
        value = "";
      } else if (typeof value === "function") {
        value = value(data);
      }
      return htmlEscape(value);
    });
  }
  function getParamString(obj, existingUrl, uppercase) {
    var params = [];
    for (var i in obj) {
      var key = encodeURIComponent(uppercase ? i.toUpperCase() : i);
      var value = obj[i];
      if (!import_leaflet.default.Util.isArray(value)) {
        params.push(key + "=" + encodeURIComponent(value));
      } else {
        for (var j = 0; j < value.length; j++) {
          params.push(key + "=" + encodeURIComponent(value[j]));
        }
      }
    }
    return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
  }
  var import_leaflet, lastCallbackId, badChars, possible, escape;
  var init_util = __esm({
    "node_modules/leaflet-control-geocoder/src/util.js"() {
      import_leaflet = __toESM(require_leaflet_src());
      lastCallbackId = 0;
      badChars = /[&<>"'`]/g;
      possible = /[&<>"'`]/;
      escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/arcgis.js
  function arcgis(accessToken, options) {
    return new ArcGis(accessToken, options);
  }
  var import_leaflet2, ArcGis;
  var init_arcgis = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/arcgis.js"() {
      import_leaflet2 = __toESM(require_leaflet_src());
      init_util();
      ArcGis = import_leaflet2.default.Class.extend({
        options: {
          service_url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        },
        initialize: function(accessToken, options) {
          import_leaflet2.default.setOptions(this, options);
          this._accessToken = accessToken;
        },
        geocode: function(query, cb, context) {
          var params = {
            SingleLine: query,
            outFields: "Addr_Type",
            forStorage: false,
            maxLocations: 10,
            f: "json"
          };
          if (this._key && this._key.length) {
            params.token = this._key;
          }
          getJSON(
            this.options.service_url + "/findAddressCandidates",
            import_leaflet2.default.extend(params, this.options.geocodingQueryParams),
            function(data) {
              var results = [], loc, latLng2, latLngBounds;
              if (data.candidates && data.candidates.length) {
                for (var i = 0; i <= data.candidates.length - 1; i++) {
                  loc = data.candidates[i];
                  latLng2 = import_leaflet2.default.latLng(loc.location.y, loc.location.x);
                  latLngBounds = import_leaflet2.default.latLngBounds(
                    import_leaflet2.default.latLng(loc.extent.ymax, loc.extent.xmax),
                    import_leaflet2.default.latLng(loc.extent.ymin, loc.extent.xmin)
                  );
                  results[i] = {
                    name: loc.address,
                    bbox: latLngBounds,
                    center: latLng2
                  };
                }
              }
              cb.call(context, results);
            }
          );
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        reverse: function(location, scale, cb, context) {
          var params = {
            location: encodeURIComponent(location.lng) + "," + encodeURIComponent(location.lat),
            distance: 100,
            f: "json"
          };
          getJSON(this.options.service_url + "/reverseGeocode", params, function(data) {
            var result = [], loc;
            if (data && !data.error) {
              loc = import_leaflet2.default.latLng(data.location.y, data.location.x);
              result.push({
                name: data.address.Match_addr,
                center: loc,
                bounds: import_leaflet2.default.latLngBounds(loc, loc)
              });
            }
            cb.call(context, result);
          });
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/bing.js
  function bing(key) {
    return new Bing(key);
  }
  var import_leaflet3, Bing;
  var init_bing = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/bing.js"() {
      import_leaflet3 = __toESM(require_leaflet_src());
      init_util();
      Bing = import_leaflet3.default.Class.extend({
        initialize: function(key) {
          this.key = key;
        },
        geocode: function(query, cb, context) {
          jsonp(
            "https://dev.virtualearth.net/REST/v1/Locations",
            {
              query,
              key: this.key
            },
            function(data) {
              var results = [];
              if (data.resourceSets.length > 0) {
                for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                  var resource = data.resourceSets[0].resources[i], bbox = resource.bbox;
                  results[i] = {
                    name: resource.name,
                    bbox: import_leaflet3.default.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                    center: import_leaflet3.default.latLng(resource.point.coordinates)
                  };
                }
              }
              cb.call(context, results);
            },
            this,
            "jsonp"
          );
        },
        reverse: function(location, scale, cb, context) {
          jsonp(
            "//dev.virtualearth.net/REST/v1/Locations/" + location.lat + "," + location.lng,
            {
              key: this.key
            },
            function(data) {
              var results = [];
              for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                var resource = data.resourceSets[0].resources[i], bbox = resource.bbox;
                results[i] = {
                  name: resource.name,
                  bbox: import_leaflet3.default.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                  center: import_leaflet3.default.latLng(resource.point.coordinates)
                };
              }
              cb.call(context, results);
            },
            this,
            "jsonp"
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/google.js
  function google(key, options) {
    return new Google(key, options);
  }
  var import_leaflet4, Google;
  var init_google = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/google.js"() {
      import_leaflet4 = __toESM(require_leaflet_src());
      init_util();
      Google = import_leaflet4.default.Class.extend({
        options: {
          serviceUrl: "https://maps.googleapis.com/maps/api/geocode/json",
          geocodingQueryParams: {},
          reverseQueryParams: {}
        },
        initialize: function(key, options) {
          this._key = key;
          import_leaflet4.default.setOptions(this, options);
          this.options.serviceUrl = this.options.service_url || this.options.serviceUrl;
        },
        geocode: function(query, cb, context) {
          var params = {
            address: query
          };
          if (this._key && this._key.length) {
            params.key = this._key;
          }
          params = import_leaflet4.default.Util.extend(params, this.options.geocodingQueryParams);
          getJSON(this.options.serviceUrl, params, function(data) {
            var results = [], loc, latLng2, latLngBounds;
            if (data.results && data.results.length) {
              for (var i = 0; i <= data.results.length - 1; i++) {
                loc = data.results[i];
                latLng2 = import_leaflet4.default.latLng(loc.geometry.location);
                latLngBounds = import_leaflet4.default.latLngBounds(
                  import_leaflet4.default.latLng(loc.geometry.viewport.northeast),
                  import_leaflet4.default.latLng(loc.geometry.viewport.southwest)
                );
                results[i] = {
                  name: loc.formatted_address,
                  bbox: latLngBounds,
                  center: latLng2,
                  properties: loc.address_components
                };
              }
            }
            cb.call(context, results);
          });
        },
        reverse: function(location, scale, cb, context) {
          var params = {
            latlng: encodeURIComponent(location.lat) + "," + encodeURIComponent(location.lng)
          };
          params = import_leaflet4.default.Util.extend(params, this.options.reverseQueryParams);
          if (this._key && this._key.length) {
            params.key = this._key;
          }
          getJSON(this.options.serviceUrl, params, function(data) {
            var results = [], loc, latLng2, latLngBounds;
            if (data.results && data.results.length) {
              for (var i = 0; i <= data.results.length - 1; i++) {
                loc = data.results[i];
                latLng2 = import_leaflet4.default.latLng(loc.geometry.location);
                latLngBounds = import_leaflet4.default.latLngBounds(
                  import_leaflet4.default.latLng(loc.geometry.viewport.northeast),
                  import_leaflet4.default.latLng(loc.geometry.viewport.southwest)
                );
                results[i] = {
                  name: loc.formatted_address,
                  bbox: latLngBounds,
                  center: latLng2,
                  properties: loc.address_components
                };
              }
            }
            cb.call(context, results);
          });
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/here.js
  function here(options) {
    return new HERE(options);
  }
  var import_leaflet5, HERE;
  var init_here = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/here.js"() {
      import_leaflet5 = __toESM(require_leaflet_src());
      init_util();
      HERE = import_leaflet5.default.Class.extend({
        options: {
          geocodeUrl: "https://geocoder.api.here.com/6.2/geocode.json",
          reverseGeocodeUrl: "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",
          app_id: "<insert your app_id here>",
          app_code: "<insert your app_code here>",
          geocodingQueryParams: {},
          reverseQueryParams: {},
          reverseGeocodeProxRadius: null
        },
        initialize: function(options) {
          import_leaflet5.default.setOptions(this, options);
        },
        geocode: function(query, cb, context) {
          var params = {
            searchtext: query,
            gen: 9,
            app_id: this.options.app_id,
            app_code: this.options.app_code,
            jsonattributes: 1
          };
          params = import_leaflet5.default.Util.extend(params, this.options.geocodingQueryParams);
          this.getJSON(this.options.geocodeUrl, params, cb, context);
        },
        reverse: function(location, scale, cb, context) {
          var _proxRadius = this.options.reverseGeocodeProxRadius ? this.options.reverseGeocodeProxRadius : null;
          var proxRadius = _proxRadius ? "," + encodeURIComponent(_proxRadius) : "";
          var params = {
            prox: encodeURIComponent(location.lat) + "," + encodeURIComponent(location.lng) + proxRadius,
            mode: "retrieveAddresses",
            app_id: this.options.app_id,
            app_code: this.options.app_code,
            gen: 9,
            jsonattributes: 1
          };
          params = import_leaflet5.default.Util.extend(params, this.options.reverseQueryParams);
          this.getJSON(this.options.reverseGeocodeUrl, params, cb, context);
        },
        getJSON: function(url, params, cb, context) {
          getJSON(url, params, function(data) {
            var results = [], loc, latLng2, latLngBounds;
            if (data.response.view && data.response.view.length) {
              for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
                loc = data.response.view[0].result[i].location;
                latLng2 = import_leaflet5.default.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
                latLngBounds = import_leaflet5.default.latLngBounds(
                  import_leaflet5.default.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude),
                  import_leaflet5.default.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude)
                );
                results[i] = {
                  name: loc.address.label,
                  properties: loc.address,
                  bbox: latLngBounds,
                  center: latLng2
                };
              }
            }
            cb.call(context, results);
          });
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/latlng.js
  function latLng(options) {
    return new LatLng(options);
  }
  var import_leaflet6, LatLng;
  var init_latlng = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/latlng.js"() {
      import_leaflet6 = __toESM(require_leaflet_src());
      LatLng = import_leaflet6.default.Class.extend({
        options: {
          // the next geocoder to use
          next: void 0,
          sizeInMeters: 1e4
        },
        initialize: function(options) {
          import_leaflet6.default.Util.setOptions(this, options);
        },
        geocode: function(query, cb, context) {
          var match;
          var center;
          if (match = query.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/)) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[1]) ? 1 : -1) * parseFloat(match[2]),
              (/E/i.test(match[3]) ? 1 : -1) * parseFloat(match[4])
            );
          } else if (match = query.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/)) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[2]) ? 1 : -1) * parseFloat(match[1]),
              (/E/i.test(match[4]) ? 1 : -1) * parseFloat(match[3])
            );
          } else if (match = query.match(
            /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
          )) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3] / 60)),
              (/E/i.test(match[4]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6] / 60))
            );
          } else if (match = query.match(
            /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
          )) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[3]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2] / 60)),
              (/E/i.test(match[6]) ? 1 : -1) * (parseFloat(match[4]) + parseFloat(match[5] / 60))
            );
          } else if (match = query.match(
            /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
          )) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3] / 60 + parseFloat(match[4] / 3600))),
              (/E/i.test(match[5]) ? 1 : -1) * (parseFloat(match[6]) + parseFloat(match[7] / 60) + parseFloat(match[8] / 3600))
            );
          } else if (match = query.match(
            /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
          )) {
            center = import_leaflet6.default.latLng(
              (/N/i.test(match[4]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2] / 60 + parseFloat(match[3] / 3600))),
              (/E/i.test(match[8]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6] / 60) + parseFloat(match[7] / 3600))
            );
          } else if (match = query.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/)) {
            center = import_leaflet6.default.latLng(parseFloat(match[1]), parseFloat(match[2]));
          }
          if (center) {
            var results = [
              {
                name: query,
                center,
                bbox: center.toBounds(this.options.sizeInMeters)
              }
            ];
            cb.call(context, results);
          } else if (this.options.next) {
            this.options.next.geocode(query, cb, context);
          }
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/mapbox.js
  function mapbox(accessToken, options) {
    return new Mapbox(accessToken, options);
  }
  var import_leaflet7, Mapbox;
  var init_mapbox = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/mapbox.js"() {
      import_leaflet7 = __toESM(require_leaflet_src());
      init_util();
      Mapbox = import_leaflet7.default.Class.extend({
        options: {
          serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
          geocodingQueryParams: {},
          reverseQueryParams: {}
        },
        initialize: function(accessToken, options) {
          import_leaflet7.default.setOptions(this, options);
          this.options.geocodingQueryParams.access_token = accessToken;
          this.options.reverseQueryParams.access_token = accessToken;
        },
        geocode: function(query, cb, context) {
          var params = this.options.geocodingQueryParams;
          if (params.proximity !== void 0 && params.proximity.lat !== void 0 && params.proximity.lng !== void 0) {
            params.proximity = params.proximity.lng + "," + params.proximity.lat;
          }
          getJSON(this.options.serviceUrl + encodeURIComponent(query) + ".json", params, function(data) {
            var results = [], loc, latLng2, latLngBounds;
            if (data.features && data.features.length) {
              for (var i = 0; i <= data.features.length - 1; i++) {
                loc = data.features[i];
                latLng2 = import_leaflet7.default.latLng(loc.center.reverse());
                if (loc.bbox) {
                  latLngBounds = import_leaflet7.default.latLngBounds(
                    import_leaflet7.default.latLng(loc.bbox.slice(0, 2).reverse()),
                    import_leaflet7.default.latLng(loc.bbox.slice(2, 4).reverse())
                  );
                } else {
                  latLngBounds = import_leaflet7.default.latLngBounds(latLng2, latLng2);
                }
                var properties = {
                  text: loc.text,
                  address: loc.address
                };
                for (var j = 0; j < (loc.context || []).length; j++) {
                  var id = loc.context[j].id.split(".")[0];
                  properties[id] = loc.context[j].text;
                  if (loc.context[j].short_code) {
                    properties["countryShortCode"] = loc.context[j].short_code;
                  }
                }
                results[i] = {
                  name: loc.place_name,
                  bbox: latLngBounds,
                  center: latLng2,
                  properties
                };
              }
            }
            cb.call(context, results);
          });
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        reverse: function(location, scale, cb, context) {
          getJSON(
            this.options.serviceUrl + encodeURIComponent(location.lng) + "," + encodeURIComponent(location.lat) + ".json",
            this.options.reverseQueryParams,
            function(data) {
              var results = [], loc, latLng2, latLngBounds;
              if (data.features && data.features.length) {
                for (var i = 0; i <= data.features.length - 1; i++) {
                  loc = data.features[i];
                  latLng2 = import_leaflet7.default.latLng(loc.center.reverse());
                  if (loc.bbox) {
                    latLngBounds = import_leaflet7.default.latLngBounds(
                      import_leaflet7.default.latLng(loc.bbox.slice(0, 2).reverse()),
                      import_leaflet7.default.latLng(loc.bbox.slice(2, 4).reverse())
                    );
                  } else {
                    latLngBounds = import_leaflet7.default.latLngBounds(latLng2, latLng2);
                  }
                  results[i] = {
                    name: loc.place_name,
                    bbox: latLngBounds,
                    center: latLng2
                  };
                }
              }
              cb.call(context, results);
            }
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/mapquest.js
  function mapQuest(key, options) {
    return new MapQuest(key, options);
  }
  var import_leaflet8, MapQuest;
  var init_mapquest = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/mapquest.js"() {
      import_leaflet8 = __toESM(require_leaflet_src());
      init_util();
      MapQuest = import_leaflet8.default.Class.extend({
        options: {
          serviceUrl: "https://www.mapquestapi.com/geocoding/v1"
        },
        initialize: function(key, options) {
          this._key = decodeURIComponent(key);
          import_leaflet8.default.Util.setOptions(this, options);
        },
        _formatName: function() {
          var r = [], i;
          for (i = 0; i < arguments.length; i++) {
            if (arguments[i]) {
              r.push(arguments[i]);
            }
          }
          return r.join(", ");
        },
        geocode: function(query, cb, context) {
          getJSON(
            this.options.serviceUrl + "/address",
            {
              key: this._key,
              location: query,
              limit: 5,
              outFormat: "json"
            },
            import_leaflet8.default.bind(function(data) {
              var results = [], loc, latLng2;
              if (data.results && data.results[0].locations) {
                for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                  loc = data.results[0].locations[i];
                  latLng2 = import_leaflet8.default.latLng(loc.latLng);
                  results[i] = {
                    name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                    bbox: import_leaflet8.default.latLngBounds(latLng2, latLng2),
                    center: latLng2
                  };
                }
              }
              cb.call(context, results);
            }, this)
          );
        },
        reverse: function(location, scale, cb, context) {
          getJSON(
            this.options.serviceUrl + "/reverse",
            {
              key: this._key,
              location: location.lat + "," + location.lng,
              outputFormat: "json"
            },
            import_leaflet8.default.bind(function(data) {
              var results = [], loc, latLng2;
              if (data.results && data.results[0].locations) {
                for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                  loc = data.results[0].locations[i];
                  latLng2 = import_leaflet8.default.latLng(loc.latLng);
                  results[i] = {
                    name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                    bbox: import_leaflet8.default.latLngBounds(latLng2, latLng2),
                    center: latLng2
                  };
                }
              }
              cb.call(context, results);
            }, this)
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/neutrino.js
  function neutrino(accessToken) {
    return new Neutrino(accessToken);
  }
  var import_leaflet9, Neutrino;
  var init_neutrino = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/neutrino.js"() {
      import_leaflet9 = __toESM(require_leaflet_src());
      init_util();
      Neutrino = import_leaflet9.default.Class.extend({
        options: {
          userId: "<insert your userId here>",
          apiKey: "<insert your apiKey here>",
          serviceUrl: "https://neutrinoapi.com/"
        },
        initialize: function(options) {
          import_leaflet9.default.Util.setOptions(this, options);
        },
        // https://www.neutrinoapi.com/api/geocode-address/
        geocode: function(query, cb, context) {
          getJSON(
            this.options.serviceUrl + "geocode-address",
            {
              apiKey: this.options.apiKey,
              userId: this.options.userId,
              //get three words and make a dot based string
              address: query.split(/\s+/).join(".")
            },
            function(data) {
              var results = [], latLng2, latLngBounds;
              if (data.locations) {
                data.geometry = data.locations[0];
                latLng2 = import_leaflet9.default.latLng(data.geometry["latitude"], data.geometry["longitude"]);
                latLngBounds = import_leaflet9.default.latLngBounds(latLng2, latLng2);
                results[0] = {
                  name: data.geometry.address,
                  bbox: latLngBounds,
                  center: latLng2
                };
              }
              cb.call(context, results);
            }
          );
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        // https://www.neutrinoapi.com/api/geocode-reverse/
        reverse: function(location, scale, cb, context) {
          getJSON(
            this.options.serviceUrl + "geocode-reverse",
            {
              apiKey: this.options.apiKey,
              userId: this.options.userId,
              latitude: location.lat,
              longitude: location.lng
            },
            function(data) {
              var results = [], latLng2, latLngBounds;
              if (data.status.status == 200 && data.found) {
                latLng2 = import_leaflet9.default.latLng(location.lat, location.lng);
                latLngBounds = import_leaflet9.default.latLngBounds(latLng2, latLng2);
                results[0] = {
                  name: data.address,
                  bbox: latLngBounds,
                  center: latLng2
                };
              }
              cb.call(context, results);
            }
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/nominatim.js
  function nominatim(options) {
    return new Nominatim(options);
  }
  var import_leaflet10, Nominatim;
  var init_nominatim = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/nominatim.js"() {
      import_leaflet10 = __toESM(require_leaflet_src());
      init_util();
      Nominatim = import_leaflet10.default.Class.extend({
        options: {
          serviceUrl: "https://nominatim.openstreetmap.org/",
          geocodingQueryParams: {},
          reverseQueryParams: {},
          htmlTemplate: function(r) {
            var a = r.address, className, parts = [];
            if (a.road || a.building) {
              parts.push("{building} {road} {house_number}");
            }
            if (a.city || a.town || a.village || a.hamlet) {
              className = parts.length > 0 ? "leaflet-control-geocoder-address-detail" : "";
              parts.push(
                '<span class="' + className + '">{postcode} {city} {town} {village} {hamlet}</span>'
              );
            }
            if (a.state || a.country) {
              className = parts.length > 0 ? "leaflet-control-geocoder-address-context" : "";
              parts.push('<span class="' + className + '">{state} {country}</span>');
            }
            return template(parts.join("<br/>"), a, true);
          }
        },
        initialize: function(options) {
          import_leaflet10.default.Util.setOptions(this, options);
        },
        geocode: function(query, cb, context) {
          getJSON(
            this.options.serviceUrl + "search",
            import_leaflet10.default.extend(
              {
                q: query,
                limit: 5,
                format: "json",
                addressdetails: 1
              },
              this.options.geocodingQueryParams
            ),
            import_leaflet10.default.bind(function(data) {
              var results = [];
              for (var i = data.length - 1; i >= 0; i--) {
                var bbox = data[i].boundingbox;
                for (var j = 0; j < 4; j++)
                  bbox[j] = parseFloat(bbox[j]);
                results[i] = {
                  icon: data[i].icon,
                  name: data[i].display_name,
                  html: this.options.htmlTemplate ? this.options.htmlTemplate(data[i]) : void 0,
                  bbox: import_leaflet10.default.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
                  center: import_leaflet10.default.latLng(data[i].lat, data[i].lon),
                  properties: data[i]
                };
              }
              cb.call(context, results);
            }, this)
          );
        },
        reverse: function(location, scale, cb, context) {
          getJSON(
            this.options.serviceUrl + "reverse",
            import_leaflet10.default.extend(
              {
                lat: location.lat,
                lon: location.lng,
                zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
                addressdetails: 1,
                format: "json"
              },
              this.options.reverseQueryParams
            ),
            import_leaflet10.default.bind(function(data) {
              var result = [], loc;
              if (data && data.lat && data.lon) {
                loc = import_leaflet10.default.latLng(data.lat, data.lon);
                result.push({
                  name: data.display_name,
                  html: this.options.htmlTemplate ? this.options.htmlTemplate(data) : void 0,
                  center: loc,
                  bounds: import_leaflet10.default.latLngBounds(loc, loc),
                  properties: data
                });
              }
              cb.call(context, result);
            }, this)
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/open-location-code.js
  function openLocationCode(options) {
    return new OpenLocationCode(options);
  }
  var import_leaflet11, OpenLocationCode;
  var init_open_location_code = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/open-location-code.js"() {
      import_leaflet11 = __toESM(require_leaflet_src());
      OpenLocationCode = import_leaflet11.default.Class.extend({
        options: {
          OpenLocationCode: void 0,
          codeLength: void 0
        },
        initialize: function(options) {
          import_leaflet11.default.setOptions(this, options);
        },
        geocode: function(query, cb, context) {
          try {
            var decoded = this.options.OpenLocationCode.decode(query);
            var result = {
              name: query,
              center: import_leaflet11.default.latLng(decoded.latitudeCenter, decoded.longitudeCenter),
              bbox: import_leaflet11.default.latLngBounds(
                import_leaflet11.default.latLng(decoded.latitudeLo, decoded.longitudeLo),
                import_leaflet11.default.latLng(decoded.latitudeHi, decoded.longitudeHi)
              )
            };
            cb.call(context, [result]);
          } catch (e) {
            console.warn(e);
            cb.call(context, []);
          }
        },
        reverse: function(location, scale, cb, context) {
          try {
            var code = this.options.OpenLocationCode.encode(
              location.lat,
              location.lng,
              this.options.codeLength
            );
            var result = {
              name: code,
              center: import_leaflet11.default.latLng(location.lat, location.lng),
              bbox: import_leaflet11.default.latLngBounds(
                import_leaflet11.default.latLng(location.lat, location.lng),
                import_leaflet11.default.latLng(location.lat, location.lng)
              )
            };
            cb.call(context, [result]);
          } catch (e) {
            console.warn(e);
            cb.call(context, []);
          }
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/opencage.js
  function opencage(apiKey, options) {
    return new OpenCage(apiKey, options);
  }
  var import_leaflet12, OpenCage;
  var init_opencage = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/opencage.js"() {
      import_leaflet12 = __toESM(require_leaflet_src());
      init_util();
      OpenCage = import_leaflet12.default.Class.extend({
        options: {
          serviceUrl: "https://api.opencagedata.com/geocode/v1/json",
          geocodingQueryParams: {},
          reverseQueryParams: {}
        },
        initialize: function(apiKey, options) {
          import_leaflet12.default.setOptions(this, options);
          this._accessToken = apiKey;
        },
        geocode: function(query, cb, context) {
          var params = {
            key: this._accessToken,
            q: query
          };
          params = import_leaflet12.default.extend(params, this.options.geocodingQueryParams);
          getJSON(this.options.serviceUrl, params, function(data) {
            var results = [], latLng2, latLngBounds, loc;
            if (data.results && data.results.length) {
              for (var i = 0; i < data.results.length; i++) {
                loc = data.results[i];
                latLng2 = import_leaflet12.default.latLng(loc.geometry);
                if (loc.annotations && loc.annotations.bounds) {
                  latLngBounds = import_leaflet12.default.latLngBounds(
                    import_leaflet12.default.latLng(loc.annotations.bounds.northeast),
                    import_leaflet12.default.latLng(loc.annotations.bounds.southwest)
                  );
                } else {
                  latLngBounds = import_leaflet12.default.latLngBounds(latLng2, latLng2);
                }
                results.push({
                  name: loc.formatted,
                  bbox: latLngBounds,
                  center: latLng2
                });
              }
            }
            cb.call(context, results);
          });
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        reverse: function(location, scale, cb, context) {
          var params = {
            key: this._accessToken,
            q: [location.lat, location.lng].join(",")
          };
          params = import_leaflet12.default.extend(params, this.options.reverseQueryParams);
          getJSON(this.options.serviceUrl, params, function(data) {
            var results = [], latLng2, latLngBounds, loc;
            if (data.results && data.results.length) {
              for (var i = 0; i < data.results.length; i++) {
                loc = data.results[i];
                latLng2 = import_leaflet12.default.latLng(loc.geometry);
                if (loc.annotations && loc.annotations.bounds) {
                  latLngBounds = import_leaflet12.default.latLngBounds(
                    import_leaflet12.default.latLng(loc.annotations.bounds.northeast),
                    import_leaflet12.default.latLng(loc.annotations.bounds.southwest)
                  );
                } else {
                  latLngBounds = import_leaflet12.default.latLngBounds(latLng2, latLng2);
                }
                results.push({
                  name: loc.formatted,
                  bbox: latLngBounds,
                  center: latLng2
                });
              }
            }
            cb.call(context, results);
          });
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/pelias.js
  function pelias(apiKey, options) {
    return new Pelias(apiKey, options);
  }
  function openrouteservice(apiKey, options) {
    return new Openrouteservice(apiKey, options);
  }
  var import_leaflet13, Pelias, GeocodeEarth, geocodeEarth, Mapzen, mapzen, Openrouteservice;
  var init_pelias = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/pelias.js"() {
      import_leaflet13 = __toESM(require_leaflet_src());
      init_util();
      Pelias = import_leaflet13.default.Class.extend({
        options: {
          serviceUrl: "https://api.geocode.earth/v1",
          geocodingQueryParams: {},
          reverseQueryParams: {}
        },
        initialize: function(apiKey, options) {
          import_leaflet13.default.Util.setOptions(this, options);
          this._apiKey = apiKey;
          this._lastSuggest = 0;
        },
        geocode: function(query, cb, context) {
          var _this = this;
          getJSON(
            this.options.serviceUrl + "/search",
            import_leaflet13.default.extend(
              {
                api_key: this._apiKey,
                text: query
              },
              this.options.geocodingQueryParams
            ),
            function(data) {
              cb.call(context, _this._parseResults(data, "bbox"));
            }
          );
        },
        suggest: function(query, cb, context) {
          var _this = this;
          getJSON(
            this.options.serviceUrl + "/autocomplete",
            import_leaflet13.default.extend(
              {
                api_key: this._apiKey,
                text: query
              },
              this.options.geocodingQueryParams
            ),
            import_leaflet13.default.bind(function(data) {
              if (data.geocoding.timestamp > this._lastSuggest) {
                this._lastSuggest = data.geocoding.timestamp;
                cb.call(context, _this._parseResults(data, "bbox"));
              }
            }, this)
          );
        },
        reverse: function(location, scale, cb, context) {
          var _this = this;
          getJSON(
            this.options.serviceUrl + "/reverse",
            import_leaflet13.default.extend(
              {
                api_key: this._apiKey,
                "point.lat": location.lat,
                "point.lon": location.lng
              },
              this.options.reverseQueryParams
            ),
            function(data) {
              cb.call(context, _this._parseResults(data, "bounds"));
            }
          );
        },
        _parseResults: function(data, bboxname) {
          var results = [];
          import_leaflet13.default.geoJson(data, {
            pointToLayer: function(feature, latlng) {
              return import_leaflet13.default.circleMarker(latlng);
            },
            onEachFeature: function(feature, layer) {
              var result = {}, bbox, center;
              if (layer.getBounds) {
                bbox = layer.getBounds();
                center = bbox.getCenter();
              } else if (layer.feature.bbox) {
                center = layer.getLatLng();
                bbox = import_leaflet13.default.latLngBounds(
                  import_leaflet13.default.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(0, 2)),
                  import_leaflet13.default.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(2, 4))
                );
              } else {
                center = layer.getLatLng();
                bbox = import_leaflet13.default.latLngBounds(center, center);
              }
              result.name = layer.feature.properties.label;
              result.center = center;
              result[bboxname] = bbox;
              result.properties = layer.feature.properties;
              results.push(result);
            }
          });
          return results;
        }
      });
      GeocodeEarth = Pelias;
      geocodeEarth = pelias;
      Mapzen = Pelias;
      mapzen = pelias;
      Openrouteservice = Mapzen.extend({
        options: {
          serviceUrl: "https://api.openrouteservice.org/geocode"
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/photon.js
  function photon(options) {
    return new Photon(options);
  }
  var import_leaflet14, Photon;
  var init_photon = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/photon.js"() {
      import_leaflet14 = __toESM(require_leaflet_src());
      init_util();
      Photon = import_leaflet14.default.Class.extend({
        options: {
          serviceUrl: "https://photon.komoot.de/api/",
          reverseUrl: "https://photon.komoot.de/reverse/",
          nameProperties: ["name", "street", "suburb", "hamlet", "town", "city", "state", "country"]
        },
        initialize: function(options) {
          import_leaflet14.default.setOptions(this, options);
        },
        geocode: function(query, cb, context) {
          var params = import_leaflet14.default.extend(
            {
              q: query
            },
            this.options.geocodingQueryParams
          );
          getJSON(
            this.options.serviceUrl,
            params,
            import_leaflet14.default.bind(function(data) {
              cb.call(context, this._decodeFeatures(data));
            }, this)
          );
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        reverse: function(latLng2, scale, cb, context) {
          var params = import_leaflet14.default.extend(
            {
              lat: latLng2.lat,
              lon: latLng2.lng
            },
            this.options.reverseQueryParams
          );
          getJSON(
            this.options.reverseUrl,
            params,
            import_leaflet14.default.bind(function(data) {
              cb.call(context, this._decodeFeatures(data));
            }, this)
          );
        },
        _decodeFeatures: function(data) {
          var results = [], i, f, c, latLng2, extent, bbox;
          if (data && data.features) {
            for (i = 0; i < data.features.length; i++) {
              f = data.features[i];
              c = f.geometry.coordinates;
              latLng2 = import_leaflet14.default.latLng(c[1], c[0]);
              extent = f.properties.extent;
              if (extent) {
                bbox = import_leaflet14.default.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
              } else {
                bbox = import_leaflet14.default.latLngBounds(latLng2, latLng2);
              }
              results.push({
                name: this._decodeFeatureName(f),
                html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : void 0,
                center: latLng2,
                bbox,
                properties: f.properties
              });
            }
          }
          return results;
        },
        _decodeFeatureName: function(f) {
          return (this.options.nameProperties || []).map(function(p) {
            return f.properties[p];
          }).filter(function(v) {
            return !!v;
          }).join(", ");
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/what3words.js
  function what3words(accessToken) {
    return new What3Words(accessToken);
  }
  var import_leaflet15, What3Words;
  var init_what3words = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/what3words.js"() {
      import_leaflet15 = __toESM(require_leaflet_src());
      init_util();
      What3Words = import_leaflet15.default.Class.extend({
        options: {
          serviceUrl: "https://api.what3words.com/v2/"
        },
        initialize: function(accessToken) {
          this._accessToken = accessToken;
        },
        geocode: function(query, cb, context) {
          getJSON(
            this.options.serviceUrl + "forward",
            {
              key: this._accessToken,
              addr: query.split(/\s+/).join(".")
            },
            function(data) {
              var results = [], latLng2, latLngBounds;
              if (data.geometry) {
                latLng2 = import_leaflet15.default.latLng(data.geometry["lat"], data.geometry["lng"]);
                latLngBounds = import_leaflet15.default.latLngBounds(latLng2, latLng2);
                results[0] = {
                  name: data.words,
                  bbox: latLngBounds,
                  center: latLng2
                };
              }
              cb.call(context, results);
            }
          );
        },
        suggest: function(query, cb, context) {
          return this.geocode(query, cb, context);
        },
        reverse: function(location, scale, cb, context) {
          getJSON(
            this.options.serviceUrl + "reverse",
            {
              key: this._accessToken,
              coords: [location.lat, location.lng].join(",")
            },
            function(data) {
              var results = [], latLng2, latLngBounds;
              if (data.status.status == 200) {
                latLng2 = import_leaflet15.default.latLng(data.geometry["lat"], data.geometry["lng"]);
                latLngBounds = import_leaflet15.default.latLngBounds(latLng2, latLng2);
                results[0] = {
                  name: data.words,
                  bbox: latLngBounds,
                  center: latLng2
                };
              }
              cb.call(context, results);
            }
          );
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/geocoders/index.js
  var geocoders_exports = {};
  __export(geocoders_exports, {
    ArcGis: () => ArcGis,
    Bing: () => Bing,
    GeocodeEarth: () => GeocodeEarth,
    Google: () => Google,
    HERE: () => HERE,
    LatLng: () => LatLng,
    MapQuest: () => MapQuest,
    Mapbox: () => Mapbox,
    Mapzen: () => Mapzen,
    Neutrino: () => Neutrino,
    Nominatim: () => Nominatim,
    OpenCage: () => OpenCage,
    OpenLocationCode: () => OpenLocationCode,
    Openrouteservice: () => Openrouteservice,
    Pelias: () => Pelias,
    Photon: () => Photon,
    What3Words: () => What3Words,
    arcgis: () => arcgis,
    bing: () => bing,
    geocodeEarth: () => geocodeEarth,
    google: () => google,
    here: () => here,
    latLng: () => latLng,
    mapQuest: () => mapQuest,
    mapbox: () => mapbox,
    mapzen: () => mapzen,
    neutrino: () => neutrino,
    nominatim: () => nominatim,
    openLocationCode: () => openLocationCode,
    opencage: () => opencage,
    openrouteservice: () => openrouteservice,
    pelias: () => pelias,
    photon: () => photon,
    what3words: () => what3words
  });
  var init_geocoders = __esm({
    "node_modules/leaflet-control-geocoder/src/geocoders/index.js"() {
      init_arcgis();
      init_bing();
      init_google();
      init_here();
      init_latlng();
      init_mapbox();
      init_mapquest();
      init_neutrino();
      init_nominatim();
      init_open_location_code();
      init_opencage();
      init_pelias();
      init_photon();
      init_what3words();
    }
  });

  // node_modules/leaflet-control-geocoder/src/control.js
  function geocoder(options) {
    return new Geocoder(options);
  }
  var import_leaflet16, Geocoder;
  var init_control = __esm({
    "node_modules/leaflet-control-geocoder/src/control.js"() {
      import_leaflet16 = __toESM(require_leaflet_src());
      init_geocoders();
      Geocoder = import_leaflet16.default.Control.extend({
        options: {
          showUniqueResult: true,
          showResultIcons: false,
          collapsed: true,
          expand: "touch",
          // options: touch, click, anythingelse
          position: "topright",
          placeholder: "Search...",
          errorMessage: "Nothing found.",
          iconLabel: "Initiate a new search",
          queryMinLength: 1,
          suggestMinLength: 3,
          suggestTimeout: 250,
          defaultMarkGeocode: true
        },
        includes: import_leaflet16.default.Evented.prototype || import_leaflet16.default.Mixin.Events,
        initialize: function(options) {
          import_leaflet16.default.Util.setOptions(this, options);
          if (!this.options.geocoder) {
            this.options.geocoder = new Nominatim();
          }
          this._requestCount = 0;
        },
        addThrobberClass: function() {
          import_leaflet16.default.DomUtil.addClass(this._container, "leaflet-control-geocoder-throbber");
        },
        removeThrobberClass: function() {
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-throbber");
        },
        onAdd: function(map) {
          var className = "leaflet-control-geocoder", container = import_leaflet16.default.DomUtil.create("div", className + " leaflet-bar"), icon = import_leaflet16.default.DomUtil.create("button", className + "-icon", container), form = this._form = import_leaflet16.default.DomUtil.create("div", className + "-form", container), input;
          this._map = map;
          this._container = container;
          icon.innerHTML = "&nbsp;";
          icon.type = "button";
          icon.setAttribute("aria-label", this.options.iconLabel);
          input = this._input = import_leaflet16.default.DomUtil.create("input", "", form);
          input.type = "text";
          input.value = this.options.query || "";
          input.placeholder = this.options.placeholder;
          import_leaflet16.default.DomEvent.disableClickPropagation(input);
          this._errorElement = import_leaflet16.default.DomUtil.create("div", className + "-form-no-error", container);
          this._errorElement.innerHTML = this.options.errorMessage;
          this._alts = import_leaflet16.default.DomUtil.create(
            "ul",
            className + "-alternatives leaflet-control-geocoder-alternatives-minimized",
            container
          );
          import_leaflet16.default.DomEvent.disableClickPropagation(this._alts);
          import_leaflet16.default.DomEvent.addListener(input, "keydown", this._keydown, this);
          if (this.options.geocoder.suggest) {
            import_leaflet16.default.DomEvent.addListener(input, "input", this._change, this);
          }
          import_leaflet16.default.DomEvent.addListener(
            input,
            "blur",
            function() {
              if (this.options.collapsed && !this._preventBlurCollapse) {
                this._collapse();
              }
              this._preventBlurCollapse = false;
            },
            this
          );
          if (this.options.collapsed) {
            if (this.options.expand === "click") {
              import_leaflet16.default.DomEvent.addListener(
                container,
                "click",
                function(e) {
                  if (e.button === 0 && e.detail !== 2) {
                    this._toggle();
                  }
                },
                this
              );
            } else if (this.options.expand === "touch") {
              import_leaflet16.default.DomEvent.addListener(
                container,
                import_leaflet16.default.Browser.touch ? "touchstart mousedown" : "mousedown",
                function(e) {
                  this._toggle();
                  e.preventDefault();
                  e.stopPropagation();
                },
                this
              );
            } else {
              import_leaflet16.default.DomEvent.addListener(container, "mouseover", this._expand, this);
              import_leaflet16.default.DomEvent.addListener(container, "mouseout", this._collapse, this);
              this._map.on("movestart", this._collapse, this);
            }
          } else {
            this._expand();
            if (import_leaflet16.default.Browser.touch) {
              import_leaflet16.default.DomEvent.addListener(
                container,
                "touchstart",
                function() {
                  this._geocode();
                },
                this
              );
            } else {
              import_leaflet16.default.DomEvent.addListener(
                container,
                "click",
                function() {
                  this._geocode();
                },
                this
              );
            }
          }
          if (this.options.defaultMarkGeocode) {
            this.on("markgeocode", this.markGeocode, this);
          }
          this.on("startgeocode", this.addThrobberClass, this);
          this.on("finishgeocode", this.removeThrobberClass, this);
          this.on("startsuggest", this.addThrobberClass, this);
          this.on("finishsuggest", this.removeThrobberClass, this);
          import_leaflet16.default.DomEvent.disableClickPropagation(container);
          return container;
        },
        setQuery: function(string) {
          this._input.value = string;
          return this;
        },
        _geocodeResult: function(results, suggest) {
          if (!suggest && this.options.showUniqueResult && results.length === 1) {
            this._geocodeResultSelected(results[0]);
          } else if (results.length > 0) {
            this._alts.innerHTML = "";
            this._results = results;
            import_leaflet16.default.DomUtil.removeClass(this._alts, "leaflet-control-geocoder-alternatives-minimized");
            import_leaflet16.default.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-open");
            for (var i = 0; i < results.length; i++) {
              this._alts.appendChild(this._createAlt(results[i], i));
            }
          } else {
            import_leaflet16.default.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-error");
            import_leaflet16.default.DomUtil.addClass(this._errorElement, "leaflet-control-geocoder-error");
          }
        },
        markGeocode: function(result) {
          result = result.geocode || result;
          this._map.fitBounds(result.bbox);
          if (this._geocodeMarker) {
            this._map.removeLayer(this._geocodeMarker);
          }
          this._geocodeMarker = new import_leaflet16.default.Marker(result.center).bindPopup(result.html || result.name).addTo(this._map).openPopup();
          return this;
        },
        _geocode: function(suggest) {
          var value = this._input.value;
          if (!suggest && value.length < this.options.queryMinLength) {
            return;
          }
          var requestCount = ++this._requestCount, mode = suggest ? "suggest" : "geocode", eventData = { input: value };
          this._lastGeocode = value;
          if (!suggest) {
            this._clearResults();
          }
          this.fire("start" + mode, eventData);
          this.options.geocoder[mode](
            value,
            function(results) {
              if (requestCount === this._requestCount) {
                eventData.results = results;
                this.fire("finish" + mode, eventData);
                this._geocodeResult(results, suggest);
              }
            },
            this
          );
        },
        _geocodeResultSelected: function(result) {
          this.fire("markgeocode", { geocode: result });
        },
        _toggle: function() {
          if (import_leaflet16.default.DomUtil.hasClass(this._container, "leaflet-control-geocoder-expanded")) {
            this._collapse();
          } else {
            this._expand();
          }
        },
        _expand: function() {
          import_leaflet16.default.DomUtil.addClass(this._container, "leaflet-control-geocoder-expanded");
          this._input.select();
          this.fire("expand");
        },
        _collapse: function() {
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-expanded");
          import_leaflet16.default.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized");
          import_leaflet16.default.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error");
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open");
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error");
          this._input.blur();
          this.fire("collapse");
        },
        _clearResults: function() {
          import_leaflet16.default.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized");
          this._selection = null;
          import_leaflet16.default.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error");
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open");
          import_leaflet16.default.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error");
        },
        _createAlt: function(result, index) {
          var li = import_leaflet16.default.DomUtil.create("li", ""), a = import_leaflet16.default.DomUtil.create("a", "", li), icon = this.options.showResultIcons && result.icon ? import_leaflet16.default.DomUtil.create("img", "", a) : null, text = result.html ? void 0 : document.createTextNode(result.name), mouseDownHandler = function mouseDownHandler2(e) {
            this._preventBlurCollapse = true;
            import_leaflet16.default.DomEvent.stop(e);
            this._geocodeResultSelected(result);
            import_leaflet16.default.DomEvent.on(
              li,
              "click touchend",
              function() {
                if (this.options.collapsed) {
                  this._collapse();
                } else {
                  this._clearResults();
                }
              },
              this
            );
          };
          if (icon) {
            icon.src = result.icon;
          }
          li.setAttribute("data-result-index", index);
          if (result.html) {
            a.innerHTML = a.innerHTML + result.html;
          } else {
            a.appendChild(text);
          }
          import_leaflet16.default.DomEvent.addListener(li, "mousedown touchstart", mouseDownHandler, this);
          return li;
        },
        _keydown: function(e) {
          var _this = this, select = function select2(dir) {
            if (_this._selection) {
              import_leaflet16.default.DomUtil.removeClass(_this._selection, "leaflet-control-geocoder-selected");
              _this._selection = _this._selection[dir > 0 ? "nextSibling" : "previousSibling"];
            }
            if (!_this._selection) {
              _this._selection = _this._alts[dir > 0 ? "firstChild" : "lastChild"];
            }
            if (_this._selection) {
              import_leaflet16.default.DomUtil.addClass(_this._selection, "leaflet-control-geocoder-selected");
            }
          };
          switch (e.keyCode) {
            case 27:
              if (this.options.collapsed) {
                this._collapse();
              } else {
                this._clearResults();
              }
              break;
            case 38:
              select(-1);
              break;
            case 40:
              select(1);
              break;
            case 13:
              if (this._selection) {
                var index = parseInt(this._selection.getAttribute("data-result-index"), 10);
                this._geocodeResultSelected(this._results[index]);
                this._clearResults();
              } else {
                this._geocode();
              }
              break;
            default:
              return;
          }
          import_leaflet16.default.DomEvent.preventDefault(e);
        },
        _change: function() {
          var v = this._input.value;
          if (v !== this._lastGeocode) {
            clearTimeout(this._suggestTimeout);
            if (v.length >= this.options.suggestMinLength) {
              this._suggestTimeout = setTimeout(
                import_leaflet16.default.bind(function() {
                  this._geocode(true);
                }, this),
                this.options.suggestTimeout
              );
            } else {
              this._clearResults();
            }
          }
        }
      });
    }
  });

  // node_modules/leaflet-control-geocoder/src/index.js
  var import_leaflet17;
  var init_src = __esm({
    "node_modules/leaflet-control-geocoder/src/index.js"() {
      import_leaflet17 = __toESM(require_leaflet_src());
      init_control();
      init_geocoders();
      import_leaflet17.default.Util.extend(Geocoder, geocoders_exports);
      import_leaflet17.default.Util.extend(import_leaflet17.default.Control, {
        Geocoder,
        geocoder
      });
    }
  });

  // node_modules/leaflet/src/core/Util.js
  function stamp(obj) {
    if (!("_leaflet_id" in obj)) {
      obj["_leaflet_id"] = ++lastId;
    }
    return obj._leaflet_id;
  }
  function falseFn() {
    return false;
  }
  function formatNum(num, precision) {
    if (precision === false) {
      return num;
    }
    var pow = Math.pow(10, precision === void 0 ? 6 : precision);
    return Math.round(num * pow) / pow;
  }
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function splitWords(str) {
    return trim(str).split(/\s+/);
  }
  function indexOf(array, el) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === el) {
        return i;
      }
    }
    return -1;
  }
  function getPrefixed(name) {
    return window["webkit" + name] || window["moz" + name] || window["ms" + name];
  }
  function timeoutDefer(fn) {
    var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
    lastTime = time + timeToCall;
    return window.setTimeout(fn, timeToCall);
  }
  var create, lastId, isArray, lastTime, requestFn, cancelFn;
  var init_Util = __esm({
    "node_modules/leaflet/src/core/Util.js"() {
      create = Object.create || function() {
        function F() {
        }
        return function(proto) {
          F.prototype = proto;
          return new F();
        };
      }();
      lastId = 0;
      isArray = Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      lastTime = 0;
      requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
      cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
        window.clearTimeout(id);
      };
    }
  });

  // node_modules/leaflet/src/geometry/Point.js
  function Point(x, y, round) {
    this.x = round ? Math.round(x) : x;
    this.y = round ? Math.round(y) : y;
  }
  function toPoint(x, y, round) {
    if (x instanceof Point) {
      return x;
    }
    if (isArray(x)) {
      return new Point(x[0], x[1]);
    }
    if (x === void 0 || x === null) {
      return x;
    }
    if (typeof x === "object" && "x" in x && "y" in x) {
      return new Point(x.x, x.y);
    }
    return new Point(x, y, round);
  }
  var trunc;
  var init_Point = __esm({
    "node_modules/leaflet/src/geometry/Point.js"() {
      init_Util();
      trunc = Math.trunc || function(v) {
        return v > 0 ? Math.floor(v) : Math.ceil(v);
      };
      Point.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new Point(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(point) {
          return this.clone()._add(toPoint(point));
        },
        _add: function(point) {
          this.x += point.x;
          this.y += point.y;
          return this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(point) {
          return this.clone()._subtract(toPoint(point));
        },
        _subtract: function(point) {
          this.x -= point.x;
          this.y -= point.y;
          return this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(num) {
          return this.clone()._divideBy(num);
        },
        _divideBy: function(num) {
          this.x /= num;
          this.y /= num;
          return this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(num) {
          return this.clone()._multiplyBy(num);
        },
        _multiplyBy: function(num) {
          this.x *= num;
          this.y *= num;
          return this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(point) {
          return new Point(this.x * point.x, this.y * point.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(point) {
          return new Point(this.x / point.x, this.y / point.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          this.x = trunc(this.x);
          this.y = trunc(this.y);
          return this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(point) {
          point = toPoint(point);
          var x = point.x - this.x, y = point.y - this.y;
          return Math.sqrt(x * x + y * y);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(point) {
          point = toPoint(point);
          return point.x === this.x && point.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(point) {
          point = toPoint(point);
          return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
        }
      };
    }
  });

  // node_modules/leaflet/src/layer/vector/SVG.Util.js
  function svgCreate(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  var init_SVG_Util = __esm({
    "node_modules/leaflet/src/layer/vector/SVG.Util.js"() {
      init_Browser();
    }
  });

  // node_modules/leaflet/src/core/Browser.js
  function userAgentContains(str) {
    return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
  }
  var style, ie, ielt9, edge, webkit, android, android23, webkitVer, androidStock, opera, chrome, gecko, safari, phantom, opera12, win, ie3d, webkit3d, gecko3d, any3d, mobile, mobileWebkit, mobileWebkit3d, msPointer, pointer, touchNative, touch, mobileOpera, mobileGecko, retina, passiveEvents, canvas, svg, inlineSvg, vml, mac, linux, Browser_default;
  var init_Browser = __esm({
    "node_modules/leaflet/src/core/Browser.js"() {
      init_Util();
      init_SVG_Util();
      style = document.documentElement.style;
      ie = "ActiveXObject" in window;
      ielt9 = ie && !document.addEventListener;
      edge = "msLaunchUri" in navigator && !("documentMode" in document);
      webkit = userAgentContains("webkit");
      android = userAgentContains("android");
      android23 = userAgentContains("android 2") || userAgentContains("android 3");
      webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
      androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
      opera = !!window.opera;
      chrome = !edge && userAgentContains("chrome");
      gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
      safari = !chrome && userAgentContains("safari");
      phantom = userAgentContains("phantom");
      opera12 = "OTransition" in style;
      win = navigator.platform.indexOf("Win") === 0;
      ie3d = ie && "transition" in style;
      webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
      gecko3d = "MozPerspective" in style;
      any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
      mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
      mobileWebkit = mobile && webkit;
      mobileWebkit3d = mobile && webkit3d;
      msPointer = !window.PointerEvent && window.MSPointerEvent;
      pointer = !!(window.PointerEvent || msPointer);
      touchNative = "ontouchstart" in window || !!window.TouchEvent;
      touch = !window.L_NO_TOUCH && (touchNative || pointer);
      mobileOpera = mobile && opera;
      mobileGecko = mobile && gecko;
      retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
      passiveEvents = function() {
        var supportsPassiveOption = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function() {
              supportsPassiveOption = true;
            }
          });
          window.addEventListener("testPassiveEventSupport", falseFn, opts);
          window.removeEventListener("testPassiveEventSupport", falseFn, opts);
        } catch (e) {
        }
        return supportsPassiveOption;
      }();
      canvas = function() {
        return !!document.createElement("canvas").getContext;
      }();
      svg = !!(document.createElementNS && svgCreate("svg").createSVGRect);
      inlineSvg = !!svg && function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      }();
      vml = !svg && function() {
        try {
          var div = document.createElement("div");
          div.innerHTML = '<v:shape adj="1"/>';
          var shape = div.firstChild;
          shape.style.behavior = "url(#default#VML)";
          return shape && typeof shape.adj === "object";
        } catch (e) {
          return false;
        }
      }();
      mac = navigator.platform.indexOf("Mac") === 0;
      linux = navigator.platform.indexOf("Linux") === 0;
      Browser_default = {
        ie,
        ielt9,
        edge,
        webkit,
        android,
        android23,
        androidStock,
        opera,
        chrome,
        gecko,
        safari,
        phantom,
        opera12,
        win,
        ie3d,
        webkit3d,
        gecko3d,
        any3d,
        mobile,
        mobileWebkit,
        mobileWebkit3d,
        msPointer,
        pointer,
        touch,
        touchNative,
        mobileOpera,
        mobileGecko,
        retina,
        passiveEvents,
        canvas,
        svg,
        vml,
        inlineSvg,
        mac,
        linux
      };
    }
  });

  // node_modules/leaflet/src/dom/DomEvent.Pointer.js
  function addPointerListener(obj, type, handler) {
    if (type === "touchstart") {
      _addPointerDocListener();
    }
    if (!handle[type]) {
      console.warn("wrong event specified:", type);
      return falseFn;
    }
    handler = handle[type].bind(this, handler);
    obj.addEventListener(pEvent[type], handler, false);
    return handler;
  }
  function removePointerListener(obj, type, handler) {
    if (!pEvent[type]) {
      console.warn("wrong event specified:", type);
      return;
    }
    obj.removeEventListener(pEvent[type], handler, false);
  }
  function _globalPointerDown(e) {
    _pointers[e.pointerId] = e;
  }
  function _globalPointerMove(e) {
    if (_pointers[e.pointerId]) {
      _pointers[e.pointerId] = e;
    }
  }
  function _globalPointerUp(e) {
    delete _pointers[e.pointerId];
  }
  function _addPointerDocListener() {
    if (!_pointerDocListener) {
      document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
      document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
      document.addEventListener(POINTER_UP, _globalPointerUp, true);
      document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
      _pointerDocListener = true;
    }
  }
  function _handlePointer(handler, e) {
    if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
      return;
    }
    e.touches = [];
    for (var i in _pointers) {
      e.touches.push(_pointers[i]);
    }
    e.changedTouches = [e];
    handler(e);
  }
  function _onPointerStart(handler, e) {
    if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
      preventDefault(e);
    }
    _handlePointer(handler, e);
  }
  var POINTER_DOWN, POINTER_MOVE, POINTER_UP, POINTER_CANCEL, pEvent, handle, _pointers, _pointerDocListener;
  var init_DomEvent_Pointer = __esm({
    "node_modules/leaflet/src/dom/DomEvent.Pointer.js"() {
      init_DomEvent();
      init_Browser();
      init_Util();
      POINTER_DOWN = Browser_default.msPointer ? "MSPointerDown" : "pointerdown";
      POINTER_MOVE = Browser_default.msPointer ? "MSPointerMove" : "pointermove";
      POINTER_UP = Browser_default.msPointer ? "MSPointerUp" : "pointerup";
      POINTER_CANCEL = Browser_default.msPointer ? "MSPointerCancel" : "pointercancel";
      pEvent = {
        touchstart: POINTER_DOWN,
        touchmove: POINTER_MOVE,
        touchend: POINTER_UP,
        touchcancel: POINTER_CANCEL
      };
      handle = {
        touchstart: _onPointerStart,
        touchmove: _handlePointer,
        touchend: _handlePointer,
        touchcancel: _handlePointer
      };
      _pointers = {};
      _pointerDocListener = false;
    }
  });

  // node_modules/leaflet/src/dom/DomEvent.DoubleTap.js
  function makeDblclick(event) {
    var newEvent = {}, prop, i;
    for (i in event) {
      prop = event[i];
      newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
    }
    event = newEvent;
    newEvent.type = "dblclick";
    newEvent.detail = 2;
    newEvent.isTrusted = false;
    newEvent._simulated = true;
    return newEvent;
  }
  function addDoubleTapListener(obj, handler) {
    obj.addEventListener("dblclick", handler);
    var last = 0, detail;
    function simDblclick(e) {
      if (e.detail !== 1) {
        detail = e.detail;
        return;
      }
      if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
        return;
      }
      var path = getPropagationPath(e);
      if (path.some(function(el) {
        return el instanceof HTMLLabelElement && el.attributes.for;
      }) && !path.some(function(el) {
        return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
      })) {
        return;
      }
      var now = Date.now();
      if (now - last <= delay) {
        detail++;
        if (detail === 2) {
          handler(makeDblclick(e));
        }
      } else {
        detail = 1;
      }
      last = now;
    }
    obj.addEventListener("click", simDblclick);
    return {
      dblclick: handler,
      simDblclick
    };
  }
  function removeDoubleTapListener(obj, handlers) {
    obj.removeEventListener("dblclick", handlers.dblclick);
    obj.removeEventListener("click", handlers.simDblclick);
  }
  var delay;
  var init_DomEvent_DoubleTap = __esm({
    "node_modules/leaflet/src/dom/DomEvent.DoubleTap.js"() {
      init_DomEvent();
      delay = 200;
    }
  });

  // node_modules/leaflet/src/dom/DomEvent.js
  function on(obj, types, fn, context) {
    if (types && typeof types === "object") {
      for (var type in types) {
        addOne(obj, type, types[type], fn);
      }
    } else {
      types = splitWords(types);
      for (var i = 0, len = types.length; i < len; i++) {
        addOne(obj, types[i], fn, context);
      }
    }
    return this;
  }
  function off(obj, types, fn, context) {
    if (arguments.length === 1) {
      batchRemove(obj);
      delete obj[eventsKey];
    } else if (types && typeof types === "object") {
      for (var type in types) {
        removeOne(obj, type, types[type], fn);
      }
    } else {
      types = splitWords(types);
      if (arguments.length === 2) {
        batchRemove(obj, function(type2) {
          return indexOf(types, type2) !== -1;
        });
      } else {
        for (var i = 0, len = types.length; i < len; i++) {
          removeOne(obj, types[i], fn, context);
        }
      }
    }
    return this;
  }
  function batchRemove(obj, filterFn) {
    for (var id in obj[eventsKey]) {
      var type = id.split(/\d/)[0];
      if (!filterFn || filterFn(type)) {
        removeOne(obj, type, null, null, id);
      }
    }
  }
  function addOne(obj, type, fn, context) {
    var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
    if (obj[eventsKey] && obj[eventsKey][id]) {
      return this;
    }
    var handler = function(e) {
      return fn.call(context || obj, e || window.event);
    };
    var originalHandler = handler;
    if (!Browser_default.touchNative && Browser_default.pointer && type.indexOf("touch") === 0) {
      handler = addPointerListener(obj, type, handler);
    } else if (Browser_default.touch && type === "dblclick") {
      handler = addDoubleTapListener(obj, handler);
    } else if ("addEventListener" in obj) {
      if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
        obj.addEventListener(mouseSubst[type] || type, handler, Browser_default.passiveEvents ? { passive: false } : false);
      } else if (type === "mouseenter" || type === "mouseleave") {
        handler = function(e) {
          e = e || window.event;
          if (isExternalTarget(obj, e)) {
            originalHandler(e);
          }
        };
        obj.addEventListener(mouseSubst[type], handler, false);
      } else {
        obj.addEventListener(type, originalHandler, false);
      }
    } else {
      obj.attachEvent("on" + type, handler);
    }
    obj[eventsKey] = obj[eventsKey] || {};
    obj[eventsKey][id] = handler;
  }
  function removeOne(obj, type, fn, context, id) {
    id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
    var handler = obj[eventsKey] && obj[eventsKey][id];
    if (!handler) {
      return this;
    }
    if (!Browser_default.touchNative && Browser_default.pointer && type.indexOf("touch") === 0) {
      removePointerListener(obj, type, handler);
    } else if (Browser_default.touch && type === "dblclick") {
      removeDoubleTapListener(obj, handler);
    } else if ("removeEventListener" in obj) {
      obj.removeEventListener(mouseSubst[type] || type, handler, false);
    } else {
      obj.detachEvent("on" + type, handler);
    }
    obj[eventsKey][id] = null;
  }
  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    return this;
  }
  function getPropagationPath(ev) {
    if (ev.composedPath) {
      return ev.composedPath();
    }
    var path = [];
    var el = ev.target;
    while (el) {
      path.push(el);
      el = el.parentNode;
    }
    return path;
  }
  function isExternalTarget(el, e) {
    var related = e.relatedTarget;
    if (!related) {
      return true;
    }
    try {
      while (related && related !== el) {
        related = related.parentNode;
      }
    } catch (err) {
      return false;
    }
    return related !== el;
  }
  var eventsKey, mouseSubst, wheelPxFactor;
  var init_DomEvent = __esm({
    "node_modules/leaflet/src/dom/DomEvent.js"() {
      init_Point();
      init_Util();
      init_Browser();
      init_DomEvent_Pointer();
      init_DomEvent_DoubleTap();
      init_DomUtil();
      eventsKey = "_leaflet_events";
      mouseSubst = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      wheelPxFactor = Browser_default.linux && Browser_default.chrome ? window.devicePixelRatio : Browser_default.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    }
  });

  // node_modules/leaflet/src/dom/DomUtil.js
  function testProp(props) {
    var style2 = document.documentElement.style;
    for (var i = 0; i < props.length; i++) {
      if (props[i] in style2) {
        return props[i];
      }
    }
    return false;
  }
  var TRANSFORM, TRANSITION, TRANSITION_END, disableTextSelection, enableTextSelection, _userSelect, userSelectProperty;
  var init_DomUtil = __esm({
    "node_modules/leaflet/src/dom/DomUtil.js"() {
      init_DomEvent();
      init_Util();
      init_Point();
      init_Browser();
      TRANSFORM = testProp(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      );
      TRANSITION = testProp(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      );
      TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
      if ("onselectstart" in document) {
        disableTextSelection = function() {
          on(window, "selectstart", preventDefault);
        };
        enableTextSelection = function() {
          off(window, "selectstart", preventDefault);
        };
      } else {
        userSelectProperty = testProp(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        disableTextSelection = function() {
          if (userSelectProperty) {
            var style2 = document.documentElement.style;
            _userSelect = style2[userSelectProperty];
            style2[userSelectProperty] = "none";
          }
        };
        enableTextSelection = function() {
          if (userSelectProperty) {
            document.documentElement.style[userSelectProperty] = _userSelect;
            _userSelect = void 0;
          }
        };
      }
    }
  });

  // lib/map_ui.js
  function fetchData(url) {
    return __async(this, null, function* () {
      const response = yield fetchApi(url);
      const data = yield response.json();
      return data.data.stations;
    });
  }
  function createMarker(station, status, map) {
    const marker = import_leaflet18.default.marker([station.lat, station.lon]).addTo(map);
    marker.bindPopup(`
        <b>${station.name}</b><br>
        Adresse: ${station.address}<br>
        V\xE9los disponibles: ${status.num_bikes_available}<br>
        Places libres: ${status.num_docks_available}
    `);
  }
  function createIncident(incident, map) {
    const { location, short_description } = incident;
    const latlng = location.polyline.split(" ").map((coord) => parseFloat(coord));
    const marker = import_leaflet18.default.marker(latlng, {
      icon: import_leaflet18.default.icon({
        iconUrl: "../resources/icon-incident.png",
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map);
    marker.bindPopup(`
        <b>${short_description}</b><br>
        Description: ${incident.description}<br>
        D\xE9but: ${incident.starttime}<br>
        Fin: ${incident.endtime}<br>
        Localisation: ${location.location_description}
    `);
  }
  function createRestaurantMarker(restaurant, map) {
    const marker = import_leaflet18.default.marker([restaurant.Latitude, restaurant.Longitude], {
      icon: import_leaflet18.default.icon({
        iconUrl: "../resources/icon-restaurant.png",
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map);
    const popupContent = `
    <b>${restaurant.Nom}</b><br>
    Adresse: ${restaurant.Adresse}<br><br>
    <form id="reservation-form-${restaurant.RestaurantID}" style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;">
        <label for="nom" style="font-weight: bold; color: #333;">Nom:</label>
        <input type="text" id="nom" name="nom" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="prenom" style="font-weight: bold; color: #333;">Pr\xE9nom:</label>
        <input type="text" id="prenom" name="prenom" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="nbPersonne" style="font-weight: bold; color: #333;">Nombre de personnes:</label>
        <input type="number" id="nbPersonne" name="nbPersonne" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <label for="tel" style="font-weight: bold; color: #333;">T\xE9l\xE9phone:</label>
        <input type="text" id="tel" name="tel" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px;">
        
        <input type="hidden" id="idRestaurant" name="idRestaurant" value="${restaurant.RestaurantID}">
        
        <input type="submit" value="R\xE9server" style="padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50; color: white; font-weight: bold; cursor: pointer; font-size: 16px;">
    </form>
`;
    marker.bindPopup(popupContent);
    marker.on("popupopen", function() {
      const form = document.getElementById(`reservation-form-${restaurant.RestaurantID}`);
      form.addEventListener("submit", function(event) {
        return __async(this, null, function* () {
          event.preventDefault();
          const formData = new FormData(form);
          const data = {
            nom: formData.get("nom"),
            prenom: formData.get("prenom"),
            nbPersonne: parseInt(formData.get("nbPersonne")),
            tel: formData.get("tel"),
            idRestaurant: parseInt(formData.get("idRestaurant"))
          };
          try {
            const response = yield fetchApi(`${API_SERVEUR_URL}/reserverTable`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });
            const result = yield response.text();
            alert(result);
          } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la r\xE9servation. Veuillez r\xE9essayer.");
          }
        });
      });
    });
  }
  function getRestaurants() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${API_SERVEUR_URL}/restaurants`);
        const restaurantsReceived = yield response.json();
        return restaurantsReceived;
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
  function getIncidents() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${API_SERVEUR_URL}/incidents`);
        const incidentsReceived = yield response.json();
        return incidentsReceived.incidents;
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
  function initMap() {
    return __async(this, null, function* () {
      try {
        const stationInfo = yield fetchData(stationInfoUrl);
        const stationStatus = yield fetchData(stationStatusUrl);
        const map = import_leaflet18.default.map("map").setView([48.683331, 6.2], 13);
        import_leaflet18.default.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 20,
          attribution: '\xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        stationInfo.forEach((station) => {
          const status = stationStatus.find((s) => s.station_id === station.station_id);
          if (status) {
            createMarker(station, status, map);
          }
        });
        const restaurantsReceived = yield getRestaurants();
        restaurantsReceived.forEach((restaurant) => {
          createRestaurantMarker(restaurant, map);
        });
        ajouterEvenementAjoutRestaurant(map);
        const incidentsReceived = yield getIncidents();
        incidentsReceived.forEach((incident) => {
          createIncident(incident, map);
        });
      } catch (error) {
        console.error("Erreur lors de la r\xE9cup\xE9ration des donn\xE9es :", error);
      }
    });
  }
  var import_leaflet18, import_leaflet19, ajouterEvenementAjoutRestaurant;
  var init_map_ui = __esm({
    "lib/map_ui.js"() {
      init_config();
      init_dataloader();
      import_leaflet18 = __toESM(require_leaflet_src());
      import_leaflet19 = __toESM(require_leaflet_markercluster_src());
      init_leaflet_heat();
      init_src();
      init_DomUtil();
      ajouterEvenementAjoutRestaurant = (map) => {
        map.on("click", function(e) {
          return __async(this, null, function* () {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            const geocoder2 = import_leaflet18.default.Control.Geocoder.nominatim();
            geocoder2.reverse(e.latlng, map.options.crs.scale(map.getZoom()), (results) => {
              const result = results[0];
              if (result) {
                const address = result.name;
                const popupContent = `
                        <form id="restaurant-form">
                            <label for="restaurant-name">Nom du restaurant:</label>
                            <input type="text" id="restaurant-name" name="restaurant-name" required>
                            <button type="submit">Ajouter</button>
                        </form>
                    `;
                const popup = import_leaflet18.default.popup().setLatLng(e.latlng).setContent(popupContent).openOn(map);
                document.getElementById("restaurant-form").addEventListener("submit", function(event) {
                  return __async(this, null, function* () {
                    event.preventDefault();
                    const restaurantName = document.getElementById("restaurant-name").value;
                    const restaurant = {
                      Nom: restaurantName,
                      Adresse: address,
                      Latitude: lat,
                      Longitude: lng
                    };
                    try {
                      const response = yield fetchApi(`${API_SERVEUR_URL}/ajouterRestaurant`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(restaurant)
                      });
                      const result2 = yield response.json();
                      createRestaurantMarker(restaurant, map);
                      popup.remove();
                      console.log("Restaurant ajout\xE9 avec succ\xE8s:", result2);
                    } catch (error) {
                      console.error("Erreur:", error);
                    }
                  });
                });
              } else {
                alert("Adresse non trouv\xE9e");
              }
            });
          });
        });
      };
      getRestaurants();
    }
  });

  // index.js
  var require_front = __commonJS({
    "index.js"(exports) {
      init_map_ui();
      init_dataloader();
      document.addEventListener("DOMContentLoaded", () => __async(exports, null, function* () {
        yield initMap();
        console.log("FETCH DE l'API DONNEES BLOQUEES");
        const rep = yield fetchApi("https://www.datagrandest.fr/data4citizen/d4c/api/datasets/1.0/1642070072496-1/alternative_exports/90c43af4-e5b9-4069-8bf1-61a5b900b476/");
      }));
    }
  });
  require_front();
})();
/*! Bundled license information:

leaflet/dist/leaflet-src.js:
  (* @preserve
   * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)
*/
//# sourceMappingURL=index.js.map