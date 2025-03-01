import { useStaticQuery, graphql } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          url
          image
          author
          intro
          basePath
          menuLinks {
            name
            slug
          }
          contact {
            phone
            email
          }
          footerLinks {
            name
            href
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
