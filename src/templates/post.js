"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageQuery = void 0;
var react_1 = __importDefault(require("react"));
var gatsby_1 = require("gatsby");
var styled_components_1 = __importDefault(require("styled-components"));
var seo_1 = __importDefault(require("../components/seo/seo"));
var layout_1 = __importDefault(require("../components/layout/layout"));
var gatsby_plugin_image_1 = require("gatsby-plugin-image");
var social_1 = require("../components/social/social");
function Template(props) {
    var markdownRemark = props.data.markdownRemark;
    var frontmatter = markdownRemark.frontmatter, html = markdownRemark.html;
    //@ts-ignore
    var image = gatsby_plugin_image_1.getImage(frontmatter.featuredImage);
    return (react_1.default.createElement(layout_1.default, { title: frontmatter.title },
        react_1.default.createElement(seo_1.default, { title: frontmatter.title, description: frontmatter.description }),
        react_1.default.createElement(StyledPostWrapper, null,
            react_1.default.createElement(PostTitle, null, frontmatter.title),
            react_1.default.createElement(StyledSubtitle, null,
                react_1.default.createElement("h3", null, frontmatter.date)),
            image && frontmatter.imageDescription && (react_1.default.createElement(gatsby_plugin_image_1.GatsbyImage, { image: image, alt: frontmatter.imageDescription })),
            react_1.default.createElement(social_1.Social, { title: frontmatter.title, uri: props.uri, siteUrl: props.data.site.siteMetadata.siteUrl, quote: markdownRemark.frontmatter.description }),
            react_1.default.createElement(PostContent, null,
                react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: html } })))));
}
exports.default = Template;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query TemplatePageQuery($path: String!) {\n    markdownRemark(frontmatter: { path: { eq: $path } }) {\n      html\n      frontmatter {\n        date(formatString: \"MMMM DD, YYYY\")\n        path\n        title\n        description\n        imageDescription\n        tags\n        featuredImage {\n          childImageSharp {\n            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])\n          }\n        }\n      }\n    }\n    site {\n      siteMetadata {\n        siteUrl\n      }\n    }\n  }\n"], ["\n  query TemplatePageQuery($path: String!) {\n    markdownRemark(frontmatter: { path: { eq: $path } }) {\n      html\n      frontmatter {\n        date(formatString: \"MMMM DD, YYYY\")\n        path\n        title\n        description\n        imageDescription\n        tags\n        featuredImage {\n          childImageSharp {\n            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])\n          }\n        }\n      }\n    }\n    site {\n      siteMetadata {\n        siteUrl\n      }\n    }\n  }\n"])));
var StyledPostWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  h2,\n  h3,\n  h4 {\n    font-family: \"Raleway\";\n  }\n"], ["\n  h2,\n  h3,\n  h4 {\n    font-family: \"Raleway\";\n  }\n"])));
var PostTitle = styled_components_1.default.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: \"Raleway\";\n  margin-bottom: 0;\n"], ["\n  font-family: \"Raleway\";\n  margin-bottom: 0;\n"])));
var StyledSubtitle = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  h3 {\n    font-family: \"Raleway\";\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  h3 {\n    font-family: \"Raleway\";\n  }\n"])));
var PostContent = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  .gatsby-highlight-code-line {\n    background-color: #444444;\n    display: block;\n    margin-right: -1em;\n    margin-left: -1em;\n    padding-right: 1em;\n    padding-left: 0.75em;\n    border-left: 0.25em solid #f99;\n  }\n"], ["\n  .gatsby-highlight-code-line {\n    background-color: #444444;\n    display: block;\n    margin-right: -1em;\n    margin-left: -1em;\n    padding-right: 1em;\n    padding-left: 0.75em;\n    border-left: 0.25em solid #f99;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
