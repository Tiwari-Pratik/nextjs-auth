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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/user/change-password.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/user/change-password.js":
/*!*******************************************!*\
  !*** ./pages/api/user/change-password.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/client */ \"next-auth/client\");\n/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_db_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/db-utils */ \"./utils/db-utils.js\");\n/* harmony import */ var _utils_auth_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/auth-utils */ \"./utils/auth-utils.js\");\n\n\n\n\nconst handler = async (req, res) => {\n  if (req.method !== \"PATCH\") {\n    return;\n  }\n\n  const session = await Object(next_auth_client__WEBPACK_IMPORTED_MODULE_0__[\"getSession\"])({\n    req: req\n  });\n\n  if (!session) {\n    res.status(401).json({\n      message: \"Not Authenticated!\"\n    });\n    return;\n  }\n\n  const userEmail = session.user.email;\n  const oldPassword = req.body.oldPassword;\n  const newPassword = req.body.newPassword;\n  const client = await Object(_utils_db_utils__WEBPACK_IMPORTED_MODULE_1__[\"connectToDataBase\"])();\n  const usersCollection = client.db().collection(\"users\");\n  const user = await usersCollection.findOne({\n    email: userEmail\n  });\n\n  if (!user) {\n    res.status(404).json({\n      message: \"User not found\"\n    });\n    client.cllose();\n    return;\n  }\n\n  const currentPassword = user.password;\n  const isValidPassword = await Object(_utils_auth_utils__WEBPACK_IMPORTED_MODULE_2__[\"verifyPassword\"])(oldPassword, currentPassword);\n\n  if (!isValidPassword) {\n    res.status(403).json({\n      message: \"Invalid Password\"\n    });\n    client.close();\n    return;\n  }\n\n  const newHashedPassword = await Object(_utils_auth_utils__WEBPACK_IMPORTED_MODULE_2__[\"hashPassword\"])(newPassword);\n  const result = await usersCollection.updateOne({\n    email: userEmail\n  }, {\n    $set: {\n      password: newHashedPassword\n    }\n  });\n  client.close();\n  res.status(200).json({\n    message: \"Password Updated\"\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdXNlci9jaGFuZ2UtcGFzc3dvcmQuanM/NzQ1YyJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic2Vzc2lvbiIsImdldFNlc3Npb24iLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInVzZXJFbWFpbCIsInVzZXIiLCJlbWFpbCIsIm9sZFBhc3N3b3JkIiwiYm9keSIsIm5ld1Bhc3N3b3JkIiwiY2xpZW50IiwiY29ubmVjdFRvRGF0YUJhc2UiLCJ1c2Vyc0NvbGxlY3Rpb24iLCJkYiIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiY2xsb3NlIiwiY3VycmVudFBhc3N3b3JkIiwicGFzc3dvcmQiLCJpc1ZhbGlkUGFzc3dvcmQiLCJ2ZXJpZnlQYXNzd29yZCIsImNsb3NlIiwibmV3SGFzaGVkUGFzc3dvcmQiLCJoYXNoUGFzc3dvcmQiLCJyZXN1bHQiLCJ1cGRhdGVPbmUiLCIkc2V0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLE1BQU1BLE9BQU8sR0FBRyxPQUFPQyxHQUFQLEVBQVlDLEdBQVosS0FBb0I7QUFDbEMsTUFBSUQsR0FBRyxDQUFDRSxNQUFKLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUI7QUFDRDs7QUFFRCxRQUFNQyxPQUFPLEdBQUcsTUFBTUMsbUVBQVUsQ0FBQztBQUFFSixPQUFHLEVBQUVBO0FBQVAsR0FBRCxDQUFoQzs7QUFFQSxNQUFJLENBQUNHLE9BQUwsRUFBYztBQUNaRixPQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxhQUFPLEVBQUU7QUFBWCxLQUFyQjtBQUNBO0FBQ0Q7O0FBRUQsUUFBTUMsU0FBUyxHQUFHTCxPQUFPLENBQUNNLElBQVIsQ0FBYUMsS0FBL0I7QUFDQSxRQUFNQyxXQUFXLEdBQUdYLEdBQUcsQ0FBQ1ksSUFBSixDQUFTRCxXQUE3QjtBQUNBLFFBQU1FLFdBQVcsR0FBR2IsR0FBRyxDQUFDWSxJQUFKLENBQVNDLFdBQTdCO0FBRUEsUUFBTUMsTUFBTSxHQUFHLE1BQU1DLHlFQUFpQixFQUF0QztBQUNBLFFBQU1DLGVBQWUsR0FBR0YsTUFBTSxDQUFDRyxFQUFQLEdBQVlDLFVBQVosQ0FBdUIsT0FBdkIsQ0FBeEI7QUFFQSxRQUFNVCxJQUFJLEdBQUcsTUFBTU8sZUFBZSxDQUFDRyxPQUFoQixDQUF3QjtBQUFFVCxTQUFLLEVBQUVGO0FBQVQsR0FBeEIsQ0FBbkI7O0FBRUEsTUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVFIsT0FBRyxDQUFDSSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsYUFBTyxFQUFFO0FBQVgsS0FBckI7QUFDQU8sVUFBTSxDQUFDTSxNQUFQO0FBQ0E7QUFDRDs7QUFFRCxRQUFNQyxlQUFlLEdBQUdaLElBQUksQ0FBQ2EsUUFBN0I7QUFDQSxRQUFNQyxlQUFlLEdBQUcsTUFBTUMsd0VBQWMsQ0FBQ2IsV0FBRCxFQUFjVSxlQUFkLENBQTVDOztBQUVBLE1BQUksQ0FBQ0UsZUFBTCxFQUFzQjtBQUNwQnRCLE9BQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGFBQU8sRUFBRTtBQUFYLEtBQXJCO0FBQ0FPLFVBQU0sQ0FBQ1csS0FBUDtBQUNBO0FBQ0Q7O0FBRUQsUUFBTUMsaUJBQWlCLEdBQUcsTUFBTUMsc0VBQVksQ0FBQ2QsV0FBRCxDQUE1QztBQUNBLFFBQU1lLE1BQU0sR0FBRyxNQUFNWixlQUFlLENBQUNhLFNBQWhCLENBQ25CO0FBQUVuQixTQUFLLEVBQUVGO0FBQVQsR0FEbUIsRUFFbkI7QUFBRXNCLFFBQUksRUFBRTtBQUFFUixjQUFRLEVBQUVJO0FBQVo7QUFBUixHQUZtQixDQUFyQjtBQUtBWixRQUFNLENBQUNXLEtBQVA7QUFDQXhCLEtBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLFdBQU8sRUFBRTtBQUFYLEdBQXJCO0FBQ0QsQ0E1Q0Q7O0FBNkNlUixzRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2FwaS91c2VyL2NoYW5nZS1wYXNzd29yZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL2NsaWVudFwiO1xuaW1wb3J0IHsgY29ubmVjdFRvRGF0YUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZGItdXRpbHNcIjtcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgdmVyaWZ5UGFzc3dvcmQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXV0aC11dGlsc1wiO1xuXG5jb25zdCBoYW5kbGVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEubWV0aG9kICE9PSBcIlBBVENIXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbih7IHJlcTogcmVxIH0pO1xuXG4gIGlmICghc2Vzc2lvbikge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogXCJOb3QgQXV0aGVudGljYXRlZCFcIiB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1c2VyRW1haWwgPSBzZXNzaW9uLnVzZXIuZW1haWw7XG4gIGNvbnN0IG9sZFBhc3N3b3JkID0gcmVxLmJvZHkub2xkUGFzc3dvcmQ7XG4gIGNvbnN0IG5ld1Bhc3N3b3JkID0gcmVxLmJvZHkubmV3UGFzc3dvcmQ7XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgY29ubmVjdFRvRGF0YUJhc2UoKTtcbiAgY29uc3QgdXNlcnNDb2xsZWN0aW9uID0gY2xpZW50LmRiKCkuY29sbGVjdGlvbihcInVzZXJzXCIpO1xuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2Vyc0NvbGxlY3Rpb24uZmluZE9uZSh7IGVtYWlsOiB1c2VyRW1haWwgfSk7XG5cbiAgaWYgKCF1c2VyKSB7XG4gICAgcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XG4gICAgY2xpZW50LmNsbG9zZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRQYXNzd29yZCA9IHVzZXIucGFzc3dvcmQ7XG4gIGNvbnN0IGlzVmFsaWRQYXNzd29yZCA9IGF3YWl0IHZlcmlmeVBhc3N3b3JkKG9sZFBhc3N3b3JkLCBjdXJyZW50UGFzc3dvcmQpO1xuXG4gIGlmICghaXNWYWxpZFBhc3N3b3JkKSB7XG4gICAgcmVzLnN0YXR1cyg0MDMpLmpzb24oeyBtZXNzYWdlOiBcIkludmFsaWQgUGFzc3dvcmRcIiB9KTtcbiAgICBjbGllbnQuY2xvc2UoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBuZXdIYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChuZXdQYXNzd29yZCk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVzZXJzQ29sbGVjdGlvbi51cGRhdGVPbmUoXG4gICAgeyBlbWFpbDogdXNlckVtYWlsIH0sXG4gICAgeyAkc2V0OiB7IHBhc3N3b3JkOiBuZXdIYXNoZWRQYXNzd29yZCB9IH1cbiAgKTtcblxuICBjbGllbnQuY2xvc2UoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIlBhc3N3b3JkIFVwZGF0ZWRcIiB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/user/change-password.js\n");

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

/***/ }),

/***/ "next-auth/client":
/*!***********************************!*\
  !*** external "next-auth/client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-auth/client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LWF1dGgvY2xpZW50XCI/ZDNiMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJuZXh0LWF1dGgvY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1hdXRoL2NsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-auth/client\n");

/***/ })

/******/ });