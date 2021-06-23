"use strict";
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var header_1 = __importDefault(require("../header/header"));
// Global styling
require("normalize.css");
var global_module_css_1 = require("./global.module.css");
var Layout = function (_a) {
    var children = _a.children;
    // Get theme from browser, if it exists, and set it.
    var _b = react_1.useState(typeof window !== "undefined" && localStorage.getItem("isDark") === "true"
        ? true
        : false), isDark = _b[0], setIsDark = _b[1];
    // And set the theme on every render
    react_1.useEffect(function () {
        typeof window !== "undefined" &&
            localStorage.setItem("isDark", isDark.toString());
    }, [isDark]);
    return (react_1.default.createElement("main", { className: global_module_css_1.main + " " + (isDark ? global_module_css_1.mainDark : global_module_css_1.mainLight) },
        react_1.default.createElement(header_1.default, { setIsDark: setIsDark, isDark: isDark }),
        react_1.default.createElement("main", { className: global_module_css_1.contentWrapper }, children)));
};
exports.default = Layout;
