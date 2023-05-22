import {
  ScrollbarPlugin,
  __assign,
  __extends,
  clamp,
  debounce,
  setStyle
} from "./chunk-FBEJMNSL.js";
import "./chunk-4EOJPDL2.js";

// ../../node_modules/smooth-scrollbar/plugins/overscroll/bounce.js
var Bounce = (
  /** @class */
  function() {
    function Bounce2(_scrollbar) {
      this._scrollbar = _scrollbar;
    }
    Bounce2.prototype.render = function(_a) {
      var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
      var _d = this._scrollbar, size = _d.size, track = _d.track, offset = _d.offset, contentEl = _d.contentEl;
      setStyle(contentEl, {
        "-transform": "translate3d(" + -(offset.x + x) + "px, " + -(offset.y + y) + "px, 0)"
      });
      if (x) {
        track.xAxis.show();
        var scaleRatio = size.container.width / (size.container.width + Math.abs(x));
        setStyle(track.xAxis.thumb.element, {
          "-transform": "translate3d(" + track.xAxis.thumb.offset + "px, 0, 0) scale3d(" + scaleRatio + ", 1, 1)",
          "-transform-origin": x < 0 ? "left" : "right"
        });
      }
      if (y) {
        track.yAxis.show();
        var scaleRatio = size.container.height / (size.container.height + Math.abs(y));
        setStyle(track.yAxis.thumb.element, {
          "-transform": "translate3d(0, " + track.yAxis.thumb.offset + "px, 0) scale3d(1, " + scaleRatio + ", 1)",
          "-transform-origin": y < 0 ? "top" : "bottom"
        });
      }
      track.autoHideOnIdle();
    };
    return Bounce2;
  }()
);

// ../../node_modules/smooth-scrollbar/plugins/overscroll/glow.js
var GLOW_MAX_OPACITY = 0.75;
var GLOW_MAX_OFFSET = 0.25;
var Glow = (
  /** @class */
  function() {
    function Glow2(_scrollbar) {
      this._scrollbar = _scrollbar;
      this._canvas = document.createElement("canvas");
      this._ctx = this._canvas.getContext("2d");
      setStyle(this._canvas, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "none"
      });
    }
    Glow2.prototype.mount = function() {
      this._scrollbar.containerEl.appendChild(this._canvas);
    };
    Glow2.prototype.unmount = function() {
      if (this._canvas.parentNode) {
        this._canvas.parentNode.removeChild(this._canvas);
      }
    };
    Glow2.prototype.adjust = function() {
      var size = this._scrollbar.size;
      var DPR = window.devicePixelRatio || 1;
      var nextWidth = size.container.width * DPR;
      var nextHeight = size.container.height * DPR;
      if (nextWidth === this._canvas.width && nextHeight === this._canvas.height) {
        return;
      }
      this._canvas.width = nextWidth;
      this._canvas.height = nextHeight;
      this._ctx.scale(DPR, DPR);
    };
    Glow2.prototype.recordTouch = function(event) {
      var touch = event.touches[event.touches.length - 1];
      this._touchX = touch.clientX;
      this._touchY = touch.clientY;
    };
    Glow2.prototype.render = function(_a, color) {
      var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
      if (!x && !y) {
        setStyle(this._canvas, {
          display: "none"
        });
        return;
      }
      setStyle(this._canvas, {
        display: "block"
      });
      var size = this._scrollbar.size;
      this._ctx.clearRect(0, 0, size.container.width, size.container.height);
      this._ctx.fillStyle = color;
      this._renderX(x);
      this._renderY(y);
    };
    Glow2.prototype._getMaxOverscroll = function() {
      var options = this._scrollbar.options.plugins.overscroll;
      return options && options.maxOverscroll ? options.maxOverscroll : 150;
    };
    Glow2.prototype._renderX = function(strength) {
      var size = this._scrollbar.size;
      var maxOverscroll = this._getMaxOverscroll();
      var _a = size.container, width = _a.width, height = _a.height;
      var ctx = this._ctx;
      ctx.save();
      if (strength > 0) {
        ctx.transform(-1, 0, 0, 1, width, 0);
      }
      var opacity = clamp(Math.abs(strength) / maxOverscroll, 0, GLOW_MAX_OPACITY);
      var startOffset = clamp(opacity, 0, GLOW_MAX_OFFSET) * width;
      var x = Math.abs(strength);
      var y = this._touchY || height / 2;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(0, -startOffset);
      ctx.quadraticCurveTo(x, y, 0, height + startOffset);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };
    Glow2.prototype._renderY = function(strength) {
      var size = this._scrollbar.size;
      var maxOverscroll = this._getMaxOverscroll();
      var _a = size.container, width = _a.width, height = _a.height;
      var ctx = this._ctx;
      ctx.save();
      if (strength > 0) {
        ctx.transform(1, 0, 0, -1, 0, height);
      }
      var opacity = clamp(Math.abs(strength) / maxOverscroll, 0, GLOW_MAX_OPACITY);
      var startOffset = clamp(opacity, 0, GLOW_MAX_OFFSET) * width;
      var x = this._touchX || width / 2;
      var y = Math.abs(strength);
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(-startOffset, 0);
      ctx.quadraticCurveTo(x, y, width + startOffset, 0);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };
    return Glow2;
  }()
);

// ../../node_modules/smooth-scrollbar/plugins/overscroll/index.js
var OverscrollEffect;
(function(OverscrollEffect2) {
  OverscrollEffect2["BOUNCE"] = "bounce";
  OverscrollEffect2["GLOW"] = "glow";
})(OverscrollEffect || (OverscrollEffect = {}));
var ALLOWED_EVENTS = /wheel|touch/;
var OverscrollPlugin = (
  /** @class */
  function(_super) {
    __extends(OverscrollPlugin2, _super);
    function OverscrollPlugin2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._glow = new Glow(_this.scrollbar);
      _this._bounce = new Bounce(_this.scrollbar);
      _this._wheelScrollBack = {
        x: false,
        y: false
      };
      _this._lockWheel = {
        x: false,
        y: false
      };
      _this._touching = false;
      _this._amplitude = {
        x: 0,
        y: 0
      };
      _this._position = {
        x: 0,
        y: 0
      };
      _this._releaseWheel = debounce(function() {
        _this._lockWheel.x = false;
        _this._lockWheel.y = false;
      }, 30);
      return _this;
    }
    Object.defineProperty(OverscrollPlugin2.prototype, "_isWheelLocked", {
      get: function() {
        return this._lockWheel.x || this._lockWheel.y;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(OverscrollPlugin2.prototype, "_enabled", {
      get: function() {
        return !!this.options.effect;
      },
      enumerable: true,
      configurable: true
    });
    OverscrollPlugin2.prototype.onInit = function() {
      var _a = this, _glow = _a._glow, options = _a.options, scrollbar = _a.scrollbar;
      var effect = options.effect;
      Object.defineProperty(options, "effect", {
        get: function() {
          return effect;
        },
        set: function(val) {
          if (!val) {
            effect = void 0;
            return;
          }
          if (val !== OverscrollEffect.BOUNCE && val !== OverscrollEffect.GLOW) {
            throw new TypeError("unknow overscroll effect: " + val);
          }
          effect = val;
          scrollbar.options.continuousScrolling = false;
          if (val === OverscrollEffect.GLOW) {
            _glow.mount();
            _glow.adjust();
          } else {
            _glow.unmount();
          }
        }
      });
      options.effect = effect;
    };
    OverscrollPlugin2.prototype.onUpdate = function() {
      if (this.options.effect === OverscrollEffect.GLOW) {
        this._glow.adjust();
      }
    };
    OverscrollPlugin2.prototype.onRender = function(remainMomentum) {
      if (!this._enabled) {
        return;
      }
      if (this.scrollbar.options.continuousScrolling) {
        this.scrollbar.options.continuousScrolling = false;
      }
      var nextX = remainMomentum.x, nextY = remainMomentum.y;
      if (!this._amplitude.x && this._willOverscroll("x", remainMomentum.x)) {
        nextX = 0;
        this._absorbMomentum("x", remainMomentum.x);
      }
      if (!this._amplitude.y && this._willOverscroll("y", remainMomentum.y)) {
        nextY = 0;
        this._absorbMomentum("y", remainMomentum.y);
      }
      this.scrollbar.setMomentum(nextX, nextY);
      this._render();
    };
    OverscrollPlugin2.prototype.transformDelta = function(delta, fromEvent) {
      this._lastEventType = fromEvent.type;
      if (!this._enabled || !ALLOWED_EVENTS.test(fromEvent.type)) {
        return delta;
      }
      if (this._isWheelLocked && /wheel/.test(fromEvent.type)) {
        this._releaseWheel();
        if (this._willOverscroll("x", delta.x)) {
          delta.x = 0;
        }
        if (this._willOverscroll("y", delta.y)) {
          delta.y = 0;
        }
      }
      var nextX = delta.x, nextY = delta.y;
      if (this._willOverscroll("x", delta.x)) {
        nextX = 0;
        this._addAmplitude("x", delta.x);
      }
      if (this._willOverscroll("y", delta.y)) {
        nextY = 0;
        this._addAmplitude("y", delta.y);
      }
      switch (fromEvent.type) {
        case "touchstart":
        case "touchmove":
          this._touching = true;
          this._glow.recordTouch(fromEvent);
          break;
        case "touchcancel":
        case "touchend":
          this._touching = false;
          break;
      }
      return {
        x: nextX,
        y: nextY
      };
    };
    OverscrollPlugin2.prototype._willOverscroll = function(direction, delta) {
      if (!delta) {
        return false;
      }
      if (this._position[direction]) {
        return true;
      }
      var offset = this.scrollbar.offset[direction];
      var limit = this.scrollbar.limit[direction];
      if (limit === 0) {
        return false;
      }
      return clamp(offset + delta, 0, limit) === offset && (offset === 0 || offset === limit);
    };
    OverscrollPlugin2.prototype._absorbMomentum = function(direction, remainMomentum) {
      var _a = this, options = _a.options, _lastEventType = _a._lastEventType, _amplitude = _a._amplitude;
      if (!ALLOWED_EVENTS.test(_lastEventType)) {
        return;
      }
      _amplitude[direction] = clamp(remainMomentum, -options.maxOverscroll, options.maxOverscroll);
    };
    OverscrollPlugin2.prototype._addAmplitude = function(direction, delta) {
      var _a = this, options = _a.options, scrollbar = _a.scrollbar, _amplitude = _a._amplitude, _position = _a._position;
      var currentAmp = _amplitude[direction];
      var isOpposite = delta * currentAmp < 0;
      var friction;
      if (isOpposite) {
        friction = 0;
      } else {
        friction = this._wheelScrollBack[direction] ? 1 : Math.abs(currentAmp / options.maxOverscroll);
      }
      var amp = currentAmp + delta * (1 - friction);
      _amplitude[direction] = scrollbar.offset[direction] === 0 ? (
        /*    top | left  */
        clamp(amp, -options.maxOverscroll, 0)
      ) : (
        /* bottom | right */
        clamp(amp, 0, options.maxOverscroll)
      );
      if (isOpposite) {
        _position[direction] = _amplitude[direction];
      }
    };
    OverscrollPlugin2.prototype._render = function() {
      var _a = this, options = _a.options, _amplitude = _a._amplitude, _position = _a._position;
      if (this._enabled && (_amplitude.x || _amplitude.y || _position.x || _position.y)) {
        var nextX = this._nextAmp("x");
        var nextY = this._nextAmp("y");
        _amplitude.x = nextX.amplitude;
        _position.x = nextX.position;
        _amplitude.y = nextY.amplitude;
        _position.y = nextY.position;
        switch (options.effect) {
          case OverscrollEffect.BOUNCE:
            this._bounce.render(_position);
            break;
          case OverscrollEffect.GLOW:
            this._glow.render(_position, this.options.glowColor);
            break;
        }
        if (typeof options.onScroll === "function") {
          options.onScroll.call(this, __assign({}, _position));
        }
      }
    };
    OverscrollPlugin2.prototype._nextAmp = function(direction) {
      var _a = this, options = _a.options, _amplitude = _a._amplitude, _position = _a._position;
      var t = 1 - options.damping;
      var amp = _amplitude[direction];
      var pos = _position[direction];
      var nextAmp = this._touching ? amp : amp * t | 0;
      var distance = nextAmp - pos;
      var nextPos = pos + distance - (distance * t | 0);
      if (!this._touching && Math.abs(nextPos) < Math.abs(pos)) {
        this._wheelScrollBack[direction] = true;
      }
      if (this._wheelScrollBack[direction] && Math.abs(nextPos) <= 1) {
        this._wheelScrollBack[direction] = false;
        this._lockWheel[direction] = true;
      }
      return {
        amplitude: nextAmp,
        position: nextPos
      };
    };
    OverscrollPlugin2.pluginName = "overscroll";
    OverscrollPlugin2.defaultOptions = {
      effect: OverscrollEffect.BOUNCE,
      onScroll: void 0,
      damping: 0.2,
      maxOverscroll: 150,
      glowColor: "#87ceeb"
    };
    return OverscrollPlugin2;
  }(ScrollbarPlugin)
);
var overscroll_default = OverscrollPlugin;
export {
  OverscrollEffect,
  overscroll_default as default
};
//# sourceMappingURL=smooth-scrollbar_plugins_overscroll.js.map
