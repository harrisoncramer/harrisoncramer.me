import * as React from "react"

import ReactTooltip from "react-tooltip"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import styled from "styled-components"

const ContactPage = (): JSX.Element => (
  <Layout title="contact">
    <Seo
      title="contact"
      description="This page includes my contact information like my Twitter handle and my Github account and my developer email. It also includes my resume."
      slug="/contact"
    />
    <h1>Contact</h1>
    <StyledDiv>
      <StyledP>
        Twitter:{" "}
        <a href="https://twitter.com/harrisoncramer">@harrisoncramer</a>
      </StyledP>
    </StyledDiv>
    <StyledDiv>
      <StyledP>
        Github: <a href="https://github.com/harrisoncramer">harrisoncramer</a>
      </StyledP>
    </StyledDiv>
    <StyledDiv>
      <StyledP data-tip data-for="signal-tip">
        Signal: 510-698-1166
      </StyledP>
    </StyledDiv>
    <ReactTooltip
      id="signal-tip"
      place="right"
      effect="solid"
      className="tooltip"
    >
      Signal is a secure messenging application.
    </ReactTooltip>
  </Layout>
)

const StyledDiv = styled.div`
  .tooltip {
    font-size: 2em !important;
  }
`

const StyledP = styled.p`
  margin: 0.25em;
  display: inline-block;
`

export default ContactPage
