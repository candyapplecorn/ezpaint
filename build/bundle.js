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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var interpolateY = function interpolateY(_ref) {
  var x = _ref.x,
      x0 = _ref.x0,
      y0 = _ref.y0,
      x1 = _ref.x1,
      y1 = _ref.y1;

  var numerator = y0 * (x1 - x) + y1 * (x - x0);
  var denominator = x1 - x0;

  return Math.floor(numerator / denominator);
};
var interpolateX = function interpolateX(_ref2) {
  var x0 = _ref2.x0,
      y0 = _ref2.y0,
      x1 = _ref2.x1,
      y1 = _ref2.y1,
      y = _ref2.y;

  var numerator = (y - y0) * (x1 - x0);
  var denominator = y1 - y0;

  return Math.floor(numerator / denominator) + x0;
};

var interpolateBetweenPoints = exports.interpolateBetweenPoints = function interpolateBetweenPoints(_ref3, _ref4) {
  var x0 = _ref3.x,
      y0 = _ref3.y;
  var x1 = _ref4.x,
      y1 = _ref4.y;

  var points = [];
  var dx = Math.abs(x0 - x1),
      dy = Math.abs(y0 - y1);

  if (dx > dy) {
    if (x0 > x1) {
      ;

      var _ref5 = [x1, y1, x0, y0];
      x0 = _ref5[0];
      y0 = _ref5[1];
      x1 = _ref5[2];
      y1 = _ref5[3];
    }var x = x0;

    while (x < x1) {
      x++;
      points.push({ x: x, y: interpolateY({ x0: x0, y0: y0, x1: x1, y1: y1, x: x }) });
    }
  } else {
    if (y0 > y1) {
      ;

      var _ref6 = [x1, y1, x0, y0];
      x0 = _ref6[0];
      y0 = _ref6[1];
      x1 = _ref6[2];
      y1 = _ref6[3];
    }var y = y0;

    while (y < y1) {
      y++;
      points.push({ y: y, x: interpolateX({ x0: x0, y0: y0, x1: x1, y1: y1, y: y }) });
    }
  }

  return points;
};
var sameArray = exports.sameArray = function sameArray(a, a2) {
  return a.reduce(function (a, c, i) {
    if (!a) return a;
    if (c != a2[i]) return false;
    return a;
  }, true) && a.length == a2.length;
};

// Given a coordinate, retrieves the RGBA array at it
var coordToColor = exports.coordToColor = function coordToColor(_ref7) {
  var imageData = _ref7.imageData,
      x = _ref7.x,
      y = _ref7.y;

  return [imageData.data[y * (imageData.width * 4) + x * 4 + 0], imageData.data[y * (imageData.width * 4) + x * 4 + 1], imageData.data[y * (imageData.width * 4) + x * 4 + 2], imageData.data[y * (imageData.width * 4) + x * 4 + 3]];
};

// Given a coordinate, sets the imageData @ that to COLOR
var setCoordToColor = exports.setCoordToColor = function setCoordToColor(_ref8) {
  var imageData = _ref8.imageData,
      x = _ref8.x,
      y = _ref8.y,
      color = _ref8.color;
  return color.forEach(function (_, i) {
    return imageData.data[y * (imageData.width * 4) + x * 4 + i] = color[i];
  });
};

var toggleCursor = exports.toggleCursor = function toggleCursor(action) {
  var _document = document,
      body = _document.body;

  var canvas = document.getElementById('canvas');

  body.style.cursor = action == "WAIT" ? "wait" : "";
  canvas.style.cursor = action == "WAIT" ? "wait" : "";
};

var addMatricies = exports.addMatricies = function addMatricies(m1, m2) {
  return m1.reduce(function (a, c, i) {
    return a.push(m1[i] + m2[i]), a;
  }, []);
};
var subtractMatricies = exports.subtractMatricies = function subtractMatricies(m1, m2) {
  return m1.reduce(function (a, c, i) {
    return a.push(m1[i] - m2[i]), a;
  }, []);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _subscribable_slider = __webpack_require__(2);

var _subscribable_slider2 = _interopRequireDefault(_subscribable_slider);

var _selectable_list = __webpack_require__(3);

var _selectable_list2 = _interopRequireDefault(_selectable_list);

var _easle = __webpack_require__(4);

var _easle2 = _interopRequireDefault(_easle);

var _splash = __webpack_require__(7);

var _splash2 = _interopRequireDefault(_splash);

var _clear = __webpack_require__(8);

var _clear2 = _interopRequireDefault(_clear);

var _download = __webpack_require__(9);

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function (e) {
				var bottomGUI = document.getElementById('bottom-gui');
				var topGUI = document.querySelector('#brush-types');
				var toolSize = document.querySelector('input[type="range"]');

				var colorPicker = new _selectable_list2.default(bottomGUI, 'gui-color', 'black');
				var toolPicker = new _selectable_list2.default(topGUI, 'brush-type', 'circle');
				var slider = new _subscribable_slider2.default(toolSize);

				var easle = new _easle2.default({
								canvas: document.getElementById('canvas'),
								colorPicker: colorPicker,
								toolPicker: toolPicker,
								slider: slider
				});

				// Add event listeners to splash screen so it may be closed.
				(0, _splash2.default)();
				new _clear2.default(easle.clear.bind(easle));
				new _download2.default();

				window.ColorPicker = colorPicker;
				window.Easle = easle;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscribableSlider = function () {
  function SubscribableSlider($input) {
    _classCallCheck(this, SubscribableSlider);

    this.input = $input;
    this.subscribers = [];
    $input.addEventListener('change', this.onChange.bind(this));
    this.value = $input.value;
    this.configureContainer();
  }

  _createClass(SubscribableSlider, [{
    key: 'configureContainer',
    value: function configureContainer() {
      var _this = this;

      var input = this.input;


      document.getElementById('small').addEventListener('click', function (e) {
        input.value = "10";
        _this.onChange({ target: { value: input.value } });
      });

      document.getElementById('large').addEventListener('click', function (e) {
        input.value = "50";
        _this.onChange({ target: { value: input.value } });
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.value = e.target.value;
      this.emit();
    }
  }, {
    key: 'emit',
    value: function emit() {
      var _this2 = this;

      this.subscribers.forEach(function (s) {
        s(_this2);
      });
    }
  }]);

  return SubscribableSlider;
}();

exports.default = SubscribableSlider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectableList = function () {
	function SelectableList(container, className, initSelect) {
		_classCallCheck(this, SelectableList);

		this.container = container;
		this.configureContainer(container);

		this.subscribers = [];
		this.setSelected(initSelect);
		this.className = className;
	}

	_createClass(SelectableList, [{
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
			var target = e.target,
			    parentElement = e.target.parentElement;


			if (parentElement.classList.contains(this.className)) target = parentElement;else if (!target.classList.contains(this.className)) return;

			this.removeSelected();
			this.setSelected(target.getAttribute('id'));
		}
	}, {
		key: 'setSelected',
		value: function setSelected(value) {
			this.value = value;
			var children = this.container.children;


			Array.prototype.find.call(children, function (c) {
				return c.getAttribute('id') == value;
			}).classList.add('selected');

			this.emit();
		}
	}, {
		key: 'removeSelected',
		value: function removeSelected() {
			Array.prototype.forEach.call(this.container.children, function (c) {
				return c.classList.remove('selected');
			});
		}
	}]);

	return SelectableList;
}();

exports.default = SelectableList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _tools = __webpack_require__(5);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOUSE = {
  x: 0, y: 0, isDown: false
};

var Easle = function () {
  function Easle(_ref) {
    var _this = this;

    var canvas = _ref.canvas,
        colorPicker = _ref.colorPicker,
        toolPicker = _ref.toolPicker,
        slider = _ref.slider;

    _classCallCheck(this, Easle);

    this.canvas = canvas;
    this.resize();

    this.configureContainer(canvas);

    toolPicker.subscribers.push(function (tp) {
      return _this.toolType = tp.value;
    });
    this.toolType = toolPicker.value;
    colorPicker.subscribers.push(function (cp) {
      return _this.color = cp.value;
    });
    this.color = colorPicker.value;
    slider.subscribers.push(function (sl) {
      return _this.radius = Number(sl.value);
    });
    this.radius = Number(slider.value);

    this.tool = _tools2.default; //.paintbrush
    this.mouse = MOUSE;
    this.brushType = "circle";
  }

  _createClass(Easle, [{
    key: 'configureContainer',
    value: function configureContainer(canvas) {
      var _this2 = this;

      ['touchstart', 'mousedown'].forEach(function (ev) {
        return canvas.addEventListener(ev, function (e) {
          _this2.mouse.isDown = true;
          _this2.handleMouseMove(e);

          if (_this2.interval == undefined) _this2.interval = window.setInterval(_this2.tool.spray.bind(_this2, {
            canvas: _this2.canvas, color: _this2.color,
            x: e.layerX, y: e.layerY, radius: _this2.radius
          }), 200);
        });
      });

      ['mouseup', 'mouseleave', 'blur', 'touchend'].forEach(function (ev) {
        return document.addEventListener(ev, function (_) {
          _this2.mouse.isDown = false;
          _this2.tool.points = [];

          _this2.interval && window.clearInterval(_this2.interval);
          delete _this2.interval;
        });
      });

      window.addEventListener('resize', this.resize.bind(this));

      ['mousemove', 'touchmove'].forEach(function (ev) {
        return canvas.addEventListener(ev, function (e) {
          if (_this2.mouse.isDown) _this2.handleMouseMove(e);

          _this2.interval && window.clearInterval(_this2.interval);
          delete _this2.interval;
        });
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var _this3 = this;

      var x = e.layerX,
          y = e.layerY;

      /* Touch support! */

      var touches = e.touches;

      if (touches) if (touches.length == 1) x = touches[0].clientX, y = touches[0].clientY;else if (touches.length > 1) {
        touches.forEach(function (t) {
          return _this3.handleMouseMove({
            x: t.clientX, y: t.clientY
          });
        });
        return;
      }

      var canvas = this.canvas,
          color = this.color,
          tool = this.tool,
          radius = this.radius,
          brushType = this.brushType,
          toolType = this.toolType;

      tool.points.push({ x: x, y: y });

      switch (toolType) {
        case "square":
        case "circle":
        case "star":
          if (tool.points.length < 2) tool[toolType]({ canvas: canvas, color: color, x: x, y: y,
            radius: radius, spikes: 5,
            outerRadius: radius * 2, innerRadius: radius });else {
            var ipoints = [];

            tool.points.slice(1).forEach(function (p, i, a) {
              ipoints.push.apply(ipoints, _toConsumableArray((0, _util.interpolateBetweenPoints)(tool.points[i], p)));
            });

            ipoints.forEach(function (_ref2) {
              var x = _ref2.x,
                  y = _ref2.y;
              return tool[toolType]({ canvas: canvas, color: color, x: x, y: y,
                radius: radius, spikes: 5, outerRadius: radius * 2, innerRadius: radius });
            });

            tool.points.shift();
          }
          break;
        case "bucket":
          (0, _util.toggleCursor)('WAIT');
          window.setTimeout(function () {
            return tool.bucket({ canvas: canvas, color: color, x: e.layerX, y: e.layerY });
          }, 25);
          break;
        case "spray":
          tool.spray({ canvas: canvas, color: color, x: x, y: y, radius: radius });
          // if (!this.interval)
          //   this.interval = window.setInterval(
          //     tool.spray.bind(this ,{ canvas, color, x, y, radius }),
          //     200
          //   );
          break;
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      var context = this.canvas.getContext('2d');
      context.fillStyle = "white";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      context.fillStyle = this.color;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = window.innerHeight;
      this.clear();
    }
  }]);

  return Easle;
}();

exports.default = Easle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _coordinate_hash = __webpack_require__(6);

var _coordinate_hash2 = _interopRequireDefault(_coordinate_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ToStringHash from './coordinate_hash';

exports.default = {
  points: [],
  circle: function circle(_ref) {
    var canvas = _ref.canvas,
        color = _ref.color,
        x = _ref.x,
        y = _ref.y,
        radius = _ref.radius;

    var context = canvas.getContext('2d');
    // const { offsetTop } = canvas

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
  },
  square: function square(_ref2) {
    var canvas = _ref2.canvas,
        color = _ref2.color,
        x = _ref2.x,
        y = _ref2.y,
        radius = _ref2.radius;

    var context = canvas.getContext('2d');
    // const { offsetTop } = canvas

    context.fillStyle = color;
    context.fillRect(x - radius, y - radius, radius + radius, radius + radius);
  },
  spray: function spray(_ref3) {
    var canvas = _ref3.canvas,
        color = _ref3.color,
        x = _ref3.x,
        y = _ref3.y,
        radius = _ref3.radius;

    var context = canvas.getContext('2d');
    // const { offsetTop } = canvas
    radius *= 1.5;
    context.fillStyle = color;

    for (var i = 0, rx, ry; i < 10; i++) {
      rx = Math.floor(Math.random() * radius - radius / 2);
      ry = Math.floor(Math.random() * radius - radius / 2);
      context.fillRect(x + rx, y + ry, 2, 2);
    }
  },
  bucket: function bucket(_ref4) {
    var canvas = _ref4.canvas,
        color = _ref4.color,
        x = _ref4.x,
        y = _ref4.y;

    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    var _context$getImageData = context.getImageData(x, y, 1, 1),
        data = _context$getImageData.data;

    if ((0, _util.sameArray)(data, [0, 0, 0, 0])) return;

    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);

    color = context.getImageData(x, y, 1, 1).data; // overwrite "red" with [255, 0, 0, ?]

    var offsets = [[1, 0], [0, 1], [0, -1], [-1, 0], // cardinal
    [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonal
    ];

    // offsets.push(
    //   ... offsets.map(os => addMatricies(offsets, offsets)),
    //   ... offsets.map(os => subtractMatricies(offsets, offsets))
    // );

    var curr = { x: x, y: y },
        temp = {},
        currColor = void 0;
    var chash = new _coordinate_hash2.default();
    var queue = [curr];

    while (queue.length) {
      curr = queue.shift();

      if (chash.get(curr)) continue;

      chash.set(curr);

      offsets.forEach(function (os) {
        var _ref5 = [curr.x + os[0], curr.y + os[1]];
        temp.x = _ref5[0];
        temp.y = _ref5[1];

        currColor = (0, _util.coordToColor)({ x: temp.x, y: temp.y, imageData: imageData }); // [r, g, b, a]

        // data = the color we want to overwrite
        // color = the color we want to overwrite with
        // currColor = the color we are looking at

        if ((0, _util.sameArray)(currColor, data)) {
          queue.push(Object.assign({}, temp));
          (0, _util.setCoordToColor)({ imageData: imageData, x: temp.x, y: temp.y, color: color });
        }
      });
    }

    (0, _util.toggleCursor)('RESUME');

    context.putImageData(imageData, 0, 0);
  },
  star: function star(_ref6) {
    var canvas = _ref6.canvas,
        color = _ref6.color,
        cx = _ref6.x,
        cy = _ref6.y,
        spikes = _ref6.spikes,
        outerRadius = _ref6.outerRadius,
        innerRadius = _ref6.innerRadius;

    /*
    Code for drawing a star taken from:
    https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
    */
    var ctx = canvas.getContext('2d');
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (var i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
};
// import CantorPairingHash from './coordinate_hash';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 6 - 7 seconds to fill whole screen on chromebook... works, but slow
// This is the fastest method I've found so far.
var CoordinateHash = function () {
  function CoordinateHash(coord) {
    _classCallCheck(this, CoordinateHash);

    this.hash = {};
    if (coord) this.set(coord);
  }

  _createClass(CoordinateHash, [{
    key: "set",
    value: function set(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var hash = this.hash;


      if (hash[x]) hash[x][y] = true;else hash[x] = _defineProperty({}, y, true);
    }
  }, {
    key: "get",
    value: function get(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var hash = this.hash;

      if (!hash[x]) return false;
      return Boolean(hash[x][y]);
    }
  }]);

  return CoordinateHash;
}();

exports.default = CoordinateHash;

// About the same speed as coordinate hash but glitches out and
// creates odd triangular sections

var CantorPairingHash = function () {
  function CantorPairingHash(coord) {
    _classCallCheck(this, CantorPairingHash);

    this.hash = {};
  }

  _createClass(CantorPairingHash, [{
    key: "set",
    value: function set(coord) {
      this.hash[this.cantorPair(coord)] = true;
    }
  }, {
    key: "get",
    value: function get(coord) {
      return Boolean(this.hash[this.cantorPair(coord)]);
    }
    /*
    I discovered cantorPairing thanks to this stackoverflow post
    https://stackoverflow.com/questions/919612/mapping-two-integers-to-one-in-a-unique-and-deterministic-way
    */

  }, {
    key: "cantorPair",
    value: function cantorPair(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      return (x + y) * (x + y + 1) / 2 + y;
    }
  }]);

  return CantorPairingHash;
}();

// export default CantorPairingHash;

// 10 - 11 seconds


var ToStringHash = function () {
  function ToStringHash() {
    _classCallCheck(this, ToStringHash);

    this.hash = {};
  }

  _createClass(ToStringHash, [{
    key: "set",
    value: function set(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      var hash = this.hash;

      hash[x + "," + y] = true;
    }
  }, {
    key: "get",
    value: function get(_ref5) {
      var x = _ref5.x,
          y = _ref5.y;
      var hash = this.hash;

      return Boolean(hash[x + "," + y]);
    }
  }]);

  return ToStringHash;
}();

// export default ToStringHash;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function closeModal(modal) {
  modal.style.display = "none";
}
var splash = function splash() {
  var splashModal = document.getElementById('splash-modal');
  var startButton = document.getElementById('start-button');

  /* startButton */ // After testing this, clicking the button wasn't obvious to non-programmers
  window.addEventListener('click', closeModal.bind(null, splashModal));

  window.addEventListener('keydown', function (e) {
    return e.keyCode === 27 && closeModal(splashModal);
  });
};

exports.default = splash;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClearOverlay = function () {
  function ClearOverlay(clearFunc) {
    _classCallCheck(this, ClearOverlay);

    this.clearFunc = clearFunc;
    this.overlay = document.getElementById('clear-prompt-modal');
    this.button = document.querySelector('#file-options div:nth-child(2)');
    this.cancelButton = document.getElementById('clear-prompt-cancel');
    this.clearButton = document.getElementById('clear-prompt-delete');
    this.clear = this.clear.bind(this);
    this.close = this.close.bind(this);
    this.configureContainer();
  }

  _createClass(ClearOverlay, [{
    key: 'configureContainer',
    value: function configureContainer() {
      var button = this.button,
          open = this.open,
          close = this.close,
          cancelButton = this.cancelButton,
          clearButton = this.clearButton,
          clear = this.clear;


      button.addEventListener('click', open.bind(this));
      cancelButton.addEventListener('click', close.bind(this));
      clearButton.addEventListener('click', function () {
        return clear(), close();
      });

      window.addEventListener('keydown', function (e) {
        return e.keyCode === 27 && close();
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.overlay.style.display = "none";
    }
  }, {
    key: 'open',
    value: function open() {
      this.overlay.style.display = "flex";
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.clearFunc();
    }
  }]);

  return ClearOverlay;
}();

exports.default = ClearOverlay;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DownloadOverlay = function () {
  function DownloadOverlay() {
    _classCallCheck(this, DownloadOverlay);

    this.canvas = document.querySelector('canvas');
    this.button = document.querySelector('#file-options div:nth-child(1)');
    this.configureContainer();
  }

  _createClass(DownloadOverlay, [{
    key: 'configureContainer',
    value: function configureContainer() {
      var button = this.button,
          download = this.download;

      button.addEventListener('click', download.bind(this), false);
    }
  }, {
    key: 'download',
    value: function download() {
      var canvas = this.canvas;

      var url = canvas.toDataURL(),
          d = new Date();

      var link = document.createElement('a');
      link.download = "ezpaint_";
      link.download += d.toLocaleDateString() + d.toLocaleTimeString().replace(/ /, '') + ".png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }]);

  return DownloadOverlay;
}();

exports.default = DownloadOverlay;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map