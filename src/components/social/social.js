"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Social = void 0;
var react_1 = __importDefault(require("react"));
var react_share_1 = require("react-share");
var styled_components_1 = __importDefault(require("styled-components"));
var Social = function (_a) {
    var siteUrl = _a.siteUrl, uri = _a.uri, quote = _a.quote, title = _a.title;
    var size = 32;
    return (react_1.default.createElement(StyledDiv, null,
        react_1.default.createElement(react_share_1.FacebookShareButton, { url: "" + siteUrl + uri, quote: quote },
            react_1.default.createElement(react_share_1.FacebookIcon, { size: size })),
        react_1.default.createElement(react_share_1.TwitterShareButton, { url: "" + siteUrl + uri, title: quote },
            react_1.default.createElement(react_share_1.TwitterIcon, { size: size })),
        react_1.default.createElement(react_share_1.RedditShareButton, { url: "" + siteUrl + uri, title: title },
            react_1.default.createElement(react_share_1.RedditIcon, { size: size }))));
};
exports.Social = Social;
var StyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n"])));
var templateObject_1;
