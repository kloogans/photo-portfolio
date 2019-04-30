import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import handlerAction from '../../actions/handlerActions'
import { Link } from 'react-router-dom'
import IosApps from 'react-ionicons/lib/IosApps'
import IosOptions from 'react-ionicons/lib/IosOptions'
import IosContact from 'react-ionicons/lib/IosContact'
import IosVideocam from 'react-ionicons/lib/IosVideocam'

const Navigation = observer(
  class Navigation extends Component {

    changePage = (page, color) => handlerAction.handleChangeCurrentPage(page, color)

    render() {
      const width = window.innerWidth
      return (
        <nav role='navigation' style={{ backgroundColor: `${store.current_page.color}` }}
             className={(store.shrink_logo && width > 768) || store.full_image.is_active || store.popover.is_active || store.loading
                         ? 'navigation__container hidden'
                         : 'navigation__container'}>
          <div className='navigation__inner'>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Photos
              </div>
              <Link to='/' title='Photo Portfolio' onClick={() => this.changePage('photos', '#202B36')}>
                <IosApps color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Presets
              </div>
              <Link to='/presets' title='Presets' onClick={() => this.changePage('presets', '#2b120f')}>
                <IosOptions color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Videos
              </div>
              <Link to='/videos' title='Tutorials and Tips'>
                <IosVideocam color='white' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                About
              </div>
              <Link to='/about' title='About James Thomas' onClick={() => this.changePage('about', '#0F1A2B')}>
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
