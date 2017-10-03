/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _color_picker = __webpack_require__(2);

var _color_picker2 = _interopRequireDefault(_color_picker);

var _easle = __webpack_require__(3);

var _easle2 = _interopRequireDefault(_easle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
				var bottomGUI = document.getElementById('bottom-gui');
				var colorPicker = new _color_picker2.default(bottomGUI);
				var easle = new _easle2.default({
								canvas: document.getElementById('canvas'),
								colorPicker: colorPicker
				});

				window.ColorPicker = colorPicker;
				window.Easle = easle;
});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorPicker = function () {
				function ColorPicker(colorContainer) {
								_classCallCheck(this, ColorPicker);

								this.colorContainer = colorContainer;
								this.configureContainer(colorContainer);

								this.subscribers = [];
								this.setSelected('black');
				}

				_createClass(ColorPicker, [{
								key: 'emit',
								value: function emit() {
												var _this = this;

												this.subscribers.forEach(function (s) {
																s(_this);
												});
								}
				}, {
								key: 'configureContainer',
								value: function configureContainer(container) {
												container.addEventListener('click', this.handleClick.bind(this));
								}
				}, {
								key: 'handleClick',
								value: function handleClick(e) {
												e.stopPropagation();
												var target = e.target;

												if (!target.classList.contains('gui-color')) return;

												this.removeSelected();
												this.setSelected(target.getAttribute('id'));
								}
				}, {
								key: 'setSelected',
								value: function setSelected(color) {
												this.color = color;
												var children = this.colorContainer.children;


												Array.prototype.find.call(children, function (c) {
																return c.getAttribute('id') == color;
												}).classList.add('selected');

												this.emit();
								}
				}, {
								key: 'removeSelected',
								value: function removeSelected() {
												Array.prototype.forEach.call(this.colorContainer.children, function (c) {
																return c.classList.remove('selected');
												});
								}
				}]);

				return ColorPicker;
}();

exports.default = ColorPicker;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOOL = {
  paintbrush: {
    type: "paintbrush",
    points: [],
    drawCircle: function drawCircle(_ref) {
      var canvas = _ref.canvas,
          color = _ref.color,
          x = _ref.x,
          y = _ref.y,
          radius = _ref.radius;

      var context = canvas.getContext('2d');

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    }
  }
};
var MOUSE = {
  x: 0, y: 0, isDown: false
};

var Easle = function () {
  function Easle(_ref2) {
    var _this = this;

    var canvas = _ref2.canvas,
        colorPicker = _ref2.colorPicker;

    _classCallCheck(this, Easle);

    this.canvas = canvas;
    this.resize();

    this.configureContainer(canvas);

    colorPicker.subscribers.push(function (cp) {
      return _this.color = cp.color;
    });
    this.color = colorPicker.color;
    this.radius = 10;
    this.tool = TOOL.paintbrush;
    this.mouse = MOUSE;
  }

  _createClass(Easle, [{
    key: 'configureContainer',
    value: function configureContainer(canvas) {
      var _this2 = this;

      canvas.addEventListener('mousedown', function (e) {
        return _this2.mouse.isDown = true;
      });
      ['mouseup', 'mouseleave', 'blur'].forEach(function (ev) {
        return canvas.addEventListener(ev, function (_) {
          _this2.mouse.isDown = false;
          _this2.tool.points = [];
        });
      });

      window.addEventListener('resize', function (e) {
        _this2.resize();
      });

      canvas.addEventListener('mousemove', function (e) {
        if (_this2.mouse.isDown) _this2.handleMouseMove(e);
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var x = e.clientX,
          y = e.clientY;
      var canvas = this.canvas,
          color = this.color,
          tool = this.tool,
          radius = this.radius;

      tool.points.push({ x: x, y: y });

      switch (tool.type) {
        case "paintbrush":
          if (tool.points.length < 2) tool.drawCircle({ canvas: canvas, color: color, x: x, y: y, radius: radius });else {
            var ipoints = [];

            tool.points.slice(1).forEach(function (p, i, a) {
              ipoints.push.apply(ipoints, _toConsumableArray((0, _util.interpolateBetweenPoints)(tool.points[i], p)));
            });

            ipoints.forEach(function (_ref3) {
              var x = _ref3.x,
                  y = _ref3.y;
              return tool.drawCircle({ canvas: canvas, color: color, x: x, y: y, radius: radius });
            });

            if (tool.points.length > 4) tool.points.shift();
          }
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight * 3 / 5;
    }
  }]);

  return Easle;
}();

exports.default = Easle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var interpolate = exports.interpolate = function interpolate(_ref) {
  var x = _ref.x,
      x0 = _ref.x0,
      y0 = _ref.y0,
      x1 = _ref.x1,
      y1 = _ref.y1;

  var numerator = y0 * (x1 - x) + y1 * (x - x0);
  var denominator = x1 - x0;

  return Math.floor(numerator / denominator);
};

var interpolateBetweenPoints = exports.interpolateBetweenPoints = function interpolateBetweenPoints(_ref2, _ref3) {
  var x0 = _ref2.x,
      y0 = _ref2.y;
  var x1 = _ref3.x,
      y1 = _ref3.y;

  var points = [];

  if (x0 > x1) {
    ;

    var _ref4 = [x1, y1, x0, y0];
    x0 = _ref4[0];
    y0 = _ref4[1];
    x1 = _ref4[2];
    y1 = _ref4[3];
  }var x = x0;

  while (x < x1) {
    x++;
    points.push({ x: x, y: interpolate({ x0: x0, y0: y0, x1: x1, y1: y1, x: x }) });
  }

  return points;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map