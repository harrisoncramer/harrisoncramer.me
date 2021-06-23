"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.Dropdown = void 0;
var react_1 = __importStar(require("react"));
var gatsby_1 = require("gatsby");
var styled_components_1 = __importDefault(require("styled-components"));
var Dropdown = function (_a) {
    var isDark = _a.isDark;
    var dropdownRef = react_1.useRef(null);
    var _b = react_1.useState(false), isActive = _b[0], setIsActive = _b[1];
    var onClick = function () { return setIsActive(!isActive); };
    var pageClickEvent = function (e) {
        if (dropdownRef && dropdownRef.current === null)
            return;
        if (!dropdownRef.current.contains(e.target)) {
            setIsActive(!isActive);
        }
    };
    react_1.useEffect(function () {
        // If the item is active (ie open) then listen for clicks
        if (isActive) {
            window.addEventListener("click", pageClickEvent);
        }
        // Clean up
        return function () {
            window.removeEventListener("click", pageClickEvent);
        };
    }, [isActive]);
    return (react_1.default.createElement(StyledMenuContainer, null,
        react_1.default.createElement(StyledSvg, { isDark: isDark, onClick: onClick, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            react_1.default.createElement("path", { d: "M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" })),
        react_1.default.createElement(StyledNav, { ref: dropdownRef, className: "menu", isActive: isActive, isDark: isDark },
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement(gatsby_1.Link, { to: "/" }, "Home")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(gatsby_1.Link, { to: "/contact" }, "Contact")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(gatsby_1.Link, { to: "/projects" }, "Projects")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(gatsby_1.Link, { to: "/blog" }, "Blog"))))));
};
exports.Dropdown = Dropdown;
var StyledMenuContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var StyledSvg = styled_components_1.default.svg(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n"], ["\n  ",
    "\n"])), function (_a) {
    var isDark = _a.isDark;
    return isDark &&
        "\n  fill: white;\n";
});
var StyledNav = styled_components_1.default.nav(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: #ffffff;\n  z-index: 1000;\n  border-radius: 8px;\n  position: absolute;\n  top: 35px;\n  left: 0;\n  width: 300px;\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-20px);\n  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;\n\n  ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n  }\n\n  li {\n    border-bottom: 1px solid #dddddd;\n  }\n\n  li a {\n    padding: 15px 20px;\n    display: block;\n    font-family: \"Raleway\";\n  }\n\n  ", "\n\n  // Overwrite if dark theme enabled\n  ", "\n"], ["\n  background: #ffffff;\n  z-index: 1000;\n  border-radius: 8px;\n  position: absolute;\n  top: 35px;\n  left: 0;\n  width: 300px;\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-20px);\n  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;\n\n  ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n  }\n\n  li {\n    border-bottom: 1px solid #dddddd;\n  }\n\n  li a {\n    padding: 15px 20px;\n    display: block;\n    font-family: \"Raleway\";\n  }\n\n  ",
    "\n\n  // Overwrite if dark theme enabled\n  ",
    "\n"])), function (_a) {
    var isActive = _a.isActive;
    return isActive &&
        "\n      opacity: 1;\n      visibility: visible;\n      transform: translateY(0);\n    ";
}, function (_a) {
    var isDark = _a.isDark;
    return isDark &&
        "\n      color: white;\n      background: black;\n      box-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);\n  \n    li {\n      border-bottom: 1px solid grey;\n    }\n  ";
});
var templateObject_1, templateObject_2, templateObject_3;
