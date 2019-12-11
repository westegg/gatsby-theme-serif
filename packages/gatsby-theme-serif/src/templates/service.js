/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from "../components/SEO"
import MarkdownLayout from "../components/MarkdownLayout"
import PageTransition from "../components/PageTransition"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`

const RecipeTemplate = ({
  data: {
    mdx: {
      body,
      frontmatter: { title, date }
    }
  }
}) => {
  return (
    <article>
      <SEO title={title} />
      <MarkdownLayout>
        <PageTransition>
          <Styled.h1>{title}</Styled.h1>
          <time sx={{ variant: "text.small" }}>{date}</time>
          <MDXRenderer>{body}</MDXRenderer>
        </PageTransition>
      </MarkdownLayout>
    </article>
  )
}

export default RecipeTemplate
