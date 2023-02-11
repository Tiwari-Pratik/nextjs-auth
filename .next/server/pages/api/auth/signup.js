module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/auth/signup.js":
/*!**********************************!*\
  !*** ./pages/api/auth/signup.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_auth_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/auth-utils */ \"./utils/auth-utils.js\");\n/* harmony import */ var _utils_db_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/db-utils */ \"./utils/db-utils.js\");\n\n\n\nconst handler = async (req, res) => {\n  if (req.method === \"POST\") {\n    const data = req.body;\n    const {\n      email,\n      password\n    } = data;\n\n    if (!email || !email.includes(\"@\") || !password || password.trim().length < 7) {\n      res.status(422).json({\n        message: \"Invalid input-password should also be atleast 7 characters long\"\n      });\n      return;\n    }\n\n    const client = await Object(_utils_db_utils__WEBPACK_IMPORTED_MODULE_1__[\"connectToDataBase\"])();\n    const db = client.db();\n    const existingUser = await db.collection(\"users\").findOne({\n      email: email\n    });\n\n    if (existingUser) {\n      res.status(422).json({\n        message: \"User exists already!\"\n      });\n      client.close();\n      return;\n    }\n\n    const hashedPassword = await Object(_utils_auth_utils__WEBPACK_IMPORTED_MODULE_0__[\"hashPassword\"])(password);\n    const result = await db.collection(\"users\").insertOne({\n      email: email,\n      password: hashedPassword\n    }); // console.log(result);\n\n    res.status(201).json({\n      message: \"Created user!\"\n    });\n    client.close();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9zaWdudXAuanM/YzUyZiJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiZGF0YSIsImJvZHkiLCJlbWFpbCIsInBhc3N3b3JkIiwiaW5jbHVkZXMiLCJ0cmltIiwibGVuZ3RoIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJjbGllbnQiLCJjb25uZWN0VG9EYXRhQmFzZSIsImRiIiwiZXhpc3RpbmdVc2VyIiwiY29sbGVjdGlvbiIsImZpbmRPbmUiLCJjbG9zZSIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaFBhc3N3b3JkIiwicmVzdWx0IiwiaW5zZXJ0T25lIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLE1BQU1BLE9BQU8sR0FBRyxPQUFPQyxHQUFQLEVBQVlDLEdBQVosS0FBb0I7QUFDbEMsTUFBSUQsR0FBRyxDQUFDRSxNQUFKLEtBQWUsTUFBbkIsRUFBMkI7QUFDekIsVUFBTUMsSUFBSSxHQUFHSCxHQUFHLENBQUNJLElBQWpCO0FBQ0EsVUFBTTtBQUFFQyxXQUFGO0FBQVNDO0FBQVQsUUFBc0JILElBQTVCOztBQUVBLFFBQ0UsQ0FBQ0UsS0FBRCxJQUNBLENBQUNBLEtBQUssQ0FBQ0UsUUFBTixDQUFlLEdBQWYsQ0FERCxJQUVBLENBQUNELFFBRkQsSUFHQUEsUUFBUSxDQUFDRSxJQUFULEdBQWdCQyxNQUFoQixHQUF5QixDQUozQixFQUtFO0FBQ0FSLFNBQUcsQ0FBQ1MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ25CQyxlQUFPLEVBQ0w7QUFGaUIsT0FBckI7QUFJQTtBQUNEOztBQUNELFVBQU1DLE1BQU0sR0FBRyxNQUFNQyx5RUFBaUIsRUFBdEM7QUFFQSxVQUFNQyxFQUFFLEdBQUdGLE1BQU0sQ0FBQ0UsRUFBUCxFQUFYO0FBRUEsVUFBTUMsWUFBWSxHQUFHLE1BQU1ELEVBQUUsQ0FBQ0UsVUFBSCxDQUFjLE9BQWQsRUFBdUJDLE9BQXZCLENBQStCO0FBQUViLFdBQUssRUFBRUE7QUFBVCxLQUEvQixDQUEzQjs7QUFFQSxRQUFJVyxZQUFKLEVBQWtCO0FBQ2hCZixTQUFHLENBQUNTLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxlQUFPLEVBQUU7QUFBWCxPQUFyQjtBQUNBQyxZQUFNLENBQUNNLEtBQVA7QUFDQTtBQUNEOztBQUVELFVBQU1DLGNBQWMsR0FBRyxNQUFNQyxzRUFBWSxDQUFDZixRQUFELENBQXpDO0FBRUEsVUFBTWdCLE1BQU0sR0FBRyxNQUFNUCxFQUFFLENBQUNFLFVBQUgsQ0FBYyxPQUFkLEVBQXVCTSxTQUF2QixDQUFpQztBQUNwRGxCLFdBQUssRUFBRUEsS0FENkM7QUFFcERDLGNBQVEsRUFBRWM7QUFGMEMsS0FBakMsQ0FBckIsQ0E5QnlCLENBbUN6Qjs7QUFDQW5CLE9BQUcsQ0FBQ1MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGFBQU8sRUFBRTtBQUFYLEtBQXJCO0FBQ0FDLFVBQU0sQ0FBQ00sS0FBUDtBQUNEO0FBQ0YsQ0F4Q0Q7O0FBMENlcEIsc0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9hcGkvYXV0aC9zaWdudXAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYXNoUGFzc3dvcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXV0aC11dGlsc1wiO1xuaW1wb3J0IHsgY29ubmVjdFRvRGF0YUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZGItdXRpbHNcIjtcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGRhdGE7XG5cbiAgICBpZiAoXG4gICAgICAhZW1haWwgfHxcbiAgICAgICFlbWFpbC5pbmNsdWRlcyhcIkBcIikgfHxcbiAgICAgICFwYXNzd29yZCB8fFxuICAgICAgcGFzc3dvcmQudHJpbSgpLmxlbmd0aCA8IDdcbiAgICApIHtcbiAgICAgIHJlcy5zdGF0dXMoNDIyKS5qc29uKHtcbiAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICBcIkludmFsaWQgaW5wdXQtcGFzc3dvcmQgc2hvdWxkIGFsc28gYmUgYXRsZWFzdCA3IGNoYXJhY3RlcnMgbG9uZ1wiLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGNvbm5lY3RUb0RhdGFCYXNlKCk7XG5cbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYigpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpLmZpbmRPbmUoeyBlbWFpbDogZW1haWwgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XG4gICAgICByZXMuc3RhdHVzKDQyMikuanNvbih7IG1lc3NhZ2U6IFwiVXNlciBleGlzdHMgYWxyZWFkeSFcIiB9KTtcbiAgICAgIGNsaWVudC5jbG9zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJ1c2Vyc1wiKS5pbnNlcnRPbmUoe1xuICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IG1lc3NhZ2U6IFwiQ3JlYXRlZCB1c2VyIVwiIH0pO1xuICAgIGNsaWVudC5jbG9zZSgpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/auth/signup.js\n");

/***/ }),

/***/ "./utils/auth-utils.js":
/*!*****************************!*\
  !*** ./utils/auth-utils.js ***!
  \*****************************/
/*! exports provided: hashPassword, verifyPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hashPassword\", function() { return hashPassword; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verifyPassword\", function() { return verifyPassword; });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n\nconst hashPassword = async password => {\n  const hashedPassword = await Object(bcryptjs__WEBPACK_IMPORTED_MODULE_0__[\"hash\"])(password, 12);\n  return hashedPassword;\n};\nconst verifyPassword = async (password, hashedPassword) => {\n  const isValid = await Object(bcryptjs__WEBPACK_IMPORTED_MODULE_0__[\"compare\"])(password, hashedPassword);\n  return isValid;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9hdXRoLXV0aWxzLmpzPzk5YmEiXSwibmFtZXMiOlsiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJoYXNoZWRQYXNzd29yZCIsImhhc2giLCJ2ZXJpZnlQYXNzd29yZCIsImlzVmFsaWQiLCJjb21wYXJlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxNQUFNQSxZQUFZLEdBQUcsTUFBT0MsUUFBUCxJQUFvQjtBQUM5QyxRQUFNQyxjQUFjLEdBQUcsTUFBTUMscURBQUksQ0FBQ0YsUUFBRCxFQUFXLEVBQVgsQ0FBakM7QUFDQSxTQUFPQyxjQUFQO0FBQ0QsQ0FITTtBQUtBLE1BQU1FLGNBQWMsR0FBRyxPQUFPSCxRQUFQLEVBQWlCQyxjQUFqQixLQUFvQztBQUNoRSxRQUFNRyxPQUFPLEdBQUcsTUFBTUMsd0RBQU8sQ0FBQ0wsUUFBRCxFQUFXQyxjQUFYLENBQTdCO0FBQ0EsU0FBT0csT0FBUDtBQUNELENBSE0iLCJmaWxlIjoiLi91dGlscy9hdXRoLXV0aWxzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZSwgaGFzaCB9IGZyb20gXCJiY3J5cHRqc1wiO1xuXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkKSA9PiB7XG4gIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaChwYXNzd29yZCwgMTIpO1xuICByZXR1cm4gaGFzaGVkUGFzc3dvcmQ7XG59O1xuXG5leHBvcnQgY29uc3QgdmVyaWZ5UGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQsIGhhc2hlZFBhc3N3b3JkKSA9PiB7XG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZCk7XG4gIHJldHVybiBpc1ZhbGlkO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/auth-utils.js\n");

/***/ }),

/***/ "./utils/db-utils.js":
/*!***************************!*\
  !*** ./utils/db-utils.js ***!
  \***************************/
/*! exports provided: connectToDataBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"connectToDataBase\", function() { return connectToDataBase; });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectToDataBase = async () => {\n  const client = await mongodb__WEBPACK_IMPORTED_MODULE_0__[\"MongoClient\"].connect(\"mongodb+srv://pratik:picachhoo1@cluster0.pbdmdok.mongodb.net/auth-demo?retryWrites=true&w=majority\");\n  return client;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9kYi11dGlscy5qcz9hMzkxIl0sIm5hbWVzIjpbImNvbm5lY3RUb0RhdGFCYXNlIiwiY2xpZW50IiwiTW9uZ29DbGllbnQiLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sTUFBTUEsaUJBQWlCLEdBQUcsWUFBWTtBQUMzQyxRQUFNQyxNQUFNLEdBQUcsTUFBTUMsbURBQVcsQ0FBQ0MsT0FBWixDQUNuQixvR0FEbUIsQ0FBckI7QUFJQSxTQUFPRixNQUFQO0FBQ0QsQ0FOTSIsImZpbGUiOiIuL3V0aWxzL2RiLXV0aWxzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiO1xuXG5leHBvcnQgY29uc3QgY29ubmVjdFRvRGF0YUJhc2UgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IE1vbmdvQ2xpZW50LmNvbm5lY3QoXG4gICAgXCJtb25nb2RiK3NydjovL3ByYXRpazpwaWNhY2hob28xQGNsdXN0ZXIwLnBiZG1kb2subW9uZ29kYi5uZXQvYXV0aC1kZW1vP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eVwiXG4gICk7XG5cbiAgcmV0dXJuIGNsaWVudDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/db-utils.js\n");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRqc1wiP2NlNTUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmNyeXB0anMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcryptjs\n");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCI/ZGVmZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJtb25nb2RiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongodb\n");

/***/ })

/******/ });