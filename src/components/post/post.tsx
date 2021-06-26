import React, { MouseEvent } from "react"

import styled from "styled-components"
import { Post as PostType } from "../../types/markdown"
import { navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import svgPicker from "../../util/svgPicker"
import dayjs from "dayjs"
import { categories } from "../../util/constants"

const handleGoToCategory = (e: MouseEvent) => {
  const input = e.target as HTMLElement
  const category = input.innerText
  // Don't navigate if we're on the same page and clutter up the history
  if (!window.location.href.endsWith(category)) {
    navigate(`/categories/${category}`)
  }
  e.stopPropagation()
}

const handleClickPost = (path: string) => {
  navigate(path)
}

export const Post = ({
  title,
  description,
  date,
  featuredImage,
  imageDescription,
  path,
  tags,
}: PostType): JSX.Element => {
  //@ts-ignore
  const image = getImage(featuredImage)
  return (
    <StyledPost onClick={() => handleClickPost(path)}>
      <StyledTagHolder>
        {tags &&
          tags
            .filter(tag => categories.includes(tag))
            .map((tag, i) => (
              <StyledTag key={i} onClick={handleGoToCategory}>
                <StyledSvgContainer>
                  {tag.toLowerCase()}
                  {svgPicker({ tag, isDark: 0 })}
                </StyledSvgContainer>
              </StyledTag>
            ))}
      </StyledTagHolder>
      {image && imageDescription && (
        <GatsbyImage image={image} alt={imageDescription} />
      )}
      <StyledMetaContainer>
        <StyledTitleAndDate>
          <h2>{title}</h2>
          <StyledDate>{dayjs(date).format("DD/MM/YYYY")}</StyledDate>
        </StyledTitleAndDate>
      </StyledMetaContainer>
      <p>{description}</p>
    </StyledPost>
  )
}

const StyledMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitleAndDate = styled.div`
  flex-grow: 9;
`

const StyledPost = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  h2 {
    margin: 0.25em 0 0.25em 0;
  }
`

const StyledTag = styled.div`
  --color: lightblue;

  :hover {
    filter: brightness(108%);
  }

  display: block;
  padding: 0px;
  margin: 0px;
  background: var(--color);
  padding: 0.25em;
  color: black;
  font-family: "Lora";
  font-size: 0.9em;
  border-top-left-radius: 0.25em;
  border-top-right-radius: 0.25em;
`

const StyledSvgContainer = styled.div`
  svg {
    display: none;
    height: 20px;
    width: 20px;
  }
`

const StyledTagHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
`

const StyledDate = styled.span`
  font-size: 0.9em;
`
