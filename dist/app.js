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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// --- LAMBDA CALCULUS COMBINATORS\r\nconst identity = a => a; // I (Idiot / Cacatoès)\r\nconsole.log(identity(42));\r\n\r\nconst selfApplication = f => f(f); // M (Mockingbird / Rossignol)\r\nconsole.log(selfApplication(identity) === identity);\r\n\r\nconst first = a => b => a; // K (Kestrel / Crécerelle), is a kind of \"constant\"\r\nconst test = first('test');\r\nconsole.log(test('try change'));\r\n\r\nconst second = a => b => b; // KI (Kite / Faucon)\r\nconsole.log(second('test 1')('test 2'));\r\nconsole.log(first(identity)('test 1')('test 2'));\r\n\r\nconst reverseArgs = f => a => b => f(b)(a); // C (Cardinal / Cardinal)\r\nconsole.log(reverseArgs(first)(identity)(selfApplication) === selfApplication);\r\n\r\n// --- BOOLEANS\r\nconst λTrue = a => b => a; // === first, K, Kestrel\r\nλTrue.inspect = () => \"it's true\";\r\nconsole.log(λTrue);\r\n// give param A to a function, that return a function that can take any params, that return A\r\n// value => any => value\r\nconst λFalse = a => b => b; // === second, KI, Kite\r\nλFalse.inspect = () => \"it's false\";\r\nconsole.log(λFalse);\r\n// give any param to a function, that return a function that take a B param, and that return B\r\n// any => value => value\r\n\r\n// --- BOOLEAN OPERATIONS\r\n// NOT\r\nconst λNot = f => f(λFalse)(λTrue);\r\nconsole.log(λNot(λTrue), λNot(λFalse));\r\n// decompose : λNot(λTrue)\r\n// give a 2 level function (x => y => x) to the following function\r\nconst λNotDemo0 = f => f(a => b => b)(c => d => c);\r\n// that will execute this function, with (a => b => b) as param\r\nconst λNotDemo1 = (x => y => x)(a => b => b);\r\n// so we get\r\nconst λNotDemo2 = y => a => b => b;\r\n// that will execute this function wirth (c => d => c) as param\r\nconst λNotDemo2bis = (y => a => b => b)(c => d => c);\r\n// and that will get the (c => d => c) param\r\nconst λNotDemo3 = a => b => b;\r\n// no concern (c => d => c)\r\nconsole.log((f => f(a => b => b)(c => d => c))(x => y => x).toString());\r\n\r\n// decompose : λNot(λFalse)\r\n// give a 2 level function (x => y => y) to the following function\r\nconst λNotDemo4 = f => f(a => b => b)(c => d => c);\r\n// that will execute this function, with (a => b => b) as param\r\nconst λNotDemo5 = x => y => y;\r\n// so we get\r\nconst λNotDemo6 = y => y;\r\n// that will execute this function wirth (c => d => c) as param\r\nconst λNotDemo6bis = (y => y)(c => d => c);\r\n// and that will get the (c => d => c) param\r\nconst λNotDemo7 = c => d => c;\r\n// no concern for (a => b => b)\r\nconsole.log((f => f(a => b => b)(c => d => c))(x => y => y).toString());\r\n\r\n// So, nothing change: it's an advanced form of reverseArgs (C, Cardinal)\r\n// take a function, then 2 args, and flip them\r\nconsole.log(reverseArgs(λTrue)(λTrue)(λFalse)); // it's false\r\nconsole.log(reverseArgs(λFalse)(λTrue)(λFalse)); // it's true\r\n\r\nreverseArgs(λTrue); // is (a => b => (x => y => x)(b)(a)))\r\nreverseArgs(λTrue)(λTrue)(λFalse); // is (x => y => x)(a => b => b)(c => d => c)\r\n// or an other \"false is true\"\r\nλNot(λTrue); // is (f => f(a => b => b)(c => d => c)(x => y => x);\r\n// so it's (x => y => x)(a => b => b)(c => d => c);\r\n// or an other \"false is true\"\r\n\r\n// AND\r\nconst λAnd = a => b => a(b)(a);\r\n// so (true && true) === true\r\nconsole.log('λAnd(λTrue)(λTrue)', λAnd(λTrue)(λTrue));\r\n// and so on\r\nconsole.log('λAnd(λTrue)(λFalse)', λAnd(λTrue)(λFalse));\r\nconsole.log('λAnd(λFalse)(λTrue)', λAnd(λFalse)(λTrue));\r\nconsole.log('λAnd(λFalse)(λFalse)', λAnd(λFalse)(λFalse));\r\n// lets decompose λAnd(λTrue)(λTrue)\r\nconst λAndDemo1 = (a => b => a(b)(a))(c => d => c)(e => f => e);\r\nconst λAndDemo2 = (b => (c => d => c)(b)(g => h => g))(e => f => e);\r\nconst λAndDemo3 = (c => d => c)(e => f => e)(g => h => g);\r\nconst λAndDemo4 = (d => e => f => e)(g => h => g);\r\nconst λAndDemo5 = e => f => e;\r\n\r\n// lets decompose λAnd(λTrue)(λFalse)\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });