/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import MarkdownLayout from "../components/MarkdownLayout"
import SEO from "../components/SEO"
import StyledLink from "../components/StyledLink"

export const query = graphql`
  query($slug: String!) {
    allMdx(filter: { frontmatter: { templateKey: { eq: "service" } } }) {
      nodes {
        excerpt
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          slug
          image {
            sharp: childImageSharp {
              fluid(quality: 90, maxWidth: 960) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        body
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
    }
  }
`

const Services = ({
  data: {
    allMdx: { nodes: services = [] },
    mdx: { body = "" }
  }
}) => {
  return (
    <MarkdownLayout bodyClass="page-services">
      <SEO title="Services" />
      <div className="intro">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Styled.h1>Services</Styled.h1>
            </div>
          </div>
        </div>
      </div>

      <MDXRenderer>{body}</MDXRenderer>

      <div className="container pb-6">
        <div className="row">
          {services.map(({ excerpt, frontmatter: { title, slug } }) => (
            <div key={slug} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <StyledLink to={slug}>{title}</StyledLink>
                  </h2>
                  <p>{excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarkdownLayout>
  )
}

export default Services
