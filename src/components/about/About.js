import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'

const About = observer(
  class About extends Component {

    componentDidMount() { store.current_page['color'] = '#0F1A2B' }

    render() {
      if (store.instagram_user) {
        return (
          <section className='section__container animate__fade--in'>
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
              </p>
            </div>
            <div className='about__links'>
              <a href='https://instagram.com/jamesthomasvision'>
                <i className='fab fa-instagram' />
              </a>
              <a href='https://twitter.com/notjamesobrien'>
                <i className='fab fa-twitter' />
              </a>
              <a href='https://jamesobrien.io'>
                <i className='fas fa-code' />
              </a>
            </div>
          </section>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default About
