import * as React from "react"
import styled from "styled-components"

const Footer = (): JSX.Element => (
  <StyledFooter>
    <p>
      See something wrong? Make a{" "}
      <a href="https://github.com/harrisoncramer/harrisoncramer.me">pull</a>{" "}
      request!
    </p>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  background: #f7f7f7;
  position: sticky;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: center;
`

export default Footer
