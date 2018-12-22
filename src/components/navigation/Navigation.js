import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../../stores/store'
import { Link } from 'react-router-dom'

const Navigation = observer(
  class Navigation extends Component {

    changePage = (page, color) => store.changeCurrentPage(page, color)

    render() {
      return (
        <nav style={{ backgroundColor: `${store.current_page.color}` }}
             className={store.full_image.is_active ? 'navigation__container remove' : 'navigation__container'}>
          <div className='navigation__inner'>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Photos
              </div>
              <Link to='/' onClick={() => this.changePage('photos', '#202B36')}>
                <i className='fas fa-th' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Presets?
              </div>
              <Link to='/presets' onClick={() => this.changePage('presets', '#2b120f')}>
                <i className='fas fa-sliders-h' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Blog
              </div>
              <Link to='/about'>
                <i className='fas fa-newspaper' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                About
              </div>
              <Link to='/about' onClick={() => this.changePage('about', '#0F1A2B')}>
                <i className='fas fa-user' />
              </Link>
            </div>
            <div className='navigation__link'>
              <div className='navigation__tooltip'>
                Contact
              </div>
              <button>
                <i className='fas fa-envelope' />
              </button>
            </div>
          </div>
        </nav>
      )
    }

  }
)

export default Navigation
