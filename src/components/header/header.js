"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var dropdown_1 = require("../dropdown/dropdown");
var styled_components_1 = __importDefault(require("styled-components"));
var Header = function (_a) {
    var setIsDark = _a.setIsDark, isDark = _a.isDark;
    var changeTheme = function () {
        setIsDark(!isDark);
    };
    return (react_1.default.createElement(StyledHeader, { isDark: isDark },
        react_1.default.createElement(dropdown_1.Dropdown, { isDark: isDark }),
        react_1.default.createElement(StyledSvg, { isDark: isDark, onClick: changeTheme, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
            react_1.default.createElement("path", { d: "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10v-20zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" }))));
};
var StyledSvg = styled_components_1.default.svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  cursor: pointer;\n  ", "\n"], ["\n  cursor: pointer;\n  ",
    "\n"])), function (_a) {
    var isDark = _a.isDark;
    return isDark &&
        "\n  fill: white;\n";
});
var StyledHeader = styled_components_1.default.header(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  top: 0;\n  z-index: 1000;\n  background: white;\n  position: sticky;\n  display: flex;\n  padding: 1em;\n  gap: 1em;\n  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);\n\n  justify-content: space-between;\n  ", "\n"], ["\n  top: 0;\n  z-index: 1000;\n  background: white;\n  position: sticky;\n  display: flex;\n  padding: 1em;\n  gap: 1em;\n  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);\n\n  justify-content: space-between;\n  ",
    "\n"])), function (_a) {
    var isDark = _a.isDark;
    return isDark &&
        "\n  background: black;\n";
});
exports.default = Header;
var templateObject_1, templateObject_2;
