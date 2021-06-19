import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import styled from "styled-components"

interface SocialProps {
  quote: string
  siteUrl: string
  uri: string
  title: string
}

export const Social = ({
  siteUrl,
  uri,
  quote,
  title,
}: SocialProps): React.ReactElement => {
  const size = 32
  return (
    <StyledDiv>
      <FacebookShareButton url={`${siteUrl}${uri}`} quote={quote}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <TwitterShareButton url={`${siteUrl}${uri}`} title={quote}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
      <RedditShareButton url={`${siteUrl}${uri}`} title={title}>
        <RedditIcon size={size} />
      </RedditShareButton>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`
