import React, { Component } from 'react'
import SectionContainer from '../shared/section/SectionContainer'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const About = observer(
  class About extends Component {

    componentDidMount() {
      store.current_page['color'] = '#0F1A2B'
      document.documentElement.style.backgroundColor = '#0F1A2B'
    }

    render() {
      if (store.instagram_user) {
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
              <a href='https://instagram.com/jamesthomasvision'
                 title='Instagram'>
                <i className='fab fa-instagram' />
              </a>
              <a href='https://twitter.com/notjamesobrien'
                 title='Twitter'>
                <i className='fab fa-twitter' />
              </a>
              <a href='https://jamesobrien.io'
                 title='Software Development Portfolio'>
                <i className='fas fa-code' />
              </a>
              <a href='mailto:jamesthomasvision@gmail.com'
                 title='Email'>
                <i className='fas fa-envelope' />
              </a>
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
