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
var React = __importStar(require("react"));
var layout_1 = __importDefault(require("../components/layout/layout"));
var seo_1 = __importDefault(require("../components/seo/seo"));
var text_1 = require("../components/styled-components/text");
var gatsby_1 = require("gatsby");
var styled_components_1 = __importDefault(require("styled-components"));
// For code highlighting
var IndexPage = function () { return (React.createElement(layout_1.default, { title: "harrisoncramer.me" },
    React.createElement(seo_1.default, { title: "harrisoncramer.me", description: "Harrison Cramer personal blog site." }),
    React.createElement("div", null,
        React.createElement(text_1.StyledH1, null, "Hello \uD83D\uDC4B"),
        React.createElement(StyledP, null,
            "My name is Harrison and I'm a software engineer and former national security reporter. I'm currently in the June cohort of",
            " ",
            React.createElement("a", { href: "https://codesmith.io/" }, "Codesmith"),
            " where I'm studying Javascript."),
        React.createElement(StyledP, null,
            "This is my personal site, where I'll ",
            React.createElement(gatsby_1.Link, { to: "/blog" }, "post"),
            " about what I'm learning, from CI/CD and DevOps, to React and GraphQL."),
        React.createElement(StyledP, null, "My goal is to make the blog a reference for myself, but also helpful for others who are interested in the same technologies. It's intended to be fast\u2014not pretty. Built with Gatsby, CircleCI for CI/CD, and Terraform."),
        React.createElement(StyledP, null,
            "I'm more than happy to take pull requests to the site if you want to fix a bug or suggest a feature. Please checkout the",
            " ",
            React.createElement("a", { href: "https://github.com/harrisoncramer/harrisoncramer.me" }, "repository"),
            " ",
            "for the site!"),
        React.createElement(StyledP, null,
            "I'm on ",
            React.createElement("a", { href: "https://www.twitter.com/harrisoncramer" }, "Twitter"),
            " too.")))); };
var StyledP = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  // font-family: \"Raleway\"\n"], ["\n  // font-family: \"Raleway\"\n"])));
exports.default = IndexPage;
var templateObject_1;
