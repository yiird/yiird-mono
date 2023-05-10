import {
  __export
} from "./chunk-4EOJPDL2.js";

// ../../node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}

// ../../node_modules/smooth-scrollbar/utils/event-hub.js
var eventListenerOptions;
var eventMap = /* @__PURE__ */ new WeakMap();
function getOptions() {
  if (eventListenerOptions !== void 0) {
    return eventListenerOptions;
  }
  var supportPassiveEvent = false;
  try {
    var noop = function() {
    };
    var options = Object.defineProperty({}, "passive", {
      enumerable: true,
      get: function() {
        supportPassiveEvent = true;
        return true;
      }
    });
    window.addEventListener("testPassive", noop, options);
    window.removeEventListener("testPassive", noop, options);
  } catch (e) {
  }
  eventListenerOptions = supportPassiveEvent ? { passive: false } : false;
  return eventListenerOptions;
}
function eventScope(scrollbar) {
  var configs = eventMap.get(scrollbar) || [];
  eventMap.set(scrollbar, configs);
  return function addEvent(elem, events, fn) {
    function handler(event) {
      if (event.defaultPrevented) {
        return;
      }
      fn(event);
    }
    events.split(/\s+/g).forEach(function(eventName) {
      configs.push({ elem, eventName, handler });
      elem.addEventListener(eventName, handler, getOptions());
    });
  };
}
function clearEventsOn(scrollbar) {
  var configs = eventMap.get(scrollbar);
  if (!configs) {
    return;
  }
  configs.forEach(function(_a) {
    var elem = _a.elem, eventName = _a.eventName, handler = _a.handler;
    elem.removeEventListener(eventName, handler, getOptions());
  });
  eventMap.delete(scrollbar);
}

// ../../node_modules/smooth-scrollbar/utils/get-pointer-data.js
function getPointerData(evt) {
  return evt.touches ? evt.touches[evt.touches.length - 1] : evt;
}

// ../../node_modules/smooth-scrollbar/utils/get-position.js
function getPosition(evt) {
  var data = getPointerData(evt);
  return {
    x: data.clientX,
    y: data.clientY
  };
}

// ../../node_modules/smooth-scrollbar/utils/is-one-of.js
function isOneOf(a, b) {
  if (b === void 0) {
    b = [];
  }
  return b.some(function(v) {
    return a === v;
  });
}

// ../../node_modules/smooth-scrollbar/utils/set-style.js
var VENDOR_PREFIX = [
  "webkit",
  "moz",
  "ms",
  "o"
];
var RE = new RegExp("^-(?!(?:" + VENDOR_PREFIX.join("|") + ")-)");
function autoPrefix(styles) {
  var res = {};
  Object.keys(styles).forEach(function(prop) {
    if (!RE.test(prop)) {
      res[prop] = styles[prop];
      return;
    }
    var val = styles[prop];
    prop = prop.replace(/^-/, "");
    res[prop] = val;
    VENDOR_PREFIX.forEach(function(prefix) {
      res["-" + prefix + "-" + prop] = val;
    });
  });
  return res;
}
function setStyle(elem, styles) {
  styles = autoPrefix(styles);
  Object.keys(styles).forEach(function(prop) {
    var cssProp = prop.replace(/^-/, "").replace(/-([a-z])/g, function(_, $1) {
      return $1.toUpperCase();
    });
    elem.style[cssProp] = styles[prop];
  });
}

// ../../node_modules/smooth-scrollbar/utils/touch-record.js
var Tracker = (
  /** @class */
  function() {
    function Tracker2(touch) {
      this.velocityMultiplier = window.devicePixelRatio;
      this.updateTime = Date.now();
      this.delta = { x: 0, y: 0 };
      this.velocity = { x: 0, y: 0 };
      this.lastPosition = { x: 0, y: 0 };
      this.lastPosition = getPosition(touch);
    }
    Tracker2.prototype.update = function(touch) {
      var _a = this, velocity = _a.velocity, updateTime = _a.updateTime, lastPosition = _a.lastPosition;
      var now = Date.now();
      var position = getPosition(touch);
      var delta = {
        x: -(position.x - lastPosition.x),
        y: -(position.y - lastPosition.y)
      };
      var duration = now - updateTime || 16.7;
      var vx = delta.x / duration * 16.7;
      var vy = delta.y / duration * 16.7;
      velocity.x = vx * this.velocityMultiplier;
      velocity.y = vy * this.velocityMultiplier;
      this.delta = delta;
      this.updateTime = now;
      this.lastPosition = position;
    };
    return Tracker2;
  }()
);
var TouchRecord = (
  /** @class */
  function() {
    function TouchRecord2() {
      this._touchList = {};
    }
    Object.defineProperty(TouchRecord2.prototype, "_primitiveValue", {
      get: function() {
        return { x: 0, y: 0 };
      },
      enumerable: true,
      configurable: true
    });
    TouchRecord2.prototype.isActive = function() {
      return this._activeTouchID !== void 0;
    };
    TouchRecord2.prototype.getDelta = function() {
      var tracker = this._getActiveTracker();
      if (!tracker) {
        return this._primitiveValue;
      }
      return __assign({}, tracker.delta);
    };
    TouchRecord2.prototype.getVelocity = function() {
      var tracker = this._getActiveTracker();
      if (!tracker) {
        return this._primitiveValue;
      }
      return __assign({}, tracker.velocity);
    };
    TouchRecord2.prototype.getEasingDistance = function(damping) {
      var deAcceleration = 1 - damping;
      var distance = {
        x: 0,
        y: 0
      };
      var vel = this.getVelocity();
      Object.keys(vel).forEach(function(dir) {
        var v = Math.abs(vel[dir]) <= 10 ? 0 : vel[dir];
        while (v !== 0) {
          distance[dir] += v;
          v = v * deAcceleration | 0;
        }
      });
      return distance;
    };
    TouchRecord2.prototype.track = function(evt) {
      var _this = this;
      var targetTouches = evt.targetTouches;
      Array.from(targetTouches).forEach(function(touch) {
        _this._add(touch);
      });
      return this._touchList;
    };
    TouchRecord2.prototype.update = function(evt) {
      var _this = this;
      var touches = evt.touches, changedTouches = evt.changedTouches;
      Array.from(touches).forEach(function(touch) {
        _this._renew(touch);
      });
      this._setActiveID(changedTouches);
      return this._touchList;
    };
    TouchRecord2.prototype.release = function(evt) {
      var _this = this;
      delete this._activeTouchID;
      Array.from(evt.changedTouches).forEach(function(touch) {
        _this._delete(touch);
      });
    };
    TouchRecord2.prototype._add = function(touch) {
      if (this._has(touch)) {
        this._delete(touch);
      }
      var tracker = new Tracker(touch);
      this._touchList[touch.identifier] = tracker;
    };
    TouchRecord2.prototype._renew = function(touch) {
      if (!this._has(touch)) {
        return;
      }
      var tracker = this._touchList[touch.identifier];
      tracker.update(touch);
    };
    TouchRecord2.prototype._delete = function(touch) {
      delete this._touchList[touch.identifier];
    };
    TouchRecord2.prototype._has = function(touch) {
      return this._touchList.hasOwnProperty(touch.identifier);
    };
    TouchRecord2.prototype._setActiveID = function(touches) {
      this._activeTouchID = touches[touches.length - 1].identifier;
    };
    TouchRecord2.prototype._getActiveTracker = function() {
      var _a = this, _touchList = _a._touchList, _activeTouchID = _a._activeTouchID;
      return _touchList[_activeTouchID];
    };
    return TouchRecord2;
  }()
);

// ../../node_modules/smooth-scrollbar/utils/clamp.js
function clamp(value, lower, upper) {
  return Math.max(lower, Math.min(upper, value));
}

// ../../node_modules/smooth-scrollbar/utils/debounce.js
function debounce(fn, wait, leading) {
  if (wait === void 0) {
    wait = 0;
  }
  var timer;
  var lastCalledAt = -Infinity;
  return function debouncedFn() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (leading) {
      var now = Date.now();
      var elapsed = now - lastCalledAt;
      lastCalledAt = now;
      if (elapsed >= wait) {
        fn.apply(this, args);
      }
    } else {
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, wait);
  };
}

// ../../node_modules/smooth-scrollbar/decorators/range.js
function range(min, max) {
  if (min === void 0) {
    min = -Infinity;
  }
  if (max === void 0) {
    max = Infinity;
  }
  return function(proto, key) {
    var alias = "_" + key;
    Object.defineProperty(proto, key, {
      get: function() {
        return this[alias];
      },
      set: function(val) {
        Object.defineProperty(this, alias, {
          value: clamp(val, min, max),
          enumerable: false,
          writable: true,
          configurable: true
        });
      },
      enumerable: true,
      configurable: true
    });
  };
}

// ../../node_modules/smooth-scrollbar/decorators/boolean.js
function boolean(proto, key) {
  var alias = "_" + key;
  Object.defineProperty(proto, key, {
    get: function() {
      return this[alias];
    },
    set: function(val) {
      Object.defineProperty(this, alias, {
        value: !!val,
        enumerable: false,
        writable: true,
        configurable: true
      });
    },
    enumerable: true,
    configurable: true
  });
}

// ../../node_modules/smooth-scrollbar/decorators/debounce.js
function debounce2() {
  var options = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    options[_i] = arguments[_i];
  }
  return function(_proto, key, descriptor) {
    var fn = descriptor.value;
    return {
      get: function() {
        if (!this.hasOwnProperty(key)) {
          Object.defineProperty(this, key, {
            value: debounce.apply(void 0, __spreadArrays([fn], options))
          });
        }
        return this[key];
      }
    };
  };
}

// ../../node_modules/smooth-scrollbar/options.js
var Options = (
  /** @class */
  function() {
    function Options2(config) {
      var _this = this;
      if (config === void 0) {
        config = {};
      }
      this.damping = 0.1;
      this.thumbMinSize = 20;
      this.renderByPixels = true;
      this.alwaysShowTracks = false;
      this.continuousScrolling = true;
      this.delegateTo = null;
      this.plugins = {};
      Object.keys(config).forEach(function(prop) {
        _this[prop] = config[prop];
      });
    }
    Object.defineProperty(Options2.prototype, "wheelEventTarget", {
      get: function() {
        return this.delegateTo;
      },
      set: function(el) {
        console.warn("[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead.");
        this.delegateTo = el;
      },
      enumerable: true,
      configurable: true
    });
    __decorate([
      range(0, 1)
    ], Options2.prototype, "damping", void 0);
    __decorate([
      range(0, Infinity)
    ], Options2.prototype, "thumbMinSize", void 0);
    __decorate([
      boolean
    ], Options2.prototype, "renderByPixels", void 0);
    __decorate([
      boolean
    ], Options2.prototype, "alwaysShowTracks", void 0);
    __decorate([
      boolean
    ], Options2.prototype, "continuousScrolling", void 0);
    return Options2;
  }()
);

// ../../node_modules/smooth-scrollbar/track/direction.js
var TrackDirection;
(function(TrackDirection2) {
  TrackDirection2["X"] = "x";
  TrackDirection2["Y"] = "y";
})(TrackDirection || (TrackDirection = {}));

// ../../node_modules/smooth-scrollbar/track/thumb.js
var ScrollbarThumb = (
  /** @class */
  function() {
    function ScrollbarThumb2(_direction, _minSize) {
      if (_minSize === void 0) {
        _minSize = 0;
      }
      this._direction = _direction;
      this._minSize = _minSize;
      this.element = document.createElement("div");
      this.displaySize = 0;
      this.realSize = 0;
      this.offset = 0;
      this.element.className = "scrollbar-thumb scrollbar-thumb-" + _direction;
    }
    ScrollbarThumb2.prototype.attachTo = function(trackEl) {
      trackEl.appendChild(this.element);
    };
    ScrollbarThumb2.prototype.update = function(scrollOffset, containerSize, pageSize) {
      this.realSize = Math.min(containerSize / pageSize, 1) * containerSize;
      this.displaySize = Math.max(this.realSize, this._minSize);
      this.offset = scrollOffset / pageSize * (containerSize + (this.realSize - this.displaySize));
      setStyle(this.element, this._getStyle());
    };
    ScrollbarThumb2.prototype._getStyle = function() {
      switch (this._direction) {
        case TrackDirection.X:
          return {
            width: this.displaySize + "px",
            "-transform": "translate3d(" + this.offset + "px, 0, 0)"
          };
        case TrackDirection.Y:
          return {
            height: this.displaySize + "px",
            "-transform": "translate3d(0, " + this.offset + "px, 0)"
          };
        default:
          return null;
      }
    };
    return ScrollbarThumb2;
  }()
);

// ../../node_modules/smooth-scrollbar/track/track.js
var ScrollbarTrack = (
  /** @class */
  function() {
    function ScrollbarTrack2(direction, thumbMinSize) {
      if (thumbMinSize === void 0) {
        thumbMinSize = 0;
      }
      this.element = document.createElement("div");
      this._isShown = false;
      this.element.className = "scrollbar-track scrollbar-track-" + direction;
      this.thumb = new ScrollbarThumb(direction, thumbMinSize);
      this.thumb.attachTo(this.element);
    }
    ScrollbarTrack2.prototype.attachTo = function(scrollbarContainer) {
      scrollbarContainer.appendChild(this.element);
    };
    ScrollbarTrack2.prototype.show = function() {
      if (this._isShown) {
        return;
      }
      this._isShown = true;
      this.element.classList.add("show");
    };
    ScrollbarTrack2.prototype.hide = function() {
      if (!this._isShown) {
        return;
      }
      this._isShown = false;
      this.element.classList.remove("show");
    };
    ScrollbarTrack2.prototype.update = function(scrollOffset, containerSize, pageSize) {
      setStyle(this.element, {
        display: pageSize <= containerSize ? "none" : "block"
      });
      this.thumb.update(scrollOffset, containerSize, pageSize);
    };
    return ScrollbarTrack2;
  }()
);

// ../../node_modules/smooth-scrollbar/track/index.js
var TrackController = (
  /** @class */
  function() {
    function TrackController2(_scrollbar) {
      this._scrollbar = _scrollbar;
      var thumbMinSize = _scrollbar.options.thumbMinSize;
      this.xAxis = new ScrollbarTrack(TrackDirection.X, thumbMinSize);
      this.yAxis = new ScrollbarTrack(TrackDirection.Y, thumbMinSize);
      this.xAxis.attachTo(_scrollbar.containerEl);
      this.yAxis.attachTo(_scrollbar.containerEl);
      if (_scrollbar.options.alwaysShowTracks) {
        this.xAxis.show();
        this.yAxis.show();
      }
    }
    TrackController2.prototype.update = function() {
      var _a = this._scrollbar, size = _a.size, offset = _a.offset;
      this.xAxis.update(offset.x, size.container.width, size.content.width);
      this.yAxis.update(offset.y, size.container.height, size.content.height);
    };
    TrackController2.prototype.autoHideOnIdle = function() {
      if (this._scrollbar.options.alwaysShowTracks) {
        return;
      }
      this.xAxis.hide();
      this.yAxis.hide();
    };
    __decorate([
      debounce2(300)
    ], TrackController2.prototype, "autoHideOnIdle", null);
    return TrackController2;
  }()
);

// ../../node_modules/smooth-scrollbar/geometry/get-size.js
function getSize(scrollbar) {
  var containerEl = scrollbar.containerEl, contentEl = scrollbar.contentEl;
  var containerStyles = getComputedStyle(containerEl);
  var paddings = [
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ].map(function(prop) {
    return containerStyles[prop] ? parseFloat(containerStyles[prop]) : 0;
  });
  var verticalPadding = paddings[0] + paddings[1];
  var horizontalPadding = paddings[2] + paddings[3];
  return {
    container: {
      // requires `overflow: hidden`
      width: containerEl.clientWidth,
      height: containerEl.clientHeight
    },
    content: {
      // border width and paddings should be included
      width: contentEl.offsetWidth - contentEl.clientWidth + contentEl.scrollWidth + horizontalPadding,
      height: contentEl.offsetHeight - contentEl.clientHeight + contentEl.scrollHeight + verticalPadding
    }
  };
}

// ../../node_modules/smooth-scrollbar/geometry/is-visible.js
function isVisible(scrollbar, elem) {
  var bounding = scrollbar.bounding;
  var targetBounding = elem.getBoundingClientRect();
  var top = Math.max(bounding.top, targetBounding.top);
  var left = Math.max(bounding.left, targetBounding.left);
  var right = Math.min(bounding.right, targetBounding.right);
  var bottom = Math.min(bounding.bottom, targetBounding.bottom);
  return top < bottom && left < right;
}

// ../../node_modules/smooth-scrollbar/geometry/update.js
function update(scrollbar) {
  var newSize = scrollbar.getSize();
  var limit = {
    x: Math.max(newSize.content.width - newSize.container.width, 0),
    y: Math.max(newSize.content.height - newSize.container.height, 0)
  };
  var containerBounding = scrollbar.containerEl.getBoundingClientRect();
  var bounding = {
    top: Math.max(containerBounding.top, 0),
    right: Math.min(containerBounding.right, window.innerWidth),
    bottom: Math.min(containerBounding.bottom, window.innerHeight),
    left: Math.max(containerBounding.left, 0)
  };
  scrollbar.size = newSize;
  scrollbar.limit = limit;
  scrollbar.bounding = bounding;
  scrollbar.track.update();
  scrollbar.setPosition();
}

// ../../node_modules/smooth-scrollbar/scrolling/set-position.js
function setPosition(scrollbar, x, y) {
  var options = scrollbar.options, offset = scrollbar.offset, limit = scrollbar.limit, track = scrollbar.track, contentEl = scrollbar.contentEl;
  if (options.renderByPixels) {
    x = Math.round(x);
    y = Math.round(y);
  }
  x = clamp(x, 0, limit.x);
  y = clamp(y, 0, limit.y);
  if (x !== offset.x)
    track.xAxis.show();
  if (y !== offset.y)
    track.yAxis.show();
  if (!options.alwaysShowTracks) {
    track.autoHideOnIdle();
  }
  if (x === offset.x && y === offset.y) {
    return null;
  }
  offset.x = x;
  offset.y = y;
  setStyle(contentEl, {
    "-transform": "translate3d(" + -x + "px, " + -y + "px, 0)"
  });
  track.update();
  return {
    offset: __assign({}, offset),
    limit: __assign({}, limit)
  };
}

// ../../node_modules/smooth-scrollbar/scrolling/scroll-to.js
var animationIDStorage = /* @__PURE__ */ new WeakMap();
function scrollTo(scrollbar, x, y, duration, _a) {
  if (duration === void 0) {
    duration = 0;
  }
  var _b = _a === void 0 ? {} : _a, _c = _b.easing, easing = _c === void 0 ? defaultEasing : _c, callback = _b.callback;
  var options = scrollbar.options, offset = scrollbar.offset, limit = scrollbar.limit;
  if (options.renderByPixels) {
    x = Math.round(x);
    y = Math.round(y);
  }
  var startX = offset.x;
  var startY = offset.y;
  var disX = clamp(x, 0, limit.x) - startX;
  var disY = clamp(y, 0, limit.y) - startY;
  var start = Date.now();
  function scroll() {
    var elapse = Date.now() - start;
    var progress = duration ? easing(Math.min(elapse / duration, 1)) : 1;
    scrollbar.setPosition(startX + disX * progress, startY + disY * progress);
    if (elapse >= duration) {
      if (typeof callback === "function") {
        callback.call(scrollbar);
      }
    } else {
      var animationID = requestAnimationFrame(scroll);
      animationIDStorage.set(scrollbar, animationID);
    }
  }
  cancelAnimationFrame(animationIDStorage.get(scrollbar));
  scroll();
}
function defaultEasing(t) {
  return Math.pow(t - 1, 3) + 1;
}

// ../../node_modules/smooth-scrollbar/scrolling/scroll-into-view.js
function scrollIntoView(scrollbar, elem, _a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.alignToTop, alignToTop = _c === void 0 ? true : _c, _d = _b.onlyScrollIfNeeded, onlyScrollIfNeeded = _d === void 0 ? false : _d, _e = _b.offsetTop, offsetTop = _e === void 0 ? 0 : _e, _f = _b.offsetLeft, offsetLeft = _f === void 0 ? 0 : _f, _g = _b.offsetBottom, offsetBottom = _g === void 0 ? 0 : _g;
  var containerEl = scrollbar.containerEl, bounding = scrollbar.bounding, offset = scrollbar.offset, limit = scrollbar.limit;
  if (!elem || !containerEl.contains(elem))
    return;
  var targetBounding = elem.getBoundingClientRect();
  if (onlyScrollIfNeeded && scrollbar.isVisible(elem))
    return;
  var delta = alignToTop ? targetBounding.top - bounding.top - offsetTop : targetBounding.bottom - bounding.bottom + offsetBottom;
  scrollbar.setMomentum(targetBounding.left - bounding.left - offsetLeft, clamp(delta, -offset.y, limit.y - offset.y));
}

// ../../node_modules/smooth-scrollbar/plugin.js
var ScrollbarPlugin = (
  /** @class */
  function() {
    function ScrollbarPlugin2(scrollbar, options) {
      var _newTarget = this.constructor;
      this.scrollbar = scrollbar;
      this.name = _newTarget.pluginName;
      this.options = __assign(__assign({}, _newTarget.defaultOptions), options);
    }
    ScrollbarPlugin2.prototype.onInit = function() {
    };
    ScrollbarPlugin2.prototype.onDestroy = function() {
    };
    ScrollbarPlugin2.prototype.onUpdate = function() {
    };
    ScrollbarPlugin2.prototype.onRender = function(_remainMomentum) {
    };
    ScrollbarPlugin2.prototype.transformDelta = function(delta, _evt) {
      return __assign({}, delta);
    };
    ScrollbarPlugin2.pluginName = "";
    ScrollbarPlugin2.defaultOptions = {};
    return ScrollbarPlugin2;
  }()
);
var globalPlugins = {
  order: /* @__PURE__ */ new Set(),
  constructors: {}
};
function addPlugins() {
  var Plugins = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    Plugins[_i] = arguments[_i];
  }
  Plugins.forEach(function(P) {
    var pluginName = P.pluginName;
    if (!pluginName) {
      throw new TypeError("plugin name is required");
    }
    globalPlugins.order.add(pluginName);
    globalPlugins.constructors[pluginName] = P;
  });
}
function initPlugins(scrollbar, options) {
  return Array.from(globalPlugins.order).filter(function(pluginName) {
    return options[pluginName] !== false;
  }).map(function(pluginName) {
    var Plugin = globalPlugins.constructors[pluginName];
    var instance = new Plugin(scrollbar, options[pluginName]);
    options[pluginName] = instance.options;
    return instance;
  });
}

// ../../node_modules/smooth-scrollbar/events/index.js
var events_exports = {};
__export(events_exports, {
  keyboardHandler: () => keyboardHandler,
  mouseHandler: () => mouseHandler,
  resizeHandler: () => resizeHandler,
  selectHandler: () => selectHandler,
  touchHandler: () => touchHandler,
  wheelHandler: () => wheelHandler
});

// ../../node_modules/smooth-scrollbar/events/keyboard.js
var KEY_CODE;
(function(KEY_CODE2) {
  KEY_CODE2[KEY_CODE2["TAB"] = 9] = "TAB";
  KEY_CODE2[KEY_CODE2["SPACE"] = 32] = "SPACE";
  KEY_CODE2[KEY_CODE2["PAGE_UP"] = 33] = "PAGE_UP";
  KEY_CODE2[KEY_CODE2["PAGE_DOWN"] = 34] = "PAGE_DOWN";
  KEY_CODE2[KEY_CODE2["END"] = 35] = "END";
  KEY_CODE2[KEY_CODE2["HOME"] = 36] = "HOME";
  KEY_CODE2[KEY_CODE2["LEFT"] = 37] = "LEFT";
  KEY_CODE2[KEY_CODE2["UP"] = 38] = "UP";
  KEY_CODE2[KEY_CODE2["RIGHT"] = 39] = "RIGHT";
  KEY_CODE2[KEY_CODE2["DOWN"] = 40] = "DOWN";
})(KEY_CODE || (KEY_CODE = {}));
function keyboardHandler(scrollbar) {
  var addEvent = eventScope(scrollbar);
  var container = scrollbar.containerEl;
  addEvent(container, "keydown", function(evt) {
    var activeElement = document.activeElement;
    if (activeElement !== container && !container.contains(activeElement)) {
      return;
    }
    if (isEditable(activeElement)) {
      return;
    }
    var delta = getKeyDelta(scrollbar, evt.keyCode || evt.which);
    if (!delta) {
      return;
    }
    var x = delta[0], y = delta[1];
    scrollbar.addTransformableMomentum(x, y, evt, function(willScroll) {
      if (willScroll) {
        evt.preventDefault();
      } else {
        scrollbar.containerEl.blur();
        if (scrollbar.parent) {
          scrollbar.parent.containerEl.focus();
        }
      }
    });
  });
}
function getKeyDelta(scrollbar, keyCode) {
  var size = scrollbar.size, limit = scrollbar.limit, offset = scrollbar.offset;
  switch (keyCode) {
    case KEY_CODE.TAB:
      return handleTabKey(scrollbar);
    case KEY_CODE.SPACE:
      return [0, 200];
    case KEY_CODE.PAGE_UP:
      return [0, -size.container.height + 40];
    case KEY_CODE.PAGE_DOWN:
      return [0, size.container.height - 40];
    case KEY_CODE.END:
      return [0, limit.y - offset.y];
    case KEY_CODE.HOME:
      return [0, -offset.y];
    case KEY_CODE.LEFT:
      return [-40, 0];
    case KEY_CODE.UP:
      return [0, -40];
    case KEY_CODE.RIGHT:
      return [40, 0];
    case KEY_CODE.DOWN:
      return [0, 40];
    default:
      return null;
  }
}
function handleTabKey(scrollbar) {
  requestAnimationFrame(function() {
    scrollbar.scrollIntoView(document.activeElement, {
      offsetTop: scrollbar.size.container.height / 2,
      offsetLeft: scrollbar.size.container.width / 2,
      onlyScrollIfNeeded: true
    });
  });
}
function isEditable(elem) {
  if (elem.tagName === "INPUT" || elem.tagName === "SELECT" || elem.tagName === "TEXTAREA" || elem.isContentEditable) {
    return !elem.disabled;
  }
  return false;
}

// ../../node_modules/smooth-scrollbar/events/mouse.js
var Direction;
(function(Direction2) {
  Direction2[Direction2["X"] = 0] = "X";
  Direction2[Direction2["Y"] = 1] = "Y";
})(Direction || (Direction = {}));
function mouseHandler(scrollbar) {
  var addEvent = eventScope(scrollbar);
  var container = scrollbar.containerEl;
  var _a = scrollbar.track, xAxis = _a.xAxis, yAxis = _a.yAxis;
  function calcMomentum2(direction, clickPosition) {
    var size = scrollbar.size, limit = scrollbar.limit, offset = scrollbar.offset;
    if (direction === Direction.X) {
      var totalWidth = size.container.width + (xAxis.thumb.realSize - xAxis.thumb.displaySize);
      return clamp(clickPosition / totalWidth * size.content.width, 0, limit.x) - offset.x;
    }
    if (direction === Direction.Y) {
      var totalHeight = size.container.height + (yAxis.thumb.realSize - yAxis.thumb.displaySize);
      return clamp(clickPosition / totalHeight * size.content.height, 0, limit.y) - offset.y;
    }
    return 0;
  }
  function getTrackDirection(elem) {
    if (isOneOf(elem, [xAxis.element, xAxis.thumb.element])) {
      return Direction.X;
    }
    if (isOneOf(elem, [yAxis.element, yAxis.thumb.element])) {
      return Direction.Y;
    }
    return void 0;
  }
  var isMouseDown;
  var isMouseMoving;
  var startOffsetToThumb;
  var trackDirection;
  var containerRect;
  addEvent(container, "click", function(evt) {
    if (isMouseMoving || !isOneOf(evt.target, [xAxis.element, yAxis.element])) {
      return;
    }
    var track = evt.target;
    var direction = getTrackDirection(track);
    var rect = track.getBoundingClientRect();
    var clickPos = getPosition(evt);
    if (direction === Direction.X) {
      var offsetOnTrack = clickPos.x - rect.left - xAxis.thumb.displaySize / 2;
      scrollbar.setMomentum(calcMomentum2(direction, offsetOnTrack), 0);
    }
    if (direction === Direction.Y) {
      var offsetOnTrack = clickPos.y - rect.top - yAxis.thumb.displaySize / 2;
      scrollbar.setMomentum(0, calcMomentum2(direction, offsetOnTrack));
    }
  });
  addEvent(container, "mousedown", function(evt) {
    if (!isOneOf(evt.target, [xAxis.thumb.element, yAxis.thumb.element])) {
      return;
    }
    isMouseDown = true;
    var thumb = evt.target;
    var cursorPos = getPosition(evt);
    var thumbRect = thumb.getBoundingClientRect();
    trackDirection = getTrackDirection(thumb);
    startOffsetToThumb = {
      x: cursorPos.x - thumbRect.left,
      y: cursorPos.y - thumbRect.top
    };
    containerRect = container.getBoundingClientRect();
    setStyle(scrollbar.containerEl, {
      "-user-select": "none"
    });
  });
  addEvent(window, "mousemove", function(evt) {
    if (!isMouseDown)
      return;
    isMouseMoving = true;
    var cursorPos = getPosition(evt);
    if (trackDirection === Direction.X) {
      var offsetOnTrack = cursorPos.x - startOffsetToThumb.x - containerRect.left;
      scrollbar.setMomentum(calcMomentum2(trackDirection, offsetOnTrack), 0);
    }
    if (trackDirection === Direction.Y) {
      var offsetOnTrack = cursorPos.y - startOffsetToThumb.y - containerRect.top;
      scrollbar.setMomentum(0, calcMomentum2(trackDirection, offsetOnTrack));
    }
  });
  addEvent(window, "mouseup blur", function() {
    isMouseDown = isMouseMoving = false;
    setStyle(scrollbar.containerEl, {
      "-user-select": ""
    });
  });
}

// ../../node_modules/smooth-scrollbar/events/resize.js
function resizeHandler(scrollbar) {
  var addEvent = eventScope(scrollbar);
  addEvent(window, "resize", debounce(scrollbar.update.bind(scrollbar), 300));
}

// ../../node_modules/smooth-scrollbar/events/select.js
function selectHandler(scrollbar) {
  var addEvent = eventScope(scrollbar);
  var containerEl = scrollbar.containerEl, contentEl = scrollbar.contentEl;
  var isSelected = false;
  var isContextMenuOpened = false;
  var animationID;
  function scroll(_a) {
    var x = _a.x, y = _a.y;
    if (!x && !y)
      return;
    var offset = scrollbar.offset, limit = scrollbar.limit;
    scrollbar.setMomentum(clamp(offset.x + x, 0, limit.x) - offset.x, clamp(offset.y + y, 0, limit.y) - offset.y);
    animationID = requestAnimationFrame(function() {
      scroll({ x, y });
    });
  }
  addEvent(window, "mousemove", function(evt) {
    if (!isSelected)
      return;
    cancelAnimationFrame(animationID);
    var dir = calcMomentum(scrollbar, evt);
    scroll(dir);
  });
  addEvent(contentEl, "contextmenu", function() {
    isContextMenuOpened = true;
    cancelAnimationFrame(animationID);
    isSelected = false;
  });
  addEvent(contentEl, "mousedown", function() {
    isContextMenuOpened = false;
  });
  addEvent(contentEl, "selectstart", function() {
    if (isContextMenuOpened) {
      return;
    }
    cancelAnimationFrame(animationID);
    isSelected = true;
  });
  addEvent(window, "mouseup blur", function() {
    cancelAnimationFrame(animationID);
    isSelected = false;
    isContextMenuOpened = false;
  });
  addEvent(containerEl, "scroll", function(evt) {
    evt.preventDefault();
    containerEl.scrollTop = containerEl.scrollLeft = 0;
  });
}
function calcMomentum(scrollbar, evt) {
  var _a = scrollbar.bounding, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
  var _b = getPosition(evt), x = _b.x, y = _b.y;
  var res = {
    x: 0,
    y: 0
  };
  var padding = 20;
  if (x === 0 && y === 0)
    return res;
  if (x > right - padding) {
    res.x = x - right + padding;
  } else if (x < left + padding) {
    res.x = x - left - padding;
  }
  if (y > bottom - padding) {
    res.y = y - bottom + padding;
  } else if (y < top + padding) {
    res.y = y - top - padding;
  }
  res.x *= 2;
  res.y *= 2;
  return res;
}

// ../../node_modules/smooth-scrollbar/events/touch.js
var activeScrollbar;
function touchHandler(scrollbar) {
  var target = scrollbar.options.delegateTo || scrollbar.containerEl;
  var touchRecord = new TouchRecord();
  var addEvent = eventScope(scrollbar);
  var damping;
  var pointerCount = 0;
  addEvent(target, "touchstart", function(evt) {
    touchRecord.track(evt);
    scrollbar.setMomentum(0, 0);
    if (pointerCount === 0) {
      damping = scrollbar.options.damping;
      scrollbar.options.damping = Math.max(damping, 0.5);
    }
    pointerCount++;
  });
  addEvent(target, "touchmove", function(evt) {
    if (activeScrollbar && activeScrollbar !== scrollbar)
      return;
    touchRecord.update(evt);
    var _a = touchRecord.getDelta(), x = _a.x, y = _a.y;
    scrollbar.addTransformableMomentum(x, y, evt, function(willScroll) {
      if (willScroll && evt.cancelable) {
        evt.preventDefault();
        activeScrollbar = scrollbar;
      }
    });
  });
  addEvent(target, "touchcancel touchend", function(evt) {
    var delta = touchRecord.getEasingDistance(damping);
    scrollbar.addTransformableMomentum(delta.x, delta.y, evt);
    pointerCount--;
    if (pointerCount === 0) {
      scrollbar.options.damping = damping;
    }
    touchRecord.release(evt);
    activeScrollbar = null;
  });
}

// ../../node_modules/smooth-scrollbar/events/wheel.js
function wheelHandler(scrollbar) {
  var addEvent = eventScope(scrollbar);
  var target = scrollbar.options.delegateTo || scrollbar.containerEl;
  var eventName = "onwheel" in window || document.implementation.hasFeature("Events.wheel", "3.0") ? "wheel" : "mousewheel";
  addEvent(target, eventName, function(evt) {
    var _a = normalizeDelta(evt), x = _a.x, y = _a.y;
    scrollbar.addTransformableMomentum(x, y, evt, function(willScroll) {
      if (willScroll) {
        evt.preventDefault();
      }
    });
  });
}
var DELTA_SCALE = {
  STANDARD: 1,
  OTHERS: -3
};
var DELTA_MODE = [1, 28, 500];
var getDeltaMode = function(mode) {
  return DELTA_MODE[mode] || DELTA_MODE[0];
};
function normalizeDelta(evt) {
  if ("deltaX" in evt) {
    var mode = getDeltaMode(evt.deltaMode);
    return {
      x: evt.deltaX / DELTA_SCALE.STANDARD * mode,
      y: evt.deltaY / DELTA_SCALE.STANDARD * mode
    };
  }
  if ("wheelDeltaX" in evt) {
    return {
      x: evt.wheelDeltaX / DELTA_SCALE.OTHERS,
      y: evt.wheelDeltaY / DELTA_SCALE.OTHERS
    };
  }
  return {
    x: 0,
    y: evt.wheelDelta / DELTA_SCALE.OTHERS
  };
}

// ../../node_modules/smooth-scrollbar/scrollbar.js
var scrollbarMap = /* @__PURE__ */ new Map();
var Scrollbar = (
  /** @class */
  function() {
    function Scrollbar2(containerEl, options) {
      var _this = this;
      this.offset = {
        x: 0,
        y: 0
      };
      this.limit = {
        x: Infinity,
        y: Infinity
      };
      this.bounding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      this._plugins = [];
      this._momentum = { x: 0, y: 0 };
      this._listeners = /* @__PURE__ */ new Set();
      this.containerEl = containerEl;
      var contentEl = this.contentEl = document.createElement("div");
      this.options = new Options(options);
      containerEl.setAttribute("data-scrollbar", "true");
      containerEl.setAttribute("tabindex", "-1");
      setStyle(containerEl, {
        overflow: "hidden",
        outline: "none"
      });
      if (window.navigator.msPointerEnabled) {
        containerEl.style.msTouchAction = "none";
      }
      contentEl.className = "scroll-content";
      Array.from(containerEl.childNodes).forEach(function(node) {
        contentEl.appendChild(node);
      });
      containerEl.appendChild(contentEl);
      this.track = new TrackController(this);
      this.size = this.getSize();
      this._plugins = initPlugins(this, this.options.plugins);
      var scrollLeft = containerEl.scrollLeft, scrollTop = containerEl.scrollTop;
      containerEl.scrollLeft = containerEl.scrollTop = 0;
      this.setPosition(scrollLeft, scrollTop, {
        withoutCallbacks: true
      });
      var ResizeObserver = window.ResizeObserver;
      if (typeof ResizeObserver === "function") {
        this._observer = new ResizeObserver(function() {
          _this.update();
        });
        this._observer.observe(contentEl);
      }
      scrollbarMap.set(containerEl, this);
      requestAnimationFrame(function() {
        _this._init();
      });
    }
    Object.defineProperty(Scrollbar2.prototype, "parent", {
      /**
       * Parent scrollbar
       */
      get: function() {
        var elem = this.containerEl.parentElement;
        while (elem) {
          var parentScrollbar = scrollbarMap.get(elem);
          if (parentScrollbar) {
            return parentScrollbar;
          }
          elem = elem.parentElement;
        }
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Scrollbar2.prototype, "scrollTop", {
      /**
       * Gets or sets `scrollbar.offset.y`
       */
      get: function() {
        return this.offset.y;
      },
      set: function(y) {
        this.setPosition(this.scrollLeft, y);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Scrollbar2.prototype, "scrollLeft", {
      /**
       * Gets or sets `scrollbar.offset.x`
       */
      get: function() {
        return this.offset.x;
      },
      set: function(x) {
        this.setPosition(x, this.scrollTop);
      },
      enumerable: true,
      configurable: true
    });
    Scrollbar2.prototype.getSize = function() {
      return getSize(this);
    };
    Scrollbar2.prototype.update = function() {
      update(this);
      this._plugins.forEach(function(plugin) {
        plugin.onUpdate();
      });
    };
    Scrollbar2.prototype.isVisible = function(elem) {
      return isVisible(this, elem);
    };
    Scrollbar2.prototype.setPosition = function(x, y, options) {
      var _this = this;
      if (x === void 0) {
        x = this.offset.x;
      }
      if (y === void 0) {
        y = this.offset.y;
      }
      if (options === void 0) {
        options = {};
      }
      var status = setPosition(this, x, y);
      if (!status || options.withoutCallbacks) {
        return;
      }
      this._listeners.forEach(function(fn) {
        fn.call(_this, status);
      });
    };
    Scrollbar2.prototype.scrollTo = function(x, y, duration, options) {
      if (x === void 0) {
        x = this.offset.x;
      }
      if (y === void 0) {
        y = this.offset.y;
      }
      if (duration === void 0) {
        duration = 0;
      }
      if (options === void 0) {
        options = {};
      }
      scrollTo(this, x, y, duration, options);
    };
    Scrollbar2.prototype.scrollIntoView = function(elem, options) {
      if (options === void 0) {
        options = {};
      }
      scrollIntoView(this, elem, options);
    };
    Scrollbar2.prototype.addListener = function(fn) {
      if (typeof fn !== "function") {
        throw new TypeError("[smooth-scrollbar] scrolling listener should be a function");
      }
      this._listeners.add(fn);
    };
    Scrollbar2.prototype.removeListener = function(fn) {
      this._listeners.delete(fn);
    };
    Scrollbar2.prototype.addTransformableMomentum = function(x, y, fromEvent, callback) {
      this._updateDebounced();
      var finalDelta = this._plugins.reduce(function(delta, plugin) {
        return plugin.transformDelta(delta, fromEvent) || delta;
      }, { x, y });
      var willScroll = !this._shouldPropagateMomentum(finalDelta.x, finalDelta.y);
      if (willScroll) {
        this.addMomentum(finalDelta.x, finalDelta.y);
      }
      if (callback) {
        callback.call(this, willScroll);
      }
    };
    Scrollbar2.prototype.addMomentum = function(x, y) {
      this.setMomentum(this._momentum.x + x, this._momentum.y + y);
    };
    Scrollbar2.prototype.setMomentum = function(x, y) {
      if (this.limit.x === 0) {
        x = 0;
      }
      if (this.limit.y === 0) {
        y = 0;
      }
      if (this.options.renderByPixels) {
        x = Math.round(x);
        y = Math.round(y);
      }
      this._momentum.x = x;
      this._momentum.y = y;
    };
    Scrollbar2.prototype.updatePluginOptions = function(pluginName, options) {
      this._plugins.forEach(function(plugin) {
        if (plugin.name === pluginName) {
          Object.assign(plugin.options, options);
        }
      });
    };
    Scrollbar2.prototype.destroy = function() {
      var _a = this, containerEl = _a.containerEl, contentEl = _a.contentEl;
      clearEventsOn(this);
      this._listeners.clear();
      this.setMomentum(0, 0);
      cancelAnimationFrame(this._renderID);
      if (this._observer) {
        this._observer.disconnect();
      }
      scrollbarMap.delete(this.containerEl);
      var childNodes = Array.from(contentEl.childNodes);
      while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
      }
      childNodes.forEach(function(el) {
        containerEl.appendChild(el);
      });
      setStyle(containerEl, {
        overflow: ""
      });
      containerEl.scrollTop = this.scrollTop;
      containerEl.scrollLeft = this.scrollLeft;
      this._plugins.forEach(function(plugin) {
        plugin.onDestroy();
      });
      this._plugins.length = 0;
    };
    Scrollbar2.prototype._init = function() {
      var _this = this;
      this.update();
      Object.keys(events_exports).forEach(function(prop) {
        events_exports[prop](_this);
      });
      this._plugins.forEach(function(plugin) {
        plugin.onInit();
      });
      this._render();
    };
    Scrollbar2.prototype._updateDebounced = function() {
      this.update();
    };
    Scrollbar2.prototype._shouldPropagateMomentum = function(deltaX, deltaY) {
      if (deltaX === void 0) {
        deltaX = 0;
      }
      if (deltaY === void 0) {
        deltaY = 0;
      }
      var _a = this, options = _a.options, offset = _a.offset, limit = _a.limit;
      if (!options.continuousScrolling)
        return false;
      if (limit.x === 0 && limit.y === 0) {
        this._updateDebounced();
      }
      var destX = clamp(deltaX + offset.x, 0, limit.x);
      var destY = clamp(deltaY + offset.y, 0, limit.y);
      var res = true;
      res = res && destX === offset.x;
      res = res && destY === offset.y;
      res = res && (offset.x === limit.x || offset.x === 0 || offset.y === limit.y || offset.y === 0);
      return res;
    };
    Scrollbar2.prototype._render = function() {
      var _momentum = this._momentum;
      if (_momentum.x || _momentum.y) {
        var nextX = this._nextTick("x");
        var nextY = this._nextTick("y");
        _momentum.x = nextX.momentum;
        _momentum.y = nextY.momentum;
        this.setPosition(nextX.position, nextY.position);
      }
      var remain = __assign({}, this._momentum);
      this._plugins.forEach(function(plugin) {
        plugin.onRender(remain);
      });
      this._renderID = requestAnimationFrame(this._render.bind(this));
    };
    Scrollbar2.prototype._nextTick = function(direction) {
      var _a = this, options = _a.options, offset = _a.offset, _momentum = _a._momentum;
      var current = offset[direction];
      var remain = _momentum[direction];
      if (Math.abs(remain) <= 0.1) {
        return {
          momentum: 0,
          position: current + remain
        };
      }
      var nextMomentum = remain * (1 - options.damping);
      if (options.renderByPixels) {
        nextMomentum |= 0;
      }
      return {
        momentum: nextMomentum,
        position: current + remain - nextMomentum
      };
    };
    __decorate([
      debounce2(100, true)
    ], Scrollbar2.prototype, "_updateDebounced", null);
    return Scrollbar2;
  }()
);

export {
  __extends,
  ScrollbarPlugin,
  addPlugins,
  scrollbarMap,
  Scrollbar
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chunk-ZYG2JE7L.js.map
