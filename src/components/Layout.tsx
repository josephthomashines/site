import * as React from 'react'
import * as styles from '../style/index.module.scss'
import { navigate, StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Logo from '@haiku/josephthomashines-logov2/react'

export interface ILayoutProps {
  children: any
  pageTitle?: string
}

export const layoutQuery = graphql`
  query layoutQuery {
    site {
      siteMetadata {
        name
        tagline
        author
      }
    }
  }
`

export type layoutResponse = {
  site: {
    siteMetadata: {
      name: string
      tagline: string
      author: string
    }
  }
}

class Layout extends React.Component<ILayoutProps, { ready: boolean }> {
  constructor(props) {
    super(props)
    this.state = { ready: false }
  }

  componentDidMount() {
    this.setState({ ready: true })
  }

  public render(): JSX.Element {
    return (
      <StaticQuery
        query={layoutQuery}
        render={(data: layoutResponse) => {
          console.log(data)

          return (
            <React.Fragment>
              <Helmet
                title={
                  this.props.pageTitle
                    ? `${this.props.pageTitle} - ${data.site.siteMetadata.name}`
                    : data.site.siteMetadata.name
                }
                meta={[
                  {
                    name: 'description',
                    content: data.site.siteMetadata.tagline,
                  },
                  {
                    name: 'keywords',
                    content:
                      'blog, CS, Computer Science, Drexel, Web Development, Web Design',
                  },
                  { name: 'author', content: data.site.siteMetadata.author },
                ]}
              >
                <html lang='en' />
              </Helmet>
              <div className={styles.header}>
                <h1 onClick={() => navigate(`/`)} role='link' tabIndex={0}>
                  {/* <img src={logo} alt='logo' /> */}
                  <div className={styles.logo}>
                    <Logo sizing='cover' autoplay={this.state.ready} />
                  </div>
                  <em>{data.site.siteMetadata.name}</em>
                </h1>
                <p>{data.site.siteMetadata.tagline}</p>
              </div>
              <div
                className={styles.Container}
                // style={{ minHeight: `${window.innerHeight}px` }}
              >
                <div className={styles.postWrapper}>{this.props.children}</div>
              </div>
              <div className={styles.footer}>
                <div className={styles.message}>
                  <h2>That's all, folks</h2>
                </div>
                <div className={styles.links}>
                  <div className={styles.wrapper}>
                    <h2>links</h2>
                    <div>
                      <p>
                        <a
                          href='https://josephthomashines.com'
                          target='_blank'
                          rel='noopener'
                        >
                          CV Site
                        </a>
                      </p>
                      <p>
                        <a
                          href='http://github.com/josephthomashines'
                          target='_blank'
                          rel='noopener'
                        >
                          Github
                        </a>
                      </p>
                      <p>
                        <a
                          href='https://www.linkedin.com/in/joseph-hines-iii-b58923139/'
                          target='_blank'
                          rel='noopener'
                        >
                          LinkedIn
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.goodbye}>
                  <h2>
                    Copyright &copy; {new Date().getFullYear()}{' '}
                    {data.site.siteMetadata.author}
                  </h2>
                  <h4>All Rights Reserved.</h4>
                </div>
              </div>
            </React.Fragment>
          )
        }}
      />
    )
  }
}

export default Layout
