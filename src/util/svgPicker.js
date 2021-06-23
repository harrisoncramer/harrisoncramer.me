"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var svgs_1 = require("../components/svgs");
function svgPicker(tag) {
    var t = tag.toLowerCase();
    switch (t) {
        case "javascript":
            return react_1.default.createElement(svgs_1.Javascript, null);
        case "css":
            return react_1.default.createElement(svgs_1.CSS, null);
        case "aws":
            return react_1.default.createElement(svgs_1.AWS, null);
        case "docker":
            return react_1.default.createElement(svgs_1.Docker, null);
        case "github":
            return react_1.default.createElement(svgs_1.Github, null);
        case "html":
            return react_1.default.createElement(svgs_1.Html, null);
        case "linux":
            return react_1.default.createElement(svgs_1.Linux, null);
        case "jest":
            return react_1.default.createElement(svgs_1.Jest, null);
        case "golang":
            return react_1.default.createElement(svgs_1.Golang, null);
        case "kubernetes":
            return react_1.default.createElement(svgs_1.Kubernetes, null);
        default:
            return react_1.default.createElement("span", null);
    }
}
exports.default = svgPicker;
