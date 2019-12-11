import React from "react"
import { Styled } from "theme-ui"
import StyledLink from "./StyledLink"
import useSiteMetadata from "../hooks/use-sitemetadata"

const Call = props => {
  const { contact } = useSiteMetadata()
  return (
    <div>
      <div>
        <Styled.strong>Phone: </Styled.strong>
        <StyledLink as={"a"} href={`tel:${contact.phone}`}>
          {contact.phone}
        </StyledLink>
      </div>
      <div>
        <Styled.strong>Email: </Styled.strong>
        <StyledLink as={"a"} href={`mailto:${contact.email}`}>
          {contact.email}
        </StyledLink>
      </div>
      {props.button && (
        <div className="call-box-bottom">
          <a href="/contact" className="button">
            Contact
          </a>
        </div>
      )}
    </div>
  )
}

export default Call
