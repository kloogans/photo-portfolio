import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import * as mobx from 'mobx'

const About = observer(
  class About extends Component {

    componentDidMount() {
      store.current_page['color'] = '#0F1A2B'
    }

    render() {
      if (store.instagram_user) {
        const user = mobx.toJS(store.instagram_user)
        return (
          <div className='section__container animate__fade--in'>
            <div className='about__cover animate__fade-in--long'>
              <img src='/images/self.png' />
            </div>
            <h2>
              Photographer // Graphic Artist
            </h2>
            <div className='about__description'>
              <p>
                Addicted to coffee, podcasts, and cats.
                Currently located in Tampa Bay, FL.
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
          </div>
        )
      } else {
        return 'Loading...'
      }
    }
  }
)

export default About
