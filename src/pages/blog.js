"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.query = void 0;
var React = __importStar(require("react"));
var gatsby_1 = require("gatsby");
var layout_1 = __importDefault(require("../components/layout/layout"));
var seo_1 = __importDefault(require("../components/seo/seo"));
var styled_components_1 = __importDefault(require("styled-components"));
var gatsby_plugin_image_1 = require("gatsby-plugin-image");
var dayjs_1 = __importDefault(require("dayjs"));
var svgPicker_1 = __importDefault(require("../util/svgPicker"));
require("prismjs/themes/prism-okaidia.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
var Tag = function (_a) {
    var tag = _a.tag;
    return svgPicker_1.default(tag);
};
var PostPreview = function (_a) {
    var title = _a.title, description = _a.description, date = _a.date, path = _a.path, featuredImage = _a.featuredImage, imageDescription = _a.imageDescription, tags = _a.tags;
    //@ts-ignore
    var image = gatsby_plugin_image_1.getImage(featuredImage);
    return (React.createElement(StyledPost, { onClick: function () { return gatsby_1.navigate(path); } },
        image && imageDescription && (React.createElement(gatsby_plugin_image_1.GatsbyImage, { image: image, alt: imageDescription })),
        React.createElement("h3", null, title),
        React.createElement(StyledDate, null, dayjs_1.default(date).format("DD/MM/YYYY")),
        React.createElement("p", null, description),
        React.createElement(StyledSvgContainer, null, tags && tags.map(function (tag) { return React.createElement(Tag, { key: tag, tag: tag }); }))));
};
var BlogPage = function (_a) {
    var data = _a.data;
    var featuredPost = data.featured.edges[0];
    if (!featuredPost)
        return React.createElement("div", null, "No posts.");
    return (React.createElement(layout_1.default, { title: "blog" },
        React.createElement(seo_1.default, { title: "blog", description: "This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!" }),
        React.createElement(PostPreview, __assign({}, featuredPost.node.frontmatter)),
        React.createElement(StyledPostWrapper, null, data.posts.edges.map(function (_a, i) {
            var node = _a.node;
            return React.createElement(PostPreview, __assign({}, node.frontmatter, { key: i }));
        }))));
};
var StyledPostWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  width: 100%;\n  gap: 1em;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n"], ["\n  display: grid;\n  width: 100%;\n  gap: 1em;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n"])));
var StyledSvgContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  padding: 0.5em;\n  gap: 0.25em;\n  svg {\n    max-width: 1.25em;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  padding: 0.5em;\n  gap: 0.25em;\n  svg {\n    max-width: 1.25em;\n  }\n"])));
var StyledPost = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  padding: 1em;\n\n  h3 {\n    font-family: \"Raleway\";\n    margin: 0.5em 0 0.25em 0;\n  }\n"], ["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  padding: 1em;\n\n  h3 {\n    font-family: \"Raleway\";\n    margin: 0.5em 0 0.25em 0;\n  }\n"])));
var StyledDate = styled_components_1.default.span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-family: \"Raleway\";\n  color: #303030;\n  font-size: 0.75em;\n"], ["\n  font-family: \"Raleway\";\n  color: #303030;\n  font-size: 0.75em;\n"])));
exports.query = gatsby_1.graphql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  {\n    posts: allMarkdownRemark(\n      sort: { fields: frontmatter___date, order: DESC }\n      skip: 1\n    ) {\n      edges {\n        node {\n          frontmatter {\n            title\n            date\n            path\n            description\n            tags\n            imageDescription\n            featuredImage {\n              childImageSharp {\n                gatsbyImageData(\n                  width: 350\n                  height: 250\n                  placeholder: BLURRED\n                  formats: [AUTO, WEBP, AVIF]\n                )\n              }\n            }\n          }\n        }\n      }\n    }\n    featured: allMarkdownRemark(\n      sort: { fields: frontmatter___date, order: DESC }\n      limit: 1\n    ) {\n      edges {\n        node {\n          frontmatter {\n            title\n            date\n            path\n            description\n            tags\n            imageDescription\n            featuredImage {\n              childImageSharp {\n                gatsbyImageData(\n                  placeholder: BLURRED\n                  formats: [AUTO, WEBP, AVIF]\n                )\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"], ["\n  {\n    posts: allMarkdownRemark(\n      sort: { fields: frontmatter___date, order: DESC }\n      skip: 1\n    ) {\n      edges {\n        node {\n          frontmatter {\n            title\n            date\n            path\n            description\n            tags\n            imageDescription\n            featuredImage {\n              childImageSharp {\n                gatsbyImageData(\n                  width: 350\n                  height: 250\n                  placeholder: BLURRED\n                  formats: [AUTO, WEBP, AVIF]\n                )\n              }\n            }\n          }\n        }\n      }\n    }\n    featured: allMarkdownRemark(\n      sort: { fields: frontmatter___date, order: DESC }\n      limit: 1\n    ) {\n      edges {\n        node {\n          frontmatter {\n            title\n            date\n            path\n            description\n            tags\n            imageDescription\n            featuredImage {\n              childImageSharp {\n                gatsbyImageData(\n                  placeholder: BLURRED\n                  formats: [AUTO, WEBP, AVIF]\n                )\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"])));
exports.default = BlogPage;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
