import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import { Link } from 'react-router-dom'
import IosApps from 'react-ionicons/lib/IosApps'
import IosOptions from 'react-ionicons/lib/IosOptions'
import IosContact from 'react-ionicons/lib/IosContact'
import IosSend from 'react-ionicons/lib/IosSend'
import IosVideocam from 'react-ionicons/lib/IosVideocam'

const Navigation = observer(
  class Navigation extends Component {

    changePage = (page, color) => store.changeCurrentPage(page, color)

    render() {
      const width = window.innerWidth
      return (
        <nav style={{ backgroundColor: `${store.current_page.color}` }}
             className={(store.shrink && width > 768) || store.full_image.is_active || store.popover.is_active
                         ? 'navigation__container hidden'
                         : 'navigation__container'}>
          <div className='navigation__inner'>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Photos
              </div>
              <Link to='/' onClick={() => this.changePage('photos', '#202B36')}>
                <IosApps color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Presets
              </div>
              <Link to='/presets' onClick={() => this.changePage('presets', '#2b120f')}>
                <IosOptions color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Videos
              </div>
              <Link to='/videos'>
                <IosVideocam color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                About
              </div>
              <Link to='/about' onClick={() => this.changePage('about', '#0F1A2B')}>
                <IosContact color='white' />
              </Link>
            </div>
          </div>
        </nav>
      )
    }

  }
)

export default Navigation
