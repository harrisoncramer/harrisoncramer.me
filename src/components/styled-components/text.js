"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledH1 = exports.StyledP = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
exports.StyledP = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: red;\n"], ["\n  color: red;\n"])));
exports.StyledH1 = styled_components_1.default.h1(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-family: \"Raleway\", sans-serif;\n"], ["\n  font-family: \"Raleway\", sans-serif;\n"])));
var templateObject_1, templateObject_2;
