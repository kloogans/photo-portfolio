import React, { Component } from 'react'
import SectionContainer from '../shared/section/SectionContainer'
import links from './data/links'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const About = observer(
  class About extends Component {

    componentDidMount() {
      store.current_page['color'] = '#0F1A2B'
      document.documentElement.style.backgroundColor = '#0F1A2B'
    }

    render() {
      if (store.instagram.user) {
        return (
          <SectionContainer>
            <div className='about__cover animate__fade-in--long'>
              <img src='/images/self.png' alt='James Thomas' />
            </div>
            <h2>
              Photographer // Digital Artist
            </h2>
            <div className='about__description'>
              <p>
                Computer addict. Space enthusiast. Lover of the outdoors. I take photos
                and create photo manipulative art via Photoshop and Lightroom.
                <a href='https://jamesobrien.io'
                   title='James software development portfolio.'
                   className='text text--medium text--underline'>
                  I also write code.
                </a>
              </p>
            </div>
            <div className='about__links'>
              {
                links.map((link, i) => {
                  return <a key={i} href={link.url} title={link.title}>
                    <i className={link.icon} />
                  </a>
                })
              }
            </div>
          </SectionContainer>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default About
