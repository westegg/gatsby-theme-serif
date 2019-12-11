/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/SEO"
import MarkdownLayout from "../components/MarkdownLayout"
import Call from "../components/Call"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        businessHours {
          day
          open
          close
        }
      }
      body
    }
  }
`

const Contact = ({
  data: {
    mdx: {
      body,
      frontmatter: { title, date, image, businessHours }
    }
  }
}) => {
  return (
    <MarkdownLayout>
      <SEO title={title} />
      <Styled.h1>{title}</Styled.h1>
      <Call button={false} />
      <Styled.h4 className="mt-4">Business Hours</Styled.h4>
      <table className="table table-sm opening-hours-table">
        <tbody>
          {businessHours.map(({ day, open, close }) => (
            <tr>
              <td className="day font-weight-bold">{day}</td>
              <td className="opens">{open}</td>
              <td>-</td>
              <td className="closes">{close}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MDXRenderer>{body}</MDXRenderer>
    </MarkdownLayout>
  )
}

export default Contact
